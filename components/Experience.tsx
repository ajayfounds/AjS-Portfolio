"use client";

import Reveal from "./Reveal";
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
            <span className="exp__period">{job.period}</span>
            <div className="exp__body">
              <h3 className="exp__role">{job.role}</h3>
              <p className="exp__org">{job.org}</p>
              <p className="exp__desc">{job.desc}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
