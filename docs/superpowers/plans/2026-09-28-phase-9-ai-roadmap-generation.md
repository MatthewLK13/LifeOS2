# Phase 9: AI Roadmap Generation

> **For agentic workers:** Execute inline. Add failing tests before implementation.

**Goal:** Let a player describe a learning goal, get a validated custom roadmap preview, and explicitly accept or reject it.

**Architecture:** A server-only Gemini generator uses the canonical catalog as grounding and asks for a strict bounded chapter/quest structure. The server validates limits, schedule, types and content before persisting a pending CREATE proposal using the existing proposal lifecycle. Accept reuses the existing transactional journey creation; reject leaves no active journey. Account Companion gathers goal, background and minutes before requesting a proposal. Offline scripted roadmap flow remains unchanged.

**Tech Stack:** Hono, Zod, Drizzle/PostgreSQL, Gemini structured output, existing vanilla JavaScript Companion and journey APIs.

**Spec:** `docs/LifeOS_Codex_Implementation_Spec.md`, sections 12.2, 12.5, 14, Phase 9.

## Global Constraints

- AI roadmaps are grounded in the canonical curriculum where a matching topic exists.
- Validate all provider output before writing a proposal.
- Generated roadmaps remain pending until explicit acceptance.
- Rejection leaves existing journeys, XP and quests unchanged.
- No browser-supplied progress, reward or authoritative journey fields.

## Review Focus

- Malformed/oversized model output creates no rows.
- Unsupported quest types and invalid durations are rejected.
- Generated chapters have stable dependency order and no cycles.
- Stale or repeated accept requests follow the existing proposal conflict rules.
- Provider failure preserves the current Companion and journeys.

### Task 1: Generator schema and proposal service

- [x] Test strict generated roadmap schema and constraints.
- [x] Generate a bounded custom curriculum grounded in canonical tracks and dynamic topics.
- [x] Persist a pending CREATE proposal consumable by the existing accept/reject lifecycle.

### Task 2: Authenticated generation route and budget

- [x] Test auth, validation, usage budget, proposal preview and no writes on invalid output.
- [x] Add `/api/journeys/generate-ai` and same-origin client helper.

### Task 3: Companion onboarding and preview

- [x] Collect topic/goal, experience and daily minutes in account-mode chat.
- [x] Render the generated preview and reuse explicit Accept/Reject controls.
- [x] Keep offline template flows unchanged.

### Task 4: Verification

- [x] Run full tests, typecheck, build and update implementation notes.
