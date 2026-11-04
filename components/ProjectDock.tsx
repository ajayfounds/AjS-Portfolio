"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { openContactLetter } from "./ContactLetter";

const EASE = [0.23, 1, 0.32, 1] as const;

const icon = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

const Icons = {
  work: (
    <svg {...icon}><rect x="4" y="4" width="6.5" height="6.5" rx="1.6" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.6" /></svg>
  ),
  about: (
    <svg {...icon}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="10" r="2.8" /><path d="M6.8 18.1a6 6 0 0 1 10.4 0" /></svg>
  ),
  experience: (
    <svg {...icon}><rect x="3.5" y="7.5" width="17" height="12" rx="2.2" /><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3.5 12.5h17" /></svg>
  ),
  skills: (
    <svg {...icon}><path d="m12 3.5 8.5 4.5L12 12.5 3.5 8 12 3.5Z" /><path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" /></svg>
  ),
  contact: (
    <svg {...icon}><path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4 17-6.5Z" /></svg>
  ),
  close: (
    <svg {...icon}><path d="M6.5 6.5l11 11M17.5 6.5l-11 11" /></svg>
  )
};

type Item = { key: keyof typeof Icons; label: string; href?: string; current?: boolean };

// Bottom of the arc to the top, same order the fan opens in.
const ITEMS: Item[] = [
  { key: "work", label: "My Work", href: "/", current: true },
  { key: "about", label: "About me", href: "/about" },
  { key: "experience", label: "Experience", href: "/experience" },
  { key: "skills", label: "Skills", href: "/skills" },
  { key: "contact", label: "Contact me" }
];

// quarter circle from due-left (180°) to due-up (90°), anchored on the trigger's centre
const ANGLES = [180, 157.5, 135, 112.5, 90];

function useRadius() {
  const [r, setR] = useState(156);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 480px)");
    const set = () => setR(mq.matches ? 136 : 156);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return r;
}

export default function ProjectDock() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const R = useRadius();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // the letter flies out of the dock button itself
  const toContact = () => {
    setOpen(false);
    openContactLetter(trigger.current);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className="pdock__scrim"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.32, ease: EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.24, ease: EASE, delay: 0.06 } }}
            aria-hidden
          />
        )}
      </AnimatePresence>

      <nav className="pdock" aria-label="Site pages">
        <AnimatePresence>
          {open &&
            ITEMS.map((it, i) => {
              const a = (ANGLES[i] * Math.PI) / 180;
              const x = Math.round(Math.cos(a) * R);
              const y = Math.round(-Math.sin(a) * R);
              const inner = (
                <>
                  {Icons[it.key]}
                  <motion.span
                    className={`pdock__label pdock__label--${i === ITEMS.length - 1 ? "top" : "left"}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.24, ease: EASE, delay: 0.16 + i * 0.035 } }}
                    exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  >
                    {it.label}
                  </motion.span>
                </>
              );
              return (
                <motion.div
                  key={it.key}
                  className="pdock__slot"
                  initial={{ x: 0, y: 0, scale: 0.4, opacity: 0 }}
                  animate={{
                    x, y, scale: 1, opacity: 1,
                    transition: { type: "spring", bounce: 0, duration: 0.46, delay: i * 0.035 }
                  }}
                  exit={{
                    x: 0, y: 0, scale: 0.4, opacity: 0,
                    transition: { duration: 0.22, ease: EASE, delay: (ITEMS.length - 1 - i) * 0.025 }
                  }}
                >
                  {it.href ? (
                    <Link
                      href={it.href}
                      className={`pdock__item${it.current ? " is-current" : ""}`}
                      aria-label={it.label}
                      aria-current={it.current ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {inner}
                    </Link>
                  ) : (
                    <button type="button" className="pdock__item" aria-label={it.label} onClick={toContact}>
                      {inner}
                    </button>
                  )}
                </motion.div>
              );
            })}
        </AnimatePresence>

        <button
          ref={trigger}
          type="button"
          className={`pdock__trigger${open ? " is-open" : ""}`}
          aria-expanded={open}
          aria-label={open ? "Close page menu" : "Open page menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            className="pdock__glyph"
            initial={false}
            animate={{ opacity: open ? 0 : 1, rotate: open ? -45 : 0, scale: open ? 0.6 : 1 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            {Icons.work}
          </motion.span>
          <motion.span
            className="pdock__glyph"
            initial={false}
            animate={{ opacity: open ? 1 : 0, rotate: open ? 0 : 45, scale: open ? 1 : 0.6 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            {Icons.close}
          </motion.span>
        </button>
      </nav>
    </>
  );
}
