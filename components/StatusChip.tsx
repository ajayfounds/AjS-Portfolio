"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

export default function StatusChip() {
  const [drawn, setDrawn] = useState(false);

  // paint the sparkline at 0 first so it can draw itself in
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <p className="status-chip">
      <span className="status-chip__k">Status</span>
      <span className="status-chip__v">
        <span className="status-chip__dot" aria-hidden />
        {site.status}
      </span>
      <svg className={`status-chip__spark${drawn ? " is-drawn" : ""}`} viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden>
        <path d="M0 28 C14 28 18 12 30 14 S48 30 60 22 S78 4 92 8 S110 18 120 10" pathLength="1" />
      </svg>
    </p>
  );
}
