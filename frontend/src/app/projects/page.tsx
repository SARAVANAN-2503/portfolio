import type { Metadata } from 'next';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade systems: multi-tenant SaaS, government platforms, real-time WebSocket, serverless processing.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="max-w-2xl mb-10">
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
            Each project includes the problem statement, architectural decisions,
            trade-offs, production metrics, and an interview-mode walkthrough.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
