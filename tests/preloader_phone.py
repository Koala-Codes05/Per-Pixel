"""Record the intro on a throttled phone profile: timeline + tiled frames.

Usage: python tests/preloader_phone.py [base_url] [cpu_slowdown]
Writes tests/shots/preloader-phone.png (one frame every 250ms).
"""
import json
import sys
import time
from playwright.sync_api import sync_playwright
from PIL import Image

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:3000"
CPU = float(sys.argv[2]) if len(sys.argv) > 2 else 4

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 664}, is_mobile=True, has_touch=True, device_scale_factor=1)
    page = ctx.new_page()
    cdp = ctx.new_cdp_session(page)
    cdp.send("Emulation.setCPUThrottlingRate", {"rate": CPU})
    cdp.send("Network.enable")
    cdp.send("Network.emulateNetworkConditions", {"offline": False, "latency": 120, "downloadThroughput": 1_200_000, "uploadThroughput": 400_000})
    page.add_init_script("""
      window.__log = [];
      const t0 = performance.now();
      const log = (m) => window.__log.push([Math.round(performance.now() - t0), m]);
      new MutationObserver(() => {
        const html = document.documentElement;
        const pre = document.querySelector('.preloader');
        const s = [html.classList.contains('pp-intro-pending') ? 'pending' : 'released', pre ? 'phase=' + pre.dataset.phase : 'no-preloader'].join(' ');
        if (window.__last !== s) { window.__last = s; log(s); }
      }).observe(document, { subtree: true, attributes: true, childList: true });
    """)
    t0 = time.time()
    page.goto(BASE + "/", wait_until="commit", timeout=120000)
    frames = []
    for i in range(36):
        page.wait_for_timeout(250)
        path = f"tests/shots/_pl{i}.png"
        try:
            page.screenshot(path=path, timeout=3000)
            frames.append(Image.open(path).copy())
        except Exception:  # noqa: BLE001
            pass
    log = page.evaluate("window.__log")
    print(json.dumps({"wall_s": round(time.time() - t0, 1), "log": log[:30]}, indent=1))
    cols = 12
    w, h = 390 // 2, 664 // 2
    sheet = Image.new("RGB", (cols * (w + 6), ((len(frames) + cols - 1) // cols) * (h + 6)), "#888")
    for i, f in enumerate(frames):
        sheet.paste(f.resize((w, h)), ((i % cols) * (w + 6), (i // cols) * (h + 6)))
    sheet.save("tests/shots/preloader-phone.png")
    b.close()
