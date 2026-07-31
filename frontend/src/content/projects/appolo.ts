import type { Project } from './types';

export const appolo: Project = {
  slug: 'appolo',
  title: 'Appolo Smart Test',
  tagline: 'Enterprise Exam Evaluation & Serverless Processing',
  category: 'Serverless / EdTech',
  status: 'live',
  year: '2025',
  highlights: [
    'Serverless PDF processing pipeline — 90% less manual grading effort',
    'Cursor-based MongoDB pagination — 60% faster API response times',
    'TUS resumable uploads for 500MB+ video files, XSS/injection hardened',
    'Firebase FCM + SQS — 1,000+ concurrent push notifications, zero memory spikes',
  ],
  problem:
    'Processing exam submissions after an exam closes used to mean manual grading and PDF handling — slow, error-prone, and impossible to scale during peak windows. The workload is bursty (zero traffic for weeks, then a flood at exam close) making always-on infrastructure wasteful. Cold starts on serverless functions were adding 3-8 seconds to the first invocation, violating the SLA.',
  architecture:
    'Serverless fan-out pipeline: submission batches hit a REST API (50+ endpoints, JWT RS256 auth) and publish individual processing jobs to SQS. Lambda workers pull jobs, run PDF processing, and write results to MongoDB, with Mongoose plugins and cursor-based pagination keeping list endpoints fast as the collection grows. An Agenda.js job scheduler drives the exam lifecycle itself — timed start/end, auto-submission when a candidate\'s time runs out, and idempotent reminder notifications so a retried job never double-sends. Cold starts are mitigated with provisioned concurrency and a pre-warming cron that fires ahead of known exam windows. A 40+ route React dashboard gives staff a single place to monitor submissions, and video answer uploads go through the TUS protocol for resumable, interruption-proof transfers of 500MB+ files.',
  tradeoffs:
    'Provisioned concurrency eliminates cold starts but costs money even when idle — we sized it to absorb the initial burst while on-demand instances spin up behind it, landing at roughly 60% less cost than an always-on ECS cluster sized for peak. Cursor-based pagination with Mongoose plugins pushed more complexity into query construction than offset pagination would have, but it\'s what took list-endpoint response times down by 60% as submission volume grew. Security was treated as a first-class requirement rather than an afterthought: Helmet, XSS sanitization, MongoDB injection prevention, and rate limiting are applied uniformly across all 50+ endpoints.',
  metrics: [
    { label: 'Manual Effort', value: '-90%' },
    { label: 'API Speed (cursor)', value: '+60%' },
    { label: 'Cost vs Always-On', value: '-60%' },
    { label: 'REST Endpoints', value: '50+' },
  ],
  stack: [
    'AWS Lambda',
    'SQS',
    'S3',
    'MongoDB',
    'Mongoose',
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
      "Appolo Smart Test is a serverless exam evaluation platform — a completely bursty workload that's zero for weeks then floods in at exam close. The interesting engineering was cold-start mitigation on Lambda, an Agenda.js scheduler driving the exam lifecycle itself (timed auto-submission, idempotent reminders), and cursor-based MongoDB pagination that cut API response times by 60%.",
    talkingPoints: [
      'Fan-out: REST API → SQS queue → Lambda workers → MongoDB, with 50+ documented endpoints behind JWT (RS256)',
      'Agenda.js job scheduler: timed exam start/end, auto-submission on timeout, idempotent reminder notifications',
      'Cursor-based MongoDB pagination + Mongoose plugins — 60% faster API response times as data grew',
      'Cold-start mitigation via provisioned concurrency + pre-warming cron ahead of known exam windows',
      'TUS protocol for resumable 500MB+ video uploads that survive flaky connections mid-transfer',
      'Cost: ~60% cheaper than an always-on ECS cluster sized for the same peak load',
    ],
    tradeoffsExplained:
      "Serverless is the right call for a workload that's idle for weeks and then spikes hard — an always-on cluster sized for that peak would sit mostly idle. The cost is cold starts, which we addressed with provisioned concurrency rather than accepting multi-second latency on the first request of a burst. On the data side, cursor pagination is more work to implement correctly than offset pagination, but offset degrades badly exactly when it matters most — during the post-exam flood when everyone is querying submission lists at once.",
  },
};
