from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    page = ctx.new_page()
    page.goto("http://localhost:3000/projects", wait_until="networkidle")
    services = page.locator("#services")
    tabs = services.get_by_role("tab")
    services.scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    stage = services.locator(".services-panels")

    def m():
        return stage.evaluate(
            "el => { const r = el.getBoundingClientRect(); const p = el.offsetParent.getBoundingClientRect();"
            "return { w: Math.round(r.width), h: Math.round(r.height), dx: Math.round(r.left-p.left), dy: Math.round(r.top-p.top) }; }"
        )

    print("before", m())
    tabs.nth(1).click()
    page.wait_for_timeout(400)
    print("after click", m())
    tabs.nth(1).press("ArrowDown")
    page.wait_for_timeout(200)
    print("after ArrowDown", m())
    tabs.nth(2).press("End")
    page.wait_for_timeout(200)
    print("after End", m())
    tabs.last.press("ArrowRight")
    page.wait_for_timeout(400)
    print("after ArrowRight", m())
    b.close()
