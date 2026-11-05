"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { projects, site } from "@/lib/data";
import { CASE_HEROES, warm } from "@/lib/media";

// Card loops start downloading on first paint (they sit under the intro), with the
// box sized from the file's real dimensions so nothing jumps when it arrives.
function CardVideo({ src, label }: { src: string; label: string }) {
  return (
    <video
      src={src}
      width={1440}
      height={1080}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-label={label}
    />
  );
}

// Row unit for the masonry maths — small enough that a card's span rounds to
// within a few pixels of its real height.
const ROW = 4;

export default function Work() {
  const gridRef = useRef<HTMLUListElement>(null);

  // Masonry: each column packs independently instead of every card in a row
  // being forced to the tallest one's height. Cards keep their natural height
  // and a card expanding on hover only pushes the cards below it in its own
  // column — which is how the reference grid behaves.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const singleColumn = () =>
      getComputedStyle(grid).gridTemplateColumns.split(" ").length < 2;

    const layout = () => {
      const cards = Array.from(grid.children) as HTMLElement[];
      // one column (mobile) → let normal flow handle it
      if (singleColumn()) {
        cards.forEach((c) => (c.style.gridRowEnd = ""));
        return;
      }
      for (const card of cards) {
        const cs = getComputedStyle(card);
        const outer =
          card.getBoundingClientRect().height +
          (parseFloat(cs.marginTop) || 0) +
          (parseFloat(cs.marginBottom) || 0);
        card.style.gridRowEnd = `span ${Math.max(1, Math.ceil(outer / ROW))}`;
      }
    };

    layout();

    // cards change height when hovered (the meta panel expands) and when images
    // finish loading, so track both rather than measuring once
    const ro = new ResizeObserver(layout);
    Array.from(grid.children).forEach((c) => ro.observe(c));
    ro.observe(grid);
    window.addEventListener("resize", layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
    };
  }, []);

  // pill follows the cursor while hovering a card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 400, damping: 32, mass: 0.5 });
  const py = useSpring(y, { stiffness: 400, damping: 32, mass: 0.5 });

  const onMove = (e: React.MouseEvent) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const enter = () => document.body.classList.add("pill-cursor");
  const leave = () => document.body.classList.remove("pill-cursor");

  return (
    <section className="work" id="work" onMouseMove={onMove}>
      {/* sticky rail: the Resume button rides along while the work scrolls */}
      <div className="work__resume-rail">
        <a className="work__resume" href={site.resume} target="_blank" rel="noopener noreferrer">
          Resume
          <span className="work__resume-go" aria-hidden>
            <svg viewBox="0 0 24 24"><path d="M8 16 16 8M9.5 8H16v6.5" /></svg>
          </span>
        </a>
      </div>
      <Reveal className="section-head section-head--with-aside">
        <h2 className="section-head__title">My Work</h2>
      </Reveal>

      <ul className="work__grid" ref={gridRef}>
        {projects.filter((p) => !p.hidden).map((p, i) => {
          // locked projects (still in progress) render as a plain, non-clickable card
          const Tag = (p.locked ? "div" : "a") as "div" | "a";
          const linkProps = p.locked
            ? {}
            : {
                href: p.caseHref ?? p.href,
                target: p.caseHref ? undefined : "_blank",
                rel: p.caseHref ? undefined : "noopener noreferrer",
                onMouseEnter: () => { enter(); warm(p.caseHref && CASE_HEROES[p.caseHref], "high"); },
                onFocus: () => warm(p.caseHref && CASE_HEROES[p.caseHref], "high"),
                onTouchStart: () => warm(p.caseHref && CASE_HEROES[p.caseHref], "high"),
                onMouseLeave: leave,
                "data-project": true
              };
          return (
          // plain <li> is the grid cell — Work's masonry writes grid-row on it.
          // The card itself is a motion element, and framer-motion owns that
          // node's style attribute, so a span set there gets wiped on re-render.
          <li className="card-cell" key={p.num}>
          <Reveal className={`card${p.locked ? " is-locked" : ""}${p.live ? " is-live" : ""}`} delay={(i % 2) * 0.06}>
            <Tag className="card__link" {...(linkProps as Record<string, unknown>)}>
              <div className="card__head">
                {p.live ? (
                  <span className="card__live-tag"><i aria-hidden />Live prototype</span>
                ) : (
                  <span className="card__dot" aria-hidden />
                )}
                {p.locked && <span className="card__locked">In progress</span>}
              </div>

              <div className="card__media">
                {/\.(mp4|webm|mov)$/i.test(p.img) ? (
                  <CardVideo src={p.img} label={p.name} />
                ) : (
                  <img src={p.img} alt={p.name} loading={i < 4 ? "eager" : "lazy"} fetchPriority={i < 2 ? "high" : "auto"} decoding="async" />
                )}
              </div>

              <div className="card__top">
                <h3 className="card__name">{p.name}</h3>
                <div className="card__tags">
                  {p.tags.map((t) => (
                    <span className="pill" key={t}>{t}</span>
                  ))}
                </div>
              </div>

              <p className="card__desc">{p.desc}</p>

              {/* revealed on hover */}
              <div className="card__reveal">
                <div className="card__reveal-inner">
                  <dl className="card__meta">
                    <div>
                      <dt>Role</dt>
                      <dd>{p.role}</dd>
                    </div>
                    <div>
                      <dt>Team</dt>
                      <dd>{p.team}</dd>
                    </div>
                    <div>
                      <dt>Timeframe</dt>
                      <dd>{p.timeframe}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Tag>
          </Reveal>
          </li>
          );
        })}
      </ul>

      {/* cursor-following pill — visibility driven by the body.pill-cursor class (set on card enter/leave) */}
      <motion.div className="work__cursor" style={{ x: px, y: py, translateX: "-50%", translateY: "-50%" }} aria-hidden>
        <span className="work__cursor-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          View case study
        </span>
      </motion.div>
    </section>
  );
}
