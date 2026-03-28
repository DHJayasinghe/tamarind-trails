# Tamarind Trails — Website Redesign Summary

## Overview

Full redesign of the Tamarind Trails single-page website based on the business plan document. The goal was a minimalistic but UI/UX-rich site targeting UK eco-conscious travellers aged 30–60.

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Complete rewrite — new structure and content |
| `styles.css` | Complete rewrite — new design system |
| `script.js` | Complete rewrite — new interactions |

---

## index.html

### New Sections Added

| Section | ID / Class | Description |
|---|---|---|
| Intro | `#about .intro` | Two-column: image with badge + "What is Tamarind Trails?" copy |
| Why Us | `.why-us` | 4 pillar cards: Locally Owned, Designed for UK Travellers, Sustainable, Flexible |
| Sample Itineraries | `#trails .trails` | 3 trail cards with images, tags, highlights, tier pills |
| How It Works | `#how-it-works` | 4 numbered steps on dark forest green background |
| Our Impact | `#impact` | Planet / People / Paws cards + blockquote |
| WhatsApp Float | `.wa-float` | Fixed floating button (bottom-right) |

### Updated Sections

- **Hero** — New headline ("Discover Sri Lanka on the Tamarind Trails"), subtitle from BP, place tags, dual CTAs, scroll indicator. Uses `<img>` tag (not CSS background) for JS parallax.
- **Contact** — Added select dropdown for trail interest, labels, in-page success state div. WhatsApp added alongside email/phone.
- **Footer** — 3-column grid: brand + tagline / nav links / contact details.
- **Header/Nav** — Added "Plan Your Trip" `.btn-nav` CTA button alongside nav links.

### Key HTML Patterns

```html
<!-- Trail card with CSS custom property for image -->
<article class="trail-card reveal-up" style="--d:0s; --card-img:url('...')">

<!-- Step connector line -->
<div class="step-line" aria-hidden="true"></div>

<!-- Reveal animation with staggered delay -->
<div class="pillar-card reveal-up" style="--d:0.1s">

<!-- In-page form success (hidden until submit) -->
<div class="form-success" id="formSuccess" hidden>
```

### Content Source

All copy taken directly from `Tamarind Trails - Business Plan.docx.pdf`:
- Tagline: *"Slow, soulful Sri Lanka – for people, planet & paws."*
- Secondary: *"Trails of Culture, Coast and Canopy."*
- 3 itineraries: Heritage & Hill Country (10D), Coast Wildlife & Wellness (12D), Hidden Tamarind Trails (14D)
- 3 tiers: Essential / Boutique / Signature
- Impact pillars: Planet, People, Paws (£15/booking to Animal SOS Sri Lanka)
- How It Works: Share → Design → Refine → Travel

### Image URLs Used

| Usage | URL (Pexels/Unsplash) |
|---|---|
| Hero | `pexels.com/photos/34128249` |
| Intro | `unsplash.com/photo-1596422846543` |
| Heritage & Hill Country | `pexels.com/photos/23506597` |
| Coast, Wildlife & Wellness | `pexels.com/photos/34861048` |
| Hidden Tamarind Trails | `pexels.com/photos/11499392` |
| CTA full-bleed | `pexels.com/photos/35606851` |

---

## styles.css

### Design Tokens (CSS Variables)

#### Colour Palette

| Token | Value | Use |
|---|---|---|
| `--cream` | `#fdf9f3` | Page background (warm off-white) |
| `--sand` | `#f2ebe0` | Alternate section background (Impact section) |
| `--amber` | `#e07a2f` | Primary accent — CTAs, labels, highlights |
| `--amber-light` | `#f0a55a` | Lighter amber — hero eyebrow, label-light variant |
| `--amber-pale` | `#fdf0e0` | Very light amber — tier pill backgrounds |
| `--amber-dark` | `#b35e1a` | Darker amber — hover states, text on pale bg |
| `--forest` | `#0e1a0f` | Very dark green — Why Us & How It Works section backgrounds |
| `--forest-mid` | `#1b3d20` | Mid green — btn-secondary-dark border/hover |
| `--forest-light` | `#2e6438` | Light green — form success icon background |
| `--teal` | `#0d7c72` | Trail tag text/accent |
| `--teal-light` | `#13a89b` | Lighter teal (reserved) |
| `--ink` | `#120f0c` | Near-black — primary text, headings |
| `--stone` | `#5c584f` | Mid-grey brown — body text, muted content |
| `--mist` | `#9a9490` | Light grey — placeholders, footnotes |
| `--border` | `#e6dfd4` | Warm grey — card/input borders |
| `--white` | `#ffffff` | Pure white |

#### Typography

| Token | Value | Use |
|---|---|---|
| `--font-display` | Cormorant Garamond (Google Fonts) | Hero titles, section headings, large decorative numbers |
| `--font-body` | Outfit (Google Fonts) | All body text, labels, UI elements, nav |

**Type scale:**
- Hero title: `clamp(3.25rem, 8.5vw, 7rem)` — Cormorant Garamond, weight 300, line-height 0.98
- Section title: `clamp(2.25rem, 4.5vw, 3.5rem)` — Cormorant Garamond, weight 400, line-height 1.1
- Section label: `0.72rem`, weight 600, letter-spacing 0.18em, uppercase — always in amber
- Body text: `1.05rem`, Outfit, line-height 1.8
- Small/UI: `0.875rem`

#### Spacing Scale

| Token | Value |
|---|---|
| `--space-xs` | `0.5rem` |
| `--space-sm` | `1rem` |
| `--space-md` | `1.5rem` |
| `--space-lg` | `2.5rem` |
| `--space-xl` | `4.5rem` |
| `--space-2xl` | `7rem` |
| `--space-3xl` | `10rem` (reduced at breakpoints) |

Section vertical padding uses `--space-3xl` throughout for visual consistency.

#### Border Radius

| Token | Value | Use |
|---|---|---|
| `--r-sm` | `6px` | Form inputs |
| `--r-md` | `14px` | Contact method rows, impact icon, badges |
| `--r-lg` | `24px` | Pillar cards, step cards |
| `--r-xl` | `32px` | Trail cards, intro image, contact form, impact quote |
| `100px` | (inline) | All pill shapes — buttons, tags, tier pills |

#### Motion / Easing

| Token | Value | Use |
|---|---|---|
| `--ease` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | General transitions |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll reveal, fade-ins |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover lifts (cards, buttons) — slight overshoot |

### Section-by-Section Design Decisions

| Section | Background | Key Decision |
|---|---|---|
| Hero | Full-bleed image + dark green gradient overlay | Left-aligned content, oversized display font, italic amber second line for warmth |
| Intro (About) | `--cream` | Two-column: portrait image (4:5) left, copy right. Floating badge breaks out of image frame. |
| Why Us | `--forest` (dark) | High contrast dark section between two light ones. 4-column pillar grid with large ghost numbers. |
| Sample Itineraries | `--cream` | CSS custom property `--card-img` on article element passes image URL to `.trail-img` background. |
| How It Works | `--forest` (dark) | Steps connected by gradient `.step-line` dividers on desktop. Numbers in amber for warmth against dark bg. |
| Our Impact | `--sand` | Each card has its own tinted gradient background (green/amber/teal). Blockquote quote card centred below. |
| CTA Full-Bleed | Full-bleed image | 135deg dark green overlay, centred content, decorative lines either side of eyebrow text. |
| Contact | `--cream` | Two-column: contact info left, form card (white elevated) right. Horizontal slide on contact-method hover. |
| Footer | `--ink` (near-black) | 3-column grid collapses to 2-col then 1-col. Amber accent for column headings. |

### Scroll Reveal Animation System

```css
/* Add class + optional delay via --d custom property */
.reveal-up    { opacity: 0; transform: translateY(40px); }
.reveal-left  { opacity: 0; transform: translateX(-40px); }
.reveal-right { opacity: 0; transform: translateX(40px); }

/* JS adds .is-visible when element enters viewport */
.reveal-up.is-visible { opacity: 1; transform: none; }
```

Usage in HTML: `<div class="reveal-up" style="--d:0.2s">`

### Responsive Breakpoints

| Breakpoint | Key Changes |
|---|---|
| `1024px` | Pillars: 4→2 col; Trails: 3→2 col; Steps: row→2×2 grid |
| `768px` | Mobile nav overlay; all grids→1 col; footer 2-col |
| `480px` | Hero CTAs stack; footer 1-col |

---

## script.js

### Functions

| Function | Description |
|---|---|
| `initNavigation()` | Mobile hamburger toggle; closes on link click |
| `initHeaderScroll()` | Adds `.scrolled` class to header after 50px scroll (triggers glassmorphism) |
| `initSmoothScroll()` | Smooth scroll for all `<a href="#">` links, offset by header height |
| `initScrollReveal()` | IntersectionObserver — adds `.is-visible` to `.reveal-*` elements |
| `initHeroParallax()` | Translates `#heroBgImg` on scroll at 35% speed. Disabled on ≤768px. |
| `initActiveNav()` | IntersectionObserver — adds `.active` to matching nav link as sections scroll into view |
| `initContactForm()` | Validates required fields; 600ms delay; shows `.form-success`, hides form. No `alert()`. |

### Contact Form Behaviour

1. Validates `name`, `email`, `message` are non-empty — highlights empty fields in red
2. Disables submit button, shows "Sending…"
3. After 600ms: hides the `<form>`, removes `hidden` from `#formSuccess`, scrolls to it
4. Replace the `setTimeout` with a real `fetch()` to a form API (e.g. Formspree, EmailJS) when ready

---

## UI Fix Session — 2026-03-28

### Hero CTA Buttons Overflowing Below Hero Section

**Problem:** On shorter viewports, the hero section's fixed `height: 100svh` caused content (specifically the two CTA buttons — "Explore Sample Itineraries" and "Plan a Custom Trip") to overflow below the hero background image. The outline-white "Plan a Custom Trip" button became invisible as it fell onto the cream background of the next section.

**Fix (`styles.css`):** Changed `.hero` from `height: 100svh; min-height: 640px` to `min-height: 100svh`. This allows the hero to expand beyond the viewport height when content demands it, while still being full-screen on tall viewports.

```css
/* Before */
.hero {
  height: 100svh;
  min-height: 640px;
  ...
}

/* After */
.hero {
  min-height: 100svh;
  ...
}
```

### Other UI Issues Identified (Not Yet Fixed)

| Issue | Location | Details |
|---|---|---|
| `intro-badge` clipping risk | `styles.css:617` | Badge positioned `right: -2rem` inside `overflow: hidden` parent — may be clipped in Chromium. Fix: move badge outside `.intro-image-wrap`. |
| Select dropdown arrow off-centre | `styles.css:1326` | `top: 42%` on `select-wrap::after`. Should be `top: 50%; transform: translateY(-50%)`. |
| Form validation — no error message text | `script.js:160` | Only highlights fields red, no visible message explaining what's missing. |
| Contact form not wired up | `script.js:172` | Uses `setTimeout` simulation — needs real `fetch()` to Formspree / EmailJS / backend API. |

---

## To Do (Future)

- [ ] Replace placeholder email (`info@tamarindtrails.lk`) with real email address
- [x] Phone/WhatsApp updated to `+94 76 480 1863`
- [ ] Connect contact form to a real backend (Formspree / EmailJS / custom API)
- [ ] Add a logo image file to replace the text-based logo
- [ ] Add real photography (replace Pexels/Unsplash placeholders)
- [ ] Add meta `og:image` once a real hero image is available
- [ ] Consider adding a cookie/privacy notice for UK visitors (GDPR)
