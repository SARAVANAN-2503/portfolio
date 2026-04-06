import { Router } from 'express';
import crypto from 'crypto';
import { WebhookSchema } from '../../../shared/types/schemas';
import { badRequest, invalidSignature } from '../utils/errors';
import { verifySignature } from '../services/webhookVerify';
import type { Db } from '../db';
import type { Config } from '../config';
import type { Queue } from '../services/queue';

interface WebhookEventRow {
  id: string;
  idempotency_key: string;
  type: string;
  payload: string;
  job_id: string | null;
  received_at: number;
}

declare module 'express-serve-static-core' {
  interface Request {
    rawBody?: Buffer;
  }
}

export function createPaymentsRouter(
  db: Db,
  config: Config,
  queue: Queue
): Router {
  const router = Router();

  const findByKey = db.prepare(
    'SELECT id, idempotency_key, type, payload, job_id, received_at FROM webhook_events WHERE idempotency_key = ?'
  );
  const insertEvent = db.prepare(
    'INSERT INTO webhook_events (id, idempotency_key, type, payload, job_id, received_at) VALUES (?, ?, ?, ?, ?, ?)'
  );

  router.post('/webhook', (req, res, next) => {
    const sig = req.header('x-signature');
    const raw = req.rawBody;
    if (!raw) return next(badRequest('Missing raw body for signature verification'));
    if (!verifySignature(raw, sig, config.WEBHOOK_SECRET)) {
      return next(invalidSignature('HMAC signature does not match'));
    }

    const parsed = WebhookSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(badRequest('Invalid webhook payload', parsed.error.flatten()));
    }
    const { event, data, idempotencyKey } = parsed.data;

    const existing = findByKey.get(idempotencyKey) as WebhookEventRow | undefined;
    if (existing) {
      res.status(200).json({
        accepted: true,
        jobId: existing.job_id,
        event: existing.type,
        duplicate: true,
      });
      return;
    }

    const jobId = queue.enqueue(`payment.${event}`, { event, data });
    const id = `whev_${crypto.randomUUID()}`;
    insertEvent.run(
      id,
      idempotencyKey,
      event,
      JSON.stringify({ event, data }),
      jobId,
      Date.now()
    );

    res.status(202).json({
      accepted: true,
      jobId,
      event,
      duplicate: false,
    });
  });

  return router;
}
