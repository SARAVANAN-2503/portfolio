# System Architecture & Design Decisions

This document details the architectural choices made for this portfolio system to demonstrate production-grade thinking.

## 1. Multi-Tenant Isolation Strategy
We implemented a **Hybrid Isolation Model** to demonstrate flexibility across different scale tiers.

### Row-Level Isolation (Standard)
Most tables (users, settings, events) use a `tenant_id` foreign key.
- **Middleware Guard**: Every request is intercepted by a `tenantGuard`. It extracts the `tid` claim from the JWT and compares it against the `X-Tenant-ID` header.
- **Query Discipline**: Every SQL statement includes `WHERE tenant_id = ?`.
- **Trade-off**: High operational efficiency (single DB), but carries a slight risk of catastrophic leakage if a developer forgets a filter.

### Schema-per-Tenant (Enterprise)
The system supports attaching individual SQLite files for high-privacy tenants.
- **Implementation**: Uses SQLite's `ATTACH DATABASE` command dynamically.
- **Trade-off**: Physical isolation provides higher security and independent maintenance, but increases migration complexity (N schema updates).

## 2. Stateless Auth & Security
- **JWT (HS256)**: Authentication is handled via stateless tokens.
- **Timing Safe Comparisons**: Webhook signature verification and password hash comparisons use `crypto.timingSafeEqual` and dummy hash padding to prevent side-channel timing attacks.
- **Rate Limiting**: A custom **Token Bucket** middleware limits bursts per IP/Route, protecting expensive endpoints like `/auth/login`.

## 3. High-Performance Pagination
The system defaults to **Cursor-based Pagination** for all list endpoints.
- **Why**: Standard `OFFSET N` pagination degrades to $O(N)$ as depth increases. Cursors use an index-seek ($O(1)$ after initial seek) on a monotonic identifier.
- **Proof**: The "Performance Lab" section of the frontend allows you to benchmark this live against the backend's 10k-record user table.

## 4. Reliable Background Processing
To demonstrate async workflows (e.g., sending emails, processing payments), we built a **Job Queue** backed by the relational database.
- **FIFO Guarantee**: Atomic `UPDATE ... LIMIT 1 RETURNING` ensures that even with vertical scaling, multiple worker ticks don't process the same job.
- **Idempotency**: Webhook events use an `idempotency_key` (HMAC-hashed) to prevent double-processing of duplicate incoming signals.
