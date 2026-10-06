import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { PROJECTS } from "@/lib/site";

const chips = ["Branding", "Web design", "Motion"];

export default function Bento() {
  const moove = PROJECTS[0];
  const portrait = PROJECTS[1];
  const rows = PROJECTS.slice(2, 5);

  return (
    <section id="studio" className="bento-section mx-auto max-w-[1400px] px-5 md:px-8" aria-label="Studio highlights">
      <div className="bento-grid">
        {/* Article card */}
        <Reveal className="bento-article-slot">
          <Link href="/journal" className="bento-tile bento-article group">
            <span className="bento-journal-top">
              <span className="bento-kicker">From the journal</span>
              <Sunburst />
            </span>
            <span className="bento-article-title">
              Artist Redefining Architecture with AI-Driven Design
            </span>
            <span className="bento-article-link">Read the story <ArrowUpRight /></span>
          </Link>
        </Reveal>

        {/* Portrait */}
        <Reveal delay={60} className="bento-portrait-slot">
          <Link
            href={`/projects#${portrait.slug}`}
            className="bento-tile bento-portrait group"
            aria-label={`${portrait.title} project`}
          >
            <Image
              src={portrait.image}
              alt={portrait.alt}
              fill
              sizes="(min-width: 1400px) 440px, (min-width: 768px) 33vw, 50vw"
              className="bento-image object-cover"
            />
          </Link>
        </Reveal>

        {/* Moove card */}
        <Reveal delay={100} className="bento-projects-slot">
          <div className="bento-projects-card">
            <Link href={`/projects#${moove.slug}`} className="bento-feature group">
              <span className="bento-project-heading">{moove.title}<ArrowUpRight /></span>
              <span className="bento-project-image">
                <Image
                  src={moove.image}
                  alt={moove.alt}
                  fill
                  sizes="(min-width: 1400px) 400px, (min-width: 768px) 30vw, 90vw"
                  className="bento-image object-cover"
                />
              </span>
            </Link>
            {/* Project rows */}
            <div className="bento-project-list">
              {rows.map((project) => (
                <Link key={project.slug} href={`/projects#${project.slug}`} className="bento-project-link group">
                  <span>{project.title}</span><ArrowUpRight />
                </Link>
              ))}
            </div>
          </div>
          {/* Chips */}
          <ul className="bento-disciplines" aria-label="Disciplines">
            {chips.map((chip) => <li key={chip}>{chip}</li>)}
          </ul>
        </Reveal>

        {/* PER PIXEL text card */}
        <Reveal delay={40} className="bento-about-slot">
          <div className="bento-tile bento-about">
            <Sparkle />
            <div>
              <h2>Per Pixel</h2>
              <p>
                We&apos;re a small studio for brand and digital design. Strategy, identity,
                editorial systems, and motion — built slowly, shipped sharp.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Questions + Contact */}
        <Reveal delay={80} className="bento-contact-slot">
          <Link href="/contact" className="bento-tile bento-contact group">
            <span className="bento-contact-top"><span>Have some<br />questions?</span><ArrowUpRight /></span>
            <span className="bento-contact-title">Contact me</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <path
        d="M3 13L13 3M13 3H5M13 3v8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-coral" aria-hidden="true">
      <path
        d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Sunburst() {
  return (
    <svg viewBox="0 0 120 120" className="bento-sunburst" fill="none" stroke="currentColor" strokeWidth="0.8" aria-hidden="true">
      {Array.from({ length: 32 }, (_, index) => (
        <path key={index} d="M60 40V7" transform={`rotate(${index * 11.25} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="13" />
    </svg>
  );
}
