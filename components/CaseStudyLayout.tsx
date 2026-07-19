"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export type Toc = { id: string; num: string; label: string };

// Sticky table-of-contents rail + scrollspy, wrapping the case-study body.
export default function CaseStudyLayout({
  toc,
  accent,
  children
}: {
  toc: Toc[];
  accent: string;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    const secs = toc
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-18% 0px -72% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [toc]);

  return (
    <div className="cs" id="cs-top" style={{ "--cs-accent": accent } as React.CSSProperties}>
      <aside className="cs__rail">
        <div className="cs__rail-inner">
          <Link href="/" className="cs__home" data-link>
            <span aria-hidden>←</span> Home
          </Link>
          <p className="cs__toc-head">Table of Contents</p>
          <nav className="cs__toc">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={`cs__toc-link${active === t.id ? " is-active" : ""}`}
              >
                <span className="cs__toc-num">{t.num}</span>
                <span className="cs__toc-label">{t.label}</span>
              </a>
            ))}
          </nav>
          <a href="#cs-top" className="cs__backtop">
            <span aria-hidden>↑</span> Back to top
          </a>
        </div>
      </aside>
      <div className="cs__body">{children}</div>
    </div>
  );
}
