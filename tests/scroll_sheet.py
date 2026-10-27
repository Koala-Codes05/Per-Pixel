"""Viewport screenshots stepping through a section, tiled into one contact sheet.

Usage: python tests/scroll_sheet.py <width> <height> <route> <selector> [steps]
Writes tests/shots/sheet-<w>-<selector>.png. Uses real wheel input so Lenis/sticky scenes behave as in use.
"""
import sys
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = "http://localhost:3000"
W, H, ROUTE, SEL = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3].strip("/"), sys.argv[4]
STEPS = int(sys.argv[5]) if len(sys.argv) > 5 else 8

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": W, "height": H}, is_mobile=W < 768, has_touch=W < 1024)
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    page = ctx.new_page()
    page.goto(f"{BASE}/{ROUTE}", wait_until="networkidle", timeout=120000)
    page.wait_for_timeout(1200)
    info = page.evaluate(f"""() => {{
      const el = document.querySelector({SEL!r});
      const r = el.getBoundingClientRect();
      return {{ top: r.top + scrollY, height: el.offsetHeight, motion: el.dataset.motion || null }};
    }}""")
    print(info)
    span = max(0, info["height"] - H)
    shots = []
    for i in range(STEPS):
        y = info["top"] + span * i / max(1, STEPS - 1)
        page.evaluate(f"window.scrollTo(0, {y})")
        page.wait_for_timeout(450)
        page.evaluate("document.querySelectorAll('nextjs-portal').forEach(e=>e.remove())")
        path = f"tests/shots/_step{i}.png"
        page.screenshot(path=path)
        shots.append(Image.open(path))
    sheet = Image.new("RGB", (len(shots) * (W + 12), H), "white")
    for i, im in enumerate(shots):
        sheet.paste(im, (i * (W + 12), 0))
    name = SEL.strip(".#").replace(" ", "_")
    sheet.save(f"tests/shots/sheet-{W}-{name}.png")
    b.close()
