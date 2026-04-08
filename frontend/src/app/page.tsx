import Link from 'next/link';
import { ImpactMetrics } from '@/components/landing/ImpactMetrics';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/content/projects';

export default function Home() {
  return (
    <div className="pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-glow-radial pointer-events-none" />
        <div className="section-container relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">
                Senior Full-Stack Engineer
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Building production
              <br />
              systems that{' '}
              <span className="text-gradient">scale</span>
            </h1>

            <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
              Multi-tenant SaaS with 200+ isolated tenants. Government platforms
              processing 800+ visa applications daily. Real-time WebSocket systems
              serving 5,000+ concurrent users. Serverless pipelines that cost 60%
              less than always-on infrastructure.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-accent-hover transition-colors"
              >
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/api-explorer"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:border-slate-600 hover:text-slate-100 transition-colors"
              >
                <span className="font-mono text-accent text-xs">$</span>
                Try the API
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-container pb-16">
        <ImpactMetrics />
      </section>

      {/* Featured Projects */}
      <section className="section-container pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold text-slate-100">
            Featured Work
          </h2>
          <div className="h-px flex-1 bg-slate-800/60" />
          <Link
            href="/projects"
            className="text-xs font-mono text-slate-500 hover:text-accent transition-colors"
          >
            View all &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
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
