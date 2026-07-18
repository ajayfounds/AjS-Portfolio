"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import Magnetic from "./Magnetic";
import { site, seedVisitors, VISITOR_COLORS, mulberry32 } from "@/lib/data";

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

type EnterCardData = { color: string; name: string; no: string; issued: string; matrix: string; sig?: string | null; seed?: number };

function EnterCard({ d, dx, center, phase }: { d: EnterCardData; dx: number; center?: boolean; phase: "in" | "out" }) {
  const c = VISITOR_COLORS[d.color] ?? { bg: "#2a8f50", fg: "#f3f1eb" };
  return (
    <motion.div
      className={`vcard entcard${center ? " entcard--center" : ""}`}
      style={{ background: c.bg, color: c.fg }}
      initial={{ opacity: 0, x: dx, y: center ? 90 : 18, scale: center ? 0.8 : 0.86 }}
      animate={
        phase === "out"
          ? center
            ? { opacity: 0, scale: 0.97, y: -6, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.12 } } // lingers, fades last
            : { opacity: 0, scale: 0.9, y: 12, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } } // gently recede
          : { opacity: 1, x: 0, y: 0, scale: center ? 1.04 : 0.92, transition: { type: "spring", stiffness: 200, damping: 24, delay: center ? 0.05 : 0.16 } }
      }
    >
      <pre className="vcard__matrix" aria-hidden>{d.matrix}</pre>
      <div className="vcard__brand-row"><span className="vcard__brand">{site.brand}</span></div>
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

// tagline split into words so each can light up near the cursor
const TAGLINE: { t: string; b?: boolean }[] = [
  { t: "Discoveries", b: true }, { t: "are" }, { t: "out" }, { t: "there," }, { t: "waiting" },
  { t: "\n" },
  { t: "to" }, { t: "be" }, { t: "made." }, { t: "Why" }, { t: "not" }, { t: "by", b: true }, { t: "you?", b: true }
];

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
  const [penMode, setPenMode] = useState(true); // pen pre-selected — visitors can sign right away
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
  const taglineRef = useRef<HTMLParagraphElement>(null);
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

  // orb cursor tracking + proximity glow on the tagline words (objects react to cursor)
  useEffect(() => {
    if (!show || step !== "intro") return;
    document.body.classList.add("orb-active");
    const move = (e: MouseEvent) => {
      orbX.set(e.clientX);
      orbY.set(e.clientY);
      const words = taglineRef.current?.querySelectorAll<HTMLElement>(".intro__word");
      if (!words) return;
      for (const el of words) {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
        el.style.setProperty("--lit", Math.max(0, 1 - d / 150).toFixed(2));
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("orb-active");
    };
  }, [show, step, orbX, orbY]);

  // calm, sparse starfield — tiny stars with a slow twinkle (no warp)
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i, top: Math.random() * 100, left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.8, delay: Math.random() * 6, duration: 3.5 + Math.random() * 4,
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
    const t1 = setTimeout(() => setEnterPhase("out"), 1150);
    const t2 = setTimeout(() => {
      sessionStorage.setItem("intro-seen", "1");
      setShow(false);
      router.push("/");
    }, 2150);
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
            animate={{ opacity: step === "enter" && enterPhase === "out" ? 0 : 1 }}
            exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div className="intro__cursor" style={{ x: ox, y: oy }} aria-hidden>
              <span className="intro__moon" />
            </motion.div>

            <div className="intro__stars" aria-hidden>
              {stars.map((s) => (
                <span key={s.id} style={{ top: `${s.top}%`, left: `${s.left}%`, width: `${s.size}px`, height: `${s.size}px`, background: s.color, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }} />
              ))}
            </div>

            <div className="intro__center">
              <motion.p className="intro__eyebrow" {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }}>Welcome to</motion.p>
              <motion.h1 className="intro__title brandmark" {...fadeUp} transition={{ duration: 0.7, delay: 0.3 }}>{site.brand}</motion.h1>
              <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.5 }}>
                <Magnetic strength={0.4}>
                  <button className="intro__explore" onClick={() => setStep("card")}>Explore <span aria-hidden>→</span></button>
                </Magnetic>
              </motion.div>
              <motion.button className="intro__skip" onClick={dismiss} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>Skip Intro</motion.button>
              <motion.p ref={taglineRef} className="intro__tagline" {...fadeUp} transition={{ duration: 0.6, delay: 0.85 }}>
                {TAGLINE.map((w, i) =>
                  w.t === "\n" ? (
                    <br key={i} />
                  ) : (
                    <span key={i} className={`intro__word${w.b ? " is-strong" : ""}`}>{w.t}{" "}</span>
                  )
                )}
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
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.26 }}
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

              <motion.div
                className="vcard-float"
                initial={{ opacity: 0, scale: 0.8, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 170, damping: 17, delay: 0.42 }}
              >
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
                      <span className="vcard__brand">{site.brand}</span>
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
              </motion.div>

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
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: enterPhase === "out" ? 0 : 1, scale: enterPhase === "out" ? 1.015 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1], delay: enterPhase === "out" ? 0.15 : 0 }}
          >
            <div className="entrow">
              <EnterCard d={enterSet.left} dx={-72} phase={enterPhase} />
              <EnterCard d={enterSet.center} dx={0} center phase={enterPhase} />
              <EnterCard d={enterSet.right} dx={72} phase={enterPhase} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
