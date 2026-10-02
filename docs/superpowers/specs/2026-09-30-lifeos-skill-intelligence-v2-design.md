# LifeOS Skill Intelligence V2 — Stage A Design

## Purpose

Add a complete, interactive Skill Intelligence demo to the existing LifeOS Grimoire. The demo should present a learner's evidence-backed skill picture, a career target, skill gaps, and useful next actions while preserving the existing visual identity and all current game and account flows.

The product loop presented by the UI is:

> Career goal → learner state → skill gap → next learning action → new evidence

All new interface copy will be in English, matching the current demo.

## Scope and boundaries

This change implements **Stage A only** from the supplied implementation prompt. It adds a coherent mock learner model, V2 views, and interactions that can be demonstrated end to end. It does not add backend V2 tables, APIs, BKT, evidence processing, career-readiness calculations, course-provider integrations, or real recommendation persistence. Work stops after Stage A is verified so the UI can be reviewed before Stage B.

The existing Hono, Drizzle, PostgreSQL, Gemini, Vercel, identity, journey, quest, assessment, XP, progression, inventory, notification, and Player Code flows remain in place. Existing offline and account modes must continue to boot and work as they do now.

## Approaches considered

1. **UI-first with an isolated V2 mock/view-model layer (selected).** Add the V2 experience on top of the existing vanilla-JavaScript frontend. This matches the prompt's staging, avoids coupling mock fields to real API DTOs, and keeps the later backend replacement localized.
2. **Implement the new UI and backend model together.** This would make the new learner metrics authoritative sooner, but contradicts the requested UI review gate and expands risk across migrations, APIs, and existing account flows.
3. **Mix mock V2 fields into server state.** This could reduce initial wiring, but would blur the boundary between demo values and account-backed values and make backend replacement harder.

## User experience

Keep the parchment/grimoire design, existing typography and graph aesthetic, antique gold and cinnabar accents, ink borders, hard-offset shadows, accessible controls, and existing responsive behavior. Improve hierarchy so the experience reads as a serious career-readiness product within LifeOS.

Navigation will show Today, My Knowledge, Career Campaign, Companion, Learning Hub, Progress, and Settings. The existing `roadmap` route/state ID may remain internal; only its user-facing label becomes Career Campaign. No mobile-only feature work is added, but all screens remain usable at desktop, tablet, and mobile widths as required by the supplied spec.

### Today

- Show the selected role, readiness or “Insufficient evidence”, coverage, and confidence.
- Show the three most important gaps with current/target state and career importance; opening a gap opens its Knowledge detail.
- Show Recommended, Quick Win, and Challenge actions, with one marked Recommended. Each exposes a plain-language “Why this?” explanation.
- Keep the current activity/quest loop available without presenting it as the only next action.

### Career Campaign and Boss Quest

- Present the current journey as a career campaign with arcs, progress, current arc, completed history, adaptive upcoming work, critical gaps, and Boss Quest checkpoints.
- Preserve completed journey history; label future content as adaptive.
- Reuse the existing journey/arc/chapter/quest concepts. Boss Quest is a mock multi-skill project using the existing quest detail/modal pattern, with objectives, skills, prerequisites, expected evidence, instructions, a demo submission area, status, rewards, and an explanation that evaluation can inform several skills.

### My Knowledge

- Retain the existing interactive graph and list views.
- Show mastery, confidence, coverage, freshness, and evidence strength in concept detail.
- Use compact Inferred, Assessed, and Applied indicators. Never expose private conversation evidence.
- Show freshness separately from mastery and offer a mock Recall Quest that restores freshness in the demo view without implying that mastery decayed.
- Support PREREQUISITE, RELATED, PART_OF, and TRANSFERABLE_TO relationship types in the V2 view model and a simple graph legend/style treatment.

### Progress and Skill Passport

- Add career readiness, skill coverage, domain ranks, campaign progress, Boss Quests, assessments, and strong-evidence skills.
- Keep Character Level (activity) separate from Domain Rank (competency).
- Show a Skill Passport preview and a demo Rank-Up experience. Rank cannot be purchased; coins remain cosmetic.

### Learning Hub

- Show gap-based recommendations, free resources, partner courses, Boss Challenges, and Recall activities.
- Course details explain covered skills, level fit, duration, price, provider trust, and why the item fits the learner.
- Clearly distinguish Recommended from Sponsored, show affiliate disclosure and free alternatives, and never include commission in learning-fit ordering. External demo links use safe placeholders.

### Companion

- Preserve the existing chat and journey-builder experience.
- Add explanatory copy that distinguishes Arcana's observations from LifeOS's evaluation of evidence. The companion explains recommendations and readiness without becoming the authority for learner state.

### Career targets

Seed Backend Developer, AI / ML Engineer, and Data Analyst. Selection updates the demo view model consistently across Today, Campaign, Progress, and Learning Hub.

## Data and state architecture

Add a dedicated mock/adaptation boundary. Do not add mock V2 properties to real API DTOs or change `src/server-state.js` to fabricate server evidence.

- `src/skill-intelligence.js` owns the seeded demo learner, role definitions, skill states, semantic relationships, campaign/Boss Quest, action choices and explanations, and course matches. It exports pure functions to create the initial model, select a career, and apply the supported demo interactions.
- `src/skill-pages.js` renders V2-specific Today, Career Campaign, Learning Hub, Skill Passport, and reusable explanation/detail content from the view model.
- `src/app.js` owns navigation, selected page, demo interaction state, and delegated actions/modal wiring. Existing page route IDs and server mutations remain stable.
- `src/pages.js` adapts My Knowledge and Progress to accept the separate V2 model where needed, while retaining existing account-backed and offline functionality.
- `src/graph.js` adds a restrained legend/style mapping for semantic relationships without replacing the existing graph layout or pan/zoom behavior.
- `src/styles.css` provides responsive V2 layout and component styles within the existing visual system.
- `tests/skill-intelligence.test.mjs` and focused page tests cover model consistency, state boundaries, and the required rendered interactions.

The seeded demo persona is Minh. Its sample role/readiness/evidence values are explicitly illustrative. In account mode, V2 screens are labeled as a demo preview and must not present mock learner measurements as values saved to the account. Existing account-backed screens and mutations continue to use the real server state. In offline mode, demo actions may update the in-memory mock view model for the current session; they must not claim that V2 data was persisted server-side.

The starting mock story follows the supplied example: Backend Developer Intern; 58% readiness with 72% coverage; Java and SQL Applying, REST API Understanding, Authentication Exploring, Testing Discovered, and Docker Unseen; Recommended Implement JWT Authentication, Quick Win Review Authorization Headers, Challenge Design Access + Refresh Token Flow; Boss Quest Secure a REST API; and a Docker Fundamentals course match. If another career is selected, all role-dependent labels, gaps, and recommendations change coherently. If evidence is insufficient, the UI suppresses the precise readiness percentage.

## Interaction and accessibility

Every primary V2 control is actionable: change role, inspect readiness/gaps, open concept details, start Recall, select one of the three actions, open its rationale, navigate the campaign, inspect/submit the mock Boss Quest, browse course fit/disclosure, open Companion, view Skill Passport, and trigger the demo Rank-Up. Demo-only actions are labeled and do not call new server APIs.

Use semantic buttons and form labels, keyboard-operable dialogs, visible focus, appropriate ARIA labels, and the existing modal/focus management where practical. Preserve the current responsive behavior at desktop (≥1200px), tablet (768–1199px), and mobile (<768px).

## Verification and acceptance

Before implementation, record the current baseline: `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass; the test suite reports 121 passing tests.

Stage A is ready for UI review when:

1. The V2 demo can be navigated end to end with coherent data across the required screens.
2. All listed demo interactions work and clearly identify mock-only behavior.
3. Account mode still boots and does not mix mock metrics into real API state; offline mode remains usable.
4. Low evidence coverage suppresses precise readiness; evidence types and freshness are shown independently of mastery.
5. Free/sponsored course presentation includes the disclosure, free alternative, and commission-independent fit ordering.
6. New and existing tests pass, and `pnpm typecheck`, `pnpm test`, and `pnpm build` succeed.
7. The interface remains usable at the three specified viewport ranges and within the existing LifeOS visual language.

After these checks, stop and present Stage A for review. Do not start Stage B until the user approves the UI.
