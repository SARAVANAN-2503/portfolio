'use client';

import { useMemo } from 'react';
import { ReactFlow, Background, Controls, MarkerType, Position } from '@xyflow/react';
import type { Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DiagramNode, type DiagramNodeData } from './shared';

const nodeTypes = { custom: DiagramNode };

const nodes: Node<DiagramNodeData>[] = [
  { id: 'user', type: 'custom', position: { x: 0, y: 140 },
    data: { label: 'User', category: 'client', description: 'Authenticated request',
      handles: { target: [], source: [Position.Right] } } },
  { id: 'jwt', type: 'custom', position: { x: 220, y: 140 },
    data: { label: 'JWT Claims', category: 'middleware', description: 'sub, tid, role, email',
      detail: 'Role is baked into the JWT at login time. Changing a role requires re-issuing the token.' } },
  { id: 'check', type: 'custom', position: { x: 460, y: 140 },
    data: { label: 'Permission Check', category: 'service', description: 'role >= required?',
      detail: 'Middleware checks if the JWT role meets the minimum required role for the route.' } },
  { id: 'owner', type: 'custom', position: { x: 720, y: 20 },
    data: { label: 'Owner', category: 'service', description: 'Full access',
      detail: 'Can manage users, billing, delete tenant. One per tenant.',
      handles: { target: [Position.Left], source: [] } } },
  { id: 'admin', type: 'custom', position: { x: 720, y: 140 },
    data: { label: 'Admin', category: 'service', description: 'Read + Write',
      detail: 'Can manage users and content. Cannot access billing or delete tenant.',
      handles: { target: [Position.Left], source: [] } } },
  { id: 'member', type: 'custom', position: { x: 720, y: 260 },
    data: { label: 'Member', category: 'middleware', description: 'Read only',
      detail: 'Can view content and own profile. Cannot modify other users or settings.',
      handles: { target: [Position.Left], source: [] } } },
  { id: 'resource', type: 'custom', position: { x: 460, y: 300 },
    data: { label: 'Resource', category: 'database', description: 'Tenant-scoped data',
      handles: { target: [Position.Top], source: [] } } },
];

const edge = (id: string, source: string, target: string, extra?: Partial<Edge>): Edge => ({
  id, source, target,
  animated: true, style: { stroke: '#475569' },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#475569' },
  ...extra,
});

const edges: Edge[] = [
  edge('e1', 'user', 'jwt'),
  edge('e2', 'jwt', 'check'),
  edge('e3', 'check', 'owner', { label: 'owner', labelStyle: { fill: '#4ade80', fontSize: 9 }, style: { stroke: '#4ade80' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#4ade80' } }),
  edge('e4', 'check', 'admin', { label: 'admin', labelStyle: { fill: '#f59e0b', fontSize: 9 }, style: { stroke: '#f59e0b' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' } }),
  edge('e5', 'check', 'member', { label: 'member', labelStyle: { fill: '#94a3b8', fontSize: 9 } }),
  edge('e6', 'check', 'resource', { animated: false, style: { stroke: '#475569', strokeDasharray: '5,5' } }),
];

export function RbacFlow() {
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
          className="!bg-navy-700 !border-slate-800 !shadow-none [&>button]:!bg-navy-700 [&>button]:!border-slate-800 [&>button]:!text-slate-400 [&>button:hover]:!bg-slate-800" />
      </ReactFlow>
    </div>
  );
}
