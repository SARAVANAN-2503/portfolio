import type { Project } from './types';

export const adunity: Project = {
  slug: 'adunity',
  title: 'AdUnity',
  tagline: 'Multi-Tenant CRM & AI Call Analytics Platform',
  category: 'AI / CRM',
  status: 'shipped',
  year: '2023',
  highlights: [
    'Real-estate CRM: lead tracking, site-visit planning, tenant-scoped workflows',
    'Click-to-call with AI transcription and sentiment analysis via AssemblyAI',
    'Real-time incoming-call alerts and duplicate lead detection',
    'Automated lead-expiry actions to boost agent sales velocity',
  ],
  problem:
    'Real-estate sales teams juggle leads across multiple channels and vendors, and the same prospect frequently gets logged twice by different agents. Meanwhile calls happen and the useful information — what the client actually wants, how the call went — lives only in an agent\'s memory unless someone manually writes it up. Every tenant (agency/team) needed strict data isolation, since agencies compete with each other on the same platform.',
  architecture:
    'Tenant-scoped CRM core: leads, site-visit schedules, and team performance analytics are all filtered through a tenant boundary enforced at the query layer. Communication utilities (Aloha, Knowlarity) provide click-to-call directly from a lead record, and every recorded call is sent to AssemblyAI for automated transcription and sentiment analysis, turning a phone call into searchable, structured data attached to the lead. Incoming calls trigger real-time alerts to the owning agent over Socket.IO so a call is never missed while it\'s happening. A duplicate-detection pass runs against new leads on ingestion — matching on phone/contact signals — to stop the same prospect from being worked twice, and a lead-expiry job automatically escalates or closes leads that go stale past a configurable window.',
  tradeoffs:
    'Running sentiment analysis and transcription on every call adds cost and latency versus only transcribing on-demand, but on-demand meant most calls never got transcribed at all because agents rarely went back to request it — defaulting to always-on made the data actually useful. Duplicate detection is a precision/recall tradeoff: too aggressive and it merges genuinely distinct prospects, too lenient and duplicates slip through — we tuned matching to favor fewer false merges since incorrectly merging two leads is harder to undo than missing a duplicate.',
  metrics: [
    { label: 'Domain', value: 'Real Estate CRM' },
    { label: 'AI', value: 'AssemblyAI' },
    { label: 'Call Alerts', value: 'Real-Time' },
    { label: 'Lead Dedup', value: 'Automated' },
  ],
  stack: [
    'React',
    'Node.js',
    'MySQL',
    'Socket.io',
    'AssemblyAI',
    'Knowlarity',
    'Aloha',
  ],
  explainMode: {
    interviewPitch:
      "AdUnity is a multi-tenant real-estate CRM where the interesting engineering wasn't the CRUD — it was turning phone calls into structured data via AssemblyAI, catching duplicate leads before they split an agent's follow-up effort, and keeping every tenant's pipeline strictly isolated on shared infrastructure.",
    talkingPoints: [
      'Tenant boundary enforced at the query layer across leads, site visits, and analytics',
      'Click-to-call via Aloha/Knowlarity feeds recordings straight into AssemblyAI for transcription + sentiment',
      'Real-time incoming-call alerts over Socket.IO so agents never miss a live call',
      'Duplicate-lead detection on ingestion, tuned to favor fewer false merges over catching every duplicate',
      'Automated lead-expiry job escalates or closes stale leads without manual triage',
    ],
    tradeoffsExplained:
      'Always transcribing every call costs more in AssemblyAI usage than transcribing on-demand, but on-demand transcription was effectively unused in practice — agents rarely went back for it, so the data was worthless if it wasn\'t automatic. For duplicate detection we deliberately tuned toward precision over recall: a missed duplicate just means a little redundant outreach, but a false-positive merge silently combines two different prospects, which is much harder to notice and undo.',
  },
};
