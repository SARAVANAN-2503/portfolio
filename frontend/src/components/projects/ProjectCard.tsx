import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/projects';

const statusLabel: Record<string, { label: string; cls: string }> = {
  live: { label: 'Live', cls: 'text-live border-live/30 bg-live/10' },
  shipped: { label: 'Shipped', cls: 'text-grey border-line-strong bg-surface-2/60' },
  internal: { label: 'Internal', cls: 'text-grey-muted border-line bg-surface-2/40' },
};

interface ProjectCardProps {
  project: Project;
  variant?: 'featured' | 'default' | 'compact';
  headingLevel?: 2 | 3;
}

export function ProjectCard({ project, variant = 'default', headingLevel = 3 }: ProjectCardProps) {
  const status = project.status ? statusLabel[project.status] : null;
  const featured = variant === 'featured';
  const compact = variant === 'compact';
  const highlightCount = featured ? 4 : compact ? 2 : 3;
  const stackCount = featured ? 6 : compact ? 3 : 4;
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card-surface relative flex flex-col overflow-hidden transition-all duration-300 hover:border-crimson/35 hover:shadow-[0_0_40px_-14px_rgba(229,72,77,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
    >
      {/* Monogram visual — no fake screenshots, just brand + architecture-inspired texture */}
      <div className={`relative overflow-hidden border-b border-line bg-elevated ${featured ? 'h-44 sm:h-52' : compact ? 'h-24' : 'h-32'}`}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-crimson/10 blur-3xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`font-display font-black text-crimson/12 select-none ${
              featured ? 'text-8xl' : compact ? 'text-4xl' : 'text-6xl'
            }`}
          >
            {project.title.charAt(0)}
          </span>
        </div>
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border border-line-strong bg-obsidian/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-grey">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.year && <span className="font-mono text-[10px] text-grey-muted">{project.year}</span>}
            {status && (
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] ${status.cls}`}>
                {project.status === 'live' && (
                  <span className="h-1 w-1 rounded-full bg-live" />
                )}
                {status.label}
              </span>
            )}
          </div>
        </div>
        {featured && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-crimson/30 bg-crimson/10 px-2.5 py-0.5 font-mono text-[10px] text-crimson">
            Featured Case Study
          </span>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col ${featured ? 'p-6' : compact ? 'p-4' : 'p-5'}`}>
        <Heading className={`font-display font-bold text-ivory transition-colors group-hover:text-crimson ${featured ? 'text-2xl' : compact ? 'text-base' : 'text-xl'}`}>
          {project.title}
        </Heading>
        <p className={`font-mono text-grey-muted ${compact ? 'text-[10px] mt-0.5' : 'text-xs mt-1'}`}>{project.tagline}</p>

        {project.highlights && !compact && (
          <ul className="mt-3.5 space-y-1.5">
            {project.highlights.slice(0, highlightCount).map(h => (
              <li key={h} className="flex items-start gap-2 text-xs text-grey">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-crimson/70" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {featured && (
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-line pt-3.5 sm:grid-cols-4">
            {project.metrics.slice(0, 4).map(m => (
              <div key={m.label} className="flex items-baseline gap-1.5">
                <span className="font-mono text-sm font-bold text-crimson">{m.value}</span>
                <span className="truncate text-[10px] text-grey-muted">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-1.5 ${compact ? 'mt-2.5' : 'mt-3.5 pt-3.5 border-t border-line'}`}>
          {project.stack.slice(0, stackCount).map(tech => (
            <span key={tech} className="tag text-[10px]">{tech}</span>
          ))}
          {project.stack.length > stackCount && (
            <span className="tag text-[10px]">+{project.stack.length - stackCount}</span>
          )}
        </div>

        {!compact && (
          <div className="mt-4 flex items-center gap-1 text-xs text-grey-muted transition-colors group-hover:text-crimson">
            <span>View case study</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        )}
      </div>
    </Link>
  );
}
