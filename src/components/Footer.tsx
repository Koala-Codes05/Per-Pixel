"use client";

import { useRef } from "react";
import Script from "next/script";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import ProjectLink from "@/components/ProjectLink";
import { NAV_LINKS, PROJECTS } from "@/lib/site";
import { useReducedMotionPreference } from "@/lib/use-media-query";

const KIT_FORM_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message: "Success! Now check your email to confirm your subscription.",
      redirect_url: "",
    },
    analytics: { google: null, fathom: null, facebook: null, segment: null, pinterest: null, sparkloop: null, googletagmanager: null },
    modal: { trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
    powered_by: { show: false, url: "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic" },
    recaptcha: { enabled: false },
    return_visitor: { action: "show", custom_content: "" },
    slide_in: { display_in: "bottom_right", trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
    sticky_bar: { display_in: "top", trigger: "timer", scroll_percentage: null, timer: 5, devices: "all", show_once_every: 15 },
  },
  version: "5",
});

// Kit replaces the fields with its success message; keep that subtree outside React reconciliation.
const KIT_FORM_CONTENT = `
  <ul class="formkit-alert formkit-alert-error kit-newsletter-errors" data-element="errors" data-group="alert" role="alert"></ul>
  <div data-style="clean">
    <div data-element="fields" data-stacked="false" class="seva-fields formkit-fields flex max-w-sm items-center gap-3 border-b border-ink/40 pb-2">
      <div class="formkit-field min-w-0 w-full">
        <label for="newsletter-email" class="sr-only">Email address</label>
        <input id="newsletter-email" name="email_address" type="email" placeholder="Your email address" autocomplete="email" maxlength="254" required class="formkit-input min-w-0 w-full bg-transparent text-sm placeholder:text-ink/50 focus:outline-none" />
      </div>
      <button type="submit" data-element="submit" class="formkit-submit shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-200 ease-out-expo hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60">
        <span class="kit-newsletter-label">Request updates</span><span class="kit-newsletter-loading" aria-hidden="true">Sending…</span>
      </button>
    </div>
  </div>`;

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const markY = useTransform(smoothProgress, [0, 1], ["30%", "8%"]);

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden rounded-t-4xl bg-coral text-ink" suppressHydrationWarning>
      <Script src="https://f.convertkit.com/ckjs/ck.5.js" strategy="afterInteractive" />
      <div className="mx-auto max-w-350 px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.01em]">
              New projects and studio notes,
              <br />
              sent to your inbox.
            </p>
            <p className="mt-3 max-w-sm text-sm text-ink/75">Request updates below. Check your email to confirm your subscription.</p>
            <form
              className="seva-form formkit-form kit-newsletter mt-7 max-w-sm"
              action="https://app.kit.com/forms/10109897/subscriptions"
              method="post"
              data-sv-form="10109897"
              data-uid="ab998e1941"
              data-format="inline"
              data-version="5"
              data-options={KIT_FORM_OPTIONS}
              dangerouslySetInnerHTML={{ __html: KIT_FORM_CONTENT }}
            />
            <p className="mt-3 max-w-sm text-xs text-ink/65">Your address is used for PerPixel studio updates. You can unsubscribe at any time.</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            <FooterCol
              title="Latest work"
              items={PROJECTS.slice(0, 4).map((p) => ({ label: p.title, href: p.href }))}
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
          <span>Branding · Design · Editorial · Motion</span>
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
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.label}>
            <ProjectLink
              href={item.href}
              className="group relative inline-block py-1 text-[15px] font-medium"
            >
              {item.label}
              <span className="absolute bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
            </ProjectLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
