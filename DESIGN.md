# Design System — PerPixel & Moove (2026)

## Visual World

Editorial, typography-led digital and brand design studio system paired with Moove's 2026 sculptural furniture monograph. Motion supports composition, spatial hierarchy, and physical continuity rather than decorative effects.

## Color Tokens (`@theme` in `src/app/globals.css`)

- `--color-paper`: `#f4f2ee` (Travertine paper ground)
- `--color-ink`: `#141414` (Foundry carbon ink)
- `--color-word-pale`: `#e3e1da` (Inactive display typography)
- `--color-coral`: `#f2a18e` (Terra coral accent & footer ground)
- `--color-coral-deep`: `#ec8f78` (Pressed / hover coral)
- `--color-blush`: `#f7ded4` (Rose chalk card & stage surface)
- `--color-blush-soft`: `#fae9e1` (Selected tab & secondary rose surface)
- `--color-butter`: `#f6e6c5` (Services & commission dossier workspace surface)
- `--color-sky`: `#dceaf2` (Cool anodized pewter / sky surface)
- `--color-sage`: `#e5ecdd` (Quarry sage surface)
- `--color-line`: `rgba(20, 20, 20, 0.14)` (Hairline structural divider)
- `--color-line-strong`: `rgba(20, 20, 20, 0.32)` (Primary structural border)

## Typography

- **Display & UI Sans (`--font-sans`)**: `Archivo` (weights 400–900). Used for oversized wordmarks, structural headings (`font-weight: 800–900`, tracking `-0.035em`), and uppercase metadata labels (`0.6875rem–0.75rem`, tracking `0.12em–0.16em`).
- **Editorial & Curatorial Serif (`--font-serif`)**: `Instrument Serif` (400 normal & italic). Used for monograph titles, italic headline counterpoints, and pull quotes.
- **Numeric Discipline**: `font-variant-numeric: tabular-nums` on edition indices, dimensions, curvature readouts, and counters.

## Motion & Interaction Contract

- **Easings**:
  - Entrances & micro-interactions: `--ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1)`
  - Large structural movement: `--ease-large: cubic-bezier(0.16, 1, 0.3, 1)`
  - Page-sheet route transition: `1000ms cubic-bezier(0.5, 0, 0.1, 1)`
- **Scroll Architecture**:
  - Triggered once-reveals (`Reveal.tsx`) for editorial copy and lookbook media (`translateY(20px) -> 0`, internal image `scale(1.02 -> 1)`).
  - Continuous, reversible scroll-progress sequences for major pinned scenes (`Wordplay`, `Process`, `FeaturedScene`, `MooveShellSequence`), with automatic static fallback on `<768px`, short viewports (`<620px`), and `prefers-reduced-motion: reduce`.
