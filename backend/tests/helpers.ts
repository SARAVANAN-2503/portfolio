import request from 'supertest';
import type { Express } from 'express';
import { createDb } from '../src/db';
import { migrate } from '../src/db/migrate';
import { seed } from '../src/db/seed';
import { createApp } from '../src/app';
import { loadConfig } from '../src/config';
import { createQueue } from '../src/services/queue';

interface BuildOpts {
  env?: Record<string, string>;
  usersPerTenant?: number;
  processingMs?: number;
}

const silentLogger = { error: () => undefined };

export function buildTestApp(opts: BuildOpts = {}) {
  const config = loadConfig({
    ...process.env,
    NODE_ENV: 'test',
    DATABASE_PATH: ':memory:',
    JWT_SECRET: 'test-secret-please-test-secret-please',
    RATE_LIMIT_TOKENS: '1000',
    WEBHOOK_SECRET: 'test-webhook-secret',
    ...(opts.env ?? {}),
  });
  const db = createDb(':memory:');
  migrate(db);
  seed(db, { usersPerTenant: opts.usersPerTenant ?? 2 });
  const queue = createQueue(db, silentLogger, opts.processingMs ?? 0);
  const app = createApp({ db, config, queue });
  return { app, db, config, queue };
}

export async function loginAs(
  app: Express,
  email: string,
  password = 'demo1234'
): Promise<string> {
  const res = await request(app).post('/api/auth/login').send({ email, password });
  if (res.status !== 200) {
    throw new Error(`login failed for ${email}: ${res.status} ${JSON.stringify(res.body)}`);
  }
  return res.body.token as string;
}
