import type { Metadata } from 'next/types';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { ContentHeader } from '@/components/ui/ContentHeader';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected engineering case studies covering multi-tenant SaaS, government compliance systems, real-time WebSocket platforms, and serverless processing.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects | Saravanan',
    description:
      'Selected engineering case studies covering multi-tenant SaaS, government compliance systems, real-time WebSocket platforms, and serverless processing.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40">
      <div className="section-container">

        <ContentHeader
          title="Projects"
          description={`${projects.length} production systems, each with the problem statement, architectural decisions, trade-offs, metrics, and an interview-mode deep-dive.`}
        />

        <ProjectsGrid projects={projects} />

        {/* Bottom note */}
        <p className="mt-14 text-center font-mono text-xs text-grey-muted">
          Selected professional case studies presented using generic project names to respect confidentiality. Product identities and internal implementation details are intentionally omitted where appropriate.
        </p>
      </div>
    </div>
  );
}
