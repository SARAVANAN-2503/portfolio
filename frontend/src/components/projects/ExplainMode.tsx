'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '@/content/projects';

export function ExplainMode({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const { explainMode } = project;

  return (
    <div className="rounded-lg border border-dashed border-amber-500/30 bg-amber-500/3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent text-sm font-mono">
            ?
          </span>
          <div className="flex flex-col sm:block">
            <span className="text-sm font-semibold text-accent">
              Explain Mode
            </span>
            <span className="text-xs text-slate-500 sm:ml-2">
              How I would explain this in an interview
            </span>
          </div>
        </div>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-accent/60"
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 px-5 pb-5 border-t border-amber-500/10 pt-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/70 mb-2">
                  30-Second Pitch
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{explainMode.interviewPitch}&rdquo;
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/70 mb-2">
                  Key Talking Points
                </h4>
                <ul className="space-y-2">
                  {explainMode.talkingPoints.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-400">
                      <span className="shrink-0 font-mono text-accent/50 text-xs mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400/70 mb-2">
                  Trade-offs Deep Dive
                </h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {explainMode.tradeoffsExplained}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
