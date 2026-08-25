'use client';

import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export type NodeCategory = 'client' | 'middleware' | 'service' | 'database' | 'queue';

/* Emerald ("live") stays reserved for real status semantics site-wide
   (available-for-work, live project). Diagram categories use crimson /
   blueprint / neutral instead so a "service" node here never reads as an
   "available" signal elsewhere on the site. */
const categoryStyles: Record<NodeCategory, { border: string; dot: string; bg: string }> = {
  client:     { border: 'border-crimson/40',        dot: 'bg-crimson',        bg: 'bg-crimson/5' },
  middleware: { border: 'border-line-strong',       dot: 'bg-grey',           bg: 'bg-surface-2/40' },
  service:    { border: 'border-blueprint/40',      dot: 'bg-blueprint',      bg: 'bg-blueprint-dim' },
  database:   { border: 'border-crimson-bright/40', dot: 'bg-crimson-bright', bg: 'bg-crimson-bright/5' },
  queue:      { border: 'border-purple-500/40',     dot: 'bg-purple-400',     bg: 'bg-purple-500/5' },
};

export interface DiagramNodeData {
  label: string;
  category: NodeCategory;
  description?: string;
  detail?: string;
  handles?: { source?: Position[]; target?: Position[] };
  [key: string]: unknown;
}

export const DiagramNode = memo(function DiagramNode({
  data,
}: {
  data: DiagramNodeData;
}) {
  const [expanded, setExpanded] = useState(false);
  const style = categoryStyles[data.category] || categoryStyles.service;
  const sourceHandles = data.handles?.source ?? [Position.Right];
  const targetHandles = data.handles?.target ?? [Position.Left];

  return (
    <>
      {targetHandles.map((pos, i) => (
        <Handle
          key={`t-${i}`}
          type="target"
          position={pos}
          className="w-2! h-2! bg-line-strong! border-line!"
        />
      ))}
      <button
        type="button"
        onClick={() => data.detail && setExpanded(!expanded)}
        disabled={!data.detail}
        aria-expanded={data.detail ? expanded : undefined}
        className={`rounded-lg border ${style.border} ${style.bg} px-4 py-2.5 min-w-[130px] text-left backdrop-blur-xs transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson-bright disabled:cursor-default ${data.detail ? 'cursor-pointer hover:shadow-[0_0_16px_-4px_rgba(229,72,77,0.4)]' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          <span className="text-[11px] font-semibold text-ivory whitespace-nowrap">
            {data.label}
          </span>
        </div>
        {data.description && (
          <div className="text-[9px] text-grey-muted mt-0.5 ml-3.5">
            {data.description}
          </div>
        )}
        {expanded && data.detail && (
          <div className="mt-2 ml-3.5 text-[9px] text-grey leading-relaxed border-t border-line pt-1.5">
            {data.detail}
          </div>
        )}
      </button>
      {sourceHandles.map((pos, i) => (
        <Handle
          key={`s-${i}`}
          type="source"
          position={pos}
          className="w-2! h-2! bg-line-strong! border-line!"
        />
      ))}
    </>
  );
});
