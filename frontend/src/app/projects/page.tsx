import type { Metadata } from 'next/types';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade systems: multi-tenant SaaS, government platforms, real-time WebSocket, serverless processing.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-crimson" />
            <span className="font-mono text-xs text-crimson tracking-widest uppercase">
              Case Studies
            </span>
          </div>
          <h1 className="font-display text-3xl font-bold text-ivory sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-grey leading-relaxed">
            {projects.length} production systems — each with the problem statement, architectural decisions,
            trade-offs, metrics, and an interview-mode deep-dive.
          </p>
        </div>

        <ProjectsGrid projects={projects} />

        {/* Bottom note */}
        <p className="mt-14 text-center font-mono text-xs text-grey-muted">
          All projects are from real production environments. Company names omitted per NDA.
        </p>
      </div>
    </div>
  );
}
