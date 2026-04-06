import { Router } from 'express';
import { notFound } from '../utils/errors';
import type { Queue } from '../services/queue';

export function createJobsRouter(queue: Queue): Router {
  const router = Router();
  router.get('/:id', (req, res, next) => {
    const job = queue.get(req.params.id);
    if (!job) return next(notFound('Job not found'));
    res.json(job);
  });
  return router;
}
