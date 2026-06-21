"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  aboutIntro,
  galleryPhotos,
  communities,
  favorites,
  funStack,
  funBlurb,
  journeyQuote,
  experience
} from "@/lib/data";

// "A few of my favorite things" — one category at a time, arrows cycle categories,
// cards get a 3D coverflow tilt + idle float
function FaveDeck() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafTilt = useRef<number | undefined>(undefined);
  const cat = favorites[active];

  // tilt each card in 3D based on its distance from the track centre (coverflow)
  const updateTilt = () => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth || 1;
    const mid = el.scrollLeft + w / 2;
    el.querySelectorAll<HTMLElement>(".book").forEach((card) => {
      const c = card.offsetLeft + card.offsetWidth / 2;
      const d = Math.max(-1, Math.min(1, ((c - mid) / w) * 1.25));
      card.style.setProperty("--ry", (d * -15).toFixed(2) + "deg");
      card.style.setProperty("--sc", (1 - Math.abs(d) * 0.07).toFixed(3));
      card.style.setProperty("--ty", (Math.abs(d) * 10).toFixed(1) + "px");
    });
  };

  const onScroll = () => {
    if (rafTilt.current) return;
    rafTilt.current = requestAnimationFrame(() => {
      rafTilt.current = undefined;
      updateTilt();
    });
  };

  // re-tilt whenever the active category (and its track) changes, and on resize
  useEffect(() => {
    const id = requestAnimationFrame(updateTilt);
    window.addEventListener("resize", updateTilt);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updateTilt);
    };
  }, [active]);

  const go = (d: number) => {
    setDir(d);
    setActive((a) => (a + d + favorites.length) % favorites.length);
  };
  const jump = (i: number) => {
    if (i === active) return;
    setDir(i > active ? 1 : -1);
    setActive(i);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 56 : -56 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -56 : 56 })
  };

  return (
    <div className="favedeck">
      <div className="favedeck__row">
        <button className="carousel__arrow" onClick={() => go(-1)} aria-label="Previous category">←</button>
        <div className="favedeck__stage">
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={cat.label}
              custom={dir}
              className="favedeck__panel"
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.4, 0, 0.2, 1] }}
              onAnimationComplete={() => requestAnimationFrame(updateTilt)}
            >
              <h3 className="favedeck__title">{cat.label}</h3>
              <div
                className={`carousel__track favedeck__track${cat.square ? " is-square" : ""}`}
                ref={trackRef}
                onScroll={onScroll}
              >
                {cat.items.map((f) => (
                  <article className="book" key={f.title}>
                    <div
                      className="book__cover"
                      style={f.img ? undefined : { background: `linear-gradient(150deg, ${f.from}, ${f.to})` }}
                    >
                      {f.img ? (
                        <img src={f.img} alt={f.title} loading="lazy" draggable={false} />
                      ) : (
                        <span className="book__coverTitle">{f.title}</span>
                      )}
                    </div>
                    <h4 className="book__title">{f.title}</h4>
                    {f.note && <p className="book__author">{f.note}</p>}
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <button className="carousel__arrow" onClick={() => go(1)} aria-label="Next category">→</button>
      </div>
      <div className="favedeck__dots">
        {favorites.map((c, i) => (
          <button
            key={c.label}
            className={`favedeck__dot${i === active ? " is-active" : ""}`}
            onClick={() => jump(i)}
            aria-label={c.label}
          />
        ))}
      </div>
    </div>
  );
}

// "Things I do for fun" — auto-scrolling photo strip; the card nearest the
// centre grows largest (coverflow), seamless loop, drag + hover-pause
function FunStack() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const rafRef = useRef<number | undefined>(undefined);
  const drag = useRef({ down: false, startX: 0, startOff: 0, moved: false });

  // duplicate the photos so the strip can loop seamlessly
  const items = [...funStack, ...funStack];

  useEffect(() => {
    const track = trackRef.current;
    const vp = viewportRef.current;
    if (!track || !vp) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 26; // px/s, left -> right
    let last = performance.now();

    // scale/tilt each card by its distance from the viewport centre
    const shape = () => {
      const vr = vp.getBoundingClientRect();
      const cx = vr.left + vr.width / 2;
      const half = vr.width / 2 || 1;
      for (const card of Array.from(track.children) as HTMLElement[]) {
        const r = card.getBoundingClientRect();
        const d = Math.max(-1, Math.min(1, ((r.left + r.width / 2) - cx) / half));
        const a = Math.abs(d);
        card.style.setProperty("--s", (1.12 - a * 0.5).toFixed(3));
        card.style.setProperty("--r", (d * 9).toFixed(2) + "deg");
        card.style.setProperty("--o", (1 - a * 0.35).toFixed(3));
        card.style.zIndex = String(100 - Math.round(a * 100));
      }
    };

    offset.current = -(track.scrollWidth / 2);
    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 1000;
      last = now;
      const half = track.scrollWidth / 2 || 1;
      if (!paused.current && !drag.current.down && !reduce) offset.current += SPEED * dt;
      // keep offset in (-half, 0] for a seamless wrap
      if (offset.current > 0) offset.current -= half;
      if (offset.current <= -half) offset.current += half;
      track.style.transform = `translate3d(${offset.current.toFixed(2)}px,0,0)`;
      shape();
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { down: true, startX: e.clientX, startOff: offset.current, moved: false };
    viewportRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 3) drag.current.moved = true;
    offset.current = drag.current.startOff + dx;
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    try {
      viewportRef.current?.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  // arrows tween the offset by ~one card (pauses auto-scroll briefly)
  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    const step = (first?.offsetWidth ?? 220) + 28;
    const start = offset.current;
    const target = start + dir * step;
    const t0 = performance.now();
    paused.current = true;
    const anim = (now: number) => {
      const p = Math.min((now - t0) / 460, 1);
      offset.current = start + (target - start) * (1 - Math.pow(1 - p, 3));
      if (p < 1) requestAnimationFrame(anim);
      else paused.current = false;
    };
    requestAnimationFrame(anim);
  };

  return (
    <div className="funstack">
      <button className="funstack__arrow funstack__arrow--prev" onClick={() => nudge(1)} aria-label="Previous">←</button>
      <div
        className="funstack__viewport"
        ref={viewportRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={(e) => {
          paused.current = false;
          onUp(e);
        }}
        data-lenis-prevent
      >
        <div className="funstack__track" ref={trackRef}>
          {items.map((p, i) => (
            <figure key={i} className="funstack__card">
              <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
            </figure>
          ))}
        </div>
      </div>
      <button className="funstack__arrow funstack__arrow--next" onClick={() => nudge(-1)} aria-label="Next">→</button>
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

      {/* Things I do for fun — right after the intro/hobbies */}
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
        <FaveDeck />
      </section>
    </div>
  );
}
