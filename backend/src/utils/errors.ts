export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMITED'
  | 'INVALID_SIGNATURE'
  | 'INTERNAL';

export class AppError extends Error {
  readonly status: number;
  readonly code: ErrorCode;
  readonly details?: unknown;

  constructor(status: number, code: ErrorCode, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new AppError(400, 'VALIDATION_ERROR', message, details);

export const unauthorized = (message = 'Unauthorized') =>
  new AppError(401, 'UNAUTHORIZED', message);

export const forbidden = (message = 'Forbidden') =>
  new AppError(403, 'FORBIDDEN', message);

export const notFound = (message = 'Not found') =>
  new AppError(404, 'NOT_FOUND', message);

export const conflict = (message: string) =>
  new AppError(409, 'CONFLICT', message);

export const rateLimited = (message = 'Too many requests') =>
  new AppError(429, 'RATE_LIMITED', message);

export const invalidSignature = (message = 'Invalid signature') =>
  new AppError(401, 'INVALID_SIGNATURE', message);
