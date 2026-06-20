"use client";

import { useRef } from "react";
import Reveal from "./Reveal";
import { aboutIntro, galleryPhotos, communities, favorites, type Fave } from "@/lib/data";

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
