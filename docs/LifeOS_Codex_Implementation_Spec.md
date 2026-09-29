# LifeOS — Codex Implementation Specification

**Status:** Final implementation spec v1.0  
**Target:** Existing LifeOS Grimoire repository  
**Primary implementer:** Codex / coding agent  
**Production target:** `https://lifeos.fluxlab.pro.vn` on Vercel Hobby  
**Scale target:** ~20 users  
**Last design lock:** 2026-09-28

---

## 0. How Codex must use this document

This file is the source of truth for the backend implementation and the minimal frontend changes required to make the current mock/demo product fully functional.

Codex must:

1. Preserve the existing visual design and the current Vanilla JS frontend architecture unless a change is explicitly required by this spec.
2. Implement incrementally by phase. Do not attempt a full rewrite in one pass.
3. Keep game rules on the server. The browser must never be authoritative for XP, rank, Coins, streak, achievements, knowledge progression, roadmap acceptance, or quest completion state.
4. Preserve completed history. Completed quests, earned XP, gained knowledge, unlocked achievements, milestones, and past roadmap revisions are immutable to ordinary users and AI.
5. Prefer simple modular-monolith code over distributed architecture.
6. Do **not** introduce Redis, Kafka, background workers, microservices, WebSocket servers, Kubernetes, or a separate auth SaaS for this MVP.
7. Keep AI optional from the perspective of core gameplay. If Gemini is down or budget is exhausted, Today, Roadmap, Quest, XP, Knowledge Tree display, achievements, inventory, and existing data must still work.
8. Add tests for domain invariants before replacing current mock behavior.
9. Keep production and development databases separate.
10. Do not remove current static templates, visualizations, or mock seed content until their server-backed equivalent exists and passes tests.

If code in the repository conflicts with this specification, prefer this specification unless it would break an existing UI contract that can be preserved safely. In that case, adapt the API/server shape to minimize frontend rewrites.

---

# 1. Current repository baseline

The current repository is a static Vanilla JS application with:

- `src/app.js` as the main client controller.
- `src/state.js` holding most mutable game state and pure-ish game rules.
- `src/data.js`, `src/curriculum.js`, `src/breadth.js`, and `src/pathways.js` holding catalog/template content.
- `src/pages.js`, `src/companion.js`, `src/graph.js`, and `src/ui.js` rendering UI.
- `server.mjs` only serving static files locally.
- localStorage acting as the current source of truth.
- existing tests under `tests/` validating some mock/domain behavior.

Important current rules that must survive migration:

- Quest completion is idempotent.
- A completed quest cannot award XP twice.
- Daily XP is capped at **120 XP/day**.
- Level formula remains `1 + floor(totalXp / 100)`.
- Roadmap changes are previewed before application.
- Current templates and roadmap/knowledge graph visualizations should be reused.
- Existing demo profile `Minh` remains available as seeded demo data.

The current UI uses one large state object. During migration, keep a compatible aggregate endpoint (`GET /api/state`) so the frontend does not need a complete rewrite.

---

# 2. Product goals and non-goals

## 2.1 Goals

The final MVP must:

- run on Vercel Hobby;
- use a real PostgreSQL database;
- support ~20 independent guest players;
- create anonymous browser sessions automatically;
- provide a ~10-character Player Code to restore a player on another browser/device;
- provide a dedicated seeded demo profile;
- preserve the current LifeOS UI and graph-based presentation;
- support real journeys, chapters, quests, XP, level, streak, rank, milestones, achievements, Coins, inventory and avatar cosmetics;
- provide real Gemini-powered Companion chat with streaming;
- allow AI-generated roadmap proposals based on templates and player context;
- require explicit player confirmation before applying major AI roadmap changes;
- infer knowledge from conversation and assessments;
- allow dynamic concepts and dynamic knowledge branches/domains;
- keep the Knowledge Tree monotonic: knowledge levels can increase but never decrease;
- support optional quiz, written, and code-review assessments;
- summarize old conversation sessions;
- propose memories but require player confirmation before persistent memory is stored;
- enforce weekly AI usage budget;
- support Web Push notifications;
- use Vercel Cron for daily maintenance/reminder work;
- deploy production from GitHub `main` and previews from feature branches/PRs;
- use `lifeos.fluxlab.pro.vn` as the production hostname.

## 2.2 Non-goals for MVP

Do not build:

- traditional email/password registration;
- Google/GitHub OAuth;
- password reset/email verification;
- leaderboard;
- social feed;
- multiplayer gameplay;
- admin dashboard UI;
- user-uploaded binary files/PDFs;
- RAG over user files;
- code execution sandbox;
- custom avatar image upload;
- payments/subscriptions;
- full offline mode;
- mobile native apps;
- microservices;
- production-scale observability stack.

---

# 3. Final technology stack

## 3.1 Frontend

- Existing Vanilla JavaScript UI.
- Existing CSS and HTML shell.
- Existing graph rendering logic should be adapted, not rewritten.
- Add a small `src/api-client.js` abstraction.
- Add Service Worker only for Web Push.
- Network connection is required after backend migration.

## 3.2 Backend

Use:

- TypeScript.
- Node.js runtime on Vercel Functions.
- Hono as the lightweight HTTP router for the modular monolith.
- Zod for runtime input/output validation of API payloads and AI structured outputs.
- Drizzle ORM.
- `@neondatabase/serverless` for PostgreSQL access.
- Drizzle Kit for migrations.

The backend may be mounted through one catch-all Vercel function, e.g. `api/[...route].ts`, with the actual implementation organized under `server/`.

## 3.3 Database

- Neon PostgreSQL.
- Separate production and development database/branch URLs.
- Never let Vercel Preview use the production DB.

## 3.4 AI

Use Google Gemini through the official `@google/genai` SDK.

Default models:

- Primary/high-value model: `gemini-3.8-flash`.
- Background/cheap model: `gemini-3.5-flash-lite`.

Do not hard-wire these names throughout the code. Use environment/config values and an `AIProvider` interface.

Primary model use cases:

- Companion answers.
- Roadmap generation.
- Roadmap modification proposals.
- Assessment feedback for harder prompts.

Background model use cases:

- conversation summaries;
- knowledge-signal extraction;
- memory-candidate extraction;
- lightweight intent detection;
- concept/domain normalization and matching where deterministic matching is insufficient.

## 3.5 Notifications

- Web Push.
- Service Worker.
- VAPID keys.
- `web-push` or equivalent maintained Node package.

## 3.6 Deployment

- GitHub repository.
- `main` -> Vercel Production -> production Neon DB.
- feature branch / PR -> Vercel Preview -> development Neon DB.
- Production custom domain: `lifeos.fluxlab.pro.vn`.

---

# 4. High-level architecture

```text
Browser / Vanilla JS
        |
        | HTTPS
        v
Vercel
  +-- Static frontend
  +-- /api/* TypeScript Function
            |
            +-- Player/session module
            +-- Journey module
            +-- Quest module
            +-- Progression module
            +-- Knowledge module
            +-- Achievement/milestone module
            +-- Economy/inventory module
            +-- Companion module
            +-- Assessment module
            +-- Notification module
            +-- AI provider/orchestrator
            |
            v
       Neon PostgreSQL
            |
            +-----------------> Gemini API
```

Architecture style: **modular monolith**.

No module should call Gemini directly except through `server/ai/`.

No client component should write authoritative progression fields directly.

---

# 5. Core domain invariants

These are mandatory and must be covered by tests.

## 5.1 Immutable past

Once an item belongs to completed historical progress, ordinary player actions and AI cannot delete or rewrite it.

Immutable player history includes:

- completed quests;
- earned XP ledger entries;
- knowledge gains/signals already accepted by the Knowledge Engine;
- unlocked achievements;
- reached milestones;
- Coins already earned/spent ledger records if a ledger is implemented;
- past roadmap revision records;
- completed journeys.

AI can adapt current/future roadmap content but not erase historical progress.

## 5.2 Server authority

The client may request actions, but the server calculates results.

Examples:

Client may send:

```json
{ "action": "completeQuest", "questId": "..." }
```

Client must never send authoritative results such as:

```json
{ "xp": 9999, "rank": "Master", "coins": 100000 }
```

Any such fields supplied by a client must be ignored/rejected.

## 5.3 Quest completion idempotency

Completing the same quest twice:

- must not create another completion;
- must not grant additional XP;
- must not extend streak twice;
- must not unlock duplicate achievements.

## 5.4 XP cap

A player may earn at most **120 XP per Vietnam calendar day**.

Completing a quest is still allowed when the cap is reached. The awarded XP is reduced to the remaining allowance, potentially zero.

Example:

- daily XP so far = 115;
- quest reward = 20;
- quest becomes completed;
- awarded XP = 5;
- daily XP becomes 120.

## 5.5 Level

```text
level = 1 + floor(totalXp / 100)
```

Do not persist level as the only source of truth. It may be cached/displayed, but total XP is authoritative.

## 5.6 Knowledge monotonicity

Concept knowledge level may only stay the same or increase.

It must never decrease automatically.

## 5.7 AI cannot directly promote mastery/rank

Gemini emits evidence/signals. Deterministic backend rules calculate:

- concept level;
- domain score;
- domain rank.

## 5.8 Proposal confirmation

Major roadmap/schedule changes generated by AI are never silently applied.

Required flow:

```text
AI creates proposal
-> backend validates proposal
-> player sees preview
-> player Accepts or Rejects
-> only Accept mutates roadmap
```

## 5.9 Core app survives AI failure

Gemini failure, rate limiting, or budget exhaustion may disable AI-dependent actions only.

The player must still be able to:

- open app;
- view Today;
- view Roadmap;
- start/complete/skip existing quests;
- earn XP under normal rules;
- view existing Knowledge Tree;
- view progress;
- view achievements/inventory;
- use existing roadmap data.

---

# 6. Player identity and session design

There is no traditional registration in MVP.

## 6.1 First visit

On first load with no valid session cookie:

1. Frontend calls `POST /api/player`.
2. Server creates a Player and Profile.
3. Server generates a Player Code.
4. Server sets secure session cookie.
5. API returns the Player Code once for display/copy.
6. New player receives light demo/seed data and a Companion invitation to create a new journey.

## 6.2 Player Code

Use **10 random characters** from an unambiguous alphabet such as Crockford Base32 excluding ambiguous characters.

Target entropy: approximately 50 bits.

Display may use separators for readability, e.g.:

```text
K7F4-M9Q2XZ
```

Separators are not counted as random symbols and should be ignored during normalization.

Do not store raw Player Code.

Recommended lookup mechanism:

```text
normalizedCode
-> HMAC-SHA256(PLAYER_CODE_PEPPER, normalizedCode)
-> code_digest
```

Store `code_digest` with a unique index.

Do not use a slow password hash if it prevents efficient direct lookup. The Player Code is a high-entropy recovery secret, not a human password. Protect restore endpoints with rate limiting.

## 6.3 Session cookie

Use a signed server-generated session representation.

Requirements:

- HttpOnly.
- Secure in production.
- SameSite=Lax.
- Path=/.
- Contains no Player Code.
- Signed using `SESSION_SECRET`.
- A valid session resolves to `playerId` and role.

Do not expose `SESSION_SECRET` to frontend code.

## 6.4 Restore

`POST /api/player/restore`

Input:

```json
{ "code": "K7F4-M9Q2XZ" }
```

Server:

1. normalize;
2. digest with pepper;
3. find player;
4. rate-limit attempts;
5. issue fresh session cookie;
6. return basic profile.

## 6.5 Roles

Prepare role enum now:

- `GUEST`
- `USER`
- `ADMIN`
- `DEMO`

MVP mainly uses `GUEST` and `DEMO`.

## 6.6 Demo profile

Seed one dedicated demo player:

- display name: `Minh`;
- seeded RAG journey;
- ~250 XP;
- current sample Knowledge Tree state;
- sample conversation/summary;
- sample achievements and inventory;
- 3 base avatar choices available.

Provide a way for the UI to enter the demo profile without knowing a database ID.

Recommended endpoint:

`POST /api/player/demo`

It issues a session for the demo profile.

The demo profile may expose a **Reset Demo** button. Reset is allowed only if the current session role is `DEMO`.

Also keep an admin-only reset endpoint.

---

# 7. Database schema

Use UUID primary keys unless a stable catalog key is more appropriate.

All timestamps are stored in UTC. User-facing day calculations use `Asia/Ho_Chi_Minh`.

## 7.1 `players`

Fields:

- `id uuid primary key`
- `code_digest text unique not null`
- `role enum not null default GUEST`
- `is_demo boolean not null default false`
- `status enum ACTIVE | DISABLED`
- `created_at timestamptz not null`
- `last_active_at timestamptz not null`

Indexes:

- unique `code_digest`
- `last_active_at`

## 7.2 `profiles`

Fields:

- `player_id uuid primary key references players(id)`
- `display_name text not null`
- `xp integer not null default 0`
- `coins integer not null default 0`
- `daily_xp integer not null default 0`
- `daily_xp_date date not null`
- `streak integer not null default 0`
- `longest_streak integer not null default 0`
- `last_quest_completed_date date null`
- `timezone text not null default 'Asia/Ho_Chi_Minh'`
- `avatar_item_id uuid null`
- `frame_item_id uuid null`
- `title_item_id uuid null`
- `grimoire_skin_item_id uuid null`
- `companion_cosmetic_item_id uuid null`
- `preferences jsonb not null default '{}'`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

Do not rely solely on `profiles.xp` for auditability; XP ledger must also exist.

## 7.3 `journeys`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `title text not null`
- `goal text not null`
- `status enum ACTIVE | COMPLETED | ARCHIVED`
- `version integer not null default 1`
- `minutes_per_day integer not null`
- `experience_level text null`
- `template_key text null`
- `created_at timestamptz not null`
- `completed_at timestamptz null`
- `archived_at timestamptz null`

There is no limit on number of journeys.

## 7.4 `journey_arcs`

Optional grouping layer.

Fields:

- `id uuid primary key`
- `journey_id uuid references journeys(id)`
- `title text not null`
- `summary text null`
- `order_index integer not null`
- `created_at timestamptz not null`

A journey may have zero arcs.

## 7.5 `chapters`

Fields:

- `id uuid primary key`
- `journey_id uuid references journeys(id)`
- `arc_id uuid null references journey_arcs(id)`
- `title text not null`
- `summary text null`
- `order_index integer not null`
- `lane text null`
- `metadata jsonb not null default '{}'`
- `created_at timestamptz not null`

## 7.6 `quests`

Fields:

- `id uuid primary key`
- `journey_id uuid references journeys(id)`
- `chapter_id uuid references chapters(id)`
- `type enum LEARN | PRACTICE | ASSESSMENT | PROJECT`
- `assessment_subtype enum QUIZ | CODE_REVIEW | WRITTEN null`
- `title text not null`
- `description text null`
- `topic text null`
- `prompt text null`
- `difficulty text null`
- `xp_reward integer not null`
- `minutes integer not null`
- `status enum AVAILABLE | IN_PROGRESS | COMPLETED | SKIPPED`
- `order_index integer not null`
- `source enum TEMPLATE | AI | HYBRID`
- `metadata jsonb not null default '{}'`
- `started_at timestamptz null`
- `completed_at timestamptz null`
- `skipped_at timestamptz null`
- `created_at timestamptz not null`
- `updated_at timestamptz not null`

Completed quests are immutable to player/AI update endpoints.

## 7.7 `quest_steps`

Fields:

- `id uuid primary key`
- `quest_id uuid references quests(id)`
- `order_index integer not null`
- `content text not null`
- `completed boolean not null default false`
- `completed_at timestamptz null`

Unique `(quest_id, order_index)`.

## 7.8 `quest_notes`

Fields:

- `quest_id uuid primary key references quests(id)`
- `player_id uuid references players(id)`
- `content text not null default ''`
- `updated_at timestamptz not null`

Maximum length should be bounded, e.g. 20k characters.

## 7.9 `xp_ledger`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `quest_id uuid null references quests(id)`
- `source text not null`
- `amount integer not null`
- `local_date date not null`
- `created_at timestamptz not null`

XP modifications must happen in a transaction that also inserts ledger entry.

## 7.10 `roadmap_proposals`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `journey_id uuid references journeys(id)`
- `base_version integer not null`
- `type enum CREATE | MODIFY | PACING`
- `status enum PENDING | ACCEPTED | REJECTED | EXPIRED`
- `reason text null`
- `patch_json jsonb not null`
- `preview_json jsonb not null`
- `created_at timestamptz not null`
- `decided_at timestamptz null`

An accepted proposal must verify that `journeys.version == base_version` before applying.

If not, return conflict and require regeneration.

## 7.11 `roadmap_revisions`

Fields:

- `id uuid primary key`
- `journey_id uuid references journeys(id)`
- `version_from integer not null`
- `version_to integer not null`
- `reason text null`
- `diff_json jsonb not null`
- `created_at timestamptz not null`

This is append-only.

## 7.12 `domains`

Knowledge branches/domains may be seeded globally or created dynamically for one player.

Fields:

- `id uuid primary key`
- `owner_player_id uuid null references players(id)`
- `key text null`
- `name text not null`
- `normalized_name text not null`
- `description text null`
- `source enum SEED | AI_DYNAMIC`
- `icon_key text null`
- `color_key text null`
- `created_at timestamptz not null`

`owner_player_id = null` means global seed domain.

Dynamic domains normally belong to one player.

## 7.13 `concepts`

Fields:

- `id uuid primary key`
- `domain_id uuid references domains(id)`
- `owner_player_id uuid null references players(id)`
- `key text null`
- `name text not null`
- `normalized_name text not null`
- `description text null`
- `source enum SEED | AI_DYNAMIC`
- `created_at timestamptz not null`

Dynamic concept duplicate prevention must consider normalized name and domain, plus AI matching only when deterministic matching is inconclusive.

## 7.14 `concept_progress`

Fields:

- `player_id uuid references players(id)`
- `concept_id uuid references concepts(id)`
- `level enum UNSEEN | DISCOVERED | EXPLORING | UNDERSTANDING | APPLYING | MASTERED`
- `signal_counts jsonb not null default '{}'`
- `first_seen_at timestamptz null`
- `updated_at timestamptz not null`
- `mastered_at timestamptz null`

Composite PK `(player_id, concept_id)`.

## 7.15 `knowledge_signals`

Backend-only evidence. Do not expose an evidence UI in MVP.

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `concept_id uuid references concepts(id)`
- `conversation_id uuid null`
- `source_type enum CHAT | QUIZ | WRITTEN | CODE_REVIEW | QUEST_REFLECTION`
- `source_id uuid null`
- `signal_type enum DISCOVERY | EXPLORATION | UNDERSTANDING | APPLICATION`
- `confidence numeric not null`
- `created_at timestamptz not null`

Only store short structured evidence, not long AI essays.

## 7.16 `conversations`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `title text null`
- `status enum ACTIVE | CLOSED`
- `started_at timestamptz not null`
- `last_message_at timestamptz not null`
- `closed_at timestamptz null`
- `summarized_at timestamptz null`

## 7.17 `messages`

Fields:

- `id uuid primary key`
- `conversation_id uuid references conversations(id)`
- `role enum USER | ASSISTANT | SYSTEM`
- `content text not null`
- `status enum COMPLETE | FAILED`
- `input_tokens integer null`
- `output_tokens integer null`
- `created_at timestamptz not null`

Partial assistant responses from interrupted/failed streams must not be committed as `COMPLETE`.

## 7.18 `conversation_summaries`

Fields:

- `id uuid primary key`
- `conversation_id uuid references conversations(id)`
- `player_id uuid references players(id)`
- `summary text not null`
- `key_topics jsonb not null default '[]'`
- `created_at timestamptz not null`

Retention target:

- keep 5 newest sessions with full messages;
- keep up to 20 summaries;
- older full message bodies may be deleted after a valid summary exists.

## 7.19 `memories`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `text text not null`
- `status enum PENDING | CONFIRMED | DISMISSED`
- `source_conversation_id uuid null`
- `created_at timestamptz not null`
- `decided_at timestamptz null`

Only `CONFIRMED` memory is sent back to AI as persistent memory.

## 7.20 `assessments`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `quest_id uuid null references quests(id)`
- `subtype enum QUIZ | CODE_REVIEW | WRITTEN`
- `prompt text not null`
- `content_json jsonb not null`
- `template_key text null`
- `created_at timestamptz not null`

## 7.21 `assessment_attempts`

Fields:

- `id uuid primary key`
- `assessment_id uuid references assessments(id)`
- `player_id uuid references players(id)`
- `answer_text text not null`
- `verdict enum NEEDS_WORK | GOOD | STRONG`
- `feedback text not null`
- `structured_result jsonb not null default '{}'`
- `created_at timestamptz not null`

Do not use numeric grades as the primary learning representation.

## 7.22 `achievements`

Catalog table.

Fields:

- `id uuid primary key`
- `key text unique not null`
- `name text not null`
- `description text not null`
- `rule_key text not null`
- `reward_coins integer not null default 0`
- `icon_asset_key text null`
- `active boolean not null default true`

## 7.23 `player_achievements`

- `player_id uuid`
- `achievement_id uuid`
- `unlocked_at timestamptz`

Composite unique key prevents duplicate unlock.

## 7.24 `milestones`

Catalog table:

- `id uuid`
- `key text unique`
- `category text`
- `threshold integer`
- `name text`
- `description text`
- `reward_coins integer`
- `active boolean`

## 7.25 `player_milestones`

- `player_id uuid`
- `milestone_id uuid`
- `reached_at timestamptz`

Unique `(player_id, milestone_id)`.

## 7.26 `inventory_items`

Fields:

- `id uuid primary key`
- `key text unique not null`
- `category enum AVATAR | FRAME | TITLE | GRIMOIRE_SKIN | COMPANION_COSMETIC`
- `name text not null`
- `description text null`
- `rarity text null`
- `price_coins integer not null default 0`
- `asset_key text not null`
- `active boolean not null default true`

## 7.27 `player_inventory`

Fields:

- `player_id uuid`
- `item_id uuid`
- `unlocked_at timestamptz`

Unique `(player_id, item_id)`.

V1 ships at least 3 base avatar items.

## 7.28 `push_subscriptions`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `endpoint text unique not null`
- `p256dh text not null`
- `auth text not null`
- `created_at timestamptz not null`
- `last_success_at timestamptz null`
- `disabled_at timestamptz null`

## 7.29 `notifications`

Fields:

- `id uuid primary key`
- `player_id uuid references players(id)`
- `type text not null`
- `local_date date not null`
- `status enum PENDING | SENT | FAILED | SKIPPED`
- `payload_json jsonb not null`
- `created_at timestamptz not null`
- `sent_at timestamptz null`
- `error text null`

Use unique constraint appropriate to prevent duplicate daily reminder for same player/date/type.

## 7.30 `ai_usage`

Fields:

- `id uuid primary key`
- `player_id uuid null references players(id)`
- `provider text not null`
- `model text not null`
- `purpose enum COMPANION | ROADMAP | ASSESSMENT | KNOWLEDGE_ANALYSIS | SUMMARY | MEMORY | CONCEPT_MATCH`
- `input_tokens integer not null default 0`
- `output_tokens integer not null default 0`
- `estimated_cost_micros bigint not null default 0`
- `created_at timestamptz not null`

The global budget calculation queries this table.

---

# 8. Knowledge Engine

## 8.1 Knowledge levels

Exact ordered levels:

1. `UNSEEN`
2. `DISCOVERED`
3. `EXPLORING`
4. `UNDERSTANDING`
5. `APPLYING`
6. `MASTERED`

Knowledge never decreases.

## 8.2 AI output contract

Gemini does not output final level.

It returns signals such as:

```ts
type KnowledgeSignalCandidate = {
  conceptName: string;
  suggestedDomainName?: string;
  signalType: 'DISCOVERY' | 'EXPLORATION' | 'UNDERSTANDING' | 'APPLICATION';
  confidence: number; // 0..1
  reasonShort: string; // short backend-only reason
};
```

`reasonShort` is for debugging/audit only and must be short.

## 8.3 Deterministic progression

Implement a deterministic progression policy. Exact thresholds may be centralized in config and tuned later, but the default must make mastery difficult.

Recommended initial rule set:

### UNSEEN -> DISCOVERED

Requires at least one accepted signal with confidence >= 0.55.

### DISCOVERED -> EXPLORING

Requires either:

- 2 accepted DISCOVERY/EXPLORATION signals total; or
- 1 EXPLORATION signal with confidence >= 0.75.

### EXPLORING -> UNDERSTANDING

Requires:

- at least 2 UNDERSTANDING signals;
- at least one from a different message/attempt;
- mean confidence >= 0.70.

### UNDERSTANDING -> APPLYING

Requires:

- at least 1 APPLICATION signal confidence >= 0.70;
- plus existing UNDERSTANDING evidence.

### APPLYING -> MASTERED

Requires all:

- at least 3 APPLICATION signals;
- signals across at least 2 different conversation/assessment sessions;
- at least 1 signal from an assessment/project/code/written source OR a clearly applied chat reasoning signal;
- average application confidence >= 0.80.

Do not jump from UNSEEN directly to MASTERED regardless of AI output.

The engine may advance multiple levels only if accumulated historical signals genuinely satisfy every intermediate threshold.

## 8.4 Dynamic concept resolution

When AI emits a concept candidate:

1. normalize case/whitespace/punctuation;
2. attempt exact normalized match;
3. attempt known alias match if aliases exist;
4. if still unresolved, ask cheap AI concept matcher only when necessary;
5. if related domain exists, create dynamic concept in that domain;
6. if no related domain exists, create a player-owned dynamic domain then concept.

Avoid duplicates such as:

- `REST API`
- `REST APIs`
- `RESTful API`

mapping to three nodes.

## 8.5 Domain rank

Ranks:

- `Novice`
- `Apprentice`
- `Adept`
- `Expert`
- `Master`

AI never assigns rank.

Initial concept weights:

| Level | Weight |
|---|---:|
| UNSEEN | 0 |
| DISCOVERED | 1 |
| EXPLORING | 2 |
| UNDERSTANDING | 4 |
| APPLYING | 7 |
| MASTERED | 10 |

Domain score should be calculated from concept weights using a deterministic function. Do not let huge numbers of newly created UNSEEN concepts punish rank excessively. Use only discovered/active concepts or a bounded catalog denominator.

Recommended initial approach:

```text
score = sum(weights of player's non-UNSEEN concepts in domain)
        / max(1, count(non-UNSEEN concepts) * 10)
```

Then combine with minimum breadth requirements so one mastered concept cannot create `Master` rank.

Suggested first thresholds:

- Novice: default.
- Apprentice: score >= 0.20 and >= 3 discovered concepts.
- Adept: score >= 0.40 and >= 5 concepts with UNDERSTANDING+.
- Expert: score >= 0.65 and >= 4 concepts with APPLYING+.
- Master: score >= 0.82 and >= 5 MASTERED concepts and >= 8 APPLYING+ concepts.

Put thresholds in one config module and unit test them.

---

# 9. Progression engine

## 9.1 Quest states

```text
AVAILABLE -> IN_PROGRESS -> COMPLETED
                         -> SKIPPED
```

Allowed transitions:

- AVAILABLE -> IN_PROGRESS
- AVAILABLE -> SKIPPED
- IN_PROGRESS -> COMPLETED
- IN_PROGRESS -> SKIPPED

Optionally allow AVAILABLE -> COMPLETED if current UI needs it, but server must still apply normal completion transaction.

Forbidden ordinary transition:

- COMPLETED -> anything
- SKIPPED -> COMPLETED unless product code explicitly adds a re-open feature later

For MVP, keep SKIPPED final.

## 9.2 Quest types

- LEARN
- PRACTICE
- ASSESSMENT
- PROJECT

Assessment subtypes:

- QUIZ
- CODE_REVIEW
- WRITTEN

## 9.3 Completion transaction

`completeQuest(playerId, questId)` must run atomically.

Pseudo-flow:

```text
BEGIN
  load quest scoped to player
  verify quest exists
  if already COMPLETED -> return existing result (idempotent)
  reject if SKIPPED

  ensureDailyState(player)

  remaining = max(0, 120 - profile.dailyXp)
  award = min(quest.xpReward, remaining)

  mark quest COMPLETED + completed_at

  if award > 0:
      increment profile.xp by award
      increment profile.dailyXp by award
      insert xp_ledger

  update last_quest_completed_date
  update streak if needed

  evaluate achievement rules
  evaluate milestone rules
  grant Coins for new unlocks in same or safe follow-up transaction
COMMIT
```

Prevent race conditions from two simultaneous complete requests. Use row locks / transaction semantics / conditional updates appropriate for PostgreSQL and Drizzle.

## 9.4 Daily XP and local day

All day rules use `Asia/Ho_Chi_Minh`.

Implement a helper:

```ts
getVietnamLocalDate(now: Date): string // YYYY-MM-DD
```

Do not use browser date as authority.

## 9.5 Streak

A day counts if at least one quest was COMPLETED that Vietnam calendar day.

SKIPPED does not count.

If a player misses one full calendar day, streak resets to 0.

Recommended completion update:

- if last completion date == today: no streak increment;
- if last completion date == yesterday: streak += 1;
- if last completion date < yesterday or null: streak = 1;

Maintain `longest_streak`.

Cron may materialize/reset stale values, but request-time logic must guarantee correctness if cron is delayed.

---

# 10. Journey and roadmap engine

## 10.1 Structure

Roadmaps may be:

```text
Journey -> Chapter -> Quest
```

or:

```text
Journey -> Arc -> Chapter -> Quest
```

Arc is optional.

## 10.2 Initial roadmap generation

Input context:

- player goal;
- background/experience;
- minutes/day;
- relevant existing template(s);
- relevant current Knowledge Tree;
- active/completed journey history where useful.

The current repository templates are the preferred grounding source.

AI may personalize/reorder/add content, but should not ignore templates when a relevant template exists.

## 10.3 Catalog strategy

Refactor current curriculum/template data into a reusable shared catalog module instead of duplicating template definitions between frontend and backend.

Preferred direction:

```text
shared/
  catalog/
    tracks.mjs
    concepts.mjs
    curriculum.mjs
```

Frontend imports the shared ESM data for previews/visualization.
Backend imports the same canonical catalog for roadmap grounding/seed generation.

If importing one shared module into both build targets becomes impractical, generate one side from a canonical JSON source. Do not maintain two manually divergent catalogs.

## 10.4 Proposal rule

Every AI roadmap change beyond a simple quest note/checklist update creates `roadmap_proposals`.

AI can propose:

- add future Arc;
- add future Chapter;
- remove future Chapter;
- reorder future content;
- add/replace/split a quest;
- adjust minutes/day;
- modify an IN_PROGRESS quest;
- add new concept/topic references.

It cannot propose deletion of completed history.

## 10.5 Applying proposal

On Accept:

1. load proposal;
2. confirm player ownership;
3. confirm status PENDING;
4. confirm journey current version == proposal.baseVersion;
5. validate patch against immutable-history rules;
6. apply in transaction;
7. increment journey version;
8. append roadmap revision;
9. mark proposal ACCEPTED.

On version conflict, return HTTP 409 with code `PROPOSAL_STALE`.

## 10.6 Pacing proposal

Preserve current behavior where long unstarted activities can be split when daily minutes decrease.

Rules:

- never split completed quests;
- if an in-progress quest is changed, preserve the historical started timestamp and record revision metadata;
- distribute original XP across generated parts without creating extra total XP;
- use deterministic rounding and test the sum.

---

# 11. Assessments

Assessments are optional learning activities and do not block the player from manually completing a quest.

Their main effect is feedback + Knowledge Signals.

## 11.1 Quiz

Flow:

```text
curriculum/template seed
-> Gemini produces variation
-> player answers
-> automatic grading
-> feedback + explanation
-> structured knowledge signals
```

Store question data in `content_json`.

For multiple-choice questions, backend can deterministically validate the expected answer generated in structured output. Gemini may produce explanation, but correctness should not be decided by a second unconstrained text response when the generated answer key is available.

## 11.2 Written assessment

Player pastes written answer.

Gemini returns:

- verdict: NEEDS_WORK | GOOD | STRONG;
- concise feedback;
- misconception list if any;
- knowledge signal candidates.

No numeric grade.

## 11.3 Code review assessment

Player pastes code as text.

Important:

- never execute code;
- never shell out using user code;
- never compile uploaded/pasted code on server;
- input limit applies.

Gemini evaluates conceptual correctness/reasoning, not trusted runtime behavior.

## 11.4 Pasted text limit

Maximum pasted text payload: **200 KB**.

Enforce server-side by UTF-8 byte length.

Return 413 or validation error when exceeded.

---

# 12. Companion and AI orchestration

## 12.1 AIProvider interface

Create provider abstraction similar to:

```ts
export interface AIProvider {
  streamChat(input: ChatInput, signal?: AbortSignal): Promise<ReadableStream>;
  generateStructured<T>(request: StructuredRequest<T>): Promise<AIResult<T>>;
  summarize(request: SummaryRequest): Promise<AIResult<ConversationSummary>>;
}
```

`GeminiProvider` implements this interface.

No domain service imports `@google/genai` directly.

## 12.2 Model routing

Use config:

```text
AI_PRIMARY_MODEL=gemini-3.8-flash
AI_BACKGROUND_MODEL=gemini-3.5-flash-lite
```

Primary:

- conversational response;
- roadmap creation;
- roadmap proposal;
- complex assessment feedback.

Background:

- knowledge extraction;
- summary;
- memory candidate detection;
- lightweight intent;
- concept matching.

## 12.3 Chat streaming

Endpoint streams assistant response to frontend.

Requirements:

- support AbortController from frontend for Stop Generating;
- if stream fails or is aborted, do not save partial assistant text as COMPLETE;
- user message remains saved;
- frontend offers Retry;
- successful assistant message is saved after stream completes;
- usage tokens/cost are recorded when provider supplies usage.

Use Vercel Node.js Function streaming rather than a persistent WebSocket server.

## 12.4 Language behavior

UI is English-only.

Companion response language follows the user's current language automatically.

Do not force English if user chats in Vietnamese.

## 12.5 Chat context construction

Never send unlimited conversation history.

Context priority:

1. system instructions;
2. player profile essentials;
3. active journey summary;
4. relevant current knowledge;
5. confirmed persistent memories;
6. relevant conversation summaries;
7. current session recent messages;
8. current user message.

Before provider call:

- estimate context size;
- omit irrelevant summaries;
- summarize/truncate old session content;
- respect configurable token target.

## 12.6 Analyzer gating

Do not run Learning Analyzer on every trivial message.

Skip obvious low-value messages such as:

- greetings;
- thanks;
- very short navigation commands;
- memory accept/dismiss actions;
- purely cosmetic requests.

Analyze messages that contain:

- conceptual questions;
- explanations;
- comparisons/trade-offs;
- code;
- applied reasoning;
- assessment answers;
- meaningful learning reflection.

A simple deterministic heuristic is acceptable first. It can be improved later.

## 12.7 Knowledge Analyzer output

Use strict structured schema.

Example:

```ts
const KnowledgeAnalysisSchema = z.object({
  signals: z.array(z.object({
    conceptName: z.string().min(1).max(120),
    suggestedDomainName: z.string().max(120).optional(),
    signalType: z.enum(['DISCOVERY','EXPLORATION','UNDERSTANDING','APPLICATION']),
    confidence: z.number().min(0).max(1),
    reasonShort: z.string().max(240)
  })).max(12),
  memoryCandidates: z.array(z.object({
    text: z.string().min(1).max(240),
    confidence: z.number().min(0).max(1)
  })).max(3)
});
```

Validate before writing anything.

Failure of analyzer must not fail the chat response.

## 12.8 Memory candidate rule

AI may create PENDING memory suggestions.

Example UI:

```text
Arcana noticed: "You learn best through small projects."
[Remember] [Dismiss]
```

Only CONFIRMED memories go into future AI context.

Do not build a separate memory management screen in MVP.

---

# 13. Conversation lifecycle and retention

## 13.1 Session creation

A player has one active conversation at a time unless UI explicitly chooses otherwise.

`New conversation` closes current session and opens a new one.

## 13.2 Inactivity closure

Tab/browser close is not reliable.

Use lazy inactivity logic:

- if the last active session has exceeded a configurable inactivity threshold when player returns/sends a message, close it and summarize it before starting/continuing according to implementation policy.

Recommended initial threshold: 30 minutes.

## 13.3 Summary retention

Keep:

- full messages for 5 newest conversation sessions;
- up to 20 summaries.

After a session has a valid summary and is older than the newest 5 sessions, full messages may be deleted.

Never delete the only summary of a conversation before retention limit requires it.

## 13.4 Summary content

Summary should capture only useful long-term context such as:

- topics studied;
- key questions;
- unresolved confusions;
- decisions made about roadmap;
- learning preferences mentioned;
- goals/background changes.

Avoid unnecessary personal information.

---

# 14. Achievements, milestones, Coins and inventory

## 14.1 Achievements

Achievements are rule-based only. AI does not unlock them.

Seed at least:

1. `first_steps` — Complete first quest.
2. `first_grimoire` — Complete first journey.
3. `curious_mind` — Discover/explore 10 concepts.
4. `seven_suns` — Reach 7-day streak.
5. `deep_diver` — First APPLYING concept.
6. `scholar` — First MASTERED concept.
7. `branching_out` — Explore 3 domains.
8. `polymath` — Reach Apprentice in 3 domains.

Each can reward Coins.

Rule evaluation must be idempotent.

## 14.2 Milestones

Milestones are numeric/long-term checkpoints.

Seed examples:

Quest count:

- 10
- 25
- 50
- 100

XP:

- 500
- 1,000
- 5,000

Knowledge:

- 10 UNDERSTANDING+
- 25 UNDERSTANDING+
- 50 UNDERSTANDING+

Milestones may reward Coins.

## 14.3 Coins

Currency name is exactly **Coins**.

Do not call it Arcana Shards or another name.

Coins come from:

- achievements;
- milestones;
- explicit special progression rewards.

Do not give Coins for every routine quest completion by default.

## 14.4 Inventory

Categories:

- AVATAR
- FRAME
- TITLE
- GRIMOIRE_SKIN
- COMPANION_COSMETIC

No gameplay boosts.

Do not implement:

- XP multipliers;
- knowledge multipliers;
- pay-to-win effects.

## 14.5 V1 avatars

Ship at least 3 base avatar assets/items.

Support equipped:

- avatar;
- frame;
- title.

Schema should already support future Grimoire/Companion cosmetics even if UI is minimal.

---

# 15. Notifications and cron

## 15.1 Timezone

All daily gameplay behavior uses:

```text
Asia/Ho_Chi_Minh
```

## 15.2 Cron jobs

Use two daily production Cron endpoints if supported by current Vercel Hobby configuration:

### Daily rollover

Target local time: approximately 00:00 Vietnam.

UTC cron target:

```text
17:00 UTC (previous UTC date relative to local midnight)
```

Purpose:

- materialize daily XP rollover;
- evaluate/reset stale streak state;
- housekeeping for closed/summarized conversations if lightweight.

### Morning reminder

Target local time: approximately 06:00 Vietnam.

UTC cron target:

```text
23:00 UTC
```

Purpose:

- send push reminder to players with active journey and no completed quest yet for current Vietnam date;
- skip players without push permission/subscription;
- prevent duplicate reminder for same date.

Vercel Hobby cron timing has hour-level precision rather than exact-minute guarantees. The app must remain correct if a cron runs later within its hour.

## 15.3 Lazy safety check

Even though cron is required, implement request-time `ensureDailyState()` so gameplay remains correct if cron is delayed or fails.

Cron is operational maintenance; deterministic request logic is the correctness safety net.

## 15.4 Push permission

Ask for browser notification permission only after a meaningful user action/context.

If denied:

- do not repeatedly prompt;
- app continues normally.

## 15.5 Service Worker

Service Worker responsibilities should be limited to push handling and notification click routing. Do not turn the app into a full offline-first PWA in this phase.

---

# 16. AI budget and rate limiting

## 16.1 Global budget

Global AI budget target:

```text
$2 USD / week
```

This is a hard application-level safety target.

Use:

```text
GLOBAL_AI_WEEKLY_BUDGET_USD=2
```

Budget week should be defined consistently, preferably Monday 00:00 in `Asia/Ho_Chi_Minh`.

## 16.2 Per-player budget

Also enforce a configurable per-player weekly token allowance.

Use env/config, e.g.:

```text
PLAYER_AI_WEEKLY_TOKEN_LIMIT=250000
```

Treat this number as a tunable default, not a permanent product constant.

Demo profile may receive a higher configurable allowance.

## 16.3 Cost estimation

Keep model pricing in one config module rather than scattering constants.

For every provider response, record:

- model;
- purpose;
- input tokens;
- output tokens;
- estimated cost.

Provider pricing changes must require updating only one pricing config.

## 16.4 Budget check

Before AI call:

1. identify player;
2. calculate current player's week tokens;
3. calculate global current-week estimated cost;
4. reject if hard cap exceeded;
5. estimate input/context size;
6. summarize/trim if needed;
7. call provider;
8. record final usage.

When exhausted, return a stable typed error such as:

```json
{
  "error": {
    "code": "AI_WEEKLY_BUDGET_EXHAUSTED",
    "message": "Arcana's AI capacity for this week has been reached. Your quests and progress are still available."
  }
}
```

## 16.5 Short-term spam control

Add a lightweight short-window AI request rate limit, backed by PostgreSQL query/counting or another serverless-safe mechanism.

Do not rely on process memory in Vercel Functions as authoritative rate-limit state.

Example configurable policy:

- max 10 AI requests per minute/player;
- weekly token budget remains the main cost control.

## 16.6 Restore endpoint rate limit

Player Code restore endpoint must also be rate-limited to discourage brute force.

---

# 17. API contract v1

All endpoints are under `/api`.

Use JSON except streaming Companion endpoint.

Every player-owned route resolves player from session cookie; do not accept arbitrary `playerId` from client.

Return stable typed errors:

```ts
type ApiError = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  }
};
```

## 17.1 Player/session

### `POST /api/player`

Create guest if no valid session. Idempotent if session already exists.

Response for newly created guest:

```json
{
  "player": { "id": "...", "displayName": "Scribe" },
  "playerCode": "K7F4-M9Q2XZ",
  "isNew": true
}
```

Do not return code on every state read.

### `POST /api/player/restore`

Body:

```json
{ "code": "K7F4-M9Q2XZ" }
```

### `POST /api/player/demo`

Switch current browser session to seeded demo profile.

### `GET /api/player/me`

Basic identity/profile.

### `POST /api/demo/reset`

Only DEMO session. Restore seeded demo state.

## 17.2 Aggregate state

### `GET /api/state`

Primary migration-friendly endpoint.

Response should contain enough data for current UI:

```ts
type AppStateResponse = {
  profile: ProfileDto;
  activeJourney: JourneyDto | null;
  journeys: JourneyDto[];
  quests: QuestDto[];
  knowledge: {
    domains: DomainDto[];
    concepts: ConceptDto[];
    progress: ConceptProgressDto[];
    ranks: DomainRankDto[];
  };
  progress: {
    totalXp: number;
    level: number;
    dailyXp: number;
    dailyXpCap: 120;
    streak: number;
    longestStreak: number;
  };
  achievements: PlayerAchievementDto[];
  milestones: PlayerMilestoneDto[];
  inventory: PlayerInventoryDto[];
  conversation: ConversationDto | null;
  memoryCandidates: MemoryCandidateDto[];
  preferences: Record<string, unknown>;
};
```

Avoid returning backend-only knowledge signal evidence.

## 17.3 Journeys

- `GET /api/journeys`
- `POST /api/journeys/generate`
- `POST /api/journeys/:id/proposals`
- `POST /api/proposals/:id/accept`
- `POST /api/proposals/:id/reject`
- `POST /api/journeys/:id/archive`
- `POST /api/journeys/:id/finish`

`generate` creates a PENDING CREATE proposal/draft before activation unless generated from an explicitly confirmed onboarding flow. Prefer confirmation consistency.

## 17.4 Quests

- `POST /api/quests/:id/start`
- `POST /api/quests/:id/complete`
- `POST /api/quests/:id/skip`
- `PATCH /api/quests/:id/steps/:stepId`
- `PUT /api/quests/:id/note`

No generic endpoint may allow changing `xp_reward`, `status=COMPLETED`, `playerId`, or historical fields from arbitrary client JSON.

## 17.5 Knowledge

- `GET /api/knowledge`
- `GET /api/knowledge/domains/:id`

No public endpoint to directly set concept level.

Internal services update signals/progress after AI analysis/assessments.

## 17.6 Assessments

- `POST /api/assessments/generate`
- `POST /api/assessments/:id/answer`

Validate 200 KB max pasted text.

## 17.7 Companion

### `POST /api/companion/messages`

Input:

```json
{
  "conversationId": "...",
  "message": "..."
}
```

Response: streaming text/events.

Prefer a simple event framing that frontend can parse robustly, e.g. SSE-style events or newline-delimited JSON.

Useful event types:

- `message.delta`
- `message.done`
- `memory.candidate`
- `proposal.created`
- `error`

Do not let the browser parse hidden raw Gemini events directly. Normalize provider events on server.

### `POST /api/conversations/new`

Close/summarize current session and create new session.

## 17.8 Memories

- `POST /api/memories/:id/confirm`
- `POST /api/memories/:id/dismiss`

## 17.9 Progress/economy

- `GET /api/progress`
- `GET /api/achievements`
- `GET /api/milestones`
- `GET /api/inventory`
- `POST /api/inventory/:id/unlock` if store purchase is implemented in V1
- `POST /api/inventory/:id/equip`

If purchasing is included, Coin deduction + unlock must be transactional and idempotent.

## 17.10 Push

- `POST /api/push/subscribe`
- `DELETE /api/push/subscribe`

## 17.11 Cron

- `GET|POST /api/cron/daily-rollover`
- `GET|POST /api/cron/morning-reminder`

Secure using `CRON_SECRET`/Vercel-supported authorization.

## 17.12 Admin/debug

- `POST /api/admin/reset-demo`
- `GET /api/admin/debug-player?code=...` or safer internal identifier flow

Require:

```text
Authorization: Bearer <ADMIN_SECRET>
```

Never put `ADMIN_SECRET` in frontend.

No admin UI in MVP.

---

# 18. Frontend migration plan

## 18.1 Preserve UI

Do not redesign screens.

Minor UI additions allowed:

- Player Code display/copy modal for new player;
- Restore Player entry;
- Enter Demo action;
- AI loading/streaming states;
- Stop/Retry buttons;
- memory candidate confirmation card;
- notification permission control;
- avatar picker with 3 avatars;
- AI budget/error messaging.

## 18.2 Add `src/api-client.js`

Centralize all API calls.

Example responsibilities:

```js
getState()
createPlayer()
restorePlayer(code)
startQuest(id)
completeQuest(id)
skipQuest(id)
updateQuestStep(...)
acceptProposal(id)
rejectProposal(id)
streamCompanionMessage(...)
```

No direct `fetch()` scattered across page components unless unavoidable.

## 18.3 Replace localStorage as source of truth

Current behavior:

```text
hydrate(localStorage)
-> mutate client state
-> save(localStorage)
```

Target:

```text
GET /api/state
-> render client state

user action
-> API mutation
-> receive authoritative response or refetch state
-> render
```

LocalStorage may be used only for non-authoritative transient UI preferences if needed, not game state.

## 18.4 State update strategy

For MVP correctness, prefer:

- API mutation;
- then patch state from server response or refetch relevant aggregate.

Do not implement a complex normalized client cache.

## 18.5 Existing `state.js`

Do not delete immediately.

Refactor useful pure domain logic into server modules with tests.

Examples:

- roadmap generation from templates;
- schedule split logic;
- level formula;
- date helpers adapted to server timezone.

When backend equivalents are stable, remove obsolete client-authoritative mutation functions.

---

# 19. Suggested repository structure

```text
api/
  [...route].ts

server/
  app.ts
  config/
    env.ts
    ai-pricing.ts
    game-rules.ts

  db/
    client.ts
    schema.ts
    migrations/
    seed.ts

  middleware/
    session.ts
    admin.ts
    error-handler.ts
    ai-budget.ts

  routes/
    player.routes.ts
    state.routes.ts
    journey.routes.ts
    quest.routes.ts
    knowledge.routes.ts
    assessment.routes.ts
    companion.routes.ts
    memory.routes.ts
    progress.routes.ts
    inventory.routes.ts
    push.routes.ts
    cron.routes.ts
    admin.routes.ts

  domain/
    player/
    journey/
    quest/
    progression/
    knowledge/
    achievements/
    milestones/
    economy/

  services/
    state.service.ts
    roadmap.service.ts
    companion.service.ts
    assessment.service.ts
    conversation.service.ts
    notification.service.ts
    demo-reset.service.ts

  ai/
    provider.ts
    gemini.provider.ts
    orchestrator.ts
    context-builder.ts
    schemas.ts
    prompts/
      companion.ts
      roadmap.ts
      knowledge.ts
      assessment.ts
      summary.ts
      memory.ts

  repositories/
    player.repository.ts
    journey.repository.ts
    quest.repository.ts
    knowledge.repository.ts
    conversation.repository.ts
    progression.repository.ts

shared/
  catalog/
    tracks.mjs
    curriculum.mjs
    concepts.mjs

src/
  api-client.js
  app.js
  pages.js
  companion.js
  graph.js
  ui.js
  styles.css
  ...

public/ or assets/
  avatars/
  ...

tests/
  domain/
  api/
  ai/
  existing regression tests

vercel.json
package.json
drizzle.config.ts
.env.example
```

Exact naming may be adapted to repository constraints, but preserve separation of routes/services/domain/AI/DB.

---

# 20. Environment variables

Create `.env.example` with no secrets.

Required:

```dotenv
# Database
DATABASE_URL=

# Session / recovery
SESSION_SECRET=
PLAYER_CODE_PEPPER=

# AI
GEMINI_API_KEY=
AI_PRIMARY_MODEL=gemini-3.8-flash
AI_BACKGROUND_MODEL=gemini-3.5-flash-lite
GLOBAL_AI_WEEKLY_BUDGET_USD=2
PLAYER_AI_WEEKLY_TOKEN_LIMIT=250000
DEMO_AI_WEEKLY_TOKEN_LIMIT=500000

# Limits
MAX_PASTE_BYTES=204800
FULL_SESSION_RETENTION=5
SUMMARY_RETENTION=20

# Admin / cron
ADMIN_SECRET=
CRON_SECRET=

# Push
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
VAPID_SUBJECT=mailto:replace@example.com

# App
APP_BASE_URL=http://localhost:4173
APP_TIMEZONE=Asia/Ho_Chi_Minh
```

Production `APP_BASE_URL=https://lifeos.fluxlab.pro.vn`.

Do not commit real `.env` files.

---

# 21. Vercel configuration

Keep static frontend output under `dist/` if current build remains compatible.

Configure Vercel to:

- run `npm run build`;
- serve static output;
- keep `/api/*` routed to functions;
- run two daily cron endpoints;
- use Node.js runtime for API;
- expose only public VAPID key to frontend if needed.

Cron expressions are UTC.

Suggested:

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-rollover",
      "schedule": "0 17 * * *"
    },
    {
      "path": "/api/cron/morning-reminder",
      "schedule": "0 23 * * *"
    }
  ]
}
```

Treat schedule as approximate within Vercel Hobby timing precision. `ensureDailyState()` protects correctness.

---

# 22. Demo seed requirements

Seed script must be idempotent.

Seed:

## 22.1 Global catalog

- current repository domains/tracks;
- current repository concepts;
- curriculum/templates;
- achievement catalog;
- milestone catalog;
- inventory catalog.

## 22.2 Demo player Minh

Seed recognizable current UI state:

- `Minh` display name;
- role DEMO;
- active RAG journey;
- some completed chapters/quests;
- `Experiment with Embeddings on 5 Text Samples` in-progress or equivalent current visible quest;
- 250 XP baseline;
- representative Knowledge Tree levels;
- sample XP ledger;
- sample confirmed memories;
- one sample conversation/session;
- sample achievements;
- enough Coins/inventory to show cosmetics;
- 3 base avatar options.

The reset service should rebuild the demo profile to the exact deterministic seed state without affecting global catalogs.

## 22.3 New guest seed

New guest should not be completely empty.

Give:

- lightweight profile;
- seed global Knowledge Tree/catalog visible;
- very small sample data if needed for UI layout;
- Companion call-to-action to create first personalized journey.

Do not copy all Minh history into every new guest.

---

# 23. AI prompt safety/domain constraints

Prompts should encode these rules explicitly:

## 23.1 Companion

- Be a learning companion, not the authority over game progression.
- Do not claim XP/rank changes unless backend supplies them.
- Do not invent that roadmap changes are already applied.
- If suggesting a roadmap change, generate proposal data through orchestrator path.
- Follow user's language.
- Use current player context only.
- Avoid requesting unnecessary personal information.

## 23.2 Roadmap generator

- Use provided curriculum/template as foundation when relevant.
- Respect minutes/day.
- Prefer achievable sessions.
- Can create Arc layer when useful.
- Keep completed history untouched.
- Output strict structured JSON.
- No markdown-wrapped JSON.

## 23.3 Knowledge analyzer

- Assess the intellectual content of the current message/answer, not user identity.
- Emit signals, not final ranks/levels.
- Use confidence conservatively.
- Do not infer sensitive personal traits.
- Return empty signals when content does not support learning inference.

## 23.4 Memory extractor

Only propose durable memory that materially improves future learning context, such as:

- explicit learning goal;
- learning preference;
- durable schedule constraint;
- explicit background/experience;
- long-running project.

Do not store incidental/private details without clear relevance.

All proposed memories remain PENDING until confirmed.

---

# 24. Error handling

Use stable error codes.

Minimum set:

- `UNAUTHORIZED`
- `FORBIDDEN`
- `PLAYER_CODE_INVALID`
- `RATE_LIMITED`
- `VALIDATION_ERROR`
- `NOT_FOUND`
- `QUEST_ALREADY_COMPLETED`
- `QUEST_SKIPPED`
- `PROPOSAL_STALE`
- `PROPOSAL_NOT_PENDING`
- `IMMUTABLE_HISTORY`
- `AI_UNAVAILABLE`
- `AI_WEEKLY_BUDGET_EXHAUSTED`
- `AI_PLAYER_BUDGET_EXHAUSTED`
- `PAYLOAD_TOO_LARGE`
- `DATABASE_ERROR`

Do not expose stack traces to production client.

Frontend should show human-readable messages without destroying current page state.

---

# 25. Security requirements

1. No secrets in frontend bundle.
2. Session cookie HttpOnly/Secure/SameSite.
3. Player Code stored as keyed digest, not plaintext.
4. Restore endpoint rate-limited.
5. Admin endpoints require server-side bearer secret.
6. Cron endpoints require secret/verified cron authorization.
7. All player resource queries scoped by session player ID.
8. Never trust `playerId` in request body.
9. Validate all body/query params with Zod.
10. Enforce max text size server-side.
11. Do not execute pasted code.
12. Sanitize/escape rendered user/AI text in existing UI using existing escaping helpers.
13. Do not render AI output as unrestricted HTML.
14. Do not allow AI-generated SQL/commands to execute.
15. Database writes from AI must pass deterministic validators/domain services.
16. Use transactions for XP, Coins, inventory purchases/unlocks, proposal application, and demo reset where applicable.

---

# 26. Testing requirements

Do not consider a phase complete until relevant tests pass.

Keep existing regression tests where possible.

Add tests in these groups.

## 26.1 Quest/progression unit tests

Required:

- quest completion awards XP exactly once;
- second completion is idempotent;
- daily XP cap of 120;
- completion still succeeds at cap;
- level formula;
- skipped quest gives zero XP;
- skipped quest does not count for streak;
- first completion today starts/increments streak correctly;
- second quest same day does not increment streak again;
- missed day resets streak;
- timezone boundary uses Vietnam date.

## 26.2 Roadmap tests

- no arbitrary active-journey limit;
- proposal does not mutate journey before Accept;
- stale proposal returns conflict;
- accepted proposal increments version;
- completed quest cannot be deleted/replaced;
- future chapter can be reordered;
- pacing split preserves total XP;
- completed content remains unchanged.

## 26.3 Knowledge tests

- level never decreases;
- one signal cannot create MASTERED;
- mastery requires multi-session application evidence;
- duplicate concept normalization;
- dynamic concept added to existing domain when appropriate;
- dynamic domain can be created;
- rank deterministic;
- AI-provided final rank/level is ignored.

## 26.4 Identity tests

- create player returns code once;
- raw code not stored;
- restore with valid code works;
- invalid code fails;
- normalized separators/case behave as intended;
- one player cannot query another player's resources.

## 26.5 AI budget tests

- per-player weekly token cap;
- global weekly $2 cost cap;
- budget exhaustion does not break non-AI APIs;
- background analyzer failure does not fail successful chat response.

## 26.6 Conversation retention tests

- newest 5 sessions keep messages;
- older session summarized before message deletion;
- no more than 20 summaries retained;
- confirmed memory included in context;
- pending/dismissed memory excluded.

## 26.7 Achievement/inventory tests

- achievement unlock idempotent;
- milestone unlock idempotent;
- Coins awarded once;
- inventory item cannot be double-purchased/unlocked incorrectly;
- equipped item belongs to player inventory.

## 26.8 API integration tests

At minimum test:

- `POST /api/player`
- `POST /api/player/restore`
- `GET /api/state`
- quest start/complete/skip
- proposal accept conflict
- assessment text-size validation
- memory confirm
- AI budget error behavior
- demo reset authorization.

---

# 27. Acceptance criteria by phase

Codex must implement in phases and keep the app runnable after each phase.

## Phase 0 — Baseline and safety

Tasks:

- run existing tests;
- document current behavior;
- add dependencies/tooling without breaking static UI;
- add `.env.example`;
- set up TypeScript server folder;
- set up Hono entry point;
- no behavior migration yet.

Acceptance:

- existing UI still builds/runs;
- existing tests still pass.

## Phase 1 — Database + schema + seed

Tasks:

- Drizzle schema;
- migrations;
- Neon connection;
- seed global catalog;
- seed Minh demo;
- seed achievements/milestones/inventory.

Acceptance:

- migration from empty DB succeeds;
- seed can run twice safely;
- demo state query returns expected baseline.

## Phase 2 — Player session + restore

Tasks:

- guest creation;
- Player Code generation/digest;
- session cookie;
- restore flow;
- demo session;
- restore rate limit.

Acceptance:

- two browsers create separate players;
- code restores same player;
- no raw code in DB;
- demo profile accessible.

## Phase 3 — `/api/state` and frontend source-of-truth migration

Tasks:

- aggregate state service;
- `GET /api/state`;
- `src/api-client.js`;
- initial bootstrap from backend;
- localStorage no longer authoritative.

Acceptance:

- refresh preserves server data;
- second browser restored with code sees same state;
- UI visually remains equivalent.

This is the first major milestone.

## Phase 4 — Quest + XP + streak

Tasks:

- quest start;
- steps;
- notes;
- complete;
- skip;
- XP ledger;
- daily XP cap;
- streak;
- request-time daily guard.

Acceptance:

- server-authoritative quest flow works end-to-end;
- DevTools cannot directly award XP;
- all progression tests pass.

## Phase 5 — Journey persistence + proposals/versioning

Tasks:

- journey CRUD needed by product;
- no 3-journey limit;
- archive/finish;
- proposal preview/accept/reject;
- revisions;
- schedule splitting.

Acceptance:

- current roadmap UI reads server journey;
- completed history survives proposals;
- stale proposal safely rejected.

At the end of Phase 5 the app is no longer a mock game even without AI.

## Phase 6 — Knowledge persistence + dynamic graph

Tasks:

- seed domains/concepts;
- concept progress;
- knowledge signals;
- deterministic level engine;
- domain rank formula;
- dynamic domain/concept storage;
- adapt graph UI for dynamic nodes/branches.

Acceptance:

- existing graph renders seed + dynamic branches;
- no evidence panel is required;
- rank differs from XP level.

## Phase 7 — Gemini provider + Companion streaming

Tasks:

- AIProvider;
- GeminiProvider;
- model routing;
- context builder;
- streaming endpoint;
- Stop + Retry;
- ai_usage recording;
- initial budget middleware.

Acceptance:

- real Companion streams response;
- abort does not save partial assistant response;
- AI failure leaves app usable.

## Phase 8 — Learning Analyzer + memory candidates

Tasks:

- gating heuristic;
- structured analyzer;
- concept resolution;
- signal persistence;
- knowledge promotion;
- pending memory card;
- confirm/dismiss.

Acceptance:

- meaningful chat can increase knowledge deterministically;
- trivial chat does not;
- memory not persisted until confirmed.

## Phase 9 — AI roadmap generation/adaptation

Tasks:

- onboarding questions;
- template-grounded roadmap generator;
- AI proposal generation;
- validation;
- preview integration.

Acceptance:

- player can ask to learn a new subject;
- AI asks goal/background/time as needed;
- roadmap is previewed;
- Accept creates/applies journey;
- Reject leaves state unchanged.

## Phase 10 — Assessments

Tasks:

- AI quiz variation;
- grading/explanation;
- written feedback;
- code-review feedback;
- 200 KB limit;
- signals to Knowledge Engine.

Acceptance:

- assessment does not block manual quest completion;
- no code executes;
- knowledge can progress from assessment signals.

## Phase 11 — Conversation summaries/retention

Tasks:

- New conversation;
- inactivity handling;
- summary generation;
- retention cleanup;
- relevant summary retrieval.

Acceptance:

- 5 full sessions max;
- 20 summaries max;
- AI context no longer grows unbounded.

## Phase 12 — Achievements, milestones, Coins, inventory, avatar

Tasks:

- rule catalog;
- unlock engine;
- Coins;
- inventory;
- 3 avatars;
- basic avatar/frame/title UI.

Acceptance:

- unlocks idempotent;
- cosmetics do not affect XP/Knowledge;
- demo profile visibly demonstrates feature.

## Phase 13 — Push + cron

Tasks:

- service worker;
- push subscription;
- daily rollover cron;
- morning reminder cron;
- duplicate prevention.

Acceptance:

- permission denial is graceful;
- reminder sent at most once/day/player;
- no reminder if a quest was already completed that day;
- delayed cron does not corrupt XP/streak.

## Phase 14 — Budget hardening + admin/debug

Tasks:

- $2 global weekly budget;
- per-player tokens;
- short-term AI rate limit;
- admin bearer middleware;
- reset demo;
- debug player endpoint.

Acceptance:

- AI stops cleanly at cap;
- core game remains functional;
- admin secret never exposed client-side.

## Phase 15 — Production deployment

Tasks:

- configure Neon dev/prod;
- Vercel env vars;
- GitHub deployment;
- custom domain;
- production seed;
- smoke test.

Acceptance:

- `https://lifeos.fluxlab.pro.vn` loads;
- production DB is not dev DB;
- demo account reset works;
- player restore works across browsers;
- Companion works within budget;
- no client console secrets/errors.

---

# 28. Definition of Done

The product is considered implemented when all of the following are true:

1. `lifeos.fluxlab.pro.vn` is deployed on Vercel.
2. A new browser gets its own guest player and Player Code.
3. Player Code restores the same data on another browser.
4. Demo profile `Minh` is available and resettable.
5. localStorage is no longer game-state source of truth.
6. Quest state persists in PostgreSQL.
7. XP is server-authoritative and capped at 120/day.
8. Level remains 1 + floor(XP/100).
9. Streak is server-authoritative and resets after a missed day.
10. Unlimited journeys are supported.
11. Completed journey/quest history cannot be removed by normal user/AI actions.
12. Roadmap proposals require confirmation.
13. Knowledge Tree persists and can grow dynamically.
14. Knowledge never automatically decreases.
15. Mastery requires multiple strong signals across sessions.
16. Domain Rank is deterministic and separate from Character Level.
17. Gemini Companion streams real responses.
18. AI provider can be swapped without rewriting game/domain code.
19. AI can produce template-grounded roadmap proposals.
20. Quiz, written, and code-review assessments work without code execution.
21. Chat context is bounded by summaries/retrieval.
22. 5 newest sessions keep full history and up to 20 summaries remain.
23. Persistent memory requires user confirmation.
24. Achievements/milestones are rule-based.
25. Coins and inventory work.
26. At least 3 avatars exist.
27. Web Push subscription works when permission is granted.
28. Daily cron endpoints exist and are secured.
29. Global weekly AI budget defaults to $2.
30. AI budget exhaustion does not disable core gameplay.
31. Preview deployments do not use production DB.
32. Tests for all mandatory domain invariants pass.
33. `npm run build` and `npm test` pass before production deploy.

---

# 29. Coding-agent execution instructions

When Codex begins implementation, follow this working style:

1. Read this file completely.
2. Inspect the existing repo and map each current state field/UI action to the new domain/API.
3. Do not rewrite UI first.
4. Create a checklist for Phases 0-15.
5. Work on one phase at a time.
6. At each phase:
   - implement;
   - add/update tests;
   - run tests;
   - run build;
   - summarize changed files and remaining risks.
7. Do not move to AI features until database, identity, `/api/state`, quest, and journey persistence work.
8. Avoid large mechanical rewrites when an adapter layer can preserve existing UI.
9. For every mutation, ask: "Can a malicious browser use this endpoint to directly change XP/rank/Coins/knowledge?" If yes, redesign it.
10. For every AI output, ask: "Does a deterministic validator/domain service approve this before DB write?" If no, add one.
11. For every roadmap mutation, ask: "Can this alter completed history?" If yes, reject it.
12. Keep commits/changes logically scoped by phase.

---

# 30. First implementation task for Codex

Start with **Phase 0 + Phase 1 only**.

Concrete first task:

> Analyze the current repository against `LifeOS_Codex_Implementation_Spec.md`. Preserve the existing Vanilla JS UI. Add TypeScript backend scaffolding, Hono, Zod, Drizzle ORM, Neon serverless driver, Drizzle Kit, environment validation, PostgreSQL schema/migrations, shared catalog migration strategy, and an idempotent seed that creates the global catalog and deterministic `Minh` demo profile. Do not yet replace localStorage or implement Gemini. Keep all existing tests/build working and add database/domain tests appropriate to Phase 1. At the end, report schema decisions, changed files, commands to run migrations/seed/tests, and any spec conflicts discovered.

Do not skip directly to Companion/AI implementation.

---

# 31. Verified platform assumptions at design lock

These assumptions were verified when this spec was written and should still be checked by Codex if platform behavior appears different during implementation:

- Gemini API JavaScript SDK is `@google/genai`.
- `gemini-3.8-flash` is a current stable Flash model suitable for primary tasks.
- `gemini-3.5-flash-lite` is the intended lower-cost background model.
- Gemini supports streaming responses and structured outputs.
- Vercel Node.js Functions support streaming responses.
- Vercel Hobby cron is appropriate for daily jobs but should not be treated as exact-to-the-minute scheduling; request-time date guards remain necessary.
- Neon serverless driver can be used with Drizzle ORM in serverless environments.

Keep provider/model names and pricing configurable so future changes do not require domain refactors.

---

# 32. Final product priorities

When trade-offs are necessary, optimize in this order:

1. **Demo quality / visual continuity**
2. **AI usefulness/intelligence**
3. **Speed to complete**
4. **Reasonable production extensibility**

Do not sacrifice data correctness/security invariants for demo polish, but do prefer simple implementations over elaborate future-proof abstractions.

---

**End of Specification**
