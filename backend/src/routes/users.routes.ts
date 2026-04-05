import { Router } from 'express';
import { PaginationQuerySchema } from '../../../shared/types/schemas';
import { badRequest } from '../utils/errors';
import { encodeCursor, decodeCursor } from '../services/pagination';
import { createAuthMiddleware } from '../middleware/auth';
import { createTenantGuard } from '../middleware/tenant';
import type { Db } from '../db';
import type { Config } from '../config';

interface UserRow {
  id: number;
  tenant_id: string;
  email: string;
  name: string;
  role: string;
  created_at: number;
}

export function createUsersRouter(db: Db, config: Config): Router {
  const router = Router();
  const auth = createAuthMiddleware(config);
  const tenantGuard = createTenantGuard();

  const firstPage = db.prepare(
    'SELECT id, tenant_id, email, name, role, created_at FROM users WHERE tenant_id = ? ORDER BY id ASC LIMIT ?'
  );
  const afterCursor = db.prepare(
    'SELECT id, tenant_id, email, name, role, created_at FROM users WHERE tenant_id = ? AND id > ? ORDER BY id ASC LIMIT ?'
  );

  router.get('/', auth, tenantGuard, (req, res, next) => {
    const parsed = PaginationQuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return next(badRequest('Invalid query', parsed.error.flatten()));
    }
    const { cursor, limit } = parsed.data;
    const fetchLimit = limit + 1;
    const tenantId = req.user!.tid;

    let rows: UserRow[];
    if (cursor) {
      const decoded = decodeCursor(cursor);
      if (!decoded) return next(badRequest('Invalid cursor'));
      rows = afterCursor.all(tenantId, decoded.id, fetchLimit) as UserRow[];
    } else {
      rows = firstPage.all(tenantId, fetchLimit) as UserRow[];
    }

    const hasMore = rows.length > limit;
    const page = hasMore ? rows.slice(0, limit) : rows;
    const nextCursor = hasMore
      ? encodeCursor({ id: page[page.length - 1].id })
      : null;

    res.json({
      data: page.map(r => ({
        id: r.id,
        tenantId: r.tenant_id,
        email: r.email,
        name: r.name,
        role: r.role,
        createdAt: new Date(r.created_at).toISOString(),
      })),
      pageInfo: {
        nextCursor,
        hasMore,
        count: page.length,
      },
    });
  });

  return router;
}
