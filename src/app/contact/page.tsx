import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import Faq from "@/components/contact/Faq";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pt-32 md:px-8 md:pt-40" suppressHydrationWarning>
      <Reveal>
        <h1 className="text-center font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          Let&apos;s talk.
        </h1>
        <p className="mx-auto mt-5 max-w-[46ch] text-center text-[15px] leading-relaxed text-ink/70">
          Tell us where your project stands and where it needs to go. We&apos;ll
          reply with a thoughtful read on scope, timing, and approach.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-12">
        <ContactForm />
      </Reveal>

      <section id="faq" className="mt-28 scroll-mt-28 md:mt-36" aria-label="FAQ">
        <Reveal>
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/50">
            FAQ
          </p>
          <h2 className="mt-4 text-center font-serif text-[clamp(2.2rem,5vw,4rem)] leading-[1.02] tracking-[-0.015em]">
            Clear answers,
            <br />
            before we begin.
          </h2>
        </Reveal>
        <Reveal delay={80} className="mt-12">
          <Faq />
        </Reveal>

        <Reveal delay={120} className="mt-14">
          <div className="flex flex-col items-center justify-between gap-4 rounded-card bg-butter px-7 py-6 sm:flex-row">
            <p className="text-sm">
              <span className="font-semibold">Still have a question?</span>{" "}
              <span className="text-ink/70">Reach out and we&apos;ll get back to you shortly.</span>
            </p>
            <Link
              href="#form"
              className="rounded-full border border-ink/60 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              Get in touch
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
