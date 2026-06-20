"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";
import {
  aboutIntro,
  galleryPhotos,
  communities,
  favorites,
  funStack,
  funBlurb,
  journeyQuote,
  experience,
  type Fave
} from "@/lib/data";

// one labelled, horizontally-scrollable favourites row
function FaveRow({ label, items }: { label: string; items: Fave[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  // manual rAF tween — native smooth scroll is unreliable under Lenis
  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 600);
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(el.scrollLeft + dir * amount, max));
    const start = el.scrollLeft;
    const dist = target - start;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / 450, 1);
      el.scrollLeft = start + dist * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="fave-row">
      <Reveal delay={0.05}>
        <h3 className="about__faveTitle">{label}</h3>
      </Reveal>
      <div className="carousel">
        <button className="carousel__arrow carousel__arrow--prev" onClick={() => scrollBy(-1)} aria-label="Previous">←</button>
        <div className="carousel__track" ref={trackRef}>
          {items.map((f) => (
            <article className="book" key={f.title}>
              <div className="book__cover" style={{ background: `linear-gradient(150deg, ${f.from}, ${f.to})` }}>
                <span className="book__coverTitle">{f.title}</span>
              </div>
              <h4 className="book__title">{f.title}</h4>
              {f.note && <p className="book__author">{f.note}</p>}
            </article>
          ))}
        </div>
        <button className="carousel__arrow carousel__arrow--next" onClick={() => scrollBy(1)} aria-label="Next">→</button>
      </div>
    </div>
  );
}

// "Things I do for fun" — a swipeable / draggable photo carousel
function FunStack() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  // mouse drag-to-scroll (touch devices use native momentum scroll)
  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startLeft: el.scrollLeft, moved: false };
    el.classList.add("is-dragging");
    el.setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startLeft - dx;
  };
  const onUp = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.down = false;
    el.classList.remove("is-dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  };

  // arrow nudge — manual rAF tween (native smooth scroll unreliable under Lenis)
  const nudge = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 560);
    const max = el.scrollWidth - el.clientWidth;
    const target = Math.max(0, Math.min(el.scrollLeft + dir * amount, max));
    const start = el.scrollLeft;
    const dist = target - start;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - t0) / 480, 1);
      el.scrollLeft = start + dist * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div className="funstack">
      <button className="funstack__arrow funstack__arrow--prev" onClick={() => nudge(-1)} aria-label="Previous">←</button>
      <div
        className="funstack__track"
        ref={trackRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        data-lenis-prevent
      >
        {funStack.map((p, i) => (
          <figure key={p.src} className="funstack__card" style={{ "--i": i } as React.CSSProperties}>
            <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
          </figure>
        ))}
      </div>
      <button className="funstack__arrow funstack__arrow--next" onClick={() => nudge(1)} aria-label="Next">→</button>
    </div>
  );
}

// "Journey so far" — click a chip to swap the highlighted role card
function Journey() {
  const [active, setActive] = useState(0);
  const cur = experience[active];
  const rest = experience.map((e, i) => ({ e, i })).filter((x) => x.i !== active);

  return (
    <div className="journey">
      {/* left: interactive timeline */}
      <div className="journey__left">
        <Reveal>
          <h2 className="journey__title">
            <span className="journey__vinyl" aria-hidden>
              <span className="journey__vinyl-disc" />
              <span className="journey__vinyl-arm" />
            </span>
            Journey so far
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="journey__card" style={{ "--accent": cur.accent } as React.CSSProperties}>
            <h3 className="journey__role">{cur.org.split(" · ")[0]}</h3>
            <p className="journey__sub">{cur.role}</p>
            <p className="journey__desc">{cur.desc}</p>
            <span className="journey__period">{cur.period}</span>
          </article>
        </Reveal>

        <div className="journey__chips">
          {rest.map(({ e, i }) => (
            <button
              key={e.org}
              className="journey__chip"
              onClick={() => setActive(i)}
              style={{ "--accent": e.accent } as React.CSSProperties}
            >
              <span className="journey__chip-icon" aria-hidden>{e.icon}</span>
              <span className="journey__chip-text">
                <span className="journey__chip-name">{e.short}</span>
                <span className="journey__chip-role">{e.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* right: quote card */}
      <Reveal delay={0.1} className="journey__quoteWrap">
        <div className="journey__quote">
          <div className="journey__tabs" aria-hidden>
            {journeyQuote.emoji.map((em) => (
              <span key={em} className="journey__tab">{em}</span>
            ))}
          </div>
          <blockquote className="journey__quoteText">
            {journeyQuote.lead}
            <em>{journeyQuote.emph}</em>
            {journeyQuote.tail}
          </blockquote>
          <div className="journey__quoteSky" aria-hidden />
        </div>
      </Reveal>
    </div>
  );
}

export default function About() {
  return (
    <div className="about-page">
      {/* Intro */}
      <Reveal>
        <h1 className="about__greeting">
          {aboutIntro.greeting}
          <span className="about__quack" title="certified overthinker" aria-label="certified overthinker">🦆</span>
        </h1>
      </Reveal>
      <Reveal delay={0.05}>
        <div className="about__intro">
          <p>{aboutIntro.paragraphs[0]}</p>
          <p>{aboutIntro.paragraphs[1]}</p>
          <ul className="about__hobbies">
            {aboutIntro.hobbies.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p>{aboutIntro.closing}</p>
        </div>
      </Reveal>

      {/* Photo gallery */}
      <Reveal delay={0.05}>
        <div className="about__gallery">
          {galleryPhotos.map((p, i) => (
            <figure key={p.src} className={`gphoto${p.span ? " gphoto--wide" : ""}`} data-i={i}>
              <img src={p.src} alt={p.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </Reveal>

      {/* Things I do for fun */}
      <section className="about__block about__block--center">
        <Reveal>
          <h2 className="about__display">Things I do for fun</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="about__displaySub">{funBlurb}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <FunStack />
        </Reveal>
      </section>

      {/* Journey so far */}
      <section className="about__block">
        <Journey />
      </section>

      {/* Communities */}
      <section className="about__block">
        <Reveal>
          <h2 className="about__eyebrow">My Communities</h2>
        </Reveal>
        <ul className="communities">
          {communities.map((c, i) => (
            <Reveal as="li" key={c.name} className="community" delay={i * 0.06}>
              <div className="community__head">
                <span className="community__icon" aria-hidden>{c.icon}</span>
                <h3 className="community__name">{c.name}</h3>
              </div>
              {c.desc && <p className="community__desc">{c.desc}</p>}
              <div className="community__media">
                <img src={c.img} alt={c.name} loading="lazy" />
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Favorite things */}
      <section className="about__block about__block--center">
        <Reveal>
          <h2 className="about__eyebrow about__eyebrow--center">A Few of My Favorite Things</h2>
        </Reveal>
        <div className="fave-rows">
          {favorites.map((cat) => (
            <FaveRow key={cat.label} label={cat.label} items={cat.items} />
          ))}
        </div>
      </section>
    </div>
  );
}
