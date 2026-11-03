"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import VisitorCardButton from "./VisitorCardButton";
import { site, explore, outbound } from "@/lib/data";
import type { Outbound } from "@/lib/data";

// Official brand marks, filled in currentColor so the hover-colour transition
// (muted → brand) still applies. Each is the mark the brand itself uses as
// its square avatar/button on third-party sites.
function OutboundIcon({ kind }: { kind: Outbound["icon"] }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
  switch (kind) {
    case "email":
      // Gmail "M" envelope — the recognisable Google mark
      return (
        <svg {...common}>
          <path d="M22 6v12c0 .55-.45 1-1 1h-3V9.14l-6 4.5-6-4.5V19H3c-.55 0-1-.45-1-1V6c0-.825.675-1.5 1.5-1.5h.5l8 6 8-6h.5c.825 0 1.5.675 1.5 1.5z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      );
    case "behance":
      return (
        <svg {...common}>
          <path d="M7.44 4.84c.73 0 1.4.06 2.01.2.6.13 1.12.34 1.55.63.43.28.76.67 1 1.14.23.47.35 1.05.35 1.74 0 .74-.17 1.36-.5 1.85-.34.5-.84.9-1.5 1.22.9.26 1.58.72 2.02 1.37.44.65.67 1.44.67 2.36 0 .74-.15 1.39-.44 1.93-.29.54-.68.98-1.17 1.33-.49.34-1.06.59-1.69.75-.63.17-1.28.25-1.95.25H0V4.84h7.44zm22.1 7.03a4.42 4.42 0 0 1-.76 2.57c-.5.77-1.26 1.4-2.15 1.73v.04c1.24.35 2.18 1 2.78 1.95.6.95.9 2.1.9 3.44 0 1.09-.21 2.04-.63 2.84a5.5 5.5 0 0 1-1.7 2 7.5 7.5 0 0 1-2.46 1.17 10.4 10.4 0 0 1-2.84.39c-1.04 0-2.05-.13-3.03-.39a7.56 7.56 0 0 1-2.55-1.23 5.95 5.95 0 0 1-1.74-2.16c-.43-.88-.65-1.93-.65-3.14h3.8c0 .7.12 1.28.38 1.74.25.47.6.84 1.04 1.12.44.28.95.48 1.5.6.58.11 1.17.17 1.76.17a4.3 4.3 0 0 0 1.37-.2 3.5 3.5 0 0 0 1.08-.57c.3-.25.55-.56.72-.92.17-.36.26-.76.26-1.2 0-.49-.11-.9-.34-1.24-.22-.33-.52-.6-.9-.8-.37-.19-.81-.33-1.3-.42a9.65 9.65 0 0 0-1.52-.12H14V13.1h3.2c.49 0 .96-.04 1.4-.14.44-.1.84-.26 1.18-.5.33-.23.6-.54.78-.93.19-.4.29-.88.29-1.46 0-.9-.3-1.56-.9-1.98-.6-.42-1.36-.63-2.28-.63-.63 0-1.17.1-1.6.3-.44.19-.8.46-1.08.8-.28.33-.47.72-.59 1.15-.11.44-.17.9-.17 1.4h-3.5c0-1.03.17-1.96.5-2.78.33-.82.8-1.5 1.4-2.07a6 6 0 0 1 2.15-1.3 8.1 8.1 0 0 1 2.78-.46c.88 0 1.75.11 2.6.33.84.22 1.6.57 2.27 1.03a5.3 5.3 0 0 1 1.6 1.77c.42.72.63 1.6.63 2.6zM3.6 10.25H6.8c.65 0 1.19-.15 1.6-.46.41-.3.62-.8.62-1.5 0-.37-.07-.68-.2-.92a1.5 1.5 0 0 0-.56-.57 2.3 2.3 0 0 0-.8-.3 5.3 5.3 0 0 0-.95-.08H3.6v3.83zm.19 7.4h3.73c.37 0 .72-.03 1.06-.1.33-.07.63-.2.88-.37.26-.17.47-.4.63-.7.16-.3.24-.68.24-1.14 0-.9-.26-1.54-.76-1.93-.51-.4-1.19-.59-2.02-.59H3.79v4.83zM20.58 5h8.49v1.85h-8.49V5z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.84-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
        </svg>
      );
  }
}

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
  if (h >= 5 && h < 7) return "Dawn";
  if (h >= 7 && h < 17) return "Daylight";
  if (h >= 17 && h < 19.5) return "Golden hour";
  return "Night";
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

function Widget({ className = "", children, as = "div", label }: { className?: string; children: ReactNode; as?: "div" | "nav"; label?: string }) {
  const Tag = as;
  return (
    <Tag
      className={`sb-w ${className}`}
      aria-label={label}
    >
      {children}
    </Tag>
  );
}

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
  const phase = now ? phaseOf(now.hours) : "—";

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
        <div className="sb-grid">
          {/* 1 · Identity */}
          <Widget className="sb-id">
            <div className="sb-id__row">
              <span className="sb-id__mark">
                <Image src="/sun-logo.webp" alt="Ajay Srivastava logo" width={64} height={64} priority />
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
          <Widget className="sb-prev">
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
                          transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.4, bounce: 0 }}
                          aria-hidden
                        />
                      )}
                      <span className="sb-nav__label">{item.label}</span>
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
                  >
                    <OutboundIcon kind={link.icon} />
                    <span className="sb-social__label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Widget>

          {/* 5 · Local time — the sun rides an arc across the day */}
          <Widget className="sb-time">
            <div className="sb-time__top">
              <span className="sb-time__clock">
                <b>{now?.hm ?? "--:--"}</b>
                <i>{now?.ap}</i>
              </span>
              <span className="sb-time__phase">{phase}</span>
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
              <span>IST</span>
              <span>Local time</span>
            </div>
          </Widget>

          {/* 6 · Visitor card */}
          <div className="sb-w sb-visitor">
            <VisitorCardButton />
          </div>
        </div>
      </aside>
    </>
  );
}
