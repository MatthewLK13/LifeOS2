This file is a merged representation of a subset of the codebase, containing specifically included files and files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: **/*
- Files matching these patterns are excluded: **/node_modules/**, **/.pnpm-store/**, **/.yarn/**, **/.npm/**, **/dist/**, **/build/**, **/out/**, **/.next/**, **/.nuxt/**, **/.output/**, **/.turbo/**, **/.vite/**, **/coverage/**, **/.git/**, **/.svn/**, **/.hg/**, **/*.map, **/*.log, **/logs/**, **/workflow-logs/**, **/*.lock, package-lock.json, yarn.lock, pnpm-lock.yaml, bun.lockb, **/ios/Pods/**, **/ios/build/**, **/android/.gradle/**, **/android/build/**, **/android/app/build/**, **/android/app/src/debug/**, **/android/app/src/profile/**, **/.dart_tool/**, **/.flutter-plugins, **/.flutter-plugins-dependencies, .env, .env.*, **/.env, **/.env.*, **/replit/**, **/.local/**, **/*.docx, **/*.pdf, **/*.zip, **/*.rar, **/*.7z, **/*.tar, **/*.gz, **/*.png, **/*.jpg, **/*.jpeg, **/*.svg, **/*.gif, **/*.webp, **/*.mp4, **/*.mov, **/*.avi, **/.cache/**, **/tmp/**, **/temp/**, **/.tmp/**, **/vendor/**, **/__pycache__/**, **/.pytest_cache/**, **/.mypy_cache/**, **/.ruff_cache/**, **/.venv/**, **/venv/**, **/target/**, **/bin/**, **/obj/**, *.db, **/.gitnexus/**, **/.vscode/**, **/.idea/**, **/.code-review-graph/**, **/docs/**, repomix.md, **/.claude/**, **/.kiro/**, **/.kiro_backup/**, **/*.tsbuildinfo, **/SKILL.md, **/.playwright-mcp/**, **/database/migrations/**, **/database/seed-data/**
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
````
design/
  asset/
    companion_arcana_dialogue_memory_core_en/
      code.html
    lifeos/
      DESIGN.md
    lifeos_academy_of_grimoires/
      DESIGN.md
    my_knowledge_grimoire_parchment_lifeos_en/
      code.html
    personal_rank_grimoire_milestones_chronicle_en/
      code.html
    quest_detail_test_embeddings_with_5_passages_en/
      code.html
    roadmap_ai_learning_advisor_plan_adjuster_en/
      code.html
    roadmap_visual_arcana_node_graph_en/
      code.html
    today_grimoire_parchment_lifeos_en/
      code.html
    design_preview.html
scripts/
  build.mjs
  expand-ui.mjs
src/
  app.js
  breadth.js
  companion.js
  curriculum.js
  data.js
  graph.js
  pages.js
  pathways.js
  state.js
  styles.css
  ui.js
tests/
  branches.test.mjs
  curriculum.test.mjs
  state.test.mjs
.gitignore
index.html
package.json
README.md
server.mjs
````

# Files

## File: design/asset/companion_arcana_dialogue_memory_core_en/code.html
````html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,400&amp;family=Anton&amp;family=Grenze+Gotisch:wght@600;700;800;900&amp;family=Marcellus&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-container": "#ffd576", "on-tertiary-container": "#c8e4ff", "inverse-primary": "#ffb4a3", "on-primary-fixed-variant": "#891d04", "surface-container-lowest": "#ffffff", "surface": "#fff9ed", "on-secondary": "#ffffff", "surface-tint": "#ab351a", "background": "#fff9ed", "cover-900": "#16130D", "cover-800": "#211C14", "mana-full": "#3F6B45", "page-raised": "#F6F0DE", "on-error-container": "#93000a", "surface-container-highest": "#eae2cb", "primary": "#912208", "accent": "#B23A1F", "tertiary-fixed-dim": "#91cdff", "tertiary-container": "#00699e", "outline": "#8c716b", "on-primary-container": "#ffd8d0", "surface-variant": "#eae2cb", "primary-fixed-dim": "#ffb4a3", "on-error": "#ffffff", "surface-dim": "#e1dac3", "tertiary": "#00507a", "on-tertiary-fixed-variant": "#004b72", "on-tertiary": "#ffffff", "inverse-surface": "#343021", "primary-fixed": "#ffdad2", "ink-700": "#4A4030", "on-secondary-fixed-variant": "#5b4300", "secondary-fixed-dim": "#eac165", "tertiary-fixed": "#cce5ff", "primary-container": "#b23a1f", "error": "#ba1a1a", "on-secondary-container": "#795a00", "surface-container-low": "#fbf3dc", "on-surface": "#1f1c0e", "on-secondary-fixed": "#251a00", "on-tertiary-fixed": "#001e31", "secondary-fixed": "#ffdf9b", "error-container": "#ffdad6", "on-background": "#1f1c0e", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "surface-container": "#f6eed6", "surface-container-high": "#f0e8d1", "on-surface-variant": "#58413c", "inverse-on-surface": "#f9f0d9", "secondary": "#785a00", "outline-variant": "#e0bfb8", "on-primary-fixed": "#3d0600", "on-primary": "#ffffff", "ink-900": "#2A2419" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem", "gutter": "1rem", "space-md": "16px", "space-lg": "24px", "space-2xl": "48px", "space-sm": "8px", "space-3xl": "64px" }, "fontFamily": { "body-base": [ "Literata", "serif" ], "headline-md": [ "Literata", "serif" ], "headline-display": [ "Literata", "serif" ], "headline-lg": [ "Literata", "serif" ], "label-sm": [ "Literata", "serif" ], "body-lg": [ "Literata", "serif" ], "gotisch": [ "Grenze Gotisch", "serif" ], "anton": [ "Anton", "sans-serif" ], "marcellus": [ "Marcellus", "serif" ] }, "fontSize": { "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ] } } } };</script></head><body class="bg-page-base font-body-base text-ink-900 antialiased selection:bg-secondary-container selection:text-ink-900"><header class="fixed top-0 left-0 right-0 h-14 bg-cover-900 z-50 shadow-[0_4px_12px_rgba(22,19,13,0.35)]"><div class="h-14 w-full px-space-lg flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-lg shrink-0"><div class="flex items-center gap-space-sm"><img alt="Arcana Grimoire Academy Insignia" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-marcellus text-label-sm tracking-widest uppercase text-secondary-fixed-dim leading-none">LifeOS</span><span class="font-gotisch text-body-lg text-inverse-on-surface leading-tight font-bold tracking-wide">Arcana Grimoire Academy</span></div></div><div class="hidden xl:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419] cursor-pointer hover:bg-cover-800/80 transition-all"><span class="font-marcellus text-label-sm text-secondary-fixed-dim uppercase tracking-wider">Active Quest:</span><span class="font-body-base text-label-sm text-inverse-on-surface font-semibold max-w-[260px] truncate">Build Document Q&amp;A Chatbot with RAG</span><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">expand_more</span></div></div><div class="flex items-center gap-space-md shrink-0"><div class="hidden sm:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419]"><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">military_tech</span><span class="font-marcellus text-label-sm text-inverse-on-surface font-semibold">Minh · Apprentice Scribe</span><span class="font-anton text-label-sm text-secondary-fixed-dim tracking-wider">(Lvl 3 · 250 XP)</span></div><button class="relative p-space-xs text-inverse-on-surface hover:text-secondary-fixed-dim transition-colors rounded" title="Grimoire Whispers"><span class="material-symbols-outlined text-xl">notifications</span><span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent ring-2 ring-cover-900 animate-pulse"></span></button><div class="flex items-center bg-cover-800 rounded px-2 py-0.5 shadow-[2px_2px_0_#2A2419]"><span class="inline-block w-1.5 h-1.5 rounded-full bg-mana-full mr-1.5"></span><span class="font-anton text-label-sm tracking-wider text-secondary-fixed-dim">EN</span></div><div class="flex items-center pl-space-xs"><img alt="Minh Avatar" class="w-8 h-8 rounded-full object-cover ring-2 ring-secondary-fixed-dim shadow-[2px_2px_0_#2A2419]" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed left-0 top-14 bottom-10 w-64 bg-cover-900 z-40 flex flex-col shadow-[4px_0_16px_rgba(22,19,13,0.25)]"><div class="p-space-lg pb-space-sm"><div class="p-space-md rounded bg-cover-800 shadow-[3px_3px_0_#2A2419] mb-space-md"><div class="flex items-center justify-between text-secondary-fixed-dim mb-space-xs"><span class="font-marcellus text-label-sm uppercase tracking-wider">Chronicle Cycle</span><span class="material-symbols-outlined text-base">hourglass_top</span></div><div class="font-anton text-body-lg text-inverse-on-surface tracking-wide">Day 142</div><div class="font-marcellus text-label-sm text-inverse-on-surface/70">Winter Solstice Arc</div></div></div><nav class="flex-1 px-space-md space-y-space-xs" data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="today" href="#">Today</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="my-knowledge" href="#">My Knowledge</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="roadmap" href="#">Roadmap</a><a aria-current="page" class="flex items-center px-space-md py-space-sm rounded transition-all bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1" data-path="companion" href="#">Companion</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="quests" href="#">Quests</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="milestones-rank" href="#">Milestones / Rank</a></nav><div class="px-space-md pb-space-md"><nav data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="settings" href="#">Settings</a></nav></div></aside><div class="pl-64"><main class="relative pt-14 pb-12 min-h-screen bg-page-base px-space-xl"><div class="flex flex-col w-full">
<div class="flex flex-col gap-space-md max-w-5xl mx-auto w-full">
<div class="bg-page-raised rounded-lg p-space-md shadow-[3px_3px_0_#2A2419] flex items-center justify-between gap-space-md border border-ink-900/10">
  <div class="flex items-center gap-space-md">
    <div class="relative w-14 h-14 rounded-lg bg-cover-900 shadow-[2px_2px_0_#2A2419] overflow-hidden shrink-0 flex items-center justify-center">
      <img class="w-full h-full object-cover" data-alt="Charming enchanted sentient leather-bound spellbook grimoire with expressive glowing golden anime eyes" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDu8LILOqz9Fs9fVIctLC31O8vo3zoCU9HEBl9DHe2PDaTpt1DTrVmBfVv_8Pnqnc9AgBQaRD-TV9kABtydOUz_SZuCwK6n8AuoGtJS2wyaAVWKwxLrAZmJ9NbjTPbynL4JfbOwUt0x5FUzcuQ4IwTm1CViN8E6mF_neprCFAPzPNsJT_Xa92tFctGJ08Txqu2d1mNTKZb0xMgFYd0TzcIGrULwi4wZn0FFCoMaq0PN2LmkhFHSDqQ">
      <span class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-mana-full shadow-[0_0_4px_#3F6B45]"></span>
    </div>
    <div>
      <div class="flex items-center gap-space-sm flex-wrap">
        <h2 class="font-headline-md text-headline-md text-ink-900 leading-tight">Arcana Companion · Tome of Guidance</h2>
        <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-mana-full text-on-primary font-semibold">Active Sanctuary</span>
      </div>
      <p class="font-label-sm text-label-sm text-ink-700 flex items-center gap-1 mt-0.5">
        <span class="material-symbols-outlined text-sm text-accent">schedule</span>
        Mindful of active study pacts, cognitive mana load, and personal academy milestones
      </p>
    </div>
  </div>
  <div class="flex items-center gap-space-xs">
    <button class="p-2 rounded bg-surface-container hover:bg-surface-container-high text-ink-900 shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5" title="Purge Session Buffer">
      <span class="material-symbols-outlined text-lg">restart_alt</span>
    </button>
    <button class="p-2 rounded bg-surface-container hover:bg-surface-container-high text-ink-900 shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5" title="Codex Memory Registry">
      <span class="material-symbols-outlined text-lg">auto_stories</span>
    </button>
  </div>
</div>
<div class="flex flex-col gap-space-lg w-full py-space-xs">
  <div class="flex flex-col items-end self-end max-w-3xl w-full">
    <div class="flex items-center gap-space-xs mb-1.5 text-ink-700">
      <span class="font-label-sm text-label-sm font-semibold">Minh (Apprentice Scribe)</span>
      <span class="font-label-sm text-label-sm text-ink-700/60">• 14:18</span>
    </div>
    <div class="bg-surface-container-high text-ink-900 p-space-md rounded-xl shadow-[3px_3px_0_#2A2419] text-body-base font-body-base leading-relaxed border border-ink-900/10">
      I already have good experience with Python backend, but for the next two weeks my daily study budget is reduced to 30 minutes a day.
    </div>
  </div>
  <div class="flex flex-col items-start self-start w-full">
    <div class="flex items-center gap-space-xs mb-1.5 text-ink-700">
      <div class="w-5 h-5 rounded bg-cover-900 flex items-center justify-center text-secondary-fixed-dim text-xs shadow-[1px_1px_0_#2A2419]">
        <span class="material-symbols-outlined text-xs">menu_book</span>
      </div>
      <span class="font-label-sm text-label-sm font-bold text-ink-900">Tome of Guidance</span>
      <span class="font-label-sm text-label-sm text-ink-700/60">• 14:19</span>
    </div>
    <div class="bg-page-raised text-ink-900 p-space-lg rounded-xl shadow-[3px_3px_0_#2A2419] flex flex-col gap-space-md w-full border border-ink-900/10">
      <p class="font-body-base text-body-base leading-relaxed">
        Understood, Scribe Minh! I have noted your self-reported Python familiarity. However, to preserve the sanctity of your rank progression, your mastery claims will remain an inference until validated through coding trials in your Grimoire exercises.
      </p>
      <p class="font-body-base text-body-base leading-relaxed">
        Regarding your schedule crunch: pacing yourself preserves your mana. I have drafted an adaptive roadmap adjustment to balance your chronicle without failing your active quest.
      </p>
      <div class="p-space-md bg-surface-container rounded-lg shadow-[2px_2px_0_#2A2419] flex flex-col gap-space-sm border border-ink-900/10">
        <div class="flex items-center justify-between gap-space-sm">
          <div class="flex items-center gap-space-xs text-accent">
            <span class="material-symbols-outlined text-lg">event_repeat</span>
            <span class="font-label-sm text-label-sm font-bold uppercase tracking-wider">Pacing Proposal</span>
          </div>
          <span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded bg-secondary-container text-on-secondary-container font-bold shadow-[1px_1px_0_#2A2419]">Pending Scribe Seal</span>
        </div>
        <h3 class="font-headline-md text-headline-md text-ink-900">Proposed Temporary Schedule: 30 Mins/Day</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-space-sm py-1">
          <div class="bg-surface-container-low p-space-md rounded shadow-[1px_1px_0_#2A2419]">
            <span class="font-label-sm text-label-sm text-ink-700 block uppercase tracking-wide">Active Window</span>
            <span class="font-body-base text-body-base font-bold text-ink-900">Sep 29 – Oct 12</span>
            <span class="font-label-sm text-label-sm text-ink-700/80 block mt-0.5">(Returns to 60m/day on Oct 13)</span>
          </div>
          <div class="bg-surface-container-low p-space-md rounded shadow-[1px_1px_0_#2A2419]">
            <span class="font-label-sm text-label-sm text-ink-700 block uppercase tracking-wide">Forecast Horizon</span>
            <span class="font-body-base text-body-base font-bold text-ink-900">Nov 01, 2025</span>
            <span class="font-label-sm text-label-sm text-ink-700/80 block mt-0.5">Shifted from Oct 25 (+7 days)</span>
          </div>
        </div>
        <p class="font-body-base text-body-base text-ink-700 leading-relaxed">
          <strong class="text-ink-900">Operational Impact:</strong> Active quest <span class="text-primary font-semibold">"Build Document Q&amp;A Chatbot with RAG"</span> is retained. Upcoming unstarted sub-nodes will be divided into micro-spells (15m modules) so you maintain consistent cadence.
        </p>
        <div class="pt-space-xs flex flex-wrap items-center gap-space-sm">
          <button class="bg-accent text-on-primary font-label-sm text-label-sm px-space-lg py-2 rounded shadow-[2px_2px_0_#2A2419] flex items-center gap-1.5 transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:brightness-105">
            <span class="material-symbols-outlined text-base">draw</span>
            Review &amp; Apply Changes
          </button>
          <button class="bg-surface-container-high text-ink-900 font-label-sm text-label-sm px-space-lg py-2 rounded shadow-[2px_2px_0_#2A2419] hover:bg-surface-container-highest transition-transform active:translate-x-0.5 active:translate-y-0.5">
            Keep Current Plan
          </button>
        </div>
        <div class="flex items-center gap-1 text-ink-700 pt-1">
          <span class="material-symbols-outlined text-sm text-secondary">verified_user</span>
          <span class="font-label-sm text-label-sm italic">Strict confirmation required · No silent changes to roadmap</span>
        </div>
      </div>
      <div class="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded text-ink-700 border border-ink-900/5">
        <span class="material-symbols-outlined text-secondary shrink-0">psychology</span>
        <p class="font-label-sm text-label-sm">
          Conversation insights can enrich your personal Knowledge Tree when authorized in Settings. Zero external telemetry leakage.
        </p>
      </div>
    </div>
  </div>
</div>
<div class="flex items-center gap-space-xs overflow-x-auto pb-1 pt-space-xs scrollbar-none w-full">
  <span class="font-label-sm text-label-sm text-ink-700 shrink-0 uppercase tracking-wider flex items-center gap-1 font-bold">
    <span class="material-symbols-outlined text-sm text-accent">flare</span> Quick Glyphs:
  </span>
  <button class="shrink-0 bg-surface-container-high hover:bg-surface-container-highest text-ink-900 font-label-sm text-label-sm px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5">
    Explain chunking simply
  </button>
  <button class="shrink-0 bg-surface-container-high hover:bg-surface-container-highest text-ink-900 font-label-sm text-label-sm px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5">
    Adjust daily study budget
  </button>
  <button class="shrink-0 bg-surface-container-high hover:bg-surface-container-highest text-ink-900 font-label-sm text-label-sm px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5">
    Recommend next quest
  </button>
  <button class="shrink-0 bg-surface-container-high hover:bg-surface-container-highest text-ink-900 font-label-sm text-label-sm px-3.5 py-1.5 rounded-full shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5">
    I feel stuck on vector search
  </button>
</div>
<div class="bg-page-raised rounded-xl p-space-md shadow-[3px_3px_0_#2A2419] flex flex-col gap-space-sm border border-ink-900/10 w-full">
  <div class="relative w-full">
    <textarea class="w-full bg-surface-container-low text-ink-900 font-body-base text-body-base p-space-md rounded-lg resize-none focus:outline-none placeholder:text-ink-700/60 shadow-[inset_2px_2px_0_rgba(42,36,25,0.15)]" placeholder="Consult the Tome... ask for clarification, adjust your pact, or request a trial question." rows="3"></textarea>
  </div>
  <div class="flex items-center justify-between gap-space-sm flex-wrap">
    <div class="flex items-center gap-space-xs text-ink-700">
      <button class="p-1.5 rounded hover:bg-surface-container text-ink-700 hover:text-ink-900 transition-colors" title="Attach Code Fragment">
        <span class="material-symbols-outlined text-lg">code</span>
      </button>
      <button class="p-1.5 rounded hover:bg-surface-container text-ink-700 hover:text-ink-900 transition-colors" title="Reference Active Quest Node">
        <span class="material-symbols-outlined text-lg">flag</span>
      </button>
      <span class="font-label-sm text-label-sm text-ink-700/60 hidden sm:inline ml-1">Shift + Enter for new stanza</span>
    </div>
    <button class="bg-accent text-on-primary font-label-sm text-label-sm px-space-lg py-2.5 rounded shadow-[2px_2px_0_#2A2419] flex items-center gap-space-xs transition-transform active:translate-x-0.5 active:translate-y-0.5 hover:brightness-105 font-bold">
      <span class="material-symbols-outlined text-base">history_edu</span>
      <span class="">Inscribe Inquiry</span>
    </button>
  </div>
</div></div>
</div></main></div><footer class="fixed bottom-0 left-0 right-0 h-10 bg-cover-900 z-50 shadow-[0_-2px_10px_rgba(22,19,13,0.25)] px-space-lg flex items-center justify-between text-inverse-on-surface/70"><div class="flex items-center gap-space-md"><span class="inline-block w-2 h-2 rounded-full bg-mana-full animate-pulse"></span><span class="font-marcellus text-label-sm tracking-wide">Tome Synchronized • Shounen Engine v2.4</span></div><div class="flex items-center gap-space-lg font-marcellus text-label-sm"><span class="text-secondary-fixed-dim hover:underline cursor-pointer">Grimoire Draft</span><span class="">•</span><span class="">Sanctum ID: #8820-EX</span></div></footer>
</body></html>
````

## File: design/asset/lifeos/DESIGN.md
````markdown
---
name: LifeOS
colors:
  surface: '#fff9ed'
  surface-dim: '#e1dac3'
  surface-bright: '#fff9ed'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3dc'
  surface-container: '#f6eed6'
  surface-container-high: '#f0e8d1'
  surface-container-highest: '#eae2cb'
  on-surface: '#1f1c0e'
  on-surface-variant: '#58413c'
  inverse-surface: '#343021'
  inverse-on-surface: '#f9f0d9'
  outline: '#8c716b'
  outline-variant: '#e0bfb8'
  surface-tint: '#ab351a'
  primary: '#912208'
  on-primary: '#ffffff'
  primary-container: '#b23a1f'
  on-primary-container: '#ffd8d0'
  inverse-primary: '#ffb4a3'
  secondary: '#785a00'
  on-secondary: '#ffffff'
  secondary-container: '#ffd576'
  on-secondary-container: '#795a00'
  tertiary: '#00507a'
  on-tertiary: '#ffffff'
  tertiary-container: '#00699e'
  on-tertiary-container: '#c8e4ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad2'
  primary-fixed-dim: '#ffb4a3'
  on-primary-fixed: '#3d0600'
  on-primary-fixed-variant: '#891d04'
  secondary-fixed: '#ffdf9b'
  secondary-fixed-dim: '#eac165'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#cce5ff'
  tertiary-fixed-dim: '#91cdff'
  on-tertiary-fixed: '#001e31'
  on-tertiary-fixed-variant: '#004b72'
  background: '#fff9ed'
  on-background: '#1f1c0e'
  surface-variant: '#eae2cb'
  cover-900: '#16130D'
  page-base: '#F1E9D2'
  page-raised: '#F6F0DE'
  ink-900: '#2A2419'
  ink-700: '#4A4030'
  accent: '#B23A1F'
  mana-full: '#3F6B45'
typography:
  headline-display:
    fontFamily: Literata
    fontSize: 48px
    fontWeight: '900'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Literata
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Literata
    fontSize: 30px
    fontWeight: '700'
    lineHeight: '1.25'
  body-lg:
    fontFamily: Literata
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.5'
  body-base:
    fontFamily: Literata
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Literata
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1.4'
spacing:
  gutter: 1rem
  margin: 1.5rem
  space-xs: 4px
  space-sm: 8px
  space-md: 16px
  space-lg: 24px
  space-xl: 32px
  space-2xl: 48px
  space-3xl: 64px
---

## Brand & Style

This design system establishes a distinctive **Shounen Fantasy / Grimoire Utility** aesthetic, bridging high-fantasy editorial tropes with ruthless game-design mechanics. It evokes the feeling of an ancient, mystical tome engineered for modern productivity and habit tracking. 

The visual style is characterized by heavy ink borders, high-contrast typography, parchment surfaces, and cinnabar red accents. It rejects generic SaaS minimalism in favor of a tactile, bookish character that treats every user action like a quest progression.

## Colors

The color palette is strictly partitioned into the Dark Chrome cover bands, the Parchment page surfaces, and the Ink text/outline hierarchy. 

- **Primary Accent (`--accent`)**: Cinnabar Seal Red (`#B23A1F`), used for primary interactive states, active nav indicators, and quest progress fills.
- **Secondary Accent (`--gold-on-page`)**: Antique Gold (`#8A6A14`), reserved for rewards, high-value figures, and completed quest states.
- **Neutral Parchment (`--page-base`)**: (`#F1E9D2`), dominating approximately 90% of screen area as the global body background. Pure white (`#FFFFFF`) is strictly forbidden.
- **Dark Chrome (`--cover-900`)**: (`#16130D`), limited strictly to $\le 15\%$ of screen area for headers and status bars.

## Typography

Typography balances authoritative editorial weight with high legibility. The system utilizes `Literata` across all roles to maintain a cohesive, bookish grimoire aesthetic. 

- **Display & Headings**: Set in high-weight `Literata`, providing strong traditional editorial impact.
- **Body**: Optimized for dense reading at `17px` with comfortable line heights (`1.6`).
- **Scale**: Scales responsively, with larger display sizes featuring mobile-adjusted scaling to maintain accessibility without breaking layout constraints.

## Layout & Spacing

The layout model relies on a structured, fixed-max-width container (`--app-max: 1280px`) with generous outer margins and disciplined internal spacing. 

- **Rhythm**: Built on a modular spacing scale ranging from `4px` (`--s1`) to `96px` (`--s9`), ensuring predictable rhythm across all panels and quest cards.
- **Line Length**: Paragraph measure is strictly capped (`--measure: 72ch`) to optimize long-form reading comfort on parchment backgrounds.

## Elevation & Depth

Depth is conveyed through a graphic-novel, neobrutalist approach rather than soft, blurred drop shadows. 

- **Hard Offset Shadows**: Surfaces utilize crisp, unblurred shadow offsets (e.g., `3px 3px 0 var(--ink-900)`) to maintain physical tactility and sharp rendering performance across all devices and projectors.
- **Press Feedback**: Interactive elements shift physically into their shadow bounds on `:active` (`translate(2px, 2px)`), avoiding artificial color shifts or glow filters.
- **Z-Index Layering**: Strict stacking contexts isolate the background grain overlay (`z-index: 1`), main parchment content (`z-index: 2`), and fixed dark chrome headers/footers (`z-index: 100`).

## Shapes

The design system enforces a strict **sharp (`0`)** shape language across all standard UI containers, panels, and cards. 

- **Border Radii**: Uniform border-radius is explicitly banned. Default elements use sharp `0px` corners to mimic bound paper pages and ancient codex layouts. Pill shapes (`999px`) are reserved exclusively for status chips, difficulty indicators, and progress tracks.
- **Borders**: Heavy structural ink borders (`2px` to `4px` solid `--ink-900`) define all major boundaries, reinforcing the printed-page aesthetic.

## Components

All components must adhere strictly to the Grimoire aesthetic, combining raw ink geometry with clear functional states.

- **Buttons**: Rendered with solid ink borders and hard offset shadows. On active press, they translate directly into their shadow without changing hue. Primary actions utilize Cinnabar Seal Red (`--accent`).
- **Cards & Panels**: Constructed with parchment backgrounds (`--page-raised`), heavy ink borders (`--b-slab`), and hard offset shadow geometry (`--sh-md`). Inner padding defaults to `--card-padding` (`20px`).
- **Chips & Badges**: Pill-shaped (`--r-pill`) indicators featuring high-contrast text and categorical color mapping (Easy, Medium, Hard, Boss) for instant visual scanning.
- **Input Fields & Form Controls**: Sunken parchment backgrounds (`--page-sunken`) with clear hairline borders, transforming into high-contrast focus states using gold or ink outlines.
- **Checkboxes & Lists**: Structured with solid bounding boxes and custom vector check states that replace standard browser defaults with hand-inked check and cross marks.
````

## File: design/asset/lifeos_academy_of_grimoires/DESIGN.md
````markdown
---
name: LifeOS Academy of Grimoires
colors:
  surface: '#0b1322'
  surface-dim: '#0b1322'
  surface-bright: '#31394a'
  surface-container-lowest: '#060e1d'
  surface-container-low: '#141c2b'
  surface-container: '#18202f'
  surface-container-high: '#222a3a'
  surface-container-highest: '#2d3545'
  on-surface: '#dbe2f8'
  on-surface-variant: '#d1c5b2'
  inverse-surface: '#dbe2f8'
  inverse-on-surface: '#293041'
  outline: '#9a8f7e'
  outline-variant: '#4e4637'
  surface-tint: '#ecc066'
  primary: '#ffd47e'
  on-primary: '#402d00'
  primary-container: '#e3b85f'
  on-primary-container: '#644800'
  inverse-primary: '#7a5902'
  secondary: '#65d9c6'
  on-secondary: '#003730'
  secondary-container: '#1da291'
  on-secondary-container: '#00302a'
  tertiary: '#dfd4ff'
  on-tertiary: '#332468'
  tertiary-container: '#c4b4ff'
  on-tertiary-container: '#514287'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea1'
  primary-fixed-dim: '#ecc066'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5c4200'
  secondary-fixed: '#83f6e2'
  secondary-fixed-dim: '#65d9c6'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#e7deff'
  tertiary-fixed-dim: '#ccbeff'
  on-tertiary-fixed: '#1e0b53'
  on-tertiary-fixed-variant: '#4a3c80'
  background: '#0b1322'
  on-background: '#dbe2f8'
  surface-variant: '#2d3545'
typography:
  display-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 3.25rem
    fontWeight: '800'
    lineHeight: 3.75rem
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 2.25rem
    fontWeight: '800'
    lineHeight: 2.75rem
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 2rem
    fontWeight: '700'
    lineHeight: 2.5rem
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 1.625rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: 0em
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 1.5rem
    fontWeight: '700'
    lineHeight: 2rem
    letterSpacing: 0em
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 1.25rem
    fontWeight: '600'
    lineHeight: 1.75rem
    letterSpacing: 0.01em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: 1.75rem
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.375rem
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 0.875rem
    fontWeight: '600'
    lineHeight: 1.25rem
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 0.75rem
    fontWeight: '700'
    lineHeight: 1rem
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system channels an expressive shonen fantasy anime aesthetic grounded in the lore of ancient magical guilds, grimoires, and grand academy chambers. Built specifically for Vietnamese university students and early-career learners, it treats self-development, daily discipline, and cognitive progression as an epic heroic quest.

The UI avoids hollow gamification in favor of deep tactile engagement: illuminated grimoire surfaces, crisp anime-inspired structural borders, warm parchment inserts, and restrained magical auras. The emotional tone evokes the determination of a shonen protagonist cracking open a forbidden tome under warm lantern light in a midnight guild hall—focused, adventurous, and aspirational.

## Colors

The palette balances the deep atmospheric solemnity of midnight guild chambers with luminous celestial accents:

- **Core Canvas (`#101827`)**: Midnight ink, representing the endless nocturnal expanse and foundation of focus.
- **Surface Elevation Levels**:
  - `surface-base`: Deep Panel Navy (`#1B2940`) for foundational structural cards and sidebar containers.
  - `surface-raised`: Elevated Navy (`#26364F`) for elevated widgets, quest nodes, and interactive modules.
  - `surface-parchment`: Warm Antique Parchment (`#F5EDD9`) reserved for readable scrolls, grimoire pages, and master skill summaries. Text overlaid on parchment uses Midnight Ink (`#243248`).
- **Primary Accent (`#E3B85F`)**: Antique Gold. Directs primary calls-to-action, high-tier achievements, critical XP gains, and active selection frames. Text on solid gold elements strictly uses `#101827` to preserve accessibility and bold contrast.
- **Secondary Accent (`#64D8C5`)**: Magic Teal. Designated for completed masteries, validated cognitive progress, evaluated quests, and positive skill status.
- **Tertiary Accent (`#B7A7F4`)**: Mystic Lavender. Anchors AI companion dialogue, magical grimoire synthesis, insight tooltips, and divine prompt assistance.
- **Functional Semantics**:
  - In-Progress Mana Blue: `#4B96F3`
  - Threat / Alert Crimson: `#F08D86`
  - Self-Reported Quest Amber: `#E3B85F`
  - High-Legibility Body Foreground: `#F7F4EB`
  - Inscription Muted Text: `#B9C5D5`

## Typography

Typography centers exclusively on `Be Vietnam Pro`. Designed specifically for the Vietnamese language, it resolves diacritic stacking, tones, and vowel accents without clipping or awkward line jumps.

- **Headlines & Crests**: Heavy weights (`700`, `800`) paired with subtle tracking provide the authoritative presence of anime chapter titles and grand magical codices.
- **Body & Legibility**: Body copy never dips below `16px` (`1rem`) on primary interfaces, and labels strictly adhere to a `14px` (`0.875rem`) minimum for secondary data to preserve diacritic clarity.
- **Line Heights**: Generous vertical spacing (`1.625rem` on body text) prevents double diacritics (e.g., `ệ`, `ở`, `ữ`) from colliding with preceding descenders.

## Layout & Spacing

The layout is structured around an 8-point spatial cadence, mimicking the disciplined composition of anime layout storyboards and grimoire grids:

- **Desktop (>= 1200px)**: 12-column layout with 24px (`1.5rem`) gutters and minimum 32px (`2rem`) outer margins. Content groups mimic grimoire spreads—side navigation acts as a book clasp, central quest hubs as open pages.
- **Tablet (768px - 1199px)**: 8-column layout with 20px gutters and 24px margins. Peripheral inventory/companion docks collapse into slide-out scrolls.
- **Mobile (< 768px)**: 4-column responsive grid with 16px (`1rem`) gutters and 16px (`1rem`) safe margins. Single-hand task completions use sticky bottom control hubs.
- **Rhythm**: All horizontal and vertical element gaps must be multiples of 4px and 8px to maintain consistent layout pacing.

## Elevation & Depth

This system rejects generic fuzzy drop shadows, opting instead for cel-shaded anime depth and illuminated runic back-lighting:

- **Cel Depth (Base to Tier 1)**: Panels use a solid, crisp offset shadow: `0 4px 0 0 #0B111C`. This simulates hard ink line shadows typical of hand-drawn shonen backgrounds.
- **Inner Borders / Bevels**: Rather than flat strokes, interactive surfaces leverage an interior keyline (`inset 0 1px 0 0 rgba(227, 184, 95, 0.2)`) reminiscent of gold leaf framing on guild tomes.
- **Magical Glow (Floating & Active Elements)**: Elevated modal sheets and active spell states use a dual aura:
  - Gold Focus Aura: `0 0 0 1px #E3B85F, 0 8px 24px -4px rgba(227, 184, 95, 0.25)`.
  - Lavender AI Guidance Aura: `0 0 0 1px #B7A7F4, 0 8px 24px -4px rgba(183, 167, 244, 0.2)`.
  - Magic Teal Completion Aura: `0 0 0 1px #64D8C5, 0 8px 24px -4px rgba(100, 216, 197, 0.2)`.

## Shapes

The interface embraces a structured curvature (Rounded Level `2`, matching `8px` baseline with `12px` to `16px` for outer cards). This maintains the architectural weight of magical study desks, carved grimoire covers, and quest boards while avoiding child-like bubble geometry:

- **Standard Panels & Quests**: `12px` border radius (`rounded-lg` equivalent).
- **Major Guild Modals & Grimoire Sheets**: `16px` border radius (`rounded-xl` equivalent).
- **Badges, XP Trackers, and Action Chips**: `8px` or full pill (`9999px`) where appropriate for tokenized items.
- **Ornamentation Details**: Corner rivets (subtle 2px square accents in antique gold) can be applied to major structural containers to evoke bound magical books.

## Components

### Buttons & Action Seals
- **Primary CTA ("Cast / Commit")**: Solid Antique Gold (`#E3B85F`) fill, high-contrast dark text (`#101827`, font-weight `700`). Reinforced with a 1px top highlight and a bottom 2px dark-gold step (`#B88E3B`) for a tactile anime keyframe button press.
- **Secondary CTA ("Guild Duty")**: Deep Panel Navy (`#1B2940`) background, 1px border in `#3D5477`, text in `#F7F4EB`. Hover state ignites a subtle `#64D8C5` glow.
- **Companion / AI Prompts**: Translucent Lavender (`rgba(183, 167, 244, 0.15)`) background with a crisp `#B7A7F4` stroke.

### Cards & Grimoire Surfaces
- **Task & Daily Study Cards**: Opaque Deep Panel Navy (`#1B2940`) with crisp `1px solid rgba(185, 197, 213, 0.15)` borders. Never blurred or transparent; high legibility is paramount.
- **Parchment Lore / Summary Inset**: `#F5EDD9` background, `#243248` ink text, framed with a faint double line border (`border: 3px double #C4B595`) simulating academy thesis parchment.

### RPG Status Indicators
- **XP / Mastery Badges**: Compact hexagonal or faceted capsule containers displaying level numbers with a 1px antique gold frame.
- **Stamina & Progress Bars**: Segmented 8px-high mana gauges. Empty segments use `#1B2940`; filled segments cast a vibrant gradient (`#64D8C5` to `#4B96F3`) capped by an animated lead-spark pixel.
- **Streak Flames**: Radiant ember iconography utilizing `#E3B85F` and `#F08D86` transitions.

### Chips & Tags
- **Skill Tags**: Low-saturation background (`rgba(38, 54, 79, 0.8)`) with color-coded dot runes:
  - Assessed / Mastery: Teal dot (`#64D8C5`)
  - Self-Reported Quest: Amber dotted border (`#E3B85F`)
  - Mana Depleted / Overdue: Muted crimson indicator (`#F08D86`)

### Inputs & Fields
- Dark input fields (`#121B2B`) nested within `#1B2940` cards. Text is `#F7F4EB` with placeholder in `#B9C5D5`. Active focus engages a crisp 1.5px `#E3B85F` border with zero blur spread to maintain clean anime cel linework.
````

## File: design/asset/my_knowledge_grimoire_parchment_lifeos_en/code.html
````html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,400&amp;family=Anton&amp;family=Grenze+Gotisch:wght@600;800;900&amp;family=Marcellus&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-container": "#ffd576", "on-tertiary-container": "#c8e4ff", "inverse-primary": "#ffb4a3", "on-primary-fixed-variant": "#891d04", "surface-container-lowest": "#ffffff", "surface": "#fff9ed", "on-secondary": "#ffffff", "surface-tint": "#ab351a", "background": "#fff9ed", "cover-900": "#16130D", "mana-full": "#3F6B45", "page-raised": "#F6F0DE", "on-error-container": "#93000a", "surface-container-highest": "#eae2cb", "primary": "#912208", "accent": "#B23A1F", "tertiary-fixed-dim": "#91cdff", "tertiary-container": "#00699e", "outline": "#8c716b", "on-primary-container": "#ffd8d0", "surface-variant": "#eae2cb", "primary-fixed-dim": "#ffb4a3", "on-error": "#ffffff", "surface-dim": "#e1dac3", "tertiary": "#00507a", "on-tertiary-fixed-variant": "#004b72", "on-tertiary": "#ffffff", "inverse-surface": "#343021", "primary-fixed": "#ffdad2", "ink-700": "#4A4030", "on-secondary-fixed-variant": "#5b4300", "secondary-fixed-dim": "#eac165", "tertiary-fixed": "#cce5ff", "primary-container": "#b23a1f", "error": "#ba1a1a", "on-secondary-container": "#795a00", "surface-container-low": "#fbf3dc", "on-surface": "#1f1c0e", "on-secondary-fixed": "#251a00", "on-tertiary-fixed": "#001e31", "secondary-fixed": "#ffdf9b", "error-container": "#ffdad6", "on-background": "#1f1c0e", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "surface-container": "#f6eed6", "surface-container-high": "#f0e8d1", "on-surface-variant": "#58413c", "inverse-on-surface": "#f9f0d9", "secondary": "#785a00", "outline-variant": "#e0bfb8", "on-primary-fixed": "#3d0600", "on-primary": "#ffffff", "ink-900": "#2A2419" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem", "gutter": "1rem", "space-md": "16px", "space-lg": "24px", "space-2xl": "48px", "space-sm": "8px", "space-3xl": "64px" }, "fontFamily": { "body-base": [ "Literata", "serif" ], "headline-md": [ "Literata", "serif" ], "headline-display": [ "Literata", "serif" ], "headline-lg": [ "Literata", "serif" ], "label-sm": [ "Literata", "serif" ], "body-lg": [ "Literata", "serif" ], "anton": [ "Anton", "sans-serif" ], "gotisch": [ "Grenze Gotisch", "serif" ], "marcellus": [ "Marcellus", "serif" ] }, "fontSize": { "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ] } } } };</script></head><body class="bg-page-base font-body-base text-ink-900 antialiased selection:bg-secondary-container selection:text-ink-900"><header class="fixed top-0 left-0 right-0 h-14 bg-cover-900 z-50 shadow-[0_4px_12px_rgba(22,19,13,0.3)]"><div class="h-14 w-full px-space-lg flex items-center justify-between"><div class="flex items-center gap-space-md"><img alt="Magical guild crest emblem featuring an illuminated branching tree of knowledge combined with a grimoire quill and open book silhouette, antique gold #E3B85F lines and radiant magic teal #64D8C5 aura, clean vector anime fantasy insignia for LifeOS.. Design context: - Primary color: #e3b85f
- Font: beVietnamPro
- Mode: dark
- Roundness: rounded-md
. The logo should be visually consistent with these brand tokens." class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-label-sm text-label-sm tracking-widest uppercase text-secondary-fixed-dim">LifeOS Grimoire</span><span class="font-label-sm text-label-sm text-inverse-on-surface/60">Tome of Mastery • Vol. IV</span></div></div><div class="flex items-center gap-space-lg"><div class="hidden md:flex items-center gap-space-sm bg-cover-900/80 px-space-md py-1 rounded border border-outline/30"><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">auto_stories</span><span class="font-label-sm text-label-sm text-inverse-on-surface">Mana Core:</span><div class="w-24 h-2 bg-cover-900 rounded-full overflow-hidden border border-outline/40"><div class="w-3/4 h-full bg-mana-full"></div></div></div><div class="flex items-center gap-space-md pl-space-md border-l border-outline/20"><div class="hidden sm:flex flex-col text-right"><span class="font-label-sm text-label-sm text-inverse-on-surface font-semibold">Grand Scholar</span><span class="font-label-sm text-label-sm text-secondary-fixed-dim">Rank VII Adept</span></div><img alt="Profile" class="w-8 h-8 rounded-full object-cover ring-1 ring-secondary-container/50" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed left-0 top-14 bottom-10 w-64 bg-cover-900 z-40 flex flex-col border-r border-outline/30 shadow-[4px_0_16px_rgba(22,19,13,0.15)]"><div class="p-space-lg pb-space-sm"><div class="p-space-md rounded bg-cover-900/60 border border-outline/40 mb-space-md"><div class="flex items-center justify-between text-secondary-fixed-dim mb-space-xs"><span class="font-label-sm text-label-sm uppercase tracking-wider">Chronicle Cycle</span><span class="material-symbols-outlined text-base">hourglass_top</span></div><div class="font-headline-md text-body-lg text-inverse-on-surface font-bold">Day 142</div><div class="font-label-sm text-label-sm text-inverse-on-surface/70">Winter Solstice Arc</div></div></div><nav class="flex-1 px-space-md space-y-space-xs" data-active-classes="bg-accent text-on-primary font-bold shadow-[2px_2px_0_#16130D] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="today" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">menu_book</span>Today</a><a aria-current="page" class="flex items-center px-space-md py-space-sm rounded transition-all bg-accent text-on-primary font-bold shadow-[2px_2px_0_#16130D] translate-x-1" data-path="my-knowledge" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">account_tree</span>My Knowledge</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="roadmap" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">explore</span>Roadmap</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="companion" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">swords</span>Companion</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="progress" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">insights</span>Progress</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="settings" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">tune</span>Settings</a></nav><div class="p-space-md m-space-md rounded bg-cover-900 border border-outline/20 flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-secondary-container text-lg">shield</span><span class="font-label-sm text-label-sm text-inverse-on-surface">Aegis Seal Active</span></div><span class="font-label-sm text-label-sm text-mana-full font-bold">98%</span></div></aside><div class="pl-64"><main class="relative pt-14 pb-12 min-h-screen bg-page-base px-space-xl"><div class="flex flex-col w-full text-ink-900 font-body-base">
<div class="w-full bg-page-raised p-space-lg rounded shadow-[3px_3px_0_#16130D] mb-space-lg">
<div class="flex flex-wrap items-center justify-between gap-space-md mb-space-sm">
<div class="flex items-center gap-space-sm font-label-sm text-label-sm text-ink-700 tracking-wider uppercase">
<span class="material-symbols-outlined text-sm text-secondary">local_library</span>
<span class="">GRAND ARCHIVES</span>
<span class="text-secondary font-bold">/</span>
<span class="text-ink-900 font-bold">MAGICAL SKILL TREE</span>
</div>
<div class="flex items-center gap-space-xs bg-surface-container-high px-space-md py-1 rounded text-ink-900 font-label-sm text-label-sm shadow-[1px_1px_0_#16130D]">
<span class="material-symbols-outlined text-accent text-sm">flag_circle</span>
<span class="text-ink-700">Goal:</span>
<span class="font-bold text-accent">Build Document Q&amp;A Chatbot with RAG (Stage 1)</span>
</div>
</div>
<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
<div>
<div class="flex items-center gap-space-md">
<h1 class="font-headline-lg text-headline-lg text-ink-900 font-bold tracking-tight">My Knowledge</h1>
<span class="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container px-space-sm py-0.5 rounded font-label-sm text-label-sm font-bold shadow-[2px_2px_0_#16130D]">
<span class="material-symbols-outlined text-xs">military_tech</span>
            Tier 3: Scholar Adept
          </span>
</div>
<p class="font-body-base text-body-base text-ink-700 max-w-3xl mt-space-xs">
          Personal magic repository — Skill tree reflecting verified competencies backed by independent evidence. Click each sigil orb to inspect archived dossiers.
        </p>
</div>
<div class="flex flex-wrap items-center gap-space-sm">
<div class="relative">
<input class="bg-surface-container-low text-ink-900 placeholder:text-ink-700/60 font-body-base text-label-sm px-space-md py-1.5 pl-8 rounded shadow-[inset_1px_1px_2px_rgba(22,19,13,0.2)] focus:outline-none focus:bg-surface-container-lowest" placeholder="Search sigils, concepts..." type="text">
<span class="material-symbols-outlined text-sm text-ink-700 absolute left-2.5 top-2.5">search</span>
</div>
<div class="inline-flex rounded bg-surface-container-high p-0.5 shadow-[2px_2px_0_#16130D]">
<button class="px-space-sm py-1 bg-cover-900 text-surface-bright rounded font-label-sm text-label-sm flex items-center gap-1 transition-transform" id="view-tree">
<span class="material-symbols-outlined text-xs">account_tree</span>
            Tree View
          </button>
<button class="px-space-sm py-1 text-ink-700 hover:text-ink-900 rounded font-label-sm text-label-sm flex items-center gap-1" id="view-list">
<span class="material-symbols-outlined text-xs">format_list_bulleted</span>
            List View
          </button>
</div>
<div class="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded shadow-[2px_2px_0_#16130D]">
<button class="w-6 h-6 flex items-center justify-center text-ink-700 hover:text-ink-900 active:translate-x-0.5 active:translate-y-0.5" title="Zoom in">
<span class="material-symbols-outlined text-sm">zoom_in</span>
</button>
<button class="w-6 h-6 flex items-center justify-center text-ink-700 hover:text-ink-900 active:translate-x-0.5 active:translate-y-0.5" title="Zoom out">
<span class="material-symbols-outlined text-sm">zoom_out</span>
</button>
<button class="w-6 h-6 flex items-center justify-center text-ink-700 hover:text-ink-900 active:translate-x-0.5 active:translate-y-0.5" title="Center Tree">
<span class="material-symbols-outlined text-sm">filter_center_focus</span>
</button>
</div>
</div>
</div>
<div class="mt-space-md pt-space-sm flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
<div class="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm">
<span class="text-ink-700 font-bold mr-1 uppercase tracking-wider text-xs">RUBRIC TIERS:</span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-ink-700 shadow-[1px_1px_0_#16130D]">
<span class="w-2 h-2 rounded-full bg-ink-700/40"></span>
          Unassessed (?)
        </span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-on-secondary-container shadow-[1px_1px_0_#16130D]">
<span class="w-2 h-2 rounded-full bg-secondary-fixed-dim"></span>
          Self-Reported (0 pts)
        </span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-mana-full shadow-[1px_1px_0_#16130D]">
<span class="w-2 h-2 rounded-full bg-mana-full"></span>
          Foundational (40 pts)
        </span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-tertiary-container shadow-[1px_1px_0_#16130D]">
<span class="w-2 h-2 rounded-full bg-tertiary-container"></span>
          Basic Grasp (60 pts)
        </span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container text-tertiary shadow-[1px_1px_0_#16130D]">
<span class="w-2 h-2 rounded-full bg-tertiary"></span>
          Competent (80 pts)
        </span>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-secondary-container text-ink-900 font-bold shadow-[2px_2px_0_#16130D]">
<span class="material-symbols-outlined text-xs text-accent">verified</span>
          Mastered (85+ pts)
        </span>
</div>
<div class="flex items-center gap-space-md font-label-sm text-label-sm">
<label class="inline-flex items-center gap-space-xs cursor-pointer select-none">
<input checked="" class="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox">
<span class="text-ink-900 font-medium">Required for Goal</span>
</label>
<label class="inline-flex items-center gap-space-xs cursor-pointer select-none">
<input checked="" class="w-4 h-4 accent-primary rounded cursor-pointer" type="checkbox">
<span class="text-ink-900 font-medium">Prerequisites</span>
</label>
</div>
</div>
</div>
<div class="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
<div class="xl:col-span-8 bg-page-raised rounded shadow-[3px_3px_0_#16130D] p-space-lg relative overflow-hidden">
<div class="absolute right-4 top-4 pointer-events-none opacity-20">
<span class="material-symbols-outlined text-8xl text-ink-900">explore</span>
</div>
<div class="flex items-center justify-between mb-space-md">
<div class="flex items-center gap-space-xs">
<span class="w-2.5 h-2.5 rounded-full bg-mana-full"></span>
<span class="font-label-sm text-label-sm text-ink-700 tracking-wider uppercase font-bold">VISUAL COMPETENCY MATRIX</span>
</div>
<div class="font-label-sm text-label-sm text-ink-700 italic">
          Last assessed: 23/09/2026
        </div>
</div>
<div class="relative w-full h-[620px] bg-page-base rounded shadow-[inset_2px_2px_4px_rgba(22,19,13,0.15)] flex flex-col justify-between p-space-lg select-none">
<svg class="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="manaBranch" x1="0%" x2="0%" y1="100%" y2="0%">
<stop offset="0%" stop-color="#2A2419" stop-opacity="0.8"></stop>
<stop offset="60%" stop-color="#785a00" stop-opacity="0.9"></stop>
<stop offset="100%" stop-color="#3F6B45" stop-opacity="0.8"></stop>
</linearGradient>
<marker id="inkArrow" markerHeight="6" markerWidth="6" orient="auto" refX="4" refY="3">
<path d="M0,0 L6,3 L0,6 Z" fill="#2A2419"></path>
</marker>
</defs>
<path d="M 400 550 C 400 480, 240 460, 240 390" fill="none" stroke="#2A2419" stroke-linecap="round" stroke-width="3"></path>
<path d="M 400 550 C 400 480, 560 460, 560 390" fill="none" stroke="#2A2419" stroke-linecap="round" stroke-width="3"></path>
<path d="M 240 330 C 240 280, 180 260, 180 200" fill="none" stroke="#785a00" stroke-dasharray="5 4" stroke-linecap="round" stroke-width="2.5"></path>
<path d="M 240 330 C 240 280, 360 260, 360 200" fill="none" stroke="#3F6B45" stroke-linecap="round" stroke-width="3"></path>
<path d="M 560 330 C 560 280, 380 260, 360 200" fill="none" stroke="#2A2419" stroke-linecap="round" stroke-width="2"></path>
<path d="M 180 140 C 180 100, 280 80, 280 40" fill="none" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2"></path>
<path d="M 360 140 C 360 90, 290 80, 280 40" fill="none" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2"></path>
<path d="M 360 140 C 360 90, 480 80, 480 40" fill="none" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2"></path>
</svg>
<div class="relative z-10 flex justify-around items-center pt-2">
<div class="flex flex-col items-center group cursor-pointer">
<div class="w-16 h-16 rounded-full bg-surface-container-highest shadow-[2px_2px_0_#16130D] flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-ink-700 text-lg">lock</span>
<span class="font-label-sm text-[10px] text-ink-700 uppercase font-bold">Locked</span>
</div>
<div class="mt-space-xs text-center">
<div class="font-body-base text-label-sm font-bold text-ink-700">Vector Retrieval</div>
<span class="inline-block bg-surface-container px-1.5 py-0.2 rounded text-[10px] text-ink-700/80 shadow-[1px_1px_0_#16130D]">Unassessed</span>
</div>
</div>
<div class="flex flex-col items-center group cursor-pointer">
<div class="w-16 h-16 rounded-full bg-surface-container-highest shadow-[2px_2px_0_#16130D] flex flex-col items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
<span class="material-symbols-outlined text-ink-700 text-lg">lock</span>
<span class="font-label-sm text-[10px] text-ink-700 uppercase font-bold">Locked</span>
</div>
<div class="mt-space-xs text-center">
<div class="font-body-base text-label-sm font-bold text-ink-700">RAG Evaluation (Eval)</div>
<span class="inline-block bg-surface-container px-1.5 py-0.2 rounded text-[10px] text-ink-700/80 shadow-[1px_1px_0_#16130D]">Ultimate Goal</span>
</div>
</div>
</div>
<div class="relative z-10 flex justify-around items-center px-space-md">
<div class="flex flex-col items-center group cursor-pointer -ml-8">
<div class="w-20 h-20 rounded-full bg-surface-container-high shadow-[3px_3px_0_#16130D] flex flex-col items-center justify-center transition-transform hover:scale-105">
<span class="material-symbols-outlined text-secondary text-base">difference</span>
<span class="font-anton text-body-lg font-black text-ink-900 leading-none mt-0.5">00</span>
<span class="font-label-sm text-[10px] text-secondary font-bold uppercase">SELF-REPORTED</span>
</div>
<div class="mt-space-xs text-center">
<div class="font-body-base text-label-sm font-bold text-ink-900">Text Chunking</div>
<span class="inline-block bg-secondary-fixed text-on-secondary-fixed px-1.5 py-0.2 rounded text-[10px] font-bold shadow-[1px_1px_0_#16130D]">Needs assessment</span>
</div>
</div>
<div class="flex flex-col items-center group cursor-pointer ml-12">
<div class="w-20 h-20 rounded-full bg-surface-container-high shadow-[3px_3px_0_#16130D] flex flex-col items-center justify-center transition-transform hover:scale-105">
<span class="material-symbols-outlined text-mana-full text-base">grain</span>
<span class="font-anton text-body-lg font-black text-mana-full leading-none mt-0.5">40</span>
<span class="font-label-sm text-[10px] text-mana-full font-bold uppercase">FOUNDATIONAL</span>
</div>
<div class="mt-space-xs text-center">
<div class="font-body-base text-label-sm font-bold text-ink-900">Embeddings &amp; Vectors</div>
<span class="inline-block bg-surface-container px-1.5 py-0.2 rounded text-[10px] text-ink-700 shadow-[1px_1px_0_#16130D]">1 practical exercise</span>
</div>
</div>
</div>
<div class="relative z-10 flex justify-around items-center px-space-xl">
<div class="flex flex-col items-center group cursor-pointer relative" id="node-python">
<div class="absolute -top-3 -right-2 bg-accent text-on-primary text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shadow-[1px_1px_0_#16130D] z-20">
              Selected
            </div>
<div class="w-24 h-24 rounded-full bg-secondary-container shadow-[4px_4px_0_#16130D] flex flex-col items-center justify-center transition-all scale-105">
<span class="material-symbols-outlined text-primary text-xl">terminal</span>
<span class="font-anton text-headline-md font-black text-ink-900 leading-none">88</span>
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">MASTERED</span>
</div>
<div class="mt-space-xs text-center max-w-[150px]">
<div class="font-body-base text-body-base font-bold text-ink-900 leading-snug">Python &amp; Files</div>
<div class="inline-flex items-center gap-0.5 bg-page-raised px-1.5 py-0.5 rounded text-[11px] font-semibold text-mana-full shadow-[1px_1px_0_#16130D] mt-0.5">
<span class="material-symbols-outlined text-xs">verified</span>
                2 evidence records
              </div>
</div>
</div>
<div class="flex flex-col items-center group cursor-pointer">
<div class="w-22 h-22 rounded-full bg-surface-container-high shadow-[3px_3px_0_#16130D] flex flex-col items-center justify-center transition-transform hover:scale-105 p-3">
<span class="material-symbols-outlined text-tertiary text-lg">api</span>
<span class="font-anton text-headline-md font-black text-ink-900 leading-none">60</span>
<span class="font-label-sm text-label-sm text-tertiary font-bold uppercase">BASIC GRASP</span>
</div>
<div class="mt-space-xs text-center max-w-[140px]">
<div class="font-body-base text-label-sm font-bold text-ink-900 leading-snug">HTTP, REST &amp; API</div>
<div class="inline-flex items-center gap-0.5 bg-page-raised px-1.5 py-0.5 rounded text-[11px] text-ink-700 shadow-[1px_1px_0_#16130D] mt-0.5">
<span class="material-symbols-outlined text-xs">quiz</span>
                1 quiz assessed
              </div>
</div>
</div>
</div>
<div class="relative z-10 flex flex-col items-center self-center pt-2">
<div class="bg-page-raised px-space-md py-space-xs rounded shadow-[3px_3px_0_#16130D] flex items-center gap-space-sm cursor-default">
<div class="w-8 h-8 rounded bg-cover-900 text-secondary-fixed-dim flex items-center justify-center">
<span class="material-symbols-outlined text-sm">nature_people</span>
</div>
<div>
<div class="font-label-sm text-label-sm text-ink-700 uppercase tracking-widest leading-none font-bold">Knowledge Core</div>
<div class="font-headline-md text-label-sm font-bold text-ink-900 leading-tight">Mage Minh • Origin</div>
</div>
<span class="material-symbols-outlined text-accent text-sm ml-1">stars</span>
</div>
</div>
</div>
<div class="mt-space-md flex flex-wrap items-center justify-between gap-space-md font-label-sm text-label-sm text-ink-700">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-accent text-sm">shield</span>
<span class="">Pact: Competency scores verified via source code testing and timed assessments.</span>
</div>
<div class="font-bold text-ink-900">
          Goal coverage: <span class="text-accent">45%</span>
</div>
</div>
</div>
<div class="xl:col-span-4 flex flex-col gap-space-md"><div class="bg-page-raised rounded shadow-[3px_3px_0_#16130D] p-space-lg relative overflow-hidden">
<div class="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm border-b border-outline/20 mb-space-md">
<div>
<div class="flex items-center gap-space-xs mb-0.5">
<span class="material-symbols-outlined text-secondary text-sm">account_tree</span>
<h3 class="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">PERSONAL KNOWLEDGE TREE OVERVIEW</h3>
<span class="bg-secondary-container text-ink-900 px-1.5 py-0.2 rounded text-[10px] font-bold shadow-[1px_1px_0_#16130D]">Overview</span>
</div>
<p class="font-body-base text-[12px] text-ink-700">Summary of core arcane competencies across the Leyline Tree</p>
</div>
<div class="font-label-sm text-label-sm text-ink-700"><span class="font-bold text-ink-900">4</span> Sigils Tracked</div>
</div>
<div class="space-y-space-md">
<div class="bg-surface-container-low p-space-sm rounded shadow-[1px_1px_0_#16130D]">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-mana-full text-base">terminal</span>
<span class="font-body-base text-label-sm font-bold text-ink-900">Advanced Python</span>
</div>
<span class="inline-flex items-center gap-1 bg-secondary-container text-ink-900 px-space-sm py-0.2 rounded text-[11px] font-bold shadow-[1px_1px_0_#16130D]">
<span class="material-symbols-outlined text-[12px] text-accent">verified</span>Mastered • 88 pts
</span>
</div>
<div class="w-full h-2 bg-cover-900/40 rounded-full overflow-hidden border border-outline/30">
<div class="h-full bg-mana-full rounded-full" style="width: 88%;"></div>
</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded shadow-[1px_1px_0_#16130D]">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-tertiary text-base">api</span>
<span class="font-body-base text-label-sm font-bold text-ink-900">HTTP &amp; API</span>
</div>
<span class="inline-flex items-center gap-1 bg-surface-container text-tertiary px-space-sm py-0.2 rounded text-[11px] font-bold shadow-[1px_1px_0_#16130D]">Basic Grasp • 60 pts</span>
</div>
<div class="w-full h-2 bg-cover-900/40 rounded-full overflow-hidden border border-outline/30">
<div class="h-full bg-tertiary-container rounded-full" style="width: 60%;"></div>
</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded shadow-[1px_1px_0_#16130D]">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-mana-full text-base">grain</span>
<span class="font-body-base text-label-sm font-bold text-ink-900">Embeddings &amp; Vector</span>
</div>
<span class="inline-flex items-center gap-1 bg-surface-container text-mana-full px-space-sm py-0.2 rounded text-[11px] font-bold shadow-[1px_1px_0_#16130D]">Foundational • 40 pts</span>
</div>
<div class="w-full h-2 bg-cover-900/40 rounded-full overflow-hidden border border-outline/30">
<div class="h-full bg-accent rounded-full" style="width: 40%;"></div>
</div>
</div>
<div class="bg-surface-container-low p-space-sm rounded shadow-[1px_1px_0_#16130D]">
<div class="flex items-center justify-between mb-1">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-secondary text-base">difference</span>
<span class="font-body-base text-label-sm font-bold text-ink-900">Text Chunking &amp; RAG</span>
</div>
<span class="inline-flex items-center gap-1 bg-secondary-fixed text-on-secondary-fixed px-space-sm py-0.2 rounded text-[11px] font-bold shadow-[1px_1px_0_#16130D]">Self-Reported • 0 pts</span>
</div>
<div class="w-full h-2 bg-cover-900/40 rounded-full overflow-hidden border border-outline/30">
<div class="h-full bg-secondary-fixed-dim/60 rounded-full" style="width: 15%;"></div>
</div>
</div>
</div>
<div class="mt-space-md pt-space-sm border-t border-outline/20 flex flex-col gap-space-sm">
<div class="flex items-center gap-space-xs text-[12px] text-ink-700">
<span class="material-symbols-outlined text-sm text-accent">info</span>
<span class="">Continuous audit verified via practical tasks &amp; automated test suites.</span>
</div>
<button class="w-full bg-surface-container hover:bg-surface-container-high text-ink-900 px-space-md py-1.5 rounded font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 shadow-[2px_2px_0_#16130D] active:translate-x-0.5 active:translate-y-0.5 transition-all">
<span class="material-symbols-outlined text-xs">visibility</span>Inspect All Mastery Nodes
</button>
</div>
</div>
<div class="bg-surface-container-low rounded shadow-[3px_3px_0_#16130D] p-space-md">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-[11px] text-secondary font-bold uppercase tracking-wider flex items-center gap-1">
<span class="material-symbols-outlined text-xs">notification_important</span>
            BOTTLENECK TO UNLOCK
          </span>
<span class="bg-surface-container px-1 py-0.2 rounded text-[10px] text-ink-700">Self-Reported</span>
</div>
<h3 class="font-body-base text-label-sm font-bold text-ink-900">
          Text Chunking
        </h3>
<p class="font-body-base text-[12px] text-ink-700 mt-1 mb-space-sm leading-normal">
          You have not submitted evidence for this skill yet. This is a prerequisite to unlock Vector Retrieval.
        </p>
<button class="w-full bg-secondary-container text-ink-900 py-1.5 px-space-sm rounded font-label-sm text-label-sm font-bold flex items-center justify-center gap-1 shadow-[2px_2px_0_#16130D] active:translate-x-0.5 active:translate-y-0.5">
<span class="material-symbols-outlined text-xs">timer</span>
          Quick Diagnostic Assessment (5 min)
        </button>
</div></div>
</div>
</div>
<script>
  // Simple micro-interaction for tab toggling without layout shift
  const btnTree = document.getElementById('view-tree');
  const btnList = document.getElementById('view-list');
  if (btnTree && btnList) {
    btnList.addEventListener('click', () => {
      btnList.classList.add('bg-cover-900', 'text-surface-bright');
      btnList.classList.remove('text-ink-700');
      btnTree.classList.remove('bg-cover-900', 'text-surface-bright');
      btnTree.classList.add('text-ink-700');
    });
    btnTree.addEventListener('click', () => {
      btnTree.classList.add('bg-cover-900', 'text-surface-bright');
      btnTree.classList.remove('text-ink-700');
      btnList.classList.remove('bg-cover-900', 'text-surface-bright');
      btnList.classList.add('text-ink-700');
    });
  }
</script></main></div><footer class="fixed bottom-0 left-0 right-0 h-10 bg-cover-900 z-50 border-t border-outline/30 px-space-lg flex items-center justify-between text-inverse-on-surface/70"><div class="flex items-center gap-space-md"><span class="inline-block w-2 h-2 rounded-full bg-mana-full animate-pulse"></span><span class="font-label-sm text-label-sm tracking-wide">Tome Synchronized • Shounen Engine v2.4</span></div><div class="flex items-center gap-space-lg font-label-sm text-label-sm"><span class="text-secondary-fixed-dim hover:underline cursor-pointer">Grimoire Manuscript</span><span class="">•</span><span class="">Sanctum ID: #8820-EX</span></div></footer>
</body></html>
````

## File: design/asset/personal_rank_grimoire_milestones_chronicle_en/code.html
````html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,400&amp;family=Anton&amp;family=Grenze+Gotisch:wght@600;700;800;900&amp;family=Marcellus&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-container": "#ffd576", "on-tertiary-container": "#c8e4ff", "inverse-primary": "#ffb4a3", "on-primary-fixed-variant": "#891d04", "surface-container-lowest": "#ffffff", "surface": "#fff9ed", "on-secondary": "#ffffff", "surface-tint": "#ab351a", "background": "#fff9ed", "cover-900": "#16130D", "cover-800": "#211C14", "mana-full": "#3F6B45", "page-raised": "#F6F0DE", "on-error-container": "#93000a", "surface-container-highest": "#eae2cb", "primary": "#912208", "accent": "#B23A1F", "tertiary-fixed-dim": "#91cdff", "tertiary-container": "#00699e", "outline": "#8c716b", "on-primary-container": "#ffd8d0", "surface-variant": "#eae2cb", "primary-fixed-dim": "#ffb4a3", "on-error": "#ffffff", "surface-dim": "#e1dac3", "tertiary": "#00507a", "on-tertiary-fixed-variant": "#004b72", "on-tertiary": "#ffffff", "inverse-surface": "#343021", "primary-fixed": "#ffdad2", "ink-700": "#4A4030", "on-secondary-fixed-variant": "#5b4300", "secondary-fixed-dim": "#eac165", "tertiary-fixed": "#cce5ff", "primary-container": "#b23a1f", "error": "#ba1a1a", "on-secondary-container": "#795a00", "surface-container-low": "#fbf3dc", "on-surface": "#1f1c0e", "on-secondary-fixed": "#251a00", "on-tertiary-fixed": "#001e31", "secondary-fixed": "#ffdf9b", "error-container": "#ffdad6", "on-background": "#1f1c0e", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "surface-container": "#f6eed6", "surface-container-high": "#f0e8d1", "on-surface-variant": "#58413c", "inverse-on-surface": "#f9f0d9", "secondary": "#785a00", "outline-variant": "#e0bfb8", "on-primary-fixed": "#3d0600", "on-primary": "#ffffff", "ink-900": "#2A2419" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem", "gutter": "1rem", "space-md": "16px", "space-lg": "24px", "space-2xl": "48px", "space-sm": "8px", "space-3xl": "64px" }, "fontFamily": { "body-base": [ "Literata", "serif" ], "headline-md": [ "Literata", "serif" ], "headline-display": [ "Literata", "serif" ], "headline-lg": [ "Literata", "serif" ], "label-sm": [ "Literata", "serif" ], "body-lg": [ "Literata", "serif" ], "gotisch": [ "Grenze Gotisch", "serif" ], "anton": [ "Anton", "sans-serif" ], "marcellus": [ "Marcellus", "serif" ] }, "fontSize": { "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ] } } } };</script></head><body class="bg-page-base font-body-base text-ink-900 antialiased selection:bg-secondary-container selection:text-ink-900"><header class="fixed top-0 left-0 right-0 h-14 bg-cover-900 z-50 shadow-[0_4px_12px_rgba(22,19,13,0.35)]"><div class="h-14 w-full px-space-lg flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-lg shrink-0"><div class="flex items-center gap-space-sm"><img alt="Arcana Grimoire Academy Insignia" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-marcellus text-label-sm tracking-widest uppercase text-secondary-fixed-dim leading-none">LifeOS</span><span class="font-gotisch text-body-lg text-inverse-on-surface leading-tight font-bold tracking-wide">Arcana Grimoire Academy</span></div></div><div class="hidden xl:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419] cursor-pointer hover:bg-cover-800/80 transition-all"><span class="font-marcellus text-label-sm text-secondary-fixed-dim uppercase tracking-wider">Active Quest:</span><span class="font-body-base text-label-sm text-inverse-on-surface font-semibold max-w-[260px] truncate">Build Document Q&amp;A Chatbot with RAG</span><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">expand_more</span></div></div><div class="flex items-center gap-space-md shrink-0"><div class="hidden sm:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419]"><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">military_tech</span><span class="font-marcellus text-label-sm text-inverse-on-surface font-semibold">Minh · Apprentice Scribe</span><span class="font-anton text-label-sm text-secondary-fixed-dim tracking-wider">(Lvl 3 · 250 XP)</span></div><button class="relative p-space-xs text-inverse-on-surface hover:text-secondary-fixed-dim transition-colors rounded" title="Grimoire Whispers"><span class="material-symbols-outlined text-xl">notifications</span><span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent ring-2 ring-cover-900 animate-pulse"></span></button><div class="flex items-center bg-cover-800 rounded px-2 py-0.5 shadow-[2px_2px_0_#2A2419]"><span class="inline-block w-1.5 h-1.5 rounded-full bg-mana-full mr-1.5"></span><span class="font-anton text-label-sm tracking-wider text-secondary-fixed-dim">EN</span></div><div class="flex items-center pl-space-xs"><img alt="Minh Avatar" class="w-8 h-8 rounded-full object-cover ring-2 ring-secondary-fixed-dim shadow-[2px_2px_0_#2A2419]" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed left-0 top-14 bottom-10 w-64 bg-cover-900 z-40 flex flex-col shadow-[4px_0_16px_rgba(22,19,13,0.25)]"><div class="p-space-lg pb-space-sm"><div class="p-space-md rounded bg-cover-800 shadow-[3px_3px_0_#2A2419] mb-space-md"><div class="flex items-center justify-between text-secondary-fixed-dim mb-space-xs"><span class="font-marcellus text-label-sm uppercase tracking-wider">Chronicle Cycle</span><span class="material-symbols-outlined text-base">hourglass_top</span></div><div class="font-anton text-body-lg text-inverse-on-surface tracking-wide">Day 142</div><div class="font-marcellus text-label-sm text-inverse-on-surface/70">Winter Solstice Arc</div></div></div><nav class="flex-1 px-space-md space-y-space-xs" data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="today" href="#">Today</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="my-knowledge" href="#">My Knowledge</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="roadmap" href="#">Roadmap</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="companion" href="#">Companion</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="quests" href="#">Quests</a><a class="flex items-center justify-between px-space-md py-space-sm rounded bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] transition-all" data-path="milestones-rank" href="#"><span class="">Milestones / Rank</span><span class="material-symbols-outlined text-sm text-secondary-fixed-dim">military_tech</span></a></nav><div class="px-space-md pb-space-md"><nav data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="settings" href="#">Settings</a></nav></div></aside><div class="pl-64"><main class="relative pt-14 pb-12 min-h-screen bg-page-base px-space-xl"><div class="flex flex-col w-full max-w-[1240px] mx-auto py-space-lg space-y-space-xl">
<section class="relative bg-page-raised rounded-xl shadow-xl overflow-hidden p-space-xl">
<div class="relative flex flex-col md:flex-row items-center gap-space-xl z-10">
<div class="relative shrink-0 flex items-center justify-center">
<div class="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-cover-900/10 flex items-center justify-center p-2 shadow-inner">
<img alt="Personal Growth Rank Seal · Arcana Grimoire" class="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none" src="https://lh3.googleusercontent.com/aida/AEtjO1XXD1GCVKusCot8XsmnjqH0WzhUBcSOeUFpE8Wu_Tkuz-5H6u310ceQHTkOqK2FoeaGhcaZMsaDi5T1aHesItbeq6OtMTrUrrAXv3dSufUQKPDV1DwaKguDdZ0u7tvijDu2PrIdB9IGkEEd7UzVGZk1HbMogjjpb_Iy6E9oR65b0EYF5emRXTNGar3qKohrkElfd5IHwo4qXF20gK-cbCJ3UZTD4AQB1FfjP-p4YedePhxnOsqOAOiE9OE">
</div>
</div>
<div class="flex-1 flex flex-col text-center md:text-left space-y-space-sm">
<div class="inline-flex items-center self-center md:self-start gap-space-xs px-space-md py-1 bg-surface-container-high text-secondary rounded-full shadow-sm">
<span class="material-symbols-outlined text-base" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
<span class="font-label-sm text-label-sm uppercase tracking-widest font-semibold">Tome of Personal Mastery</span>
</div>
<h1 class="font-headline-lg text-headline-lg text-ink-900 leading-tight">
          Chronicle of Personal Competencies &amp; Domains
        </h1>
<p class="font-body-base text-body-base text-ink-700 max-w-3xl">
          Permanent milestone ranks reflecting conversational understanding and hands-on practice. Ranks never decay with inactivity and have no competitive leaderboards.
        </p>
<div class="pt-space-xs flex flex-wrap items-center justify-center md:justify-start gap-space-md">
<div class="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg shadow-sm">
<span class="material-symbols-outlined text-mana-full text-base">verified</span>
<span class="font-label-sm text-label-sm text-ink-900">Sovereign Evidence Ledger</span>
</div>
<div class="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg shadow-sm">
<span class="material-symbols-outlined text-secondary text-base">all_inclusive</span>
<span class="font-label-sm text-label-sm text-ink-900">Non-Decaying Milestones</span>
</div>
<div class="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg shadow-sm">
<span class="material-symbols-outlined text-tertiary text-base">lock_open</span>
<span class="font-label-sm text-label-sm text-ink-900">Full Scholar Agency</span>
</div>
</div>
</div>
</div>
</section>
<section class="flex flex-col space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-xl">auto_stories</span>
<h2 class="font-headline-md text-headline-md text-ink-900">Mastery Codex Domains</h2>
</div>
<span class="font-label-sm text-label-sm text-ink-700 tracking-wide">2 Attuned Codexes</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<button class="group text-left relative bg-surface-container-high rounded-xl p-space-md shadow-md transition-all cursor-pointer" type="button">
<div class="flex items-start justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center shadow">
<span class="material-symbols-outlined text-xl">terminal</span>
</div>
<div>
<div class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Active Domain</div>
<div class="font-headline-md text-body-lg text-ink-900 font-bold">Foundational Programming</div>
</div>
</div>
<span class="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Rank 1 Attained</span>
</div>
<div class="mt-space-sm flex items-center justify-between text-ink-700 font-label-sm text-label-sm">
<span class="">Python · Syntax · Data Structures</span>
<span class="text-primary font-bold flex items-center gap-0.5">Exploring Rank 2 <span class="material-symbols-outlined text-sm">arrow_forward</span></span>
</div>
</button>
<button class="group text-left relative bg-page-raised rounded-xl p-space-md shadow-sm hover:shadow-md transition-all opacity-85 hover:opacity-100 cursor-pointer" type="button">
<div class="flex items-start justify-between">
<div class="flex items-center gap-space-sm">
<div class="w-10 h-10 rounded-lg bg-surface-container text-tertiary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-xl">hub</span>
</div>
<div>
<div class="font-label-sm text-label-sm text-ink-700 uppercase font-semibold tracking-wider">Auxiliary Domain</div>
<div class="font-headline-md text-body-lg text-ink-900 font-bold">RAG Systems &amp; Architectures</div>
</div>
</div>
<span class="px-space-sm py-0.5 rounded-full bg-surface-container text-ink-700 font-label-sm text-label-sm font-semibold">Rank 0 In Sight</span>
</div>
<div class="mt-space-sm flex items-center justify-between text-ink-700 font-label-sm text-label-sm">
<span class="">Vector Embeddings · Chunking · Retrievers</span>
<span class="font-semibold text-secondary flex items-center gap-0.5">Switch Codex <span class="material-symbols-outlined text-sm">swap_horiz</span></span>
</div>
</button>
</div>
</section>
<section class="bg-page-raised rounded-xl shadow-lg p-space-xl flex flex-col space-y-space-xl">
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div class="space-y-space-xs">
<div class="flex items-center gap-space-sm">
<span class="px-space-md py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold tracking-wider uppercase">
            Current Milestone
          </span>
<span class="font-label-sm text-label-sm text-mana-full font-bold flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-mana-full inline-block animate-pulse"></span>
            Verified across multi-session dialogues
          </span>
</div>
<h3 class="font-headline-display text-headline-display text-ink-900 font-black tracking-tight">
          Rank 1: INITIATION <span class="font-body-lg text-headline-md text-ink-700 font-normal ml-2">(R1 Initiation)</span>
</h3>
<p class="font-body-base text-body-base text-ink-700 max-w-2xl">
          Demonstrated grasp of execution flow, synchronous operations, fundamental structures, and reproducible debugging patterns in Python.
        </p>
</div>
<div class="bg-surface-container rounded-xl p-space-md flex flex-col justify-between shrink-0 shadow-sm max-w-sm">
<div class="flex items-center justify-between gap-space-md">
<span class="font-label-sm text-label-sm text-ink-700 uppercase tracking-wider font-semibold">Target Horizon</span>
<span class="font-label-sm text-label-sm text-primary font-bold">In Discovery</span>
</div>
<div class="mt-space-xs">
<div class="font-headline-md text-body-lg text-ink-900 font-bold">Rank 2: CONNECTION (R2 Linkage)</div>
<p class="font-body-base text-label-sm text-ink-700 mt-1">
            Linking independent modules, multi-stage pipelines, and external integrations with disciplined error bounds.
          </p>
</div>
</div>
</div>
<div class="flex flex-col space-y-space-sm pt-space-xs">
<div class="flex items-center justify-between">
<span class="font-label-sm text-label-sm text-ink-900 uppercase tracking-wider font-bold">Progressive Ascension Arc</span>
<span class="font-label-sm text-label-sm text-ink-700">1 of 4 Tiers Sealed</span>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm pt-space-xs">
<div class="flex flex-col bg-surface-container rounded-lg p-space-md shadow-sm opacity-60">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm font-bold text-ink-700">R0</span>
<span class="material-symbols-outlined text-ink-700 text-lg">check_circle</span>
</div>
<div class="font-headline-md text-body-base font-bold text-ink-900">Unobserved</div>
<p class="font-body-base text-label-sm text-ink-700 mt-1">Pre-inquiry state before systematic exchanges.</p>
<div class="mt-space-md h-1.5 w-full bg-cover-900/10 rounded-full overflow-hidden">
<div class="h-full bg-ink-700 w-full"></div>
</div>
</div>
<div class="flex flex-col bg-surface-container-high rounded-lg p-space-md shadow-md relative">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm font-bold text-primary">R1 · ACTIVE</span>
<span class="material-symbols-outlined text-primary text-xl" style="font-variation-settings: 'FILL' 1;">military_tech</span>
</div>
<div class="font-headline-md text-body-base font-bold text-ink-900">Initiation</div>
<p class="font-body-base text-label-sm text-ink-900 mt-1 font-medium">Achieved &amp; Sealed across dialogue evidence.</p>
<div class="mt-space-md h-1.5 w-full bg-cover-900/10 rounded-full overflow-hidden">
<div class="h-full bg-primary w-full"></div>
</div>
</div>
<div class="flex flex-col bg-surface-container rounded-lg p-space-md shadow-sm">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm font-bold text-secondary">R2</span>
<span class="material-symbols-outlined text-secondary text-lg">sync</span>
</div>
<div class="font-headline-md text-body-base font-bold text-ink-900">Connection</div>
<p class="font-body-base text-label-sm text-ink-700 mt-1">In Discovery: Synthesizing concepts into composite workflows.</p>
<div class="mt-space-md h-1.5 w-full bg-cover-900/10 rounded-full overflow-hidden">
<div class="h-full bg-secondary w-2/5"></div>
</div>
</div>
<div class="flex flex-col bg-surface-container rounded-lg p-space-md shadow-sm opacity-70">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm font-bold text-ink-700">R3</span>
<span class="material-symbols-outlined text-ink-700 text-lg">lock</span>
</div>
<div class="font-headline-md text-body-base font-bold text-ink-900">Application</div>
<p class="font-body-base text-label-sm text-ink-700 mt-1">Production-ready autonomous composition without guidance.</p>
<div class="mt-space-md h-1.5 w-full bg-cover-900/10 rounded-full overflow-hidden">
<div class="h-full bg-cover-900/20 w-0"></div>
</div>
</div>
<div class="flex flex-col bg-surface-container rounded-lg p-space-md shadow-sm opacity-70">
<div class="flex items-center justify-between mb-space-xs">
<span class="font-label-sm text-label-sm font-bold text-ink-700">R4</span>
<span class="material-symbols-outlined text-ink-700 text-lg">lock</span>
</div>
<div class="font-headline-md text-body-base font-bold text-ink-900">Reflection</div>
<p class="font-body-base text-label-sm text-ink-700 mt-1">Teaching, evaluating tradeoffs, and mentoring fellow scribes.</p>
<div class="mt-space-md h-1.5 w-full bg-cover-900/10 rounded-full overflow-hidden">
<div class="h-full bg-cover-900/20 w-0"></div>
</div>
</div>
</div>
</div>
</section>
<section class="flex flex-col space-y-space-md pt-space-md">
<div class="flex items-center gap-space-xs">
<span class="material-symbols-outlined text-primary text-xl">balance</span>
<h2 class="font-headline-md text-headline-md text-ink-900">Grimoire Principles of Autonomy</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div class="bg-page-raised rounded-xl p-space-lg shadow-md flex flex-col justify-between space-y-space-md">
<div class="space-y-space-sm">
<div class="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-2xl">hourglass_disabled</span>
</div>
<h3 class="font-headline-md text-body-lg text-ink-900 font-bold">No Rank Decay</h3>
<p class="font-body-base text-body-base text-ink-700">
            Taking a break for three weeks or six months preserves your attained rank entirely upon return. Competency earned is permanent knowledge, never subjected to streak penalties or decay algorithms.
          </p>
</div>
<div class="pt-space-xs font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-sm">shield</span> Non-perishable seal
        </div>
</div>
<div class="bg-page-raised rounded-xl p-space-lg shadow-md flex flex-col justify-between space-y-space-md">
<div class="space-y-space-sm">
<div class="w-12 h-12 rounded-xl bg-surface-container-high text-secondary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-2xl">psychology_alt</span>
</div>
<h3 class="font-headline-md text-body-lg text-ink-900 font-bold">Natural Inquiry Welcomed</h3>
<p class="font-body-base text-body-base text-ink-700">
            Asking basic, exploratory, or naive questions never penalizes or lowers your rank. The Grimoire views clarification seeking as an act of intellectual bravery rather than regression.
          </p>
</div>
<div class="pt-space-xs font-label-sm text-label-sm text-secondary font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-sm">favorite</span> Pure curiosity encouraged
        </div>
</div>
<div class="bg-page-raised rounded-xl p-space-lg shadow-md flex flex-col justify-between space-y-space-md">
<div class="space-y-space-sm">
<div class="w-12 h-12 rounded-xl bg-surface-container-high text-tertiary flex items-center justify-center shadow-sm">
<span class="material-symbols-outlined text-2xl">account_tree</span>
</div>
<h3 class="font-headline-md text-body-lg text-ink-900 font-bold">Sovereign Control</h3>
<p class="font-body-base text-body-base text-ink-700">
            If you delete a conversation or purge a memory block, affected evidentiary links are cleanly re-calculated with full transparency. You remain the absolute custodian of your record.
          </p>
</div>
<div class="pt-space-xs font-label-sm text-label-sm text-tertiary font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-sm">tune</span> Full editorial oversight
        </div>
</div>
</div>
</section>
</div></main></div><footer class="fixed bottom-0 left-0 right-0 h-10 bg-cover-900 z-50 shadow-[0_-2px_10px_rgba(22,19,13,0.25)] px-space-lg flex items-center justify-between text-inverse-on-surface/70"><div class="flex items-center gap-space-md"><span class="inline-block w-2 h-2 rounded-full bg-mana-full animate-pulse"></span><span class="font-marcellus text-label-sm tracking-wide">Tome Synchronized • Shounen Engine v2.4</span></div><div class="flex items-center gap-space-lg font-marcellus text-label-sm"><span class="text-secondary-fixed-dim hover:underline cursor-pointer">Grimoire Draft</span><span class="">•</span><span class="">Sanctum ID: #8820-EX</span></div></footer>
</body></html>
````

## File: design/asset/quest_detail_test_embeddings_with_5_passages_en/code.html
````html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,400&amp;family=Anton&amp;family=Grenze+Gotisch:wght@600;700;800;900&amp;family=Marcellus&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-container": "#ffd576", "on-tertiary-container": "#c8e4ff", "inverse-primary": "#ffb4a3", "on-primary-fixed-variant": "#891d04", "surface-container-lowest": "#ffffff", "surface": "#fff9ed", "on-secondary": "#ffffff", "surface-tint": "#ab351a", "background": "#fff9ed", "cover-900": "#16130D", "cover-800": "#211C14", "mana-full": "#3F6B45", "page-raised": "#F6F0DE", "on-error-container": "#93000a", "surface-container-highest": "#eae2cb", "primary": "#912208", "accent": "#B23A1F", "tertiary-fixed-dim": "#91cdff", "tertiary-container": "#00699e", "outline": "#8c716b", "on-primary-container": "#ffd8d0", "surface-variant": "#eae2cb", "primary-fixed-dim": "#ffb4a3", "on-error": "#ffffff", "surface-dim": "#e1dac3", "tertiary": "#00507a", "on-tertiary-fixed-variant": "#004b72", "on-tertiary": "#ffffff", "inverse-surface": "#343021", "primary-fixed": "#ffdad2", "ink-700": "#4A4030", "on-secondary-fixed-variant": "#5b4300", "secondary-fixed-dim": "#eac165", "tertiary-fixed": "#cce5ff", "primary-container": "#b23a1f", "error": "#ba1a1a", "on-secondary-container": "#795a00", "surface-container-low": "#fbf3dc", "on-surface": "#1f1c0e", "on-secondary-fixed": "#251a00", "on-tertiary-fixed": "#001e31", "secondary-fixed": "#ffdf9b", "error-container": "#ffdad6", "on-background": "#1f1c0e", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "surface-container": "#f6eed6", "surface-container-high": "#f0e8d1", "on-surface-variant": "#58413c", "inverse-on-surface": "#f9f0d9", "secondary": "#785a00", "outline-variant": "#e0bfb8", "on-primary-fixed": "#3d0600", "on-primary": "#ffffff", "ink-900": "#2A2419" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem", "gutter": "1rem", "space-md": "16px", "space-lg": "24px", "space-2xl": "48px", "space-sm": "8px", "space-3xl": "64px" }, "fontFamily": { "body-base": [ "Literata", "serif" ], "headline-md": [ "Literata", "serif" ], "headline-display": [ "Literata", "serif" ], "headline-lg": [ "Literata", "serif" ], "label-sm": [ "Literata", "serif" ], "body-lg": [ "Literata", "serif" ], "gotisch": [ "Grenze Gotisch", "serif" ], "anton": [ "Anton", "sans-serif" ], "marcellus": [ "Marcellus", "serif" ] }, "fontSize": { "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ] } } } };</script></head><body class="bg-page-base font-body-base text-ink-900 antialiased selection:bg-secondary-container selection:text-ink-900"><header class="fixed top-0 left-0 right-0 h-14 bg-cover-900 z-50 shadow-[0_4px_12px_rgba(22,19,13,0.35)]"><div class="h-14 w-full px-space-lg flex items-center justify-between gap-space-md"><div class="flex items-center gap-space-lg shrink-0"><div class="flex items-center gap-space-sm"><img alt="Arcana Grimoire Academy Insignia" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-marcellus text-label-sm tracking-widest uppercase text-secondary-fixed-dim leading-none">LifeOS</span><span class="font-gotisch text-body-lg text-inverse-on-surface leading-tight font-bold tracking-wide">Arcana Grimoire Academy</span></div></div><div class="hidden xl:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419] cursor-pointer hover:bg-cover-800/80 transition-all"><span class="font-marcellus text-label-sm text-secondary-fixed-dim uppercase tracking-wider">Active Quest:</span><span class="font-body-base text-label-sm text-inverse-on-surface font-semibold max-w-[260px] truncate">Build Document Q&amp;A Chatbot with RAG</span><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">expand_more</span></div></div><div class="flex items-center gap-space-md shrink-0"><div class="hidden sm:flex items-center gap-space-sm bg-cover-800 px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419]"><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">military_tech</span><span class="font-marcellus text-label-sm text-inverse-on-surface font-semibold">Minh · Apprentice Scribe</span><span class="font-anton text-label-sm text-secondary-fixed-dim tracking-wider">(Lvl 3 · 250 XP)</span></div><button class="relative p-space-xs text-inverse-on-surface hover:text-secondary-fixed-dim transition-colors rounded" title="Grimoire Whispers"><span class="material-symbols-outlined text-xl">notifications</span><span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent ring-2 ring-cover-900 animate-pulse"></span></button><div class="flex items-center bg-cover-800 rounded px-2 py-0.5 shadow-[2px_2px_0_#2A2419]"><span class="inline-block w-1.5 h-1.5 rounded-full bg-mana-full mr-1.5"></span><span class="font-anton text-label-sm tracking-wider text-secondary-fixed-dim">EN</span></div><div class="flex items-center pl-space-xs"><img alt="Minh Avatar" class="w-8 h-8 rounded-full object-cover ring-2 ring-secondary-fixed-dim shadow-[2px_2px_0_#2A2419]" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed left-0 top-14 bottom-10 w-64 bg-cover-900 z-40 flex flex-col shadow-[4px_0_16px_rgba(22,19,13,0.25)]"><div class="p-space-lg pb-space-sm"><div class="p-space-md rounded bg-cover-800 shadow-[3px_3px_0_#2A2419] mb-space-md"><div class="flex items-center justify-between text-secondary-fixed-dim mb-space-xs"><span class="font-marcellus text-label-sm uppercase tracking-wider">Chronicle Cycle</span><span class="material-symbols-outlined text-base">hourglass_top</span></div><div class="font-anton text-body-lg text-inverse-on-surface tracking-wide">Day 142</div><div class="font-marcellus text-label-sm text-inverse-on-surface/70">Winter Solstice Arc</div></div></div><nav class="flex-1 px-space-md space-y-space-xs" data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="today" href="#">Today</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="my-knowledge" href="#">My Knowledge</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="roadmap" href="#">Roadmap</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="companion" href="#">Companion</a><a aria-current="page" class="flex items-center px-space-md py-space-sm rounded transition-all bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1" data-path="quests" href="#">Quests</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="milestones-rank" href="#">Milestones / Rank</a></nav><div class="px-space-md pb-space-md"><nav data-active-classes="bg-accent text-on-primary font-bold shadow-[3px_3px_0_#2A2419] translate-x-1"><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-800 hover:text-secondary-fixed-dim transition-all" data-path="settings" href="#">Settings</a></nav></div></aside><div class="pl-64"><main class="relative pt-14 pb-12 min-h-screen bg-page-base px-space-xl"><div class="flex flex-col w-full">
<div class="max-w-[1280px] mx-auto w-full py-space-lg space-y-space-lg">
<div class="flex flex-col gap-space-xs">
<div class="flex items-center gap-space-xs text-ink-700 font-label-sm tracking-wide">
<span class="hover:text-primary cursor-pointer transition-colors">Roadmap</span>
<span class="material-symbols-outlined text-sm">chevron_right</span>
<span class="hover:text-primary cursor-pointer transition-colors">Chapter II: Data Preparation</span>
<span class="material-symbols-outlined text-sm">chevron_right</span>
<span class="text-accent font-bold">Embeddings</span>
</div>
<div class="flex flex-wrap items-start justify-between gap-space-md pt-space-xs">
<div>
<span class="font-label-sm text-accent uppercase tracking-widest font-bold">Arcana Trial • Task #E-014</span>
<h1 class="font-headline-lg text-ink-900 leading-tight">Quest 02: Experiment with Text Embeddings on 5 Sample Passages</h1>
</div>
<div class="flex items-center gap-space-xs bg-page-raised px-space-md py-space-xs rounded shadow-md border-l-4 border-accent">
<span class="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse"></span>
<span class="font-label-sm text-ink-900 uppercase tracking-wider font-bold">Status: In Progress (Đang làm)</span>
</div>
</div>
<div class="flex flex-wrap items-center gap-space-sm pt-space-xs">
<div class="inline-flex items-center gap-1.5 bg-surface-container-high px-space-md py-1 rounded text-ink-900 font-label-sm shadow-sm">
<span class="material-symbols-outlined text-base text-ink-700">terminal</span>
<span class="">Type: <strong class="font-bold">Practical Quest</strong></span>
</div>
<div class="inline-flex items-center gap-1.5 bg-secondary-container text-on-secondary-container px-space-md py-1 rounded font-label-sm shadow-sm font-bold">
<span class="material-symbols-outlined text-base">military_tech</span>
<span class="">Difficulty: Rank B</span>
</div>
<div class="inline-flex items-center gap-1.5 bg-surface-container-high px-space-md py-1 rounded text-ink-900 font-label-sm shadow-sm">
<span class="material-symbols-outlined text-base text-ink-700">schedule</span>
<span class="">Est. Effort: <strong class="font-bold">20 Minutes</strong></span>
</div>
<div class="inline-flex items-center gap-1.5 bg-surface-container-highest px-space-md py-1 rounded text-accent font-label-sm shadow-sm font-bold">
<span class="material-symbols-outlined text-base">auto_awesome</span>
<span class="">Reward: +20 XP</span>
</div>
</div>
</div>
<!-- Main Two-Column Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
<div class="lg:col-span-8 flex flex-col gap-space-lg min-w-0">
<section class="bg-page-raised rounded-lg p-space-lg shadow-md relative overflow-hidden">
<div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-secondary-container/20 pointer-events-none"></div>
<div class="flex items-center gap-space-sm mb-space-sm text-accent">
<span class="material-symbols-outlined text-2xl">menu_book</span>
<h2 class="font-headline-md text-ink-900">Learning Objective &amp; Expected Outcome</h2>
</div>
<p class="font-body-base text-ink-900 mb-space-md leading-relaxed">Map 5 sentences to vector space with cosine distance and observe negation limits.</p>
<div class="bg-surface-container-low p-space-md rounded shadow-sm">
<div class="flex items-start gap-space-sm">
<span class="material-symbols-outlined text-accent text-xl mt-0.5">psychology_alt</span>
<div>
<span class="font-label-sm text-ink-900 uppercase font-bold tracking-wide block mb-0.5">Scribe's Mental Model</span>
<p class="font-body-base text-ink-700 text-sm">Keyword search fails on synonyms; vectors capture meaning but can stumble on direct negations.</p>
</div>
</div>
</div>
</section>
<section class="bg-page-raised rounded-lg p-space-lg shadow-md space-y-space-md">
<div class="flex items-center justify-between">
<div class="flex items-center gap-space-sm text-ink-900">
<span class="material-symbols-outlined text-2xl text-accent">format_list_numbered</span>
<h2 class="font-headline-md">Suggested Guided Steps</h2>
</div>
<span class="font-label-sm text-ink-700 tracking-wider uppercase bg-surface-container-high px-space-sm py-0.5 rounded">Self-Paced Arc</span>
</div>
<ol class="space-y-space-md">
<li class="bg-surface-container-low p-space-md rounded shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container">
<span class="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 shadow-sm font-label-sm">1</span>
<div class="space-y-space-xs"><h3 class="font-headline-md text-base text-ink-900">Draft 5 Target Sentences</h3><p class="font-body-base text-ink-700 text-sm">Select 5 short passages spanning equivalence, negation, and baseline diversity.</p><div class="bg-surface-container-highest/60 p-space-sm rounded font-body-base text-xs text-ink-700 space-y-1"><div class="">• Passages A &amp; B: Semantic equivalence</div><div class="">• Passage C: Direct negation</div><div class="">• Passages D &amp; E: Distant baseline</div></div></div>
</li>
<!-- Step 2 -->
<li class="bg-surface-container-low p-space-md rounded shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container">
<span class="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 shadow-sm font-label-sm">2</span>
<div class="space-y-space-xs"><h3 class="font-headline-md text-base text-ink-900">Generate High-Dimensional Vector Embeddings</h3><p class="font-body-base text-ink-700 text-sm">Encode sentences via open-source model (<code class="bg-surface-variant px-1.5 py-0.5 rounded font-mono text-xs text-primary font-bold">all-MiniLM-L6-v2</code>) or API.</p></div>
</li>
<li class="bg-surface-container-low p-space-md rounded shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container">
<span class="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 shadow-sm font-label-sm">3</span>
<div class="space-y-space-xs"><h3 class="font-headline-md text-base text-ink-900">Compute Cosine Distance Matrix</h3><p class="font-body-base text-ink-700 text-sm">Formulate pairwise distance checks across all sample pairs.</p><div class="grid grid-cols-5 gap-1.5 text-center font-mono text-xs pt-1"><div class="bg-primary text-on-primary py-1 rounded">1.00</div><div class="bg-primary-container text-on-primary-container py-1 rounded">0.88</div><div class="bg-secondary-container text-on-secondary-container py-1 rounded">0.74</div><div class="bg-surface-variant text-ink-700 py-1 rounded">0.21</div><div class="bg-surface-variant text-ink-700 py-1 rounded">0.14</div></div></div>
</li>
<li class="bg-surface-container-low p-space-md rounded shadow-sm flex items-start gap-space-md transition-all hover:bg-surface-container">
<span class="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center shrink-0 shadow-sm font-label-sm">4</span>
<div class="space-y-space-xs"><h3 class="font-headline-md text-base text-ink-900">Observe Negation Boundary</h3><p class="font-body-base text-ink-700 text-sm">Compare semantic scores between contradictory sentences.</p></div>
</li>
</ol>
</section>
<section class="bg-page-raised rounded-lg p-space-lg shadow-md space-y-space-md">
<div class="flex items-center gap-space-sm text-ink-900">
<span class="material-symbols-outlined text-2xl text-accent">edit_note</span>
<div>
<h2 class="font-headline-md">Your Working Notes &amp; Submission</h2>
<span class="font-label-sm text-ink-700">Optional • Saved to your Grimoire Chronicle</span>
</div>
</div>
<div class="space-y-space-sm">
<label class="block font-label-sm text-ink-900" for="quest-notes">Empirical Observations &amp; Insights</label>
<textarea class="w-full bg-surface-container-low rounded p-space-md font-body-base text-ink-900 placeholder:text-ink-700/50 shadow-inner focus:outline-none focus:bg-surface-bright transition-colors" id="quest-notes" placeholder="Briefly record key cosine similarity scores or reflections..." rows="4"></textarea>
</div>
<div class="space-y-space-sm">
<label class="block font-label-sm text-ink-900" for="notebook-link">Artifact Repository or Colab Notebook Link</label>
<div class="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded shadow-inner">
<span class="material-symbols-outlined text-ink-700 text-lg">link</span>
<input class="bg-transparent w-full font-body-base text-ink-900 placeholder:text-ink-700/50 focus:outline-none text-sm" id="notebook-link" placeholder="Repository or Colab URL" type="url">
</div>
</div>
</section>
<section class="bg-surface-container-high rounded-lg p-space-lg shadow-md space-y-space-lg relative overflow-hidden">
<div class="flex items-start gap-space-md">
<div class="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center shrink-0 text-accent">
<span class="material-symbols-outlined text-2xl">verified_user</span>
</div>
<div class="space-y-space-xs">
<h2 class="font-headline-md text-ink-900">Self-Confirmation &amp; Protocol</h2>
<span class="font-label-sm text-accent uppercase font-bold tracking-wider">No Exam • No Anti-Cheat Surveillance</span>
<p class="font-body-base text-ink-700 text-sm leading-relaxed pt-1">Honors learner autonomy. No anti-cheat surveillance or timer — self-confirm your exploration.</p>
</div>
</div>
<div class="bg-page-raised p-space-md rounded flex items-center gap-space-md shadow-sm cursor-pointer select-none" id="confirm-box-trigger">
<input class="w-5 h-5 accent-accent cursor-pointer rounded" id="self-attest" type="checkbox">
<label class="font-label-sm text-ink-900 cursor-pointer" for="self-attest">I completed this hands-on exploration.</label>
</div>
<div class="flex flex-col sm:flex-row items-center gap-space-md pt-space-xs">
<button class="w-full sm:w-auto px-space-xl py-space-md bg-accent text-on-primary font-headline-md text-base rounded shadow-md hover:bg-primary transition-all active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-space-sm cursor-pointer" id="complete-btn">
<span class="material-symbols-outlined text-xl">workspace_premium</span>
<span class="">Mark Quest as Completed (+20 XP)</span>
</button>
<button class="w-full sm:w-auto px-space-lg py-space-md bg-page-raised text-ink-900 font-label-sm rounded shadow-sm hover:bg-surface-bright transition-all flex items-center justify-center gap-space-xs cursor-pointer">
<span class="material-symbols-outlined text-lg text-ink-700">forum</span>
<span class="">Ask Companion for Guidance</span>
</button>
<button class="w-full sm:w-auto px-space-md py-space-md text-ink-700 hover:text-ink-900 font-label-sm transition-colors cursor-pointer text-center">
              Postpone / Re-schedule
            </button>
</div>
</section>
</div>
<div class="lg:col-span-4 flex flex-col justify-start gap-space-lg">
<section class="bg-page-raised rounded-lg p-space-lg shadow-md space-y-space-md">
<div class="flex items-center gap-space-xs text-ink-900">
<span class="material-symbols-outlined text-xl text-accent">account_tree</span>
<h3 class="font-headline-md text-lg">Knowledge Connection</h3>
</div>
<div class="space-y-space-xs">
<span class="font-label-sm text-ink-700 uppercase">Target Node in Grimoire:</span>
<div class="bg-surface-container-high px-space-md py-space-sm rounded flex items-center justify-between shadow-sm">
<span class="font-body-base font-bold text-ink-900 text-sm">Embeddings (Vector Spaces)</span>
<span class="material-symbols-outlined text-base text-primary">lan</span>
</div>
</div>
<div class="bg-surface-container-low p-space-md rounded shadow-inner">
<svg class="w-full h-24 text-ink-700" fill="none" viewBox="0 0 280 90" xmlns="http://www.w3.org/2000/svg">
<line class="opacity-40" stroke="currentColor" stroke-dasharray="4 4" stroke-width="2" x1="40" x2="140" y1="45" y2="45"></line>
<line class="opacity-40" stroke="currentColor" stroke-dasharray="4 4" stroke-width="2" x1="140" x2="240" y1="45" y2="45"></line>
<circle cx="40" cy="45" fill="var(--tw-colors-surface-container-highest)" r="18" stroke="currentColor" stroke-width="2"></circle>
<text fill="currentColor" font-family="Literata" font-size="10" font-weight="600" text-anchor="middle" x="40" y="49">Tokens</text>
<circle class="animate-pulse" cx="140" cy="45" fill="#B23A1F" r="22"></circle>
<text fill="#ffffff" font-family="Literata" font-size="10" font-weight="bold" text-anchor="middle" x="140" y="49">Vectors</text>
<circle cx="240" cy="45" fill="var(--tw-colors-surface-container-highest)" r="18" stroke="currentColor" stroke-width="2"></circle>
<text fill="currentColor" font-family="Literata" font-size="10" font-weight="600" text-anchor="middle" x="240" y="49">RAG</text>
</svg>
</div>
<p class="font-body-base text-ink-700 text-xs leading-relaxed bg-surface-container-low p-space-sm rounded">Awards <strong>+20 XP</strong>. Mastered through hands-on practice, not speed tests.</p>
</section>
<section class="bg-page-raised rounded-lg p-space-lg shadow-md space-y-space-md">
<div class="flex items-center gap-space-xs text-ink-900">
<span class="material-symbols-outlined text-xl text-secondary">star_half</span>
<h3 class="font-headline-md text-lg">Reward Impact</h3>
</div>
<div class="space-y-space-sm">
<div class="flex justify-between items-center text-sm font-label-sm">
<span class="text-ink-700">Rank Progression</span>
<span class="text-accent font-bold">250 → 270 XP</span>
</div>
<div class="w-full bg-surface-container-high h-3 rounded-full overflow-hidden p-0.5 shadow-inner">
<div class="bg-gradient-to-r from-secondary-container via-accent to-primary h-full rounded-full transition-all duration-700" style="width: 83%;"></div>
</div>
<div class="flex justify-between items-center text-xs text-ink-700 pt-1">
<span class="">Lvl 3 (Apprentice Scribe)</span>
<span class="">Next: Lvl 4 (30 XP left)</span>
</div>
</div>
<div class="flex items-center gap-space-sm bg-surface-container-low p-space-sm rounded">
<span class="material-symbols-outlined text-accent text-lg">card_membership</span>
<span class="font-label-sm text-xs text-ink-900">Unlocks: <em>Quest 03: Vector Indexing with FAISS</em></span>
</div>
</section>
</div>
</div>
</div>
</div>
<script>
  (function() {
    const checkTrigger = document.getElementById('confirm-box-trigger');
    const checkbox = document.getElementById('self-attest');
    const completeBtn = document.getElementById('complete-btn');
    if (checkTrigger && checkbox) {
      checkTrigger.addEventListener('click', (e) => {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
        }
      });
    }
    if (completeBtn && checkbox) {
      completeBtn.addEventListener('click', () => {
        if (!checkbox.checked) {
          checkbox.focus();
          checkbox.parentElement.classList.add('bg-secondary-container/40');
          setTimeout(() => {
            checkbox.parentElement.classList.remove('bg-secondary-container/40');
          }, 600);
        } else {
          completeBtn.innerHTML = '<span class="material-symbols-outlined text-xl">check</span><span>Quest Recorded! (+20 XP)</span>';
          completeBtn.classList.remove('bg-accent');
          completeBtn.classList.add('bg-mana-full');
          completeBtn.disabled = true;
        }
      });
    }
  })();
</script></main></div><footer class="fixed bottom-0 left-0 right-0 h-10 bg-cover-900 z-50 shadow-[0_-2px_10px_rgba(22,19,13,0.25)] px-space-lg flex items-center justify-between text-inverse-on-surface/70"><div class="flex items-center gap-space-md"><span class="inline-block w-2 h-2 rounded-full bg-mana-full animate-pulse"></span><span class="font-marcellus text-label-sm tracking-wide">Tome Synchronized • Shounen Engine v2.4</span></div><div class="flex items-center gap-space-lg font-marcellus text-label-sm"><span class="text-secondary-fixed-dim hover:underline cursor-pointer">Grimoire Draft</span><span class="">•</span><span class="">Sanctum ID: #8820-EX</span></div></footer>
</body></html>
````

## File: design/asset/roadmap_ai_learning_advisor_plan_adjuster_en/code.html
````html
<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com" rel="preconnect"><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400..900;1,7..72,400..900&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-secondary-fixed-variant": "#5b4300", "surface-tint": "#ab351a", "outline-variant": "#e0bfb8", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "tertiary-fixed-dim": "#91cdff", "surface": "#fff9ed", "secondary": "#785a00", "secondary-container": "#ffd576", "inverse-on-surface": "#f9f0d9", "on-primary-container": "#ffd8d0", "on-tertiary-container": "#c8e4ff", "primary-container": "#b23a1f", "tertiary-fixed": "#cce5ff", "primary-fixed-dim": "#ffb4a3", "inverse-primary": "#ffb4a3", "background": "#fff9ed", "error-container": "#ffdad6", "error": "#ba1a1a", "secondary-fixed": "#ffdf9b", "accent": "#B23A1F", "on-surface": "#1f1c0e", "on-secondary-container": "#795a00", "page-raised": "#F6F0DE", "on-primary-fixed": "#3d0600", "on-tertiary-fixed": "#001e31", "on-error-container": "#93000a", "outline": "#8c716b", "primary": "#912208", "on-tertiary": "#ffffff", "on-secondary": "#ffffff", "surface-dim": "#e1dac3", "inverse-surface": "#343021", "tertiary": "#00507a", "surface-container-highest": "#eae2cb", "surface-container": "#f6eed6", "surface-variant": "#eae2cb", "on-primary-fixed-variant": "#891d04", "ink-900": "#2A2419", "primary-fixed": "#ffdad2", "secondary-fixed-dim": "#eac165", "cover-900": "#16130D", "on-error": "#ffffff", "on-secondary-fixed": "#251a00", "on-surface-variant": "#58413c", "surface-container-lowest": "#ffffff", "surface-container-low": "#fbf3dc", "tertiary-container": "#00699e", "on-background": "#1f1c0e", "on-primary": "#ffffff", "ink-700": "#4A4030", "mana-full": "#3F6B45", "surface-container-high": "#f0e8d1", "on-tertiary-fixed-variant": "#004b72" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-3xl": "64px", "space-lg": "24px", "space-md": "16px", "space-2xl": "48px", "gutter": "1rem", "space-sm": "8px", "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem" }, "fontFamily": { "headline-md": [ "Literata" ], "body-base": [ "Literata" ], "label-sm": [ "Literata" ], "headline-lg": [ "Literata" ], "body-lg": [ "Literata" ], "headline-display": [ "Literata" ] }, "fontSize": { "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ] } } } };</script></head><body class="bg-page-base text-ink-900 font-body-base text-body-base antialiased min-h-screen"><header class="fixed top-0 left-0 right-0 h-16 z-50 bg-cover-900 border-b border-ink-900 shadow-[0_3px_0_#2A2419] flex items-center justify-between px-space-md lg:px-space-lg"><div class="flex items-center gap-space-md"><img alt="Magical guild crest emblem" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-headline-md text-body-base tracking-wider uppercase text-secondary-fixed leading-none">LIFEOS GRIMOIRE</span><span class="font-label-sm text-[11px] text-surface-dim tracking-widest uppercase opacity-80 mt-0.5">Tome of Mastery • Vol. IV</span></div></div><div class="flex items-center gap-space-lg"><div class="hidden md:flex items-center gap-space-md bg-[#211C14] px-space-md py-1.5 rounded border border-[#3A3224]"><div class="flex flex-col"><span class="font-label-sm text-[10px] text-secondary-fixed tracking-wider uppercase">Mana Core</span><div class="flex items-center gap-1 mt-1"><div class="w-3 h-2 bg-mana-full rounded-sm"></div><div class="w-3 h-2 bg-mana-full rounded-sm"></div><div class="w-3 h-2 bg-mana-full rounded-sm"></div><div class="w-3 h-2 bg-mana-full rounded-sm"></div><div class="w-3 h-2 bg-mana-full/40 rounded-sm"></div></div></div><div class="h-6 w-px bg-ink-700 mx-1"></div><div class="flex flex-col"><span class="font-label-sm text-[10px] text-surface-dim uppercase tracking-wider">Status</span><span class="font-label-sm text-[12px] text-secondary-fixed-dim font-bold">Rank VII Adept</span></div></div><div class="flex items-center gap-space-sm pl-space-sm border-l border-ink-700"><div class="flex flex-col text-right hidden sm:flex"><span class="font-label-sm text-body-base text-surface-bright leading-tight">Minh</span><span class="font-label-sm text-[10px] text-secondary-fixed opacity-75 uppercase">Grand Scholar</span></div><div class="relative p-0.5 rounded-full border border-secondary-fixed"><img alt="Profile avatar" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed top-16 left-0 bottom-0 w-[232px] bg-[#211C14] border-r border-ink-900 z-40 flex flex-col justify-between shadow-[3px_0_0_#2A2419]"><div class="flex flex-col"><div class="p-space-md border-b border-[#342D20] bg-cover-900/60"><div class="flex items-center gap-2"><svg class="w-4 h-4 text-secondary-fixed shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg><span class="font-label-sm text-[11px] text-surface-dim uppercase tracking-widest">CHRONICLE CYCLE</span></div><p class="font-headline-md text-[18px] text-secondary-fixed leading-tight mt-1">Day 142</p><p class="font-label-sm text-[11px] text-surface-dim opacity-80 mt-0.5">Winter Solstice Arc</p></div><nav class="p-space-sm flex flex-col gap-1.5 mt-space-sm"><a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="today" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg><span class="">Today</span></a><a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="my-knowledge" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="5" r="2.5"></circle><circle cx="6" cy="18" r="2.5"></circle><circle cx="18" cy="18" r="2.5"></circle><path d="M12 7.5v4M12 11.5l-4.5 4.5M12 11.5l4.5 4.5"></path></svg><span class="">My Knowledge</span></a><a class="flex items-center gap-3 px-3 py-2 rounded font-label-sm text-label-sm transition-colors bg-accent text-surface-bright font-bold shadow-[2px_2px_0_#2A2419] border border-ink-900" data-path="roadmap" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><polygon fill="currentColor" fill-opacity="0.2" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg><span class="">Roadmap</span></a><a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="companion" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="m18 2 4 4-14 14H4v-4L18 2z"></path><path d="m14.5 5.5 4 4"></path><path d="m3 21 3-3"></path></svg><span class="">Companion</span></a><a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="progress" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-5 5"></path><circle cx="19" cy="9" fill="currentColor" r="1.5"></circle></svg><span class="">Progress</span></a></nav></div><div class="flex flex-col border-t border-[#342D20] p-space-sm bg-cover-900"><nav class="mb-space-sm"><a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="settings" href="#"><svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg><span class="">Settings</span></a></nav><div class="px-3 py-2 rounded bg-[#2A2317] border border-[#3E3321] mb-2"><div class="flex items-center justify-between"><div class="flex items-center gap-1.5"><svg class="w-3.5 h-3.5 text-mana-full shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span class="font-label-sm text-[11px] text-secondary-fixed">Aegis Seal</span></div><span class="font-label-sm text-[11px] text-mana-full font-bold">98%</span></div><div class="w-full bg-[#1A160F] h-1.5 rounded-full mt-1.5 overflow-hidden"><div class="bg-mana-full h-full w-[98%]"></div></div><span class="font-label-sm text-[10px] text-surface-dim/70 block mt-1 uppercase tracking-wider">Active Barrier</span></div><div class="px-2 py-1 text-[9px] font-label-sm text-surface-dim/50 leading-tight border-t border-[#2A2419] pt-2"><p class="truncate">Tome Synchronized • Shounen Engine v2.4</p><p class="truncate text-[8px] text-surface-dim/40">Sanctum ID: #8820-EX</p></div></div></aside><div class="pl-[232px]"><main class="relative pt-16 bg-page-base min-h-screen max-w-7xl mx-auto px-space-md lg:px-space-xl py-space-lg"><div class="flex flex-col w-full text-ink-900 font-body-base antialiased">
<header class="flex flex-wrap items-center justify-between gap-space-sm mb-space-md">
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-ink-700 tracking-widest uppercase">Leys &amp; Chronicles</span>
<span class="text-ink-700/60 text-xs">/</span>
<span class="font-label-sm text-label-sm text-accent font-bold tracking-wider uppercase">Adaptive Expedition Map</span>
</div>
<div class="flex items-center flex-wrap gap-space-md mt-1">
<h1 class="font-headline-md text-headline-md tracking-tight text-ink-900">Roadmap &amp; Expedition</h1>
<div class="flex items-center gap-1.5 px-3 py-1 bg-secondary-fixed text-cover-900 border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] rounded">
<span class="material-symbols-outlined text-[18px]">target</span>
<span class="font-label-sm text-label-sm tracking-wide font-bold">Goal: Build Document Q&amp;A Chatbot with RAG</span>
</div>
</div>
</div>
<div class="flex items-center gap-2">
<div class="hidden xl:flex items-center gap-3 bg-page-raised px-3 py-1.5 border-2 border-ink-900 shadow-[2px_2px_0_#2A2419]">
<div class="flex items-center gap-1 text-ink-700">
<span class="material-symbols-outlined text-[16px] text-accent">schedule</span>
<span class="font-label-sm text-label-sm">Arcana Cycle: <strong>Week 7 of 16</strong></span>
</div>
<span class="text-ink-700/40">|</span>
<div class="flex items-center gap-1 text-ink-700">
<span class="material-symbols-outlined text-[16px] text-mana-full">verified_user</span>
<span class="font-label-sm text-label-sm font-bold text-mana-full">Streak Seal: Active</span>
</div>
</div>
</div>
</header>
<section class="relative bg-page-raised border-2 border-accent shadow-[3px_3px_0_#2A2419] p-space-md mb-space-lg">
<span class="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-accent pointer-events-none"></span>
<span class="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-accent pointer-events-none"></span>
<span class="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-accent pointer-events-none"></span>
<span class="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-accent pointer-events-none"></span>
<div class="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div class="flex items-start gap-space-md">
<div class="w-10 h-10 shrink-0 bg-accent text-surface-bright border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] flex items-center justify-center">
<span class="material-symbols-outlined text-2xl">magic_button</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="inline-block w-2 h-2 rounded-full bg-accent animate-ping"></span>
<span class="font-label-sm text-label-sm uppercase tracking-wider text-accent font-bold">Arcana Pacing Advisory • Friction Detected in Vector Operations</span>
</div>
<p class="font-body-base text-body-base text-ink-900 mt-0.5">
            The AI Sentinel observed 3 missed practice sessions in <strong>Embeddings &amp; Vector Space</strong>. Recommended adjustment: <strong>60 min/day → 30 min/day</strong> until Mid-Term exams conclude.
          </p>
</div>
</div>
<div class="flex items-center gap-space-sm shrink-0 self-start lg:self-center">
<button class="px-3 py-1.5 bg-page-base hover:bg-page-raised border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 font-label-sm text-label-sm text-ink-900 transition-all flex items-center gap-1.5" id="inspectDiffBtn">
<span class="material-symbols-outlined text-[16px]">difference</span>
          Inspect Proposed v2.0 Diff
        </button>
<button class="px-4 py-1.5 bg-accent hover:bg-primary-container text-surface-bright border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 font-label-sm text-label-sm font-bold transition-all flex items-center gap-1.5" id="applyRoadmapTopBtn">
<span class="material-symbols-outlined text-[16px]">done_all</span>
          Apply Adjusted Roadmap
        </button>
</div>
</div>
</section>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
<div class="lg:col-span-7 flex flex-col gap-space-md">
<div class="bg-page-raised border-2 border-ink-900 shadow-[3px_3px_0_#2A2419] p-space-sm flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-1.5"><button class="px-3 py-1 bg-page-base hover:bg-page-raised text-ink-700 border border-ink-900 font-label-sm text-label-sm flex items-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">account_tree</span>Node Graph</button><button class="px-3 py-1 bg-cover-900 text-secondary-fixed border border-ink-900 font-label-sm text-label-sm font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>Expedition Chapters (List)</button></div>
<div class="flex items-center gap-2">
<div class="flex items-center gap-1 px-2 py-1 bg-page-base border border-ink-900 text-ink-900">
<span class="material-symbols-outlined text-[16px] text-ink-700">filter_alt</span>
<select class="bg-transparent font-label-sm text-label-sm outline-none cursor-pointer">
<option>All Waypoints (6/14 Mastered)</option>
<option selected="">Active Expedition Focus</option>
<option>Prerequisites &amp; Unlocks</option>
</select>
</div>
<!-- Zoom Controls -->
<div class="flex items-center border border-ink-900 bg-page-base">
<button class="px-1.5 py-0.5 hover:bg-secondary-fixed/30 text-ink-900 text-sm font-bold border-r border-ink-900" title="Zoom In">+</button>
<button class="px-2 py-0.5 font-label-sm text-[11px] text-ink-700 uppercase hover:bg-secondary-fixed/30" title="Reset Fit">Fit</button>
<button class="px-1.5 py-0.5 hover:bg-secondary-fixed/30 text-ink-900 text-sm font-bold border-l border-ink-900" title="Zoom Out">−</button>
</div>
</div>
</div>
<div class="relative bg-page-raised border-2 border-ink-900 shadow-[3px_3px_0_#2A2419] p-space-md lg:p-space-lg overflow-hidden">
<svg class="absolute top-0 bottom-0 left-[34px] w-6 h-full text-ink-900/30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 24 600">
<line stroke="currentColor" stroke-dasharray="4 4" stroke-width="2" x1="12" x2="12" y1="0" y2="600"></line>
</svg>
<div class="relative flex flex-col gap-space-lg z-10">
<div class="flex flex-col gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-mana-full text-surface-bright flex items-center justify-center border-2 border-ink-900 shadow-[1px_1px_0_#2A2419]">
<span class="material-symbols-outlined text-[18px]">verified</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-body-lg text-ink-900 font-bold">Sector 01: Foundational Arcana</span>
<span class="px-2 py-0.5 bg-mana-full/20 text-mana-full border border-mana-full font-label-sm text-[10px] tracking-wider uppercase font-bold">Cleared (100%)</span>
</div>
</div>
<div class="ml-10 flex flex-col gap-space-sm pl-4 border-l-2 border-mana-full/50">
<div class="p-3 bg-page-base border border-ink-900 shadow-[2px_2px_0_#2A2419] flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-cover-900 text-secondary-fixed flex items-center justify-center font-bold text-xs border border-ink-900">
                    1.1
                  </div>
<div>
<h3 class="font-label-sm text-body-base font-bold text-ink-900 leading-tight">Python Core &amp; File I/O</h3>
<p class="font-label-sm text-[12px] text-ink-700">Async parsing, context managers, streaming files</p>
</div>
</div>
<div class="flex items-center gap-2 shrink-0">
<div class="text-right">
<span class="font-label-sm text-[11px] text-mana-full font-bold uppercase tracking-wider block">Mastered</span>
<span class="font-label-sm text-[11px] text-ink-700">88/100 Seal</span>
</div>
<span class="material-symbols-outlined text-mana-full text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
<div class="p-3 bg-page-base border border-ink-900 shadow-[2px_2px_0_#2A2419] flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-cover-900 text-secondary-fixed flex items-center justify-center font-bold text-xs border border-ink-900">
                    1.2
                  </div>
<div>
<h3 class="font-label-sm text-body-base font-bold text-ink-900 leading-tight">HTTP Client &amp; REST Architecture</h3>
<p class="font-label-sm text-[12px] text-ink-700">Requests, FastAPI schemas, token bearer flow</p>
</div>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="px-2 py-0.5 bg-secondary-fixed border border-ink-900 font-label-sm text-[10px] text-ink-900 font-bold">+25 XP Cleared</span>
<span class="material-symbols-outlined text-mana-full text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-accent text-surface-bright flex items-center justify-center border-2 border-ink-900 shadow-[1px_1px_0_#2A2419]">
<span class="material-symbols-outlined text-[18px]">explore</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-body-lg text-ink-900 font-bold">Sector 02: Data Preparation &amp; Vectors</span>
<span class="px-2 py-0.5 bg-accent text-surface-bright border border-ink-900 font-label-sm text-[10px] tracking-wider uppercase font-bold animate-pulse">Current Expedition • 60% Pacing</span>
</div>
</div>
<div class="ml-10 flex flex-col gap-space-md pl-4 border-l-2 border-accent">
<div class="p-4 bg-page-base border-2 border-accent shadow-[3px_3px_0_#2A2419] relative">
<span class="absolute -top-3 right-4 px-2 py-0.5 bg-accent text-surface-bright text-[10px] font-label-sm tracking-widest uppercase font-bold border border-ink-900">
                  Active Waypoint • Step 3 of 5
                </span>
<div class="flex items-start justify-between gap-space-md">
<div class="flex items-start gap-3">
<div class="w-8 h-8 bg-cover-900 text-secondary-fixed border-2 border-ink-900 flex items-center justify-center font-bold text-sm shrink-0">
                      2.1
                    </div>
<div>
<div class="flex items-center gap-2">
<h3 class="font-headline-md text-[18px] text-ink-900 font-bold">Embeddings &amp; Vector Space</h3>
<span class="px-1.5 py-0.2 bg-secondary-fixed border border-ink-900 text-[10px] font-label-sm font-bold text-cover-900">Rank B Trial</span>
</div>
<p class="font-body-base text-body-base text-ink-700 mt-1 max-w-[54ch]">
                        High-dimensional cosine projections, OpenAI vs open-weights embedding models, cosine vs dot-product similarity metrics.
                      </p>
</div>
</div>
<div class="text-right shrink-0">
<span class="font-label-sm text-label-sm text-accent font-bold block">Friction Alert</span>
<span class="font-label-sm text-[11px] text-ink-700">3 Sessions Pending</span>
</div>
</div>
<div class="mt-4 pt-3 border-t border-ink-900/20 flex flex-col gap-2">
<div class="flex justify-between items-center text-xs font-label-sm">
<span class="text-ink-700">Attunement Rite Progress: <strong>3/5 rites completed</strong></span>
<span class="text-accent font-bold">60% Resonance</span>
</div>
<div class="w-full h-2.5 bg-cover-900/10 border border-ink-900 p-0.5">
<div class="h-full bg-accent w-[60%]"></div>
</div>
</div>
<div class="mt-3 flex items-center justify-between">
<span class="font-label-sm text-[11px] text-ink-700 italic">Target: Compute semantic distance on 500 passage embeddings</span>
<button class="px-3 py-1 bg-cover-900 hover:bg-accent text-secondary-fixed hover:text-surface-bright border border-ink-900 shadow-[1px_1px_0_#2A2419] font-label-sm text-label-sm font-bold transition-colors flex items-center gap-1">
<span class="">Continue Rite</span>
<span class="material-symbols-outlined text-[14px]">arrow_forward</span>
</button>
</div>
</div>
<!-- Node 2.2 -->
<div class="p-3 bg-page-base border border-ink-900 shadow-[2px_2px_0_#2A2419] flex items-center justify-between gap-space-sm opacity-90">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-cover-900 text-surface-dim flex items-center justify-center font-bold text-xs border border-ink-900">
                    2.2
                  </div>
<div>
<h3 class="font-label-sm text-body-base font-bold text-ink-900 leading-tight">Text Chunking Strategies</h3>
<p class="font-label-sm text-[12px] text-ink-700">Fixed-size sliding window, sentence boundary, semantic splitters</p>
</div>
</div>
<div class="flex items-center gap-2 shrink-0">
<span class="px-2 py-0.5 bg-page-raised border border-ink-900 font-label-sm text-[11px] text-ink-700 font-semibold">Trial Ready</span>
<button class="px-2 py-1 bg-secondary-fixed hover:bg-secondary-fixed-dim text-cover-900 border border-ink-900 font-label-sm text-[11px] font-bold">
                    Diagnostic Quiz
                  </button>
</div>
</div>
</div>
</div>
<div class="flex flex-col gap-space-sm opacity-75">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-cover-900 text-surface-dim flex items-center justify-center border-2 border-ink-900 shadow-[1px_1px_0_#2A2419]">
<span class="material-symbols-outlined text-[18px]">lock</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-body-lg text-ink-900 font-bold">Sector 03: Knowledge Retrieval Leylines</span>
<span class="px-2 py-0.5 bg-page-base border border-ink-900 font-label-sm text-[10px] tracking-wider uppercase text-ink-700">Locked • Requires Sector 02 Mastery</span>
</div>
</div>
<div class="ml-10 flex flex-col gap-space-sm pl-4 border-l-2 border-ink-900/30">
<div class="p-3 bg-page-base/60 border border-ink-900/50 flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-cover-900/40 text-surface-dim flex items-center justify-center font-bold text-xs">
                    3.1
                  </div>
<div>
<h3 class="font-label-sm text-body-base font-bold text-ink-900/70 leading-tight">Vector Indexing &amp; Similarity Search (HNSW / FAISS)</h3>
<p class="font-label-sm text-[12px] text-ink-700/70">Graph-based approximate nearest neighbor indexing</p>
</div>
</div>
<span class="material-symbols-outlined text-ink-700/60 text-lg">lock</span>
</div>
<div class="p-3 bg-page-base/60 border border-ink-900/50 flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-3">
<div class="w-6 h-6 rounded bg-cover-900/40 text-surface-dim flex items-center justify-center font-bold text-xs">
                    3.2
                  </div>
<div>
<h3 class="font-label-sm text-body-base font-bold text-ink-900/70 leading-tight">Hybrid Keyword-Dense Retrieval (BM25 + RRF)</h3>
<p class="font-label-sm text-[12px] text-ink-700/70">Reciprocal rank fusion and sparse re-ranking formulas</p>
</div>
</div>
<span class="material-symbols-outlined text-ink-700/60 text-lg">lock</span>
</div>
</div>
</div>
<div class="flex flex-col gap-space-sm opacity-60">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-cover-900 text-secondary-fixed flex items-center justify-center border-2 border-ink-900 shadow-[1px_1px_0_#2A2419]">
<span class="material-symbols-outlined text-[18px]">military_tech</span>
</div>
<div class="flex items-baseline gap-2">
<span class="font-headline-md text-body-lg text-ink-900 font-bold">Sector 04: The Grand Archivist Trial</span>
<span class="px-2 py-0.5 bg-cover-900 text-secondary-fixed border border-ink-900 font-label-sm text-[10px] tracking-wider uppercase font-bold">Chapter Apex Boss</span>
</div>
</div>
<div class="ml-10 pl-4 border-l-2 border-ink-900/30">
<div class="p-3 bg-cover-900 text-surface-bright border-2 border-secondary-fixed shadow-[3px_3px_0_#2A2419] flex items-center justify-between gap-space-sm">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-secondary-fixed text-2xl">auto_stories</span>
<div>
<h3 class="font-headline-md text-[17px] text-secondary-fixed leading-tight font-bold">Node 4.0: End-to-End RAG Pipeline &amp; Evaluation</h3>
<p class="font-label-sm text-[12px] text-surface-dim">Faithfulness, Answer Relevance, Context Recall &amp; Chatbot UI Deployment</p>
</div>
</div>
<span class="px-2 py-1 bg-[#2C2417] text-secondary-fixed-dim border border-secondary-fixed text-[11px] font-label-sm uppercase font-bold tracking-wider">
                  Grand Archivist Sigil
                </span>
</div>
</div>
</div>
</div>
</div>
<div class="bg-page-raised border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] p-space-sm flex flex-wrap items-center justify-between text-xs font-label-sm text-ink-700 gap-2">
<div class="flex items-center gap-2"><button class="px-3 py-1 bg-page-base hover:bg-page-raised text-ink-700 border border-ink-900 font-label-sm text-label-sm flex items-center gap-1.5 transition-colors"><span class="material-symbols-outlined text-[16px]">account_tree</span>Node Graph</button><button class="px-3 py-1 bg-cover-900 text-secondary-fixed border border-ink-900 font-label-sm text-label-sm font-bold flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>Expedition Chapters (List)</button></div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-ink-900">event_available</span>
<span class="">Target Completion: <strong>Oct 25, 2026</strong></span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-mana-full">shield</span>
<span class="">Streak Shield: <strong>1 rest day banked</strong></span>
</div>
</div>
</div>
<!-- RIGHT COLUMN (AI Companion Chat & Roadmap Adjuster) ~ 40% (5 cols on 12-grid) -->
<div class="lg:col-span-5 flex flex-col gap-space-md">
<div class="bg-page-raised border-2 border-ink-900 shadow-[3px_3px_0_#2A2419] flex flex-col h-[740px] relative overflow-hidden">
<div class="p-space-sm lg:p-space-md bg-cover-900 border-b-2 border-ink-900 text-surface-bright flex items-center justify-between shrink-0">
<div class="flex items-center gap-space-sm">
<div class="relative">
<div class="w-10 h-10 rounded border border-secondary-fixed bg-[#2C2417] flex items-center justify-center text-secondary-fixed shadow-[1px_1px_0_#000]">
<span class="material-symbols-outlined text-2xl">neurology</span>
</div>
<span class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-mana-full rounded-full border-2 border-cover-900" title="Resonance Active"></span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-headline-md text-[17px] text-secondary-fixed font-bold leading-tight">Aetheria • Pact Sentinel</span>
<span class="px-1.5 py-0.2 bg-mana-full/30 text-mana-full border border-mana-full/60 text-[10px] font-label-sm font-bold uppercase rounded-sm">
                  Online
                </span>
</div>
<span class="font-label-sm text-[11px] text-surface-dim">Personal Learning Advisor &amp; Roadmap Overseer</span>
</div>
</div>
<div class="flex items-center gap-1 text-surface-dim">
<button class="p-1 hover:text-surface-bright" title="Settings">
<span class="material-symbols-outlined text-[18px]">tune</span>
</button>
<button class="p-1 hover:text-surface-bright" title="Expand Dialogue">
<span class="material-symbols-outlined text-[18px]">open_in_full</span>
</button>
</div>
</div>
<div class="flex-1 p-space-md overflow-y-auto space-y-space-md font-body-base text-[15px] leading-relaxed bg-[#F7F2E4]">
<div class="flex items-start gap-2.5">
<div class="w-7 h-7 rounded bg-cover-900 text-secondary-fixed border border-ink-900 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-sm">auto_fix</span>
</div>
<div class="bg-page-base border border-ink-900 shadow-[2px_2px_0_#2A2419] p-3 text-ink-900 max-w-[88%]">
<p class="">
                Greetings, Scholar Minh. I noticed friction in your recent Embedding rites—your cognitive load index exceeded <strong>78%</strong> and 3 sessions fell behind schedule. Mid-term examinations are also approaching next week.
              </p>
<span class="text-[10px] font-label-sm text-ink-700/70 block mt-1">10:14 AM • Pact Advisor</span>
</div>
</div>
<div class="flex items-start justify-end gap-2.5">
<div class="bg-cover-900 text-surface-bright border border-ink-900 shadow-[2px_2px_0_#2A2419] p-3 max-w-[88%]">
<p class="font-body-base text-[15px]">
                Yes, university exams start on Monday. Can we reduce my study pacing to 30 mins a day for the next two weeks so my streak does not break?
              </p>
<span class="text-[10px] font-label-sm text-surface-dim/70 block mt-1 text-right">10:16 AM • You</span>
</div>
<div class="w-7 h-7 rounded bg-accent text-surface-bright border border-ink-900 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-sm">person</span>
</div>
</div>
<div class="flex items-start gap-2.5">
<div class="w-7 h-7 rounded bg-cover-900 text-secondary-fixed border border-ink-900 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-sm">auto_fix</span>
</div>
<div class="bg-page-base border-2 border-ink-900 shadow-[2px_2px_0_#2A2419] p-3 text-ink-900 max-w-[92%] flex flex-col gap-2">
<p class="">
                Understood. I have drafted an adaptive adjustment (<strong>Roadmap v2.0</strong>) to protect your mana reserves and sustain your streak:
              </p>
<!-- Embedded Plan Proposal Diff Box -->
<div class="bg-page-raised border border-ink-900 p-2.5 text-xs font-label-sm flex flex-col gap-1.5">
<div class="flex items-center justify-between border-b border-ink-900/20 pb-1">
<span class="font-bold text-accent uppercase tracking-wider">Proposal: Exam Relief Modulation</span>
<span class="px-1.5 py-0.5 bg-secondary-fixed border border-ink-900 font-bold text-[10px]">v2.0 Draft</span>
</div>
<ul class="space-y-1 text-ink-900">
<li class="flex items-start gap-1.5">
<span class="text-accent font-bold">•</span>
<span class=""><strong>Pacing:</strong> 60 min/day → 30 min/day (Sept 29 – Oct 12).</span>
</li>
<li class="flex items-start gap-1.5">
<span class="text-mana-full font-bold">•</span>
<span class=""><strong>Preserved:</strong> All completed Python &amp; HTTP masteries remain 100% intact.</span>
</li>
<li class="flex items-start gap-1.5">
<span class="text-accent font-bold">•</span>
<span class=""><strong>Adjustment:</strong> Sector 2 unstarted trials split into 15-minute bite-sized rites.</span>
</li>
<li class="flex items-start gap-1.5">
<span class="text-ink-700 font-bold">•</span>
<span class=""><strong>New Forecast:</strong> Oct 25 → Nov 01, 2026 (No hard penalty).</span>
</li>
</ul>
<!-- Proposal CTAs -->
<div class="mt-2 pt-2 border-t border-ink-900/20 flex flex-wrap gap-2">
<button class="flex-1 px-3 py-1.5 bg-accent hover:bg-primary-container text-surface-bright border border-ink-900 shadow-[1px_1px_0_#2A2419] font-label-sm text-xs font-bold transition-all text-center" id="applyPlanBtn">
                    Confirm &amp; Apply v2.0 Roadmap
                  </button>
<button class="px-2.5 py-1.5 bg-page-base hover:bg-page-raised text-ink-900 border border-ink-900 font-label-sm text-xs transition-all">
                    Keep Current (60m)
                  </button>
</div>
</div>
<span class="text-[10px] font-label-sm text-ink-700/70 block">10:17 AM • Pact Advisor</span>
</div>
</div>
<div class="flex items-start justify-end gap-2.5">
<div class="bg-cover-900 text-surface-bright border border-ink-900 shadow-[2px_2px_0_#2A2419] p-2.5 max-w-[85%]">
<p class="font-body-base text-[14px]">
                What happens to my scheduled quiz for Text Chunking?
              </p>
<span class="text-[10px] font-label-sm text-surface-dim/70 block mt-1 text-right">10:18 AM • You</span>
</div>
<div class="w-7 h-7 rounded bg-accent text-surface-bright border border-ink-900 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-sm">person</span>
</div>
</div>
<div class="flex items-start gap-2.5">
<div class="w-7 h-7 rounded bg-cover-900 text-secondary-fixed border border-ink-900 flex items-center justify-center shrink-0 mt-0.5">
<span class="material-symbols-outlined text-sm">auto_fix</span>
</div>
<div class="bg-page-base border border-ink-900 shadow-[2px_2px_0_#2A2419] p-3 text-ink-900 max-w-[88%]">
<p class="">
                It remains ready in your queue as an optional 5-minute diagnostic. Completing it will immediately calibrate Node 2.2 without adding study workload.
              </p>
<span class="text-[10px] font-label-sm text-ink-700/70 block mt-1">10:18 AM • Pact Advisor</span>
</div>
</div>
</div>
<div class="px-space-md py-2 bg-page-base border-t border-ink-900/30 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
<span class="font-label-sm text-[11px] text-ink-700 uppercase tracking-wider shrink-0 font-bold">Inquire:</span>
<button class="prompt-chip px-2.5 py-1 bg-page-raised hover:bg-secondary-fixed/50 border border-ink-900 text-xs font-label-sm text-ink-900 rounded-full transition-colors">
            Explain Node 2.1
          </button>
<button class="prompt-chip px-2.5 py-1 bg-page-raised hover:bg-secondary-fixed/50 border border-ink-900 text-xs font-label-sm text-ink-900 rounded-full transition-colors">
            Lighten today's quests
          </button>
<button class="prompt-chip px-2.5 py-1 bg-page-raised hover:bg-secondary-fixed/50 border border-ink-900 text-xs font-label-sm text-ink-900 rounded-full transition-colors">
            Show v1 vs v2 timeline
          </button>
</div>
<div class="p-space-sm bg-page-raised border-t-2 border-ink-900">
<form class="flex items-center gap-2" id="chatForm">
<button class="p-2 bg-page-base hover:bg-secondary-fixed/30 border border-ink-900 text-ink-900 flex items-center justify-center" title="Voice Rune / Speech" type="button">
<span class="material-symbols-outlined text-lg">mic</span>
</button>
<input class="flex-1 bg-page-base border border-ink-900 px-3 py-2 text-sm font-body-base text-ink-900 placeholder:text-ink-700/60 focus:outline-none focus:ring-1 focus:ring-accent" id="chatInput" placeholder="Ask Aetheria to adjust pacing, explain nodes, or review schedule..." type="text">
<button class="px-3 py-2 bg-accent hover:bg-primary-container text-surface-bright border border-ink-900 shadow-[1px_1px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center" type="submit">
<span class="material-symbols-outlined text-lg">send</span>
</button>
</form>
</div>
<div class="p-2.5 bg-cover-900 border-t border-ink-900 text-secondary-fixed flex items-center justify-between text-xs font-label-sm">
<div class="flex items-center gap-2 truncate">
<span class="material-symbols-outlined text-sm text-secondary-fixed">push_pin</span>
<span class="truncate">Currently Attuned: <strong>Node 2.1 (Embeddings &amp; Vector Space)</strong></span>
</div>
<a class="text-secondary-fixed underline hover:text-surface-bright shrink-0 font-bold ml-2" href="#">
            Resume Quest →
          </a>
</div>
</div>
</div>
</div>
<script>
    (function initRoadmapView() {
      const applyBtn = document.getElementById('applyRoadmapTopBtn');
      const planBtn = document.getElementById('applyPlanBtn');
      const chatForm = document.getElementById('chatForm');
      const chatInput = document.getElementById('chatInput');
      const chips = document.querySelectorAll('.prompt-chip');
      function confirmPlan() {
        const confirmed = confirm('Apply Roadmap v2.0? Daily target will adjust to 30 min/day and Sector 02 rites will resize into 15m modular units.');
        if (confirmed) {
          alert('Roadmap v2.0 has been inscribed! Your streak is safely shielded for the Exam arc.');
          if (applyBtn) {
            applyBtn.innerHTML = '<span class="material-symbols-outlined text-[16px]">check</span> v2.0 Active (30m/d)';
            applyBtn.classList.remove('bg-accent');
            applyBtn.classList.add('bg-mana-full');
          }
        }
      }
      if (applyBtn) applyBtn.addEventListener('click', confirmPlan);
      if (planBtn) planBtn.addEventListener('click', confirmPlan);
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          if (chatInput) {
            chatInput.value = chip.textContent.trim();
            chatInput.focus();
          }
        });
      });
      if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
          e.preventDefault();
          if (!chatInput || !chatInput.value.trim()) return;
          alert('Aetheria is consulting the Tome for: "' + chatInput.value + '"');
          chatInput.value = '';
        });
      }
    })();
  </script>
</div></main></div>
</body></html>
````

## File: design/asset/roadmap_visual_arcana_node_graph_en/code.html
````html
<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta content="width=device-width, initial-scale=1.0" name="viewport"/><meta content="web_dashboard" name="shell-type"/><link href="https://fonts.googleapis.com" rel="preconnect"/><link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/><link href="https://fonts.googleapis.com/css2?family=Anton&amp;family=Marcellus&amp;family=Literata:ital,opsz,wght@0,7..72,400..900;1,7..72,400..900&amp;display=swap" rel="stylesheet"/><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/><style>
@layer base {
  html, body { margin: 0; padding: 0; }
  body { overscroll-behavior: none; }
  main > :first-child { margin-top: 0 !important; }
  main > :last-child { margin-bottom: 0 !important; }
}
::-webkit-scrollbar { display: none; }
@keyframes dashFlow {
  to { stroke-dashoffset: -28; }
}
.flowing-leyline {
  stroke-dasharray: 7, 5;
  animation: dashFlow 1.6s linear infinite;
}
@keyframes pulseRing {
  0% { transform: scale(0.96); opacity: 0.8; }
  50% { transform: scale(1.12); opacity: 0.2; }
  100% { transform: scale(0.96); opacity: 0.8; }
}
.pulse-beacon {
  animation: pulseRing 2.4s ease-in-out infinite;
}
</style><script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-secondary-fixed-variant": "#5b4300", "surface-tint": "#ab351a", "outline-variant": "#e0bfb8", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "tertiary-fixed-dim": "#91cdff", "surface": "#fff9ed", "secondary": "#785a00", "secondary-container": "#ffd576", "inverse-on-surface": "#f9f0d9", "on-primary-container": "#ffd8d0", "on-tertiary-container": "#c8e4ff", "primary-container": "#b23a1f", "tertiary-fixed": "#cce5ff", "primary-fixed-dim": "#ffb4a3", "inverse-primary": "#ffb4a3", "background": "#fff9ed", "error-container": "#ffdad6", "error": "#ba1a1a", "secondary-fixed": "#ffdf9b", "accent": "#B23A1F", "on-surface": "#1f1c0e", "on-secondary-container": "#795a00", "page-raised": "#F6F0DE", "on-primary-fixed": "#3d0600", "on-tertiary-fixed": "#001e31", "on-error-container": "#93000a", "outline": "#8c716b", "primary": "#912208", "on-tertiary": "#ffffff", "on-secondary": "#ffffff", "surface-dim": "#e1dac3", "inverse-surface": "#343021", "tertiary": "#00507a", "surface-container-highest": "#eae2cb", "surface-container": "#f6eed6", "surface-variant": "#eae2cb", "on-primary-fixed-variant": "#891d04", "ink-900": "#2A2419", "primary-fixed": "#ffdad2", "secondary-fixed-dim": "#eac165", "cover-900": "#16130D", "on-error": "#ffffff", "on-secondary-fixed": "#251a00", "on-surface-variant": "#58413c", "surface-container-lowest": "#ffffff", "surface-container-low": "#fbf3dc", "tertiary-container": "#00699e", "on-background": "#1f1c0e", "on-primary": "#ffffff", "ink-700": "#4A4030", "mana-full": "#3F6B45", "surface-container-high": "#f0e8d1", "on-tertiary-fixed-variant": "#004b72" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-3xl": "64px", "space-lg": "24px", "space-md": "16px", "space-2xl": "48px", "gutter": "1rem", "space-sm": "8px", "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem" }, "fontFamily": { "headline-md": [ "Literata" ], "body-base": [ "Literata" ], "label-sm": [ "Marcellus", "serif" ], "headline-lg": [ "Literata" ], "body-lg": [ "Literata" ], "headline-display": [ "Literata" ], "numeral": [ "Anton", "sans-serif" ] }, "fontSize": { "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ] } } } };</script></head><body class="bg-page-base text-ink-900 font-body-base text-body-base antialiased min-h-screen">
<header class="fixed top-0 left-0 right-0 h-16 z-50 bg-cover-900 border-b border-ink-900 shadow-[0_3px_0_#2A2419] flex items-center justify-between px-space-md lg:px-space-lg">
<div class="flex items-center gap-space-md">
<img alt="Magical guild crest emblem" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"/>
<div class="flex flex-col">
<span class="font-headline-md text-[15px] tracking-wider uppercase text-secondary-fixed leading-none">LIFEOS GRIMOIRE</span>
<span class="font-label-sm text-[10px] text-surface-dim tracking-widest uppercase opacity-80 mt-0.5">Tome of Mastery • Vol. IV</span>
</div>
</div>
<div class="hidden xl:flex items-center gap-2 bg-[#211C14] px-3.5 py-1.5 rounded border border-[#3E3321] text-surface-bright shadow-inner cursor-pointer hover:border-secondary-fixed transition-colors">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed">flag</span>
<span class="font-label-sm text-[12px] text-surface-dim uppercase tracking-wider">Goal:</span>
<span class="font-body-base text-[13px] font-bold text-secondary-fixed truncate max-w-xs">Build Document Q&amp;A Chatbot with RAG</span>
<span class="material-symbols-outlined text-[16px] text-surface-dim opacity-70 ml-1">arrow_drop_down</span>
</div>
<div class="flex items-center gap-space-md lg:gap-space-lg">
<div class="hidden md:flex items-center gap-space-md bg-[#211C14] px-3 py-1.5 rounded border border-[#3A3224]">
<div class="flex flex-col">
<span class="font-label-sm text-[10px] text-secondary-fixed tracking-wider uppercase">Mana Core</span>
<div class="flex items-center gap-1 mt-1">
<div class="w-3 h-2 bg-mana-full rounded-sm"></div>
<div class="w-3 h-2 bg-mana-full rounded-sm"></div>
<div class="w-3 h-2 bg-mana-full rounded-sm"></div>
<div class="w-3 h-2 bg-mana-full rounded-sm"></div>
<div class="w-3 h-2 bg-mana-full/40 rounded-sm"></div>
</div>
</div>
<div class="h-6 w-px bg-ink-700 mx-1"></div>
<div class="flex flex-col">
<span class="font-label-sm text-[10px] text-surface-dim uppercase tracking-wider">Status</span>
<span class="font-label-sm text-[12px] text-secondary-fixed-dim font-bold">Rank VII Adept</span>
</div>
</div>
<div class="hidden sm:flex items-center gap-2">
<button class="w-8 h-8 rounded bg-[#211C14] border border-[#3A3224] text-surface-dim hover:text-surface-bright flex items-center justify-center transition-colors relative" title="Chronicle Notifications">
<span class="material-symbols-outlined text-[17px]">notifications</span>
<span class="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full"></span>
</button>
<div class="px-2 py-1 rounded bg-[#211C14] border border-[#3A3224] text-surface-dim font-label-sm text-[11px] font-bold">
EN
</div>
</div>
<div class="flex items-center gap-space-sm pl-space-sm border-l border-ink-700">
<div class="flex flex-col text-right hidden sm:flex">
<span class="font-label-sm text-[13px] text-surface-bright leading-tight font-bold">Minh</span>
<span class="font-label-sm text-[10px] text-secondary-fixed opacity-90 uppercase">Level 3 • 250 XP</span>
</div>
<div class="relative p-0.5 rounded-full border border-secondary-fixed">
<img alt="Profile avatar" class="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"/>
</div>
</div>
</div>
</header>
<aside class="fixed top-16 left-0 bottom-0 w-[232px] bg-[#211C14] border-r border-ink-900 z-40 flex flex-col justify-between shadow-[3px_0_0_#2A2419]">
<div class="flex flex-col">
<div class="p-space-md border-b border-[#342D20] bg-cover-900/60">
<div class="flex items-center gap-2">
<svg class="w-4 h-4 text-secondary-fixed shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewbox="0 0 24 24"><path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"></path></svg>
<span class="font-label-sm text-[11px] text-surface-dim uppercase tracking-widest">CHRONICLE CYCLE</span>
</div>
<p class="font-headline-md text-[18px] text-secondary-fixed leading-tight mt-1">Day 142</p>
<p class="font-label-sm text-[11px] text-surface-dim opacity-80 mt-0.5">Winter Solstice Arc</p>
</div>
<nav class="p-space-sm flex flex-col gap-1.5 mt-space-sm">
<a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="today" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
<span>Today</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="my-knowledge" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><circle cx="12" cy="5" r="2.5"></circle><circle cx="6" cy="18" r="2.5"></circle><circle cx="18" cy="18" r="2.5"></circle><path d="M12 7.5v4M12 11.5l-4.5 4.5M12 11.5l4.5 4.5"></path></svg>
<span>My Knowledge</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded font-label-sm text-label-sm transition-colors bg-accent text-surface-bright font-bold shadow-[2px_2px_0_#2A2419] border border-ink-900" data-path="roadmap" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><polygon fill="currentColor" fill-opacity="0.2" points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
<span>Roadmap</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="companion" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><path d="m18 2 4 4-14 14H4v-4L18 2z"></path><path d="m14.5 5.5 4 4"></path><path d="m3 21 3-3"></path></svg>
<span>Companion</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="progress" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><path d="M3 3v18h18"></path><path d="m19 9-5 5-4-4-5 5"></path><circle cx="19" cy="9" fill="currentColor" r="1.5"></circle></svg>
<span>Progress</span>
</a>
</nav>
</div>
<div class="flex flex-col border-t border-[#342D20] p-space-sm bg-cover-900">
<nav class="mb-space-sm">
<a class="flex items-center gap-3 px-3 py-2 rounded text-surface-dim hover:bg-cover-900 hover:text-surface-bright transition-colors font-label-sm text-label-sm" data-path="settings" href="#">
<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
<span>Settings</span>
</a>
</nav>
<div class="px-3 py-2 rounded bg-[#2A2317] border border-[#3E3321] mb-2">
<div class="flex items-center justify-between">
<div class="flex items-center gap-1.5">
<svg class="w-3.5 h-3.5 text-mana-full shrink-0" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewbox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
<span class="font-label-sm text-[11px] text-secondary-fixed">Aegis Seal</span>
</div>
<span class="font-label-sm text-[11px] text-mana-full font-bold">98%</span>
</div>
<div class="w-full bg-[#1A160F] h-1.5 rounded-full mt-1.5 overflow-hidden">
<div class="bg-mana-full h-full w-[98%]"></div>
</div>
<span class="font-label-sm text-[10px] text-surface-dim/70 block mt-1 uppercase tracking-wider">Active Barrier</span>
</div>
<div class="px-2 py-1 text-[9px] font-label-sm text-surface-dim/50 leading-tight border-t border-[#2A2419] pt-2">
<p class="truncate">Tome Synchronized • Shounen Engine v2.4</p>
<p class="truncate text-[8px] text-surface-dim/40">Sanctum ID: #8820-EX</p>
</div>
</div>
</aside>
<div class="pl-[232px]">
<main class="relative pt-16 bg-page-base min-h-screen max-w-7xl mx-auto px-space-md lg:px-space-xl py-space-lg">
<div class="flex flex-col w-full text-ink-900 font-body-base">
<section class="flex flex-col gap-space-sm mb-space-md">
<div class="flex flex-wrap items-center justify-between gap-space-sm">
<div class="flex items-center gap-2">
<span class="font-label-sm text-[11px] tracking-widest uppercase text-ink-700">LEYS &amp; CHRONICLES</span>
<span class="text-ink-700 opacity-40">/</span>
<span class="font-label-sm text-[11px] tracking-widest uppercase text-accent font-bold">ADAPTIVE EXPEDITION MAP</span>
</div>
<div class="flex items-center gap-space-xs">
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-ink-700 border border-[#D5CBB2]">Week 7 of 16</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-mana-full/15 text-mana-full border border-mana-full/30 font-bold flex items-center gap-1">
<span class="material-symbols-outlined text-[12px]">verified</span>
Streak Seal: Active
</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-surface-container-high text-ink-700">Tome Synchrony 99.4%</span>
<span class="font-label-sm text-[11px] px-2 py-0.5 rounded bg-primary text-on-primary font-bold">ARCANA V2.0 ENGINE</span>
</div>
</div>
<div class="flex flex-wrap items-baseline justify-between gap-space-md">
<div class="flex flex-wrap items-center gap-3">
<h1 class="font-headline-lg text-headline-md lg:text-headline-lg text-ink-900 tracking-tight font-extrabold">Roadmap &amp; Expedition</h1>
<div class="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container-high text-ink-900 border border-[#D8CDB6] shadow-sm">
<span class="material-symbols-outlined text-[16px] text-accent">flag</span>
<span class="font-label-sm text-[12px]">Goal: Build Document Q&amp;A Chatbot with RAG</span>
</div>
</div>
<div class="flex items-center p-1 rounded bg-surface-dim shadow-[2px_2px_0_#2A2419] border border-[#2A2419]">
<button class="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-on-primary font-label-sm text-[12px] font-bold shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5" id="view-graph-btn">
<span class="material-symbols-outlined text-[16px]">hub</span>
<span class="tracking-wide uppercase">Node Graph</span>
</button>
<button class="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-ink-700 hover:text-ink-900 font-label-sm text-[12px] font-bold transition-colors" id="view-list-btn">
<span class="material-symbols-outlined text-[16px]">format_list_bulleted</span>
<span class="tracking-wide uppercase">Expedition Chapters (List)</span>
</button>
</div>
</div>
</section>
<section class="mb-space-md p-space-md rounded bg-[#FBF3DC] border-2 border-accent/70 shadow-[3px_3px_0_#2A2419] flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
<div class="flex items-start gap-space-sm max-w-3xl">
<div class="w-8 h-8 rounded bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
<span class="material-symbols-outlined text-[20px]">warning</span>
</div>
<div class="flex flex-col">
<div class="flex items-center gap-2">
<span class="font-label-sm text-[11px] tracking-wider uppercase text-primary font-bold">ARCANA PACING ADVISORY</span>
<span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
<span class="font-label-sm text-[11px] text-ink-700 uppercase tracking-wide font-semibold">FRICTION DETECTED IN VECTOR OPERATIONS</span>
</div>
<p class="font-body-base text-[14px] text-ink-700 mt-1 leading-snug">
The AI Sentinel observed 3 missed practice sessions in Embeddings &amp; Vector Space. Recommended adjustment: <span class="font-bold text-ink-900">60 min/day → 30 min/day</span> until Mid-Term exams conclude.
</p>
</div>
</div>
<div class="flex items-center gap-space-xs shrink-0 w-full md:w-auto justify-end">
<button class="px-3.5 py-1.5 rounded bg-surface-container-high hover:bg-surface-dim text-ink-900 font-label-sm text-[12px] font-bold border border-[#2A2419] shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 transition-all">
Inspect Proposed v2.0 Diff
</button>
<button class="px-4 py-1.5 rounded bg-primary text-on-primary hover:bg-primary-container font-label-sm text-[12px] font-bold border border-[#2A2419] shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 transition-all">
Apply Adjusted Roadmap
</button>
</div>
</section>
<section class="flex flex-wrap items-center justify-between gap-space-sm bg-surface-container px-space-md py-space-xs rounded-t border-t border-x border-[#2A2419] shadow-sm">
<div class="flex items-center gap-space-xs flex-wrap">
<span class="font-label-sm text-[11px] uppercase tracking-wider text-ink-700 mr-1 font-bold">Filter:</span>
<button class="px-2.5 py-1 rounded bg-cover-900 text-secondary-fixed font-label-sm text-[12px] font-bold shadow-[1px_1px_0_#2A2419]">All Leylines</button>
<button class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-dim text-ink-700 font-label-sm text-[12px] border border-[#C5BBA4]">Active Focus Only</button>
<button class="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-dim text-ink-700 font-label-sm text-[12px] border border-[#C5BBA4]">Prerequisites Path</button>
</div>
<div class="flex items-center gap-space-sm">
<div class="relative flex items-center">
<span class="material-symbols-outlined absolute left-2 text-[16px] text-ink-700/60 pointer-events-none">search</span>
<input class="pl-7 pr-3 py-1 rounded bg-surface-container-lowest text-ink-900 placeholder:text-ink-700/50 font-label-sm text-[12px] border border-[#2A2419] focus:outline-none focus:ring-1 focus:ring-secondary w-44 lg:w-56 shadow-inner" placeholder="Search Leyline nodes..." type="text"/>
</div>
<div class="flex items-center rounded bg-surface-container-high border border-[#2A2419] shadow-[1px_1px_0_#2A2419] p-0.5">
<button class="w-6 h-6 flex items-center justify-center hover:bg-surface-dim text-ink-900 rounded-sm" title="Zoom in">
<span class="material-symbols-outlined text-[16px]">add</span>
</button>
<button class="w-6 h-6 flex items-center justify-center hover:bg-surface-dim text-ink-900 rounded-sm" title="Zoom out">
<span class="material-symbols-outlined text-[16px]">remove</span>
</button>
<button class="px-2 h-6 flex items-center justify-center hover:bg-surface-dim text-ink-900 font-label-sm text-[10px] font-bold uppercase rounded-sm" title="Fit to Screen">
FIT
</button>
</div>
</div>
</section>
<section class="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start mb-space-md">
<div class="lg:col-span-8 relative bg-page-raised border-2 border-[#2A2419] rounded shadow-[4px_4px_0_#2A2419] overflow-hidden min-h-[680px] flex flex-col justify-between">
<div class="absolute inset-0 pointer-events-none opacity-25" style="background-image: radial-gradient(#4A4030 1.25px, transparent 1.25px); background-size: 26px 26px;"></div>
<div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-15 overflow-hidden">
<svg class="w-[720px] h-[720px] text-ink-900" fill="none" viewbox="0 0 500 500">
<circle cx="250" cy="250" r="230" stroke="currentColor" stroke-dasharray="3 6" stroke-width="1.5"></circle>
<circle cx="250" cy="250" r="160" stroke="currentColor" stroke-dasharray="6 8" stroke-width="1"></circle>
<circle cx="250" cy="250" r="90" stroke="currentColor" stroke-width="1"></circle>
<line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.75" x1="20" x2="480" y1="250" y2="250"></line>
<line stroke="currentColor" stroke-dasharray="2 4" stroke-width="0.75" x1="250" x2="250" y1="20" y2="480"></line>
</svg>
</div>
<div class="absolute top-3 left-4 right-4 flex justify-between pointer-events-none select-none text-[10px] font-label-sm uppercase tracking-widest text-ink-700/60 z-0">
<span class="flex items-center gap-1 text-mana-full font-bold"><span class="w-1.5 h-1.5 rounded-full bg-mana-full"></span>Sector 01: Foundational (Cleared)</span>
<span class="flex items-center gap-1 text-accent font-bold"><span class="w-1.5 h-1.5 rounded-full bg-accent"></span>Sector 02: Active Expedition</span>
<span class="flex items-center gap-1 text-ink-700 font-bold"><span class="w-1.5 h-1.5 rounded-full bg-ink-700/60"></span>Sector 03 &amp; 04: Apex Trials</span>
</div>
<svg class="absolute inset-0 w-full h-full pointer-events-none z-10" preserveaspectratio="none" viewbox="0 0 760 620" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="arrow-green" markerheight="6" markerwidth="6" orient="auto-start-reverse" refx="6" refy="5" viewbox="0 0 10 10">
<path d="M 0 1 L 8 5 L 0 9 z" fill="#3F6B45"></path>
</marker>
<marker id="arrow-cinnabar" markerheight="6" markerwidth="6" orient="auto-start-reverse" refx="6" refy="5" viewbox="0 0 10 10">
<path d="M 0 1 L 8 5 L 0 9 z" fill="#B23A1F"></path>
</marker>
<marker id="arrow-gold" markerheight="6" markerwidth="6" orient="auto-start-reverse" refx="6" refy="5" viewbox="0 0 10 10">
<path d="M 0 1 L 8 5 L 0 9 z" fill="#785a00"></path>
</marker>
<marker id="arrow-locked" markerheight="6" markerwidth="6" orient="auto-start-reverse" refx="6" refy="5" viewbox="0 0 10 10">
<path d="M 0 1 L 8 5 L 0 9 z" fill="#8c716b"></path>
</marker>
<lineargradient id="gradGreenToRed" x1="0%" x2="100%" y1="0%" y2="0%">
<stop offset="0%" stop-color="#3F6B45"></stop>
<stop offset="60%" stop-color="#785a00"></stop>
<stop offset="100%" stop-color="#B23A1F"></stop>
</lineargradient>
</defs>
<path d="M 105 185 L 105 395" fill="none" stroke="#3F6B45" stroke-linecap="round" stroke-width="3"></path>
<path d="M 145 160 C 200 160, 220 200, 280 200" fill="none" marker-end="url(#arrow-cinnabar)" stroke="url(#gradGreenToRed)" stroke-width="3.5"></path>
<path class="flowing-leyline" d="M 145 420 C 220 420, 230 220, 280 210" fill="none" stroke="#B23A1F" stroke-width="3"></path>
<path d="M 145 425 C 200 425, 230 425, 280 425" fill="none" marker-end="url(#arrow-gold)" stroke="#785a00" stroke-width="2.5"></path>
<path class="flowing-leyline" d="M 370 200 C 430 200, 420 310, 460 310" fill="none" marker-end="url(#arrow-cinnabar)" stroke="#B23A1F" stroke-width="2.5"></path>
<path d="M 360 425 C 410 425, 420 320, 460 320" fill="none" marker-end="url(#arrow-gold)" stroke="#785a00" stroke-width="2.5"></path>
<path d="M 540 310 C 565 310, 565 190, 595 190" fill="none" marker-end="url(#arrow-locked)" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2"></path>
<path d="M 540 320 C 565 320, 565 410, 595 410" fill="none" marker-end="url(#arrow-locked)" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2"></path>
<path d="M 660 190 C 685 190, 680 290, 695 295" fill="none" marker-end="url(#arrow-locked)" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2.5"></path>
<path d="M 660 410 C 685 410, 680 310, 695 305" fill="none" marker-end="url(#arrow-locked)" stroke="#8c716b" stroke-dasharray="4 4" stroke-width="2.5"></path>
</svg>
<div class="relative z-20 w-full h-[620px]">
<div class="absolute top-[115px] left-[55px] flex flex-col items-center group cursor-pointer" style="width: 105px;">
<div class="relative w-16 h-16 rounded-full bg-[#EAE2CB] border-2 border-mana-full shadow-[2px_2px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105">
<div class="w-12 h-12 rounded-full bg-mana-full/10 border border-mana-full/40 flex items-center justify-center">
<span class="material-symbols-outlined text-mana-full text-[24px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<span class="absolute -top-2 px-1.5 py-0.2 rounded-full bg-mana-full text-surface-bright font-label-sm text-[9px] font-bold tracking-wider">1.1</span>
</div>
<div class="mt-2 text-center bg-surface-container-high/90 px-2 py-1 rounded border border-[#C5BBA4] shadow-[1px_1px_0_#2A2419] backdrop-blur-xs w-28">
<p class="font-headline-md text-[11px] font-bold text-ink-900 leading-tight">Python Core &amp; File I/O</p>
<span class="font-label-sm text-[9px] text-mana-full font-bold block mt-0.5">Mastered • +50 XP</span>
</div>
</div>
<div class="absolute top-[375px] left-[55px] flex flex-col items-center group cursor-pointer" style="width: 105px;">
<div class="relative w-16 h-16 rounded-full bg-[#EAE2CB] border-2 border-mana-full shadow-[2px_2px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105">
<div class="w-12 h-12 rounded-full bg-mana-full/10 border border-mana-full/40 flex items-center justify-center">
<span class="material-symbols-outlined text-mana-full text-[24px]" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<span class="absolute -top-2 px-1.5 py-0.2 rounded-full bg-mana-full text-surface-bright font-label-sm text-[9px] font-bold tracking-wider">1.2</span>
</div>
<div class="mt-2 text-center bg-surface-container-high/90 px-2 py-1 rounded border border-[#C5BBA4] shadow-[1px_1px_0_#2A2419] backdrop-blur-xs w-32">
<p class="font-headline-md text-[11px] font-bold text-ink-900 leading-tight">HTTP Client &amp; REST</p>
<span class="font-label-sm text-[9px] text-mana-full font-bold block mt-0.5">Mastered • +25 XP</span>
</div>
</div>
<div class="absolute top-[140px] left-[265px] flex flex-col items-center group cursor-pointer z-30" style="width: 155px;">
<div class="absolute top-0 w-24 h-24 rounded-full bg-accent/20 pulse-beacon pointer-events-none"></div>
<div class="relative w-20 h-20 rounded-full bg-surface-container-lowest border-[3px] border-accent shadow-[3px_3px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105 ring-4 ring-accent/30">
<div class="w-14 h-14 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center">
<span class="material-symbols-outlined text-accent text-[30px]" style="font-variation-settings: 'FILL' 1;">trip_origin</span>
</div>
<span class="absolute -top-3 px-2 py-0.5 rounded-full bg-accent text-on-primary font-label-sm text-[9px] font-extrabold tracking-wider uppercase shadow-xs">
ACTIVE FOCUS
</span>
<span class="absolute -bottom-2 px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[9px] font-bold tracking-wider">
Node 2.1
</span>
</div>
<div class="mt-3 text-center bg-surface-container-lowest p-2 rounded border-2 border-accent shadow-[2px_2px_0_#2A2419] w-36">
<div class="inline-block px-1 rounded bg-secondary-fixed text-[8px] font-label-sm font-bold text-on-secondary-fixed uppercase mb-0.5">Rank B Trial</div>
<p class="font-headline-md text-[12px] font-bold text-ink-900 leading-tight">Embeddings &amp; Vector Space</p>
<div class="w-full bg-surface-dim h-1.5 rounded-full mt-1.5 overflow-hidden">
<div class="bg-accent h-full w-[60%]"></div>
</div>
<span class="font-label-sm text-[9px] text-accent font-bold block mt-1">3/5 Rites (60%)</span>
</div>
</div>
<div class="absolute top-[375px] left-[270px] flex flex-col items-center group cursor-pointer" style="width: 140px;">
<div class="relative w-16 h-16 rounded-full bg-surface-container-high border-2 border-[#8A6A14] border-dashed shadow-[2px_2px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105">
<div class="w-12 h-12 rounded-full bg-[#FFD576]/25 border border-[#8A6A14]/40 flex items-center justify-center">
<span class="material-symbols-outlined text-[#785A00] text-[24px]">call_split</span>
</div>
<span class="absolute -top-2.5 px-1.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[8px] font-bold tracking-wider uppercase border border-[#785a00]/30">Ready</span>
<span class="absolute -bottom-1.5 px-1.5 py-0.2 rounded-full bg-surface-dim text-ink-900 font-label-sm text-[8px] font-bold">2.2</span>
</div>
<div class="mt-2 text-center bg-surface-container-high/90 px-2 py-1 rounded border border-[#C5BBA4] shadow-[1px_1px_0_#2A2419] w-32">
<p class="font-headline-md text-[11px] font-bold text-ink-900 leading-tight">Text Chunking Strategies</p>
<span class="font-label-sm text-[9px] text-secondary font-bold block mt-0.5">Unlocked for Study</span>
</div>
</div>
<div class="absolute top-[260px] left-[450px] flex flex-col items-center group cursor-pointer" style="width: 140px;">
<div class="relative w-15 h-15 rounded-full bg-surface-container border-2 border-ink-700/60 shadow-[2px_2px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105">
<div class="w-11 h-11 rounded-full bg-ink-700/10 flex items-center justify-center">
<span class="material-symbols-outlined text-ink-700 text-[20px]">tune</span>
</div>
<span class="absolute -top-2 px-1.5 py-0.2 rounded-full bg-surface-dim text-ink-700 font-label-sm text-[8px] font-bold tracking-wider">2.3</span>
</div>
<div class="mt-2 text-center bg-surface-container/90 px-2 py-1 rounded border border-[#C5BBA4] shadow-[1px_1px_0_#2A2419] w-32">
<p class="font-headline-md text-[11px] font-bold text-ink-900 leading-tight">Chunk Overlap &amp; Tuning</p>
<span class="font-label-sm text-[9px] text-ink-700 block mt-0.5">In Queue • Attuning</span>
</div>
</div>
<div class="absolute top-[145px] left-[585px] flex flex-col items-center opacity-75 group cursor-not-allowed" style="width: 120px;">
<div class="relative w-14 h-14 rounded-full bg-surface-dim border-2 border-dashed border-ink-700/50 shadow-sm flex items-center justify-center">
<span class="material-symbols-outlined text-ink-700/70 text-[20px]">lock</span>
<span class="absolute -top-2 px-1.5 py-0.2 rounded-full bg-ink-700/20 text-ink-700 font-label-sm text-[8px] font-bold">3.1</span>
</div>
<div class="mt-2 text-center bg-surface-dim/90 px-2 py-1 rounded border border-ink-700/30 w-28">
<p class="font-headline-md text-[10px] text-ink-900 leading-tight">Vector Indexing (HNSW)</p>
<span class="font-label-sm text-[8px] text-ink-700/70 block mt-0.5">Locked Leyline</span>
</div>
</div>
<div class="absolute top-[365px] left-[585px] flex flex-col items-center opacity-75 group cursor-not-allowed" style="width: 120px;">
<div class="relative w-14 h-14 rounded-full bg-surface-dim border-2 border-dashed border-ink-700/50 shadow-sm flex items-center justify-center">
<span class="material-symbols-outlined text-ink-700/70 text-[20px]">lock</span>
<span class="absolute -top-2 px-1.5 py-0.2 rounded-full bg-ink-700/20 text-ink-700 font-label-sm text-[8px] font-bold">3.2</span>
</div>
<div class="mt-2 text-center bg-surface-dim/90 px-2 py-1 rounded border border-ink-700/30 w-28">
<p class="font-headline-md text-[10px] text-ink-900 leading-tight">Hybrid Retrieval (BM25)</p>
<span class="font-label-sm text-[8px] text-ink-700/70 block mt-0.5">Locked Leyline</span>
</div>
</div>
<div class="absolute top-[245px] left-[660px] flex flex-col items-center group cursor-pointer z-20" style="width: 140px;">
<div class="relative w-20 h-20 rounded-full bg-cover-900 border-[3px] border-secondary-fixed shadow-[4px_4px_0_#2A2419] flex items-center justify-center transition-transform hover:scale-105">
<div class="w-14 h-14 rounded-full bg-[#342610] border border-secondary-fixed/50 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary-fixed text-[26px]">military_tech</span>
</div>
<span class="absolute -top-3 px-2 py-0.5 rounded-full bg-cover-900 text-secondary-fixed font-label-sm text-[8px] font-bold tracking-widest uppercase border border-secondary-fixed shadow-xs">
APEX BOSS
</span>
<span class="absolute -bottom-1.5 px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[8px] font-bold">
4.0
</span>
</div>
<div class="mt-2 text-center bg-cover-900 text-surface-bright p-2 rounded border border-secondary-fixed/70 shadow-[2px_2px_0_#2A2419] w-36">
<p class="font-headline-md text-[11px] font-bold text-secondary-fixed leading-tight">End-to-End RAG Pipeline &amp; Eval</p>
<div class="flex items-center justify-between text-[8px] font-label-sm text-surface-dim/80 mt-1">
<span>Req: 9 Nodes</span>
<span class="text-secondary-fixed-dim font-bold">+250 XP</span>
</div>
</div>
</div>
</div>
<div class="relative z-20 m-space-sm p-space-xs px-space-sm rounded bg-surface-container/95 border border-[#2A2419] backdrop-blur shadow-[2px_2px_0_#2A2419] inline-flex items-center gap-space-md text-[11px] font-label-sm text-ink-700 w-fit">
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-mana-full"></span>
<span>Mastered (+XP)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-accent ring-2 ring-accent/30 animate-pulse"></span>
<span class="font-bold text-accent">Active Waypoint (Focus)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span>Trial Ready</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-ink-700/40"></span>
<span>Locked Prerequisite</span>
</div>
<div class="flex items-center gap-1.5">
<span class="w-2.5 h-2.5 rounded-full bg-cover-900 border border-secondary-fixed"></span>
<span class="font-bold text-secondary-fixed-variant">Apex Boss Node</span>
</div>
</div>
</div>
<div class="lg:col-span-4 flex flex-col gap-space-md">
<div class="p-space-md rounded bg-page-raised border-2 border-[#2A2419] shadow-[3px_3px_0_#2A2419] flex flex-col gap-space-md">
<div class="flex items-center justify-between border-b border-surface-dim pb-space-xs">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-[18px] text-accent">auto_stories</span>
<span class="font-label-sm text-[11px] tracking-widest uppercase font-bold text-accent">ACTIVE WAYPOINT DOSSIER</span>
</div>
<span class="font-label-sm text-[10px] px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold border border-secondary-fixed-variant/30">Node 2.1</span>
</div>
<div>
<div class="flex items-center justify-between mb-1">
<h2 class="font-headline-md text-headline-md text-ink-900 leading-tight">Embeddings &amp; Vector Space</h2>
</div>
<span class="inline-block font-label-sm text-[11px] text-ink-700 uppercase tracking-wide font-semibold">DIFFICULTY: RANK B TRIAL • EST. 4 HOURS</span>
<p class="font-body-base text-[14px] text-ink-700 mt-space-sm leading-relaxed">
Transform episodic query tokens into high-dimensional latent vectors using OpenAI <code class="px-1 py-0.5 rounded bg-surface-dim text-ink-900 font-mono text-[12px] border border-[#D0C5AD]">text-embedding-3-small</code> and calibrate cosine similarity thresholds against document corpus.
</p>
</div>
<div class="p-space-sm rounded bg-surface-container-low border border-[#D5CBB2] shadow-inner flex flex-col gap-1.5">
<div class="flex items-center justify-between font-label-sm text-[12px]">
<span class="text-ink-900 font-semibold">Resonance Progress</span>
<span class="text-accent font-bold">3 / 5 Rites Sealed (60%)</span>
</div>
<div class="w-full bg-surface-dim h-2.5 rounded-full overflow-hidden border border-[#D0C5AD]">
<div class="bg-accent h-full w-[60%]"></div>
</div>
<div class="flex items-center justify-between font-label-sm text-[10px] text-ink-700">
<span>Rites: Vector Math, Embedding API, Cosine Dist.</span>
<span>2 Rites Pending</span>
</div>
</div>
<div class="flex flex-col gap-1.5">
<span class="font-label-sm text-[11px] text-ink-700 uppercase tracking-wider font-bold">Prerequisites Cleared</span>
<div class="flex flex-col gap-1 font-label-sm text-[12px]">
<div class="flex items-center gap-2 text-ink-900">
<span class="material-symbols-outlined text-[16px] text-mana-full" style="font-variation-settings: 'FILL' 1;">check_box</span>
<span>Python Core &amp; File I/O (Verified)</span>
</div>
<div class="flex items-center gap-2 text-ink-900">
<span class="material-symbols-outlined text-[16px] text-mana-full" style="font-variation-settings: 'FILL' 1;">check_box</span>
<span>HTTP Client &amp; Async I/O (Verified)</span>
</div>
</div>
</div>
<div class="flex flex-col gap-space-xs pt-space-xs">
<button class="w-full py-2.5 px-4 rounded bg-accent text-on-primary hover:bg-primary-container font-label-sm text-[13px] font-bold border border-[#2A2419] shadow-[3px_3px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-[18px]">play_circle</span>
<span>Resume Waypoint Trial</span>
</button>
<button class="w-full py-2 px-4 rounded bg-surface-container-high hover:bg-surface-dim text-ink-900 font-label-sm text-[12px] font-bold border border-[#2A2419] shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
<span class="material-symbols-outlined text-[16px]">menu_book</span>
<span>Inspect Grimoire Notes</span>
</button>
</div>
</div>
<div class="p-space-md rounded bg-[#FBF3DC] border-2 border-[#2A2419] shadow-[3px_3px_0_#2A2419] flex flex-col gap-space-sm">
<div class="flex items-center justify-between border-b border-[#E0D5BA] pb-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-cover-900 text-secondary-fixed flex items-center justify-center border border-secondary-fixed/50">
<span class="material-symbols-outlined text-[14px]">psychology</span>
</div>
<span class="font-label-sm text-[12px] font-bold text-ink-900">Aetheria Sentinel</span>
</div>
<span class="font-label-sm text-[10px] text-ink-700 uppercase tracking-widest">Personal Learning Advisor</span>
</div>
<div class="p-2.5 rounded bg-surface-container-high border border-[#D5CBB2] text-[13px] font-body-base leading-snug text-ink-900 shadow-inner">
<p class="italic text-ink-700">"Friction detected in vector operations. 3 sessions pending in cosine geometry. Would you like a condensed scroll summary or schedule adjustment?"</p>
</div>
<div class="flex flex-wrap gap-1">
<button class="px-2 py-0.5 rounded bg-surface-dim hover:bg-secondary-fixed text-ink-900 font-label-sm text-[10px] border border-[#C5BBA4] transition-colors">
Explain Node 2.1
</button>
<button class="px-2 py-0.5 rounded bg-surface-dim hover:bg-secondary-fixed text-ink-900 font-label-sm text-[10px] border border-[#C5BBA4] transition-colors">
Adjust Pacing
</button>
<button class="px-2 py-0.5 rounded bg-surface-dim hover:bg-secondary-fixed text-ink-900 font-label-sm text-[10px] border border-[#C5BBA4] transition-colors">
Lighten Today
</button>
</div>
<div class="flex items-center gap-1.5 mt-1">
<input class="w-full px-2.5 py-1.5 rounded bg-surface-container-lowest text-ink-900 placeholder:text-ink-700/50 font-label-sm text-[11px] border border-[#2A2419] focus:outline-none focus:ring-1 focus:ring-accent shadow-inner" placeholder="Ask Aetheria to adjust pacing, explain node..." type="text"/>
<button class="p-1.5 rounded bg-accent text-on-primary border border-[#2A2419] shadow-[1px_1px_0_#2A2419] flex items-center justify-center shrink-0 hover:bg-primary-container" title="Send inquiry">
<span class="material-symbols-outlined text-[16px]">send</span>
</button>
</div>
</div>
</div>
</section>
<footer class="mt-auto p-space-sm px-space-md rounded bg-cover-900 text-surface-dim border border-ink-900 shadow-[3px_3px_0_#2A2419] flex flex-wrap items-center justify-between gap-space-md text-[12px] font-label-sm">
<div class="flex items-center gap-space-md flex-wrap">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed">speed</span>
<span>Pacing: <strong class="text-secondary-fixed font-bold">60 min/day</strong> (Current Active v1.0)</span>
</div>
<div class="hidden sm:block h-3.5 w-px bg-ink-700"></div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary-fixed-dim">event</span>
<span>Target Completion: <strong class="text-surface-bright">Oct 25, 2026</strong></span>
</div>
<div class="hidden sm:block h-3.5 w-px bg-ink-700"></div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-mana-full">shield</span>
<span>Streak Shield: <strong class="text-mana-full">1 rest day banked</strong></span>
</div>
</div>
<div class="flex items-center gap-space-sm">
<span class="text-[11px] opacity-70">Sanctum Node Synchronization Active</span>
<span class="w-2 h-2 rounded-full bg-mana-full animate-pulse"></span>
</div>
</footer>
</div>
<script>
  // Micro-interaction for toggle buttons
  const graphBtn = document.getElementById('view-graph-btn');
  const listBtn = document.getElementById('view-list-btn');
  if (graphBtn && listBtn) {
    listBtn.addEventListener('click', () => {
      listBtn.className = "flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-on-primary font-label-sm text-[12px] font-bold shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5";
      graphBtn.className = "flex items-center gap-1.5 px-3.5 py-1.5 rounded text-ink-700 hover:text-ink-900 font-label-sm text-[12px] font-bold transition-colors";
    });
    graphBtn.addEventListener('click', () => {
      graphBtn.className = "flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-accent text-on-primary font-label-sm text-[12px] font-bold shadow-[2px_2px_0_#2A2419] transition-transform active:translate-x-0.5 active:translate-y-0.5";
      listBtn.className = "flex items-center gap-1.5 px-3.5 py-1.5 rounded text-ink-700 hover:text-ink-900 font-label-sm text-[12px] font-bold transition-colors";
    });
  }
</script>
</main>
</div>
</body></html>
````

## File: design/asset/today_grimoire_parchment_lifeos_en/code.html
````html
<!DOCTYPE html><html lang="en" style=""><head><meta charset="utf-8"><meta content="width=device-width, initial-scale=1.0" name="viewport"><meta content="web_dashboard" name="shell-type"><link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;0,7..72,800;0,7..72,900;1,7..72,400&amp;family=Anton&amp;family=Grenze+Gotisch:wght@600;700;800;900&amp;family=Marcellus&amp;display=swap" rel="stylesheet"><link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"><style>@layer base{html,body{margin:0;padding:0;}body{overscroll-behavior:none;}main>:first-child{margin-top:0!important;}main>:last-child{margin-bottom:0!important;}}::-webkit-scrollbar{display:none;}</style><script src="https://cdn.tailwindcss.com"></script><script id="tailwind-config">tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "secondary-container": "#ffd576", "on-tertiary-container": "#c8e4ff", "inverse-primary": "#ffb4a3", "on-primary-fixed-variant": "#891d04", "surface-container-lowest": "#ffffff", "surface": "#fff9ed", "on-secondary": "#ffffff", "surface-tint": "#ab351a", "background": "#fff9ed", "cover-900": "#16130D", "mana-full": "#3F6B45", "page-raised": "#F6F0DE", "on-error-container": "#93000a", "surface-container-highest": "#eae2cb", "primary": "#912208", "accent": "#B23A1F", "tertiary-fixed-dim": "#91cdff", "tertiary-container": "#00699e", "outline": "#8c716b", "on-primary-container": "#ffd8d0", "surface-variant": "#eae2cb", "primary-fixed-dim": "#ffb4a3", "on-error": "#ffffff", "surface-dim": "#e1dac3", "tertiary": "#00507a", "on-tertiary-fixed-variant": "#004b72", "on-tertiary": "#ffffff", "inverse-surface": "#343021", "primary-fixed": "#ffdad2", "ink-700": "#4A4030", "on-secondary-fixed-variant": "#5b4300", "secondary-fixed-dim": "#eac165", "tertiary-fixed": "#cce5ff", "primary-container": "#b23a1f", "error": "#ba1a1a", "on-secondary-container": "#795a00", "surface-container-low": "#fbf3dc", "on-surface": "#1f1c0e", "on-secondary-fixed": "#251a00", "on-tertiary-fixed": "#001e31", "secondary-fixed": "#ffdf9b", "error-container": "#ffdad6", "on-background": "#1f1c0e", "surface-bright": "#fff9ed", "page-base": "#F1E9D2", "surface-container": "#f6eed6", "surface-container-high": "#f0e8d1", "on-surface-variant": "#58413c", "inverse-on-surface": "#f9f0d9", "secondary": "#785a00", "outline-variant": "#e0bfb8", "on-primary-fixed": "#3d0600", "on-primary": "#ffffff", "ink-900": "#2A2419" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "space-xl": "32px", "space-xs": "4px", "margin": "1.5rem", "gutter": "1rem", "space-md": "16px", "space-lg": "24px", "space-2xl": "48px", "space-sm": "8px", "space-3xl": "64px" }, "fontFamily": { "body-base": [ "Literata" ], "headline-md": [ "Literata" ], "headline-display": [ "Literata" ], "headline-lg": [ "Literata" ], "label-sm": [ "Literata" ], "body-lg": [ "Literata" ], "gotisch": [ "Grenze Gotisch", "serif" ], "anton": [ "Anton", "sans-serif" ], "marcellus": [ "Marcellus", "serif" ] }, "fontSize": { "body-base": [ "17px", { "lineHeight": "1.6", "fontWeight": "400" } ], "headline-md": [ "30px", { "lineHeight": "1.25", "fontWeight": "700" } ], "headline-display": [ "48px", { "lineHeight": "1.1", "fontWeight": "900" } ], "headline-lg": [ "40px", { "lineHeight": "1.2", "fontWeight": "800" } ], "label-sm": [ "13px", { "lineHeight": "1.4", "fontWeight": "600" } ], "body-lg": [ "20px", { "lineHeight": "1.5", "fontWeight": "400" } ] } } } };</script></head><body class="bg-page-base font-body-base text-ink-900 antialiased selection:bg-secondary-container selection:text-ink-900"><header class="fixed top-0 left-0 right-0 h-14 bg-cover-900 z-50 shadow-[0_4px_12px_rgba(22,19,13,0.3)]"><div class="h-14 w-full px-space-lg flex items-center justify-between"><div class="flex items-center gap-space-md"><img alt="Magical guild crest emblem featuring an illuminated branching tree of knowledge combined with a grimoire quill and open book silhouette, antique gold #E3B85F lines and radiant magic teal #64D8C5 aura, clean vector anime fantasy insignia for LifeOS.. Design context: - Primary color: #e3b85f
- Font: beVietnamPro
- Mode: dark
- Roundness: rounded-md
. The logo should be visually consistent with these brand tokens." class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Uq6j5UQwIUik976jxhvqhbsAaLUjUsNzVBidbJ933bSGD3ajx5gA0TPgSvG_Z2QgcNoeZAojE35sBrcMkQ05PKa3mDhniULQu-s5WyPuro0Eh3XwEkM7o5ZinmxY21pV9HG_Q9OlkH9_HhQw7lENJvRVAs62ZXvwbIGr5MTu626TNp_UbeCOzlZJOJFYGhXZML1I7fp6t-fMUj3d9HbJbLECJH53vh8-HAAU_kNvyzZkAU0wYssICQgyg"><div class="flex flex-col"><span class="font-label-sm text-label-sm tracking-widest uppercase text-secondary-fixed-dim">LIFEOS GRIMOIRE</span><span class="font-label-sm text-label-sm text-inverse-on-surface/60">Tome of Mastery • Vol. IV</span></div></div><div class="flex items-center gap-space-lg"><div class="hidden md:flex items-center gap-space-sm bg-cover-900/80 px-space-md py-1 rounded border border-outline/30"><span class="material-symbols-outlined text-secondary-fixed-dim text-sm">auto_stories</span><span class="font-label-sm text-label-sm text-inverse-on-surface">Mana Core:</span><div class="w-24 h-2 bg-cover-900 rounded-full overflow-hidden border border-outline/40"><div class="w-3/4 h-full bg-mana-full"></div></div></div><div class="flex items-center gap-space-md pl-space-md border-l border-outline/20"><div class="hidden sm:flex flex-col text-right"><span class="font-label-sm text-label-sm text-inverse-on-surface font-semibold">Grand Scholar</span><span class="font-label-sm text-label-sm text-secondary-fixed-dim">Rank VII Adept</span></div><img alt="Profile" class="w-8 h-8 rounded-full object-cover ring-1 ring-secondary-container/50" src="https://lh3.googleusercontent.com/aida/AEtjO1XOw5IFqZ-u0u5M8YBwhHdsFWs36i6gJkM9LUiTcLFObcXtwuEtJS0HKVvI-7h9y42A8poxNKLbwbUA9NnL7bD9WmyiAUvnTM7fbFSeYrY2sfs_RIe6Bg7042bCgCfPpA1XA_W0yESjvxYXghKzRMoVO2W53lwzgkPkQIaH3NmkPNduxESYURRtQKkYmxrNgxrqGrnTp-zi-8U2Kle-_SME2g-9JDuKZU8ltxyvVzHEEzs-uKdrmiPkJII"></div></div></div></header><aside class="fixed left-0 top-14 bottom-10 w-64 bg-cover-900 z-40 flex flex-col border-r border-outline/30 shadow-[4px_0_16px_rgba(22,19,13,0.15)]"><div class="p-space-lg pb-space-sm"><div class="p-space-md rounded bg-cover-900/60 border border-outline/40 mb-space-md"><div class="flex items-center justify-between text-secondary-fixed-dim mb-space-xs"><span class="font-label-sm text-label-sm uppercase tracking-wider">Chronicle Cycle</span><span class="material-symbols-outlined text-base">hourglass_top</span></div><div class="font-headline-md text-body-lg text-inverse-on-surface font-bold">Day 142</div><div class="font-label-sm text-label-sm text-inverse-on-surface/70">Winter Solstice Arc</div></div></div><nav class="flex-1 px-space-md space-y-space-xs" data-active-classes="bg-accent text-on-primary font-bold shadow-[2px_2px_0_#16130D] translate-x-1"><a aria-current="page" class="flex items-center px-space-md py-space-sm rounded transition-all bg-accent text-on-primary font-bold shadow-[2px_2px_0_#16130D] translate-x-1" data-path="today" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">menu_book</span>Today</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="my-knowledge" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">account_tree</span>My Knowledge</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="roadmap" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">explore</span>Roadmap</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="companion" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">swords</span>Companion</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="progress" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">insights</span>Progress</a><a class="flex items-center px-space-md py-space-sm rounded text-inverse-on-surface/80 hover:bg-cover-900/90 hover:text-secondary-fixed-dim transition-all" data-path="settings" href="#"><span class="material-symbols-outlined mr-space-md text-secondary-fixed-dim">tune</span>Settings</a></nav><div class="p-space-md m-space-md rounded bg-cover-900 border border-outline/20 flex items-center justify-between"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-secondary-container text-lg">shield</span><span class="font-label-sm text-label-sm text-inverse-on-surface">Aegis Seal Active</span></div><span class="font-label-sm text-label-sm text-mana-full font-bold">98%</span></div></aside><div class="pl-64"><main class="relative pt-14 pb-12 min-h-screen bg-page-base px-space-xl"><div class="flex flex-col w-full max-w-[1280px] mx-auto pb-16 space-y-space-xl text-ink-900">
<div class="w-full bg-page-raised p-space-md rounded shadow-[3px_3px_0_#2A2419] flex flex-wrap items-center justify-between gap-space-md relative overflow-hidden">
<div class="absolute left-0 top-0 bottom-0 w-2 bg-accent"></div>
<div class="flex items-center gap-space-md pl-space-sm flex-wrap">
<div class="flex items-center gap-space-xs bg-cover-900 text-secondary-fixed-dim px-space-sm py-0.5 rounded text-label-sm font-label-sm uppercase tracking-wider font-bold">
<span class="material-symbols-outlined text-sm">flag</span>
<span class="">CURRENT GOAL</span>
</div>
<h1 class="font-body-lg text-body-lg font-bold text-ink-900 tracking-tight">
        Build Document Q&amp;A Chatbot with RAG
      </h1>
<span class="inline-flex items-center gap-1 px-space-sm py-0.5 rounded bg-surface-container-highest text-ink-700 font-label-sm text-label-sm border border-outline/30">
<span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        Sample Data
      </span>
</div>
<div class="flex items-center gap-space-lg text-ink-700 font-label-sm text-label-sm">
<div class="flex items-center gap-1.5 bg-page-base px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419]">
<span class="material-symbols-outlined text-accent text-sm">calendar_today</span>
<span class="font-bold text-ink-900">28/09/2026</span>
<span class="text-ink-700/60 font-normal">· Autumn Era IV</span>
</div>
<div class="hidden lg:flex items-center gap-1 text-mana-full font-bold">
<span class="material-symbols-outlined text-sm">sync</span>
<span class="">Tome Synchronized</span>
</div>
</div>
</div>
<!-- 2. Hero Parchment Banner (PanelFrame Style with Luminous Knowledge Tree Image) -->
<div class="w-full bg-page-raised rounded shadow-[4px_4px_0_#2A2419] p-space-xl relative overflow-hidden">
<div class="absolute top-2 left-2 text-ink-700 text-xs font-serif select-none pointer-events-none">⌜ ✦ ⌝</div>
<div class="absolute top-2 right-2 text-ink-700 text-xs font-serif select-none pointer-events-none">⌞ ✦ ⌟</div>
<div class="absolute bottom-2 left-2 text-ink-700 text-xs font-serif select-none pointer-events-none">⌞ ✦ ⌟</div>
<div class="absolute bottom-2 right-2 text-ink-700 text-xs font-serif select-none pointer-events-none">⌜ ✦ ⌝</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
<div class="lg:col-span-7 space-y-space-md">
<div class="inline-flex items-center gap-2 text-accent font-label-sm text-label-sm uppercase tracking-widest bg-page-base px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419]">
<span class="material-symbols-outlined text-sm">menu_book</span>
<span class="">CHAPTER IV: KNOWLEDGE RETRIEVAL ARTS</span>
</div>
<h2 class="font-headline-lg text-headline-lg font-black text-ink-900 leading-tight tracking-tight">
          Every small step awakens a new branch of knowledge.
        </h2>
<p class="font-body-base text-body-base text-ink-700 max-w-[62ch]">
          Welcome back, Minh. Today is the perfect time to reinforce RAG fundamentals and awaken the ancient knowledge branches in your grand archives. Your embedding puzzle pieces await connection.
        </p>
<div class="pt-space-sm flex flex-wrap items-center gap-space-md">
<button class="inline-flex items-center gap-2 bg-accent hover:bg-primary text-on-primary font-label-sm text-body-base font-bold px-space-xl py-space-sm rounded shadow-[3px_3px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2A2419] transition-all cursor-pointer">
<span class="material-symbols-outlined text-base">local_fire_department</span>
<span class="">Continue Quest</span>
</button>
<button class="inline-flex items-center gap-2 bg-page-base hover:bg-surface-container-high text-ink-900 font-label-sm text-body-base font-bold px-space-lg py-space-sm rounded shadow-[3px_3px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2A2419] transition-all cursor-pointer">
<span class="material-symbols-outlined text-base text-secondary">explore</span>
<span class="">Open Roadmap Map</span>
</button>
</div>
</div>
<!-- Right Visual Plate -->
<div class="lg:col-span-5 relative">
<div class="relative rounded overflow-hidden bg-cover-900 shadow-[4px_4px_0_#2A2419]">
<div class="aspect-[16/10] w-full relative">
<img alt="Luminous Branching Tree of Knowledge in Guildhall Library" class="w-full h-full object-cover object-center filter saturate-105" src="https://lh3.googleusercontent.com/aida/AEtjO1W_RuWoV3_yFZJOb7ubVmaPhm1XRQn7wQUJIX7O6HxoZAo_N7knZwt0JBjGweKBtckmRG0oO__GAiOK4Qp0AWD3sVGCx7KRX4Vxz-DhTIgxFqZvTh6JjVr52wDj80J_-MbQqUdqXiDycHpOWmIwqx5Yc9LKRDCRw1LjuXl05m6oLh-LUndOVnH68KmbPPqQBGQ348N7HEwd-bQQuPNaUFla5ClsStd3I4suDnxc7l3p1g7DgXOjiB_K_g">
<div class="absolute inset-0 bg-gradient-to-t from-cover-900/80 via-transparent to-transparent"></div>
<div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-secondary-fixed-dim font-label-sm text-label-sm">
<span class="flex items-center gap-1 drop-shadow">
<span class="material-symbols-outlined text-sm text-secondary-container">auto_awesome</span>
                Grand Scholar Ancient Archives
              </span>
<span class="bg-cover-900/90 text-on-tertiary-container px-2 py-0.5 rounded shadow">Aura 100%</span>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-space-lg w-full">
  <div class="bg-page-raised p-space-lg rounded shadow-[3px_3px_0_#2A2419] flex flex-col justify-between space-y-space-md relative overflow-hidden border border-outline/20">
    <div class="flex items-start justify-between">
      <div>
        <span class="font-label-sm text-label-sm text-ink-700 uppercase tracking-widest font-bold block mb-1">SCHOLAR RANK</span>
        <span class="inline-block bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-label-sm text-label-sm font-bold shadow-[1px_1px_0_#2A2419]">
          Adept Apprentice
        </span>
      </div>
      <div class="w-10 h-10 rounded bg-page-base flex items-center justify-center shadow-[2px_2px_0_#2A2419] shrink-0">
        <span class="material-symbols-outlined text-secondary text-2xl">military_tech</span>
      </div>
    </div>
    <div class="flex items-baseline gap-2 pt-1">
      <span class="font-anton text-headline-display tracking-tight leading-none text-ink-900">LEVEL 3</span>
      <span class="font-body-base text-body-base text-ink-700 font-bold">/ 250 XP Total</span>
    </div>
    <div class="space-y-1.5 pt-1">
      <div class="flex justify-between items-center font-label-sm text-label-sm text-ink-700">
        <span class="">Rank Progression (80%)</span>
        <span class="font-bold text-accent">50 XP to Level 4</span>
      </div>
      <div class="w-full h-3.5 bg-page-base rounded-sm shadow-[inset_1px_1px_2px_rgba(42,36,25,0.4)] overflow-hidden p-0.5 flex gap-1">
        <div class="h-full bg-secondary w-1/4 rounded-xs"></div>
        <div class="h-full bg-secondary w-1/4 rounded-xs"></div>
        <div class="h-full bg-secondary w-1/4 rounded-xs"></div>
        <div class="h-full bg-secondary-container/40 w-1/4 rounded-xs"></div>
      </div>
    </div>
  </div>
  <div class="bg-page-raised p-space-lg rounded shadow-[3px_3px_0_#2A2419] flex flex-col justify-between space-y-space-md relative overflow-hidden border border-outline/20">
    <div class="flex items-start justify-between">
      <div>
        <span class="font-label-sm text-label-sm text-ink-700 uppercase tracking-widest font-bold block mb-1">STUDY STREAK</span>
        <span class="inline-block bg-accent/15 text-accent px-2 py-0.5 rounded font-label-sm text-label-sm font-bold shadow-[1px_1px_0_#2A2419]">
          Blazing Grimoire Flame
        </span>
      </div>
      <div class="w-10 h-10 rounded bg-page-base flex items-center justify-center shadow-[2px_2px_0_#2A2419] shrink-0">
        <span class="material-symbols-outlined text-accent text-2xl">local_fire_department</span>
      </div>
    </div>
    <div class="flex items-baseline gap-2 pt-1">
      <span class="font-anton text-headline-display tracking-tight leading-none text-ink-900">7 DAYS</span>
      <span class="font-body-base text-body-base text-ink-700 font-bold">unbroken streak</span>
    </div>
    <div class="space-y-1.5 pt-1">
      <div class="flex justify-between items-center font-label-sm text-label-sm text-ink-700">
        <span class="">Weekly Milestone</span>
        <span class="font-bold text-secondary">7 / 7 Days Complete</span>
      </div>
      <div class="grid grid-cols-7 gap-1.5">
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">M</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">T</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">W</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">T</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">F</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-accent text-on-primary py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419]">
          <span class="">S</span>
          <span class="material-symbols-outlined text-[12px] leading-none">check</span>
        </div>
        <div class="flex flex-col items-center bg-secondary-container text-ink-900 py-1 rounded-xs text-[10px] font-bold shadow-[1px_1px_0_#2A2419] ring-1 ring-secondary">
          <span class="">S</span>
          <span class="material-symbols-outlined text-[12px] leading-none text-accent">flare</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="w-full space-y-space-lg"><div class="bg-page-raised p-space-md rounded shadow-[3px_3px_0_#2A2419] flex items-center justify-between flex-wrap gap-space-sm"><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-accent text-2xl">swords</span><div><h3 class="font-headline-md text-headline-md font-bold text-ink-900 leading-tight">Today's Quests</h3><p class="font-label-sm text-label-sm text-ink-700">60 / 60 min scheduled • 1 of 3 quests completed • Flexible Daily Milestone</p></div></div><div class="flex items-center gap-space-md"><div class="hidden sm:flex items-center gap-1.5 px-space-md py-1 rounded bg-page-base text-ink-700 font-label-sm text-label-sm border border-outline/30"><span class="material-symbols-outlined text-sm text-secondary">shield</span><span class="">Streak Shield Active</span></div><span class="text-label-sm font-label-sm font-bold bg-page-base px-space-md py-1 rounded shadow-[2px_2px_0_#2A2419] text-ink-900">Progress: 33% (1 / 3)</span></div></div><div class="space-y-space-md"><div class="bg-page-raised/60 p-space-lg rounded shadow-[2px_2px_0_#2A2419] opacity-85 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg"><div class="space-y-space-xs flex-1"><div class="flex items-center gap-space-sm flex-wrap"><span class="bg-surface-dim text-ink-700 font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">Review</span><span class="bg-page-base text-ink-700 font-label-sm text-label-sm px-2 py-0.5 rounded">Rank C</span><span class="text-ink-700 font-label-sm text-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 20 min</span><span class="text-mana-full font-label-sm text-label-sm font-bold">+10 XP</span><span class="text-ink-700/60 font-label-sm text-label-sm font-serif">• Arcane Basics</span></div><div class="flex items-center gap-space-sm"><span class="material-symbols-outlined text-mana-full text-xl">check_circle</span><h4 class="font-body-lg text-body-lg font-bold text-ink-700 line-through">Review HTTP &amp; API Endpoints</h4></div><p class="font-label-sm text-label-sm text-ink-700 max-w-[62ch]">Master Request/Response cycle, Status codes &amp; key Headers. Inscribe concepts into grimoire.</p><div class="flex items-center gap-space-md pt-0.5 text-xs text-ink-700/80 font-label-sm"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-mana-full">task_alt</span> Verified Output: 5 Inscribed Flashcards</span><span class="hidden md:inline text-ink-700/40">•</span><span class="hidden md:inline">Evaluation: Flawless Recall</span></div></div><div class="flex items-center gap-space-md shrink-0 self-start lg:self-center"><div class="rotate-[-6deg] px-space-md py-1.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-black uppercase tracking-wider shadow-[2px_2px_0_#2A2419] flex items-center gap-1.5"><span class="material-symbols-outlined text-base">verified</span><span class="">COMPLETED</span></div></div></div><div class="bg-page-raised p-space-lg rounded shadow-[4px_4px_0_#2A2419] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg"><div class="absolute left-0 top-0 bottom-0 w-2.5 bg-accent"></div><div class="space-y-space-xs pl-space-xs flex-1"><div class="flex items-center gap-space-sm flex-wrap"><span class="bg-accent/20 text-accent font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">Practice</span><span class="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">Rank B</span><span class="text-ink-700 font-label-sm text-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 20 min</span><span class="text-accent font-label-sm text-label-sm font-bold">+20 XP</span><span class="inline-flex items-center gap-1 text-accent font-label-sm text-label-sm animate-pulse font-bold"><span class="w-2 h-2 rounded-full bg-accent"></span> In Progress</span></div><h4 class="font-headline-md text-headline-md font-bold text-ink-900 leading-tight">Experiment with Embeddings on 5 Text Samples</h4><p class="font-body-base text-body-base text-ink-700 max-w-[62ch]">Use open-source embedding models to vectorize 5 text passages and compare cosine similarity. Observe semantic clustering patterns across disparate domains.</p><div class="flex flex-wrap items-center gap-x-space-lg gap-y-1 pt-1 text-xs text-ink-700 font-label-sm"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-accent">science</span> Required Artifact: Cosine Matrix (.py / notebook)</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-secondary">menu_book</span> Codex Ref: Chapter IV §2</span></div></div><div class="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-sm shrink-0"><button class="inline-flex items-center gap-2 bg-accent hover:bg-primary text-on-primary font-label-sm text-body-base font-bold px-space-xl py-space-sm rounded shadow-[3px_3px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2A2419] transition-all cursor-pointer whitespace-nowrap"><span class="material-symbols-outlined text-base">local_fire_department</span><span class="">Continue Quest</span><span class="material-symbols-outlined text-sm">arrow_forward</span></button><span class="font-label-sm text-xs text-ink-700/70">Step 2 of 4: Compute Vectors</span></div></div><div class="bg-page-raised p-space-lg rounded shadow-[3px_3px_0_#2A2419] relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg"><div class="space-y-space-xs flex-1"><div class="flex items-center gap-space-sm flex-wrap"><span class="bg-surface-variant text-ink-700 font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">Assessment</span><span class="bg-page-base text-ink-700 font-label-sm text-label-sm px-2 py-0.5 rounded">Rank B</span><span class="text-ink-700 font-label-sm text-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 20 min</span><span class="text-mana-full font-label-sm text-label-sm font-bold">+20 XP</span><span class="text-ink-700 font-label-sm text-label-sm bg-surface-container-highest px-2 py-0.5 rounded">Ready</span></div><h4 class="font-headline-md text-headline-md font-bold text-ink-900 leading-tight">Text Chunking Diagnostic Quiz</h4><p class="font-body-base text-body-base text-ink-700 max-w-[62ch]">Experiment with recursive chunking with 50-character overlap on technical documentation. Test boundary conditions and token window preservation.</p><div class="flex flex-wrap items-center gap-x-space-lg gap-y-1 pt-1 text-xs text-ink-700 font-label-sm"><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-secondary">psychology</span> Format: 8 Interactive Diagnostic Scenarios</span><span class="flex items-center gap-1"><span class="material-symbols-outlined text-[14px] text-mana-full">workspace_premium</span> Mastery Threshold: 80%</span></div></div><div class="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-space-sm shrink-0"><button class="inline-flex items-center gap-2 bg-page-base hover:bg-surface-container-high text-ink-900 font-label-sm text-body-base font-bold px-space-lg py-space-sm rounded shadow-[3px_3px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2A2419] transition-all cursor-pointer whitespace-nowrap"><span class="material-symbols-outlined text-base text-secondary">play_arrow</span><span class="">Start Quiz</span></button><span class="font-label-sm text-xs text-ink-700/70">Estimated: 12-15 min</span></div></div><div class="bg-page-raised/80 border border-outline/30 p-space-lg rounded shadow-[2px_2px_0_#2A2419] flex flex-col lg:flex-row lg:items-center justify-between gap-space-md"><div class="space-y-space-xs flex-1"><div class="flex items-center gap-space-sm flex-wrap"><span class="bg-secondary-container/60 text-ink-900 font-label-sm text-label-sm px-2 py-0.5 rounded font-bold">Bonus Trial</span><span class="bg-page-base text-ink-700 font-label-sm text-label-sm px-2 py-0.5 rounded">Rank A</span><span class="text-ink-700 font-label-sm text-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 10 min</span><span class="text-secondary font-label-sm text-label-sm font-bold">+15 XP Bonus</span><span class="text-ink-700/70 font-label-sm text-label-sm">Optional</span></div><h4 class="font-body-lg text-body-lg font-bold text-ink-900">Vector Similarity Quick Drill — Distance Metrics</h4><p class="font-label-sm text-label-sm text-ink-700 max-w-[62ch]">Rapidly identify when to deploy Cosine Similarity vs. Euclidean Distance vs. Dot Product based on vector normalization.</p></div><div class="shrink-0"><button class="inline-flex items-center gap-2 bg-page-base hover:bg-surface-container-high text-ink-900 font-label-sm text-label-sm font-bold px-space-md py-space-sm rounded shadow-[2px_2px_0_#2A2419] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#2A2419] transition-all cursor-pointer whitespace-nowrap"><span class="material-symbols-outlined text-sm text-secondary-container">flare</span><span class="">Accept Trial</span></button></div></div></div><div class="bg-page-base p-space-lg rounded shadow-[3px_3px_0_#2A2419] flex items-start gap-space-md border border-outline/20"><span class="material-symbols-outlined text-secondary text-3xl shrink-0 mt-0.5">tips_and_updates</span><div class="space-y-1 flex-1"><div class="flex items-center justify-between flex-wrap gap-2"><div class="font-label-sm text-label-sm font-bold uppercase tracking-wider text-secondary">ACADEMY STUDY GUIDANCE</div><span class="font-label-sm text-xs text-ink-700/60">Tome Knowledge Dispatch #42</span></div><p class="font-body-base text-body-base text-ink-900 italic">“When practicing embeddings, observe how cosine similarity differs between short phrases and complete paragraphs. Broader context and higher noise require rigorous chunking techniques.”</p><div class="font-label-sm text-label-sm text-ink-700 text-right">— Headmaster of the Ancient Archives</div></div></div></div>
</div></main></div><footer class="fixed bottom-0 left-0 right-0 h-10 bg-cover-900 z-50 border-t border-outline/30 px-space-lg flex items-center justify-between text-inverse-on-surface/70"><div class="flex items-center gap-space-md"><span class="inline-block w-2 h-2 rounded-full bg-mana-full animate-pulse"></span><span class="font-label-sm text-label-sm tracking-wide">Tome Synchronized • Shounen Engine v2.4</span></div><div class="flex items-center gap-space-lg font-label-sm text-label-sm"><span class="text-secondary-fixed-dim hover:underline cursor-pointer">Grimoire Draft</span><span class="">•</span><span class="">Sanctum ID: #8820-EX</span></div></footer>
</body></html>
````

## File: design/asset/design_preview.html
````html
<!doctype html>
<html lang="en" data-presentation="false">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>LifeOS — Grimoire Design Preview</title>
<meta name="description" content="Interactive design-system preview and contrast audit for LifeOS. Lock the type stack here.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Grenze+Gotisch:wght@400..900&family=Literata:opsz,wght@7..72,200..900&family=Anton&family=Marcellus&display=swap" rel="stylesheet">
<style>
/* ═══════════════════════════════════════════════════════════════════
   TOKENS — hand-derived from design/design-tokens.json
   This block is the draft of src/styles/tokens.css.
   ═══════════════════════════════════════════════════════════════════ */
:root {
  /* cover — dark chrome. Must stay a MINORITY of screen area. */
  --cover-900:#16130D; --cover-800:#211C14; --cover-700:#2E2718; --cover-600:#3D3421;
  --cover-fg:#E8DFC8;  --cover-fg-muted:#A99C7E;
  /* page — parchment. ~90% of screen area. NEVER #FFFFFF. */
  --page-base:#F1E9D2; --page-raised:#F6F0DE; --page-sunken:#E8DFC4; --page-edge:#DCD2B4;
  /* ink on paper */
  --ink-900:#2A2419; --ink-700:#4A4030; --ink-500:#6B5E45; --ink-300:#9A8C6E; --ink-100:#C4B896;
  /* accent — cinnabar seal red. The single accent. */
  --accent:#B23A1F; --accent-deep:#8A2B14; --accent-soft:#E8C9BC;
  /* gold */
  --gold-on-page:#8A6A14; --gold-on-cover:#D4A72C;
  /* mana — discrete steps, never a gradient */
  --mana-full:#3F6B45; --mana-warn:#9A6B1E; --mana-critical:#9E2B25;
  /* difficulty */
  --diff-easy:#4A6B52; --diff-medium:#9A6B1E; --diff-hard:#A63A22; --diff-boss:#6B2B4A;
  --signal-success:#3F6B45; --signal-warning:#9A6B1E; --signal-danger:#9E2B25; --signal-info:#3A5A72;
  /* typography */
  --font-display:'Grenze Gotisch','Times New Roman',serif;
  --font-body:'Literata',Georgia,'Times New Roman',serif;
  --font-numeric:'Anton','Arial Narrow',sans-serif;
  --font-label:'Marcellus',Georgia,serif;
  /* type scale. Presentation Mode multiplies this by 1.4 — one variable, whole app. */
  --type-scale:1;
  --fs-xs:calc(13px * var(--type-scale));
  --fs-sm:calc(15px * var(--type-scale));
  --fs-base:calc(17px * var(--type-scale));
  --fs-lg:calc(20px * var(--type-scale));
  --fs-xl:calc(24px * var(--type-scale));
  --fs-2xl:calc(30px * var(--type-scale));
  --fs-3xl:calc(40px * var(--type-scale));
  --fs-display:calc(48px * var(--type-scale));
  --fs-hero:calc(64px * var(--type-scale));
  /* space */
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:24px; --s6:32px; --s7:48px; --s8:64px; --s9:96px;
  --card-padding:20px;
  /* shape — square is the default. Uniform radius everywhere is a banned pattern. */
  --r-none:0; --r-sm:2px; --r-md:4px; --r-pill:999px;
  --b-hair:1px; --b-line:2px; --b-heavy:3px; --b-slab:4px;
  --sh-sm:2px 2px 0 var(--ink-900);
  --sh-md:3px 3px 0 var(--ink-900);
  --sh-lg:5px 5px 0 var(--ink-900);
  --sh-gold:4px 4px 0 var(--gold-on-page);
  --press:translate(2px,2px);
  /* motion */
  --d-instant:80ms; --d-fast:140ms; --d-normal:240ms; --d-slow:420ms; --d-cinematic:1500ms;
  --e-out:cubic-bezier(.16,1,.3,1);
  --e-ink:cubic-bezier(.2,.8,.2,1);
  /* layout */
  --cover-h:56px; --status-h:40px; --app-max:1280px; --measure:72ch;
}
/* ── Presentation Mode: the highest-leverage feature for the demo ──
   One attribute on the root. Bigger type, no grain, no animation. */
[data-presentation="true"] { --type-scale:1.4; --ink-500:#4A4030; --cover-fg-muted:#BCAD8C; }
[data-presentation="true"] body::before { display:none; }
[data-presentation="true"] *,
[data-presentation="true"] *::before,
[data-presentation="true"] *::after {
  animation:none !important; transition:none !important;
}
/* The OS-level equivalent, carrying the SAME declarations — authored once in
   design-tokens.json and emitted into both blocks by tokens-to-css.mjs, mirrored
   here. It is the one signal that fires without anyone pressing the toggle. */
@media (prefers-contrast: more) {
  :root { --type-scale:1.4; --ink-500:#4A4030; --cover-fg-muted:#BCAD8C; }
}
[data-motion="off"] *,
[data-motion="off"] *::before,
[data-motion="off"] *::after {
  animation:none !important; transition:none !important;
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation:none !important; transition:none !important; }
}
/* ═══════════════════════════════════════════════════════════════════
   BASE
   ═══════════════════════════════════════════════════════════════════ */
* { box-sizing:border-box; }
html { -webkit-text-size-adjust:100%; }
body {
  margin:0;
  background:var(--page-base);
  color:var(--ink-900);
  font-family:var(--font-body);
  font-size:var(--fs-base);
  line-height:1.6;
  font-optical-sizing:auto;
  padding-top:var(--cover-h);
  padding-bottom:var(--status-h);
}
/* GRAIN — a STATIC data-URI tile rasterised once and repeated.
   This is NOT a live feTurbulence filter. See DESIGN.md §6.1: a live
   turbulence+displacement filter is the single most expensive thing in
   the system and was observed to thrash iOS Safari. */
body::before {
  content:""; position:fixed; inset:0; pointer-events:none; z-index:1;
  opacity:.05; mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E");
}
/* ── cover band ── */
.cover {
  position:fixed; top:0; left:0; right:0; height:var(--cover-h); z-index:100;
  background:var(--cover-900); color:var(--cover-fg);
  border-bottom:var(--b-slab) solid var(--ink-900);
  display:flex; align-items:center; gap:var(--s5);
  padding:0 var(--s5);
}
.cover__logo {
  font-family:var(--font-display); font-weight:900; font-size:26px;
  letter-spacing:.08em; text-transform:uppercase; margin:0;
  color:var(--cover-fg); white-space:nowrap;
}
.cover__nav { display:flex; gap:var(--s5); margin-left:var(--s6); }
/* Nav uses full cover.fg (13.96:1), not fgMuted — fgMuted measures 6.83:1 and this
   nav sits at 15px, below the 18px floor that would excuse it. */
.cover__nav a {
  color:var(--cover-fg); text-decoration:none; font-size:var(--fs-sm);
  font-family:var(--font-label); letter-spacing:.04em;
  border-bottom:var(--b-line) solid transparent; padding-bottom:2px;
  transition:color var(--d-fast) var(--e-out), border-color var(--d-fast) var(--e-out);
}
.cover__nav a:hover, .cover__nav a[aria-current="page"] {
  color:var(--cover-fg); border-bottom-color:var(--accent);
}
.cover__spacer { flex:1; }
/* ── status bar — the second (and last) dark band ── */
.statusbar {
  position:fixed; bottom:0; left:0; right:0; height:var(--status-h); z-index:100;
  background:var(--cover-900); color:var(--cover-fg);
  border-top:var(--b-heavy) solid var(--ink-900);
  display:flex; align-items:center; gap:var(--s5); padding:0 var(--s5);
  font-family:var(--font-label); font-size:var(--fs-sm); letter-spacing:.04em;
}
.statusbar__stat { display:flex; align-items:baseline; gap:var(--s2); }
.statusbar__num { font-family:var(--font-numeric); font-size:19px; line-height:1; }
.statusbar__label { color:var(--cover-fg); }
.statusbar__ratio { margin-left:auto; color:var(--cover-fg-muted); }
.statusbar__ratio b { color:var(--cover-fg); font-family:var(--font-numeric); font-weight:400; font-size:17px; }
/* ═══════════════════════════════════════════════════════════════════
   PAGE SCAFFOLD
   ═══════════════════════════════════════════════════════════════════ */
.wrap { max-width:var(--app-max); margin:0 auto; padding:var(--s8) var(--s5) var(--s9); position:relative; z-index:2; }
section { margin-bottom:var(--s9); }
.sec-head { border-bottom:var(--b-slab) solid var(--ink-900); padding-bottom:var(--s3); margin-bottom:var(--s6); }
.sec-head h2 {
  font-family:var(--font-label); font-weight:400; text-transform:uppercase;
  letter-spacing:.1em; font-size:var(--fs-sm); color:var(--ink-700); margin:0 0 var(--s2);
}
/* Body face doing the work, NOT the display face. Section headings are not chapter
   titles, and the "but it looks good here" exemption is exactly how the rule erodes.
   Grenze Gotisch stays in the logo, the Chapter II panel and the specimen below. */
.sec-head h3 {
  font-family:var(--font-body); font-weight:600; font-size:var(--fs-3xl);
  line-height:1.15; margin:0; letter-spacing:-.01em;
}
.lede { max-width:var(--measure); color:var(--ink-700); font-size:var(--fs-lg); line-height:1.6; margin:0 0 var(--s6); }
p { max-width:var(--measure); }
code { font-family:ui-monospace,'Cascadia Mono',Menlo,monospace; font-size:.9em;
  background:var(--page-sunken); border:var(--b-hair) solid var(--page-edge); padding:1px 5px; }
/* ═══════════════════════════════════════════════════════════════════
   COLOUR SWATCHES
   ═══════════════════════════════════════════════════════════════════ */
.swatch-group { margin-bottom:var(--s7); }
.swatch-group__title {
  font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em;
  font-size:var(--fs-sm); color:var(--ink-700); margin:0 0 var(--s3);
  display:flex; align-items:baseline; gap:var(--s3);
}
.swatch-group__note { font-family:var(--font-body); text-transform:none; letter-spacing:0; color:var(--ink-700); font-size:var(--fs-sm); }
.swatches { display:grid; grid-template-columns:repeat(auto-fill,minmax(168px,1fr)); gap:var(--s4); }
.swatch { border:var(--b-heavy) solid var(--ink-900); background:var(--page-raised); }
.swatch__chip { height:76px; border-bottom:var(--b-heavy) solid var(--ink-900); display:flex; align-items:flex-end; justify-content:flex-end; padding:var(--s2); }
.swatch__meta { padding:var(--s2) var(--s3) var(--s3); }
.swatch__name { font-family:var(--font-label); font-size:var(--fs-sm); letter-spacing:.04em; display:block; }
.swatch__hex { font-family:ui-monospace,Menlo,monospace; font-size:12px; color:var(--ink-700); text-transform:uppercase; }
.swatch__ratio { font-family:var(--font-numeric); font-size:15px; display:block; margin-top:var(--s1); }
.r-aaa { color:var(--mana-full); }
.r-aa  { color:var(--mana-warn); }
.r-bad { color:var(--mana-critical); }
.swatch__tag { font-family:var(--font-label); font-size:11px; text-transform:uppercase; letter-spacing:.06em; color:var(--ink-700); }
/* ═══════════════════════════════════════════════════════════════════
   CONTRAST AUDIT TABLE
   ═══════════════════════════════════════════════════════════════════ */
.audit { width:100%; border-collapse:collapse; border:var(--b-heavy) solid var(--ink-900); background:var(--page-raised); }
.audit th, .audit td { text-align:left; padding:var(--s3) var(--s4); border-bottom:var(--b-hair) solid var(--page-edge); font-size:var(--fs-sm); }
.audit thead th {
  background:var(--cover-800); color:var(--cover-fg);
  font-family:var(--font-label); font-weight:400; text-transform:uppercase;
  letter-spacing:.08em; font-size:var(--fs-xs); border-bottom:var(--b-heavy) solid var(--ink-900);
}
.audit tbody tr:last-child td { border-bottom:none; }
.audit__sample { display:inline-block; padding:3px 10px; border:var(--b-line) solid var(--ink-900); font-family:var(--font-body); }
.audit__ratio { font-family:var(--font-numeric); font-size:17px; }
.audit__verdict { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.06em; font-size:var(--fs-xs); }
.v-pass { color:var(--mana-full); }
.v-warn { color:var(--mana-warn); }
.v-fail { color:var(--mana-critical); }
.audit tr.is-fail { background:var(--accent-soft); }
.audit tr.is-note { background:var(--page-sunken); }
/* ═══════════════════════════════════════════════════════════════════
   TYPOGRAPHY SPECIMENS
   ═══════════════════════════════════════════════════════════════════ */
.type-role { border-top:var(--b-heavy) solid var(--ink-900); padding:var(--s5) 0; display:grid; grid-template-columns:220px 1fr; gap:var(--s6); }
.type-role:last-child { border-bottom:var(--b-heavy) solid var(--ink-900); }
.type-role__id { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em; font-size:var(--fs-sm); color:var(--ink-700); }
.type-role__id b { display:block; color:var(--ink-900); font-weight:400; font-size:var(--fs-lg); letter-spacing:.02em; text-transform:none; margin-bottom:var(--s2); }
.type-role__use { font-size:var(--fs-sm); color:var(--ink-700); margin:var(--s2) 0 0; }
.type-role__use--hard { color:var(--accent-deep); }
.spec-display { font-family:var(--font-display); font-weight:800; font-size:var(--fs-display); line-height:1.15; letter-spacing:.02em; margin:0; }
.spec-body { font-family:var(--font-body); font-size:var(--fs-base); line-height:1.6; margin:0; max-width:var(--measure); }
.spec-body b { font-weight:600; }
.spec-numeric { font-family:var(--font-numeric); font-size:56px; line-height:1; margin:0; }
.spec-label { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.1em; font-size:var(--fs-sm); margin:0; }
/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
.grid-2 { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:var(--s6); align-items:start; }
.stack { display:flex; flex-direction:column; gap:var(--s5); }
.row { display:flex; flex-wrap:wrap; gap:var(--s3); align-items:center; }
.component-label {
  font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em;
  font-size:var(--fs-xs); color:var(--ink-700); margin:0 0 var(--s3);
}
/* ── PanelFrame: double rule + corner ticks ── */
.panel {
  background:var(--page-raised);
  border:var(--b-slab) solid var(--ink-900);
  box-shadow:var(--sh-md);
  padding:var(--card-padding);
  position:relative;
}
.panel--framed { padding:calc(var(--card-padding) + 8px); }
.panel--framed::before {
  content:""; position:absolute; inset:7px;
  border:var(--b-line) solid var(--ink-900); pointer-events:none; opacity:.55;
}
.panel--framed::after {
  content:""; position:absolute; inset:-4px; pointer-events:none;
  background:
    linear-gradient(var(--ink-900),var(--ink-900)) 0 0/18px var(--b-slab) no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 0 0/var(--b-slab) 18px no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 100% 0/18px var(--b-slab) no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 100% 0/var(--b-slab) 18px no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 0 100%/18px var(--b-slab) no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 0 100%/var(--b-slab) 18px no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 100% 100%/18px var(--b-slab) no-repeat,
    linear-gradient(var(--ink-900),var(--ink-900)) 100% 100%/var(--b-slab) 18px no-repeat;
}
.panel--dark { background:var(--cover-800); color:var(--cover-fg); border-color:var(--cover-900); }
.panel--dark::before { border-color:var(--cover-600); opacity:1; }
/* ── DifficultyChip — OUTLINED, not filled. See audit note below. ── */
.chip {
  display:inline-flex; align-items:center; gap:var(--s2);
  border:var(--b-heavy) solid var(--ink-900);
  border-radius:var(--r-pill);
  background:var(--page-raised);
  padding:3px 12px 3px 8px;
  font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em;
  font-size:var(--fs-xs); color:var(--ink-900); white-space:nowrap;
}
.chip__mark { width:11px; height:11px; flex:none; border:var(--b-hair) solid var(--ink-900); }
.chip--easy   { border-color:var(--diff-easy);   } .chip--easy   .chip__mark { background:var(--diff-easy); }
.chip--medium { border-color:var(--diff-medium); } .chip--medium .chip__mark { background:var(--diff-medium); }
.chip--hard   { border-color:var(--diff-hard);   } .chip--hard   .chip__mark { background:var(--diff-hard); }
/* boss is the ONE filled chip — measured 8.91:1 with page.raised text, where
   easy/medium/hard only reach AAA-large. So boss differs in KIND, not just hue. */
.chip--boss   { border-width:var(--b-slab); border-color:var(--ink-900);
                background:var(--diff-boss); color:var(--page-raised); letter-spacing:.12em; }
.chip--boss   .chip__mark { background:var(--page-raised); border-color:var(--page-raised); }
.chip--mana   { border-color:var(--mana-full); } .chip--mana .chip__mark { background:var(--mana-full); }
/* ── ManaBar — segmented, discrete colour steps ── */
.mana { display:flex; flex-direction:column; gap:var(--s2); }
.mana__head { display:flex; align-items:baseline; justify-content:space-between; gap:var(--s4); }
.mana__label { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em; font-size:var(--fs-sm); color:var(--ink-700); }
.mana__value { font-family:var(--font-numeric); font-size:30px; line-height:1; }
.mana__value small { font-family:var(--font-label); font-size:var(--fs-sm); color:var(--ink-700); }
.mana__track {
  display:flex; gap:2px; padding:3px;
  border:var(--b-heavy) solid var(--ink-900); background:var(--page-sunken);
}
.mana__cell { flex:1; height:22px; background:var(--page-base); border:var(--b-hair) solid var(--page-edge); }
.mana__cell.is-on { border-color:var(--ink-900); }
.mana--full     .mana__cell.is-on { background:var(--mana-full); }
.mana--warn     .mana__cell.is-on { background:var(--mana-warn); }
.mana--critical .mana__cell.is-on { background:var(--mana-critical); }
.mana--critical .mana__value { color:var(--mana-critical); }
.mana--warn     .mana__value { color:var(--mana-warn); }
.mana__foot { font-size:var(--fs-sm); color:var(--ink-700); margin:0; }
/* ── XpBar ── */
.xp { display:flex; flex-direction:column; gap:var(--s2); }
.xp__head { display:flex; align-items:baseline; justify-content:space-between; gap:var(--s4); }
.xp__level { font-family:var(--font-numeric); font-size:30px; line-height:1; }
.xp__level small { font-family:var(--font-label); font-size:var(--fs-sm); letter-spacing:.08em; text-transform:uppercase; color:var(--ink-700); margin-right:var(--s2); }
.xp__total { font-family:var(--font-numeric); font-size:19px; color:var(--ink-700); }
.xp__track { position:relative; height:26px; border:var(--b-heavy) solid var(--ink-900); background:var(--page-sunken); overflow:hidden; }
.xp__fill { height:100%; background:var(--accent); border-right:var(--b-heavy) solid var(--ink-900); width:0; }
.xp__fill--static { width:64%; }
.xp__ticks { position:absolute; inset:0; pointer-events:none;
  background:repeating-linear-gradient(90deg, transparent 0 calc(10% - 1px), var(--ink-100) calc(10% - 1px) 10%); }
.xp__foot { display:flex; justify-content:space-between; font-size:var(--fs-sm); color:var(--ink-700); margin:0; }
/* ── QuestCard ── */
.quest { background:var(--page-raised); border:var(--b-heavy) solid var(--ink-900); box-shadow:var(--sh-md); padding:var(--card-padding); display:flex; flex-direction:column; gap:var(--s3); }
.quest__top { display:flex; align-items:flex-start; justify-content:space-between; gap:var(--s3); }
.quest__title { font-size:var(--fs-lg); font-weight:600; line-height:1.3; margin:0; }
.quest__skill { font-family:var(--font-label); font-size:var(--fs-sm); letter-spacing:.04em; color:var(--ink-700); margin:0; }
.quest__skill b { color:var(--ink-900); font-weight:400; border-bottom:var(--b-line) solid var(--accent); }
.quest__rationale { font-size:var(--fs-sm); color:var(--ink-700); line-height:1.7; margin:0; }
.quest__foot { display:flex; align-items:center; justify-content:space-between; gap:var(--s3); border-top:var(--b-hair) solid var(--page-edge); padding-top:var(--s3); margin-top:var(--s1); }
.quest__reward { font-family:var(--font-numeric); font-size:19px; }
.quest__reward small { font-family:var(--font-label); font-size:var(--fs-xs); text-transform:uppercase; letter-spacing:.08em; color:var(--ink-700); margin-right:4px; }
.quest__evidence { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.06em; font-size:var(--fs-xs); padding:3px 9px; border:var(--b-line) solid var(--ink-900); }
.ev-none { color:var(--ink-700); border-style:dashed; }
.ev-have { background:var(--mana-full); color:var(--page-raised); border-color:var(--ink-900); }
.quest--done { box-shadow:var(--sh-gold); }
.quest--done .quest__title { text-decoration:line-through; text-decoration-thickness:2px; color:var(--ink-700); }
/* stamp — press feedback is movement, not colour */
.stampable { transition:transform var(--d-instant) var(--e-out); }
.stampable:active { transform:var(--press); }
/* ── Sigil ── */
.sigil-box { display:flex; align-items:center; gap:var(--s6); flex-wrap:wrap; }
.sigil { width:200px; height:200px; flex:none; }
.sigil path, .sigil circle, .sigil line { vector-effect:non-scaling-stroke; }
.sigil [data-draw] { stroke-dasharray:1; stroke-dashoffset:1; animation:inkdraw var(--d-cinematic) var(--e-ink) forwards; }
@keyframes inkdraw { to { stroke-dashoffset:0; } }
/* ── ChapterMap ── */
.map { border:var(--b-slab) solid var(--ink-900); background:var(--page-raised); box-shadow:var(--sh-md); padding:var(--s5); overflow-x:auto; }
.map svg { display:block; min-width:640px; }
.node-label { font-family:var(--font-label); font-size:12px; letter-spacing:.04em; fill:var(--ink-900); }
.node-sub { font-family:var(--font-body); font-size:11px; fill:var(--ink-700); }
/* ── Hatch demo — decorative surfaces ONLY, never behind body text ── */
.hatch {
  border:var(--b-slab) solid var(--ink-900); box-shadow:var(--sh-md);
  padding:var(--s6);
  background-color:var(--page-raised);
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='9' height='9'%3E%3Cpath d='M-2 2 L2 -2 M0 9 L9 0 M7 11 L11 7' stroke='%232A2419' stroke-width='1' stroke-opacity='0.28'/%3E%3C/svg%3E");
}
.hatch__title { font-family:var(--font-display); font-weight:800; font-size:var(--fs-2xl); margin:0; }
.hatch__note { font-size:var(--fs-sm); color:var(--ink-700); margin:var(--s2) 0 0; max-width:52ch; background:var(--page-raised); border:var(--b-line) solid var(--ink-900); padding:var(--s2) var(--s3); }
/* ── Presentation Mode explainer ── */
.pm-demo { display:grid; grid-template-columns:1fr 1fr; gap:var(--s6); }
@media (max-width:760px) { .pm-demo { grid-template-columns:1fr; } }
.pm-card { border:var(--b-heavy) solid var(--ink-900); background:var(--page-raised); padding:var(--card-padding); box-shadow:var(--sh-sm); }
.pm-card h4 { font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em; font-size:var(--fs-sm); color:var(--ink-700); margin:0 0 var(--s3); }
.pm-card p { margin:0; font-size:var(--fs-sm); }
/* ── Toggle buttons ── */
.toggle {
  font-family:var(--font-label); text-transform:uppercase; letter-spacing:.08em;
  font-size:var(--fs-xs); padding:6px 12px;
  background:var(--cover-700); color:var(--cover-fg);
  border:var(--b-line) solid var(--cover-600); border-radius:var(--r-none);
  cursor:pointer; transition:transform var(--d-instant) var(--e-out), background var(--d-fast) var(--e-out);
}
.toggle:hover { background:var(--cover-600); }
.toggle:focus-visible { outline:var(--b-heavy) solid var(--gold-on-cover); outline-offset:2px; }
.toggle:active { transform:var(--press); }
.toggle[aria-pressed="true"] { background:var(--accent); border-color:var(--accent-deep); color:var(--page-raised); }
/* ── Notes / banned list ── */
.rule-list { list-style:none; padding:0; margin:0; max-width:var(--measure); }
.rule-list li { padding:var(--s3) 0 var(--s3) var(--s6); border-bottom:var(--b-hair) solid var(--page-edge); position:relative; font-size:var(--fs-sm); }
.rule-list li::before { content:"✕"; position:absolute; left:0; top:var(--s3); color:var(--mana-critical); font-weight:700; }
.rule-list--do li::before { content:"✓"; color:var(--mana-full); }
/* ── Footer ── */
.colophon { border-top:var(--b-slab) solid var(--ink-900); padding-top:var(--s6); font-size:var(--fs-sm); color:var(--ink-700); }
.colophon a { color:var(--accent-deep); }
</style>
</head>
<body>
<svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute">
  <defs>
    <filter id="inkEdge" x="-8%" y="-8%" width="116%" height="116%" filterUnits="objectBoundingBox">
      <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="7" result="noise"/>
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
</svg>
<header class="cover">
  <p class="cover__logo">LifeOS</p>
  <nav class="cover__nav" aria-label="Preview sections">
    <a href="#colour">Colour</a>
    <a href="#audit">Audit</a>
    <a href="#type">Type</a>
    <a href="#components">Components</a>
    <a href="#rules">Rules</a>
  </nav>
  <span class="cover__spacer"></span>
  <button class="toggle" id="btn-presentation" aria-pressed="false" title="Simulate the projector profile">Presentation&nbsp;Mode</button>
  <button class="toggle" id="btn-motion" aria-pressed="false" title="Simulate prefers-reduced-motion">Motion&nbsp;Off</button>
</header>
<div class="wrap">
  <section id="intro">
    <div class="sec-head">
      <h2>LifeOS · Design System</h2>
      <h3>Grimoire</h3>
    </div>
    <p class="lede">
      Shounen fantasy ink. Dark cover chrome, light parchment pages. This page is the
      lock-in artefact for <b>Day&nbsp;1</b> — open it, look at it on the real projector,
      and commit to the type stack. Every colour below is measured, not eyeballed.
    </p>
    <p>
      The dark bands top and bottom are the <em>only</em> dark chrome in the system.
      The readout in the bottom bar measures what share of the screen they actually
      occupy — the hard ceiling is <code>&lt;= 15%</code>, because a lit-room projector
      lifts black levels and crushes dark regions into a single muddy mass exactly when
      the panel is looking at them.
    </p>
  </section>
  <section id="colour">
    <div class="sec-head">
      <h2>01 — Palette</h2>
      <h3>Two surfaces, one accent</h3>
    </div>
    <div class="swatch-group">
      <p class="swatch-group__title">cover <span class="swatch-group__note">dark chrome — nav, HUD, status bar. Minority of screen area.</span></p>
      <div class="swatches" data-swatch-group="cover"></div>
    </div>
    <div class="swatch-group">
      <p class="swatch-group__title">page <span class="swatch-group__note">parchment — every reading surface. Never #FFFFFF.</span></p>
      <div class="swatches" data-swatch-group="page"></div>
    </div>
    <div class="swatch-group">
      <p class="swatch-group__title">ink <span class="swatch-group__note">ink on paper. The ratio shown is measured against page.base.</span></p>
      <div class="swatches" data-swatch-group="ink"></div>
    </div>
    <div class="swatch-group">
      <p class="swatch-group__title">accent · gold <span class="swatch-group__note">cinnabar seal red is the single accent. Gold is for reward moments only.</span></p>
      <div class="swatches" data-swatch-group="accent"></div>
      <div class="swatches" data-swatch-group="gold" style="margin-top:var(--s4)"></div>
    </div>
    <div class="swatch-group">
      <p class="swatch-group__title">mana · difficulty · signal <span class="swatch-group__note">Mana snaps between three discrete steps — never a gradient, so the 70 threshold is visible as an event.</span></p>
      <div class="swatches" data-swatch-group="mana"></div>
      <div class="swatches" data-swatch-group="difficulty" style="margin-top:var(--s4)"></div>
    </div>
  </section>
  <section id="audit">
    <div class="sec-head">
      <h2>02 — Contrast Audit</h2>
      <h3>Measured, not eyeballed</h3>
    </div>
    <p class="lede">
      Computed live in this page against WCAG&nbsp;2.1 relative luminance. The target is
      <b>AAA (7:1)</b>, not AA — a projector burns roughly half the contrast away, so a
      7:1 pair lands near 4.5:1 on the wall and is still readable. A 4.5:1 pair does not.
    </p>
    <table class="audit">
      <thead>
        <tr><th>Pair</th><th>Sample</th><th>Ratio</th><th>Verdict</th><th>Permitted use</th></tr>
      </thead>
      <tbody id="audit-body"></tbody>
    </table>
    <p style="margin-top:var(--s5); font-size:var(--fs-sm); color:var(--ink-700)">
      The <b>PROBE</b> and <b>REJECTED</b> rows are design options that were tried and
      measured, kept here on purpose so the decisions can be re-checked rather than
      re-argued. Two of them changed the system:
    </p>
    <ul style="font-size:var(--fs-sm); color:var(--ink-700); max-width:var(--measure)">
      <li style="margin-bottom:var(--s3)">
        <b>Dark text on the cinnabar accent fails at 2.58:1.</b> The intuitive choice —
        a deep red fill with near-black text — is the one that does not work. Accent fills
        carry <i>light</i> text, and <code>accent.deep</code> is the variant to reach for
        when a filled element must clear 7:1.
      </li>
      <li>
        <b>Only the boss chip can be filled.</b> Against light label text, easy, medium and
        hard land at 5.24, 5.83 and 5.67 — AAA-large, none of them reaching 7:1. Boss plum
        lands at 8.91:1 and clears AAA outright. So easy, medium and hard are outlined chips
        with ink text at 12.69:1 and the hue carried by a 3px border and a marker square,
        while boss is the one solid filled chip. Boss ends up different in <i>kind</i>, not
        just in colour — which is what the design asked for in the first place.
      </li>
    </ul>
  </section>
  <section id="type">
    <div class="sec-head">
      <h2>03 — Typography</h2>
      <h3>Four roles, one hard rule</h3>
    </div>
    <p class="lede">
      Blackletter display plus serif body drifts into “medieval D&amp;D template” fast. The
      genre’s actual pattern is one decorated logo and clean type everywhere else — so
      Grenze Gotisch appears in exactly three places and nowhere else.
    </p>
    <div class="type-role">
      <div class="type-role__id"><b>Display</b>Grenze Gotisch</div>
      <div>
        <p class="spec-display">The Book Grows a New Page</p>
        <p class="type-role__use type-role__use--hard">
          <b>HARD RULE —</b> app logo, chapter titles, level-up moments. Nowhere else, ever.
        </p>
      </div>
    </div>
    <div class="type-role">
      <div class="type-role__id"><b>Body</b>Literata</div>
      <div>
        <p class="spec-body">
          You missed two scheduled Trials this week, so the system has drafted a lighter
          plan rather than letting the streak break. <b>Nothing was deleted</b> — the
          original nodes are still on the roadmap, and every XP entry that produced your
          current level is still in the ledger. Read the rationale, then decide.
        </p>
        <p class="type-role__use">
          Everything readable: quest rationale, evidence, diff, review. Commissioned for
          Google Play Books to survive small sizes for hours — low stroke contrast, open
          counters, large x-height. A working face, not a performing one.
        </p>
      </div>
    </div>
    <div class="type-role">
      <div class="type-role__id"><b>Numeric</b>Anton</div>
      <div>
        <p class="spec-numeric">1,240 <span style="font-size:24px">XP</span> · 13 · 68</p>
        <p class="type-role__use">
          XP totals, level numbers, stamina values only. A poster face, kept because it is
          utility — it makes numbers legible at 5 metres without pretending to be fantasy.
        </p>
      </div>
    </div>
    <div class="type-role">
      <div class="type-role__id"><b>Label</b>Marcellus</div>
      <div>
        <p class="spec-label">Chapter II · The Index Beneath</p>
        <p class="type-role__use">Section labels, rank names, stat captions, chips.</p>
      </div>
    </div>
    <p style="margin-top:var(--s6); font-size:var(--fs-sm); color:var(--ink-700)">
      All four faces carry a <b>Vietnamese subset</b>. The UI is English, so that is not
      about interface strings — it is so a goal typed as “trở thành backend developer”
      renders as text instead of a row of <code>.notdef</code> boxes in front of the panel.
    </p>
  </section>
  <section id="components">
    <div class="sec-head">
      <h2>04 — Components</h2>
      <h3>Pure CSS and SVG</h3>
    </div>
    <p class="lede">
      No image assets. Every surface here is borders, hard shadows, a static grain tile
      and inline SVG — which is what makes the aesthetic reachable without an artist and
      without licensing anything.
    </p>
    <p class="component-label">ManaBar — three threshold states</p>
    <div class="grid-2" style="margin-bottom:var(--s7)">
      <div class="mana mana--full">
        <div class="mana__head"><span class="mana__label">Mana</span><span class="mana__value">92<small>/100</small></span></div>
        <div class="mana__track" data-mana="92"></div>
        <p class="mana__foot">Steady. Full recovery applies at rollover.</p>
      </div>
      <div class="mana mana--warn">
        <div class="mana__head"><span class="mana__label">Mana</span><span class="mana__value">64<small>/100</small></span></div>
        <div class="mana__track" data-mana="64"></div>
        <p class="mana__foot">Below the 70 overload threshold (BR05). Adjustment may trigger.</p>
      </div>
      <div class="mana mana--critical">
        <div class="mana__head"><span class="mana__label">Mana</span><span class="mana__value">28<small>/100</small></span></div>
        <div class="mana__track" data-mana="28"></div>
        <p class="mana__foot">Critical. Recovery Plan is capped at two light quests.</p>
      </div>
    </div>
    <p class="component-label">XpBar &amp; Level</p>
    <div class="grid-2" style="margin-bottom:var(--s7)">
      <div class="xp">
        <div class="xp__head">
          <span class="xp__level"><small>Level</small>12</span>
          <span class="xp__total">1,240 XP</span>
        </div>
        <div class="xp__track"><div class="xp__fill xp__fill--static"></div><div class="xp__ticks"></div></div>
        <p class="xp__foot"><span>40 to next level</span><span>Apprentice Scribe</span></p>
      </div>
      <div class="xp">
        <div class="xp__head">
          <span class="xp__level"><small>Level</small>12</span>
          <span class="xp__total">+30 XP</span>
        </div>
        <div class="xp__track"><div class="xp__fill" id="xp-demo"></div><div class="xp__ticks"></div></div>
        <p class="xp__foot"><span>HARD Trial sealed — reward posted to the ledger</span></p>
      </div>
    </div>
    <p class="component-label">QuestCard</p>
    <div class="grid-2" style="margin-bottom:var(--s7)">
      <article class="quest stampable">
        <div class="quest__top">
          <h4 class="quest__title">Wire pagination into the quest feed</h4>
          <span class="chip chip--medium"><span class="chip__mark"></span>Medium</span>
        </div>
        <p class="quest__skill">Skill · <b>REST API Integration</b></p>
        <p class="quest__rationale">
          Your roadmap has listed cursor pagination as a gap for two chapters. The feed
          endpoint currently returns every row — one real query on a real table, and the
          difference is visible in the response shape.
        </p>
        <div class="quest__foot">
          <span class="quest__reward"><small>Reward</small>20 XP</span>
          <span class="quest__evidence ev-none">No evidence</span>
        </div>
      </article>
      <article class="quest stampable quest--done">
        <div class="quest__top">
          <h4 class="quest__title">Explain the Node.js event loop</h4>
          <span class="chip chip--easy"><span class="chip__mark"></span>Easy</span>
        </div>
        <p class="quest__skill">Skill · <b>Node.js Runtime</b></p>
        <p class="quest__rationale">
          Sealed. The written explanation is attached, and the XP it produced is already
          in the ledger — immutable, keyed to this quest so it can never post twice.
        </p>
        <div class="quest__foot">
          <span class="quest__reward"><small>Reward</small>10 XP</span>
          <span class="quest__evidence ev-have">Evidence filed</span>
        </div>
      </article>
      <article class="quest stampable">
        <div class="quest__top">
          <h4 class="quest__title">Chapter Boss — Ship the roadmap v2</h4>
          <span class="chip chip--boss"><span class="chip__mark"></span>Boss</span>
        </div>
        <p class="quest__skill">Skill · <b>Roadmap Revision</b></p>
        <p class="quest__rationale">
          The whole chapter converges here: the grimoire grows a new page, and the diff
          against v1 is the proof that the plan changed for a reason.
        </p>
        <div class="quest__foot">
          <span class="quest__reward"><small>Reward</small>30 XP</span>
          <span class="quest__evidence ev-none">No evidence</span>
        </div>
      </article>
    </div>
    <p class="component-label">PanelFrame — double rule and corner ticks</p>
    <div class="grid-2" style="margin-bottom:var(--s7)">
      <div class="panel panel--framed">
        <h4 style="font-family:var(--font-display); font-weight:800; font-size:var(--fs-2xl); margin:0 0 var(--s3)">Chapter II</h4>
        <p style="margin:0; font-size:var(--fs-sm); color:var(--ink-700)">
          Framed parchment surface for hero and map panels. The frame is four borders and
          a set of corner ticks — no border image, no asset.
        </p>
      </div>
      <div class="panel panel--dark panel--framed">
        <p class="component-label" style="color:var(--cover-fg)">Game Master</p>
        <p style="margin:0; font-size:var(--fs-lg); line-height:1.5; color:var(--cover-fg)">
          “Two Trials went unanswered. I have redrawn the week — lighter, not shorter.
          Nothing has been struck from the book.”
        </p>
      </div>
    </div>
    <p class="component-label">Sigil — deterministic, grows a branch on level-up</p>
    <div class="panel" style="margin-bottom:var(--s7)">
      <div class="sigil-box">
        <div id="sigil-host" class="sigil"></div>
        <div>
          <p style="margin:0 0 var(--s3); font-size:var(--fs-sm); color:var(--ink-700); max-width:44ch">
            Generated from the goal, domain and level — the same input always draws the
            same sigil. No artist, no character illustration, and it is the only element
            in the system allowed to feel personal.
          </p>
          <div class="row">
            <button class="toggle" id="btn-sigil-up">Level +1 — grow a branch</button>
            <button class="toggle" id="btn-sigil-redraw">Redraw ink</button>
          </div>
          <p style="margin:var(--s3) 0 0; font-family:var(--font-label); font-size:var(--fs-sm); color:var(--ink-700)">
            Level <span id="sigil-level" style="font-family:var(--font-numeric); font-size:17px; color:var(--ink-900)">4</span>
            · branches <span id="sigil-branches" style="font-family:var(--font-numeric); font-size:17px; color:var(--ink-900)">9</span>
          </p>
        </div>
      </div>
    </div>
    <p class="component-label">ChapterMap — layout derived from order_no, not a graph library</p>
    <div class="map" style="margin-bottom:var(--s7)">
      <svg viewBox="0 0 760 200" role="img" aria-label="Chapter map with four node states">
        <path d="M60 150 C 160 150, 180 60, 280 60 S 400 150, 480 150 S 600 70, 700 70"
              fill="none" stroke="#2A2419" stroke-width="3" stroke-dasharray="10 7" opacity="0.55"/>
        <g transform="translate(60,150)">
          <circle r="19" fill="#F6F0DE" stroke="#9A8C6E" stroke-width="2" stroke-dasharray="5 4"/>
          <text class="node-label" text-anchor="middle" y="4">I</text>
          <text class="node-sub" text-anchor="middle" y="38">Locked</text>
        </g>
        <g transform="translate(280,60)">
          <circle r="21" fill="#3F6B45" stroke="#2A2419" stroke-width="3"/>
          <text class="node-label" fill="#F6F0DE" text-anchor="middle" y="5">II</text>
          <text class="node-sub" text-anchor="middle" y="40">Cleared</text>
        </g>
        <g transform="translate(480,150)">
          <circle r="23" fill="#F6F0DE" stroke="#2A2419" stroke-width="4"/>
          <circle r="30" fill="none" stroke="#B23A1F" stroke-width="2" opacity="0.6"/>
          <text class="node-label" text-anchor="middle" y="6">III</text>
          <text class="node-sub" text-anchor="middle" y="44">Open</text>
        </g>
        <g transform="translate(700,58)">
          <rect x="-30" y="-30" width="60" height="60" fill="#6B2B4A" stroke="#2A2419" stroke-width="4"/>
          <text class="node-label" fill="#F6F0DE" text-anchor="middle" y="6" style="font-size:15px">IV</text>
          <text class="node-sub" text-anchor="middle" y="46">Chapter Boss</text>
        </g>
      </svg>
    </div>
    <p class="component-label">Hatching — decorative surfaces only</p>
    <div class="hatch" style="margin-bottom:var(--s7)">
      <h4 class="hatch__title">The map room</h4>
      <p class="hatch__note">
        Diagonal hatch is the genre’s shading grammar, and it lives only on large
        decorative panels. Behind body copy it collapses into a grey smear at projection
        distance — which is why the note you are reading sits on a solid parchment plate.
      </p>
    </div>
  </section>
  <section id="presentation">
    <div class="sec-head">
      <h2>05 — Presentation Mode</h2>
      <h3>The highest-leverage feature here</h3>
    </div>
    <p class="lede">
      The button in the top bar sets one attribute on <code>&lt;html&gt;</code>. That single
      attribute multiplies the type scale by 1.4, drops the grain overlay and switches off
      every animation. It is the difference between hoping the projector is bright enough
      and knowing the text is readable.
    </p>
    <div class="pm-demo">
      <div class="pm-card">
        <h4>Toggled on</h4>
        <p>Body copy goes 17px → ~24px, which is the projector floor for content that has to be read from three metres. Grain is removed — at 4% opacity nobody in the room can see it, and it is the most expensive effect in the system.</p>
      </div>
      <div class="pm-card">
        <h4>Also wired to</h4>
        <p><code>prefers-reduced-motion</code> and <code>prefers-contrast: more</code>. Users who need it get it without pressing anything, and the Motion&nbsp;Off button in the bar lets you rehearse that state before the demo.</p>
      </div>
    </div>
  </section>
  <section id="rules">
    <div class="sec-head">
      <h2>06 — Rules</h2>
      <h3>What this system forbids</h3>
    </div>
    <div class="grid-2">
      <div>
        <p class="component-label">Never</p>
        <ul class="rule-list">
          <li><code>#FFFFFF</code> as a content surface — glare in the dark, halation on the projector</li>
          <li>Soft or blurred shadows. Every shadow is a hard offset, 0 blur, integer pixels</li>
          <li>Uniform border-radius across components</li>
          <li>Grenze Gotisch outside the logo, chapter titles and level-up</li>
          <li>A live <code>feTurbulence</code> filter anywhere</li>
          <li>Fine crosshatch behind body text</li>
          <li>Mana rendered as a gradient — it must snap at the threshold</li>
          <li>Hardcoded colours. Everything routes through a token</li>
        </ul>
      </div>
      <div>
        <p class="component-label">Always</p>
        <ul class="rule-list rule-list--do">
          <li>Body text at ink.900 or ink.700 — both measured AAA against the page</li>
          <li>Semantic strokes at 2px minimum, 3px preferred</li>
          <li>Press feedback as movement into the shadow, not a colour change</li>
          <li>Dark chrome under 15% of screen area</li>
          <li>Loading, empty and error states drawn by hand, not library defaults</li>
          <li>Accent fills carrying <b>light</b> text — never dark</li>
          <li>Easy / medium / hard as outlined chips with ink text; boss as the one filled chip</li>
          <li>Cover chrome text at cover.fg (13.96:1), not fgMuted, below 18px</li>
        </ul>
      </div>
    </div>
  </section>
  <div class="colophon">
    <p>
      Generated as the Day 1 lock-in artefact. Tokens in <code>design/design-tokens.json</code>,
      rationale in <code>DESIGN.md</code>, constraints in <code>SPEC.md §5.4</code>.
      Typefaces are Grenze Gotisch, Literata, Anton and Marcellus (all SIL Open Font License,
      served from Google Fonts). Icons, when added, come from game-icons.net under CC BY 3.0.
    </p>
  </div>
</div>
<footer class="statusbar">
  <span class="statusbar__stat"><span class="statusbar__num">12</span><span class="statusbar__label">Level</span></span>
  <span class="statusbar__stat"><span class="statusbar__num">1,240</span><span class="statusbar__label">XP</span></span>
  <span class="statusbar__stat"><span class="statusbar__num">92</span><span class="statusbar__label">Mana</span></span>
  <span class="statusbar__stat"><span class="statusbar__num">3</span><span class="statusbar__label">Trials today</span></span>
  <span class="statusbar__ratio">
    Dark chrome <b id="dark-ratio">—</b> of viewport · ceiling <b>15%</b>
  </span>
</footer>
<script>
/* ═══════════════════════════════════════════════════════════════════
   1. Contrast audit — WCAG 2.1 relative luminance
   ═══════════════════════════════════════════════════════════════════ */
const TOKENS = {
  cover: { '900':'#16130D','800':'#211C14','700':'#2E2718','600':'#3D3421',fg:'#E8DFC8',fgMuted:'#A99C7E' },
  page:  { base:'#F1E9D2',raised:'#F6F0DE',sunken:'#E8DFC4',edge:'#DCD2B4' },
  ink:   { '900':'#2A2419','700':'#4A4030','500':'#6B5E45','300':'#9A8C6E','100':'#C4B896' },
  accent:{ base:'#B23A1F',deep:'#8A2B14',soft:'#E8C9BC' },
  gold:  { onPage:'#634808',onCover:'#D4A72C' },
  mana:  { full:'#3F6B45',warn:'#7E540F',critical:'#9E2B25' },
  difficulty: { easy:'#4A6B52',medium:'#7E540F',hard:'#A63A22',boss:'#6B2B4A' },
  signal:{ success:'#3F6B45',warning:'#9A6B1E',danger:'#9E2B25',info:'#3A5A72' },
  /* Presentation Mode's two contrast overrides — the same values
     design-tokens.json holds and scripts/tokens-to-css.mjs emits into
     src/styles/tokens.css. They are copied here so this table MEASURES them;
     the three audit rows that use them are the only place the claim is checked,
     and a value edited in one file without the other fails visibly right there
     instead of quietly certifying itself. */
  presentation:{ ink500:'#4A4030', coverFgMuted:'#BCAD8C' }
};
function hexToRgb(hex) {
  const h = hex.replace('#','');
  return [0,2,4].map(i => parseInt(h.slice(i, i+2), 16));
}
function relLuminance(hex) {
  const [r,g,b] = hexToRgb(hex).map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
function contrast(a, b) {
  const la = relLuminance(a), lb = relLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
/* Pairs that actually occur in the UI. `expect` records the design intent:
   'text'   → must reach AAA 7:1 (projector budget)
   'large'  → AAA large is 4.5:1; acceptable for 24px+ / 19px bold only
   'deco'   → decoration; never text. Listed so the failure is documented.
   'probe'  → a rejected option, kept to justify the decision that replaced it. */
const AUDIT = [
  { label:'ink.900 on page.base', fg:TOKENS.ink['900'], bg:TOKENS.page.base, expect:'text',  use:'Body, headings — the primary reading pair' },
  { label:'ink.700 on page.base', fg:TOKENS.ink['700'], bg:TOKENS.page.base, expect:'text',  use:'Secondary body, rationale, captions' },
  { label:'ink.900 on page.raised', fg:TOKENS.ink['900'], bg:TOKENS.page.raised, expect:'text', use:'Body inside cards' },
  { label:'ink.500 on page.base', fg:TOKENS.ink['500'], bg:TOKENS.page.base, expect:'large', use:'18px+ or non-essential only — never dense copy' },
  { label:'ink.300 on page.base', fg:TOKENS.ink['300'], bg:TOKENS.page.base, expect:'deco',  use:'DECORATION ONLY — never text' },
  { label:'ink.100 on page.base', fg:TOKENS.ink['100'], bg:TOKENS.page.base, expect:'deco',  use:'Dividers, borders, disabled fills only' },
  { label:'ink.500 (Presentation) on page.base', fg:TOKENS.presentation.ink500, bg:TOKENS.page.base, expect:'text', use:'Presentation Mode promotes the 18px+ rung. It has to clear AAA rather than lean on the large-text allowance, because 13px × 1.4 = 18.2px is still NOT WCAG-large.' },
  { label:'ink.500 (Presentation) on page.sunken', fg:TOKENS.presentation.ink500, bg:TOKENS.page.sunken, expect:'text', use:'The BINDING surface — the darkest parchment that carries text — so the override is sized against this row and not the one above it.' },
  { label:'cover.fgMuted (Presentation) on cover.900', fg:TOKENS.presentation.coverFgMuted, bg:TOKENS.cover['900'], expect:'text', use:'Nav labels and status readouts sit below the 18px floor, so in this mode the chrome rung must reach AAA rather than 4.5:1.' },
  { label:'cover.fg on cover.900', fg:TOKENS.cover.fg, bg:TOKENS.cover['900'], expect:'text', use:'Nav and status bar text' },
  { label:'cover.fgMuted on cover.900', fg:TOKENS.cover.fgMuted, bg:TOKENS.cover['900'], expect:'large', use:'Non-essential chrome only — dev readouts, disabled. NOT for nav labels.' },
  { label:'accent on page.base', fg:TOKENS.accent.base, bg:TOKENS.page.base, expect:'large', use:'Accent TEXT is allowed only at 24px+; prefer it as a fill' },
  { label:'page.raised on accent (fill)', fg:TOKENS.page.raised, bg:TOKENS.accent.base, expect:'large', use:'The sanctioned accent fill — LIGHT text on cinnabar' },
  { label:'page.raised on accent.deep (fill)', fg:TOKENS.page.raised, bg:TOKENS.accent.deep, expect:'text', use:'Use this when a filled accent element must reach AAA' },
  { label:'gold.onPage on page.base', fg:TOKENS.gold.onPage, bg:TOKENS.page.base, expect:'text', use:'Reward figures. Gold had to go dark to clear AAA on parchment.' },
  { label:'gold.onCover on cover.700', fg:TOKENS.gold.onCover, bg:TOKENS.cover['700'], expect:'large', use:'Reward moments — use cover.800/900 for the full 7:1' },
  { label:'mana.full on page.base', fg:TOKENS.mana.full, bg:TOKENS.page.base, expect:'large', use:'Mana fill / large figure' },
  { label:'mana.warn on page.base', fg:TOKENS.mana.warn, bg:TOKENS.page.base, expect:'large', use:'Mana fill / large figure' },
  { label:'mana.critical on page.base', fg:TOKENS.mana.critical, bg:TOKENS.page.base, expect:'large', use:'Mana fill / large figure' },
  { label:'diff.easy on page.base', fg:TOKENS.difficulty.easy, bg:TOKENS.page.base, expect:'large', use:'Chip border and marker only' },
  { label:'diff.medium on page.base', fg:TOKENS.difficulty.medium, bg:TOKENS.page.base, expect:'large', use:'Chip border and marker only' },
  { label:'diff.hard on page.base', fg:TOKENS.difficulty.hard, bg:TOKENS.page.base, expect:'large', use:'Chip border and marker only' },
  { label:'diff.boss on page.base', fg:TOKENS.difficulty.boss, bg:TOKENS.page.base, expect:'large', use:'Chip border and marker only' },
  { label:'PROBE — page.raised on diff.easy', fg:TOKENS.page.raised, bg:TOKENS.difficulty.easy, expect:'text', use:'A filled “easy” chip. Lands at AAA-large only, so easy stays outlined.' },
  { label:'PROBE — page.raised on diff.medium', fg:TOKENS.page.raised, bg:TOKENS.difficulty.medium, expect:'text', use:'A filled “medium” chip. Fails — medium stays outlined.' },
  { label:'PROBE — page.raised on diff.hard', fg:TOKENS.page.raised, bg:TOKENS.difficulty.hard, expect:'text', use:'A filled “hard” chip. AAA-large only — hard stays outlined.' },
  { label:'page.raised on diff.boss', fg:TOKENS.page.raised, bg:TOKENS.difficulty.boss, expect:'text', use:'The ONE filled chip. Clears AAA, so boss is filled — different in kind, not just hue.' },
  { label:'REJECTED — ink.900 on accent', fg:TOKENS.ink['900'], bg:TOKENS.accent.base, expect:'text', use:'Dark text on cinnabar. The intuitive choice, and it is unreadable.' },
  { label:'REJECTED — gold.onCover on diff.boss', fg:TOKENS.gold.onCover, bg:TOKENS.difficulty.boss, expect:'text', use:'The tempting boss treatment. Worse than plain light text.' }
];
function verdict(ratio, expect) {
  if (expect === 'deco') return { cls:'v-fail', text:'Decoration only' };
  if (expect === 'text') {
    if (ratio >= 7)    return { cls:'v-pass', text:'AAA' };
    if (ratio >= 4.5)  return { cls:'v-warn', text:'AA only — fails target' };
    return { cls:'v-fail', text:'Fails' };
  }
  if (ratio >= 7)   return { cls:'v-pass', text:'AAA' };
  if (ratio >= 4.5) return { cls:'v-pass', text:'AAA large' };
  if (ratio >= 3)   return { cls:'v-warn', text:'AA large only' };
  return { cls:'v-fail', text:'Fails' };
}
(function renderAudit() {
  const body = document.getElementById('audit-body');
  body.innerHTML = AUDIT.map(row => {
    const ratio = contrast(row.fg, row.bg);
    const v = verdict(ratio, row.expect);
    const isRejected = row.label.startsWith('REJECTED');
    const isProbe = row.label.startsWith('PROBE');
    const failed = (v.cls === 'v-fail' && row.expect !== 'deco') || isRejected;
    const cls = failed ? ' class="is-fail"' : (v.cls === 'v-warn' || row.expect === 'deco' ? ' class="is-note"' : '');
    const short = row.label.replace(/^(REJECTED|PROBE) — /,'');
    const tag = isRejected ? '<b>' + short + '</b>' : isProbe ? '<i>' + short + '</i>' : short;
    return `<tr${cls}>
      <td>${tag}</td>
      <td><span class="audit__sample" style="color:${row.fg};background:${row.bg}">Aa 17px</span></td>
      <td class="audit__ratio">${ratio.toFixed(2)}:1</td>
      <td class="audit__verdict ${v.cls}">${v.text}</td>
      <td style="color:var(--ink-700)">${row.use}</td>
    </tr>`;
  }).join('');
})();
/* ═══════════════════════════════════════════════════════════════════
   2. Swatch grids — every chip annotated with its measured ratio
   ═══════════════════════════════════════════════════════════════════ */
const SWATCH_SETS = {
  cover: { bg:TOKENS.page.base, keys:['900','800','700','600','fg','fgMuted'] },
  page:  { bg:TOKENS.ink['900'], keys:['base','raised','sunken','edge'] },
  ink:   { bg:TOKENS.page.base, keys:['900','700','500','300','100'] },
  accent:{ bg:TOKENS.page.base, keys:['base','deep','soft'] },
  gold:  { bg:TOKENS.cover['700'], keys:['onPage','onCover'] },
  mana:  { bg:TOKENS.page.base, keys:['full','warn','critical'] },
  difficulty: { bg:TOKENS.page.base, keys:['easy','medium','hard','boss'] }
};
function ratioClass(r) { return r >= 7 ? 'r-aaa' : r >= 4.5 ? 'r-aa' : 'r-bad'; }
function ratioNote(r)  { return r >= 7 ? 'AAA text' : r >= 4.5 ? 'AAA large only' : r >= 3 ? 'AA large only' : 'not for text'; }
document.querySelectorAll('[data-swatch-group]').forEach(host => {
  const set = SWATCH_SETS[host.dataset.swatchGroup];
  if (!set) return;
  host.innerHTML = set.keys.map(k => {
    const hex = TOKENS[host.dataset.swatchGroup][k];
    const r = contrast(hex, set.bg);
    return `<div class="swatch">
      <div class="swatch__chip" style="background:${hex}"></div>
      <div class="swatch__meta">
        <span class="swatch__name">${k}</span>
        <span class="swatch__hex">${hex}</span>
        <span class="swatch__ratio ${ratioClass(r)}">${r.toFixed(2)}:1</span>
        <span class="swatch__tag">${ratioNote(r)}</span>
      </div>
    </div>`;
  }).join('');
});
/* ═══════════════════════════════════════════════════════════════════
   3. ManaBar segments
   ═══════════════════════════════════════════════════════════════════ */
document.querySelectorAll('[data-mana]').forEach(track => {
  const value = Number(track.dataset.mana);
  const filled = Math.round(value / 5);           // 20 cells, 5 points each
  track.innerHTML = Array.from({ length: 20 }, (_, i) =>
    `<div class="mana__cell${i < filled ? ' is-on' : ''}"></div>`).join('');
});
/* ═══════════════════════════════════════════════════════════════════
   4. Sigil — deterministic SVG from a seed, branches grow with level
   ═══════════════════════════════════════════════════════════════════ */
function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const SIGIL_SEED = 'lifeos|backend-developer|core';
const INK = '#2A2419';
const ACCENT = '#B23A1F';
function buildSigil(level) {
  const rand = mulberry32(hashString(SIGIL_SEED + '|L' + level));
  const cx = 100, cy = 100;
  const branches = 5 + level;                       // grows one branch per level
  const parts = [];
  // outer rings — one per 3 levels, capped
  const rings = Math.min(3, Math.floor(level / 3));
  for (let i = 0; i < rings; i++) {
    const r = 92 - i * 9;
    parts.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}"
      stroke-width="${i === 0 ? 3 : 1.5}" opacity="${i === 0 ? 1 : 0.45}" data-draw pathLength="1"/>`);
  }
  // radial branches with sub-branches
  for (let i = 0; i < branches; i++) {
    const base = (i / branches) * Math.PI * 2;
    const jitter = (rand() - 0.5) * 0.22;
    const a = base + jitter;
    const inner = 22 + rand() * 10;
    const outer = 62 + rand() * 24;
    const bow = (rand() - 0.5) * 26;                // curvature of the branch
    const x1 = cx + Math.cos(a) * inner, y1 = cy + Math.sin(a) * inner;
    const x2 = cx + Math.cos(a) * outer, y2 = cy + Math.sin(a) * outer;
    const mx = (x1 + x2) / 2 + Math.cos(a + Math.PI / 2) * bow;
    const my = (y1 + y2) / 2 + Math.sin(a + Math.PI / 2) * bow;
    parts.push(`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"
      fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round" data-draw pathLength="1"/>`);
    // sub-branch at roughly 60% out, alternating side
    if (rand() > 0.25) {
      const t = 0.58;
      const sx = (1-t)*(1-t)*x1 + 2*(1-t)*t*mx + t*t*x2;
      const sy = (1-t)*(1-t)*y1 + 2*(1-t)*t*my + t*t*y2;
      const side = rand() > 0.5 ? 1 : -1;
      const sa = a + side * (0.55 + rand() * 0.35);
      const sl = 12 + rand() * 16;
      parts.push(`<path d="M${sx.toFixed(1)} ${sy.toFixed(1)} L${(sx + Math.cos(sa)*sl).toFixed(1)} ${(sy + Math.sin(sa)*sl).toFixed(1)}"
        fill="none" stroke="${INK}" stroke-width="1.5" stroke-linecap="round" opacity="0.85" data-draw pathLength="1"/>`);
    }
  }
  // centre mark — a rotated square, one vertex per 4 levels
  const rot = (level % 4) * 22.5;
  parts.push(`<rect x="${cx - 13}" y="${cy - 13}" width="26" height="26"
    transform="rotate(${rot} ${cx} ${cy})" fill="${ACCENT}" stroke="${INK}" stroke-width="3"/>`);
  parts.push(`<circle cx="${cx}" cy="${cy}" r="4.5" fill="${INK}"/>`);
  return `<svg viewBox="0 0 200 200" width="100%" height="100%" role="img"
    aria-label="Personal sigil, level ${level}, ${branches} branches">
    ${parts.join('\n')}
  </svg>`;
}
let sigilLevel = 4;
function renderSigil() {
  const host = document.getElementById('sigil-host');
  host.innerHTML = buildSigil(sigilLevel);
  document.getElementById('sigil-level').textContent = sigilLevel;
  document.getElementById('sigil-branches').textContent = 5 + sigilLevel;
}
renderSigil();
document.getElementById('btn-sigil-up').addEventListener('click', () => {
  sigilLevel = sigilLevel >= 20 ? 4 : sigilLevel + 1;
  renderSigil();
});
document.getElementById('btn-sigil-redraw').addEventListener('click', () => {
  const host = document.getElementById('sigil-host');
  const svg = host.querySelector('svg');
  host.innerHTML = '';
  void host.offsetWidth;                            // force reflow so the animation restarts
  host.innerHTML = buildSigil(sigilLevel);
});
/* ═══════════════════════════════════════════════════════════════════
   5. Demo animations
   ═══════════════════════════════════════════════════════════════════ */
(function xpOvershoot() {
  const fill = document.getElementById('xp-demo');
  if (!fill) return;
  let t = 0;
  setInterval(() => {
    t = t > 1 ? 0 : t + 0.02;
    // overshoot then settle — the spring feel, in plain CSS width terms
    const eased = 1 - Math.pow(1 - Math.min(t, 1), 3);
    const overshoot = t > 0.85 ? Math.sin((t - 0.85) * 20) * 0.03 : 0;
    fill.style.width = Math.max(0, Math.min(1, eased + overshoot)) * 64 + '%';
  }, 60);
})();
/* ═══════════════════════════════════════════════════════════════════
   6. Header toggles + dark-area readout
   ═══════════════════════════════════════════════════════════════════ */
const root = document.documentElement;
const btnPresentation = document.getElementById('btn-presentation');
const btnMotion = document.getElementById('btn-motion');
btnPresentation.addEventListener('click', () => {
  const on = root.dataset.presentation !== 'true';
  root.dataset.presentation = String(on);
  btnPresentation.setAttribute('aria-pressed', String(on));
});
btnMotion.addEventListener('click', () => {
  const off = root.dataset.motion !== 'off';
  root.dataset.motion = off ? 'off' : 'on';
  btnMotion.setAttribute('aria-pressed', String(off));
});
function updateDarkRatio() {
  const cover = 56, status = 40;
  const pct = ((cover + status) / window.innerHeight) * 100;
  const el = document.getElementById('dark-ratio');
  el.textContent = pct.toFixed(1) + '%';
  el.style.color = pct <= 15 ? '#7FC08A' : '#E8A0A0';
}
window.addEventListener('resize', updateDarkRatio);
updateDarkRatio();
/* Smooth scroll for the nav */
document.querySelectorAll('.cover__nav a').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
</script>
</body>
</html>
````

## File: scripts/build.mjs
````javascript
import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
for(const file of ['app','pages','companion','graph','ui','data','state','curriculum','breadth','pathways'])execFileSync(process.execPath,['--check',path.join(root,'src',`${file}.js`)]);
const output=path.join(root,'dist');await mkdir(output,{recursive:true});
for(const file of ['index.html','src','assets'])await cp(path.join(root,file),path.join(output,file),{recursive:true});
await writeFile(path.join(output,'build-info.json'),JSON.stringify({name:'LifeOS Grimoire Demo',builtAt:new Date().toISOString(),mode:'static'},null,2));
const html=await readFile(path.join(output,'index.html'),'utf8');if(!html.includes('/src/app.js'))throw new Error('Missing application entry point');
console.log('Build complete: dist/ · Static, dependency-free demo. Serve this directory at the root of a local HTTP server.');
````

## File: scripts/expand-ui.mjs
````javascript
import {readFileSync,writeFileSync} from 'node:fs';
function edit(p,fn){writeFileSync(p,fn(readFileSync(p,'utf8')));}
edit('src/pages.js',s=>s.replace('SEVEN PATHS. ENDLESS POSSIBILITIES.','${TRACKS.length} PATHS. ENDLESS POSSIBILITIES.').replace('seven detailed curriculum templates','${TRACKS.length} detailed curriculum templates').replaceAll('<div class="graph-layout">','<div class="graph-layout expansive-layout">').replace("v.track==='all'&&!v.search&&v.filter==='all'?'· Select a branch to explore'","!v.search&&v.filter==='all'?'· All nodes visible · Zoom to explore'").replace("(v.track!=='all'||v.search||v.filter!=='all')","(v.search||v.filter!=='all')").replace(/<div class="graph-pagination"><span>Chapters .*?<\/div><\/div>\$\{v.view==='graph'/s,'<div class="graph-pagination"><span>Full branching roadmap · Solid: suggested prerequisite · Dashed: optional exploration</span></div>${v.view===\'graph\'').replace('<p>${esc(c.summary)}</p><div class="eyebrow">CONCEPTS IN THIS CHAPTER','<p>${esc(c.summary)}</p><div class="pathway-note"><strong>${esc(c.lane||\'Study chapter\')}</strong><p>${c.requires?.length?\'Suggested first: \'+c.requires.map(i=>esc(j.chapters[i].title)).join(\' · \'):\'Start here — no prerequisite chapters.\'}</p><small>Suggested order · Activities remain open for exploration.</small></div><div class="eyebrow">CONCEPTS IN THIS CHAPTER'));
edit('src/app.js',s=>s.replace('Seven detailed demo templates','${TRACKS.length} detailed demo templates'));
edit('src/companion.js',s=>s.replace('EXPLORE THE SEVEN ARTS','EXPLORE ALL ${TRACKS.length} ARTS').replace("'Build a PDF chatbot'","'Build a PDF chatbot','Learn ESP32','Explore Xiaozhi','Practice IELTS','Learn badminton','Explore psychology'").replace('${c.topics?.length||0} concepts · ${c.quests.length} activities','${esc(c.lane||\'Study\')} · ${c.topics?.length||0} concepts'));
edit('src/state.js',s=>s.replace('This demo companion supports Python, DSA, Java, OOP, JavaScript, AI Fundamentals, and RAG Engineering. Try “I want to learn Java”, ask for an explanation, or say “I only have 30 minutes a day”. Responses come from prepared scenarios.','Explore one of the 20 branches: programming, electronics, ESP32, sensors, IoT, Xiaozhi, psychology, critical thinking, communication, English, IELTS, badminton, fitness, or habits. Choose a branch from the sidebar or say “Learn ESP32”. Responses come from prepared scenarios.').replace("'Build or trace the smallest working example','Try an edge case and explain what changes'","'Complete a small version of the chapter activity','Compare two attempts or observations and describe what changes'"));
edit('scripts/build.mjs',s=>s.replace("'state','curriculum'","'state','curriculum','breadth','pathways'"));
````

## File: src/app.js
````javascript
import {TRACKS,trackById,STATUSES} from './data.js';
import {STORAGE_KEY,createInitialState,hydrate,activeJourney,levelFor,completeQuest,respondToChat,activateRoadmap,proposeSchedule,applyProposal,settleChat,createRoadmap} from './state.js';
import {icon,esc,btn,badge,progress} from './ui.js';
import {todayPage,knowledgePage,roadmapPage,progressPage,settingsPage} from './pages.js';
import {companionPage} from './companion.js';
import {bindGraph} from './graph.js';
let storageWarning=false,raw=null;
try{raw=localStorage.getItem(STORAGE_KEY);}catch{storageWarning=true;}
let state=hydrate(raw),busy=false,modal=null,returnFocus=null,toastTimer,disposeGraph;
const nav=[['today','book','Today'],['knowledge','tree','My Knowledge'],['roadmap','compass','Roadmap'],['companion','spark','Companion'],['progress','chart','Progress'],['settings','settings','Settings']];
let page=nav.some(([id])=>id===location.hash.slice(1))?location.hash.slice(1):'today';
let view={track:'all',search:'',filter:'all',concept:'python-0',chapter:1,view:'graph'};
const app=document.querySelector('#app');
function save(){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{storageWarning=true;}document.body.classList.toggle('reduced-motion',state.preferences.reducedMotion);}
function commit(next){state=next;save();}
function toast(message){const t=document.querySelector('#toast');t.innerHTML=`${icon('check')}<span>${esc(message)}</span>`;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),4200);}
function navigate(id){if(!nav.some(([n])=>n===id))return;closeModal();page=id;location.hash=id;view.view='graph';render();window.scrollTo({top:0});}
function render(){
  disposeGraph?.();disposeGraph=null;
  const j=activeJourney(state);
  document.title=`${nav.find(([id])=>id===page)[2]} · LifeOS Grimoire`;
  app.innerHTML=`<header class="topbar"><button class="icon-button mobile-menu" data-action="menu" aria-label="Toggle navigation">${icon('menu')}</button><a class="brand" href="#today"><img src="/assets/crest.png" alt=""><span><strong>LIFEOS GRIMOIRE</strong><small>Tome of Mastery · Vol. IV</small></span></a><div class="topbar-center"><span class="little-diamond">✦</span> A little wiser, every day <span class="little-diamond">✦</span></div><div class="topbar-right"><span class="demo-indicator"><i></i> INTERACTIVE DEMO</span><div class="profile-mini"><span><strong>Minh</strong><small>Level ${levelFor(state.xp)} · ${state.xp} XP</small></span><img src="/assets/minh.png" alt="Minh's profile"></div></div></header>
  <aside class="sidebar" aria-label="Main navigation"><div class="chronicle"><div class="eyebrow">CHRONICLE CYCLE ${icon('clock')}</div><h3>Chapter IV</h3><span>The Season of Discovery</span><div class="chronicle-rule"><span>✦</span></div></div><nav>${nav.map(([id,i,label])=>`<a href="#${id}" class="nav-link ${page===id?'active':''}" ${page===id?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${id==='companion'?'<span class="nav-new">NEW</span>':''}</a>`).join('')}</nav><div class="sidebar-bottom"><div class="sidebar-quote">“A thousand branches.<br>One curious mind.”</div><button class="new-journey-btn" data-action="new-journey">${icon('plus')} Begin a new journey</button><div class="local-status">${icon('shield')} Your own sanctuary<span>Saved in this browser</span></div></div></aside>
  <main id="main" tabindex="-1"><div class="page-kicker"><span>LIFEOS ACADEMY <span>/</span> ${nav.find(([id])=>id===page)[2].toUpperCase()}</span><span>✧ THE GRAND ARCHIVES</span></div>${storageWarning?'<div class="notice" role="status">Browser storage is unavailable. You can keep exploring, but changes will last only for this session.</div>':''}${page==='today'?todayPage(state):page==='knowledge'?knowledgePage(state,view):page==='roadmap'?roadmapPage(state,view):page==='companion'?companionPage(state,busy):page==='progress'?progressPage(state):settingsPage(state)}<footer class="page-footer"><span>✦ LIFEOS · A GRIMOIRE OF SMALL VICTORIES</span><span>Craft your own chapter.</span></footer></main>`;
  if(page==='knowledge'||page==='roadmap')disposeGraph=bindGraph(app);
  bindForms();
  if(page==='companion'){const log=document.querySelector('#chat-transcript');log.scrollTop=log.scrollHeight;}
}
function closeModal(){const root=document.querySelector('#modal-root');root.innerHTML='';document.body.classList.remove('modal-open');modal=null;if(returnFocus?.isConnected)returnFocus.focus();}
function openModal(type,id){returnFocus=document.activeElement;modal={type,id};renderModal();}
function dialog(title,body,footer='',wide=false){return `<div class="modal-backdrop"><section class="modal ${wide?'wide':''}" role="dialog" aria-modal="true" aria-labelledby="dialog-title" tabindex="-1"><header class="modal-header"><div><div class="eyebrow">LIFEOS · THE GRAND ARCHIVES</div><h2 id="dialog-title">${esc(title)}</h2></div><button class="icon-button" data-action="close" aria-label="Close dialog">${icon('close')}</button></header><div class="modal-body">${body}</div>${footer?`<footer class="modal-footer">${footer}</footer>`:''}</section></div>`;}
function renderModal(){
  if(!modal)return;const {type,id}=modal;let html='';
  if(type==='quest'){
    const q=state.quests.find(q=>q.id===id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===id);if(!q){closeModal();return;}
    const preview=view.examplePlan?.id===q.journeyId;
    html=dialog(q.title,`<div class="meta">${badge(q.type,'red')}${badge(`Rank ${q.difficulty}`,'gold')}<span>${icon('clock')}${q.minutes} min</span><b class="xp-text">+${q.xp} XP</b>${badge(q.status==='completed'?'Completed':q.status==='in-progress'?'In progress':'Ready to explore',q.status==='completed'?'green':'')}</div><p class="quest-intro">${esc(q.description)}</p><div class="quest-objective"><div class="eyebrow">YOUR SMALL ADVENTURE</div><p>${esc(q.prompt)}</p></div><h3>Field notes & steps</h3><div class="checklist">${q.steps.map((step,i)=>`<label><input type="checkbox" data-check="${i}" ${q.checks.includes(i)?'checked':''} ${q.status==='completed'||preview?'disabled':''}><span>${esc(step)}</span></label>`).join('')}</div><label class="input-label" for="quest-notes">Your observation <span>${preview?'Preview only':'Optional · saved locally'}</span></label><textarea id="quest-notes" ${preview?'disabled':''} rows="3" placeholder="What did you notice? What would you like to explore next?" maxlength="2000">${esc(q.notes)}</textarea><a class="resource-link" href="${esc(q.resource)}" target="_blank" rel="noopener noreferrer">${icon('book')} Open learning resource ${icon('external')}</a><p class="small-copy">You decide when the activity is complete. Your checklist is a guide, not a test. Activity XP does not change your knowledge rank.</p>`,`${btn('Back to my grimoire','close')}${view.examplePlan?.id===q.journeyId?badge('Preview · Start the roadmap to record activities','gold'):q.status==='completed'?badge('Recorded in your chronicle','green'):q.status==='active'?btn('Start quest','begin-quest',{id,primary:true,icon:'arrow'}):btn('I have completed this activity','complete-quest',{id,primary:true,icon:'check'})}`,true);
  }else if(type==='evidence'){
    const c=state.concepts.find(c=>c.id===id);
    html=dialog(`${c.name} · Evidence`,`${badge(STATUSES[c.status].label,'gold')}<p>${esc(c.scope)}</p><div class="notice">These are labeled sample conversations. They are not observations about you.</div>${c.evidence.length?c.evidence.map(e=>`<blockquote class="evidence"><div class="eyebrow">MINH · ${esc(e.date)}</div><p>“${esc(e.text)}”</p><footer>${esc(e.reason)}</footer></blockquote>`).join(''):'<div class="empty-state"><h3>No conversation evidence</h3><p>You can still explore and learn this topic.</p></div>'}<p class="small-copy">Self-reports and inferred observations remain separate. Removing this fixture will mark the concept as not yet observed.</p>`,`${btn('Mark as self-reported','self-report',{id,icon:'pen'})}${c.evidence.length?btn('Exclude this evidence','exclude-evidence',{id,icon:'trash'}):''}${btn('Close','close')}`);
  }else if(type==='schedule'){
    const j=activeJourney(state);
    html=dialog('Find your daily rhythm',`<p>Your current plan reserves <strong>${j.minutes} minutes a day</strong>. Choose a pace that fits your life.</p><form id="schedule-form"><label class="input-label" for="daily-minutes">Daily learning time</label><select id="daily-minutes" name="minutes">${[15,30,45,60,90,120].map(m=>`<option value="${m}" ${j.minutes===m?'selected':''}>${m} minutes a day</option>`).join('')}</select><p class="small-copy">The next screen shows the impact. Changes take effect only after you apply them.</p><button class="btn primary" type="submit">${icon('search')} Preview changes</button></form>`);
  }else if(type==='proposal'){
    const p=state.proposal;if(!p){closeModal();return;}
    html=dialog('A new pace, the same ambition',`<div class="eyebrow red-text">PACING PROPOSAL · WAITING FOR YOUR SEAL</div><div class="comparison"><div><small>CURRENT PLAN</small><strong>${p.previous}<span>min / day</span></strong></div>${icon('arrow')}<div><small>PROPOSED PLAN</small><strong>${p.minutes}<span>min / day</span></strong></div></div><div class="impact-list"><p>${icon('clock')} Estimated journey length: <b>${p.days} study days</b></p><p>${icon('shield')} Completed work and XP stay in your chronicle.</p><p>${icon('book')} Your in-progress activity is kept as it is.</p><p>${icon('compass')} Today will show activities within the new daily budget.</p></div><p class="small-copy">An estimate from the demo template, not a guaranteed completion date.</p>`,`${btn('Keep current plan','discard-proposal')}${btn('Apply changes','apply-proposal',{primary:true,icon:'check'})}`);
  }else if(type==='preview-draft'){
    const p=state.draft;if(!p){closeModal();return;}
    html=dialog(p.title,`<div class="meta">${badge(trackById(p.trackId).name,'gold')}<span>${p.minutes} min/day</span><span>${p.days} estimated study days</span></div>${p.chapters.map((c,i)=>`<section class="preview-chapter"><div class="eyebrow">CHAPTER ${i+1}</div><h3>${esc(c.title)}</h3><p>${esc(c.summary)}</p><ul>${c.quests.map(q=>`<li>${esc(q.title)} <small>· ${q.minutes} min · +${q.xp} XP</small></li>`).join('')}</ul></section>`).join('')}`,`${btn('Keep exploring','close')}${btn('Start this journey','activate',{primary:true,icon:'flag'})}`,true);
  }else if(type==='finish-journey'){
    const j=activeJourney(state),qs=state.quests.filter(q=>q.journeyId===j.id),done=qs.filter(q=>q.status==='completed').length;
    html=dialog('Every ending is a new beginning',`<span class="large-seal">${icon('flag')}</span><h3>${esc(j.title)}</h3><p>You have completed <strong>${done} of ${qs.length} activities</strong>. ${done<qs.length?'You can keep learning or decide that this journey has served its purpose.':'Take a moment to look back at what you have explored.'}</p><p>Your XP and knowledge remain in your grimoire. Completing a journey does not automatically change your personal rank.</p>`,`${btn('Keep learning','close')}${btn('Confirm journey complete','confirm-finish',{primary:true,icon:'check'})}`);
  }else if(type==='reset'){
    html=dialog('Open a fresh grimoire?',`<p>This restores the original Minh profile and sample RAG journey. Your added journeys, notes, conversations, and demo progress in this browser will be removed.</p><p>You will be ready to give the same presentation again.</p>`,`${btn('Keep my progress','close')}${btn('Reset demo','confirm-reset',{primary:true,icon:'reset'})}`);
  }else if(type==='new-journey'){
    html=dialog('Where will curiosity take you?',`<p>Choose an art to explore. Arcana will ask about your starting point and daily rhythm, then prepare your roadmap.</p><div class="journey-options">${TRACKS.map(t=>`<button data-action="start-track" data-id="${t.id}" style="--domain-color:${t.color}"><span>${icon(t.icon)}</span><div><strong>${esc(t.name)}</strong><small>${esc(t.goal)}</small></div>${icon('arrow')}</button>`).join('')}</div><p class="small-copy">${TRACKS.length} detailed demo templates · Up to three active journeys.</p>`);
  }
  document.querySelector('#modal-root').innerHTML=html;document.body.classList.add('modal-open');bindModalForms();document.querySelector('.modal')?.focus();
}
async function sendChat(text){
  if(busy||!text.trim())return;busy=true;
  const original=structuredClone(state),next=respondToChat(state,text);
  state={...state,messages:[...state.messages,{role:'user',text:text.trim().slice(0,1600)}]};render();
  await new Promise(r=>setTimeout(r,600));
  commit(settleChat(state,original,next));
  busy=false;render();document.querySelector('#chat-input')?.focus();
}
function startTrack(id){if(busy)return;closeModal();state.builder={stage:'goal'};state.draft=null;save();navigate('companion');sendChat(trackById(id).goal);}
const actions={
 navigate: id=>navigate(id),menu:()=>document.querySelector('.sidebar').classList.toggle('open'),
 quest:id=>openModal('quest',id),close:closeModal,
 'new-journey':()=>openModal('new-journey'), 'start-track':startTrack,
 'knowledge-track':id=>{view.track=id;view.concept=state.concepts.find(c=>c.trackId===id).id;view.search='';view.filter='all';navigate('knowledge');},
 'begin-quest':id=>{const q=state.quests.find(q=>q.id===id);q.status='in-progress';save();render();renderModal();toast('Your next chapter has begun.');},
 'complete-quest':id=>{const old=state.xp;commit(completeQuest(state,id));closeModal();render();toast(`Quest complete. +${state.xp-old} XP added to your chronicle.`);},
 branch:id=>{view.conceptPage=0;view.track=id;view.search='';view.filter='all';view.concept=state.concepts.find(c=>id==='all'||c.trackId===id).id;render();},
 concept:id=>{view.concept=id;render();if(innerWidth<1050)openModal('evidence',id);},
 'concept-page':id=>{view.conceptPage=Number(id);render();},
 chapter:id=>{view.chapter=Number(id);render();},
 view:id=>{view.view=id;render();},
 evidence:id=>openModal('evidence',id),
 'self-report':id=>{state.concepts.find(c=>c.id===id).status='self';save();closeModal();render();toast('Self-report updated. Your domain rank is unchanged.');},
 'exclude-evidence':id=>{const c=state.concepts.find(c=>c.id===id);c.evidence=[];c.status='unobserved';save();closeModal();render();toast('Sample evidence excluded.');},
 schedule:()=>openModal('schedule'),proposal:()=>openModal('proposal'),
 'apply-proposal':()=>{commit(applyProposal(state));closeModal();render();toast('Your new pace is applied. Previous work is preserved.');},
 'discard-proposal':()=>{state.proposal=null;save();closeModal();render();toast('Your current plan is unchanged.');},
 rest:()=>{state.restDay=!state.restDay;save();render();},
 prompt:text=>sendChat(text),
 'restart-chat':()=>{if(busy)return;closeModal();navigate('companion');sendChat('Start over');},
 'preview-draft':()=>openModal('preview-draft'),
 activate:()=>{if(!state.draft)return;commit(activateRoadmap(state,state.draft));view.examplePlan=null;view.chapter=0;closeModal();navigate('roadmap');toast('A new journey begins. Your roadmap is now active.');},
 'start-example':()=>{commit(activateRoadmap(state,view.examplePlan));view.examplePlan=null;view.chapter=0;render();toast('Your detailed roadmap is now active.');},
 'finish-journey':()=>openModal('finish-journey'),
 'confirm-finish':()=>{activeJourney(state).status='completed';save();closeModal();render();toast('Journey completed. Your next adventure is yours to choose.');},
 'delete-memory':id=>{state.memories=state.memories.filter(m=>m.id!==id);save();render();toast('Memory removed from this browser.');},
 reset:()=>openModal('reset'),
 'confirm-reset':()=>{if(busy)return;commit(createInitialState());view={track:'all',search:'',filter:'all',concept:'python-0',chapter:1,view:'graph'};closeModal();navigate('today');toast('Your demo is ready for a fresh adventure.');}
};
document.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(target&&!target.disabled){try{actions[target.dataset.action]?.(target.dataset.id);}catch(err){toast(err.message);}}else if(e.target.classList.contains('modal-backdrop'))closeModal();});
document.addEventListener('keydown',e=>{
  if(!modal)return;if(e.key==='Escape'){closeModal();return;}
  if(e.key==='Tab'){const dialog=document.querySelector('.modal'),controls=[...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select,textarea')];if(!controls.length)return;const first=controls[0],last=controls.at(-1);if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog)){e.preventDefault();last.focus();}else if(!e.shiftKey&&(document.activeElement===last||document.activeElement===dialog)){e.preventDefault();first.focus();}}
});
window.addEventListener('hashchange',()=>{const id=location.hash.slice(1);if(nav.some(([n])=>n===id)&&id!==page){page=id;closeModal();render();window.scrollTo(0,0);}});
function bindForms(){
  const search=document.querySelector('#concept-search');if(search)search.oninput=e=>{const pos=e.target.selectionStart;view.conceptPage=0;view.search=e.target.value;render();const el=document.querySelector('#concept-search');el.focus();try{el.setSelectionRange(pos,pos);}catch{}};
  const filter=document.querySelector('#status-filter');if(filter)filter.onchange=e=>{view.conceptPage=0;view.filter=e.target.value;render();};
  const select=document.querySelector('#journey-select');if(select)select.onchange=e=>{state.activeId=e.target.value;view.examplePlan=null;view.chapter=0;save();render();};
  const template=document.querySelector('#roadmap-template-select');if(template)template.onchange=e=>{view.examplePlan=e.target.value?createRoadmap({trackId:e.target.value,minutes:30}):null;view.chapter=0;render();};
  const chat=document.querySelector('#chat-form');if(chat)chat.onsubmit=e=>{e.preventDefault();sendChat(new FormData(chat).get('message'));};
  const input=document.querySelector('#chat-input');if(input)input.onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();chat.requestSubmit();}};
  document.querySelectorAll('[data-pref]').forEach(el=>el.onchange=()=>{state.preferences[el.dataset.pref]=el.checked;save();toast('Preference saved.');});
  const memory=document.querySelector('#memory-form');if(memory)memory.onsubmit=e=>{e.preventDefault();const text=new FormData(memory).get('memory').trim();if(!text)return;state.memories.push({id:crypto.randomUUID(),text:text.slice(0,240),source:'Added by you · this session'});save();render();toast('A note added to your memory core.');};
}
function bindModalForms(){
  document.querySelectorAll('[data-check]').forEach(el=>el.onchange=()=>{const q=state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id),i=Number(el.dataset.check);q.checks=el.checked?[...new Set([...q.checks,i])]:q.checks.filter(x=>x!==i);save();});
  const notes=document.querySelector('#quest-notes');if(notes)notes.oninput=()=>{(state.quests.find(q=>q.id===modal.id)||view.examplePlan?.chapters.flatMap(c=>c.quests).find(q=>q.id===modal.id)).notes=notes.value;save();};
  const schedule=document.querySelector('#schedule-form');if(schedule)schedule.onsubmit=e=>{e.preventDefault();commit(proposeSchedule(state,Number(new FormData(schedule).get('minutes'))));modal={type:'proposal'};renderModal();};
}
save();render();
````

## File: src/breadth.js
````javascript
const outlines = {
  electronics: `Circuit Foundations;Voltage|Current|Resistance|Ohm's Law;Calculate the resistor needed for a low-voltage LED circuit
Reading Circuits;Schematic Symbols|Series Circuits|Parallel Circuits|Breadboard Rails;Draw and label a battery-powered LED circuit before assembling it
Passive Components;Resistors|Capacitors|Inductors|RC Timing;Compare the charge curves of two simulated RC circuits
Semiconductors;Diodes|LED Polarity|Transistors|MOSFET Switching;Simulate a transistor switching an LED with a current-limiting resistor
Measurement;Multimeter Modes|Continuity|Voltage Measurement|Measurement Uncertainty;Record expected and measured voltages at three circuit points
Signals;Analog Signals|Digital Levels|Pull-up Resistors|Switch Debouncing;Compare a noisy switch trace with its debounced output
Power & Protection;Regulators|Current Budgets|Decoupling|Logic-level Compatibility;Check the voltage and current requirements of a low-voltage prototype
Circuit Notebook;Wiring Diagrams|Component Lists|Fault Isolation|Circuit Documentation;Document a tested low-voltage circuit and one fault you corrected`,
  esp32: `Meet Your Board;ESP32 Variants|Board Pinouts|3.3V Logic|USB Power;Identify your exact board and annotate its usable pins from its documentation
First Firmware;Toolchain Setup|Serial Monitor|Build & Flash|Boot Modes;Flash a board-compatible blink example and save its serial log
GPIO Workshop;Digital Input|Digital Output|Internal Pull-ups|Debouncing;Read a button and control an LED without blocking delays
Analog & Timing;ADC Sampling|PWM Output|Timers|Calibration;Record a potentiometer reading and map it to LED brightness
Peripheral Buses;I2C Devices|SPI Devices|UART Messages|Bus Debugging;Read one compatible sensor and annotate its bus transactions
Connected Device;Wi-Fi Provisioning|HTTP Client|MQTT Client|Reconnect Logic;Publish a mock sensor reading and demonstrate reconnect handling
Audio Extension;I2S Audio|Microphone Input|Speaker Output|Audio Buffers;Trace a board-compatible audio example from microphone to output
ESP32 Project;Task Scheduling|Power Budget|Error Logging|Device Integration;Build a documented sensor monitor with a simulated disconnected-sensor case`,
  sensors: `Sensor Basics;Transducers|Measurement Range|Resolution|Accuracy;Compare two sensor datasheets for a room-monitoring use case
Safe Connections;Supply Voltage|Signal Voltage|Ground Reference|Pin Mapping;Draw the connections for a sensor compatible with a 3.3V controller
Environment;Temperature Sensors|Humidity Sensors|Light Sensors|Sampling Intervals;Collect or simulate room readings and label their units
Motion & Distance;Accelerometers|Gyroscopes|Distance Sensors|Coordinate Frames;Plot a short motion or distance sequence and explain the axes
Signal Quality;Noise Sources|Moving Averages|Outlier Handling|Missing Readings;Compare raw readings with a moving-average filter
Calibration;Reference Measurements|Offset Error|Scale Error|Calibration Records;Fit a simple calibration from reference readings and preserve the raw data
Sensor Fusion;Time Alignment|Thresholds|Hysteresis|Event Detection;Combine two simulated signals into a room-occupancy indicator
Sensor Station;Data Logging|Device Health|Dashboard Charts|Repeatability;Create a sensor report with plots and a repeatability check`,
  iot: `Connected Systems;Devices & Gateways|Telemetry|Commands|System Boundaries;Sketch a room-monitoring system from sensor to dashboard
Network Foundations;IP Addresses|DNS|Wi-Fi Networks|Connection Failures;Trace the route of one telemetry message and mark possible failures
Messaging;MQTT Topics|Publish & Subscribe|QoS Choices|Retained Messages;Design a topic tree for three simulated devices
Web Integration;HTTP Methods|JSON Payloads|API Contracts|Timestamps;Write example request and response payloads for a device API
Device Reliability;Offline Queues|Retries & Backoff|Idempotency|Health Checks;Simulate an outage and explain how queued readings recover
Access & Privacy;Device Identity|TLS Concepts|Secret Storage|Data Minimization;Review a mock device configuration for exposed credentials
Automation Extension;Rules & Triggers|Alert Thresholds|Command Acknowledgment|Manual Override;Design a reversible lighting rule with a manual override
IoT Dashboard;Time-series Data|Fleet Status|Observability|End-to-end Testing;Present a mock device dashboard with healthy and disconnected states`,
  xiaozhi: `Voice Assistant Map;Xiaozhi Architecture|Supported Boards|Firmware Releases|Audio Pipeline;Map the components of a Xiaozhi voice assistant using the project documentation
Hardware Preparation;Board Compatibility|Microphone Interface|Speaker Amplifier|Power Requirements;Create a board-specific parts and wiring checklist from the official examples
Firmware Setup;Prebuilt Firmware|Build Configuration|Flashing Workflow|Serial Diagnostics;Document a board-compatible firmware setup and expected boot messages
Network & Service;Wi-Fi Setup|Device Activation|Service Configuration|Connection Diagnostics;Trace a simulated connection and activation sequence
Conversation Loop;Wake Interaction|Audio Capture|Speech Recognition|Speech Playback;Storyboard a complete voice turn including an interrupted response
Device Tools;MCP Concepts|Tool Schemas|Device Commands|Tool Results;Draft a read-only temperature tool and its example result
Experience Extension;Display States|Button Interaction|Latency Feedback|Privacy Indicators;Design visible listening and speaking states for the assistant
Assistant Showcase;Hardware Checklist|Failure Scenarios|Demo Script|Project Documentation;Present a mock voice assistant walkthrough with one recoverable failure`,
  psychology: `Studying Behavior;Research Questions|Scientific Evidence|Correlation & Causation|Research Ethics;Compare an everyday psychology claim with the evidence needed to test it
Mind & Brain;Neurons|Nervous System|Sensation|Perception;Illustrate how sensation and interpretation differ in an everyday example
Learning;Classical Conditioning|Operant Conditioning|Observational Learning|Reinforcement;Describe three learning examples without making a clinical judgment
Memory & Attention;Working Memory|Long-term Memory|Retrieval Practice|Selective Attention;Compare two study methods using a short personal learning log
Motivation & Emotion;Intrinsic Motivation|Extrinsic Motivation|Emotion Recognition|Emotion Regulation;Reflect on the context and incentives behind one everyday decision
Social Psychology;Social Influence|Attribution|Group Behavior|Perspective Taking;Analyze a fictional group disagreement from two perspectives
Development Extension;Lifespan Development|Individual Differences|Personality Models|Cultural Context;Compare two explanations of a fictional behavior and note their limits
Psychology Portfolio;Evaluating Claims|Study Design|Bias Awareness|Reflective Writing;Write a source-based explanation of a learning habit with limitations`,
  thinking: `Clear Questions;Problem Framing|Definitions|Assumptions|Scope;Rewrite an ambiguous question into a testable one
Arguments;Claims|Premises|Conclusions|Hidden Assumptions;Map the premises and conclusion of a short argument
Evidence;Primary Sources|Source Credibility|Sample Quality|Missing Evidence;Compare two sources supporting the same claim
Reasoning;Deduction|Induction|Abduction|Counterexamples;Construct a counterexample to a broad everyday claim
Uncertainty;Base Rates|Probability Language|Confidence|Updating Beliefs;Revise a prediction after receiving new evidence
Biases;Confirmation Bias|Anchoring|Availability|Selection Bias;Identify a possible bias in a fictional decision
Decisions Extension;Trade-offs|Decision Criteria|Opportunity Cost|Reversibility;Compare three options using explicit decision criteria
Reasoning Portfolio;Steelman Arguments|Fact Checking|Decision Journal|Intellectual Humility;Write a balanced recommendation and what could change your mind`,
  communication: `Communication Basics;Audience|Intent|Context|Feedback;Rewrite a message for two different audiences
Listening;Active Listening|Paraphrasing|Clarifying Questions|Turn Taking;Practice summarizing a fictional speaker before responding
Clear Messages;Plain Language|Message Structure|Concrete Examples|Conciseness;Turn a long explanation into a clear three-part message
Conversations;Open Questions|Nonverbal Cues|Tone|Conversation Repair;Write a respectful way to clarify a misunderstanding
Feedback Skills;Observations|Impact Statements|Actionable Requests|Receiving Feedback;Draft feedback about a specific behavior and a next step
Disagreement;Shared Goals|Boundaries|Negotiation|De-escalation;Role-play a disagreement using a shared goal and clear request
Speaking Extension;Story Structure|Delivery|Visual Aids|Question Handling;Outline a two-minute talk with one supporting example
Communication Portfolio;Meeting Notes|Follow-up Messages|Presentation Practice|Self-review;Record or rehearse a short explanation and note one improvement`,
  english: `English Foundations;Sentence Patterns|Parts of Speech|Core Vocabulary|Pronunciation Awareness;Write and read aloud a short personal introduction
Everyday Grammar;Present Tenses|Past Tenses|Questions|Negation;Describe a usual day and a past event using complete sentences
Vocabulary Building;Collocations|Word Families|Context Clues|Spaced Review;Build a vocabulary set with original example sentences
Listening Skills;Main Ideas|Specific Details|Connected Speech|Note Taking;Summarize a short recording and verify details against its transcript
Reading Skills;Skimming|Scanning|Inference|Reference Words;Annotate the main point and supporting details in a short text
Speaking Skills;Fluency|Intelligibility|Paraphrasing|Conversation Strategies;Give a one-minute explanation and review its clarity
Writing Extension;Paragraph Unity|Linking Ideas|Editing|Register;Write and revise a paragraph for a specific audience
English Portfolio;Integrated Practice|Error Log|Self-recording|Study Planning;Assemble a reading summary and a short spoken response`,
  ielts: `IELTS Orientation;Academic Format|Four Skills|Band Descriptors|Baseline Reflection;Review the official format and list strengths and practice goals
Language Foundations;Academic Vocabulary|Grammar Range|Paraphrasing|Pronunciation Clarity;Rewrite a short paragraph using accurate paraphrases
Listening;Prediction|Distractors|Spelling Accuracy|Listening Notes;Complete an official sample section and classify your errors
Reading;Skimming & Scanning|Matching Headings|True False Not Given|Time Management;Practice two reading question types and explain answer evidence
Writing Task 1;Overview Statements|Chart Comparisons|Processes|Maps;Write an overview and supporting comparisons for a sample chart
Writing Task 2;Task Response|Essay Structure|Supporting Examples|Coherence;Plan and write an argument with a clear position and examples
Speaking Extension;Part 1 Answers|Part 2 Long Turn|Part 3 Discussion|Self-recording;Record a practice long turn and review it against public descriptors
Practice Review;Timed Sections|Error Analysis|Revision Priorities|Practice Schedule;Review a practice set and plan the next week without claiming an official band`,
  badminton: `Court & Equipment;Court Lines|Racket Grip|Ready Position|Warm-up;Identify court areas and rehearse a relaxed ready position
Movement Foundations;Split Step|Chasse Steps|Lunge Balance|Recovery Steps;Practice slow shadow footwork with controlled recovery
Serve & Return;Low Serve|High Serve|Receiving Stance|Return Placement;Record the landing zones of a short comfortable serving practice
Overhead Skills;Contact Point|Clear|Drop Shot|Follow-through;Rehearse an overhead action slowly and compare clear and drop intentions
Front & Midcourt;Net Shot|Lift|Drive|Defensive Block;Plan a cooperative rally alternating a net shot and a lift
Rally Decisions;Base Position|Shot Selection|Opponent Space|Recovery Timing;Annotate three rally decisions from a match clip
Doubles Extension;Attacking Formation|Defending Formation|Partner Communication|Rotation;Draw doubles positions for attack and defense
Practice Journal;Drill Planning|Controlled Repetition|Session Reflection|Progress Tracking;Create a manageable practice session and record placement and consistency`,
  fitness: `Movement Foundations;Activity Preferences|Comfortable Effort|Warm-up|Movement Awareness;Reflect on enjoyable activities and sketch a comfortable starting session
Movement Patterns;Squat Pattern|Hip Hinge|Push Pattern|Pull Pattern;Observe basic movement patterns in a beginner instructional demonstration
Aerobic Activity;Walking|Cycling|Talk Test|Pacing;Record the duration and perceived effort of a comfortable familiar activity
Strength Basics;Bodyweight Exercise|Technique Focus|Rest Between Sets|Gradual Progression;Create a simple practice log emphasizing technique and comfortable effort
Mobility;Range of Motion|Controlled Movement|Balance|Coordination;Note differences between balance and mobility tasks
Recovery;Rest Days|Sleep Routine|Fatigue Awareness|Consistency;Review a weekly activity diary and include recovery time
Sport Extension;Agility Concepts|Footwork Rhythm|Skill Practice|Session Variety;Combine an easy coordination drill with a sport skill practice
Activity Journal;Weekly Planning|Effort Logging|Habit Tracking|Plan Adjustment;Prepare a flexible weekly activity plan and reflect on how it felt`,
  habits: `Understand Habits;Context Cues|Repeated Actions|Immediate Rewards|Habit Loops;Describe the context and outcome of an existing everyday habit
Choose a Direction;Personal Values|Specific Goals|Small Actions|Realistic Scope;Translate a broad learning goal into a small daily action
Design the Environment;Visible Cues|Friction|Preparation|Distraction Control;Make one learning material easier to access and record the change
Start Small;Implementation Intentions|Habit Stacking|Minimum Practice|Starting Rituals;Write a when-and-where plan for a short practice session
Track Thoughtfully;Process Measures|Reflection Notes|Consistency Patterns|Flexible Tracking;Keep a brief practice log focused on actions rather than perfection
Handle Interruptions;Restart Plans|Changing Context|Self-compassion|Obstacle Planning;Write a restart plan for a missed practice day
Motivation Extension;Autonomy|Meaningful Rewards|Social Support|Enjoyment;Compare two ways to make a learning routine more enjoyable
Personal Routine;Weekly Review|Adjusting Goals|Sustainable Pace|Long-term Reflection;Build a flexible weekly routine and review what supported it`
};
const definitions = [
 ['electronics','Electronics','Understand the circuit','settings','#9b653a','https://www.allaboutcircuits.com/textbook/'],
 ['esp32','ESP32','Bring a device to life','code','#427d72','https://docs.espressif.com/projects/esp-idf/en/stable/esp32/get-started/'],
 ['sensors','Sensors & Circuits','Observe the physical world','chart','#47758b','https://learn.adafruit.com/'],
 ['iot','Internet of Things','Connect the physical and digital','tree','#4b735a','https://docs.espressif.com/projects/esp-idf/en/stable/esp32/'],
 ['xiaozhi','Xiaozhi Assistant','Give your device a voice','spark','#a75f47','https://github.com/78/xiaozhi-esp32'],
 ['psychology','Psychology','Explore mind and behavior','book','#906886','https://openstax.org/details/books/psychology-2e'],
 ['thinking','Critical Thinking','Ask better questions','compass','#567694','https://plato.stanford.edu/entries/critical-thinking/'],
 ['communication','Communication','Build shared understanding','book','#b17851','https://open.lib.umn.edu/communication/'],
 ['english','English','Discover another language','book','#65815e','https://learnenglish.britishcouncil.org/'],
 ['ielts','IELTS Academic','Practice with a purpose','flag','#a95750','https://ielts.org/take-a-test/preparation-resources'],
 ['badminton','Badminton','Move with intention','compass','#46827d','https://shuttletime.bwfbadminton.com/'],
 ['fitness','Physical Fitness','Build a rhythm of movement','leaf','#718951','https://www.cdc.gov/physical-activity-basics/'],
 ['habits','Habits & Motivation','Make room for small victories','flame','#a47c39','https://www.apa.org/topics/behavioral-health/healthy-habits']
];
export const BREADTH_TRACKS=definitions.map(([id,name,subtitle,icon,color,resource])=>({id,name,subtitle,icon,color,resource,goal:`Explore ${name}`,rank:'Explorer',description:subtitle,project:`Create your ${name} portfolio`,practice:`Record a practical observation about ${name}.`,explanation:`Explore ${name} through small activities, credible resources, and a reflective practice journal.`,modules:outlines[id].split('\n').map(row=>{const [title,topics,practice]=row.split(';');return {title,topics:topics.split('|'),practice:practice+'.',summary:`Explore ${topics.split('|').join(', ')}. ${practice}.`};})}));
export const CROSS_LINKS=[['python','ai'],['java','oop'],['js','iot'],['dsa','ai'],['ai','rag'],['electronics','esp32'],['esp32','sensors'],['sensors','iot'],['esp32','xiaozhi'],['xiaozhi','ai'],['psychology','habits'],['thinking','psychology'],['communication','english'],['english','ielts'],['badminton','fitness'],['habits','fitness']];
````

## File: src/companion.js
````javascript
import {TRACKS,trackById} from './data.js';
import {icon,esc,btn,badge,sectionHead} from './ui.js';
export function draftCard(plan){return `<section class="draft-card"><div class="eyebrow red-text">${icon('compass')} A NEW ADVENTURE, WAITING FOR YOUR SEAL</div><h2>${esc(plan.title)}</h2><div class="meta">${badge(trackById(plan.trackId).name,'gold')}<span>${icon('clock')}${plan.minutes} min/day</span><span>${plan.days} estimated study days</span><span>${plan.experience==='beginner'?'Beginner friendly':'Build on the basics'}</span></div><div class="mini-roadmap">${plan.chapters.map((c,i)=>`<div><span>${i+1}</span><strong>${esc(c.title)}</strong><small>${esc(c.lane||'Study')} · ${c.topics?.length||0} concepts</small></div>`).join('')}</div><div class="button-row">${btn('Start this journey','activate',{icon:'flag',primary:true})}${btn('Inspect roadmap','preview-draft',{icon:'search'})}${btn('Start over','restart-chat',{class:'text-button'})}</div><p class="small-copy">Template-based demo · Your existing journeys and XP are preserved.</p></section>`;}
export function companionPage(s,busy=false){
  const stage=s.builder.stage;
  const prompts=stage==='experience'?['I am a beginner','I know the basics']:stage==='time'?['15 minutes a day','30 minutes a day','60 minutes a day']:['I want to learn Java','Prepare for coding interviews','Master OOP fundamentals','Learn Python','Learn JavaScript','Learn AI and machine learning','Build a PDF chatbot','Learn ESP32','Explore Xiaozhi','Practice IELTS','Learn badminton','Explore psychology'];
  return `${sectionHead('ARCANA / YOUR COMPANION IN CURIOSITY','A conversation. A new chapter.','Tell Arcana what you want to learn. Shape a journey around your life.',badge('Simulated companion','sample'))}
  <div class="chat-layout"><section class="paper chat-panel"><div class="chat-topline"><span class="companion-avatar">${icon('spark')}</span><div><strong>Arcana</strong><small>Your guide through the grand archives</small></div><span class="chat-online"><i></i> Ready to explore</span><button class="icon-button" data-action="restart-chat" aria-label="Start a new roadmap conversation">${icon('plus')}</button></div>
  <div class="chat-transcript" id="chat-transcript" role="log" aria-label="Conversation with Arcana" aria-live="polite">${s.messages.map((m,i)=>`<div class="message ${m.role}"><div class="message-by">${m.role==='assistant'?`${icon('spark')} Arcana`:'Minh'}<span>${m.role==='assistant'?'Demo response':'You'}</span></div><div class="message-bubble">${esc(m.text).replace(/\n/g,'<br>')}${m.kind==='draft'&&s.draft&&i===s.messages.map(x=>x.kind).lastIndexOf('draft')?draftCard(s.draft):''}${m.kind==='proposal'&&s.proposal?`<div class="inline-proposal"><strong>${s.proposal.previous} → ${s.proposal.minutes} minutes / day</strong><p>A proposed change. You decide when it takes effect.</p>${btn('Review changes','proposal',{primary:true,icon:'arrow'})}</div>`:''}</div></div>`).join('')}${busy?'<div class="typing" role="status">Arcana is opening a new page <span>•••</span></div>':''}</div>
  <div class="chat-input-area"><div class="prompt-label">${icon('spark')} A LITTLE INSPIRATION</div><div class="prompt-chips">${prompts.map(p=>`<button data-action="prompt" data-id="${esc(p)}" ${busy?'disabled':''}>${esc(p)}</button>`).join('')}</div><form id="chat-form"><label class="sr-only" for="chat-input">Message Arcana</label><textarea id="chat-input" name="message" placeholder="Tell Arcana what you would like to learn…" rows="2" maxlength="1600" required ${busy?'disabled':''}></textarea><div class="composer-bottom"><small>Enter to send · Shift + Enter for a new line</small><button type="submit" class="btn primary" ${busy?'disabled':''}>${icon('send')} Send message</button></div></form><p class="chat-disclaimer">Prepared scenarios · No live AI · Your roadmap starts only when you confirm.</p></div></section>
  <aside class="chat-aside"><section class="paper companion-profile"><div class="companion-illustration"><img src="/assets/library.png" alt="Arcana, your friendly book companion"></div><div class="eyebrow">A GUIDE, NOT A GATEKEEPER</div><h2>One step at a time.</h2><p>Big ambitions begin with small, thoughtful plans. Let's find your starting point.</p><ol class="builder-steps">${['Choose your destination','Share your starting point','Find your daily rhythm','Review & begin'].map((x,i)=>`<li class="${i===({goal:0,experience:1,time:2,ready:3}[stage]||0)?'current':''}"><span>${i+1}</span>${x}</li>`).join('')}</ol></section><section class="paper chat-topics"><div class="eyebrow">EXPLORE ALL ${TRACKS.length} ARTS</div>${TRACKS.map(t=>`<button data-action="start-track" data-id="${t.id}" ${busy?'disabled':''}><span style="color:${t.color}">${icon(t.icon)}</span>${esc(t.name)}${icon('chevron')}</button>`).join('')}</section><div class="margin-note">${icon('shield')} You set the pace. No exams, no lost ranks, and no pressure to keep a streak.</div></aside></div>`;
}
````

## File: src/curriculum.js
````javascript
const module=(title,topics,practice)=>({title,topics:topics.split('|'),practice,summary:`Understand ${topics.split('|').join(', ')}. ${practice}`});
export const CURRICULA={
  python:[
    module('Python Essentials','Interpreter & REPL|Variables & Types|Operators & Expressions|Strings & Formatting','Build a unit converter that validates input and formats its output.'),
    module('Control Flow','Boolean Logic|Conditionals|For & While Loops|Range & Iteration','Create a guessing-game loop with bounded attempts and useful feedback.'),
    module('Functions & Scope','Parameters & Return Values|Default & Keyword Arguments|Scope & Closures|Recursion','Refactor a receipt calculator into small functions and explain each input and output.'),
    module('Collections & Data','Lists & Tuples|Dictionaries & Sets|Comprehensions|Sorting & Key Functions','Summarize study sessions by subject, remove duplicates, and sort the results.'),
    module('Files & Reliability','Pathlib & File IO|CSV & JSON|Exceptions|Context Managers','Import a CSV habit log, handle malformed rows, and export a JSON summary.'),
    module('Objects & Iteration','Classes & Objects|Dataclasses|Iterators & Generators|Decorators','Model a reading list with dataclasses and stream its entries through a generator.'),
    module('Project Tooling','Modules & Packages|Virtual Environments|Type Hints|Unit Testing','Package a small utility in a virtual environment and test its boundary cases.'),
    module('Applied Python Project','HTTP Requests|Async IO Basics|Logging & Debugging|CLI Applications','Build a command-line habit tracker with persistence, tests, logging, and a README.')
  ],
  java:[
    module('The Java Platform','JDK & JVM|Compilation & Bytecode|Packages & Imports|IDE & Debugger','Compile a small command-line program and inspect a breakpoint in the debugger.'),
    module('Language Foundations','Primitive Types|Operators & Casting|Control Flow|Methods & Overloading','Build a grade-summary utility with methods, branching, and validated numeric input.'),
    module('Strings, Arrays & Values','Strings & StringBuilder|Arrays & Varargs|Pass by Value|Equality & Hash Codes','Compare strings and objects correctly, then implement a text-frequency report.'),
    module('Classes & Object Design','Classes & Objects|Constructors & Initialization|Access Modifiers|Static & Final','Model books and readers with constructors, access control, and explicit invariants.'),
    module('Abstraction & Polymorphism','Inheritance|Interfaces & Abstract Classes|Composition|Records & Enums','Design a lending policy interface with two implementations and a composed library service.'),
    module('Generics & Collections','Generic Types & Bounds|List, Set & Map|Iterators & Comparable|Collection Trade-offs','Choose collections for a lending catalog and implement type-safe search and sorting.'),
    module('Exceptions & File IO','Checked & Unchecked Exceptions|Try-with-resources|NIO Files & Paths|Serialization Boundaries','Save and load a catalog while handling missing files and invalid records.'),
    module('Functional Java','Lambda Expressions|Functional Interfaces|Stream Pipelines|Optional','Use streams to group overdue loans without hiding errors behind empty Optional values.'),
    module('Concurrency & the JVM','Threads & Executors|Synchronization|CompletableFuture|Memory & Garbage Collection','Compare sequential and concurrent mock lookups and explain a shared-state race.'),
    module('Build, Test & Ship','Maven & Gradle|JUnit & Test Design|JDBC & Prepared Statements|Application Architecture','Deliver a tested library application with a database boundary and reproducible build.')
  ],
  dsa:[
    module('Reasoning About Algorithms','Big O Time|Space Complexity|Loop Invariants|Amortized Analysis','Compare two duplicate-detection algorithms with hand-traced inputs and memory costs.'),
    module('Arrays & Strings','Dynamic Arrays|Two Pointers|Sliding Window|Prefix Sums','Find the longest valid subarray and explain when to use a window or prefix sums.'),
    module('Hash-based Structures','Hash Maps|Hash Sets|Collisions & Load Factor|Frequency Counting','Build an anagram grouper and discuss collision handling and expected lookup cost.'),
    module('Linear Structures','Singly Linked Lists|Doubly Linked Lists|Stacks|Queues & Deques','Implement undo history and a task queue, including empty-structure edge cases.'),
    module('Recursion & Search Spaces','Recursive State|Call Stack|Backtracking|Pruning','Generate valid bracket sequences and show how pruning removes invalid branches.'),
    module('Sorting & Searching','Binary Search|Merge Sort|Quick Sort|Stable Sorting','Compare sorting choices and implement binary search with an explicit boundary invariant.'),
    module('Trees & Hierarchies','Binary Trees|Binary Search Trees|Tree Traversals|Tries','Build a word-prefix search and compare a trie with a sorted collection.'),
    module('Heaps & Greedy Choices','Binary Heaps|Priority Queues|Greedy Algorithms|Interval Scheduling','Schedule non-overlapping meetings and use a priority queue to track pending work.'),
    module('Graphs & Connectivity','Graph Representations|BFS & DFS|Topological Sort|Dijkstra & Union-Find','Model course prerequisites, detect cycles, and explain when shortest-path weights matter.'),
    module('Dynamic Programming & Practice','Memoization|Tabulation|Knapsack & Sequence DP|Problem-solving Patterns','Solve a small optimization problem twice and compare states, transitions, and complexity.')
  ],
  oop:[
    module('Objects & Responsibilities','Classes & Objects|State & Behavior|Object Identity|Responsibility Assignment','Model a game inventory and assign each operation to one clear owner.'),
    module('Encapsulation & Invariants','Access Control|Data Hiding|Class Invariants|Immutable Objects','Protect inventory capacity and item quantities through a small public interface.'),
    module('Contracts & Abstraction','Interfaces|Abstract Classes|Preconditions & Postconditions|Dependency Boundaries','Define an equipment contract and document valid inputs and promised outcomes.'),
    module('Inheritance & Polymorphism','Inheritance|Method Overriding|Dynamic Dispatch|Liskov Substitution','Implement interchangeable item effects and inspect a subtype that violates its contract.'),
    module('Composition & Collaboration','Composition|Aggregation|Delegation|Dependency Injection','Replace a character inheritance hierarchy with composed movement and attack behaviors.'),
    module('Design Principles','Single Responsibility|Open-Closed Principle|Interface Segregation|Dependency Inversion','Refactor an overloaded inventory manager into focused, testable collaborators.'),
    module('Practical Design Patterns','Strategy Pattern|Factory Pattern|Observer Pattern|Adapter Pattern','Use a strategy for item effects and an observer for inventory notifications.'),
    module('Refactoring & Design Review','Coupling & Cohesion|Tell, Do Not Ask|Testing Collaborations|Refactoring Safely','Deliver a role-playing inventory with tests and a diagram explaining design trade-offs.')
  ],
  js:[
    module('JavaScript Essentials','JavaScript Runtime|Let, Const & Scope|Primitive Types|Operators & Coercion','Build a unit converter and compare explicit conversion with implicit coercion.'),
    module('Logic & Functions','Conditionals & Loops|Function Declarations|Arrow Functions|Parameters & Return Values','Split a shopping-cart calculator into pure functions with clear inputs.'),
    module('Arrays & Objects','Array Methods|Objects & Property Access|Destructuring|Spread & Rest','Filter, group, and transform a reading list without mutating the source data.'),
    module('The Language Underneath','Closures|This & Binding|Prototypes|Classes','Create a counter with a closure and compare it with a class-based implementation.'),
    module('Browser Interaction','DOM Selection|DOM Updates|Events & Delegation|Forms & Validation','Build an accessible task form with validation, event delegation, and safe text rendering.'),
    module('Asynchronous JavaScript','Event Loop|Promises|Async & Await|Error Propagation','Trace the order of synchronous code, microtasks, and timers, then handle a rejected promise.'),
    module('Working with APIs','Fetch & HTTP|JSON & Response Validation|AbortController|Loading & Error States','Build a search interface that cancels stale requests and displays retryable errors.'),
    module('Modules & Tooling','ES Modules|npm & Package Scripts|Bundling Concepts|Linting & Formatting','Organize a browser project into modules and document a reproducible development workflow.'),
    module('Reliable Frontend Code','Unit Tests|Browser Testing|Local Storage|Web Security Basics','Persist task data, recover corrupt saves, and test that user text is rendered safely.'),
    module('Ship a Browser Application','State Management|Component Boundaries|Performance & Accessibility|Deployment Basics','Deliver a task dashboard with an API view, keyboard access, tests, and a demo walkthrough.')
  ],
  ai:[
    module('AI & Learning Foundations','AI vs ML vs Deep Learning|Supervised Learning|Unsupervised Learning|Problem Formulation','Turn three product ideas into well-defined inputs, outputs, and learning objectives.'),
    module('Mathematics for Models','Vectors & Matrices|Probability|Statistics & Distributions|Derivatives & Gradients','Compute a small prediction by hand and explain what a gradient update changes.'),
    module('Data Preparation','Data Cleaning|Feature Engineering|Train-Validation-Test Splits|Data Leakage','Prepare a small tabular dataset with a split that prevents future information leaking into training.'),
    module('Classical Machine Learning','Linear Regression|Logistic Regression|Decision Trees|Clustering','Compare a simple baseline and a tree model on the same held-out examples.'),
    module('Evaluation & Generalization','Overfitting & Regularization|Cross-validation|Precision & Recall|Bias & Fairness','Choose metrics for an imbalanced classification task and inspect subgroup errors.'),
    module('Neural Networks','Perceptrons & Layers|Activation Functions|Backpropagation|Optimization & Learning Rates','Trace a tiny network and compare training curves under two learning rates.'),
    module('Language Models','Tokenization|Attention & Transformers|Pretraining & Adaptation|Prompting & Context','Compare prompts on a fixed set of examples and record unsupported or inconsistent answers.'),
    module('Responsible AI Applications','Model Serving|Monitoring & Drift|Privacy & Safety|Human Review','Prototype a small prediction service with a model card, error cases, and a human fallback.')
  ],
  rag:[
    module('RAG Foundations','RAG Architecture|LLM Context Windows|Knowledge Sources|Grounding & Limitations','Sketch a document question-answering system and separate retrieval errors from generation errors.'),
    module('Document Ingestion','PDF & HTML Parsing|Text Cleaning|Metadata & Document IDs|Incremental Ingestion','Turn a small document collection into clean records with stable IDs and source metadata.'),
    module('Chunking Strategies','Fixed-size Chunking|Recursive Chunking|Semantic Boundaries|Overlap & Chunk Metadata','Compare two chunk sizes on the same document and record where useful context is lost.'),
    module('Embeddings & Vector Space','Embeddings|Cosine Similarity|Embedding Model Selection|Batching & Caching','Embed five text passages and explain why the nearest passage may still be unhelpful.'),
    module('Indexing & Search','Vector Indexes|Approximate Nearest Neighbors|Metadata Filters|BM25 & Sparse Search','Index a small corpus and compare vector search with keyword retrieval on exact names.'),
    module('Retrieval Quality','Top-k Selection|Hybrid Retrieval|Query Rewriting|Reranking','Build a fixed query set and compare retrieved passages before and after reranking.'),
    module('Grounded Generation','Context Assembly|Prompt Templates|Citations|Abstention & Missing Evidence','Generate answers with source excerpts and decline questions unsupported by the corpus.'),
    module('Evaluate & Operate','Retrieval Metrics|Faithfulness Evaluation|Latency & Cost|Prompt Injection & Access Control','Deliver a PDF chatbot prototype with retrieval checks, failure examples, and document-access boundaries.')
  ]
};
````

## File: src/data.js
````javascript
import {CURRICULA} from './curriculum.js';
import {BREADTH_TRACKS} from './breadth.js';
export const TRACKS = [
  {id:'python', name:'Python', subtitle:'The language of possibility', icon:'code', color:'#3f6b45', goal:'Build your Python foundations', rank:'Practitioner', description:'Turn ideas into scripts. Learn the language, work with data, and build a useful little tool.', resource:'https://docs.python.org/3/tutorial/', concepts:['Variables & Types','Control Flow','Functions','Collections','File Handling','Python Projects'], chapters:['The First Incantation','Logic & Control Flow','Functions & Collections','Build a Personal Tool'], project:'Build a command-line habit tracker', practice:'Transform a list of daily habits into a progress summary', explanation:'A Python function packages a small, reusable action. Try a function that receives a list of study sessions and returns their total minutes.'},
  {id:'dsa', name:'Data Structures', subtitle:'Order within complexity', icon:'tree', color:'#385e79', goal:'Prepare for coding interviews', rank:'Explorer', description:'Discover how data is organized, learn to reason about trade-offs, and practice problem solving.', resource:'https://opendsa-server.cs.vt.edu/ODSA/Books/Everything/html/index.html', concepts:['Arrays & Lists','Stacks & Queues','Linked Lists','Trees & Graphs','Sorting & Searching','Complexity'], chapters:['Structures of Thought','Stacks, Queues & Links','Trees & Search Paths','Patterns & Trade-offs'], project:'Build a searchable book collection', practice:'Compare a stack and a queue with a browser-history example', explanation:'A stack removes the most recently added item first; a queue removes the oldest first. Think of undo history versus a line of print jobs.'},
  {id:'java', name:'Java', subtitle:'Craft with structure', icon:'coffee', color:'#a4472e', goal:'Learn Java from scratch', rank:'Initiate', description:'From your first class to collections and streams, build a strong foundation in the Java ecosystem.', resource:'https://dev.java/learn/', concepts:['Java Essentials','Classes & Objects','Collections','Exceptions','Streams','Java Projects'], chapters:['Welcome to the JVM','Objects & Responsibilities','Collections & Exceptions','A Small Java Application'], project:'Build a library lending application', practice:'Model a book and a reader as Java classes', explanation:'A Java class describes the state and behavior of an object. A Book might hold a title and availability, while borrow() changes its availability.'},
  {id:'oop', name:'Object-Oriented Design', subtitle:'Give your ideas a shape', icon:'layers', color:'#795286', goal:'Master OOP fundamentals', rank:'Apprentice', description:'Design objects with clear responsibilities and explore how they collaborate in a maintainable program.', resource:'https://dev.java/learn/classes-objects/', concepts:['Classes & Objects','Encapsulation','Inheritance','Polymorphism','Composition','Design Principles'], chapters:['Objects in the World','Boundaries & Encapsulation','Many Forms, One Contract','Compose a Better Design'], project:'Design a small role-playing inventory', practice:'Compare inheritance and composition for a game character', explanation:'Composition gives an object collaborators instead of a deep family tree. A character can have a weapon and a movement strategy without inheriting every possible combination.'},
  {id:'rag', name:'RAG & AI', subtitle:'Connect knowledge to answers', icon:'spark', color:'#96711d', goal:'Build a document Q&A chatbot', rank:'Apprentice', description:'Connect language models to your own documents, from text preparation to thoughtful answer evaluation.', resource:'https://www.sbert.net/docs/quickstart.html', concepts:['Text Chunking','Embeddings','Vector Search','Retrieval','Grounded Answers','Evaluation'], chapters:['Foundations & Documents','Embeddings & Vector Space','Retrieval & Context','Bring Your Chatbot to Life'], project:'Build a PDF question-answering prototype', practice:'Experiment with embeddings on five text samples', explanation:'Embeddings represent text as vectors. Related passages often sit closer together. Similarity helps retrieve useful context, but it does not guarantee that a generated answer is correct.'}
];
TRACKS.push(
  {id:'js',name:'JavaScript',subtitle:'Bring the web to life',icon:'code',color:'#a38119',goal:'Learn JavaScript from scratch',rank:'Initiate',description:'From language foundations to asynchronous browser applications.',resource:'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',project:'Build an interactive task dashboard',practice:'Build a browser interaction with clear state and error handling.',explanation:'JavaScript closures retain access to variables from their enclosing scope. Promises represent asynchronous outcomes; await pauses an async function while the event loop can continue other work.'},
  {id:'ai',name:'AI Fundamentals',subtitle:'Learn how models learn',icon:'spark',color:'#526a89',goal:'Learn AI and machine learning',rank:'Explorer',description:'Understand data, models, evaluation, neural networks, and responsible AI applications.',resource:'https://developers.google.com/machine-learning/crash-course',project:'Build a small prediction service',practice:'Compare a simple baseline with a trained model on held-out data.',explanation:'Machine learning fits patterns from data. Use separate training and evaluation examples, check for leakage, and compare with a simple baseline before adding model complexity.'}
);
TRACKS.push(...BREADTH_TRACKS);
for(const track of TRACKS){track.modules=CURRICULA[track.id]||track.modules;track.chapters=track.modules.map(m=>m.title);track.concepts=[...new Set(track.modules.flatMap(m=>m.topics))];}
TRACKS.find(t=>t.id==='rag').name='RAG Engineering';
TRACKS.find(t=>t.id==='dsa').name='DSA';
export const trackById = id => TRACKS.find(t=>t.id===id);
export const STATUSES = {
  applying:{label:'Applying',short:'Applying',color:'#3f6b45'},
  understanding:{label:'Signs of understanding',short:'Understanding',color:'#385e79'},
  self:{label:'Self-reported',short:'Self-reported',color:'#96711d'},
  exploring:{label:'Exploring',short:'Exploring',color:'#795286'},
  unobserved:{label:'Not yet observed',short:'Unobserved',color:'#8a8270'}
};
export const CONCEPTS = TRACKS.flatMap((t,ti)=>t.concepts.map((name,i)=>({
  id:`${t.id}-${i}`,trackId:t.id,name,
  status:ti===0 ? (['applying','understanding','applying','understanding','self','exploring'][i]||'unobserved') : (['understanding','self','exploring'][i]||'unobserved'),
  chapter:t.modules.findIndex(m=>m.topics.includes(name)),
  scope:`${name} · ${t.modules.find(m=>m.topics.includes(name)).summary}`,
  evidence:i<3 ? [{date:'Sep 24, 2026',text: t.id==='rag' ? 'I would compare passages with similar meaning, then inspect the retrieved text before trusting the answer.' : `When working with ${name.toLowerCase()}, I start with a small example and compare what changes when the input changes.`, reason:'Illustrative conversation excerpt. This fixture is not an assessment of the current viewer.'},{date:'Sep 22, 2026',text:`I used ${name.toLowerCase()} in a small ${t.name} exercise and explained my choice using a different example.`,reason:'Second illustrative session; limited to the stated concept.'}] : []
})));
export const INITIAL_MESSAGES = [{role:'assistant',text:'Welcome back, Minh. Every great journey begins with a little curiosity. Tell me what you want to learn, and we will turn it into a roadmap together.',kind:'welcome'}];
export function questContent(trackId,topic,type='Practice') {
  const t=trackById(trackId);
  return {description:type==='Learn' ? `Explore ${topic.toLowerCase()} with a short reading and a concrete example. Focus on the ideas you can explain in your own words.` : `Put ${topic.toLowerCase()} into practice. Work through a small example, notice what changes, and record one useful insight.`, steps:[`Read the introduction to ${topic.toLowerCase()}`,`Try a small ${t.name} example of your own`,'Write down one observation or question','Reflect on where this could be useful'],prompt:t.practice,resource:t.resource};
}
````

## File: src/graph.js
````javascript
import {TRACKS,trackById,STATUSES} from './data.js';
import {esc,icon} from './ui.js';
import {CROSS_LINKS} from './breadth.js';
import {chapterPath} from './pathways.js';
function edge(x1,y1,x2,y2,color,dashed=false){return `<path d="M${x1} ${y1} C${x1} ${(y1+y2)/2},${x2} ${(y1+y2)/2},${x2} ${y2}" stroke="${color}" stroke-width="2.4" fill="none" ${dashed?'stroke-dasharray="6 7"':''}/>`;}
function node({x,y,id,title,subtitle,symbol,color,selected=false,action='concept',kind=''}){return `<button class="graph-node ${selected?'selected':''} ${kind}" data-action="${action}" data-id="${esc(id)}" style="left:${x}px;top:${y}px;--node-color:${color}" aria-label="${esc(title)}${subtitle?`: ${esc(subtitle)}`:''}"><span class="node-orb">${icon(symbol)}<span class="orb-spark">✦</span></span><strong>${esc(title)}</strong><span class="node-caption">${esc(subtitle||'')}</span></button>`;}
export function knowledgeGraph(concepts,{track='all',search='',filter='all',selected='',page=0}){
  let edges='',nodes='';const matches=concepts.filter(c=>(track==='all'||c.trackId===track)&&(filter==='all'||c.status===filter)&&c.name.toLowerCase().includes(search.toLowerCase()));
  if(!matches.length)return '<div class="empty-state"><h3>No concepts found</h3><p>Try another search or clear your filters.</p></div>';
  if(track==='all'&&!search&&filter==='all'){
    const positions=new Map();
    TRACKS.forEach((t,i)=>{
      const a=-Math.PI/2+i*2*Math.PI/TRACKS.length,x=1200+850*Math.cos(a),y=1020+680*Math.sin(a);positions.set(t.id,[x,y]);
      edges+=edge(1200,1050,x,y+40,t.color);
      nodes+=node({x,y,id:t.id,title:t.name,subtitle:t.concepts.length+' concepts',symbol:t.icon,color:t.color,action:'branch',kind:'branch-node atlas-branch'});
      concepts.filter(c=>c.trackId===t.id).slice(0,3).forEach((c,k)=>{
        const b=a+(k-1)*.085,lx=1200+1090*Math.cos(b),ly=1020+900*Math.sin(b);
        edges+=edge(x,y+40,lx,ly+40,t.color,true);
        nodes+=node({x:lx,y:ly,id:c.id,title:c.name,subtitle:'Explore concept',symbol:'leaf',color:t.color,selected:selected===c.id,kind:'atlas-leaf'});
      });
    });
    for(const [from,to] of CROSS_LINKS){const a=positions.get(from),b=positions.get(to);if(a&&b)edges+='<g class="cross-link">'+edge(a[0],a[1]+40,b[0],b[1]+40,'#735982',true)+'</g>';}
    nodes+=node({x:1200,y:990,id:'all',title:'MY KNOWLEDGE',subtitle:TRACKS.length+' branches · A world to discover',symbol:'tree',color:'#96711d',action:'branch',kind:'root-node atlas-core'});
    return canvas(edges,nodes,2100,2400,'atlas');
  }else if(track!=='all'&&!search&&filter==='all'){
    const t=trackById(track);
    t.modules.forEach((m,i)=>{const x=500+(i%2)*1000,y=180+Math.floor(i/2)*390;
      edges+=edge(1000,90,x,y,'#b7a77e',true);
      nodes+=`<div class="module-map-label" style="left:${x}px;top:${y}px">${esc(m.title)}</div>`;
      m.topics.forEach((topic,k)=>{const c=matches.find(c=>c.name===topic),cx=x+(k%2===0?-210:210),cy=y+65+Math.floor(k/2)*145;if(!c)return;
        edges+=edge(x,y+20,cx,cy+30,t.color);
        nodes+=node({x:cx,y:cy,id:c.id,title:c.name,subtitle:STATUSES[c.status].short,symbol:t.icon,color:STATUSES[c.status].color,selected:selected===c.id});
      });
    });
    nodes+=node({x:1000,y:10,id:'all',title:t.name,subtitle:'Return to all 20 branches',symbol:'tree',color:t.color,action:'branch',kind:'root-node'});
    return canvas(edges,nodes,Math.ceil(t.modules.length/2)*390+190,2000,'domain-atlas');
  }else{
    const pageStart=Math.min(page,Math.floor((matches.length-1)/6))*6;
    matches.slice(pageStart,pageStart+6).forEach((c,i)=>{const x=i%2===0?260:740,y=60+Math.floor(i/2)*185;if(i>=2)edges+=edge(x,y-110,x,y+20,STATUSES[c.status].color,true);nodes+=node({x,y,id:c.id,title:c.name,subtitle:STATUSES[c.status].short,symbol:trackById(c.trackId).icon,color:STATUSES[c.status].color,selected:selected===c.id});});
    nodes+=node({x:500,y:625,id:'all',title:track==='all'?'SEARCH RESULTS':trackById(track).name.toUpperCase(),subtitle:'Back to all branches',symbol:'tree',color:'#96711d',action:'branch',kind:'root-node'});
  }
  return canvas(edges,nodes,780);
}
function canvas(edges,nodes,height,width=1000,kind=''){return '<div class="graph-viewport '+kind+'" tabindex="0" aria-label="Interactive knowledge map. Drag empty space to pan. Use zoom controls or select a node."><div class="graph-plane" style="width:'+width+'px;height:'+height+'px"><svg class="graph-lines" width="'+width+'" height="'+height+'" aria-hidden="true"><circle cx="'+width/2+'" cy="'+height/2+'" r="'+height*.35+'" class="orbit"/><circle cx="'+width/2+'" cy="'+height/2+'" r="'+height*.24+'" class="orbit"/>'+edges+'</svg>'+nodes+'<span class="map-corner north">N<br>✧</span><span class="map-watermark">THE GRAND ARCHIVES · LIFEOS</span></div><div class="map-hint">'+icon('compass')+' Drag to explore · Zoom for details · Select a sigil</div></div>';}
export function roadmapGraph(journey,quests,selected=0){
  let edges='',nodes='';const chapters=journey.chapters.map((c,i)=>({...chapterPath(i,journey.chapters.length),...c})),depths=[];
  chapters.forEach((c,i)=>depths[i]=c.requires.length?1+Math.max(...c.requires.map(p=>depths[p])):0);
  const coords=chapters.map((c,i)=>{const peers=chapters.map((_,n)=>n).filter(n=>depths[n]===depths[i]);return [600+(peers.indexOf(i)-(peers.length-1)/2)*480,60+depths[i]*220];});
  chapters.forEach((c,i)=>{const [x,y]=coords[i],qs=quests.filter(q=>q.chapter===i),done=qs.filter(q=>q.status==='completed').length,color=qs.length&&done===qs.length?'#3f6b45':i===selected?'#b23a1f':c.optional?'#795286':'#96711d';
    c.requires.forEach(p=>edges+=edge(coords[p][0],coords[p][1]+65,x,y+30,c.optional?'#795286':'#9a865c',c.optional));
    nodes+=node({x,y,id:String(i),title:c.title,subtitle:`${c.lane} · ${done}/${qs.length} complete`,symbol:done===qs.length?'check':c.optional?'spark':'flag',color,selected:i===selected,action:'chapter',kind:'roadmap-node branching-node'});
    nodes+=`<div class="graph-topic-label" style="left:${x}px;top:${y+140}px">${esc(c.topics.slice(0,2).join(' · '))}</div>`;
  });
  return canvas(edges,nodes,Math.max(...depths)*220+280,1200,'roadmap-atlas');
}
export function bindGraph(container){
  const viewport=container.querySelector('.graph-viewport'),plane=container.querySelector('.graph-plane');if(!viewport||!plane)return;
  let scale=1,x=0,y=0,drag=null;
  const width=parseFloat(plane.style.width);
  const draw=()=>{plane.style.transform=`translate(${x}px,${y}px) scale(${scale})`;viewport.classList.toggle('zoom-detail',scale>=.55);};
  const fit=()=>{scale=Math.min(viewport.clientWidth/width,(viewport.clientHeight-30)/parseFloat(plane.style.height),1);x=(viewport.clientWidth-width*scale)/2;y=10;draw();};fit();
  const resize=new ResizeObserver(()=>fit());resize.observe(viewport);
  container.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{if(b.dataset.zoom==='fit'){fit();return;}const old=scale;scale=Math.min(1.8,Math.max(.35,scale+(b.dataset.zoom==='in'?.15:-.15)));const cx=viewport.clientWidth/2,cy=viewport.clientHeight/2;x=cx-(cx-x)*scale/old;y=cy-(cy-y)*scale/old;draw();});
  viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={sx:e.clientX,sy:e.clientY,x,y};viewport.setPointerCapture(e.pointerId);viewport.classList.add('dragging');});
  viewport.addEventListener('pointermove',e=>{if(!drag)return;x=drag.x+e.clientX-drag.sx;y=drag.y+e.clientY-drag.sy;draw();});
  const end=()=>{drag=null;viewport.classList.remove('dragging');};viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);
  viewport.addEventListener('keydown',e=>{if(e.target!==viewport)return;const d={ArrowLeft:[30,0],ArrowRight:[-30,0],ArrowUp:[0,30],ArrowDown:[0,-30]}[e.key];if(d){e.preventDefault();x+=d[0];y+=d[1];draw();}});
  return ()=>resize.disconnect();
}
````

## File: src/pages.js
````javascript
import {TRACKS,trackById,STATUSES} from './data.js';
import {activeJourney,levelFor} from './state.js';
import {icon,esc,btn,badge,sectionHead,progress} from './ui.js';
import {knowledgeGraph,roadmapGraph} from './graph.js';
export function questCard(q){return `<article class="quest-card ${q.status}"><div class="quest-rune">${icon(q.status==='completed'?'check':q.type==='Learn'?'book':'code')}</div><div class="quest-copy"><div class="meta">${badge(q.type,q.type==='Practice'?'red':'')}${badge(`Rank ${q.difficulty}`,'gold')}<span>${icon('clock')}${q.minutes} min</span><span class="xp-text">+${q.xp} XP</span>${q.status==='in-progress'?'<span class="red-text">● In progress</span>':''}</div><h3>${esc(q.title)}</h3><p>${esc(q.description)}</p></div><div class="quest-action">${btn(q.status==='completed'?'View completed':q.status==='in-progress'?'Continue Quest':'Begin Quest','quest',{id:q.id,primary:q.status==='in-progress',icon:q.status==='completed'?'check':'arrow'})}</div></article>`;}
export function todayPage(s){
  const j=activeJourney(s),qs=s.quests.filter(q=>q.journeyId===j.id),done=qs.filter(q=>q.status==='completed'),next=j.status==='completed'?null:qs.find(q=>q.status!=='completed');
  const budget=j.minutes;let used=0;const today=[];
  for(const q of qs.filter(q=>j.status!=='completed'&&q.status!=='completed')){if(used+q.minutes<=budget||!today.length){today.push(q);used+=q.minutes;}}
  const shown=[...(done.length?[done.at(-1)]:[]),...today];
  return `<div class="goal-strip"><span class="eyebrow">${icon('flag')} CURRENT GOAL</span><strong>${esc(j.title)}</strong>${badge('Sample data','sample')}<span class="goal-version">Vol. ${String(j.version).padStart(2,'0')}</span></div>
  <section class="hero paper"><div class="hero-copy"><div class="eyebrow red-text">${icon('book')} A NEW PAGE IN YOUR STORY</div><h1>Every small step<br>awakens a new branch<br>of knowledge.</h1><p>Welcome back, Minh. A little curiosity, a little practice.<br class="desktop-only"> Your next adventure is waiting in the grand archives.</p><div class="button-row">${next?btn('Continue Quest','quest',{id:next.id,primary:true,icon:'flame'}):j.status==='completed'?btn('Begin a new journey','new-journey',{icon:'flag',primary:true}):btn('Reflect on your journey','finish-journey',{icon:'flag',primary:true})}${btn('Open Roadmap','navigate',{id:'roadmap',icon:'compass'})}</div><div class="hero-footnote">${icon('leaf')} Grow at your own pace. Every chapter counts.</div></div><div class="hero-art"><img src="/assets/library.png" alt="An illuminated knowledge tree in a magical library, with a friendly grimoire companion"><div class="art-caption"><span>✦ The Grand Archives</span><span>EST. MMXXVI</span></div></div></section>
  <div class="stats-grid"><section class="paper stat-card"><div class="stat-head"><span class="eyebrow">CHARACTER JOURNEY</span>${icon('trophy')}</div><div class="stat-number">${levelFor(s.xp)}<span>LEVEL<br><small>Apprentice Scribe</small></span><strong>${s.xp}<small>TOTAL XP</small></strong></div>${progress(s.xp%100)}<div class="stat-caption"><span>Activity brings experience</span><b>${100-s.xp%100} XP to Level ${levelFor(s.xp)+1}</b></div></section>
  <section class="paper stat-card"><div class="stat-head"><span class="eyebrow">${s.preferences.streak?'A LITTLE, EVERY DAY':'YOUR OWN RHYTHM'}</span>${icon(s.preferences.streak?'flame':'leaf')}</div><div class="stat-number">${s.preferences.streak?'7':'∞'}<span>${s.preferences.streak?'DAY STREAK':'POSSIBILITIES'}<br><small>${s.preferences.streak?'A week of small victories · sample':'Learning has no finish line'}</small></span>${badge('Keep growing','green')}</div><div class="week-strip">${['M','T','W','T','F','S','S'].map((d,i)=>`<span class="${i===6?'current':''}">${d}<b>${i===6?'✦':'✓'}</b></span>`).join('')}</div></section></div>
  <section class="domain-section"><div class="section-title"><div><div class="eyebrow">${TRACKS.length} PATHS. ENDLESS POSSIBILITIES.</div><h2>Choose your next discovery</h2></div>${btn('Explore all branches','navigate',{id:'knowledge',icon:'tree',class:'text-button'})}</div><div class="domain-grid">${TRACKS.map(t=>`<button class="domain-card" data-action="start-track" data-id="${t.id}" style="--domain-color:${t.color}"><span class="domain-icon">${icon(t.icon)}</span><strong>${esc(t.name)}</strong><small>${esc(t.subtitle)}</small><span class="domain-bottom">${t.concepts.length} concepts ${icon('arrow')}</span></button>`).join('')}</div></section>
  <section><div class="section-title quest-heading"><div><div class="eyebrow">YOUR DAILY CHAPTER</div><h2>${icon("code")} ${j.status==="completed"?"Journey complete":"Today's Quests"}</h2><p>${s.restDay?'A quieter page today. Your progress is safe.':`${used} min planned · ${done.length} of ${qs.length} journey activities complete`}</p></div><div class="button-row">${btn(s.restDay?'Resume today':'Take a rest day','rest',{icon:'moon',class:'small'})}${btn('Adjust pace','schedule',{icon:'settings',class:'small'})}</div></div>${s.restDay?`<div class="paper empty-state">${icon('leaf')}<h3>Rest is part of the journey.</h3><p>Your XP, knowledge, and personal ranks stay with you.</p>${btn('Return to my quests','rest',{primary:true})}</div>`:`<div class="quest-list">${shown.map(questCard).join('')}</div>`}</section>
  <aside class="wisdom"><span class="wisdom-icon">✧</span><div><div class="eyebrow">A NOTE FROM YOUR COMPANION</div><p>“You do not need to master the whole forest today. Get to know one leaf.”</p></div>${btn('Talk to Arcana','navigate',{id:'companion',icon:'arrow',class:'text-button'})}</aside>`;
}
export const graphToolbar=(view)=>`<div class="segmented"><button data-action="view" data-id="graph" class="${view==='graph'?'active':''}">${icon('tree')} Node Graph</button><button data-action="view" data-id="list" class="${view==='list'?'active':''}">${icon('list')} List View</button></div><div class="zoom-controls"><button aria-label="Zoom in" data-zoom="in">${icon('plus')}</button><button aria-label="Zoom out" data-zoom="out">${icon('minus')}</button><button aria-label="Fit graph to screen" data-zoom="fit">${icon('fit')}</button></div>`;
export function conceptDetail(c){
  const st=STATUSES[c.status],t=trackById(c.trackId);
  return `<div class="detail-title"><span class="eyebrow">${icon(t.icon)} CONCEPT DOSSIER</span>${badge('Sample evidence','sample')}</div><div class="detail-emblem" style="color:${st.color}">${icon(t.icon)}</div><h2>${esc(c.name)}</h2>${badge(st.label,c.status==='applying'?'green':'')}<p>${esc(c.scope)}</p><div class="thin-rule"></div><div class="eyebrow">SOURCE & CONTEXT</div><p class="small-copy">${c.status==='self'?'A self-reported starting point. This is separate from observed understanding.':c.status==='unobserved'?'No observations yet. This does not mean you do not know the topic.':'Illustrative signals from sample conversations. These are not a certificate of proficiency.'}</p>${c.evidence.length?`<div class="evidence-preview">${icon('book')} ${c.evidence.length} sample conversations<span>Last observed Sep 24, 2026</span></div>`:'<div class="evidence-preview">An unwritten page, ready to explore.</div>'}<div class="stack-buttons">${btn('Inspect evidence','evidence',{id:c.id,icon:'search'})}${btn('Learn this branch','start-track',{id:c.trackId,icon:'arrow',primary:true})}</div>`;
}
export function knowledgePage(s,v){
  const filtered=s.concepts.filter(c=>(v.track==='all'||c.trackId===v.track)&&(v.filter==='all'||c.status===v.filter)&&c.name.toLowerCase().includes(v.search.toLowerCase()));
  const selected=s.concepts.find(c=>c.id===v.concept)||s.concepts.find(c=>c.trackId===(v.track==='all'?'python':v.track));
  return `${sectionHead('GRAND ARCHIVES / THE LIVING KNOWLEDGE TREE','My Knowledge','A growing map of what you have explored, connected, and put into practice.',badge(`${s.concepts.length} concepts · ${TRACKS.length} branches`,'gold'))}
  <div class="branch-tabs"><button data-action="branch" data-id="all" class="${v.track==='all'?'active':''}">${icon('tree')} All branches</button>${TRACKS.map(t=>`<button data-action="branch" data-id="${t.id}" class="${v.track===t.id?'active':''}">${icon(t.icon)} ${esc(t.name)}</button>`).join('')}</div>
  <div class="graph-layout expansive-layout"><section class="paper graph-panel"><div class="graph-tools">${graphToolbar(v.view)}</div><div class="graph-filters"><label class="search-input">${icon('search')}<input id="concept-search" type="search" aria-label="Search concepts" placeholder="Search concepts, sigils..." value="${esc(v.search)}"></label><select id="status-filter" aria-label="Filter concepts by status"><option value="all">All observations</option>${Object.entries(STATUSES).map(([k,st])=>`<option value="${k}" ${v.filter===k?'selected':''}>${st.label}</option>`).join('')}</select></div>${v.view==='graph'?knowledgeGraph(s.concepts,{track:v.track,search:v.search,filter:v.filter,selected:v.concept,page:v.conceptPage||0}):`<div class="concept-list">${filtered.length?filtered.map(c=>`<button data-action="concept" data-id="${c.id}" class="concept-row ${v.concept===c.id?'selected':''}"><span class="status-dot" style="background:${STATUSES[c.status].color}"></span><strong>${esc(c.name)}</strong><span>${STATUSES[c.status].short}</span>${icon('chevron')}</button>`).join(''):'<div class="empty-state"><h3>No concepts found</h3><p>Try another search or filter.</p></div>'}</div>`}<div class="graph-pagination"><span>${filtered.length} concepts ${!v.search&&v.filter==='all'?'· All nodes visible · Zoom to explore':`· Page ${Math.min(v.conceptPage||0,Math.max(0,Math.ceil(filtered.length/6)-1))+1} of ${Math.max(1,Math.ceil(filtered.length/6))}`}</span>${v.view==='graph'&&(v.search||v.filter!=='all')?`<div>${btn('Previous','concept-page',{id:String(Math.max(0,(v.conceptPage||0)-1)),disabled:!(v.conceptPage>0),class:'small'})}${btn('Next concepts','concept-page',{id:String((v.conceptPage||0)+1),disabled:((v.conceptPage||0)+1)*6>=filtered.length,class:'small'})}</div>`:''}</div><div class="graph-legend">${Object.entries(STATUSES).map(([k,st])=>`<span><i style="background:${st.color}"></i>${st.short}</span>`).join('')}</div></section><aside class="detail-column"><section class="paper dossier" id="concept-dossier">${conceptDetail(selected)}</section><div class="margin-note">${icon('info')} Learning is a journey, not a score. XP and personal ranks tell different stories.</div></aside></div>`;
}
export function roadmapPage(s,v){
  const sample=Boolean(v.examplePlan),j=v.examplePlan||activeJourney(s),qs=sample?j.chapters.flatMap(c=>c.quests):s.quests.filter(q=>q.journeyId===j.id),ci=Math.min(v.chapter,j.chapters.length-1),c=j.chapters[ci],cqs=qs.filter(q=>q.chapter===ci),done=qs.filter(q=>q.status==='completed').length;
  return `${sectionHead('LEYS & CHRONICLES / YOUR EXPEDITION MAP','Roadmap & Expedition','Small steps, connected into a journey worth taking.',btn('New journey','new-journey',{icon:'plus',primary:true}))}
  <section class="sample-browser"><div><div class="eyebrow">EXPLORE THE CURRICULUM</div><p>Browse a detailed sample before starting your journey.</p></div><label><span class="sr-only">Browse sample roadmap</span><select id="roadmap-template-select"><option value="">My active journey</option>${TRACKS.map(t=>`<option value="${t.id}" ${v.examplePlan?.trackId===t.id?'selected':''}>${esc(t.name)} · ${t.modules.length} chapters · ${t.concepts.length} concepts</option>`).join('')}</select></label></section>
  <div class="goal-strip"><span class="eyebrow">${icon('flag')} ${sample?'SAMPLE':'JOURNEY'}</span>${sample?`<strong>${esc(j.title)}</strong><span class="badge sample">Preview only · Not activated</span>`:``}<select ${sample?'hidden':''} id="journey-select" aria-label="Select journey">${s.journeys.map(x=>`<option value="${x.id}" ${x.id===j.id?'selected':''}>${esc(x.title)}${x.status==='completed'?' · Completed':''}</option>`).join('')}</select>${badge(`Version ${j.version}`,'gold')}</div>
  ${!sample&&s.proposal?`<div class="proposal-banner"><div>${icon('spark')}<strong>A gentler pace is ready for review.</strong><p>${s.proposal.previous} → ${s.proposal.minutes} minutes/day. Your completed and in-progress work stays with you.</p></div>${btn('Review proposed changes','proposal',{primary:true,icon:'arrow'})}</div>`:''}
  <div class="graph-layout expansive-layout"><section class="paper graph-panel"><div class="graph-tools">${graphToolbar(v.view)}<span class="small-copy">${j.chapters.length} chapters · ${qs.length} activities</span></div><div class="graph-pagination"><span>Full branching roadmap · Solid: suggested prerequisite · Dashed: optional exploration</span></div>${v.view==='graph'?roadmapGraph(j,qs,ci):`<div class="chapter-list">${j.chapters.map((ch,i)=>`<button class="chapter-row ${ci===i?'selected':''}" data-action="chapter" data-id="${i}"><span class="chapter-numeral">${String(i+1).padStart(2,'0')}</span><div><small>CHAPTER ${i+1}</small><h3>${esc(ch.title)}</h3><p>${esc(ch.summary)}</p><div class="topic-tags">${(ch.topics||[]).map(t=>badge(t)).join('')}</div></div>${icon('chevron')}</button>`).join('')}</div>`}<div class="graph-legend"><span><i class="green-dot"></i>Completed activities</span><span><i class="red-dot"></i>Selected chapter</span><span><i class="gold-dot"></i>Ready to explore</span></div></section><aside class="detail-column"><section class="paper dossier"><div class="detail-title"><span class="eyebrow red-text">${icon('book')} CHAPTER DOSSIER</span>${badge(`№ ${ci+1}`,'gold')}</div><h2>${esc(c.title)}</h2><p>${esc(c.summary)}</p><div class="pathway-note"><strong>${esc(c.lane||'Study chapter')}</strong><p>${c.requires?.length?'Suggested first: '+c.requires.map(i=>esc(j.chapters[i].title)).join(' · '):'Start here — no prerequisite chapters.'}</p><small>Suggested order · Activities remain open for exploration.</small></div><div class="eyebrow">CONCEPTS IN THIS CHAPTER</div><div class="topic-tags">${(c.topics||[]).map(t=>badge(t)).join('')}</div><div class="chapter-progress"><div class="stat-caption"><span>Chapter activities</span><b>${cqs.filter(q=>q.status==='completed').length} / ${cqs.length}</b></div>${progress(cqs.filter(q=>q.status==='completed').length/cqs.length*100)}</div><div class="chapter-quests">${cqs.map(q=>`<button data-action="quest" data-id="${q.id}">${icon(q.status==='completed'?'check':'book')}<span><strong>${esc(q.title)}</strong><small>${q.minutes} min · +${q.xp} XP · ${q.status==='completed'?'Completed':q.type}</small></span>${icon('chevron')}</button>`).join('')}</div></section><section class="paper companion-note"><div class="eyebrow">${icon('spark')} ARCANA'S GUIDANCE</div><p>“A good roadmap gives you direction and room to breathe. We can always adjust the pace.”</p>${sample?btn('Personalize with Arcana','start-track',{id:j.trackId,icon:'spark'}):btn('Adjust my schedule','schedule',{icon:'clock'})}</section></aside></div>
  <div class="expedition-footer"><span>${icon('clock')} Pacing: <b>${j.minutes} min/day</b></span><span>${icon('flag')} Estimated journey: <b>${j.days} study days</b></span><span>${done} / ${qs.length} activities</span>${sample?btn('Start this sample roadmap','start-example',{icon:'flag',class:'small'}):btn(j.status==='completed'?'Journey completed':'Reflect & finish journey','finish-journey',{icon:'check',class:'small',disabled:j.status==='completed'})}</div>`;
}
export function progressPage(s){
  const complete=s.quests.filter(q=>q.status==='completed').length;
  return `${sectionHead('MILESTONES / YOUR PERSONAL CHRONICLE','A story of steady growth','Every experience leaves a little ink on the page.',badge('Illustrative profile','sample'))}
  <section class="paper progress-hero"><div class="portrait-frame"><img src="/assets/minh.png" alt="Minh, an anime scholar holding a grimoire"></div><div><div class="eyebrow red-text">MINH · APPRENTICE SCRIBE</div><h2>Your adventure is unfolding.</h2><p>Activity earns experience. Understanding grows through reflection.</p><div class="progress-metrics"><div><strong>${levelFor(s.xp)}</strong><span>Character level</span></div><div><strong>${s.xp}</strong><span>Total XP</span></div><div><strong>${complete}</strong><span>Activities complete</span></div></div>${progress(s.xp%100)}<p class="small-copy">${100-s.xp%100} XP until your next character level · ${s.dailyXp}/120 XP earned today</p></div></section>
  <div class="section-title"><div><div class="eyebrow">GROWTH HAS MANY FORMS</div><h2>Your domain chronicles</h2></div>${badge('Sample observations','sample')}</div><div class="rank-grid">${TRACKS.map(t=>`<section class="paper rank-card" style="--domain-color:${t.color}"><span class="rank-emblem">${icon(t.icon)}</span><h3>${esc(t.name)}</h3>${badge(s.ranks.find(r=>r.trackId===t.id)?.rank||'Explorer','gold')}<p>Illustrative signals within this field. Independent of activity XP.</p>${btn('Explore evidence','knowledge-track',{id:t.id,icon:'arrow',class:'text-button'})}</section>`).join('')}</div>
  <div class="two-columns"><section class="paper"><div class="panel-heading"><h2>${icon('star')} Collected milestones</h2></div><div class="achievement-list">${[['book','The First Page','Begin a learning journey'],['flame','A Week of Curiosity','7 active days · sample history'],['tree','Branching Out','Explore connected fields of knowledge']].map(([i,t,d])=>`<div>${icon(i)}<span><strong>${t}</strong><small>${d}</small></span><span class="seal">✦</span></div>`).join('')}</div></section><section class="paper"><div class="panel-heading"><h2>${icon('pen')} Experience ledger</h2></div><div class="ledger">${s.ledger.slice(0,8).map(l=>`<div><span><strong>${esc(l.title)}</strong><small>${esc(l.date)}</small></span><b>+${l.xp} XP</b></div>`).join('')}</div></section></div>`;
}
export function settingsPage(s){return `${sectionHead('YOUR SANCTUARY / PREFERENCES','Make this grimoire yours','A little control over how you learn and what your companion remembers.')}
  <div class="settings-layout"><section class="paper settings-panel"><h2>${icon('settings')} Learning preferences</h2>${[['streak','Show learning streak','A gentle reminder of your rhythm. Hiding it never changes your progress.'],['inference','Allow conversation observations','Demo preference only. This companion never infers real knowledge from your messages.'],['reducedMotion','Reduce motion','Keep transitions and decorative motion to a minimum.']].map(([key,title,description])=>`<label class="setting-row"><span><strong>${title}</strong><small>${description}</small></span><input type="checkbox" role="switch" data-pref="${key}" ${s.preferences[key]?'checked':''}></label>`).join('')}<div class="setting-row"><span><strong>Daily study budget</strong><small>Changes are previewed before you apply them.</small></span>${btn(`${activeJourney(s).minutes} min · Adjust`,'schedule',{icon:'clock',class:'small'})}</div></section>
  <section class="paper settings-panel"><div class="section-title"><h2>${icon('book')} Memory core</h2>${badge('Local only','green')}</div><p class="small-copy">Notes you choose to keep. Sample replies do not use these notes to assess you.</p><div class="memory-list">${s.memories.length?s.memories.map(m=>`<div><span><strong>${esc(m.text)}</strong><small>${esc(m.source)}</small></span><button class="icon-button" data-action="delete-memory" data-id="${m.id}" aria-label="Delete memory: ${esc(m.text)}">${icon('trash')}</button></div>`).join(''):'<p>Your memory core is empty. Add a note below.</p>'}</div><form id="memory-form" class="memory-form"><label class="sr-only" for="memory-input">New memory</label><input id="memory-input" name="memory" maxlength="240" placeholder="Something you want to remember…" required><button class="btn" type="submit">${icon('plus')} Add note</button></form></section>
  <section class="paper settings-panel"><h2>${icon('shield')} About this demo</h2><p>This is an interactive prototype with prepared learning content. Arcana uses scripted responses, and roadmaps are assembled from ${TRACKS.length} detailed curriculum templates.</p><div class="info-grid"><div><small>PROFILE</small><strong>Minh · sample learner</strong></div><div><small>STORAGE</small><strong>This browser only</strong></div><div><small>LANGUAGE</small><strong>English</strong></div><div><small>AI CONNECTION</small><strong>Simulated · no API key</strong></div></div></section>
  <section class="paper settings-panel reset-panel"><h2>${icon('reset')} Open a fresh page</h2><p>Restore the original sample profile, conversations, quests, and roadmap for another presentation. This removes changes made in this browser.</p>${btn('Reset demo data','reset',{icon:'reset'})}</section></div>`;}
````

## File: src/pathways.js
````javascript
export function chapterPath(index,count){
 const dependencies=count===10?[[],[0],[1],[1],[3],[2,4],[5],[5],[7],[6,7]]:[[],[0],[1],[1],[2,3],[4],[4],[5]];
 const optional=index===count-2;
 return {requires:dependencies[index]||[index-1],optional,lane:index<2?'Foundation':index===count-1?'Project':optional?'Optional exploration':'Parallel study'};
}
````

## File: src/state.js
````javascript
import {TRACKS,trackById,CONCEPTS,INITIAL_MESSAGES,questContent,STATUSES} from './data.js';
import {chapterPath} from './pathways.js';
export const STORAGE_KEY='lifeos-grimoire-demo-v1';
const copy=value=>structuredClone(value);
const uid=()=>globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const todayKey=()=>new Date().toLocaleDateString('en-CA');
export const activeJourney=s=>s.journeys.find(j=>j.id===s.activeId)||s.journeys[0];
export const levelFor=xp=>1+Math.floor(xp/100);
export function settleChat(current,base,response){
  const next={...current,messages:response.messages};
  if(JSON.stringify(current.builder)===JSON.stringify(base.builder)&&JSON.stringify(current.draft)===JSON.stringify(base.draft)){next.builder=response.builder;next.draft=response.draft;}
  if(JSON.stringify(current.proposal)===JSON.stringify(base.proposal))next.proposal=response.proposal;
  return next;
}
export function createRoadmap({trackId,experience='beginner',minutes=30,id=uid()}) {
  const track=trackById(trackId);
  if(!track||!Number.isFinite(minutes)||minutes<15||minutes>120)throw new Error('Choose a supported domain and 15–120 minutes per day.');
  const chapters=track.modules.map((module,i)=>({id:id+'-chapter-'+i,...chapterPath(i,track.modules.length),title:module.title,summary:module.summary,topics:[...module.topics],quests:[...module.topics,null].map((topic,n)=>{
    const practice=topic===null,type=practice?'Practice':'Learn',session=Math.min(minutes,experience==='beginner'?20:15);
    return {id:id+'-q-'+i+'-'+n,journeyId:id,chapter:i,trackId,topic:topic||module.title,title:practice?module.practice:'Explore '+topic,type,difficulty:practice?'B':'C',xp:practice?20:10,minutes:session,status:'active',checks:[],notes:'',...questContent(trackId,topic||module.title,type),prompt:practice?module.practice:'Explain '+topic+' using a small example, then connect it to '+module.title.toLowerCase()+'.',steps:practice?['Read the chapter outcome: '+module.practice,'Complete a small version of the chapter activity','Compare two attempts or observations and describe what changes','Record your result and one remaining question']:['Read about '+topic,'Write a short explanation in your own words','Try a minimal example of '+topic,'Connect your example to '+module.title]};
  })}));
  return {id,trackId,title:track.goal,experience,minutes,version:1,status:'active',chapters,days:Math.ceil(chapters.flatMap(c=>c.quests).reduce((n,q)=>n+q.minutes,0)/minutes),createdAt:todayKey()};
}
export function createInitialState(){
  const seed=createRoadmap({trackId:'rag',experience:'some',minutes:60});seed.id='seed-rag';seed.title='Build Document Q&A Chatbot with RAG';
  seed.chapters.forEach((c,i)=>{c.id=`seed-c-${i}`;c.quests.forEach((q,n)=>{q.id=`seed-q-${i}-${n}`;q.journeyId=seed.id;q.status=i<3?'completed':'active';});});
  seed.chapters[3].quests[0]={...seed.chapters[3].quests[0],id:'seed-embeddings',title:'Experiment with Embeddings on 5 Text Samples',type:'Practice',difficulty:'B',xp:20,status:'in-progress',minutes:20,checks:[0],...questContent('rag','embeddings')};
  seed.chapters[0].quests[1]={...seed.chapters[0].quests[1],title:'Review HTTP & API Fundamentals',type:'Review',difficulty:'C',xp:10,...questContent('python','HTTP requests and API responses','Learn')};
  seed.chapters[2].quests[0]={...seed.chapters[2].quests[0],title:'Explore Text Chunking Strategies',type:'Learn',difficulty:'C',xp:10,...questContent('rag','text chunking','Learn')};
  return {schema:1,catalogVersion:4,xp:250,dailyXp:10,rewardDay:todayKey(),activeId:seed.id,journeys:[seed],quests:seed.chapters.flatMap(c=>c.quests),concepts:copy(CONCEPTS),ranks:TRACKS.map(t=>({trackId:t.id,rank:t.rank})),ledger:[{id:'seed-ledger',title:'Review HTTP & API fundamentals',xp:10,date:todayKey()},{id:'prior',title:'Earlier adventures · sample history',xp:240,date:'2026-09-24'}],messages:copy(INITIAL_MESSAGES),builder:{stage:'goal'},draft:null,proposal:null,memories:[{id:'m1',text:'I learn best by building small projects.',source:'Sample conversation · Sep 22'},{id:'m2',text:'My current goal is a document Q&A chatbot.',source:'Confirmed sample goal'}],preferences:{streak:true,inference:true,reducedMotion:false},restDay:false};
}
export function activateRoadmap(state,plan){
  if(!plan||state.journeys.some(j=>j.id===plan.id))return state;
  if(state.journeys.filter(j=>j.status==='active').length>=3)throw new Error('You have three active journeys. Finish a journey before starting another.');
  const next=copy(state);next.journeys.push(copy(plan));next.quests.push(...copy(plan.chapters.flatMap(c=>c.quests)));next.activeId=plan.id;next.draft=null;next.builder={stage:'goal'};next.restDay=false;return next;
}
export function completeQuest(state,id){
  const quest=state.quests.find(q=>q.id===id);if(!quest||quest.status==='completed'||quest.status==='cancelled')return state;
  const next=copy(state);if(next.rewardDay!==todayKey()){next.dailyXp=0;next.rewardDay=todayKey();}
  const gained=Math.max(0,Math.min(quest.xp,120-next.dailyXp));next.quests.find(q=>q.id===id).status='completed';next.xp+=gained;next.dailyXp+=gained;next.ledger.unshift({id:uid(),title:quest.title,xp:gained,date:todayKey()});return next;
}
export function proposeSchedule(state,minutes){
  if(!Number.isFinite(minutes)||minutes<15||minutes>120)throw new Error('Choose 15–120 minutes per day.');
  const next=copy(state),journey=activeJourney(state);next.proposal={journeyId:journey.id,version:journey.version,previous:journey.minutes,minutes,days:Math.ceil(journey.days*journey.minutes/minutes)};return next;
}
export function applyProposal(state){
  const p=state.proposal;if(!p)return state;
  const next=copy(state),journey=next.journeys.find(j=>j.id===p.journeyId);if(!journey||journey.version!==p.version)throw new Error('This preview is out of date. Create a new schedule proposal.');
  journey.minutes=p.minutes;journey.days=p.days;journey.version++;
  next.quests=next.quests.flatMap(q=>{
    if(q.journeyId!==journey.id||q.status!=='active'||q.minutes<=p.minutes)return [q];
    const count=Math.ceil(q.minutes/p.minutes),baseMinutes=Math.floor(q.minutes/count),extraMinutes=q.minutes%count;
    const segments=Array.from({length:count},(_,i)=>({...q,id:`${q.id}-v${journey.version}-${i}`,title:`${q.title} · Part ${i+1}/${count}`,minutes:baseMinutes+(i<extraMinutes?1:0),checks:[],notes:'',xp:0}));
    let remainder=q.xp;segments.forEach(x=>{x.xp=Math.floor(q.xp*x.minutes/q.minutes);remainder-=x.xp;});
    const order=[...segments].sort((a,b)=>(q.xp*b.minutes/q.minutes)%1-(q.xp*a.minutes/q.minutes)%1);
    for(let i=0;i<remainder;i++)order[i].xp++;
    return segments;
  });
  next.proposal=null;return next;
}
function migrateCatalog(s){
  if(s.catalogVersion===4)return;
  if(!s.concepts.length||!s.journeys.every(p=>p?.chapters?.length))throw new Error('Invalid legacy save');
  s.concepts=CONCEPTS.map(c=>{const previous=s.concepts.find(x=>x.trackId===c.trackId&&x.name===c.name);return previous?{...c,status:previous.status,evidence:previous.evidence}:copy(c);});
  for(const plan of s.journeys){
    const fresh=createRoadmap({...plan,id:plan.id});
    const previous=s.quests.filter(q=>q.journeyId===plan.id);
    for(const q of previous){
      const index=fresh.chapters.findIndex(c=>c.topics.includes(q.topic)||c.topics.some(t=>q.title.toLowerCase().includes(t.toLowerCase())));
      q.chapter=index>=0?index:Math.min(q.chapter,fresh.chapters.length-1);
    }
    const ids=new Set(previous.map(q=>q.id));
    const additions=fresh.chapters.flatMap(c=>c.quests).filter(q=>!previous.some(old=>old.topic===q.topic&&old.type===q.type)).map(q=>({...q,id:ids.has(q.id)?`${q.id}-catalog3`:q.id}));
    s.quests.push(...additions);
    plan.chapters=fresh.chapters;plan.days=Math.ceil(s.quests.filter(q=>q.journeyId===plan.id).reduce((n,q)=>n+q.minutes,0)/plan.minutes);
  }
  if(s.draft)s.draft=createRoadmap({...s.draft,id:s.draft.id});
  for(const t of TRACKS)if(!s.ranks.some(r=>r.trackId===t.id))s.ranks.push({trackId:t.id,rank:t.rank});
  s.catalogVersion=4;
}
export function hydrate(raw){
  try{const s=JSON.parse(raw);
    if(s?.schema!==1||!Number.isFinite(s.xp)||s.xp<0||!Number.isFinite(s.dailyXp)||!Array.isArray(s.journeys)||!s.journeys.length||!Array.isArray(s.quests)||!Array.isArray(s.concepts)||!Array.isArray(s.messages)||!Array.isArray(s.memories)||!Array.isArray(s.ledger)||!Array.isArray(s.ranks)||!s.preferences||!s.builder)throw new Error();
    migrateCatalog(s);
    const validQuest=q=>q&&typeof q.id==='string'&&typeof q.title==='string'&&trackById(q.trackId)&&Number.isFinite(q.xp)&&q.xp>=0&&Number.isFinite(q.minutes)&&q.minutes>0&&Array.isArray(q.checks)&&Array.isArray(q.steps)&&q.steps.every(x=>typeof x==='string')&&['active','in-progress','completed','cancelled'].includes(q.status)&&Number.isInteger(q.chapter)&&q.chapter>=0&&q.chapter<100;
    const validPlan=j=>j&&typeof j.id==='string'&&typeof j.title==='string'&&trackById(j.trackId)&&Number.isFinite(j.minutes)&&j.minutes>=15&&j.minutes<=120&&Number.isFinite(j.days)&&Number.isInteger(j.version)&&Array.isArray(j.chapters)&&j.chapters.length>0&&j.chapters.every(c=>c&&typeof c.title==='string'&&Array.isArray(c.quests)&&c.quests.every(validQuest));
    if(!s.journeys.every(validPlan)||!s.quests.every(validQuest)||s.concepts.length!==CONCEPTS.length||!CONCEPTS.every(c=>s.concepts.some(x=>x?.id===c.id&&x.trackId===c.trackId))||!s.concepts.every(c=>typeof c.name==='string'&&Object.hasOwn(STATUSES,c.status)&&Array.isArray(c.evidence)&&c.evidence.every(e=>e&&typeof e.text==='string'))||!s.messages.every(m=>m&&['user','assistant'].includes(m.role)&&typeof m.text==='string')||!['goal','experience','time','ready'].includes(s.builder.stage)||!s.memories.every(m=>m&&typeof m.text==='string'&&typeof m.id==='string')||!s.ledger.every(l=>l&&typeof l.title==='string'&&Number.isFinite(l.xp))||!['streak','inference','reducedMotion'].every(k=>typeof s.preferences[k]==='boolean')||s.draft&&!validPlan(s.draft))throw new Error();
    if(!s.journeys.some(j=>j.id===s.activeId))s.activeId=s.journeys[0].id;
    if(s.rewardDay!==todayKey()){s.rewardDay=todayKey();s.dailyXp=0;}return s;
  }catch{return createInitialState();}
}
export function detectTrack(text){
  const domains=[['xiaozhi',/xiaozhi|小智/i],['esp32',/esp32/i],['sensors',/sensors?|cảm biến/i],['iot',/\biot\b|internet of things/i],['electronics',/electronics|circuits?|điện tử/i],['ielts',/ielts/i],['badminton',/badminton|cầu lông/i],['psychology',/psychology|tâm l[iíý]/i],['thinking',/critical thinking|tư duy/i],['communication',/communication|giao tiếp/i],['english',/english|tiếng anh/i],['fitness',/fitness|thể lực/i],['habits',/habits?|motivation|thói quen/i]];
  const domain=domains.find(([,pattern])=>pattern.test(text));if(domain)return domain[0];
  if(/\b(javascript|js|ecmascript)\b/i.test(text))return 'js';if(/\bjava\b/i.test(text))return 'java';if(/\b(oop|object.oriented|encapsulation|polymorphism)\b/i.test(text))return 'oop';
  if(/\b(dsa|data structures?|algorithms?|interviews?|sorting|trees)\b/i.test(text))return 'dsa';
  if(/\b(rag|pdf|chatbot|retrieval|embeddings?)\b/i.test(text))return 'rag';if(/\b(ai|artificial intelligence|machine learning|deep learning|neural networks?)\b/i.test(text))return 'ai';if(/\bpython\b/i.test(text))return 'python';return null;
}
export function respondToChat(state,input){
  const text=input.trim().slice(0,1600);if(!text)return state;
  const next=copy(state);next.messages.push({role:'user',text});const reply=(message,kind)=>next.messages.push({role:'assistant',text:message,...(kind?{kind}:{})});
  const b=next.builder,matched=detectTrack(text),duration=text.match(/\b(\d{1,3})\s*(?:min|minute)/i);
  const minutes=duration?Number(duration[1]):/^\d+$/.test(text)?Number(text):/\b(an?|one) hour\b/i.test(text)?60:null;
  if(/^(cancel|start over|new journey|create a roadmap)$/i.test(text)){next.builder={stage:'goal'};next.draft=null;reply('A fresh page. What would you like to learn? Explore programming, electronics, ESP32, sensors, IoT, Xiaozhi, psychology, English, IELTS, badminton, fitness, or habits.');}
  else if(b.stage==='experience'){
    const experience=/beginner|scratch|new|no experience/i.test(text)?'beginner':/some|basic|intermediate|familiar|experience|advanced/i.test(text)?'some':null;
    if(experience){next.builder={...b,experience,stage:'time'};reply('That gives us a starting point. How much time can you set aside each day? Choose 15, 30, 45, or 60 minutes (up to 120).');}else reply('For this demo, choose “I am a beginner” or “I know the basics” so I can tailor the starting point.');
  }else if(b.stage==='time'){
    if(minutes&&minutes>=15&&minutes<=120){next.draft=createRoadmap({...b,minutes});next.builder={...b,minutes,stage:'ready'};reply(`Your ${trackById(b.trackId).name} roadmap is ready to preview: ${next.draft.chapters.length} chapters, ${next.draft.chapters.flatMap(c=>c.quests).length} activities, and ${minutes} minutes a day. ${b.experience==='beginner'?'We will begin with guided foundations.':'We will use a faster review pace.'} Nothing is activated until you choose Start this journey.`,'draft');}else reply('Please enter a daily budget between 15 and 120 minutes, for example “30 minutes a day”.');
  }else if(/(?:less|only|schedule|budget|adjust|reduce|minutes? a day)/i.test(text)&&minutes){
    if(minutes>=15&&minutes<=120){next.proposal=proposeSchedule(next,minutes).proposal;reply(`I prepared a ${minutes}-minute daily plan. Review the schedule before applying it. Your existing work and XP will be preserved.`,'proposal');}else reply('Please choose a study budget from 15 to 120 minutes.');
  }else if(matched&&!/explain|what is|what are|help me understand/i.test(text)){next.builder={stage:'experience',trackId:matched};next.draft=null;reply(`Let's chart a path through ${trackById(matched).name}. Before I prepare it, what is your background: are you a beginner, or do you know the basics?`);}
  else if(/explain|what is|what are|help me understand/i.test(text)){const track=trackById(matched||activeJourney(next).trackId);reply(`${track.explanation}\n\nTry it in your next quest and write down what you notice. This is a prepared demo explanation, not a live AI response.`);}
  else if(/next quest|recommend|stuck/i.test(text)){const q=next.quests.find(q=>q.journeyId===next.activeId&&q.status!=='completed');reply(q?`Your next small step is “${q.title}”. Start with the first checklist item. You can open it from Today, and complete it whenever you feel ready.`:'You have completed these activities. Open Roadmap to reflect on your journey.');}
  else reply('This demo offers 20 branches: programming, electronics, ESP32, sensors, IoT, Xiaozhi, psychology, critical thinking, communication, English, IELTS, badminton, fitness, or habits. Choose a branch from the sidebar or say “Learn ESP32”. Responses come from prepared scenarios.');
  next.messages=next.messages.slice(-60);return next;
}
````

## File: src/styles.css
````css
:root{--paper:#f1e9d2;--raised:#f8f2df;--sunken:#e9dfc2;--ink:#2a2419;--muted:#776a53;--line:#d2c6a6;--cover:#19170f;--accent:#ae391e;--gold:#8a6a14;--green:#3f6b45;--sidebar:222px;--header:72px;--shadow:3px 4px 0 #302a1d;--body:Georgia,'Palatino Linotype','Times New Roman',serif;--sans:'Segoe UI',Arial,sans-serif}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.55}button,input,select,textarea{font:inherit}button,a,input,select,textarea{-webkit-tap-highlight-color:transparent}button{cursor:pointer;color:inherit}button:disabled{cursor:default;opacity:.5}a{color:inherit}button,a{touch-action:manipulation}button:focus-visible,a:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,[tabindex]:focus-visible{outline:3px solid #467386;outline-offset:4px}button{transition:background .15s,transform .15s,box-shadow .15s}button:hover:not(:disabled){filter:brightness(.975)}button:active:not(:disabled){transform:translate(1px,1px)}h1,h2,h3,p{margin:0}h1,h2,h3{line-height:1.15;letter-spacing:-.035em}h1{font-size:44px;font-weight:800}h2{font-size:29px}h3{font-size:21px}p{color:#60553f}img{max-width:100%;display:block}.icon{display:inline-block;flex-shrink:0;vertical-align:middle}input,textarea,select{min-width:0;border:1px solid #bfb292;background:#fbf6e6;color:var(--ink);border-radius:3px;padding:11px 13px;font-family:var(--sans);font-size:14px}textarea{resize:vertical;line-height:1.6;width:100%}select{cursor:pointer;max-width:100%}input::placeholder,textarea::placeholder{color:#928570}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}.skip-link{position:fixed;top:-60px;left:20px;z-index:1000;background:var(--raised);padding:12px}.skip-link:focus{top:10px}
.topbar{height:var(--header);position:fixed;top:0;left:0;right:0;z-index:40;background:var(--cover);border-bottom:1px solid #49402b;color:#eee4cb;display:flex;align-items:center;justify-content:space-between;padding:0 26px;box-shadow:0 3px 12px #21190c22}.brand{display:flex;align-items:center;gap:12px;text-decoration:none;width:250px;flex-shrink:0}.brand img{width:40px;height:40px;object-fit:contain}.brand strong{display:block;color:#d7b45e;font-size:15px;letter-spacing:.115em}.brand small{font-size:12px;color:#b9af98}.topbar-center{display:flex;align-items:center;gap:18px;color:#b9ad94;font-size:13px;font-style:italic}.little-diamond{color:#ac8c47;font-style:normal}.topbar-right{display:flex;align-items:center;gap:24px}.demo-indicator{font-family:var(--sans);font-size:9px;letter-spacing:.14em;color:#c6b899;display:flex;align-items:center;gap:7px}.demo-indicator i,.chat-online i{width:6px;height:6px;border-radius:50%;background:#7ca474}.profile-mini{display:flex;align-items:center;gap:12px;border-left:1px solid #514832;padding-left:23px}.profile-mini span{text-align:right}.profile-mini strong{display:block;font-size:15px}.profile-mini small{font-family:var(--sans);font-size:10px;color:#d0b675;letter-spacing:.04em}.profile-mini img{width:38px;height:38px;object-fit:cover;object-position:50% 25%;border-radius:50%;border:2px solid #c8ad68;box-shadow:0 0 0 3px #2b271e}.mobile-menu{display:none!important}
.sidebar{position:fixed;left:0;top:var(--header);bottom:0;width:var(--sidebar);z-index:35;background:var(--cover);color:#cfc6ae;display:flex;flex-direction:column;padding:27px 16px 17px;border-right:1px solid #4a402a}.chronicle{padding:11px 14px 22px}.chronicle .eyebrow{font-size:10px;color:#bea55e;justify-content:space-between}.chronicle .icon{width:13px}.chronicle h3{margin-top:15px;color:#eee4cb;font-size:25px}.chronicle>span{display:block;font-size:12px;color:#ac9f86;margin-top:4px}.chronicle-rule{height:1px;background:#4c422e;margin-top:22px;text-align:center}.chronicle-rule span{display:inline-block;position:relative;top:-13px;background:var(--cover);color:#a88a4d;font-size:14px;padding:0 12px}.sidebar nav{display:flex;flex-direction:column;gap:7px}.nav-link{padding:12px 13px;display:flex;align-items:center;gap:13px;text-decoration:none;border-radius:3px;font-size:15px;min-height:47px}.nav-link .icon{color:#bba465;width:20px}.nav-link:hover{background:#30291c}.nav-link.active{background:var(--accent);color:#fff4de;box-shadow:inset 3px 0 #d77443}.nav-link.active .icon{color:#f4dbb2}.nav-new{font-family:var(--sans);font-size:8px;letter-spacing:.07em;border:1px solid #6a5938;border-radius:2px;padding:1px 4px;color:#cab578;margin-left:auto}.sidebar-bottom{margin-top:auto;padding-top:25px}.sidebar-quote{text-align:center;font-size:13px;font-style:italic;line-height:1.8;color:#a8997b;margin-bottom:24px}.new-journey-btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:10px 4px;border:1px solid #5a4c31;background:#282217;font-size:12px;color:#dfc78c;border-radius:3px}.new-journey-btn .icon{width:15px}.local-status{border-top:1px solid #3c3426;padding:17px 7px 0;margin-top:18px;font-size:12px;color:#cabb96}.local-status .icon{width:16px;color:#b89b56;margin-right:8px}.local-status span{display:block;font-family:var(--sans);font-size:10px;color:#867a62;margin:5px 0 0 27px}
main{margin-left:var(--sidebar);padding:calc(var(--header) + 24px) 36px 0;max-width:1800px;min-height:100vh;background-image:radial-gradient(#b6a8830d .6px,transparent .6px);background-size:4px 4px}.page-kicker{display:flex;justify-content:space-between;margin-bottom:23px;font-family:var(--sans);font-size:9px;letter-spacing:.14em;color:#8e7a55}.page-kicker>span:first-child{font-weight:600}.page-kicker span span{margin:0 12px;color:#b3a47f}.page-footer{display:flex;justify-content:space-between;gap:16px;margin-top:42px;padding:20px 0;border-top:1px solid #cfc1a0;color:#92805b;font-family:var(--sans);font-size:9px;letter-spacing:.08em}.page-footer span:last-child{font-family:var(--body);font-style:italic;font-size:12px;letter-spacing:0}.eyebrow{font-family:var(--sans);font-size:10px;letter-spacing:.13em;font-weight:700;line-height:1.5;color:#806b37;display:flex;align-items:center;gap:8px}.eyebrow .icon{width:15px;height:15px}.red-text{color:var(--accent)!important}.green-text{color:var(--green)}.small-copy{font-size:12px;line-height:1.7;color:var(--muted)}.paper{background:var(--raised);border:1px solid #d8ccae;border-radius:4px;box-shadow:var(--shadow)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:40px;padding:10px 17px;border:1px solid #b5a883;border-radius:3px;background:#eee5c9;color:var(--ink);box-shadow:2px 2px 0 #3a3221;font-size:13px;font-weight:600;line-height:1.35;white-space:normal;text-decoration:none}.btn:hover:not(:disabled){background:#e7dcbc;box-shadow:3px 3px 0 #3a3221;transform:translateY(-1px)}.btn .icon{width:16px;height:16px}.btn.primary{background:var(--accent);border-color:#822611;color:#fff2db;box-shadow:2px 3px 0 #4b291b}.btn.primary:hover:not(:disabled){background:#952e18}.btn.small{font-size:11px;min-height:34px;padding:8px 12px}.btn.text-button{background:none;box-shadow:none;border-color:transparent;padding-left:0;padding-right:0;color:var(--accent)}.button-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.badge{display:inline-flex;align-items:center;padding:3px 8px;font-family:var(--sans);font-size:10px;line-height:1.4;font-weight:600;background:#e7dfc7;color:#6c6044;border:1px solid #d4c7a6;border-radius:3px;white-space:nowrap}.badge.gold{background:#f7d98e;border-color:#dfc174;color:#6c4e0c}.badge.green{background:#e1e8cf;border-color:#bdcba9;color:#426348}.badge.red{background:#ecd3bc;border-color:#dbb297;color:#a03c23}.badge.sample{background:#ece5d1;color:#7f7457;font-weight:400;font-size:9px}.meta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;font-family:var(--sans);font-size:11px;color:#8b7c60}.meta>span:not(.badge){display:inline-flex;align-items:center;gap:4px}.meta .icon{width:13px;height:13px}.xp-text{color:var(--green);font-weight:700}.goal-strip{padding:13px 16px;background:#e9dfc3;border:1px solid #d4c5a1;border-left:4px solid var(--accent);border-radius:3px;display:flex;align-items:center;gap:15px;margin-bottom:24px;font-size:14px}.goal-strip .eyebrow{background:var(--cover);color:#dfc272;letter-spacing:.04em;padding:3px 7px;border-radius:2px;font-size:9px;white-space:nowrap}.goal-version{margin-left:auto;font-size:11px;color:var(--muted);font-style:italic;white-space:nowrap}.goal-strip select{background:transparent;border:0;font-family:var(--body);font-weight:bold;flex:1;padding:0;font-size:16px}
.hero{display:grid;grid-template-columns:1.1fr 1fr;gap:27px;padding:33px 29px;position:relative;margin-bottom:24px;overflow:hidden}.hero:before,.hero:after{position:absolute;color:#988451;font-size:14px;line-height:1;pointer-events:none}.hero:before{content:'⌜ ✧';top:8px;left:9px}.hero:after{content:'✧ ⌟';bottom:8px;right:9px}.hero h1{font-size:clamp(31px,2.9vw,49px);line-height:1.08;margin:19px 0 17px;letter-spacing:-.047em}.hero-copy>p{font-size:14px;line-height:1.8;max-width:440px}.hero .button-row{margin-top:24px;gap:10px}.hero-footnote{display:flex;align-items:center;gap:7px;margin-top:22px;color:#927e54;font-size:10px;font-style:italic}.hero-footnote .icon{width:13px;height:13px}.hero-art{align-self:center;position:relative;border:5px solid #e2d6b5;outline:1px solid #b7a782;box-shadow:4px 4px 0 #332b1d;transform:rotate(1deg);height:290px}.hero-art:before{content:'';position:absolute;inset:5px;border:1px solid #e3c77677;z-index:1;pointer-events:none}.hero-art img{width:100%;height:100%;object-fit:cover;object-position:58% 50%}.art-caption{position:absolute;bottom:0;left:0;right:0;padding:28px 13px 12px;background:linear-gradient(transparent,#1c170ee8);display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#f3d998}.art-caption span:last-child{font-family:var(--sans);font-size:7px;letter-spacing:.12em}.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:34px}.stat-card{padding:21px 24px}.stat-head{display:flex;justify-content:space-between;align-items:center}.stat-head>.icon{color:#a58430;width:22px;height:22px}.stat-number{display:flex;align-items:center;gap:13px;font-size:48px;font-family:var(--sans);font-weight:750;line-height:1.15;margin:10px 0 15px;letter-spacing:-.055em}.stat-number>span:not(.badge){font-size:11px;letter-spacing:.08em;font-weight:650;color:#665638;line-height:1.8}.stat-number small{font-family:var(--body);font-size:12px;font-weight:400;letter-spacing:0;color:#8c7e63}.stat-number>strong{margin-left:auto;font-size:26px;color:#8d6c1b;letter-spacing:-.04em;text-align:right}.stat-number>strong small{display:block;font-family:var(--sans);font-size:8px;letter-spacing:.1em}.stat-number .badge{margin-left:auto;letter-spacing:0;font-weight:500}.progress-track{height:7px;border-radius:2px;background:#e4dabd;border:1px solid #d2c5a1;overflow:hidden}.progress-track span{display:block;height:100%;background:var(--gold);transition:width .35s}.stat-caption{display:flex;justify-content:space-between;gap:10px;margin:9px 0 0;font-family:var(--sans);font-size:9px;color:#877654}.stat-caption b{color:var(--accent);font-weight:600}.week-strip{display:flex;gap:7px}.week-strip span{flex:1;background:#e8dfc2;border:1px solid #d7c9a5;display:flex;align-items:center;justify-content:center;gap:9px;font-family:var(--sans);font-size:9px;color:#847248;padding:6px 0;border-radius:2px}.week-strip b{color:var(--green);font-size:12px}.week-strip .current{background:#f3dca4;border-color:#bda06a}.week-strip .current b{color:var(--accent)}.section-title{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:19px}.section-title h2{margin-top:6px}.section-title p{font-size:12px;margin-top:8px}.domain-section{margin-bottom:35px}.domain-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:13px}.domain-card{padding:19px 14px 12px;background:#f7f0dc;border:1px solid #cec1a0;border-top:3px solid var(--domain-color);border-radius:3px;text-align:left;box-shadow:2px 2px 0 #b6a98a;display:flex;flex-direction:column;min-width:0;transition:transform .2s,box-shadow .2s}.domain-card:hover{transform:translateY(-4px)!important;box-shadow:3px 6px 0 #b6a98a}.domain-icon{color:var(--domain-color);background:color-mix(in srgb,var(--domain-color) 10%,transparent);border:1px solid color-mix(in srgb,var(--domain-color) 25%,transparent);display:flex;align-items:center;justify-content:center;width:35px;height:35px;border-radius:5px;margin-bottom:13px}.domain-card strong{font-size:15px;line-height:1.3;letter-spacing:-.025em;min-height:39px}.domain-card small{font-size:10px;color:#887a5e;line-height:1.5;margin:5px 0 14px;min-height:30px}.domain-bottom{border-top:1px solid #dfd4b9;padding-top:9px;width:100%;display:flex;justify-content:space-between;align-items:center;font-family:var(--sans);font-size:9px;color:#827151;margin-top:auto}.domain-bottom .icon{width:14px;height:14px;color:var(--domain-color)}.quest-heading{border-bottom:2px solid #b4a587;padding-bottom:15px}.quest-heading h2{display:flex;align-items:center;gap:8px}.quest-heading h2>.icon{color:var(--accent);width:23px}.quest-list{display:flex;flex-direction:column;gap:15px}.quest-card{display:flex;gap:15px;align-items:center;padding:21px 21px;background:#f7f0dc;border:1px solid #d6c8a7;border-radius:3px;box-shadow:2px 3px 0 #827456}.quest-rune{border:1px solid #d2c19a;background:#eee3c5;color:var(--gold);width:41px;height:45px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.quest-copy{flex:1;min-width:0}.quest-copy h3{margin:9px 0 7px;font-size:21px;line-height:1.25}.quest-copy p{font-size:12px;line-height:1.65;max-width:680px}.quest-card.in-progress{border-left:4px solid var(--accent);padding-left:18px}.quest-card.in-progress .quest-rune{color:var(--accent);background:#ecd3bc;border-color:#d3a083}.quest-card.completed{background:#eee6ce;box-shadow:1px 2px 0 #aaa084}.quest-card.completed .quest-rune{color:var(--green);background:#e0e4c9}.quest-card.completed .quest-copy h3{font-size:17px;color:#7f755f}.quest-card.completed .quest-copy p{display:none}.quest-action{flex-shrink:0;margin-left:10px}.quest-action .btn{font-size:11px;padding:9px 12px}.wisdom{display:flex;align-items:center;gap:19px;padding:25px 23px;background:#e9dfc2;border:1px solid #d7c7a2;border-radius:3px;margin-top:28px}.wisdom-icon{font-size:44px;color:var(--gold);line-height:1}.wisdom p{font-size:15px;font-style:italic;margin-top:5px}.wisdom .btn{margin-left:auto;flex-shrink:0}
.page-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin:0 0 27px}.page-heading h1{margin:10px 0 13px;font-size:42px}.page-heading p{font-size:14px;max-width:650px;line-height:1.7}.heading-actions{flex-shrink:0;align-self:center}.branch-tabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:23px}.branch-tabs button{border:1px solid #c7b994;background:#eee5cc;padding:9px 13px;font-size:11px;display:flex;gap:7px;align-items:center;border-radius:3px;min-height:37px}.branch-tabs button .icon{width:15px;height:15px;color:#8c7443}.branch-tabs button.active{background:var(--cover);border-color:var(--cover);color:#f3e6c7}.branch-tabs button.active .icon{color:#d6b35e}.graph-layout{display:grid;grid-template-columns:minmax(0,1fr) 290px;gap:24px}.graph-panel{padding:14px;min-width:0;overflow:hidden;align-self:start}.graph-tools{display:flex;align-items:center;gap:12px;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap}.segmented{display:flex;background:#e6ddc1;padding:3px;border:1px solid #c7b897;border-radius:3px;box-shadow:1px 2px 0 #706347}.segmented button{display:flex;align-items:center;gap:6px;background:none;border:0;padding:8px 11px;font-family:var(--sans);font-size:10px;border-radius:2px}.segmented button .icon{width:13px;height:13px}.segmented button.active{background:var(--accent);color:#fff2df;box-shadow:1px 1px 0 #493320}.zoom-controls{display:flex;gap:0;border:1px solid #c7b897;border-radius:3px;background:#eee5cc;box-shadow:1px 2px 0 #706347}.zoom-controls button{display:flex;align-items:center;justify-content:center;width:32px;height:32px;background:none;border:0}.zoom-controls button+button{border-left:1px solid #d7ccae}.zoom-controls .icon{width:15px;height:15px}.graph-filters{display:flex;gap:9px;margin-bottom:12px}.search-input{display:flex;align-items:center;gap:7px;padding-left:10px;flex:1;background:#f9f3e1;border:1px solid #c7b897;border-radius:3px;min-width:0;color:#978769}.search-input .icon{width:15px;height:15px}.search-input input{border:0;background:transparent;padding:9px 6px;width:100%;font-size:11px}.graph-filters select{font-size:10px;padding:7px 9px;max-width:165px;background:#eee5cc}.graph-viewport{position:relative;height:590px;overflow:hidden;background-color:#f1e8cf;background-image:radial-gradient(#c9b98d .8px,transparent .8px);background-size:21px 21px;border:1px solid #d3c6a5;border-radius:3px;touch-action:none;cursor:grab}.graph-viewport.dragging{cursor:grabbing}.graph-plane{position:absolute;top:0;left:0;transform-origin:0 0}.graph-lines{position:absolute;inset:0;pointer-events:none}.orbit{fill:none;stroke:#c9ba96;stroke-dasharray:4 13;stroke-width:1;opacity:.5}.graph-node{position:absolute;transform:translate(-50%,0);display:flex;flex-direction:column;align-items:center;width:180px;text-align:center;padding:0;background:none;border:0;color:var(--ink);z-index:2}.graph-node:active:not(:disabled){transform:translate(-50%,1px)}.graph-node:hover:not(:disabled){filter:none}.node-orb{width:73px;height:73px;border:2px solid var(--node-color);outline:4px solid #f1e8cf;box-shadow:3px 4px 0 #51452d;border-radius:50%;background:#f5edd6;position:relative;display:flex;align-items:center;justify-content:center;color:var(--node-color);margin-bottom:11px}.node-orb:after{content:'';position:absolute;inset:6px;border:1px solid currentColor;border-radius:50%;opacity:.25}.node-orb>.icon{width:26px;height:26px}.orb-spark{position:absolute;top:-12px;left:50%;transform:translateX(-50%);padding:1px 5px;font-size:12px;background:#f1e8cf;color:var(--node-color)}.graph-node>strong{background:#f4ecd6;padding:3px 8px;font-size:17px;line-height:1.2;max-width:178px;box-shadow:1px 1px 0 #c3b695;border:1px solid #ded1b0;border-radius:2px}.node-caption{background:#f3eacf;color:var(--node-color);padding:2px 6px;font-family:var(--sans);font-size:10px;margin-top:5px;max-width:180px;line-height:1.5}.graph-node.selected .node-orb{background:#f6d986;border-color:#936a17;box-shadow:3px 4px 0 #513b19,0 0 0 8px #d6b85433}.graph-node.selected>strong{border:1px solid #b23a1f;box-shadow:2px 2px 0 #b23a1f}.graph-node:hover .node-orb{background:#f8e5a9}.small-node{width:155px}.small-node .node-orb{width:47px;height:47px;box-shadow:2px 2px 0 #5a4f39;margin-bottom:8px}.small-node .node-orb>.icon{width:19px;height:19px}.small-node>strong{font-size:13px;max-width:145px}.small-node .node-caption{font-size:9px}.branch-node>strong{font-size:15px}.root-node{width:250px}.root-node .node-orb{width:58px;height:58px}.root-node>strong{font-size:13px;letter-spacing:.05em;max-width:250px;border:1px solid #aa9260;background:#e4d4a6;padding:8px 13px}.map-corner{position:absolute;top:15px;right:18px;font-family:var(--body);font-size:12px;line-height:1.5;color:#a99870;text-align:center}.map-watermark{position:absolute;bottom:28px;left:20px;font-family:var(--sans);font-size:9px;letter-spacing:.17em;color:#b9a982}.map-hint{position:absolute;bottom:11px;left:13px;display:flex;gap:6px;align-items:center;padding:4px 7px;background:#f6edd7e8;color:#a18d64;font-family:var(--sans);font-size:9px;pointer-events:none}.map-hint .icon{width:12px;height:12px}.graph-legend{display:flex;flex-wrap:wrap;gap:11px;padding:13px 2px 0;font-family:var(--sans);font-size:9px;color:#887759}.graph-legend span{display:flex;align-items:center;gap:5px}.graph-legend i,.status-dot{width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0}.green-dot{background:var(--green)}.red-dot{background:var(--accent)}.gold-dot{background:var(--gold)}.detail-column{display:flex;flex-direction:column;gap:20px;min-width:0}.dossier{padding:23px 22px}.detail-title{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;flex-wrap:wrap}.detail-title .eyebrow{font-size:9px}.detail-emblem{display:flex;justify-content:center;align-items:center;border:1px solid #d1c29d;outline:4px solid #e9dfc3;border-radius:50%;width:67px;height:67px;margin:26px 0 22px}.detail-emblem .icon{width:30px;height:30px}.dossier h2{margin:20px 0 15px;font-size:29px;line-height:1.2}.dossier>p{font-size:13px;line-height:1.8;margin:17px 0}.thin-rule{border-top:1px solid #d8ccac;margin:20px 0}.evidence-preview{padding:12px;background:#eae1c6;border:1px solid #d7c7a2;border-radius:3px;font-size:12px;color:#685937;margin:18px 0}.evidence-preview .icon{width:15px;margin-right:5px}.evidence-preview span{display:block;font-family:var(--sans);font-size:9px;margin-top:5px;color:#8b7a56}.stack-buttons{display:flex;flex-direction:column;gap:10px}.margin-note{display:flex;align-items:flex-start;gap:8px;font-size:11px;line-height:1.8;color:#8b7a59;padding:0 4px}.margin-note .icon{width:16px;height:16px;margin-top:3px;color:#a38a4d}.concept-list{min-height:460px}.concept-row{display:flex;align-items:center;gap:12px;width:100%;padding:17px 12px;background:transparent;border:0;border-bottom:1px solid #d7caac;text-align:left}.concept-row strong{flex:1;font-size:14px}.concept-row>span:not(.status-dot){font-family:var(--sans);font-size:10px;color:#877457}.concept-row>.icon{width:14px}.concept-row.selected{background:#e7dab7}.proposal-banner{display:flex;align-items:center;justify-content:space-between;gap:20px;background:#f8e8bf;border:1px solid #c49861;border-left:4px solid var(--accent);padding:18px 20px;margin-bottom:24px;box-shadow:2px 3px 0 #705436}.proposal-banner>div>.icon{color:var(--accent);margin-right:7px}.proposal-banner strong{font-size:15px}.proposal-banner p{margin-top:5px;font-size:12px}.roadmap-node .node-orb{width:83px;height:83px}.roadmap-node>strong{font-size:17px;padding:8px 10px}.roadmap-node.selected .node-orb{background:#f3d5bd;border-color:var(--accent);box-shadow:3px 4px 0 #513b19,0 0 0 8px #ae391e1f}.chapter-progress{padding:14px;background:#eee3c5;border:1px solid #d9c7a0;margin-top:20px}.chapter-progress .stat-caption{margin:0 0 10px}.chapter-quests{margin-top:20px;display:flex;flex-direction:column}.chapter-quests button{display:flex;align-items:flex-start;gap:9px;width:100%;padding:14px 0;background:none;border:0;border-bottom:1px solid #ded3b8;text-align:left}.chapter-quests button>.icon{width:16px;height:16px;color:var(--gold);margin-top:3px}.chapter-quests button>.icon:last-child{margin-left:auto;width:12px}.chapter-quests strong{font-size:12px;line-height:1.5;display:block}.chapter-quests small{font-family:var(--sans);display:block;color:#9b8860;font-size:9px;margin-top:5px}.companion-note{padding:20px}.companion-note p{font-style:italic;font-size:13px;line-height:1.8;margin:15px 0}.companion-note .btn{width:100%;font-size:11px}.expedition-footer{display:flex;align-items:center;gap:20px;justify-content:space-between;background:var(--cover);color:#d9cba6;padding:16px 20px;border:1px solid #5e4c2b;border-radius:3px;margin-top:27px;font-size:11px;flex-wrap:wrap}.expedition-footer span{display:flex;gap:6px;align-items:center}.expedition-footer .icon{width:15px;height:15px;color:#c5a050}.expedition-footer .btn{background:#30291a;color:#decc9e;border-color:#78623a;box-shadow:none}.chapter-list{min-height:530px;padding:15px 10px}.chapter-row{display:flex;align-items:center;gap:18px;background:none;border:0;border-bottom:1px solid #d6c7a3;width:100%;padding:25px 10px;text-align:left}.chapter-numeral{font-size:30px;color:#ae9360;width:43px;flex-shrink:0}.chapter-row>div{flex:1}.chapter-row small{font-family:var(--sans);font-size:9px;color:var(--accent);letter-spacing:.1em}.chapter-row h3{margin:7px 0;font-size:20px}.chapter-row p{font-size:12px}.chapter-row.selected{background:#eee0ba}
.chat-layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:24px}.chat-panel{overflow:hidden}.chat-topline{display:flex;gap:12px;align-items:center;padding:16px 21px;border-bottom:1px solid #d4c7a5;background:#eee4c9}.companion-avatar{width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--cover);color:#dabc73;border:1px solid #8a7040;border-radius:6px}.chat-topline strong{font-size:17px;display:block}.chat-topline small{display:block;font-size:10px;color:#918063;margin-top:1px}.chat-online{display:flex;gap:6px;align-items:center;margin-left:auto;font-family:var(--sans);font-size:9px;color:var(--green)}.icon-button{display:inline-flex;align-items:center;justify-content:center;background:none;border:1px solid transparent;border-radius:3px;width:33px;height:33px;padding:5px;color:#8a754e;flex-shrink:0}.icon-button:hover{background:#d9c9a250;border-color:#bcaa82}.chat-transcript{height:520px;overflow:auto;padding:28px 24px;scroll-behavior:smooth;scrollbar-width:thin;scrollbar-color:#b3a07d transparent}.message{margin-bottom:24px;max-width:94%}.message.user{margin-left:auto;max-width:85%}.message-by{display:flex;align-items:center;gap:6px;font-size:11px;color:#715d36;font-weight:bold;margin-bottom:8px}.message-by .icon{width:13px;height:13px}.message-by span{font-family:var(--sans);font-size:9px;color:#a08d65;font-weight:400;margin-left:5px}.message.user .message-by{justify-content:flex-end}.message-bubble{padding:17px 19px;background:#f7f0db;border:1px solid #daceb0;box-shadow:2px 2px 0 #c4b795;border-radius:0 8px 8px 8px;font-size:14px;line-height:1.9;overflow-wrap:anywhere}.message.user .message-bubble{background:#eae0c3;border-color:#c9b994;border-radius:8px 0 8px 8px}.chat-input-area{padding:19px 20px 12px;border-top:1px solid #d5c8a6;background:#f1e8cf}.prompt-label{display:flex;gap:7px;align-items:center;color:#957c48;font-family:var(--sans);font-size:8px;letter-spacing:.1em;margin-bottom:9px}.prompt-label .icon{width:13px;height:13px}.prompt-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:15px}.prompt-chips button{background:#f9f1d9;border:1px solid #ccbc92;border-radius:20px;padding:5px 10px;font-size:10px;line-height:1.5}.prompt-chips button:hover{border-color:var(--accent);color:var(--accent)}#chat-form{background:#faf4e2;border:1px solid #cdbd94;border-radius:4px;box-shadow:inset 1px 2px 3px #a99a7520;padding:11px}#chat-input{border:0;background:transparent;padding:4px;font-family:var(--body);font-size:14px;resize:none;min-height:66px}#chat-input:focus{outline:none}.composer-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px}.composer-bottom small{font-family:var(--sans);font-size:8px;color:#998665}.composer-bottom .btn{font-size:11px;min-height:35px;padding:8px 12px}.chat-disclaimer{font-family:var(--sans);font-size:8px;color:#958361;text-align:center;margin-top:11px}.chat-aside{display:flex;flex-direction:column;gap:20px}.companion-profile{padding:18px 20px}.companion-illustration{height:128px;overflow:hidden;border:1px solid #b5a179;margin-bottom:20px}.companion-illustration img{height:100%;width:100%;object-fit:cover;object-position:100% 50%;transform:scale(1.55);transform-origin:100% 70%}.companion-profile>.eyebrow{font-size:8px}.companion-profile h2{margin:10px 0;font-size:25px}.companion-profile>p{font-size:12px;line-height:1.8}.builder-steps{list-style:none;padding:0;margin:23px 0 4px;display:flex;flex-direction:column;gap:16px}.builder-steps li{display:flex;align-items:center;gap:10px;font-size:11px;color:#958567}.builder-steps span{width:23px;height:23px;display:flex;align-items:center;justify-content:center;border:1px solid #c8b88f;border-radius:50%;font-family:var(--sans);font-size:9px;background:#efe4c6}.builder-steps .current{color:var(--accent);font-weight:bold}.builder-steps .current span{background:var(--accent);border-color:var(--accent);color:#fff3d6}.chat-topics{padding:19px}.chat-topics .eyebrow{font-size:9px;margin-bottom:10px}.chat-topics button{width:100%;padding:11px 0;border:0;border-bottom:1px solid #ddd0ae;background:none;text-align:left;display:flex;align-items:center;gap:9px;font-size:12px}.chat-topics button .icon{width:16px;height:16px}.chat-topics button>.icon:last-child{margin-left:auto;width:12px;color:#aa956c}.typing{font-size:12px;color:#9d804b;font-style:italic}.typing span{letter-spacing:4px;animation:pulse 1s infinite}.draft-card{margin-top:18px;background:#f1e2b9;border:1px solid #bd9f5c;border-left:3px solid var(--accent);padding:19px}.draft-card .eyebrow{font-size:8px}.draft-card h2{font-size:25px;margin:10px 0 14px}.draft-card .meta{font-size:9px;gap:8px}.mini-roadmap{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:18px 0}.mini-roadmap>div{display:grid;grid-template-columns:22px 1fr;gap:2px 8px;align-items:start;background:#f8efd3;border:1px solid #d4bd85;padding:10px}.mini-roadmap span{border-radius:50%;background:#9c7830;color:#fff0c8;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-family:var(--sans);font-size:9px;grid-row:span 2}.mini-roadmap strong{font-size:11px;line-height:1.4}.mini-roadmap small{font-family:var(--sans);font-size:8px;color:#978054}.draft-card .btn{font-size:10px;min-height:33px;padding:7px 10px}.draft-card .small-copy{margin-top:12px;font-size:9px}.inline-proposal{border:1px solid #bda572;background:#eee0b6;padding:15px;margin-top:14px}.inline-proposal strong{font-size:17px}.inline-proposal p{font-size:11px;margin:5px 0 12px}
.progress-hero{display:grid;grid-template-columns:170px 1fr;gap:30px;padding:28px;margin-bottom:33px}.portrait-frame{align-self:stretch;min-height:190px;border:5px double #a68b48;background:#282218;padding:5px;box-shadow:3px 4px 0 #40321d}.portrait-frame img{height:100%;max-height:235px;width:100%;object-fit:cover;object-position:50% 20%}.progress-hero h2{margin:12px 0;font-size:34px}.progress-hero p{font-size:13px}.progress-metrics{display:flex;gap:48px;margin:19px 0 22px}.progress-metrics strong{font-family:var(--sans);font-size:32px;display:block;line-height:1.2;color:#8c6a1b}.progress-metrics span{font-size:10px;color:#8e7b56}.progress-hero .small-copy{font-size:10px;margin-top:8px}.rank-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-bottom:30px}.rank-card{text-align:center;padding:24px 14px 17px}.rank-emblem{display:flex;align-items:center;justify-content:center;width:56px;height:64px;clip-path:polygon(50% 0,95% 23%,95% 77%,50% 100%,5% 77%,5% 23%);background:color-mix(in srgb,var(--domain-color) 15%,var(--paper));color:var(--domain-color);margin:0 auto 18px}.rank-emblem .icon{width:29px;height:29px}.rank-card h3{font-size:17px;min-height:40px}.rank-card p{font-size:11px;line-height:1.65;margin:13px 0}.rank-card .btn{font-size:10px}.two-columns{display:grid;grid-template-columns:1fr 1fr;gap:24px}.panel-heading{padding:20px 22px;border-bottom:1px solid #d6c8a6}.panel-heading h2{font-size:23px;display:flex;align-items:center;gap:10px}.panel-heading .icon{color:var(--gold);width:20px}.achievement-list,.ledger{padding:0 22px}.achievement-list>div,.ledger>div{display:flex;align-items:center;gap:13px;padding:18px 0;border-bottom:1px solid #ddd0ae}.achievement-list>div:last-child,.ledger>div:last-child{border:0}.achievement-list>div>.icon{width:29px;height:29px;color:#a48332}.achievement-list strong,.ledger strong{display:block;font-size:13px;line-height:1.5}.achievement-list small,.ledger small{display:block;font-family:var(--sans);font-size:9px;color:#94805a;margin-top:3px}.seal{margin-left:auto;color:#b28c39;font-size:22px}.ledger>div>span{flex:1}.ledger b{font-family:var(--sans);font-size:12px;color:var(--green);white-space:nowrap}.settings-layout{display:grid;grid-template-columns:1fr 1fr;gap:25px}.settings-panel{padding:25px}.settings-panel h2{font-size:25px;display:flex;align-items:center;gap:10px;margin-bottom:15px}.settings-panel h2 .icon{color:var(--gold)}.setting-row{display:flex;align-items:center;gap:18px;padding:20px 0;border-bottom:1px solid #dbceb0}.setting-row:last-child{border-bottom:0;padding-bottom:0}.setting-row>span{flex:1}.setting-row strong{display:block;font-size:14px}.setting-row small{display:block;font-size:11px;color:#95815f;line-height:1.7;margin-top:6px}.setting-row input{appearance:none;width:37px;height:21px;background:#c8b994;border-radius:20px;position:relative;flex-shrink:0;cursor:pointer;padding:0;transition:background .2s}.setting-row input:before{content:'';position:absolute;left:3px;top:3px;background:#faf2df;width:13px;height:13px;border-radius:50%;transition:transform .2s}.setting-row input:checked{background:var(--green);border-color:var(--green)}.setting-row input:checked:before{transform:translateX(16px)}.memory-list>div{display:flex;align-items:center;gap:10px;border-bottom:1px solid #dacba8;padding:15px 0}.memory-list>div>span{flex:1}.memory-list strong{font-size:12px;font-weight:400}.memory-list small{display:block;font-family:var(--sans);font-size:9px;color:#93805b;margin-top:5px}.memory-form{display:flex;gap:10px;margin-top:22px}.memory-form input{flex:1;width:0;font-size:11px}.memory-form .btn{font-size:10px;box-shadow:none;padding:8px 10px}.settings-panel>p{font-size:13px;line-height:1.8}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:22px}.info-grid small{display:block;font-family:var(--sans);font-size:8px;color:#aa8c50;letter-spacing:.1em}.info-grid strong{display:block;font-size:12px;margin-top:4px}.reset-panel .btn{margin-top:20px;color:var(--accent);border-color:#ba9275}
.notice{background:#ede3c6;border:1px solid #c8b582;border-left:3px solid #9e7b2d;padding:12px 15px;font-size:12px;color:#826b36;margin-bottom:18px;line-height:1.7}.empty-state{padding:55px 25px;text-align:center;color:#a38a54;min-height:250px}.empty-state>.icon{width:35px;height:35px;margin-bottom:18px}.empty-state h3{font-size:24px;color:#6e5c38;margin-bottom:10px}.empty-state p{font-size:13px;margin:10px auto 20px;max-width:400px}.modal-open{overflow:hidden}.modal-backdrop{position:fixed;inset:0;background:#16130dc7;backdrop-filter:blur(3px);z-index:100;display:flex;align-items:center;justify-content:center;padding:30px;animation:fade .15s ease}.modal{width:min(590px,100%);max-height:90vh;overflow:auto;background:var(--raised);border:1px solid #a48b58;border-radius:5px;box-shadow:7px 9px 0 #14100bb3;scrollbar-width:thin;scrollbar-color:#b7a17a transparent}.modal.wide{width:min(760px,100%)}.modal-header{padding:23px 27px 20px;border-bottom:1px solid #d4c39c;display:flex;align-items:flex-start;justify-content:space-between;gap:15px;background:#eee3c7}.modal-header .eyebrow{font-size:8px;margin-bottom:9px}.modal-header h2{font-size:28px;line-height:1.2}.modal-header .icon-button{margin-top:2px}.modal-body{padding:25px 27px}.modal-body>p{font-size:14px;line-height:1.8;margin:15px 0}.modal-body>p:first-child{margin-top:0}.modal-footer{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:12px;padding:17px 27px 21px;background:#eee3c7;border-top:1px solid #d4c39c}.quest-intro{font-size:16px!important}.quest-objective{background:#e9dfc2;border:1px solid #d0bd91;padding:17px 19px;margin:20px 0 25px}.quest-objective p{font-size:15px;margin-top:8px;color:#524527}.checklist{display:flex;flex-direction:column;gap:0;margin:15px 0 22px}.checklist label{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #e2d6b7;font-size:14px;cursor:pointer}.checklist input{width:18px;height:18px;accent-color:var(--green);flex-shrink:0}.input-label{display:block;font-family:var(--sans);font-size:11px;font-weight:600;margin-bottom:9px}.input-label span{font-size:9px;color:#a18a5e;margin-left:8px;font-weight:400}.resource-link{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--accent);text-decoration:none;margin-top:20px;padding:12px 0;border-bottom:1px solid #daccaa}.resource-link .icon{width:16px;height:16px}.resource-link>.icon:last-child{margin-left:auto}.modal-body>.small-copy{font-size:11px}.evidence{margin:18px 0;padding:17px;background:#ece2c6;border-left:3px solid #a78c4b}.evidence p{font-style:italic;font-size:14px;line-height:1.8;margin:11px 0}.evidence footer{font-family:var(--sans);font-size:10px;color:#99805a;line-height:1.6}.comparison{display:flex;align-items:center;gap:20px;justify-content:center;margin:25px 0}.comparison>div{background:#e9ddba;border:1px solid #c3ab73;padding:18px;flex:1;text-align:center}.comparison small{font-family:var(--sans);font-size:9px;letter-spacing:.1em;color:#8e703a;display:block}.comparison strong{font-family:var(--sans);font-size:42px;display:block;color:#8e6721}.comparison strong span{font-size:11px;color:#907a4e;margin-left:7px;font-weight:400}.impact-list p{display:flex;align-items:flex-start;gap:9px;font-size:12px;margin:13px 0}.impact-list .icon{width:15px;height:15px;color:#997b39;margin-top:3px}.preview-chapter{margin:20px 0;border-top:1px solid #d5c5a0;padding-top:20px}.preview-chapter h3{margin:8px 0 10px}.preview-chapter p{font-size:13px}.preview-chapter ul{padding-left:18px;font-size:13px}.preview-chapter li{margin:8px 0}.preview-chapter small{font-family:var(--sans);font-size:10px;color:#9a8050}.large-seal{display:flex;width:80px;height:80px;border:2px solid #b99a50;border-radius:50%;align-items:center;justify-content:center;margin:0 auto 23px;color:#9e7d2b;background:#eee0b8}.large-seal .icon{width:38px;height:38px}.journey-options{display:flex;flex-direction:column;gap:10px;margin:20px 0}.journey-options button{display:flex;align-items:center;gap:13px;width:100%;background:#eee3c7;border:1px solid #cbbb91;padding:15px;border-radius:3px;text-align:left}.journey-options button>span{color:var(--domain-color);width:35px}.journey-options button>div{flex:1}.journey-options strong{display:block;font-size:16px}.journey-options small{font-size:11px;color:#8e7850}.journey-options button>.icon:last-child{width:16px;color:var(--domain-color)}#schedule-form select{width:100%;margin-bottom:15px}#schedule-form .btn{margin-top:19px}#toast{position:fixed;bottom:24px;left:calc(50% + 80px);transform:translate(-50%,20px);max-width:calc(100vw - 30px);z-index:150;background:#25281c;color:#f7ecd3;padding:14px 21px;box-shadow:3px 4px 0 #a78b4a;border:1px solid #8b7b4b;border-radius:3px;font-size:13px;display:flex;align-items:center;gap:10px;opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}#toast.visible{opacity:1;transform:translate(-50%,0)}#toast .icon{color:#bbce95;width:18px;height:18px}
@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes pulse{50%{opacity:.3}}.reduced-motion *{animation:none!important;transition:none!important;scroll-behavior:auto!important}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
@media(min-width:1600px){main{padding-left:48px;padding-right:48px}.hero{padding:42px;gap:40px}.hero-art{height:330px}.hero h1{font-size:51px}.graph-layout{grid-template-columns:minmax(0,1fr) 330px}.chat-layout{grid-template-columns:minmax(0,1fr) 300px}.graph-viewport{height:680px}.domain-card{padding:23px 19px}.domain-card strong{font-size:18px}.quest-card{padding:24px}.chat-transcript{height:610px}}
@media(max-width:1200px){:root{--sidebar:192px}.topbar{padding:0 19px}.topbar-center{display:none}.brand{width:240px}.sidebar{padding-left:12px;padding-right:12px}.nav-link{font-size:14px;padding-left:11px;gap:10px}.nav-new{font-size:7px}.chronicle{padding-left:10px}.chronicle h3{font-size:23px}main{padding-left:25px;padding-right:25px}.hero{padding:27px 24px;gap:22px;grid-template-columns:1.15fr 1fr}.hero h1{font-size:35px}.hero-art{height:254px}.hero-copy>p{font-size:13px}.hero .btn{font-size:11px;padding:10px 12px}.domain-grid{gap:10px}.domain-card{padding:15px 11px 10px}.domain-card strong{font-size:13px}.domain-card small{font-size:9px}.graph-layout{grid-template-columns:minmax(0,1fr) 245px;gap:18px}.dossier{padding:19px 16px}.dossier h2{font-size:25px}.chat-layout{grid-template-columns:minmax(0,1fr) 235px;gap:18px}.chat-transcript{padding:22px 19px}.graph-filters{flex-wrap:wrap}.graph-filters select{max-width:100%;width:100%}.rank-grid{gap:12px}.rank-card{padding:21px 10px 15px}.rank-card h3{font-size:15px}.quest-card{flex-wrap:wrap}.quest-rune{display:none}.quest-action{margin-left:0}.quest-copy{min-width:240px}.stat-number{font-size:43px}.stat-card{padding:20px}.stat-number small{font-size:10px}.stat-number .badge{font-size:8px}.settings-layout{gap:19px}.settings-panel{padding:22px}.memory-form{flex-direction:column}.memory-form input{width:100%}.page-heading h1{font-size:36px}.page-heading p{font-size:13px}}
@media(max-width:1050px){.hero{grid-template-columns:1fr}.hero-copy h1 br{display:none}.hero-copy h1{font-size:40px;max-width:520px}.hero-art{height:220px;transform:rotate(.4deg);grid-row:2}.hero-art img{object-position:50% 55%}.hero-copy>p{max-width:none}.hero-footnote{display:none}.hero h1{margin-top:13px}.graph-layout{grid-template-columns:1fr}.detail-column{display:grid;grid-template-columns:1fr 1fr}.detail-column>.dossier{grid-column:1/-1}.dossier .detail-emblem{display:none}.dossier>p{margin:12px 0}.graph-viewport{height:600px}.chat-layout{grid-template-columns:1fr}.chat-aside{display:none}.rank-grid{grid-template-columns:repeat(3,1fr)}.domain-grid{grid-template-columns:repeat(5,1fr)}.domain-card strong{font-size:12px}.domain-card small{display:none}.domain-card .domain-bottom{margin-top:12px;font-size:8px}.settings-layout{grid-template-columns:1fr}.settings-panel{padding:25px}.memory-form{flex-direction:row}.memory-form input{width:0}.two-columns{grid-template-columns:1fr}.wisdom{flex-wrap:wrap}.wisdom .btn{margin-left:59px;padding-top:0}.page-heading{flex-wrap:wrap}.heading-actions{margin-left:auto}.stat-number .badge{display:none}.stats-grid{gap:18px}.goal-strip{flex-wrap:wrap;gap:8px 12px}.goal-strip strong{font-size:13px}.goal-version{font-size:10px}}
@media(max-width:760px){:root{--header:62px;--sidebar:0px}.topbar{padding:0 14px;gap:10px}.mobile-menu{display:inline-flex!important;color:#d7bd77;width:28px}.brand{width:auto;gap:8px;margin-right:auto}.brand img{width:29px;height:29px}.brand strong{font-size:11px;letter-spacing:.08em}.brand small{font-size:9px}.profile-mini{padding-left:0;border:0;gap:8px}.profile-mini img{width:29px;height:29px}.profile-mini strong{font-size:12px}.profile-mini small{font-size:8px}.topbar-right{gap:8px}.demo-indicator{display:none}.sidebar{width:230px;transform:translateX(-100%);transition:transform .2s;box-shadow:10px 0 30px #17130950}.sidebar.open{transform:translateX(0)}.sidebar .chronicle{padding-top:8px;padding-bottom:15px}.sidebar-bottom{padding-top:12px}.sidebar-quote{display:none}.sidebar .nav-link{font-size:15px}.sidebar .new-journey-btn{font-size:13px}main{margin-left:0;padding:calc(var(--header) + 18px) 17px 0}.page-kicker{font-size:8px;margin-bottom:18px}.page-kicker>span:last-child{display:none}.goal-strip{padding:11px 12px;margin-bottom:19px}.goal-strip strong{flex:1}.goal-strip .badge.sample{display:none}.goal-version{display:none}.hero{padding:26px 21px;gap:24px;margin-bottom:19px}.hero-copy h1{font-size:36px;line-height:1.08;margin:15px 0}.hero-copy>p{font-size:13px;line-height:1.75}.hero .eyebrow{font-size:8px}.hero .button-row{margin-top:20px}.hero .btn{font-size:11px;min-height:40px}.hero-art{height:210px}.desktop-only{display:none}.stats-grid{gap:14px;margin-bottom:28px}.stat-card{padding:16px 13px}.stat-head .eyebrow{font-size:8px;letter-spacing:.08em}.stat-head>.icon{width:18px;height:18px}.stat-number{font-size:38px;margin:12px 0;gap:8px;flex-wrap:wrap}.stat-number>span:not(.badge){font-size:9px}.stat-number>strong{font-size:17px}.stat-number small{display:none}.stat-number>strong small{font-size:6px;display:block}.stat-caption{font-size:8px;flex-wrap:wrap;gap:3px}.stat-caption>span{display:none}.week-strip{gap:3px;flex-wrap:nowrap}.week-strip span{flex-direction:column;gap:0;font-size:7px;padding:2px 0}.week-strip b{font-size:10px}.section-title h2{font-size:25px}.section-title .eyebrow{font-size:8px}.section-title>.btn{font-size:10px;max-width:100px;text-align:right;gap:4px}.domain-grid{grid-template-columns:repeat(3,1fr);gap:11px}.domain-card{padding:14px 12px 10px}.domain-card strong{font-size:14px;min-height:36px}.domain-card .domain-bottom{font-size:8px}.domain-card:nth-child(4),.domain-card:nth-child(5){grid-column:span 1}.domain-icon{margin-bottom:10px}.domain-section{margin-bottom:29px}.quest-heading{flex-wrap:wrap}.quest-heading .button-row{margin-left:0}.quest-heading p{font-size:11px}.quest-card{padding:18px 16px;gap:15px}.quest-copy{min-width:0;width:100%;flex-basis:100%}.quest-copy h3{font-size:20px}.quest-copy p{font-size:12px}.quest-action{width:100%;display:flex;justify-content:flex-end}.quest-card.completed .quest-action{display:none}.quest-card.in-progress{padding-left:13px}.quest-card .meta{gap:7px;font-size:10px}.wisdom{padding:20px 17px;gap:12px}.wisdom>div{flex:1}.wisdom p{font-size:14px}.wisdom .eyebrow{font-size:8px}.wisdom-icon{font-size:33px}.wisdom .btn{margin-left:44px}.page-footer{font-size:7px;margin-top:30px;padding:18px 0;align-items:center}.page-footer span:last-child{font-size:10px}.page-heading h1{font-size:34px;margin:10px 0}.page-heading .eyebrow{font-size:8px}.page-heading p{font-size:13px}.page-heading{gap:12px;margin-bottom:22px}.heading-actions{margin-left:0}.heading-actions>.btn{font-size:11px}.branch-tabs{gap:6px;margin-bottom:17px}.branch-tabs button{font-size:10px;padding:8px 10px;min-height:33px;gap:5px}.branch-tabs .icon{width:13px!important;height:13px!important}.graph-panel{padding:10px}.graph-tools{gap:7px}.segmented button{font-size:9px;padding:7px 9px}.zoom-controls button{width:29px;height:29px}.graph-filters select{width:auto;max-width:135px;font-size:9px}.graph-viewport{height:420px}.graph-legend{font-size:8px;gap:7px}.graph-layout{gap:20px}.dossier{padding:21px}.dossier h2{font-size:28px}.detail-column{display:flex}.graph-node:focus-visible{outline-offset:9px}.proposal-banner{padding:15px;flex-wrap:wrap;gap:12px}.proposal-banner strong{font-size:14px}.proposal-banner p{font-size:12px}.goal-strip select{font-size:13px;width:100%;flex-basis:65%}.expedition-footer{font-size:10px;gap:12px;padding:16px}.chapter-list{padding:5px;min-height:420px}.chapter-row{padding:19px 4px;gap:10px}.chapter-row h3{font-size:19px}.chapter-numeral{font-size:24px;width:32px}.chat-topline{padding:13px 15px;gap:9px}.chat-topline strong{font-size:16px}.chat-topline small{font-size:8px}.chat-online{font-size:8px}.chat-topline .icon-button{display:none}.chat-transcript{height:470px;padding:23px 16px}.message{max-width:100%;margin-bottom:21px}.message.user{max-width:92%}.message-bubble{padding:14px;font-size:13px;line-height:1.8}.message-by{font-size:10px}.chat-input-area{padding:15px 13px 10px}.prompt-chips button{font-size:9px;padding:5px 8px}.composer-bottom small{font-size:7px;max-width:120px}#chat-input{font-size:13px}.composer-bottom .btn{font-size:10px}.chat-disclaimer{font-size:7px}.draft-card{padding:14px;margin-left:-5px;margin-right:-5px}.draft-card h2{font-size:23px}.draft-card .eyebrow{font-size:7px}.mini-roadmap{gap:7px}.mini-roadmap>div{padding:8px;grid-template-columns:17px 1fr;gap:4px}.mini-roadmap span{width:16px;height:16px;font-size:8px}.mini-roadmap strong{font-size:10px}.draft-card .button-row{gap:9px}.progress-hero{padding:20px;grid-template-columns:80px 1fr;gap:17px}.portrait-frame{min-height:100px;align-self:start;padding:2px;border-width:3px}.portrait-frame img{height:110px}.progress-hero h2{font-size:25px;margin:9px 0}.progress-hero>.portrait-frame+div>.eyebrow{font-size:8px}.progress-hero p{font-size:11px}.progress-metrics{gap:19px;margin:18px 0}.progress-metrics strong{font-size:26px}.progress-metrics span{font-size:8px;line-height:1.2;display:block}.progress-hero .small-copy{font-size:8px}.rank-grid{grid-template-columns:repeat(2,1fr);gap:15px}.rank-card{padding:21px 15px}.rank-card h3{font-size:17px}.rank-card p{font-size:11px}.rank-card .btn{font-size:11px}.settings-panel{padding:22px 19px}.settings-panel h2{font-size:23px}.settings-panel .section-title{flex-wrap:wrap}.setting-row strong{font-size:13px}.setting-row small{font-size:11px}.setting-row .btn{font-size:9px}.memory-form{flex-direction:column}.memory-form input{width:100%}.modal-backdrop{padding:12px}.modal{max-height:94dvh}.modal-header{padding:20px}.modal-header h2{font-size:25px}.modal-body{padding:20px}.modal-footer{padding:16px 20px;gap:10px}.modal-footer .btn{font-size:11px;padding:10px 12px}.modal-body>p{font-size:13px}.quest-intro{font-size:14px!important}.checklist label{font-size:13px}.comparison{gap:12px}.comparison>div{padding:12px 9px}.comparison strong{font-size:35px}.comparison strong span{font-size:9px}.comparison small{font-size:8px}.impact-list p{font-size:11px;flex-wrap:wrap}.journey-options strong{font-size:15px}.journey-options small{font-size:10px}#toast{left:50%;width:max-content;max-width:calc(100vw - 30px);font-size:12px;padding:12px 16px;bottom:17px}.empty-state{padding:40px 20px}}
@media(max-width:380px){.brand small{display:none}.profile-mini span{display:none}.hero-copy h1{font-size:31px}.hero{padding:24px 16px}.hero-art{height:175px}.stats-grid{grid-template-columns:1fr}.domain-grid{grid-template-columns:1fr 1fr}.stat-number small{display:block}.stat-number{flex-wrap:nowrap}.graph-filters{flex-direction:column}.graph-filters select{max-width:none;width:100%}.rank-grid{grid-template-columns:1fr 1fr}.progress-hero{grid-template-columns:1fr}.portrait-frame{display:none}.chat-online{display:none}}
.sample-browser{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 20px;margin-bottom:18px;border:1px solid #cbbb95;background:#ece1c3;border-radius:3px}.sample-browser p{font-size:12px;margin-top:5px}.sample-browser select{min-width:300px;font-size:12px;background:#f8f0da}.graph-pagination{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0 13px;font-family:var(--sans);font-size:10px;color:#88714b}.graph-pagination>div{display:flex;gap:9px}.graph-pagination .btn{box-shadow:none;font-size:10px;min-height:29px;padding:6px 9px}.topic-tags{display:flex;gap:6px;flex-wrap:wrap;margin:13px 0 16px}.topic-tags .badge{white-space:normal;font-size:10px}.chapter-list{max-height:650px;overflow:auto;scrollbar-width:thin}.chapter-row p{line-height:1.6}.dossier .chapter-quests{max-height:430px;overflow:auto;scrollbar-width:thin}.mini-roadmap{max-height:330px;overflow:auto;padding-right:4px;scrollbar-width:thin}.domain-grid,.rank-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.graph-tools select{max-width:100%}.roadmap-node>strong{font-size:16px;max-width:220px}.roadmap-node{width:230px}.branch-node{width:210px}.branch-node>strong{font-size:16px;max-width:200px}
@media(min-width:1600px){.domain-grid{grid-template-columns:repeat(7,minmax(0,1fr))}.domain-card strong{font-size:15px}.sample-browser select{min-width:360px}}
.expansive-layout{grid-template-columns:minmax(0,1fr)!important}.expansive-layout>.detail-column{display:grid;grid-template-columns:minmax(0,2fr) minmax(230px,1fr);gap:24px;align-items:start}.expansive-layout .graph-viewport{height:850px}.graph-node.atlas-branch{width:250px}.atlas-branch strong{font-size:29px!important;background:#f5ecd5;padding:7px 12px!important}.atlas-branch .node-caption{font-size:19px}.atlas .node-orb{width:85px;height:85px}.atlas .atlas-leaf .node-orb{width:38px;height:38px}.atlas .atlas-leaf strong{font-size:19px;max-width:190px}.atlas:not(.zoom-detail) .atlas-leaf strong,.atlas:not(.zoom-detail) .atlas-leaf .node-caption{visibility:hidden}.atlas-core{width:380px!important}.atlas-core strong{font-size:35px!important}.atlas-core .node-caption{font-size:24px}.cross-link{opacity:.4}.atlas .graph-lines path{stroke-width:4}.graph-topic-label,.module-map-label{position:absolute;transform:translateX(-50%);text-align:center;max-width:380px;width:380px;color:#77633f;font-family:var(--sans);font-size:16px;pointer-events:none}.module-map-label{font-family:var(--body);font-size:25px;font-weight:bold;background:#eee1be;padding:8px;border:1px solid #c4ad7a}.graph-node.branching-node{width:360px}.branching-node strong{font-size:25px!important}.branching-node .node-caption{font-size:16px}.pathway-note{background:#eee3c5;border-left:3px solid #96711d;padding:14px;margin:18px 0;font-size:13px}.pathway-note p{font-size:13px!important;margin:7px 0}.pathway-note small{color:#77633f}.journey-options,.chat-topics{max-height:600px;overflow:auto}.branch-tabs{flex-wrap:wrap;max-height:160px;overflow:auto}.expansive-layout .chapter-quests{max-height:390px}.domain-atlas .graph-node strong{font-size:21px}.domain-atlas .node-caption{font-size:15px}
````

## File: src/ui.js
````javascript
export const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths={
 book:'M4 3h6a3 3 0 0 1 3 3v15a4 4 0 0 0-4-2H3V3h1Zm9 3a3 3 0 0 1 3-3h5v16h-5a4 4 0 0 0-3 2',
 tree:'M12 3v6M5 15v-4h14v4M3 15h4v5H3zM10 2h4v4h-4zM17 15h4v5h-4zM12 11v5M10 16h4v5h-4z',
 compass:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM16 8l-3 5-5 3 3-5 5-3Z',
 spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4M18 4h4',
 chart:'M4 3v17h17M7 14l4-5 4 3 6-7',
 settings:'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
 arrow:'M4 12h16m-6-6 6 6-6 6',
 chevron:'m9 5 7 7-7 7',
 check:'m5 12 4 4L19 6',
 clock:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 7v5l3 2',
 flag:'M5 21V4m0 0c5-4 9 4 14 0v10c-5 4-9-4-14 0',
 trophy:'M8 3h8v7a4 4 0 0 1-8 0V3Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 2v6m-4 1h8',
 flame:'M12 2c2 5-3 6 0 10 1-3 4-4 5-6 6 9 2 16-5 16S1 15 6 9c0 4 2 4 2 4-1-5 4-6 4-11Z',
 code:'m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20',
 coffee:'M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Zm13 1h2a3 3 0 0 1 0 6h-2M7 2v3m4-3v3m4-3v3M3 23h16',
 layers:'m12 2 10 5-10 5L2 7l10-5ZM2 12l10 5 10-5M2 17l10 5 10-5',
 search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-2 5 6 6',
 plus:'M12 5v14M5 12h14',minus:'M5 12h14',
 fit:'M9 3H3v6m12-6h6v6M3 15v6h6m6 0h6v-6',
 list:'M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01',
 close:'m6 6 12 12M6 18 18 6',
 send:'m22 2-7 20-4-9L2 9l20-7Zm0 0L11 13',
 shield:'m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Zm-4 10 3 3 5-6',
 reset:'M3 10a9 9 0 1 1 2 8M3 4v6h6',
 leaf:'M20 3C7 0 0 12 8 18c6 5 14-2 12-15ZM4 21 16 9',
 star:'m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z',
 info:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM12 11v6M12 7h.01',
 external:'M14 3h7v7m0-7L10 14M10 3H4v17h17v-6',
 menu:'M3 6h18M3 12h18M3 18h18',
 moon:'M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12Z',
 pen:'m15 3 6 6-12 12H3v-6L15 3ZM12 6l6 6',
 trash:'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
 lock:'M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4',
 heart:'M12 21 3 12C-3 3 8-1 12 6c4-7 15-3 9 6l-9 9Z'
};
export function icon(name,cls=''){return `<svg class="icon ${cls}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.spark}"/></svg>`;}
export const btn=(label,action,options={})=>`<button class="btn ${options.primary?'primary':''} ${options.class||''}" data-action="${action}" ${options.id?`data-id="${esc(options.id)}"`:''} ${options.disabled?'disabled':''}>${options.icon?icon(options.icon):''}${label}</button>`;
export const badge=(text,kind='')=>`<span class="badge ${kind}">${esc(text)}</span>`;
export const sectionHead=(eyebrow,title,description='',actions='')=>`<header class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${description?`<p>${description}</p>`:''}</div>${actions?`<div class="heading-actions">${actions}</div>`:''}</header>`;
export const progress=(value,color='')=>`<div class="progress-track" role="progressbar" aria-label="Progress" aria-valuenow="${Math.round(value)}" aria-valuemin="0" aria-valuemax="100"><span style="width:${Math.min(100,Math.max(0,value))}%;${color?`background:${color}`:''}"></span></div>`;
````

## File: tests/branches.test.mjs
````javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CONCEPTS} from '../src/data.js';
import {createRoadmap,createInitialState,hydrate,detectTrack} from '../src/state.js';
import {knowledgeGraph,roadmapGraph} from '../src/graph.js';
test('twenty direct branches have complete multi-domain curricula and chat routing',()=>{
 assert.equal(TRACKS.length,20);
 for(const id of ['esp32','sensors','iot','xiaozhi','psychology','ielts','badminton','fitness','habits']){
  const t=TRACKS.find(t=>t.id===id);assert.ok(t);assert.ok(t.modules.length>=8);assert.ok(t.concepts.length>=32);
  assert.equal(detectTrack(t.name),id);
 }
});
test('each roadmap is an acyclic branching graph with explicit dependencies',()=>{
 for(const t of TRACKS){
  const p=createRoadmap({trackId:t.id});
  assert.ok(p.chapters.some(c=>c.optional));
  assert.ok(p.chapters.every((c,i)=>Array.isArray(c.requires)&&c.requires.every(n=>n>=0&&n<i)));
  assert.ok(p.chapters.some((_,i)=>p.chapters.filter(c=>c.requires.includes(i)).length>1));
  const html=roadmapGraph(p,p.chapters.flatMap(c=>c.quests),0);
  for(let i=0;i<p.chapters.length;i++)assert.ok(html.includes(`data-id="${i}"`));
  assert.doesNotMatch(html,/NaN|undefined/);
 }
});
test('overview exposes all direct branches and concept leaves together',()=>{
 const html=knowledgeGraph(CONCEPTS,{});
 for(const t of TRACKS){assert.ok(html.includes(`data-id="${t.id}"`));assert.ok(html.includes(`data-id="${t.id}-0"`));}
 assert.ok(html.includes('cross-link'));assert.doesNotMatch(html,/NaN|undefined/);
});
test('catalog expansion preserves prior notes, XP and active journey',()=>{
 const s=createInitialState();s.catalogVersion=3;s.concepts=s.concepts.filter(c=>['python','java','js','dsa','oop','ai','rag'].includes(c.trackId));s.xp=431;s.quests[0].notes='Saved note';
 const migrated=hydrate(JSON.stringify(s));assert.equal(migrated.xp,431);assert.equal(migrated.activeId,s.activeId);assert.equal(migrated.quests[0].notes,'Saved note');assert.equal(migrated.concepts.length,CONCEPTS.length);
});
````

## File: tests/curriculum.test.mjs
````javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {TRACKS,CONCEPTS} from '../src/data.js';
import {createRoadmap,createInitialState,hydrate,respondToChat} from '../src/state.js';
import {roadmapGraph,knowledgeGraph} from '../src/graph.js';
test('expanded tracks cover distinct concepts with chapter-specific activities',()=>{
  for(const id of ['java','dsa','python','oop','ai','rag','js']){
    const t=TRACKS.find(t=>t.id===id);assert.ok(t,`Missing ${id}`);
    assert.ok(t.concepts.length>=28,`${id} needs deeper concept coverage`);
    const p=createRoadmap({trackId:id,minutes:30});assert.ok(p.chapters.length>=8);
    assert.ok(p.chapters.every(c=>c.topics?.length>=3&&c.summary&&c.quests.length>=4));
    for(const topic of t.concepts)assert.ok(p.chapters.some(c=>c.topics.includes(topic)),`${id}: ${topic}`);
    assert.equal(new Set(p.chapters.map(c=>c.quests.at(-1).prompt)).size,p.chapters.length);
    assert.ok(p.chapters.every(c=>c.quests.every(q=>q.minutes<=30)));
  }
});
test('JavaScript and AI chat create their own plans rather than Java or RAG',()=>{
  for(const [prompt,id] of [['I want to learn JS','js'],['Learn JavaScript','js'],['Learn AI and machine learning','ai'],['Build a RAG chatbot','rag']]){
    let s=respondToChat(createInitialState(),prompt);assert.equal(s.builder.trackId,id);
    s=respondToChat(s,'I know the basics');s=respondToChat(s,'30 minutes a day');
    assert.equal(s.draft.trackId,id);assert.match(s.messages.at(-1).text,new RegExp(`${s.draft.chapters.length} chapters`));
    assert.equal(hydrate(JSON.stringify(s)).draft.trackId,id);
  }
});
test('later roadmap chapters and concepts have finite visible graph coordinates',()=>{
  const p=createRoadmap({trackId:'java',minutes:30});
  const html=roadmapGraph(p,p.chapters.flatMap(c=>c.quests),p.chapters.length-1);
  assert.doesNotMatch(html,/undefined|NaN/);assert.match(html,new RegExp(`data-id="${p.chapters.length-1}"`));
  const concepts=CONCEPTS.filter(c=>c.trackId==='java');
  const graph=knowledgeGraph(CONCEPTS,{track:'java',page:Math.floor((concepts.length-1)/6)});
  assert.ok(graph.includes(concepts.at(-1).id));assert.doesNotMatch(graph,/top:-\d/);
});
test('an older save upgrades its catalog without losing notes, XP, or quest history',()=>{
  const s=createInitialState();s.catalogVersion=1;s.xp=333;s.quests[0].notes='Keep this work';
  const oldId=s.quests[0].id;s.journeys[0].chapters=s.journeys[0].chapters.slice(0,4);
  s.quests=s.quests.filter(q=>q.chapter<4);s.concepts=s.concepts.filter(c=>['python','dsa','java','oop','rag'].includes(c.trackId)).slice(0,30);
  const next=hydrate(JSON.stringify(s));assert.equal(next.xp,333);assert.equal(next.quests.find(q=>q.id===oldId).notes,'Keep this work');assert.ok(next.journeys[0].chapters.length>=8);assert.ok(next.concepts.some(c=>c.trackId==='js'));
});
test('migration keeps new topics when legacy activity IDs collide',()=>{
  const s=createInitialState();s.catalogVersion=1;
  const q=s.quests[0];q.topic='Legacy topic';q.title='Legacy activity';q.notes='Retain me';
  const next=hydrate(JSON.stringify(s));
  const topics=TRACKS.find(t=>t.id===q.trackId).concepts;
  for(const topic of topics)assert.ok(next.quests.some(x=>x.journeyId===q.journeyId&&x.topic===topic),topic);
  assert.equal(next.quests.find(x=>x.id===q.id).notes,'Retain me');
  assert.equal(new Set(next.quests.map(x=>x.id)).size,next.quests.length);
});
````

## File: tests/state.test.mjs
````javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState, createRoadmap, activateRoadmap, completeQuest, proposeSchedule, applyProposal, hydrate, respondToChat,settleChat} from '../src/state.js';
import {todayPage,knowledgePage} from '../src/pages.js';
test('completing a quest awards XP once, preserves rank and original state', () => {
  const state = createInitialState();
  const ranks = structuredClone(state.ranks);
  const next = completeQuest(state, 'seed-embeddings');
  assert.equal(next.xp, 270);
  assert.equal(state.xp, 250);
  assert.equal(next.quests.find(q => q.id === 'seed-embeddings').status, 'completed');
  assert.deepEqual(next.ranks, ranks);
  assert.equal(completeQuest(next, 'seed-embeddings').xp, 270);
});
test('daily reward cap limits XP without blocking completion', () => {
  const state = createInitialState(); state.dailyXp = 115;
  const next = completeQuest(state, 'seed-embeddings');
  assert.equal(next.xp, 255);
  assert.equal(next.dailyXp, 120);
  assert.equal(next.quests.find(q => q.id === 'seed-embeddings').status, 'completed');
});
test('five goal templates generate distinct plans with bounded sessions', () => {
  const titles = new Set();
  for (const trackId of ['python','dsa','java','oop','rag']) {
    const plan = createRoadmap({trackId, experience:'beginner', minutes:30});
    titles.add(plan.title);
    assert.equal(plan.trackId, trackId);
    assert.equal(plan.minutes, 30);
    assert.ok(plan.chapters.length >= 4);
    assert.ok(plan.chapters.every(c=>c.quests.every(q=>q.minutes<=30)));
  }
  assert.equal(titles.size, 5);
});
test('roadmap activation is explicit and idempotent, preserving old quests and XP', () => {
  const state = createInitialState();
  const plan = createRoadmap({trackId:'java',experience:'beginner',minutes:30});
  assert.equal(state.journeys.length, 1);
  const next = activateRoadmap(state,plan);
  assert.equal(next.journeys.length, 2);
  assert.equal(next.activeId,plan.id);
  assert.equal(next.xp,250);
  assert.ok(next.quests.some(q=>q.id==='seed-embeddings'));
  assert.equal(activateRoadmap(next,plan).journeys.length,2);
});
test('schedule preview does not mutate active plan; apply preserves in-progress quest', () => {
  const state = createInitialState();
  const proposed = proposeSchedule(state,30);
  assert.equal(proposed.journeys[0].minutes,60);
  assert.equal(proposed.proposal.minutes,30);
  const next = applyProposal(proposed);
  assert.equal(next.journeys[0].minutes,30);
  assert.equal(next.journeys[0].version,2);
  assert.deepEqual(next.quests.find(q=>q.id==='seed-embeddings'),state.quests.find(q=>q.id==='seed-embeddings'));
  assert.equal(next.proposal,null);
  assert.equal(next.xp,250);
});
test('invalid or obsolete storage returns usable seed; valid state round-trips', () => {
  for(const raw of ['bad json','null','{}','{"version":1}', '{"schema":3,"quests":null}']) {
    assert.equal(hydrate(raw).xp,250);
  }
  const state = completeQuest(createInitialState(),'seed-embeddings');
  assert.equal(hydrate(JSON.stringify(state)).xp,270);
});
test('chat collects Java goal, background and time then offers a draft without activating', () => {
  let state = createInitialState();
  state = respondToChat(state,'I want to learn Java from scratch');
  assert.equal(state.builder.trackId,'java');
  assert.equal(state.builder.stage,'experience');
  state = respondToChat(state,'I am a beginner');
  assert.equal(state.builder.stage,'time');
  state = respondToChat(state,'30 minutes a day');
  assert.equal(state.draft.trackId,'java');
  assert.equal(state.draft.minutes,30);
  assert.equal(state.journeys.length,1);
});
test('unsupported chat topic has an honest fallback and does not create a plan', () => {
  const state = respondToChat(createInitialState(),'Teach me medieval pottery');
  assert.equal(state.draft,null);
  assert.match(state.messages.at(-1).text,/demo/i);
});
test('invalid study duration cannot create a roadmap', () => {
  assert.throws(()=>createRoadmap({trackId:'java',experience:'beginner',minutes:0}));
  assert.throws(()=>createRoadmap({trackId:'unknown',experience:'beginner',minutes:30}));
});
test('malformed nested saves recover before screen rendering',()=>{
  const variants=[s=>s.concepts=[],s=>s.concepts[0].status='invalid',s=>s.messages=[{}],s=>s.builder=null,s=>s.journeys[0].chapters=[],s=>s.preferences=null];
  for(const corrupt of variants){const s=createInitialState();corrupt(s);const safe=hydrate(JSON.stringify(s));assert.doesNotThrow(()=>knowledgePage(safe,{track:'all',search:'',filter:'all',concept:'python-0',view:'graph'}));assert.equal(safe.messages[0].role,'assistant');}
});
test('finished journey no longer assigns quests on Today',()=>{
  const s=createInitialState();s.journeys[0].status='completed';
  const html=todayPage(s);assert.doesNotMatch(html,/Continue Quest|Begin Quest/);assert.match(html,/journey complete/i);
});
test('schedule splits unstarted activities to fit budget without increasing XP',()=>{
  const s=createInitialState(),next=applyProposal(proposeSchedule(s,15));
  const planned=next.quests.filter(q=>q.journeyId===s.activeId&&q.status==='active');
  assert.ok(planned.every(q=>q.minutes<=15));
  assert.equal(next.quests.reduce((n,q)=>n+q.xp,0),s.quests.reduce((n,q)=>n+q.xp,0));
});
test('a delayed chat preserves a journey activated while it was replying',()=>{
  const base=createInitialState();base.draft=createRoadmap({trackId:'java',minutes:30});base.builder={stage:'ready',trackId:'java'};
  const response=respondToChat(base,'Explain Java');
  const current=activateRoadmap(base,base.draft);current.preferences.streak=false;
  const result=settleChat(current,base,response);
  assert.equal(result.journeys.length,2);assert.equal(result.draft,null);assert.equal(result.preferences.streak,false);assert.equal(result.builder.stage,'goal');assert.match(result.messages.at(-1).text,/class/);
});
````

## File: .gitignore
````
dist/
node_modules/
*.log
````

## File: index.html
````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#19170f"><meta name="description" content="LifeOS Grimoire — turn curiosity into an adventure. Interactive learning demo.">
  <link rel="icon" href="/assets/crest.png"><link rel="stylesheet" href="/src/styles.css">
  <title>LifeOS · Your learning grimoire</title>
</head>
<body><a class="skip-link" href="#main">Skip to content</a><div id="app"></div><div id="modal-root"></div><div id="toast" role="status" aria-live="polite"></div><script type="module" src="/src/app.js"></script></body>
</html>
````

## File: package.json
````json
{
  "name": "lifeos-grimoire-demo",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "start": "node server.mjs",
    "dev": "node server.mjs",
    "test": "node --test tests/*.test.mjs",
    "build": "node scripts/build.mjs"
  },
  "engines": { "node": ">=20" }
}
````

## File: README.md
````markdown
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
````

## File: server.mjs
````javascript
import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
const server=http.createServer(async(req,res)=>{
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
    const url=new URL(req.url,'http://localhost');const pathname=decodeURIComponent(url.pathname);
    if(pathname!=='/'&&pathname!=='/index.html'&&!/^\/(src|assets)\//.test(pathname)){res.writeHead(404);res.end('Not found');return;}
    const file=path.resolve(root,pathname==='/'?'index.html':'.'+pathname);
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if(!(await stat(file)).isFile())throw new Error('not a file');
    const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`LifeOS Grimoire is ready at http://localhost:${port}`));
server.on('error',err=>{console.error(err.message);process.exitCode=1;});
````
