"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import ScrollReset from "./ScrollReset";
import Cursor from "./Cursor";
import Intro from "./Intro";
import Sidebar from "./Sidebar";
import Resizer from "./Resizer";
import Footer from "./Footer";
import Buddy from "./Buddy";
import MediaReady from "./MediaReady";

// Persistent app shell. The sidebar, footer, cursor and preloader stay mounted
// across client-side route changes — only the page content ({children}) swaps.
// Case-study routes ("/work/*") run full-bleed with their own TOC rail, so the
// persona sidebar + resizer are hidden there.
export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const caseStudy = pathname?.startsWith("/work/") ?? false;

  return (
    <MotionConfig reducedMotion="user">
      <MediaReady />
      <Cursor />
      <Intro />
      <SmoothScroll>
        <ScrollReset />
        <div className="layout" id="top">
          <div className={`layout__body${caseStudy ? " layout__body--bare" : ""}`}>
            {!caseStudy && <Sidebar />}
            <main className="main">{children}</main>
            {!caseStudy && <Resizer />}
          </div>
          <Footer />
        </div>
        <Buddy />
      </SmoothScroll>
    </MotionConfig>
  );
}
