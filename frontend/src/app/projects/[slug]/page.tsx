import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, getProject } from '@/content/projects';
import { ExplainMode } from '@/components/projects/ExplainMode';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.tagline} — ${project.problem.split('.')[0]}.`,
  };
}

export default function ProjectDetail({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIdx = projects.findIndex(p => p.slug === params.slug);
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;

  return (
    <div className="pt-14">
      <div className="section-container py-16 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-8">
          <Link href="/projects" className="hover:text-accent transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-slate-400">{project.title}</span>
        </div>

        {/* Header */}
        <div className="mb-10">
          <span className="tag-accent mb-3 inline-block">{project.category}</span>
          <h1 className="font-display text-3xl font-bold text-slate-100 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            {project.tagline}
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-10">
          {project.metrics.map(m => (
            <div
              key={m.label}
              className="rounded-md border border-slate-800/60 bg-navy-700/30 px-4 py-3"
            >
              <div className="font-mono text-lg font-bold text-slate-100">
                {m.value}
              </div>
              <div className="text-xs text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Problem */}
        <section className="mb-8">
          <SectionHeader label="01" title="Problem" />
          <div className="rounded-lg border-l-2 border-accent/40 bg-accent-muted/40 px-5 py-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problem}
            </p>
          </div>
        </section>

        {/* Architecture */}
        <section className="mb-8">
          <SectionHeader label="02" title="Architectural Decision" />
          <p className="text-sm text-slate-400 leading-relaxed">
            {project.architecture}
          </p>
        </section>

        {/* Trade-offs */}
        <section className="mb-8">
          <SectionHeader label="03" title="Trade-offs" />
          <p className="text-sm text-slate-400 leading-relaxed">
            {project.tradeoffs}
          </p>
        </section>

        {/* Tech Stack */}
        <section className="mb-10">
          <SectionHeader label="04" title="Stack" />
          <div className="flex flex-wrap gap-2">
            {project.stack.map(tech => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Explain Mode */}
        <section className="mb-10">
          <ExplainMode project={project} />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="text-sm text-slate-500 hover:text-accent transition-colors"
            >
              &larr; {prev.title}
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="text-sm text-slate-500 hover:text-accent transition-colors"
            >
              {next.title} &rarr;
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-xs text-accent/60">{label}</span>
      <h2 className="font-display text-lg font-semibold text-slate-200">
        {title}
      </h2>
      <div className="h-px flex-1 bg-slate-800/40" />
    </div>
  );
}
