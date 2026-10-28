"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import ProjectLink from "@/components/ProjectLink";
import { NAV_LINKS, PROJECTS } from "@/lib/site";
import { useReducedMotionPreference } from "@/lib/use-media-query";
import { CONTACT_EMAIL, sendUpdatesRequest, UPDATES_SUBJECT } from "@/lib/contact";

export default function Footer() {
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const submitting = useRef(false);
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const markY = useTransform(smoothProgress, [0, 1], ["30%", "8%"]);

  async function onUpdatesSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current || status === "sent") return;
    const data = new FormData(e.currentTarget);
    if (data.get("_honey")) return;
    const email = String(data.get("email") ?? "").trim();
    if (email.length > 254 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look right.");
      return;
    }
    submitting.current = true;
    setError(null);
    setStatus("sending");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      await sendUpdatesRequest(email, controller.signal);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("We couldn't confirm your request. Please try again or email us directly.");
    } finally {
      window.clearTimeout(timeout);
      submitting.current = false;
    }
  }

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden rounded-t-4xl bg-coral text-ink" suppressHydrationWarning>
      <div className="mx-auto max-w-350 px-5 pt-16 md:px-10 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.05] tracking-[-0.01em]">
              New projects and studio notes,
              <br />
              sent to your inbox.
            </p>
            <p className="mt-3 max-w-sm text-sm text-ink/75">Request updates below. We add addresses manually.</p>
            <form
              className="mt-7 flex max-w-sm items-center gap-3 border-b border-ink/40 pb-2"
              onSubmit={onUpdatesSubmit}
              onChange={() => setError(null)}
              action={`https://formsubmit.co/${CONTACT_EMAIL}`}
              method="POST"
              noValidate
              aria-busy={status === "sending"}
            >
              <input type="hidden" name="_subject" value={UPDATES_SUBJECT} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="request" value="Please add me to PerPixel's studio updates by email." />
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-label="Leave this field empty" className="hidden" />
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                placeholder="Your email address"
                autoComplete="email"
                maxLength={254}
                required
                disabled={status === "sending" || status === "sent"}
                className="min-w-0 w-full bg-transparent text-sm placeholder:text-ink/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.18em] transition-transform duration-200 ease-out-expo hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Requested" : "Request updates"}
              </button>
            </form>
            {error && <p className="mt-2 max-w-sm text-xs text-ink/80" role="alert">{error} <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-2">Email us</a>.</p>}
            {status === "sent" && <p className="mt-2 max-w-sm text-xs text-ink/80" role="status">Your request was received. We&apos;ll add your address manually.</p>}
            <p className="mt-3 max-w-sm text-xs text-ink/65">Your address is emailed to PerPixel through FormSubmit for studio updates. You can ask us to remove it at any time.</p>
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
