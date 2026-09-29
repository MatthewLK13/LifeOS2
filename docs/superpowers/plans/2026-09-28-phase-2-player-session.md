# Phase 2: Player session and restore

## Scope

Implement the spec's guest identity, Player Code, signed session cookie, restore flow and demo-session switch. Preserve the current browser demo and do not expose raw codes or accept player IDs from client requests. Use an atomic PostgreSQL-backed restore limiter so serverless instances share the limit. Do not implement state bootstrap, gameplay APIs, demo reset or production deployment in this phase.

## Plan

- [x] Add API integration tests against the PostgreSQL schema for guest creation/idempotency, code digest/restore, session cookie validation, demo access and rate limits.
- [x] Add the shared restore-rate-limit table and migration.
- [x] Implement code generation/normalization/digest and signed-cookie helpers.
- [x] Implement player create, restore, demo and me routes with Zod validation and typed errors.
- [x] Wire optional Neon DB access into the API while keeping health/catalog available without a DB.
- [x] Verify tests, typecheck, build and local HTTP smoke test.

## Boundary

The browser UI remains on localStorage until Phase 3. No live Neon connection is made without a configured development branch. Demo reset will be implemented with the state/persistence phase so it can restore the complete seeded state transactionally.
