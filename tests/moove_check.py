"""Verification suite for Moove 2026 branding showcase (/projects/moove and src/works/Moove/index.html)."""
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = "http://localhost:3000"
OUT = Path("tests/shots")
LOADER = '[aria-label="PerPixel is loading"]'
STANDALONE = Path("src/works/Moove/index.html").resolve().as_uri()

OUT.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)

    # 1. Desktop verification + navigation from /projects#details-moove
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    context.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
    context.grant_permissions(["clipboard-read", "clipboard-write"], origin=BASE)
    page = context.new_page()
    errors: list[str] = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    page.goto(f"{BASE}/projects#details-moove", wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)
    moove_row = page.locator("#details-moove")
    expect(moove_row).to_be_visible()
    assert moove_row.get_attribute("href") == "/projects/moove"

    # Navigate directly to /projects/moove
    page.goto(f"{BASE}/projects/moove", wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)
    expect(page.locator("h1.moove-hero-title")).to_contain_text("Sculptural furniture")
    assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")

    # Hero finish selector + keyboard navigation + diagram toggle
    radios = page.locator('.moove-finish-pills [role="radio"]')
    expect(radios).to_have_count(4)
    expect(radios.first).to_have_attribute("aria-checked", "true")
    radios.nth(1).click()
    expect(radios.nth(1)).to_have_attribute("aria-checked", "true")
    expect(page.locator(".moove-spec-strip")).to_contain_text("RT-02")
    radios.nth(1).press("ArrowRight")
    expect(radios.nth(2)).to_be_focused()
    expect(radios.nth(2)).to_have_attribute("aria-checked", "true")
    expect(page.locator(".moove-spec-strip")).to_contain_text("SC-07")

    diagram_btn = page.locator(".moove-diagram-toggle")
    expect(diagram_btn).to_have_attribute("aria-pressed", "true")
    diagram_btn.click()
    expect(diagram_btn).to_have_attribute("aria-pressed", "false")
    expect(page.locator(".moove-hero-diagram")).to_have_attribute("data-visible", "false")
    diagram_btn.click()
    expect(diagram_btn).to_have_attribute("aria-pressed", "true")

    page.screenshot(path=str(OUT / "moove-desktop-hero.png"))

    # Collection 01 Ledger: layout stability + keyboard tabbing
    ledger = page.locator(".moove-ledger")
    page.evaluate("el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' })", ledger.element_handle())
    page.wait_for_timeout(150)
    tabs = ledger.get_by_role("tab")
    expect(tabs).to_have_count(4)
    panels_box_before = ledger.locator(".moove-ledger-panels").bounding_box()
    tabs.nth(1).click()
    expect(tabs.nth(1)).to_have_attribute("aria-selected", "true")
    expect(ledger.get_by_role("tabpanel")).to_contain_text("Plinth Low Table")
    panels_box_after = ledger.locator(".moove-ledger-panels").bounding_box()
    assert abs(panels_box_before["height"] - panels_box_after["height"]) <= 2
    tabs.nth(1).press("ArrowDown")
    expect(tabs.nth(2)).to_be_focused()
    expect(tabs.nth(2)).to_have_attribute("aria-selected", "true")

    # Scroll-linked shell curvature sequence: forward and reverse
    shell = page.locator("#shell-study")
    expect(shell).to_have_attribute("data-motion", "on")

    def scroll_shell(progress: float) -> None:
        page.evaluate(
            """p => {
                const el = document.getElementById('shell-study');
                const y = el.getBoundingClientRect().top + window.scrollY + Math.max(0, el.offsetHeight - window.innerHeight) * p;
                window.scrollTo({ top: y, behavior: 'instant' });
            }""",
            progress,
        )
        page.wait_for_timeout(120)

    # Wait for any click-induced Lenis scroll to finish before instant scroll assertions
    page.wait_for_timeout(1100)
    scroll_shell(0.0)
    top_0 = page.locator(".moove-shell-frame").nth(1).evaluate("el => el.getBoundingClientRect().top")
    scroll_shell(0.5)
    top_mid = page.locator(".moove-shell-frame").nth(1).evaluate("el => el.getBoundingClientRect().top")
    assert top_mid < top_0, (top_0, top_mid)
    expect(page.locator(".moove-shell-live-meta")).to_contain_text("0.78")
    page.screenshot(path=str(OUT / "moove-desktop-shell.png"))
    scroll_shell(0.0)
    top_reverse = page.locator(".moove-shell-frame").nth(1).evaluate("el => el.getBoundingClientRect().top")
    assert abs(top_reverse - top_0) <= 2, (top_0, top_reverse)

    # Swatches + Commission Dossier Builder
    swatches = page.locator(".moove-swatch-card")
    page.evaluate("el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: 'instant' })", swatches.first.element_handle())
    page.wait_for_timeout(100)
    swatches.first.click()
    expect(swatches.first).to_contain_text("Copied #F7DED4")

    dossier = page.locator("#dossier")
    page.evaluate("el => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' })", dossier.element_handle())
    page.wait_for_timeout(150)
    dossier.locator('button[type="submit"]').click()
    expect(dossier.get_by_role("alert")).to_contain_text("required")
    dossier.locator("#moove-name").fill("Atelier Nord")
    dossier.locator("#moove-email").fill("spec@ateliernord.eu")
    dossier.locator("#moove-notes").fill("Two Arca 01 chairs in Rose Chalk 04 for Lisbon gallery.")
    dossier.locator('button[type="submit"]').click()
    expect(dossier.locator(".moove-dossier-pre")).to_contain_text("Atelier Nord")
    page.screenshot(path=str(OUT / "moove-desktop-dossier.png"))

    assert errors == [], errors
    context.close()

    # 2. Tablet & Mobile responsive + Reduced Motion checks
    for label, width, height, reduced in [
        ("tablet", 820, 1180, "no-preference"),
        ("mobile", 390, 844, "no-preference"),
        ("reduced", 1440, 900, "reduce"),
    ]:
        ctx = browser.new_context(
            viewport={"width": width, "height": height},
            reduced_motion=reduced,
        )
        ctx.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
        p_page = ctx.new_page()
        p_errors: list[str] = []
        p_page.on("pageerror", lambda e: p_errors.append(str(e)))
        p_page.on("console", lambda m: p_errors.append(m.text) if m.type == "error" else None)

        p_page.goto(f"{BASE}/projects/moove", wait_until="networkidle")
        expect(p_page.locator("h1.moove-hero-title")).to_be_visible()
        assert p_page.evaluate("document.documentElement.scrollWidth <= window.innerWidth"), label
        if width < 768 or reduced == "reduce":
            expect(p_page.locator("#shell-study")).to_have_attribute("data-motion", "off")
        if label == "mobile":
            p_page.screenshot(path=str(OUT / "moove-mobile-hero.png"))
        assert p_errors == [], (label, p_errors)
        ctx.close()

    # 3. Standalone file verification (src/works/Moove/index.html)
    s_ctx = browser.new_context(viewport={"width": 1440, "height": 900})
    s_page = s_ctx.new_page()
    s_errors: list[str] = []
    s_page.on("pageerror", lambda e: s_errors.append(str(e)))
    s_page.goto(STANDALONE, wait_until="domcontentloaded")
    expect(s_page.locator("h1.hero-title")).to_contain_text("Sculptural furniture")
    s_page.locator('.finish-pill[data-code="RT-02"]').click()
    expect(s_page.locator("#spec-code")).to_have_text("RT-02")
    assert s_page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
    assert s_errors == [], s_errors
    s_ctx.close()

    browser.close()

print("moove showcase verification: pass")
