# Group: Student Life

##  Members:

| STT | Fullname |
| :---: | :--- |
| 1 | **Lương Minh Khôi** |
| 2 | **Võ Nguyễn Nhật Nam** |
| 3 | **Hồ Mạnh Danh** |
| 4 | **Trần Minh Quang** |
| 5 | **Trần Quốc Tuấn** |

# LifeOS Grimoire — Interactive Demo

An English desktop learning demo based on the supplied parchment Grimoire designs. Includes Python, Data Structures & Algorithms, Java, Object-Oriented Programming, JavaScript, AI Fundamentals, and RAG Engineering.

## Start

Requires Node.js 20 or newer. No package installation, database, API key, or network connection is needed for the app itself.

```powershell
cd D:\nam4\aicourse\lifeos2
node server.mjs
```

Open **http://localhost:4173** in your desktop browser. Stop the server with Ctrl+C. If the port is occupied, set `$env:PORT = '4174'` before starting it.

If `node` is not on your Windows PATH, the runtime available in this workspace is:

```powershell
& 'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' server.mjs
```

## What works

- Today: sample RAG journey, daily quests, rest day, XP, character level, seven learning domains.
- Companion: scripted conversation collects domain, background and daily minutes; builds a roadmap preview; activates only after confirmation.
- Roadmap: clickable chapter graph and list, activity details, multiple journey selector, preview/apply/cancel pacing changes, finish a journey.
- My Knowledge: 248 concepts, seven branches, SVG connections, node selection, zoom/fit, drag, search, status filter, list view and sample evidence.
- Quest details: start, checklist, notes, external resource, self-confirm completion; rewards are idempotent and capped at 120 XP/day.
- Progress: activity ledger, level, sample domain ranks and milestones.
- Settings: streak visibility, consent preference, reduced motion, local memory notes, reset.
- State persists in this browser's localStorage. There is no account or multi-device synchronization.

## Suggested 4-minute presentation

1. **Today**: introduce the parchment design, profile and seven knowledge branches.
2. **Companion**: select “I want to learn Java” → “I am a beginner” → “30 minutes a day”.
3. Inspect the generated ten-chapter roadmap, then **Start this journey**.
4. Open a chapter and a quest → **Start quest** → optionally check steps/write notes → **I have completed this activity**. Show updated XP.
5. **My Knowledge**: select Java; click a node, inspect sample evidence, try search and zoom. Return to all branches to see the domain overview.
6. **Roadmap**: **Adjust my schedule** → 15 minutes → preview → apply. Future activities are split into smaller parts without increasing their total XP; ongoing work is preserved.
7. **Progress**: explain that XP is activity and domain rank is separate illustrative evidence.

For another presentation, use **Settings → Reset demo data → Reset demo**. This restores the original sample profile. Use one active tab during a presentation to avoid last-write-wins local saves from multiple tabs.

### Supported chat examples

- “I want to learn Java from scratch”
- “Prepare for coding interviews”
- “Master OOP fundamentals”
- “Learn Python”
- “Build a PDF chatbot”
- “Explain embeddings”
- “I only have 30 minutes a day”
- “Recommend my next quest”
- “Start over”

The wizard supports beginner or basic experience, and 15–120 minutes per day. Up to three active journeys can coexist. Complete an existing journey to free a slot.

## Verification / build

```powershell
node --test tests/*.test.mjs
node scripts/build.mjs
```

`dist/` is a static distributable. Serve it over HTTP at the site root. Opening index.html through `file://` is unsupported because ES modules require HTTP. Public deployment is not included.

## Important demo boundaries

- Arcana is a deterministic, prepared simulation, not a live AI chatbot. Goals outside the seven domains receive an explicit fallback.
- Plans derive from curated templates; they are not a promise of learning outcomes. Forecast days are illustrative.
- Knowledge observations, ranks, the seven-day streak and milestones are labeled sample data. They are not live competency judgments.
- Consent is a stored demo preference; no actual observation job runs. Memory notes can be added/deleted but do not personalize model responses.
- No login, database, background workers, real RAG, admin system, tests/exams, Stamina, leaderboard, or production security claims.
- Desktop is the verified target. Basic responsive CSS exists; mobile is not part of acceptance.
- UI uses system serif fonts with local images. No external font request is required. Learning-resource links require the internet.

## Source layout

`src/curriculum.js` — 62 chapters with 248 concepts and chapter-specific exercises  
`src/data.js` — track/concept/content fixtures  
`src/state.js` — roadmap/chat/reward/persistence transitions  
`src/pages.js`, `src/companion.js` — screen rendering  
`src/graph.js` — graph layout, SVG edges, pan/zoom  
`src/app.js` — navigation, dialogs and UI events  
`src/styles.css` — Grimoire appearance  
`assets/` — supplied illustrations copied locally  
`tests/state.test.mjs` — behavior and regression tests

Original `docs` and `design` files are preserved.
