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

The static demo uses Node.js 20 or newer. The TypeScript API and database tools require Node.js 22.6 or newer. The browser demo still runs without a database, API key, or network connection.

```powershell
cd D:\nam4\aicourse\lifeos2
node server.mjs
```

Open **http://localhost:4173** in your desktop browser. Stop the server with Ctrl+C. If the port is occupied, set `$env:PORT = '4175'` before starting it. The API uses the separate `API_PORT` setting (default **4174**).

For account-backed mode, start the API in a second terminal with `pnpm dev:api`. The local static server forwards same-origin `/api/*` requests to `API_PORT`. Without a configured database and session secrets, the UI stays in the offline Minh demo.

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
- Offline demo progress persists in this browser's localStorage. When configured, account mode loads player state from the API and sends quest and journey changes to the server.

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

## Backend, account sessions, and server-backed gameplay

The backend foundation lives alongside the working demo. It adds a Hono API, TypeScript checks, a canonical catalog shared by the browser and seed, a Drizzle/PostgreSQL schema, an idempotent Minh seed, guest Player Codes, signed sessions and code restore.

1. Copy `.env.example` to `.env` and point `DATABASE_ENV`, `DATABASE_URL`, and `NEON_DEV_DB_HOST` at a dedicated **development** Neon branch. Set `PLAYER_CODE_PEPPER` to at least 32 random characters.
2. Run `pnpm install`.
3. Generate a migration with `pnpm db:generate`.
4. Apply it with `pnpm db:migrate`, then seed the development database with `pnpm db:seed`.
5. Run the API with `pnpm dev:api`. Check `http://localhost:4174/api/health` or `/api/catalog`; player endpoints are `POST /api/player`, `POST /api/player/restore`, `POST /api/player/demo`, and `GET /api/player/me`.
6. Start the static UI with `node server.mjs`. It proxies `/api/*` to the API port, so account-backed UI requests remain same-origin.

The database URL must match the explicitly configured development host. Set `SESSION_SECRET` and `PLAYER_CODE_PEPPER` to random values of at least 32 characters. Production migrations require a separate, explicit server-side setting and must never point preview deployments at the production database. With those values configured, the UI creates or restores an account and reads gameplay state from the API. If the API/database is unavailable, it clearly falls back to the existing offline demo.

## Verification / build

```powershell
pnpm test
pnpm typecheck
pnpm build
```

`dist/` is a static distributable with the same shared catalog used by the backend. Serve it over HTTP at the site root. Opening index.html through `file://` is unsupported because ES modules require HTTP. No production deployment is included in Phases 0–2.

## Local demo and production service

- Offline mode is a prepared desktop demo. It needs no database or API key and keeps its progress in this browser.
- Account mode uses the PostgreSQL API for guest identity, restore codes, gameplay, dynamic knowledge, assessments, confirmed memories, achievements, Coins, inventory, and journey proposals. Companion and custom roadmap generation use Gemini only when its server key is configured.
- AI plans remain proposals until accepted. Weekly global cost and per-player token caps apply; AI routes also share a database-backed short-window limit. Core gameplay remains available if AI is unavailable.
- Browser reminders require HTTPS, notification permission, VAPID keys, and scheduled Vercel cron jobs. Admin reset/debug endpoints require the server-only `ADMIN_SECRET`.
- Seeded Minh history and evidence are illustrative, not live competency judgments. Forecast days are approximate, not a promise of learning outcomes.
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

## Production deployment checklist

Vercel is configured to build the static app into `dist/` and expose the Hono API through `api/[...route].ts`. Cron jobs run at 17:00 UTC (midnight in Vietnam) and 23:00 UTC (06:00 in Vietnam); execution may happen within the scheduled hour.

Before connecting a production project:

1. Create separate Neon development and production branches. Set `DATABASE_ENV=development`, `DATABASE_URL`, and the matching `NEON_DEV_DB_HOST` for Preview. Use `DATABASE_ENV=production` and the production URL only for Production.
2. Add Vercel server environment variables: `SESSION_SECRET`, `PLAYER_CODE_PEPPER`, `DATABASE_ENV`, and `DATABASE_URL`; add `NEON_DEV_DB_HOST` for Preview. Add production AI and push secrets only if those features are enabled: `GEMINI_API_KEY`, `ADMIN_SECRET`, `CRON_SECRET`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT`.
3. Apply migrations to each database deliberately from a trusted environment. Production migrations require `ALLOW_PRODUCTION_MIGRATIONS=true`; never use the development URL in Production.
4. Seed the production catalog and Minh demo once with `PLAYER_CODE_PEPPER` configured. Then verify `/api/health`, guest creation/restore, quest persistence, Companion budget errors, demo reset, and cron authorization.
5. Connect the Vercel project to GitHub and assign `lifeos.fluxlab.pro.vn` after environment checks pass.

No Neon/Vercel credentials, production secrets, or deployment authorization are available in this workspace, so the project has not been pushed or deployed. Configure Vercel's variables before the first live deployment; the app fails closed when the database environment does not match the deployment target.
