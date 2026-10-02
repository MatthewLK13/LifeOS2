# Phase 8: Learning Analyzer and Memory Confirmation

> **For agentic workers:** Execute inline. Write failing tests before implementation.

**Goal:** Analyze meaningful learning chats into deterministic knowledge signals and pending memories that require player confirmation.

**Architecture:** A deterministic gate skips low-value messages. Gemini returns strict structured output; Zod validates it before the existing knowledge service persists signals. Durable memory candidates are stored as PENDING and only become context after an authenticated confirm action; dismiss is terminal. Analyzer failures never change a successful chat response.

**Tech Stack:** TypeScript, Zod, Gemini structured output, Drizzle/PostgreSQL, Hono, vanilla JavaScript.

**Spec:** `docs/LifeOS_Codex_Implementation_Spec.md`, sections 12.6–12.8, 23.4, Phase 8.

## Global Constraints

- Skip greetings, thanks, navigation, cosmetic and memory actions.
- Validate all analyzer output before writing knowledge or memory.
- Knowledge levels are chosen by deterministic signal policy, never directly by Gemini.
- Pending and dismissed memories are excluded from future context; only confirmed memories are included.
- Analyzer failure does not fail the saved chat response.

## Review Focus

- Invalid structured output causes no knowledge/memory writes.
- Repeated turns are idempotent by source message ID.
- One player cannot confirm or dismiss another player's memory.
- Dismissed memories cannot later be confirmed.
- Analyzer budgets are checked and metered independently from Companion usage.

### Task 1: Gate, schema, analyzer service

- [x] Test gating of trivial and meaningful turns, strict output schema, persistence and analyzer failure isolation.
- [x] Implement deterministic gate, structured analyzer, memory-candidate dedupe and usage accounting.
- [x] Integrate analyzer after successful chat completion and call `recordKnowledgeSignal` per accepted signal.

### Task 2: Memory decision endpoints and card

- [x] Test authenticated owner-scoped confirm/dismiss lifecycle and pending state mapping.
- [x] Implement idempotent confirm/dismiss endpoints and API client helpers.
- [x] Render pending memory cards in Companion with Remember/Dismiss controls.

### Task 3: Verification

- [x] Run `pnpm test`, `pnpm typecheck`, `pnpm build`.
- [x] Update progress and verification docs; state that live Gemini/Neon remain unverified if unavailable.
