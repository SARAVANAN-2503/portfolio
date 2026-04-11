# API Reference

The backend API is a RESTful service following standard HTTP conventions.

## Base URL
`http://localhost:4000`

## Authentication
Most endpoints require a Bearer token in the `Authorization` header.

## Endpoints

### Auth
`POST /api/auth/login`
- **Body**: `{ email, password }`
- **Response**: `{ token, user }`
- **Note**: Extracts JWT usable in subsequent requests.

### Tenants
`GET /api/tenants`
- **Auth**: Public
- **Response**: List of available tenants and their isolation metadata.

### Users (Pagination Demo)
`GET /api/users?limit=M&cursor=N`
- **Headers**: `X-Tenant-ID` (Must match JWT tid)
- **Response**: Paginated list of users for the current tenant.

### Webhooks
`POST /api/payments/webhook`
- **Headers**: `X-Signature` (HMAC-SHA256 of raw body)
- **Payload**: `{ event, data, idempotencyKey }`
- **Response**: `202 Accepted` with a `jobId`.

### Jobs
`GET /api/jobs/:id`
- **Response**: Current status (`pending`, `processing`, `done`, `failed`) and result of a background job.
