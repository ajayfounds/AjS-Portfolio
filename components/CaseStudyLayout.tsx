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
  // the image currently opened full-screen, and whether it's fitted or 1:1
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  const [actualSize, setActualSize] = useState(false);

  // Tap any case-study image to open it full-screen. The plates in particular
  // carry small callout text that can't be read at phone width, and this keeps
  // reading them optional instead of forcing the page to scroll sideways.
  useEffect(() => {
    const body = document.querySelector<HTMLElement>(".cs__body");
    if (!body) return;
    const onClick = (e: MouseEvent) => {
      const img = (e.target as HTMLElement).closest<HTMLImageElement>(
        ".cs-plate img, .cs-shot img, .cs-full__frame img, .cs-wide img"
      );
      if (!img) return;
      e.preventDefault();
      setActualSize(false);
      setZoom({ src: img.currentSrc || img.src, alt: img.alt });
    };
    body.addEventListener("click", onClick);
    return () => body.removeEventListener("click", onClick);
  }, []);

  // while open: escape closes it, and the page behind shouldn't scroll
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

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
          <Link href="/" className="cs__home" aria-label="Back to home">
            <span className="cs__home-arrow" aria-hidden>←</span>
            <span className="cs__home-label">Home</span>
          </Link>
          <div className="cs__toc-box">
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
          </div>
          <a href="#cs-top" className="cs__backtop">
            <span aria-hidden>↑</span> Back to top
          </a>
        </div>
      </aside>
      <div className="cs__body">{children}</div>

      {zoom && (
        <div
          className="cs-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt || "Enlarged image"}
          onClick={() => setZoom(null)}
        >
          <button className="cs-zoom__close" onClick={() => setZoom(null)} aria-label="Close">
            ✕
          </button>
          <img
            className={actualSize ? "is-actual" : "is-fit"}
            src={zoom.src}
            alt={zoom.alt}
            onClick={(e) => {
              e.stopPropagation();
              setActualSize((v) => !v);
            }}
          />
          <p className="cs-zoom__hint">
            {actualSize ? "Tap the image to fit · drag to pan" : "Tap the image to zoom in"}
          </p>
        </div>
      )}
    </div>
  );
}
