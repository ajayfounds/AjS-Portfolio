// Ornate carved-arrowhead cursor — stone/bronze frame with a gold sediment band
// and a faceted glowing gem arrow. "amber" across the site, "azure" on the entry.
// Pointer hotspot = the top tip (~5,3 in the 40px viewBox).

type Variant = "amber" | "azure";
const GEM: Record<Variant, { light: string; mid: string; dark: string; ring: string; glow: string; crease: string }> = {
  amber: { light: "#fff0a8", mid: "#ffce45", dark: "#e89a1a", ring: "#7a4a16", glow: "#ffb020", crease: "#fff6cf" },
  azure: { light: "#dff4ff", mid: "#7cd0ff", dark: "#2f93e0", ring: "#1f6fd0", glow: "#3aa8ff", crease: "#eaf7ff" }
};

export default function OrnateCursor({ variant = "amber" }: { variant?: Variant }) {
  const g = GEM[variant];
  return (
    <svg className="ornate" width="40" height="40" viewBox="0 0 40 40" aria-hidden>
      <defs>
        <linearGradient id={`oc-frame-${variant}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e0cca8" />
          <stop offset="0.5" stopColor="#9a7a55" />
          <stop offset="1" stopColor="#4c3622" />
        </linearGradient>
        <filter id={`oc-glow-${variant}`} x="-70%" y="-70%" width="240%" height="240%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.8" floodColor={g.glow} floodOpacity="0.9" />
        </filter>
      </defs>

      {/* carved stone/bronze frame */}
      <path d="M5 3 L34 24 L18 38 L6 21 Z" fill={`url(#oc-frame-${variant})`} stroke="#20160d" strokeWidth="2.6" strokeLinejoin="round" />

      {/* gold sediment band hugging the bottom edges */}
      <path d="M6.5 24 Q17 39 30 25" fill="none" stroke="#f0a81c" strokeWidth="2.3" strokeLinecap="round" opacity="0.92" />
      <path d="M8.5 22 Q16.5 33 26 23" fill="none" stroke="#d98c14" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />

      {/* light inner bevel along the top edges */}
      <path d="M7.6 20 L7.6 6 L31 24" fill="none" stroke="#efe0c4" strokeWidth="0.9" opacity="0.5" strokeLinejoin="round" />
      {/* carved swirl grooves near the tip */}
      <path d="M9 8 Q12 15 12 23" fill="none" stroke="#372a1b" strokeWidth="0.5" opacity="0.35" />
      <path d="M13 7 Q15 13 15 20" fill="none" stroke="#372a1b" strokeWidth="0.5" opacity="0.3" />

      {/* faceted glowing gem (3 facets around a centre point) */}
      <g filter={`url(#oc-glow-${variant})`}>
        <path d="M13 11 L8 19 L14.8 19.8 Z" fill={g.light} />
        <path d="M8 19 L15 29 L23 20 L14.8 19.8 Z" fill={g.mid} />
        <path d="M13 11 L23 20 L14.8 19.8 Z" fill={g.dark} />
        {/* crease lines from the centre point */}
        <path d="M14.8 19.8 L13 11 M14.8 19.8 L8 19 M14.8 19.8 L15 29 M14.8 19.8 L23 20" fill="none" stroke={g.crease} strokeWidth="0.5" opacity="0.5" />
        {/* gem border ring */}
        <path d="M13 11 L23 20 L15 29 L8 19 Z" fill="none" stroke={g.ring} strokeWidth="1.4" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
