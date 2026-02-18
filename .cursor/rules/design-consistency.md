# Design Consistency Rules

**Scope**: Project pages (`src/app/projects/**/*.tsx`) and main landing components (`src/app/components/**/*.tsx`)

**Purpose**: Maintain visual and structural consistency between the landing page and project detail pages. These rules are derived from the established patterns in `Hero.tsx`, `About.tsx`, `Approach.tsx`, and `WorkWithMe.tsx`.

**Philosophy**: These are **guidelines for consistency**, not hard constraints. They're designed to prevent accidental drift, not block intentional design decisions. 

**When iterating:**
- **Prefer** these patterns for consistency
- **Deviate** when it serves the design or content needs
- **Consider** the impact on overall visual cohesion
- **Update** these rules if you establish new patterns worth standardizing

**This rule should help you, not block you.** If you find yourself fighting against these patterns, that's a sign you might need to:
1. Adapt the pattern to your needs
2. Create a variation that works better
3. Update this document with the new pattern

The goal is visual cohesion, not rigid uniformity. Trust your design instincts.

---

## Core Design Principles

1. **Match landing page patterns** - Project pages should feel like extensions of the landing page, not separate designs (but can have unique sections)
2. **Consistent container structure** - Prefer the same container widths and padding patterns (but adapt when needed)
3. **Unified color palette** - Prefer the established palette (but new colors are fine if they serve a purpose)
4. **Typography hierarchy** - Maintain consistent heading styles, body text, and metadata labels (but adjust for content needs)
5. **Spacing rhythm** - Use similar vertical and horizontal spacing patterns (but vary for emphasis)

---

## Container Structure (Canonical Pattern)

**Standard section structure (from landing page):**
```tsx
<section className="py-24 bg-[#0B0E14] border-t border-white/5">
  <div className="mx-auto w-full max-w-6xl px-6 lg:px-8">
    <div className="max-w-5xl mx-auto md:mx-0">
      {/* Section content */}
    </div>
  </div>
</section>
```

**Project page variations (from StormSignal.tsx):**
- **Standard sections**: Use `max-w-6xl` outer, no inner wrapper needed for full-width content
- **Focused content sections**: Use `max-w-5xl` for tighter, centered content (e.g., "Case Study" section)
- **Section padding**: `py-24` (standard), `py-12 md:py-20` (alternate for tighter sections)
- **Background**: `bg-[#0B0E14]` (page), `bg-[#151921]` (card/panel), `bg-[#11141a]` (alternate section background)

**Key points:**
- Outer container: `max-w-6xl` with `px-6 lg:px-8` (standard, but adapt if needed)
- Inner wrapper: `max-w-5xl mx-auto md:mx-0` (when content needs tighter width)
- Some sections use `max-w-5xl` directly without inner wrapper (e.g., case study sections)
- **Flexibility**: Container widths can vary for specific layouts (e.g., full-width hero, narrow content sections)

---

## Color Palette (Single Source of Truth)

**Use ONLY these colors:**

- **Page background**: `bg-[#0B0E14]`
- **Card/Panel background**: `bg-[#151921]`
- **Input background**: `bg-[#131A23]` (forms) or `bg-[#11161D]` (alternative)
- **Primary accent**: `text-[#0066cc]` or `bg-[#0066cc]`
- **Accent hover**: `hover:bg-[#0052a3]` or `hover:text-[#0052a3]`
- **Text colors**:
  - Headings: `text-white`
  - Body: `text-gray-400`
  - Metadata/secondary: `text-gray-500`
  - Muted: `text-gray-600`

**Borders:**
- Structural dividers: `border-white/5`
- Card borders: `border-white/5` or `border-white/10`
- Interactive hover: `border-white/15` or `border-white/20`

**Color usage guidance:**
- **Prefer** the established palette for consistency
- **Check** existing components first if you need a color
- **Add** new colors if they serve a specific design purpose (e.g., data visualization, status indicators)
- **Consider** whether a new color should become part of the standard palette

---

## Typography Patterns

### Section Headings (H2)

```tsx
<h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
  Section Title
</h2>
```

**Pattern:**
- Size: `text-3xl` (standard), `text-2xl md:text-3xl` (responsive)
- Weight: `font-bold`
- Color: `text-white`
- Tracking: `tracking-tight`
- Margin: `mb-2` to `mb-6` depending on context

### Page Titles (H1)

```tsx
<h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8">
  Project Name
</h1>
```

**Pattern:**
- Size: `text-4xl md:text-6xl` (hero) or `text-4xl md:text-5xl` (project pages)
- Weight: `font-bold`
- Tracking: `tracking-tight`
- Leading: `leading-tight` or `leading-[1.1]`

### Metadata Labels / Kickers

```tsx
<span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
  METADATA LABEL
</span>
```

**Pattern:**
- Size: `text-[10px]` or `text-xs`
- Case: `uppercase`
- Tracking: `tracking-widest` or `tracking-wider`
- Font: `font-mono`
- Color: `text-gray-500` or `text-blue-400` (accent)

### Body Text

```tsx
<p className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl">
  Body text content
</p>
```

**Pattern:**
- Size: `text-base` (default), `text-lg` (lead paragraphs)
- Color: `text-gray-400`
- Leading: `leading-relaxed`
- Max width: `max-w-2xl` or `max-w-3xl` for readability

---

## Component Patterns

### Section Heading Component (from StormSignal.tsx)

**Standard SectionHeading component:**
```tsx
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

**Usage:** Prefer this component for section headings. It provides consistent spacing and typography. Feel free to adapt it or create variations if your content needs something different.

### Card / Panel Pattern

```tsx
<div className="bg-[#151921] border border-white/5 p-4 md:p-6 rounded-sm">
  {/* Card content */}
</div>
```

**Pattern:**
- Background: `bg-[#151921]`
- Border: `border border-white/5`
- Padding: `p-4 md:p-6` or `p-6`
- Border radius: `rounded-sm` (subtle) or `rounded-lg` (more pronounced)

### Stat Card Pattern

```tsx
<div className="bg-[#151921] border border-white/5 p-4 md:p-5 rounded-sm">
  <div className="text-gray-500 text-xs font-mono uppercase tracking-wider mb-1">
    {label}
  </div>
  <div className="text-xl md:text-2xl font-bold text-white mb-1">{value}</div>
  <div className="text-gray-400 text-sm">{subtext}</div>
</div>
```

### CTA Button Pattern (from StormSignal.tsx)

**Standard CTA Component:**
```tsx
function CtaButton({ label, href, icon, variant }: CtaLink) {
  const base = "inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium transition-all rounded-sm";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
      : "bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20";

  return (
    <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
      {icon}
      <span>{label}</span>
      {variant === "primary" && <ArrowRight className="w-4 h-4 opacity-70" />}
    </a>
  );
}
```

**Key points:**
- Primary: `bg-blue-600` (solid blue, not semi-transparent)
- Secondary: `bg-white/5` with `border border-white/10`
- Both use `rounded-sm` (subtle radius)
- Primary includes `ArrowRight` icon
- Use `font-medium` (not `font-mono`)

---

## Spacing Rhythm

### Vertical Spacing

- **Section padding**: `py-24` (standard), `py-12 md:py-20` (alternate)
- **Section gaps**: `space-y-12` (timeline), `space-y-6` (cards), `space-y-4` (tight)
- **Content margins**: `mb-6 md:mb-8` (headings), `mb-4` (subheadings), `mb-2` (tight)

### Horizontal Spacing

- **Container padding**: `px-6 lg:px-8` (outer), `px-4` or `px-6` (inner)
- **Grid gaps**: `gap-4` (cards), `gap-6` (sections), `gap-8 md:gap-12` (large sections)

---

## Motion / Animation

**Use `motion/react` with consistent patterns:**

```tsx
<Motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</Motion.div>
```

**Patterns:**
- Duration: `0.6` (sections), `0.3` (interactions), `0.8` (hero)
- Translate: `y: 20` (subtle), `y: 10` (minimal)
- Viewport: `once: true` for scroll reveals
- Avoid: Bouncy animations, excessive motion, inconsistent durations

---

## Project Page Structure (from StormSignal.tsx)

**Standard project page sections (in order):**

1. **Hero Section**
   - Uses `header` tag (not `section`)
   - Back link: `inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-medium`
   - Title: `text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-8`
   - Description: `text-xl text-gray-400 leading-relaxed mb-8 max-w-xl`
   - CTA buttons in flex wrap: `flex flex-wrap gap-4`
   - Hero image: `rounded-lg overflow-hidden border border-white/10 bg-[#151921] shadow-2xl shadow-black/50 aspect-video`
   - Optional gradient overlay on hero section

2. **Metrics Grid** (optional)
   - Uses `StatCard` component
   - 3-column grid: `grid grid-cols-1 md:grid-cols-3 gap-6`
   - Section: `border-b border-white/5 bg-[#0B0E14]` with `pt-8 pb-12`

3. **Context / Problem**
   - Uses `SectionHeading` component
   - Body text: `text-base md:text-lg` with `prose prose-invert` wrapper
   - Section: `py-12 md:py-20 bg-[#0B0E14]`

4. **Design Doctrine / Approach** (optional)
   - Cards with icon backgrounds: `bg-blue-500/10`, `bg-purple-500/10`, etc.
   - Icon size: `w-10 h-10` with `rounded-sm`
   - Grid: `grid md:grid-cols-3 gap-4 md:gap-6`
   - Section: `py-12 md:py-20 border-y border-white/5 bg-[#11141a]` (alternate background)

5. **Architecture / System** (optional)
   - Visual diagrams with background patterns
   - Uses `Lane` and `Node` components for swimlane diagrams
   - Section: `py-12 md:py-20 bg-[#0B0E14]`

6. **Case Study / Deep Dive** (optional)
   - Uses `max-w-5xl` for tighter content width
   - Two-column grid: `grid md:grid-cols-2 gap-8 md:gap-12`
   - Section: `py-12 md:py-20 bg-[#151921] border-y border-white/5`
   - Kicker/metadata: `text-sm font-mono text-blue-400 uppercase tracking-widest mb-2`

7. **Navigation**
   - Back to case studies link
   - Section: `py-12 bg-[#0B0E14] border-t border-white/5`

---

## Common Drift Issues to Watch For

### ⚠️ Patterns That Often Cause Accidental Drift:

1. **Container widths**: Prefer `max-w-6xl` (outer) and `max-w-5xl` (inner). New widths are fine if intentional.
2. **Colors**: Prefer the established palette. New colors are fine for specific purposes (data viz, status, etc.).
3. **Borders**: Prefer `border-white/5` or `border-white/10`. Mixing with gray borders can feel inconsistent.
4. **Heading styles**: Prefer `text-3xl` for H2s. Larger sizes are fine for emphasis.
5. **CTA styles**: Prefer the `CtaButton` component. New variants are fine if they serve a purpose.
6. **Spacing**: Prefer `py-24` for standard sections. Vary for emphasis or tighter layouts.
7. **Motion**: Prefer `duration-0.6` for sections. Adjust for different feels if needed.

### ✅ Best Practices:

1. **Reference existing components**: Check `Hero.tsx`, `About.tsx`, `Approach.tsx`, `StormSignal.tsx` for patterns
2. **Start with standard patterns**: Use canonical structures, then adapt as needed
3. **Reuse when possible**: Leverage existing components and patterns
4. **Be intentional**: If you deviate, make sure it's for a reason
5. **Update patterns**: If you establish a new pattern that works well, consider documenting it here

---

## Quick Consistency Check (Optional)

Before finalizing, consider:

- [ ] Does the container structure feel consistent with other pages?
- [ ] Are colors intentional (either from palette or serving a purpose)?
- [ ] Do section headings feel consistent in hierarchy?
- [ ] Does spacing feel intentional and cohesive?
- [ ] Are any deviations serving a clear design purpose?

**Note:** This checklist is a prompt for reflection, not a gate. If something feels right but doesn't match exactly, trust your judgment and iterate.

---

## Reference Components

**Primary Reference (Current Standard):**
- `src/app/projects/StormSignal.tsx` - **This is the current reference standard** for project pages. All project pages should match these patterns.

**Landing Page Components (for consistency):**
- `src/app/components/Hero.tsx` - Hero section, grid layout, metadata labels
- `src/app/components/About.tsx` - Timeline, section structure, typography
- `src/app/components/Approach.tsx` - Card grid, section headings, body text
- `src/app/components/WorkWithMe.tsx` - Form styling, two-column layout
- `src/app/components/footer.tsx` - Footer structure, links

**Note:** `src/app/projects/WalkabilityIndex.tsx` uses older patterns and should be updated to match `StormSignal.tsx` when iterated on.

---

## Related Documentation

- `guidelines/Guidelines.md` - Comprehensive design system documentation
- `CLAUDE.md` - Project architecture and conventions
- `AGENTS.md` - Development workflow and constraints
