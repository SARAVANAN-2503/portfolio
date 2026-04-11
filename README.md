# Technical Portfolio & System Design Showcase

A production-grade dual-application portfolio designed for engineering leaders. It showcases real-world architectural patterns (multi-tenancy, real-time queues, cursor pagination) through a live interactive experience, not just static descriptions.

## 🚀 Vision
This portfolio is its own proof. Every technical claim made in the case studies is demonstrated live by the accompanying backend API. Latency numbers, isolation proofs, and queue flows are real wall-clock measurements from the local environment.

## 🏗️ Architecture
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Node.js/Express, better-sqlite3 (WAL mode), JWT Auth, JSON Logging.
- **Testing**: Vitest + Supertest (30+ test cases covering auth, isolation, and performance).
- **Diagrams**: Interactive React Flow visualizations for multi-tenant routing, API lifecycle, and RBAC.

## 📂 Structure
```text
portfolio/
├── frontend/          # Next.js 14 Application
├── backend/           # Express API Server
├── shared/            # Shared Zod schemas & TypeScript types
└── docs/              # Technical documentation (System Design)
```

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 20+
- npm

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
The backend initializes a SQLite database at `./data/portfolio.db` with 10,000+ seeded records for performance benchmarking.

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🌟 Key Features
- **Explain Mode**: Interview-ready toggle for each project showing pitches, talking points, and trade-offs.
- **Live API Explorer**: Test real JWT-protected endpoints with auto-filling tokens and HMAC signatures.
- **Performance Lab**: Real-time benchmark comparing Cursor vs Offset pagination throughput.
- **Interactive System Design**: Animated flows for complex system behaviors.

## 📝 Documentation
- [Architecture & System Design](./docs/ARCHITECTURE.md)
- [API Reference](./docs/API.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)