import { CONSTELLATION_NODES, CONSTELLATION_EDGES, findNode } from './constellationData';
import {
  AppWindow,
  Braces,
  Cloud,
  Database,
  ListTree,
  MonitorSmartphone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const nodeIcons: Record<string, LucideIcon> = {
  client: MonitorSmartphone,
  frontend: AppWindow,
  api: Braces,
  auth: ShieldCheck,
  queue: ListTree,
  database: Database,
  cloud: Cloud,
};

/**
 * Static CSS/SVG rendition of the engineering constellation. Used as the
 * always-safe fallback: before the WebGL scene mounts, on devices without
 * WebGL, on narrow viewports, and whenever prefers-reduced-motion is set.
 */
export function ConstellationFallback({ animated = true }: { animated?: boolean }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line/40 bg-elevated/15 [background-image:radial-gradient(circle_at_50%_46%,rgba(245,242,234,0.045),transparent_58%)]"
      role="img"
      aria-label="Diagram of a full-stack system: client, frontend, API, authentication, queue, database, and cloud, connected in a request flow."
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {CONSTELLATION_EDGES.map(([fromId, toId]) => {
          const from = findNode(fromId);
          const to = findNode(toId);
          return (
            <line
              key={`${fromId}-${toId}`}
              x1={from.flat.x}
              y1={from.flat.y}
              x2={to.flat.x}
              y2={to.flat.y}
              stroke="var(--color-wine)"
              strokeWidth={0.25}
              strokeOpacity={0.6}
              strokeDasharray={animated ? '1.2 1.6' : undefined}
              className={animated ? 'animate-[dash_6s_linear_infinite]' : undefined}
            />
          );
        })}
      </svg>

      {CONSTELLATION_NODES.map(node => {
        const Icon = nodeIcons[node.id];
        return (
          <div
            key={node.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${node.flat.x}%`, top: `${node.flat.y}%` }}
          >
            <div
              className={`relative flex h-11 w-11 items-center justify-center rounded-lg border ${
                node.id === 'api' ? 'border-crimson/50 bg-crimson/10' : 'border-line-strong bg-surface/90'
              } text-ivory shadow-[0_0_18px_-8px_rgba(229,72,77,0.25)] ${
                animated ? 'animate-pulse-slow' : ''
              }`}
              style={animated ? { animationDelay: `${node.index * 220}ms` } : undefined}
            >
              <Icon className="h-4 w-4" strokeWidth={1.65} />
              <span className="absolute -right-1.5 -top-1.5 rounded border border-line-strong bg-obsidian px-1 font-mono text-[7px] text-crimson">
                {String(node.index).padStart(2, '0')}
              </span>
            </div>
            <div className="text-center leading-tight">
              <div className="font-mono text-[9px] font-semibold text-ivory min-[400px]:text-[11px]">{node.label}</div>
              <div className="hidden font-mono text-[9px] text-grey-muted min-[400px]:block">{node.sub}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
