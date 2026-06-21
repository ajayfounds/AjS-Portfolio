"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import Magnetic from "./Magnetic";
import OrnateCursor from "./OrnateCursor";
import { site, seedVisitors, VISITOR_COLORS, mulberry32 } from "@/lib/data";

const firstName = site.name.split(" ")[0];

// deterministic hand-drawn-looking signature (matches the gallery)
function sigPath(seed: number) {
  const rng = mulberry32(seed ^ 0x9e3779b9);
  const n = 4 + Math.floor(rng() * 4);
  let x = 6 + rng() * 8;
  const pts: [number, number][] = [[x, 16 + (rng() - 0.5) * 16]];
  for (let i = 0; i < n; i++) { x += 9 + rng() * 16; pts.push([Math.min(x, 94), 6 + rng() * 22]); }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1]; const [cx, cy] = pts[i];
    d += ` Q ${px.toFixed(1)} ${cy.toFixed(1)} ${((px + cx) / 2).toFixed(1)} ${((py + cy) / 2).toFixed(1)}`;
  }
  return d;
}

// sparkle burst used when the cards dissolve into the site
const SPARKS = [
  { x: -160, y: -30, c: "#cb7836" }, { x: 170, y: -55, c: "#168b9d" },
  { x: -100, y: 80, c: "#bf5a7a" }, { x: 120, y: 90, c: "#2a8f50" },
  { x: 0, y: -100, c: "#e8c84a" }, { x: 70, y: -8, c: "#cb7836" }, { x: -50, y: -70, c: "#168b9d" }
];

type EnterCardData = { color: string; name: string; no: string; issued: string; matrix: string; sig?: string | null; seed?: number };

function EnterCard({ d, dx, center, phase }: { d: EnterCardData; dx: number; center?: boolean; phase: "in" | "out" }) {
  const c = VISITOR_COLORS[d.color] ?? { bg: "#2a8f50", fg: "#f3f1eb" };
  return (
    <motion.div
      className={`vcard entcard${center ? " entcard--center" : ""}`}
      style={{ background: c.bg, color: c.fg }}
      initial={{ opacity: 0, x: dx, scale: 0.9 }}
      animate={phase === "out" ? { opacity: 0, scale: 0.55, y: -26 } : { opacity: 1, x: 0, scale: center ? 1 : 0.94 }}
      transition={phase === "out" ? { duration: 0.4, ease: [0.7, 0, 0.84, 0] } : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: center ? 0.1 : 0 }}
    >
      <pre className="vcard__matrix" aria-hidden>{d.matrix}</pre>
      <div className="vcard__brand-row"><span className="vcard__brand">{firstName}&apos;s World</span></div>
      <div className="vcard__mid">
        <span><i className="vcard__label">Visitor</i><span className="vcard__value vcard__name">{d.name}</span></span>
        <span><i className="vcard__label">Issued on</i><span className="vcard__value">{d.issued}</span></span>
      </div>
      <div className="vcard__foot"><span className="vcard__no">No. {d.no}</span><span className="vcard__sign">X<i /></span></div>
      {d.sig
        ? <img className="gcard__sigimg" src={d.sig} alt="" aria-hidden />
        : (typeof d.seed === "number" && (
          <svg className="gcard__sig" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden>
            <path d={sigPath(d.seed)} fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ))}
    </motion.div>
  );
}

const STAR_COLORS = [
  "rgba(243,241,235,0.9)", "rgba(243,241,235,0.9)", "rgba(243,241,235,0.9)", "rgba(243,241,235,0.9)",
  "#cb7836", "#e8c84a", "#168b9d", "#bf5a7a"
];

const ADJ = ["MULBERRY", "CRIMSON", "VELVET", "AMBER", "COBALT", "HAZEL", "MARIGOLD", "JADE", "SABLE", "INDIGO", "CORAL", "SAGE", "RUSSET", "AZURE", "PLUM", "SALT", "PRIMROSE"];
const NOUN = ["QUEEN", "WANDERER", "COMET", "FOX", "ORACLE", "NOMAD", "PHOENIX", "SPARROW", "VOYAGER", "MUSE", "FALCON", "DREAMER", "RANGER", "SCRIBE", "PILGRIM", "LETTER", "THIMBLE", "OWLET"];
function pick<T>(a: T[]): T {
  return a[Math.floor(Math.random() * a.length)];
}
const randName = () => `${pick(ADJ)} ${pick(NOUN)}`;
const randNo = () => String(Math.floor(Math.random() * 10000)).padStart(4, "0");

type Swatch = { key: string; bg: string; fg: string };
const SWATCHES: Swatch[] = [
  { key: "teal", bg: "#168b9d", fg: "#f3f1eb" },
  { key: "green", bg: "#2a8f50", fg: "#f3f1eb" },
  { key: "pink", bg: "#bf5a7a", fg: "#f3f1eb" },
  { key: "orange", bg: "#cb7836", fg: "#f3f1eb" }
];

// dot-matrix starburst — regenerated for a shimmering effect
const M_COLS = 26;
const M_ROWS = 15;
const M_CHARS = ["·", "˙", ":", "+", "x", "*", "▪"];
function genMatrix() {
  let out = "";
  for (let r = 0; r < M_ROWS; r++) {
    for (let c = 0; c < M_COLS; c++) {
      const dx = (c - M_COLS / 2) / (M_COLS / 2);
      const dy = (r - M_ROWS / 2) / (M_ROWS / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ang = Math.atan2(dy, dx);
      const ray = Math.pow(Math.abs(Math.cos(ang * 3)), 3); // 6-point burst
      const density = Math.max(0, (1 - dist) * 0.55 + ray * (1 - dist) * 0.8);
      out += Math.random() < density ? M_CHARS[Math.floor(Math.random() * M_CHARS.length)] : " ";
    }
    out += "\n";
  }
  return out;
}

const RefreshIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M23 4v6h-6M1 20v-6h6" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);
const PenIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
);
const EraserIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 21h10M5 13l6-6 7 7-5 5H8z" />
  </svg>
);

export default function Intro() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<"intro" | "card" | "enter">("intro");
  const [enterPhase, setEnterPhase] = useState<"in" | "out">("in");
  const [userSig, setUserSig] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState(() => randName());
  const [no] = useState(() => randNo());
  const [swatch, setSwatch] = useState<Swatch>(SWATCHES[1]);
  const [matrix, setMatrix] = useState(genMatrix);
  const [penMode, setPenMode] = useState(false);
  const [hasInk, setHasInk] = useState(false);
  const router = useRouter();

  // orb cursor (intro step)
  const orbX = useMotionValue(-200);
  const orbY = useMotionValue(-200);
  const ox = useSpring(orbX, { stiffness: 350, damping: 30, mass: 0.5 });
  const oy = useSpring(orbY, { stiffness: 350, damping: 30, mass: 0.5 });

  // card 3D tilt
  const tiltX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warpRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  const issued = useMemo(() => {
    const d = new Date();
    const p = (n: number) => String(n).padStart(2, "0");
    return `${p(d.getMonth() + 1)}/${p(d.getDate())}/${String(d.getFullYear()).slice(2)}`;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sessionStorage.getItem("intro-seen")) setShow(true);
  }, []);

  // "Sign the guestbook" (from the Visitor Gallery) opens the card step directly
  useEffect(() => {
    const open = () => {
      setName(randName());
      setStep("card");
      setShow(true);
    };
    window.addEventListener("open-guestbook", open);
    return () => window.removeEventListener("open-guestbook", open);
  }, []);

  useEffect(() => {
    if (!show) return;
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, [show]);

  // shimmer the dot-matrix while on the card step
  useEffect(() => {
    if (!show || step !== "card") return;
    const id = setInterval(() => setMatrix(genMatrix()), 600);
    return () => clearInterval(id);
  }, [show, step]);

  // orb cursor tracking + hide default cursor during the dark intro
  useEffect(() => {
    if (!show || step !== "intro") return;
    document.body.classList.add("orb-active");
    const move = (e: MouseEvent) => {
      orbX.set(e.clientX);
      orbY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("orb-active");
    };
  }, [show, step, orbX, orbY]);

  // hyperspace warp — seamless starfield streaking out from centre (canvas)
  useEffect(() => {
    if (!show) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = warpRef.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;

    const PALETTE = ["#f3f1eb", "#f3f1eb", "#f3f1eb", "#cb7836", "#168b9d", "#e8c84a", "#bf5a7a"];
    const COUNT = 240;
    let w = 0, h = 0, cx = 0, cy = 0, raf = 0, last = performance.now();
    type Star = { x: number; y: number; z: number; pz: number; c: string };
    const stars: Star[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
    };
    const spawn = (s: Star, fresh = false) => {
      s.x = (Math.random() - 0.5) * w;
      s.y = (Math.random() - 0.5) * h;
      s.z = fresh ? Math.random() * w : w;
      s.pz = s.z;
      s.c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    };
    resize();
    for (let i = 0; i < COUNT; i++) { const s = { x: 0, y: 0, z: 0, pz: 0, c: "#fff" }; spawn(s, true); stars.push(s); }

    const draw = (t: number) => {
      const dt = Math.min(40, t - last); last = t;
      ctx.fillStyle = "rgba(21,20,15,0.32)"; // motion-trail fade over the intro bg
      ctx.fillRect(0, 0, w, h);
      // warp speed eases along a smooth ~10s curve — never extreme fast or slow
      const factor = 0.9 + 0.2 * Math.sin(t * 0.0006); // 0.7 .. 1.1
      const step = (w * 0.014 * factor * dt) / 16;
      for (const s of stars) {
        s.pz = s.z; s.z -= step;
        if (s.z < 1) { spawn(s); continue; }
        const k = 130 / s.z, px = cx + s.x * k, py = cy + s.y * k;
        const k2 = 130 / s.pz, ox = cx + s.x * k2, oy = cy + s.y * k2;
        if (px < -20 || px > w + 20 || py < -20 || py > h + 20) { spawn(s); continue; }
        const f = 1 - s.z / w;
        ctx.strokeStyle = s.c;
        ctx.globalAlpha = Math.min(1, f * 1.3);
        ctx.lineWidth = Math.max(0.4, f * 2.2);
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(px, py); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [show]);

  const stars = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 2 + 1, delay: Math.random() * 4, duration: 2.5 + Math.random() * 3,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)]
      })),
    []
  );

  const onCardMove = (e: React.MouseEvent) => {
    if (penMode) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    tiltY.set(dx * 9);
    tiltX.set(-dy * 9);
  };
  const onCardLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // signature canvas
  const canvasPoint = (e: React.PointerEvent) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
  };
  const startDraw = (e: React.PointerEvent) => {
    if (!penMode) return;
    drawing.current = true;
    last.current = canvasPoint(e);
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const moveDraw = (e: React.PointerEvent) => {
    if (!penMode || !drawing.current) return;
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const p = canvasPoint(e);
    ctx.strokeStyle = swatch.fg;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasInk) setHasInk(true);
  };
  const endDraw = () => {
    drawing.current = false;
    last.current = null;
  };
  const clearInk = () => {
    const c = canvasRef.current;
    if (c) c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    setHasInk(false);
  };

  // keep canvas pixel resolution synced to its display size (crisp strokes)
  useEffect(() => {
    if (!show || step !== "card") return;
    const sync = () => {
      const c = canvasRef.current;
      if (!c) return;
      const r = c.getBoundingClientRect();
      if (r.width && (c.width !== Math.round(r.width) || c.height !== Math.round(r.height))) {
        c.width = Math.round(r.width);
        c.height = Math.round(r.height);
      }
    };
    const raf = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", sync);
    };
  }, [show, step]);

  // Skip Intro → straight to the site
  const dismiss = () => {
    sessionStorage.setItem("intro-seen", "1");
    setShow(false);
    router.push("/");
  };

  // Enter → play the "card joins the gallery → dissolve into the site" transition
  const beginEnter = () => {
    let sig: string | null = null;
    try {
      sig = canvasRef.current?.toDataURL() ?? null;
      localStorage.setItem("visitor-card", JSON.stringify({ name, color: swatch.key, no, issued, sig }));
    } catch {
      /* ignore */
    }
    setUserSig(sig);
    setEnterPhase("in");
    setStep("enter");
  };

  // the 3 cards shown during the enter transition (your card centre, two neighbours)
  const enterSet = useMemo(() => {
    if (step !== "enter") return null;
    return {
      left: { ...seedVisitors[6], matrix: genMatrix() } as EnterCardData,
      center: { color: swatch.key, name: name || "VISITOR", no, issued, sig: userSig, matrix: genMatrix() } as EnterCardData,
      right: { ...seedVisitors[13], matrix: genMatrix() } as EnterCardData
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // sequence: hold the row, then dissolve + reveal the site
  useEffect(() => {
    if (step !== "enter") return;
    setEnterPhase("in");
    const t1 = setTimeout(() => setEnterPhase("out"), 1050);
    const t2 = setTimeout(() => {
      sessionStorage.setItem("intro-seen", "1");
      setShow(false);
      router.push("/");
    }, 1900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [step, router]);

  const reshuffle = () => {
    setName(randName());
    setSwatch(pick(SWATCHES));
  };

  const fadeUp = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 } };

  return (
    <>
      {/* INTRO layer — stays mounted behind the onboarding so the iris reveals over it */}
      <AnimatePresence>
        {show && (
          <motion.div
            key="intro"
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            <canvas className="intro__warp" ref={warpRef} aria-hidden />

            <motion.div className="intro__cursor" style={{ x: ox, y: oy }} aria-hidden>
              <OrnateCursor variant="azure" />
            </motion.div>

            <div className="intro__stars" aria-hidden>
              {stars.map((s) => (
                <span key={s.id} style={{ top: `${s.top}%`, left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`, background: s.color, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
              ))}
            </div>

            <div className="intro__shoots" aria-hidden>
              <span className="intro__shoot" />
              <span className="intro__shoot" />
              <span className="intro__shoot" />
            </div>

            <div className="intro__center">
              <motion.p className="intro__eyebrow" {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>Welcome to</motion.p>
              <motion.h1 className="intro__title" {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}>{firstName}&apos;s World</motion.h1>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.5 }}>
                <Magnetic strength={0.4}>
                  <button className="intro__explore" onClick={() => setStep("card")}>Explore <span aria-hidden>→</span></button>
                </Magnetic>
              </motion.div>
              <motion.button className="intro__skip" onClick={dismiss} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>Skip Intro</motion.button>
              <motion.p className="intro__tagline" {...fadeUp} transition={{ duration: 0.6, delay: 0.85 }}>
                <b>Discoveries</b> are out there, waiting<br />to be made. Why not <b>by you?</b>
              </motion.p>
            </div>

            <div className="intro__status">
              <span className="intro__time">{time || "—"}</span>
              <span className="intro__system"><i className="intro__dot" />All systems operational</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ONBOARDING layer — iris-expands from the centre over the intro (no lag) */}
      <AnimatePresence>
        {show && step === "card" && (
          <motion.div
            key="card"
            className="welcome"
            initial={{ clipPath: "circle(0% at 50% 47%)" }}
            animate={{ clipPath: "circle(150% at 50% 47%)" }}
            exit={{ opacity: 0 }}
            transition={{ clipPath: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.4 } }}
          >
            <button className="welcome__back" onClick={() => setStep("intro")}>← Back</button>

            <motion.div
              className="welcome__inner"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="welcome__hi">
                Welcome, visitor.<span>I hope you enjoy your time here.</span>
              </p>

              <div className="welcome__field">
                <label className="welcome__label" htmlFor="visitor-name">Name:</label>
                <div className="welcome__input-wrap">
                  <input id="visitor-name" className="welcome__input" value={name} maxLength={22} onChange={(e) => setName(e.target.value.toUpperCase())} />
                  <button className="welcome__shuffle" onClick={() => setName(randName())} aria-label="Generate a new name"><RefreshIcon /></button>
                </div>
              </div>

              <div className="vcard-float">
                <motion.div
                  className="vcard-float__bob"
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <motion.div
                    ref={cardRef}
                    className="vcard"
                    style={{ background: swatch.bg, color: swatch.fg, rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
                    onMouseMove={onCardMove}
                    onMouseLeave={onCardLeave}
                  >
                    <pre className="vcard__matrix" aria-hidden>{matrix}</pre>

                    <div className="vcard__brand-row">
                      <span className="vcard__brand">{firstName}&apos;s World</span>
                      {penMode && hasInk && (
                        <button className="vcard__clear" onClick={clearInk}>Clear</button>
                      )}
                    </div>

                    <div className="vcard__mid">
                      <span><i className="vcard__label">Visitor</i><span className="vcard__value vcard__name">{name || "—"}</span></span>
                      <span><i className="vcard__label">Issued on</i><span className="vcard__value">{issued}</span></span>
                    </div>

                    <div className="vcard__foot">
                      <span className="vcard__no">No. {no}</span>
                      <span className="vcard__sign">X<i /></span>
                    </div>

                    <canvas
                      ref={canvasRef}
                      className="vcard__canvas"
                      style={{ pointerEvents: penMode ? "auto" : "none", cursor: penMode ? "crosshair" : "auto" }}
                      onPointerDown={startDraw}
                      onPointerMove={moveDraw}
                      onPointerUp={endDraw}
                      onPointerLeave={endDraw}
                    />
                  </motion.div>
                </motion.div>
              </div>

              <div className="welcome__swatches">
                {SWATCHES.map((s) => (
                  <button key={s.key} className={`swatch${swatch.key === s.key ? " is-active" : ""}`} style={{ background: s.bg }} onClick={() => setSwatch(s)} aria-label={`${s.key} card`} />
                ))}
                <button className={`welcome__tool${penMode ? " is-active" : ""}`} onClick={() => setPenMode((v) => !v)} aria-label="Sign the card"><PenIcon /></button>
                <button className="welcome__tool" onClick={clearInk} aria-label="Erase signature"><EraserIcon /></button>
              </div>

              <Magnetic strength={0.35}><button className="welcome__enter" onClick={beginEnter}>Enter <span aria-hidden>→</span></button></Magnetic>

              <p className="welcome__note">Your card will appear in the visitor gallery after review.</p>
            </motion.div>

            <div className="welcome__status">
              <span className="welcome__time">{time || "—"}</span>
              <span className="welcome__system"><i className="welcome__dot" />All systems operational</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ENTER transition — card joins the gallery row, then dissolves into the site */}
      <AnimatePresence>
        {show && step === "enter" && enterSet && (
          <motion.div
            key="enter"
            className="welcome-exit"
            initial={{ opacity: 1 }}
            animate={{ opacity: enterPhase === "out" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: enterPhase === "out" ? 0.35 : 0 }}
          >
            <div className="entrow">
              <EnterCard d={enterSet.left} dx={-70} phase={enterPhase} />
              <EnterCard d={enterSet.center} dx={0} center phase={enterPhase} />
              <EnterCard d={enterSet.right} dx={70} phase={enterPhase} />
            </div>
            <span className="entdot" />
            {enterPhase === "out" && SPARKS.map((sp, i) => (
              <motion.span
                key={i}
                className="entspark"
                style={{ background: sp.c }}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1.1, 0.3], x: sp.x, y: sp.y }}
                transition={{ duration: 0.6, delay: 0.08 + i * 0.03, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
