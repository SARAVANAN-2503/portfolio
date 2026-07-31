import type { Metadata } from 'next/types';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Experience',
  description: 'Work history of Saravanan Ramesh — Full Stack Developer with 4+ years across SaaS, government, marketplace, and CRM domains.',
};

/* ─── Data ──────────────────────────────────────────────────────────────────── */

interface Project {
  name: string;
  tagline: string;
  stack: string[];
  slug?: string; // links to /projects/[slug] if present
  highlights: string[];
}

interface Job {
  company: string;
  role: string;
  location: string;
  period: string;
  duration: string;
  current: boolean;
  summary: string;
  projects: Project[];
  skills: string[];
  color: string;        // Tailwind color token stem, e.g. 'emerald'
}

const experience: Job[] = [
  {
    company: 'Gnxtace Technology',
    role: 'Full Stack Developer',
    location: 'Chennai, India',
    period: 'May 2024 – Present',
    duration: '1 yr+',
    current: true,
    color: 'emerald',
    summary:
      'Building production SaaS, marketplace, and LMS platforms end-to-end. Leading architectural decisions on multi-tenant isolation, wallet/payment flows, RBAC, and real-time infrastructure across four shipped products.',
    projects: [
      {
        name: 'NexusOne.coach',
        tagline: 'LMS, Live Classes & Coaching Platform',
        stack: ['React', 'Node.js', 'MySQL', 'Socket.IO', 'Stripe', 'Zoom SDK'],
        slug: 'nexusone',
        highlights: [
          'Architected a full-stack coaching/LMS platform: courses, live Zoom classes, cohorts, automated assessments',
          'Secure REST APIs, comprehensive RBAC/permission controls, Socket.IO-driven attendance tracking, audit logging',
          'Integrated Stripe (Checkout/Subscriptions/Connect), Zoom Meeting SDK, Google Calendar, and Firebase',
          'Automated live-class reminders and engagement notifications',
        ],
      },
      {
        name: 'Seltrix',
        tagline: 'Multi-Tenant Website Builder & Template Commerce Platform',
        stack: ['Next.js', 'Node.js', 'MySQL', 'Stripe', 'Cloudinary'],
        slug: 'seltrix',
        highlights: [
          'Developed a multi-tenant SaaS website builder with custom-domain publishing',
          'Template marketplace for buying and selling reusable page templates',
          'Dynamic public tenant rendering resolves tenant identity per request',
        ],
      },
      {
        name: 'GovPass',
        tagline: 'Government Visa Application Management System',
        stack: ['React', 'Node.js', 'MySQL', 'AWS S3', 'Stripe', 'Square'],
        slug: 'govpass',
        highlights: [
          'Replaced paper-based workflow — error rate dropped from 30% to < 2%',
          'Event-sourced audit log satisfying 7-year regulatory retention',
          'RBAC permission matrix for 15+ officer roles evaluated at middleware',
          'Fault-tolerant payment flows with retry, idempotency, and failure handling',
        ],
      },
      {
        name: 'ZPONZ',
        tagline: 'Expert Marketplace, Wallet & CMS Platform',
        stack: ['React', 'Node.js', 'MySQL', 'Socket.IO', 'Stripe', 'AWS S3/CloudFront'],
        slug: 'zponz',
        highlights: [
          'Reusable drag-and-drop page-builder: master components, layout configs, ordered schema sections',
          'Stripe automated billing, DNS verification flows, and Cloudinary media asset management',
          'Expert monetization marketplace: landing site, ad dashboard, centralized admin CMS',
          'Stripe-backed wallet: deposits, withdrawals, transfers, escrow/locked balances, scheduled payouts',
          'Real-time notifications via Socket.IO and Firebase Cloud Messaging + AWS S3/CloudFront media pipeline',
        ],
      },
    ],
    skills: [
      'Next.js', 'React', 'Node.js', 'Express.js', 'MySQL', 'Socket.IO', 'Stripe',
      'Zoom SDK', 'Firebase/FCM', 'AWS S3/CloudFront', 'Cloudinary', 'JWT', 'OAuth',
      'RBAC', 'Multi-Tenancy', 'Square', 'Swagger/OpenAPI',
    ],
  },
  {
    company: 'Jnana Inventive Pvt Ltd',
    role: 'Full Stack Developer',
    location: 'Chennai, India',
    period: 'June 2022 – May 2024',
    duration: '2 yrs',
    current: false,
    color: 'blue',
    summary:
      'Built an AI-integrated real-estate CRM and a multi-tenant ERP/POS SaaS platform. Focused heavily on backend performance, tenant-scoped data isolation, and API design across React and Vue frontends.',
    projects: [
      {
        name: 'AdUnity',
        tagline: 'Multi-Tenant CRM & AI Call Analytics Platform',
        stack: ['React', 'Node.js', 'SQL', 'Socket.IO', 'AssemblyAI'],
        slug: 'adunity',
        highlights: [
          'Real-estate CRM: lead tracking, site-visit planning, team performance analytics, tenant-scoped workflows',
          'Integrated Aloha & Knowlarity communication utilities and AssemblyAI for click-to-call, transcription, sentiment analysis',
          'Real-time incoming-call alerts, duplicate lead detection, automated lead-expiry actions',
        ],
      },
      {
        name: 'QuickBizz',
        tagline: 'Multi-Tenant ERP/POS SaaS Platform',
        stack: ['Laravel', 'Vue.js', 'MySQL', 'Stripe', 'Razorpay'],
        highlights: [
          'Co-developed a secure ERP/POS SaaS platform with company-level tenant isolation',
          'Retail workflows: POS billing, multi-warehouse inventory, purchases, online storefronts, PDF invoicing',
          'Usage-based subscription billing across 15 distinct functional modules with automated overdue restrictions',
        ],
      },
    ],
    skills: [
      'React', 'Vue.js', 'Node.js', 'Laravel', 'MySQL', 'Socket.IO', 'AssemblyAI',
      'Stripe', 'Razorpay', 'JWT', 'REST APIs', 'Event-Driven Architecture',
    ],
  },
];

/* ─── Freelance ─────────────────────────────────────────────────────────────── */

const freelance = {
  period: '2025',
  project: 'Appolo Smart Test',
  tagline: 'Enterprise Exam Evaluation Platform',
  url: 'https://appolosmarttest.com',
  slug: 'appolo',
  stack: ['AWS Lambda', 'SQS', 'S3', 'MongoDB', 'React', 'Node.js', 'Firebase FCM', 'Razorpay'],
  highlights: [
    'Serverless PDF processing pipeline (AWS Lambda, S3, SQS) — reduced manual effort by 90%',
    'Firebase Cloud Messaging + SQS queue worker notifications — 1,000+ concurrent pushes, no memory spikes',
    'Agenda.js job scheduler: timed start/end, auto-submission on timeout, idempotent reminder notifications',
    'Scalable REST APIs — 50+ endpoints, JWT auth (RS256), validation, structured logging',
    'Responsive React dashboard — 40+ routes, optimized state management',
    'Razorpay LMS subscriptions + cursor-based MongoDB pagination — 60% faster API responses',
    'TUS resumable uploads for 500MB+ video files; Helmet, XSS sanitization, injection prevention, rate limiting',
  ],
};

/* ─── Color helpers ──────────────────────────────────────────────────────────── */

const colorMap: Record<string, { line: string; dot: string; tag: string; badge: string; text: string }> = {
  emerald: {
    line:  'bg-emerald-500/30',
    dot:   'bg-emerald-500 ring-emerald-500/30',
    tag:   'border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
    badge: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    text:  'text-emerald-400',
  },
  blue: {
    line:  'bg-blue-500/30',
    dot:   'bg-blue-500 ring-blue-500/30',
    tag:   'border-blue-500/20 text-blue-400 bg-blue-500/10',
    badge: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    text:  'text-blue-400',
  },
};

/* ─── Components ─────────────────────────────────────────────────────────────── */

function SkillTag({ label, colorCls }: { label: string; colorCls: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-mono ${colorCls}`}>
      {label}
    </span>
  );
}

function ProjectBlock({ project, color }: { project: Project; color: typeof colorMap[string] }) {
  const inner = (
    <div className="rounded-lg border border-slate-800/60 bg-navy-800/40 p-5 hover:border-accent/30 hover:bg-navy-800/60 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-display text-base font-bold text-slate-200 group-hover:text-accent transition-colors">
            {project.name}
          </h4>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">{project.tagline}</p>
        </div>
        {project.slug && (
          <span className="shrink-0 font-mono text-[10px] text-slate-600 group-hover:text-accent/60 transition-colors">
            case study →
          </span>
        )}
      </div>

      {/* Highlights */}
      <ul className="space-y-1.5 mb-4">
        {project.highlights.map(h => (
          <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
            <span className={`mt-1 shrink-0 w-1 h-1 rounded-full ${color.dot.split(' ')[0]}`} />
            {h}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/40">
        {project.stack.map(t => (
          <span key={t} className="tag text-[10px]">{t}</span>
        ))}
      </div>
    </div>
  );

  return project.slug ? (
    <Link href={`/projects/${project.slug}`}>{inner}</Link>
  ) : (
    inner
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export default function ExperiencePage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">

        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">Career</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-100 sm:text-4xl">
            Work Experience
          </h1>
          <p className="mt-3 text-slate-400 leading-relaxed">
            4+ years designing, building, and deploying scalable SaaS, LMS, CRM, and real-time
            web applications — from architectural decisions to shipped features.
          </p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-14">
          {[
            { label: 'Years Experience', value: '4+' },
            { label: 'Production Apps', value: '10+' },
            { label: 'Companies', value: '2' },
            { label: 'Open to', value: 'Remote / Hybrid' },
          ].map(s => (
            <div key={s.label} className="rounded-lg border border-slate-800/60 bg-navy-700/30 px-4 py-4 text-center">
              <div className="font-mono text-xl font-black text-accent">{s.value}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-slate-800/60 hidden sm:block" />

          <div className="space-y-16">
            {experience.map(job => {
              const c = colorMap[job.color] ?? colorMap.blue;
              return (
                <div key={job.company} className="relative sm:pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-3.5 top-2 hidden sm:flex w-3 h-3 rounded-full ring-4 ring-offset-2 ring-offset-navy-900 ${c.dot}`} />

                  {/* Job header */}
                  <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-display text-2xl font-bold text-slate-100">
                        {job.company}
                      </h2>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-mono text-green-400">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                          </span>
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                      <span className={`font-semibold ${c.text}`}>{job.role}</span>
                      <span className="text-slate-600">·</span>
                      <span>{job.location}</span>
                      <span className="text-slate-600">·</span>
                      <span className="font-mono text-xs">{job.period}</span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono ${c.badge}`}>
                        {job.duration}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-2xl">
                      {job.summary}
                    </p>
                  </div>

                  {/* Projects */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
                    {job.projects.map(p => (
                      <ProjectBlock key={p.name} project={p} color={c} />
                    ))}
                  </div>

                  {/* Skills used */}
                  <div>
                    <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest mb-2">
                      Skills used at {job.company}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map(s => (
                        <SkillTag key={s} label={s} colorCls={c.tag} />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Freelance */}
            <div className="relative sm:pl-16">
              <div className="absolute left-3.5 top-2 hidden sm:flex w-3 h-3 rounded-full bg-amber-500 ring-4 ring-amber-500/30 ring-offset-2 ring-offset-navy-900" />

              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-display text-2xl font-bold text-slate-100">Freelance</h2>
                  <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-mono text-amber-400">
                    {freelance.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                  <span className="font-semibold text-amber-400">Full Stack Developer</span>
                  <span className="text-slate-600">·</span>
                  <span className="font-mono text-xs">Remote</span>
                </div>
              </div>

              {/* Freelance project card */}
              <div className="rounded-xl border border-amber-500/20 bg-linear-to-br from-amber-900/20 to-navy-800/40 p-6 hover:border-amber-500/40 hover:shadow-[0_0_32px_-8px_rgba(245,158,11,0.2)] transition-all">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display text-lg font-bold text-slate-100">
                        {freelance.project}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[10px] font-mono text-green-400">
                        ● Live
                      </span>
                    </div>
                    <p className="text-sm text-slate-400">{freelance.tagline}</p>
                    <a
                      href={freelance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-amber-500/70 hover:text-amber-400 transition-colors mt-0.5 inline-block"
                    >
                      {freelance.url.replace('https://', '')} ↗
                    </a>
                  </div>
                  <Link
                    href={`/projects/${freelance.slug}`}
                    className="shrink-0 font-mono text-[10px] text-slate-600 hover:text-accent/60 transition-colors whitespace-nowrap"
                  >
                    case study →
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
                  {freelance.highlights.map(h => (
                    <div key={h} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-amber-500" />
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/40">
                  {freelance.stack.map(t => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative sm:pl-16">
              <div className="absolute left-3.5 top-2 hidden sm:flex w-3 h-3 rounded-full bg-slate-600 ring-4 ring-slate-600/30 ring-offset-2 ring-offset-navy-900" />
              <div className="mb-2">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="font-display text-xl font-bold text-slate-200">Education</h2>
                </div>
              </div>
              <div className="card-surface p-5 max-w-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-200">B.Sc. Electronics &amp; Communication</h3>
                    <p className="text-sm text-slate-400 mt-0.5">SRM Arts &amp; Science College</p>
                    <p className="font-mono text-xs text-slate-600 mt-1">2018 – 2021</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono text-lg font-bold text-accent">7.8</div>
                    <div className="text-[10px] text-slate-600">CGPA</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-xl border border-slate-800/60 bg-navy-800/30 p-8 text-center">
          <p className="font-mono text-xs text-accent uppercase tracking-widest mb-3">Open to opportunities</p>
          <h3 className="font-display text-2xl font-bold text-slate-100 mb-2">
            Want to work together?
          </h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            I&apos;m actively looking for remote and hybrid full-stack roles. Let&apos;s build something great.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-navy-900 hover:bg-accent-hover transition-colors"
            >
              Get in touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-accent/40 hover:text-accent transition-colors"
            >
              See my work
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
