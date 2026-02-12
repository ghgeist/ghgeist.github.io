# Guidelines for Figma Make (GrantGeist site)

These guidelines are a **contract** for generating or editing code. They exist to keep outputs consistent, minimal, and shippable.

---

## 1) Primary Objectives

1. **Match the existing visual system** (dark “instrument panel” aesthetic).
2. **Prefer small, local diffs** over global redesigns.
3. **Reuse existing components and patterns** before inventing new ones.
4. **Keep layouts responsive** (mobile-first; enhance at md/lg breakpoints).
5. **Do not rewrite copy** unless explicitly requested.

If unsure, ask for **one clarifying detail only if it materially changes the direction of the solution**. Otherwise, make the best local choice and proceed.

---

## 2) Stack + Code Conventions

* Framework: React + Tailwind utility classes.
* Animation: `motion/react` (already in use). Prefer subtle fades/translates.
* Icons: `lucide-react` (`w-5 h-5` unless specified).
* UI primitives: reuse existing `./ui/*` components (Input, Textarea, Button, Label).
* Maintain TypeScript safety. Do not introduce `any` unless unavoidable.

**No new libraries** unless explicitly requested.

---

## 3) Visual Design System (Hard Constraints)

### Color Palette (Single Source of Truth)

Use only the following hex values. Do not introduce new colors.

* Page background: `#0B0E14`
* Panel/card background: `#151921`
* Input background: `#11161D`
* Primary accent: `#0066cc`
* Accent hover: `#0052a3`

`theme.css` semantic tokens are **not authoritative**. The palette defined here is the current source of truth.

### Accent Usage Policy

Accent color may be used for:

* Primary CTA buttons
* Focus states
* Interactive text highlights
* Icon highlights

Do not use accent for large decorative backgrounds or non-interactive elements.

---

### Borders + Depth

* Structural dividers: `border-white/5`
* Card/panel borders: `border-white/5`
* Interactive hover states may increase contrast to `border-white/15` or `border-white/20`
* Avoid mixing white-opacity borders with gray-based borders.
* Avoid heavy shadows; keep depth subtle and restrained.

---

### Typography + Tone

**Section Headings (H2):**

* Title Case
* `font-bold`
* `tracking-tight`

**Metadata / Kicker Labels:**

* `font-mono`
* Uppercase
* `tracking-wide`

**Body Text Scale:**

* Default: `text-base`
* Lead paragraphs: `text-lg`
* Avoid `text-sm` for primary section content

Body color: `text-gray-400` (avoid pure white paragraphs).

CTA text may use uppercase with `tracking-wide`.

---

### Spacing Rhythm

* Section padding: `py-24`
* Horizontal padding inside containers: `px-6`
* Maintain consistent vertical rhythm. Avoid arbitrary margins.

---

## 4) Layout Rules (Responsiveness First)

* Prefer flex/grid layouts.
* Avoid absolute positioning unless required for overlays/background effects.

### Canonical Section Structure

```html
<section class="py-24 bg-[#0B0E14] border-t border-white/5">
  <div class="mx-auto w-full max-w-6xl px-6 lg:px-8">
    <!-- Section content -->
  </div>
</section>
```

All primary sections must follow this pattern.

Do not use Tailwind `container` utility unless explicitly requested.

### Breakpoints

* Mobile-first default
* Introduce columns at `md:` and `lg:` only when beneficial

When adjusting spacing:

* Fix the local area first
* Do not globally change section padding unless explicitly requested

---

## 5) Interaction + Motion

* Default motion duration: 300ms (`duration-300`)
* Longer transitions (400–600ms) allowed for section-level reveals
* Avoid inconsistent durations within the same component
* Use restrained easing and small translate distances
* Avoid “bouncy” or exaggerated motion

---

## 6) Accessibility + Semantics

* Preserve proper heading hierarchy
* Inputs must include associated `Label` with `htmlFor`
* Interactive elements must be keyboard accessible
* Do not rely on color alone to convey meaning

---

## 7) Content Safety Rules

Do not change unless explicitly requested:

* Section IDs used by navbar anchors (`#page-top`, `#skills`, `#about`, `#contact`, `#work-with-me`)
* Navigation scroll behavior
* Form validation logic

Do not rewrite copy unless asked.
Do not change image sources or links unless asked.

---

## 8) Change Request Structure (Required Output Format)

When implementing a task, structure the response as:

### A) Intent (1 sentence)

What should the user perceive as improved?

### B) Constraints

* What must not change?
* What existing patterns must be reused?

### C) Plan (2–5 steps)

Smallest sequence that accomplishes the goal.

### D) Acceptance Criteria

Concrete, verifiable checks (responsive behavior, spacing consistency, hover states, etc.).

If the request is large, propose splitting into smaller tasks.

---

## 9) Preferred Component Patterns

### Card / Panel

* `bg-[#151921]`
* `border border-white/5`
* Padding typically `p-6`

### Forms

* Field background: `bg-[#11161D]`
* Focus accent: `focus:border-[#0066cc] focus:ring-[#0066cc]/20`

### CTA Button

* `bg-[#0066cc] hover:bg-[#0052a3]`
* `rounded-md`
* Uppercase + `tracking-wide`
* Subtle shadow acceptable; avoid heavy glows

---

## 10) Default Behavior When Ambiguous

* Prefer consistency with neighboring sections over novelty
* Prefer slightly tighter spacing over excessive whitespace
* Reuse an existing class pattern even if imperfect

---

## 11) Drift Detection Rule

If a requested change introduces:

* A new hex color
* A new container width
* A new heading style
* A new motion duration pattern

Flag it explicitly before implementing.
