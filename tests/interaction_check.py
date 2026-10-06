"""Interaction checks: menu overlay, project filters, FAQ accordion, and contact brief."""
from playwright.sync_api import sync_playwright, expect

BASE = "http://localhost:3000"
OUT = "tests/shots"
LOADER = '[aria-label="PerPixel is loading"]'

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    context.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
    context.grant_permissions(["clipboard-read", "clipboard-write"], origin=BASE)
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    def assert_unlocked():
        assert not page.evaluate("document.documentElement.classList.contains('pp-lock')")
        assert page.evaluate("getComputedStyle(document.documentElement).overflowY") != "hidden"
        assert not page.locator("main").evaluate("el => !!el.closest('[inert]')")

    def same_box(a, b, tol=2.5):
        assert a is not None and b is not None
        for key in ("x", "y", "width", "height"):
            assert abs(a[key] - b[key]) <= tol, (key, a[key], b[key])

    page.goto(BASE, wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)
    assert_unlocked()

    phrase = page.locator(".hero-phrase")
    expect(phrase).to_have_attribute("data-index", "0")
    expect(page.locator("h1")).to_contain_text("Creative")
    page.wait_for_timeout(1400)
    expect(phrase).to_have_attribute("data-index", "0")
    page.mouse.wheel(0, 180)
    page.wait_for_timeout(500)
    expect(phrase).to_have_attribute("data-index", "0")
    page.evaluate("window.scrollTo({top: 0, behavior: 'instant'})")
    page.wait_for_timeout(500)
    before = phrase.bounding_box()
    page.mouse.move(150, 240)
    expect(phrase).to_have_attribute("data-index", "1")
    page.wait_for_timeout(140)
    same_box(phrase.bounding_box(), before)
    opacities = phrase.locator(".hero-phrase-line").evaluate_all("els => els.map(el => +getComputedStyle(el).opacity)")
    assert any(0 < opacity < 1 for opacity in opacities), opacities
    for x in range(160, 480, 20):
        page.mouse.move(x, 240)
    expect(phrase).to_have_attribute("data-index", "1")
    page.wait_for_timeout(1200)
    expect(phrase).to_have_attribute("data-index", "1")
    page.mouse.move(461, 241)
    expect(phrase).to_have_attribute("data-index", "1")
    page.mouse.click(461, 241)
    expect(phrase).to_have_attribute("data-index", "0")
    page.wait_for_timeout(1150)
    page.keyboard.press("Tab")
    expect(phrase).to_have_attribute("data-index", "1")
    page.wait_for_timeout(1150)
    page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").hover()
    expect(phrase).to_have_attribute("data-index", "0")
    same_box(phrase.bounding_box(), before)
    page.reload(wait_until="networkidle")
    expect(phrase).to_have_attribute("data-index", "0")

    # Bento grid present?
    page.evaluate("window.scrollTo(0, window.innerHeight * 0.9)")
    page.wait_for_timeout(300)
    page.screenshot(path=f"{OUT}/desktop-bento.png")

    # Menu overlay: opens, locks page regions, traps focus, and closes with Escape.
    toggle = page.locator('button[aria-controls="site-menu"]')
    toggle.click()
    expect(toggle).to_have_attribute("aria-expanded", "true")
    expect(page.locator(".brand-mark")).to_have_attribute("data-state", "open")
    expect(page.locator("main")).to_have_attribute("inert", "")
    assert page.evaluate("getComputedStyle(document.documentElement).overflowY") == "hidden"
    expect(page.locator(".menu-panel a").first).to_be_focused()
    page.wait_for_timeout(450)
    page.screenshot(path=f"{OUT}/desktop-menu.png")
    page.keyboard.press("Escape")
    expect(toggle).to_be_focused()
    expect(page.locator("#site-menu")).to_have_attribute("aria-hidden", "true")
    assert_unlocked()

    # Projects: filters update the result set accessibly.
    page.goto(f"{BASE}/projects", wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)
    expect(page.locator(".project-card")).to_have_count(6)
    page.get_by_role("button", name="Design").click()
    expect(page.get_by_role("button", name="Design")).to_have_attribute("aria-pressed", "true")
    expect(page.locator(".project-card")).to_have_count(1)
    expect(page.get_by_text("1 project shown")).to_have_text("1 project shown")
    page.get_by_role("button", name="All").click()
    expect(page.locator(".project-card")).to_have_count(6)

    services = page.locator("#services")
    tabs = services.get_by_role("tab")
    expect(tabs).to_have_count(4)
    expect(tabs.first).to_have_attribute("aria-selected", "true")
    services.scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    stage = services.locator(".services-panels")

    def stage_metrics():
        return stage.evaluate(
            "el => { const r = el.getBoundingClientRect(); const p = el.offsetParent.getBoundingClientRect();"
            "return { w: Math.round(r.width), h: Math.round(r.height), dx: Math.round(r.left - p.left), dy: Math.round(r.top - p.top) }; }"
        )

    stage_before = stage_metrics()
    tabs.nth(1).click()
    expect(tabs.nth(1)).to_have_attribute("aria-selected", "true")
    expect(services.get_by_role("tabpanel")).to_have_count(1)
    expect(services.get_by_role("tabpanel")).to_contain_text("Brand strategy")
    page.wait_for_timeout(400)
    assert stage_metrics() == stage_before
    tabs.nth(1).press("ArrowDown")
    expect(tabs.nth(2)).to_be_focused()
    expect(tabs.nth(2)).to_have_attribute("aria-selected", "true")
    tabs.nth(2).press("End")
    expect(tabs.last).to_have_attribute("aria-selected", "true")
    tabs.last.press("ArrowRight")
    expect(tabs.first).to_be_focused()
    expect(tabs.first).to_have_attribute("aria-selected", "true")
    expect(services.get_by_role("tabpanel")).to_have_attribute("aria-labelledby", "service-tab-0")
    assert stage_metrics() == stage_before
    page.screenshot(path=f"{OUT}/desktop-services.png")

    # Contact: validation, single-open FAQ, and local copyable brief.
    page.goto(f"{BASE}/contact", wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)

    first_faq = page.get_by_role("button", name="How does the process work?")
    first_faq.click()
    expect(first_faq).to_have_attribute("aria-expanded", "true")
    panel = page.locator("#faq-panel-2")
    assert panel.bounding_box()["height"] > 20
    page.wait_for_timeout(450)
    page.screenshot(path=f"{OUT}/desktop-faq-open.png")
    page.get_by_role("button", name="What types of projects do you take on?").click()
    expect(first_faq).to_have_attribute("aria-expanded", "false")
    expect(page.locator("#faq-panel-2")).to_have_attribute("aria-hidden", "true")

    form = page.locator("#form")
    form.locator('button[type="submit"]').click()
    expect(form.get_by_role("alert")).to_have_text("Name, email, and a short message are all we need.")
    form.locator('input[name="name"]').fill("Test Sender")
    form.locator('input[name="email"]').fill("not-an-email")
    form.locator('textarea[name="message"]').fill("A short project note.")
    form.locator('button[type="submit"]').click()
    expect(form.get_by_role("alert")).to_have_text("That email doesn't look right.")
    form.locator('input[name="email"]').fill("test@studio.com")
    form.locator('button[type="submit"]').click()
    expect(page.get_by_text("Your brief is ready.")).to_be_visible()
    expect(page.locator("pre")).to_contain_text("Name: Test Sender")
    page.get_by_role("button", name="Copy brief").click()
    expect(page.get_by_role("button", name="Copied")).to_be_visible()
    assert "Name: Test Sender" in page.evaluate("navigator.clipboard.readText()")
    page.wait_for_timeout(300)
    page.screenshot(path=f"{OUT}/desktop-brief.png")

    assert errors == [], errors
    browser.close()
print("done")
