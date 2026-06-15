"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { latestLog } from "@/lib/data";

// turns "@[Some Name]" into a styled inline link span
function renderLogText(text: string) {
  const parts = text.split(/(@\[[^\]]+\])/g);
  return parts.map((part, i) => {
    const match = part.match(/^@\[([^\]]+)\]$/);
    if (match) {
      return (
        <span className="log__mention" key={i}>
          {match[1]}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function LatestLog() {
  const [open, setOpen] = useState(true);

  return (
    <div className="log">
      <button className="log__head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="log__label">
          Latest Log <span className="log__date">{latestLog.date}</span>
        </span>
        <motion.svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="log__body-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="log__body">{renderLogText(latestLog.text)}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
