# Phase 7: Gemini Companion Streaming

> **For agentic workers:** Execute inline. Keep credentials server-only and use tests before implementation.

**Goal:** Add an authenticated, bounded-context Companion stream backed by Gemini while preserving usable app behavior when AI is unavailable.

**Architecture:** A server-only provider interface wraps Gemini REST streaming and structured generation. The chat route authenticates the player, persists the user message, builds bounded context, enforces shared weekly limits, streams text events, and persists the assistant response and usage only after a complete response. The desktop client consumes the stream with AbortController and keeps retry available after failure.

**Tech Stack:** Hono, Drizzle/PostgreSQL, Gemini REST, Web Streams/SSE, vanilla JavaScript, PGlite.

**Spec:** `docs/LifeOS_Codex_Implementation_Spec.md`, sections 12.1–12.5, 15.5, Phase 7.

## Global Constraints

- API keys remain on the server and are never returned to the browser.
- Aborted or failed assistant output is never saved as COMPLETE; the user message remains saved.
- Context includes only bounded recent conversation and confirmed memories.
- A failed AI request leaves the offline demo and account navigation usable.
- AI budgets are server-side and shared across function instances.

## Review Focus

- Abort after partial output must not persist assistant text.
- Cross-player conversation IDs must never be readable or writable.
- Budget checks must run before provider requests and never rely on process memory.
- Missing or invalid provider configuration must fail with a safe typed error.
- Gemini SSE parse errors must not expose provider response bodies or secrets.

### Task 1: Provider and bounded context

- [x] Test provider REST request, SSE decoding, structured output and abort propagation.
- [x] Implement `AIProvider`, `GeminiProvider`, and bounded context construction.
- [x] Run focused provider/context tests and typecheck.

### Task 2: Authenticated streaming route and budgets

- [x] Test auth, strict request validation, persisted user messages, complete-only assistant save, usage accounting, budget rejection and player isolation using PGlite/fake provider.
- [x] Implement weekly player/global budget checks backed by `ai_usage` and the streaming route.
- [x] Run PGlite route tests.

### Task 3: Desktop stream controls

- [x] Test same-origin stream requests, token/error event handling and cancellation.
- [x] Wire Companion account mode to server streaming with Stop and Retry; retain scripted offline demo.
- [x] Run full tests, typecheck, build, and document the missing live Gemini/Neon verification boundary.
