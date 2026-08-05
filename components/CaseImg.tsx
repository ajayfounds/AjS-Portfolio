"use client";

import { useEffect, useRef, useState } from "react";

// A case-study screenshot that degrades to a labelled placeholder while the
// real asset is missing. Drop the file at `src` and it appears automatically —
// no code change needed. Keeps the interim page clean instead of showing the
// browser's broken-image glyph.
export default function CaseImg({
  src,
  alt,
  className,
  ratio = "phone"
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: "phone" | "wide" | "square";
}) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // The image can 404 before React hydrates and attaches onError (server-rendered
  // <img> starts loading immediately). Re-check on mount: a finished load with no
  // natural size means it broke and we missed the event.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return (
      <span
        className={`cs-ph cs-ph--${ratio}${className ? ` ${className}` : ""}`}
        role="img"
        aria-label={`${alt || "Image"} — coming soon`}
      >
        <span className="cs-ph__glyph" aria-hidden>◳</span>
        {alt && <span className="cs-ph__label">{alt}</span>}
      </span>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
