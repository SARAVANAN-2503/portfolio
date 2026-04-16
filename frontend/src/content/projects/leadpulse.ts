import type { Project } from './types';

export const leadpulse: Project = {
  slug: 'leadpulse',
  title: 'LeadPulse',
  tagline: 'AI-Powered CRM & Lead Management Platform',
  category: 'AI / CRM',
  status: 'shipped',
  year: '2023',
  highlights: [
    '40% improvement in lead processing efficiency',
    'AI transcription via AssemblyAI for sales calls',
    'Automation pipelines replacing manual follow-up',
    'Full lead lifecycle from capture to conversion',
  ],
  problem:
    'Sales teams were manually transcribing calls, copy-pasting data between tools, and losing leads due to slow follow-up. The CRM needed to auto-capture leads from multiple sources, transcribe and summarize sales calls using AI, and trigger automated nurture workflows — all while giving managers real-time pipeline visibility.',
  architecture:
    'Event-driven pipeline: leads arrive via web form, API, or CSV import and are normalized into a unified schema before entering the lifecycle state machine. AssemblyAI webhooks deliver transcripts asynchronously after call recordings are uploaded to S3; a summarization step extracts action items and sentiment. Automation pipelines are configured as JSON rule trees evaluated on each lead event — a matching rule triggers an action (email, task creation, status change) via a queue worker. The React admin panel subscribes to SSE for live pipeline updates without polling.',
  tradeoffs:
    'Async AI transcription means there is a delay between call upload and transcript availability. We debated synchronous processing but AssemblyAI\'s turnaround (30-90s) would have blocked the UI. Webhooks solved the latency problem but required idempotent handlers — duplicate webhook delivery (a real occurrence) must not create duplicate transcripts. We used a processed_at column on transcript records with a unique constraint on the external job ID.',
  metrics: [
    { label: 'Lead Processing', value: '+40%' },
    { label: 'Manual Tasks Automated', value: '70%' },
    { label: 'Avg Follow-up Time', value: '< 5 min' },
    { label: 'Pipeline Stages', value: '8' },
  ],
  stack: [
    'React',
    'Node.js',
    'MySQL',
    'AssemblyAI',
    'AWS S3',
    'Redis',
    'SSE',
    'JWT Auth',
  ],
  explainMode: {
    interviewPitch:
      "LeadPulse is an AI-powered CRM where the interesting engineering was integrating async AI transcription into a synchronous sales workflow. The challenge: AssemblyAI takes 30-90s per call, but the UI needs to feel responsive. We solved it with webhooks, SSE for live updates, and idempotent handlers to survive duplicate deliveries.",
    talkingPoints: [
      'Event-driven pipeline: lead normalization → lifecycle state machine → automation rule evaluation',
      'AssemblyAI integration via webhooks — async transcript delivery with idempotency guard on external job ID',
      'JSON rule tree automation engine: conditions + actions evaluated on every lead state transition',
      'SSE for live dashboard updates — no polling, server pushes when lead events occur',
      'Idempotent webhook handlers: unique constraint on external job ID prevents duplicate transcript creation',
    ],
    tradeoffsExplained:
      "We could have polled AssemblyAI for transcript status, but polling every 5s for potentially 100 concurrent calls wastes requests and adds latency. Webhooks are push-based and efficient, but require a publicly reachable endpoint and idempotent handling. The tradeoff: more infrastructure complexity (webhook registration, signature verification, dedup logic) in exchange for lower latency and no wasted API calls.",
  },
};
