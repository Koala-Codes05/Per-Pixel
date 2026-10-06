import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/home/Bento";

export const metadata: Metadata = {
  title: "About",
};

const CAPABILITIES = ["Brand identity", "Editorial systems", "Web design", "Motion language"];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1100px] px-5 pt-32 md:px-8 md:pt-40" suppressHydrationWarning>
      <Reveal>
        <h1 className="max-w-[14ch] font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[1] tracking-[-0.02em]">
          Design that behaves like it means it.
        </h1>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <p className="max-w-[52ch] text-lg leading-relaxed text-ink/80">
            PerPixel is a small studio for brand and digital design. We work with
            founders and teams who want their websites to feel as considered as
            their products — typography first, motion with intent, nothing loud
            for the sake of it.
          </p>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink/70">
            Every engagement runs the same three phases: Start, Ready, Takeoff.
            Discovery sharpens the brief, concept work gives it a voice, and
            execution ships it with the details intact. We stay small on
            purpose — the people you brief are the people who build.
          </p>
        </Reveal>
        <Reveal delay={100} className="md:col-span-4 md:col-start-9">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">
            Capabilities
          </h2>
          <ul className="mt-4">
            {CAPABILITIES.map((c) => (
              <li
                key={c}
                className="border-t border-line py-3 text-[15px] font-medium last:border-b"
              >
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <Link
          href="/contact"
          className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-paper transition-transform duration-200 ease-out-expo hover:-translate-y-0.5"
        >
          Start a project
          <ArrowUpRight />
        </Link>
      </Reveal>
    </main>
  );
}
