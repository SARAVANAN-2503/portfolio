'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { MultiTenantFlow } from '@/components/diagrams/MultiTenantFlow';
import { RequestLifecycle } from '@/components/diagrams/RequestLifecycle';
import { RbacFlow } from '@/components/diagrams/RbacFlow';
import { QueueFlow } from '@/components/diagrams/QueueFlow';

const DIAGRAMS = [
  { id: 'multi-tenant', title: 'Multi-tenant Flow', description: 'Tenant resolution, DB isolation, and request routing.', component: MultiTenantFlow },
  { id: 'lifecycle', title: 'API Lifecycle', description: 'Request path from client to database through architecture layers.', component: RequestLifecycle },
  { id: 'rbac', title: 'RBAC Flow', description: 'Role-based access control and permission evaluation logic.', component: RbacFlow },
  { id: 'queue', title: 'Queue Processing', description: 'Producer-consumer pattern with SQLite-backed job queue.', component: QueueFlow },
];

export default function ArchitecturePage() {
  const [activeId, setActiveId] = useState('multi-tenant');
  const activeDiagram = DIAGRAMS.find(d => d.id === activeId)!;
  const ActiveComponent = activeDiagram.component;

  return (
    <div className="pt-14">
      <div className="section-container py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            System Design
          </span>
        </div>
        <h1 className="font-display text-3xl font-bold text-slate-100 mb-3">
          Architecture
        </h1>
        <p className="text-slate-400 mb-10 max-w-xl">
          Interactive diagrams with clickable nodes for deep-dives into
          architectural patterns and system data flows.
        </p>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {DIAGRAMS.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveId(d.id)}
                className={clsx(
                  'w-full flex flex-col items-start gap-1 rounded-lg border p-4 text-left transition-all',
                  activeId === d.id
                    ? 'bg-accent-muted border-accent/40 ring-1 ring-accent/20'
                    : 'bg-navy-700/30 border-slate-800/60 hover:border-slate-700 text-slate-400'
                )}
              >
                <span className={clsx(
                  'font-display text-sm font-semibold transition-colors',
                  activeId === d.id ? 'text-accent' : 'text-slate-200'
                )}>
                  {d.title}
                </span>
                <p className="text-[10px] leading-relaxed text-slate-500 line-clamp-2">
                  {d.description}
                </p>
              </button>
            ))}
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-xs font-mono text-slate-500 uppercase tracking-widest">
                Interactive Canvas
              </h2>
              <span className="text-[10px] text-slate-600 font-mono">
                Click nodes for details • Drag to pan • Scroll to zoom
              </span>
            </div>
            <ActiveComponent />
            <div className="rounded-md border border-slate-800/40 bg-navy-950/20 p-4">
              <h3 className="text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wide">
                Key Concept: {activeDiagram.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {activeId === 'multi-tenant' && 'Demonstrates how the system maps a request to a specific tenant container or schema based on the hostname, and preserves that isolation all the way to the storage engine.'}
                {activeId === 'lifecycle' && 'Shows the onion-style architecture of our Node.js services, where each layer of middleware (logging, auth, rate-limiting) is a distinct, testable boundary.'}
                {activeId === 'rbac' && 'Illustrates how hierarchical roles map to functional permissions, allowing for a flexible yet strict security model across different tenant tiers.'}
                {activeId === 'queue' && 'Visualizes the asynchronous job lifecycle: from immediate HTTP acknowledgement to reliable background processing with retries and status tracking.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
