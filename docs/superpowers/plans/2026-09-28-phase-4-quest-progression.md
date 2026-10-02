# Phase 4: Server-authoritative quest progression

> **For agentic workers:** Execute inline in this session. Use test-driven development for every behavior change.

**Goal:** Move quest start, steps, notes, skip, XP and streak rules behind authenticated server endpoints.

**Architecture:** A quest service runs each mutation in a database transaction, resolves player identity only from the signed session, and returns the changed quest plus authoritative progress. Completion locks the quest/profile, applies Vietnam-local daily XP cap and streak rules, and writes one XP ledger entry.

**Tech Stack:** TypeScript, Hono, Drizzle ORM, PostgreSQL, PGlite, Node test runner.

**Spec:** docs/LifeOS_Codex_Implementation_Spec.md, sections 5, 17.4, 24–26 and Phase 4 acceptance.

## Global Constraints

- Browser values never set XP, rank, Coins, streak, player ID, reward amount, or completed status.
- Completing a quest twice cannot award XP or extend streak twice.
- Daily XP is capped at 120 in the player's timezone.
- Completed quests and their steps/notes are immutable to ordinary endpoints.
- Other players' quest IDs are indistinguishable from missing IDs.

## Review Focus

- Malformed/extra client fields cannot change reward, player, or status.
- Two concurrent completion requests award XP only once.
- Date change rolls daily XP to zero before applying the next reward.
- XP at/above cap does not block completion and cannot make daily XP exceed 120.
- Cross-player quest/step/note IDs never mutate another player's rows.

### Task 1: Quest mutation service/routes

**Files:** Create server/quests/service.ts and server/quests/routes.ts; modify server/app.ts and src/api-client.js; test tests/api-quests.test.mjs and tests/api-client.test.mjs.

**Interfaces:** POST /api/quests/:id/start, POST /api/quests/:id/complete, POST /api/quests/:id/skip, PATCH /api/quests/:id/steps/:stepId, PUT /api/quests/:id/note. Completion response returns current quest, xpAwarded, and authoritative progress.

- [x] Write PGlite API tests for session ownership, strict request shapes, note bounds, and legal transitions; observe expected failures.
- [x] Write tests for XP cap, next-day rollover, idempotency, concurrent retries, single ledger entry, streak and longest streak.
- [x] Implement transactional services and mount routes.
- [x] Add centralized frontend quest API helpers and verify requests omit client-authoritative values.
- [x] Run focused and full tests.

### Task 2: Verify and record

**Files:** Modify docs/PROGRESS.md and docs/VERIFICATION.md.

- [x] Run pnpm test (52 passed), pnpm typecheck, and pnpm build.
- [x] Record supported endpoints and the next roadmap persistence boundary.
