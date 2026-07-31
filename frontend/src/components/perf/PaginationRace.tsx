'use client';

import { useState, useCallback, useRef } from 'react';
import { clsx } from 'clsx';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

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

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500">Pages:</label>
          <input
            type="number"
            min={3}
            max={50}
            value={pages}
            onChange={e => setPages(Number(e.target.value))}
            disabled={running}
            className="w-16 rounded-md border border-slate-800 bg-navy-700 px-2 py-1 font-mono text-xs text-slate-300 focus:border-accent focus:outline-hidden"
          />
        </div>
        <div className="text-xs text-slate-600 font-mono">
          limit={limit} &middot; {limit * pages} rows
        </div>
        <button
          onClick={running ? stop : run}
          className={clsx(
            'rounded-md px-4 py-2 text-sm font-semibold transition-colors',
            running
              ? 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25'
              : 'bg-accent text-navy-900 hover:bg-accent-hover'
          )}
        >
          {running ? 'Stop' : 'Start Race'}
        </button>
      </div>

      {error && (
        <div className="text-xs text-red-400 font-mono">
          Error: {error}. Is the backend running on {API}?
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 rounded-sm bg-emerald-500" />
          <span className="text-slate-400">Cursor (real API calls)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-2 rounded-sm bg-red-500" />
          <span className="text-slate-400">Offset (simulated scan overhead)</span>
        </div>
      </div>

      {/* Chart */}
      {results.length > 0 && (
        <div className="card-surface p-5 space-y-2">
          {results.map(r => (
            <div key={r.page} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-mono text-slate-600 text-right shrink-0">
                {r.page}
              </span>
              <div className="flex-1 flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-sm bg-emerald-500/80 transition-all duration-300"
                    style={{ width: `${Math.max(2, (r.cursorMs / maxMs) * 100)}%` }}
                  />
                  <span className="font-mono text-emerald-400 shrink-0">
                    {r.cursorMs}ms
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 rounded-sm bg-red-500/60 transition-all duration-300"
                    style={{ width: `${Math.max(2, (r.offsetMs / maxMs) * 100)}%` }}
                  />
                  <span className="font-mono text-red-400 shrink-0">
                    {r.offsetMs}ms
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Totals */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/40 font-mono text-xs">
            <div className="text-slate-500">
              Total ({results.length} pages):
            </div>
            <div className="flex gap-6">
              <span className="text-emerald-400">{totalCursor}ms cursor</span>
              <span className="text-red-400">{totalOffset}ms offset</span>
              {totalOffset > 0 && (
                <span className="text-accent">
                  {((totalOffset / Math.max(totalCursor, 1)) * 100 - 100).toFixed(0)}% slower
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Explanation */}
      <div className="card-surface p-5 space-y-3">
        <h3 className="text-sm font-semibold text-slate-300">
          Why cursor pagination wins at depth
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 text-xs text-slate-400">
          <div>
            <div className="font-mono text-emerald-400 mb-1">
              Cursor: WHERE id &gt; ? LIMIT N
            </div>
            <p className="leading-relaxed">
              Index seek to the last-seen ID, scan forward N rows. Cost is O(N)
              regardless of how deep into the result set you are. Page 1 and
              page 100 take the same time.
            </p>
          </div>
          <div>
            <div className="font-mono text-red-400 mb-1">
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
