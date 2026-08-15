import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";
import CaseImg from "@/components/CaseImg";

export const metadata: Metadata = {
  title: "DigiAgency — Digital Agency Website · Ajay Srivastava",
  description:
    "A strategic redesign for a digital agency: a website built to act as credibility engine, storytelling platform and lead-generation system."
};

// Warm gold that reads well on the case-study canvas — the Behance panel's accent
const ACCENT = "#b8863d";
const BEHANCE = "https://www.behance.net/gallery/244405129/Digital-Agency-Website";
const IMG = (name: string) => `/case/digiagency/${name}.webp`;

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-problem", num: "02", label: "Problem" },
  { id: "s-users", num: "03", label: "Users & Goals" },
  { id: "s-challenges", num: "04", label: "Challenges" },
  { id: "s-strategy", num: "05", label: "Strategy" },
  { id: "s-wireframes", num: "06", label: "Wireframes" },
  { id: "s-designsystem", num: "07", label: "Design System" },
  { id: "s-designs", num: "08", label: "Designs" },
  { id: "s-impact", num: "09", label: "Impact" }
];

/* ── 02 Problem ──────────────────────────────────────────── */
const problemPains = [
  "High bounce rates",
  "Low engagement",
  "Poor inquiry conversion"
];

const websiteActsAs = [
  "A credibility engine",
  "A storytelling platform",
  "A lead-generation system"
];

/* ── 03 Users & Goals ────────────────────────────────────── */
const businessGoals = [
  "Increase inbound leads",
  "Improve credibility & authority",
  "Showcase portfolio effectively",
  "Differentiate from competitors",
  "Improve conversion rate"
];

const userGoals = [
  "Understand services quickly",
  "See past work",
  "Check credibility",
  "Understand pricing / process",
  "Easy contact"
];

const targetAudience = [
  "Startup founders",
  "Early-stage SaaS teams",
  "E-commerce brands",
  "Marketing managers"
];

const competitiveGaps = [
  "Too much jargon",
  "Over-animated websites",
  "Weak case studies",
  "Poor CTA placement",
  "No clarity in positioning"
];

/* ── 04 Challenges ───────────────────────────────────────── */
const challenges = [
  "Making the agency stand out in a saturated market",
  "Balancing creativity with usability",
  "Avoiding a generic agency look",
  "Designing for trust + conversion"
];

/* ── 05 Strategy ─────────────────────────────────────────── */
const strategy = [
  "Clarity-first design",
  "Strong visual hierarchy",
  "Conversion-driven structure",
  "Case study storytelling",
  "Minimal but impactful visuals"
];

const pillars = [
  { k: "Clarity", v: "Every section says one thing, and says it plainly." },
  { k: "Authority", v: "Real work and credibility signals do the persuading, not adjectives." },
  { k: "Conversion", v: "A clear next step is always in reach — no dead ends, no jargon." }
];

/* ── 08 Impact ───────────────────────────────────────────── */
const takeaways = [
  "Strategic communication matters more than visual novelty for service businesses",
  "Case studies drive credibility faster than testimonials or hero copy",
  "A single, well-placed CTA outperforms multiple competing ones",
  "Clarity of positioning is the highest-leverage design decision"
];

const testimonials = [
  {
    quote:
      "Their expertise, professionalism, and dedication to client satisfaction make them a standout choice in the industry.",
    name: "Alex Arenas",
    meta: "Co-founder · @Alexoigts",
    rating: "4.5 / 5"
  }
];

export default function DigiAgencyCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      <section className="cs-hero cs-hero--cover">
        <CaseImg className="cs-hero__cover" src={IMG("cover")} alt="" ratio="wide" />
      </section>

      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Web Design</span>
          <span className="cs-tag">UX/UI</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> DigiAgency ... Digital Agency Website
        </h1>
        <p className="cs-title__lead">
          A strategic redesign for a digital agency operating in a saturated market. The previous site was visually
          crowded and unclear on positioning ... this rebuild trades noise for structure, so the work does the talking.
        </p>
        <p className="cs-title__lead cs-quoteline">
          “A website built to deliver Clarity. Authority. Conversion.”
        </p>
      </header>

      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">UI/UX Designer</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Client type</span><span className="cs-meta__v">Digital Agency</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Scope</span><span className="cs-meta__v">Full website redesign</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Tools</span><span className="cs-meta__v">Figma</span></div>
      </div>

      {/* 01 Overview */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">A rebuild framed as a communication problem</h2>
        <div className="cs-callout">
          <p className="cs-callout__quote">
            The agency operated in a highly saturated digital services market where differentiation is difficult. This
            project reframed the redesign not as a visual refresh but as a strategic communication overhaul ...
            clarifying positioning, sharpening hierarchy and making credibility the load-bearing element of the page.
          </p>
        </div>
      </section>

      {/* 02 Problem */}
      <section className="cs-sec" id="s-problem">
        <p className="cs-eyebrow">02 · Problem</p>
        <h2 className="cs-h2">Problem statement</h2>
        <p className="cs-lead">
          Their previous digital presence lacked clarity in positioning, inconsistent messaging, and weak information
          hierarchy ... resulting in:
        </p>
        <ul className="cs-bullets">{problemPains.map((t) => <li key={t}>{t}</li>)}</ul>

        <div className="cs-callout" style={{ marginTop: "1.6rem" }}>
          <p className="cs-callout__label">Core insight</p>
          <p className="cs-callout__quote">
            The core problem was not just visual design ... it was a strategic communication gap.
          </p>
        </div>

        <h3 className="cs-h3">The objective</h3>
        <p className="cs-lead">The goal was to build a website that acts as:</p>
        <div className="cs-principles">
          {websiteActsAs.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>
      </section>

      {/* 03 Users & Goals */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">03 · Users &amp; Goals</p>
        <h2 className="cs-h2">Two audiences, one page</h2>
        <div className="cs-constraints">
          <div className="cs-constraint">
            <span className="cs-constraint__k">Business goals</span>
            <ul className="cs-bullets cs-bullets--sm">{businessGoals.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="cs-constraint">
            <span className="cs-constraint__k">User goals</span>
            <ul className="cs-bullets cs-bullets--sm">{userGoals.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>

        <h3 className="cs-h3">Target audience</h3>
        <div className="cs-principles">
          {targetAudience.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>

        <h3 className="cs-h3">Competitive analysis</h3>
        <p className="cs-lead">Common failure modes across competitor agency sites:</p>
        <ul className="cs-bullets cs-bullets--x">{competitiveGaps.map((t) => <li key={t}>{t}</li>)}</ul>
        <p className="cs-note">Gap identified: lack of clarity + structured storytelling.</p>
      </section>

      {/* 04 Challenges */}
      <section className="cs-sec" id="s-challenges">
        <p className="cs-eyebrow">04 · Challenges</p>
        <h2 className="cs-h2">Key challenges</h2>
        <div className="cs-features">
          {challenges.map((t) => (
            <div className="cs-feature" key={t}>
              <span className="cs-feature__k">Challenge</span>
              <p className="cs-lead cs-lead--sm">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Strategy */}
      <section className="cs-sec" id="s-strategy">
        <p className="cs-eyebrow">05 · Strategy</p>
        <h2 className="cs-h2">Strategy &amp; approach</h2>
        <p className="cs-lead">
          The redesign follows five commitments — each traded ornamental design for a clearer reason to trust the
          agency:
        </p>
        <div className="cs-principles">
          {strategy.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>

        <h3 className="cs-h3">Three pillars the page had to deliver</h3>
        <div className="cs-constraints">
          {pillars.map((p) => (
            <div className="cs-constraint" key={p.k}>
              <span className="cs-constraint__k">{p.k}</span>
              <p className="cs-lead cs-lead--sm">{p.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 Wireframes */}
      <section className="cs-sec cs-sec--img" id="s-wireframes">
        <p className="cs-eyebrow">06 · Wireframes</p>
        <h2 className="cs-h2">Wireframes</h2>
        <figure className="cs-wide">
          <CaseImg src={IMG("wireframes")} alt="DigiAgency wireframes" ratio="wide" />
        </figure>
      </section>

      {/* 07 Design System */}
      <section className="cs-sec cs-sec--img" id="s-designsystem">
        <p className="cs-eyebrow">07 · Design System</p>
        <h2 className="cs-h2">Design system</h2>
        <p className="cs-lead">Colour palette, type scale, icon set, button states and componentry that carry the site's Clarity, Authority and Conversion pillars.</p>
        <figure className="cs-wide">
          <CaseImg src={IMG("design-system")} alt="DigiAgency design system" ratio="wide" />
        </figure>
      </section>

      {/* 08 Designs */}
      <section className="cs-sec cs-sec--img" id="s-designs">
        <p className="cs-eyebrow">08 · Designs</p>
        <h2 className="cs-h2">Final website UI</h2>
        <p className="cs-lead">The final screens ... landing hero, service tiles, projects grid, testimonials and the contact flow.</p>
        <figure className="cs-wide">
          <CaseImg src={IMG("designs")} alt="DigiAgency final website UI" ratio="wide" />
        </figure>
      </section>

      {/* 09 Impact */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">09 · Impact</p>
        <h2 className="cs-h2">Impact &amp; takeaways</h2>
        <div className="cs-impact">
          <div className="cs-impact__card cs-impact__card--accent">
            <span className="cs-impact__k">Design takeaways</span>
            <ul className="cs-bullets cs-bullets--sm">{takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="cs-impact__card">
            <span className="cs-impact__k">Outcome</span>
            <p className="cs-lead cs-lead--sm">
              A rebuilt digital presence structured around trust, clarity and clear next-steps ... with the case studies
              and credibility signals doing the persuading instead of adjective-heavy hero copy.
            </p>
          </div>
        </div>

        <h3 className="cs-h3">What clients said</h3>
        <div className="cs-testimonials">
          {testimonials.map((t) => (
            <figure className="cs-testimonial" key={t.quote}>
              <span className="cs-testimonial__mark" aria-hidden>&ldquo;</span>
              <blockquote className="cs-testimonial__quote">{t.quote}</blockquote>
              <figcaption className="cs-testimonial__by">
                <span className="cs-testimonial__name">{t.name}</span>
                <span className="cs-testimonial__meta">{t.meta} · {t.rating}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="cs-reflect">
          <div className="cs-reflect__takeaways">
            <span className="cs-principle">Final outcome</span>
          </div>
          <blockquote className="cs-reflect__final">
            A website built to deliver Clarity, Authority and Conversion ... one that reads as a credibility engine, a
            storytelling platform and a lead-generation system, in equal measure.
          </blockquote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
