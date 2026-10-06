"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/site";
import { lockScroll, setRegionsInert, unlockScroll } from "@/lib/lenis";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [instant, setInstant] = useState(false);
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Close the menu on navigation — adjusted during render, not in an effect.
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const navigation = root.current;
    const button = toggle.current;
    lockScroll("menu");
    setRegionsInert("menu", true, "main, footer");
    navigation?.querySelector<HTMLAnchorElement>(".menu-panel a")?.focus({ preventScroll: true });
    return () => {
      unlockScroll("menu");
      setRegionsInert("menu", false, "main, footer");
      if (navigation?.contains(document.activeElement)) button?.focus({ preventScroll: true });
    };
  }, [open]);

  const close = (event: MouseEvent<HTMLAnchorElement>) => {
    setInstant(event.detail === 0);
    setOpen(false);
  };

  return (
    <div
      ref={root}
      className="site-navigation"
      role={open ? "dialog" : undefined}
      aria-modal={open ? true : undefined}
      aria-label={open ? "Site navigation" : undefined}
      data-instant={instant}
      onKeyDown={(event) => {
        if (!open) return;
        if (event.key === "Escape") {
          event.preventDefault();
          setInstant(true);
          setOpen(false);
        }
        if (event.key !== "Tab") return;
        const targets = Array.from(root.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])
          .filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <header className="fixed inset-x-0 top-0 z-50 px-5 pt-4 md:px-8" suppressHydrationWarning>
        <nav className="relative mx-auto flex max-w-[1400px] items-center justify-between" aria-label="Primary navigation">
          <Link href="/" onClick={close} className="text-[13px] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]" aria-label="PerPixel home">
            Per<br />Pixel<sup className="text-[8px] font-bold">®</sup>
          </Link>
          <button
            ref={toggle}
            type="button"
            onClick={(event) => { setInstant(event.detail === 0); setOpen((value) => !value); }}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="brand-toggle absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center"
          >
            <span className="brand-mark" data-state={open ? "open" : pathname === "/" ? "grid" : "paired"} aria-hidden="true">
              {[0, 1, 2, 3].map((index) => <span key={index} />)}
            </span>
          </button>
          <div className="hidden items-center gap-3 md:flex lg:gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`nav-link group relative text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors duration-200 ${pathname === link.href ? "text-ink" : "text-ink/60 hover:text-ink"}`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-ink transition-transform duration-300 ease-out-expo ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            ))}
            <span className="text-ink/40" aria-hidden="true">↗</span>
          </div>
        </nav>
      </header>
      <div
        id="site-menu"
        className="menu-panel fixed inset-0 z-40 flex flex-col justify-end overflow-y-auto bg-paper px-5 pb-10 pt-28 md:px-8"
        data-open={open}
        data-lenis-prevent
        inert={!open}
        aria-hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Menu">
          {NAV_LINKS.map((link, index) => (
            <Link key={link.href} href={link.href} onClick={close} aria-current={pathname === link.href ? "page" : undefined} className="menu-link group flex items-baseline justify-between border-t border-line py-4 last:border-b">
              <span className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] leading-none tracking-[-0.02em] transition-transform duration-300 ease-out-expo group-hover:translate-x-1">{link.label}</span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">0{index + 1}</span>
            </Link>
          ))}
        </nav>
        <p className="mt-10 text-[11px] uppercase tracking-[0.2em] text-ink/50">PerPixel — Digital &amp; brand design studio</p>
      </div>
    </div>
  );
}
