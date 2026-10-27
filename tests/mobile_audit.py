"""Mobile/tablet audit: overflow offenders, console errors, broken images, and contact-sheet screenshots.

Usage: python tests/mobile_audit.py [width] [height] [route ...]
Writes tests/shots/audit-<w>-<route>.png (full page tiled into columns for quick review).
"""
import json
import sys
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = "http://localhost:3000"
W = int(sys.argv[1]) if len(sys.argv) > 1 else 390
H = int(sys.argv[2]) if len(sys.argv) > 2 else 844
ROUTES = [r.strip("/") for r in sys.argv[3:]] or ["", "projects", "journal", "about", "contact", "projects/moove", "projects/sorso", "projects/velora", "projects/kilim", "projects/norra", "projects/atlas", "projects/field-notes"]
TILE = 2200

OVERFLOW_JS = """
() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.right > vw + 1 || r.left < -1) {
      let clipped = false;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (/(hidden|clip|auto|scroll)/.test(cs.overflowX)) {
          const pr = p.getBoundingClientRect();
          if (pr.right <= vw + 1 && pr.left >= -1) { clipped = true; break; }
        }
      }
      if (!clipped) out.push({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 60), left: Math.round(r.left), right: Math.round(r.right), text: (el.textContent || '').trim().slice(0, 40) });
    }
  }
  return { vw, sw: document.documentElement.scrollWidth, offenders: out.slice(0, 15) };
}
"""

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": W, "height": H}, is_mobile=W < 768, has_touch=W < 1024, device_scale_factor=1)
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    report = {}
    for route in ROUTES:
        page = ctx.new_page()
        errors = []
        page.on("console", lambda m, e=errors: e.append(m.text[:200]) if m.type == "error" else None)
        page.on("pageerror", lambda ex, e=errors: e.append(str(ex)[:200]))
        page.goto(f"{BASE}/{route}", wait_until="networkidle", timeout=120000)
        page.wait_for_timeout(1200)
        height = page.evaluate("document.documentElement.scrollHeight")
        for y in range(0, int(height), 500):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(50)
        page.evaluate("window.scrollTo(0, 0)")
        page.wait_for_timeout(800)
        page.evaluate("document.querySelectorAll('nextjs-portal').forEach(e=>e.remove())")
        overflow = page.evaluate(OVERFLOW_JS)
        broken = page.evaluate("[...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src).slice(0, 10)")
        name = route.replace("/", "-") or "home"
        path = f"tests/shots/audit-{W}-{name}-full.png"
        page.screenshot(path=path, full_page=True)
        img = Image.open(path)
        cols = max(1, -(-img.height // TILE))
        sheet = Image.new("RGB", (cols * (img.width + 16), min(img.height, TILE)), "white")
        for i in range(cols):
            sheet.paste(img.crop((0, i * TILE, img.width, min(img.height, (i + 1) * TILE))), (i * (img.width + 16), 0))
        sheet.save(f"tests/shots/audit-{W}-{name}.png")
        report[route or "/"] = {"height": height, "errors": errors[:8], "broken_images": broken, **overflow}
        page.close()
    b.close()
print(json.dumps(report, indent=1))
