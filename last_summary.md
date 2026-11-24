# Last summary — PerPixel

## 2026-11-25 — Allow LAN dev origin

- Added `192.168.1.3` to `allowedDevOrigins` in `next.config.ts`, preserving the existing local and LAN entries. This addresses Next.js blocking dev-only resources when the site is opened at `http://192.168.1.3:3000/`.
- `npm run build` and `npx eslint . --cache --cache-location ./.eslintcache-task` passed. The existing dev server on port 3000 returned HTTP 200 for `/__nextjs_font/geist-latin.woff2` with `Origin: http://192.168.1.3:3000` and for a no-cors request with that address as the referer. A separate dev server could not start because this project already has one running on port 3000.
- Changes are local and uncommitted. The prior PixieKat portfolio work remains in the project.

### Next useful step

Refresh the site from the LAN address and confirm the console warning is gone. If the running dev server still logs the old warning, restart it so it loads the updated config. The later US dollar pricing and About location updates remain outstanding.
