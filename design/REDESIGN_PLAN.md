# LifeOS2 V2 Redesign Plan

Status: documentation only; no implementation started

## Global constraints

- Preserve the four visible routes and legacy hash redirects.
- Preserve localStorage, immutable Skill Intelligence transitions, server bootstrap, authentication, API contracts, database behavior, and business logic.
- Do not modify `server/`, `api/`, `shared/`, database files, or API payload contracts.
- Keep the vanilla HTML/CSS/JS architecture.
- Do not introduce React, Tailwind, shadcn/ui, Radix, or another framework.
- V2 language remains evidence-first and professional; no fantasy/Grimoire language.

## CSS refactoring architecture

Keep the runtime implementation in `src/styles.css` initially, but reorganize it into explicit sections:

1. Reset and browser normalization.
2. Primitive tokens.
3. Semantic tokens.
4. Component tokens.
5. Typography and base elements.
6. Accessibility, focus, reduced motion, and state utilities.
7. Shell: top bar, sidebar, main content, mobile drawer.
8. Shared primitives: buttons, inputs, badges, cards, alerts, progress.
9. Page modules: Today, Knowledge, Campaign, Learning Hub.
10. Graph and list presentation.
11. Dialogs and forms.
12. Loading, empty, error, and validation states.
13. Responsive breakpoints: 375, 768, 1024, 1440 behavior.
14. Isolated `.legacy-ui` compatibility rules, if still required.

Use V2-prefixed or component-scoped class names to prevent legacy collisions. Replace hardcoded component colors with semantic/component variables. Avoid a new CSS build step unless it becomes necessary; the static build must remain dependency-light.

## Phase 1 — Foundation cleanup

### Exact files

- `src/styles.css`
- `src/ui.js`
- `index.html`
- `tests/frontend-ui-rules.test.mjs`
- `design/asset/lifeos/DESIGN.md` only if the implementation handoff needs clarification

### Objectives

- Establish the three-layer token structure.
- Normalize typography, spacing, radii, shadows, focus rings, and control sizes.
- Remove duplicate V2 overrides and isolate legacy selectors.
- Standardize button, badge, progress, and icon semantics.

### Non-goals

- No route changes.
- No state or API changes.
- No new frontend dependency.
- No deletion of legacy behavior before dependency verification.

### Acceptance criteria

- All active V2 components consume semantic/component tokens.
- No parchment, blackletter, fantasy, or XP styling is visible on V2 routes.
- Primary, secondary, disabled, focus, and reduced-motion states are defined.
- Existing shared UI tests continue to pass.

### Regression risks

- CSS selector collisions with legacy renderers.
- Changed button dimensions affecting dialogs and graph nodes.
- Focus-ring changes reducing keyboard visibility.

### Validation commands

```bash
pnpm typecheck
pnpm test -- --test-name-pattern='frontend|ui-language|skill-pages'
git diff --check
```

## Phase 2 — Shell and navigation

### Exact files

- `src/app.js`
- `src/ui.js`
- `src/styles.css`
- `index.html`
- `tests/app-bootstrap.test.mjs`
- `tests/frontend-ui-rules.test.mjs`

### Objectives

- Refine top bar, sidebar, profile/account state, active route, and mobile drawer.
- Add accurate demo/offline/account status semantics.
- Add drawer scrim, Escape handling, focus return, `aria-expanded`, and `aria-controls`.
- Add scroll-padding for fixed chrome.

### Non-goals

- Do not change hash route names or redirect behavior.
- Do not change authentication or bootstrap API calls.
- Do not add new navigation destinations.

### Acceptance criteria

- Four V2 routes remain the only visible navigation.
- Legacy hashes still redirect to Today.
- Drawer is keyboard operable and usable at 375px.
- Account/demo status is truthful in all shell locations.

### Regression risks

- Broken hash synchronization.
- Focus lost during rerender.
- Mobile drawer blocking content or remaining open after navigation.

### Validation commands

```bash
pnpm test -- --test-name-pattern='app-bootstrap|ui-language|frontend'
pnpm typecheck
git diff --check
```

## Phase 3 — Today and Career Campaign

### Exact files

- `src/skill-pages.js`
- `src/styles.css`
- `src/ui.js`
- `tests/skill-pages.test.mjs`
- `tests/skill-intelligence.test.mjs`

### Objectives

- Clarify readiness, evidence coverage, gap priority, recommendation hierarchy, campaign progress, arcs, and quest nodes.
- Standardize metric cards, recommendation cards, status badges, and action feedback.
- Keep the existing deterministic Skill Intelligence transitions unchanged.

### Non-goals

- No changes to readiness calculations or state-transition logic.
- No XP economy or fantasy terminology.
- No new backend scoring or recommendation service.

### Acceptance criteria

- Today has one obvious primary action and two understandable alternatives.
- Each recommendation shows time, evidence effect, and rationale access.
- Career Campaign clearly distinguishes completed, current, available, locked, and Boss Quest states.
- Completing existing demo actions still updates the expected local view.

### Regression risks

- Incorrect action IDs or modal IDs.
- Local transition state not reflected after rerender.
- Status labels becoming color-only or misleading.

### Validation commands

```bash
pnpm test -- --test-name-pattern='skill-pages|skill-intelligence|frontend'
pnpm typecheck
git diff --check
```

## Phase 4 — Knowledge graph

### Exact files

- `src/graph.js`
- `src/skill-pages.js`
- `src/styles.css`
- `src/app.js`
- `tests/skill-pages.test.mjs`
- `tests/frontend-ui-rules.test.mjs`

### Objectives

- Make graph and list/search/filter access equivalent.
- Improve node states, semantic edge legend, keyboard guidance, zoom, fit, and narrow-screen behavior.
- Preserve SVG edges and native button nodes.

### Non-goals

- No graph-library dependency.
- No change to concept relationships or server knowledge contracts.
- No removal of graph interaction.

### Acceptance criteria

- Every graph concept is reachable through an equivalent list/search path.
- Nodes have meaningful accessible names and visible focus.
- Graph remains usable at 1024px and has a clear fallback at 375px.
- Semantic relationships are distinguishable without color alone.

### Regression risks

- Broken pan, zoom, fit, pointer capture, or arrow-key movement.
- Duplicate SVG IDs or incorrect edge positions.
- Detail selection not matching the list selection.

### Validation commands

```bash
pnpm test -- --test-name-pattern='skill-pages|frontend'
pnpm typecheck
pnpm build
git diff --check
```

## Phase 5 — Dialogs, forms, and states

### Exact files

- `src/app.js`
- `src/ui.js`
- `src/skill-pages.js`
- `src/companion.js` only where shared form/dialog patterns remain relevant
- `src/styles.css`
- `tests/app-bootstrap.test.mjs`
- `tests/api-client.test.mjs` only for unchanged contract coverage

### Objectives

- Standardize dialog anatomy, focus management, mobile dialog layout, and action footers.
- Add initial loading, pending, empty, error, and validation states.
- Add inline field errors and announced error summaries.
- Preserve retry, stop, restore, assessment, proposal, and reset behavior.

### Non-goals

- No API contract changes.
- No authentication behavior changes.
- No server-side validation changes.

### Acceptance criteria

- Dialogs have labelled titles, descriptions where needed, focus trapping, Escape close, and focus restoration.
- Network failures explain whether state changed and provide recovery.
- Forms preserve values and associate errors with fields.
- Async actions prevent duplicate submission and expose busy state.

### Regression risks

- Modal focus traps blocking browser navigation.
- Server mutations firing twice.
- Toast/error changes hiding existing API messages.
- Assessment and proposal state being lost during rerender.

### Validation commands

```bash
pnpm test -- --test-name-pattern='app-bootstrap|api-client|assessments|companion'
pnpm typecheck
pnpm build
git diff --check
```

## Phase 6 — Responsive, accessibility, and regression

### Exact files

- `src/styles.css`
- `src/app.js`
- `src/ui.js`
- `src/graph.js`
- `src/skill-pages.js`
- `index.html`
- `tests/frontend-ui-rules.test.mjs`
- `tests/ui-language.test.mjs`
- `tests/app-bootstrap.test.mjs`
- `README.md` only if verification instructions become inaccurate

### Objectives

- Verify 375, 768, 1024, and 1440 layouts.
- Verify keyboard-only navigation, focus visibility, screen-reader labels, reduced motion, and error announcements.
- Add regression guards for V2 vocabulary, four routes, token usage, and legacy-style isolation.

### Non-goals

- No mobile-only feature expansion.
- No redesign of backend/API/database behavior.
- No visual return to the archived Grimoire reference screens.

### Acceptance criteria

- No control is unreachable by keyboard.
- Focus is not obscured by fixed chrome or overlays.
- Content remains readable at 375px without accidental horizontal page overflow.
- Reduced-motion preference removes decorative movement without removing state feedback.
- Full test suite, typecheck, build, and diff checks pass.

### Regression risks

- Breakpoint-specific overflow.
- Accessibility regressions hidden by desktop-only testing.
- Legacy vocabulary or selectors reappearing through unused renderers.
- Generated `dist/` output diverging from source.

### Validation commands

```bash
pnpm test
pnpm typecheck
pnpm build
git diff --check
node server.mjs
```

Also perform manual browser checks at `375px`, `768px`, `1024px`, and `1440px`, including keyboard-only operation and `prefers-reduced-motion: reduce`.
