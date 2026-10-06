from playwright.sync_api import sync_playwright

URL = "http://localhost:3000/"

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    console_messages = []
    page_errors = []
    page.on("console", lambda msg: console_messages.append(f"[{msg.type}] {msg.text}"))
    page.on("pageerror", lambda err: page_errors.append(str(err)))

    # Fresh sessionStorage -> intro should play.
    page.goto(URL, wait_until="domcontentloaded")
    page.wait_for_timeout(500)

    intro_pending = page.evaluate("document.documentElement.classList.contains('pp-intro-pending')")
    preloader_display = page.evaluate(
        """() => {
            const loader = document.querySelector('.preloader');
            return loader ? getComputedStyle(loader).display : null;
        }"""
    )
    print(f"At 0.5s: pp-intro-pending={intro_pending}, preloader.display={preloader_display!r}")

    # Sample every 1s for 10s to track the preloader state.
    for secs in range(1, 11):
        page.wait_for_timeout(1000)
        state = page.evaluate(
            """() => {
                const loader = document.querySelector('.preloader');
                return {
                    pending: document.documentElement.classList.contains('pp-intro-pending'),
                    display: loader ? getComputedStyle(loader).display : null,
                    phase: loader?.dataset.phase || null,
                    mainInert: document.querySelector('main')?.inert,
                    bodyOverflow: getComputedStyle(document.body).overflow,
                    htmlOverflow: getComputedStyle(document.documentElement).overflow,
                    introDone: sessionStorage.getItem('pp-intro-done'),
                    done: loader === null,
                };
            }"""
        )
        print(f"At {secs}s: {state}")

    print("\n--- CONSOLE ---")
    for m in console_messages:
        print(m)
    print("\n--- PAGE ERRORS ---")
    for e in page_errors:
        print(e)

    loader_gone = page.evaluate("document.querySelector('.preloader') === null")
    html_classes = page.evaluate("document.documentElement.className")
    main_inert = page.evaluate("document.querySelector('main')?.inert")
    intro_done = page.evaluate("sessionStorage.getItem('pp-intro-done')")
    console_errors = [m for m in console_messages if m.startswith("[error]")]
    assert loader_gone, "preloader still mounted after 10s"
    assert "pp-lock" not in html_classes and "pp-intro-pending" not in html_classes, f"page still locked: {html_classes!r}"
    assert not main_inert, "main is still inert"
    assert intro_done == "1", f"intro not marked done: {intro_done!r}"
    assert page_errors == [], f"page errors: {page_errors}"
    assert console_errors == [], f"console errors: {console_errors}"
    print("\nAll checks passed: preloader completed, page unlocked, no errors.")

    page.screenshot(path="tests/shots/preloader_state.png", full_page=False)
    browser.close()
