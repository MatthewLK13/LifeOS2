# Verification and delivery

Date: 2026-09-26
Target: English desktop demo. Mobile QA intentionally excluded at the user's request.

## Automated checks
- `node --test tests/state.test.mjs`: 13 passed, 0 failed.
- `node scripts/build.mjs`: completed; static distributable at dist/.
- Build checks syntax of all seven JavaScript modules.

Covered behaviors: duplicate XP prevention; 120-XP daily cap; five distinct roadmap templates; explicit/idempotent activation; schedule preview and versioned application; preservation of ongoing quests; corrupt/obsolete storage recovery; scripted Java onboarding; unsupported input; invalid time bounds; nested corrupt records; finished journey Today state; split-quest reward conservation; asynchronous chat retaining intervening changes.

## Desktop browser checks performed
- Today and My Knowledge visual inspection.
- Completed the seeded embeddings quest: XP changed 250 to 270.
- Chat: Java -> beginner -> 30 minutes/day -> four-chapter draft.
- Activated Java; journey selector retained original RAG journey.
- Schedule: 30 -> 15 minutes/day preview, then apply. Unstarted activities split into bounded parts, total reward unchanged (also tested).
- Selected Java graph, selected Classes & Objects, opened evidence, searched Streams.
- Confirmed no horizontal document overflow in the inspected 1280px desktop viewport.
- Saved a memory and preference; reloaded and confirmed persistence.
- Finished the Java journey; Today showed Journey complete with no Continue Quest button.
- Opened Progress successfully.
- Browser captured no error or warning logs during checked flows.
- Reset demo through Settings after QA, restoring original profile.

## Independent review
A fresh reviewer found three issues: delayed chat overwrote intervening state; malformed nested saves passed validation; finished journeys still assigned quests on Today. Reproducing tests were added before fixes. All pass in the 13-test suite.

## Scope / limitations
Prepared chatbot, templates, sample evidence/ranks/streak; localStorage only. No live AI, real authentication, backend business service, public deployment or mobile QA. UI uses local images and system serif fonts. A single active demo tab is recommended because browser saves use last-write-wins rather than cross-tab synchronization.

## Curriculum expansion — 2026-09-26
- Seven tracks, 62 chapters, 248 concepts. Java, DSA and JavaScript have 10 chapters each; Python, OOP, AI and RAG have 8 each.
- Every sample chapter has four concept activities and one practical exercise. AI Fundamentals and RAG Engineering are separate tracks.
- Roadmap samples can be browsed without activation. Graphs paginate; chapter dossiers show topics and activities. Sample quest controls are read-only.
- 18 tests pass with `node --test tests/*.test.mjs`; static build succeeds.
- Browser verified JavaScript chapters 7–10, chapter-specific activity dialog, disabled preview checklist, and no captured warning/error logs in that preview tab.
- Existing journeys and XP remained visible after catalog migration. Migration tests also check notes, activity IDs and collisions with old IDs. Existing saved chat messages retain their historical text.
- No reset of the user's saved progress was performed for this expansion.
- Curriculum scope references: [Java learning topics](https://dev.java/learn/), [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide), [Google Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course). Activities are curated demo fixtures, not full lesson content.
