import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp } from './helpers';
import { signPayload } from '../src/services/webhookVerify';

const SECRET = 'test-webhook-secret';

function send(app: Parameters<typeof request>[0], body: unknown, signature: string | null) {
  const raw = JSON.stringify(body);
  const req = request(app)
    .post('/api/payments/webhook')
    .set('content-type', 'application/json');
  if (signature !== null) req.set('x-signature', signature);
  return req.send(raw);
}

describe('POST /api/payments/webhook', () => {
  it('rejects a missing signature with 401', async () => {
    const { app } = buildTestApp();
    const body = { event: 'payment.captured', data: { amount: 100 }, idempotencyKey: 'evt_abc123' };
    const res = await send(app, body, null);
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_SIGNATURE');
  });

  it('rejects a wrong signature with 401', async () => {
    const { app } = buildTestApp();
    const body = { event: 'payment.captured', data: { amount: 100 }, idempotencyKey: 'evt_abc123' };
    const res = await send(app, body, 'a'.repeat(64));
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_SIGNATURE');
  });

  it('accepts a valid signature and enqueues a job', async () => {
    const { app, queue } = buildTestApp();
    const body = { event: 'payment.captured', data: { amount: 4200 }, idempotencyKey: 'evt_ok_1' };
    const sig = signPayload(JSON.stringify(body), SECRET);
    const res = await send(app, body, sig);

    expect(res.status).toBe(202);
    expect(res.body.accepted).toBe(true);
    expect(res.body.event).toBe('payment.captured');
    expect(res.body.duplicate).toBe(false);
    expect(res.body.jobId).toEqual(expect.stringMatching(/^job_/));

    const job = queue.get(res.body.jobId);
    expect(job).not.toBeNull();
    expect(job!.type).toBe('payment.payment.captured');
    expect(job!.status).toBe('pending');
  });

  it('is idempotent on a repeated idempotencyKey', async () => {
    const { app } = buildTestApp();
    const body = { event: 'payment.captured', data: { amount: 100 }, idempotencyKey: 'evt_dup_1' };
    const sig = signPayload(JSON.stringify(body), SECRET);

    const first = await send(app, body, sig);
    expect(first.status).toBe(202);
    const firstJobId = first.body.jobId;

    const second = await send(app, body, sig);
    expect(second.status).toBe(200);
    expect(second.body.duplicate).toBe(true);
    expect(second.body.jobId).toBe(firstJobId);
  });

  it('rejects payloads that fail schema validation', async () => {
    const { app } = buildTestApp();
    const body = { event: '', data: {}, idempotencyKey: 'short' };
    const sig = signPayload(JSON.stringify(body), SECRET);
    const res = await send(app, body, sig);
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});
