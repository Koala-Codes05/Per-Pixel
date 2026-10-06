"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/site";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[760px]">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line first:border-t">
            <button
              id={`faq-question-${i}`}
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="faq-trigger group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:bg-ink/[0.025]"
            >
              <span className="text-[15px] font-medium transition-transform duration-300 ease-out-expo group-hover:translate-x-1">
                {item.question}
              </span>
              <span
                className={`relative grid h-6 w-6 shrink-0 place-items-center transition-transform duration-400 ease-out-expo ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                <span className="absolute h-px w-3.5 bg-ink" />
                <span className="absolute h-3.5 w-px bg-ink" />
              </span>
            </button>
            <div className="accordion" data-open={isOpen} id={`faq-panel-${i}`} role="region" aria-labelledby={`faq-question-${i}`} aria-hidden={!isOpen} inert={!isOpen}>
              <div>
                <p
                  className={`faq-answer max-w-[58ch] pb-6 text-[14px] leading-relaxed text-ink/70 transition-[transform,opacity] duration-[380ms] ease-out-expo ${
                    isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
