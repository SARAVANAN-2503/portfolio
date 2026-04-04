import type { Request, Response, NextFunction } from 'express';
import { rateLimited } from '../utils/errors';
import type { Config } from '../config';

interface Bucket {
  tokens: number;
  lastRefill: number;
}

// Token-bucket rate limiter keyed by ip + route. Continuous refill: the bucket
// regains `capacity` tokens every `refillMs` window, so a burst of N<=capacity
// is allowed and sustained throughput is capacity/refillMs.
export function createRateLimiter(config: Config) {
  const buckets = new Map<string, Bucket>();
  const capacity = config.RATE_LIMIT_TOKENS;
  const refillMs = config.RATE_LIMIT_REFILL_MS;

  return function rateLimit(req: Request, res: Response, next: NextFunction): void {
    const key = `${req.ip ?? 'anon'}:${req.baseUrl}${req.path}`;
    const now = Date.now();
    const b = buckets.get(key) ?? { tokens: capacity, lastRefill: now };

    const elapsed = now - b.lastRefill;
    const refilled = (elapsed / refillMs) * capacity;
    b.tokens = Math.min(capacity, b.tokens + refilled);
    b.lastRefill = now;

    res.setHeader('X-RateLimit-Limit', String(capacity));

    if (b.tokens < 1) {
      res.setHeader('X-RateLimit-Remaining', '0');
      res.setHeader('Retry-After', String(Math.ceil(refillMs / 1000)));
      buckets.set(key, b);
      return next(rateLimited());
    }

    b.tokens -= 1;
    buckets.set(key, b);
    res.setHeader('X-RateLimit-Remaining', String(Math.floor(b.tokens)));
    next();
  };
}
