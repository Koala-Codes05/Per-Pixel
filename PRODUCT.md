# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Design-conscious clients, creative directors, architects, and collectors evaluating PerPixel's portfolio and exploring Moove — a 2026 sculptural furniture and object studio in soft rose, raw clay, and brushed travertine tones.

## Product Purpose

PerPixel is a digital and brand design studio ("We build design on clarity, speed, and care"). Within PerPixel, the Moove showcase (`/projects/moove` and `src/works/Moove/index.html`) is a one-page brand website for Moove: a quiet, tactile furniture and architectural object house where every piece is numbered, material-led, and made to order.

## Positioning

Moove treats seating and domestic objects as monolithic, light-catching sculptures rather than upholstered commodities — pairing cast rose pigment, honed travertine, and cold-rolled aluminum with an editorial catalog that lets visitors inspect finishes, dimensions, and commission editions directly.

## Operating Context

Visitors arrive from PerPixel's homepage bento, featured portfolio scene, or `/projects` index (`#details-moove`) and transition via the page-sheet view transition into Moove's one-page brand experience.

## Capabilities and Constraints

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Motion, Lenis smooth scroll, plus a self-contained standalone build in `src/works/Moove/index.html`.
- No live checkout or backend email submission; inquiry/commission forms must generate a local copyable dossier/specification note honestly without faking server submission.
- All imagery and edition numbers are illustrative concept work for the 2026 Moove identity showcase and are labeled transparently.
- Respect `prefers-reduced-motion`, keyboard navigation, and art-directed desktop/tablet/mobile layouts with zero horizontal overflow.

## Brand Commitments

- PerPixel studio system: `paper` (`#f4f2ee`), `ink` (`#141414`), `blush` (`#f7ded4`), `coral` (`#f2a18e`), Archivo + Instrument Serif, editorial easing (`cubic-bezier(0.22, 1, 0.36, 1)` and `cubic-bezier(0.16, 1, 0.3, 1)`).
- Moove brand world: sculptural furniture and soft rose tones (`https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=900&q=80`), pigment-cast resin, travertine, warm stone, quiet architectural typography, and tactile edition cataloging.

## Evidence on Hand

- `src/lib/site.ts`: Moove (`slug: "moove"`, `category: "Branding"`, `year: "2026"`, `tone: "pink"`, hero chair image `photo-1567538096630-e0c55bd6374c`).
- `src/components/home/FeaturedProjects.tsx`: "Sculptural furniture and soft rose tones, explored through a quieter visual identity."

## Product Principles

1. Physicality over ornament: show weight, finish, footprint, and light rather than decorative UI chrome.
2. Quiet authority: generous whitespace, deliberate typographic contrast, and continuous or restrained motion that never fights scroll.
3. Honest interaction: material finish switchers, edition spec drawers, and commission brief builders must work deterministically with keyboard and reduced-motion support.
