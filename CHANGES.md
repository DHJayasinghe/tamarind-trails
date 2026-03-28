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

| Token | Value | Use |
|---|---|---|
| `--cream` | `#faf8f3` | Page background |
| `--sand` | `#f0ebe0` | Alternate section background |
| `--forest` | `#1e3a1e` | Dark green (How It Works bg) |
| `--gold` | `#c8963e` | Primary accent / CTAs |
| `--ink` | `#1c1a17` | Dark text |
| `--stone` | `#5a5750` | Muted body text |
| `--font-display` | Cormorant Garamond | Headings, large text |
| `--font-body` | Outfit | Paragraphs, labels, UI |

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

## To Do (Future)

- [ ] Replace placeholder email (`info@tamarindtrails.lk`) with real email address
- [x] Phone/WhatsApp updated to `+94 76 480 1863`
- [ ] Connect contact form to a real backend (Formspree / EmailJS / custom API)
- [ ] Add a logo image file to replace the text-based logo
- [ ] Add real photography (replace Pexels/Unsplash placeholders)
- [ ] Add meta `og:image` once a real hero image is available
- [ ] Consider adding a cookie/privacy notice for UK visitors (GDPR)
