import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LiquidDistortion from "@/components/LiquidDistortion";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/home/Bento";
import {
  MooveCollectionLedger,
  MooveDossierBuilder,
  MooveHeroInspector,
  MoovePaletteSwatches,
  MooveShellSequence,
} from "@/components/projects/MooveShowcase";

export const metadata: Metadata = {
  title: "Moove — 2026 Brand & Furniture Showcase",
  description:
    "Moove (2026) — Sculptural furniture and soft rose tones, explored through a quieter visual identity by PerPixel.",
};

export default function MoovePage() {
  return (
    <main className="moove-page pt-24 md:pt-28" suppressHydrationWarning>
      {/* In-world Moove sub-navigation bar */}
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav
          aria-label="Moove brand showcase navigation"
          className="moove-subnav"
        >
          <div className="moove-subnav-brand">
            <span className="moove-wordmark-badge">MOOVE®</span>
            <span className="moove-subnav-meta tabular-nums">
              Branding · 2026 · Collection 01
            </span>
          </div>

          <div className="moove-subnav-links">
            <a href="#collection">Collection</a>
            <a href="#shell-study">Shell Study</a>
            <a href="#identity">Identity</a>
            <a href="#dossier">Dossier</a>
          </div>

          <Link href="/projects" className="moove-subnav-back group">
            <span>All projects</span>
            <ArrowUpRight />
          </Link>
        </nav>
      </div>

      {/* First Viewport: Hero Thesis & Interactive Finish / Orthographic Inspector */}
      <section
        aria-label="Moove hero and finish inspector"
        className="mx-auto mt-6 max-w-[1400px] px-5 md:mt-8 md:px-8"
      >
        <MooveHeroInspector />
      </section>

      {/* Architectural Thesis Banner */}
      <section
        aria-label="Atelier philosophy"
        className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-8"
      >
        <Reveal>
          <div className="moove-thesis-band">
            <h2 className="moove-thesis-quote">
              We do not upholster frames. We cast pigment into mineral mass and fold one
              curve until the material stands on its own.
            </h2>
            <div className="moove-thesis-facts">
              <div>
                <strong>Milano &amp; Lisboa</strong>
                <span>Foundry &amp; stone yard</span>
              </div>
              <div>
                <strong className="tabular-nums">18 mm</strong>
                <span>Uniform shell section</span>
              </div>
              <div>
                <strong className="tabular-nums">04 Pieces</strong>
                <span>Inaugural 2026 edition</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Section 2: Numbered Editions — Interactive Collection Ledger */}
      <section
        id="collection"
        aria-labelledby="moove-collection-heading"
        className="mx-auto mt-24 max-w-[1400px] scroll-mt-24 px-5 md:mt-32 md:px-8"
      >
        <Reveal>
          <div className="moove-section-head">
            <h2 id="moove-collection-heading" className="moove-section-title">
              Collection 01 — Monolithic Seating &amp; Objects.
            </h2>
            <p className="moove-section-sub">
              Four architectural forms cast in rose mineral resin, Roman travertine, and
              anodized aluminum. Select an edition to inspect its orthographic section and
              dimensions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <MooveCollectionLedger />
        </Reveal>
      </section>

      {/* Section 3: Continuous Scroll-Linked Shell-Curvature Study */}
      <MooveShellSequence />

      {/* Section 4: Brand Identity & Spatial Lookbook */}
      <section
        id="identity"
        aria-labelledby="moove-identity-heading"
        className="mx-auto mt-24 max-w-[1400px] scroll-mt-24 px-5 md:mt-32 md:px-8"
      >
        <Reveal>
          <div className="moove-section-head">
            <h2 id="moove-identity-heading" className="moove-section-title">
              Quiet visual identity rooted in mineral pigment and architectural type.
            </h2>
            <p className="moove-section-sub">
              Designed by PerPixel in 2026, the Moove identity pairs structural geometric
              grotesque lettering with warm editorial italics and tactile edition stamping.
            </p>
          </div>
        </Reveal>

        {/* Typography specimen */}
        <Reveal delay={40}>
          <div className="moove-type-specimen">
            <div className="moove-type-col">
              <h3 className="moove-type-sample-sans">MOOVE 01</h3>
              <p className="moove-type-desc">
                <strong>Archivo Black · Display Architecture</strong> — Used for edition
                marks, crate stencils, and brass foundry stamps. Set tight at -0.03em.
              </p>
            </div>
            <div className="moove-type-col">
              <h3 className="moove-type-sample-serif">
                <em>Form held in quiet tension.</em>
              </h3>
              <p className="moove-type-desc">
                <strong>Instrument Serif Italic · Curatorial Voice</strong> — Used for
                monograph titles, material notes, and collector certificates.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Mineral Color Swatches */}
        <Reveal delay={80}>
          <div className="mt-8">
            <MoovePaletteSwatches />
          </div>
        </Reveal>

        {/* Asymmetric Lookbook Grid */}
        <div className="moove-lookbook-grid mt-12">
          <Reveal variant="media" className="moove-lookbook-large">
            <figure className="moove-lookbook-figure">
              <div className="moove-lookbook-img-wrap aspect-[16/10]">
                <Image
                  src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1400&q=80"
                  alt="Arca 01 chair bathed in soft rose studio daylight"
                  fill
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="moove-lookbook-img object-cover"
                />
                <LiquidDistortion />
              </div>
              <figcaption className="moove-lookbook-caption">
                <span>Lookbook Plate I — Milan Viewing Room</span>
                <span className="tabular-nums">Arca 01 · Rose Chalk 04</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal variant="media" delay={60} className="moove-lookbook-tall">
            <figure className="moove-lookbook-figure">
              <div className="moove-lookbook-img-wrap aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80"
                  alt="Quiet interior composition with sculptural chair and natural plaster"
                  fill
                  sizes="(min-width: 1024px) 34vw, 100vw"
                  className="moove-lookbook-img object-cover"
                />
                <LiquidDistortion />
              </div>
              <figcaption className="moove-lookbook-caption">
                <span>Lookbook Plate II — Lisbon Residence</span>
                <span className="tabular-nums">Velo 03 · Travertine Bone</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Section 5: Commission & Specification Dossier Builder */}
      <section
        id="dossier"
        aria-label="Commission and trade dossier"
        className="mx-auto mt-24 max-w-[1400px] scroll-mt-24 px-5 pb-12 md:mt-32 md:px-8"
      >
        <Reveal>
          <MooveDossierBuilder />
        </Reveal>
      </section>
    </main>
  );
}
