import { describe, it, expect } from 'vitest';
import { loadConfig } from '../src/config';

describe('loadConfig', () => {
  it('applies defaults when env is sparse', () => {
    const c = loadConfig({ NODE_ENV: 'development' } as NodeJS.ProcessEnv);
    expect(c.PORT).toBe(4000);
    expect(c.DATABASE_PATH).toBe('./data/portfolio.db');
    expect(c.JWT_EXPIRES_IN).toBe('15m');
  });

  it('throws if JWT_SECRET is missing in production', () => {
    expect(() =>
      loadConfig({ NODE_ENV: 'production' } as NodeJS.ProcessEnv)
    ).toThrowError(/JWT_SECRET/);
  });

  it('coerces numeric env vars from strings', () => {
    const c = loadConfig({
      NODE_ENV: 'test',
      JWT_SECRET: 'test-secret-please-test-secret-please',
      PORT: '5555',
      RATE_LIMIT_TOKENS: '7',
    } as NodeJS.ProcessEnv);
    expect(c.PORT).toBe(5555);
    expect(c.RATE_LIMIT_TOKENS).toBe(7);
  });
});
