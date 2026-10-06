"""Full-page shots after a real scroll-through so whileInView reveals have fired."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
OUT = "tests/shots"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    for route in ["projects", "journal", "about", "contact"]:
        page.goto(f"{BASE}/{route}", wait_until="networkidle")
        page.wait_for_timeout(4800)  # let the preloader finish
        # Scroll through the page to trigger once:true reveals.
        height = page.evaluate("document.body.scrollHeight")
        for y in range(0, int(height), 600):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(60)
        page.evaluate("window.scrollTo(0,0)")
        page.wait_for_timeout(600)
        page.screenshot(path=f"{OUT}/desktop-{route}.png", full_page=True)
    browser.close()
print("done")
