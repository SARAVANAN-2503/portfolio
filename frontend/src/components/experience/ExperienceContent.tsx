'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, GraduationCap } from 'lucide-react';
import { ContentHeader } from '@/components/ui/ContentHeader';
import {
  getProjectsByEmployer,
  getFreelanceProjects,
  getExternalLink,
  type Project,
} from '@/content/projects';

/* ─── Data ──────────────────────────────────────────────────────────────────── */

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
    period: 'May 2024 - Present',
    duration: '1 yr+',
    current: true,
    color: 'emerald',
    summary:
      'Building production SaaS, marketplace, and LMS platforms end-to-end. Leading architectural decisions on multi-tenant isolation, wallet/payment flows, RBAC, and real-time infrastructure across four shipped products.',
    projects: getProjectsByEmployer('gnxtace'),
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
    period: 'June 2022 - May 2024',
    duration: '2 yrs',
    current: false,
    color: 'blue',
    summary:
      'Built an AI-integrated real-estate CRM and a multi-tenant ERP/POS SaaS platform. Focused heavily on backend performance, tenant-scoped data isolation, and API design across React and Vue frontends.',
    projects: getProjectsByEmployer('jnana'),
    skills: [
      'React', 'Vue.js', 'Node.js', 'Laravel', 'MySQL', 'Socket.IO', 'AssemblyAI',
      'Stripe', 'Razorpay', 'JWT', 'REST APIs', 'Event-Driven Architecture',
    ],
  },
];

/* ─── Freelance ─────────────────────────────────────────────────────────────── */

const freelanceProject = getFreelanceProjects()[0];
const freelanceExternalLink = freelanceProject ? getExternalLink(freelanceProject.slug) : null;

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
    <div className="group h-full rounded-[var(--radius)] border border-line p-5 transition-colors hover:border-line-strong hover:bg-surface">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h4 className="display text-base text-ink transition-colors group-hover:text-volt-text">
            {project.title}
          </h4>
          <p className="mt-0.5 font-mono text-xs text-grey-muted">{project.tagline}</p>
        </div>
        {project.hasCaseStudy && (
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

  return project.hasCaseStudy ? (
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
          title="Work Experience"
          description="4+ years designing, building, and deploying scalable SaaS, LMS, CRM, and real-time web applications, from architectural decisions to shipped features."
        />

        {/* Summary strip */}
        {/* Hairline row rather than four centred cards: these are a caption
            on the page, not four separate objects competing with the H1. */}
        <div className="mb-20 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-8 sm:grid-cols-4">
          {[
            { label: 'Years Experience', value: '4+' },
            { label: 'Production Apps', value: '10+' },
            { label: 'Companies', value: '2' },
            { label: 'Open to', value: 'Remote / Hybrid' },
          ].map(s => (
            <div key={s.label}>
              <div className="display text-[clamp(1.5rem,2.4vw,2rem)] text-ink">{s.value}</div>
              <div className="mt-1.5 text-[13px] text-muted">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Track + animated progress line */}
          <div className="absolute top-0 bottom-0 left-5 hidden w-px bg-line sm:block" />
          <motion.div
            className="absolute top-0 left-5 hidden w-px origin-top bg-volt-text sm:block"
            style={{ scaleY: reduce ? 1 : progress, height: '100%' }}
          />

          <div className="space-y-16">
            {experience.map(job => {
              const c = colorMap[job.color] ?? colorMap.blue;
              return (
                <TimelineEntry key={job.company} markerColor={c.dot}>
                  {/* Sticky company header */}
                  <div className="sticky top-16 z-10 mb-6 bg-paper/90 py-3 backdrop-blur-sm">
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <h2 className="display text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink">
                        {job.company}
                      </h2>
                      {job.current && (
                        <span className="rounded-[var(--radius)] bg-volt px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wide text-[#171612]">
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
                      <ProjectBlock key={p.id} project={p} />
                    ))}
                  </div>

                  {/* Skills used */}
                  <div>
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
            {freelanceProject && (
            <TimelineEntry markerColor="bg-crimson-bright ring-crimson-bright/30">
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <h2 className="display text-[clamp(1.5rem,2.6vw,2.125rem)] text-ink">Freelance</h2>
                  <span className="inline-flex items-center rounded-full border border-crimson-bright/30 bg-crimson-bright/10 px-2.5 py-0.5 font-mono text-xs text-crimson-bright">
                    {freelanceProject.year ?? '2025'}
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
                        {freelanceProject.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 rounded-full border border-live/30 bg-live/10 px-2 py-0.5 font-mono text-[10px] text-live">
                        ● Live
                      </span>
                    </div>
                    <p className="text-sm text-grey">{freelanceProject.tagline}</p>
                    {freelanceExternalLink?.url && (
                      <a
                        href={freelanceExternalLink.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="mt-0.5 inline-block font-mono text-xs text-crimson-bright/80 transition-colors hover:text-crimson-bright"
                      >
                        {freelanceExternalLink.label} ↗
                      </a>
                    )}
                  </div>
                  <Link
                    href={`/projects/${freelanceProject.slug}`}
                    className="shrink-0 whitespace-nowrap font-mono text-[10px] text-grey-muted transition-colors hover:text-crimson"
                  >
                    case study →
                  </Link>
                </div>

                <div className="mb-5 grid gap-x-6 gap-y-1.5 border-l border-crimson-bright/20 pl-3 sm:grid-cols-2">
                  {freelanceProject.highlights.map(h => (
                    <div key={h} className="text-xs leading-relaxed text-grey">
                      {h}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {freelanceProject.stack.map(t => (
                    <span key={t} className="tag text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </TimelineEntry>
            )}

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
                    <h3 className="display text-base text-ink">B.Sc. Electronics &amp; Communication</h3>
                    <p className="mt-0.5 text-sm text-grey">SRM Arts &amp; Science College</p>
                    <p className="mt-1 font-mono text-xs text-grey-muted">2018 - 2021</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="display text-xl text-ink">7.8</div>
                    <div className="text-[10px] text-grey-muted">CGPA</div>
                  </div>
                </div>
              </div>
            </TimelineEntry>

          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 border-t border-line pt-14">
          <h3 className="display max-w-[18ch] text-section-h2 text-ink">
            Want to work together?
          </h3>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted">
            I&apos;m actively looking for remote and hybrid full-stack roles.
            Let&apos;s build something great.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
            <Link
              href="/projects"
              className="btn-ghost"
            >
              View work
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
