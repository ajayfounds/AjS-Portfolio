"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { site } from "@/lib/data";

const OPEN_EVENT = "contact:open";

type Draft = { name: string; subject: string; body: string };

const DRAFTS: Draft[] = [
  {
    name: "A role on your team",
    subject: "A product design role on our team",
    body: "Hi Ajay,\n\nI came across your portfolio and would like to talk about a product design role on our team.\n\nThe way you work through a problem before the screens caught my attention. Happy to share more about the role and what we're looking for.\n\nWould you be open to a conversation?"
  },
  {
    name: "A project in mind",
    subject: "A project I'd love to discuss",
    body: "Hi Ajay,\n\nI have a product in mind and think your approach to design could be a good fit.\n\nI'd love to share the problem we're working on and hear how you'd approach it.\n\nLet me know if you're open to a chat."
  },
  {
    name: "Let's make something",
    subject: "Want to make something together?",
    body: "Hi Ajay,\n\nI enjoyed going through your work and have an idea we could build together.\n\nWould you be up for comparing notes and seeing where it goes?"
  },
  {
    name: "Just saying hello",
    subject: "Hello from your portfolio",
    body: "Hi Ajay,\n\nJust stopping by to say I enjoyed your portfolio.\n\n"
  }
];

/** Open the letter from anywhere (e.g. the project dock), flying out of `from`. */
export function openContactLetter(from?: Element | null) {
  const r = from?.getBoundingClientRect();
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: r ? { x: r.left, y: r.top, w: r.width, h: r.height } : null }));
}

type Box = { x: number; y: number; w: number; h: number };

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// A two-sided envelope built in real 3D: flap side (with a letter inside) and address side.
function Envelope3D() {
  return (
    <div className="e3">
      <div className="e3__side e3__side--front">
        <svg className="e3__inside" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
          <rect x="0.5" y="0.5" width="159" height="99" rx="6" />
        </svg>
        <div className="e3__letter" aria-hidden><i /><i /><i /><i /></div>
        <svg className="e3__pocket" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
          <path className="e3-paper" d="M6.5 0.5 L80 66 L153.5 0.5 Q159.5 0.5 159.5 6.5 V93.5 Q159.5 99.5 153.5 99.5 H6.5 Q0.5 99.5 0.5 93.5 V6.5 Q0.5 0.5 6.5 0.5 Z" />
          <path className="e3-line" d="M1 98 L66 56 M159 98 L94 56" />
        </svg>
        <div className="e3__flap" aria-hidden>
          <svg className="e3__flap-out" viewBox="0 0 160 62" preserveAspectRatio="none">
            <path className="e3-paper" d="M0.5 0.5 H159.5 L84 59 Q80 62 76 59 Z" />
          </svg>
          <svg className="e3__flap-in" viewBox="0 0 160 62" preserveAspectRatio="none">
            <path d="M0.5 0.5 H159.5 L84 59 Q80 62 76 59 Z" />
          </svg>
        </div>
      </div>
      <div className="e3__side e3__side--back" aria-hidden>
        <svg viewBox="0 0 160 100" preserveAspectRatio="none">
          <rect className="e3-paper" x="0.5" y="0.5" width="159" height="99" rx="6" />
          <rect className="e3-line" x="128" y="10" width="21" height="25" rx="2" />
          <path className="e3-line" d="M131 14h15M131 31h15" />
          <circle className="e3-line" cx="118" cy="22" r="8" />
          <path className="e3-line" d="M104 18c4 2 8 2 12 0M104 25c4 2 8 2 12 0" />
          <path className="e3-line" d="M52 60h56M52 68h44M52 76h50" />
        </svg>
      </div>
    </div>
  );
}

export default function ContactLetter() {
  const [sel, setSel] = useState(0);
  const [hot, setHot] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [drafts, setDrafts] = useState(DRAFTS);
  const [from, setFrom] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  const tileRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const envRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const origin = useRef<{ box: Box | null; rot: number; tileIndex: number | null }>({ box: null, rot: 0, tileIndex: null });
  const opener = useRef<HTMLElement | null>(null);
  const fromInput = useRef<HTMLInputElement>(null);
  const swapping = useRef(false);

  useEffect(() => setMounted(true), []);

  /* ---------------- the fan in the tile ---------------- */

  // pose of each envelope in the fan; the picked one rises toward the viewer
  // fan geometry scales with the envelope size, so it holds at any width
  // the whole fan (spread + lift + open flap) is ~440 units wide and ~250 tall at
  // unit 1, so size it from the panel's real width and it always fits the frame
  const [unit, setUnit] = useState(1);
  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    const measure = () => setUnit(Math.max(0.62, Math.min(1.5, el.offsetWidth / 440)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const pose = useCallback((i: number, s: number, lifted: boolean) => {
    const off = i - 1.5, u = unit;
    const p = { x: off * 62 * u, y: Math.abs(off) * 6 * u, rotation: off * 6, rotationY: -off * 8, z: -Math.abs(off) * 24 * u, scale: 1 };
    if (i === s) {
      Object.assign(p, { y: p.y - (lifted ? 32 : 18) * u, z: (lifted ? 96 : 50) * u, rotation: p.rotation * 0.25, rotationY: 0, scale: lifted ? 1.12 : 1.04 });
    } else {
      p.x += (i < s ? -18 : 18) * u;
      if (lifted) { p.y += 8 * u; p.scale = 0.93; p.z -= 20 * u; }
    }
    return p;
  }, [unit]);

  // which envelope the pointer is over, by horizontal zone, so a raised
  // envelope never hides its neighbours from the pointer
  const zoneOf = useCallback((clientX: number) => {
    const r = stackRef.current?.getBoundingClientRect();
    if (!r || r.width === 0) return 0;
    return Math.min(DRAFTS.length - 1, Math.max(0, Math.floor(((clientX - r.left) / r.width) * DRAFTS.length)));
  }, []);

  useLayoutEffect(() => {
    envRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { ...pose(i, sel, hot && !open), zIndex: i === sel ? 10 : 4 - Math.abs(i - sel), duration: reduced() ? 0 : 0.7, ease: "expo.out", overwrite: "auto" });
      const flap = el.querySelector(".e3__flap");
      const letter = el.querySelector(".e3__letter");
      const peek = hot && i === sel && !open;
      gsap.to(flap, { rotationX: peek ? 150 : 0, duration: reduced() ? 0 : 0.6, ease: "power3.inOut", overwrite: "auto" });
      gsap.to(letter, { yPercent: peek ? -34 : 0, duration: reduced() ? 0 : 0.55, ease: "power3.out", delay: peek ? 0.14 : 0, overwrite: "auto" });
    });
  }, [sel, hot, open, pose]);

  // the stack follows the pointer in 3D
  useEffect(() => {
    const tile = tileRef.current, stack = stackRef.current;
    if (!tile || !stack || reduced()) return;
    const rx = gsap.quickTo(stack, "rotationX", { duration: 0.7, ease: "power3.out" });
    const ry = gsap.quickTo(stack, "rotationY", { duration: 0.7, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = tile.getBoundingClientRect();
      const sr = stack.getBoundingClientRect();
      if (e.clientY >= sr.top && e.clientY <= sr.bottom) setSel(zoneOf(e.clientX));
      rx(-((e.clientY - r.top) / r.height - 0.5) * 16);
      ry(((e.clientX - r.left) / r.width - 0.5) * 22);
    };
    const leave = () => { rx(0); ry(0); };
    tile.addEventListener("pointermove", move);
    tile.addEventListener("pointerleave", leave);
    return () => { tile.removeEventListener("pointermove", move); tile.removeEventListener("pointerleave", leave); };
  }, [zoneOf]);

  // one-time deal-in when the footer first scrolls into view
  useEffect(() => {
    const stack = stackRef.current;
    if (!stack || reduced()) return;
    const faces = stack.querySelectorAll(".cl-fan__env > .e3");
    const ctx = gsap.context(() => {
      gsap.set(faces, { y: 90, rotationX: -60, opacity: 0 });
    }, stack);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      ctx.add(() => gsap.to(faces, {
        y: 0, rotationX: 0, opacity: 1, duration: 0.75, ease: "expo.out", stagger: 0.06,
        onComplete: () => {
          // a single lift of the front envelope says "pick me"
          const front = envRefs.current[0]?.querySelector(".e3");
          if (front) gsap.to(front, { y: -16, duration: 0.42, ease: "power2.out", yoyo: true, repeat: 1, delay: 0.2 });
        }
      }));
    }, { rootMargin: "0px 0px 120px 0px" });
    io.observe(stack);
    return () => { io.disconnect(); ctx.revert(); };
  }, []);

  /* ---------------- the letter ---------------- */

  const show = useCallback((index: number, box: Box | null, rot: number, tileIndex: number | null) => {
    if (open) return;
    opener.current = (document.activeElement as HTMLElement) ?? null;
    origin.current = { box, rot, tileIndex };
    setActive(index);
    setCopied(false);
    setOpen(true);
  }, [open]);

  // build and play the opening timeline once the stage exists; closing simply rewinds it
  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!open || !stage) return;
    lenis?.stop();
    const vw = window.innerWidth, vh = window.innerHeight;
    const envW = Math.min(460, vw * 0.84);
    const b = origin.current.box;
    const start = b
      ? { x: b.x + b.w / 2 - vw / 2, y: b.y + b.h / 2 - vh / 2, scale: b.w / envW }
      : { x: 0, y: vh * 0.4, scale: 0.3 };
    const card = stage.querySelector<HTMLElement>(".cl-card")!;
    const sheetScale = (envW * 0.86) / card.offsetWidth;
    const lift = -(envW / 1.6) * 0.44;
    const rm = reduced();

    const t = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => fromInput.current?.focus({ preventScroll: true }),
      onReverseComplete: () => {
        lenis?.start();
        setOpen(false);
        opener.current?.focus?.({ preventScroll: true });
      }
    });

    if (rm) {
      t.fromTo(".cl-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0)
        .fromTo(".cl-card", { opacity: 0 }, { opacity: 1, duration: 0.25 }, 0)
        .set(".cl-fly", { opacity: 0 }, 0);
    } else {
      t.fromTo(".cl-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" }, 0)
        // arc to centre: x eases out while y eases in, so the path curves
        .fromTo(".cl-fly", { x: start.x, rotation: origin.current.rot }, { x: 0, rotation: 0, duration: 0.85, ease: "power3.out" }, 0)
        .fromTo(".cl-fly", { y: start.y }, { y: 0, duration: 0.85, ease: "back.out(1.1)" }, 0)
        .fromTo(".cl-fly", { scale: start.scale }, { scale: 1, duration: 0.85, ease: "expo.out" }, 0)
        .fromTo(".cl-fly", { opacity: 0 }, { opacity: 1, duration: 0.01 }, 0)
        // a full turn in flight shows the stamped address side, then lands flap-up
        .fromTo(".cl-fly .e3", { rotationY: 0, rotationX: 0 }, { rotationY: 360, duration: 0.85, ease: "power2.inOut" }, 0)
        .fromTo(".cl-fly .e3__flap", { rotationX: 0 }, { rotationX: 180, duration: 0.5 }, 0.78)
        .set(".cl-fly .e3__flap", { z: -1 }, 1.05)
        .fromTo(".cl-fly .e3__letter", { yPercent: 0 }, { yPercent: -58, duration: 0.45, ease: "power3.out" }, 1.08)
        .fromTo(".cl-card",
          { opacity: 0, scale: sheetScale, y: lift, rotationX: -14 },
          { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.75, ease: "expo.out" }, 1.36)
        .to(".cl-fly", { y: "+=150", rotationX: 32, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.4);
    }
    tl.current = t;
    return () => { t.kill(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const hide = useCallback(() => {
    const t = tl.current;
    if (!t) return;
    t.timeScale(1.6).reverse();
  }, []);

  // the letter tucks back into the envelope and rises with the next draft
  const page = useCallback((dir: 1 | -1) => {
    const card = stageRef.current?.querySelector(".cl-card");
    if (!card || swapping.current || tl.current?.isActive()) return;
    swapping.current = true;
    gsap.to(card, {
      y: 48, rotationX: 10, opacity: 0, scale: 0.97, duration: 0.24, ease: "power2.in",
      onComplete: () => {
        setActive((a) => (a + dir + DRAFTS.length) % DRAFTS.length);
        setCopied(false);
      }
    });
  }, []);

  useLayoutEffect(() => {
    if (!swapping.current) return;
    const card = stageRef.current?.querySelector(".cl-card");
    gsap.to(card ?? [], {
      y: 0, rotationX: 0, opacity: 1, scale: 1, duration: 0.55, ease: "expo.out",
      onComplete: () => { swapping.current = false; }
    });
  }, [active]);

  // opened from elsewhere (the project dock)
  useEffect(() => {
    const onOpen = (e: Event) => show(0, (e as CustomEvent<Box | null>).detail ?? null, 0, null);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show]);

  // keyboard: Esc closes, Tab stays inside the letter
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); hide(); return; }
      const stage = stageRef.current;
      if (e.key !== "Tab" || !stage) return;
      const f = Array.from(stage.querySelectorAll<HTMLElement>(".cl-card button, .cl-card input:not([readonly]), .cl-card textarea"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide]);

  const d = drafts[active];
  const edit = (patch: Partial<Draft>) =>
    setDrafts((all) => all.map((x, i) => (i === active ? { ...x, ...patch } : x)));
  const signed = () => (from.trim() ? `${d.body.trimEnd()}\n\n${from.trim()}` : d.body);

  const send = () => {
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(signed())}`;
  };
  const copy = () => {
    navigator.clipboard?.writeText(`To: ${site.email}\nSubject: ${d.subject}\n\n${signed()}`).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const openFromTile = (i: number) => {
    const el = envRefs.current[i];
    const r = el?.getBoundingClientRect();
    const rot = Number(gsap.getProperty(el ?? {}, "rotation")) || 0;
    show(i, r ? { x: r.left, y: r.top, w: (el?.offsetWidth ?? r.width) * Number(gsap.getProperty(el ?? {}, "scale") || 1), h: r.height } : null, rot, i);
  };

  const onFanKey = (e: React.KeyboardEvent, i: number) => {
    const n = DRAFTS.length;
    const go = (j: number) => { setSel(j); envRefs.current[j]?.focus(); };
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go((i + 1) % n); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go((i - 1 + n) % n); }
  };

  return (
    <>
      <div className="cl-tile" ref={tileRef} onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)}>
        <h2 className="cl-tile__title"><span className="cl-q" aria-hidden>“</span>Say hello<span className="cl-q" aria-hidden>”</span></h2>
        <div className="cl-stage3d" style={{ height: Math.round(250 * unit) }}>
          <div className="cl-stack" ref={stackRef} role="group" aria-label="Pick a draft to open" style={{ "--fan-ew": `${Math.round(156 * unit)}px` } as React.CSSProperties}>
            {DRAFTS.map((dr, i) => (
              <button
                key={dr.name}
                ref={(el) => { envRefs.current[i] = el; }}
                type="button"
                className={`cl-fan__env${open && origin.current.tileIndex === i ? " is-out" : ""}`}
                tabIndex={i === sel ? 0 : -1}
                aria-label={`Open draft: ${dr.name}`}
                onFocus={() => { setSel(i); setHot(true); }}
                onBlur={() => setHot(false)}
                onKeyDown={(e) => onFanKey(e, i)}
                onClick={(e) => openFromTile(e.detail === 0 ? i : zoneOf(e.clientX))}
              >
                <Envelope3D />
              </button>
            ))}
          </div>
        </div>
        <div className="cl-tile__meta">
          <span className="cl-tile__name">{DRAFTS[sel].name}</span>
          <span className="cl-sr" aria-live="polite">{sel + 1} of {DRAFTS.length}</span>
        </div>
        <p className="cl-tile__hint">Pick an envelope. Make it yours.</p>
        <div className="cl-dots" aria-hidden>
          {DRAFTS.map((dr, i) => (
            <button key={dr.name} type="button" tabIndex={-1} className={i === sel ? "is-on" : ""} onClick={() => setSel(i)} onMouseEnter={() => setSel(i)} />
          ))}
        </div>
      </div>

      {mounted && open && createPortal(
        <div className="cl-stage" ref={stageRef}>
          <div className="cl-backdrop" onClick={hide} aria-hidden />

          <div className="cl-fly" aria-hidden>
            <Envelope3D />
          </div>

          <section className="cl-card" role="dialog" aria-modal="true" aria-labelledby="cl-title">
            <header className="cl-card__top">
              <div className="cl-pager">
                <button type="button" className="cl-icon" onClick={() => page(-1)} aria-label="Previous draft">
                  <svg viewBox="0 0 24 24" aria-hidden><path d="M14.5 6 8.5 12l6 6" /></svg>
                </button>
                <span className="cl-pager__n" aria-live="polite">{active + 1} of {DRAFTS.length}</span>
                <button type="button" className="cl-icon" onClick={() => page(1)} aria-label="Next draft">
                  <svg viewBox="0 0 24 24" aria-hidden><path d="m9.5 6 6 6-6 6" /></svg>
                </button>
              </div>
              <button type="button" className="cl-icon" onClick={hide} aria-label="Close">
                <svg viewBox="0 0 24 24" aria-hidden><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></svg>
              </button>
            </header>

            <h2 className="cl-card__title" id="cl-title">{d.name}</h2>
            <p className="cl-card__sub">Edit this draft, then send it from your email app.</p>

            <div className="cl-fields">
              <label className="cl-field">
                <span>To</span>
                <input value={site.email} readOnly tabIndex={-1} />
              </label>
              <label className="cl-field">
                <span>From</span>
                <input ref={fromInput} value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Your name or email (optional)" />
              </label>
              <label className="cl-field">
                <span>Subject</span>
                <input value={d.subject} onChange={(e) => edit({ subject: e.target.value })} />
              </label>
            </div>

            <textarea className="cl-body" value={d.body} onChange={(e) => edit({ body: e.target.value })} aria-label="Message" rows={8} />

            <footer className="cl-card__foot">
              <p className="cl-card__note">Your email app opens with this draft. Choose your sending account there.</p>
              <div className="cl-card__actions">
                <button type="button" className="cl-copy" onClick={copy} aria-label="Copy draft">
                  {copied ? (
                    <svg viewBox="0 0 24 24" aria-hidden><path d="m5.5 12.5 4 4 9-9" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" /></svg>
                  )}
                  <span className="cl-copy__tip" aria-live="polite">{copied ? "Copied" : ""}</span>
                </button>
                <button type="button" className="cl-send" onClick={send}>
                  Open email app
                  <svg viewBox="0 0 24 24" aria-hidden><path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z" /></svg>
                </button>
              </div>
            </footer>
          </section>
        </div>,
        document.body
      )}
    </>
  );
}
