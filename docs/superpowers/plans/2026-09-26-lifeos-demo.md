# LifeOS Demo Implementation Plan

Goal: English Grimoire demo with five knowledge branches and simulated chat-to-roadmap creation.
Spec: docs/superpowers/specs/2026-09-26-lifeos-demo-design.md plus user-approved scope: Python, DSA, Java, OOP, RAG; simulated chatbot, no live AI.
Execution: inline in the existing non-Git workspace.
Architecture: dependency-free browser ES modules, CSS, SVG graphs, versioned localStorage; Node static server and native test runner. This minimizes setup and allows offline presentation without installation.

## Constraints
English product text; local assets; V5 business rules take precedence over older mockups. No exams, Stamina, XP-derived rank or live-AI claims. Retain the supplied parchment aesthetic.

## Tasks
- [x] 1. Fixtures and state: five tracks, concept evidence, roadmap generation from chosen track/background/time, quest completion and persistence. Tests cover duplicate rewards, daily cap, generated-plan activation, preserved history and corrupt saves.
- [x] 2. App shell and Today: English navigation, hero, domain cards, linked quests, quest detail dialog, consistent XP; responsive CSS.
- [x] 3. Knowledge and Roadmap: data-driven SVG edges, accessible interactive HTML nodes, drag/zoom/fit, search and list view, evidence drawer, chapter details and plan proposals.
- [x] 4. Companion and settings: scripted conversation collecting goal, experience and available minutes, preview and explicit journey activation; memory controls, consent, progress and reset.
- [x] 5. Verify state tests and desktop browser flow; fresh independent review; document launch and demo walkthrough.

## Review focus
Chat input outside supported topics has honest fallback. User text is escaped. Invalid storage recovers. Repeated clicks cannot duplicate XP or journeys. Roadmap activation must not erase previous XP/history or silently activate before confirmation.
