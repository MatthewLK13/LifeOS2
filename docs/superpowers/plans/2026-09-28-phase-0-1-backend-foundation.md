# Phase 0–1: Backend foundation

## Scope

Implement only the first task in `LifeOS_Codex_Implementation_Spec.md`: project/backend foundations, canonical shared catalog, initial PostgreSQL schema/migration, and deterministic seed. Keep the existing English desktop demo and localStorage behavior intact. No live AI, auth flow, gameplay APIs, Neon connection, or deployment in this phase.

## Plan and status

- [x] Read the supplied spec and identify its first-task boundary.
- [x] Add TypeScript/Hono/Drizzle/Zod foundation and validated, development-only DB configuration.
- [x] Move curriculum, breadth, track and concept catalog to shared ESM data consumed by UI and server.
- [x] Define the Phase 1 PostgreSQL schema, generate migrations, and enforce owner-safe relationships.
- [x] Add deterministic, idempotent seed data in one transaction.
- [x] Add `/api/health` and `/api/catalog` foundation routes.
- [x] Verify migration, seed, constraints and transaction rollback with PGlite.
- [x] Review and close the database-target bypass, API port validation, cross-owner relations, and stale-catalog seed findings.
- [x] Verify full automated suite, TypeScript, build and local API startup.
- [ ] Apply migration and seed to an isolated Neon development branch when its credentials are configured.

## Important boundary

No `.env` secrets were present. The work did not connect to, migrate, seed, or deploy to any remote database. `pnpm db:migrate` and `pnpm db:seed` require the user to configure an isolated development branch first; the runtime guard checks the database host against `NEON_DEV_DB_HOST`.
