import type { Request, Response, NextFunction } from 'express';
import { badRequest, forbidden, unauthorized } from '../utils/errors';

// Tenant guard: the JWT carries the authoritative tenant id (`tid` claim).
// The X-Tenant-ID header must match. This is the "isolation proof" a caller
// cannot forge their tenant by swapping the header.
export function createTenantGuard() {
  return function tenant(req: Request, _res: Response, next: NextFunction): void {
    const header = req.header('x-tenant-id');
    if (!header) return next(badRequest('Missing X-Tenant-ID header'));
    if (!req.user) return next(unauthorized());
    if (req.user.tid !== header) {
      return next(forbidden('Tenant mismatch — JWT not authorised for this tenant'));
    }
    next();
  };
}
