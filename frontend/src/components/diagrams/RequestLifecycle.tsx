'use client';

import { useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType, Position } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DiagramNode, type DiagramNodeData } from './shared';

const nodeTypes = { custom: DiagramNode };

const nodes: Node<DiagramNodeData>[] = [
  { id: 'client', type: 'custom', position: { x: 0, y: 0 },
    data: { label: 'Client (Browser)', category: 'client', description: 'fetch() with headers',
      handles: { target: [], source: [Position.Right] } } },
  { id: 'nextjs', type: 'custom', position: { x: 230, y: 0 },
    data: { label: 'Next.js (Vercel)', category: 'service', description: 'SSR / static' } },
  { id: 'json', type: 'custom', position: { x: 460, y: 0 },
    data: { label: 'JSON Parser', category: 'middleware', description: '256kb limit' } },
  { id: 'cors', type: 'custom', position: { x: 0, y: 100 },
    data: { label: 'CORS', category: 'middleware', description: 'Origin allowlist',
      handles: { target: [Position.Top], source: [Position.Right] } } },
  { id: 'reqid', type: 'custom', position: { x: 230, y: 100 },
    data: { label: 'requestId', category: 'middleware', description: 'UUID per request' } },
  { id: 'logger', type: 'custom', position: { x: 460, y: 100 },
    data: { label: 'pino logger', category: 'middleware', description: 'Structured JSON' } },
  { id: 'rate', type: 'custom', position: { x: 0, y: 200 },
    data: { label: 'Rate Limiter', category: 'middleware', description: 'Token bucket',
      detail: '30 tokens per 10s window, keyed by IP+route. Headers expose remaining tokens.',
      handles: { target: [Position.Top], source: [Position.Right] } } },
  { id: 'auth', type: 'custom', position: { x: 230, y: 200 },
    data: { label: 'Auth (JWT)', category: 'middleware', description: 'HS256 verify' } },
  { id: 'handler', type: 'custom', position: { x: 460, y: 200 },
    data: { label: 'Route Handler', category: 'service', description: 'Business logic' } },
  { id: 'db', type: 'custom', position: { x: 460, y: 300 },
    data: { label: 'SQLite (WAL)', category: 'database', description: 'better-sqlite3',
      detail: 'WAL mode for concurrent reads. Synchronous API — no callback chains.',
      handles: { target: [Position.Top], source: [Position.Top] } } },
];

const edgeDefaults = { animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed as const, color: '#475569' } };

const edges: Edge[] = [
  { id: 'e1', source: 'client', target: 'nextjs', ...edgeDefaults },
  { id: 'e2', source: 'nextjs', target: 'json', ...edgeDefaults },
  { id: 'e3', source: 'json', target: 'cors', ...edgeDefaults, label: 'Express', labelStyle: { fill: '#94a3b8', fontSize: 9 } },
  { id: 'e4', source: 'cors', target: 'reqid', ...edgeDefaults },
  { id: 'e5', source: 'reqid', target: 'logger', ...edgeDefaults },
  { id: 'e6', source: 'logger', target: 'rate', ...edgeDefaults },
  { id: 'e7', source: 'rate', target: 'auth', ...edgeDefaults },
  { id: 'e8', source: 'auth', target: 'handler', ...edgeDefaults },
  { id: 'e9', source: 'handler', target: 'db', ...edgeDefaults },
];

export function RequestLifecycle() {
  const types = useMemo(() => nodeTypes, []);
  return (
    <div className="h-[400px] rounded-lg border border-slate-800/60 bg-navy-950/40 overflow-hidden">
      <ReactFlow
        nodes={nodes} edges={edges} nodeTypes={types}
        fitView fitViewOptions={{ padding: 0.3 }} colorMode="dark"
        nodesDraggable={false} nodesConnectable={false}
        panOnDrag zoomOnScroll minZoom={0.4} maxZoom={1.5}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls showInteractive={false}
          className="bg-navy-700! border-slate-800! shadow-none! [&>button]:bg-navy-700! [&>button]:border-slate-800! [&>button]:text-slate-400! [&>button:hover]:bg-slate-800!" />
      </ReactFlow>
    </div>
  );
}
