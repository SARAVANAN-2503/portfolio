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

/* The count-up earns its place: these are the numbers the page is asking a
   recruiter to believe, and the tick draws the eye to them on arrival.
   It runs once, honors reduced motion, and cleans up its own frame. */
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
    <div ref={ref} className="px-5 py-8 sm:px-7 lg:py-10">
      <div className="display text-[clamp(2.5rem,4.4vw,3.75rem)] text-ink tabular-nums">
        {reduceMotion ? metric.value.toLocaleString() : display}
        <span className="text-ink/45">{metric.suffix}</span>
      </div>
      <div className="mt-3 text-sm font-medium text-ink">{metric.label}</div>
      <div className="mt-1 text-[13px] leading-relaxed text-muted">
        {metric.detail}
      </div>
    </div>
  );
}

/* Full-bleed band, not a card. The numbers are the section; a border around
   them would just make them one more box on a page of boxes. */
export function ImpactMetrics() {
  return (
    <div className="grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, i) => (
        <div
          key={metric.label}
          className={[
            'border-line',
            i > 0 ? 'border-t sm:border-t-0' : '',
            i % 2 === 1 ? 'sm:border-l' : '',
            i >= 2 ? 'sm:border-t' : '',
            'lg:border-t-0',
            i > 0 ? 'lg:border-l' : '',
          ].join(' ')}
        >
          <AnimatedValue metric={metric} index={i} />
        </div>
      ))}
    </div>
  );
}
