import express from 'express';
import cors from 'cors';
import type { Db } from './db';
import type { Config } from './config';
import type { Queue } from './services/queue';
import { requestId } from './middleware/requestId';
import { createHttpLogger } from './middleware/logger';
import { errorMiddleware } from './middleware/error';
import { createRateLimiter } from './middleware/rateLimit';
import { createAuthRouter } from './routes/auth.routes';
import { createTenantsRouter } from './routes/tenants.routes';
import { createUsersRouter } from './routes/users.routes';
import { createPaymentsRouter } from './routes/payments.routes';
import { createJobsRouter } from './routes/jobs.routes';

export interface AppDeps {
  db: Db;
  config: Config;
  queue: Queue;
}

export function createApp({ db, config, queue }: AppDeps) {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // Capture the raw request buffer so the webhook route can HMAC-verify the
  // exact bytes the sender signed. express.json will still parse req.body.
  app.use(
    express.json({
      limit: '256kb',
      verify: (req, _res, buf) => {
        (req as express.Request).rawBody = buf;
      },
    })
  );

  app.use(
    cors({
      origin: config.CORS_ORIGIN.split(',').map(s => s.trim()),
      credentials: false,
      exposedHeaders: ['X-Request-Id', 'X-RateLimit-Limit', 'X-RateLimit-Remaining'],
    })
  );
  app.use(requestId);
  if (config.NODE_ENV !== 'test') {
    app.use(createHttpLogger(config));
  }

  const rateLimit = createRateLimiter(config);

  app.get('/healthz', (_req, res) => {
    res.json({ ok: true, uptime: process.uptime() });
  });

  app.use('/api/auth', rateLimit, createAuthRouter(db, config));
  app.use('/api/tenants', createTenantsRouter(db));
  app.use('/api/users', createUsersRouter(db, config));
  app.use('/api/payments', createPaymentsRouter(db, config, queue));
  app.use('/api/jobs', createJobsRouter(queue));

  app.use((_req, res) => {
    res.status(404).json({
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  app.use(errorMiddleware);

  return app;
}
