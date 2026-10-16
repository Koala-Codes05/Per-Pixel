import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import PageTransition from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INTRO_BOOTSTRAP } from "@/lib/intro";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "PerPixel — Branding, Design, Editorial, Motion",
    template: "%s — PerPixel",
  },
  description:
    "PerPixel is a digital and brand design studio. We build design on clarity, speed, and care.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-paper text-ink">
        <Script id="pp-intro-bootstrap" strategy="beforeInteractive">
          {INTRO_BOOTSTRAP}
        </Script>
        <SmoothScroll />
        <Preloader />
        <PageTransition />
        <Navbar />
        {children}
        <Footer />
        <div className="viewport-blur" aria-hidden="true">
          <div className="backdrop-blur-[0.5px]" />
          <div className="backdrop-blur-[1px]" />
          <div className="backdrop-blur-[1.5px]" />
          <div className="backdrop-blur-[2px]" />
          <div className="backdrop-blur-[3px]" />
          <div className="backdrop-blur-xs" />
        </div>
      </body>
    </html>
  );
}
