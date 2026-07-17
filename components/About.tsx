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
