# LifeOS React Academic Quest Demo Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan inline. Steps use checkbox syntax for tracking.

**Goal:** Move LifeOS's active demo UI to React and present one complete academic quest package per field, using the same content model for local examples and Gemini roadmaps.

**Architecture:** React owns the visible shell, navigation, academic field explorer, quest dialog, and Gemini preview/accept flow. Existing pure demo state, API client, authentication/session layer, database, and Gemini server endpoint remain in place; rich quest sections travel through the existing JSON metadata and proposal preview.

**Tech Stack:** React, React DOM, Vite, Motion, existing JavaScript/TypeScript modules, Hono, PostgreSQL JSON metadata.

**Spec:** `docs/superpowers/specs/2026-10-02-lifeos-react-academic-quests-design.md`

## Global Constraints

- The UI remains English and desktop-first.
- Keep the three primary destinations Today, Learning Path, and Skills.
- Include only the 17 academic tracks listed in the spec; exclude Badminton, Physical Fitness, and Habits & Motivation.
- One quest is one learning package: Learn + Practice + exactly one Assessment or Project outcome.
- Keep Gemini/API/auth/database behavior; do not add a database migration while JSON metadata is sufficient.
- Keep quiz answers self-checking and never claim the local demo uses AI evaluation.
- Respect keyboard focus and reduced-motion settings.
- Do not add or run automated tests per the user's standing instruction. Run the build and inspect the desktop browser experience.

## Review Focus

- Rich quest package fields survive validation, proposal preview, acceptance, server state mapping, and UI rendering.
- Legacy routes preserve the Learning Path/chat creation entry and do not silently redirect Gemini users to an unrelated screen.
- Rejecting a roadmap leaves saved journeys unchanged.
- Static deployment still builds under `dist/` and preserves Vercel API rewrites.
- Learner-entered text is escaped/rendered as text, never as HTML or executable code.

## File Map

- `package.json`, `pnpm-lock.yaml`, `index.html`, `scripts/build.mjs`, `vite.config.js` — React/Vite runtime and static build.
- `src/react/main.jsx`, `src/react/react.css` — React app, pages, accessible animated quest and chat views.
- `src/academic-quest-data.js` — authored, field-specific demo quest packages.
- `server/ai/roadmap.ts` — structured Gemini Learn/Practice/final-outcome contract.
- `server/journeys/service.ts`, `server/state/service.ts` — proposal preview, JSON metadata persistence and safe response mapping.
- `src/server-state.js` / `src/api-client.js` — adapt server quest content into the shared frontend model without changing API paths.

## Tasks

### Task 1: React/Vite entry and static deployment ✅

- Add React, React DOM, Vite, and Motion; preserve the existing lockfile and Node floor.
- Create the Vite config using the existing `index.html` as entry and outputting to `dist/`.
- Keep the TypeScript check in the build and verify `/api/*` remains served/re-written by the current deployment configuration.

### Task 2: Shared academic quest content model ✅

- Add the strict quest package contract: Learn content, Practice scenario/steps, and exactly one Assessment or Project outcome.
- Create one specific demo quest for each of the 17 academic tracks, tied to an existing chapter/topic.
- Remove non-academic tracks from the React learner field list without deleting their catalog/backend seed data.

### Task 3: Gemini data contract and persistence bridge ✅

- Update Gemini's structured-output schema and prompt so each generated quest follows the shared package contract.
- Include rich content in proposal previews and persist it under quest metadata during acceptance.
- Safely expose supported content fields from server state to the React UI; retain existing `quest_steps` for actionable Practice steps where possible.

### Task 4: React shell, field roadmap, and quest dialog ✅

- Render Today, Learning Path, Skills, field selection, and the existing skill graph in React components.
- Add roadmap/quest summaries and a Motion dialog with Learn, Practice, and Assessment/Project sections.
- Make secondary detail expandable, retain visible focus, restore focus on close, and honor reduced motion.

### Task 5: React Gemini creation and acceptance flow ✅

- Restore the Guided Arcana flow as a React view inside Learning Path and retain account-backed API calls.
- Render full generated quest packages in a pending proposal preview.
- Preserve explicit accept/reject. On acceptance refresh server state and render the accepted server journey in Learning Path.
- Keep local demo mode honest when account/Gemini services are unavailable.

### Task 6: Route compatibility, build, and desktop review ✅

- Preserve useful mappings for the current and legacy hashes, including `#companion` to the roadmap creation entry.
- Run `pnpm build` and inspect Today, academic field selection, quest detail, Gemini preview/accept states when service access permits, and Skills on desktop.
- Record any live Gemini check that cannot be run because the local API/key/account service is unavailable.

**Verification note:** `pnpm build` succeeds. The desktop preview at `http://127.0.0.1:4173/#learning` renders the 17 academic branches and structured quest sections. Live Gemini generation and acceptance could not be exercised because the current local AI/account service is unavailable; the UI connects to the existing server endpoint and uses its configured server-side key.

## Handoff

- Do not commit, push, deploy, or remove the existing checkout's unrelated user changes.
- Report completed behaviors, build result, and any unavailable live-provider checks.
