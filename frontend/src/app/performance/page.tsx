import type { Metadata } from 'next/types';
import { PaginationRace } from '@/components/perf/PaginationRace';
import { LabHeader } from '@/components/ui/LabHeader';

export const metadata: Metadata = {
  title: 'Performance',
  description: 'Live performance comparison: cursor vs offset pagination throughput and latency.',
};

export default function PerformancePage() {
  return (
    <div className="pt-32 pb-24 lg:pt-40">
      <div className="section-container">
        <LabHeader
          title="Performance Visualizer"
          description="Real-time benchmark comparing pagination strategies over a dataset of 10,000+ records. Watch offset-based performance degrade linearly while cursor-based stays constant."
          meta="10,000+ record dataset"
        />

        <PaginationRace />
      </div>
    </div>
  );
}
