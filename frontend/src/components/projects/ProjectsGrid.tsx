'use client';

import { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/content/projects';

/** Bento spans for the first 6 projects; extra projects fall back to a plain 3-col span. */
const SPANS = ['lg:col-span-6', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];
const VARIANTS: Array<'featured' | 'default'> = ['featured', 'default', 'default', 'default', 'default', 'default'];

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categories.map(cat => (
          <button
            type="button"
            key={cat}
            aria-pressed={active === cat}
            onClick={() => setActive(cat)}
            className={`rounded-[var(--radius)] border px-3 py-1.5 text-[13px] font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volt-text ${
              active === cat
                ? 'border-transparent bg-volt text-[#171612]'
                : 'border-line text-muted hover:border-line-strong hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-6">
        {filtered.map((project, i) => {
          const span = active === 'All' ? SPANS[i] ?? 'lg:col-span-3' : 'lg:col-span-3';
          const variant = active === 'All' ? VARIANTS[i] ?? 'default' : 'default';
          return (
            <div key={project.slug} className={span}>
              <ProjectCard project={project} variant={variant} headingLevel={2} />
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-sm text-muted-2">No projects in this category yet.</p>
      )}
    </div>
  );
}
