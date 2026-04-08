'use client';

import { useEffect, useRef, useState } from 'react';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

const metrics: Metric[] = [
  { value: 5000, suffix: '+', label: 'Concurrent Users', detail: 'ExpertConnect WebSocket platform' },
  { value: 200, suffix: '+', label: 'Business Tenants', detail: 'TenantCraft multi-tenant SaaS' },
  { value: 120, suffix: 'ms', label: 'P99 Latency', detail: 'Real-time message delivery' },
  { value: 99.95, suffix: '%', label: 'Uptime SLA', detail: 'Across all production systems' },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function AnimatedValue({ metric }: { metric: Metric }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const isFloat = !Number.isInteger(metric.value);

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = easeOutCubic(progress);
            const current = eased * metric.value;
            setDisplay(
              isFloat ? current.toFixed(2) : Math.floor(current).toLocaleString()
            );
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [metric.value]);

  return (
    <div ref={ref} className="group relative rounded-lg border border-slate-800/60 bg-navy-700/30 p-5 hover:border-accent/30 hover:bg-accent-muted/30 transition-all duration-300">
      <div className="font-mono text-3xl font-bold text-slate-100 tracking-tight">
        {display}
        <span className="text-accent">{metric.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-slate-400">
        {metric.label}
      </div>
      <div className="mt-0.5 text-xs text-slate-600">
        {metric.detail}
      </div>
    </div>
  );
}

export function ImpactMetrics() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map(metric => (
        <AnimatedValue key={metric.label} metric={metric} />
      ))}
    </div>
  );
}
