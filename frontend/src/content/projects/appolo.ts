import type { Project } from './types';

export const appolo: Project = {
  slug: 'appolo',
  title: 'Appolo Smart Test',
  tagline: 'Enterprise Exam Evaluation & Serverless Processing',
  category: 'Serverless / EdTech',
  status: 'live',
  year: '2025',
  highlights: [
    '10,000+ exam submissions processed per 2-hr window',
    'Serverless cost 60% less than always-on ECS',
    'TUS resumable uploads for 500MB+ video files',
    'Firebase FCM + SQS — 1,000+ concurrent push notifications',
  ],
  problem:
    'Processing 10,000+ exam submissions within a 2-hour window after an exam closes. Each submission requires OCR on handwritten answer sheets, scoring against a rubric, and generating individual feedback reports. The workload is bursty (zero traffic for weeks, then a tsunami) making always-on infrastructure wasteful. Cold starts on serverless functions were adding 3-8 seconds to the first invocation, violating the SLA.',
  architecture:
    'Fan-out queue architecture: an API endpoint receives submission batches and publishes individual scoring jobs to an SQS-compatible queue. Lambda workers pull jobs, run OCR + scoring, and write results to DynamoDB. A separate aggregation Lambda fires when all jobs for an exam complete (tracked via an atomic counter in DynamoDB) to generate the class-wide analytics report. Cold starts are mitigated with provisioned concurrency for the first 50 workers and a pre-warming cron that fires 5 minutes before known exam windows.',
  tradeoffs:
    "Provisioned concurrency eliminates cold starts but costs money even when idle. We profiled: 50 provisioned instances handle the initial burst while on-demand instances spin up behind them. Total cost is ~60% less than an always-on ECS cluster sized for peak. The DynamoDB atomic counter for completion tracking is simpler than a Step Functions orchestration but can't handle partial retries as gracefully — a failed job requires manual re-enqueue rather than automatic retry with backoff.",
  metrics: [
    { label: 'Submissions/Window', value: '10,000+' },
    { label: 'Processing Time', value: '< 45min' },
    { label: 'Cold Start', value: '< 500ms' },
    { label: 'Cost vs Always-On', value: '-60%' },
  ],
  stack: [
    'AWS Lambda',
    'SQS',
    'S3',
    'MongoDB',
    'React',
    'Node.js',
    'Razorpay',
    'Firebase FCM',
    'TUS Protocol',
    'Agenda.js',
    'JWT (RS256)',
  ],
  explainMode: {
    interviewPitch:
      "Appolo processes 10K+ exam submissions in a 2-hour window — a completely bursty workload that's zero for weeks then a tsunami. The interesting engineering was around cold-start mitigation (provisioned concurrency + pre-warming cron) and completion tracking (DynamoDB atomic counter vs Step Functions).",
    talkingPoints: [
      'Fan-out: API → SQS queue → Lambda workers → results → aggregation trigger',
      'Cold-start mitigation: 50 provisioned instances absorb initial burst while on-demand scales behind',
      'Pre-warming cron fires 5 minutes before known exam windows based on schedule metadata',
      'DynamoDB atomic counter tracks completed jobs — simpler than Step Functions for this fan-out pattern',
      'Cost: ~60% cheaper than always-on ECS sized for peak, profiled over 6 exam cycles',
    ],
    tradeoffsExplained:
      "Step Functions would give us built-in retry, backoff, and visual execution tracking. But the fan-out pattern (10K parallel jobs, each independent) doesn't benefit from Step Functions' orchestration — it's embarrassingly parallel. The atomic counter is 3 lines of DynamoDB code vs a complex state machine. The tradeoff is manual re-enqueue on failure, which we handle with a dead-letter queue that a cron processes hourly.",
  },
};
