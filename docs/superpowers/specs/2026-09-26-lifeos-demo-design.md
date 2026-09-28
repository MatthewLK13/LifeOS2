# LifeOS Interactive Demo Design

Date: 2026-09-26
Status: Implemented demo; scope approved in conversation. Later user decisions supersede initial technology and mobile assumptions.

## Outcome
Deliver an English interactive web demo for a presentation, closely matching the supplied parchment Grimoire screens in design/asset. Prioritize a reliable presentation flow and visual fidelity. This is a frontend demonstration with labeled fixtures, not acceptance of the full production release A.

## Visual direction
Use design/asset/lifeos/DESIGN.md and the supplied individual screen references: parchment #F1E9D2, raised paper #F6F0DE, ink #2A2419, cinnabar #B23A1F, dark cover navigation, crisp offset shadows and book ornaments. Reuse the supplied local crest, avatar and library illustration. Preserve English navigation and screen titles: Today, My Knowledge, Roadmap, Companion, Progress, Settings. Match desktop composition. Basic responsive styles are retained; mobile is excluded from verification at the user’s request. Bundle assets required for presentation; keep readable font fallbacks.

## Screens and interactions
1. Today: seeded Minh profile, active RAG goal, daily time allocation, three quests, character level and XP. Continue Quest opens its detail. Completed quests remain visible.
2. Quest detail: guidance, sample learning resources, checklist, start and self-confirm completion. Completing a quest awards its XP once, updates Today and Progress, and persists across reloads. Checklist completion is an aid, not an examination or a rank gate.
3. My Knowledge: an actual interactive concept graph and accessible list alternative. Select a concept to inspect status, scope, observation date and labeled example evidence. Search and status filters distinguish self-reported, exploring and observed concepts. Correct or exclude sample evidence without increasing rank.
4. Roadmap: chapter graph and chapter details for the RAG goal, current plan version and progress. A sample proposal shows old/new time allocation, affected future tasks and expected schedule before Apply Changes. Keep Current Plan cancels it. In-progress and completed quests retain their history.
5. Companion: seeded conversation, prompt suggestions and deterministic sample responses for embeddings, learning help and reduced availability. Label responses as demo simulation. Unsupported prompts receive an honest demo fallback. A schedule request opens the roadmap proposal rather than silently applying it.
6. Progress: XP ledger, character level, achievements and separate domain ranks with sample evidence. Quest completion changes activity XP, not domain rank.
7. Settings: toggle optional streak display and observation consent, inspect/edit/delete sample memories, and reset all demo state behind a confirmation. Explain local browser persistence.

## Presentation flow
Today -> Continue Quest -> complete practice -> see XP update -> My Knowledge -> inspect embeddings evidence -> Companion -> request 30 minutes/day -> preview Roadmap changes -> apply -> inspect updated plan and Progress. Reset returns the same initial fixture for repeat demonstrations.

## Data and architecture
A client-side application with modular screen components, a single shared state store and versioned localStorage persistence. Seed a coherent Minh/RAG scenario across all screens. Separate fixtures, state transitions, graph rendering, UI components and styles. Use dependency-free browser ES modules, CSS and SVG with a Node static server; no database or API key is required for this demo. Record this reduced demo architecture in docs/DECISIONS.md.

State includes profile, quests, XP entries, concept observations, roadmap version/proposal, conversation, memories and preferences. Use stable fixture IDs. Validate persisted state enough to recover safely from invalid or old data. If browser storage is unavailable, continue in memory and display a persistence notice. Treat entered chat and memory text as plain text.

## Business constraints
Follow V5 where mockups conflict: no Stamina/mana resource, graded quiz, leaderboard or XP-based rank. Character level = 1 + floor(total XP / 100). Each quest awards its allocated XP at most once; daily XP cap is 120. Never claim that sample AI responses assessed the actual user. Domain ranks and concept evidence remain clearly labeled fixtures. Local deletion removes the selected sample memory from subsequent simulated context.

## Out of scope
Real authentication, server/database, real LLM/RAG, background observation jobs, multi-device sync, admin operations, public hosting, payments and release B/C features. No production privacy/security claims.

## Verification and delivery
Test the meaningful state transitions: duplicate quest completion, XP cap/level calculation, proposal apply/cancel, reset, persistence recovery and consent/memory changes. Check the complete presentation flow in a desktop browser, English labels, asset loading, keyboard focus and graph/list navigation. Deliver runnable source, start/build commands, README, demo script and an explicit list of simulated capabilities and any remaining issues. Do not claim unperformed browser checks passed.

## Approved scope additions
Five domains: Python, Data Structures & Algorithms, Java, OOP, RAG & AI. Scripted chat creates a new roadmap from domain, background and daily minutes, shows a preview, and starts it only after user confirmation. See README.md and docs/VERIFICATION.md for delivered behavior and explicit demo limitations.
