import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp } from './helpers';

describe('GET /api/tenants', () => {
  it('returns both seeded tenants with isolation metadata', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/api/tenants');

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    const slugs = res.body.data.map((t: { slug: string }) => t.slug).sort();
    expect(slugs).toEqual(['govpass', 'tenantcraft']);
    expect(res.body.isolation.strategy).toBe('row-level');
    expect(res.body.isolation.tenantIdHeader).toBe('X-Tenant-ID');
  });
});
