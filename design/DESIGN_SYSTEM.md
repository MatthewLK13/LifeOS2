# LifeOS2 V2 Design System

Status: production-ready design specification; implementation pending

## 1. Design principles

1. **Evidence before decoration** — show what is known, how strong it is, and what is missing.
2. **One useful next step** — every major view has one clear primary action.
3. **Calm density** — support long daily use with hierarchy, whitespace, and predictable rhythm.
4. **Explain the system** — recommendation rationale, confidence, freshness, and demo/account boundaries are visible.
5. **Progress without pressure** — XP, streaks, and rewards are never the primary meaning of learning.
6. **Stable interaction** — hover, focus, loading, and completion states must not cause layout jitter.
7. **Desktop-first, mobile-respectful** — preserve graph and comparison workflows while providing a usable single-column fallback.
8. **Semantic tokens only** — component CSS consumes semantic/component variables, not arbitrary hex values.

## 2. Token architecture

Use three layers inside the existing vanilla CSS system:

```text
primitive values → semantic purpose tokens → component tokens
```

### Primitive palette

| Token | Value | Role |
|---|---|---|
| `--primitive-bg` | `#F8FAFC` | application background |
| `--primitive-surface` | `#FFFFFF` | primary surface |
| `--primitive-surface-soft` | `#F2F6FC` | secondary surface |
| `--primitive-ink` | `#1F2A44` | primary text |
| `--primitive-muted` | `#667085` | secondary text |
| `--primitive-primary` | `#4F7DF3` | primary action |
| `--primitive-evidence` | `#2CB5A0` | positive/evidence signal |
| `--primitive-advisor` | `#8B7CF6` | advisor/AI signal |
| `--primitive-warning` | `#B7791F` | warning signal |
| `--primitive-error` | `#C24141` | error/destructive signal |
| `--primitive-border` | `#E4EAF2` | quiet separation |

Accessible text variants are allowed when a baseline accent is too light for normal text:

```css
--color-primary-text: #355DBD;
--color-evidence-text: #147C6E;
--color-advisor-text: #6758C9;
--color-warning-text: #8A5A00;
```

The baseline teal, purple, warning, and border colors must not be the sole indicator for normal text or control boundaries. Pair them with text, icons, shape, or stronger state tokens.

### Semantic tokens

```css
--color-bg: var(--primitive-bg);
--color-surface: var(--primitive-surface);
--color-surface-soft: var(--primitive-surface-soft);
--color-text: var(--primitive-ink);
--color-text-muted: var(--primitive-muted);
--color-primary: var(--primitive-primary);
--color-primary-text: #355DBD;
--color-evidence: var(--primitive-evidence);
--color-evidence-text: #147C6E;
--color-advisor: var(--primitive-advisor);
--color-advisor-text: #6758C9;
--color-warning: var(--primitive-warning);
--color-warning-text: #8A5A00;
--color-error: var(--primitive-error);
--color-border: var(--primitive-border);
--color-border-strong: #CBD5E1;
--color-focus: var(--color-primary-text);
```

### Component tokens

```css
--button-primary-bg: var(--color-primary);
--button-primary-fg: #FFFFFF;
--button-secondary-bg: var(--color-surface);
--button-border: var(--color-border-strong);
--input-bg: var(--color-surface);
--input-border: var(--color-border-strong);
--card-bg: var(--color-surface);
--card-border: var(--color-border);
--metric-value: var(--color-text);
--status-success: var(--color-evidence-text);
```

## 3. Typography

```css
--font-ui: 'Be Vietnam Pro', 'Segoe UI', Arial, sans-serif;
```

No external font request is required. System fallback is intentional for offline reliability.

| Role | Size | Weight | Line height |
|---|---:|---:|---:|
| Display/page title | 32–40px | 700–800 | 1.15 |
| Section title | 24px | 700 | 1.2 |
| Card title | 20px | 700 | 1.25 |
| Body | 16px | 400 | 1.5–1.6 |
| Supporting text | 14px | 400–500 | 1.45 |
| Label | 12px | 700 | 1.3 |
| Compact metadata | 12px | 500–700 | 1.3 |
| Numeric metric | 28–40px | 700–800 | 1.1 |

Avoid all blackletter, medieval, decorative serif, and fantasy display typography.

## 4. Spacing, radii, and elevation

### Spacing

Use a 4px base rhythm: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64px`.

- Control internal padding: 12–16px.
- Card padding: 16–24px.
- Section gap: 24–32px.
- Desktop page gutter: 32px.
- Tablet gutter: 24px.
- Mobile gutter: 16px.

### Radii

| Token | Value | Use |
|---|---:|---|
| `--radius-control` | 6px | inputs, buttons, compact controls |
| `--radius-card` | 10px | cards and panels |
| `--radius-large` | 14px | major sections and dialogs |
| `--radius-pill` | 999px | statuses and compact tags only |

### Shadows

Use restrained shadows only:

```css
--shadow-card: 0 1px 2px rgb(31 42 68 / 0.04), 0 4px 16px rgb(31 42 68 / 0.06);
--shadow-hover: 0 4px 12px rgb(31 42 68 / 0.10);
--shadow-dialog: 0 18px 50px rgb(31 42 68 / 0.18);
```

Do not use hard-offset parchment shadows, glow effects, grain, or decorative texture.

## 5. Iconography

- Continue using the existing inline SVG icon system in `src/ui.js`.
- Use one outline family with consistent 1.5–1.75px stroke weight.
- Standard sizes: 16px inline, 20px control, 24px prominent.
- Decorative icons use `aria-hidden="true"`.
- Icon-only controls require an accessible name and a minimum 44px hit area.
- Never use emoji as structural navigation or status icons.
- Icons supplement labels; they never carry the only meaning of a state.

## 6. Component specifications

### Buttons

| Variant | Appearance | Use |
|---|---|---|
| Primary | blue fill, white label | one main action per region |
| Secondary | white fill, strong border | adjacent alternative |
| Tertiary | transparent/quiet | low-emphasis action |
| Link | text + underline on hover | navigation or explanation |
| Destructive | error fill or outlined error | irreversible action |

- Default height: 40px; mobile and icon-only hit area: 44px minimum.
- Large action: 48px.
- Hover changes color/shadow, not layout dimensions.
- Active state darkens slightly and may translate at most 1px.
- Loading state preserves button width and uses `aria-busy="true"`.

### Inputs

- Always provide a visible label or equivalent accessible name.
- Default height: 40px; large text-entry control: 48px.
- Background: surface; border: strong border token.
- Focus: primary border plus 2px focus ring.
- Error: error border, `aria-invalid="true"`, inline message, and `aria-describedby`.
- Disabled: muted surface, muted text, no interaction.
- Preserve user input after validation or network failure.

### Cards

- White surface, 1px quiet border, 10px radius.
- Use header/content/footer anatomy where actions exist.
- Interactive cards must use a native button/link or contain one; do not make a generic article clickable.
- Card hover is subtle and must not shift surrounding content.

### Badges and statuses

- Use compact labels for evidence, readiness, confidence, freshness, and quest state.
- Status must include text and may include an icon/dot.
- Positive/evidence teal is not sufficient by color alone.
- Avoid excessive pill usage; use pills only for compact status metadata.

### Tabs

- Use native buttons with `aria-selected` and a tablist only when content panels are truly tabbed.
- Active state uses primary text, a clear underline or filled neutral background, and visible focus.
- On mobile, tabs may horizontally scroll but must not wrap into ambiguous rows.

### Navigation and sidebar

- Desktop: persistent sidebar plus compact top bar.
- Sidebar width target: 216–240px.
- Active route uses background tint, primary text, icon, and `aria-current="page"`.
- Do not add hidden legacy routes to visible navigation.
- Profile/account state belongs in the top bar and must accurately distinguish demo/offline/account modes.

### Mobile drawer/navigation

- Below 768px, use a slide-out drawer with a scrim.
- Toggle must expose `aria-expanded` and `aria-controls`.
- Move focus into the drawer on open and return it to the toggle on close.
- Close on Escape and scrim click.
- Do not place essential actions only inside a swipe gesture.

### Tables and lists

- Use semantic tables for comparable multi-column data.
- Text left aligned, numbers right aligned, statuses centered, actions right aligned.
- Default row height: 48px; compact: 40px; comfortable: 56px.
- On narrow screens, convert rows into stacked labeled blocks or provide a deliberate horizontal scroll region.
- Current gap rows and recommendation rows should retain clear labels even when they are not semantic tables.

### Dashboard metrics

- Metric card anatomy: label, value, context, optional progress indicator.
- One dominant metric per card.
- Do not use color alone to communicate metric health.
- Use numeric values with explicit units and supporting explanation.

### Recommendation cards

- Show action title, estimated time, evidence effect, recommendation type, and primary CTA.
- Recommended, quick-win, and challenge variants differ by label and border accent, not dramatic color blocks.
- “Why this?” opens a concise rationale with career relevance, gap, evidence need, time fit, and difficulty fit.

### Progress/readiness indicators

- Use semantic `progressbar` only for measurable percentage progress.
- Include visible percentage and descriptive label.
- Readiness without sufficient evidence must say “Insufficient evidence,” not imply a low score.
- Freshness, confidence, coverage, and mastery remain separate signals.

### Knowledge graph

- Canvas background: secondary surface with a faint, non-essential grid.
- Nodes: white cards with primary text, compact metadata, and one visible state label.
- Selected node: strong focus ring and primary border.
- Edges: semantic line styles and labels/legend; color is never the only distinction.
- Provide a list/search/filter alternative with equivalent access to every concept.
- Graph controls require accessible labels and keyboard alternatives.
- Avoid decorative orbits, fantasy maps, sigils, parchment, and unexplained visual metaphors.

### Dialogs

- Use small dialogs for confirmation, default dialogs for detail, large dialogs for forms/data.
- Required semantics: `role="dialog"`, `aria-modal="true"`, labelled title, optional description.
- Focus the first meaningful control, trap focus, close on Escape, restore focus on close, and make the background inert.
- Mobile dialogs use nearly full-screen layouts with safe padding.
- Footer order: secondary/cancel first, primary/confirm last.

## 7. Loading, empty, error, and validation states

### Loading

- Initial bootstrap: page-level status region or skeleton matching the final layout.
- Async button: preserve width, disable duplicate submission, expose `aria-busy`.
- Streaming chat: expose a live status without repeatedly moving focus.
- Do not use indefinite spinners without explanatory text.

### Empty

Every empty state has: what is empty, why it may be empty, and one next action. Cover no matching concepts, no evidence yet, no active campaign, and no recommendations.

### Error

- Inline errors for fields.
- Error summary at the top of multi-field forms.
- Network/API failures use an announced alert plus recovery action.
- Error copy explains whether state was changed or preserved.

### Validation

- Validate on submit and, where useful, after blur.
- Preserve submitted values.
- Link error messages with `aria-describedby`.
- Use `aria-invalid="true"` only while invalid.

## 8. Interaction states

State priority: disabled → loading → active → focus → hover → default.

- Transition colors and borders in 150ms.
- Transition elevation/transform in 180–200ms.
- Focus ring: 2px primary-text ring with 2px background offset.
- Disabled controls remain understandable and visibly inactive.
- Selected state must persist after rerender.
- Never make a state change depend on hover alone.

## 9. Responsive behavior

### 375px

- Single-column content with 16px gutters.
- Header shows menu, brand, and compact profile affordance.
- Drawer contains navigation and account status.
- Recommendation cards stack.
- Tables become labeled cards or scroll regions.
- Knowledge graph defaults to list/search access; graph remains available as a controlled scroll surface.

### 768px

- Drawer may remain available; content uses 20–24px gutters.
- Two-column layouts are allowed only when each column remains readable.
- Campaign and planner content stack before it becomes cramped.

### 1024px

- Compact persistent sidebar is acceptable.
- Detail panels may move below the primary graph/content region.
- Gap rows and metrics may reduce columns but should not hide labels.

### 1440px

- Persistent sidebar and full dashboard layout.
- Today supports readiness + gap panel and three recommendation cards.
- Knowledge supports graph/list plus detail context.
- Campaign supports progress, arcs, and quest nodes without excessive whitespace.
- Main content should remain readable rather than stretching indefinitely.

## 10. Accessibility rules

- Normal text contrast target: at least 4.5:1.
- Non-text control boundaries and focus indicators: at least 3:1.
- Never rely on color alone.
- All controls keyboard operable.
- Visible focus must not be removed without a stronger replacement.
- Focus must not be obscured by fixed header, drawer, toast, or dialog footer.
- Use native buttons, links, inputs, labels, fieldsets, and legends.
- Announce loading and errors appropriately.
- Keep password-manager and paste behavior intact in authentication flows.
- Respect text zoom and large text without clipping.
- Provide reduced-motion behavior.

## 11. Reduced motion

Honor `prefers-reduced-motion: reduce` and the existing user preference.

- Remove decorative animation and graph motion.
- Keep state changes immediate but still visually distinct.
- Do not disable focus transitions or status changes.
- Avoid auto-scrolling unless directly requested by the user.

## 12. Legacy-style isolation strategy

- V2 is the only active visual source of truth.
- Do not reuse legacy classes such as parchment, Grimoire, cover, rune, seal, mana, or fantasy-specific selectors in V2.
- During refactoring, put any retained legacy compatibility rules under an explicit `.legacy-ui` namespace or an isolated final section.
- Do not delete legacy behavior until route, test, and build dependencies are verified.
- Remove legacy selectors incrementally after the four V2 routes no longer import or render them.
- Historical design assets and old `code.html` prototypes remain documentation/reference only; they are not runtime dependencies.
