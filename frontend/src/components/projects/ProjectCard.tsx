import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/projects';
import { ProjectVisual } from './ProjectVisual';

const statusLabel: Record<string, string> = {
  live: 'Live',
  shipped: 'Shipped',
  internal: 'Internal',
};

interface ProjectCardProps {
  project: Project;
  variant?: 'featured' | 'default' | 'compact';
  headingLevel?: 2 | 3;
}

export function ProjectCard({
  project,
  variant = 'default',
  headingLevel = 3,
}: ProjectCardProps) {
  const status = project.status ? statusLabel[project.status] : null;
  const featured = variant === 'featured';
  const compact = variant === 'compact';
  const highlightCount = featured ? 4 : compact ? 2 : 3;
  const stackCount = featured ? 6 : compact ? 3 : 4;
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-line bg-surface transition-colors duration-200 hover:border-line-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
    >
      {/* Procedural per-project schematic. Nothing is overlaid on it: labels
          sitting on top of an image is one of the more reliable tells, and
          the metadata reads better as a real line of text underneath. */}
      <div
        className={`relative border-b border-line bg-elevated ${
          featured ? 'h-48 sm:h-56' : compact ? 'h-24' : 'h-32'
        }`}
      >
        <ProjectVisual
          slug={project.slug}
          category={project.category}
          size={featured ? 'featured' : compact ? 'compact' : 'default'}
          className="absolute inset-0"
        />
      </div>

      <div
        className={`flex flex-1 flex-col ${
          featured ? 'p-7' : compact ? 'p-4' : 'p-5'
        }`}
      >
        <div className="flex items-center justify-between gap-3 font-mono text-[11px] text-muted-2">
          <span className="uppercase tracking-wide">{project.category}</span>
          <span className="flex items-center gap-3">
            {project.year && <span>{project.year}</span>}
            {status && <span className="text-volt-text">{status}</span>}
          </span>
        </div>

        <Heading
          className={`display mt-3 text-ink transition-colors group-hover:text-volt-text ${
            featured
              ? 'text-[clamp(1.5rem,2.4vw,2rem)]'
              : compact
                ? 'text-base'
                : 'text-xl'
          }`}
        >
          {project.title}
        </Heading>

        <p
          className={`text-muted ${
            compact ? 'mt-1 text-xs' : 'mt-2 text-sm leading-relaxed'
          }`}
        >
          {project.tagline}
        </p>

        {project.highlights && !compact && (
          <ul className="mt-5 space-y-2">
            {project.highlights.slice(0, highlightCount).map((h) => (
              <li
                key={h}
                className="grid grid-cols-[10px_1fr] gap-2.5 text-[13px] leading-relaxed text-ink-dim"
              >
                <span aria-hidden className="mt-2 h-px w-2.5 bg-line-strong" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {featured && (
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 border-t border-line pt-5 sm:grid-cols-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <div className="display text-lg text-ink">{m.value}</div>
                <div className="mt-0.5 text-[11px] leading-snug text-muted-2">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <div
            className={`flex flex-wrap gap-1.5 ${
              compact ? 'mt-3' : 'mt-6 border-t border-line pt-5'
            }`}
          >
            {project.stack.slice(0, stackCount).map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
            {project.stack.length > stackCount && (
              <span className="tag">+{project.stack.length - stackCount}</span>
            )}
          </div>

          {!compact && (
            <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-volt-text">
              <span>View case study</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
