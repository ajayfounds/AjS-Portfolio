"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import Reveal from "./Reveal";
import ContactLetter from "./ContactLetter";
import { OutboundIcon } from "./Sidebar";
import { site, outbound } from "@/lib/data";

const PAGES = [
  { label: "About me", href: "/about" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Services", href: "/services" }
];

export default function Footer() {
  const lenis = useLenis();

  const toTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (lenis) lenis.scrollTo(0, { duration: 1.1 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer" id="contact-footer">
      <div className="footer__inner">
        <div className="footer__lead">
          <Reveal as="p" className="footer__line">
            Good design is a quiet conversation
            <br />
            between people and purpose.
            <br />
            <em>Let&apos;s start one.</em>
          </Reveal>

          <ul className="footer__socials">
            {outbound.filter((l) => l.icon !== "email").map((l) => (
              <li key={l.label}>
                <a
                  className="footer__social"
                  data-brand={l.icon}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  title={l.label}
                >
                  <OutboundIcon kind={l.icon} />
                </a>
              </li>
            ))}
          </ul>

          <nav className="footer__pages" aria-label="Pages">
            <ul>
              {PAGES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* email lives in the envelope */}
        <div className="footer__contact">
          <ContactLetter />
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">{site.name}, 2026 ... Clarity &amp; purpose</span>
        <a href="#top" className="footer__back" data-link onClick={toTop}>
          Back to top
        </a>
      </div>
    </footer>
  );
}
