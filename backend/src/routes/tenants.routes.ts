import { Router } from 'express';
import type { Db } from '../db';

interface TenantRow {
  id: string;
  name: string;
  slug: string;
  plan: string;
  created_at: number;
}

export function createTenantsRouter(db: Db): Router {
  const router = Router();
  const listTenants = db.prepare(
    'SELECT id, name, slug, plan, created_at FROM tenants ORDER BY created_at ASC, id ASC'
  );

  router.get('/', (_req, res) => {
    const rows = listTenants.all() as TenantRow[];
    res.json({
      data: rows.map(r => ({
        id: r.id,
        name: r.name,
        slug: r.slug,
        plan: r.plan,
        createdAt: new Date(r.created_at).toISOString(),
      })),
      isolation: {
        strategy: 'row-level',
        tenantIdHeader: 'X-Tenant-ID',
        note: 'Tenant-scoped queries filter on tenant_id from the JWT `tid` claim. The X-Tenant-ID header must match the claim or the request is rejected with 403.',
      },
    });
  });

  return router;
}
