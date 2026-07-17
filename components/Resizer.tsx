"use client";

import { useEffect, useRef } from "react";

// Desktop-only drag handle on the sidebar's right edge — drag to resize the
// nav column. The width is stored as a CSS var on .layout__body and persisted.
const MIN = 240;
const MAX = 460;

export default function Resizer() {
  const ref = useRef<HTMLDivElement>(null);
  const down = useRef(false);

  useEffect(() => {
    const handle = ref.current;
    const body = handle?.parentElement; // .layout__body
    if (!handle || !body) return;

    const saved = localStorage.getItem("side-w");
    if (saved) body.style.setProperty("--side-w", saved);

    const onMove = (e: PointerEvent) => {
      if (!down.current) return;
      const rect = body.getBoundingClientRect();
      const w = Math.max(MIN, Math.min(MAX, Math.round(e.clientX - rect.left)));
      body.style.setProperty("--side-w", w + "px");
    };
    const onUp = () => {
      if (!down.current) return;
      down.current = false;
      handle.classList.remove("is-drag");
      document.body.classList.remove("is-resizing");
      const v = body.style.getPropertyValue("--side-w");
      if (v) localStorage.setItem("side-w", v.trim());
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const onDown = () => {
    down.current = true;
    ref.current?.classList.add("is-drag");
    document.body.classList.add("is-resizing");
  };

  return (
    <div
      className="resizer"
      ref={ref}
      onPointerDown={onDown}
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize navigation"
    />
  );
}
