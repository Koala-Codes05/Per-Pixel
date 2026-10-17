"""Screenshot the ported Sorso route with the intro skipped (dev server on :3000)."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"

def hide_dev_overlay(page):
    page.evaluate(
        "document.querySelectorAll('nextjs-portal,[data-nextjs-toast],[id^=__next-build]').forEach(e=>e.remove())"
    )

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    pg = ctx.new_page()
    pg.goto(f"{BASE}/projects/sorso", wait_until="networkidle")
    pg.wait_for_timeout(1000)
    hide_dev_overlay(pg)
    pg.screenshot(path="tests/shots/sorso-hero.png")
    el = pg.query_selector("#flavours")
    pg.evaluate(f"window.scrollTo(0, {el.bounding_box()['y'] - 80})")
    pg.wait_for_timeout(700)
    hide_dev_overlay(pg)
    pg.screenshot(path="tests/shots/sorso-flavours.png")
    pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
    pg.wait_for_timeout(700)
    hide_dev_overlay(pg)
    pg.screenshot(path="tests/shots/sorso-footer.png")

    mctx = b.new_context(viewport={"width": 390, "height": 844})
    mctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    m = mctx.new_page()
    m.goto(f"{BASE}/projects/sorso", wait_until="networkidle")
    m.wait_for_timeout(900)
    hide_dev_overlay(m)
    m.screenshot(path="tests/shots/sorso-mobile.png")
    b.close()
print("done")
