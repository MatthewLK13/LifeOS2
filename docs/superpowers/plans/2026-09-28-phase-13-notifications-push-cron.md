# Phase 13: Push reminders and scheduled jobs

**Goal:** Let signed-in players opt into daily browser reminders and keep daily progression dates correct through authorized scheduled jobs.

## Tasks

- [x] Add owner-scoped Web Push subscription create/delete routes and VAPID key delivery.
- [x] Add a permission-gated desktop reminder control and service-worker push/click handling.
- [x] Add authorized, idempotent daily rollover and once-per-local-day morning reminders.
- [x] Schedule rollover at midnight and reminder at 06:00 Vietnam time through Vercel cron.
- [x] Verify subscription ownership, cron authorization, timezone rollover, DST date arithmetic, skip rules, and duplicate prevention.

**Deployment requirement:** Configure `CRON_SECRET`, `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` in Vercel before enabling reminders. Cron times are UTC and may execute anywhere within their configured hour.
