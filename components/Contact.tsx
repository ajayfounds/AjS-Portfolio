"use client";

import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { site, socials } from "@/lib/data";

export default function Contact() {
  return (
    <div className="contact-page">
      <Reveal className="section-head">
        <span className="section-head__index">04</span>
        <h2 className="section-head__title">Contact</h2>
      </Reveal>

      <div className="contact__inner">
        <Reveal as="p" className="contact__lead">
          Let&apos;s build something with <em>meaning</em>. Whether it&apos;s a product,
          a portfolio review, or just a good design conversation — my inbox is open.
        </Reveal>

        <Reveal delay={0.08}>
          <Magnetic strength={0.12}>
            <a href={`mailto:${site.email}`} className="contact__email" data-link>
              {site.email}
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="contact__socials">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" data-link>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </div>
  );
}
