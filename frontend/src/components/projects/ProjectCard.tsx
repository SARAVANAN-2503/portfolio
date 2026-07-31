import Link from 'next/link';
import type { Project } from '@/content/projects';

const categoryMeta: Record<string, { color: string; bg: string; pattern: string; dot: string }> = {
  'SaaS Platform':           { color: 'text-emerald-400', bg: 'from-emerald-900/40 to-teal-900/20',    pattern: 'bg-emerald-500/5',  dot: 'bg-emerald-400' },
  'Government / Compliance': { color: 'text-blue-400',    bg: 'from-blue-900/40 to-indigo-900/20',     pattern: 'bg-blue-500/5',    dot: 'bg-blue-400' },
  'Marketplace / Wallet':    { color: 'text-purple-400',  bg: 'from-purple-900/40 to-violet-900/20',   pattern: 'bg-purple-500/5',  dot: 'bg-purple-400' },
  'Serverless / EdTech':     { color: 'text-orange-400',  bg: 'from-orange-900/40 to-amber-900/20',    pattern: 'bg-orange-500/5',  dot: 'bg-orange-400' },
  'AI / CRM':                { color: 'text-pink-400',    bg: 'from-pink-900/40 to-rose-900/20',       pattern: 'bg-pink-500/5',    dot: 'bg-pink-400' },
  'LMS / Coaching':          { color: 'text-cyan-400',    bg: 'from-cyan-900/40 to-sky-900/20',        pattern: 'bg-cyan-500/5',    dot: 'bg-cyan-400' },
};

const statusLabel: Record<string, { label: string; cls: string }> = {
  live:     { label: '● Live',     cls: 'text-green-400 border-green-500/30 bg-green-500/10' },
  shipped:  { label: '✓ Shipped',  cls: 'text-slate-400 border-slate-600/40 bg-slate-700/20' },
  internal: { label: '⬤ Internal', cls: 'text-slate-500 border-slate-700/40 bg-slate-800/30' },
};

export function ProjectCard({ project }: { project: Project }) {
  const meta = categoryMeta[project.category] ?? {
    color: 'text-slate-400', bg: 'from-slate-800/40 to-slate-900/20', pattern: 'bg-slate-700/5', dot: 'bg-slate-400',
  };
  const status = project.status ? statusLabel[project.status] : null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card-surface flex flex-col overflow-hidden hover:border-accent/40 hover:shadow-[0_0_32px_-8px_rgba(245,158,11,0.18)] transition-all duration-300"
    >
      {/* Image / Placeholder banner */}
      <div className={`relative h-36 bg-linear-to-br ${meta.bg} overflow-hidden`}>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Glow orb */}
        <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full ${meta.pattern} blur-2xl`} />
        <div className={`absolute -bottom-6 -left-6 w-24 h-24 rounded-full ${meta.pattern} blur-xl`} />

        {/* Project initials / placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display text-5xl font-black opacity-10 select-none ${meta.color}`}>
            {project.title.charAt(0)}
          </span>
        </div>

        {/* Top bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${meta.color} border-current/20 bg-current/5`}>
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.year && (
              <span className="font-mono text-[10px] text-slate-500">{project.year}</span>
            )}
            {status && (
              <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono ${status.cls}`}>
                {status.label}
              </span>
            )}
          </div>
        </div>

        {/* Placeholder label — remove when real image provided */}
        <div className="absolute bottom-2 right-3">
          <span className="font-mono text-[9px] text-slate-700 select-none">[ image placeholder ]</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-display text-xl font-bold text-slate-100 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mt-1 text-xs font-mono text-slate-500">{project.tagline}</p>

        {/* Highlights */}
        {project.highlights && (
          <ul className="mt-3 space-y-1.5">
            {project.highlights.slice(0, 3).map(h => (
              <li key={h} className="flex items-start gap-2 text-xs text-slate-400">
                <span className={`mt-0.5 shrink-0 ${meta.dot} w-1 h-1 rounded-full`} />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Metrics row */}
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 pt-3 border-t border-slate-800/40">
          {project.metrics.slice(0, 4).map(m => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <span className={`font-mono text-sm font-bold ${meta.color}`}>{m.value}</span>
              <span className="text-[10px] text-slate-600 truncate">{m.label}</span>
            </div>
          ))}
        </div>

        {/* Stack */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 4).map(tech => (
            <span key={tech} className="tag text-[10px]">{tech}</span>
          ))}
          {project.stack.length > 4 && (
            <span className="tag text-[10px]">+{project.stack.length - 4}</span>
          )}
        </div>

        {/* CTA */}
        <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-accent/80 transition-colors">
          <span>View case study</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transform group-hover:translate-x-0.5 transition-transform">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
