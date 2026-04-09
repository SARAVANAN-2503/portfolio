const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface ApiResponse<T> {
  data: T;
  latencyMs: number;
  status: number;
  headers: Record<string, string>;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;
  const start = performance.now();
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });
  const latencyMs = Math.round(performance.now() - start);
  const data = (await res.json()) as T;
  const headers: Record<string, string> = {};
  res.headers.forEach((v, k) => {
    headers[k] = v;
  });
  return { data, latencyMs, status: res.status, headers };
}
