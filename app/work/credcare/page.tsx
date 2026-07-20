import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "CredCare — Fintech Credit Recovery App · Ajay Srivastava",
  description: "Rebuild trust. Without shame. A guided, emotionally safe path out of a low credit score."
};

const ACCENT = "#168b9d";
const BEHANCE = "https://www.behance.net/gallery/246375825/Credcare-FinTech-Credit-Recovery-App";

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-users", num: "02", label: "Users" },
  { id: "s-pain", num: "03", label: "Pain & Insights" },
  { id: "s-constraints", num: "04", label: "Constraints" },
  { id: "s-approach", num: "05", label: "Approach" },
  { id: "s-structure", num: "06", label: "Structure" },
  { id: "s-designs", num: "07", label: "Designs" },
  { id: "s-impact", num: "08", label: "Impact" }
];

const personas = [
  {
    name: "Rohit",
    role: "The Anxious Avoider",
    kind: "Primary Persona",
    context: [
      "First-time credit card + small loan user",
      "Missed EMIs during job instability",
      "Credit score dropped below expectations",
      "Avoids checking credit apps"
    ],
    pain: [
      "Fear of judgement",
      "Doesn’t understand why score dropped",
      "Believes credit damage is permanent",
      "Avoids reminders and finance apps"
    ],
    needs: [
      "Emotional safety before data",
      "Simple explanations",
      "Reassurance that recovery is possible",
      "Clear next step (one at a time)"
    ],
    quote: "I’m scared to see how bad it is"
  },
  {
    name: "Neha",
    role: "The Confused Struggler",
    kind: "Secondary Persona",
    context: [
      "Working professional with multiple EMIs",
      "Uses credit cards frequently",
      "Pays late sometimes, not intentionally",
      "Tracks money but doesn’t understand credit"
    ],
    pain: [
      "Doesn’t know which actions matter",
      "Overwhelmed by multiple dues",
      "Confused by credit terminology",
      "Feels punished without clarity"
    ],
    needs: [
      "Clear cause–effect explanations",
      "Priority-based actions",
      "Visibility into progress",
      "Non-technical language"
    ],
    quote: "I pay most things, why is my score still bad?"
  },
  {
    name: "Amit",
    role: "The Cautious Rebuilder",
    kind: "Edge Persona",
    context: [
      "Previously defaulted on loan",
      "Now stable income",
      "Afraid to make any credit move",
      "Over-cautious, avoids all credit"
    ],
    pain: [
      "Over-avoidance of credit",
      "Fear-driven decisions",
      "No confidence in recovery",
      "Unsure when they are “safe” again"
    ],
    needs: [
      "Confidence signals",
      "Readiness indicators",
      "Long-term reassurance",
      "Clear boundaries of safety"
    ],
    quote: "I don’t want to mess up again"
  }
];

const painGroups = [
  { k: "Emotional Pain", items: ["Fear of checking credit score", "Shame from missed EMIs", "Anxiety about future loans"] },
  { k: "Cognitive Pain", items: ["No clarity on why score dropped", "Credit terminology feels alien", "No sense of progress"] },
  { k: "Behavioral Pain", items: ["Avoidance of finance apps", "Missed reminders due to anxiety", "Inconsistent recovery actions"] }
];

const observations = [
  "Users care more about “Am I fixing it?” than the exact score",
  "Shame causes avoidance → avoidance worsens score",
  "Users don’t need all data, they need next best action",
  "Failure moments (missed EMI) are more important than success moments."
];

const constraints = [
  { k: "Product Constraints", items: ["Fear of checking credit score", "Shame from missed EMIs", "Anxiety about future loans"] },
  { k: "User Constraints", items: ["No clarity on why score dropped", "Credit terminology feels alien", "No sense of progress"] },
  { k: "Ethical Constraints", items: ["No false promises", "No “instant boost” claims", "No aggressive upselling"] }
];

const principles = [
  "Progress > perfection",
  "Hope before numbers",
  "Explain, don’t judge",
  "Support users during failure"
];

const mapping = {
  head: ["Home Section", "Rohit (Anxious)", "Neha (Confused)", "Amit (Cautious)"],
  rows: [
    ["Score Snapshot", "De-emphasized", "Informative", "Trend-focused"],
    ["Primary Message", "Reassurance", "Clarity", "Validation"],
    ["Progress", "Motivation", "Insight", "Confidence"],
    ["Next Action", "One clear task", "Priority-based", "Often “no action”"],
    ["Alerts", "Soft", "Informational", "Minimal"]
  ]
};

const didntDesign = [
  "No full credit report on home screen",
  "No instant score boost promises",
  "No loan upselling during recovery",
  "No aggressive graphs or red alerts"
];

const onboarding = [
  { img: "splash", title: "Splash", cap: "" },
  { img: "onboarding", title: "Rebuild Trust. Without Shame.", cap: "A safe path to financial recovery. No judgment, just progress." },
  { img: "signup", title: "Create your account", cap: "" },
  { img: "login", title: "Welcome back", cap: "" },
  { img: "verify", title: "Verify identity", cap: "" },
  { img: "data-use", title: "How we use data", cap: "" },
  { img: "safe-space", title: "This is a safe space", cap: "" }
];

const coreScreens = [
  { img: "home", title: "Home", cap: "Score snapshot, Trust Meter and one Next Best Action — reassurance before data." },
  { img: "analysis", title: "Analysis", cap: "Score history with the impact events that actually moved it." },
  { img: "recovery-plan", title: "Recovery Plan", cap: "Why your score dropped, then a staged roadmap instead of a wall of numbers." },
  { img: "days-0-30", title: "0–30 Days", cap: "Stabilization & Damage Control" },
  { img: "days-30-90", title: "30–90 Days", cap: "Building trust through a pattern of good behavior" },
  { img: "days-90-180", title: "90–180 Days", cap: "Score growth — visible improvement" },
  { img: "action-center", title: "Action Center", cap: "Prioritized to-dos split across My Tasks and Loans & Cards." },
  { img: "task-pay", title: "Task detail", cap: "Context, amount, due date — and a Do Later that never shames." },
  { img: "dispute", title: "Dispute CIBIL Error", cap: "" },
  { img: "upload-income", title: "Upload Income Proof", cap: "" },
  { img: "all-set", title: "All caught up", cap: "" }
];

const learnScreens = [
  { img: "learn", title: "Learn", cap: "" },
  { img: "card-credit-scores", title: "How Credit Scores Actually Work", cap: "" },
  { img: "card-snowball", title: "Snowball vs. Avalanche Method", cap: "" },
  { img: "card-dispute", title: "Disputing Errors on Your Report", cap: "" },
  { img: "card-minimum", title: "The Truth About Minimum Payments", cap: "" }
];

// full-length screens shown end-to-end, not cropped to the device viewport
const fullScreens = [
  { img: "full-home", title: "Home", cap: "Score snapshot → Trust Meter → Next Best Action → Quick Actions" },
  { img: "full-learn", title: "Learn", cap: "Featured guide, category filters and the latest guides" },
  { img: "full-credit-scores", title: "How Credit Scores Actually Work", cap: "The Big Four Factors, with a Pro Tip and a helpfulness check" },
  { img: "full-minimum", title: "The Truth About Minimum Payments", cap: "The Math Trap — why paying the minimum costs years" }
];

const profileScreens = [
  { img: "profile", title: "Profile", cap: "" },
  { img: "privacy", title: "Privacy & Security", cap: "" },
  { img: "data-permissions", title: "Data Permissions", cap: "" },
  { img: "notifications", title: "Notifications", cap: "" },
  { img: "help-support", title: "Help & Support", cap: "" }
];

const impact = [
  "Increases the task completion rate (guided actions)",
  "Increases the User confidence over time",
  "Increases the On-time payment consistency",
  "Reduces the App drop-off after score reveal",
  "Reduces the support queries due to clarity"
];

const takeaways = [
  "Designing for anxiety requires restraint",
  "Failure states matter more than success states",
  "Progress indicators motivate more than raw data",
  "Trust is built through tone, not features"
];

function ScreenGrid({ items }: { items: { img: string; title: string; cap: string }[] }) {
  return (
    <div className="cs-grid">
      {items.map((s) => (
        <figure className="cs-shot" key={s.img}>
          <img src={`/case/credcare/${s.img}.webp`} alt={s.title} loading="lazy" />
          <figcaption>
            <span className="cs-shot__t">{s.title}</span>
            {s.cap && <span className="cs-shot__c">{s.cap}</span>}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function CredCareCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      <section className="cs-hero">
        <div className="cs-hero__phones" aria-hidden>
          <img className="cs-hero__phone cs-hero__phone--l" src="/case/credcare/recovery-plan.webp" alt="" />
          <img className="cs-hero__phone cs-hero__phone--c" src="/case/credcare/home.webp" alt="" />
          <img className="cs-hero__phone cs-hero__phone--r" src="/case/credcare/analysis.webp" alt="" />
        </div>
      </section>

      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Fintech</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> CredCare — Fintech Credit Recovery App
        </h1>
        <p className="cs-title__lead">
          CredCare is a fintech product designed to helps users with low credit scores emotionally recover from past
          financial mistakes and follow a realistic, step-by-step path to rebuild trust over time.
        </p>
        <p className="cs-title__lead">
          Unlike traditional credit score apps that focus on numbers and alerts, CredCare prioritizes emotional safety,
          clarity, and behavioral guidance helping users understand what went wrong, what to do next, and how progress
          is being made.
        </p>
        <a className="cs-cta" href={BEHANCE} target="_blank" rel="noopener noreferrer" data-link>
          View on Behance <span aria-hidden>↗</span>
        </a>
      </header>

      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">Product Designer</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Platform</span><span className="cs-meta__v">iOS first mobile application</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Duration</span><span className="cs-meta__v">15 days</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Type</span><span className="cs-meta__v">Fintech Credit Recovery</span></div>
      </div>

      {/* 01 Overview */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">Problem statement</h2>
        <div className="cs-callout">
          <p className="cs-callout__quote">
            Users with low credit scores avoid financial apps because they feel shame, fear, and confusion. Existing
            products show numbers without guidance, making credit recovery feel permanent and hopeless.
          </p>
        </div>
      </section>

      {/* 02 Users */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">02 · Users</p>
        <h2 className="cs-h2">Three ways people get stuck</h2>
        <div className="cs-personas">
          {personas.map((p) => (
            <article className="cs-persona" key={p.name}>
              <header className="cs-persona__head">
                <h3 className="cs-persona__name">{p.name} : {p.role}</h3>
                <p className="cs-persona__tag">{p.kind}</p>
              </header>
              <div className="cs-persona__cols">
                <div>
                  <p className="cs-persona__k">Context</p>
                  <ul className="cs-bullets cs-bullets--sm">{p.context.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div>
                  <p className="cs-persona__k">Pain points</p>
                  <ul className="cs-bullets cs-bullets--sm">{p.pain.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
              </div>
              <div className="cs-persona__cols">
                <div>
                  <p className="cs-persona__k">Needs</p>
                  <ul className="cs-bullets cs-bullets--sm">{p.needs.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                <div>
                  <p className="cs-persona__k">Emotional state</p>
                  <p className="cs-persona__quote">{"“"}{p.quote}{"”"}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 03 Pain & insights */}
      <section className="cs-sec" id="s-pain">
        <p className="cs-eyebrow">03 · Pain &amp; Insights</p>
        <h2 className="cs-h2">Key user pain points</h2>
        <div className="cs-constraints">
          {painGroups.map((g) => (
            <div className="cs-constraint" key={g.k}>
              <span className="cs-constraint__k">{g.k}</span>
              <ul className="cs-bullets cs-bullets--sm">{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
        <h3 className="cs-h3">Key observations</h3>
        <ul className="cs-bullets">{observations.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>

      {/* 04 Constraints */}
      <section className="cs-sec" id="s-constraints">
        <p className="cs-eyebrow">04 · Constraints</p>
        <h2 className="cs-h2">What I had to design around</h2>
        <div className="cs-constraints">
          {constraints.map((c) => (
            <div className="cs-constraint" key={c.k}>
              <span className="cs-constraint__k">{c.k}</span>
              <ul className="cs-bullets cs-bullets--sm">{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* 05 Approach */}
      <section className="cs-sec" id="s-approach">
        <p className="cs-eyebrow">05 · Approach</p>
        <h2 className="cs-h2">Objective design approach</h2>
        <div className="cs-shift">
          <p className="cs-shift__from">
            I focused on reducing anxiety first, increasing clarity second, and encouraging action last.
          </p>
          <p className="cs-shift__to">Design principles used</p>
        </div>
        <div className="cs-principles">
          {principles.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>

        <h3 className="cs-h3">Persona → Home screen content mapping</h3>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <thead><tr>{mapping.head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>
              {mapping.rows.map((r) => (
                <tr key={r[0]}>{r.map((c, i) => i === 0 ? <td key={i}><strong>{c}</strong></td> : <td key={i}>{c}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cs-callout">
          <p className="cs-callout__label">What I deliberately did NOT design</p>
          <ul className="cs-bullets cs-bullets--x">{didntDesign.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="cs-note">( Because these increase stress, mistrust, and drop-off )</p>
        </div>
      </section>

      {/* 06 Structure */}
      <section className="cs-sec" id="s-structure">
        <p className="cs-eyebrow">06 · Structure</p>
        <h2 className="cs-h2">Low-fi wireframes</h2>
        <figure className="cs-wide">
          <img src="/case/credcare/wireframes.webp" alt="Hand-drawn low-fidelity wireframes for CredCare" loading="lazy" />
        </figure>
        <h3 className="cs-h3">Information architecture</h3>
        <figure className="cs-wide cs-wide--dark">
          <img src="/case/credcare/ia.webp" alt="CredCare information architecture map" loading="lazy" />
        </figure>
      </section>

      {/* 07 Designs */}
      <section className="cs-sec" id="s-designs">
        <p className="cs-eyebrow">07 · Designs</p>
        <h2 className="cs-h2">Visual designs</h2>

        <h3 className="cs-h3">Onboarding &amp; trust setup</h3>
        <ScreenGrid items={onboarding} />

        <h3 className="cs-h3">Home, recovery &amp; action</h3>
        <ScreenGrid items={coreScreens} />

        <h3 className="cs-h3">Learn &amp; learning cards</h3>
        <ScreenGrid items={learnScreens} />

        <h3 className="cs-h3">Profile &amp; controls</h3>
        <ScreenGrid items={profileScreens} />

        <h3 className="cs-h3">Full screens, end to end</h3>
        <p className="cs-sub">The complete scroll of the key screens — not cropped to the device viewport.</p>
        <div className="cs-fulls">
          {fullScreens.map((s) => (
            <figure className="cs-full" key={s.img}>
              <div className="cs-full__frame">
                <img src={`/case/credcare/${s.img}.webp`} alt={s.title} loading="lazy" />
              </div>
              <figcaption>
                <span className="cs-shot__t">{s.title}</span>
                {s.cap && <span className="cs-shot__c">{s.cap}</span>}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 08 Impact */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">08 · Impact</p>
        <h2 className="cs-h2">Impact</h2>
        <div className="cs-impact">
          <div className="cs-impact__card cs-impact__card--accent">
            <span className="cs-impact__k">Impact</span>
            <ul className="cs-bullets cs-bullets--sm">{impact.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="cs-impact__card">
            <span className="cs-impact__k">Design takeaways</span>
            <ul className="cs-bullets cs-bullets--sm">{takeaways.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>

        <div className="cs-reflect">
          <div className="cs-reflect__takeaways">
            <span className="cs-principle">Final outcome</span>
          </div>
          <blockquote className="cs-reflect__final">
            CredCare transforms credit recovery from a shame-driven experience into a guided, emotionally safe journey
            focused on clarity, consistency, and trust.
          </blockquote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
