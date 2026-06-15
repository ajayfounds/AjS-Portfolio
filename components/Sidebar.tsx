"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import VisitorCardButton from "./VisitorCardButton";
import { site, explore, outbound } from "@/lib/data";

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
        <span className="sidebar__handle-dot" aria-hidden />
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
          <div className="sidebar__mark" ref={logoRef} aria-hidden>
            <span />
            <span />
            <span />
            <span />
          </div>

          <h1 className="sidebar__name">{site.name}</h1>
          <p className="sidebar__role">
            {site.role.toUpperCase()}
            <br />
            {site.affiliation.toUpperCase()}
          </p>

          <p className="sidebar__bio">
            {site.statement}
            <br />
            <br />
            {site.bioLine}
          </p>

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

          <div className="sidebar__section">
            <h2 className="sidebar__heading">Outbound</h2>
            <p className="sidebar__outbound">
              {outbound.map((link, i) => (
                <span key={link.label}>
                  <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-link>
                    {link.label}
                  </a>
                  {i < outbound.length - 1 && <span className="sidebar__sep">, </span>}
                </span>
              ))}
            </p>
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
