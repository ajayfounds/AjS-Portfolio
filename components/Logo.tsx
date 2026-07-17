"use client";

import { useEffect, useRef, useState } from "react";

// Renders a logo image, falling back to a glyph if the file is missing.
// Handles the case where the 404 completes before React attaches onError
// (checks complete && naturalWidth === 0 on mount).
export default function Logo({ src, glyph }: { src: string; glyph: string }) {
  const [broken, setBroken] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setBroken(true);
  }, []);

  if (broken) return <span className="logo__glyph" aria-hidden>{glyph}</span>;
  return <img ref={ref} src={src} alt="" loading="lazy" draggable={false} onError={() => setBroken(true)} />;
}
