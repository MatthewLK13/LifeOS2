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