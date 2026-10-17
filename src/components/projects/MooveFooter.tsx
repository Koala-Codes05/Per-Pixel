"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ArrowUpRight } from "@/components/home/Bento";
import { useReducedMotionPreference } from "@/lib/use-media-query";

const SHOWCASE_LINKS = [
  { label: "Collection", href: "#collection" },
  { label: "Shell Study", href: "#shell-study" },
  { label: "Identity", href: "#identity" },
  { label: "Dossier", href: "#dossier" },
];

const STUDIO_LINKS = [
  { label: "All projects", href: "/projects" },
  { label: "PerPixel studio", href: "/" },
  { label: "Contact", href: "/contact" },
];

export default function MooveFooter() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const markY = useTransform(smoothProgress, [0, 1], ["30%", "8%"]);

  return (
    <footer
      ref={ref}
      className="moove-footer relative mt-24 overflow-hidden rounded-t-4xl"
      suppressHydrationWarning
    >
      <div className="mx-auto max-w-350 px-5 pt-16 md:px-10 md:pt-24">
        <div className="moove-footer-grid">
          <div className="moove-footer-intro">
            <p className="moove-footer-line">
              Sculptural furniture held by <em>a single curve.</em>
            </p>
            <a href="#dossier" className="moove-footer-cta group">
              <span>Request the commission dossier</span>
              <ArrowUpRight />
            </a>
          </div>

          <div className="moove-footer-cols">
            <div>
              <h3 className="moove-footer-col-title">Showcase</h3>
              <ul className="moove-footer-col-list">
                {SHOWCASE_LINKS.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="moove-footer-link group relative">
                      {link.label}
                      <span className="moove-footer-link-underline" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="moove-footer-col-title">Studio</h3>
              <ul className="moove-footer-col-list">
                {STUDIO_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="moove-footer-link group relative">
                      {link.label}
                      <span className="moove-footer-link-underline" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="moove-footer-row">
          <span>© 2026 Moove Atelier · Milano &amp; Lisboa</span>
          <span>Brand identity &amp; digital showcase by PerPixel</span>
        </div>
      </div>

      <motion.div
        className="moove-footer-mark pointer-events-none select-none whitespace-nowrap text-center font-sans font-black leading-[0.78] tracking-[-0.04em]"
        style={{ fontSize: "clamp(6rem, 28vw, 28rem)", y: reducedMotion ? "8%" : markY }}
        aria-hidden="true"
      >
        MOOVE
      </motion.div>
    </footer>
  );
}
