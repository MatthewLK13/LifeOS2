# LifeOS React Academic Quest Demo

Date: 2026-10-02  
Status: Implementation brief approved by the user in chat

## User intent

Replace the current confusing mixed frontend with a desktop-first React demo that makes academic learning paths and quest contents easy to inspect. The user explicitly asked to use React, to exclude non-academic fields such as badminton, and clarified that a quest is a learning package containing Learn and Practice followed by an Assessment or a Project; these are not four separate quests.

## Product shape

- Keep the primary destinations Today, Learning Path, and Skills.
- Keep the existing light LifeOS visual direction and English UI.
- Keep academic catalog branches separate rather than hiding them inside broad groups.
- Retain 17 current academic tracks: Python, DSA, Java, Object-Oriented Design, RAG Engineering, JavaScript, AI Fundamentals, Electronics, ESP32, Sensors & Circuits, Internet of Things, Xiaozhi Assistant, Psychology, Critical Thinking, Communication, English, and IELTS Academic.
- Exclude Badminton, Physical Fitness, and Habits & Motivation from the learner-facing demo catalog.
- Provide one authored demo quest package per academic track. One complete package per branch demonstrates the flow without authoring a full production curriculum.

## Quest content contract

Every quest contains:

1. `learn`: a focused concept explanation and a concrete example.
2. `practice`: a domain-specific scenario with actionable steps.
3. `outcome`: exactly one of `assessment` or `project`, with an instruction, learner output, and visible self-check criteria.

The assessment is a learner self-check, not an AI score. A project asks for a small artifact, prototype, plan, or explanation appropriate to the field. Each record also has an id, academic track id, title, estimated minutes, and relevant concept or chapter. The experience must never describe demo completion as Gemini evaluation.

Generated Gemini quests use the same content contract. The existing Gemini route, proposal approval lifecycle, quest persistence, and account API remain authoritative. Store the structured package in the existing quest metadata JSON; do not add a database migration unless the current JSON path proves insufficient.

## Interaction design

- Quest cards show title, field, duration, and whether the ending is an assessment or project.
- Selecting a card opens an accessible animated dialog with Learn, Practice, and the final Assessment/Project sections.
- Keep secondary help, examples, and rubric details collapsible so the roadmap stays scannable.
- Provide controls to choose among the 17 academic fields and distinguish sample quests from an accepted Gemini roadmap.
- Expose Gemini roadmap creation from Learning Path. Keep the current prompt-and-answer chat flow, display the complete chapter and quest package preview, and require explicit accept or reject.
- After acceptance, display the server-backed journey and its saved quest content. If the Gemini service/account is unavailable, show the local authored demo and explain the limitation.
- Respect keyboard focus, dialog return focus, and `prefers-reduced-motion`.

## Technical design

- Migrate the active visible frontend to React; retain the existing server, API client, deterministic skill engine, and catalog as service/data modules.
- Use Vite to bundle JSX into the existing static `dist/` deployment. Keep Vercel API rewrites and backend routes intact.
- Use Motion for restrained page, dialog, accordion, and card layout transitions. Animation must not convey learning correctness or readiness.
- The React tree owns route, selected field, quest dialog, chat flow, server/local mode, and relevant quest view state. Keep existing hash routes compatible.
- Do not add mobile-first work; maintain basic usable responsive fallback.

## Out of scope

- Removing or rewriting backend/API/auth/database systems.
- Adding an AI assessment scorer, executing learner code, certification claims, or production curriculum coverage.
- Replacing the visual brand or rewriting unrelated server/admin pages.

## Acceptance criteria

- The visible shell and three primary destinations are React-rendered.
- Only academic fields listed above appear as demo learning fields.
- Each field has one specific demo quest with Learn + Practice + exactly one Assessment or Project outcome.
- Quest content is available in an accessible modal; secondary material can be collapsed.
- Gemini preview exposes its generated Learn/Practice/outcome content before acceptance.
- Accepting a Gemini proposal displays the server-backed roadmap and its quest contents; rejecting leaves current data unchanged.
- Legacy `#today`, `#learning`, `#learning-resources`, `#roadmap`, `#knowledge`, and `#companion` hashes reach useful destinations.
- Production static build works with the existing `/api` rewrite contract.
- `pnpm build` succeeds. Automated tests are not added or run per the user's standing instruction; browser review is used for the demo flow.
