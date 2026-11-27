/**
 * The growth playbook is internal.
 * `next dev` can render it. Production builds, including Vercel preview
 * and production, take the not-found path so the dossier is not a public route.
 */
export function isInternalPlaybookServed(nodeEnv: string | undefined = process.env.NODE_ENV): boolean {
  return nodeEnv === "development";
}
