"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/home/Bento";
import { PROJECTS } from "@/lib/site";

const SERVICES = [
  {
    title: "Design & development",
    description: "Considered from the first impression to the last interaction. We bring identity, content, and technology together in websites that feel clear, intuitive, and distinctly yours.",
    details: ["Web design", "Creative development", "Responsive systems", "Interaction design"],
    image: PROJECTS[5],
  },
  {
    title: "Brand strategy",
    description: "A clear point of view before a single pixel. We get to know your audience, ask the right questions, and turn the answers into a direction your whole team can build on.",
    details: ["Discovery", "Positioning", "Creative direction", "Visual identity"],
    image: PROJECTS[0],
  },
  {
    title: "Editorial systems",
    description: "A strong story deserves a considered structure. We shape typography, image, and rhythm into flexible systems that make your content feel connected, in print and on screen.",
    details: ["Art direction", "Typography", "Content structure", "Digital publications"],
    image: PROJECTS[1],
  },
  {
    title: "Motion & interaction",
    description: "Movement with a reason to be there. We build a motion language around your identity, adding rhythm and feedback without getting between people and what they came to do.",
    details: ["Motion systems", "Micro-interactions", "Prototyping", "Brand expression"],
    image: PROJECTS[3],
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [instant, setInstant] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % SERVICES.length;
    else if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index + SERVICES.length - 1) % SERVICES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SERVICES.length - 1;
    else return;
    event.preventDefault();
    setInstant(true);
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="services-workspace" data-instant={instant}>
      <div className="services-sidebar">
        <div className="service-tabs" role="tablist" aria-label="Our services" aria-orientation="vertical">
          {SERVICES.map((service, index) => (
            <button
              key={service.title}
              ref={(element) => { tabs.current[index] = element; }}
              id={`service-tab-${index}`}
              type="button"
              role="tab"
              className="service-tab"
              aria-selected={active === index}
              aria-controls={`service-panel-${index}`}
              tabIndex={active === index ? 0 : -1}
              onClick={(event) => { setInstant(event.detail === 0); setActive(index); }}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {service.title}<ArrowUpRight />
            </button>
          ))}
        </div>
        <Link className="services-contact group" href="/contact">
          Discuss your project <ArrowUpRight />
        </Link>
      </div>
      <div className="services-panels">
        {SERVICES.map((service, index) => (
          <div
            key={service.title}
            id={`service-panel-${index}`}
            role="tabpanel"
            className="service-panel"
            aria-labelledby={`service-tab-${index}`}
            aria-hidden={active !== index}
            inert={active !== index}
            tabIndex={active === index ? 0 : -1}
            data-active={active === index}
          >
            <div className="service-copy">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-details" aria-label={`${service.title} capabilities`}>
                {service.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </div>
            <div className="service-image">
              <Image
                src={service.image.image}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1400px) 960px, (min-width: 768px) 70vw, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
