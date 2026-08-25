'use client';

import { useState, useCallback } from 'react';
import { clsx } from 'clsx';
import { Send, Loader2, KeyRound } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
    description: 'JWT auth: returns bearer token that auto-populates into subsequent requests',
  },
  {
    id: 'tenants',
    method: 'GET',
    path: '/api/tenants',
    label: 'Tenants',
    description: 'Public endpoint: lists tenants with isolation metadata',
  },
  {
    id: 'users',
    method: 'GET',
    path: '/api/users?limit=5',
    label: 'Users',
    description: 'Cursor-paginated, tenant-scoped: requires auth + X-Tenant-ID',
  },
  {
    id: 'webhook',
    method: 'POST',
    path: '/api/payments/webhook',
    label: 'Webhook',
    description: 'HMAC-SHA256 verified: signature auto-computed client-side',
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
        idempotencyKey: 'evt_demo_payment_001',
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
        'inline-flex items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-bold',
        method === 'GET' ? 'bg-live/15 text-live' : 'bg-crimson/15 text-crimson'
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
    <div className="overflow-hidden rounded-xl border border-line bg-surface/40">
      {/* Console header bar */}
      <div className="flex items-center justify-between border-b border-line bg-elevated/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-live/70" />
          <span className="ml-2 font-mono text-[11px] text-grey-muted">api-console</span>
        </div>
        {token && (
          <div className="flex items-center gap-1.5 rounded-full border border-live/25 bg-live/5 px-2.5 py-1">
            <KeyRound className="h-3 w-3 text-live" />
            <span className="font-mono text-[10px] text-live">token active</span>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6">
        {/* Endpoint tabs */}
        <Tabs value={activeId} onValueChange={setActiveId}>
          <TabsList className="mb-6 h-auto! w-full flex-wrap justify-start gap-1.5 bg-transparent p-0">
            {endpoints.map(ep => (
              <TabsTrigger
                key={ep.id}
                value={ep.id}
                className="gap-1.5 rounded-md border border-line bg-surface-2/40 px-3 py-2 data-[state=active]:border-crimson/40 data-[state=active]:bg-crimson/10 data-[state=active]:text-crimson data-[state=active]:shadow-none"
              >
                <MethodBadge method={ep.method} />
                {ep.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Request panel */}
          <div className="space-y-5">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <MethodBadge method={active.method} />
                <code className="font-mono text-sm text-ivory">{active.path}</code>
              </div>
              <p className="text-xs text-grey-muted">{active.description}</p>
            </div>

            {/* Headers display */}
            <div className="overflow-hidden rounded-md border border-line bg-elevated/40">
              <div className="border-b border-line px-4 py-2">
                <span className="font-mono text-[10px] uppercase tracking-wider text-grey-muted">
                  Request Headers
                </span>
              </div>
              <div className="space-y-1 p-4">
                {Object.entries(getHeaders(activeId)).map(([k, v]) => (
                  <div key={k} className="flex gap-2 font-mono text-xs">
                    <span className="text-grey-muted">{k}:</span>
                    <span
                      className={clsx(
                        'truncate',
                        v.startsWith('<') ? 'italic text-grey-muted' : 'text-grey'
                      )}
                    >
                      {v.length > 80 ? v.slice(0, 80) + '...' : v}
                    </span>
                  </div>
                ))}
                {activeId === 'webhook' && (
                  <div className="flex gap-2 font-mono text-xs">
                    <span className="text-grey-muted">X-Signature:</span>
                    <span className="italic text-crimson-bright">computed on send</span>
                  </div>
                )}
              </div>
            </div>

            {/* Body editor (POST only) */}
            {active.method === 'POST' && (
              <div className="overflow-hidden rounded-md border border-line bg-elevated/40">
                <div className="border-b border-line px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-grey-muted">
                    Request Body
                  </span>
                </div>
                <textarea
                  aria-label={`${active.label} request body`}
                  value={bodies[activeId] || ''}
                  onChange={e =>
                    setBodies(b => ({ ...b, [activeId]: e.target.value }))
                  }
                  spellCheck={false}
                  rows={8}
                  className="w-full resize-y bg-transparent p-4 font-mono text-xs leading-relaxed text-ivory-dim focus:outline-none"
                />
              </div>
            )}

            {/* Send button */}
            <div>
              <button
                type="button"
                onClick={() => sendRequest(active)}
                disabled={isLoading || (activeId === 'users' && !token)}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed',
                  isLoading || (activeId === 'users' && !token)
                    ? 'bg-surface-2 text-grey-muted'
                    : 'bg-volt text-[#171612] hover:brightness-[1.06]'
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Send Request
                  </>
                )}
              </button>
              {activeId === 'users' && !token && (
                <span className="ml-3 text-xs text-grey-muted">
                  Login first to get a token
                </span>
              )}
            </div>
          </div>

          {/* Response panel */}
          <div aria-live="polite" aria-busy={isLoading}>
            <div className="mb-1 h-[21px] font-mono text-[10px] uppercase tracking-wider text-grey-muted">
              {(result || isLoading) && 'Response'}
            </div>
            {isLoading ? (
              <ResponseViewer status={0} latencyMs={0} body={null} headers={{}} loading />
            ) : result ? (
              <ResponseViewer
                status={result.status}
                latencyMs={result.latencyMs}
                body={result.body}
                headers={result.headers}
              />
            ) : (
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed border-line text-xs text-grey-muted">
                Send a request to see the response
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
