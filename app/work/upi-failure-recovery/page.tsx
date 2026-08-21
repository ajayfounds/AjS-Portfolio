import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "UPI Failure & Money Anxiety Recovery System — Ajay Srivastava",
  description: "Designing trust and clarity during payment failures."
};

// primary = calm clarity teal (safe, trust, anxiety-reducing), on the warm home canvas
// calm deep teal: clarity and safety without alarm — the opposite of a red error
// state. 5.5:1 on the card surface, so labels and small text stay legible.
const ACCENT = "#0A6473";
const LIVE = "https://payment-limbo-edgecase.vercel.app/";

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-objective", num: "02", label: "Objective" },
  { id: "s-users", num: "03", label: "Users" },
  { id: "s-strategy", num: "04", label: "Strategy" },
  { id: "s-designs", num: "05", label: "Designs" },
  { id: "s-impact", num: "06", label: "Impact" },
  { id: "s-reflection", num: "07", label: "Reflection" }
];

const whyMatters = [
  "UPI is used for daily survival expenses",
  "Failures create panic, not inconvenience",
  "Most apps design for success, not failure"
];

const problemSub = [
  "Binary “Failed” states cause panic",
  "Users retry payments unnecessarily",
  "Trust breaks at the worst moment"
];

const secondaryObjectives = ["Reduce panic retries", "Set clear expectations", "Avoid unnecessary support escalation"];

const personas = [
  {
    name: "Ravi",
    tag: "Student Handling Daily Survival Payments",
    intro:
      "Ravi uses UPI for rent, food, and shared expenses. His account balance is limited, and even small delays affect daily decisions.",
    usage: ["Frequent, small-to-medium transactions", "Uses UPI for essentials, not savings", "Often pays under time pressure"],
    failure: ["Panics when money is deducted", "Refreshes repeatedly", "Retries payment too quickly"],
    need: "Clear confirmation that his money is safe and guidance on what to do next.",
    opp: "Prevent panic-driven retries by providing reassurance and visible progress."
  },
  {
    name: "Neha",
    tag: "Working Professional Managing Shared Payments",
    intro:
      "Neha uses UPI daily to split bills, pay rent, and send money to friends. She expects reliability and transparency.",
    usage: ["Multiple transactions per day", "Often time-sensitive (dinners, cabs, bills)", "Confident with apps, impatient with ambiguity"],
    failure: ["Gets frustrated by vague error states", "Unsure whether to retry or wait", "Loses trust quickly if support feels unclear"],
    need: "Quick clarity on payment status and clear next steps.",
    opp: "Replace vague failures with timelines and expectations to maintain trust."
  },
  {
    name: "Mr. Sharma",
    tag: "Cautious Parent Using UPI Carefully",
    intro:
      "Mr. Sharma uses UPI cautiously for essential payments. He is comfortable with basics but avoids complexity and risk.",
    usage: ["Infrequent but important payments", "Double-checks before confirming", "Avoids exploring help sections"],
    failure: ["Feels anxious and helpless", "Unsure whom to trust", "Avoids retrying without reassurance"],
    need: "Simple language, strong reassurance, and visible human support.",
    opp: "Design low-stress, human-centered recovery flows with minimal actions required."
  }
];

const painQuotes = ["Just tell me if my money is safe", "I paid again because I panicked", "The app doesn’t explain anything"];
const observations = [
  "Anxiety peaks after payment, not before",
  "Users want certainty, not speed",
  "Most failures auto-resolve",
  "Red error states amplify stress"
];

const decisions = [
  ["Neutral failure state", "Reduce panic", "Less immediate certainty"],
  ["Status timeline", "Clarity", "More UI complexity"],
  ["Delayed support", "Prevent panic tickets", "Some users want instant help"]
];

const constraints = [
  { k: "Technical", items: ["Bank confirmation delays", "Limited real-time visibility"] },
  { k: "Business", items: ["Support costs", "Legal risks of false promises"] },
  { k: "User", items: ["Low financial literacy", "High emotional sensitivity"] }
];

const principles = ["Clarity over speed", "Progressive disclosure", "Reassurance before action", "Human language, not system language"];

// Designs section — annotated plates, shown in order. Each image carries its own
// callouts, so the labels below are alt text only.
const plates = [
  "Checking payment ... the first five seconds",
  "Payment status timeline",
  "Explainer bottom sheet",
  "Escalating ... still waiting for update",
  "Payment update notification",
  "Escalation to support",
  "Resolution ... payment successful",
  "Resolution ... money refunded",
  "Duplicate payment guardrail",
  "Reassurance after the incident",
  "Support handoff"
];

const impactUser = ["Reduced panic", "Better decisions"];
const impactBiz = ["Fewer tickets", "Higher trust retention"];
const didntDesign = ["No success flow redesign", "No instant refund promises", "No aggressive alerts"];
const takeaways = ["Failure UX matters most", "Trust beats speed", "Constraints improve design", "Language is UX"];

const testimonials = [
  {
    quote:
      "I was about to just send it again, which would've meant paying twice. The duplicate warning stopped me. That's ₹8,000 I didn't lose.",
    name: "Rakesh Narwar",
    meta: "38 · Small-shop Owner"
  },
  {
    quote:
      "Usually you get 'transaction failed' and that's it. This one told me roughly when to expect the refund, so I finally stopped refreshing my bank app every two minutes.",
    name: "Neha Kumari",
    meta: "29 · Teacher"
  },
  {
    quote:
      "When I hit escalate it didn't feel like shouting into nothing. Felt like someone was actually on it.",
    name: "Nandini Tiwari",
    meta: "45 · Nutrition Consultant"
  },
  {
    quote:
      "Sent it to my mom a week later and she got it straight away. If my mom understands it, it's doing something right.",
    name: "Ananya Tiwari",
    meta: "26 · Business Analyst"
  }
];

export default function UpiCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      {/* ── Hero ── */}
      <section className="cs-hero">
        <div className="cs-hero__phones" aria-hidden>
          <img className="cs-hero__phone cs-hero__phone--l" src="/case/upi/timeline.png" alt="" />
          <img className="cs-hero__phone cs-hero__phone--c" src="/case/upi/checking.png" alt="" />
          <img className="cs-hero__phone cs-hero__phone--r" src="/case/upi/credited.png" alt="" />
        </div>
      </section>

      {/* ── Title block ── */}
      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Self-initiated</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> UPI Failure &amp; Money Anxiety Recovery System
        </h1>
        <p className="cs-title__lead">
          Designing trust and clarity during payment failures. UPI payment failures create moments of high financial
          anxiety where users lack clarity, reassurance, and control ... so I designed the recovery, not the error.
        </p>
        <a className="cs-cta" href={LIVE} target="_blank" rel="noopener noreferrer">
          Experience LIVE (for smartphone) <span aria-hidden>↗</span>
        </a>
      </header>

      {/* ── Meta band ── */}
      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">Product Designer</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Focus</span><span className="cs-meta__v">Failure UX, Trust, Anxiety Reduction</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Duration</span><span className="cs-meta__v">7 days</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Platform</span><span className="cs-meta__v">Mobile app</span></div>
      </div>

      {/* ── 01 Overview ── */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">Why UPI failures matter</h2>
        <ul className="cs-bullets">
          {whyMatters.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="cs-callout">
          <p className="cs-callout__label">Problem statement</p>
          <p className="cs-callout__quote">
            UPI payment failures create moments of high financial anxiety where users lack clarity, reassurance, and control.
          </p>
          <div className="cs-chiprow">
            {problemSub.map((t) => <span key={t} className="cs-chip">{t}</span>)}
          </div>
        </div>
      </section>

      {/* ── 02 Objective ── */}
      <section className="cs-sec" id="s-objective">
        <p className="cs-eyebrow">02 · Objective</p>
        <h2 className="cs-h2">Design objective</h2>
        <div className="cs-obj">
          <div className="cs-obj__primary">
            <span className="cs-obj__k">Primary objective</span>
            <p className="cs-obj__v">Help users recover trust during UPI failures</p>
          </div>
          <div className="cs-obj__secondary">
            <span className="cs-obj__k">Secondary objectives</span>
            <ul className="cs-bullets">
              {secondaryObjectives.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 03 Users ── */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">03 · Users</p>
        <h2 className="cs-h2">Who breaks, and where</h2>
        <div className="cs-personas">
          {personas.map((p) => (
            <article className="cs-persona" key={p.name}>
              <div className="cs-persona__id">
                <h3 className="cs-persona__name">{p.name}</h3>
                <p className="cs-persona__tag">{p.tag}</p>
                <p className="cs-persona__intro">{p.intro}</p>
              </div>
              <div className="cs-persona__detail">
                <div className="cs-persona__cols">
                  <div>
                    <p className="cs-persona__k">UPI usage pattern</p>
                    <ul className="cs-bullets cs-bullets--sm">{p.usage.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div>
                    <p className="cs-persona__k">What happens during a failure</p>
                    <ul className="cs-bullets cs-bullets--sm">{p.failure.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                </div>
                <dl className="cs-persona__needs">
                  <div><dt>Core need</dt><dd>{p.need}</dd></div>
                  <div><dt>Design opportunity</dt><dd>{p.opp}</dd></div>
                </dl>
              </div>
            </article>
          ))}
        </div>

        <div className="cs-split">
          <div>
            <h3 className="cs-h3">User pain</h3>
            <ul className="cs-quotes">
              {painQuotes.map((q) => <li key={q}>{"“"}{q}{"”"}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="cs-h3">Key observations</h3>
            <ul className="cs-bullets">
              {observations.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 04 Strategy ── */}
      <section className="cs-sec" id="s-strategy">
        <p className="cs-eyebrow">04 · Strategy</p>
        <h2 className="cs-h2">Reframing failure as recovery</h2>

        <div className="cs-shift">
          <p className="cs-shift__from">Failure is not an error state. It{"’"}s a trust recovery moment.</p>
          <p className="cs-shift__to">Designed emotional flow, not just screens.</p>
        </div>

        <h3 className="cs-h3">Key decisions &amp; trade-offs</h3>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <thead><tr><th>Decision</th><th>Why</th><th>Trade-off</th></tr></thead>
            <tbody>
              {decisions.map((r) => (
                <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="cs-h3">Constraints</h3>
        <div className="cs-constraints">
          {constraints.map((c) => (
            <div className="cs-constraint" key={c.k}>
              <span className="cs-constraint__k">{c.k}</span>
              <ul className="cs-bullets cs-bullets--sm">{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>

        <h3 className="cs-h3">Design principles</h3>
        <div className="cs-principles">
          {principles.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>
      </section>

      {/* ── 05 Designs ── */}
      <section className="cs-sec" id="s-designs">
        <p className="cs-eyebrow">05 · Designs</p>
        <h2 className="cs-h2">Design with thinking behind it</h2>
        {/* the plates carry their own annotations, so they run full-width in
            sequence with no caption of their own */}
        <div className="cs-plates">
          {plates.map((p, i) => (
            <figure className="cs-plate" key={p}>
              <img src={`/case/upi/plate-${String(i + 1).padStart(2, "0")}.webp`} alt={p} loading="lazy" />
            </figure>
          ))}
        </div>
      </section>

      {/* ── 06 Impact ── */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">06 · Impact</p>
        <h2 className="cs-h2">Impact</h2>
        <div className="cs-impact cs-impact--pair">
          <div className="cs-impact__card">
            <span className="cs-impact__k">User impact</span>
            <ul className="cs-bullets cs-bullets--sm">{impactUser.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="cs-impact__card">
            <span className="cs-impact__k">Business impact</span>
            <ul className="cs-bullets cs-bullets--sm">{impactBiz.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <p className="cs-note">** (hypothetical, behavior-based)</p>

        {/* kept apart from the impact pair — it's scope, not an outcome */}
        <div className="cs-scope">
          <span className="cs-impact__k">What I deliberately didn{"’"}t design</span>
          <ul className="cs-bullets cs-bullets--sm cs-bullets--x">{didntDesign.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>

        <h3 className="cs-h3">What users said</h3>
        <div className="cs-testimonials">
          {testimonials.map((t) => (
            <figure className="cs-testimonial" key={t.quote}>
              <span className="cs-testimonial__mark" aria-hidden>&ldquo;</span>
              <blockquote className="cs-testimonial__quote">{t.quote}</blockquote>
              <figcaption className="cs-testimonial__by">
                <span className="cs-testimonial__name">{t.name}</span>
                <span className="cs-testimonial__meta">{t.meta}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── 07 Reflection ── */}
      <section className="cs-sec" id="s-reflection">
        <p className="cs-eyebrow">07 · Reflection</p>
        <h2 className="cs-h2">What I learned</h2>
        <div className="cs-reflect">
          <div className="cs-reflect__takeaways">
            {takeaways.map((t) => <span key={t} className="cs-principle">{t}</span>)}
          </div>
          <blockquote className="cs-reflect__final">
            This project taught me that designing for failure is often more impactful than designing for success.
          </blockquote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
