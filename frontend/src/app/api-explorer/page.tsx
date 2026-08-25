import type { Metadata } from 'next/types';
import { ApiExplorer } from '@/components/explorer/ApiExplorer';
import { LabHeader } from '@/components/ui/LabHeader';

export const metadata: Metadata = {
  title: 'API Explorer',
  description: 'Live, interactive API explorer with real endpoints: JWT auth, cursor pagination, webhook simulation.',
};

export default function ApiExplorerPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <LabHeader
          title="API Explorer"
          description="Test real backend endpoints: JWT authentication, cursor-based pagination, tenant isolation, and webhook verification, with live latency measurement."
          meta="4 live endpoints"
        />

        <ApiExplorer />
      </div>
    </div>
  );
}
