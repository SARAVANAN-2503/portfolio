'use client';

import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';

export type NodeCategory = 'client' | 'middleware' | 'service' | 'database' | 'queue';

const categoryStyles: Record<NodeCategory, { border: string; dot: string; bg: string }> = {
  client:     { border: 'border-blue-500/40',    dot: 'bg-blue-400',    bg: 'bg-blue-500/5' },
  middleware: { border: 'border-slate-600/60',    dot: 'bg-slate-400',   bg: 'bg-slate-800/30' },
  service:    { border: 'border-emerald-500/40',  dot: 'bg-emerald-400', bg: 'bg-emerald-500/5' },
  database:   { border: 'border-amber-500/40',    dot: 'bg-amber-400',   bg: 'bg-amber-500/5' },
  queue:      { border: 'border-purple-500/40',   dot: 'bg-purple-400',  bg: 'bg-purple-500/5' },
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
          className="w-2! h-2! bg-slate-600! border-slate-700!"
        />
      ))}
      <div
        onClick={() => data.detail && setExpanded(!expanded)}
        className={`rounded-lg border ${style.border} ${style.bg} px-4 py-2.5 min-w-[130px] backdrop-blur-xs ${data.detail ? 'cursor-pointer' : ''}`}
      >
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          <span className="text-[11px] font-semibold text-slate-200 whitespace-nowrap">
            {data.label}
          </span>
        </div>
        {data.description && (
          <div className="text-[9px] text-slate-500 mt-0.5 ml-3.5">
            {data.description}
          </div>
        )}
        {expanded && data.detail && (
          <div className="mt-2 ml-3.5 text-[9px] text-slate-400 leading-relaxed border-t border-slate-700/40 pt-1.5">
            {data.detail}
          </div>
        )}
      </div>
      {sourceHandles.map((pos, i) => (
        <Handle
          key={`s-${i}`}
          type="source"
          position={pos}
          className="w-2! h-2! bg-slate-600! border-slate-700!"
        />
      ))}
    </>
  );
});
