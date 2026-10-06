import Link from "next/link";
import Hero from "@/components/home/Hero";
import Bento, { ArrowUpRight } from "@/components/home/Bento";
import Wordplay from "@/components/home/Wordplay";
import Process from "@/components/home/Process";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export default function Home() {
  return (
    <main suppressHydrationWarning>
      <Hero />
      <Bento />
      <Wordplay />
      <Process />
      <FeaturedProjects />
      <section id="contact-us" className="home-contact" aria-labelledby="home-contact-title">
        <div className="home-contact-inner">
          <h2 id="home-contact-title" className="home-contact-title">
            Have<br />something<br /><em>in mind?</em>
          </h2>
          <div className="home-contact-details">
            <p className="home-contact-label">Contact us</p>
            <p className="home-contact-copy">
              Bring an idea, a question, or a brief still taking shape. Start with a few details and see where it could go.
            </p>
            <Link href="/contact#form" className="home-contact-link">
              Start a project brief
              <span className="home-contact-icon"><ArrowUpRight /></span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
