# Frontend API Cutover Implementation Plan

> **For agentic workers:** Execute inline. Write each failing test before implementation.

**Goal:** Connect the existing English desktop UI to session-backed identity, aggregate state, quest progression, and journey proposals while retaining an offline demo when the API is unavailable.

**Architecture:** Keep the Vanilla JS screens and rendering. Add a presentation adapter from the aggregate API DTO to the view model expected by existing pages, centralize identity and mutations in `src/api-client.js`, then make event handlers await server mutations and refetch `/api/state`. Offline mode remains explicitly local and never claims server persistence.

**Tech Stack:** Vanilla JavaScript ESM, Hono API, Drizzle, PGlite integration tests.

**Spec:** `C:/Users/Admin/Downloads/LifeOS_Codex_Implementation_Spec.md`, sections 18 and phase acceptance criteria.

## Global Constraints

- Preserve the current UI and reuse existing Vanilla JS graph renderers.
- Server state is authoritative for XP, rank, coins, streak, quests, and journeys.
- Keep browser localStorage only for offline demo compatibility and non-authoritative preferences during migration.
- Every API request uses same-origin credentials and all calls stay in `src/api-client.js`.
- Never expose Player Code except in the one-time create-player response.

## Review Focus

- Missing DB/API: UI remains usable in clearly labeled offline demo mode.
- Guest creation/restore: credentials and Player Code are handled only by identity endpoints.
- DTO conversion: unknown server values do not corrupt graph or quest rendering.
- Failed mutation: server state remains displayed and the UI reports an actionable error.
- Duplicate click: quest completion remains idempotent and does not double-award XP.

---

### Task 1: Identity client and API-backed UI state adapter

**Files:** Modify `src/api-client.js`, create `src/server-state.js`, test both in `tests/api-client.test.mjs` and `tests/server-state.test.mjs`.

- [x] Test create, restore, demo, and current-player helpers use same-origin credentials; Player Code is only read from create/restore responses.
- [x] Test API state mapping converts journeys, quest status, XP, profile, concepts and conversation into the existing rendering model without fabricating evidence.
- [x] Implement identity methods and a pure `toViewState(apiState)` adapter.
- [x] Run focused tests and full typecheck/build.

### Task 2: Session bootstrap and explicit offline mode

**Files:** Modify `src/app.js`, `src/pages.js`, `src/styles.css`; test bootstrap decisions in `tests/app-bootstrap.test.mjs`.

- [x] Test bootstrap uses valid existing session, creates a guest when absent, and falls back only for unavailable/network API.
- [x] Implement API bootstrap, Player Code display/copy, restore entry and Enter Demo action without redesigning screens.
- [x] Keep local mock data isolated to offline mode; server mode must not write authoritative state to localStorage.

### Task 3: Quest and journey interactions

**Files:** Modify `src/app.js`; use the tested route helpers in `src/api-client.js` and the DTO adapter in `src/server-state.js`.

- [x] API client tests cover the authenticated quest/journey routes; state mapping tests cover server-authoritative rendering.
- [x] Connect template creation, pacing proposal decisions, and journey finish to the server. Archive has an API helper but no current UI action.
- [x] Replace quest start/step/note/complete and journey create/pacing/finish mutations with API requests in account mode; preserve local behavior offline.

### Task 4: Verification and docs

- [x] Run `pnpm test` (66 passed), `pnpm typecheck`, and `pnpm build`.
- [x] Verify desktop offline flow, Player Code dialog and local API proxy. Live database flow remains unverified without Neon/session secrets.
- [x] Update `docs/PROGRESS.md` and `docs/VERIFICATION.md` with implemented scope and limitations.
