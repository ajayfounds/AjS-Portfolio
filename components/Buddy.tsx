"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type HatKey = "party" | "beanie" | "bowler" | "sprout" | "none";

const HATS: { key: HatKey; label: string }[] = [
  { key: "none", label: "no hat" },
  { key: "party", label: "party hat" },
  { key: "beanie", label: "beanie" },
  { key: "bowler", label: "bowler" },
  { key: "sprout", label: "sprout" }
];

const IDLE_PHRASES = [
  "sup?", "hello :)", "just vibing", "sniff sniff", "◡̈", "boop", "wander time",
  "ooh shiny", "you still here?", "design is hard", "need coffee", "pixel hunting",
  "hmm…", "what's that?", "weee", "kerning…", "snack?", "is it 8px or 12?"
];
const CLINGY = ["wait for me!", "where you going?", "coming!", "don't leave :(", "follow you!", "hi hi hi", "psst, hey"];
const CLUMSY = ["whoa!", "oof", "oops", "tripped!", "i meant to do that", "ow", "wobble"];
const HAPPY = ["hehe", "boop! :)", "pet me more", "yay!", "<3", "you found me!"];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

function Hat({ type }: { type: HatKey }) {
  switch (type) {
    case "party":
      return (
        <svg className="buddy__hat" width="26" height="22" viewBox="0 0 26 22" aria-hidden>
          <polygon points="13,1 23,19 3,19" fill="#bf5a7a" />
          <circle cx="13" cy="2.5" r="2.6" fill="#e8c84a" />
          <circle cx="9" cy="13" r="1.3" fill="#f3f1eb" />
          <circle cx="16" cy="10" r="1.3" fill="#f3f1eb" />
        </svg>
      );
    case "beanie":
      return (
        <svg className="buddy__hat" width="28" height="18" viewBox="0 0 28 18" aria-hidden>
          <path d="M4 14a10 10 0 0 1 20 0z" fill="#e8c84a" />
          <rect x="3" y="13" width="22" height="4.5" rx="2.2" fill="#cb9f33" />
          <circle cx="14" cy="3" r="2.4" fill="#f3f1eb" />
        </svg>
      );
    case "bowler":
      return (
        <svg className="buddy__hat" width="30" height="18" viewBox="0 0 30 18" aria-hidden>
          <ellipse cx="15" cy="15" rx="14" ry="3" fill="#242424" />
          <path d="M6 15a9 8 0 0 1 18 0z" fill="#242424" />
          <rect x="6.5" y="12" width="17" height="2.4" rx="1.2" fill="#cb7836" />
        </svg>
      );
    case "sprout":
      return (
        <svg className="buddy__hat" width="26" height="22" viewBox="0 0 26 24" aria-hidden>
          <path d="M13 24V9" stroke="#2a8f50" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M13 13C6 13 5 5 5 5c7 0 8 8 8 8z" fill="#2a8f50" />
          <path d="M13 11c7 0 8-8 8-8-7 0-8 8-8 8z" fill="#39a862" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Buddy() {
  const [hat, setHat] = useState<HatKey>("party");
  const [menuOpen, setMenuOpen] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);

  const menuOpenRef = useRef(false);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const squashTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const say = (t: string, ms = 2200) => {
    clearTimeout(bubbleTimer.current);
    setBubble(t);
    bubbleTimer.current = setTimeout(() => setBubble(null), ms);
  };

  // all mutable physics state lives here (no React re-renders per frame)
  const s = useRef({
    x: 40, y: 200, vx: 0, vy: 0, facing: 1, lastFacing: 1,
    held: false, grounded: false, dragging: false,
    supportEl: null as Element | null, // the card/box it's currently standing on (null = ground)
    mode: "idle", modeUntil: 0, targetX: 40,
    px: 0, py: 0, plx: 0, ply: 0, pt: 0, pvx: 0, pvy: 0,
    grabX: 0, grabY: 0, downCX: 0, downCY: 0,
    cursorX: 0, cursorY: 0, lastMove: -9999
  }).current;

  useEffect(() => {
    const PET_W = 44, PET_H = 52, M = 8;
    const G = 2400, REST = 0.5, FR = 0.86, AIR = 0.99, WALK = 60;

    const floorY = () => window.innerHeight - PET_H - M;
    const maxX = () => window.innerWidth - PET_W - M;

    // init on the floor, bottom-left
    s.x = clamp(40, M, maxX());
    s.y = floorY();
    s.grounded = true;

    const cls = (name: string, on: boolean) => rootRef.current?.classList.toggle(name, on);

    const doSquash = () => {
      cls("is-squash", true);
      clearTimeout(squashTimer.current);
      squashTimer.current = setTimeout(() => cls("is-squash", false), 200);
    };

    const chooseAction = (now: number) => {
      const mx = maxX();
      const cxNow = s.x + PET_W / 2;
      const cursorFresh = now - s.lastMove < 2600 && Math.abs(s.cursorX - cxNow) > 40;
      // walkable range — when standing on a card, mostly stay on it (walk along it),
      // and only sometimes wander off to roam the rest of the page
      let lo = M, hi = mx;
      if (s.supportEl && Math.random() < 0.6) {
        const sr = s.supportEl.getBoundingClientRect();
        lo = clamp(sr.left + 2, M, mx);
        hi = clamp(sr.right - PET_W - 2, M, mx);
        if (hi <= lo) { lo = M; hi = mx; }
      }
      const r = Math.random();
      // clingy: chase the cursor whenever it has moved recently
      if (cursorFresh && r < 0.5) {
        s.mode = "walk";
        s.targetX = clamp(s.cursorX - PET_W / 2, M, mx);
        s.modeUntil = now + 6000;
        if (Math.random() > 0.45) say(pick(CLINGY), 1600);
      } else if (r < 0.74) {
        s.mode = "walk";
        s.targetX = clamp(rand(lo, hi), M, mx);
        s.modeUntil = now + 7000;
      } else if (r < 0.86) {
        s.mode = "idle";
        s.modeUntil = now + rand(900, 2200);
        if (Math.random() > 0.45) say(pick(IDLE_PHRASES));
      } else if (r < 0.95) {
        s.mode = "idle";
        s.vy = -760; // hop
        s.grounded = false;
        s.modeUntil = now + 1400;
        if (Math.random() > 0.4) say(pick(["hop!", "boing", "wheee"]), 1100);
      } else {
        s.mode = "sit";
        s.modeUntil = now + rand(2200, 4600);
        say("zzz…", 2400);
      }
    };

    // cards / boxes that act as walkable surfaces
    const SURF_SEL = ".card, .gcard, .log, .community, .sidebar__explore, .vgal__guestbook";
    let surfaces: Element[] = [];
    const refreshSurfaces = () => { surfaces = Array.from(document.querySelectorAll(SURF_SEL)); };
    refreshSurfaces();

    let raf = 0;
    let last = performance.now();
    let greeted = false;
    let frame = 0;

    const step = (now: number) => {
      let dt = (now - last) / 1000;
      last = now;
      if (dt > 0.04) dt = 0.04;
      const H = window.innerHeight, W = window.innerWidth;
      const groundFeet = H - M;       // ground rest line (pet feet)
      const mX = W - PET_W - M;

      if (!greeted && now > 700) { greeted = true; say("hi! :)", 2200); }
      if (frame++ % 40 === 0) refreshSurfaces();

      // build current platform rects (viewport coords; refresh each frame so the
      // pet rides cards as the page scrolls)
      const plats: { l: number; r: number; top: number; el: Element }[] = [];
      for (const el of surfaces) {
        const r = el.getBoundingClientRect();
        if (r.width > 40 && r.bottom > 0 && r.top < H) plats.push({ l: r.left, r: r.right, top: r.top, el });
      }
      const cx = () => s.x + PET_W / 2;

      if (s.held) {
        s.x += (s.px - s.grabX - s.x) * Math.min(1, dt * 26);
        s.y += (s.py - s.grabY - s.y) * Math.min(1, dt * 26);
        s.grounded = false; s.supportEl = null;
        cls("is-walking", false); cls("is-sitting", false);
      } else {
        // ---- horizontal ----
        s.x += s.vx * dt;
        if (s.x < M) { s.x = M; s.vx = Math.abs(s.vx) * REST; s.facing = 1; }
        if (s.x > mX) { s.x = mX; s.vx = -Math.abs(s.vx) * REST; s.facing = -1; }

        // ---- standing on a surface: stick to it, walk off its edges ----
        if (s.grounded) {
          if (s.supportEl) {
            const r = s.supportEl.getBoundingClientRect();
            const ok = r.width > 30 && r.bottom > 0 && r.top < H && cx() > r.left + 2 && cx() < r.right - 2;
            if (ok) { s.y = r.top - PET_H; s.vy = 0; } else { s.grounded = false; s.supportEl = null; }
          } else {
            s.y = groundFeet - PET_H; s.vy = 0; // ground
          }
        }

        // ---- airborne: gravity + land on the highest surface crossed ----
        if (!s.grounded) {
          const prevFeet = s.y + PET_H;
          s.vy += G * dt;
          s.y += s.vy * dt;
          s.vx *= AIR;
          const newFeet = s.y + PET_H;
          if (s.vy >= 0) {
            let best = Infinity, bestEl: Element | null = null;
            for (const p of plats) {
              if (cx() < p.l + 4 || cx() > p.r - 4) continue;
              if (prevFeet <= p.top + 8 && newFeet >= p.top && p.top < best) { best = p.top; bestEl = p.el; }
            }
            if (newFeet >= groundFeet && groundFeet < best) { best = groundFeet; bestEl = null; }
            if (best !== Infinity) {
              s.y = best - PET_H;
              if (s.vy > 340) { s.vy = -s.vy * REST; doSquash(); }
              else {
                s.vy = 0;
                if (!s.grounded) {
                  doSquash();
                  if (bestEl) { s.mode = "idle"; s.modeUntil = now + rand(1800, 3200); say("comfy!", 1400); } // landed on a card → chill on it
                }
                s.grounded = true; s.supportEl = bestEl;
              }
              s.vx *= FR;
            }
          }
        }

        // ---- behaviour FSM (only while grounded) ----
        if (s.grounded && !menuOpenRef.current) {
          if (now > s.modeUntil) chooseAction(now);
          if (s.mode === "walk") {
            const d = s.targetX - s.x;
            if (Math.abs(d) < 3) {
              s.vx = 0; s.mode = "idle"; s.modeUntil = now + rand(900, 2200);
              cls("is-walking", false);
            } else if (Math.random() < 0.006) {
              // clumsy stumble mid-walk
              doSquash(); s.vx = -Math.sign(d) * 90; s.facing = d > 0 ? 1 : -1;
              s.mode = "idle"; s.modeUntil = now + rand(500, 1000);
              cls("is-walking", false); say(pick(CLUMSY), 1200);
            } else {
              s.facing = d > 0 ? 1 : -1;
              s.vx = Math.sign(d) * WALK;
              cls("is-walking", true); cls("is-sitting", false);
            }
          } else if (s.mode === "sit") {
            s.vx *= 0.6; cls("is-walking", false); cls("is-sitting", true);
          } else {
            // idle: turn to look at the cursor (clingy attention)
            if (now - s.lastMove < 2600) s.facing = s.cursorX > cx() ? 1 : -1;
            s.vx *= 0.6; cls("is-walking", false); cls("is-sitting", false);
          }
        } else {
          cls("is-walking", false);
          if (menuOpenRef.current) s.vx *= 0.6;
        }
      }

      const root = rootRef.current, flip = flipRef.current;
      if (root) root.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      if (flip && s.facing !== s.lastFacing) {
        flip.style.transform = `scaleX(${s.facing})`;
        s.lastFacing = s.facing;
      }

      raf = requestAnimationFrame(step);
    };

    // track the pointer so the pet can be clingy and chase / look at it
    const onPointer = (e: PointerEvent) => {
      s.cursorX = e.clientX; s.cursorY = e.clientY; s.lastMove = performance.now();
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      clearTimeout(bubbleTimer.current);
      clearTimeout(squashTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDown = (e: React.PointerEvent) => {
    rootRef.current?.setPointerCapture(e.pointerId);
    s.held = true;
    s.dragging = false;
    s.grabX = e.clientX - s.x;
    s.grabY = e.clientY - s.y;
    s.px = e.clientX; s.py = e.clientY;
    s.plx = e.clientX; s.ply = e.clientY; s.pt = performance.now();
    s.downCX = e.clientX; s.downCY = e.clientY;
    rootRef.current?.classList.add("is-held");
  };

  const onMove = (e: React.PointerEvent) => {
    if (!s.held) return;
    const now = performance.now();
    const dt = Math.max(0.001, (now - s.pt) / 1000);
    s.pvx = (e.clientX - s.plx) / dt;
    s.pvy = (e.clientY - s.ply) / dt;
    s.plx = e.clientX; s.ply = e.clientY; s.pt = now;
    s.px = e.clientX; s.py = e.clientY;
    if (!s.dragging && Math.hypot(e.clientX - s.downCX, e.clientY - s.downCY) > 5) {
      s.dragging = true;
      if (menuOpenRef.current) setMenuOpen(false);
      say(Math.random() > 0.5 ? "put me down!" : "wheee!", 4000);
    }
  };

  const onUp = (e: React.PointerEvent) => {
    if (!s.held) return;
    s.held = false;
    rootRef.current?.classList.remove("is-held");
    rootRef.current?.releasePointerCapture?.(e.pointerId);
    if (s.dragging) {
      s.vx = clamp(s.pvx, -1500, 1500);
      s.vy = clamp(s.pvy, -1700, 1700);
      s.mode = "idle";
      s.modeUntil = performance.now() + 700;
    } else {
      setMenuOpen((v) => !v);
      if (Math.random() > 0.4) say(pick(HAPPY), 1400);
    }
    s.dragging = false;
  };

  return (
    <div className="buddy-stage" aria-hidden>
      <div className="buddy" ref={rootRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp}>
        <AnimatePresence>
          {bubble && (
            <motion.div
              className="buddy__bubble"
              initial={{ opacity: 0, y: 6, scale: 0.7 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.7 }}
              transition={{ type: "spring", stiffness: 500, damping: 26 }}
            >
              {bubble}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="buddy__menu"
              initial={{ opacity: 0, y: 8, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 460, damping: 26 }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              {HATS.map((h) => (
                <button
                  key={h.key}
                  className={`buddy__hat-btn${hat === h.key ? " is-active" : ""}`}
                  aria-label={h.label}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    setHat(h.key);
                    setMenuOpen(false);
                    say("ooh, nice!", 1500);
                  }}
                >
                  {h.key === "none" ? <span className="buddy__none">∅</span> : <Hat type={h.key} />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="buddy__flip" ref={flipRef}>
          <div className="buddy__char">
            <span className="buddy__hat-slot">
              <Hat type={hat} />
            </span>
            <div className="buddy__body">
              <div className="buddy__eyes">
                <i />
                <i />
              </div>
            </div>
            <div className="buddy__legs">
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
