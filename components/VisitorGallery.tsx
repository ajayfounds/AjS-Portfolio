"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, seedVisitors, guestCount, VISITOR_COLORS, mulberry32, type VisitorEntry } from "@/lib/data";

// deterministic dot-matrix burst per card seed
const M_COLS = 24, M_ROWS = 13, M_CHARS = ["·", "˙", ":", "+", "x", "*", "▪"];
function genMatrix(seed: number) {
  const rng = mulberry32(seed);
  let out = "";
  for (let r = 0; r < M_ROWS; r++) {
    for (let c = 0; c < M_COLS; c++) {
      const dx = (c - M_COLS / 2) / (M_COLS / 2);
      const dy = (r - M_ROWS / 2) / (M_ROWS / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ray = Math.pow(Math.abs(Math.cos(Math.atan2(dy, dx) * 3)), 3);
      const density = Math.max(0, (1 - dist) * 0.5 + ray * (1 - dist) * 0.8);
      out += rng() < density ? M_CHARS[Math.floor(rng() * M_CHARS.length)] : " ";
    }
    out += "\n";
  }
  return out;
}

// deterministic hand-drawn-looking signature path
function sigPath(seed: number) {
  const rng = mulberry32(seed ^ 0x9e3779b9);
  const n = 4 + Math.floor(rng() * 4);
  let x = 6 + rng() * 8;
  const pts: [number, number][] = [[x, 16 + (rng() - 0.5) * 16]];
  for (let i = 0; i < n; i++) {
    x += 9 + rng() * 16;
    pts.push([Math.min(x, 94), 6 + rng() * 22]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    d += ` Q ${px.toFixed(1)} ${cy.toFixed(1)} ${((px + cx) / 2).toFixed(1)} ${((py + cy) / 2).toFixed(1)}`;
  }
  return d;
}

type Card = VisitorEntry & { sig?: string | null; isYou?: boolean };

function GalleryCard({ card, i }: { card: Card; i: number }) {
  const c = VISITOR_COLORS[card.color] ?? VISITOR_COLORS.green;
  const matrix = useMemo(() => genMatrix(card.seed), [card.seed]);
  const path = useMemo(() => sigPath(card.seed), [card.seed]);

  return (
    <motion.article
      className="vcard gcard"
      style={{ background: c.bg, color: c.fg }}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.05 }}
    >
      {card.isYou && <span className="gcard__you">You</span>}
      <pre className="vcard__matrix" aria-hidden>{matrix}</pre>

      <div className="vcard__brand-row">
        <span className="vcard__brand">{site.brand}</span>
      </div>
      <div className="vcard__mid">
        <span><i className="vcard__label">Visitor</i><span className="vcard__value vcard__name">{card.name}</span></span>
        <span><i className="vcard__label">Issued on</i><span className="vcard__value">{card.issued}</span></span>
      </div>
      <div className="vcard__foot">
        <span className="vcard__no">No. {card.no}</span>
        <span className="vcard__sign">X<i /></span>
      </div>

      {card.isYou && card.sig ? (
        <img className="gcard__sigimg" src={card.sig} alt="" aria-hidden />
      ) : (
        card.signed && (
          <svg className="gcard__sig" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden>
            <path d={path} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )
      )}
    </motion.article>
  );
}

export default function VisitorGallery() {
  const [you, setYou] = useState<Card | null>(null);
  const [order, setOrder] = useState<number[]>(() => seedVisitors.map((_, i) => i));
  const [visible, setVisible] = useState(18);
  const [statsOpen, setStatsOpen] = useState(false);
  const [count, setCount] = useState(0);

  // your saved card (client only → no hydration mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("visitor-card");
      if (raw) {
        const v = JSON.parse(raw);
        setYou({ name: v.name, color: v.color, no: v.no, issued: v.issued, seed: 777, signed: !!v.sig, sig: v.sig, isYou: true });
      }
    } catch {
      /* ignore */
    }
  }, []);

  // count-up
  useEffect(() => {
    const target = guestCount + (you ? 1 : 0);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 1100, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [you]);

  const bars = useMemo(() => {
    const rng = mulberry32(424242);
    return Array.from({ length: 7 }, () => 0.35 + rng() * 0.65);
  }, []);

  const cards: Card[] = useMemo(() => {
    const list = order.map((idx) => seedVisitors[idx] as Card);
    return you ? [you, ...list] : list;
  }, [order, you]);

  const shuffle = () => {
    setOrder((prev) => {
      const a = [...prev];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    });
  };

  const signGuestbook = () => {
    window.dispatchEvent(new Event("open-guestbook"));
  };

  const shown = cards.slice(0, visible);

  return (
    <div className="vgal">
      <div className="vgal__head">
        <div>
          <h1 className="vgal__title">Visitor Gallery</h1>
          <p className="vgal__count">{count.toLocaleString()} guests have signed in</p>
        </div>
        <button className="vgal__shuffle" onClick={shuffle}>
          Shuffle
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M23 4v6h-6M1 20v-6h6" /><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
          </svg>
        </button>
      </div>

      <button className="vgal__stats-toggle" onClick={() => setStatsOpen((v) => !v)} aria-expanded={statsOpen}>
        <span>Visits per week</span>
        <motion.svg width="13" height="13" viewBox="0 0 14 14" fill="none" animate={{ rotate: statsOpen ? 0 : -90 }} transition={{ duration: 0.3 }} aria-hidden>
          <path d="M3 5.5 7 9.5l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {statsOpen && (
          <motion.div className="vgal__stats" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <div className="vgal__bars">
              {bars.map((h, i) => (
                <motion.span key={i} initial={{ scaleY: 0 }} animate={{ scaleY: h }} transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button className="vgal__guestbook" onClick={signGuestbook}>
        Sign the guestbook <span aria-hidden>→</span>
      </button>

      <div className="vgal__grid">
        {shown.map((card, i) => (
          <GalleryCard key={card.isYou ? "you" : card.seed} card={card} i={i} />
        ))}
      </div>

      {visible < cards.length && (
        <div className="vgal__more-wrap">
          <button className="vgal__more" onClick={() => setVisible((v) => v + 18)}>Load more</button>
        </div>
      )}
    </div>
  );
}
