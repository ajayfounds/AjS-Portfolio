"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const INTERACTIVE = "a, button, [data-magnetic], [data-project], [data-link], input, textarea, select, label";

// Relative luminance of an "r, g, b" computed colour.
function luminance(rgb: string) {
  const m = rgb.match(/[\d.]+/g);
  if (!m) return 1;
  const [r, g, b] = m.slice(0, 3).map((n) => {
    const c = Number(n) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Walk up from the hovered node until we hit a surface that actually paints a
// background, then decide whether the dot needs to invert to stay visible.
function isOnDarkSurface(el: Element | null) {
  let node: Element | null = el;
  while (node && node !== document.documentElement) {
    const cs = getComputedStyle(node);
    const bg = cs.backgroundColor;
    const alpha = Number(bg.match(/[\d.]+/g)?.[3] ?? 1);
    if (alpha > 0.5 && bg !== "transparent") return luminance(bg) < 0.4;
    // gradients/images don't expose a colour — assume the author styled them dark
    if (cs.backgroundImage && cs.backgroundImage !== "none") return null;
    node = node.parentElement;
  }
  return false;
}

export default function Cursor() {
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const lastEl = useRef<Element | null>(null);
  const frame = useRef(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      // sampling the surface is the expensive bit — do it at most once a frame,
      // and only when the element under the pointer actually changed
      if (frame.current) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = 0;
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el === lastEl.current) return;
        lastEl.current = el;
        setHover(!!el?.closest(INTERACTIVE));
        const d = isOnDarkSurface(el);
        if (d !== null) setDark(d);
      });
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [x, y]);

  return (
    <motion.div
      className={`cursor${hover ? " is-hover" : ""}${dark ? " is-dark" : ""}${down ? " is-active" : ""}`}
      style={{ x, y }}
      aria-hidden
    >
      <span className="cursor__dot" />
    </motion.div>
  );
}
