import type { Project } from './types';

export const tenantcraft: Project = {
  slug: 'tenantcraft',
  title: 'TenantCraft',
  tagline: 'Multi-tenant SaaS Website Builder',
  category: 'SaaS Platform',
  problem:
    'Building a website builder serving 200+ business tenants on shared infrastructure while guaranteeing data isolation. Each tenant requires custom subdomains, independent configuration, and the assurance that their data never leaks across boundaries.',
  architecture:
    'Hybrid isolation model: row-level tenant_id filtering for shared tables (users, settings) with optional per-tenant SQLite databases for content storage via ATTACH DATABASE. Subdomain routing resolves tenant identity at the edge before the request touches application code. JWT claims carry the authoritative tenant ID, and the X-Tenant-ID header is validated against the claim to prevent header forgery.',
  tradeoffs:
    'Row-level isolation is cheaper to operate — single database, simpler migrations — but requires discipline: every query must filter on tenant_id. Schema-per-tenant provides stronger isolation guarantees at the cost of N databases to migrate, backup, and monitor. We shipped row-level first and offered schema isolation as an enterprise upsell once customers demanded audit-level separation proof.',
  metrics: [
    { label: 'Tenants', value: '200+' },
    { label: 'Avg Response', value: '45ms' },
    { label: 'Isolation', value: 'Hybrid' },
    { label: 'Uptime', value: '99.95%' },
  ],
  stack: [
    'Next.js',
    'Express',
    'SQLite + PostgreSQL',
    'Redis',
    'JWT (HS256)',
    'Subdomain Routing',
    'Zod Validation',
  ],
  explainMode: {
    interviewPitch:
      "TenantCraft is a multi-tenant website builder where I solved the fundamental multi-tenancy problem: serving 200+ businesses from shared infrastructure without data leaks. The core challenge wasn't features — it was building trust in the isolation boundary.",
    talkingPoints: [
      'Hybrid isolation: row-level for shared tables, schema-per-tenant as enterprise upgrade',
      'Subdomain routing resolves tenant before app code runs — zero-trust at the edge',
      'JWT tid claim is the authority; X-Tenant-ID header must match or the request gets 403',
      'Middleware injects tenant_id into every query builder call — no raw queries allowed',
      'Integration tests assert cross-tenant queries always return zero rows',
    ],
    tradeoffsExplained:
      'We chose row-level isolation first because it let us ship faster with a single database. The risk is a missing WHERE clause leaking data. We mitigated with a query builder that auto-injects tenant_id, plus integration tests asserting cross-tenant isolation. Schema-per-tenant was added later for enterprise customers needing audit-level proof.',
  },
};
