# Latest task — Assembly case study

## Changed

- Added Assembly to the `/projects` gallery and project rows, linking to a dedicated `/projects/assembly` case study. The PixieKat feature on `/projects` and all homepage featured cards remain unchanged.
- Built the case study around Assembly's live visual identity, fictional editorial studies, Culinary Atelier and local event brief planner. It labels the project as a concept and links to the live demo.
- Copied two optimized photographs and two SVG illustrations from the live Assembly site into `public/projects/assembly/`.

## Relevant files

- `src/lib/site.ts`
- `src/app/(site)/projects/assembly/page.tsx`
- `public/projects/assembly/`
- `memory.md`, `last_summary.md`

## Verification

- `npm run build` passed, including TypeScript and static generation of `/projects/assembly`.
- Targeted ESLint passed with a task-specific cache; `git diff --check` passed.
- Local production HTTP checks returned 200 for `/projects/assembly` and `/projects`; expected case study copy, live link and Assembly gallery listing were present.
- Browser screenshot QA could not run because the browser access host was unavailable.

## Current state and next step

- Publish the verified change to `main`, then check the public case study and project listing once deployment completes.
