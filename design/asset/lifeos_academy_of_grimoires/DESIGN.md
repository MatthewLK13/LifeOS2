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