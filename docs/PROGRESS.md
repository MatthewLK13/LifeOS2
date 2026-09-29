# Implementation progress
Plan: docs/superpowers/plans/2026-09-26-lifeos-demo.md
Scope approved: English desktop Grimoire demo, Python/DSA/Java/OOP/RAG, simulated chat-to-roadmap. User explicitly excluded further mobile work.

Task 1: complete — state tests written first; initial 9 failed before implementation, then passed.
Task 2: complete — shell, Today, linked quest dialog, XP, supplied local assets.
Task 3: complete — SVG/HTML knowledge and roadmap graphs, branch/list/filter/search/evidence, pan/zoom, related paths, chapter dossier.
Task 4: complete — conversational goal/background/time wizard, explicit activation, schedule proposal, progress, memory/preferences/reset.
Task 5: complete — independent review; regression fixes; 13/13 automated checks; desktop browser walkthrough; build; README.

Ruling: browser ES modules replace proposed React/TypeScript for zero-install offline demo. Cost: no static type checker; state tests and browser QA cover behavior.
Ruling: existing folder has no Git repository. Work directly in the named workspace; no Git initialization, worktree or commit.
Ruling: mobile verification excluded at user request; existing basic responsive CSS remains.
Ruling: branch/evidence simulation intentionally separates XP and personal rank; no live AI inference.

Final review findings fixed: delayed chat merges only still-current conversation changes; nested save validation recovers invalid records; completed journey no longer assigns quests on Today. Additional schedule segmentation conserves XP. No deferred review findings.
See VERIFICATION.md for exact checks and demo limitations.

## Backend foundation — 2026-09-28

- Phases 0–2, Phase 3 aggregate reads, and Phase 4 quest progression APIs in `LifeOS_Codex_Implementation_Spec.md` are implemented. The UI source-of-truth cutover remains pending journey writes and frontend integration.
- Added strict TypeScript config, Hono API, Zod environment validation, Drizzle schema and initial PostgreSQL migration.
- Browser and server now share the canonical 20-domain, 664-concept catalog and expanded curriculum.
- Added deterministic, idempotent seed fixtures for the Minh demo account, template journeys, quests, progress, memory and sample history.
- Added player-scoped foreign-key/trigger guards for quests, notes, conversation summaries, assessments, knowledge signals, memories, XP and chapter arcs. Catalog seed refreshes mutable canonical rows without overwriting player progress.
- Kept the static interactive demo independent of the database. API foundation exposes health and catalog endpoints.
- Closed review findings by rejecting unguarded `DATABASE_ENV=test` database commands and validating the separate API port.
- Neon was not configured. No remote database was contacted. Apply migration and seed only after providing an isolated development branch URL and matching host allowlist.
- Plan and remaining setup boundary: `docs/superpowers/plans/2026-09-28-phase-0-1-backend-foundation.md`.

## Player sessions — 2026-09-28

- Implemented Phase 2 player creation, Player Code recovery, signed session cookies, demo-session switching, and the current-player identity endpoint.
- Recovery codes use ten Crockford Base32 symbols; storage contains only a keyed digest. Session cookies are HttpOnly, SameSite=Lax, signed, and Secure in production.
- Restore attempts are rate-limited in PostgreSQL using keyed IP digests so the limit is shared across serverless instances without storing raw IP addresses.
- API continues to serve health/catalog without a database. Identity routes fail closed until a Neon development DB and server secrets are configured.
- Database target checks use `VERCEL_ENV` on Vercel so Preview can use the isolated development DB even when `NODE_ENV=production`; production deployments require the production DB.
- Verified the Preview/production DB routing guard, with no remote Neon connection configured.
- Browser UI still uses localStorage while journey writes and the planned frontend integration remain pending.
- Plan: `docs/superpowers/plans/2026-09-28-phase-2-player-session.md`.

## Aggregate player state — 2026-09-28

- Added authenticated `GET /api/state` with private no-store responses, player-scoped queries, and the Phase 3 aggregate DTO.
- Response includes profile, journeys/chapters/quests/steps/notes, global and player knowledge, progress, achievements, milestones, inventory, active conversation and pending memory candidates.
- Tests verify empty guest and seeded Minh state, authorization, evidence redaction, and exclusion of internal SYSTEM messages.
- Public chapter/quest metadata is allowlisted; daily XP resets for display at the player's timezone boundary without mutating on GET.
- Added `src/api-client.js` with same-origin session credentials and typed API/network failures.
- UI remains on localStorage until the quest and roadmap controls are switched to the server APIs; no mock demo behavior is removed during this transition.
- Plan: `docs/superpowers/plans/2026-09-28-phase-3-aggregate-state.md`.

## Quest progression — 2026-09-28

- Added authenticated start, complete, skip, step-update, and note endpoints.
- Completion locks quest/profile rows in a transaction, calculates XP from the stored reward, applies the 120 XP Vietnam-day cap, updates level inputs/streak, and writes one XP ledger record.
- Repeated and concurrent completion requests cannot award XP twice. Full-cap completion still records completion with zero XP.
- Client request schemas reject injected XP/status/player values; quest/chapter IDs and steps are scoped to the signed-in player. Completed/skipped quest notes and completed steps are locked.
- `src/api-client.js` now exposes same-origin quest mutation helpers that never submit XP or completion status.
- Phase 5 journey and proposal persistence remains necessary before switching the roadmap UI to server state.
- Plan: `docs/superpowers/plans/2026-09-28-phase-4-quest-progression.md`.

## Journey persistence — 2026-09-28

- Added session-scoped journey listing, template-based CREATE previews, pacing and title/goal proposals, accept/reject, archive, and finish endpoints.
- Template roadmaps remain pending until accepted. Acceptance creates the chapter/quest/step rows, increments version, and appends a revision.
- Stale proposals return `PROPOSAL_STALE`; simultaneous accepts produce one applied revision.
- Pacing proposals split only long AVAILABLE quests, conserve total XP, preserve completed/in-progress quest rows and ordering, and append revision metadata.
- Backend supports more than three active journeys. `src/api-client.js` exposes the journey/proposal API methods.
- No Neon branch or production deployment is configured.
- Plan: `docs/superpowers/plans/2026-09-28-phase-5-journey-proposals.md`.

## Frontend API cutover — 2026-09-28

- Added session bootstrap, Player Code restore, Enter Demo, and a one-time recovery-code display.
- The existing desktop UI adapts `GET /api/state` to its view model and does not save server-backed game state to localStorage.
- Connected quest start, step and note updates, completion rewards, roadmap template acceptance, pacing proposals, and journey finish to authenticated API routes.
- Added a local `/api/*` reverse proxy from the static demo server to the API port. This keeps browser requests same-origin and supports session cookies in local development.
- If the API/database is unavailable, the app keeps the existing browser demo and labels it as offline. It does not fabricate account evidence or show private API evidence.
- Verified proxy behavior: GET `/api/health` returned 200 and POST `/api/player` passed through and returned 503 while database secrets were absent.
- `pnpm test`: 66 passed; `pnpm typecheck` and `pnpm build` pass.
- Neon is unconfigured, so the authenticated browser flow and server mutations have not been exercised against a live database. Companion replies remained scripted at this cutover checkpoint; the following Phase 7 section records the streaming implementation. Memory confirmation, preference writes and XP ledger reads remain open.
- Plan: `docs/superpowers/plans/2026-09-28-frontend-api-cutover.md`.

## Knowledge engine and dynamic graph — 2026-09-28

- Added deterministic server-side domain-rank calculation from stored concept levels. Breadth requirements prevent a single advanced concept from granting a high rank.
- Added an internal knowledge-signal service with strict candidate validation, confidence cutoff, source idempotency, per-player dynamic domains/concepts, and monotonic level promotion. Browsers cannot assign knowledge levels; evidence and signal rationale remain private.
- Connected player-owned domains and concepts to the existing desktop knowledge graph, domain tabs, rank cards, and concept detail views. Existing catalog branches remain available.
- `pnpm test`: 74 passed; `pnpm typecheck` and `pnpm build` passed.
- The signal service is not yet called by an AI analyzer. Dynamic branches render in Knowledge, while creation of a new custom roadmap from those branches awaits the later Companion/journey phase. No Neon database or AI key is configured, so authenticated live account behavior remains unverified.
- Plan: `docs/superpowers/plans/2026-09-28-phase-6-knowledge-engine.md`.

## Gemini Companion streaming — 2026-09-28

- Added a server-only `AIProvider`/Gemini REST provider for SSE chat streaming and structured JSON generation. Gemini API keys are sent only in the server request header.
- Added authenticated `/api/companion/chat`: it stores the user message first, builds bounded context from the player, active journey, knowledge, confirmed memories, summaries and recent messages, then saves assistant text only after a complete stream.
- Added Stop/Retry controls to account-mode Companion; the scripted offline demo still works. Aborted/failed assistant text is discarded while the user message and any received usage are retained.
- Added shared weekly limits backed by `ai_usage`: player/demo token allowance, estimated global cost cap, and a database-counted short-window request limit. Pricing is centralized in `server/ai/pricing.ts`.
- `pnpm test`: 82 passed; `pnpm typecheck` and `pnpm build` passed.
- Neon and `GEMINI_API_KEY` are not configured. Provider and route behavior was verified with fake providers/PGlite; a live Gemini stream and authenticated PostgreSQL browser session remain unverified.
- Gemini REST streaming follows Google's [streamGenerateContent API](https://ai.google.dev/api/generate-content); the pricing table reflects the published Gemini 3.8 Flash and 3.5 Flash-Lite rates for the current introductory period.
- Plan: `docs/superpowers/plans/2026-09-28-phase-7-companion-streaming.md`.

## Learning analyzer and memory confirmation — 2026-09-28

- Added deterministic analyzer gating for meaningful learning turns; short acknowledgments and navigation are skipped.
- Gemini structured output is checked with a strict Zod schema before knowledge signals or pending memories are written. The existing deterministic knowledge engine decides level promotion.
- Analyzer calls have their own budget check and `KNOWLEDGE_ANALYSIS` usage record; analyzer failure never changes a completed chat reply.
- Added owner-scoped, idempotent confirm/dismiss APIs and inline Companion memory cards. Only confirmed memories enter later AI context.
- `pnpm test`: includes gate/schema, signal persistence, pending memory, confirmed-context, owner-isolation and immutable-dismissal coverage; last full suite before the final card render test was 82 passed. Typecheck passed.
- Gemini key and Neon remain unconfigured, so real analyzer responses and live account UI behavior are not verified.
- Plan: `docs/superpowers/plans/2026-09-28-phase-8-learning-analyzer.md`.

## AI-generated roadmaps — 2026-09-28

- Added account-mode Companion onboarding for a new subject, goal, experience level and daily time, then generates a template-grounded, validated roadmap preview.
- Roadmap drafts stay pending until explicit acceptance; the existing proposal lifecycle applies or rejects them. Invalid provider output is not persisted.
- Existing offline scripted roadmap behavior and static curriculum templates remain available.
- Plan: `docs/superpowers/plans/2026-09-28-phase-9-ai-roadmap-generation.md`.

## Assessments — 2026-09-28

- Added account-backed optional quiz, written-response and code-review routes. Quiz answer keys stay server-side and grading is deterministic; written/code responses return validated verdicts, concise feedback and knowledge signals.
- Pasted text is limited to 200 KB measured in UTF-8 bytes. Code review treats code as plain text and never executes it.
- Connected optional assessment choices, answers and feedback to the desktop quest dialog. Assessment failure leaves the quest available, and players can complete an AVAILABLE quest manually.
- `pnpm test`: 102 passed; `pnpm typecheck`, `pnpm build` and `git diff --check` pass. Tests use mocked Gemini and isolated PGlite because live Gemini and Neon are not configured.
- Plan: `docs/superpowers/plans/2026-09-28-phase-10-assessments.md`.

## Conversation summaries and retention — 2026-09-28

- Added an authenticated New Conversation action and lazy 30-minute inactivity closure.
- Older sessions are summarized with validated structured background-model output. Summary AI usage is budget-checked and recorded; provider failure keeps the old session active.
- Full messages are retained for the five newest sessions and are removed only for older sessions with an existing summary. The newest 20 summaries remain available in Companion context.
- Tests cover new-session creation, summary persistence, retention limits, failure behavior and inactivity rollover.
- Plan: `docs/superpowers/plans/2026-09-28-phase-11-conversation-retention.md`.

## Achievements, milestones, Coins and inventory — 2026-09-28

- Added deterministic achievement and milestone evaluation after quest completion, journey completion, and accepted knowledge signals. Unlock records and Coins rewards are idempotent and share the gameplay transaction.
- Added authenticated inventory/catalog, unlock, and equip routes. Purchases lock the profile balance, cannot overspend, and equip only items already owned by that player.
- New players receive the three base avatars with the Scribe equipped. Desktop Progress and Settings show achievements, Coins, and owned cosmetics; cosmetic selection has no XP or Knowledge effect.
- Focused integration tests cover duplicate unlock prevention, Coins rewards, insufficient balance, item ownership, and cosmetic invariance. `pnpm test`: 112 passed; `pnpm typecheck`, `pnpm build`, and `git diff --check` pass.
- Plan: `docs/superpowers/plans/2026-09-28-phase-12-economy-cosmetics.md`.

## Push reminders and cron — 2026-09-28

- Added session-scoped browser push registration with ownership checks, opt-in desktop settings, service-worker notifications, and notification-click navigation.
- Added Bearer-protected Vercel cron endpoints for local-date XP/streak rollover and one reminder per player/local date. Completed days, inactive journeys, and unsubscribed players are skipped; expired push endpoints are disabled.
- Vercel jobs are configured for 00:00 and 06:00 Vietnam time. Configure cron and VAPID secrets before using these production features.
- Verification covers subscription ownership, cron auth, idempotency, local dates, DST-safe calendar arithmetic, and reminder skip behavior. Plan: `docs/superpowers/plans/2026-09-28-phase-13-notifications-push-cron.md`.

## Budget hardening and admin tools — 2026-09-28

- Added a server-backed rolling-minute AI limit shared by Companion, AI roadmap generation, and AI assessment generation/review, while keeping non-AI game routes available.
- Added bearer-protected demo reset and internal player diagnostics. Reset runs transactionally and only recreates the seeded Minh demo; diagnostics omit Player Codes and code digests.
- Configure `ADMIN_SECRET` on the server before invoking admin routes. Plan: `docs/superpowers/plans/2026-09-28-phase-14-budget-admin.md`.

## Production deployment readiness — 2026-09-28

- Added Vercel build/output configuration and documented separate Preview/development and Production database setup, server-only secrets, migrations, seed, smoke checks, cron times, and custom-domain steps.
- Phase 15 is not deployed: no Neon/Vercel account credentials, production secrets, project association, or authorization to publish are available in this workspace. Do not point Preview at Production; the database guard rejects that configuration.
- Local verification is complete, but live database, push, AI, cross-browser restore, and public-domain smoke tests still require the external environment.
