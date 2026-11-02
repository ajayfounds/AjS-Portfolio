import type { Metadata } from "next";
import { Inter, Ruwudu } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/lib/data";
import Shell from "@/components/Shell";
import "./globals.css";

// Clash Grotesk (Indian Type Foundry, via Fontshare) — carries the small
// uppercase labels/eyebrows/tags across the portfolio.
const clash = localFont({
  src: [
    { path: "./fonts/ClashGrotesk-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/ClashGrotesk-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/ClashGrotesk-Semibold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/ClashGrotesk-Bold.woff2", weight: "700", style: "normal" }
  ],
  variable: "--font-clash",
  display: "swap"
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

// real italic for <em> (no synthesized slant); one weight is all emphasis needs
const interItalic = Inter({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-inter-italic",
  display: "swap"
});

// Ruwudu — used for the intro wordmark + Explore/Skip Intro buttons
// (matches the Figma reference: 24px regular, 140% line-height, 0% tracking, #F4F8FF)
const ruwudu = Ruwudu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ruwudu",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.statement,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.statement,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interItalic.variable} ${clash.variable} ${ruwudu.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
