import type { Project } from './types';

export const seltrix: Project = {
  slug: 'seltrix',
  title: 'Seltrix',
  tagline: 'Multi-Tenant Website Builder & Template Commerce Platform',
  category: 'SaaS Platform',
  status: 'shipped',
  year: '2024',
  highlights: [
    'Multi-tenant SaaS website builder with custom-domain publishing',
    'Template marketplace for buying and selling reusable site templates',
    'Dynamic public tenant rendering resolves tenant identity per request',
    'Stripe-powered billing for marketplace transactions',
  ],
  problem:
    'Small businesses need a website builder that feels like a dedicated product, not a shared template engine, meaning their own domain, their own branding, and instant publishing, all while the platform serves hundreds of tenants from one codebase. On top of that, tenants needed a way to buy and sell page templates to each other, which meant the builder had to double as a small commerce platform.',
  architecture:
    'Built on Next.js with a multi-tenant request pipeline: incoming requests are matched against a tenant\'s custom domain or subdomain, and the resolved tenant context flows through to every downstream query. Publishing a site writes a versioned snapshot that the public renderer serves via dynamic SSR, so edits stay in draft until a tenant explicitly publishes. The template marketplace layers a commerce flow on top of the builder, templates are packaged, priced, and sold between tenants through Stripe, with Cloudinary handling asset storage and optimized delivery for template previews and media.',
  tradeoffs:
    'Custom-domain publishing means the platform is responsible for domain verification and SSL. We chose to automate that flow (verify → provision → activate) rather than push manual DNS steps onto non-technical business owners, at the cost of more edge cases to handle (misconfigured records, propagation delays). Dynamic SSR per tenant is more expensive than static generation, but static builds don\'t work when tenants can publish edits at any time: we accepted the runtime rendering cost in exchange for instant publish.',
  metrics: [
    { label: 'Architecture', value: 'Multi-Tenant' },
    { label: 'Publishing', value: 'Custom Domains' },
    { label: 'Commerce', value: 'Template Market' },
    { label: 'Rendering', value: 'Dynamic SSR' },
  ],
  stack: [
    'Next.js',
    'Node.js',
    'Express',
    'MySQL',
    'Stripe',
    'Cloudinary',
    'Custom Domain Routing',
    'Multi-Tenant Architecture',
  ],
  explainMode: {
    interviewPitch:
      "Seltrix is a multi-tenant SaaS website builder where tenants publish under their own custom domain and can buy or sell page templates from each other. The interesting problems were tenant resolution at the request layer and turning the builder into a small two-sided marketplace without bolting commerce on as an afterthought.",
    talkingPoints: [
      'Request pipeline resolves tenant identity from custom domain or subdomain before any query runs',
      'Publish flow writes a versioned snapshot: drafts stay private, published sites go live atomically',
      'Template marketplace: Stripe handles pricing and payout between tenants selling templates',
      'Cloudinary manages template preview assets and optimized media delivery',
      'Domain verification is automated end-to-end: verify ownership → provision SSL → activate routing',
    ],
    tradeoffsExplained:
      'We automated custom-domain verification and SSL provisioning so non-technical business owners never touch DNS manually, this front-loaded engineering effort into the domain pipeline but removed a support burden that would otherwise scale with every new tenant. For rendering, we chose dynamic SSR per request over static generation because tenants expect their edits to go live the moment they hit publish, not after a rebuild.',
  },
};
