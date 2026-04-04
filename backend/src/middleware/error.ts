import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        code: err.code,
        message: err.message,
        requestId: req.requestId,
        ...(err.details !== undefined ? { details: err.details } : {}),
      },
    });
    return;
  }
  const message = err instanceof Error ? err.message : 'Internal server error';
  res.status(500).json({
    error: {
      code: 'INTERNAL',
      message: process.env.NODE_ENV === 'production' ? 'Internal server error' : message,
      requestId: req.requestId,
    },
  });
}
