import Link from "next/link";
import HeroPhrase from "@/components/home/HeroPhrase";
import { ArrowUpRight } from "@/components/home/Bento";

const CAPABILITIES = ["Brand identity", "Web design", "Editorial systems", "Motion & interaction"];

export default function Hero() {
  return (
    <section className="home-hero mx-auto max-w-[1400px] px-5 md:px-8" aria-labelledby="hero-heading">
      <div className="hero-meta">
        <span>PerPixel® — Independent design studio</span>
        <span>Brand &amp; digital experiences</span>
      </div>
      <h1 id="hero-heading" className="hero-title">
        <span>Creative</span>{" "}
        <span className="hero-title-last">Studio<sup>®</sup></span>
      </h1>
      <div className="hero-support">
        <p className="hero-signature">We make digital experiences.</p>
        <HeroPhrase />
      </div>
      <div className="hero-bottom">
        <div className="hero-intro">
          <p>
            We build brand identities and digital experiences with clarity,
            craft, and intent.
          </p>
          <Link href="/projects" className="hero-work-link group">
            Explore our work <ArrowUpRight />
          </Link>
        </div>
        <ul className="hero-capabilities" aria-label="Studio capabilities">
          {CAPABILITIES.map((capability) => <li key={capability}>{capability}</li>)}
        </ul>
      </div>
    </section>
  );
}
