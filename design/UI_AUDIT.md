# LifeOS2 V2 UI Audit

Status: approved read-only audit, 2026-10-02

## Product direction

LifeOS2 is an **evidence-first career operating system**. The interface should help a learner understand current capability, identify evidence gaps, choose a useful next action, and see how that action changes the profile.

The approved V2 experience is bright, calm, professional, productivity-oriented, and suitable for long daily use. It must not return to the legacy Grimoire/fantasy direction, visible XP economy, pets, guilds, inventory, PvP, or chatbot-first navigation.

## Current stack

- Vanilla HTML, CSS, and JavaScript ES modules.
- No React, Vue, Svelte, Tailwind, shadcn/ui, Radix, or frontend component package.
- `index.html` is the browser entry document.
- `src/app.js` owns the shell, hash routing, rendering, delegated actions, dialogs, and bootstrap.
- `src/styles.css` is the single runtime stylesheet.
- `scripts/build.mjs` performs a static copy build into `dist/`.
- Node serves the static app through `server.mjs`.
- Hono/TypeScript/Drizzle/PostgreSQL APIs remain separate and must not be changed by UI work.

## Runtime routes

Visible V2 routes are hash routes:

| Route | View |
|---|---|
| `#today` | readiness, evidence coverage, gaps, next actions |
| `#knowledge` | connected skill graph and Skill Passport |
| `#roadmap` | Career Campaign, arcs, quest nodes, Boss Quest |
| `#learning` | recommended courses, free resources, practice |

Legacy hashes redirect to `#today`. Dialogs are overlays, not routes.

## Existing architecture

- Fixed top bar and fixed desktop sidebar.
- Responsive slide-out sidebar below `760px`.
- V2 page renderers live in `src/skill-pages.js`.
- `src/skill-intelligence.js` is the local deterministic state engine.
- `src/graph.js` provides SVG edges, HTML button nodes, pointer pan, zoom, fit, and arrow-key movement.
- `src/ui.js` provides escaping, inline SVG icons, buttons, badges, section headings, and progress markup.
- `src/bootstrap.js` and `src/server-state.js` support offline/server state adaptation.

## Existing strengths

- Clear four-view V2 information architecture.
- Strong immutable local Skill Intelligence transitions.
- Good separation between learner signals, evidence, readiness, and recommendations.
- Native buttons are used for graph nodes and most actions.
- Skip link, `aria-current`, labels, progressbar semantics, dialog semantics, live chat log, Escape handling, focus restoration, and reduced-motion support already exist.
- Local assets avoid mandatory image network requests.

## Major problems to address

1. `src/styles.css` contains multiple visual generations and repeated overrides.
2. Legacy parchment/fantasy selectors and vocabulary remain adjacent to active V2 rules.
3. V2 pages render from local Skill Intelligence state even when account bootstrap succeeds; the shell can say account mode while the visible page remains demo data.
4. Initial bootstrap has no loading state.
5. Most failures are toast-only; forms lack consistent inline errors and error summaries.
6. The active V2 Knowledge view does not expose the legacy graph's search/list/filter alternative.
7. Graph layouts are difficult to scan on narrow screens.
8. The mobile drawer has no scrim, focus management, or expanded-state synchronization.
9. Icon controls and several buttons are smaller than the recommended 44px interaction target.
10. Fixed chrome does not consistently reserve scroll space for focused content.
11. V2 card, badge, metric, dialog, and button styles are duplicated across string templates.
12. Hardcoded colors and inline styles bypass token intent.
13. `DEMO DATA` remains in the page kicker even when the shell is account-backed.
14. Some current documentation and source layout descriptions still describe the retired Grimoire-era screens.

## Preservation constraints

UI work must preserve routes, localStorage behavior, immutable Skill Intelligence transitions, API contracts, authentication, database behavior, server fallback, graph interaction, service-worker paths, and business logic. Do not modify `server/`, `api/`, `shared/`, database files, or API payload contracts as part of visual redesign.

## Design source of truth

For future implementation, use this file plus `design/DESIGN_SYSTEM.md` and `design/REDESIGN_PLAN.md`. Treat the older files under `design/asset/` as historical references unless explicitly marked V2. The current V2 reference is `design/asset/lifeos/DESIGN.md`.
