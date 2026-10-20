import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import JournalList from "@/components/journal/JournalList";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <main className="mx-auto max-w-275 px-5 pt-32 md:px-8 md:pt-40" suppressHydrationWarning>
      <Reveal>
        <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          Journal.
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink/70">
          Notes on process, typography, and motion — written between projects.
        </p>
      </Reveal>
      <Reveal delay={60} className="mt-10">
        <Link
          href="/playbook"
          className="group block rounded-card bg-ink p-6 text-paper transition-colors hover:bg-coral hover:text-ink md:p-8"
        >
          <p className="text-xs font-semibold tracking-[0.14em] text-paper/60 group-hover:text-ink/60">
            FEATURED RESEARCH / 2026
          </p>
          <p className="mt-4 max-w-3xl font-serif text-3xl leading-none tracking-[-0.03em] md:text-5xl">
            Read the 2026 Studio Intelligence &amp; Growth Playbook{" "}
            <span aria-hidden="true">&rarr;</span>
          </p>
        </Link>
      </Reveal>
      <Reveal delay={80} className="mt-14">
        <JournalList />
      </Reveal>
    </main>
  );
}
