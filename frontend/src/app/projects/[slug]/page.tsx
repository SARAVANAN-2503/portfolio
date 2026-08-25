import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, getProject } from '@/content/projects';
import { ExplainMode } from '@/components/projects/ExplainMode';
import { ProjectVisual } from '@/components/projects/ProjectVisual';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.tagline}: ${project.problem.split('.')[0]}.`,
  };
}

const statusLabel: Record<string, string> = {
  live: 'Live',
  shipped: 'Shipped',
  internal: 'Internal',
};

export default async function ProjectDetail(props: Props) {
  const params = await props.params;
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIdx = projects.findIndex((p) => p.slug === params.slug);
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;
  const status = project.status ? statusLabel[project.status] : null;

  return (
    <article>
      {/* ── Masthead. Full-bleed, with the title at display scale. The old
             version squeezed the whole case study into a 730px centre
             column, which left most of a desktop viewport empty. ───────── */}
      <header className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: 'var(--background-image-hero-grid)',
            backgroundSize: 'var(--background-size-hero-grid)',
            maskImage:
              'radial-gradient(ellipse 70% 70% at 80% 30%, black, transparent 72%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 70% 70% at 80% 30%, black, transparent 72%)',
          }}
        />
        <div className="wide-container relative pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-20">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            Projects
          </Link>

          <h1 className="display mt-10 max-w-[16ch] text-[clamp(2.5rem,6.5vw,5.5rem)] text-ink">
            {project.title}
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-dim">
            {project.tagline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[13px] text-muted">
            <span className="uppercase tracking-wide">{project.category}</span>
            {project.year && <span>{project.year}</span>}
            {status && <span className="text-volt-text">{status}</span>}
          </div>
        </div>
      </header>

      {/* ── Metrics as a full-bleed band, not four centred boxes. Long values
             like "Checkout / Sub / Connect" wrapped to three lines inside a
             fixed box and broke the row's baseline. ───────────────────── */}
      <div className="wide-container">
        <dl className="grid border-b border-line sm:grid-cols-2 lg:grid-cols-4">
          {project.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`py-8 lg:px-7 ${i > 0 ? 'border-t border-line sm:border-t-0 lg:border-l' : 'lg:pl-0'} ${i % 2 === 1 ? 'sm:border-l sm:border-line' : ''} ${i >= 2 ? 'sm:border-t sm:border-line lg:border-t-0' : ''}`}
            >
              <dt className="text-[13px] text-muted">{m.label}</dt>
              <dd className="display mt-2 text-[clamp(1.125rem,1.7vw,1.5rem)] leading-tight text-ink">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ── Body. Sticky meta rail against the case study, so the wide
             viewport carries two columns instead of one narrow one. ───── */}
      <div className="wide-container grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <div className="relative h-56 overflow-hidden rounded-[var(--radius)] border border-line bg-elevated">
              <ProjectVisual
                slug={project.slug}
                category={project.category}
                size="featured"
                className="absolute inset-0"
              />
            </div>

            {project.highlights && (
              <ul className="mt-8 space-y-3">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="grid grid-cols-[12px_1fr] gap-3 text-[14px] leading-relaxed text-ink-dim"
                  >
                    <span aria-hidden className="mt-2.5 h-px w-3 bg-line-strong" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 border-t border-line pt-6">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-7 lg:col-start-6">
          <Section title="Problem">
            <p className="text-lg leading-relaxed text-ink-dim">
              {project.problem}
            </p>
          </Section>

          <Section title="Architecture">
            <p className="text-base leading-relaxed text-muted">
              {project.architecture}
            </p>
          </Section>

          <Section title="Trade-offs">
            <p className="text-base leading-relaxed text-muted">
              {project.tradeoffs}
            </p>
          </Section>

          <div className="mt-16">
            <ExplainMode project={project} />
          </div>
        </div>
      </div>

      {/* ── Prev / next ─────────────────────────────────────────────────── */}
      <nav className="wide-container">
        <div className="flex items-center justify-between gap-6 border-t border-line py-10">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                strokeWidth={2}
              />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {next.title}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          ) : (
            <span />
          )}
        </div>
      </nav>
    </article>
  );
}

/* One heading treatment, set at real scale. Four identical small headings
   each with a trailing hairline gave every section the same weight. */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-14 last:mb-0">
      <h2 className="display mb-5 text-[clamp(1.375rem,2.2vw,1.875rem)] text-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
