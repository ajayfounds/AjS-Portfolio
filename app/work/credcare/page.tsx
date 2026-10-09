import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "CredCare — a credit app that hides the score · Ajay Srivastava",
  description:
    "A credit-recovery app for people who avoid credit apps. Live prototype, 5+ interviews, one behavioural insight that shaped every screen."
};

// primary = deep trust/premium blue (payments UX), on the warm home canvas.
// 7.5:1 on the card surface, so the accent stays readable at eyebrow/label sizes.
const ACCENT = "#27418F";
const LIVE = "https://credcarefintech.vercel.app/";

// Narrative arc: overview → solution + demos → outcomes (up high) → problem →
// users → approach → design → reflection. Show the WIN before the WORK.
const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-solution", num: "02", label: "Solution" },
  { id: "s-outcomes", num: "03", label: "Outcomes" },
  { id: "s-problem", num: "04", label: "Real Pain Points" },
  { id: "s-users", num: "05", label: "Users" },
  { id: "s-approach", num: "06", label: "Decision thinking" },
  { id: "s-design", num: "07", label: "Design" },
  { id: "s-impact", num: "08", label: "Impact" },
  { id: "s-reflection", num: "09", label: "Reflection" }
];

/* ── What I deliberately did not design (restored callout) ───── */
const didntDesign = [
  "No full credit report on home screen",
  "No instant score boost promises",
  "No loan upselling during recovery",
  "No aggressive graphs or red alerts"
];

/* ── User testimonials — pre-rendered card images (used as-is, no edit).
       Files: /public/case/credcare/quote-{1..4}.png, each 1260×764.        */
const testimonials = [
  { src: "/case/credcare/quote-1.png", alt: "Prisha Raj (26, Teacher) — First time I actually understood why my score had dropped. The plan didn't feel like homework, more like someone was in it with me." },
  { src: "/case/credcare/quote-2.png", alt: "Saksham Kuntal (29, Police SI Officer) — That Trust Meter thing helped me way more than my actual score ever did. First time an app told me I was making progress instead of just reminding me I'd screwed up." },
  { src: "/case/credcare/quote-3.png", alt: "Rohit Sahu (31, Engineer) — Hadn't touched a credit app in like eight months. Logged into this one half expecting to get lectured, and it just… didn't. So I stuck around." },
  { src: "/case/credcare/quote-4.png", alt: "Shivii Rai (21, Student) — Read a few of the Learn cards on the metro. Genuinely didn't know minimum payments were a trap until then. Nobody teaches you this stuff." }
];

/* ── Approach ────────────────────────────────────────────────── */
const principles = [
  "Progress > perfection",
  "Hope before numbers",
  "Explain, don’t judge",
  "Support users during failure"
];

const mapping = {
  head: ["Home Section", "Rohit (Anxious)", "Neha (Confused)", "Amit (Cautious)"],
  rows: [
    ["Score Snapshot", "De-emphasised", "Informative", "Trend-focused"],
    ["Primary Message", "Reassurance", "Clarity", "Validation"],
    ["Progress", "Motivation", "Insight", "Confidence"],
    ["Next Action", "One clear task", "Priority-based", "Often “no action”"],
    ["Alerts", "Soft", "Informational", "Minimal"]
  ]
};

/* ── Screens (unchanged captions, unchanged file paths) ──────── */
const onboarding = [
  { img: "splash", title: "Splash", cap: "" },
  { img: "onboarding", title: "Rebuild trust. Without shame.", cap: "The pitch, in the app’s own words." },
  { img: "signup", title: "Create your account", cap: "" },
  { img: "login", title: "Welcome back", cap: "" },
  { img: "verify", title: "Verify identity", cap: "" },
  { img: "data-use", title: "How we use data", cap: "" },
  { img: "safe-space", title: "This is a safe space", cap: "" }
];

const homeScreens = [
  { img: "home", title: "Home", cap: "Score snapshot, Trust Meter and one Next Best Action — reassurance before data." }
];

const recoveryScreens = [
  { img: "analysis", title: "Analysis", cap: "Score history with the impact events that actually moved it." },
  { img: "recovery-plan", title: "Recovery Plan", cap: "Why your score dropped, then a staged roadmap instead of a wall of numbers." },
  { img: "days-0-30", title: "0–30 Days", cap: "Stabilisation and damage control." },
  { img: "days-30-90", title: "30–90 Days", cap: "Building a pattern of good behaviour." },
  { img: "days-90-180", title: "90–180 Days", cap: "Visible score growth." }
];

const actionScreens = [
  { img: "action-center", title: "Action Center", cap: "Prioritised to-dos split across My Tasks and Loans & Cards." },
  { img: "task-pay", title: "Task detail", cap: "Context, amount, due date — and a Do Later that never shames." },
  { img: "auto-pay", title: "Set up Auto-pay", cap: "Turn a recurring worry into a one-time setup." },
  { img: "dispute", title: "Dispute CIBIL Error", cap: "" },
  { img: "upload-income", title: "Upload Income Proof", cap: "" },
  { img: "all-set", title: "All caught up", cap: "The empty state, redesigned three times because early testers found it unsettling." }
];

const learnScreens = [
  { img: "learn", title: "Learn", cap: "" },
  { img: "card-credit-scores", title: "How Credit Scores Actually Work", cap: "" },
  { img: "card-snowball", title: "Snowball vs. Avalanche Method", cap: "" },
  { img: "card-dispute", title: "Disputing Errors on Your Report", cap: "" },
  { img: "card-minimum", title: "The Truth About Minimum Payments", cap: "" }
];

const fullCore = [
  { img: "full-home", title: "Home — full screen", cap: "Score snapshot → Trust Meter → Next Best Action → Quick Actions" }
];
const fullLearn = [
  { img: "full-learn", title: "Learn — full screen", cap: "Featured guide, category filters and the latest guides" },
  { img: "full-credit-scores", title: "How Credit Scores Actually Work — full screen", cap: "The Big Four Factors, with a Pro Tip and a helpfulness check" },
  { img: "full-minimum", title: "The Truth About Minimum Payments — full screen", cap: "The Math Trap — why paying the minimum costs years" }
];

const profileScreens = [
  { img: "profile", title: "Profile", cap: "" },
  { img: "personal-info", title: "Personal Information", cap: "" },
  { img: "privacy", title: "Privacy & Security", cap: "" },
  { img: "data-permissions", title: "Data Permissions", cap: "" },
  { img: "notifications", title: "Notifications", cap: "" },
  { img: "help-support", title: "Help & Support", cap: "" }
];

function FullScreens({ items }: { items: { img: string; title: string; cap: string }[] }) {
  return (
    <div className="cs-fulls">
      {items.map((s) => (
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
  );
}

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
      <section className="cs-hero cs-hero--video">
        <video
          className="cs-hero__video"
          src="/case/credcare/cover.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-label="CredCare product overview"
        />
      </section>

      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Fintech</span>
          <span className="cs-tag">iOS · Live prototype</span>
        </div>
        {/* Hero headline: what it IS, in ≤10 words, true. */}
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> A credit-recovery app that hides the score.
        </h1>
        <p className="cs-title__lead">
          CredCare is a mobile credit-recovery product for the people credit apps aren’t built for —
          the ones who quietly hide the app on page 3 of their phone. A live iOS prototype,
          shaped by 5+ interviews with people in the middle of a low-score recovery.
        </p>
        <a className="cs-cta" href={LIVE} target="_blank" rel="noopener noreferrer">
          Experience Live <span aria-hidden>↗</span>
        </a>
      </header>

      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">Product Designer</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Timeline</span><span className="cs-meta__v">15 days · 2025</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Team</span><span className="cs-meta__v">Solo</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Skills</span><span className="cs-meta__v">User research · UX writing · iOS design · Prototype</span></div>
      </div>

      {/* 01 Overview */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">What if a credit app made people want to check it?</h2>
        <p className="cs-lead">
          Every credit app I could find treated a low score as a debt-collector problem: numbers,
          alerts, red banners, more numbers. So the users who most needed help avoided the apps entirely.
          I designed for that avoidance instead of around it.
        </p>
        <figure className="cs-wide" style={{ marginTop: "1.6rem" }}>
          <img src="/case/credcare/overview-problem.png" alt="Problem statement — the users credit apps aren’t built for" loading="lazy" />
        </figure>
      </section>

      {/* 02 Solution — the product, up high */}
      <section className="cs-sec" id="s-solution">
        <p className="cs-eyebrow">02 · Solution</p>
        <h2 className="cs-h2">
          CredCare: a mobile credit-recovery app that leads with tone, then guides one action at a time.
        </h2>
        <p className="cs-lead">
          Three moves define the product: the score is <em>de-emphasised</em>, a Trust Meter shows
          consistency instead, and the Home screen answers <em>“am I fixing it?”</em> before it
          answers <em>“what’s my score?”</em>.
        </p>
        <figure className="cs-shot" style={{ maxWidth: "300px", margin: "1.6rem auto 0" }}>
          <img src="/case/credcare/home.webp" alt="CredCare home screen: Trust Meter, Next Best Action, soft score snapshot" loading="lazy" />
          <figcaption>
            <span className="cs-shot__t">Home — reassurance before data</span>
            <span className="cs-shot__c">The full end-to-end flow lives in section 07.</span>
          </figcaption>
        </figure>
      </section>

      {/* 03 Outcomes — real, qualitative, no fake metrics */}
      <section className="cs-sec" id="s-outcomes">
        <p className="cs-eyebrow">03 · Outcomes</p>
        <h2 className="cs-h2">20+ users navigated the recovery flow without asking for help.</h2>
        <div className="cs-impact">
          <div className="cs-impact__card cs-impact__card--accent">
            <span className="cs-impact__k">What the prototype earned</span>
            <ul className="cs-bullets cs-bullets--sm">
              <li>In usability sessions, all 20+ testers moved Home → Recovery Plan → first task without stalling or asking for clarification.</li>
              <li>Unprompted, testers pointed at the <strong>Trust Meter</strong> — not the score — as the reason they’d return.</li>
              <li>The “all caught up” empty state was rewritten <strong>three times</strong> because early testers read silence as neglect.</li>
              <li>Live prototype at <a href={LIVE} target="_blank" rel="noopener noreferrer">credcarefintech.vercel.app</a>.</li>
            </ul>
          </div>
          <div className="cs-impact__card">
            <span className="cs-impact__k">What I’m not claiming</span>
            <p className="cs-lead cs-lead--sm">
              No shipped-to-production metrics. No downloads, no funnel numbers. The product is a
              self-initiated case study with a working web prototype and 20+ real users in the loop —
              framed honestly, not dressed up.
            </p>
          </div>
        </div>
      </section>

      {/* 04 The problem — key insight callout lives here */}
      <section className="cs-sec" id="s-problem">
        <p className="cs-eyebrow">04 · The Problem</p>
        <h2 className="cs-h2">Shame turns credit apps invisible.</h2>
        <p className="cs-lead">
          Users with a damaged score don’t need more data. They need a reason not to close the tab.
          Existing products lead with the number the user is most afraid of.
        </p>

        <figure className="cs-wide" style={{ marginTop: "1.8rem" }}>
          <img src="/case/credcare/insight.png" alt="Key insight — people had hidden their credit app on page 3 of their phone" loading="lazy" />
        </figure>
      </section>

      {/* 05 Users — 3 personas */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">05 · Users</p>
        <h2 className="cs-h2">Three ways people get stuck.</h2>
        <div className="cs-personas cs-personas--images">
          <figure className="cs-wide">
            <img src="/case/credcare/persona-rohit.png" alt="Rohit — the Anxious Avoider persona" loading="lazy" />
          </figure>
          <figure className="cs-wide">
            <img src="/case/credcare/persona-neha.png" alt="Neha — the Confused Struggler persona" loading="lazy" />
          </figure>
          <figure className="cs-wide">
            <img src="/case/credcare/persona-amit.png" alt="Amit — the Cautious Rebuilder persona" loading="lazy" />
          </figure>
        </div>
      </section>

      {/* 06 Decision thinking — HMW broad + narrow, principles, cut features */}
      <section className="cs-sec" id="s-approach">
        <p className="cs-eyebrow">06 · Decision thinking</p>
        <h2 className="cs-h2">Design for the moment before the reveal.</h2>

        <div className="cs-callout" style={{ marginBottom: "1.6rem" }}>
          <p className="cs-callout__label">HMW — broad</p>
          <p className="cs-callout__quote">
            How might we design a credit product for people who <em>avoid</em> credit products?
          </p>
        </div>
        <div className="cs-callout">
          <p className="cs-callout__label">HMW — narrow</p>
          <p className="cs-callout__quote">
            How might the Home screen answer <em>“am I fixing it?”</em> before it answers <em>“what’s my score?”</em>
          </p>
        </div>

        <h3 className="cs-h3">The four principles I prioritised</h3>
        <div className="cs-principles">
          {principles.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>

        <h3 className="cs-h3">Persona → Home content mapping</h3>
        <p className="cs-lead cs-lead--sm">
          Same layout, three reads. Copy and hierarchy shift based on the persona the home routes to.
        </p>
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

        <h3 className="cs-h3">Features I considered and cut</h3>
        <figure className="cs-wide">
          <img src="/case/credcare/features-cut.png" alt="Features I considered and cut — AI chat coach, score prediction, streaks, danger bands" loading="lazy" />
        </figure>

        {/* Restored: What I deliberately did NOT design */}
        <div className="cs-callout" style={{ marginTop: "1.6rem" }}>
          <p className="cs-callout__label">What I deliberately did NOT design</p>
          <ul className="cs-bullets cs-bullets--x">{didntDesign.map((t) => <li key={t}>{t}</li>)}</ul>
          <p className="cs-note">( Because these increase stress, mistrust, and drop-off )</p>
        </div>
      </section>

      {/* 08 Design — the whole flow, screens grouped by role */}
      <section className="cs-sec" id="s-design">
        <p className="cs-eyebrow">07 · Design</p>
        <h2 className="cs-h2">The whole flow, and one honest reason per section.</h2>

        <h3 className="cs-h3">Wireframes</h3>
        <p className="cs-lead cs-lead--sm">
          Low-fi first, so tone problems surfaced before layout did.
        </p>
        <figure className="cs-wide">
          <img src="/case/credcare/wireframes.webp" alt="Hand-drawn low-fidelity wireframes for CredCare" loading="lazy" />
        </figure>

        <h3 className="cs-h3">Information architecture</h3>
        <figure className="cs-wide cs-wide--dark">
          <img src="/case/credcare/ia.webp" alt="CredCare information architecture map" loading="lazy" />
        </figure>

        <h3 className="cs-h3">Onboarding &amp; trust setup</h3>
        <p className="cs-lead cs-lead--sm">
          Every screen introduces one thing, states the tone contract (“no judgement”), and asks for the
          minimum permission the next screen needs.
        </p>
        <ScreenGrid items={onboarding} />

        <h3 className="cs-h3">Home</h3>
        <p className="cs-lead cs-lead--sm">
          The single most re-designed screen. Score snapshot is soft; Trust Meter dominates.
        </p>
        <div className="cs-duo">
          <figure className="cs-shot">
            <img src="/case/credcare/home.webp" alt="Home" loading="lazy" />
            <figcaption>
              <span className="cs-shot__t">{homeScreens[0].title}</span>
              <span className="cs-shot__c">{homeScreens[0].cap}</span>
            </figcaption>
          </figure>
          <figure className="cs-full">
            <div className="cs-full__frame">
              <img src="/case/credcare/full-home.webp" alt={fullCore[0].title} loading="lazy" />
            </div>
            <figcaption>
              <span className="cs-shot__t">{fullCore[0].title}</span>
              <span className="cs-shot__c">{fullCore[0].cap}</span>
            </figcaption>
          </figure>
        </div>

        <h3 className="cs-h3">Recovery</h3>
        <p className="cs-lead cs-lead--sm">
          A staged roadmap instead of a wall of numbers. The user always knows which phase they’re in.
        </p>
        <ScreenGrid items={recoveryScreens} />

        <h3 className="cs-h3">Action Center</h3>
        <p className="cs-lead cs-lead--sm">
          Prioritised, single-action-at-a-time. “Do Later” is a first-class button, not a hidden one.
        </p>
        <ScreenGrid items={actionScreens} />

        <h3 className="cs-h3">Learn &amp; learning cards</h3>
        <p className="cs-lead cs-lead--sm">
          Metro-length reads. Plain language. Cards are named for the question the user has, not the concept.
        </p>
        <ScreenGrid items={learnScreens} />
        <FullScreens items={fullLearn} />

        <h3 className="cs-h3">Profile &amp; controls</h3>
        <ScreenGrid items={profileScreens} />
      </section>

      {/* 09 Impact — restored: user testimonials + final outcome (moved above Reflection) */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">08 · Impact</p>
        <h3 className="cs-h3">What users said</h3>
        <div className="cs-vquotes">
          {testimonials.map((t, i) => (
            <figure className="cs-vquote-img" key={t.src}>
              <img
                src={t.src}
                alt={t.alt}
                width={1260}
                height={764}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "low"}
                sizes="(max-width: 900px) 100vw, min(900px, 100%)"
              />
            </figure>
          ))}
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

      {/* 10 Reflection — vulnerability + 2 contrarian + 1 practical (now last) */}
      <section className="cs-sec" id="s-reflection">
        <p className="cs-eyebrow">09 · Reflection</p>
        <h2 className="cs-h2">What CredCare taught me about designing for shame.</h2>

        {/* Vulnerability moment */}
        <div className="cs-callout" style={{ marginTop: "1rem" }}>
          <p className="cs-callout__label">The honest bit</p>
          <p className="cs-callout__quote">
            My first draft felt like a bank. Compliant, correct, cold. Testers called it “another CIBIL
            clone” — and they were right. I threw it out and restarted from the tone problem instead of the
            feature list. That restart is where the actual design started.
          </p>
        </div>

        <h3 className="cs-h3">Three things I now believe</h3>
        <figure className="cs-wide">
          <img src="/case/credcare/believes.png" alt="Three things I now believe — reflections from designing CredCare" loading="lazy" />
        </figure>
      </section>
    </CaseStudyLayout>
  );
}
