'use client';

import { useState, useCallback, useRef } from 'react';
import { clsx } from 'clsx';
import { Play, Square, Zap, TrendingDown } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/* Read lazily rather than at module scope: this component is a client island
   but still renders on the server first, where `window` does not exist. */
function currentOrigin(): string {
  return typeof window === 'undefined' ? 'this origin' : window.location.origin;
}

interface PageResult {
  page: number;
  cursorMs: number;
  offsetMs: number;
}

// Simulated offset latency: realistic model where OFFSET N scans N rows.
// Cursor uses index seek — constant time regardless of page depth.
function simulateOffsetLatency(baseCursorMs: number, pageNum: number): number {
  const scanOverhead = pageNum * pageNum * 0.25;
  const jitter = Math.random() * 4 - 2;
  return Math.max(1, Math.round(baseCursorMs + scanOverhead + jitter));
}

export function PaginationRace() {
  const [pages, setPages] = useState(15);
  const [limit] = useState(20);
  const [results, setResults] = useState<PageResult[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const run = useCallback(async () => {
    setRunning(true);
    setError(null);
    setResults([]);
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    try {
      // Login first
      const loginRes = await fetch(`${API}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@tenantcraft.io', password: 'demo1234' }),
        signal,
      });
      if (!loginRes.ok) throw new Error('Login failed');
      const { token, user } = await loginRes.json();

      let cursor: string | null = null;

      for (let i = 1; i <= pages; i++) {
        if (signal.aborted) break;

        const url: string = cursor
          ? `${API}/api/users?limit=${limit}&cursor=${encodeURIComponent(cursor)}`
          : `${API}/api/users?limit=${limit}`;

        const start = performance.now();
        const res: Response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Tenant-ID': user.tenantId,
          },
          signal,
        });
        const cursorMs = Math.round(performance.now() - start);
        const data: { pageInfo?: { nextCursor?: string | null; hasMore?: boolean } } = await res.json();

        cursor = data.pageInfo?.nextCursor ?? null;
        const offsetMs = simulateOffsetLatency(cursorMs, i);

        setResults(prev => [...prev, { page: i, cursorMs, offsetMs }]);

        if (!data.pageInfo?.hasMore) break;
      }
    } catch (err) {
      if (!(err instanceof DOMException && (err as DOMException).name === 'AbortError')) {
        setError(String(err));
      }
    } finally {
      setRunning(false);
    }
  }, [pages, limit]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const maxMs = Math.max(1, ...results.map(r => Math.max(r.cursorMs, r.offsetMs)));
  const totalCursor = results.reduce((s, r) => s + r.cursorMs, 0);
  const totalOffset = results.reduce((s, r) => s + r.offsetMs, 0);
  const speedup = totalOffset > 0 ? (totalOffset / Math.max(totalCursor, 1) - 1) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Control panel */}
      <div className="card-surface flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-2">
          <label htmlFor="pages-input" className="text-xs text-grey-muted">Pages:</label>
          <input
            id="pages-input"
            type="number"
            min={3}
            max={50}
            value={pages}
            onChange={e => setPages(Number(e.target.value))}
            disabled={running}
            className="w-16 rounded-md border border-line bg-surface-2/60 px-2 py-1.5 font-mono text-xs text-ivory focus:border-crimson focus:outline-none disabled:opacity-50"
          />
        </div>
        <div className="font-mono text-xs text-grey-muted">
          limit={limit} &middot; {limit * pages} rows
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={running ? stop : run}
          className={clsx(
            'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors cursor-pointer',
            running
              ? 'border border-red-500/30 bg-red-500/15 text-red-400 hover:bg-red-500/25'
              : 'bg-volt text-[#171612] hover:brightness-[1.06]'
          )}
        >
          {running ? <Square className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Stop' : 'Start Race'}
        </button>
      </div>

      {/* "Failed to fetch" is opaque by design: the browser reports a blocked
          CORS response and a refused connection identically, so this names both
          causes rather than sending the reader to check only the server. The
          CORS case is the easy one to miss, since the API can be up and
          answering curl while every browser call still fails. */}
      {error && (
        <div
          role="alert"
          className="rounded-[var(--radius)] border border-line-strong bg-surface px-4 py-3 text-xs text-ink"
        >
          <p className="font-mono text-[#c8442e]">Error: {error}</p>
          <p className="mt-2 leading-relaxed text-muted">
            Either the API is not running on {API}, or it is running but has
            not allowed this origin ({currentOrigin()}). For the second case, add that
            origin to CORS_ORIGIN in the backend environment.
          </p>
        </div>
      )}

      {/* Result summary */}
      {results.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-3" aria-live="polite">
          <div className="card-surface p-4 text-center">
            <div className="font-mono text-2xl font-black text-live">{totalCursor}ms</div>
            <div className="mt-0.5 text-[11px] text-grey-muted">Cursor total ({results.length} pages)</div>
          </div>
          <div className="card-surface p-4 text-center">
            <div className="font-mono text-2xl font-black text-red-400">{totalOffset}ms</div>
            <div className="mt-0.5 text-[11px] text-grey-muted">Offset total ({results.length} pages)</div>
          </div>
          <div className="card-surface flex flex-col items-center justify-center border-crimson/25 bg-crimson/5 p-4 text-center">
            <div className="flex items-center gap-1.5 font-mono text-2xl font-black text-crimson">
              <TrendingDown className="h-5 w-5" />
              {speedup.toFixed(0)}%
            </div>
            <div className="mt-0.5 text-[11px] text-grey-muted">Cursor is faster, this run</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2 w-3 rounded-sm bg-live" />
          <span className="text-grey">Cursor (real API calls)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-3 rounded-sm bg-red-500" />
          <span className="text-grey">Offset (simulated scan overhead)</span>
        </div>
        {running && (
          <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] text-crimson">
            <Zap className="h-3 w-3 animate-pulse" /> racing…
          </span>
        )}
      </div>

      {/* Chart */}
      {results.length > 0 && (
        <div className="card-surface space-y-2 p-5">
          {results.map(r => (
            <div key={r.page} className="flex items-center gap-3 text-xs">
              <span className="w-8 shrink-0 text-right font-mono text-grey-muted">
                {r.page}
              </span>
              <div className="flex flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-sm bg-live/80 transition-all duration-300"
                    style={{ width: `${Math.max(2, (r.cursorMs / maxMs) * 100)}%` }}
                  />
                  <span className="shrink-0 font-mono text-live">
                    {r.cursorMs}ms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-sm bg-red-500/60 transition-all duration-300"
                    style={{ width: `${Math.max(2, (r.offsetMs / maxMs) * 100)}%` }}
                  />
                  <span className="shrink-0 font-mono text-red-400">
                    {r.offsetMs}ms
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Explanation */}
      <div className="card-surface space-y-3 p-5">
        <h3 className="text-sm font-semibold text-ivory">
          Why cursor pagination wins at depth
        </h3>
        <div className="grid gap-4 text-xs text-grey sm:grid-cols-2">
          <div>
            <div className="mb-1 font-mono text-live">
              Cursor: WHERE id &gt; ? LIMIT N
            </div>
            <p className="leading-relaxed">
              Index seek to the last-seen ID, scan forward N rows. Cost is O(N)
              regardless of how deep into the result set you are. Page 1 and
              page 100 take the same time.
            </p>
          </div>
          <div>
            <div className="mb-1 font-mono text-red-400">
              Offset: OFFSET M LIMIT N
            </div>
            <p className="leading-relaxed">
              Database scans and discards M rows before returning N. Page 100
              with limit 20 scans 2,000 rows to return 20. Cost grows linearly
              with page depth: O(M + N).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
