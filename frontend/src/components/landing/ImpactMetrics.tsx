'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

interface Metric {
  value: number;
  suffix: string;
  label: string;
  detail: string;
}

/* The lead metric carries the section; the rest are supporting evidence.
   Four equal columns gave them all the same weight, which is the layout
   equivalent of saying everything is equally important. */
const lead: Metric = {
  value: 1000,
  suffix: '+',
  label: 'Concurrent Notifications',
  detail: 'Appolo Firebase FCM and SQS pipeline, with no memory spikes',
};

const supporting: Metric[] = [
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

/* The count-up earns its place: these are the numbers the page asks a
   recruiter to believe, so the tick draws the eye to them on arrival. Runs
   once, honors reduced motion, cleans up its own frame. */
function useCountUp(value: number, index: number) {
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
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1400;
          const start = performance.now() + index * 90;

          const tick = (now: number) => {
            if (now < start) {
              frame = requestAnimationFrame(tick);
              return;
            }
            const progress = Math.min((now - start) / duration, 1);
            const current = easeOutCubic(progress) * value;
            setDisplay(Math.floor(current).toLocaleString());
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
  }, [value, index, reduceMotion]);

  return {
    ref,
    text: reduceMotion ? value.toLocaleString() : display,
  };
}

function LeadMetric() {
  const { ref, text } = useCountUp(lead.value, 0);
  return (
    <div ref={ref} className="lg:col-span-7">
      <div className="display text-[clamp(4rem,9vw,8.5rem)] leading-[0.85] text-ink tabular-nums">
        {text}
        <span className="text-volt-text">{lead.suffix}</span>
      </div>
      <div className="mt-6 max-w-[34ch]">
        <div className="text-lg font-medium text-ink">{lead.label}</div>
        <div className="mt-1.5 text-[15px] leading-relaxed text-muted">
          {lead.detail}
        </div>
      </div>
    </div>
  );
}

function SupportingMetric({ metric, index }: { metric: Metric; index: number }) {
  const { ref, text } = useCountUp(metric.value, index + 1);
  return (
    <div
      ref={ref}
      className="grid grid-cols-[minmax(0,4.5rem)_1fr] items-baseline gap-5 border-b border-line py-5 first:border-t"
    >
      <div className="display text-[1.75rem] leading-none text-ink tabular-nums">
        {text}
        <span className="text-volt-text">{metric.suffix}</span>
      </div>
      <div>
        <div className="text-[15px] font-medium text-ink">{metric.label}</div>
        <div className="mt-0.5 text-[13px] text-muted">{metric.detail}</div>
      </div>
    </div>
  );
}

export function ImpactMetrics() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <LeadMetric />
      <div className="lg:col-span-5">
        {supporting.map((m, i) => (
          <SupportingMetric key={m.label} metric={m} index={i} />
        ))}
      </div>
    </div>
  );
}
