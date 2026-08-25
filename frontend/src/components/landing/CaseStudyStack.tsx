'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ProjectVisual } from '@/components/projects/ProjectVisual';
import type { Project } from '@/content/projects';

/* Sticky-stack case studies.
 *
 * Motivation for the motion (it needs one): the projects are a ranked
 * sequence, and pinning each one until the next arrives makes the reader
 * finish a case study before the following one covers it, instead of
 * skimming a grid of equal tiles. The covered card scales down and dims so
 * the stack reads as depth rather than as content disappearing.
 *
 * Built on CSS `position: sticky` plus framer-motion's `useScroll`, so there
 * is no scroll listener and no new dependency. Under reduced motion the
 * transforms are dropped and the cards render as a plain stacked list.
 */

function StackCard({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress runs from "this card is pinned" to "the next card has covered
  // it", which is what drives the shrink.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 100px', 'end 320px'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.45]);
  const isLast = index === total - 1;

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${88 + index * 18}px` }}
    >
      <motion.article
        style={reduce || isLast ? undefined : { scale, opacity }}
        className="origin-top overflow-hidden rounded-[var(--radius)] border border-line bg-surface"
      >
        <div className="grid lg:grid-cols-12">
          {/* Visual rail. Full-height on desktop so the card reads as one
              object instead of a header image stacked on a text block. */}
          <div className="relative min-h-[180px] border-b border-line bg-elevated lg:col-span-5 lg:min-h-[420px] lg:border-r lg:border-b-0">
            <ProjectVisual
              slug={project.slug}
              category={project.category}
              size="featured"
              className="absolute inset-0"
            />
            <div className="absolute bottom-5 left-6 display text-[clamp(3rem,5vw,4.5rem)] leading-none text-ink/12">
              {String(index + 1).padStart(2, '0')}
            </div>
          </div>

          <div className="flex flex-col p-7 lg:col-span-7 lg:p-10">
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] text-muted-2">
              <span className="uppercase tracking-wide">{project.category}</span>
              <span className="flex items-center gap-3">
                {project.year && <span>{project.year}</span>}
                {project.status && (
                  <span className="text-volt-text capitalize">
                    {project.status}
                  </span>
                )}
              </span>
            </div>

            <h3 className="display mt-4 text-[clamp(1.75rem,3vw,2.75rem)] text-ink">
              {project.title}
            </h3>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted">
              {project.tagline}
            </p>

            {project.highlights && (
              <ul className="mt-7 space-y-2.5">
                {project.highlights.slice(0, 3).map((h) => (
                  <li
                    key={h}
                    className="grid grid-cols-[12px_1fr] gap-3 text-[14px] leading-relaxed text-ink-dim"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-3 bg-line-strong"
                    />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 sm:grid-cols-4">
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <div className="display text-xl text-ink">{m.value}</div>
                  <div className="mt-1 text-[11px] leading-snug text-muted-2">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href={`/projects/${project.slug}`}
              className="group mt-8 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-volt-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text"
            >
              View case study
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function CaseStudyStack({ projects }: { projects: Project[] }) {
  return (
    <div className="space-y-6">
      {projects.map((p, i) => (
        <StackCard key={p.slug} project={p} index={i} total={projects.length} />
      ))}
    </div>
  );
}
