import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { buildTestApp } from './helpers';
import { signPayload } from '../src/services/webhookVerify';

const SECRET = 'test-webhook-secret';

describe('queue service', () => {
  it('enqueue → get returns the pending job with parsed payload', () => {
    const { queue } = buildTestApp();
    const id = queue.enqueue('score.exam', { submissionId: 42 });
    const job = queue.get(id);
    expect(job).not.toBeNull();
    expect(job!.status).toBe('pending');
    expect(job!.attempts).toBe(0);
    expect(job!.payload).toEqual({ submissionId: 42 });
  });

  it('tick on an empty queue returns null', async () => {
    const { queue } = buildTestApp();
    const result = await queue.tick();
    expect(result).toBeNull();
  });

  it('tick claims the oldest pending job and marks it done', async () => {
    const { queue } = buildTestApp({ processingMs: 0 });
    const id1 = queue.enqueue('score.exam', { n: 1 });
    queue.enqueue('score.exam', { n: 2 });

    const processed = await queue.tick();
    expect(processed).not.toBeNull();
    expect(processed!.id).toBe(id1);
    expect(processed!.status).toBe('done');
    expect(processed!.attempts).toBe(1);

    const stored = queue.get(id1);
    expect(stored!.status).toBe('done');
    expect((stored!.result as { type: string }).type).toBe('score.exam');
  });

  it('two sequential ticks drain two jobs', async () => {
    const { queue } = buildTestApp({ processingMs: 0 });
    const id1 = queue.enqueue('score.exam', { n: 1 });
    const id2 = queue.enqueue('score.exam', { n: 2 });

    const first = await queue.tick();
    const second = await queue.tick();
    const empty = await queue.tick();

    expect(first!.id).toBe(id1);
    expect(second!.id).toBe(id2);
    expect(empty).toBeNull();
  });
});

describe('GET /api/jobs/:id', () => {
  it('returns 404 for an unknown id', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/api/jobs/job_does_not_exist');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('returns the job enqueued via the webhook flow', async () => {
    const { app, queue } = buildTestApp({ processingMs: 0 });
    const body = { event: 'refund.issued', data: { amount: 9 }, idempotencyKey: 'evt_queue_001' };
    const sig = signPayload(JSON.stringify(body), SECRET);
    const hook = await request(app)
      .post('/api/payments/webhook')
      .set('content-type', 'application/json')
      .set('x-signature', sig)
      .send(JSON.stringify(body));
    expect(hook.status).toBe(202);

    const before = await request(app).get(`/api/jobs/${hook.body.jobId}`);
    expect(before.status).toBe(200);
    expect(before.body.status).toBe('pending');

    await queue.tick();

    const after = await request(app).get(`/api/jobs/${hook.body.jobId}`);
    expect(after.status).toBe(200);
    expect(after.body.status).toBe('done');
  });
});
