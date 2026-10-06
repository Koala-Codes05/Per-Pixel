"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { NAV_LINKS, PROJECTS } from "@/lib/site";
import { useReducedMotionPreference } from "@/lib/use-media-query";

export default function Footer() {
  const [note, setNote] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["30%", "8%"]);

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden rounded-t-[2rem] bg-coral text-ink" suppressHydrationWarning>
      <div className="mx-auto max-w-[1400px] px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.01em]">
              Subscribe for new projects
              <br />
              and insights, once a month.
            </p>
            <form
              className="mt-7 flex max-w-sm items-center gap-3 border-b border-ink/40 pb-2"
              onSubmit={(e) => {
                e.preventDefault();
                const email = new FormData(e.currentTarget).get("email");
                if (typeof email === "string" && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                  setNote("no-list");
                } else {
                  setNote("invalid");
                }
              }}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-sm placeholder:text-ink/50 focus:outline-none"
              />
              <button
                type="submit"
                className="text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
              >
                Submit
              </button>
            </form>
            {note === "invalid" && (
              <p className="mt-2 text-xs text-ink/70">That email doesn&apos;t look right.</p>
            )}
            {note === "no-list" && (
              <p className="mt-2 max-w-sm text-xs text-ink/80">
                The mailing list isn&apos;t connected yet — reach us through the{" "}
                <Link href="/contact" className="underline underline-offset-2">
                  contact page
                </Link>{" "}
                instead.
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterCol
              title="Latest work"
              items={PROJECTS.slice(0, 4).map((p) => ({
                label: p.title,
                href: `/projects#${p.slug}`,
              }))}
            />
            <FooterCol
              title="Information"
              items={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))}
            />
            <FooterCol
              title="Contact"
              items={[
                { label: "Say hello", href: "/contact" },
                { label: "Project brief", href: "/contact#form" },
                { label: "FAQ", href: "/contact#faq" },
              ]}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/25 py-5 text-[11px] uppercase tracking-[0.16em] text-ink/70">
          <span>© 2026 PerPixel Studio</span>
          <span>Design &amp; Motion</span>
          <span className="flex gap-4" aria-label="Social links">
            <a href="/contact" className="transition-colors hover:text-ink">Be</a>
            <a href="/contact" className="transition-colors hover:text-ink">Ig</a>
            <a href="/contact" className="transition-colors hover:text-ink">Dr</a>
            <a href="/contact" className="transition-colors hover:text-ink">Li</a>
          </span>
        </div>
      </div>

      <motion.div
        className="footer-mark pointer-events-none select-none whitespace-nowrap text-center font-sans font-black leading-[0.78] tracking-[-0.04em] text-paper"
        style={{ fontSize: "clamp(6rem, 21.5vw, 24rem)", y: reducedMotion ? "8%" : markY }}
        aria-hidden="true"
      >
        PERPIXEL
      </motion.div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/60">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="group relative text-[15px] font-medium"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
