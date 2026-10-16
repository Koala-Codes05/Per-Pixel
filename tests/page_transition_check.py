import os
from pathlib import Path

from playwright.sync_api import Page, expect, sync_playwright

BASE = "http://localhost:3000"
OUT = Path("tests/shots")
LOADER = '[aria-label="PerPixel is loading"]'

os.makedirs(OUT, exist_ok=True)


def wait_ready(page: Page, path: str) -> None:
    page.goto(f"{BASE}{path}", wait_until="networkidle")
    expect(page.locator(LOADER)).to_have_count(0)


def assert_released(page: Page) -> None:
    page.wait_for_function(
        """() => !document.documentElement.hasAttribute('data-page-transition')
              && !document.documentElement.hasAttribute('data-page-transition-phase')
              && !document.documentElement.classList.contains('pp-lock')
              && !document.body.inert""",
        timeout=8000,
    )
    assert page.evaluate("getComputedStyle(document.documentElement).overflowY") != "hidden"


def wait_animating(page: Page, direction: str) -> None:
    expect(page.locator("html")).to_have_attribute("data-page-transition", direction)
    expect(page.locator("html")).to_have_attribute("data-page-transition-phase", "animating")


def seek_transition(page: Page, name: str, time: int) -> None:
    count = page.evaluate(
        """([name, time]) => {
          const matches = document.getAnimations().filter((animation) => animation.animationName === name);
          for (const animation of matches) {
            animation.pause();
            animation.currentTime = time;
          }
          return matches.length;
        }""",
        [name, time],
    )
    assert count == 1, (name, count)


def resume_transition(page: Page, name: str) -> None:
    # finish() completes the animation without restarting it — play() on an
    # animation paused at/past its end rewinds to 0 and replays the full duration.
    page.evaluate(
        """name => {
          for (const animation of document.getAnimations()) {
            if (animation.animationName === name) animation.finish();
          }
        }""",
        name,
    )


def pseudo_metrics(page: Page) -> dict:
    return page.evaluate(
        """() => {
          const metric = (pseudo) => {
            const style = getComputedStyle(document.documentElement, pseudo);
            const matrix = new DOMMatrixReadOnly(style.transform === 'none' ? undefined : style.transform);
            return {
              animationName: style.animationName,
              duration: style.animationDuration,
              opacity: Number(style.opacity),
              transform: style.transform,
              y: matrix.m42,
              z: Number(style.zIndex),
            };
          };
          return {
            old: metric('::view-transition-old(root)'),
            new: metric('::view-transition-new(root)'),
            group: metric('::view-transition-group(root)'),
          };
        }"""
    )


def inspect_motion(page: Page, direction: str, screenshot: Path | None = None) -> str:
    name = "page-sheet-down" if direction == "forward" else "page-sheet-up"
    animated = "old" if direction == "forward" else "new"
    stationary = "new" if direction == "forward" else "old"
    wait_animating(page, direction)
    seek_transition(page, name, 0)
    start = pseudo_metrics(page)
    seek_transition(page, name, 500)
    middle = pseudo_metrics(page)
    moving = middle[animated]
    still = middle[stationary]
    assert moving["animationName"] == name, middle
    assert moving["duration"] == "1s", middle
    assert moving["opacity"] == 1 and still["opacity"] == 1, middle
    assert 0 < moving["y"] <= page.viewport_size["height"], middle
    assert still["transform"] == "none" or abs(still["y"]) < 0.01, middle
    assert moving["z"] > still["z"], middle
    assert middle["group"]["animationName"] == "none", middle
    if direction == "forward":
        assert abs(start["old"]["y"]) < 0.01, start
    else:
        assert abs(start["new"]["y"] - page.viewport_size["height"]) <= 1, start
    if screenshot:
        page.screenshot(path=str(screenshot))
    seek_transition(page, name, 1000)
    end = pseudo_metrics(page)
    if direction == "forward":
        assert abs(end["old"]["y"] - page.viewport_size["height"]) <= 1, end
    else:
        assert abs(end["new"]["y"]) <= 1, end
    resume_transition(page, name)
    return name


def install_errors(page: Page) -> list[str]:
    errors: list[str] = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    return errors


def wait_path(page: Page, path: str) -> None:
    page.wait_for_url(f"{BASE}{path}")
    expect(page.locator("main")).to_be_visible()


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)

    desktop = browser.new_context(viewport={"width": 1440, "height": 900})
    desktop.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
    page = desktop.new_page()
    errors = install_errors(page)
    wait_ready(page, "/about")
    assert not page.locator("html").get_attribute("data-page-transition")
    assert_released(page)
    page.evaluate("window.scrollTo({ top: 420, behavior: 'instant' })")
    page.wait_for_timeout(900)
    saved_about_y = page.evaluate("window.scrollY")
    assert 300 <= saved_about_y <= 500, saved_about_y
    page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    forward_name = inspect_motion(page, "forward", OUT / "page-transition-desktop.png")
    resume_transition(page, forward_name)
    wait_path(page, "/projects")
    expect(page.locator("html")).not_to_have_attribute("data-page-transition-phase", "animating")
    assert_released(page)
    initial_y = page.evaluate("window.scrollY")
    page.mouse.wheel(0, 600)
    page.wait_for_timeout(900)
    assert page.evaluate("window.scrollY") > initial_y

    page.evaluate("history.back()")
    back_name = inspect_motion(page, "back")
    resume_transition(page, back_name)
    wait_path(page, "/about")
    assert_released(page)
    assert abs(page.evaluate("window.scrollY") - saved_about_y) <= 5, (saved_about_y, page.evaluate("window.scrollY"))

    page.evaluate("history.forward()")
    forward_name = inspect_motion(page, "forward")
    resume_transition(page, forward_name)
    wait_path(page, "/projects")
    assert_released(page)

    wait_ready(page, "/")
    brief = page.get_by_role("link", name="Start a project brief")
    brief.scroll_into_view_if_needed()
    page.wait_for_timeout(900)
    brief.click()
    hash_name = inspect_motion(page, "forward")
    resume_transition(page, hash_name)
    wait_path(page, "/contact#form")
    assert_released(page)
    form_top = page.locator("#form").evaluate("element => element.getBoundingClientRect().top")
    assert abs(form_top) <= 5, form_top
    page.wait_for_timeout(1300)
    assert abs(page.locator("#form").evaluate("element => element.getBoundingClientRect().top") - form_top) <= 2
    page.evaluate("window.scrollTo({ top: 0, behavior: 'instant' })")
    # Drop the hash first: a click on '#form' while already at '/contact#form' is
    # an identical-URL navigation that the router dedupes (no new history entry).
    page.evaluate("history.replaceState(history.state, '', '/contact')")
    history_length = page.evaluate("history.length")
    page.get_by_role("link", name="Get in touch").click()
    page.wait_for_timeout(100)
    assert not page.locator("html").get_attribute("data-page-transition")
    assert page.evaluate("history.length") == history_length + 1
    assert page.evaluate("location.hash") == "#form"

    wait_ready(page, "/about")
    page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    wait_animating(page, "forward")
    page.keyboard.press("Escape")
    wait_path(page, "/projects")
    assert_released(page)

    wait_ready(page, "/about")
    page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    wait_animating(page, "forward")
    page.evaluate("history.back()")
    wait_path(page, "/about")
    expect(page.locator("html")).not_to_have_attribute("data-page-transition-phase", "animating")
    assert_released(page)

    wait_ready(page, "/about")
    page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    wait_animating(page, "forward")
    second_click = page.evaluate(
        """() => {
          const anchor = document.querySelector('nav[aria-label="Primary navigation"] a[href="/journal"]');
          if (!anchor) return null;
          const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, detail: 1 });
          anchor.dispatchEvent(event);
          return event.defaultPrevented;
        }"""
    )
    assert second_click is True, second_click
    wait_path(page, "/projects")
    expect(page.locator("html")).not_to_have_attribute("data-page-transition-phase", "animating")
    assert page.evaluate("location.pathname") == "/projects"
    assert_released(page)

    excluded = page.evaluate(
        """() => {
          const cases = [
            { href: location.href, options: {} },
            { href: location.origin + '/projects', options: { ctrlKey: true } },
            { href: 'https://example.com/', options: {} },
            { href: location.origin + '/projects', options: {}, download: true },
          ];
          return cases.map((item) => {
            const anchor = document.createElement('a');
            anchor.href = item.href;
            if (item.download) anchor.download = 'test';
            document.body.append(anchor);
            let observed = null;
            const observe = (event) => {
              observed = event.defaultPrevented;
              event.preventDefault();
            };
            document.addEventListener('click', observe, { once: true });
            anchor.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, detail: 1, button: 0, ...item.options }));
            anchor.remove();
            return observed;
          });
        }"""
    )
    assert excluded == [False, False, False, False], excluded
    assert errors == [], errors
    desktop.close()
    print("desktop forward/back/hash/cancellation: pass")

    for width, height, shot in ((834, 1112, None), (390, 844, OUT / "page-transition-mobile.png")):
        context = browser.new_context(viewport={"width": width, "height": height})
        context.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
        mobile_page = context.new_page()
        mobile_errors = install_errors(mobile_page)
        wait_ready(mobile_page, "/about")
        mobile_page.get_by_role("button", name="Open menu").click()
        expect(mobile_page.locator("#site-menu")).to_have_attribute("data-open", "true")
        mobile_page.locator("#site-menu").get_by_role("link", name="Projects").click()
        name = inspect_motion(mobile_page, "forward", shot)
        resume_transition(mobile_page, name)
        wait_path(mobile_page, "/projects")
        assert_released(mobile_page)
        assert mobile_page.evaluate("document.documentElement.scrollWidth <= window.innerWidth")
        before_scroll = mobile_page.evaluate("window.scrollY")
        mobile_page.mouse.wheel(0, 500)
        mobile_page.wait_for_timeout(700)
        assert mobile_page.evaluate("window.scrollY") > before_scroll
        assert mobile_errors == [], mobile_errors
        context.close()
    print("tablet/mobile menu transitions: pass")

    reduced = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    reduced.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
    reduced_page = reduced.new_page()
    reduced_errors = install_errors(reduced_page)
    wait_ready(reduced_page, "/about")
    for _ in range(12):
        reduced_page.keyboard.press("Tab")
        if reduced_page.evaluate("document.activeElement?.getAttribute('href')") == "/projects":
            break
    assert reduced_page.evaluate("document.activeElement?.getAttribute('href')") == "/projects"
    reduced_page.keyboard.press("Enter")
    wait_path(reduced_page, "/projects")
    assert not reduced_page.locator("html").get_attribute("data-page-transition")
    assert_released(reduced_page)
    assert reduced_errors == [], reduced_errors
    reduced.close()
    print("reduced motion keyboard fallback: pass")

    unsupported = browser.new_context(viewport={"width": 1440, "height": 900})
    unsupported.add_init_script("sessionStorage.setItem('pp-intro-done', '1'); Object.defineProperty(document, 'startViewTransition', { value: undefined, configurable: true })")
    unsupported_page = unsupported.new_page()
    unsupported_errors = install_errors(unsupported_page)
    wait_ready(unsupported_page, "/about")
    unsupported_page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    wait_path(unsupported_page, "/projects")
    assert not unsupported_page.locator("html").get_attribute("data-page-transition")
    assert_released(unsupported_page)
    assert unsupported_errors == [], unsupported_errors
    unsupported.close()
    print("unsupported API fallback: pass")

    broken = browser.new_context(viewport={"width": 1440, "height": 900})
    broken.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
    broken.route("**/_next/image*", lambda route: route.abort())
    broken_page = broken.new_page()
    broken_errors = install_errors(broken_page)
    wait_ready(broken_page, "/about")
    broken_page.get_by_role("navigation", name="Primary navigation").get_by_role("link", name="Projects").click()
    broken_name = inspect_motion(broken_page, "forward")
    resume_transition(broken_page, broken_name)
    wait_path(broken_page, "/projects")
    assert_released(broken_page)
    boxes_before = broken_page.locator(".project-image").evaluate_all("elements => elements.map(({ offsetWidth, offsetHeight }) => [offsetWidth, offsetHeight])")
    broken_page.wait_for_timeout(1400)
    boxes_after = broken_page.locator(".project-image").evaluate_all("elements => elements.map(({ offsetWidth, offsetHeight }) => [offsetWidth, offsetHeight])")
    assert boxes_before == boxes_after and all(width > 0 and height > 0 for width, height in boxes_after), (boxes_before, boxes_after)
    # The aborted image requests log expected resource errors; only fail on real page errors.
    unexpected_broken = [error for error in broken_errors if not error.startswith("Failed to load resource")]
    assert unexpected_broken == [], unexpected_broken
    broken.close()
    print("failed image release/stability: pass")

    browser.close()

print("page transition checks: pass")
