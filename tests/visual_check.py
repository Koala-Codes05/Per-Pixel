"""Screenshot PerPixel at desktop + tablet widths, several scroll depths."""
import os
import unittest
from contextlib import suppress
from pathlib import Path
from playwright.sync_api import sync_playwright, expect

BASE = os.environ.get("PERPIXEL_URL", "http://localhost:3000")
OUT = Path(__file__).parent / "shots"
LOADER = '[aria-label="PerPixel is loading"]'
VIEWPORTS = [("desktop", 1440, 900), ("tablet", 820, 1180), ("mobile", 390, 844)]


def scroll_to(page, y):
    page.evaluate("y => window.scrollTo({top: y, behavior: 'instant'})", y)
    page.wait_for_timeout(80)


def section_position(page, label, progress):
    return page.locator(f'section[aria-label="{label}"]').evaluate(
        "(el, p) => el.getBoundingClientRect().top + scrollY + Math.max(0, el.offsetHeight - innerHeight) * p",
        progress,
    )


class MotionChecks(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.playwright = sync_playwright().start()
        cls.browser = cls.playwright.chromium.launch(headless=True)

    @classmethod
    def tearDownClass(cls):
        cls.browser.close()
        cls.playwright.stop()

    def setUp(self):
        self.contexts = []

    def tearDown(self):
        for context in self.contexts:
            context.close()

    def page(self, seen=False, **options):
        context = self.browser.new_context(**options)
        self.contexts.append(context)
        if seen:
            context.add_init_script("sessionStorage.setItem('pp-intro-done', '1')")
        return context.new_page()

    def assert_unlocked(self, page):
        self.assertFalse(page.evaluate("document.documentElement.classList.contains('pp-lock')"))
        self.assertNotEqual(page.evaluate("getComputedStyle(document.documentElement).overflowY"), "hidden")
        self.assertFalse(page.locator("main").evaluate("el => !!el.closest('[inert]')"))

    def test_intro_locks_scroll_and_focus(self):
        page = self.page(viewport={"width": 1440, "height": 900})
        page.goto(BASE, wait_until="domcontentloaded")
        expect(page.locator(LOADER)).to_be_visible()
        page.wait_for_timeout(200)
        self.assertEqual(page.evaluate("getComputedStyle(document.documentElement).overflowY"), "hidden")
        self.assertTrue(page.locator("main").evaluate("el => !!el.closest('[inert]')"))
        page.keyboard.press("Tab")
        expect(page.get_by_role("button", name="Skip intro")).to_be_focused()
        page.mouse.wheel(0, 600)
        page.wait_for_timeout(150)
        self.assertEqual(page.evaluate("scrollY"), 0)
        page.keyboard.press("Escape")
        expect(page.locator(LOADER)).to_have_count(0)
        self.assert_unlocked(page)

    def test_intro_words_mark_and_expansion(self):
        page = self.page(viewport={"width": 1440, "height": 900})
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(BASE, wait_until="domcontentloaded")
        for word in ["Branding", "Design", "Editorial", "Motion"]:
            page.wait_for_function(
                "word => [...document.querySelectorAll('.preloader-word')].some(el => el.textContent === word && +getComputedStyle(el).opacity > .7)",
                arg=word,
                timeout=3000,
            )
        page.wait_for_function("document.querySelector('.preloader')?.dataset.phase === 'mark'")
        page.screenshot(path=str(OUT / "intro-mark.png"))
        page.wait_for_function("document.querySelector('.preloader')?.dataset.phase === 'expand'")
        page.wait_for_function("new DOMMatrix(getComputedStyle(document.querySelector('.preloader-mark')).transform).a > 8")
        expect(page.locator(LOADER)).to_have_count(0, timeout=7500)
        self.assert_unlocked(page)
        self.assertEqual(errors, [])

    def test_intro_skip_and_session_do_not_flash(self):
        page = self.page(viewport={"width": 390, "height": 844})
        page.goto(BASE, wait_until="domcontentloaded")
        # Skip past the preloader deterministically.
        page.get_by_role("button", name="Skip intro").click()
        expect(page.locator(LOADER)).to_have_count(0)
        self.assert_unlocked(page)
        self.assertEqual(page.evaluate("sessionStorage.getItem('pp-intro-done')"), "1")
        page.add_init_script("""
            window.introFlashed = false;
            new MutationObserver(() => {
                const loader = document.querySelector('[aria-label="PerPixel is loading"]');
                if (loader && getComputedStyle(loader).display !== 'none') window.introFlashed = true;
            }).observe(document, {childList: true, subtree: true, attributes: true});
        """)
        page.reload(wait_until="networkidle")
        expect(page.locator(LOADER)).to_have_count(0)
        self.assertFalse(page.evaluate("window.introFlashed"))
        self.assert_unlocked(page)

    def test_storage_denial_does_not_trap_intro(self):
        page = self.page()
        page.add_init_script("""
            for (const method of ['getItem', 'setItem']) {
                const original = Storage.prototype[method];
                Storage.prototype[method] = function(key, ...args) {
                    if (key === 'pp-intro-done') throw new DOMException('Storage disabled', 'SecurityError');
                    return original.call(this, key, ...args);
                };
            }
        """)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.goto(BASE, wait_until="domcontentloaded")
        expect(page.locator(LOADER)).to_have_count(0, timeout=7500)
        self.assert_unlocked(page)
        self.assertEqual(errors, [])

    def test_stalled_assets_and_failed_images_release_intro(self):
        for stalled in [True, False]:
            with self.subTest(stalled=stalled):
                page = self.page(viewport={"width": 820, "height": 1180})
                stalled_routes = []
                page.route("**/_next/image**", lambda route: stalled_routes.append(route) if stalled else route.abort())
                page.goto(f"{BASE}/projects", wait_until="domcontentloaded")
                hero = page.locator("main section").first.locator("img").first
                before = hero.bounding_box()
                expect(page.locator(LOADER)).to_have_count(0, timeout=7500)
                self.assert_unlocked(page)
                after = hero.bounding_box()
                self.assertEqual(before["width"], after["width"])
                self.assertEqual(before["height"], after["height"])
                for route in stalled_routes:
                    with suppress(Exception):
                        route.abort()

    def test_failed_hydration_and_no_javascript_have_static_fallbacks(self):
        page = self.page()
        page.route("**/_next/**/*.js*", lambda route: route.abort())
        page.goto(BASE, wait_until="domcontentloaded")
        expect(page.locator(LOADER)).to_be_hidden(timeout=7500)
        self.assert_unlocked(page)
        self.assertEqual(page.locator(".process-frame").count(), 3)
        self.assertEqual(page.locator(".process-viewport").evaluate("el => getComputedStyle(el).position"), "static")
        no_js = self.page(java_script_enabled=False)
        no_js.goto(BASE, wait_until="networkidle")
        expect(no_js.locator(LOADER)).to_be_hidden()
        expect(no_js.locator("h1")).to_be_visible()
        for frame in no_js.locator(".process-frame").all():
            self.assertEqual(frame.evaluate("el => getComputedStyle(el).transform"), "none")
            self.assertNotEqual(frame.locator(".process-copy").evaluate("el => getComputedStyle(el).display"), "none")
            self.assertEqual(frame.locator('[data-process-part="image"]').evaluate("el => getComputedStyle(el).transform"), "none")
        self.assertGreater(no_js.locator(".reveal").first.evaluate("el => +getComputedStyle(el).opacity"), 0.9)

    def test_scroll_sequences_reverse_at_every_breakpoint(self):
        for name, width, height in VIEWPORTS:
            with self.subTest(viewport=name):
                page = self.page(seen=True, viewport={"width": width, "height": height})
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(BASE, wait_until="networkidle")
                expect(page.locator(LOADER)).to_have_count(0)
                page.screenshot(path=str(OUT / f"{name}-top.png"))
                words = page.locator(".wordplay-word")
                positions = [0, 0.125, 0.25, 0.5, 0.75, 1]
                forward = []
                for progress in positions + list(reversed(positions)):
                    scroll_to(page, section_position(page, "What we do", progress))
                    colors = words.evaluate_all("els => els.map(el => getComputedStyle(el).color)")
                    forward.append(colors)
                    if progress in [0, 0.25, 0.5, 0.75]:
                        active = round(progress * 4)
                        values = [int(color.split('(')[1].split(',')[0]) for color in colors]
                        self.assertEqual(values.index(min(values)), active)
                        self.assertLess(values[active], 35)
                self.assertEqual(forward[:len(positions)], list(reversed(forward[len(positions):])))
                scroll_to(page, section_position(page, "What we do", 0.375))
                page.screenshot(path=str(OUT / f"{name}-wordplay.png"))
                sequence = page.locator('section[aria-label="Process"]')
                expect(sequence).to_have_attribute("data-motion", "on" if width >= 768 else "off")
                frames = page.locator(".process-frame")
                copies = page.locator(".process-copy")
                first_top = None
                transforms = []
                process_points = [0, 0.26, 0.5, 0.76, 1]
                hold_frames = {0: 0, 0.5: 1, 1: 2}
                for progress in process_points + list(reversed(process_points)):
                    scroll_to(page, section_position(page, "Process", progress))
                    tops = frames.evaluate_all("els => els.map(el => el.getBoundingClientRect().top)")
                    if first_top is None:
                        first_top = tops[0]
                    transforms.append(tops)
                    if width >= 768:
                        # Sticky pin: first row holds its position across the whole section.
                        self.assertAlmostEqual(tops[0], first_top, delta=2)
                        if progress == 0:
                            self.assertGreaterEqual(tops[1], height - 2)
                            self.assertGreaterEqual(tops[2], height - 2)
                        if progress == 0.26:
                            self.assertGreater(tops[1], tops[0])
                            self.assertLess(tops[1], height)
                            page.screenshot(path=str(OUT / f"{name}-process.png"))
                        if progress == 0.5:
                            self.assertAlmostEqual(tops[1], tops[0], delta=2)
                            self.assertGreaterEqual(tops[2], height - 2)
                        if progress == 0.76:
                            self.assertGreater(tops[2], tops[0])
                            self.assertLess(tops[2], height)
                            page.screenshot(path=str(OUT / f"{name}-process-overlap.png"))
                        if progress == 1:
                            self.assertAlmostEqual(tops[2], tops[0], delta=2)
                        if progress in hold_frames:
                            # All three compact rows stay visible inside the viewport.
                            copy = copies.nth(hold_frames[progress])
                            box = copy.bounding_box()
                            self.assertNotEqual(copy.evaluate("el => getComputedStyle(el).display"), "none")
                            self.assertGreaterEqual(copy.evaluate("el => +getComputedStyle(el).opacity"), 0.99)
                            self.assertGreaterEqual(box["y"], 46)
                            self.assertLessEqual(box["y"] + box["height"], height + 2)
                if width >= 768:
                    for forward, backward in zip(transforms[:len(process_points)], reversed(transforms[len(process_points):])):
                        for a, b in zip(forward, backward):
                            # Row spacing stays constant as you scroll (rows don't travel).
                            self.assertAlmostEqual(a, b, delta=2)
                else:
                    for index in range(3):
                        copy = copies.nth(index)
                        self.assertNotEqual(copy.evaluate("el => getComputedStyle(el).display"), "none")
                        self.assertGreaterEqual(copy.evaluate("el => +getComputedStyle(el).opacity"), 0.99)
                        expect(copy).to_be_visible()
                        self.assertEqual(frames.nth(index).evaluate("el => getComputedStyle(el).transform"), "none")
                    scroll_to(page, section_position(page, "Process", 0.5))
                    page.screenshot(path=str(OUT / f"{name}-process.png"))
                scroll_to(page, section_position(page, "Process", 0))
                page.mouse.wheel(0, 240)
                page.wait_for_timeout(400)
                page.mouse.wheel(0, -120)
                page.wait_for_timeout(400)
                self.assert_unlocked(page)
                footer_in_view = "() => document.querySelector('footer').getBoundingClientRect().top < innerHeight - 4"
                for _ in range(3):
                    scroll_to(page, page.evaluate("document.body.scrollHeight"))
                    try:
                        page.wait_for_function(footer_in_view, timeout=2500)
                        break
                    except Exception:
                        continue
                else:
                    self.fail("footer did not enter the viewport")
                page.wait_for_timeout(300)
                page.screenshot(path=str(OUT / f"{name}-footer.png"))
                self.assertFalse(page.evaluate("document.documentElement.scrollWidth > innerWidth"))
                self.assertEqual(errors, [])

    def test_reduced_motion_and_short_screens_stay_readable(self):
        page = self.page(reduced_motion="reduce", viewport={"width": 390, "height": 844})
        page.goto(BASE, wait_until="domcontentloaded")
        expect(page.locator(LOADER)).to_have_count(0, timeout=1500)
        page.wait_for_timeout(200)
        self.assert_unlocked(page)
        self.assertFalse(page.evaluate("document.documentElement.classList.contains('lenis')"))
        for label in ["What we do", "Process"]:
            section = page.locator(f'section[aria-label="{label}"]')
            self.assertLess(section.evaluate("el => el.offsetHeight"), 2200)
            self.assertNotEqual(section.locator(":scope > div").first.evaluate("el => getComputedStyle(el).position"), "sticky")
        for part in page.locator(".wordplay-word, .process-frame, [data-process-part]").all():
            self.assertEqual(part.evaluate("el => getComputedStyle(el).transform"), "none")
        page.goto(f"{BASE}/projects", wait_until="networkidle")
        expect(page.locator(LOADER)).to_have_count(0, timeout=1500)
        page.locator(".service-tab").nth(1).click()
        page.wait_for_timeout(300)
        panels = page.locator(".service-panel")
        self.assertEqual(panels.count(), 4)
        states = panels.evaluate_all(
            "els => els.map(el => ({active: el.dataset.active === 'true', opacity: +getComputedStyle(el).opacity}))"
        )
        self.assertEqual(len([s for s in states if s["opacity"] > 0.9]), 1)
        for state in states:
            if not state["active"]:
                self.assertEqual(state["opacity"], 0)
        page.goto(BASE, wait_until="networkidle")
        expect(page.locator(LOADER)).to_have_count(0, timeout=1500)
        page.set_viewport_size({"width": 1440, "height": 900})
        page.emulate_media(reduced_motion="no-preference")
        expect(page.locator('section[aria-label="Process"]')).to_have_attribute("data-motion", "on")
        page.emulate_media(reduced_motion="reduce")
        expect(page.locator('section[aria-label="Process"]')).to_have_attribute("data-motion", "off")
        self.assertFalse(page.evaluate("document.documentElement.classList.contains('lenis')"))
        page.emulate_media(reduced_motion="no-preference")
        page.set_viewport_size({"width": 667, "height": 320})
        expect(page.locator('section[aria-label="Process"]')).to_have_attribute("data-motion", "off")
        self.assertEqual(page.locator(".process-frame").count(), 3)
        self.assertFalse(page.evaluate("document.documentElement.scrollWidth > innerWidth"))

    def test_featured_portfolio_scene(self):
        for name, width, height in VIEWPORTS:
            with self.subTest(viewport=name):
                page = self.page(seen=True, viewport={"width": width, "height": height},
                                 has_touch=name == "mobile", is_mobile=name == "mobile")
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                page.goto(BASE, wait_until="networkidle")
                section = page.locator("#featured-projects")
                expect(section).to_have_attribute("data-motion", "on")
                viewport = section.locator(".featured-viewport")
                cards = section.locator(".featured-card")
                word = section.locator(".featured-wordmark")
                self.assertEqual(cards.count(), 3)
                self.assertGreater(section.evaluate("el => el.offsetHeight"), height * 4)

                def go(progress):
                    scroll_to(page, section.evaluate(
                        "(el, p) => el.getBoundingClientRect().top + scrollY + (el.offsetHeight - innerHeight) * p",
                        progress,
                    ))

                go(0)
                self.assertAlmostEqual(viewport.bounding_box()["y"], 0, delta=2)
                self.assertGreaterEqual(cards.first.bounding_box()["y"], height - 3)
                word_y = word.bounding_box()["y"]
                if name == "desktop":
                    page.screenshot(path=str(OUT / "featured-desktop-1.png"))

                go(0.13)
                self.assertGreater(cards.first.evaluate("el => +getComputedStyle(el).opacity"), 0)
                self.assertLess(cards.first.evaluate("el => +getComputedStyle(el).opacity"), 1)
                if name == "desktop":
                    page.screenshot(path=str(OUT / "featured-desktop-2.png"))

                go(0.25)
                self.assertAlmostEqual(word.bounding_box()["y"], word_y, delta=2)
                first_transform = cards.first.evaluate("el => el.style.transform")
                self.assertLess(abs(cards.first.bounding_box()["x"] + cards.first.bounding_box()["width"] / 2 - width / 2), 20)
                expect(cards.first.locator(".featured-description")).to_be_visible()
                if name == "desktop":
                    page.screenshot(path=str(OUT / "featured-desktop-3.png"))
                    before = page.evaluate("scrollY")
                    cards.first.locator("a").hover()
                    page.wait_for_timeout(550)
                    self.assertIn("blur(10px)", cards.first.locator("img").evaluate("el => getComputedStyle(el).filter"))
                    self.assertGreater(cards.first.locator(".featured-view").evaluate("el => +getComputedStyle(el).opacity"), 0.99)
                    expect(cards.first.locator(".featured-category")).to_be_visible()
                    self.assertAlmostEqual(page.evaluate("scrollY"), before, delta=2)
                    page.screenshot(path=str(OUT / "featured-desktop-hover.png"))
                    page.mouse.move(4, height // 2)
                    page.wait_for_timeout(550)
                    self.assertIn(cards.first.locator("img").evaluate("el => getComputedStyle(el).filter"), ("none", "blur(0px)"))
                    centered = cards.first.bounding_box()["y"]
                    # The card holds centered until ~176px of scroll; a 140px tick never leaves the plateau.
                    page.mouse.wheel(0, 300)
                    page.wait_for_timeout(450)
                    self.assertLess(cards.first.bounding_box()["y"], centered)
                    page.mouse.wheel(0, -140)
                    page.wait_for_timeout(1400)
                    self.assertAlmostEqual(cards.first.bounding_box()["y"], centered, delta=5)
                elif name == "mobile":
                    self.assertGreater(cards.first.locator(".featured-view").evaluate("el => +getComputedStyle(el).opacity"), 0.99)
                    introduction = section.locator(".featured-introduction").bounding_box()
                    self.assertGreater(cards.first.bounding_box()["y"], introduction["y"] + introduction["height"])
                    page.screenshot(path=str(OUT / "featured-mobile.png"))
                else:
                    page.screenshot(path=str(OUT / "featured-tablet.png"))

                go(2.2 / 4.1)
                self.assertAlmostEqual(word.bounding_box()["y"], word_y, delta=2)
                self.assertLess(cards.first.bounding_box()["y"], 0)
                self.assertGreater(cards.nth(2).bounding_box()["y"], height - 3)
                expect(cards.nth(1).locator(".featured-description")).to_be_visible()
                if name == "desktop":
                    page.screenshot(path=str(OUT / "featured-desktop-5.png"))
                    page.reload(wait_until="networkidle")
                    expect(section).to_have_attribute("data-motion", "on")
                    # Scroll restoration + the off→on height growth lands past the pin; re-enter it.
                    go(2.2 / 4.1)
                    self.assertAlmostEqual(viewport.bounding_box()["y"], 0, delta=2)
                    self.assertLess(abs(cards.nth(1).bounding_box()["y"] - cards.first.bounding_box()["y"]), height)

                go(3.42 / 4.1)
                expect(cards.last.locator(".featured-category")).to_be_visible()
                self.assertAlmostEqual(word.bounding_box()["y"], word_y, delta=2)
                if name == "desktop":
                    page.screenshot(path=str(OUT / "featured-desktop-6.png"))
                go(0.25)
                self.assertEqual(cards.first.evaluate("el => el.style.transform"), first_transform)
                go(1)
                scroll_to(page, section.evaluate("el => el.getBoundingClientRect().top + scrollY + el.offsetHeight - innerHeight + 180"))
                self.assertLess(viewport.bounding_box()["y"], -100)
                self.assertFalse(page.evaluate("document.documentElement.scrollWidth > innerWidth"))
                self.assertEqual(errors, [])

    def test_featured_keyboard_and_static_fallbacks(self):
        page = self.page(seen=True, viewport={"width": 1440, "height": 900})
        page.goto(BASE, wait_until="networkidle")
        section = page.locator("#featured-projects")
        expect(section).to_have_attribute("data-motion", "on")
        scroll_to(page, section.evaluate("el => el.getBoundingClientRect().top + scrollY"))
        section.locator(".featured-all").focus()
        for card in section.locator(".featured-card").all():
            page.keyboard.press("Tab")
            expect(card.locator("a")).to_be_focused()
            box = card.bounding_box()
            self.assertGreater(box["y"], 65, (page.evaluate("scrollY"), section.bounding_box(), section.locator(".featured-viewport").bounding_box(), section.locator(".featured-track").bounding_box(), card.evaluate("el => el.style.transform")))
            self.assertLess(box["y"] + box["height"], 900)
            expect(card.locator(".featured-view")).to_be_visible()
        self.assertTrue(page.evaluate("document.documentElement.hasAttribute('data-featured-visible')"))
        page.get_by_role("button", name="Open menu").click()
        expect(page.locator("#site-menu")).to_have_attribute("aria-hidden", "false")
        page.keyboard.press("Escape")
        self.assert_unlocked(page)

        reduced = self.page(seen=True, reduced_motion="reduce", viewport={"width": 390, "height": 844})
        reduced.goto(BASE, wait_until="networkidle")
        static = reduced.locator("#featured-projects")
        expect(static).to_have_attribute("data-motion", "off")
        self.assertEqual(static.locator(".featured-viewport").evaluate("el => getComputedStyle(el).position"), "relative")
        self.assertLess(static.evaluate("el => el.offsetHeight"), 2500)
        for card in static.locator(".featured-card").all():
            self.assertEqual(card.evaluate("el => getComputedStyle(el).transform"), "none")
            self.assertEqual(card.evaluate("el => +getComputedStyle(el).opacity"), 1)

        reduced.set_viewport_size({"width": 1440, "height": 900})
        reduced.emulate_media(reduced_motion="no-preference")
        expect(static).to_have_attribute("data-motion", "on")
        reduced.set_viewport_size({"width": 667, "height": 320})
        expect(static).to_have_attribute("data-motion", "off")
        self.assertFalse(reduced.evaluate("document.documentElement.scrollWidth > innerWidth"))

        no_js = self.page(java_script_enabled=False)
        no_js.goto(BASE, wait_until="networkidle")
        fallback = no_js.locator("#featured-projects")
        expect(fallback).to_have_attribute("data-motion", "off")
        self.assertEqual(fallback.locator(".featured-card").count(), 3)
        self.assertEqual(fallback.locator(".featured-viewport").evaluate("el => getComputedStyle(el).position"), "relative")

    def test_home_contact_follows_portfolio(self):
        for name, width, height in VIEWPORTS + [("narrow-mobile", 320, 700)]:
            with self.subTest(viewport=name):
                page = self.page(seen=True, viewport={"width": width, "height": height})
                page.goto(BASE, wait_until="networkidle")
                self.assertEqual(
                    page.locator("main > section").evaluate_all("els => els.slice(-2).map(el => el.id)"),
                    ["featured-projects", "contact-us"],
                )
                contact = page.locator("#contact-us")
                link = contact.get_by_role("link", name="Start a project brief")
                self.assertEqual(link.get_attribute("href"), "/contact#form")
                scroll_to(page, contact.evaluate("el => el.getBoundingClientRect().top + scrollY"))
                expect(contact.get_by_role("heading", name="Have something in mind?")).to_be_visible()
                expect(link).to_be_visible()
                self.assertFalse(page.evaluate("document.documentElement.scrollWidth > innerWidth"))
                if name == "desktop":
                    link.focus()
                    expect(link).to_be_focused()
                    link.click()
                    page.wait_for_url("**/contact#form")
                    expect(page.locator("#form")).to_be_visible()

        reduced = self.page(seen=True, reduced_motion="reduce", viewport={"width": 390, "height": 844})
        reduced.goto(BASE, wait_until="networkidle")
        scroll_to(reduced, reduced.locator("#contact-us").evaluate("el => el.getBoundingClientRect().top + scrollY"))
        expect(reduced.get_by_role("heading", name="Have something in mind?")).to_be_visible()
        expect(reduced.get_by_role("link", name="Start a project brief")).to_be_visible()

    def test_other_routes_remain_available(self):
        # Other pages, desktop only
        page = self.page(seen=True, viewport={"width": 1440, "height": 900})
        for route in ["projects", "journal", "about", "contact"]:
            with self.subTest(route=route):
                response = page.goto(f"{BASE}/{route}", wait_until="networkidle")
                self.assertEqual(response.status, 200)
                expect(page.locator("h1")).to_be_visible()
                expect(page.locator(LOADER)).to_have_count(0)


if __name__ == "__main__":
    unittest.main(verbosity=2)
