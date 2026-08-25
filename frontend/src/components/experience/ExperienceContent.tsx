'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, GraduationCap } from 'lucide-react';
import { ContentHeader } from '@/components/ui/ContentHeader';

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

const colorMap: Record<string, { dot: string; tag: string; badge: string; text: string }> = {
  emerald: {
    dot: 'bg-crimson ring-crimson/30',
    tag: 'border-crimson/20 text-crimson bg-crimson/10',
    badge: 'border-crimson/30 text-crimson bg-crimson/10',
    text: 'text-crimson',
  },
  blue: {
    dot: 'bg-grey ring-grey/30',
    tag: 'border-line-strong text-grey bg-surface-2/60',
    badge: 'border-line-strong text-grey bg-surface-2/60',
    text: 'text-ivory',
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

function ProjectBlock({ project }: { project: Project }) {
  const inner = (
    <div className="group h-full rounded-lg border border-line bg-surface-2/30 p-5 transition-all hover:border-crimson/30 hover:bg-surface-2/50">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-bold text-ivory transition-colors group-hover:text-crimson">
            {project.name}
          </h4>
          <p className="mt-0.5 font-mono text-xs text-grey-muted">{project.tagline}</p>
        </div>
        {project.slug && (
          <span className="shrink-0 font-mono text-[10px] text-grey-muted transition-colors group-hover:text-crimson">
            case study →
          </span>
        )}
      </div>

      <ul className="mb-4 space-y-1.5 border-l border-line pl-3">
        {project.highlights.map(h => (
          <li key={h} className="text-xs leading-relaxed text-grey">
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 border-t border-line pt-3">
        {project.stack.map(t => (
          <span key={t} className="tag text-[10px]">{t}</span>
        ))}
      </div>
    </div>
  );

  return project.slug ? (
    <Link href={`/projects/${project.slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright rounded-lg">{inner}</Link>
  ) : (
    inner
  );
}

function TimelineEntry({
  markerColor,
  children,
}: {
  markerColor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative sm:pl-16">
      <div className={`absolute left-3.5 top-2 hidden h-3 w-3 rounded-full ring-4 ring-offset-2 ring-offset-obsidian sm:flex ${markerColor}`} />
      {children}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────────── */

export function ExperienceContent() {
  const reduce = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.15', 'end 0.85'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="pt-14">
      <div className="section-container py-16">

        {/* Header */}
        <ContentHeader
          eyebrow="Career"
          title="Work Experience"
          description="4+ years designing, building, and deploying scalable SaaS, LMS, CRM, and real-time web applications, from architectural decisions to shipped features."
        />

        {/* Summary strip */}
        <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Years Experience', value: '4+' },
            { label: 'Production Apps', value: '10+' },
            { label: 'Companies', value: '2' },
            { label: 'Open to', value: 'Remote / Hybrid' },
          ].map(s => (
            <div key={s.label} className="rounded-lg border border-line bg-surface-2/30 px-4 py-4 text-center">
              <div className="font-mono text-xl font-black text-crimson">{s.value}</div>
              <div className="mt-0.5 text-[11px] text-grey-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Track + animated progress line */}
          <div className="absolute top-0 bottom-0 left-5 hidden w-px bg-line sm:block" />
          <motion.div
            className="absolute top-0 left-5 hidden w-px origin-top bg-crimson sm:block"
            style={{ scaleY: reduce ? 1 : progress, height: '100%' }}
          />

          <div className="space-y-16">
            {experience.map(job => {
              const c = colorMap[job.color] ?? colorMap.blue;
              return (
                <TimelineEntry key={job.company} markerColor={c.dot}>
                  {/* Sticky company header */}
                  <div className="sticky top-16 z-10 mb-6 bg-obsidian/90 py-2 backdrop-blur-sm">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl font-bold text-ivory">
                        {job.company}
                      </h2>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-live/30 bg-live/10 px-2.5 py-0.5 font-mono text-xs text-live">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-live opacity-75" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
                          </span>
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-grey">
                      <span className={`font-semibold ${c.text}`}>{job.role}</span>
                      <span className="text-grey-muted">
                        {job.location} · {job.period}
                      </span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[10px] ${c.badge}`}>
                        {job.duration}
                      </span>
                    </div>

                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-grey">
                      {job.summary}
                    </p>
                  </div>

                  {/* Projects */}
                  <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {job.projects.map(p => (
                      <ProjectBlock key={p.name} project={p} />
                    ))}
                  </div>

                  {/* Skills used */}
                  <div>
                    <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-grey-muted">
                      Skills used at {job.company}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.map(s => (
                        <SkillTag key={s} label={s} colorCls={c.tag} />
                      ))}
                    </div>
                  </div>
                </TimelineEntry>
              );
            })}

            {/* Freelance */}
            <TimelineEntry markerColor="bg-crimson-bright ring-crimson-bright/30">
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-ivory">Freelance</h2>
                  <span className="inline-flex items-center rounded-full border border-crimson-bright/30 bg-crimson-bright/10 px-2.5 py-0.5 font-mono text-xs text-crimson-bright">
                    {freelance.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-grey">
                  <span className="font-semibold text-crimson-bright">Full Stack Developer</span>
                  <span className="text-grey-muted">·</span>
                  <span className="font-mono text-xs">Remote</span>
                </div>
              </div>

              {/* Freelance project card */}
              <div className="rounded-xl border border-crimson-bright/25 bg-linear-to-br from-crimson-bright/10 to-surface p-6 transition-all hover:border-crimson-bright/45 hover:shadow-[0_0_32px_-8px_rgba(255,90,101,0.25)]">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-ivory">
                        {freelance.project}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-live/30 bg-live/10 px-2 py-0.5 font-mono text-[10px] text-live">
                        ● Live
                      </span>
                    </div>
                    <p className="text-sm text-grey">{freelance.tagline}</p>
                    <a
                      href={freelance.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-block font-mono text-xs text-crimson-bright/80 transition-colors hover:text-crimson-bright"
                    >
                      {freelance.url.replace('https://', '')} ↗
                    </a>
                  </div>
                  <Link
                    href={`/projects/${freelance.slug}`}
                    className="shrink-0 whitespace-nowrap font-mono text-[10px] text-grey-muted transition-colors hover:text-crimson"
                  >
                    case study →
                  </Link>
                </div>

                <div className="mb-5 grid gap-x-6 gap-y-1.5 border-l border-crimson-bright/20 pl-3 sm:grid-cols-2">
                  {freelance.highlights.map(h => (
                    <div key={h} className="text-xs leading-relaxed text-grey">
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {freelance.stack.map(t => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </TimelineEntry>

            {/* Education */}
            <TimelineEntry markerColor="bg-grey-muted ring-grey-muted/30">
              <div className="mb-2">
                <h2 className="font-display text-xl font-bold text-ivory">Education</h2>
              </div>
              <div className="card-surface flex max-w-lg items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2/60 text-grey-muted">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-ivory">B.Sc. Electronics &amp; Communication</h3>
                    <p className="mt-0.5 text-sm text-grey">SRM Arts &amp; Science College</p>
                    <p className="mt-1 font-mono text-xs text-grey-muted">2018 – 2021</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-lg font-bold text-crimson">7.8</div>
                    <div className="text-[10px] text-grey-muted">CGPA</div>
                  </div>
                </div>
              </div>
            </TimelineEntry>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 rounded-xl border border-line bg-elevated/60 p-8 text-center">
          <h3 className="mb-2 font-display text-section-h2 font-bold tracking-tight text-ivory">
            Want to work together?
          </h3>
          <p className="mx-auto mb-6 max-w-md text-sm text-grey">
            I&apos;m actively looking for remote and hybrid full-stack roles. Let&apos;s build something great.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-crimson px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-crimson-bright active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              Get in touch
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:border-crimson/40 hover:text-crimson active:scale-[0.97]"
            >
              View selected work
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
