'use client';

import { useMemo, useState, useCallback } from 'react';
import { ReactFlow, Background, Controls, MarkerType, Position, useNodesState } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DiagramNode, type DiagramNodeData } from './shared';

const nodeTypes = { custom: DiagramNode };

const initialNodes: Node<DiagramNodeData>[] = [
  { id: 'api', type: 'custom', position: { x: 0, y: 100 },
    data: { label: 'API Request', category: 'client', description: 'POST /payments/webhook',
      handles: { target: [], source: [Position.Right] } } },
  { id: 'verify', type: 'custom', position: { x: 230, y: 100 },
    data: { label: 'HMAC Verify', category: 'middleware', description: 'SHA-256 timing-safe',
      detail: 'Constant-time comparison prevents timing attacks on the signature.' } },
  { id: 'validate', type: 'custom', position: { x: 460, y: 100 },
    data: { label: 'Schema Validate', category: 'middleware', description: 'Zod parse' } },
  { id: 'dedup', type: 'custom', position: { x: 690, y: 100 },
    data: { label: 'Idempotency', category: 'service', description: 'Check event key',
      detail: 'Deduplicates by idempotencyKey. Repeated deliveries return the same jobId.' } },
  { id: 'enqueue', type: 'custom', position: { x: 920, y: 100 },
    data: { label: 'Enqueue Job', category: 'queue', description: 'INSERT into jobs' } },
  { id: 'pending', type: 'custom', position: { x: 920, y: 240 },
    data: { label: 'Jobs Table', category: 'database', description: 'status: pending',
      handles: { target: [Position.Top, Position.Right], source: [Position.Left] } } },
  { id: 'worker', type: 'custom', position: { x: 600, y: 240 },
    data: { label: 'Worker Loop', category: 'queue', description: 'setInterval 250ms',
      detail: 'Claims oldest pending job with atomic UPDATE...RETURNING. No double-processing.',
      handles: { target: [Position.Right], source: [Position.Right] } } },
  { id: 'done', type: 'custom', position: { x: 600, y: 370 },
    data: { label: 'Job Complete', category: 'database', description: 'status: done',
      handles: { target: [Position.Top], source: [Position.Right] } } },
  { id: 'poll', type: 'custom', position: { x: 920, y: 370 },
    data: { label: 'GET /jobs/:id', category: 'client', description: 'Poll for status',
      handles: { target: [Position.Left], source: [Position.Top] } } },
];

const staticEdges: Edge[] = [
  { id: 'e1', source: 'api', target: 'verify', animated: true, style: { stroke: '#3a3d45' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3a3d45' } },
  { id: 'e2', source: 'verify', target: 'validate', animated: true, style: { stroke: '#3a3d45' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3a3d45' } },
  { id: 'e3', source: 'validate', target: 'dedup', animated: true, style: { stroke: '#3a3d45' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3a3d45' } },
  { id: 'e4', source: 'dedup', target: 'enqueue', animated: true, style: { stroke: '#a855f7' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' } },
  { id: 'e5', source: 'enqueue', target: 'pending', animated: true, style: { stroke: '#a855f7' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#a855f7' } },
  { id: 'e6', source: 'pending', target: 'worker', animated: true, style: { stroke: '#e5484d' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#e5484d' } },
  { id: 'e7', source: 'worker', target: 'done', animated: true, style: { stroke: '#34d399' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#34d399' } },
  { id: 'e8', source: 'done', target: 'poll', style: { stroke: '#3a3d45', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3a3d45' } },
  { id: 'e9', source: 'poll', target: 'pending', style: { stroke: '#3a3d45', strokeDasharray: '5,5' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#3a3d45' } },
];

export function QueueFlow() {
  const types = useMemo(() => nodeTypes, []);
  const [nodes] = useNodesState(initialNodes);
  const [simulating, setSimulating] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'enqueued' | 'processing' | 'done'>('idle');

  const simulate = useCallback(async () => {
    setSimulating(true);
    setPhase('enqueued');
    await sleep(800);
    setPhase('processing');
    await sleep(600);
    setPhase('done');
    await sleep(1000);
    setPhase('idle');
    setSimulating(false);
  }, []);

  const edges = useMemo(() => {
    if (phase === 'idle') return staticEdges;
    return staticEdges.map(e => {
      if (phase === 'enqueued' && ['e4', 'e5'].includes(e.id))
        return { ...e, style: { stroke: '#a855f7' }, animated: true };
      if (phase === 'processing' && e.id === 'e6')
        return { ...e, style: { stroke: '#e5484d' }, animated: true };
      if (phase === 'done' && e.id === 'e7')
        return { ...e, style: { stroke: '#34d399' }, animated: true };
      return { ...e, animated: false, style: { ...e.style, opacity: 0.3 } };
    });
  }, [phase]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={simulate}
          disabled={simulating}
          className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
            simulating
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-accent text-navy-900 hover:bg-accent-hover'
          }`}
        >
          {simulating ? `Phase: ${phase}` : 'Simulate Job Flow'}
        </button>
        {phase !== 'idle' && (
          <span className="font-mono text-[10px] text-slate-500">
            {phase === 'enqueued' && 'Job inserted into queue...'}
            {phase === 'processing' && 'Worker claiming and processing...'}
            {phase === 'done' && 'Job completed. Result stored.'}
          </span>
        )}
      </div>
      <div className="h-[420px] rounded-lg border border-slate-800/60 bg-navy-950/40 overflow-hidden">
        <ReactFlow
          nodes={nodes} edges={edges} nodeTypes={types}
          fitView fitViewOptions={{ padding: 0.25 }} colorMode="dark"
          nodesDraggable={false} nodesConnectable={false}
          panOnDrag zoomOnScroll minZoom={0.4} maxZoom={1.5}
        >
          <Background color="#2a1418" gap={20} size={1} />
          <Controls showInteractive={false}
            className="bg-navy-700! border-line-strong! shadow-none! [&>button]:bg-navy-700! [&>button]:border-line-strong! [&>button]:text-grey-muted! [&>button:hover]:bg-surface-2!" />
        </ReactFlow>
      </div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise(r => setTimeout(r, ms));
}
