'use client';

import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { ResponseViewer } from './ResponseViewer';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const WEBHOOK_SECRET = 'dev-webhook-secret';

// ── HMAC-SHA256 via WebCrypto ──────────────────────────────────────────────
async function hmacSha256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// ── Endpoint definitions ───────────────────────────────────────────────────
interface EndpointDef {
  id: string;
  method: 'GET' | 'POST';
  path: string;
  label: string;
  description: string;
}

const endpoints: EndpointDef[] = [
  {
    id: 'login',
    method: 'POST',
    path: '/api/auth/login',
    label: 'Login',
    description: 'JWT auth — returns bearer token that auto-populates into subsequent requests',
  },
  {
    id: 'tenants',
    method: 'GET',
    path: '/api/tenants',
    label: 'Tenants',
    description: 'Public endpoint — lists tenants with isolation metadata',
  },
  {
    id: 'users',
    method: 'GET',
    path: '/api/users?limit=5',
    label: 'Users',
    description: 'Cursor-paginated, tenant-scoped — requires auth + X-Tenant-ID',
  },
  {
    id: 'webhook',
    method: 'POST',
    path: '/api/payments/webhook',
    label: 'Webhook',
    description: 'HMAC-SHA256 verified — signature auto-computed client-side',
  },
];

// ── Default bodies ─────────────────────────────────────────────────────────
function defaultBody(id: string): string {
  if (id === 'login') {
    return JSON.stringify(
      { email: 'demo@tenantcraft.io', password: 'demo1234' },
      null,
      2
    );
  }
  if (id === 'webhook') {
    return JSON.stringify(
      {
        event: 'payment.captured',
        data: { amount: 4200, currency: 'USD' },
        idempotencyKey: `evt_${Date.now()}`,
      },
      null,
      2
    );
  }
  return '';
}

// ── Response state ─────────────────────────────────────────────────────────
interface ApiResult {
  status: number;
  body: unknown;
  latencyMs: number;
  headers: Record<string, string>;
}

// ── Method badge ───────────────────────────────────────────────────────────
function MethodBadge({ method }: { method: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-mono font-bold',
        method === 'GET'
          ? 'bg-emerald-500/15 text-emerald-400'
          : 'bg-blue-500/15 text-blue-400'
      )}
    >
      {method}
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export function ApiExplorer() {
  const [activeId, setActiveId] = useState('login');
  const [token, setToken] = useState<string | null>(null);
  const [tenantId, setTenantId] = useState<string | null>(null);
  const [bodies, setBodies] = useState<Record<string, string>>(() => ({
    login: defaultBody('login'),
    webhook: defaultBody('webhook'),
  }));
  const [results, setResults] = useState<Record<string, ApiResult>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const active = endpoints.find(e => e.id === activeId)!;

  const getHeaders = useCallback(
    (id: string): Record<string, string> => {
      const h: Record<string, string> = { 'Content-Type': 'application/json' };
      if (id === 'users' && token) {
        h['Authorization'] = `Bearer ${token}`;
        h['X-Tenant-ID'] = tenantId || '';
      }
      return h;
    },
    [token, tenantId]
  );

  const sendRequest = useCallback(
    async (ep: EndpointDef) => {
      setLoading(l => ({ ...l, [ep.id]: true }));
      try {
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        let bodyStr: string | undefined;

        if (ep.id === 'users' && token) {
          headers['Authorization'] = `Bearer ${token}`;
          headers['X-Tenant-ID'] = tenantId || '';
        }

        if (ep.method === 'POST') {
          bodyStr = bodies[ep.id] || '';

          if (ep.id === 'webhook') {
            const sig = await hmacSha256(bodyStr, WEBHOOK_SECRET);
            headers['X-Signature'] = sig;
          }
        }

        const start = performance.now();
        const res = await fetch(`${API}${ep.path}`, {
          method: ep.method,
          headers,
          body: bodyStr,
        });
        const latencyMs = Math.round(performance.now() - start);
        const data = await res.json();
        const resHeaders: Record<string, string> = {};
        res.headers.forEach((v, k) => (resHeaders[k] = v));

        const result: ApiResult = {
          status: res.status,
          body: data,
          latencyMs,
          headers: resHeaders,
        };
        setResults(r => ({ ...r, [ep.id]: result }));

        // Auto-extract token from login response
        if (ep.id === 'login' && res.ok && data.token) {
          setToken(data.token);
          setTenantId(data.user?.tenantId || null);
        }
      } catch (err) {
        setResults(r => ({
          ...r,
          [ep.id]: {
            status: 0,
            body: { error: { code: 'NETWORK', message: String(err) } },
            latencyMs: 0,
            headers: {},
          },
        }));
      } finally {
        setLoading(l => ({ ...l, [ep.id]: false }));
      }
    },
    [token, tenantId, bodies]
  );

  const result = results[activeId];
  const isLoading = loading[activeId] || false;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar tabs */}
      <div className="flex lg:flex-col gap-2 lg:w-44 shrink-0 overflow-x-auto lg:overflow-visible">
        {endpoints.map(ep => (
          <button
            key={ep.id}
            onClick={() => setActiveId(ep.id)}
            className={clsx(
              'flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors shrink-0',
              activeId === ep.id
                ? 'bg-accent-muted border border-accent/30 text-accent'
                : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            )}
          >
            <MethodBadge method={ep.method} />
            <span>{ep.label}</span>
          </button>
        ))}

        {/* Token status */}
        {token && (
          <div className="mt-2 rounded-md border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
            <div className="text-[10px] font-mono text-emerald-400 mb-0.5">
              Token Active
            </div>
            <div className="text-[10px] font-mono text-slate-500 truncate">
              {tenantId}
            </div>
          </div>
        )}
      </div>

      {/* Main panel */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Endpoint header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MethodBadge method={active.method} />
            <code className="font-mono text-sm text-slate-200">
              {active.path}
            </code>
          </div>
          <p className="text-xs text-slate-500">{active.description}</p>
        </div>

        {/* Headers display */}
        <div className="card-surface overflow-hidden">
          <div className="border-b border-slate-800/40 px-4 py-2">
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
              Request Headers
            </span>
          </div>
          <div className="p-4 space-y-1">
            {Object.entries(getHeaders(activeId)).map(([k, v]) => (
              <div key={k} className="flex gap-2 font-mono text-xs">
                <span className="text-slate-500">{k}:</span>
                <span
                  className={clsx(
                    'truncate',
                    v.startsWith('<') ? 'text-slate-600 italic' : 'text-slate-300'
                  )}
                >
                  {v.length > 80 ? v.slice(0, 80) + '...' : v}
                </span>
              </div>
            ))}
            {activeId === 'webhook' && (
              <div className="flex gap-2 font-mono text-xs">
                <span className="text-slate-500">X-Signature:</span>
                <span className="text-purple-400 italic">computed on send</span>
              </div>
            )}
          </div>
        </div>

        {/* Body editor (POST only) */}
        {active.method === 'POST' && (
          <div className="card-surface overflow-hidden">
            <div className="border-b border-slate-800/40 px-4 py-2">
              <span className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">
                Request Body
              </span>
            </div>
            <textarea
              value={bodies[activeId] || ''}
              onChange={e =>
                setBodies(b => ({ ...b, [activeId]: e.target.value }))
              }
              spellCheck={false}
              rows={8}
              className="w-full bg-transparent p-4 font-mono text-xs text-slate-300 leading-relaxed resize-y focus:outline-none"
            />
          </div>
        )}

        {/* Send button */}
        <button
          onClick={() => sendRequest(active)}
          disabled={isLoading || (activeId === 'users' && !token)}
          className={clsx(
            'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors',
            isLoading || (activeId === 'users' && !token)
              ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
              : 'bg-accent text-navy-900 hover:bg-accent-hover'
          )}
        >
          {isLoading ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-navy-900 border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
              Send Request
            </>
          )}
        </button>
        {activeId === 'users' && !token && (
          <span className="text-xs text-slate-600 ml-3">
            Login first to get a token
          </span>
        )}

        {/* Response */}
        {result && (
          <ResponseViewer
            status={result.status}
            latencyMs={result.latencyMs}
            body={result.body}
            headers={result.headers}
          />
        )}
      </div>
    </div>
  );
}
