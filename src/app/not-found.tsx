import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-350 px-5 pt-40 pb-32 md:px-8" suppressHydrationWarning>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">
          404 — Not found
        </p>
        <h1 className="mt-4 max-w-[14ch] font-sans text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
          This page folded under a single curve.
        </h1>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-ink/70">
          The page you are looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex min-h-11 items-center gap-2 border-b border-ink pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ease-out-expo hover:text-ink/60"
        >
          Back to PerPixel
        </Link>
      </main>
      <Footer />
    </>
  );
}
