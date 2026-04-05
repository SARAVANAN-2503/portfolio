import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Db } from '../db';
import type { Config } from '../config';
import { unauthorized } from '../utils/errors';

interface UserRow {
  id: number;
  tenant_id: string;
  email: string;
  password_hash: string;
  name: string;
  role: string;
}

// Bcrypt hash of a known-bad password used to normalise response time on
// "unknown email" so the login endpoint doesn't leak user existence.
const DUMMY_HASH = '$2a$08$C6UzMDM.H6dfI/f/IKcEeuWv6Q2hYbOaKYh5.jzgrU0e4bCwVHoF2';

export function createAuthService(db: Db, config: Config) {
  const findUser = db.prepare(
    'SELECT id, tenant_id, email, password_hash, name, role FROM users WHERE email = ? LIMIT 1'
  );

  async function login(email: string, password: string) {
    const row = findUser.get(email) as UserRow | undefined;
    const hashToCompare = row?.password_hash ?? DUMMY_HASH;
    const ok = await bcrypt.compare(password, hashToCompare);
    if (!row || !ok) throw unauthorized('Invalid credentials');

    const claims = {
      sub: row.id,
      tid: row.tenant_id,
      role: row.role,
      email: row.email,
    };
    const token = jwt.sign(claims, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
    return {
      token,
      expiresIn: parseExpirySeconds(config.JWT_EXPIRES_IN),
      user: {
        id: row.id,
        tenantId: row.tenant_id,
        email: row.email,
        name: row.name,
        role: row.role as 'owner' | 'admin' | 'member',
      },
    };
  }

  return { login };
}

function parseExpirySeconds(s: string): number {
  const m = /^(\d+)([smhd])$/.exec(s);
  if (!m) return 900;
  const n = parseInt(m[1], 10);
  const mult: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
  return n * mult[m[2]];
}
