"use client";

import Reveal from "./Reveal";
import StackIcon from "./StackIcon";
import { stack } from "@/lib/data";

export default function Skills() {
  return (
    <section className="stack" id="skills">
      <Reveal>
        <h1 className="stack__title">_//my.current.stack//_</h1>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="stack__sub">tools, methods &amp; systems I&apos;m running</p>
      </Reveal>

      <div className="stack__grid">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={0.06 + i * 0.06}>
            <article className="stack__card">
              <h2 className="stack__label">{group.label}</h2>
              <ul className="stack__list">
                {group.items.map((it) => (
                  <li className="stack__item" key={group.label + it.name}>
                    <span className="stack__icon" aria-hidden>
                      <StackIcon name={it.icon} />
                    </span>
                    <span className="stack__text">
                      <span className="stack__name">{it.name}</span>
                      <span className="stack__desc">{it.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
