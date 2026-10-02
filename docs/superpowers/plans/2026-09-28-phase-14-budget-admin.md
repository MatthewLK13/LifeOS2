# Phase 14: Budget hardening and admin tools

**Goal:** Enforce AI usage limits across player-facing AI routes and provide protected demo reset and bounded player diagnostics.

## Tasks

- [x] Keep the configurable $2 weekly global cost target and per-player token limits.
- [x] Apply a database-backed 10-request rolling-minute limit across Companion, roadmap, and assessment AI.
- [x] Add bearer-secret protection for admin endpoints.
- [x] Add transactional demo reset that restores only the seeded Minh demo.
- [x] Add internal-ID player diagnostics without returning recovery credentials or digests.
- [x] Test rate limiting, unauthorized admin access, demo reset isolation, and diagnostics.

**Deployment requirement:** Set a unique `ADMIN_SECRET` in the server environment. Do not add it to browser configuration.
