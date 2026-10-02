# LifeOS UX Clarity Redesign Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Make it immediately clear where to start and where to find learning paths, resources, and skill evidence by reorganizing LifeOS into Today, Learning Path, and Skills.

**Architecture:** Keep the existing vanilla JavaScript page renderers and skill-intelligence state. Change the shell navigation and route aliases, make Learning Path the combined view for campaign and resources, and simplify the Today and Skills page hierarchy without changing data or business transitions.

**Tech Stack:** Vanilla JavaScript ES modules, CSS, local browser storage, and the existing Node build script.

**Spec:** `docs/superpowers/specs/2026-10-02-lifeos-ux-clarity-design.md`

## Global Constraints

- The interface remains English.
- Keep the existing V2 bright desktop system: white cards on a soft cool background, dark ink text, blue primary actions, and restrained teal/purple accents.
- Keep exactly one visually primary action per page.
- Do not change the learner's saved progress when reorganizing views.
- Keep the desktop layout as the validation target; mobile-specific redesign is outside this scope.
- Backend/API changes, AI planner integration, account or persistence changes, new learning features, changing mock data, and changing the visual brand are out of scope.

## Review Focus

- New learners must see the plan-creation action before a quest action; returning learners must see the next available quest first.
- A quest must appear in only one canonical location in Learning Path, even when it is also recommended by the campaign model.
- Completed and locked stages must remain understandable and reachable without competing with the current stage.
- Graph filtering and the accessible skill-list alternative must continue to expose the same skill details.
- Old hash routes must redirect to useful new destinations and must not discard stored learner progress.

## File Map

- `src/app.js` — top-level navigation, route aliases, page dispatch, and shared shell labels.
- `src/skill-pages.js` — Today, Learning Path, Skills, and resource-section composition.
- `src/styles.css` — page hierarchy, spacing, section states, tabs/accordions, and desktop layout.
- `src/graph.js` — only if the new Skills composition requires a small mounting adjustment; keep graph behavior intact.
- `docs/superpowers/specs/2026-10-02-lifeos-ux-clarity-design.md` — approved UX decisions; implementation must follow this document.

## Implementation Tasks

### Task 1: Simplify the primary shell and preserve route compatibility

**Files:**
- Modify: `src/app.js`
- Modify: `src/styles.css`

**Interfaces:**
- Keep `navigate(id)` and the existing hash-based navigation contract.
- Map `today` to Today, `roadmap` and `learning` to Learning Path, and `knowledge` to Skills.
- Map legacy `companion`, `progress`, `quests`, `milestones-rank`, and `settings` routes to the closest useful new destination rather than leaving them as dead pages.

- [x] Replace the four top-level nav entries with `Today`, `Learning Path`, and `Skills`, with unique and semantically appropriate icons.
- [x] Update `page` initialization and `navigate(id)` so current and legacy hashes resolve to the new three-page set.
- [x] Make the active nav state, page title, and page kicker derive from the same route metadata.
- [x] Adjust sidebar spacing and selected states so the three destinations scan clearly at desktop width.
- [x] Run `pnpm build`; expected: `Build complete` with no build error.

### Task 2: Make Today show one clear next action

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/styles.css`

**Interfaces:**
- Keep `renderTodaySkillPage(viewModel, options)` and existing `data-action` handlers for planner, advisor, quest, and skill details.
- Use the existing `learnerPreset`, recommendations, campaign, and career data; do not add persisted fields.

- [x] Render a new-learner first-use state with one primary `Build my learning plan` action and a short explanation of what happens next.
- [x] Render a returning-learner state with one featured recommended quest and one primary `Open quest` action.
- [x] Keep the campaign target and readiness as compact supporting context; move secondary numbers and explanations out of the hero area.
- [x] Show at most three priority skill gaps and link to Skills for the complete set.
- [x] Visually demote plan adjustment and advisor actions so they do not compete with the primary action.
- [x] Run `pnpm build`; expected: `Build complete` with no build error.

### Task 3: Combine campaign, quests, and resources into Learning Path

**Files:**
- Modify: `src/app.js`
- Modify: `src/skill-pages.js`
- Modify: `src/styles.css`

**Interfaces:**
- Add `renderLearningPathPage(viewModel, section='roadmap')` in `src/skill-pages.js`.
- Keep `renderCareerCampaignPage(viewModel)` and `renderLearningHubPage(viewModel)` as wrappers or internal sections where needed to avoid breaking existing imports while routing settles.
- Preserve the existing quest detail, boss quest, recall, and course-detail actions.

- [x] Add a compact active-plan summary for goal, daily time, and progress.
- [x] Render a single roadmap sequence with the current stage emphasized, completed stages collapsed behind an explicit control, and locked stages visually quiet.
- [x] Remove duplicate quest collections by keeping each quest in one canonical roadmap or recommendation location.
- [x] Add a secondary `Resources` section or tab within Learning Path and associate each recommendation with a stage or skill.
- [x] Place completed history and Boss Quest under a distinct `Milestones` section after the active path.
- [x] Route both `#roadmap` and `#learning` to Learning Path while preserving their corresponding in-page section when possible.
- [x] Run `pnpm build`; expected: `Build complete` with no build error.

### Task 4: Make Skills a clear graph-and-evidence workspace

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/styles.css`
- Modify: `src/graph.js` only if a mounting adjustment is needed.

**Interfaces:**
- Keep `renderSkillKnowledgePage(viewModel, view)` and the current graph/list interactions.
- Keep existing skill-detail actions and evidence data shape.

- [x] Add a compact career skill summary with plain-language readiness context above the graph.
- [x] Make the graph the primary visual and keep search, filters, and the list alternative visible without duplicating the entire summary.
- [x] Use one consistent skill-detail panel ordering: mastery, confidence, evidence, freshness.
- [x] Move BKT explanation and illustrative calculations behind explicit detail controls.
- [x] Run `pnpm build`; expected: `Build complete` with no build error.

### Task 5: Unify terminology, status hierarchy, and desktop polish

**Files:**
- Modify: `src/skill-pages.js`
- Modify: `src/styles.css`
- Modify: `src/app.js` only if shared shell copy or route metadata needs adjustment.

**Interfaces:**
- Reuse current status model values and `badge()` helper; do not rename engine enums or alter transitions.

- [x] Align status labels and colors across Today, Learning Path, and Skills.
- [x] Add concise first-use helper copy for readiness, evidence coverage, and freshness; avoid repeated eyebrow labels and nested card frames.
- [x] Preserve focus visibility, keyboard operation, dialog return focus, and readable locked/secondary states.
- [ ] Check the desktop page hierarchy manually at the normal project viewport, including first-use and returning-learner states; record any unavailable browser check honestly.
- [x] Run `pnpm build`; expected: `Build complete` with no build error.

## Final Review

- [x] Confirm the three primary destinations have distinct jobs and matching labels.
- [x] Confirm new and returning learners see the appropriate primary action.
- [x] Confirm each quest appears once in Learning Path and remains completable.
- [x] Confirm resources remain accessible under Learning Path.
- [ ] Confirm graph, list, search, filters, and skill detail still work.
- [x] Confirm legacy hashes resolve without changing stored progress.
- [x] Run `pnpm build` and report its result; do not claim unperformed checks passed.

## Plan Self-Review

- Spec coverage: Today first-use/returning states map to Task 2; roadmap/resources/milestones and deduplication map to Task 3; graph/evidence/detail and plain-language metrics map to Task 4; navigation aliases, preservation, visual language, one primary action, and keyboard states map to Tasks 1 and 5.
- Step clarity: Every implementation step names a concrete file-level behavior and uses existing data or an explicit interface.
- Interface consistency: `renderLearningPathPage(viewModel, section='roadmap')` becomes the route target; existing quest and skill-detail action names remain unchanged.
- Review focus: Each listed risk has an owning task and an explicit build or manual desktop check. No automated test files are added under the user's existing instruction to avoid tests unless requested.
- Scope: No API, AI, data-model, mock-content, or mobile-specific feature changes are planned.


## Implementation review — 2026-10-02

- The returning-learner Today, Learning Path, Resources, Skills graph/list, and legacy #roadmap route were reviewed in the desktop browser.
- pnpm build completed successfully after the final edits.
- The new-learner first-use branch is present in code but was not exercised in the browser; the existing browser profile contains returning-learner state.
- No automated tests were added or run, following the standing user instruction.


