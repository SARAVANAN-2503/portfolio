import bcrypt from 'bcryptjs';
import type { Db } from './index';

interface SeedOptions {
  usersPerTenant?: number;
  force?: boolean;
}

export function seed(db: Db, opts: SeedOptions = {}): void {
  const usersPerTenant = opts.usersPerTenant ?? 5000;
  const existing = db.prepare('SELECT COUNT(*) as c FROM tenants').get() as { c: number };
  if (existing.c > 0 && !opts.force) return;

  const now = Date.now();
  const tenants = [
    { id: 'tnt_tenantcraft', name: 'TenantCraft', slug: 'tenantcraft', plan: 'pro' },
    { id: 'tnt_govpass', name: 'GovPass', slug: 'govpass', plan: 'enterprise' },
  ];

  const insertTenant = db.prepare(
    'INSERT INTO tenants (id, name, slug, plan, created_at) VALUES (?, ?, ?, ?, ?)'
  );
  const insertUser = db.prepare(
    'INSERT INTO users (tenant_id, email, password_hash, name, role, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  );

  // Demo password 'demo1234' — hashed once and reused. Cost 8 keeps seeding fast
  // for the 10k-user pagination demo without being trivially crackable.
  const demoHash = bcrypt.hashSync('demo1234', 8);

  const txn = db.transaction(() => {
    for (const t of tenants) {
      insertTenant.run(t.id, t.name, t.slug, t.plan, now);
      insertUser.run(t.id, `demo@${t.slug}.io`, demoHash, `${t.name} Demo`, 'owner', now);
      insertUser.run(t.id, `admin@${t.slug}.io`, demoHash, `${t.name} Admin`, 'admin', now);
      for (let i = 1; i <= usersPerTenant; i++) {
        insertUser.run(
          t.id,
          `user${i}@${t.slug}.io`,
          demoHash,
          `User ${i}`,
          'member',
          now + i
        );
      }
    }
  });
  txn();
}
