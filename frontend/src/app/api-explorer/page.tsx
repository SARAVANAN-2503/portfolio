import type { Metadata } from 'next/types';
import { ApiExplorer } from '@/components/explorer/ApiExplorer';

export const metadata: Metadata = {
  title: 'API Explorer',
  description: 'Live, interactive API explorer with real endpoints — JWT auth, cursor pagination, webhook simulation.',
};

export default function ApiExplorerPage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-crimson" />
          <span className="font-mono text-xs text-crimson tracking-widest uppercase">
            Interactive
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-ivory mb-3">
          API Explorer
        </h1>
        <p className="text-grey mb-10 max-w-xl">
          Test real backend endpoints &mdash; JWT authentication, cursor-based pagination,
          tenant isolation, and webhook verification with live latency measurement.
        </p>

        <ApiExplorer />
      </div>
    </div>
  );
}
