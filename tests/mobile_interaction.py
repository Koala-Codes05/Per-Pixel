"""Touch-device interaction smoke test: fresh-load intro, menu open/close, menu navigation, tap links, scroll release.

Usage: python tests/mobile_interaction.py  (dev server on :3000)
"""
import json
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
results = {}

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda ex: errors.append(str(ex)[:200]))
    page.on("console", lambda m: errors.append(m.text[:200]) if m.type == "error" else None)

    page.goto(BASE + "/", wait_until="domcontentloaded", timeout=120000)
    page.wait_for_timeout(500)
    results["intro_pending_at_start"] = page.evaluate("document.documentElement.classList.contains('pp-intro-pending')")
    page.wait_for_function("!document.documentElement.classList.contains('pp-intro-pending')", timeout=15000)
    page.wait_for_timeout(600)
    state = page.evaluate("({cls: document.documentElement.className, inert: [...document.querySelectorAll('header,main,footer')].map(e => e.inert)})")
    results["after_intro"] = state

    # Touch scroll releases
    page.mouse.wheel(0, 1200)
    page.wait_for_timeout(1500)
    results["scrolled_y"] = page.evaluate("scrollY")
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(800)

    # Menu
    toggle = page.locator("button.brand-toggle")
    toggle.tap()
    page.wait_for_timeout(700)
    results["menu_open"] = page.evaluate("document.querySelector('.menu-panel').dataset.open")
    results["menu_links_visible"] = page.locator(".menu-panel a").count()
    page.screenshot(path="tests/shots/mi-menu-open.png")
    page.locator(".menu-panel a", has_text="Projects").tap()
    page.wait_for_url("**/projects", timeout=20000)
    page.wait_for_timeout(2500)
    results["after_menu_nav"] = {"url": page.url, "menu": page.evaluate("document.querySelector('.menu-panel').dataset.open"),
                                 "lock": page.evaluate("document.documentElement.className"), "bodyInert": page.evaluate("document.body.inert")}
    page.mouse.wheel(0, 900)
    page.wait_for_timeout(1500)
    results["projects_scroll_y"] = page.evaluate("scrollY")

    # Filter chips on projects
    chips = page.locator("button", has_text="Editorial")
    if chips.count():
        chips.first.tap()
        page.wait_for_timeout(600)
        results["filter_visible_cards"] = page.evaluate("[...document.querySelectorAll('.project-card')].filter(c => c.getClientRects().length && getComputedStyle(c).display !== 'none').length")

    # Back to home via logo
    page.locator("a[aria-label='PerPixel home']").tap()
    page.wait_for_url(BASE + "/", timeout=20000)
    page.wait_for_timeout(2500)
    results["home_after_logo"] = {"url": page.url, "bodyInert": page.evaluate("document.body.inert"), "cls": page.evaluate("document.documentElement.className")}

    # Contact form submit
    page.goto(BASE + "/contact", wait_until="networkidle")
    page.wait_for_timeout(1000)
    page.fill("input[name=name]", "Test Person")
    page.fill("input[type=email]", "test@example.com")
    page.fill("textarea", "Hello there, a test brief.")
    page.locator("form button[type=submit]").first.tap()
    page.wait_for_timeout(800)
    results["contact_after_submit"] = page.evaluate("document.querySelector('form')?.parentElement?.innerText.slice(0, 300)")

    # FAQ
    faq = page.locator("#faq button").first
    faq.tap()
    page.wait_for_timeout(600)
    results["faq_expanded"] = faq.get_attribute("aria-expanded")
    results["errors"] = errors[:10]
    b.close()

print(json.dumps(results, indent=1))
