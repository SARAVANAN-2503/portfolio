export type ISODate = string;

export interface ApiError {
  code: string;
  message: string;
  requestId?: string;
  details?: unknown;
}

export interface ApiErrorResponse {
  error: ApiError;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  tenantId: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'member';
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
  user: AuthUser;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: ISODate;
}

export interface TenantsResponse {
  data: Tenant[];
  isolation: {
    strategy: 'row-level' | 'schema-per-tenant';
    tenantIdHeader: string;
    note: string;
  };
}

export interface PaginatedUser {
  id: number;
  tenantId: string;
  email: string;
  name: string;
  role: string;
  createdAt: ISODate;
}

export interface CursorPage<T> {
  data: T[];
  pageInfo: {
    nextCursor: string | null;
    hasMore: boolean;
    count: number;
  };
}

export interface WebhookRequest {
  event: string;
  data: Record<string, unknown>;
  idempotencyKey: string;
}

export interface WebhookResponse {
  accepted: true;
  jobId: string;
  event: string;
}

export interface Job {
  id: string;
  type: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  attempts: number;
  createdAt: ISODate;
  updatedAt: ISODate;
  result?: unknown;
}
