# LifeOS UX Clarity Redesign

Date: 2026-10-02
Status: Draft for user review

## Purpose

Reduce the feeling of clutter and make the next useful action obvious. The redesign is for the existing desktop-first LifeOS Skill Intelligence experience. It keeps the interface in English, preserves the current light visual system, and reorganizes existing features without changing their underlying behavior or data.

## Agreed direction

Use three primary destinations:

1. **Today** — the learner's home and single next action.
2. **Learning Path** — the campaign roadmap, quests, completed milestones, and learning resources.
3. **Skills** — the knowledge graph, searchable skill list, evidence, and career skill summary.

The user selected this direction on 2026-10-02. Resources become a secondary view within Learning Path instead of a separate top-level destination.

## Current usability problems

- Four peer navigation items make it unclear whether a learner should open Career Campaign or Learning Hub.
- Today presents multiple calls to action with similar visual weight.
- Career Campaign repeats related information across history, arcs, next quests, adaptive roadmap, and skill passport sections.
- Readiness, coverage, confidence, evidence, and mastery are all visible together without a clear order of importance.
- New learners and returning learners need different first actions, but the page structure does not make the distinction strong enough.

## Information architecture

### Today

Purpose: answer “What should I do next?”

- For a new learner, show the selected goal or a clear empty state and one primary action to create a plan.
- For a learner with an active path, feature exactly one recommended quest as the primary action.
- Keep target role and overall readiness as supporting context, not competing cards.
- Show no more than three priority skill gaps in the first screenful. Link to Skills for the full view.
- Keep the plan-changing action available but visually secondary to the next quest.

### Learning Path

Purpose: show the active plan from current step through later stages.

- Present the goal, daily time budget, and progress together in a compact summary.
- Show one vertical sequence of roadmap stages. Make the current stage and its available quests visually distinct.
- Keep completed stages collapsed by default with an explicit way to expand them.
- Keep future locked stages visible as context, but visually quiet.
- Place resources in a secondary tab or section on this page. Resource recommendations should name the skill or current stage they support.
- Put the Boss Quest and completed history in a clearly labeled “Milestones” section after the active path.
- Remove duplicate quest lists. Each quest should have one canonical card and one obvious action.

### Skills

Purpose: answer “What do I know, and what evidence supports it?”

- Start with a compact career skill summary and explain readiness in plain language.
- Make the connected graph the main visual, with search and a small set of useful filters.
- Keep the accessible list alternative available beside or below the graph.
- Open one consistent detail panel for a selected skill, showing mastery, confidence, evidence, and freshness in that order.
- Move secondary explanations and illustrative calculations into expandable detail rather than showing every metric at once.

## Shared interaction rules

- Keep exactly one visually primary action per page.
- Use the same status words and colors across Today, Learning Path, and Skills.
- Explain specialist terms on first use in plain language or a short tooltip. Prioritize “readiness,” “coverage,” “evidence,” and “freshness.”
- Preserve visible focus, keyboard access, and a clear return path from skill details and quest dialogs.
- Retain existing route compatibility: `#today` remains Today; `#roadmap` and `#learning` open Learning Path; `#knowledge` opens Skills. Old companion and progress routes should land on the closest relevant page rather than a blank view.
- Do not change the learner's saved progress when reorganizing views.

## Visual direction

- Keep the existing V2 bright desktop system: white cards on a soft cool background, dark ink text, blue primary actions, and restrained teal/purple accents.
- Use spacing and typography to establish clear page, section, and card hierarchy. Reduce nested card borders and repeated eyebrow labels.
- Use color for status meaning, not decoration. Secondary and locked content should have lower contrast while remaining readable.
- Keep the desktop layout as the validation target. Existing responsive behavior may remain, but mobile-specific redesign is outside this scope.

## Scope boundaries

Included: sidebar labels and route mapping; Today, Learning Path, and Skills page layouts; section hierarchy; repeated content removal; labels and helper text; primary/secondary action hierarchy; responsive behavior needed to avoid breaking existing desktop structure.

Not included: backend/API changes, AI planner integration, account or persistence changes, new learning features, changing mock data, changing the visual brand, or implementing a mobile-specific experience.

## Acceptance criteria

- A first-time learner can identify the planning action without scanning multiple competing buttons.
- A returning learner can identify the next quest and open it directly from Today.
- Roadmap stages, quests, resources, and milestones have distinct locations within Learning Path, with no duplicate quest lists.
- A learner can find a skill in the graph or list and understand its status and evidence from one detail view.
- Navigation labels match the destination and legacy URL hashes resolve consistently.
- Existing quest completion, planner, career selection, skill detail, and resource interactions remain available.
- The interface remains English and follows the existing V2 visual direction.
- `pnpm build` completes successfully after implementation. No claim is made about browser checks that are not run.

## Self-review

- The three destinations have separate jobs: immediate action, planned learning, and skill understanding.
- Resources are nested under Learning Path because they support the active learning sequence; they are not removed.
- “Progress” is represented through campaign milestones and skill evidence, avoiding a fourth dashboard of repeated metrics.
- Existing routes are mapped to the new destinations so saved links remain useful.
- Scope excludes the AI planner/backend so this UX pass can reduce clutter without changing product logic.
