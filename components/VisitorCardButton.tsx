"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/data";

const COLORS: Record<string, { bg: string; fg: string }> = {
  teal: { bg: "#168b9d", fg: "#f3f1eb" },
  green: { bg: "#2a8f50", fg: "#f3f1eb" },
  pink: { bg: "#bf5a7a", fg: "#f3f1eb" },
  orange: { bg: "#cb7836", fg: "#f3f1eb" }
};

type Card = { name: string; color: string; no: string; issued: string; sig?: string | null };

// static dot-matrix burst for the saved card
const M_COLS = 26, M_ROWS = 15, M_CHARS = ["·", "˙", ":", "+", "x", "*", "▪"];
function genMatrix() {
  let out = "";
  for (let r = 0; r < M_ROWS; r++) {
    for (let c = 0; c < M_COLS; c++) {
      const dx = (c - M_COLS / 2) / (M_COLS / 2);
      const dy = (r - M_ROWS / 2) / (M_ROWS / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const ray = Math.pow(Math.abs(Math.cos(Math.atan2(dy, dx) * 3)), 3);
      const density = Math.max(0, (1 - dist) * 0.55 + ray * (1 - dist) * 0.8);
      out += Math.random() < density ? M_CHARS[Math.floor(Math.random() * M_CHARS.length)] : " ";
    }
    out += "\n";
  }
  return out;
}

export default function VisitorCardButton() {
  const [card, setCard] = useState<Card | null>(null);
  const [open, setOpen] = useState(false);
  const [matrix] = useState(genMatrix);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const read = () => {
    try {
      const raw = localStorage.getItem("visitor-card");
      setCard(raw ? JSON.parse(raw) : null);
    } catch {
      setCard(null);
    }
  };

  useEffect(() => {
    read();
    window.addEventListener("focus", read);
    window.addEventListener("storage", read);
    return () => {
      window.removeEventListener("focus", read);
      window.removeEventListener("storage", read);
    };
  }, []);

  const openModal = () => {
    read(); // pick up a card created during this session
    setOpen(true);
  };

  const c = card ? COLORS[card.color] ?? COLORS.green : COLORS.green;

  return (
    <>
      <button className="vctile" onClick={openModal} aria-label="View my visitor card">
        <span className="vctile__stack" aria-hidden>
          <i style={{ background: COLORS.pink.bg }} />
          <i style={{ background: COLORS.teal.bg }} />
          <i style={{ background: card ? c.bg : COLORS.green.bg }} />
        </span>
        <span className="vctile__text">
          <span className="vctile__k">Visitor card</span>
          <span className="vctile__v">{card?.name || "View yours"}</span>
        </span>
        <span className="vctile__go" aria-hidden>→</span>
      </button>

      {mounted && createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="vcmodal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="vcmodal__card-wrap"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {card ? (
                <div className="vcard" style={{ background: c.bg, color: c.fg }}>
                  <pre className="vcard__matrix" aria-hidden>{matrix}</pre>
                  <div className="vcard__brand-row">
                    <span className="vcard__brand">{site.brand}</span>
                  </div>
                  <div className="vcard__mid">
                    <span><i className="vcard__label">Visitor</i><span className="vcard__value vcard__name">{card.name}</span></span>
                    <span><i className="vcard__label">Issued on</i><span className="vcard__value">{card.issued}</span></span>
                  </div>
                  <div className="vcard__foot">
                    <span className="vcard__no">No. {card.no}</span>
                    <span className="vcard__sign">X<i /></span>
                  </div>
                  {card.sig && <img className="vcard__sigimg" src={card.sig} alt="" aria-hidden />}
                </div>
              ) : (
                <div className="vcmodal__empty">
                  <p>You don&apos;t have a visitor card yet.</p>
                  <span>Reload and create one from the intro to see it here.</span>
                </div>
              )}
              <button className="vcmodal__close" onClick={() => setOpen(false)}>Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}
    </>
  );
}
