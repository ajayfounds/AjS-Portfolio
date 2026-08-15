"use client";

import Reveal from "./Reveal";
import Logo from "./Logo";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <Reveal className="section-head">
        <span className="section-head__index">03</span>
        <h2 className="section-head__title">Experience</h2>
      </Reveal>

      <ul className="exp__list">
        {experience.map((job, i) => (
          <Reveal as="li" key={job.role + job.period} className="exp__item" delay={i * 0.05}>
            <div className="exp__meta" style={{ "--accent": job.accent } as React.CSSProperties}>
              <div className="exp__metaTop">
                <span className="exp__logo">
                  <Logo src={job.logo} glyph={job.icon} />
                </span>
                <span className="exp__period">{job.period}</span>
              </div>
              <h3 className="exp__role">{job.role}</h3>
              <p className="exp__org">{job.org}</p>
              <p className="exp__loc">{job.location}</p>
            </div>
            <div className="exp__body" style={{ "--accent": job.accent } as React.CSSProperties}>
              <ul className="exp__desc">
                {job.desc.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
