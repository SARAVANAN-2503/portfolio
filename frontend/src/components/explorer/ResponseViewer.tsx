'use client';

import { clsx } from 'clsx';

interface Props {
  status: number;
  latencyMs: number;
  body: unknown;
  headers: Record<string, string>;
}

function statusColor(code: number) {
  if (code < 300) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  if (code < 500) return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
  return 'bg-red-500/15 text-red-400 border-red-500/30';
}

function latencyColor(ms: number) {
  if (ms < 50) return 'text-emerald-400';
  if (ms < 200) return 'text-amber-400';
  return 'text-red-400';
}

const DISPLAY_HEADERS = [
  'x-request-id',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'content-type',
  'retry-after',
];

export function ResponseViewer({ status, latencyMs, body, headers }: Props) {
  const json = JSON.stringify(body, null, 2);
  const filteredHeaders = Object.entries(headers).filter(([k]) =>
    DISPLAY_HEADERS.includes(k.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-mono font-semibold',
            statusColor(status)
          )}
        >
          {status}
        </span>
        <span className={clsx('font-mono text-xs', latencyColor(latencyMs))}>
          {latencyMs}ms
        </span>
      </div>

      <div className="rounded-md border border-slate-800/60 bg-navy-950/60 overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-800/40 px-3 py-1.5">
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
            Response Body
          </span>
          <button
            onClick={() => navigator.clipboard.writeText(json)}
            className="text-[10px] font-mono text-slate-600 hover:text-accent transition-colors"
          >
            Copy
          </button>
        </div>
        <pre className="p-3 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto max-h-[400px] overflow-y-auto">
          {json}
        </pre>
      </div>

      {filteredHeaders.length > 0 && (
        <div className="rounded-md border border-slate-800/60 bg-navy-950/60 overflow-hidden">
          <div className="border-b border-slate-800/40 px-3 py-1.5">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
              Response Headers
            </span>
          </div>
          <div className="p-3 space-y-1">
            {filteredHeaders.map(([k, v]) => (
              <div key={k} className="flex gap-2 font-mono text-xs">
                <span className="text-slate-500">{k}:</span>
                <span className="text-slate-400">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
