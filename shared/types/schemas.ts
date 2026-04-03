import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export const WebhookSchema = z.object({
  event: z.string().min(1),
  data: z.record(z.unknown()),
  idempotencyKey: z.string().min(8),
});
export type WebhookInput = z.infer<typeof WebhookSchema>;

export const PaginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
