"""iPhone (WebKit) smoke test: intro release, menu, tap navigation, sticky scenes, errors.

Usage: python tests/webkit_phone.py [base_url]   (defaults to http://localhost:3000)
"""
import json
import sys
import time
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:3000"
out = {}

with sync_playwright() as p:
    b = p.webkit.launch()
    ctx = b.new_context(**p.devices["iPhone 13"])
    page = ctx.new_page()
    errs = []
    page.on("pageerror", lambda ex: errs.append(str(ex)[:240]))
    page.on("console", lambda m: errs.append(m.text[:240]) if m.type == "error" else None)

    t0 = time.time()
    page.goto(BASE + "/", wait_until="domcontentloaded", timeout=120000)
    page.wait_for_function("!document.documentElement.classList.contains('pp-intro-pending')", timeout=20000)
    out["intro_released_s"] = round(time.time() - t0, 2)
    page.wait_for_timeout(800)
    out["after_intro"] = page.evaluate("""() => ({
      cls: document.documentElement.className.replace(/\\S+module__\\S+/g, '').trim(),
      inert: [...document.querySelectorAll('header,main,footer')].map(e => e.inert),
      overflow: getComputedStyle(document.documentElement).overflow,
      motion: [...document.querySelectorAll('[data-motion]')].map(e => e.className.split(' ')[0] + ':' + e.dataset.motion),
      vw: innerWidth, sw: document.documentElement.scrollWidth,
    })""")
    page.screenshot(path="tests/shots/wk-home.png")
    page.evaluate("window.scrollTo(0, 2500)")
    page.wait_for_timeout(700)
    out["scroll_y"] = page.evaluate("scrollY")
    page.screenshot(path="tests/shots/wk-scroll.png")
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(700)

    page.locator("button.brand-toggle").tap()
    page.wait_for_timeout(700)
    out["menu_open"] = page.evaluate("document.querySelector('.menu-panel').dataset.open")
    page.locator(".menu-panel a", has_text="Projects").tap()
    page.wait_for_url("**/projects", timeout=20000)
    page.wait_for_timeout(2600)
    out["after_nav"] = page.evaluate("({url: location.pathname, bodyInert: document.body.inert, transition: document.documentElement.dataset.pageTransition || null, lock: document.documentElement.classList.contains('pp-lock')})")
    page.screenshot(path="tests/shots/wk-projects.png")

    card = page.locator(".project-card").first
    card.scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    card.tap()
    page.wait_for_timeout(3500)
    out["after_card_tap"] = page.evaluate("location.pathname")
    out["errors"] = errs[:10]
    b.close()

print(json.dumps(out, indent=1))
