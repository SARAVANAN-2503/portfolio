import type { Metadata } from 'next/types';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ContentHeader } from '@/components/ui/ContentHeader';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Production-grade systems: multi-tenant SaaS, government platforms, real-time WebSocket, serverless processing.',
};

export default function ProjectsPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">

        <ContentHeader
          eyebrow="Case Studies"
          title="Projects"
          description={`${projects.length} production systems, each with the problem statement, architectural decisions, trade-offs, metrics, and an interview-mode deep-dive.`}
        />

        <ProjectsGrid projects={projects} />

        {/* Bottom note */}
        <p className="mt-14 text-center font-mono text-xs text-grey-muted">
          All projects are from real production environments. Company names omitted per NDA.
        </p>
      </div>
    </div>
  );
}
