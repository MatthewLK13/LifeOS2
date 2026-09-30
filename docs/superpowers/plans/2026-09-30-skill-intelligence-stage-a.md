# LifeOS V2 Adaptive Skill Intelligence — Phase 1–2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the complete interactive, English-language LifeOS V2 demo UI through Phase 2, then stop for the user's UX review.

**Architecture:** Add a dedicated, server-shaped V2 demo view model and render V2 screens in focused frontend modules on the existing Vanilla JavaScript application. Keep backend DTO adaptation, account mutations, offline demo, Journey/Quest systems, and existing server authority unchanged; clearly label V2 metrics as illustrative mock data.

**Tech Stack:** Existing Vanilla JavaScript, HTML templates, CSS, Node test runner, Hono/Drizzle backend kept unchanged.

**Spec:** `C:/Users/Admin/Downloads/LifeOS V2 — Adaptive Skill Intelligence Implementation Specification.md`, especially sections 5–7, 8–32, 82, and rollout Phase 0–2 in section 102. The approved direction is reflected in `docs/superpowers/specs/2026-09-30-lifeos-skill-intelligence-v2-design.md`.

## Global Constraints

- Use the current application; do not create a project or migrate frontend frameworks.
- Preserve Hono, Drizzle, PostgreSQL/Neon, Vercel, Gemini, account identity, Player Code, offline mode, Journey/Quest, XP, assessments, progression, inventory, and notifications.
- Phase 1–2 are UI-first and use mock/server-shaped data; do not add BKT, migrations, learner-model algorithms, new backend endpoints, or production career/recommendation authority.
- Never put mock V2 fields into real API DTOs or claim mock actions were saved to an account.
- Keep the existing Grimoire visual language and usable responsive layouts for desktop ≥1200px, tablet 768–1199px, and mobile <768px.
- Keep completed activity/history, XP, and evidence unchanged; game rewards remain cosmetic and cannot buy mastery.
- Keep course recommendation fit independent of affiliate commission; distinguish sponsored placement and show disclosure and free alternatives.
- Use English for new UI copy.
- End after Phase 2 verification and request UX review; do not start Phase 3 or backend work.

## Review Focus

- **Authenticated account sees demo metrics as server truth:** test explicit demo labeling and ensure no mock V2 data is merged into server DTOs or account mutations.
- **Insufficient coverage still shows a precise readiness score:** test the insufficient-evidence render branch.
- **Changing career leaves stale recommendations/gaps from the prior role:** test the entire view model changes coherently for all three seeded careers.
- **Recall/Boss Quest completion silently grants mastery or alters history:** test mock action boundaries; preserve mastery, XP, completed quests, and server state.
- **Affiliate status affects course ordering or is undisclosed:** test fit order independence from commission and the visible disclosure/free alternative.

---

### Task 1: Freeze the pre-V2 baseline and create the V2 demo view model

**Files:**
- Create local baseline tag: `v1-pre-skill-intelligence` at the frozen product commit `3993b4acb5b5fb9ecc11daa5986e217de582dacd` (fetched `origin/develop`, before the design-only commit).
- Create: `src/skill-intelligence.js`
- Test: `tests/skill-intelligence.test.mjs`

**Interfaces:**
- Produces `createSkillIntelligenceDemoState()` with `career`, `learnerState`, `recommendations`, `campaign`, `learningHub`, and `skillPassport` sections following the spec's Stage A contract.
- Produces immutable/pure helpers to select one of the three career targets and apply demo-only actions such as Recall; no helper calls APIs or awards real XP/mastery.
- Seed Minh and the exact Backend Developer Intern story in section 29–30. Other two roles must yield internally consistent role-specific gaps and action recommendations.

- [x] **Step 1: Write failing model tests**
  - Assert seeded persona values: 58% readiness, 72% coverage, skill/evidence states, gaps, and the three specified action names.
  - Assert changing to AI/ML Engineer or Data Analyst updates target, gaps, and actions consistently.
  - Assert insufficient-coverage input returns `INSUFFICIENT_EVIDENCE` without a numeric score.
  - Assert Recall updates freshness only and does not change mastery, XP, or history.
- [x] **Step 2: Run `pnpm exec node --test tests/skill-intelligence.test.mjs` and verify the tests fail for missing model exports.**
- [x] **Step 3: Implement the minimal seeded model and pure demo transitions.** Keep role data, semantic relationships, campaign/Boss data, recommendation reasons, course-fit data, and passport data outside page-render functions.
- [x] **Step 4: Run the focused model tests and verify they pass.**
- [x] **Step 5: Check the model never imports `api-client.js` or mutates the server/offline game state.**

### Task 2: Phase 1 navigation and Today Skill Intelligence dashboard

**Files:**
- Create: `src/skill-pages.js`
- Modify: `src/app.js`
- Modify: `src/pages.js` only where shared composition is needed
- Modify: `src/styles.css`
- Test: `tests/skill-pages.test.mjs` (create)

**Interfaces:**
- `renderTodaySkillPage(viewModel, {demoPreview})` renders role/readiness/coverage/confidence, three gaps, and Recommended/Quick Win/Challenge.
- `renderRecommendationExplanation(action)` renders the human-readable six-dimension explanation without internal weights.
- `app.js` keeps `roadmap` as the internal hash while displaying “Career Campaign”; adds Learning Hub navigation and wires V2 demo state/actions.

- [x] **Step 1: Write failing render tests** for role summary, insufficient-evidence branch, three gap cards, only one Recommended marker, recommendation explanations, and demo-preview labeling in account mode.
- [x] **Step 2: Run the focused page test and verify it fails on missing V2 rendering.**
- [x] **Step 3: Implement the V2 view wiring, English navigation, Today dashboard, career selector, gap-to-Knowledge action, and recommendation-selection/rationale interactions.** Keep legacy account/offline quest controls available.
- [x] **Step 4: Add parchment-based responsive styling and render tests for desktop-sized markup plus semantic labels/buttons.**
- [x] **Step 5: Run focused model and page tests; manually verify the Today → gap → Knowledge navigation and all three action choices.**

### Task 3: Phase 2 Career Campaign and Boss Quest

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/app.js`
- Modify: `src/styles.css`
- Test: `tests/skill-pages.test.mjs`

**Interfaces:**
- `renderCareerCampaignPage(viewModel)` renders target role, readiness, campaign progress/arcs, preserved historical work, adaptive future work, gaps, and Boss checkpoints.
- `renderBossQuestDetail(bossQuest)` renders objectives, multi-skill coverage, prerequisites, expected evidence, instructions, mock submission, status, and possible rewards.

- [x] **Step 1: Write failing tests** for adaptive future chapters, immutable completed history, all Boss Quest detail fields, and explicit mock/evaluation behavior.
- [x] **Step 2: Verify the focused tests fail before rendering is added.**
- [x] **Step 3: Implement campaign and Boss Quest views using the existing Journey/Arc/Chapter/Quest concepts and modal conventions; do not create a second persisted roadmap.**
- [x] **Step 4: Wire campaign navigation and Boss Quest inspect/submit demo interactions. Verify completion alone changes no mastery, XP, or stored account state.**
- [x] **Step 5: Run the focused tests.**

### Task 4: Phase 2 My Knowledge V2 and semantic graph presentation

**Files:**
- Modify: `src/pages.js`
- Modify: `src/graph.js`
- Modify: `src/app.js`
- Modify: `src/styles.css`
- Test: `tests/skill-pages.test.mjs` and `tests/curriculum.test.mjs` as needed

**Interfaces:**
- Extend concept detail rendering to consume the matching `ConceptStateView` without changing the catalog or server DTO shape.
- Add graph relation styling/legend for `PREREQUISITE`, `RELATED`, `PART_OF`, and `TRANSFERABLE_TO`; only presentation is required in Phase 2.

- [x] **Step 1: Add failing tests** for mastery, confidence, coverage, freshness, evidence indicators, freshness-only Recall, and relation labels/styles.
- [x] **Step 2: Verify the tests fail on missing V2 presentation.**
- [x] **Step 3: Add learner-state detail and semantic relation legend while preserving current graph zoom, pan, list view, and account privacy behavior.**
- [x] **Step 4: Wire concept/gap opening and Recall Quest demo action. Confirm no private chat evidence is rendered and no mastery decay is implied.**
- [x] **Step 5: Run focused page, graph, and existing curriculum tests.**

### Task 5: Phase 2 Progress V2, Skill Passport, and Rank-Up

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/pages.js`
- Modify: `src/app.js`
- Modify: `src/styles.css`
- Test: `tests/skill-pages.test.mjs`

**Interfaces:**
- `renderSkillPassport(viewModel)` displays role skills, projected mastery label, and evidence-strength indicators.
- Progress rendering keeps character XP/level visibly separate from competency/rank; Rank-Up is a clearly labeled presentation-only demo modal.

- [x] **Step 1: Write failing tests** for the competency sections, passport skills, distinction between Character Level and Domain Rank, and Rank-Up modal/reward language.
- [x] **Step 2: Verify the focused tests fail before implementation.**
- [x] **Step 3: Implement the Progress V2 content and Skill Passport preview, retaining existing progression/economy data and controls.**
- [x] **Step 4: Add a demo-only Rank-Up trigger and verify it awards no real coins, XP, or rank.**
- [x] **Step 5: Run focused page tests.**

### Task 6: Phase 2 Learning Hub, course fit/disclosure, and Companion updates

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/companion.js`
- Modify: `src/app.js`
- Modify: `src/styles.css`
- Test: `tests/skill-pages.test.mjs` and `tests/companion.test.mjs`

**Interfaces:**
- `renderLearningHubPage(viewModel)` presents recommendations, free resources, partner courses, Boss Challenges, and Recall Activities.
- `renderCourseDetail(course)` explains covered skills, fit, level, duration, price, provider trust, and recommendation reasons.
- Course fit is computed from mock learning-fit fields only; `commission` and sponsored placement must not change fit ordering.

- [x] **Step 1: Write failing tests** for course details, free alternatives, visible disclosure, Recommended vs Sponsored distinction, and identical fit ordering regardless of commission.
- [x] **Step 2: Verify the focused tests fail on the absent Hub.**
- [x] **Step 3: Implement Hub/course views and safe placeholder provider links; add explicit demo-only labels.**
- [x] **Step 4: Update Companion copy to distinguish inferred observations from evaluated LifeOS state; preserve live chat and roadmap behavior.**
- [x] **Step 5: Run focused Learning Hub and Companion tests.**

### Task 7: Phase 2 responsive/accessibility pass and full verification — then STOP

**Files:**
- Modify: `src/styles.css` and any V2 page module that needs a verified fix
- Test: V2 focused tests and all existing tests

- [x] **Step 1: Review each Phase 1–2 completion criterion in spec section 32 against the implementation.**
- [x] **Step 2: Verify primary controls by keyboard and check focus states, labels, dialogs, and semantic buttons.** Keyboard focus is visible; primary page controls use labeled semantic buttons. This was a smoke check, not a full screen-reader audit.
- [x] **Step 3: Verify desktop layout at 1280px and 900px; fix only issues found.** Mobile-width QA was intentionally omitted because the user asked to focus on desktop.
- [x] **Step 4: Run typecheck, all tests, and build; record final pass/fail counts.** `pnpm typecheck` and `pnpm build` passed. `node --experimental-strip-types --test --test-concurrency=1 <all tests/**/*.test.mjs>` passed 141/141. Serial execution avoids this host's memory issue with the default parallel test command.
- [x] **Step 5: Smoke-check offline demo and account bootstrap; confirm API payloads remain unchanged and demo actions do not masquerade as persisted state.** Offline preview and account-service-unavailable fallback rendered; focused tests cover unchanged session-backed API contracts and demo-only actions.
- [ ] **Step 6: Review `git diff --check` and changed files. Commit the implementation and push only `feature/skill-intelligence-v2`. Keep `repomix.md` out of commits.**
- [ ] **Step 7: STOP after Phase 2 and present the UI for user review. Do not implement Phase 3, BKT, database migrations, evidence persistence, or real recommendation APIs.**

---

## Execution Notes

- Keep commits reviewable and scoped to the task being completed. Do not stage the pre-existing `repomix.md` modification.
- The initial baseline was verified on the current `develop` head: `pnpm typecheck` passed, `pnpm build` passed, and `pnpm test` reported 121 passing tests.
- The feature branch is based on fetched `origin/develop` commit `3993b4acb5b5fb9ecc11daa5986e217de582dacd`.
