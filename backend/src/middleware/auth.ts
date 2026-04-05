import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { unauthorized } from '../utils/errors';
import type { Config } from '../config';

export interface JwtClaims {
  sub: number;
  tid: string;
  role: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: JwtClaims;
    }
  }
}

export function createAuthMiddleware(config: Config) {
  return function auth(req: Request, _res: Response, next: NextFunction): void {
    const header = req.header('authorization');
    if (!header || !header.startsWith('Bearer ')) {
      return next(unauthorized('Missing bearer token'));
    }
    const token = header.slice('Bearer '.length).trim();
    try {
      const claims = jwt.verify(token, config.JWT_SECRET) as unknown as JwtClaims;
      req.user = claims;
      next();
    } catch {
      next(unauthorized('Invalid or expired token'));
    }
  };
}
