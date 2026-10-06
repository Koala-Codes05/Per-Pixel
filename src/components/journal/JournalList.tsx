"use client";

import { useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/site";

const POSTS = [
  {
    slug: "ai-driven-design",
    title: "Artist Redefining Architecture with AI-Driven Design",
    date: "Sep 2026",
    excerpt:
      "AI doesn't design for us — it widens the sketchbook. A look at how generative studies feed into a disciplined editorial process without flattening the result.",
    image: PROJECTS[0].image,
    alt: PROJECTS[0].alt,
  },
  {
    slug: "motion-with-meaning",
    title: "Motion That Carries Meaning, Not Decoration",
    date: "Aug 2026",
    excerpt:
      "The best scroll sequences answer a question the layout already asked. Notes on restraint, reversal, and why every pinned section needs an exit.",
    image: PROJECTS[3].image,
    alt: PROJECTS[3].alt,
  },
  {
    slug: "type-first",
    title: "Type First: Designing the Wordmark Before the Website",
    date: "Jun 2026",
    excerpt:
      "When the name is the interface. How we set oversized type that survives cropping, viewport edges, and its own confidence.",
    image: PROJECTS[5].image,
    alt: PROJECTS[5].alt,
  },
];

export default function JournalList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {POSTS.map((post, i) => {
        const isOpen = open === i;
        return (
          <article key={post.slug} className="border-t border-line last:border-b">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`journal-panel-${i}`}
              className="group grid w-full grid-cols-12 items-center gap-4 py-7 text-left"
            >
              <span className="col-span-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/50 md:col-span-1">
                {post.date}
              </span>
              <h2 className="col-span-9 font-serif text-[clamp(1.4rem,3.4vw,2.6rem)] leading-[1.05] tracking-[-0.015em] transition-transform duration-300 ease-out-expo group-hover:translate-x-2 md:col-span-10">
                {post.title}
              </h2>
              <span
                className={`col-span-1 justify-self-end text-xl transition-transform duration-400 ease-out-expo ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div className="accordion" data-open={isOpen} id={`journal-panel-${i}`}>
              <div>
                <div className="grid gap-6 pb-9 md:grid-cols-12">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-card md:col-span-5">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 768px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="max-w-[52ch] self-center text-[15px] leading-relaxed text-ink/75 md:col-span-6 md:col-start-7">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
