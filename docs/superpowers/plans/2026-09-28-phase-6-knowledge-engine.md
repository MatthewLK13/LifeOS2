# Phase 6: Knowledge Engine and Dynamic Graph

> **For agentic workers:** Execute inline. Write each failing test before implementation.

**Goal:** Persist monotonic concept knowledge, calculate domain ranks on the server, and render player-owned domains/concepts in the existing desktop graph.

**Architecture:** Keep knowledge signal ingestion server-internal until the analyzer exists. A deterministic progression service resolves seed/dynamic concepts, records accepted signals, and promotes levels transactionally. The aggregate state computes ranks from stored levels; the UI maps unknown domains into the current graph and list views.

**Tech Stack:** TypeScript, Hono/Drizzle, PostgreSQL, PGlite, Vanilla JS/SVG graph.

**Spec:** `docs/LifeOS_Codex_Implementation_Spec.md`, sections 7.12–7.15, 8, 18, and Phase 6.

## Global Constraints

- Knowledge levels only move upward: UNSEEN → DISCOVERED → EXPLORING → UNDERSTANDING → APPLYING → MASTERED.
- Gemini never selects a final level; deterministic rules evaluate validated signals.
- Evidence stays backend-only. UI shows current level and domain but no private rationale or transcript evidence.
- Seeded catalog rows are global; dynamically created rows belong to the current player.
- Domain rank is separate from XP level and uses the spec's breadth thresholds.

## Review Focus

- Low-confidence signals cannot advance knowledge.
- Repeated signals from the same attempt cannot satisfy distinct-attempt thresholds.
- A later weak signal cannot lower an existing level.
- Similar dynamic names normalize to one player-owned concept/domain.
- Unknown domains render and filter safely without static template metadata.

---

### Task 1: Domain rank policy

**Files:** Create `server/knowledge/rank.ts`; test `tests/knowledge-rank.test.mjs`; modify `server/state/service.ts`.

- [x] Test every threshold and breadth requirement, including one mastered concept failing to produce Master.
- [x] Implement the centralized deterministic score/rank function and calculate ranks from a player's concept levels.
- [x] Verify with focused test and PGlite aggregate-state assertions.

### Task 2: Dynamic concepts and monotonic signal engine

**Files:** Create `server/knowledge/service.ts`; test `tests/api-knowledge.test.mjs`; modify migration/schema only if a concrete missing invariant is found.

- [x] Test normalized domain/concept resolution, owner isolation, confidence rejection, distinct-source thresholds, monotonicity, and transaction rollback.
- [x] Implement a strict internal `recordKnowledgeSignal(db, playerId, candidate, source)` service. Do not expose a public route that lets browsers assign their own knowledge level.
- [x] Apply deterministic progression and persist structured signal counts and backend-only signal rows.
- [x] Run PGlite knowledge tests and typecheck.

### Task 3: Dynamic graph adaptation

**Files:** Modify `src/server-state.js`, `src/graph.js`, `src/pages.js`; test `tests/server-state.test.mjs` and graph behavior in `tests/catalog.test.mjs`.

- [x] Test dynamic domains/concepts survive state mapping with no evidence and static tracks remain unchanged.
- [x] Render domain roots, dynamic concepts, tabs, list filtering, and unknown-domain node icons without `trackById` assumptions.
- [x] Verify the graph fixtures retain all existing static branches and remain selectable.

### Task 4: Verification and progress

- [x] Run `pnpm test`, `pnpm typecheck`, and `pnpm build`.
- [x] Update progress and verification docs, including the fact that no AI analyzer submits signals yet.
