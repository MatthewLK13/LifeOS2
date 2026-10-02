# Phase 3: Aggregate State Implementation Plan

> **For agentic workers:** Execute inline in this session. Follow test-driven development for every behavior change.

**Goal:** Add an authenticated, migration-friendly `GET /api/state` response containing the current player's profile, journeys, quests, knowledge, progress and supporting UI data.

**Architecture:** A focused server state service reads all player-owned records plus global catalog records, then projects them into a validated UI DTO. The Hono route resolves the signed player session and returns no-store data; the browser receives a centralized API client for aggregate reads. No client-supplied player ID is trusted.

**Tech Stack:** TypeScript, Hono, Drizzle ORM, Zod, PostgreSQL, Node test runner, PGlite.

**Spec:** `docs/LifeOS_Codex_Implementation_Spec.md`, sections 17.2, 18.2–18.5 and Phase 3 acceptance.

## Global Constraints

- Keep existing Vanilla JS UI and visual design.
- Never return backend-only knowledge signal evidence.
- Player state must be resolved from the signed session cookie.
- Keep the static demo usable when no database is configured.
- Preserve completed history and never treat client values as authoritative.

## Review Focus

- Missing/expired/tampered session receives a safe 401, never another player's state.
- Empty new guest returns a complete, renderable DTO with empty journey history.
- Demo response contains seeded history and does not leak signal evidence or Player Code digests.
- Dates and XP totals agree with the Vietnam day and XP ledger.
- Optional global catalog records remain separate from player-specific progress.

---

### Task 1: Authenticated aggregate state service and route

**Files:**
- Create: `server/state/service.ts`
- Create: `server/state/routes.ts`
- Modify: `server/app.ts`
- Test: `tests/api-state.test.mjs`

**Interfaces:**
- Consumes: signed cookie helpers from `server/player/identity.ts`; Drizzle tables in `server/db/schema.ts`.
- Produces: `GET /api/state` with the response shape from spec section 17.2.

- [x] Write tests for session-required, guest-empty, demo-seeded, evidence-redacted, and hidden SYSTEM-message responses.
- [x] Run the focused test and confirm expected failures.
- [x] Implement state query/projection and mount the route.
- [x] Run focused tests.

### Task 2: Browser API client for aggregate state

**Files:**
- Create: `src/api-client.js`
- Test: `tests/api-client.test.mjs`

**Interfaces:**
- Produces: `getState({fetchImpl})` with same-origin credentials, JSON validation, and typed safe errors.

- [x] Write tests for credentials, successful response, and server/network failures.
- [x] Run the focused test and confirm expected failures.
- [x] Implement the small fetch wrapper.
- [x] Run focused tests.

### Task 3: Update implementation record and verify

**Files:**
- Modify: `docs/PROGRESS.md`
- Modify: `docs/VERIFICATION.md`

- [x] Record Phase 3 aggregate API scope and the remaining frontend mutation migration boundary.
- [x] Run `pnpm test` (44 passed), `pnpm typecheck`, and `pnpm build`.

**Boundary:** Player-session bootstrap, quest/gameplay mutations, journey persistence mutations, and UI cutover depend on following phases. This phase adds the authenticated aggregate read contract without switching the mock-first static demo away from its local state prematurely.
