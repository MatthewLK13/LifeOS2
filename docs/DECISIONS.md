# Decisions

- User approved an English interactive demo using five branches: Python, DSA, Java, OOP and RAG.
- Chatbot is deterministic simulation, clearly labeled; no LLM keys or backend business service.
- Use browser ES modules, CSS and SVG rather than React/TypeScript: workspace has no package manager/project dependencies, and demo benefits from a zero-install Node launch. UI/state separation preserves maintainability. Cost: no static type checker; real state tests and browser checks compensate.
- SVG edges plus HTML node controls provide the reference look, keyboard access and dynamic graphs without a graph-library download.
- Existing folder is not a Git repository; work directly here, without initializing Git or creating a worktree.
- Domain ranks are illustrative observations, never calculated from activity XP. Unsupported advanced functions are not advertised.
