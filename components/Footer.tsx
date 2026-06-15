"use client";

import Link from "next/link";
import { useLenis } from "lenis/react";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { site, explore, outbound } from "@/lib/data";

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
        <Reveal as="p" className="footer__line">
          Good design is a quiet conversation
          <br />
          between people and purpose.
          <br />
          <em>Let&apos;s start one.</em>
        </Reveal>

        <div className="footer__cols">
          <ul className="footer__col">
            {outbound.map((link) => (
              <li key={link.label}>
                <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-link>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="footer__col">
            {explore.map((item) => (
              <li key={item.num}>
                <Link href={item.href} data-link>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">© 2026 {site.name} — Clarity &amp; purpose</span>
        <Magnetic strength={0.2}>
          <a href="#top" className="footer__back" data-link onClick={toTop}>
            ✦ Back to top
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
