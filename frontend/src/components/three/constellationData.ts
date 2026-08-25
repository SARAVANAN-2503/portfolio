export interface ConstellationNode {
  id: string;
  index: number;
  label: string;
  sub: string;
  description: string;
  /** 3D scene position */
  position: [number, number, number];
  /** Fallback 2D layout, in percent of the container */
  flat: { x: number; y: number };
}

export const CONSTELLATION_NODES: ConstellationNode[] = [
  { id: 'client', index: 1, label: 'Client', sub: 'Web & Mobile', description: 'Browser and mobile clients initiating requests.', position: [-3.8, 2, 0], flat: { x: 14, y: 14 } },
  { id: 'frontend', index: 2, label: 'Frontend', sub: 'Next.js App', description: 'Server-rendered React app, static + dynamic routes.', position: [-2.5, 0.45, 0], flat: { x: 18, y: 48 } },
  { id: 'api', index: 3, label: 'API', sub: 'REST / GraphQL', description: 'Express gateway: validation, routing, rate limiting.', position: [0, 0, 0], flat: { x: 46, y: 52 } },
  { id: 'auth', index: 4, label: 'Authentication', sub: 'RBAC / JWT', description: 'Stateless JWT auth with role-based permissions.', position: [2.15, 0.6, 0], flat: { x: 69, y: 42 } },
  { id: 'queue', index: 5, label: 'Queue', sub: 'Jobs / Events', description: 'Async job queue for emails, webhooks, background work.', position: [4.1, 1.9, 0], flat: { x: 86, y: 14 } },
  { id: 'database', index: 6, label: 'Database', sub: 'PostgreSQL', description: 'Relational store with tenant-scoped row-level isolation.', position: [-0.6, -2.15, 0], flat: { x: 42, y: 87 } },
  { id: 'cloud', index: 7, label: 'Cloud', sub: 'AWS / Serverless', description: 'Lambda, S3 and SQS for bursty, event-driven workloads.', position: [3.15, -2.05, 0], flat: { x: 82, y: 83 } },
];

export const CONSTELLATION_EDGES: [string, string][] = [
  ['client', 'frontend'],
  ['frontend', 'api'],
  ['api', 'auth'],
  ['auth', 'queue'],
  ['api', 'database'],
  ['database', 'cloud'],
  ['queue', 'cloud'],
];

export function findNode(id: string) {
  const node = CONSTELLATION_NODES.find(n => n.id === id);
  if (!node) throw new Error(`Unknown constellation node: ${id}`);
  return node;
}
