import type { MetadataRoute } from "next";

/** Direct-URL page. Crawlers are asked not to fetch it. The route itself stays reachable. */
export const PLAYBOOK_PATH = "/playbook";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: PLAYBOOK_PATH,
    },
  };
}
