"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import VisitorCardButton from "./VisitorCardButton";
import { site, explore, outbound } from "@/lib/data";
import type { Outbound } from "@/lib/data";

function OutboundIcon({ kind }: { kind: Outbound["icon"] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true
  };
  switch (kind) {
    case "email":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path d="M3 6h5a2.5 2.5 0 0 1 0 5H3zM3 11h6a2.5 2.5 0 0 1 0 5H3zM3 6v10" />
          <path d="M15 5h5M14 13a3 3 0 0 1 6 0h-6a3 3 0 0 0 6 0" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M4 4l16 16M20 4L4 20" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

// Each outbound tile tints toward its own brand-ish accent on hover.
const BRAND: Record<Outbound["icon"], string> = {
  email: "var(--sb-gold)",
  linkedin: "var(--sb-teal)",
  behance: "var(--sb-sienna)",
  x: "#242424",
  instagram: "var(--sb-pink)"
};

// Pinned to IST so the widget reads as "my local time", whoever is visiting.
function useIST() {
  const [now, setNow] = useState<{ hm: string; ap: string; hours: number } | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" });
    const fmt24 = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Kolkata" });
    const tick = () => {
      const d = new Date();
      const parts = fmt.formatToParts(d);
      const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
      const [h, m] = fmt24.format(d).split(":").map(Number);
      setNow({ hm: `${get("hour")}:${get("minute")}`, ap: get("dayPeriod"), hours: (h % 24) + m / 60 });
    };
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

// Rough sky phases for Noida — decorative, so fixed hours are close enough.
function phaseOf(h: number) {
  if (h >= 5 && h < 7) return { label: "Dawn", glow: "var(--sb-pink)" };
  if (h >= 7 && h < 17) return { label: "Daylight", glow: "var(--sb-gold)" };
  if (h >= 17 && h < 19.5) return { label: "Golden hour", glow: "var(--sb-sienna)" };
  return { label: "Night", glow: "var(--sb-teal)" };
}

// Quadratic Bézier the sun rides along (viewBox 0 0 300 64).
const ARC = { x0: 8, y0: 54, cx: 150, cy: -6, x1: 292, y1: 44 };
function arcPoint(t: number) {
  const u = 1 - t;
  return {
    x: u * u * ARC.x0 + 2 * u * t * ARC.cx + t * t * ARC.x1,
    y: u * u * ARC.y0 + 2 * u * t * ARC.cy + t * t * ARC.y1
  };
}
const ARC_D = `M${ARC.x0} ${ARC.y0} Q${ARC.cx} ${ARC.cy} ${ARC.x1} ${ARC.y1}`;

function Widget({ className = "", glow, children, as = "div", label }: { className?: string; glow?: string; children: ReactNode; as?: "div" | "nav"; label?: string }) {
  const Tag = as === "nav" ? motion.nav : motion.div;
  return (
    <Tag
      className={`sb-w ${className}`}
      style={glow ? ({ "--glow": glow } as CSSProperties) : undefined}
      variants={itemV}
      aria-label={label}
    >
      {children}
    </Tag>
  );
}

const itemV: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } }
};

export default function Sidebar() {
  const now = useIST();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [drawn, setDrawn] = useState(false);

  // close the mobile drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // let the arc / sparkline paint at 0 first, then transition to their value
  useEffect(() => {
    const id = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const t = now ? now.hours / 24 : 0;
  const sun = arcPoint(drawn ? t : 0);
  const phase = now ? phaseOf(now.hours) : { label: "—", glow: "var(--sb-gold)" };

  return (
    <>
      {/* mobile-only: edge tab — sits on the screen edge when closed, rides the
          drawer's edge when open and points back in to close it */}
      <button
        className={`sidebar__handle${open ? " is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span className="sidebar__grip" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <svg className="sidebar__handle-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>

      {/* mobile-only: dim backdrop behind the open drawer */}
      <div className={`sidebar__backdrop${open ? " is-open" : ""}`} onClick={() => setOpen(false)} aria-hidden />

      <aside className={`sidebar${open ? " is-open" : ""}`} data-lenis-prevent>
        <motion.div
          className="sb-grid"
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } } }}
        >
          {/* 1 · Identity */}
          <Widget className="sb-id" glow="var(--sb-gold)">
            <div className="sb-id__row">
              <span className="sb-id__mark">
                <Image src="/sun-logo.webp" alt="Ajay Srivastava logo" width={44} height={44} priority />
              </span>
              <a className="sb-pill" href={site.resume} target="_blank" rel="noopener noreferrer" data-link>
                Resume
              </a>
            </div>
            <h1 className="sb-id__name">{site.name}</h1>
            <p className="sb-id__role">
              {site.role}
              <br />
              {site.affiliation}
            </p>
            <p className="sb-id__bio">{site.statement}</p>
          </Widget>

          {/* 2 · Previous intern */}
          <Widget className="sb-prev" glow="var(--sb-pink)">
            <h2 className="sb-k">{site.previous.label}</h2>
            <ul className="sb-chips">
              {site.previous.orgs.map((org) => (
                <li className="sb-chip" key={org}>
                  <span aria-hidden>@</span>
                  {org}
                </li>
              ))}
            </ul>
          </Widget>

          {/* 3 · Explore */}
          <Widget as="nav" className="sb-nav" label="Explore">
            <h2 className="sb-k">Explore</h2>
            <ul className="sb-nav__list">
              {explore.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.num}>
                    <Link
                      href={item.href}
                      className={`sb-nav__a${active ? " is-active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      data-link
                      onClick={() => setOpen(false)}
                    >
                      {active && (
                        <motion.span
                          className="sb-nav__pill"
                          layoutId="sb-nav-pill"
                          transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.15 }}
                          aria-hidden
                        />
                      )}
                      <span className="sb-nav__num">{item.num}</span>
                      <span className="sb-nav__label">{item.label}</span>
                      <span className="sb-nav__arrow" aria-hidden>→</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Widget>

          {/* 4 · Outbound */}
          <Widget className="sb-out">
            <h2 className="sb-k">Outbound</h2>
            <a className="sb-resume" href={site.resume} target="_blank" rel="noopener noreferrer" data-link>
              <span className="sb-resume__glow" aria-hidden />
              <span className="sb-resume__k">Resume</span>
              <span className="sb-resume__go" aria-hidden>↗</span>
              <svg className="sb-resume__arc" viewBox="0 0 200 16" preserveAspectRatio="none" aria-hidden>
                <path d="M4 13 Q100 1 196 9" />
                <path className="sb-resume__lit" d="M4 13 Q100 1 196 9" pathLength="1" />
              </svg>
            </a>
            <ul className="sb-social">
              {outbound.map((link) => (
                <li key={link.label}>
                  <a
                    className="sb-social__a"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-link
                    aria-label={link.label}
                    style={{ "--brand": BRAND[link.icon] } as CSSProperties}
                  >
                    <OutboundIcon kind={link.icon} />
                    <span className="sb-social__label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Widget>

          {/* 5 · Local time — the sun rides an arc across the day */}
          <Widget className="sb-time" glow={phase.glow}>
            <div className="sb-time__top">
              <span className="sb-time__clock">
                <b>{now?.hm ?? "--:--"}</b>
                <i>{now?.ap}</i>
              </span>
              <span className="sb-time__phase">{phase.label}</span>
            </div>
            <svg className="sb-time__arc" viewBox="0 0 300 64" aria-hidden>
              <path className="sb-time__track" d={ARC_D} />
              <path className="sb-time__lit" d={ARC_D} pathLength="1" style={{ strokeDashoffset: 1 - (drawn ? t : 0) }} />
              <g className="sb-time__sun" style={{ transform: `translate(${sun.x}px, ${sun.y}px)` }}>
                <circle r="11" className="sb-time__halo" />
                <circle r="5" className="sb-time__dot" />
              </g>
            </svg>
            <div className="sb-time__foot">
              <span>{site.location.split(" / ")[0]} · IST</span>
              <span>Local time</span>
            </div>
          </Widget>

          {/* 6 · Visitor card */}
          <motion.div className="sb-w sb-visitor" variants={itemV} style={{ "--glow": "var(--sb-teal)" } as CSSProperties}>
            <VisitorCardButton />
          </motion.div>
        </motion.div>
      </aside>
    </>
  );
}
