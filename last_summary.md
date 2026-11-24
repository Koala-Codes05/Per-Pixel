# Last summary — PerPixel

## 2026-11-25 — PixieKat live portfolio project

- Added PixieKat to the shared project list as live work and created `/projects/pixiekat` with the challenge, experience, capabilities, launch status, and a link to the live store. Its imagery comes from the user-supplied case study PDF and is optimized under `public/projects/pixiekat/`.
- Homepage featured order is now Ghaslet, PixieKat, Moove, Sorso. Dune remains in the full Projects gallery. Home and gallery badges distinguish PixieKat from concept projects, and the Projects page intro and latest-work card now acknowledge live work.
- `npm run build` passed, including TypeScript and static generation of `/projects/pixiekat`. `npx eslint . --cache --cache-location ./.eslintcache-task` passed after temporary PDF extraction scripts were removed; `npm run lint` remains blocked by `EPERM` on the existing `.eslintcache`. `git diff --check` passed before the final notes update. Generated HTML checks confirmed the featured order, the full gallery's Dune and Moove entries, and the PixieKat route and live link.
- Changes are local and uncommitted. Browser visual inspection was unavailable because the browser access host was unavailable; the extracted cover image and PDF screenshot contact sheet were inspected locally.

### Next useful step

Visually review the new case study and featured card on desktop, tablet, and mobile, then continue with the requested US dollar pricing and About location updates. Deployment has not been requested.
