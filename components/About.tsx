"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  aboutIntro,
  communities,
  favorites,
  funStack,
  funBlurb,
  journeyQuotes,
  experience
} from "@/lib/data";

// "A few of my favorite things" — one continuous cover strip that slides
// left -> right; seamless loop, hover to pause, drag to scrub
function FaveMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);
  const drag = useRef({ down: false, startX: 0, startOff: 0 });

  // duplicate the list so the strip can wrap without a seam
  const items = [...favorites, ...favorites];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 30; // px/s, left -> right
    let last = performance.now();
    let raf = 0;

    offset.current = -(track.scrollWidth / 2);
    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 1000;
      last = now;
      const half = track.scrollWidth / 2 || 1;
      if (!paused.current && !drag.current.down && !reduce) offset.current += SPEED * dt;
      if (offset.current > 0) offset.current -= half;
      if (offset.current <= -half) offset.current += half;
      track.style.transform = `translate3d(${offset.current.toFixed(2)}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: React.PointerEvent) => {
    drag.current = { down: true, startX: e.clientX, startOff: offset.current };
    vpRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.down) return;
    offset.current = drag.current.startOff + (e.clientX - drag.current.startX);
  };
  const onUp = (e: React.PointerEvent) => {
    drag.current.down = false;
    try { vpRef.current?.releasePointerCapture?.(e.pointerId); } catch {}
  };

  return (
    <div
      className="favemq"
      ref={vpRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={(e) => { paused.current = false; onUp(e); }}
      data-lenis-prevent
    >
      <div className="favemq__track" ref={trackRef}>
        {items.map((f, i) => (
          <article className="favemq__card" key={i}>
            <div className="favemq__cover">
              {/* until a cover file exists the tile stays blank rather than showing a broken icon */}
              <img
                src={f.img}
                alt={f.title}
                loading="lazy"
                draggable={false}
                onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              />
            </div>
            <h4 className="favemq__title">{f.title}</h4>
            {f.note && <p className="favemq__note">{f.note}</p>}
          </article>
        ))}
      </div>
    </div>
  );
}

// "Things I do for fun" — full-width 3D photo ring; page scroll spins it,
// drag to rotate, slow idle spin (reference: rotating panel carousel)
function FunStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const s = useRef({ angle: 0, vel: 0, lastY: 0, down: false, startX: 0, startAngle: 0, moved: false }).current;

  const n = funStack.length;

  useEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = 360 / n;
    let raf = 0;
    let last = performance.now();
    let radius = 0;

    const layout = () => {
      const card = stage.children[0] as HTMLElement | undefined;
      const w = card?.offsetWidth ?? 300;
      // ring radius from card width so panels sit edge-to-edge with a little air
      radius = Math.round((w / 2) / Math.tan(Math.PI / n) * 1.18);
      for (let i = 0; i < stage.children.length; i++) {
        (stage.children[i] as HTMLElement).style.transform =
          `rotateY(${i * step}deg) translateZ(${radius}px)`;
      }
    };
    layout();
    window.addEventListener("resize", layout);

    s.lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      // page scroll spins the ring (only meaningful while section is near viewport)
      const r = wrap.getBoundingClientRect();
      if (r.bottom > -200 && r.top < window.innerHeight + 200) {
        s.vel += (y - s.lastY) * 0.02;
      }
      s.lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const tick = (now: number) => {
      const dt = Math.min(40, now - last) / 1000;
      last = now;
      if (!s.down) {
        if (!reduce) s.angle += 4.5 * dt; // idle spin
        s.angle += s.vel;
        s.vel *= 0.92; // momentum decay
      }
      stage.style.transform = `rotateY(${s.angle.toFixed(3)}deg)`;
      // dim/fade panels that face away
      for (let i = 0; i < stage.children.length; i++) {
        const el = stage.children[i] as HTMLElement;
        const world = ((i * step + s.angle) % 360 + 360) % 360;
        const facing = Math.cos((world * Math.PI) / 180); // 1 = front, -1 = back
        el.style.setProperty("--dim", (0.55 + 0.45 * Math.max(0, facing)).toFixed(3));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDown = (e: React.PointerEvent) => {
    s.down = true; s.moved = false;
    s.startX = e.clientX; s.startAngle = s.angle; s.vel = 0;
    wrapRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!s.down) return;
    const dx = e.clientX - s.startX;
    if (Math.abs(dx) > 4) s.moved = true;
    const prev = s.angle;
    s.angle = s.startAngle + dx * 0.25;
    s.vel = (s.angle - prev) * 0.6;
  };
  const onUp = (e: React.PointerEvent) => {
    s.down = false;
    try { wrapRef.current?.releasePointerCapture?.(e.pointerId); } catch {}
  };

  return (
    <div
      className="funring"
      ref={wrapRef}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <div className="funring__stage" ref={stageRef}>
        {funStack.map((p) => (
          <figure key={p.src} className="funring__card">
            <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
          </figure>
        ))}
      </div>
    </div>
  );
}

// "Journey so far" — click a chip to swap the highlighted role card
function Journey() {
  const [active, setActive] = useState(0);
  const [quote, setQuote] = useState(0);
  const cur = experience[active];
  const q = journeyQuotes[quote];
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
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.org}
                className="journey__cardInner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <h3 className="journey__role">{cur.org.split(" · ")[0]}</h3>
                <p className="journey__sub">{cur.role}</p>
                <p className="journey__desc">{cur.desc}</p>
                <span className="journey__period">{cur.period}</span>
              </motion.div>
            </AnimatePresence>
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

      {/* right: emoji-tabbed quote panel */}
      <Reveal delay={0.1} className="journey__quoteWrap">
        <div className="journey__panel">
          <div className="journey__tabs" role="tablist">
            {journeyQuotes.map((q, i) => (
              <button
                key={q.emoji}
                role="tab"
                aria-selected={i === quote}
                className={`journey__tab${i === quote ? " is-active" : ""}`}
                onClick={() => setQuote(i)}
              >
                <span aria-hidden>{q.emoji}</span>
              </button>
            ))}
          </div>

          <div className="journey__quote">
            <AnimatePresence mode="wait">
              <motion.div
                key={q.emoji}
                className="journey__quoteInner"
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
              >
                <div
                  className="journey__quoteSky"
                  aria-hidden
                  style={{ background: `linear-gradient(180deg, ${q.from}, ${q.via} 55%, ${q.to})` }}
                />
                <blockquote className="journey__quoteText">
                  {q.lead}
                  <em>{q.emph}</em>
                  {q.tail}
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>
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
        <FaveMarquee />
      </section>
    </div>
  );
}
