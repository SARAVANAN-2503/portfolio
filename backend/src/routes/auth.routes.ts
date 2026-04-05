import { Router } from 'express';
import { LoginSchema } from '../../../shared/types/schemas';
import { badRequest } from '../utils/errors';
import { createAuthService } from '../services/auth.service';
import type { Db } from '../db';
import type { Config } from '../config';

export function createAuthRouter(db: Db, config: Config): Router {
  const router = Router();
  const service = createAuthService(db, config);

  router.post('/login', async (req, res, next) => {
    const parsed = LoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(badRequest('Invalid login payload', parsed.error.flatten()));
    }
    try {
      const result = await service.login(parsed.data.email, parsed.data.password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
