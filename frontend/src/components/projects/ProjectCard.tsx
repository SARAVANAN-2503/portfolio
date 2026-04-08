import Link from 'next/link';
import type { Project } from '@/content/projects';

const categoryColors: Record<string, string> = {
  'SaaS Platform': 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
  'Government / Compliance': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
  'Real-time Platform': 'border-purple-500/30 text-purple-400 bg-purple-500/10',
  'Serverless / EdTech': 'border-orange-500/30 text-orange-400 bg-orange-500/10',
};

export function ProjectCard({ project }: { project: Project }) {
  const colorClass = categoryColors[project.category] ?? 'border-slate-600 text-slate-400 bg-slate-800/40';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card-surface flex flex-col p-6 hover:border-accent/40 hover:shadow-[0_0_24px_-6px_rgba(245,158,11,0.15)] transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-slate-100 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <span
          className={`shrink-0 inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${colorClass}`}
        >
          {project.category}
        </span>
      </div>

      <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">
        {project.tagline} &mdash; {project.problem.split('.')[0]}.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
        {project.metrics.map(m => (
          <div key={m.label} className="flex items-baseline gap-1.5">
            <span className="font-mono text-sm font-semibold text-slate-200">
              {m.value}
            </span>
            <span className="text-xs text-slate-500">{m.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/40">
        {project.stack.slice(0, 5).map(tech => (
          <span key={tech} className="tag text-[10px]">
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="tag text-[10px]">+{project.stack.length - 5}</span>
        )}
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-accent/80 transition-colors">
        <span>View case study</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transform group-hover:translate-x-0.5 transition-transform"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
