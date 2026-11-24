# Last summary — PerPixel

## 2026-11-25 — PixieKat first and live store link

- Added a prominent "PixieKat is live / Visit the live store" link above the homepage headline in `src/components/home/Hero.tsx`, styled in `src/app/globals.css`. It opens `https://www.pixiekat.store/` in a new tab.
- Reordered the homepage featured cards to PixieKat, Ghaslet, Moove, Sorso and placed PixieKat before Ghaslet in the shared project list, which also controls the full Projects gallery and rows. The PixieKat cards still open the PerPixel case study.
- `npm run build`, ESLint with the alternate cache path, and `git diff --check` passed. Generated HTML checks confirmed the hero link appears before the headline and PixieKat precedes Ghaslet in both project sections. Browser visual inspection was unavailable because the browser access host was unavailable.
- Changes are local and uncommitted. The prior LAN origin fix remains in place.

### Next useful step

Review the new hero link on desktop and mobile in the local site. The requested US dollar pricing and About location updates remain outstanding.
