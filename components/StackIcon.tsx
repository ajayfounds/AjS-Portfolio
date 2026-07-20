// Small, simplified marks for the tools in "my current stack".
// Deliberately schematic (not exact brand artwork) — just enough to be recognisable.
export default function StackIcon({ name }: { name: string }) {
  switch (name) {
    case "claude":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <g stroke="#D97757" strokeWidth="2.1" strokeLinecap="round">
            <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" />
          </g>
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <rect x="1" y="1" width="22" height="22" rx="6" fill="#0f0f10" />
          <path
            d="M12 6.4c1.6-1.1 3.7-.5 4.4 1.3 1.8.2 2.9 2 2.2 3.7.9 1.5.2 3.5-1.6 3.9-.6 1.7-2.7 2.4-4.2 1.4-1.6 1.1-3.7.5-4.4-1.3-1.8-.2-2.9-2-2.2-3.7-.9-1.5-.2-3.5 1.6-3.9.6-1.7 2.7-2.4 4.2-1.4z"
            fill="none"
            stroke="#fff"
            strokeWidth="1.1"
          />
        </svg>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <path d="M8.5 2h3.5v5H8.5A2.5 2.5 0 0 1 8.5 2z" fill="#F24E1E" />
          <path d="M12 2h3.5a2.5 2.5 0 0 1 0 5H12V2z" fill="#FF7262" />
          <path d="M12 7h3.5a2.5 2.5 0 0 1 0 5H12V7z" fill="#1ABCFE" />
          <path d="M8.5 7H12v5H8.5a2.5 2.5 0 0 1 0-5z" fill="#A259FF" />
          <path d="M8.5 12H12v2.5A2.5 2.5 0 1 1 8.5 12z" fill="#0ACF83" />
        </svg>
      );
    case "notion":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <rect x="1.5" y="1.5" width="21" height="21" rx="4" fill="#fff" stroke="#111" strokeWidth="1.6" />
          <path d="M8 16.5v-9l8 9v-9" fill="none" stroke="#111" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "miro":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <g fill="#FFD02F">
            <path d="M6 3h2.6l-1.5 6L10 3h2.6l-1.6 7.2L14 3h2.6l-1.7 8.4L18 3h2.5l-3.1 18H15l1.6-8.6L13.4 21H11l1.5-9.4L9.1 21H6.7l1.4-10.6L4.6 21H3L6 3z" />
          </g>
        </svg>
      );
    case "perplexity":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <g stroke="#20808D" strokeWidth="1.8" fill="none" strokeLinecap="round">
            <path d="M12 3v18M12 8L5 3v7h14V3l-7 5zM12 16l-7 5v-7h14v7l-7-5z" />
          </g>
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#7C3AED" />
          <text x="12" y="15.5" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">
            CSS
          </text>
        </svg>
      );
    case "storybook":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
          <rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="#FF4785" />
          <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff" fontFamily="Georgia, serif">
            S
          </text>
        </svg>
      );
    case "people":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#3f3f46" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="9" cy="8" r="3" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M3 19c0-3 2.7-4.6 6-4.6S15 16 15 19M16 14.6c2.7.2 5 1.7 5 4.4" />
        </svg>
      );
    case "a11y":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="4.4" r="1.9" fill="#111" stroke="none" />
          <path d="M4.5 8.5c4.8 1.6 10.2 1.6 15 0M12 9.2v5m0 0l-3.4 6.1M12 14.2l3.4 6.1" />
        </svg>
      );
    default:
      return <span className="stack__dot" aria-hidden />;
  }
}
