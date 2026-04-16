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

const categoryGlow: Record<string, string> = {
  'SaaS Platform':           'from-emerald-500/10 to-transparent',
  'Government / Compliance': 'from-blue-500/10 to-transparent',
  'Real-time Platform':      'from-purple-500/10 to-transparent',
  'Serverless / EdTech':     'from-orange-500/10 to-transparent',
  'AI / CRM':                'from-pink-500/10 to-transparent',
};

const categoryAccent: Record<string, string> = {
  'SaaS Platform':           'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  'Government / Compliance': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
  'Real-time Platform':      'text-purple-400 border-purple-500/30 bg-purple-500/10',
  'Serverless / EdTech':     'text-orange-400 border-orange-500/30 bg-orange-500/10',
  'AI / CRM':                'text-pink-400 border-pink-500/30 bg-pink-500/10',
};

export default function ProjectDetail({ params }: Props) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const currentIdx = projects.findIndex(p => p.slug === params.slug);
  const prev = currentIdx > 0 ? projects[currentIdx - 1] : null;
  const next = currentIdx < projects.length - 1 ? projects[currentIdx + 1] : null;
  const glow = categoryGlow[project.category] ?? 'from-slate-500/10 to-transparent';
  const accentCls = categoryAccent[project.category] ?? 'text-slate-400 border-slate-600 bg-slate-800/40';

  return (
    <div className="pt-14">
      {/* Hero banner */}
      <div className={`relative overflow-hidden border-b border-slate-800/50 bg-gradient-to-b ${glow}`}>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'linear-gradient(rgba(148,163,184,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="section-container relative py-14 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
            <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
            <span>/</span>
            <span className="text-slate-400">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-start gap-3 mb-4">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono ${accentCls}`}>
              {project.category}
            </span>
            {project.status && (
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-mono ${
                project.status === 'live'
                  ? 'text-green-400 border-green-500/30 bg-green-500/10'
                  : 'text-slate-400 border-slate-600/40 bg-slate-700/20'
              }`}>
                {project.status === 'live' ? '● Live' : '✓ Shipped'}
              </span>
            )}
            {project.year && (
              <span className="font-mono text-xs text-slate-500">{project.year}</span>
            )}
          </div>

          <h1 className="font-display text-4xl font-bold text-slate-100 sm:text-5xl mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            {project.tagline}
          </p>

          {/* Quick highlights */}
          {project.highlights && (
            <div className="mt-6 grid sm:grid-cols-2 gap-2 max-w-2xl">
              {project.highlights.map(h => (
                <div key={h} className="flex items-start gap-2 text-sm text-slate-400">
                  <svg className="mt-0.5 shrink-0 text-accent/60" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 12 2 2 4-4" /><circle cx="12" cy="12" r="10" />
                  </svg>
                  {h}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="section-container py-12 max-w-4xl">

        {/* Placeholder image area */}
        <div className="mb-10 rounded-xl border border-slate-800/60 bg-navy-800/40 h-56 flex items-center justify-center overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.08) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="text-center z-10">
            <div className="text-slate-700 font-display text-6xl font-black select-none">{project.title.charAt(0)}</div>
            <p className="mt-2 font-mono text-xs text-slate-700">[ project screenshot — drop your image here ]</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-12">
          {project.metrics.map(m => (
            <div key={m.label} className="rounded-lg border border-slate-800/60 bg-navy-700/30 px-4 py-4 text-center">
              <div className={`font-mono text-2xl font-black ${accentCls.split(' ')[0]}`}>{m.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Sections */}
        <div className="space-y-10">
          <section>
            <SectionHeader label="01" title="Problem" />
            <div className="rounded-lg border-l-2 border-accent/50 bg-accent/5 px-5 py-4">
              <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
            </div>
          </section>

          <section>
            <SectionHeader label="02" title="Architecture" />
            <p className="text-sm text-slate-400 leading-relaxed">{project.architecture}</p>
          </section>

          <section>
            <SectionHeader label="03" title="Trade-offs" />
            <p className="text-sm text-slate-400 leading-relaxed">{project.tradeoffs}</p>
          </section>

          <section>
            <SectionHeader label="04" title="Tech Stack" />
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
        <div className="flex items-center justify-between pt-10 mt-10 border-t border-slate-800/50">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="group flex items-center gap-2 text-sm text-slate-500 hover:text-accent transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>
              </svg>
              <span>{prev.title}</span>
            </Link>
          ) : <div />}
          {next ? (
            <Link href={`/projects/${next.slug}`} className="group flex items-center gap-2 text-sm text-slate-500 hover:text-accent transition-colors">
              <span>{next.title}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-xs text-accent/50 tabular-nums">{label}</span>
      <h2 className="font-display text-lg font-semibold text-slate-200">{title}</h2>
      <div className="h-px flex-1 bg-slate-800/40" />
    </div>
  );
}
