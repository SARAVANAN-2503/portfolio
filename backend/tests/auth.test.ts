import { describe, it, expect } from 'vitest';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { buildTestApp } from './helpers';

describe('POST /api/auth/login', () => {
  it('returns a JWT on valid credentials', async () => {
    const { app, config } = buildTestApp();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@tenantcraft.io', password: 'demo1234' });

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.expiresIn).toBeGreaterThan(0);
    expect(res.body.user).toMatchObject({
      email: 'demo@tenantcraft.io',
      tenantId: 'tnt_tenantcraft',
      role: 'owner',
    });

    const decoded = jwt.verify(res.body.token, config.JWT_SECRET) as Record<string, unknown>;
    expect(decoded.tid).toBe('tnt_tenantcraft');
    expect(decoded.email).toBe('demo@tenantcraft.io');
  });

  it('rejects wrong password with 401', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@tenantcraft.io', password: 'wrong-password' });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
  });

  it('rejects unknown email with 401 (no user enumeration)', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'nobody@example.com', password: 'whatever1' });

    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('UNAUTHORIZED');
    expect(res.body.error.message).toBe('Invalid credentials');
  });

  it('returns 400 on malformed payload', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: '1' });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details).toBeDefined();
  });

  it('attaches request id and rate limit headers', async () => {
    const { app } = buildTestApp();
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@tenantcraft.io', password: 'demo1234' });

    expect(res.headers['x-request-id']).toBeDefined();
    expect(res.headers['x-ratelimit-limit']).toBe('1000');
    expect(Number(res.headers['x-ratelimit-remaining'])).toBeLessThan(1000);
  });
});

describe('GET /healthz', () => {
  it('returns ok + uptime', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(typeof res.body.uptime).toBe('number');
  });
});

describe('unknown route', () => {
  it('404s with a typed error envelope', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/nope');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
