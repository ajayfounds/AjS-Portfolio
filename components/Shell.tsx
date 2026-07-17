"use client";

import SmoothScroll from "./SmoothScroll";
import ScrollReset from "./ScrollReset";
import Cursor from "./Cursor";
import Intro from "./Intro";
import Sidebar from "./Sidebar";
import Resizer from "./Resizer";
import Footer from "./Footer";
import Buddy from "./Buddy";

// Persistent app shell. The sidebar, footer, cursor and preloader stay mounted
// across client-side route changes — only the page content ({children}) swaps.
export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Cursor />
      <Intro />
      <SmoothScroll>
        <ScrollReset />
        <div className="layout" id="top">
          <div className="layout__body">
            <Sidebar />
            <main className="main">{children}</main>
            <Resizer />
          </div>
          <Footer />
        </div>
        <Buddy />
      </SmoothScroll>
    </>
  );
}
