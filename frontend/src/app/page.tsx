import Link from 'next/link';
import { ImpactMetrics } from '@/components/landing/ImpactMetrics';
import { Skills3D } from '@/components/landing/Skills3D';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/content/projects';

const techStack = [
  { name: 'React', color: 'text-cyan-400' },
  { name: 'Next.js', color: 'text-slate-200' },
  { name: 'Node.js', color: 'text-green-400' },
  { name: 'TypeScript', color: 'text-blue-400' },
  { name: 'MySQL', color: 'text-orange-400' },
  { name: 'MongoDB', color: 'text-green-500' },
  { name: 'Redis', color: 'text-red-400' },
  { name: 'AWS', color: 'text-amber-400' },
  { name: 'WebSockets', color: 'text-purple-400' },
  { name: 'Docker', color: 'text-sky-400' },
];

export default function Home() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-radial pointer-events-none" />
        <div className="section-container relative py-20 lg:py-28">
          <div className="max-w-3xl">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-3 py-1 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="font-mono text-xs text-green-400 tracking-wide">
                Open to Remote &amp; Hybrid roles
              </span>
            </div>

            {/* Name + role */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Chennai, India
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Hey, I&apos;m{' '}
              <span className="text-gradient">Saravanan</span>
              <br />
              I build things for the web.
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Full-stack developer with 3+ years shipping production systems —
              multi-tenant SaaS, real-time platforms, government-grade APIs, and
              serverless pipelines. I care about clean architecture, measurable
              performance, and code that actually works in production.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-accent-hover transition-colors"
              >
                View my work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/api-explorer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700/50 px-4 py-2.5 text-sm font-medium text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors"
              >
                <span className="font-mono text-accent text-xs">$</span>
                Try live API
              </Link>
            </div>

            {/* Tech stack pills */}
            <div className="mt-10 flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span
                  key={tech.name}
                  className={`font-mono text-xs px-2.5 py-1 rounded-md border border-slate-800/80 bg-slate-800/30 ${tech.color}`}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-container pb-16">
        <ImpactMetrics />
      </section>

      {/* Featured Projects — show first 4 */}
      <section className="section-container pb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Things I&apos;ve Built
          </h2>
          <div className="h-px flex-1 bg-slate-800/60" />
          <Link
            href="/projects"
            className="text-xs font-mono text-slate-500 hover:text-accent transition-colors"
          >
            View all {projects.length} &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {projects.slice(0, 4).map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 hover:border-accent/40 hover:text-accent transition-colors"
          >
            See all {projects.length} projects
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Skills — 3D cards */}
      <section className="border-t border-slate-800/50 bg-navy-950/30">
        <div className="section-container py-16">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">Skills</span>
            <div className="h-px flex-1 bg-slate-800/60" />
            <h2 className="font-display text-2xl font-bold text-slate-100 sr-only">Skills</h2>
          </div>
          <Skills3D />
        </div>
      </section>

      {/* About me strip */}
      <section className="section-container pb-16">
        <div className="card-surface p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
          {/* Avatar placeholder / initials */}
          <div className="shrink-0">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/5 border border-accent/20 flex items-center justify-center">
              <span className="font-display text-3xl font-bold text-accent">S</span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-accent" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">About me</span>
            </div>
            <h2 className="font-display text-xl font-bold text-slate-100 mb-3">
              A developer who loves the full picture
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">
              I&apos;m Saravanan, a full-stack developer based in Chennai, India. I started out building
              internal tools and ERP systems, and over the past 3 years I&apos;ve shipped everything from
              government visa platforms to real-time expert consultation apps and multi-tenant SaaS builders.
            </p>
            <p className="text-slate-400 leading-relaxed text-sm max-w-2xl mt-3">
              I enjoy the intersection of backend architecture and clean frontend UX — writing APIs that
              scale, designing schemas that don&apos;t bite you later, and building UI that feels fast.
              When I&apos;m not coding, I&apos;m probably reading about distributed systems or tinkering with
              something new.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Chennai, India
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
                3+ years experience
              </span>
              <span className="flex items-center gap-1.5 text-xs text-green-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                </svg>
                Open to remote &amp; hybrid
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* System Design Teaser */}
      <section className="border-t border-slate-800/50 bg-navy-950/40">
        <div className="section-container py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            <div>
              <h2 className="font-display text-xl font-bold text-slate-100 mb-3">
                Not Just Code &mdash; Architecture
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Every project includes interactive system diagrams, live API
                endpoints you can test, and performance visualizations comparing
                real approaches.
              </p>
            </div>
            <Link
              href="/api-explorer"
              className="card-surface p-5 hover:border-accent/30 transition-all group"
            >
              <div className="font-mono text-xs text-accent mb-2">
                /api/users?cursor=xyz
              </div>
              <div className="text-sm font-semibold text-slate-200 group-hover:text-accent transition-colors">
                Live API Explorer
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Real endpoints, real latency, real pagination
              </div>
            </Link>
            <Link
              href="/architecture"
              className="card-surface p-5 hover:border-accent/30 transition-all group"
            >
              <div className="font-mono text-xs text-terminal mb-2">
                tenant &rarr; router &rarr; db
              </div>
              <div className="text-sm font-semibold text-slate-200 group-hover:text-accent transition-colors">
                Architecture Diagrams
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Interactive flows for multi-tenant, RBAC, queues
              </div>
            </Link>
            <Link
              href="/performance"
              className="card-surface p-5 hover:border-accent/30 transition-all group border-accent/20"
            >
              <div className="font-mono text-xs text-amber-500 mb-2">
                O(1) vs O(N)
              </div>
              <div className="text-sm font-semibold text-slate-200 group-hover:text-accent transition-colors">
                Performance Lab
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Live cursor vs offset pagination benchmark
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
