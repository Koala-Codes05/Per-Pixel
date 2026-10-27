"""Reduced motion: no intro trap, reveals visible, sticky scenes static, liquid card still (any server on :3000)."""
import json
from playwright.sync_api import sync_playwright

out = {}
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, size in {"mobile": (390, 844), "desktop": (1440, 900)}.items():
        ctx = b.new_context(viewport={"width": size[0], "height": size[1]}, reduced_motion="reduce", is_mobile=size[0] < 768, has_touch=size[0] < 768)
        page = ctx.new_page()
        page.goto("http://localhost:3000/", wait_until="networkidle", timeout=120000)
        page.wait_for_function("!document.documentElement.classList.contains('pp-intro-pending')", timeout=5000)
        home = page.evaluate("""() => ({
          motion: [...document.querySelectorAll('[data-motion]')].map(e => e.dataset.motion),
          hiddenReveals: [...document.querySelectorAll('.reveal')].filter(e => getComputedStyle(e).opacity !== '1').length,
          locked: document.documentElement.classList.contains('pp-lock'),
        })""")
        page.goto("http://localhost:3000/projects/norra", wait_until="networkidle")
        page.evaluate("window.scrollTo(0, document.querySelector('.case-wordmark-card').getBoundingClientRect().top + scrollY - 100)")
        page.wait_for_timeout(400)
        t1 = page.evaluate("getComputedStyle(document.querySelector('.case-wordmark-card'), '::before').transform")
        page.wait_for_timeout(600)
        t2 = page.evaluate("getComputedStyle(document.querySelector('.case-wordmark-card'), '::before').transform")
        out[name] = {"home": home, "liquid_static": t1 == t2, "case_hidden_reveals": page.evaluate("[...document.querySelectorAll('.reveal')].filter(e => getComputedStyle(e).opacity !== '1').length")}
        ctx.close()
    b.close()
print(json.dumps(out, indent=1))
