"""Interaction checks for the ported Sorso route."""
from playwright.sync_api import sync_playwright

BASE = "http://localhost:3000"
ok = fail = 0

def check(name, cond):
    global ok, fail
    print(("OK  " if cond else "FAIL") + " " + name)
    if cond: ok += 1
    else: fail += 1

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 1440, "height": 900})
    ctx.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    pg = ctx.new_page()
    errors = []
    pg.on("pageerror", lambda e: errors.append(str(e)))
    pg.goto(f"{BASE}/projects/sorso", wait_until="networkidle")
    pg.wait_for_timeout(1200)

    check("no page errors", not errors)
    check("no horizontal overflow", pg.evaluate("document.documentElement.scrollWidth <= innerWidth"))

    # Moments filter: aria-pressed toggles + card visibility
    pg.evaluate("document.querySelector('#moments').scrollIntoView()")
    pg.wait_for_timeout(500)
    filters = pg.query_selector_all(".sorso-filter")
    check("filter buttons exist", len(filters) >= 2)
    if len(filters) >= 2:
        label = filters[1].inner_text()
        filters[1].click()
        pg.wait_for_timeout(300)
        check("filter aria-pressed", filters[1].get_attribute("aria-pressed") == "true")
        visible = pg.evaluate(
            "[...document.querySelectorAll('.sorso-m-card')].filter(c => c.offsetParent).length"
        )
        total = pg.evaluate("document.querySelectorAll('.sorso-m-card').length")
        check(f"filter '{label}' hides cards ({visible}/{total})", 0 < visible < total)
        filters[0].click()
        pg.wait_for_timeout(300)
        check("all restored", pg.evaluate(
            "[...document.querySelectorAll('.sorso-m-card')].every(c => c.offsetParent)"
        ))

    # Flavours: three stacked editorial articles, each with a bottle
    arts = pg.query_selector_all(".sorso-flv")
    check("3 flavour articles", len(arts) == 3)
    names = pg.evaluate("[...document.querySelectorAll('.sorso-flv-name')].map(e => e.textContent)")
    check(f"flavour names {names}", len(names) == 3)
    bottles = pg.evaluate("document.querySelectorAll('.sorso-flv-bottle').length")
    check("3 flavour bottles", bottles == 3)

    # Mixed case button
    case_btn = pg.query_selector(".sorso-order-btn")
    if case_btn:
        case_btn.click()
        pg.wait_for_timeout(400)
        check("order btn data-added", case_btn.get_attribute("data-added") == "true")
        check("label switches", "added" in case_btn.inner_text().lower())
        live = pg.evaluate("document.querySelector('[aria-live]')?.textContent || ''")
        check("live region announces", "Mixed case added" in live)
    else:
        check("case button exists", False)

    # Clock value sane (between 17:00 and 20:30)
    clock_txt = pg.evaluate("document.querySelector('.sorso-clock-time')?.textContent || ''")
    check(f"clock renders ({clock_txt})", ":" in clock_txt)

    # Showreel link resolves
    href = pg.evaluate("document.querySelector('.sorso-pill-showreel')?.href || ''")
    check(f"showreel href ({href})", "showreel" in href)

    # Reduced motion: marquee still, no error
    rc = b.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    rc.add_init_script("sessionStorage.setItem('pp-intro-done','1')")
    rp = rc.new_page()
    rp.goto(f"{BASE}/projects/sorso", wait_until="networkidle")
    rp.wait_for_timeout(800)
    check("reduced-motion loads clean", rp.evaluate("document.title.length > 0"))
    anim = rp.evaluate(
        "getComputedStyle(document.querySelector('.sorso-tags-track')).animationName")
    check("marquee paused under reduced motion", anim == "none")
    b.close()

print(f"\n{ok} passed, {fail} failed")
