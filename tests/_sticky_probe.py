"""Probe sticky sections on a phone profile: data-motion, position, transforms vs scroll."""
import json
import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else "http://localhost:3000"
PATH = sys.argv[2] if len(sys.argv) > 2 else "/"

SECTIONS = [
    (".wordplay-section", ".wordplay-word"),
    (".featured-section", ".featured-card"),
    (".process-section", ".process-frame"),
    (".moove-shell-section", ".moove-shell-frame"),
]

with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
    page = ctx.new_page()
    page.goto(BASE + PATH, wait_until="networkidle")
    page.evaluate("""() => {
      const s = document.querySelector('.preloader-skip'); if (s) s.click();
      window.dispatchEvent(new Event('pp:intro-end'));
    }""")
    page.wait_for_timeout(600)

    report = {}
    for sel, child in SECTIONS:
        el = page.query_selector(sel)
        if not el:
            report[sel] = "absent"
            continue
        info = page.evaluate("""([sel, child]) => {
          const s = document.querySelector(sel);
          const r = s.getBoundingClientRect();
          const vp = s.querySelector('[class*="viewport"], .moove-shell-viewport, .featured-viewport, .wordplay-viewport, .process-viewport');
          return {
            motion: s.dataset.motion,
            height: Math.round(r.height),
            top: Math.round(r.top + window.scrollY),
            viewportPos: vp ? getComputedStyle(vp).position : null,
            viewportH: vp ? Math.round(vp.getBoundingClientRect().height) : null,
            children: s.querySelectorAll(child).length,
            vh: window.innerHeight, vw: window.innerWidth,
          };
        }""", [sel, child])
        # scroll to section start, then sample transforms at 4 depths
        page.evaluate("(top) => window.scrollTo({top, behavior:'instant'})", info["top"] + 10)
        page.wait_for_timeout(250)
        samples = []
        dist = max(1, info["height"] - info["vh"])
        for frac in (0.1, 0.4, 0.7, 0.95):
            page.evaluate("(y) => window.scrollTo({top: y, behavior:'instant'})", info["top"] + dist * frac)
            page.wait_for_timeout(250)
            t = page.evaluate("""([sel, child]) => {
              const s = document.querySelector(sel);
              const kids = [...s.querySelectorAll(child)].slice(0, 4);
              return kids.map(k => ({t: (k.style.transform||'').slice(0,60) || getComputedStyle(k).transform.slice(0,60), o: k.style.opacity || getComputedStyle(k).opacity}));
            }""", [sel, child])
            samples.append({"frac": frac, "kids": t})
        info["samples"] = samples
        report[sel] = info
    print(json.dumps(report, indent=1))
    b.close()
