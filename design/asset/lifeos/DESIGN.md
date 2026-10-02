# LifeOS V2 Frontend Design

## Product direction

LifeOS is a desktop career-development game. The interface helps a learner understand their current skills, choose a next action, and collect visible evidence through short practice activities. The demo uses deterministic local data so every presentation follows the same path.

## Primary navigation

The shell exposes four views only:

- **Today** — readiness, evidence coverage, critical gaps, and three next actions.
- **My Knowledge** — the connected skill graph, semantic relationships, and skill detail.
- **Career Campaign** — completed learning history, adaptive arcs, and the Boss Quest.
- **Learning Hub** — free learning resources, practice activities, and recall prompts.

Legacy routes redirect to Today. There is no fantasy vocabulary, inventory, rank, or visible XP economy in the V2 demo.

## Visual language

- Bright desktop-first surface: `#F8FAFC` page background, white cards, and `#F2F6FC` secondary panels.
- Ink: `#1F2A44`; muted text: `#667085`.
- Primary blue: `#4F7DF3`; supporting teal: `#2CB5A0`; supporting purple: `#8B7CF6`.
- Use Be Vietnam Pro when available, with a system sans-serif fallback.
- Cards use 14–18px rounded corners and soft shadows. Avoid black borders, parchment textures, and hard offset shadows.
- Status colors communicate mastery and evidence state without implying a payment or reward system.

## Interaction patterns

The Today recommendation opens one of three deterministic demos: Skill Check, Applied Trial, or Boss Quest. Completing a demo updates the local skill profile and returns the learner to the same view with a clear toast. Recall updates freshness only. “How is this estimated?” opens a simulated BKT explanation modal; it does not calculate a production probability.

## Graph and detail

The Knowledge view renders concepts as connected nodes with semantic edges such as prerequisite, enables, and related. Selecting a node opens a detail modal with mastery, confidence, evidence coverage, and a freshness-only Recall action. Private conversation text is never shown in the graph.

## Presentation data

The canonical demo persona is Minh. Backend Developer is the primary role, with UX Researcher and Product Marketing Manager available as alternative careers. All values are mock data and are intentionally stable for screenshots and demos.
