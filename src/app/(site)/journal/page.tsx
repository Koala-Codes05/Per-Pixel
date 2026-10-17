import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import JournalList from "@/components/journal/JournalList";

export const metadata: Metadata = {
  title: "Journal",
};

export default function JournalPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pt-32 md:px-8 md:pt-40" suppressHydrationWarning>
      <Reveal>
        <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          Journal.
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink/70">
          Notes on process, typography, and motion — written between projects.
        </p>
      </Reveal>
      <Reveal delay={80} className="mt-14">
        <JournalList />
      </Reveal>
    </main>
  );
}
