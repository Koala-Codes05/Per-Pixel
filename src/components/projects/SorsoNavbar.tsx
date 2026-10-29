import Link from "next/link";
import { SorsoClock } from "@/components/projects/SorsoShowcase";

export default function SorsoNavbar() {
  return (
    <header className="sorso-nav" aria-label="Sorso navigation" suppressHydrationWarning>
      <div className="sorso-brand-lockup">
        <Link className="sorso-pill sorso-brand" href="/projects/sorso" aria-label="Sorso, back to top">
          Sorso<sup>®</sup>
        </Link>
        <span className="sorso-pill sorso-pill-concept">Concept</span>
      </div>
      <SorsoClock />
      <nav className="sorso-nav-links" aria-label="Sections">
        <a className="sorso-pill" href="#flavours">Flavours</a>
        <a className="sorso-pill" href="#serve">Serve</a>
        <a className="sorso-pill" href="#moments">Moments</a>
        <a className="sorso-pill sorso-pill-showreel" href="/works/offset/showreel.html" title="Watch the motion showreel">Showreel</a>
        <Link className="sorso-pill sorso-pill-back" href="/projects">All projects</Link>
      </nav>
    </header>
  );
}
