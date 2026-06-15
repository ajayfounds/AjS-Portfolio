"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { projects } from "@/lib/data";

export default function Work() {
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
      <Reveal className="section-head">
        <span className="section-head__index">01</span>
        <h2 className="section-head__title">My Work</h2>
      </Reveal>

      <ul className="work__grid">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.num} className="card" delay={(i % 2) * 0.06}>
            <a
              href={p.href}
              className="card__link"
              target="_blank"
              rel="noopener noreferrer"
              data-project
              onMouseEnter={enter}
              onMouseLeave={leave}
            >
              <div className="card__head">
                <span className="card__dot" aria-hidden />
                <span className="card__num">No. {p.num}</span>
              </div>

              <div className="card__media">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>

              <div className="card__top">
                <h3 className="card__name">{p.name}</h3>
                <div className="card__tags">
                  {p.tags.map((t) => (
                    <span className="pill" key={t}>{t}</span>
                  ))}
                  <span className="pill pill--status">{p.status}</span>
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
            </a>
          </Reveal>
        ))}
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
