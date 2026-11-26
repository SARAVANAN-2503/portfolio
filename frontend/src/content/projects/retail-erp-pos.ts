import type { Project } from './types';

export const retailErpPos: Project = {
  id: 'proj-07',
  slug: 'retail-erp-pos',
  title: 'Retail ERP & POS Suite',
  tagline: 'Multi-Tenant ERP/POS SaaS Platform',
  category: 'SaaS / ERP',
  engagementType: 'employer',
  employerId: 'jnana',
  status: 'shipped',
  year: '2023',
  hasCaseStudy: false,
  summary:
    'Multi-tenant retail ERP and POS SaaS platform with company-level tenant isolation, multi-warehouse inventory, and usage-based subscription billing.',
  highlights: [
    'Co-developed a secure ERP/POS SaaS platform with company-level tenant isolation',
    'Retail workflows: POS billing, multi-warehouse inventory, purchases, online storefronts, PDF invoicing',
    'Usage-based subscription billing across 15 distinct functional modules with automated overdue restrictions',
  ],
  problem:
    'Retail businesses needed unified POS billing, multi-warehouse inventory, and online storefronts with strict company-level data isolation and modular subscription enforcement.',
  architecture:
    'Multi-tenant Laravel and Vue.js architecture with company-scoped data isolation, 15 modular feature gates, and automated Stripe/Razorpay subscription billing.',
  tradeoffs:
    'Modular feature gating across 15 subsystems added middleware checks per request, trading minimal overhead for flexible tenant-tier packaging.',
  metrics: [
    { label: 'Architecture', value: 'Multi-Tenant' },
    { label: 'Modules', value: '15+' },
    { label: 'Billing', value: 'Stripe + Razorpay' },
    { label: 'Inventory', value: 'Multi-Warehouse' },
  ],
  stack: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Razorpay'],
  confidentialityStatus: 'anonymized-case-study',
  explainMode: {
    interviewPitch:
      'Retail ERP & POS Suite is a multi-tenant retail operations platform covering POS billing, multi-warehouse inventory, and automated modular subscription billing.',
    talkingPoints: [
      'Company-level tenant isolation across POS, inventory, and storefront workflows',
      'Usage-based subscription enforcement across 15 functional modules',
      'Automated PDF invoicing and overdue billing restrictions',
    ],
    tradeoffsExplained:
      'Module-level permission gating adds a small per-request check but enables granular SaaS packaging without maintaining separate codebases.',
  },
};
