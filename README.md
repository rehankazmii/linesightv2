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
