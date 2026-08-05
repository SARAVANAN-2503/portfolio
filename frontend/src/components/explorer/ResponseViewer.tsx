'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Check, Copy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  status: number;
  latencyMs: number;
  body: unknown;
  headers: Record<string, string>;
  loading?: boolean;
}

function statusColor(code: number) {
  if (code < 300) return 'bg-live/15 text-live border-live/30';
  if (code < 500) return 'bg-crimson-bright/15 text-crimson-bright border-crimson-bright/30';
  return 'bg-red-500/15 text-red-400 border-red-500/30';
}

function latencyColor(ms: number) {
  if (ms < 50) return 'text-live';
  if (ms < 200) return 'text-crimson-bright';
  return 'text-red-400';
}

const DISPLAY_HEADERS = [
  'x-request-id',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'content-type',
  'retry-after',
];

export function ResponseViewer({ status, latencyMs, body, headers, loading }: Props) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(body, null, 2);
  const filteredHeaders = Object.entries(headers).filter(([k]) =>
    DISPLAY_HEADERS.includes(k.toLowerCase())
  );

  function handleCopy() {
    navigator.clipboard
      .writeText(json)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        // Clipboard access can be denied by the browser — fail silently.
      });
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-12 rounded-md" />
          <Skeleton className="h-4 w-14 rounded" />
        </div>
        <div className="rounded-md border border-line bg-elevated/60 p-3 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-xs font-semibold',
            statusColor(status)
          )}
        >
          {status}
        </span>
        <span className={clsx('font-mono text-xs', latencyColor(latencyMs))}>
          {latencyMs}ms
        </span>
      </div>

      <div className="overflow-hidden rounded-md border border-line bg-elevated/60">
        <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-grey-muted">
            Response Body
          </span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 font-mono text-[10px] text-grey-muted transition-colors hover:text-crimson cursor-pointer"
          >
            {copied ? <Check className="h-3 w-3 text-live" /> : <Copy className="h-3 w-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="max-h-[400px] overflow-x-auto overflow-y-auto p-3 font-mono text-xs leading-relaxed text-ivory-dim">
          {json}
        </pre>
      </div>

      {filteredHeaders.length > 0 && (
        <div className="overflow-hidden rounded-md border border-line bg-elevated/60">
          <div className="border-b border-line px-3 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-grey-muted">
              Response Headers
            </span>
          </div>
          <div className="space-y-1 p-3">
            {filteredHeaders.map(([k, v]) => (
              <div key={k} className="flex gap-2 font-mono text-xs">
                <span className="text-grey-muted">{k}:</span>
                <span className="text-grey">{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
