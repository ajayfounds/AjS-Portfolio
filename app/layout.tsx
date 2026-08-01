import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Playfair_Display, Open_Sans } from "next/font/google";
import { site } from "@/lib/data";
import Shell from "@/components/Shell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap"
});

// meganyap's serif display face — used light (300) for elegant italic/display moments
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  // 600/700 carry the small uppercase labels that used to be monospace
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

// Small uppercase labels now run in the serif, so the mono face is no longer
// referenced anywhere — kept out of the bundle rather than downloaded unused.

// royal display face — kept for the visitor-card brand chip
const royal = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-royal",
  display: "swap"
});

// the "HAZEL Verse" wordmark — clean bold Open Sans
const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-opensans",
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
    <html lang="en" className={`${inter.variable} ${serif.variable} ${royal.variable} ${opensans.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
