"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { PROJECTS, type Project } from "@/lib/site";

const FILTERS = ["All", "Branding", "Design", "Editorial", "Motion"] as const;
type Filter = (typeof FILTERS)[number];

export default function ProjectsGallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = PROJECTS.filter((project) => filter === "All" || project.category === filter);

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`rounded-full border px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${filter === option ? "border-ink bg-ink text-paper" : "border-line-strong text-ink/60 hover:border-ink hover:text-ink"}`}
          >
            {option}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {visible.map((project, index) => <Card key={project.slug} project={project} index={index} />)}
      </div>
    </div>
  );
}

function Card({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal variant="media" delay={(index % 2) * 60}>
      <a id={project.slug} href={`#details-${project.slug}`} className="project-card group block scroll-mt-24">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-blush">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="project-image object-cover"
          />
          <span className="absolute left-4 top-4 rounded-full bg-paper/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] backdrop-blur">
            {project.title}
          </span>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-2 px-1">
          <span className="project-title font-serif text-xl italic">{project.title}</span>
          <span className="text-[11px] uppercase tracking-[0.16em] text-ink/60">{project.category} · {project.year}</span>
        </div>
      </a>
    </Reveal>
  );
}
