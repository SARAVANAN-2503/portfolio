import type { Metadata } from 'next/types';
import { PaginationRace } from '@/components/perf/PaginationRace';

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Live performance comparison: Cursor vs Offset pagination throughput and latency.',
};

export default function PerformancePage() {
  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-crimson" />
          <span className="font-mono text-xs text-crimson tracking-widest uppercase">
            Optimization
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-ivory mb-3">
          Performance Visualizer
        </h1>
        <p className="text-grey mb-10 max-w-xl">
          Real-time benchmark comparing pagination strategies over a dataset of 10,000+ records.
          Observe how offset-based performance degrades linearly while cursor-based remains constant.
        </p>

        <PaginationRace />
      </div>
    </div>
  );
}
