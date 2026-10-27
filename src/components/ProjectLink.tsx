import Link from "next/link";
import type { ComponentProps } from "react";

/** Standalone works under /works/* are static HTML builds, not app routes. */
export function isStaticWork(href: string) {
  return href.startsWith("/works/");
}

/** Link for project destinations: router navigation for app routes, a plain document load for static works. */
export default function ProjectLink({ href, ...props }: ComponentProps<"a"> & { href: string }) {
  return isStaticWork(href) ? <a href={href} {...props} /> : <Link href={href} {...props} />;
}
