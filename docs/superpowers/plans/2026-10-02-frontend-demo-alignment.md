# LifeOS V2 Frontend Demo Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the runnable demo with the LifeOS V2 frontend spec while preserving the frozen backend and deterministic offline behavior.

**Architecture:** Keep `src/skill-intelligence.js` as the pure local demo state engine and `src/skill-pages.js` as the V2 page renderer. Simplify `src/app.js` to four visible routes, delegated local transitions, and a profile reset action; leave server/API modules untouched.

**Tech Stack:** Vanilla ES modules, HTML, CSS, Node test runner, TypeScript typecheck, existing SVG graph engine.

**Spec:** `C:/Users/Admin/Downloads/LIFEOS_V2_FRONTEND_DEMO_SPEC.md`

## Global Constraints

- Frontend demo must work offline with deterministic local state.
- Do not modify `server/**`, `api/**`, database schema, migrations, auth, or production APIs.
- Visible product language is English and must not use legacy fantasy vocabulary.
- Primary navigation is exactly Today, My Knowledge, Career Campaign, Learning Hub.
- Demo actions are immutable/pure at the intelligence layer and do not award XP or call the network.

## Review Focus

- Legacy vocabulary can leak through shared shell or page copy: cover with a visible-HTML language regression test.
- Skill transitions can mutate unrelated state: cover immutable transition tests for Skill Check, Applied Trial, Recall, Boss Quest, and reset.
- Legacy routes can expose hidden pages: cover navigation and redirect tests.
- Four screens can render different role/state data: cover rendering tests for all pages and the canonical career set.
- Desktop shell can regress at competition widths: verify 1366×768, 1440×900, and 1920×1080 manually.

### Task 1: Pure demo state transitions

**Files:** Modify `src/skill-intelligence.js`; Test `tests/skill-intelligence.test.mjs`.

- Add role set Backend Developer, UX Researcher, and Product Marketing Manager while retaining backend as the canonical deep path.
- Add `demoHistory`, `selectRecommendation`, `completeSkillCheck`, `completeAppliedTrial`, `completeBossQuest`, and `resetSkillIntelligenceDemoState` with immutable deterministic transitions.
- Keep Recall freshness-only and add simulated BKT disclosure data.

### Task 2: Four-screen V2 rendering

**Files:** Modify `src/skill-pages.js`; Test `tests/skill-pages.test.mjs`.

- Remove legacy XP/rank/fantasy copy from V2 pages.
- Add Skill Check, Applied Trial, Recall Quest, Boss Quest, BKT modal content, and updated Skill Passport/evidence labels.
- Make Today’s recommended action change after Skill Check and Applied Trial.

### Task 3: App shell and interactions

**Files:** Modify `src/app.js`, `src/ui.js`, `index.html`.

- Render only four visible nav links and redirect legacy hashes to Today.
- Add profile menu with Reset Demo, remove standalone Companion/Progress/Settings from visible navigation, and route actions to local demo transitions.
- Keep existing account bootstrap/API contracts unchanged.

### Task 4: Bright visual system

**Files:** Modify `src/styles.css` and `design/asset/lifeos/DESIGN.md`.

- Replace fantasy palette, fonts, hard borders, and parchment surfaces with the specified Be Vietnam Pro-like system font stack, blue/teal/purple tokens, rounded cards, and soft shadows.
- Preserve desktop graph usability and keyboard focus states.

### Task 5: Documentation and regression guards

**Files:** Create `PROJECT_STATE.md`, modify `README.md`, create `tests/ui-language.test.mjs`, modify `scripts/build.mjs`.

- Document the frontend-first demo boundary and known limitations.
- Add visible language and navigation regression checks; update build metadata.

### Task 6: Verification and handoff

- Run focused tests, all tests serially, typecheck, build, diff checks, and desktop smoke QA.
- Commit only implementation files; keep pre-existing `repomix.md` out of commits.
- Stop after frontend demo alignment; do not implement Backend V2.
