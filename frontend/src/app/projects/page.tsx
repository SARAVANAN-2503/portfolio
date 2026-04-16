import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade systems: multi-tenant SaaS, government platforms, real-time WebSocket, serverless processing.',
};

const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

export default function ProjectsPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-accent" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              Case Studies
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-slate-100 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-slate-400 leading-relaxed">
            {projects.length} production systems — each with the problem statement, architectural decisions,
            trade-offs, metrics, and an interview-mode deep-dive.
          </p>
        </div>

        {/* Category filter row (static — JS filter can be added later) */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat, i) => (
            <span
              key={cat}
              className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-colors cursor-default ${
                i === 0
                  ? 'border-accent/40 text-accent bg-accent/10'
                  : 'border-slate-700/60 text-slate-500 bg-slate-800/30 hover:border-slate-600 hover:text-slate-300'
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        {/* Bottom note */}
        <p className="mt-12 text-center font-mono text-xs text-slate-600">
          All projects are from real production environments. Company names omitted per NDA.
        </p>
      </div>
    </div>
  );
}
