import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
