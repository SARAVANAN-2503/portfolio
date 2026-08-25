import type { Metadata } from 'next/types';
import { ApiExplorer } from '@/components/explorer/ApiExplorer';
import { LabHeader } from '@/components/ui/LabHeader';

export const metadata: Metadata = {
  title: 'API Explorer',
  description: 'Live, interactive API explorer with real endpoints: JWT auth, cursor pagination, webhook simulation.',
};

export default function ApiExplorerPage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40">
      <div className="section-container">
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
