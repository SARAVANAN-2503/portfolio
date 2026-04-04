import pino from 'pino';
import pinoHttp from 'pino-http';
import type { Config } from '../config';

export function createLogger(config: Config) {
  return pino({
    level: config.NODE_ENV === 'test' ? 'silent' : config.LOG_LEVEL,
    base: { service: 'portfolio-api' },
    timestamp: pino.stdTimeFunctions.isoTime,
  });
}

export function createHttpLogger(config: Config) {
  return pinoHttp({
    logger: createLogger(config),
    customProps: req => ({ requestId: (req as { requestId?: string }).requestId }),
    customLogLevel: (_req, res, err) => {
      if (err || res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
  });
}
