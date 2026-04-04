import { z } from 'zod';

const ConfigSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error']).default('info'),
  DATABASE_PATH: z.string().default('./data/portfolio.db'),
  JWT_SECRET: z.string().min(16),
  JWT_EXPIRES_IN: z.string().default('15m'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  WEBHOOK_SECRET: z.string().min(8).default('dev-webhook-secret'),
  RATE_LIMIT_TOKENS: z.coerce.number().int().positive().default(30),
  RATE_LIMIT_REFILL_MS: z.coerce.number().int().positive().default(10_000),
});

export type Config = z.infer<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const jwtFallback =
    env.NODE_ENV === 'production' ? undefined : 'dev-insecure-change-me-please';
  const parsed = ConfigSchema.safeParse({
    ...env,
    JWT_SECRET: env.JWT_SECRET ?? jwtFallback,
  });
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map(i => `  ${i.path.join('.') || '<root>'}: ${i.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return parsed.data;
}
