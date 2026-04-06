import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp, loginAs } from './helpers';

describe('GET /api/users — cursor pagination', () => {
  it('requires a bearer token', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .get('/api/users')
      .set('x-tenant-id', 'tnt_tenantcraft');
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('requires an X-Tenant-ID header', async () => {
    const { app } = buildTestApp();
    const token = await loginAs(app, 'demo@tenantcraft.io');
    const res = await request(app)
      .get('/api/users')
      .set('authorization', `Bearer ${token}`);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('rejects a mismatched tenant header with 403', async () => {
    const { app } = buildTestApp();
    const token = await loginAs(app, 'demo@tenantcraft.io');
    const res = await request(app)
      .get('/api/users')
      .set('authorization', `Bearer ${token}`)
      .set('x-tenant-id', 'tnt_govpass');
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });

  it('returns the first page with a next cursor when more rows exist', async () => {
    const { app } = buildTestApp({ usersPerTenant: 25 });
    const token = await loginAs(app, 'demo@tenantcraft.io');
    const res = await request(app)
      .get('/api/users?limit=5')
      .set('authorization', `Bearer ${token}`)
      .set('x-tenant-id', 'tnt_tenantcraft');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(5);
    expect(res.body.pageInfo.hasMore).toBe(true);
    expect(res.body.pageInfo.nextCursor).toEqual(expect.any(String));
    expect(res.body.pageInfo.count).toBe(5);
    // All rows belong to the caller's tenant.
    for (const u of res.body.data) {
      expect(u.tenantId).toBe('tnt_tenantcraft');
    }
  });

  it('walks all pages without duplicates', async () => {
    const { app } = buildTestApp({ usersPerTenant: 20 });
    const token = await loginAs(app, 'demo@tenantcraft.io');

    const seen = new Set<number>();
    let cursor: string | null = null;
    let pages = 0;

    while (true) {
      const url: string = cursor
        ? `/api/users?limit=7&cursor=${encodeURIComponent(cursor)}`
        : '/api/users?limit=7';
      const res: request.Response = await request(app)
        .get(url)
        .set('authorization', `Bearer ${token}`)
        .set('x-tenant-id', 'tnt_tenantcraft');
      expect(res.status).toBe(200);
      for (const u of res.body.data) {
        expect(seen.has(u.id)).toBe(false);
        seen.add(u.id);
      }
      pages += 1;
      if (!res.body.pageInfo.hasMore) break;
      cursor = res.body.pageInfo.nextCursor;
      if (pages > 20) throw new Error('pagination did not terminate');
    }

    // 2 fixed users (demo + admin) + 20 generated = 22 for tenantcraft.
    expect(seen.size).toBe(22);
  });

  it('rejects invalid cursor with 400', async () => {
    const { app } = buildTestApp();
    const token = await loginAs(app, 'demo@tenantcraft.io');
    const res = await request(app)
      .get('/api/users?cursor=garbage')
      .set('authorization', `Bearer ${token}`)
      .set('x-tenant-id', 'tnt_tenantcraft');
    expect(res.status).toBe(400);
  });

  it('rejects limit above 100', async () => {
    const { app } = buildTestApp();
    const token = await loginAs(app, 'demo@tenantcraft.io');
    const res = await request(app)
      .get('/api/users?limit=5000')
      .set('authorization', `Bearer ${token}`)
      .set('x-tenant-id', 'tnt_tenantcraft');
    expect(res.status).toBe(400);
  });
});
