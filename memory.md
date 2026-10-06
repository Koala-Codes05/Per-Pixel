# memory.md — PerPixel

Persistent project memory: design decisions, rules, and recurring bugs.
Agents: append entries as work happens. Keep it tight — this is for things
worth remembering across sessions, not a changelog (that goes in `last_summary.md`).

## Design decisions

- **Motion language**: editorial, restrained, physical. Motion supports
  composition/hierarchy — the site must never feel like an animation showcase.
- **Standard easings**:
  - Entrances: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Large movement: `cubic-bezier(0.16, 1, 0.3, 1)`
- **Scroll-linked sections use continuous interpolation**, not eased triggers —
  easing fights user scroll.
- **Two animation categories**: viewport-triggered reveals (IntersectionObserver)
  for simple content; scroll-progress-driven for major sequences (wordplay,
  process 1→2→3, horizontal media).
- **Oversized typography is intentional** — preloader words, editorial
  statements, and the footer `PERPIXEL` wordmark may extend beyond the viewport.
  Do not shrink them to fit.
- **Whitespace is a design element** — never compress it to fill space.
- **Rounded image corners** are part of the visual identity; animations must not
  break clipping/radius.

## Rules

- Prefer `transform` / `opacity` / `clip-path`; avoid unnecessary layout animation.
  FAQ/project accordion expansion may animate grid rows as an intentional exception.
- Image containers stay fixed; images scale/move inside (`scale 1.03→1.00` pattern).
- Scroll sequences must reverse correctly on scroll-up — no one-shot observers for them.
- Reserve media dimensions before load; graceful fallback on asset failure; preloader
  must never trap the user (fallback timeout required).
- Disable custom-cursor effects on touch devices.
- Avoid React state updates per scroll frame; isolate animation logic.

## Implementation decisions — 2026-09-12

- The user confirmed this is a greenfield build and supplied desktop/tablet homepage references.
- Stack: Next.js 16.3.5, React 19.2.8, TypeScript, Tailwind v4, Motion 13.2.0, Lenis 1.3.26.
- No Three.js: the supplied design needs typography, images, and scroll motion, not WebGL.
- Homepage scope only. Navigation should target real homepage sections instead of empty routes.
- Original image files, contact details, social destinations, and newsletter integration have not been supplied. Do not present stock imagery as original client work or fake successful submissions.
- `npm run dev`, `npm run lint`, and `npm run build` are available. Read Next's bundled docs before changing framework behavior.

## Redesign decisions — 2026-09-14

- **Hero**: "CREATIVE STUDIO" wordmark with a serif italic signature and an activity-driven supporting phrase. The phrase lives in a stacked CSS grid (`grid-area: 1/1`) so swapping text never changes layout — only `opacity`/`translateY` transition on `.hero-phrase-line`.
- **Hero phrase is activity-driven, not scroll-driven**: `HeroPhrase.tsx` is a small Client Component. On meaningful activity (pointer movement past a 36px threshold, hover over interactive elements, click, Tab/Enter/Escape, focusin on interactive elements) it advances to the next predefined phrase after a 1.1s cooldown. Touch pointers are ignored for movement; the intro lock suppresses activity. Reduced motion shows only the active line instantly.
- **Bento**: editorial asymmetric grid (`article portrait / about contact projects`) using existing project data. Tiles are `bento-article` (blush, journal link), `bento-portrait` (image-only), `bento-about` (sage), `bento-contact` (coral, hover deepens), and `bento-projects-slot` (feature card + project links + disciplines strip). Collapses to 2-col at ≤1023px and 1-col at ≤767px.
- **Process**: the September 15 motion restoration keeps the redesigned compact typography and rounded imagery, but restores a 330svh sticky sequence: frame 2 travels over frame 1, then frame 3, with reversible progress and reading holds. Mobile (<768px), short viewports (<620px), reduced motion, and content-too-tall cases use readable static rows. Descriptions remain visible. ResizeObserver measures actual .process-content height; data-process-part="image" belongs on the inner scaling wrapper.
- **Services** (`/projects`): butter-yellow surface with a two-column heading, a white workspace (vertical tab list + stacked panel grid using `grid-area: 1/1` for layout-stable crossfades), and an image per service. Tabs are a `tablist` with roving keyboard support (ArrowDown/Up/Left/Right/Home/End). Collapses to horizontal scrollable tabs at ≤1023px.
- **New token**: `--color-sage: #e5ecdd` added to `@theme` for the about tile.
- **Hero title sizing**: clamp reduced to `clamp(3.5rem, 8.5vw, 8rem)` and `overflow-x: clip` on `.home-hero` to prevent the `CREATIVE STUDIO` wordmark + registered mark from overflowing the viewport on narrow screens. The `<sup>` is now inline-flex (not absolutely positioned) so it stays inside the title box.

## Homepage contact section — 2026-10-06

- Footer `PERPIXEL` wordmark is scroll-linked (not a Reveal): `useScroll({ offset: ["start end", "end end"] })` on the footer drives `translateY` 30%→8%, so it rests pushed 8% below the footer's bottom edge (cropped by `overflow-hidden`) and rises slightly as the footer enters. Progress runs through `useSpring` (stiffness 120, damping 30 — overdamped, no bounce) so stepped/native scroll inputs still produce a smooth settle rather than 1:1 jumps. Reduced motion = static 8%. `Reveal` no longer has a `footer` variant.
- `#contact-us` sits between `FeaturedProjects` and the footer in `src/app/page.tsx`. Editorial headline (Archivo black lines + Instrument Serif italic "in mind?"), "CONTACT US" label, short paragraph, and a ruled CTA link with a coral circle `ArrowUpRight` → `/contact#form` (the real, working contact flow — no duplicated unconnected form).
- Styling is bespoke `home-contact-*` CSS in `globals.css` (border-block rule, two-column grid → stacked under 768px). Mobile heading clamp is `13.4vw` — `12vw`/`3.5rem` overflowed horizontally at 320px.
- Featured-card "hold plateau" gotcha for tests: at `go(0.25)` card 0 needs ~176px of scroll before `leave` starts; a 140px wheel tick can never move it. `test_featured_portfolio_scene` now wheels 300px forward, 140px back (net stays <176px so the return lands on the hold).
- Known wart (pre-existing): reloading mid-sticky-scene restores scroll ~2 viewport-heights deeper — scroll restoration lands while `data-motion="off"` (short static layout), then the off→on height growth + scroll anchoring shifts scrollY by the section delta. `overflow-anchor: none` on `.featured-section` made it worse (anchored to lower content → clamps at page bottom). Test re-scrolls into the pin after reload; a real fix would need care across all three sticky scenes.

## Conventions established — 2026-09-13

- Design tokens live in `globals.css` `@theme`: `paper`, `ink`, `word-pale`, `coral`, `blush`, `butter`, `line`. Fonts: Archivo (sans/display black) + Instrument Serif (editorial headings). Radius utility: `rounded-card`.
- Shared pieces: `Reveal` (IntersectionObserver once-reveal), `ArrowUpRight`, `BrandX` (SVG X mark), `.accordion` CSS rows (grid-template-rows 0fr→1fr), `scroll-sequence.ts` pure scroll math (`frameProgress`, `wordEmphasis`), `lenisRef` singleton for scroll lock.
- Pages: `/` (hero, bento, wordplay, process), `/projects` (hero + filterable gallery + rows), `/journal` (expandable entries), `/about`, `/contact` (form → copyable brief, FAQ accordion). Navbar center mark toggles a full-screen serif menu.
- Preloader: word cycle → X → X expands → fade reveal. `sessionStorage["pp-intro-done"]` skips on repeat loads; 6.5s failsafe; skip button; reduced-motion path.
- Intro lifecycle: `INTRO_BOOTSTRAP` (`src/lib/intro.ts`) is injected with `next/script` `beforeInteractive`. It adds `pp-intro-pending`, locks scroll before first paint, marks `header, main, footer` inert at `DOMContentLoaded`, supports Escape/click skip, and restores everything on finish/timeout. `setRegionsInert` (`src/lib/lenis.ts`) owns the hydrated state and preserves preexisting values; the managed top-level regions use `suppressHydrationWarning` for this expected pre-hydration mutation.
- Contact/newsletter forms have NO backend — they produce a copyable brief / honest "not connected" note. Keep it that way until a real integration is supplied.
- Images are Unsplash placeholders in `src/lib/site.ts` (`PROJECTS`, `PROCESS_FRAMES`) — swap for real assets when provided.
- Next 16 image API: use `preload` for the LCP image; `priority` is deprecated.
- Tests: `node --test tests/scroll-sequence.test.mjs`. Visual checks: `python tests/visual_check.py`, `tests/pages_check.py`, `tests/interaction_check.py` (Playwright; shots land in `tests/shots/`).
- Editor warning `Unknown at rule @theme` comes from the plain-CSS language service; `@theme` is valid Tailwind v4 syntax processed by `@tailwindcss/postcss`. Use the Tailwind CSS IntelliSense extension's Tailwind CSS language mode rather than removing design tokens or disabling CSS validation globally.

## Repository — 2026-10-06

- Remote: `origin` → `https://github.com/Koala-Codes05/Per-Pixel.git` (public, branch `main`). First push 2026-10-06; the remote was empty beforehand.
- Git identity is NOT set in git config (project rule: never modify it). Commit with per-command flags: `git -c user.name="Koala-Codes05" -c user.email="Koala-Codes05@users.noreply.github.com" commit ...`
- `.eslintcache` is gitignored (generated by `eslint --cache`).
- PowerShell shell: no `&&` or heredocs — chain with `;`, and pass multi-line commit messages as multiple `-m` flags. Git's stderr progress output surfaces as a `NativeCommandError` warning even on success; check the actual refs, not the exit noise.
- Vercel: project `koala-codes05s-projects/perpixel`, production https://perpixel-one.vercel.app. Vercel CLI 61.0.0 installed globally; login uses device-code OAuth (no TTY needed). `--name` must be lowercase — the folder name `PerPixel` fails validation, deploy with `--name perpixel`. The GitHub repo is connected, so pushes to `main` auto-deploy.

## Bugs and prevention

| Date | Issue | Root cause | Fix / prevention |
|------|-------|------------|------------------|
| 2026-09-12 | Project agent instructions overwritten during scaffolding | Scaffold files were moved over the existing `AGENTS.md` | Restored project workflow alongside Next's generated block; merge scaffolding files selectively in future. |
| 2026-09-12 | Initial scaffold name rejected | npm package names cannot begin with an underscore | Use a valid package name; the installed app is named `perpixel`. |
| 2026-09-13 | `react-hooks/set-state-in-effect` errors | Synchronous `setState` in effect bodies | Schedule state changes via timeouts/microtasks, or adjust state during render (Navbar `prevPath` pattern). |
| 2026-09-13 | Full-page screenshots showed "missing" sections | `whileInView`/`once` reveals never fired below the fold during capture | Scroll through the page before `full_page` screenshots — not a real bug, but verify before assuming content is broken. |
| 2026-09-13 | Page regions were focusable before the intro hydrated | `inert` was applied only in a React effect, after `DOMContentLoaded` | Apply/release temporary inert state in the intro bootstrap, then let `setRegionsInert` take ownership; suppress expected hydration diffs on the managed top-level regions only. |
| 2026-09-13 | Invalid contact emails kept a stale required-field error | Native browser validation intercepted submit because `noValidate={false}` | Use `noValidate` plus the custom submit validation; keep `required` on required fields for semantics. |
| 2026-09-14 | Horizontal overflow from hero `CREATIVE STUDIO` wordmark + absolutely positioned `<sup>` | The registered-mark `<sup>` was positioned at `right: -0.8em`, pushing past the viewport; Archivo Black glyphs are wide at `10.5vw` | Make the `<sup>` inline-flex inside the title, reduce the title clamp to `8.5vw`, and add `overflow-x: clip` to `.home-hero` as a safety net. |
| 2026-09-15 | Process travel disappeared after redesign | Frame transforms were removed and tests were changed to expect stationary rows; animated/mobile CSS hid descriptions | Restore frameProgress-driven translateY with layered sticky panels while retaining new styling; assert actual overlap, holds, reversal, and readable static descriptions. |
| 2026-09-14 | Test bounding-box equality assertions were too strict | Lenis smooth-scroll settling and float rounding caused sub-pixel/2px drift | Use tolerance-based `same_box()` (±2.5px) for hero phrase stability and container-relative metrics for the services panel stability. |
| 2026-09-14 | Slow build & dev compilation times on Windows | Unexcluded Defender real-time scanning on D: drive, cold Turbopack cache, unoptimized Motion imports, and unscached ESLint | Added `optimizePackageImports: ["motion", "lenis"]` in `next.config.ts`, excluded `.next/cache` in `tsconfig.json`, added `"type": "module"` and `--cache` to `package.json`, and documented Defender exclusion for the project folder. |
|| 2026-09-13 | "Site not starting/compiling for 10–20 min" (user report) | Not a crash — site compiles & runs. Cold `/` compile = 16.8s (Turbopack first-compile of `motion`/`lenis` graph); warm = 0.4s. The 10–20 min is Defender real-time scanning compounding across thousands of small file ops; Next flagged "Slow filesystem benchmark 521ms" (up from 206ms — exclusion still not applied). | No code bug. Fix is `Add-MpPreference -ExclusionPath "D:\Dev Domain\~Projects\PerPixel"` (admin PowerShell). `optimizePackageImports` is a **no-op under Turbopack** (docs: Turbopack auto-optimizes) — left in place as harmless + helps `--webpack` fallback. Optional: `next/dynamic` lazy-load `Wordplay`/`Process` to shrink first-compile graph (~30% shave, not a Defender fix). |
| 2026-09-15 | Reduced-motion service tabs overlap | Generic opacity:1!important rule included all service panels | Exclude .service-panel from the opacity override, reset only its transform, and let data-active control visibility. |
| 2026-09-15 | Preloader diagnostic crashes after successful completion | tests/preloader_check.py called getComputedStyle(null) after overlay unmounted | Null-guard diagnostics and assert session completion, released locks/inert state, and no console/page errors. |
| 2026-10-06 | "Smooth scroll not working" user report — Lenis verified working (real wheel input → eased multi-frame scroll, `lenis-smooth` class active mid-scroll) on localhost AND prod | No code bug found | Diagnostic trick: `dispatchEvent(new WheelEvent(...))` is untrusted and cannot natively scroll — if scrollY still moves smoothly, Lenis drove it. If users report dead scroll, check `prefers-reduced-motion` (Lenis `respectReducedMotion` + `SmoothScroll` both disable it by design), touch input (`smoothTouch` off by default), or scrolling during the ≤6.5s intro lock. |
