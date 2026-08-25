import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { projects, getProject } from '@/content/projects';
import { ExplainMode } from '@/components/projects/ExplainMode';
import { ProjectVisual } from '@/components/projects/ProjectVisual';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.tagline} — ${project.problem.split('.')[0]}.`,
  };
}

const statusLabel: Record<string, { label: string; cls: string }> = {
  live: { label: '● Live', cls: 'text-live border-live/30 bg-live/10' },
  shipped: { label: '✓ Shipped', cls: 'text-grey border-line-strong bg-surface-2/40' },
  internal: { label: '⬤ Internal', cls: 'text-grey-muted border-line bg-surface-2/30' },
};

export default async function ProjectDetail(props: Props) {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIdx = projects.findIndex(p => p.slug === params.slug);
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;
  const status = project.status ? statusLabel[project.status] : null;

  return (
    <div className="pt-14">
      {/* Hero banner */}
      <div className="relative overflow-hidden border-b border-line bg-elevated">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-crimson/10 blur-3xl" />
        <div className="section-container relative max-w-4xl py-14">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 font-mono text-xs text-grey-muted">
            <Link href="/projects" className="inline-flex items-center gap-1 transition-colors hover:text-crimson">
              <ArrowLeft className="h-3 w-3" /> Projects
            </Link>
            <span>/</span>
            <span className="text-grey">{project.title}</span>
          </div>

          <div className="mb-4 flex flex-wrap items-start gap-3">
            <span className="inline-flex items-center rounded-full border border-line-strong bg-surface/60 px-2.5 py-0.5 font-mono text-xs text-grey">
              {project.category}
            </span>
            {status && (
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs ${status.cls}`}>
                {status.label}
              </span>
            )}
            {project.year && <span className="font-mono text-xs text-grey-muted">{project.year}</span>}
          </div>

          <h1 className="mb-3 font-display text-4xl font-bold text-ivory sm:text-5xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-lg text-grey">{project.tagline}</p>

          {/* Quick highlights */}
          {project.highlights && (
            <div className="mt-6 grid max-w-2xl gap-2 sm:grid-cols-2">
              {project.highlights.map(h => (
                <div key={h} className="flex items-start gap-2 text-sm text-grey">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-crimson/70" />
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="section-container max-w-4xl py-12">

        {/* Procedural per-project visual — no fake screenshots, no letter placeholder */}
        <div className="relative mb-10 h-52 overflow-hidden rounded-xl border border-line bg-surface">
          <ProjectVisual
            slug={project.slug}
            category={project.category}
            size="featured"
            className="absolute inset-0"
          />
        </div>

        {/* Metrics */}
        <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {project.metrics.map(m => (
            <div key={m.label} className="rounded-lg border border-line bg-surface-2/30 px-4 py-4 text-center">
              <div className="font-mono text-2xl font-black text-ivory">{m.value}</div>
              <div className="mt-0.5 text-xs text-grey-muted">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-10">
          <section>
            <SectionHeader title="Problem" />
            <div className="rounded-lg border-l-2 border-crimson/50 bg-crimson/5 px-5 py-4">
              <p className="text-sm leading-relaxed text-ivory-dim">{project.problem}</p>
            </div>
          </section>

          <section>
            <SectionHeader title="Architecture" />
            <p className="text-sm leading-relaxed text-grey">{project.architecture}</p>
          </section>

          <section>
            <SectionHeader title="Trade-offs" />
            <p className="text-sm leading-relaxed text-grey">{project.tradeoffs}</p>
          </section>

          <section>
            <SectionHeader title="Tech Stack" />
            <div className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
          </section>

          <section>
            <ExplainMode project={project} />
          </section>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-10 flex items-center justify-between border-t border-line pt-10">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-2 text-sm text-grey-muted transition-colors hover:text-crimson">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <span>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex items-center gap-2 text-sm text-grey-muted transition-colors hover:text-crimson">
              <span>{next.title}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="font-display text-lg font-semibold text-ivory">{title}</h2>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}
