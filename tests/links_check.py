"""Every project/footer/bento link resolves; deep links and static works navigate correctly (dev server on :3000)."""
import json
import urllib.request
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
out = {"bad_links": []}

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    page = ctx.new_page()
    errors = []
    page.on("pageerror", lambda ex: errors.append(str(ex)[:200]))

    hrefs = set()
    for route in ["/", "/projects", "/journal", "/about", "/contact", "/projects/velora", "/projects/field-notes"]:
        page.goto(BASE + route, wait_until="networkidle", timeout=120000)
        hrefs |= set(page.evaluate("[...document.querySelectorAll('a[href^=\"/\"]')].map(a => a.getAttribute('href'))"))
    out["nav_has_playbook"] = page.evaluate("!!document.querySelector('header a[href=\"/playbook\"], footer a[href=\"/playbook\"]')")
    for href in sorted(hrefs):
        path = href.split("#")[0] or "/"
        try:
            code = urllib.request.urlopen(BASE + path, timeout=120).status
        except Exception as exc:  # noqa: BLE001
            code = getattr(exc, "code", str(exc))
        if code != 200:
            out["bad_links"].append([href, code])
    out["checked"] = len(hrefs)

    # Bento "Read the story" deep link opens its journal entry.
    page.goto(BASE + "/", wait_until="networkidle")
    page.locator("a.bento-article").click()
    page.wait_for_url("**/journal#ai-driven-design", timeout=20000)
    page.wait_for_timeout(2600)
    out["journal_deep_link_open"] = page.evaluate("document.querySelector('#ai-driven-design button').getAttribute('aria-expanded')")

    # Case-study card → case page via page transition, then next-project link.
    page.goto(BASE + "/projects", wait_until="networkidle")
    page.locator("a.project-card[href='/projects/kilim']").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.locator("a.project-card[href='/projects/kilim']").click()
    page.wait_for_url("**/projects/kilim", timeout=20000)
    page.wait_for_timeout(2600)
    out["kilim"] = page.evaluate("({h1: document.querySelector('h1')?.textContent, inert: document.body.inert, lock: document.documentElement.classList.contains('pp-lock'), title: document.title})")
    page.locator("a.case-next-link").click()
    page.wait_for_url("**/projects/norra", timeout=20000)
    page.wait_for_timeout(2600)
    out["next_from_kilim"] = page.evaluate("location.pathname")

    # Static work opens as a normal document load (no page-transition freeze).
    page.goto(BASE + "/projects", wait_until="networkidle")
    page.locator("a.project-card[href='/works/dune/index.html']").scroll_into_view_if_needed()
    page.wait_for_timeout(1200)
    page.locator("a.project-card[href='/works/dune/index.html']").click()
    page.wait_for_url("**/works/dune/index.html", timeout=30000)
    out["static_work"] = page.evaluate("location.pathname")

    # Playbook is reachable directly but not indexed.
    page.goto(BASE + "/playbook", wait_until="domcontentloaded")
    out["playbook_robots"] = page.evaluate("document.querySelector('meta[name=robots]')?.content")
    out["errors"] = errors[:8]
    b.close()

print(json.dumps(out, indent=1))
