<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PerPixel project rules

## Read first

- Read `README.md`, `memory.md`, and `last_summary.md` before changing the project.
- The README and the user's desktop/tablet homepage references define the visual intent.
- This is a new implementation: the user confirmed there is no existing site to port.

## Required task handoff

After EVERY completed task, before replying to the user:

1. Update `memory.md` with durable design decisions, conventions, useful commands, and recurring bugs with their causes/fixes. Merge related entries; do not invent bugs or duplicate old notes. Record that the memory was reviewed if nothing new was learned.
2. Replace `last_summary.md` with what changed, relevant files, current state, verification results, blockers, and the next useful step. Never claim unrun checks passed.

This applies to features, fixes, refactors, configuration, and documentation work. Do not wait to be asked.

## Implementation

- Stack: Next.js App Router, React, TypeScript, Tailwind CSS v4, Motion, and Lenis. No Three.js unless actual 3D is needed.
- Keep static content in Server Components; use small Client Components for interaction.
- Preserve typography, pastel colors, whitespace, rounded image clipping, and art-directed responsive layouts.
- Prefer `transform`, `opacity`, and `clip-path`; avoid unnecessary layout animation. Accordion expansion is an intentional exception from README section 16.
- Use editorial easing: `cubic-bezier(0.22, 1, 0.36, 1)` for entrances and `cubic-bezier(0.16, 1, 0.3, 1)` for larger movement. No bounce.
- Major scroll sequences use continuous, reversible progress, not timers or one-shot observers. Keep frame-by-frame updates outside React state.
- Animate images inside stable containers; reserve dimensions and preserve focal points.
- Respect reduced motion, keyboard navigation, focus, and touch input. Never leave the page scroll-locked after the intro.
- Reuse components and assets. Future work must extend the implementation rather than rebuild it.
- Preserve this file when scaffolding or upgrading. Merge generated rules; never overwrite project instructions.

## Verification

- `npm run dev` starts the local development server.
- `npm run lint` checks ESLint; `npm run build` runs the production build and TypeScript checking.
- Verify desktop, tablet, and mobile; forward/backward and fast/slow scrolling; fresh load/reload; reduced motion; keyboard interaction; failed images and layout stability.
- Do not invent working integrations, contact addresses, social URLs, or client claims when they have not been supplied.
