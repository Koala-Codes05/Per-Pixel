import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import ConceptMark from "@/components/ConceptMark";
import { ArrowUpRight } from "@/components/home/Bento";
import ProjectLink from "@/components/ProjectLink";
import Reveal from "@/components/Reveal";
import { CASE_STUDIES, getCaseStudy, unsplash } from "@/lib/case-studies";
import { PROJECTS } from "@/lib/site";

// Only the written concept studies render here; /projects/moove and /projects/sorso are their own routes.
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDIES.map(({ slug }) => ({ slug }));
}

function resolve(slug: string) {
  const project = PROJECTS.find((item) => item.slug === slug);
  const study = getCaseStudy(slug);
  return project && study ? { project, study } : null;
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const found = resolve((await params).slug);
  if (!found) return {};
  return { title: `${found.project.title} — ${found.study.sector}`, description: found.study.idea };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const found = resolve((await params).slug);
  if (!found) notFound();
  const { project, study } = found;
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  const theme = {
    "--case-surface": study.theme.surface,
    "--case-ink": study.theme.ink,
    "--case-accent": study.theme.accent,
    "--case-on-accent": study.theme.onAccent,
    ...Object.fromEntries(study.palette.map((color, index) => [`--case-p${index + 1}`, color.hex])),
  } as CSSProperties;
  const mark = (className = "") => (
    <span className={`case-wordmark ${className}`} data-style={study.wordmark.style}>{study.wordmark.text}</span>
  );

  return (
    <main className="case-study" style={theme} suppressHydrationWarning>
      <header className="case-header">
        <nav aria-label="Breadcrumb" className="case-crumbs">
          <Link href="/projects">Projects</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>
        <div className="mt-5"><ConceptMark /></div>
        <h1 className="case-title">{project.title}</h1>
        <div className="case-intro">
          <p className="case-idea">{study.idea}</p>
          <dl className="case-meta">
            <div><dt>Discipline</dt><dd>{project.category}</dd></div>
            <div><dt>Year</dt><dd>{project.year}</dd></div>
            <div><dt>Sector</dt><dd>{study.sector}</dd></div>
            <div><dt>Scope</dt><dd>{study.scope.join(", ")}</dd></div>
          </dl>
        </div>
        <p className="case-status">Self-initiated concept study — not client work. Photography from Unsplash, used illustratively.</p>
      </header>

      <Reveal variant="media" className="case-hero-slot">
        <div className="case-hero">
          <Image
            src={unsplash(study.photo, 2000, 1250)}
            alt={project.alt}
            fill
            preload
            sizes="(min-width: 1400px) 1336px, 100vw"
            className="object-cover"
            style={{ objectPosition: study.heroFocus }}
          />
        </div>
      </Reveal>

      <section className="case-section case-split" aria-labelledby="case-challenge">
        <h2 id="case-challenge">The challenge</h2>
        <p className="case-lede">{study.challenge}</p>
      </section>

      <section className="case-section case-split" aria-labelledby="case-strategy">
        <h2 id="case-strategy">The strategy</h2>
        <ol className="case-principles">
          {study.strategy.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="case-identity" aria-labelledby="case-identity">
        <div className="case-identity-inner">
          <h2 id="case-identity">The identity</h2>
          <div className="case-identity-grid">
            <div className={`case-wordmark-card${study.liquid ? " case-wordmark-card--liquid" : ""}`}>
              {mark()}
              <p className="case-wordmark-note">{study.wordmark.note}</p>
            </div>
            <div className="case-identity-side">
              <ul className="case-palette" aria-label="Colour palette">
                {study.palette.map((color) => (
                  <li key={color.hex}>
                    <span className="case-swatch" style={{ background: color.hex }} aria-hidden="true" />
                    <span className="case-swatch-name">{color.name}</span>
                    <span className="case-swatch-hex">{color.hex.toUpperCase()}</span>
                  </li>
                ))}
              </ul>
              <div className="case-type">
                <span className="case-type-sample" data-style={study.wordmark.style} aria-hidden="true">Aa</span>
                <dl>
                  <div><dt>Display</dt><dd>{study.type.display}</dd></div>
                  <div><dt>Text</dt><dd>{study.type.text}</dd></div>
                </dl>
                <p>{study.type.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section" aria-labelledby="case-application">
        <h2 id="case-application">In application</h2>
        <div className="case-application">
          <Reveal variant="media" className="case-poster-slot">
            <figure className="case-poster">
              <Image
                src={unsplash(study.photo, 1200, 1600, study.crops.poster)}
                alt={`${project.title} campaign poster concept`}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              <figcaption>
                {mark()}
                <span className="case-poster-meta">Campaign poster<br />{project.year}</span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal variant="media" delay={80} className="case-detail-slot">
            <figure>
              <div className="case-detail">
                <Image
                  src={unsplash(study.photo, 1600, 1200, study.crops.detail)}
                  alt={study.crops.detail.caption}
                  fill
                  sizes="(min-width: 768px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="case-caption">{study.crops.detail.caption}</figcaption>
            </figure>
          </Reveal>
          <Reveal className="case-web-slot">
            <figure className="case-web">
              <div className="case-web-bar" aria-hidden="true">
                <span /><span /><span />
                <span className="case-web-url">{project.title} — website concept</span>
              </div>
              <div className="case-web-page">
                <div className="case-web-nav">
                  {mark()}
                  <span className="case-web-links" aria-hidden="true">
                    {study.web.nav.map((item) => <span key={item}>{item}</span>)}
                  </span>
                </div>
                <div className="case-web-hero">
                  <div>
                    <p className="case-web-headline" data-style={study.wordmark.style}>{study.web.headline}</p>
                    <span className="case-web-cta" aria-hidden="true">Explore <ArrowUpRight /></span>
                  </div>
                  <div className="case-web-image">
                    <Image
                      src={unsplash(study.photo, 1600, 1000, study.crops.wide)}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">{`${project.title} website homepage concept`}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="case-section case-split" aria-labelledby="case-outcome">
        <h2 id="case-outcome">What we made</h2>
        <div>
          <ul className="case-deliverables">
            {study.deliverables.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="case-note">
            A self-initiated study, made to test an idea end to end. There is no client, launch, or result behind it —
            if it sounds like a problem you have, <Link href="/contact">tell us about it</Link>.
          </p>
        </div>
      </section>

      <nav className="case-next" aria-label="More projects">
        <ProjectLink href={next.href} className="case-next-link group">
          <span className="case-next-label">Next project · Concept</span>
          <span className="case-next-title">{next.title} <ArrowUpRight /></span>
          <span className="case-next-thumb">
            <Image src={next.image} alt="" fill sizes="220px" className="object-cover" />
          </span>
        </ProjectLink>
        <Link href="/projects" className="case-all">All projects</Link>
      </nav>
    </main>
  );
}
