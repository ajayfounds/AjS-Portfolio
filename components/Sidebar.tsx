"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitorCardButton from "./VisitorCardButton";
import { site, explore, outbound } from "@/lib/data";
import type { Outbound } from "@/lib/data";

// Minimal single-path glyphs (24×24). Line style for a consistent stroke weight
// with the rest of the sidebar; each icon is instantly recognisable at 16–18px.
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

function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function Sidebar() {
  const time = useClock();
  const pathname = usePathname();
  const logoRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  // close the mobile drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* mobile-only: left-edge tab that opens the drawer */}
      <button
        className={`sidebar__handle${open ? " is-hidden" : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
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
        {/* mobile-only: close button */}
        <button className="sidebar__close" onClick={() => setOpen(false)} aria-label="Close menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="sidebar__top">
          <div className="sidebar__markrow">
            <div className="sidebar__mark" ref={logoRef} aria-hidden>
              <span />
              <span />
              <span />
              <span />
            </div>
            <a
              className="sidebar__resume"
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              data-link
            >
              Resume
            </a>
          </div>

          <h1 className="sidebar__name">{site.name}</h1>
          <p className="sidebar__role">
            {site.role.toUpperCase()}
            <br />
            {site.affiliation.toUpperCase()}
          </p>

          <p className="sidebar__bio">{site.statement}</p>

          <div className="sidebar__prev" aria-label={site.previous.label}>
            <p className="sidebar__prev-label">{site.previous.label}</p>
            <div className="sidebar__prev-orgs">
              {site.previous.orgs.map((org) => (
                <span className="sidebar__prev-item" key={org}>
                  <span className="sidebar__prev-at" aria-hidden>@</span>
                  <span className="sidebar__prev-org">{org}</span>
                </span>
              ))}
            </div>
          </div>

          <nav className="sidebar__section sidebar__explore" aria-label="Explore">
            <h2 className="sidebar__heading">Explore</h2>
            <ul className="sidebar__nav">
              {explore.map((item) => (
                <li key={item.num}>
                  <Link
                    href={item.href}
                    className={pathname === item.href ? "is-active" : ""}
                    data-link
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar__nav-num">{item.num}.</span>
                    <span className="sidebar__nav-label">{item.label}</span>
                    <span className="sidebar__nav-arrow">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar__section sidebar__outbound-section">
            <h2 className="sidebar__heading">Outbound</h2>
            <ul className="sidebar__outbound-grid">
              {outbound.map((link) => (
                <li key={link.label}>
                  <a
                    className="sidebar__outbound-tile"
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    data-link
                    aria-label={link.label}
                  >
                    <span className="sidebar__outbound-icon" aria-hidden>
                      <OutboundIcon kind={link.icon} />
                    </span>
                    <span className="sidebar__outbound-label">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="sidebar__bottom">
          <VisitorCardButton />
          <div className="sidebar__status">
            <span className="sidebar__time">{time || "—"}</span>
            <span className="sidebar__system">
              <i className="sidebar__dot" />
              {site.status.toUpperCase()}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
