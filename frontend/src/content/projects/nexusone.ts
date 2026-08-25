import type { Project } from './types';

export const nexusone: Project = {
  slug: 'nexusone',
  title: 'NexusOne.coach',
  tagline: 'LMS, Live Classes & Coaching Platform',
  category: 'LMS / Coaching',
  status: 'shipped',
  year: '2024',
  highlights: [
    'Courses, live Zoom classes, cohort management, automated assessments',
    'RBAC permission controls with Socket.IO-driven attendance tracking',
    'Stripe Checkout, Subscriptions & Connect for instructor payouts',
    'Automated live-class reminders via Zoom SDK, Google Calendar and Firebase',
  ],
  problem:
    'Coaches and course creators running live cohort-based programs need more than a video call link. They need enrollment, scheduling, attendance that actually reflects who showed up, automated assessments, and a way to get paid per-instructor across potentially many collaborators on one platform. Most LMS tools handle content well and live delivery poorly, or vice versa.',
  architecture:
    'Full-stack coaching platform architected around three pillars: content (courses, cohorts, automated assessments), live delivery (Zoom Meeting SDK sessions scheduled against Google Calendar, with Socket.IO tracking join/leave events to build real attendance records instead of trusting self-reported presence), and money (Stripe Checkout for one-off purchases, Subscriptions for recurring cohort access, and Connect for splitting payouts to instructors). REST APIs are guarded by a comprehensive RBAC layer, students, instructors, and admins see different capabilities from the same endpoints, and every privileged action writes to an audit log. Firebase drives the notification layer: automated reminders fire ahead of live classes and engagement nudges go out based on activity.',
  tradeoffs:
    'Deriving attendance from Socket.IO join/leave events instead of a manual instructor checklist is more accurate but more fragile, a flaky connection can look like a student left when they didn\'t, so the attendance record reconciles brief disconnects (under a threshold) rather than logging every blip as a leave event. Using Stripe Connect for instructor payouts pushed onboarding complexity onto each instructor (they must complete Stripe\'s own KYC), but it moved compliance and payout-timing risk off the platform entirely rather than the platform holding and manually disbursing funds.',
  metrics: [
    { label: 'Live Classes', value: 'Zoom SDK' },
    { label: 'Billing', value: 'Checkout / Sub / Connect' },
    { label: 'Attendance', value: 'Socket.IO' },
    { label: 'Access Control', value: 'RBAC' },
  ],
  stack: [
    'React',
    'Node.js',
    'MySQL',
    'Socket.io',
    'Stripe',
    'Zoom SDK',
    'Google Calendar API',
    'Firebase',
    'RBAC',
  ],
  explainMode: {
    interviewPitch:
      "NexusOne.coach is a coaching and LMS platform where content, live delivery, and payouts had to work as one system rather than three bolted-together tools. The engineering focus was on RBAC that actually holds up across student/instructor/admin roles, attendance derived from real socket events instead of self-reporting, and Stripe Connect for multi-instructor payouts.",
    talkingPoints: [
      'Three pillars: content (courses/cohorts/assessments), live delivery (Zoom SDK + Socket.IO attendance), money (Stripe Checkout/Subscriptions/Connect)',
      'RBAC permission layer evaluated per-endpoint: same API surface, different capabilities by role',
      'Attendance built from Socket.IO join/leave events with a reconnect-tolerance window, not manual checklists',
      'Stripe Connect splits payouts to individual instructors without the platform holding funds',
      'Automated reminder pipeline: Zoom SDK schedule + Google Calendar + Firebase notifications',
      'Every privileged action writes an audit log entry for accountability across roles',
    ],
    tradeoffsExplained:
      'Real attendance data from socket events is far more trustworthy than instructor-reported attendance, but raw disconnect events are noisy, we added a short reconciliation window so a dropped wifi connection doesn\'t falsely mark a student absent. Stripe Connect means every instructor completes their own onboarding/KYC before they can get paid, which is friction at signup, but it means the platform never touches compliance or payout timing risk for funds that aren\'t ours.',
  },
};
