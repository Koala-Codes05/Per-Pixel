"""Screenshot sticky sections mid-scroll on phone + desktop."""
import sys
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

shots = [
    ("/", ".process-section", [0.15, 0.5, 0.9], "process"),
    ("/", ".featured-section", [0.5], "featured"),
    ("/projects/moove", ".moove-shell-section", [0.15, 0.5, 0.9], "shell"),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    for name, vp in [("m", {"width": 390, "height": 844, "is_mobile": True, "has_touch": True}),
                     ("d", {"width": 1440, "height": 900})]:
        ctx = b.new_context(viewport=vp, device_scale_factor=1)
        page = ctx.new_page()
        for path, sel, fracs, tag in shots:
            page.goto(BASE + path, wait_until="networkidle")
            page.evaluate("""() => {
              const s = document.querySelector('.preloader-skip'); if (s) s.click();
              window.dispatchEvent(new Event('pp:intro-end'));
            }""")
            page.wait_for_timeout(400)
            info = page.evaluate("(sel) => { const s = document.querySelector(sel); if (!s) return null; const r = s.getBoundingClientRect(); return {top: r.top + window.scrollY, h: r.height}; }", sel)
            if not info:
                continue
            dist = max(1, info["h"] - page.viewport_size["height"])
            for f in fracs:
                page.evaluate("(y) => window.scrollTo({top: y, behavior:'instant'})", info["top"] + dist * f)
                page.wait_for_timeout(350)
                page.screenshot(path=f"tests/shots/sticky-{tag}-{name}-{int(f*100)}.png")
        ctx.close()
    b.close()
print("done")
