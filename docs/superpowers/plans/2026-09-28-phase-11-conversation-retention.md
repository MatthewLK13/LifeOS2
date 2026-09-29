# Phase 11: Conversation summaries and retention

> Inline implementation of the approved specification.

**Goal:** Keep the Companion useful across sessions while bounding stored conversation history.

## Tasks

- [x] Add authenticated New Conversation flow and inactivity closure after 30 minutes.
- [x] Summarize older sessions with validated background-model output and meter usage.
- [x] Keep full messages in the five newest sessions; delete older bodies only after a summary exists.
- [x] Retain up to twenty summaries and provide recent summaries to later Companion context.
- [x] Add lifecycle/retention tests and verify full suite, typecheck and build.

## Verification

- `node --experimental-strip-types --test tests/conversation-retention.test.mjs tests/api-client.test.mjs` — 14 passed.
- `pnpm typecheck` — passed.
- Live Gemini/Neon are not configured; summary outputs and persistence use a fake provider and PGlite.
