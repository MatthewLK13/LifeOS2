# Decisions

- User approved an English interactive demo using five branches: Python, DSA, Java, OOP and RAG.
- Chatbot is deterministic simulation, clearly labeled; no LLM keys or backend business service.
- Use browser ES modules, CSS and SVG rather than React/TypeScript: workspace has no package manager/project dependencies, and demo benefits from a zero-install Node launch. UI/state separation preserves maintainability. Cost: no static type checker; real state tests and browser checks compensate.
- SVG edges plus HTML node controls provide the reference look, keyboard access and dynamic graphs without a graph-library download.
- Existing folder is not a Git repository; work directly here, without initializing Git or creating a worktree.
- Domain ranks are illustrative observations, never calculated from activity XP. Unsupported advanced functions are not advertised.

## Phase 0–1 backend — 2026-09-28

- Preserve the English desktop demo and its localStorage gameplay. The initial implementation stops at backend/schema/catalog/seed foundations as required by the spec's first-task section.
- Keep a single ESM catalog as the source of truth for browser and backend data; generated browser builds copy it to `dist/shared/catalog`.
- Use Drizzle/PostgreSQL for the canonical schema and a guarded Neon connection for later development-branch setup. Use PGlite to verify migration, seed and transactional constraints offline.
- Keep the API server on `API_PORT` (4174 by default), separate from the static demo `PORT` (4173 by default).
- Do not execute a remote migration or seed until a dedicated development Neon host is configured and validated.
- Phase 2 adds backend identity routes, but keeps the browser on localStorage until the aggregate-state API is ready in Phase 3. Restore throttling is PostgreSQL-backed and stores only a keyed IP digest.
