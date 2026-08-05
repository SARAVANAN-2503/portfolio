'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

const metrics: Metric[] = [
  { value: 1000, suffix: '+', label: 'Concurrent Notifications', detail: 'Appolo Firebase FCM + SQS pipeline' },
  { value: 90, suffix: '%', label: 'Manual Effort Cut', detail: 'Appolo serverless PDF pipeline' },
  { value: 60, suffix: '%', label: 'Faster API Response', detail: 'Cursor-based MongoDB pagination' },
  { value: 10, suffix: '+', label: 'Production Apps', detail: 'Across SaaS, LMS, CRM, ERP domains' },
];

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function AnimatedValue({ metric, index }: { metric: Metric; index: number }) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    if (reduceMotion) {
      animated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const startDelay = index * 90;
          const start = performance.now() + startDelay;
          const isFloat = !Number.isInteger(metric.value);

          const tick = (now: number) => {
            if (now < start) {
              frame = requestAnimationFrame(tick);
              return;
            }
            const progress = Math.min((now - start) / duration, 1);
            const eased = easeOutCubic(progress);
            const current = eased * metric.value;
            setDisplay(
              isFloat ? current.toFixed(2) : Math.floor(current).toLocaleString()
            );
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [metric.value, index, reduceMotion]);

  return (
    <div
      ref={ref}
      className="group relative flex-1 px-5 py-5 transition-colors duration-300 hover:bg-crimson/[0.03] sm:px-6 sm:py-6"
    >
      <div className="font-mono text-2xl font-bold tracking-tight text-ivory sm:text-3xl">
        {reduceMotion ? metric.value.toLocaleString() : display}
        <span className="text-crimson">{metric.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-ivory-dim">
        {metric.label}
      </div>
      <div className="mt-0.5 text-xs text-grey-muted">
        {metric.detail}
      </div>
    </div>
  );
}

export function ImpactMetrics() {
  return (
    <div className="grid overflow-hidden rounded-xl border border-line bg-surface/40 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line">
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className={[
            i > 0 ? 'border-t border-line' : '',
            i === 1 ? 'sm:border-t-0 sm:border-l sm:border-line lg:border-l-0' : '',
            i === 2 ? 'lg:border-t-0' : '',
            i === 3 ? 'sm:border-l sm:border-line lg:border-t-0 lg:border-l-0' : '',
          ].join(' ')}
        >
          <AnimatedValue metric={metric} index={i} />
        </div>
      ))}
    </div>
  );
}
