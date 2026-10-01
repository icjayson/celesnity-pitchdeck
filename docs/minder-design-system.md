Minder is Celesnity's AI workspace for plant and operations data. The system is near-neutral greys, tint instead of rules, a neutral call to action and the platform's own font. One blue does the pointing.

## Principles

- **Blue is the accent.** `primary-500` (#0075DE; `primary-400` in dark) carries links, focus and selection, and nothing else. Never fill a button with it.
- **The call to action stays neutral.** Solid buttons are `primary`: near-black in light, near-white in dark, with `primary-foreground` on top. Hover steps to `primary-hover`, a real ramp value, never an opacity.
- **Selection is tinted.** Hovered and selected rows, menu items, tabs and the active thread all use `accent`: 8% of the blue over white. One token, everywhere.
- **The ink is soft.** Text is `foreground` (#0D0D0D), never pure black.
- **Regions separate by tint, not by lines.** Page canvas `skin-canvas`, cards `card`, wells `muted`. Reach for a border only when tint is not enough.
- **Borders are alpha.** `border` is ink at 10%, `skin-line-soft` 5%, `input` 10%; in dark, white at 12–15%. One value works on any ground.

## Content

- Write plainly and briefly. Sentence case for every label, title and button ("Save changes", "Run details"), never Title Case.
- Name the thing and the action: "Run failed", "Routine saved", "Thread archived". A toast's second line says what to do next ("Retry, or narrow the time range").
- Show real state, never invented activity. A thinking card says "Thinking…" and the step actually running ("Querying `line_b.stops` · 4s"); with no step to name it says only "Thinking…".
- A control that does nothing yet is left out, not shown disabled.
- No emoji in UI copy.

## Colour

- Page: `skin-canvas` (#F9F9F9) behind white `card`s. Main chat column: `background`. Sidebar and threads rail: `sidebar`.
- Text: `foreground` for body, `muted-foreground` for descriptions and metadata. `skin-faint` (#8F8F8F) is below 4.5:1 on white: use it only for placeholders, disabled labels and axis ticks.
- Links: `skin-brand`; hover `skin-brand-active`.
- Status: each status has a wash, a hue and a text colour (`success-light` / `success` / `success-dark`, same for `warning`, `error`, `info`). Put `*-dark` text on the `*-light` wash. Always pair a status colour with an icon or a word.
- Destructive actions use `destructive`. Red never means "series 7" outside a chart.
- Dark is re-authored, not flipped: surfaces get lighter as they rise (`background` #0D0D0D, `muted` #181818, `card` #212121), and the accent moves to `primary-400`.

## Type

- One family: `sans`, the platform system stack (SF Pro, Segoe UI, Noto). No webfont. `mono` for dataset names, source chips and run output.
- Weights stop at 600. Headings are 600, labels 500, body 400; never 700.
- Default copy is `body-md` (16/24). Tables, menus and buttons use `body-sm` or `label` (14/20). Chat answers are 16px at 1.65 line height.
- Large headings (`heading-2` and up) track at -0.025em; `caption` and `micro` open to 0.025em.

## Space, shape, elevation

- Spacing is a 4px scale (`space-1` … `space-16`). Cards pad `space-6`; controls stack at `space-4`.
- Buttons, inputs and selects: 36px tall at `radius-lg` (10px); sizes 24, 32, 36 and 40. Cards: `radius-2xl` (16px). Menus, alerts, popovers: `radius-xl`. Pills, avatars, the send button: `radius-full`.
- A raised surface is the same colour plus `shadow-hairline` and one elevation step: resting card `shadow-100`, menu and base card `shadow-300`, modal `shadow-400`. `skin-shadow` bundles ring and step per theme.
- Focus: a 3px `ring` at 50% outside the control, border turning `ring`. Errors swap to `destructive` at 20%.

## Charts

- Use the `mchart-*` set for Minder charts, not `chart-1…5` (those belong to the vendored shadcn blocks).
- Identity uses the categorical slots `mchart-1…8` in order; slot 1 is the accent. The order has not been through the colour-vision validator: past three series, add direct labels or a table view, and fold a ninth into "Other".
- Magnitude uses `mseq-0…5`, one hue. Label each cell with its paired `mseq-ink-*`; in dark the ramp flips so more means lighter.
- Polarity uses `mdiv-*`: blue to red with `mdiv-mid` grey at the baseline, never a hue.
- `mstatus-*` means good, warning, critical and nothing else; always with an icon and a label.
- Chrome: gridlines `mchart-grid`, axes `mchart-axis`, legends `mchart-muted`, plot ground `mchart-surface`.

## Iconography

- Icons are Lucide (`lucide-react`), 16px in controls, drawn at a 1.5 stroke in `currentColor`. Icon-only buttons carry an `aria-label`.
- Small animated marks (the thinking orb, empty states) are Lottie files. They are not included here.
- The Minder icon (in Logos) is a raster mark. Use it at 128px or smaller, on `background` or `card`, and never recolour or redraw it.

## Motion

- A new message rises 4px and fades in over 0.25s ease-out. Streamed words fade in over 450ms.
- Every motion is optional. Under reduced motion nothing fades, glides or breathes, and the order things arrive in stays the same.

## Layout

- Breakpoints: `breakpoint-xs` 380 (inline widget minimum) through `breakpoint-2xl` 1536. The reading column is about 768px, centred.
- Chat workspace: threads rail 264px (52px collapsed), chat column, and a stage that appears with the first artifact. The Chat section has the full spec.

## Not synced

- Components are not bundled yet. The repo's vendored shadcn/ui set (`design-system/components/`: button, input, select, dropdown-menu, tabs, dialog, sheet, sonner, chart, message, bubble, marker, attachment, input-group and others) and the Minder chart blocks were left out. Previews can come later from a build of that library.
- `tokens.ts` names such as `surface-secondary` and `text-tertiary` are documented as their runtime equivalents here: `sidebar`/`skin-canvas`, `skin-faint`.
- Values written with `color-mix()` in the source are stored as their computed hex: `accent` and `sidebar-accent`.
