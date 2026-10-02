# Phase 10: Assessments

> Inline execution from the approved LifeOS spec; test domain/API invariants.

**Goal:** Add optional quiz, written-response and code-review activities without making them a prerequisite for manual quest completion.

**Constraints:** The server owns quiz answer keys and grading. Pasted responses are limited by UTF-8 byte length (200 KB). Code is treated as text and is never executed. Only validated structured feedback can create Knowledge Signals.

## Tasks

- [x] Add authenticated assessment creation and submission routes with owner scoping and weekly AI budget checks.
- [x] Generate bounded quiz variations, hide answer keys from the browser, and grade them deterministically on the server.
- [x] Add structured written and static code-review feedback, persistence, and Knowledge Engine signals.
- [x] Connect assessment choices and feedback to the existing desktop quest dialog.
- [x] Allow direct completion of AVAILABLE quests, matching the existing manual-completion UI.
- [x] Verify assessment byte limits, provider failure, ownership, manual completion, tests, typecheck and build.

## Verification

- `node --experimental-strip-types --test tests/assessments.test.mjs tests/api-client.test.mjs tests/api-quests.test.mjs` — 21 passed.
- `pnpm typecheck` — passed.
- `pnpm build` — passed.

Neon/Gemini are not configured in this environment, so live provider/database behavior still requires deployment environment variables.
