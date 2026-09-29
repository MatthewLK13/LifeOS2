# Verification and delivery

Date: 2026-09-26
Target: English desktop demo. Mobile QA intentionally excluded at the user's request.

## Automated checks
- `node --test tests/state.test.mjs`: 13 passed, 0 failed.
- `node scripts/build.mjs`: completed; static distributable at dist/.
- Build checks syntax of all seven JavaScript modules.

Covered behaviors: duplicate XP prevention; 120-XP daily cap; five distinct roadmap templates; explicit/idempotent activation; schedule preview and versioned application; preservation of ongoing quests; corrupt/obsolete storage recovery; scripted Java onboarding; unsupported input; invalid time bounds; nested corrupt records; finished journey Today state; split-quest reward conservation; asynchronous chat retaining intervening changes.

## Desktop browser checks performed
- Today and My Knowledge visual inspection.
- Completed the seeded embeddings quest: XP changed 250 to 270.
- Chat: Java -> beginner -> 30 minutes/day -> four-chapter draft.
- Activated Java; journey selector retained original RAG journey.
- Schedule: 30 -> 15 minutes/day preview, then apply. Unstarted activities split into bounded parts, total reward unchanged (also tested).
- Selected Java graph, selected Classes & Objects, opened evidence, searched Streams.
- Confirmed no horizontal document overflow in the inspected 1280px desktop viewport.
- Saved a memory and preference; reloaded and confirmed persistence.
- Finished the Java journey; Today showed Journey complete with no Continue Quest button.
- Opened Progress successfully.
- Browser captured no error or warning logs during checked flows.
- Reset demo through Settings after QA, restoring original profile.

## Independent review
A fresh reviewer found three issues: delayed chat overwrote intervening state; malformed nested saves passed validation; finished journeys still assigned quests on Today. Reproducing tests were added before fixes. All pass in the 13-test suite.

## Scope / limitations
Prepared chatbot, templates, sample evidence/ranks/streak; localStorage only. No live AI, real authentication, backend business service, public deployment or mobile QA. UI uses local images and system serif fonts. A single active demo tab is recommended because browser saves use last-write-wins rather than cross-tab synchronization.

## Curriculum expansion — 2026-09-26
- Seven tracks, 62 chapters, 248 concepts. Java, DSA and JavaScript have 10 chapters each; Python, OOP, AI and RAG have 8 each.
- Every sample chapter has four concept activities and one practical exercise. AI Fundamentals and RAG Engineering are separate tracks.
- Roadmap samples can be browsed without activation. Graphs paginate; chapter dossiers show topics and activities. Sample quest controls are read-only.
- 18 tests pass with `node --test tests/*.test.mjs`; static build succeeds.
- Browser verified JavaScript chapters 7–10, chapter-specific activity dialog, disabled preview checklist, and no captured warning/error logs in that preview tab.
- Existing journeys and XP remained visible after catalog migration. Migration tests also check notes, activity IDs and collisions with old IDs. Existing saved chat messages retain their historical text.
- No reset of the user's saved progress was performed for this expansion.

## Backend foundation — 2026-09-28

- `node --experimental-strip-types --test 'tests/**/*.test.mjs'`: 29 passed, 0 failed.
- `node node_modules/typescript/bin/tsc --noEmit --pretty false`: passed.
- `node scripts/build.mjs`: passed; writes the static demo and shared catalog to `dist/`.
- PGlite integration checks applied the 32-table schema and follow-up owner-safety migrations, exercised seed integrity/idempotence/catalog refresh, verified player progress survives reruns, rejected cross-player references for related records, checked database constraints, and confirmed a failed seed rolls back the transaction.
- Hono tests verified health/catalog responses, safe 404 handling, and environment-secret redaction.
- Configuration tests reject an unguarded test-database target and out-of-range API ports.
- Neon was not configured, so migration/seed were not applied remotely. The API was not deployed. Remote dev branch setup remains a prerequisite for those two commands.
- The static demo and localStorage flow remain independent from the API/database.

## Player sessions — 2026-09-28

- `pnpm test`: 38 passed, 0 failed. `pnpm typecheck` and `pnpm build` pass.
- API integration checks cover guest creation, idempotent session reuse, one-time Player Code disclosure, keyed digest storage, code restore, demo identity, malformed requests, invalid/tampered/expired sessions, secure cookie flags, trusted proxy IP selection, and shared restore throttling.
- PGlite applies the 33-table schema including `restore_attempts`. Tests verify upgrade backfill for existing seeded quests, time-boxed cleanup of stale rate buckets, and that bucket keys contain no client IPs.
- Runtime database connection validation is separate from migration approval, so the production API can use its production DB while production schema changes still require explicit `ALLOW_PRODUCTION_MIGRATIONS=true`.
- Vercel Preview routing accepts `VERCEL_ENV=preview` with a host-guarded development DB even though `NODE_ENV=production`; production DB routing is rejected for non-production Vercel targets. Config regression tests cover both directions.
- With database secrets absent, the API still serves health/catalog and returns a typed 503 from identity routes.
- No Neon branch was connected, and the frontend has not yet switched to the backend source of truth.
- Curriculum scope references: [Java learning topics](https://dev.java/learn/), [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course). Activities are curated demo fixtures, not full lesson content.

## Aggregate player state — 2026-09-28

- `pnpm test`: 44 passed, 0 failed. `pnpm typecheck` and `pnpm build` pass.
- Focused PGlite route tests cover no-session/invalid-session rejection, fresh guest state, seeded Minh state, no-store headers, no evidence/signal internals, and exclusion of SYSTEM prompt messages.
- Public JSON metadata is allowlisted; date-boundary tests verify Vietnam-time daily XP rollover without a write during GET.
- Browser API client tests cover same-origin cookie credentials, successful state responses, typed API errors, and offline network errors.
- UI cutover remains pending because the browser controller is not yet wired to the new APIs and journey writes are still pending; the local interactive demo remains intact.

## Quest progression — 2026-09-28

- `pnpm test`: 52 passed, 0 failed. `pnpm typecheck` and `pnpm build` pass.
- PGlite API tests cover session/owner checks, strict JSON (including malformed JSON), quest state transitions, note limits, frozen history, cross-player isolation, and client reward injection rejection.
- Progression tests verify the 120 XP cap, zero-XP completion at cap, next-day rollover, Vietnam-local streak and longest-streak behavior, idempotent completion, concurrent retries, and a single ledger award.
- API client tests verify start/complete/skip/step/note routes use the session cookie and omit client-authoritative XP/status fields.
- No Neon database has been configured; all database verification used isolated PGlite fixtures.

## Journey persistence — 2026-09-28

- PGlite route tests cover pending template previews, create accept/reject, foreign proposals, pacing/title/goal proposals, stale-version conflict, concurrent acceptance, revision history, four simultaneous active journeys, and finish/archive history preservation.
- Pacing tests prove split durations fit the proposed daily budget, XP totals stay unchanged, and completed/in-progress quest order and timestamps stay unchanged.
- API client tests cover session-backed journey reads, template generation, proposal decisions, finish, and archive.
- Journey controls are wired into account mode; live database browser verification remains pending.

## Frontend API cutover — 2026-09-28

- `pnpm test`: 66 passed, 0 failed. `pnpm typecheck` and `pnpm build` pass.
- New tests cover session bootstrap, guest creation, offline fallback, identity API calls, aggregate DTO mapping, private evidence redaction, failed messages, and quest-step mapping.
- Desktop browser inspection verified the offline fallback keeps the seeded Minh demo usable and clearly reports that the account service is unavailable. The Player Code restore dialog renders with recovery and demo options.
- Local same-origin proxy smoke test: GET `http://127.0.0.1:4183/api/health` returned 200 through the static server; POST `/api/player` returned the API's expected 503 with no database configured.
- No Neon credentials were available. Player creation/recovery, quest updates, proposal acceptance, and journey changes were not end-to-end verified against PostgreSQL.
- Knowledge signal mutation, confirmed memory management, preference persistence, XP ledger reads, and live Companion chat are not connected yet.

## Knowledge engine and dynamic graph — 2026-09-28

- `pnpm test`: 74 passed, 0 failed. `pnpm typecheck` and `pnpm build` pass.
- Focused knowledge checks cover every rank threshold and breadth rule, monotonic progression, confidence rejection, distinct-source thresholds, source retries, normalized names, per-player dynamic catalog ownership, and evidence-safe state mapping.
- Graph checks cover dynamic domains and concepts while preserving all seeded branches and roadmap graph invariants.
- Signal ingestion remains an internal service; no AI analyzer currently submits signals. New player-owned topics display in Knowledge, but custom roadmap generation from them is not implemented yet.
- No Neon database or AI provider key is configured. Account-mode flows have not been exercised end-to-end against PostgreSQL.

## Gemini Companion streaming — 2026-09-28

- `pnpm test`: 82 passed, 0 failed. `pnpm typecheck`, `pnpm build`, and `git diff --check` pass (Git only reports the workspace's LF/CRLF conversion warnings).
- Provider tests cover server-only API key headers, SSE chunk parsing, structured JSON generation, usage extraction, and abort propagation.
- PGlite route tests cover auth, strict body validation, persisted user messages, complete-only assistant persistence, provider failure, abort, usage recording, and player-budget rejection while health remains available.
- Client tests cover same-origin streaming, token events, and typed API failures. Offline scripted Companion behavior remains available.
- No live Gemini key or Neon DB is configured; external provider and authenticated browser behavior remain unverified.

## Learning analyzer and memory confirmation — 2026-09-28

- Focused PGlite integration verifies a meaningful turn adds a deterministic knowledge signal and pending memory; only after confirmation does a later context include that memory.
- Invalid signal levels and injected fields fail strict validation. Analyzer failure is isolated from a completed chat response.
- Memory endpoint tests verify owner scoping, idempotent confirmation, dismiss terminal state and no cross-player access. Client state maps pending candidates for the inline Companion card.
- The full suite, typecheck and build are being rerun after the inline card render check; live Gemini/Neon are not configured.

## Assessments — 2026-09-28

- Focused verification: `node --experimental-strip-types --test tests/assessments.test.mjs tests/api-client.test.mjs tests/api-quests.test.mjs` — 21 passed, 0 failed.
- Full verification: `pnpm test` — 102 passed, 0 failed; `pnpm typecheck`, `pnpm build` and `git diff --check` pass after wiring the account quest dialog to quiz, written-response and code-review flows.
- PGlite tests cover hidden answer keys, deterministic quiz grading, attempt persistence, knowledge signals, code-as-text instructions, UTF-8 200 KB rejection, provider failure and manual quest completion.
- Live Gemini/Neon calls are not configured and were not attempted.

## Achievements, milestones, Coins and inventory — 2026-09-28

- Full verification: `pnpm test` — 112 passed, 0 failed; `pnpm typecheck`, `pnpm build`, and `git diff --check` pass.
- PGlite checks cover rule-based unlocks, reward idempotency, free/paid inventory paths, insufficient Coins, player ownership, default avatars, and unchanged XP/Knowledge after equipping a cosmetic.
- External Neon/Gemini environments remain unconfigured.

## Conversation summaries and retention — 2026-09-28

- Focused verification: `node --experimental-strip-types --test tests/conversation-retention.test.mjs tests/api-client.test.mjs` — 14 passed, 0 failed.
- `pnpm typecheck` passes.
- PGlite coverage verifies new session creation, safe failure, 30-minute inactivity handling, message trimming only after summaries exist, and the 20-summary cap.
- Live Gemini/Neon calls are not configured and were not attempted.

## Push reminders and cron — 2026-09-28

- PGlite integration checks cover authenticated subscription ownership, endpoint deletion, Bearer-protected daily rollover, local-day idempotency, one reminder per player/day, completed-day skips, and DST-safe previous-local-date calculation.
- The browser subscribes only after explicit permission; service worker displays pushes and opens Today when selected. Live delivery requires VAPID keys and a deployed HTTPS origin, which are not configured locally.

## Budget hardening and admin tools — 2026-09-28

- The shared database-backed short-window limiter is applied to Companion, custom AI roadmaps, and AI assessment create/review. A focused test confirms requests are rejected at ten within a minute while health remains available.
- Admin integration tests verify bearer authorization, bounded diagnostics, and transactional reset of the seeded demo without changing another player.
- `ADMIN_SECRET`, production databases, and deployment credentials are not configured here; live admin operations and cron delivery were not attempted.
