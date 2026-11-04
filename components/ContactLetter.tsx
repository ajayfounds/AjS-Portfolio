"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAnimate } from "framer-motion";
import { useLenis } from "lenis/react";
import { site } from "@/lib/data";

const EASE = [0.23, 1, 0.32, 1] as const;
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

// One envelope drawing, used for the tile fan and as the flying envelope's faces.
function EnvelopeFace() {
  return (
    <svg viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden>
      <rect x="0.5" y="0.5" width="159" height="99" rx="7" className="env-paper" />
      <path d="M1 3 L80 58 L159 3" className="env-line" />
      <path d="M1 98 L64 52 M159 98 L96 52" className="env-line" />
    </svg>
  );
}

export default function ContactLetter() {
  const [sel, setSel] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [drafts, setDrafts] = useState(DRAFTS);
  const [from, setFrom] = useState("");
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scope, animate] = useAnimate();
  const lenis = useLenis();
  const origin = useRef<{ box: Box | null; el: Element | null }>({ box: null, el: null });
  const opener = useRef<HTMLElement | null>(null);
  const busy = useRef(false);
  const envRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const fromInput = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  const geometry = useCallback(() => {
    const vw = window.innerWidth, vh = window.innerHeight;
    const envW = Math.min(440, vw * 0.84);
    const envH = envW / 1.6;
    return { vw, vh, envW, envH };
  }, []);

  // where the flying envelope starts / returns: the picked tile envelope, else the opener
  const originBox = useCallback((): Box | null => {
    const el = origin.current.el;
    if (el && el.isConnected) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.bottom > 0 && r.top < window.innerHeight) return { x: r.left, y: r.top, w: r.width, h: r.height };
    }
    return origin.current.box;
  }, []);

  const flyFrom = useCallback((b: Box | null) => {
    const { vw, vh, envW } = geometry();
    if (!b) return { x: 0, y: vh * 0.35, scale: 0.4 };
    return { x: b.x + b.w / 2 - vw / 2, y: b.y + b.h / 2 - vh / 2, scale: b.w / envW };
  }, [geometry]);

  const show = useCallback((index: number, el: Element | null, box: Box | null) => {
    if (open || busy.current) return;
    opener.current = (document.activeElement as HTMLElement) ?? null;
    origin.current = { el, box };
    setActive(index);
    setOpen(true);
  }, [open]);

  // run the opening choreography once the stage is in the DOM
  useEffect(() => {
    if (!open || !scope.current) return;
    busy.current = true;
    lenis?.stop();
    const f = flyFrom(originBox());
    const { envW } = geometry();
    const card = scope.current.querySelector(".cl-card") as HTMLElement;
    const sheetScale = (envW * 0.86) / card.offsetWidth;
    const lift = -geometry().envH * 0.42;
    const run = async () => {
      await animate([
        [".cl-backdrop", { opacity: [0, 1] }, { duration: 0.32, ease: EASE, at: 0 }],
        [".cl-env", { opacity: 1 }, { duration: 0.01, at: 0 }],
        [".cl-env", { x: [f.x, 0], y: [f.y, 0], scale: [f.scale, 1] }, { type: "spring", bounce: 0, duration: 0.6, at: 0 }],
        [".cl-flap", { rotateX: [0, 180] }, { duration: 0.34, ease: EASE, at: 0.52 }],
        [".cl-flap", { zIndex: 0 }, { duration: 0, at: 0.7 }],
        [".cl-sheet", { y: ["0%", "-46%"] }, { duration: 0.34, ease: EASE, at: 0.78 }],
        [".cl-card", { opacity: [0, 1] }, { duration: 0.2, ease: EASE, at: 1.04 }],
        [".cl-card", { scale: [sheetScale, 1], y: [lift, 0] }, { type: "spring", bounce: 0, duration: 0.55, at: 1.04 }],
        [".cl-env", { opacity: 0, y: 70 }, { duration: 0.32, ease: EASE, at: 1.1 }]
      ]);
      busy.current = false;
      fromInput.current?.focus({ preventScroll: true });
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const hide = useCallback(async () => {
    if (!open || busy.current || !scope.current) return;
    busy.current = true;
    const f = flyFrom(originBox());
    const { envW, envH } = geometry();
    const card = scope.current.querySelector(".cl-card") as HTMLElement;
    const sheetScale = (envW * 0.86) / card.offsetWidth;
    await animate([
      [".cl-card", { opacity: 0, scale: sheetScale, y: -envH * 0.42 }, { duration: 0.32, ease: EASE, at: 0 }],
      [".cl-env", { opacity: 1, y: 0 }, { duration: 0.3, ease: EASE, at: 0 }],
      [".cl-sheet", { y: "0%" }, { duration: 0.26, ease: EASE, at: 0.24 }],
      [".cl-flap", { zIndex: 4 }, { duration: 0, at: 0.43 }],
      [".cl-flap", { rotateX: 0 }, { duration: 0.28, ease: EASE, at: 0.44 }],
      [".cl-env", { x: f.x, y: f.y, scale: f.scale }, { type: "spring", bounce: 0, duration: 0.52, at: 0.68 }],
      [".cl-backdrop", { opacity: 0 }, { duration: 0.34, ease: EASE, at: 0.7 }]
    ]);
    busy.current = false;
    lenis?.start();
    setOpen(false);
    opener.current?.focus?.({ preventScroll: true });
  }, [open, animate, scope, flyFrom, originBox, geometry, lenis]);

  // the letter tucks back into the envelope and rises with the next draft
  const page = useCallback(async (dir: 1 | -1) => {
    if (busy.current || !scope.current) return;
    busy.current = true;
    await animate(".cl-card", { y: 36, opacity: 0, scale: 0.97 }, { duration: 0.18, ease: EASE });
    setActive((a) => (a + dir + DRAFTS.length) % DRAFTS.length);
    setCopied(false);
    animate(".cl-card", { opacity: [0, 1] }, { duration: 0.2, ease: EASE });
    await animate(".cl-card", { y: [36, 0], scale: [0.97, 1] }, { type: "spring", bounce: 0, duration: 0.42 });
    busy.current = false;
  }, [animate, scope]);

  // opened from elsewhere (the project dock)
  useEffect(() => {
    const onOpen = (e: Event) => show(0, null, (e as CustomEvent<Box | null>).detail ?? null);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [show]);

  // keyboard: Esc closes, Tab stays inside the letter
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); hide(); return; }
      if (e.key !== "Tab" || !scope.current) return;
      const f = Array.from((scope.current as HTMLElement).querySelectorAll<HTMLElement>(".cl-card button, .cl-card input, .cl-card textarea"));
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, hide, scope]);

  const d = drafts[active];
  const edit = (patch: Partial<Draft>) =>
    setDrafts((all) => all.map((x, i) => (i === active ? { ...x, ...patch } : x)));
  const signed = () => (from.trim() ? `${d.body.trimEnd()}\n\n${from.trim()}` : d.body);

  const send = () => {
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(signed())}`;
  };
  const copy = () => {
    const text = `To: ${site.email}\nSubject: ${d.subject}\n\n${signed()}`;
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const onFanKey = (e: React.KeyboardEvent, i: number) => {
    const n = DRAFTS.length;
    const go = (j: number) => { setSel(j); envRefs.current[j]?.focus(); };
    if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); go((i + 1) % n); }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); go((i - 1 + n) % n); }
  };

  return (
    <>
      <div className="cl-tile">
        <p className="cl-tile__title">Say hello</p>
        <div className="cl-fan" role="group" aria-label="Pick a draft to open">
          {DRAFTS.map((dr, i) => (
            <button
              key={dr.name}
              ref={(el) => { envRefs.current[i] = el; }}
              type="button"
              className={`cl-fan__env${i === sel ? " is-sel" : ""}${open && i === active && origin.current.el ? " is-out" : ""}`}
              style={{ "--i": i } as React.CSSProperties}
              tabIndex={i === sel ? 0 : -1}
              aria-label={`Open draft: ${dr.name}`}
              onMouseEnter={() => setSel(i)}
              onFocus={() => setSel(i)}
              onKeyDown={(e) => onFanKey(e, i)}
              onClick={(e) => show(i, e.currentTarget, null)}
            >
              <EnvelopeFace />
            </button>
          ))}
        </div>
        <div className="cl-tile__meta">
          <span className="cl-tile__name">{DRAFTS[sel].name}</span>
          <span className="cl-tile__count">{sel + 1} of {DRAFTS.length}</span>
        </div>
        <p className="cl-tile__hint">Pick an envelope. Make it yours.</p>
      </div>

      {mounted && open && createPortal(
        <div className="cl-stage" ref={scope}>
          <div className="cl-backdrop" onClick={hide} aria-hidden />

          <div className="cl-env" style={{ width: geometry().envW, height: geometry().envH }} aria-hidden>
            <svg className="cl-env__back" viewBox="0 0 160 100" preserveAspectRatio="none">
              <rect x="0.5" y="0.5" width="159" height="99" rx="7" className="env-inside" />
            </svg>
            <div className="cl-sheet"><i /><i /><i /><i /></div>
            <svg className="cl-env__front" viewBox="0 0 160 100" preserveAspectRatio="none">
              <path d="M0.5 26 L80 64 L159.5 26 V92.5 Q159.5 99.5 152.5 99.5 H7.5 Q0.5 99.5 0.5 92.5 Z" className="env-paper" />
              <path d="M1 98 L64 54 M159 98 L96 54" className="env-line" />
            </svg>
            <div className="cl-flap">
              <svg viewBox="0 0 160 62" preserveAspectRatio="none">
                <path d="M0.5 0.5 H159.5 L80 61.5 Z" className="env-paper" />
              </svg>
            </div>
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

            <textarea
              className="cl-body"
              value={d.body}
              onChange={(e) => edit({ body: e.target.value })}
              aria-label="Message"
              rows={8}
            />

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
