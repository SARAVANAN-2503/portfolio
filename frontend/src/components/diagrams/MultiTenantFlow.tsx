'use client';

import { useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType, Position } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DiagramNode, type DiagramNodeData } from './shared';

const nodeTypes = { custom: DiagramNode };

const nodes: Node<DiagramNodeData>[] = [
  {
    id: 'browser', type: 'custom', position: { x: 0, y: 160 },
    data: { label: 'Browser', category: 'client', description: 'Request to subdomain', detail: 'Client sends request to tenant-specific subdomain: acme.tenantcraft.io' },
  },
  {
    id: 'subdomain', type: 'custom', position: { x: 220, y: 160 },
    data: { label: 'Subdomain Router', category: 'middleware', description: 'Resolve tenant', detail: 'Extracts tenant slug from Host header before any app code runs — zero-trust at the edge' },
  },
  {
    id: 'express', type: 'custom', position: { x: 460, y: 160 },
    data: { label: 'Express API', category: 'service', description: 'API Gateway' },
  },
  {
    id: 'auth', type: 'custom', position: { x: 680, y: 80 },
    data: { label: 'Auth (JWT)', category: 'middleware', description: 'Verify & extract tid', detail: 'JWT carries authoritative tenant_id in the "tid" claim — header forgery cannot bypass this' },
  },
  {
    id: 'tenant', type: 'custom', position: { x: 680, y: 240 },
    data: { label: 'Tenant Guard', category: 'middleware', description: 'tid == X-Tenant-ID?', detail: 'Compares JWT tid claim against X-Tenant-ID header. Mismatch → 403 Forbidden. This is the isolation proof.' },
  },
  {
    id: 'handler', type: 'custom', position: { x: 920, y: 160 },
    data: { label: 'Route Handler', category: 'service', description: 'Business logic' },
  },
  {
    id: 'rowlevel', type: 'custom', position: { x: 1160, y: 80 },
    data: {
      label: 'Row-Level DB', category: 'database', description: 'WHERE tenant_id = ?',
      detail: 'Single database, shared tables. Every query filters on tenant_id. Simpler ops, but requires query discipline.',
      handles: { target: [Position.Left], source: [] },
    },
  },
  {
    id: 'schema', type: 'custom', position: { x: 1160, y: 240 },
    data: {
      label: 'Schema-per-Tenant', category: 'database', description: 'ATTACH DATABASE',
      detail: 'Separate SQLite file per tenant. Stronger isolation for enterprise. N databases = N× migration cost.',
      handles: { target: [Position.Left], source: [] },
    },
  },
];

const edges: Edge[] = [
  { id: 'e1', source: 'browser', target: 'subdomain', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e2', source: 'subdomain', target: 'express', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e3', source: 'express', target: 'auth', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e4', source: 'express', target: 'tenant', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e5', source: 'auth', target: 'handler', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e6', source: 'tenant', target: 'handler', animated: true, style: { stroke: '#475569' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
  { id: 'e7', source: 'handler', target: 'rowlevel', animated: true, style: { stroke: '#f59e0b' }, label: 'default', labelStyle: { fill: '#94a3b8', fontSize: 10 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } },
  { id: 'e8', source: 'handler', target: 'schema', style: { stroke: '#475569', strokeDasharray: '5,5' }, label: 'enterprise', labelStyle: { fill: '#94a3b8', fontSize: 10 }, markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' } },
];

export function MultiTenantFlow() {
  const types = useMemo(() => nodeTypes, []);
  return (
    <div className="h-[400px] rounded-lg border border-slate-800/60 bg-navy-950/40 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={types}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        colorMode="dark"
        nodesDraggable={false}
        nodesConnectable={false}
        panOnDrag
        zoomOnScroll
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background color="#1e293b" gap={20} size={1} />
        <Controls
          showInteractive={false}
          className="bg-navy-700! border-slate-800! shadow-none! [&>button]:bg-navy-700! [&>button]:border-slate-800! [&>button]:text-slate-400! [&>button:hover]:bg-slate-800!"
        />
      </ReactFlow>
    </div>
  );
}
