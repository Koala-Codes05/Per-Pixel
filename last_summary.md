# Last summary — PerPixel

## 2026-10-17 — /projects/moove got its own navbar + footer via route groups

### Changed
- **Route groups split the site chrome**: `src/app/(site)/` now holds `/`, `/about`, `/contact`, `/journal`, `/projects` with `(site)/layout.tsx` rendering `<Navbar/>`+`<Footer/>`; `src/app/(moove)/projects/moove/` holds the showcase with its own `layout.tsx`. `src/app/layout.tsx` keeps only intro bootstrap, `SmoothScroll`, `Preloader`, `PageTransition`, `viewport-blur`. Files moved with `git mv`; URLs unchanged.
- **New `src/components/projects/MooveNavbar.tsx`** (server): sticky top-0 header (translucent blush + 10px backdrop blur, `line-strong` border, z-40) — MOOVE® badge + `Branding · 2026 · Collection 01` meta, anchors (Collection/Shell Study/Identity/Dossier), "All projects" back link. Mobile: meta hidden, links wrap to a second row.
- **New `src/components/projects/MooveFooter.tsx`** (client): dark `bg-ink` footer mirroring the PerPixel footer pattern — serif line, `#dossier` CTA, Showcase/Studio columns, `rounded-t-4xl`, scroll-linked oversized coral "MOOVE" wordmark (spring-smoothed `translateY` 30%→8%, static under reduced motion).
- **Page**: removed the in-page `moove-subnav` block and `pt-24 md:pt-28` from `src/app/(moove)/projects/moove/page.tsx`; CSS `moove-subnav-*` replaced by `moove-header-*` + `moove-footer-*` blocks in `globals.css`.
- **`src/app/not-found.tsx`**: new root 404 (PerPixel copy + embedded Navbar/Footer) — group not-found files don't catch unmatched URLs and the root layout no longer carries chrome.
- **`eslint.config.mjs`**: ignores `public/works/**` (user-added prebuilt showcase bundles were erroring lint).
- User normalized moove/projects pages to canonical Tailwind v4 utilities (`max-w-350`, `aspect-16/10`, `bg-linear-to-t`).

### Verification
- `npm run lint` → exit 0. `npm run build` → exit 0, all routes prerendered (`/`, `/_not-found`, `/about`, `/contact`, `/journal`, `/projects`, `/projects/moove`).
- Rendered HTML checked: `/projects/moove` → `moove-header`+`moove-footer`, no `site-navigation`; `/` and `/projects` → site chrome, no moove chrome. `/does-not-exist` → custom 404 with site chrome, 404 status.
- `python tests/moove_check.py` → "moove showcase verification: pass" (interactions, sticky sequence fwd/reverse, tablet/mobile/reduced-motion, standalone file).
- Playwright shots reviewed (`tests/shots/`): `moove-footer.png`, `moove-shell-nav.png`, `moove-mobile-header.png`, `moove-mobile-footer.png` — header legible over dark shell band, footer mark crops correctly.

### Gotchas hit
- `.next/dev/types/validator.ts` went stale after `git mv` and failed the first build's type check — deleted `.next/dev`, rebuild regenerated types. Note for future route moves.
- `html[data-featured-visible]` is still toggled by `MooveShellSequence` but now matches nothing on the moove page (no `.site-navigation`); harmless dead toggle.

### Blockers / next step
- Dev server running (`npm run dev`, port 3000) with preview open at `/projects/moove`. Ready to commit the restructure when the user confirms.

## 2026-10-16 — Updated Impeccable to v4.6.0 and cleared new detector findings

### Changed
- `npx impeccable update` — skill updated to v4.6.0, engine v0.1.15 (windows-x64) installed at `C:\Users\Anakin\.agents\skills\impeccable\scripts\bin\windows-x64\impeccable.exe`, hooks reinstalled into `.agents`.
- `src/works/Moove/index.html`: raised sub-AA muted text alphas to `rgba(24,19,18,0.72)`; added `impeccable-disable italic-serif-display` waiver for the Bodoni-style italic `<em>`.

### Verification
- `impeccable.cmd detect --json` on moove files → `[]`, exit 0 (v4.6.0 exit codes: 0 clean, 2 findings, 1 scan failure).

### Prior state
- `/projects/moove` showcase + standalone `src/works/Moove` complete and verified (lint/build/moove_check pass).
- `.vscode/css-custom-data.json` + `.vscode/settings.json` silence the false-positive `@theme` CSS lint warning (user-authored change).
- Committed `d2d0a13` "Add Moove showcase, works archive, and page transitions" and pushed to `origin/main`; Vercel CLI token expired (`vercel login` needed for manual deploys; GitHub-connected pushes still auto-deploy).
