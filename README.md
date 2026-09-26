# Axloritech — Portfolio

**Tech Beyond Limits.**

A premium, minimal portfolio for **Axloritech** — full-stack software developer and builder.
Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion, with a
hand-authored SVG handwriting intro as the signature feature.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Node 20+ recommended.

---

## The handwriting intro

The opening animation writes **Axloritech** in cursive, with no hand and no person.

- The wordmark is a **hand-authored single-line SVG script** — 22 strokes stored in
  [`components/intro/writing-paths.json`](components/intro/writing-paths.json).
- Each stroke is drawn by transitioning its `stroke-dashoffset` from its full length to zero,
  so **ink is genuinely laid down along the path** rather than faded in. No handwriting font
  and no image mask is involved.
- A small glowing writing point rides the **leading edge** of the active stroke, sampled with
  `getPointAtLength()`, so it reads as an invisible pen leaving ink behind it.
- Timeline: ~160 ms overlay fade-in → 1.9 s of writing distributed across strokes in
  proportion to their ink length → tagline → ~0.6 s hold → 0.6 s cross-fade into the site.
  Total ≈ **3.4 s**, inside the 3–4 s target.
- **Skip intro** sits in the bottom-right corner; `Esc` also skips. The intro is auto-skipped
  on later visits via a `localStorage` flag and can be replayed any time from the footer
  (*Replay intro*).
- `prefers-reduced-motion: reduce` skips the sequence entirely.

Stroke paths can be edited in the JSON file and previewed in isolation:

```bash
node tools/preview-handwriting.mjs     # writes tools/handwriting-preview.png
node tools/measure-bbox.mjs            # prints the ink bounding box + a tight viewBox
```

---

## Project structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, theme + intro bootstrap script
  page.tsx              section composition
  globals.css           design tokens (light/dark), base styles, component classes
  icon.svg              favicon (SVG)
  apple-icon.png        iOS home-screen icon
  manifest.ts           web app manifest
  robots.ts, sitemap.ts SEO
  not-found.tsx         404 page
components/
  intro/                IntroSequence.tsx + writing-paths.json
  SiteHeader.tsx        sticky nav, mobile sheet, theme toggle
  Hero.tsx              hero + developer snippet card
  About.tsx             about copy + system-stack visual
  WhatIBuild.tsx        capability cards
  Skills.tsx            grouped technology badges
  Projects.tsx          featured grid   ProjectCard.tsx  card + hover behaviour
  GitHubSection.tsx     "Build in Public"
  Contact.tsx           final CTA
  SiteFooter.tsx        footer + socials + replay
  Reveal.tsx            shared scroll-reveal wrapper
  icons.tsx             all inline SVG icons (no icon library)
hooks/
  use-intro-gate.ts     tells sections when the intro has handed over
lib/
  site.ts               ← single source of truth for links, copy, projects, skills
fonts/                  self-hosted latin variable fonts (Inter, Plus Jakarta Sans, JetBrains Mono)
public/projects/        project preview images (WebP)
public/og.png           1200×630 social card
tools/                  handwriting preview, bbox measurement, icon/OG generation
```

### Editing content

Almost everything lives in [`lib/site.ts`](lib/site.ts):

| What | Where |
| --- | --- |
| Social links, GitHub/X/Instagram | `socials` |
| Project cards (name, copy, tags, image, link) | `projects` |
| Capability cards | `capabilities` |
| Skill groups + badges | `skillGroups` |
| Contact CTA target | `contactEmail` |

**Contact button:** `contactEmail` is intentionally empty, so nothing is invented. While it is
empty the CTA opens a DM on X (the sub-label under the button says so). Set a real address and
the same button becomes a `mailto:` link automatically:

```ts
// lib/site.ts
contactEmail: "hello@yourdomain.com",
```

---

## Design system

A sophisticated dark/light system driven by CSS custom properties in `app/globals.css`.

- **Dark** is the default (slightly futuristic, near-black `#07070a`); **light** is a clean
  document-white counterpart. The toggle persists to `localStorage` and is applied by a
  pre-paint inline script, so there is no theme flash.
- **Accents** are a single restrained purple (`#a78bfa` dark / `#6d3cf5` light) used only for
  highlights, interactive states and key details.
- **Typography:** Plus Jakarta Sans for display headings, Inter for body copy, JetBrains Mono
  for code and micro-labels. All self-hosted (latin variable subsets, 3 files, ~105 KB).
- Deliberately avoided: heavy glassmorphism, big gradients, neon, clutter.

---

## Performance & quality notes

- Static prerender — the whole page is a single static route.
- Zero third-party runtime requests: fonts and images are self-hosted.
- Project previews are WebP with explicit dimensions, `sizes`, `quality` and **blur
  placeholders** (a 40 px inline data URI per image), lazy-loaded below the fold.
- All icons are inline SVG; no icon or animation library beyond Framer Motion.
- Measured on the production build (local, 1366×900): FCP ≈ 0.18 s, **CLS 0**, load ≈ 0.22 s.
- Accessibility: no axe-core violations in dark or light themes; single `<h1>`; landmarks,
  visible focus rings, `aria-label`s on icon-only links, skip link, and the page is `inert`
  while the intro dialog is on screen.
- Responsive from 320 px up: mobile gets its own layouts (stacked cards, bottom sheet nav),
  not a shrunken desktop.
- Security headers set in `next.config.ts`.

---

## Deployment

Push to a Git host and import on Vercel — no configuration required. Optionally set:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

so canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt` use the live domain
(defaults to `https://axloritech.vercel.app`).

---

© 2026 Axloritech. All rights reserved.
