# Last summary — PerPixel

## 2026-10-17 — Sorso ported to native route `/projects/sorso`

### Changed
- **New route group** `src/app/(sorso)/projects/sorso/` — `layout.tsx` renders `SorsoNavbar` chrome; `page.tsx` (259 lines) recreates the standalone Offset/Sorso site as server-rendered sections: pill nav + aperitivo clock, "All the Bitter. None of the Proof." hero with three inline SVG bottles (Rosso/Rosa/Chinotto), tag marquees, three stacked full-bleed flavour articles, "Bitter, on purpose." bento, four-step serve ritual, filterable "Seven-ish." moments grid, "Salute." footer with mixed-case order + giant coral wordmark.
- **`src/components/projects/SorsoShowcase.tsx`** (client islands): `SorsoClock` (scroll-progress 17:00→20:30, passive listener, no React state), `SorsoMoments` (`hidden`-attr filter + `aria-pressed`), `SorsoCaseButton` (`data-added` + `aria-live` announcement).
- **`src/components/projects/SorsoNavbar.tsx`** (server): sticky pill bar — brand, clock, section anchors, Showreel → `/works/offset/showreel.html`, "All projects" back link.
- **`src/app/globals.css`**: `.sorso-*` block appended (~460 lines, own palette/Bodoni fallback stack — not `@theme` tokens). Mobile ≤620px wraps nav pills to left-aligned rows under brand+clock.
- **`src/lib/site.ts`**: first work entry `offset` → `sorso`, href `/projects/sorso` (was `/works/offset/index.html`); standalone original still live at `/works/offset/`.
- Deliberate simplification: original's flavour **tabs** became stacked editorial articles; no GSAP — all motion is CSS/scroll-driven per project conventions.
- New tests: `tests/sorso_check.py` (16 asserts), `tests/sorso_shots.py` (screenshots with intro skipped).

### Verification
- `npm run lint` → exit 0. `npm run build` → exit 0, `/projects/sorso` prerendered (all 8 routes).
- `python tests/sorso_check.py` → **16/16 pass**: zero page errors, no horizontal overflow, moments filter `aria-pressed` + card hiding (seaside 2/6, all restored), 3 flavour articles + bottles, order button `data-added` + label switch + live region, clock renders (17:00→20:30 by scroll depth), showreel href resolves, reduced-motion clean + marquee paused.
- Screenshots reviewed (`tests/shots/sorso-*.png`): hero bottles + Bodoni type correct; Rosso band renders; mobile nav wraps to rows (post-fix); footer "Salute."/wordmark correct.
- Rendered HTML earlier confirmed `sorso-nav`, `sorso-hero`, `Seven-ish`, `Salute`, `liq-rosso`, showreel link, and 200 on `hero-trio` imagery.

### Gotchas hit
- Screenshots against `next start` (:3200) serve the **built** CSS — edits to `globals.css` don't appear until rebuild. Dev server :3000 hot-reloads them; verify style tweaks there.
- PowerShell mangles `python -c "...\"...\""` (parens/quotes) — write `tests/*.py` files instead of inline `-c`.
- `innerText` reflects `text-transform` in Chromium → case-fold before asserting label text.
- `git status` warns `could not open directory 'src/works/Offset/videos/offset-portal-hop/assets/'` — a broken dir left under the (untracked) works tree; harmless, not committed.

### Blockers / next step
- Sorso port complete and verified; commit + push pending (files: `(sorso)/` group, 2 components, globals.css, site.ts, 2 test files, 4 shots).
- Remaining works to port if prioritized: Dune, Ghaslet, SNACKVERSE (all live standalone under `/works/`).
