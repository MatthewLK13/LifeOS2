# Phase 5: Journey persistence and roadmap proposals

> **For agentic workers:** Execute inline. Write and run each failing test before implementation.

**Goal:** Persist journeys from shared templates and require player approval for versioned roadmap changes.

**Architecture:** Session-scoped routes create pending template proposals. Acceptance locks proposal and journey, checks base version, then applies a create, title/goal edit, or pacing update in one transaction and appends a revision. Pacing splits only long AVAILABLE quests while preserving XP totals and historical quests.

**Tech Stack:** TypeScript, Hono, Drizzle, PostgreSQL, PGlite, existing shared Vanilla JS curriculum.

**Spec:** docs/LifeOS_Codex_Implementation_Spec.md, sections 5, 10.4–10.6, 17.3 and Phase 5 acceptance.

## Global Constraints

- No three-active-journey limit in backend.
- All journey/proposal reads and writes derive ownership from the signed session.
- Every proposal is pending until explicit accept; reject has no gameplay effect.
- Accept checks base_version and returns 409 PROPOSAL_STALE on conflict.
- Completed quests/history are immutable; schedule split XP sum equals the original reward.
- Use shared templates; proposal JSON cannot set authoritative quest rewards or statuses.

## Review Focus

- A stale proposal cannot overwrite a newer accepted version.
- A proposal from another player is hidden as 404.
- Rejected CREATE proposals never become active.
- Completed and in-progress quests are never replaced during pacing changes.
- Concurrent accepts cannot duplicate a revision or generated chapters.

### Task 1: Template journey creation and proposal decisions

**Files:** Create server/journeys/service.ts and server/journeys/routes.ts; modify server/app.ts; test tests/api-journeys.test.mjs.

- [x] Write failing tests for strict generation input, pending preview without activation, create acceptance, reject, ownership and unlimited active journeys.
- [x] Implement generation from the shared template and transactional create accept/reject.

### Task 2: Modify/pacing proposals and journey lifecycle

**Files:** Modify server/journeys/service.ts and routes.ts; extend tests/api-journeys.test.mjs.

- [x] Write failing tests for stale/conflicting proposals, title/goal edits, schedule splitting, XP conservation, immutable statuses, revisions, finish and archive.
- [x] Implement proposal creation/acceptance and journey lifecycle.

### Task 3: API client and verification

**Files:** Modify src/api-client.js, tests/api-client.test.mjs, docs/PROGRESS.md and docs/VERIFICATION.md.

- [x] Add tested session-backed journey/proposal client methods.
- [x] Run pnpm test (60 passed), pnpm typecheck, and pnpm build.
- [x] Document the remaining UI integration boundary.
