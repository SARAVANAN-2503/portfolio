import type { Project } from './types';

export const govpass: Project = {
  slug: 'govpass',
  title: 'GovPass',
  tagline: 'Government Visa Application Management System',
  category: 'Government / Compliance',
  status: 'shipped',
  year: '2024',
  highlights: [
    'Replaced paper workflow — 30% error rate → < 2%',
    'Immutable event-sourced audit log (7-year retention)',
    '15+ officer role tiers with RBAC middleware',
    'Fault-tolerant Stripe + Square payment flows',
  ],
  problem:
    'Processing visa applications for a government agency with strict regulatory constraints: mandatory document retention, audit trails for every state transition, role-based access across 15+ officer tiers, and zero tolerance for data loss. The existing paper-based workflow processed ~200 applications/day with a 30% error rate from manual data entry.',
  architecture:
    'State machine driven: each application progresses through a directed acyclic graph of states (submitted → document_review → background_check → approved/rejected). Every transition is an immutable event appended to an audit log — no updates, only inserts. Document processing uses a pipeline: upload → virus scan → OCR extraction → validation → storage with checksums. Role-based access uses a permission matrix evaluated at the middleware layer before any controller logic runs.',
  tradeoffs:
    'Event-sourced audit log means storage grows monotonically and queries against "current state" require projecting from the event stream or maintaining a materialized view. We chose dual-write: event log for compliance + materialized status table for queries. The consistency risk (view vs log divergence) is mitigated by a nightly reconciliation job that flags mismatches.',
  metrics: [
    { label: 'Applications/Day', value: '800+' },
    { label: 'Error Rate', value: '< 2%' },
    { label: 'Officer Roles', value: '15+' },
    { label: 'Audit Retention', value: '7 years' },
  ],
  stack: [
    'React',
    'Node.js',
    'Express',
    'MySQL',
    'AWS S3',
    'Stripe',
    'Square',
    'Redis Queues',
    'RBAC Middleware',
    'Swagger/OpenAPI',
    'Knex.js',
  ],
  explainMode: {
    interviewPitch:
      "GovPass replaced a paper-based visa processing system handling 200 applications/day at a 30% error rate. The hard part wasn't the CRUD — it was the compliance requirements: immutable audit trails, mandatory 7-year retention, and a 15-tier RBAC model that had to match the agency's exact organizational hierarchy.",
    talkingPoints: [
      'State machine ensures applications can only transition through valid paths — no skip-ahead bugs',
      'Event-sourced audit log: append-only, immutable, satisfies 7-year regulatory retention',
      'Dual-write pattern: event log for compliance, materialized view for queries, nightly reconciliation to detect drift',
      'Document pipeline: upload → virus scan → OCR → validation → checksummed storage',
      'RBAC permission matrix evaluated at middleware layer, not in business logic',
    ],
    tradeoffsExplained:
      'Pure event sourcing would mean every query rebuilds state from the log — too slow for the officers who need instant dashboards. Dual-write trades consistency guarantees for query performance. The reconciliation job catches drift, and in 18 months of production it flagged exactly twice, both from a deploy-time race condition we subsequently fixed with a transaction lock.',
  },
};
