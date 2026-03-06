# Dark Obsidian Redesign — Design Document

## Overview

Complete visual and UX overhaul of the Dubai AI enterprise solutions website. Moving from the current navy+gold theme to a "Dark Obsidian" aesthetic inspired by Vercel, Linear, Apple, and Stripe. The goal is a premium, luxurious feel with extreme polish and restraint.

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `bg-base` | `#09090B` | Page background (near-black) |
| `bg-surface` | `#111113` | Card/panel backgrounds |
| `bg-elevated` | `#18181B` | Hover states, elevated surfaces |
| `border-subtle` | `#27272A` | Card borders, dividers |
| `border-hover` | `#3F3F46` | Interactive border states |
| `text-primary` | `#FAFAFA` | Headlines, primary text |
| `text-secondary` | `#A1A1AA` | Body text, descriptions |
| `text-tertiary` | `#71717A` | Captions, metadata |
| `accent` | `#3B82F6` | Primary accent (electric blue) |
| `accent-glow` | `#60A5FA` | Glow effects, hover accent |
| `accent-subtle` | `#3B82F6` at 10% | Accent backgrounds, chips |

Single accent color (electric blue) used sparingly. Everything else grayscale.

## Typography

All Inter. Drop Space Grotesk.

| Element | Size | Weight | Tracking |
|---------|------|--------|----------|
| Display (hero H1) | 4.5rem (72px) | 700 | -0.035em |
| H2 (section titles) | 3rem (48px) | 600 | -0.025em |
| H3 (card titles) | 1.25rem (20px) | 600 | -0.015em |
| Body | 1rem (16px) | 400 | 0 |
| Body small | 0.875rem (14px) | 400 | 0 |
| Label/overline | 0.75rem (12px) | 500 | 0.05em uppercase |

Tight letter-spacing on headlines is key to the premium look.

## Global Design Elements

- **Noise texture:** Semi-transparent SVG noise filter overlaid on entire page for film grain quality
- **Glow effects:** Soft radial gradients using accent at 5-8% opacity behind key elements
- **Card pattern:** `bg-surface` + `border-subtle`, hover transitions to `border-hover` + faint accent glow box-shadow
- **Section pattern:** Overline label (accent dot + uppercase text) above centered headline
- **Reveal animations:** Fade-up on scroll via Framer Motion, staggered 100-200ms between elements
- **No floating action button** — CTAs within page flow handle conversion

## Section-by-Section Design

### 1. Hero (100vh)

- Single centered column, text-center
- Overline chip: "AI Solutions for GCC Enterprises" with accent-subtle background
- Massive display headline (72px), one key phrase uses gradient text (white to accent-glow)
- One-liner subtitle in text-secondary at 1.125rem
- Two CTAs: primary (solid accent) + secondary (ghost/bordered)
- **Background:** Animated gradient mesh — 2-3 large soft radial gradients (accent at ~5% opacity) that slowly drift. CSS noise overlay. Single soft radial glow behind headline.
- Remove particle canvas and floating stat cards
- Subtle scroll indicator (animated chevron) at bottom

### 2. Marquee (Logo Ticker)

- Below hero, subtle top border
- Logos in white at ~30% opacity, brighten to ~70% on hover
- 45s animation speed (slower, more elegant)
- Overline: "TRUSTED BY LEADING GCC ENTERPRISES" in text-tertiary

### 3. Stats Band

- 4 stats in horizontal row, separated by vertical dividers
- Large numbers (3rem, text-primary, weight 600) + label below (text-tertiary, 0.75rem uppercase)
- Animated counter on scroll
- Subtle accent underline fades in after count completes
- No cards, no backgrounds, no icons — just numbers with generous padding (py-20)

### 4. Problem — "The Cost of Inaction"

- Overline: "THE PROBLEM" with accent dot
- Single powerful headline (48px)
- 2-3 stat callouts in horizontal row: bold number + one line context
- One full-width opportunity card: `bg-surface` with 4px solid accent left border
- $1.5M+ stat as huge number inside the card
- Staggered fade-up reveals (100ms delays)
- Remove progress bars, multi-card layout, decorative elements

### 5. Services — Bento Grid

- Overline: "WHAT WE DO" with accent dot
- Headline: "Three capabilities, one integrated platform"
- Asymmetric bento layout:
  - Featured card (2 columns) for Document AI
  - Two stacked cards on right for Workflow Automation + Digital Transformation
- Card styling: `bg-surface`, `border-subtle`, hover glow
- Capability tags as minimal pills (`bg-elevated`, `text-tertiary`)
- Featured card includes subtle abstract SVG visual
- Staggered reveal (left first, right 150ms later)

### 6. Use Case — "See It In Action"

- Overline: "USE CASE" with accent dot
- Single card, `bg-surface`
- Left: brief narrative (3-4 lines)
- Right: 3 metrics stacked vertically with accent left-border lines
- Horizontal dividers between metrics

### 7. Why Us — Numbered Grid

- 2x2 grid of minimal cards
- No icons — accent-colored numbers ("01"-"04") as visual anchors
- Bold title + 2-line description per card
- Same card hover pattern as services

### 8. Process — Horizontal Stepper

- Thin horizontal line connecting 4 nodes across full width
- Each node: accent circle + step title + 1-line description below
- Line and nodes animate left-to-right on scroll (200ms stagger)
- Centered CTA below: "Start with a 30-day proof of concept"
- Mobile: vertical line, stacked steps

### 9. Industries — Minimal Tiles

- 4x2 grid on desktop, horizontal scroll on mobile
- Each tile: industry name (text-primary, weight 500) + example company (text-tertiary)
- `bg-surface` with `border-subtle`, hover brightens border + subtle y-shift
- Compact and scannable

### 10. Final CTA — "The Close"

- `bg-surface` background with large radial accent glow (matching hero energy)
- Centered: bold headline (48px) + one-liner + single prominent CTA button
- One action only — no secondary button

### 11. Footer

- `bg-base` with top `border-subtle`
- 3-column: brand/tagline | nav links | contact
- All text-tertiary, links brighten on hover
- Bottom bar: copyright + "Dubai, UAE"
- No social icons, no floating buttons

## What Gets Removed

- Particle canvas (NeuralCanvas)
- Floating stat cards in hero
- Progress bars in problem section
- Heavy card borders and decorations throughout
- Space Grotesk font
- Navy + gold color scheme entirely
- Floating "Book a Free Call" button
- Emoji-style icons in service cards
- Social icons in footer (unless real profiles exist)

## Technical Notes

- Keep React + Vite + Tailwind + Framer Motion stack
- Keep HeroUI for Navbar and Button components
- Extend Tailwind config with new color tokens
- CSS noise texture via inline SVG data URI in a pseudo-element
- Gradient mesh via CSS radial-gradient with animation
- All animations via Framer Motion (scroll-triggered)
- App remains single-file SPA (App.jsx) — no component extraction needed for this scope
