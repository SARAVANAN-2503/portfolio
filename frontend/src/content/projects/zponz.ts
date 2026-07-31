import type { Project } from './types';

export const zponz: Project = {
  slug: 'zponz',
  title: 'ZPONZ',
  tagline: 'Expert Marketplace, Wallet & CMS Platform',
  category: 'Marketplace / Wallet',
  status: 'shipped',
  year: '2024',
  highlights: [
    'Drag-and-drop page builder with master components and ordered schema sections',
    'Stripe-backed wallet: deposits, withdrawals, escrow, scheduled expert payouts',
    'Expert monetization marketplace: landing site, ad dashboard, admin CMS',
    'Real-time notifications via Socket.IO and Firebase Cloud Messaging',
  ],
  problem:
    'Experts monetizing their time and content need three things working together: a public storefront to be discovered, a way to get paid reliably (including holding funds in escrow until a session completes), and an admin layer for the platform operator to manage the whole marketplace. Building each in isolation is easy — making them share one consistent data model and page-building system is the hard part.',
  architecture:
    'The page-builder architecture is the core reusable primitive: master components define layout configurations, and pages are composed from ordered schema sections rather than hand-coded templates — the same builder powers the expert landing site, the advertisement dashboard, and the admin CMS. Wallet workflows sit behind Stripe, modeling deposits, withdrawals, and transfers as ledger entries, with an escrow/locked-balance state so funds tied to an in-progress engagement are not withdrawable until release. Onboarding uses DNS verification flows for experts publishing under their own presence, and Cloudinary handles media assets. Real-time layer: Socket.IO pushes in-app events, Firebase Cloud Messaging (FCM) covers mobile/background notifications, and an AWS S3/CloudFront pipeline distributes media at low latency.',
  tradeoffs:
    'Modeling the wallet as ledger entries (rather than mutating a single balance field) makes every state change auditable and makes escrow trivial to express — a locked entry simply isn\'t counted in the withdrawable balance — at the cost of computing balances by aggregation instead of a single read. Reusing one page-builder schema across three surfaces (landing site, ad dashboard, admin CMS) meant more upfront design work on the schema shape, but it eliminated three separate rendering systems that would otherwise drift out of sync.',
  metrics: [
    { label: 'Wallet', value: 'Stripe-Backed' },
    { label: 'Payouts', value: 'Scheduled' },
    { label: 'Notifications', value: 'Socket.IO + FCM' },
    { label: 'Media CDN', value: 'S3 / CloudFront' },
  ],
  stack: [
    'React',
    'Node.js',
    'MySQL',
    'Socket.io',
    'Stripe',
    'AWS S3',
    'CloudFront',
    'Cloudinary',
    'Firebase FCM',
  ],
  explainMode: {
    interviewPitch:
      "ZPONZ is an expert marketplace with a Stripe-backed wallet — deposits, withdrawals, escrow, and scheduled payouts — built on top of a single reusable drag-and-drop page-builder that also powers the ad dashboard and the admin CMS. The core engineering problem was making the wallet's escrow semantics airtight while keeping three very different surfaces on one component system.",
    talkingPoints: [
      'One page-builder schema (master components + ordered sections) powers landing site, ad dashboard, and admin CMS',
      'Wallet modeled as ledger entries, not a mutable balance — escrow is just an unreleased entry',
      'Scheduled expert payouts run against the ledger with locked balances excluded automatically',
      'Socket.io for in-app real-time events, Firebase Cloud Messaging for mobile/background delivery',
      'AWS S3/CloudFront pipeline serves marketplace media with low-latency edge distribution',
    ],
    tradeoffsExplained:
      'A single balance field is simpler to read but impossible to audit or safely escrow. Ledger entries cost more to aggregate on read but make every dollar traceable and make "funds locked until session completes" a one-line query instead of a special case. The shared page-builder schema took longer to design up front than three bespoke UIs would have, but it means a schema change ships everywhere at once instead of three times.',
  },
};
