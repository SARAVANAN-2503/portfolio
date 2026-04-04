import type { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export function requestId(req: Request, res: Response, next: NextFunction): void {
  const incoming = req.header('x-request-id');
  const id = (incoming && incoming.length <= 64 ? incoming : crypto.randomUUID());
  req.requestId = id;
  res.setHeader('X-Request-Id', id);
  next();
}
