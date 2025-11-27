# LineSight

LineSight is a data intelligence platform built to give teams a clear view of how AI-powered workflows perform in production. It focuses on traceability, transparent evaluation, and actionable insights so you can confidently ship and improve AI features.

## Purpose
- **Operational visibility:** Consolidate events, evaluations, and user feedback into a single source of truth.
- **Quality and governance:** Track lineage across models, prompts, datasets, and releases to understand impact.
- **Productivity:** Give engineers and analysts dashboards and chat tools to quickly answer questions about system behavior.

## Core Features
- **Dashboards:** KPI and health dashboards that surface usage, latency, cost, and quality signals.
- **Traceability:** End-to-end lineage for requests, model responses, prompts, datasets, and evaluation runs.
- **Similarity engine:** Vector similarity search to find related conversations, runs, or documents for faster triage.
- **Chat assistant:** Conversational assistant that explains metrics, digs into traces, and summarizes insights.

## Tech Stack
- **Frontend:** React/Next.js (TypeScript) with Tailwind CSS for rapid UI development.
- **Backend:** Node.js/Express services exposing REST and GraphQL APIs.
- **Data layer:** PostgreSQL managed through Prisma ORM, with vector capabilities for similarity search.
- **Infra & tooling:** Docker-based local environment, Turborepo-style scripts for consistent workflows, and Jest/Playwright for testing.

## Environment Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)
- PostgreSQL 14+ running locally or accessible via `DATABASE_URL`
- Docker (optional) for containerized services

## Installation
```bash
npm install
```

## Running the App
```bash
npm run dev
```
Starts the development server (frontend and backend) with hot reload.

For a production build:
```bash
npm run build
npm start
```

## Database Setup
Ensure `DATABASE_URL` is set in your environment (e.g., `.env`).

Run migrations and generate the Prisma client:
```bash
npx prisma migrate dev
```

Seed sample data for local development:
```bash
npx prisma db seed
```

Inspect the schema:
```bash
npx prisma studio
```

## Development Scripts
- `npm run dev` – Start the development servers.
- `npm run lint` – Lint the codebase.
- `npm run test` – Run unit tests.
- `npm run e2e` – Execute end-to-end tests.
- `npm run format` – Apply code formatting (Prettier).

## Testing Approach
- **Unit tests:** Validate utilities, services, and UI components with Jest and React Testing Library.
- **Integration tests:** Cover API routes, database interactions, and shared workflows.
- **End-to-end tests:** Use Playwright to simulate real user flows across dashboards, trace views, and chat assistant.
- **Static checks:** ESLint and TypeScript keep code quality and type safety high.

## Contribution Guidelines
1. Fork and clone the repository.
2. Create a feature branch from `main`.
3. Write clear commits with descriptive messages.
4. Add or update tests for any behavior changes.
5. Run linters and the full test suite before opening a pull request.
6. Submit a PR with a concise summary and include screenshots for UI changes.

Thank you for helping make LineSight better!
# Linesight v2

A Next.js App Router + TypeScript starter pre-wired with Tailwind CSS and Prisma for manufacturing traceability, process execution, and quality data.

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Apply the database schema (SQLite default)**
   ```bash
   npx prisma migrate dev --name init
   ```
3. **Seed the database with sample data**
   ```bash
   npm run seed
   ```
4. **Run the dev server**
   ```bash
   npm run dev
   ```

The default Prisma datasource uses a local SQLite database at `prisma/dev.db`. To switch to Postgres, update the `datasource db` block in `prisma/schema.prisma` and set `DATABASE_URL` in your environment.

## Scripts

- `npm run dev` - Start the Next.js development server.
- `npm run build` - Build the production bundle.
- `npm run start` - Run the production server.
- `npm run lint` - Run ESLint.
- `npm run prisma:migrate` - Run `prisma migrate dev` to apply migrations.
- `npm run prisma:generate` - Regenerate the Prisma client.
- `npm run seed` - Execute `prisma db seed` (see `prisma/seed.ts`).

## Project structure

```
app/                      Next.js App Router (under `src/app`)
prisma/                   Prisma schema, migrations, and seeds
src/lib/                  Shared libraries (e.g., Prisma client helper)
```

Seeded domain models include Units, Kits, Component Lots, Process Step Definitions & Executions, CTQ Definitions, Measurements, Fixtures, and Episodes.
