# LifeOS Project State

## Product

LifeOS is a multi-domain career-development game that helps a learner understand current skills, see gaps, and choose the next useful action.

## Current branch

`feature/skill-intelligence-v2`

## Current milestone

Frontend V2 demo alignment. The demo is deterministic and runs without Gemini, a database, backend V2, or internet access.

## Core loop

Career goal → current skill state → skill gap → best next action → quest or assessment → evidence → updated skill state.

## Primary views

Today, My Knowledge, Career Campaign, Learning Hub.

## Demo careers

Backend Developer (canonical deep path), UX Researcher, Product Marketing Manager.

## Canonical scenario

Minh starts as a Backend Developer with 58% readiness, 72% evidence coverage, and Authentication, Testing, and Docker gaps. The happy path is Authentication Skill Check → Implement JWT Authentication Applied Trial → Secure a REST API Boss Quest.

## Important files

- `src/skill-intelligence.js`: immutable deterministic demo state and transitions.
- `src/skill-pages.js`: four V2 page renderers and dialogs.
- `src/app.js`: shell, route handling, delegated actions, and local demo transitions.
- `src/styles.css`: desktop visual system and graph presentation.
- `src/graph.js`: existing pan/zoom graph engine retained for internal compatibility.

## Demo-only behavior

Skill Check, Applied Trial, Recall Quest, Boss Quest, BKT explanation, recommendation updates, and Reset Demo are simulated locally. They do not award XP, persist evidence, or call a production API.

## Backend status

Backend V1 remains frozen and is not part of this frontend milestone. Backend V2, BKT persistence, evidence ledger, production scoring, recommendation ML, and provider APIs are deferred.

## Known limitations

Course links are placeholders, evidence text is not persisted, and mobile is usable but desktop is the competition-demo target.

## Forbidden legacy direction

Do not reintroduce Grimoire/fantasy presentation, visible XP economy, inventory, pets, guilds, PvP, or a standalone chatbot-first product surface.

## Next milestone

Review the four-screen demo with stakeholders, then derive Backend V2 contracts from observed UI reads, actions, evidence, and state transitions.
