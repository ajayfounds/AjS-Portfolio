import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Source_Code_Pro, Playfair_Display } from "next/font/google";
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
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

// meganyap's mono face — used for all uppercase labels, eyebrows, indices, metadata
const mono = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

// royal display face — the "HAZEL Verse" wordmark (bold italic)
const royal = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-royal",
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
    <html lang="en" className={`${inter.variable} ${serif.variable} ${mono.variable} ${royal.variable}`}>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
