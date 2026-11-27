export type StudioProfile = {
  slug?: string;
  name: string;
  region: "Global" | "India";
  location: string;
  founded: string;
  size: string;
  linkedin: string;
  founders: string;
  positioning: string;
  services: string;
  clients: string;
  ratingSignal: string;
  culturePricingSignal: string;
  playbook: string;
  tags: ("Founder-Led" | "Motion/Tech" | "Editorial/Small Prestige")[];
};

export const STUDIOS: StudioProfile[] = [
  {
    slug: "portorocha",
    name: "PORTO ROCHA",
    region: "Global",
    location: "New York + London",
    founded: "2019",
    size: "~50–56",
    linkedin: "~31k",
    founders: "Leo Porto & Felipe Rocha",
    positioning: "Strategically rigorous, culturally relevant design across brand + digital systems.",
    services: "Brand strategy, visual identity, digital products, motion, packaging, art direction, exhibition.",
    clients: "Nike, Google Gemini, Twitch, Netflix, Airbnb, MoMA PS1, W Hotels, Sundance",
    ratingSignal: "No Clutch/Trustpilot footprint — awards & tier-1 client roster act as proof.",
    culturePricingSignal: "Scaled 20→56 in 12 months; ~$103k modeled US avg salary; annual studio retreat + EOY bonus + learning stipend; runs work.portorocha.com credentials microsite.",
    playbook: "Self-initiated 'Design Threads' publishing platform + high-depth case launches on site.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "koto",
    name: "Koto",
    region: "Global",
    location: "London, LA, NY, Berlin, Sydney",
    founded: "2014",
    size: "~150–200",
    linkedin: "~90k",
    founders: "James Greenfield, Carolineollo & Jowey Roden",
    positioning: "Brand + digital studio for ambitious tech and consumer companies.",
    services: "Brand strategy, identity systems, digital experience, motion, naming, sonic.",
    clients: "Google Gemini, WhatsApp, Uber Eats, Sonos, Bolt, Uniqode, Discord, Airbnb",
    ratingSignal: "Largest LinkedIn presence in category (~90k); lost Uber rebrand for being 'too small', triggering global scale-up (+53% YoY holding co growth).",
    culturePricingSignal: "Mixed contractor reviews on pace + 4-day office mandate; directory floor $10k+ ($100–149/hr) though enterprise rebrands run $100k+.",
    playbook: "Runs THREE owned media properties (Off.Brand newsletter, Off.Live events, Seasoned F&B platform) + narrative Challenge→Outcome case studies.",
    tags: ["Motion/Tech"],
  },
  {
    slug: "dumbar",
    name: "Studio Dumbar / DEPT",
    region: "Global",
    location: "Rotterdam",
    founded: "1977",
    size: "~40–45",
    linkedin: "~58k",
    founders: "Gert Dumbar (led by Liza Enebeis)",
    positioning: "Visual branding, motion identity, sound, and creative coding benchmark.",
    services: "Visual identity, motion systems, sound design, generative/creative coding tools.",
    clients: "OpenAI, Dutch Railways (NS), Instagram, Adidas, Van Gogh Museum, D&AD",
    ratingSignal: "~5.0 employee reviews (small sample): 'no overtime', 'interns get real responsibility'.",
    culturePricingSignal: "Backed by DEPT holding structure; custom internal kinetic-type software built per client.",
    playbook: "Created DEMO (Design in Motion Festival) — 24h public screen takeovers at rail hubs and Times Square that own the 'motion branding' category.",
    tags: ["Motion/Tech"],
  },
  {
    slug: "yukiko",
    name: "Studio Yukiko",
    region: "Global",
    location: "Berlin",
    founded: "2010",
    size: "~8",
    linkedin: "~1k",
    founders: "Michelle Phillips & Johannes Conrad",
    positioning: "Creative direction, brand strategy & editorial visual storytelling bridging IRL and URL.",
    services: "Creative/art direction, brand strategy, editorial publications, spatial, campaigns.",
    clients: "Nike, Apple, Netflix, Meta, MIT Architecture, Rimowa, Highsnobiety, Dazed",
    ratingSignal: "4.9/5 Google rating; D&AD juries, LeadAwards — proof that ~1k LinkedIn followers can coexist with global prestige.",
    culturePricingSignal: "Intimate 8-person team; hires via personality-rich job posts emphasizing shared ownership.",
    playbook: "Co-founded Flaneur Magazine (one street per issue) — editorial publishing practice attracts luxury/cultural briefs.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "andwalsh",
    name: "&Walsh",
    region: "Global",
    location: "New York",
    founded: "2019",
    size: "~36",
    linkedin: "~56k",
    founders: "Jessica Walsh",
    positioning: "Brand strategy, art direction & production led by an unmistakable maximalist point of view.",
    services: "Brand strategy, art direction, visual identity, campaign production, custom type.",
    clients: "Adobe, Levi's, Bombas, Lex, Olipop, Sesame Workshop, Snapchat",
    ratingSignal: "0.1% of women-owned creative agencies motif; talent pipeline feeds Pentagram, Porto Rocha, and Koto.",
    culturePricingSignal: "Publishes transparent US salary bands in job posts ($85k–120k Senior Producer); open critique culture where interns pitch alongside directors.",
    playbook: "Founder-as-distribution-engine + viral self-initiated launches (Type of Feeling, Let's Talk About Mental Health).",
    tags: ["Founder-Led"],
  },
  {
    slug: "snask",
    name: "Snask",
    region: "Global",
    location: "Stockholm",
    founded: "2007",
    size: "~8",
    linkedin: "~12k",
    founders: "Fredrik Öst & Erik Kockum",
    positioning: "'Make Enemies & Gain Fans' — anti-conservative branding, design, and live-action film.",
    services: "Brand strategy, identity, packaging, live-action film & stop-motion, keynote lectures.",
    clients: "Klarna, Spotify, Bang & Olufsen, H&M, Microsoft, Fortnox",
    ratingSignal: "5.0 Google rating + 4.8/5 FeaturedCustomers across 1,075+ reference ratings.",
    culturePricingSignal: "Published pricing psychology: anchor a high hourly value, negotiate on scope/hours rather than discounting the rate.",
    playbook: "Founder Fredrik Öst (~18.8k personal followers > studio page) lectures at Stanford, Google & SXSW; books, beer, and rock band.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "otherway",
    name: "Otherway",
    region: "Global",
    location: "London + New York",
    founded: "2013",
    size: "~50–55",
    linkedin: "~20k",
    founders: "Jono Holt",
    positioning: "Blurs branding studio and communications agency for consumer brand transformation.",
    services: "Brand strategy, identity, advertising campaigns, digital experiences, copywriting.",
    clients: "Strongbow, Fortnum & Mason, Monzo, Coinbase, Deliveroo Hop, StockX, Lucky Saint",
    ratingSignal: "4.9 Glassdoor rating + Sunday Times Best Places to Work 2025.",
    culturePricingSignal: "Tue–Thu studio / Mon & Fri remote, 25→28 holiday days, nursery benefit, paid 3-month Otherway Academy internship pipeline.",
    playbook: "Otherway Ventures (equity stakes in early-stage brands) + showing outdoor billboard work in real street context.",
    tags: ["Founder-Led"],
  },
  {
    slug: "okrm",
    name: "OK-RM",
    region: "Global",
    location: "London",
    founded: "2008",
    size: "2 founders + network",
    linkedin: "Minimal",
    founders: "Oliver Knight & Rory McGrath",
    positioning: "Collaborative practice operating at the intersection of art, architecture, and publishing.",
    services: "Books, visual identities, films, exhibitions, curatorial installations, art direction.",
    clients: "Guggenheim, 1017 ALYX 9SM, JW Anderson, Strelka Press, Venice Biennale",
    ratingSignal: "Zero review-platform footprint — institutional cultural cachet replaces commercial marketing.",
    culturePricingSignal: "Published book 'A Meaningful Order' (£50); runs InOtherWords imprint explicitly to 'own the economy of the work'.",
    playbook: "Long multi-year creative-direction partnerships + autonomous publishing house.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "darkroom",
    name: "darkroom.engineering",
    region: "Global",
    location: "US / Remote",
    founded: "2024",
    size: "~10",
    linkedin: "~1k",
    founders: "Clement Roche & Franco Arza (ex-Studio Freight)",
    positioning: "Design & engineering studio building performant, motion-rich digital experiences.",
    services: "Creative engineering, WebGL/motion, headless commerce, design systems, full-stack web.",
    clients: "High-growth tech, AI & design-forward consumer brands (Studio Freight lineage)",
    ratingSignal: "Studio Freight lineage published $80k minimum engagement floor ($250k+ comprehensive, $200–300/hr).",
    culturePricingSignal: "Published price floor acts as an instant lead-qualification filter and prestige signal.",
    playbook: "Open-source tools (Lenis smooth scroll, Tempus, Hamo, Satus) used by thousands of agencies — including PerPixel.",
    tags: ["Motion/Tech"],
  },
  {
    slug: "codesign",
    name: "Codesign",
    region: "India",
    location: "Gurugram",
    founded: "2006",
    size: "~20–30",
    linkedin: "High press",
    founders: "Rajesh Dahiya & Mohor Ray",
    positioning: "India's independent identity benchmark — culturally rooted, modern systems.",
    services: "Brand strategy, identity systems, environmental graphics, editorial & publication design.",
    clients: "PhonePe, Licious, Royal Enfield, Tata Motors, Bira 91, Serendipity Arts Festival",
    ratingSignal: "Multiple Kyoorius Blue/Black Elephants; founders serve on international design juries.",
    culturePricingSignal: "Operates at top Indian strategic tier (₹6L–25L+ identity systems).",
    playbook: "Dedicated 'Self-Initiated' tab in primary nav (Dekho conversations book) + design-education leadership.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "pleasesee",
    name: "Please See//",
    region: "India",
    location: "Mumbai",
    founded: "2010",
    size: "~50+",
    linkedin: "~58.6k",
    founders: "upendra & ketaki",
    positioning: "Brand transformation studio owning India's modern F&B, packaging, and D2C boom.",
    services: "Brand strategy, identity, packaging design, retail experience, digital & campaign.",
    clients: "Bombay Sweet Shop, Veronica's, O Pedro, Foo, Nykaa, Marico, Godrej",
    ratingSignal: "Largest LinkedIn following among Indian independent design studios (~58.6k).",
    culturePricingSignal: "High-volume consumer & hospitality identity retainers across Mumbai/India.",
    playbook: "Vertical dominance in F&B/hospitality — every cult Mumbai food launch becomes a live billboard for the next client.",
    tags: ["Founder-Led"],
  },
  {
    name: "Elephant Design",
    region: "India",
    location: "Pune + Singapore",
    founded: "1989",
    size: "~80",
    linkedin: "~35k+",
    founders: "Ashwini Deshpande, Partho Guha & Sudhir Sharma",
    positioning: "India's longest-running independent strategic design consultancy (Pentagram-partner model).",
    services: "Brand strategy, industrial/packaging design, retail environments, digital experience.",
    clients: "Paper Boat, Kurkure, Axis Bank, Symphony, Daimler, Bajaj, Britannia",
    ratingSignal: "35+ year institutional track record; co-founded Pune Design Festival.",
    culturePricingSignal: "Enterprise Indian & APAC retainers (₹10L–50L+ multi-stream transformations).",
    playbook: "Co-founders write industry columns and run India's premier regional design festival.",
    tags: ["Founder-Led"],
  },
  {
    name: "Thought Over Design",
    region: "India",
    location: "Mumbai",
    founded: "2014",
    size: "~27",
    linkedin: "~7k",
    founders: "Ankitaazada",
    positioning: "Strategy-first branding studio for new-age Indian consumer and wellness brands.",
    services: "Brand strategy, naming, visual identity, packaging, brand guidelines.",
    clients: "epigamia, Nykaa, Kapiva, The Whole Truth (collaborations), funded D2C startups",
    ratingSignal: "High D2C founder referral velocity; featured in The Brand Identity & Creative Boom.",
    culturePricingSignal: "Publishes an explicit 'What We DON'T Do' list (no performance marketing, no 3D stall fabrication, no event logistics).",
    playbook: "Radical scope honesty pre-qualifies leads + builds instant trust with funded founders.",
    tags: ["Founder-Led", "Editorial/Small Prestige"],
  },
  {
    slug: "sorted",
    name: "Studio Sorted",
    region: "India",
    location: "Bengaluru",
    founded: "2016",
    size: "~16",
    linkedin: "~5k",
    founders: "Netra & Nitin (Forbes 30 Under 30 Asia)",
    positioning: "Global-facing interdisciplinary brand, web, and culture studio out of Bangalore.",
    services: "Brand systems, interactive web, packaging, custom typography, spatial.",
    clients: "Stranger & Sons, Swiggy, Nike collaborations, Subko orbit, global tech startups",
    ratingSignal: "Forbes 30U30 + Kyoorius Red/Blue Elephant winner.",
    culturePricingSignal: "Explicitly positions as a 'global agency from India' to capture USD/EUR budgets on an Indian cost base.",
    playbook: "Spun out sister ventures (Sorted Type Foundry + architecture practice) to multiply studio surface area.",
    tags: ["Founder-Led", "Motion/Tech", "Editorial/Small Prestige"],
  },
  {
    name: "Itu Chaudhuri Design (ICD)",
    region: "India",
    location: "New Delhi",
    founded: "1996",
    size: "~10–15",
    linkedin: "Low-key",
    founders: "Itu Chaudhuri & Lisa Rath",
    positioning: "Editorial, typographic, and strategic authority — India's quiet OK-RM analog.",
    services: "Publication design, news/magazine redesigns, corporate & institutional identity, digital UI.",
    clients: "Business Standard, Mint, Ashoka University, Royal Enfield, Hero MotoCorp",
    ratingSignal: "30-year editorial reputation; zero growth-hack marketing required.",
    culturePricingSignal: "Selective high-trust advisory and identity engagements.",
    playbook: "Deep essays, long-form design criticism, and newspaper/publication redesigns that C-suites read daily.",
    tags: ["Editorial/Small Prestige"],
  },
  {
    slug: "eeksaurus",
    name: "Studio Eeksaurus",
    region: "India",
    location: "Mumbai",
    founded: "2009",
    size: "~35",
    linkedin: "~12k",
    founders: "Suresh Eriyat & Nilima Eriyat",
    positioning: "India's animation & motion storytelling powerhouse — 600+ films across 2D, 3D, and stop-motion.",
    services: "Brand films, title sequences, stop-motion, 2D/3D animation, IP development.",
    clients: "Google, Uber, Tanishq, Rotary, Amnesty, Annecy-selected original shorts",
    ratingSignal: "Annecy Cristal + National Film Award winners.",
    culturePricingSignal: "Original short films fund studio R&D and attract top commercial motion budgets.",
    playbook: "Festival-winning self-initiated animated shorts act as the ultimate technical and emotional showreel.",
    tags: ["Motion/Tech"],
  },
  {
    name: "Post Office Studios",
    region: "India",
    location: "Mumbai",
    founded: "2017",
    size: "~30–40",
    linkedin: "~10k",
    founders: "Aditya Tawde & Harshada Pathare",
    positioning: "Motion design, creative tech, AR/MR, and kinetic brand systems (1B+ views).",
    services: "Motion identity, 3D/VFX, projection mapping, AR filters, Sonic/kinetic branding.",
    clients: "Spotify India, Netflix, Prime Video, Coke Studio Bharat, Flipkart",
    ratingSignal: "1B+ organic campaign views across streaming and entertainment launches.",
    culturePricingSignal: "Retainer + project motion packages for streaming giants and tech platforms.",
    playbook: "High-impact motion reels and entertainment title packages shared widely by creative directors.",
    tags: ["Motion/Tech"],
  },
  {
    name: "Studio Eksaat",
    region: "India",
    location: "New Delhi",
    founded: "2010",
    size: "~8–12",
    linkedin: "Minimal",
    founders: "Founding partners",
    positioning: "15-year quiet strategy, identity, and packaging practice built on multi-year client retention.",
    services: "Brand architecture, visual identity, tactile print & packaging, space.",
    clients: "Boutique hospitality, craft consumer goods, cultural foundations",
    ratingSignal: "Pure word-of-mouth referrals over 15 years.",
    culturePricingSignal: "High repeat-client ratio; low overhead, senior-led execution.",
    playbook: "Proof that a small Indian studio can compound quietly through craft and founder referrals alone.",
    tags: ["Editorial/Small Prestige"],
  },
];

export type SiteCritique = {
  slug: string;
  name: string;
  region: "Global" | "India";
  url: string;
  verdict: string;
  good: string[];
  bad: string[];
  perpixelLesson: string;
};

export const SITE_CRITIQUES: SiteCritique[] = [
  {
    slug: "portorocha",
    name: "PORTO ROCHA",
    region: "Global",
    url: "https://portorocha.com",
    verdict: "Fixed index column + dark masonry stream mixing tier-1 work with studio news.",
    good: [
      "Persistent left column (wordmark, live clock, about text, full project index) means you are never disoriented.",
      "Masonry stream mixes major case studies with press/news tiles so the studio feels alive and culturally active.",
      "Immediate density of recognizable client work in the first screen without a slow intro gate.",
    ],
    bad: [
      "Fixed left column eats ~28% of desktop horizontal viewport permanently.",
      "Mixing minor news updates with flagship rebrands in one feed can dilute hierarchy for a first-time buyer.",
    ],
    perpixelLesson: "Steal the persistent orientation and project index clarity; keep PerPixel's cleaner hierarchy between flagship work and journal notes.",
  },
  {
    slug: "koto",
    name: "Koto",
    region: "Global",
    url: "https://koto.studio",
    verdict: "Warm editorial clarity with collapsing pill nav and best-in-class case study storytelling.",
    good: [
      "Navigation collapses cleanly into a compact central HOME pill on scroll — zero chrome clutter.",
      "Case studies read like strategic essays ('18-month project, 15 markets, 50+ sub-brands') rather than captionless image dumps.",
      "Multi-city studio switcher (LA, NYC, LDN, BER, SYD) with local cultural touchpoints builds global authority.",
    ],
    bad: [
      "Above-the-fold hero feels slightly generic before scrolling into the work.",
      "Cookie banner and floating widgets compete on initial load.",
    ],
    perpixelLesson: "Koto's Challenge → Strategy → Identity → Application → Outcome narrative template is the #1 pattern to adopt on every PerPixel project.",
  },
  {
    slug: "dumbar",
    name: "Studio Dumbar / DEPT",
    region: "Global",
    url: "https://studiodumbar.com",
    verdict: "Unapologetic full-bleed motion showreel showing identities running on real-world screens.",
    good: [
      "Zero throat-clearing: first viewport is their motion systems running live on Times Square and Dutch rail screens.",
      "Proof of scale is visceral — the work itself answers what the studio does in 2 seconds.",
      "Bold kinetic typography matches their positioning as the motion-branding benchmark.",
    ],
    bad: [
      "Heavy autoplay video payload can lag on slower connections.",
      "Almost zero explanatory copy on the landing view for buyers who don't already know the Dumbar name.",
    ],
    perpixelLesson: "Show work in real physical/digital use immediately, paired with PerPixel's concise editorial framing.",
  },
  {
    slug: "yukiko",
    name: "Studio Yukiko",
    region: "Global",
    url: "https://yukiko.de",
    verdict: "Playful editorial voice and custom display type undercut by mid-scroll lazy-load holes.",
    good: [
      "Distinctive custom typography and self-aware editorial voice feel human and un-templated.",
      "Strong cultural positioning bridging commercial giants (Nike, Apple) and independent publishing.",
    ],
    bad: [
      "Mid-scroll sections suffer from unreserved lazy-load containers, leaving giant blank white viewports while scrolling.",
      "Sparse metadata makes it hard for a prospective client to scan deliverables quickly.",
    ],
    perpixelLesson: "Validates PerPixel's strict rule: always reserve aspect ratios and container dimensions so scroll never reveals blank holes.",
  },
  {
    slug: "andwalsh",
    name: "&Walsh",
    region: "Global",
    url: "https://andwalsh.com",
    verdict: "High-drama film stills and maximalist craft in the first viewport, with nav legibility trade-offs.",
    good: [
      "Leads immediately with lush campaign photography and motion stills — unmistakable studio signature.",
      "Clear floating CTA and deep archive of self-initiated projects that prove creative range.",
    ],
    bad: [
      "Fixed top navigation overlays bright, shifting video frames without a scrim, hurting link legibility.",
      "Heavy visual density can overwhelm visitors looking for quick service/process clarity.",
    ],
    perpixelLesson: "When overlaying navigation on dark/light media bands, explicitly switch nav ink contrast (as PerPixel does with data-featured-visible).",
  },
  {
    slug: "snask",
    name: "Snask",
    region: "Global",
    url: "https://snask.com",
    verdict: "Fearless pink-and-serif contrarian personality that qualifies clients on attitude alone.",
    good: [
      "Copywriting has an unmistakable pulse ('Make Enemies & Gain Fans') — never reads like AI or corporate filler.",
      "Integrates films, books, lectures, and client work into a cohesive world.",
    ],
    bad: [
      "Centered manifesto copy over busy background video creates competing focal points.",
      "Polarizing theatrical tone wouldn't fit quieter luxury or enterprise SaaS buyers.",
    ],
    perpixelLesson: "Specific, opinionated copy converts better than safe agency adjectives — keep PerPixel's voice dry, precise, and confident.",
  },
  {
    slug: "otherway",
    name: "Otherway",
    region: "Global",
    url: "https://otherway.com",
    verdict: "Ownable pink ticket-stub device and outdoor work-in-situ, slowed by a dark opening screen.",
    good: [
      "The pink ticket card and mirrored wordmark are instantly recognizable brand devices.",
      "Scroll reveals billboards, bottles, and digital products photographed in real London/NY streets.",
      "Transparent careers & benefits page builds both employer and client trust.",
    ],
    bad: [
      "First viewport is near-black with a mirrored logo that looks like a rendering glitch before scrolling.",
      "Asymmetric gaps create pockets of dead space on wide monitors.",
    ],
    perpixelLesson: "Own one signature graphic device (PerPixel's BrandX + editorial pastel tiles), but never withhold the first viewport in darkness.",
  },
  {
    slug: "okrm",
    name: "OK-RM",
    region: "Global",
    url: "https://ok-rm.co.uk",
    verdict: "Extreme conceptual restraint — one serif sentence on black — that fails as a commercial surface.",
    good: [
      "Signals total artistic autonomy and gallery-world prestige for buyers already in their circle.",
      "Typography and pacing feel like a printed monograph.",
    ],
    bad: [
      "Literally one small serif sentence per viewport on black with no navigation, no work, and no contact path.",
      "Hostile to any prospective client trying to evaluate capabilities or start a conversation.",
    ],
    perpixelLesson: "Restraint must serve clarity, not hide the work. Never sacrifice navigation or proof for art-school theater.",
  },
  {
    slug: "darkroom",
    name: "darkroom.engineering",
    region: "Global",
    url: "https://darkroom.engineering",
    verdict: "Unforgettable red-lit pixel-art darkroom metaphor backed by elite creative engineering.",
    good: [
      "Commits 100% to a single visual metaphor (the photographic darkroom) with interactive blueprint diagrams.",
      "Open-source credibility (Lenis, Tempus) proves engineering depth before a single sales call.",
    ],
    bad: [
      "High-contrast red-on-black monochrome palette is fatiguing for long reading and narrow in appeal.",
      "Prioritizes studio aesthetic over traditional client outcome narratives.",
    ],
    perpixelLesson: "Shipping one open tool or technical artifact (like darkroom's Lenis) creates compounding inbound authority.",
  },
  {
    slug: "codesign",
    name: "Codesign",
    region: "India",
    url: "https://codesign.in",
    verdict: "Clean, credible Indian identity portfolio that elevates self-initiated research into the main nav.",
    good: [
      "Places 'Self-Initiated' right alongside 'Work' in primary navigation — signaling intellectual leadership.",
      "Case thumbnails show strong cultural and typographic craft across Indian consumer giants.",
    ],
    bad: [
      "Conventional portfolio grid and conservative transitions feel older than the work itself.",
      "Limited motion or interactive system demonstrations on the index page.",
    ],
    perpixelLesson: "Giving self-initiated studies first-class navigation status legitimizes non-client work immediately.",
  },
  {
    slug: "sorted",
    name: "Studio Sorted",
    region: "India",
    url: "https://studiosorted.com",
    verdict: "Vibrant lime-and-editorial energy positioning a 16-person Bangalore team as a global player.",
    good: [
      "Bold color blocking and rotating sticker badges create immediate youth-culture energy.",
      "Explicitly frames the studio as a global creative partner operating from India.",
    ],
    bad: [
      "Overlapping badges, marquee strips, and collage elements compete for eye tracking.",
      "Below-the-fold spacing shifts abruptly between dense collages and sparse dark bands.",
    ],
    perpixelLesson: "Positioning globally from India is a massive margin lever — PerPixel's calmer editorial discipline stands out against local maximalism.",
  },
  {
    slug: "eeksaurus",
    name: "Studio Eeksaurus",
    region: "India",
    url: "https://studioeeksaurus.com",
    verdict: "Cinematic stop-motion and animation frames that sell craft in a single glance.",
    good: [
      "Full-bleed film stills from 600+ productions carry immediate emotional and tactile weight.",
      "Lets world-class animation craft occupy 90% of the screen.",
    ],
    bad: [
      "Minimal service architecture or strategic framing for brand buyers outside film production.",
      "Carousel-only hero hides the breadth of their cultural and design work.",
    ],
    perpixelLesson: "High-craft motion frames in the hero establish instant authority when paired with clear strategic framing.",
  },
  {
    slug: "pleasesee",
    name: "Please See//",
    region: "India",
    url: "https://pleasesee.in",
    verdict: "Wall-to-wall brutalist yellow typography that shouts manifesto before showing packaging proof.",
    good: [
      "Unmistakable high-voltage yellow-and-black typographic confidence.",
      "Once you scroll past the manifesto, the F&B and packaging photography (Bombay Sweet Shop) is vibrant and tactile.",
    ],
    bad: [
      "Two full viewports of all-caps manifesto text delay seeing actual client work.",
      "Relentless visual volume leaves no quiet space for editorial reading.",
    ],
    perpixelLesson: "Pair oversized display type (PerPixel's signature) with immediate visual proof in the very first scroll.",
  },
];

export type DeliverablePricing = {
  id: string;
  label: string;
  summary: string;
  globalBands: { early: [number, number]; growth: [number, number]; enterprise: [number, number] };
  indiaBands: { early: [number, number]; growth: [number, number]; enterprise: [number, number] };
  timeline: string;
  included: string[];
  strategicNote: string;
};

export const DELIVERABLE_PRICING: DeliverablePricing[] = [
  {
    id: "landing",
    label: "One-Page Web / Launch Site",
    summary: "High-craft narrative landing page or single-product launch site with custom motion.",
    globalBands: { early: [1500, 5000], growth: [5000, 12000], enterprise: [12000, 25000] },
    indiaBands: { early: [15000, 45000], growth: [50000, 150000], enterprise: [150000, 350000] },
    timeline: "2–4 weeks",
    included: ["Narrative wireframing & copy polish", "Art-directed responsive layout", "Scroll & entrance motion system", "Production Next.js build & SEO setup"],
    strategicNote: "Market context only. Some Indian shops publish template pages around ₹9,999–₹25k. PerPixel's published starting price for a 10-day launch sprint is $4,500. Do not quote this research band as our fee.",
  },
  {
    id: "shop",
    label: "One-Page Shop / D2C Commerce",
    summary: "A tactile single-product or small D2C storefront. Sorso and Ghaslet are concept studies of this shape, not client stores.",
    globalBands: { early: [5000, 15000], growth: [20000, 50000], enterprise: [50000, 125000] },
    indiaBands: { early: [50000, 120000], growth: [120000, 300000], enterprise: [300000, 800000] },
    timeline: "4–8 weeks",
    included: ["Product storytelling & flavor/variant inspector", "Cart & checkout flow integration", "Mobile-first thumb-zone optimization", "Analytics & speed optimization"],
    strategicNote: "Indian F&B and D2C brands actively pay for standout packaging + web launches when tied to funding or retail expansion.",
  },
  {
    id: "identity",
    label: "Full Brand Identity System",
    summary: "Strategy, verbal & visual identity, typography, color tokens, and real-world applications.",
    globalBands: { early: [10000, 25000], growth: [25000, 75000], enterprise: [100000, 300000] },
    indiaBands: { early: [60000, 150000], growth: [150000, 600000], enterprise: [600000, 2500000] },
    timeline: "5–10 weeks",
    included: ["Positioning & one-line organizing idea", "Wordmark, symbol & typographic system", "Motion principles & palette specification", "Living brand book & application templates"],
    strategicNote: "Clutch's 2026 branding guide is market context: most reviewed projects fall around $10k–$50k. Our published Brand & Web System starts at $15,000. A 50/50 split is a common market habit, not our contract.",
  },
  {
    id: "saas",
    label: "Full SaaS Marketing Website",
    summary: "Multi-page category-defining site for seed to Series B+ software and AI companies.",
    globalBands: { early: [8000, 20000], growth: [20000, 60000], enterprise: [60000, 150000] },
    indiaBands: { early: [100000, 250000], growth: [250000, 600000], enterprise: [600000, 1800000] },
    timeline: "6–12 weeks",
    included: ["Homepage + product, pricing, docs & customer stories", "Interactive product component demos", "Design system tokens & CMS integration", "Performance & Core Web Vitals engineering"],
    strategicNote: "Market context for larger sites. Our published floors are in US dollars on the public offers page. Do not invent a second rate card from this band.",
  },
  {
    id: "redesign",
    label: "Website Rewrite / Motion & Editorial Upgrade",
    summary: "Keep what works, strip template bloat, and rebuild typography, hierarchy, and scroll physics.",
    globalBands: { early: [3000, 10000], growth: [12000, 40000], enterprise: [40000, 100000] },
    indiaBands: { early: [25000, 80000], growth: [80000, 250000], enterprise: [250000, 700000] },
    timeline: "3–6 weeks",
    included: ["UX, typography & performance audit", "Editorial redesign of core conversion pages", "Restrained physical motion & page transitions", "Clean Next.js / Tailwind architecture"],
    strategicNote: "Easiest foot-in-the-door offer for companies whose product outgrew their seed-stage template site.",
  },
  {
    id: "optimization",
    label: "UX / Conversion & Speed Sprint",
    summary: "Focused diagnostic + high-leverage fixes on onboarding, mobile layout, and perceived speed.",
    globalBands: { early: [1500, 4000], growth: [3500, 8500], enterprise: [8500, 20000] },
    indiaBands: { early: [15000, 40000], growth: [40000, 100000], enterprise: [100000, 250000] },
    timeline: "1–2 weeks",
    included: ["Teardown of top 5 drop-off screens", "Before/after redesigned high-impact flows", "LCP, CLS & motion jank elimination", "30-day post-ship conversion review"],
    strategicNote: "Market context for a short diagnostic. Our named entry offer is the 10-Day Launch Sprint from $4,500, which is a positioning line, a wordmark, and a short site. Do not describe this research sprint as that offer.",
  },
];

export const CASE_STUDY_ANATOMY = [
  {
    step: "01",
    name: "Header & Thesis",
    job: "Hook the buyer in 3 seconds with the client name, industry, year, and the ONE-LINE strategic idea.",
    kotoExample: "Uniqode · Fintech · 2025 — 'From IRL to URL and back again.'",
    perpixelApplication: "Moove · Architectural Furniture · 2026 — 'Material tolerance expressed as a digital specification system.'",
    video: "/works/offset/assets/videos/raw_12-aurora-glass.mp4",
  },
  {
    step: "02",
    name: "The Challenge",
    job: "State the market shift, competitive noise, and business friction in the client's own words.",
    kotoExample: "QR codes went from niche to everywhere, creating copycat chaos; former Beaconstac needed enterprise trust.",
    perpixelApplication: "Furniture sites flatten tactile aluminum/mineral finishes into static JPEGs; architects need verifiable radii, tolerances, and finish codes.",
    video: "/works/dune/assets/videos/dunes_golden.webm",
  },
  {
    step: "03",
    name: "The Strategy",
    job: "Define the single organizing principle that governs naming, type, color, and interaction.",
    kotoExample: "Position Uniqode as the bridge turning scattered physical signals into one connected digital canvas.",
    perpixelApplication: "Treat the website as an architectural specification ledger rather than a lifestyle lookbook.",
    video: "/works/offset/assets/videos/raw_07-liquid.mp4",
  },
  {
    step: "04",
    name: "The Identity System",
    job: "Show the rules: custom type, code taxonomy, color tokens, and geometry.",
    kotoExample: "Uniqode Sans custom typeface + pixel stitch nodes connecting physical and digital surfaces.",
    perpixelApplication: "Finish codes (RC-04, RT-02, SC-07, BP-09), R 640 mm compass-crease geometry, and mineral hex swatches.",
    video: "/works/offset/assets/videos/clip_3d.mp4",
  },
  {
    step: "05",
    name: "Real-World Application",
    job: "Prove the system works under stress across dashboards, packaging, decks, and live interfaces — never sterile mockups.",
    kotoExample: "Analytics dashboards, chef uniforms, mobile QR scans, real-estate digital contact cards.",
    perpixelApplication: "Interactive finish inspector, 290svh shell assembly sequence, and live copyable architectural dossier generator.",
    video: "/works/offset/assets/videos/raw_22-hud.mp4",
  },
  {
    step: "06",
    name: "The Outcome",
    job: "Close with what changed. If you do not have a number, do not invent one.",
    kotoExample: "Gave Uniqode the definition and confidence to lead a crowded enterprise category.",
    perpixelApplication: "Moove is concept work: say what the prototype demonstrates, not a business result. PixieKat is the live client store. We have no usage metrics and no testimonials.",
    video: "/works/dune/assets/videos/sand_dunes_aerial.webm",
  },
] as const;

export const ACQUISITION_CHANNELS = [
  { name: "Referrals & Word of Mouth", share: 34.2, closeRate: "32–45%", leadTime: "30 days (with active ask system)", note: "86.1% of studios rely on it as #1. Past clients, founder peers, and dev-shop partners." },
  { name: "Organic Search & SEO", share: 20.55, closeRate: "18–22%", leadTime: "5–12 months to compound", note: "Only 24% of branding studios invest here — huge opening for niche vertical queries." },
  { name: "Competitive pitches and RFPs", share: 7.03, closeRate: "15–25%", leadTime: "1–3 months", note: "Survey figure. PerPixel opens a public RFP only after checking eligibility. Many are limited to the US or North America." },
  { name: "Previous Relationships", share: 6.04, closeRate: "40–50%", leadTime: "Immediate when triggered", note: "A marketing lead or founder changes companies and hires you at the new org." },
  { name: "Directories (Clutch, DesignRush)", share: 5.78, closeRate: "15–20%", leadTime: "1–2 months", note: "High-intent mid-market buyers actively comparing verified studio profiles." },
  { name: "Personal Founder Network", share: 2.68, closeRate: "35–45%", leadTime: "Immediate", note: "Proximity wins first 5 clients: solo founders, local businesses, friends-of-friends." },
  { name: "Targeted cold email", share: 2.38, closeRate: "18–25% (specific) / 4–9% (generic)", leadTime: "Survey timing, not ours", note: "Survey ranges only. A specific note beats a generic blast. These are not PerPixel's results. We send email and do not book calls." },
  { name: "Social Media (LinkedIn / IG)", share: 1.78, closeRate: "22–28% (founder-led)", leadTime: "3–9 months", note: "Rarely closes alone — acts as top-of-funnel awareness and credibility check." },
  { name: "Events, Juries & Speaking", share: 1.11, closeRate: "25–35%", leadTime: "3–6 months", note: "Speak in buyer rooms (startup demo days, F&B summits), not just designer meetups." },
] as const;

export const PIPELINE_STAGES = [
  {
    stage: "01",
    name: "Intake",
    duration: "< 24 hours",
    conversion: "Survey: 20–30% move on",
    exitCriterion: "A typical studio logs the lead and sends a human reply the same day.",
    ownerAction: "Many studios send a calendar link here. PerPixel does not ask for or offer a call. Reply in the same email or chat.",
  },
  {
    stage: "02",
    name: "Qualification",
    duration: "< 3 days",
    conversion: "Survey: 40–50% advance",
    exitCriterion: "Studios in the survey check fit, who decides, how urgent the problem is, and whether a budget exists.",
    ownerAction: "Our published floors are on the offers page. Share them in writing if budget comes up. Do not invent a second price list.",
  },
  {
    stage: "03",
    name: "Discovery",
    duration: "1–2 weeks",
    conversion: "Survey: 60–70% reach a pitch",
    exitCriterion: "The problem is written down in the prospect's words.",
    ownerAction: "Other studios do this on a call. We stay in email or chat and ask one clear question at a time.",
  },
  {
    stage: "04",
    name: "Pitch",
    duration: "1 week",
    conversion: "Survey: 30–40% reach negotiation",
    exitCriterion: "The note names one problem, what we would do, how long it takes, and one next step.",
    ownerAction: "Keep it short enough to answer by reply. Sign Hritik Jaiswal, Project lead / The PerPixel team.",
  },
  {
    stage: "05",
    name: "Scope",
    duration: "1–2 weeks",
    conversion: "Survey: 70–80% of this stage close",
    exitCriterion: "Scope, revisions, and payment are agreed in writing.",
    ownerAction: "If the budget is tight, narrow the scope. Do not quietly cut the published floor.",
  },
  {
    stage: "06",
    name: "Close",
    duration: "1 week",
    conversion: "Survey: 15–25% of qualified leads",
    exitCriterion: "A contract is signed and the work can start. We have not reached this stage yet.",
    ownerAction: "Do not plan a referral ask until a project exists. Zero projects are won as of 27 Nov 2026.",
  },
] as const;

export const PUBLISHED_FLOORS =
  "Published starting prices, on the public site: 10-Day Launch Sprint from $4,500 (10 working days), Brand & Web System from $15,000 (6–10 weeks), and Motion & Editorial retainer from $2,500/month with a three-month minimum.";

export const HOW_TO_USE = [
  {
    n: "01",
    title: "Sending a pitch",
    body: "Read what we are doing, then the pitch rules. One problem, what we would do, how long it takes, and one next step they can take by replying. Do not ask for a call.",
  },
  {
    n: "02",
    title: "Logging a lead",
    body: "Find the lead, write the note, send it, then log the lead and its status in the Google Sheet lead tracker. Check Gmail Spam. Replies often land there.",
  },
  {
    n: "03",
    title: "Reading the research",
    body: "The studio studies, site notes, price bands, and channel shares are October 2026 research. They are not our results and they are not our rate card.",
  },
  {
    n: "04",
    title: "Quoting a price",
    body: PUBLISHED_FLOORS,
  },
  {
    n: "05",
    title: "Choosing the next action",
    body: "Use What's next. The gap is turning conversations into paid work. The lever is proof: a Figma showcase file and honest case studies.",
  },
] as const;

export const TEAM = [
  { name: "Hritik Jaiswal", role: "Project lead" },
  { name: "Rishabh", role: "Strategy, content, and marketing" },
  { name: "Rishi", role: "Graphics and front-end" },
  { name: "Akansha", role: "Development" },
] as const;

export const OPERATING_CHANNELS = [
  {
    num: "01",
    name: "Cold email",
    status: "Running",
    summary:
      "Sent in batches of 100, with 300 planned in total. About 183 had gone out by 27 Nov 2026. Mail is sent from create@perpixel.agency, up to 60 on a weekday run. Every lead and status goes into the Google Sheet lead tracker.",
  },
  {
    num: "02",
    name: "Partner referrals",
    status: "Most replies",
    summary:
      "Outreach to Shopify, Webflow, and development shops, and to PR firms. The deal is two-way: we design in Figma and they build. Each side keeps its own contract and billing. Commission is optional, or a flat percentage, and it runs both ways. Replies so far include Bristm, Ceptrix, City Road Communications, and Vayuverse.",
  },
  {
    num: "03",
    name: "Direct brand pitches",
    status: "Running",
    summary:
      "D2C and Shopify brands. Each note carries one specific idea for that brand, not a general list of services.",
  },
  {
    num: "04",
    name: "Freelance platforms",
    status: "Daily",
    summary:
      "Upwork. Keep a shortlist each day. Open the listing again before applying, and skip it if it is no longer live.",
  },
  {
    num: "05",
    name: "Public RFPs and tenders",
    status: "Only if eligible",
    summary:
      "Apply only when we are allowed to. Many are limited to the US or North America. Check eligibility before spending time on the response.",
  },
] as const;

export const PITCH_RULES = [
  "Write it like a collaboration invite: simple, friendly, and in plain words.",
  "Name one clear problem, what we would do, how long it takes, and one easy next step they can take by replying.",
  "Use a casual tone for relaxed founders. Use a more polished tone for senior or formal leaders.",
  "Never ask for a call. Never offer a call. Stay in chat or email.",
  "Sign every note: Hritik Jaiswal, Project lead / The PerPixel team.",
] as const;

export const OPERATING_PROCESS = [
  { step: "01", name: "Find", detail: "Pick the lead from the channel you are working: a batch, a partner, a brand, Upwork, or an eligible tender." },
  { step: "02", name: "Write", detail: "One problem, what we would do, how long it takes, and one reply step. Match the tone to the reader." },
  { step: "03", name: "Send", detail: "Cold email goes from create@perpixel.agency. Keep a weekday run to 60 or fewer." },
  { step: "04", name: "Log", detail: "Write the lead and its status in the Google Sheet lead tracker before moving on." },
  { step: "05", name: "Check", detail: "Look for bounces and replies. Check Gmail Spam. Replies often land there." },
  { step: "06", name: "Hand over", detail: "Once a person replies, the team takes the conversation personally. If a partner asks for proof, send PixieKat and a Figma showcase file." },
] as const;

export const OPERATING_RESULTS = [
  { figure: "~224", label: "Leads in the tracker" },
  { figure: "~12", label: "Human replies" },
  { figure: "5", label: "Active conversations" },
  { figure: "0", label: "Projects won" },
] as const;

export const CASE_STUDY_BLUEPRINTS = [
  {
    tag: "LIVE CLIENT WORK",
    title: "PixieKat, a gaming top-up store",
    label: "Designed and built for a client",
    href: "/projects/pixiekat",
    linkLabel: "Open the PixieKat case study",
    image: "/projects/pixiekat/cover.webp",
    video: "",
    problem: "A client needed a gaming top-up store designed and built, not a concept frame.",
    strategy: "Branding and the store were done together: identity, the shop, and the build.",
    deliverables: "The store is live at pixiekat.store. We do not have usage numbers or a testimonial.",
    whyItSells: "This is the live proof we can send. Partners who ask for work get PixieKat plus a Figma showcase file.",
  },
  {
    tag: "BUILT, NOW OFFLINE",
    title: "Two Shopify themes",
    label: "The business closed",
    href: "",
    linkLabel: "",
    image: "",
    video: "",
    mediaNote: "No public page. Both themes are offline because that business closed.",
    problem: "We built two Shopify themes for a client. That business later closed.",
    strategy: "Say that plainly. Do not link to a store that is no longer online, and do not imply it is still trading.",
    deliverables: "Two themes. No live URL. No testimonial.",
    whyItSells: "It is real shipped work. It is not a live case study and it is not a quote from a client.",
  },
  {
    tag: "CONCEPT WORK",
    title: "The rest of the portfolio",
    label: "Label every piece as concept work",
    href: "/projects",
    linkLabel: "Open the project index",
    secondaryHref: "/projects/moove",
    secondaryLabel: "Open Moove",
    image: "/works/ghaslet/assets/bottle-trio.jpg",
    video: "/works/offset/assets/videos/raw_07-liquid.mp4",
    problem: "Moove, Sorso, Ghaslet, Dune, and the other studies on the site are concept work.",
    strategy: "Keep the concept label on them. They show craft. They are not client results.",
    deliverables: "Case-study pages and concept sites already on perpixel.agency.",
    whyItSells: "Useful next to PixieKat when someone wants to see range. Not a substitute for a testimonial. We do not have one yet.",
  },
  {
    tag: "STILL TO MAKE",
    title: "A showcase file and honest case studies",
    label: "The proof in front of open conversations",
    href: "/projects/pixiekat",
    linkLabel: "Start from the PixieKat case study",
    image: "/projects/pixiekat/hero.webp",
    video: "",
    problem: "About 12 people have replied and 5 conversations are active. None is paid work yet, and we have no testimonials.",
    strategy: "Put a Figma showcase file and written case studies in front of those conversations. Keep the facts straight.",
    deliverables: "PixieKat as the live store. The two Shopify themes as offline work. Everything else marked concept work.",
    whyItSells: "This is the gap. More sending will not fix a conversation that stalls on proof.",
  },
] as const;

export const NEXT_PLAN_PHASES = [
  {
    id: "next",
    badge: "WHAT'S NEXT",
    title: "The short list",
    objective:
      "As of 27 Nov 2026. The October 30/60/90 plan is retired. It asked for sales calls, Loom videos, a fixed 10% referral fee, directory sign-ups, and two discounted projects. That is not the work we are running.",
    kpi: "5 open conversations. 0 won. Keep costs low. Proof is the lever.",
    tasks: [
      {
        id: "n1",
        title: "Finish the cold-email plan without raising the pace",
        detail:
          "300 notes planned, about 183 sent by 27 Nov 2026, in batches of 100, no more than 60 on a weekday, from create@perpixel.agency. Log every lead and status in the Google Sheet.",
      },
      {
        id: "n2",
        title: "Check Gmail Spam on every reply pass",
        detail:
          "Replies often land in Spam. When a person replies, the team takes that conversation over personally. Do not hand it back to a template.",
      },
      {
        id: "n3",
        title: "Stay with the partner threads",
        detail:
          "This is the segment writing back. Names already in those replies include Bristm, Ceptrix, City Road Communications, and Vayuverse. We design in Figma, they build, and each side keeps its own contract and billing. Commission is optional, or a flat percentage both ways.",
      },
      {
        id: "n4",
        title: "Put proof in front of the five conversations",
        detail:
          "Send PixieKat (pixiekat.store) and a Figma showcase file. Write case studies that stay honest: one live client store, two Shopify themes that are offline because that business closed, and concept work labelled as concept work. Do not add testimonials we do not have.",
      },
      {
        id: "n5",
        title: "Pitch D2C and Shopify brands with one concrete idea",
        detail: "One problem for that brand, what we would do, how long it takes, and a next step they can take by reply.",
      },
      {
        id: "n6",
        title: "Keep the Upwork shortlist daily",
        detail: "Open the listing again before applying. If it is gone, skip it.",
      },
      {
        id: "n7",
        title: "Open a public RFP only after eligibility is checked",
        detail: "Many are limited to the US or North America. If we are not eligible, do not write the response.",
      },
      {
        id: "n8",
        title: "Spend the next effort on conversations, not on more tools",
        detail: "Five conversations are active and none is paid work. Keep usage and sending costs low.",
      },
    ],
  },
] as const;
