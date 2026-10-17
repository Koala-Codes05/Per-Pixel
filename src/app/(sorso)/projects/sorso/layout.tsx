import { Bodoni_Moda } from "next/font/google";
import SorsoNavbar from "@/components/projects/SorsoNavbar";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
});

export default function SorsoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`sorso-page ${bodoni.variable}`} suppressHydrationWarning>
      <SorsoNavbar />
      {children}
    </div>
  );
}
