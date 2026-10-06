import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import FeaturedScene from "@/components/home/FeaturedScene";
import { PROJECTS } from "@/lib/site";

const FEATURED = [
  {
    project: PROJECTS[0],
    description: "Sculptural furniture and soft rose tones, explored through a quieter visual identity.",
  },
  {
    project: PROJECTS[1],
    description: "Portraiture and expressive color brought into a clear editorial frame.",
  },
  {
    project: PROJECTS[2],
    description: "An exploration of contrast, color, and image-led storytelling.",
  },
] as const;

export default function FeaturedProjects() {
  return (
    <FeaturedScene count={FEATURED.length}>
      <div className="featured-viewport">
        <div className="featured-header">
          <div className="featured-intro">
            <h2 id="featured-heading" className="featured-heading">
              <span className="featured-mark" aria-hidden="true">
                <span /><span /><span /><span />
              </span>
              Featured projects
            </h2>
            <p className="featured-introduction">
              Selected concepts in identity, image, and the spaces between. Imagery is illustrative.
            </p>
          </div>
          <Link href="/projects" className="featured-all group">
            see all work <ArrowUpRight />
          </Link>
        </div>

        <span className="featured-wordmark" aria-hidden="true">Portfolio</span>

        <div className="featured-track">
          {FEATURED.map(({ project, description }, index) => (
            <article key={project.slug} className="featured-card" data-index={index}>
              <Link href={`/projects#${project.slug}`} className="featured-card-link">
                <span className={`featured-art featured-art--${project.tone}`}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(min-width: 1024px) 490px, (min-width: 768px) 460px, 88vw"
                    className="featured-image"
                  />
                  <span className="featured-art-shade" aria-hidden="true" />
                  <span className="featured-counter" aria-hidden="true">0{index + 1} / 0{FEATURED.length}</span>
                  <span className="featured-art-center">
                    <span className="featured-art-title">{project.title}</span>
                    <span className="featured-view">view <ArrowUpRight /></span>
                  </span>
                </span>
                <span className="featured-card-info">
                  <span className="featured-description">{description}</span>
                  <span className="featured-category">{project.category}</span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </FeaturedScene>
  );
}
