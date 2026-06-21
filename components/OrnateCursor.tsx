// Ornate carved-arrowhead cursor — a stone/bronze frame around a glowing gem arrow.
// "amber" is used across the main site, "azure" on the entry gate.
// The pointer hotspot is the top tip of the frame (~5,3 in the 40px viewBox).

const CORE: Record<string, { stops: [string, string, string]; glow: string; crease: string }> = {
  amber: { stops: ["#fff6c2", "#ffce45", "#ef9a1a"], glow: "#ffb020", crease: "#fff4cf" },
  azure: { stops: ["#e3f6ff", "#5cc6ff", "#1f86d8"], glow: "#3aa8ff", crease: "#e6f6ff" }
};

export default function OrnateCursor({ variant = "amber" }: { variant?: "amber" | "azure" }) {
  const c = CORE[variant] ?? CORE.amber;
  return (
    <svg className="ornate" width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={`oc-frame-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dcc8a6" />
          <stop offset="0.55" stopColor="#8f7252" />
          <stop offset="1" stopColor="#52402c" />
        </linearGradient>
        <radialGradient id={`oc-core-${variant}`} cx="0.46" cy="0.4" r="0.75">
          <stop offset="0" stopColor={c.stops[0]} />
          <stop offset="0.5" stopColor={c.stops[1]} />
          <stop offset="1" stopColor={c.stops[2]} />
        </radialGradient>
        <filter id={`oc-glow-${variant}`} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={c.glow} floodOpacity="0.85" />
        </filter>
      </defs>

      {/* carved stone/bronze frame */}
      <path
        d="M5 3 L29 16 L20 37 L8 20 Z"
        fill={`url(#oc-frame-${variant})`}
        stroke="#20180f"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />
      {/* light inner bevel */}
      <path d="M8.5 7 L25.4 16.2 L19 32 L11 20 Z" fill="none" stroke="#efe2c9" strokeWidth="0.8" opacity="0.5" />
      {/* engraved swirl lines */}
      <path d="M10 9 C14 14, 16 20, 16 28" fill="none" stroke="#3a2c1c" strokeWidth="0.5" opacity="0.35" />
      <path d="M22 13 C20 19, 19 25, 18 31" fill="none" stroke="#3a2c1c" strokeWidth="0.5" opacity="0.3" />

      {/* glowing gem arrow */}
      <path
        d="M14.5 12 L25 21 L13.5 27 Z"
        fill={`url(#oc-core-${variant})`}
        filter={`url(#oc-glow-${variant})`}
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeOpacity="0.7"
        strokeLinejoin="round"
      />
      {/* facet crease */}
      <path d="M14.5 12 L17.6 22" fill="none" stroke={c.crease} strokeWidth="0.6" opacity="0.55" />
    </svg>
  );
}
