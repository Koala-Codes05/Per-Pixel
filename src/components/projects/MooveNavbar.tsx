import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import ConceptMark from "@/components/ConceptMark";

const MOOVE_ANCHORS = [
  { label: "Collection", href: "#collection" },
  { label: "Shell Study", href: "#shell-study" },
  { label: "Identity", href: "#identity" },
  { label: "Dossier", href: "#dossier" },
];

export default function MooveNavbar() {
  return (
    <header className="moove-header" suppressHydrationWarning>
      <nav className="moove-header-nav" aria-label="Moove brand navigation">
        <div className="moove-header-brand">
          <span className="moove-wordmark-badge">MOOVE®</span>
          <ConceptMark />
          <span className="moove-header-meta tabular-nums">
            Branding · 2026 · Collection 01
          </span>
        </div>
        <div className="moove-header-links">
          {MOOVE_ANCHORS.map((anchor) => (
            <a key={anchor.href} href={anchor.href}>
              {anchor.label}
            </a>
          ))}
        </div>
        <Link href="/projects" className="moove-header-back group">
          <span>All projects</span>
          <ArrowUpRight />
        </Link>
      </nav>
    </header>
  );
}
