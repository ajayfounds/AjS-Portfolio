import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "KoRnt.prm · a workspace for Cairo property teams · Ajay Srivastava",
  description:
    "Product and brand for a Cairo brokerage. One screen that tells an agent what's next, who's waiting and what money is on the line."
};

// KoRnt brand blue, darkened so eyebrows and labels stay readable on the warm canvas
const ACCENT = "#1D5BC8";

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-brand", num: "02", label: "Brand" },
  { id: "s-problem", num: "03", label: "The Problem" },
  { id: "s-solution", num: "04", label: "Solution" },
  { id: "s-users", num: "05", label: "Users" },
  { id: "s-decisions", num: "06", label: "Decision thinking" },
  { id: "s-audit", num: "07", label: "The audit" },
  { id: "s-system", num: "08", label: "Design system" },
  { id: "s-screens", num: "09", label: "Screens" },
  { id: "s-reflection", num: "10", label: "Reflection" }
];

// width/height match the exported webp files, so each plate reserves its space (no layout shift)
const SHOTS = {
  "desktop-light": [1600, 1592],
  principle: [1600, 1156],
  "map-mobile": [1600, 799],
  "listings-watch": [1600, 799],
  "desktop-mobile-light": [1600, 1305],
  "logo-lockup": [1600, 779],
  "logo-construction": [1600, 900],
  "dark-mode": [1600, 1305],
  palette: [1600, 817],
  "widgets-type": [1600, 798],
  posters: [1600, 746]
} as const;

function Shot({ name, alt, cap }: { name: keyof typeof SHOTS; alt: string; cap?: string }) {
  const [w, h] = SHOTS[name];
  return (
    <figure className="cs-wide">
      <img
        src={`/case/real-estate/${name}.webp`}
        alt={alt}
        width={w}
        height={h}
        loading="lazy"
        decoding="async"
        style={{ aspectRatio: `${w} / ${h}` }}
      />
      {cap && <figcaption className="cs-cap">{cap}</figcaption>}
    </figure>
  );
}

const beforeTools = [
  { k: "WhatsApp", v: "Every client conversation, buried between all the others." },
  { k: "A spreadsheet", v: "Which units are still available, if someone updated it." },
  { k: "Phone calls", v: "Chasing developers to confirm availability." },
  { k: "Memory", v: "The schedule, and which deals are close to signing." }
];

const goals = [
  { k: "One screen", v: "The whole day in one place: schedule, waiting clients, money." },
  { k: "Mobile", v: "A view built for the gaps between viewings." },
  { k: "Oversight", v: "Room for the team lead without cluttering the agent's view." }
];

const fiveSeconds = [
  { q: "What's next today?", a: "The greeting, and the next-viewing card right under it." },
  { q: "Who's waiting on me?", a: "“5 clients waiting”, sitting in the greeting. Tap it, get the list." },
  { q: "How am I doing this month?", a: "Commission in one bar: what's collected, and what's still coming." }
];

const decisions = [
  {
    t: "The brand promise became a feature",
    problem:
      "“A clear answer, not a waiting list” is a nice line. It means nothing unless the product actually holds you to it.",
    options: ["Notification list", "Separate inbox page", "A count in the greeting"],
    pick:
      "“5 clients waiting” sits in the greeting and opens the client list. It counts chats that have gone unanswered for more than 24 hours.",
    cost: "A visible count can start to feel like pressure, so it's set in a neutral colour. Not red."
  },
  {
    t: "The next viewing gets the biggest card",
    problem: "The largest card on the screen showed a listing. It looked great and had no clear job.",
    options: ["Revenue as the hero", "A featured listing", "The agent's next action"],
    pick: "The next viewing: the property, the time, the price and the installment plan.",
    cost: "Revenue drops to second place. Agents act on their schedule first and check the money after."
  },
  {
    t: "Collected and pipeline in one chart",
    problem: "A single revenue number hides money that's signed but not paid yet.",
    options: ["Two separate charts", "Stacked bars", "A fill pattern"],
    pick: "Same bar, two fills. Solid is collected, hatched is pipeline.",
    cost: "Hatching needs a legend. That's one more line of UI, and I'll take it."
  },
  {
    t: "Every device gets one job",
    problem: "My tablet and watch screens were just the desktop, shrunk down.",
    options: [] as string[],
    pick: "Desktop plans. Tablet shows clients. Mobile acts. Watch glances.",
    cost: "The map and the table don't make it onto mobile. Agents reach them through Inventory instead."
  }
];

const audit = [
  { k: "Prices", before: "Listings priced far below what Cairo actually sells at.", after: "Priced against the market. A 4-bedroom in Cairo sells for about 27.5M EGP on average." },
  { k: "Map", before: "Compounds pinned on the wrong side of the city.", after: "East Cairo and West Cairo where they really are." },
  { k: "Currency", before: "Dollars mixed in with EGP.", after: "EGP only, everywhere." },
  { k: "Navigation", before: "Sidebar items that didn't match an agent's job.", after: "Rebuilt around what an agent and a team lead actually do." }
];

const typeScale = [
  ["Display", "32 / 40", "SemiBold"],
  ["Title", "20 / 28", "SemiBold"],
  ["KPI", "32 / 36", "SemiBold, tabular figures"],
  ["Body", "14 / 20", "Regular"],
  ["Caption", "12 / 16", "Medium"]
];

const components = [
  "Nav item, 4 states",
  "KPI card + sparkline",
  "Hatched bar chart",
  "Data table",
  "Map with legend",
  "Listing card",
  "Date tile",
  "Bottom tab bar"
];

const walkthrough = [
  ["Greeting", "“3 viewings today, 5 clients waiting.” Both numbers open the matching list."],
  ["Commission", "Earned this period, split into collected and pipeline."],
  ["Next viewing", "Property, time, price, installment plan."],
  ["Today", "Calendar, today's meeting, the last closed deal."],
  ["Top listings", "Sorted by expected commission. Click a row to preview it."],
  ["Properties map", "Inventory by compound. Pick a compound and the table filters to it."]
];

const metrics = [
  ["Commission earned", "Collected by the team in the selected period"],
  ["Pipeline", "From contracts signed but not yet paid"],
  ["Expected commission", "Price × units × 2.5%"],
  ["Clients waiting", "Chats unanswered for more than 24 hours"]
];

const devices = [
  ["Desktop", "Plan the day, manage the team", "Everything"],
  ["Tablet", "Show options to a client during a viewing", "Listings and map, large. Icon-only navigation"],
  ["Mobile", "Act between viewings", "Greeting, commission, next viewing, today's meeting, listing cards"],
  ["Watch", "Glance", "Next viewing, directions, clients-waiting count"]
];

const delivered = [
  ["Brand", "Logo, wordmark, outline mark, app icon, construction sheet"],
  ["System", "Colour tokens for light and dark, type scale, component library"],
  ["Product", "Desktop and mobile in both themes, tablet and watch views"],
  ["Specs", "Annotated spec frame (spacing, tokens, states) and a states page"],
  ["Launch", "3D brand visual, three posters, device mockups"]
];

export default function RealEstateCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      <section className="cs-hero cs-hero--media">
        <img
          className="cs-hero__media"
          src="/case/real-estate/hero.webp"
          alt="Laptop on a dark stone pedestal showing the KoRnt.prm dashboard in dark mode"
          width={1786}
          height={782}
          fetchPriority="high"
          decoding="async"
        />
      </section>

      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">PropTech</span>
          <span className="cs-tag">Product + Brand</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> KoRnt.prm, a workspace for Cairo property teams
        </h1>
        <p className="cs-title__lead">
          From the first call to the signed contract. I designed the product and the brand for a Cairo
          brokerage whose agents were running their entire day out of WhatsApp, a spreadsheet and their
          own memory.
        </p>
        <p className="cs-title__lead cs-quoteline">“Every client deserves a clear answer, not a waiting list.”</p>
      </header>

      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">Product Designer · Solo</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Timeline</span><span className="cs-meta__v">4 weeks · Freelance</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Tools</span><span className="cs-meta__v">Figma · ChatGPT · Perplexity · Claude</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Platforms</span><span className="cs-meta__v">Desktop · Tablet · Mobile · Watch · Light + Dark</span></div>
      </div>

      {/* 01 Overview */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">Deals were dying somewhere between the first call and the contract.</h2>
        <p className="cs-lead">
          A Cairo brokerage asked me for two things: one place where its agents could run listings,
          viewings and clients, and a brand to launch it under. Four weeks, just me.
        </p>
        <div className="cs-callout">
          <p className="cs-callout__label">The short version</p>
          <ul className="cs-bullets">
            <li>The dashboard answers three questions within five seconds of opening it: what&rsquo;s next, who&rsquo;s waiting, how am I doing.</li>
            <li>The brand makes one promise, a clear answer instead of a waiting list. I turned that promise into an actual feature.</li>
            <li>Before writing this up, I audited my own work. The numbers, the map and the navigation didn&rsquo;t survive it, so I rebuilt them. That audit is part of the story.</li>
          </ul>
        </div>
      </section>

      {/* 02 Brand */}
      <section className="cs-sec" id="s-brand">
        <p className="cs-eyebrow">02 · Brand</p>
        <h2 className="cs-h2">The name is the finish line.</h2>
        <p className="cs-lead">
          KoRnt is a stylised &ldquo;contract&rdquo;, the moment every deal is chasing. &ldquo;.prm&rdquo; stands for
          Property Relationship Management. The mark is a K whose arm breaks forward: momentum toward closing.
        </p>
        <div className="cs-pair">
          <Shot name="logo-lockup" alt="White angular K mark and KoRnt.prm wordmark on brand blue" cap="Logo lockup." />
          <Shot name="logo-construction" alt="K mark on an icon grid, the wordmark and an outline version on near-black" cap="Construction, wordmark, outline." />
        </div>

        <h3 className="cs-h3">One principle, in the brand and in the product</h3>
        <p className="cs-lead cs-lead--sm">
          Every client deserves a clear answer, not a waiting list. In the brand it&rsquo;s the voice. In the
          UI it&rsquo;s the &ldquo;clients waiting&rdquo; count.
        </p>
        <Shot name="principle" alt="Blue card with the brand principle in highlighted text, beside a 3D figure made of houses, towers and keys" cap="The principle behind the product." />

        <h3 className="cs-h3">Launch</h3>
        <p className="cs-lead cs-lead--sm">
          The tagline is &ldquo;From first call to signed contract.&rdquo; The posters talk to agents and brokerages,
          the people who actually use the thing.
        </p>
        <Shot name="posters" alt="Three posters: Start Closing Deals, a team photo with agent-facing copy, and the mobile app" cap="Launch posters aimed at agents." />
        <p className="cs-note">The 3D figure and the device mockups were generated with ChatGPT and art-directed by me.</p>
      </section>

      {/* 03 The Problem */}
      <section className="cs-sec" id="s-problem">
        <p className="cs-eyebrow">03 · The Problem</p>
        <h2 className="cs-h2">In Egypt, a stalled deal is unpaid work.</h2>
        <p className="cs-lead">
          A lot of Cairo brokerages still run on WhatsApp, spreadsheets and phone calls. Before KoRnt, an
          agent&rsquo;s day lived in four places at once:
        </p>
        <div className="cs-tools">
          {beforeTools.map((t) => (
            <div className="cs-tool" key={t.k}>
              <span className="cs-tool__k">{t.k}</span>
              <p className="cs-tool__v">{t.v}</p>
            </div>
          ))}
        </div>
        <p className="cs-lead">
          That would just be messy if it didn&rsquo;t cost anything. But a broker in Egypt only earns
          commission once the deal ends in a signed contract. So every deal that goes quiet before signing
          is work nobody pays for. Clients wait, deals stall, and nobody notices until they&rsquo;re gone.
        </p>

        <div className="cs-callout">
          <p className="cs-callout__label">Problem</p>
          <p className="cs-callout__quote">
            Agents lose deals between the first call and the signed contract, because follow-ups, viewings
            and deal status live in too many places.
          </p>
        </div>
        <div className="cs-callout">
          <p className="cs-callout__label">How might we</p>
          <p className="cs-callout__quote">
            &hellip;show an agent, on one screen, what to do next, who&rsquo;s waiting, and what money is on the line?
          </p>
        </div>

        <h3 className="cs-h3">What the screen had to do</h3>
        <div className="cs-constraints">
          {goals.map((g) => (
            <div className="cs-constraint" key={g.k}>
              <span className="cs-constraint__k">{g.k}</span>
              <p className="cs-lead cs-lead--sm">{g.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 04 Solution */}
      <section className="cs-sec" id="s-solution">
        <p className="cs-eyebrow">04 · Solution</p>
        <h2 className="cs-h2">One screen that tells an agent what to do next.</h2>
        <p className="cs-lead">
          KoRnt.prm opens on the agent&rsquo;s day, not on a wall of charts. The greeting already counts what
          needs attention. The biggest card is the next viewing. Money sits right next to it, split into
          what&rsquo;s been collected and what&rsquo;s still coming.
        </p>
        <Shot name="desktop-light" alt="Light desktop dashboard with greeting, commission chart, featured card, calendar, top listings table and properties map" cap="The desktop dashboard. Today first, inventory second." />

        <h3 className="cs-h3">The five-second test</h3>
        <p className="cs-lead cs-lead--sm">
          I held the screen to one rule. Open it, and within five seconds you should be able to answer these:
        </p>
        <div className="cs-features">
          {fiveSeconds.map((f) => (
            <div className="cs-feature" key={f.q}>
              <span className="cs-feature__k">{f.q}</span>
              <p className="cs-lead cs-lead--sm">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="cs-note">
          These are design criteria I set for myself, not measured results. I never got to put them in front of agents.
        </p>
      </section>

      {/* 05 Users & research */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">05 · Users</p>
        <h2 className="cs-h2">Wahby is an educated guess.</h2>
        <p className="cs-lead">
          Wahby is a senior property consultant and team lead. He sells compound units across East Cairo
          (New Cairo, Madinaty, Taj City) and West Cairo (New Giza). He&rsquo;s also a proto-persona I built
          from desk research, not from interviews, and I&rsquo;d rather say that up front.
        </p>

        <div className="cs-impact cs-impact--pair" style={{ marginTop: "1.4rem" }}>
          <div className="cs-impact__card">
            <span className="cs-impact__k">A normal day for Wahby</span>
            <ul className="cs-bullets cs-bullets--sm">
              <li>Runs two to four viewings.</li>
              <li>Answers clients on WhatsApp in between.</li>
              <li>Chases developers for unit availability.</li>
              <li>Tries to remember which deals are close to signing.</li>
            </ul>
          </div>
          <div className="cs-impact__card cs-impact__card--accent">
            <span className="cs-impact__k">Two hats, one product</span>
            <ul className="cs-bullets cs-bullets--sm">
              <li><strong>As an agent:</strong> his schedule, his clients, his listings, his own commission.</li>
              <li><strong>As a team lead:</strong> stalled deals, missing documents, how the team is doing.</li>
            </ul>
          </div>
        </div>

        <h3 className="cs-h3">What I looked at</h3>
        <p className="cs-lead cs-lead--sm">
          Desk research and a competitor scan with Perplexity and Claude, across CRMs built for this region.
          myCRM is built around matching leads to properties. Engaz, a Cairo product, tracks team
          performance. I treated both of those as table stakes and spent my time on the part neither one
          puts first: the agent&rsquo;s day.
        </p>

        <div className="cs-tablewrap" style={{ marginTop: "1.2rem" }}>
          <table className="cs-table">
            <thead><tr><th>Week</th><th>Focus</th></tr></thead>
            <tbody>
              <tr><td><strong>1</strong></td><td>Brief, desk research, competitor scan, information architecture, brand direction</td></tr>
              <tr><td><strong>2</strong></td><td>Logo, palette, type, desktop layout</td></tr>
              <tr><td><strong>3</strong></td><td>High-fidelity desktop (light), component set</td></tr>
              <tr><td><strong>4</strong></td><td>Mobile, watch, dark mode, mockups, posters</td></tr>
            </tbody>
          </table>
        </div>

        <div className="cs-callout">
          <p className="cs-callout__label">The gap I won&rsquo;t hide</p>
          <p className="cs-callout__quote">
            I didn&rsquo;t interview a single agent. That&rsquo;s the biggest hole in this project, and
            everything after this point should be read with that in mind.
          </p>
          <p className="cs-note">
            On AI: all of the UI was designed in Figma. ChatGPT generated the 3D brand figure and the device
            mockups, which I art-directed and edited.
          </p>
        </div>
      </section>

      {/* 06 Decision thinking */}
      <section className="cs-sec" id="s-decisions">
        <p className="cs-eyebrow">06 · Decision thinking</p>
        <h2 className="cs-h2">Four decisions, and what each one cost.</h2>
        <p className="cs-lead">
          Every one of these had an easier option sitting right next to it. Here&rsquo;s what I picked, and
          what I gave up for it.
        </p>
        <div className="cs-decisions">
          {decisions.map((d, i) => (
            <article className="cs-decision" key={d.t}>
              <span className="cs-decision__n">0{i + 1}</span>
              <div>
                <h3 className="cs-decision__t">{d.t}</h3>
                <div className="cs-decision__row">
                  <span className="cs-decision__k">Problem</span>
                  <p className="cs-decision__v">{d.problem}</p>
                </div>
                {d.options.length > 0 && (
                  <div className="cs-decision__row">
                    <span className="cs-decision__k">Options</span>
                    <div className="cs-decision__opts">
                      {d.options.map((o) => <span className="cs-chip" key={o}>{o}</span>)}
                    </div>
                  </div>
                )}
                <div className="cs-decision__row cs-decision__row--pick">
                  <span className="cs-decision__k">Choice</span>
                  <p className="cs-decision__v">{d.pick}</p>
                </div>
                <div className="cs-decision__row">
                  <span className="cs-decision__k">Trade-off</span>
                  <p className="cs-decision__v">{d.cost}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 07 The audit */}
      <section className="cs-sec" id="s-audit">
        <p className="cs-eyebrow">07 · The audit</p>
        <h2 className="cs-h2">v1 looked finished. The data didn&rsquo;t hold up.</h2>
        <p className="cs-lead">
          Before publishing this, I went back through every screen the way a Cairo broker would read it.
          It didn&rsquo;t take long to find problems, and they were the embarrassing kind.
        </p>

        <div className="cs-tablewrap" style={{ marginTop: "1.2rem" }}>
          <table className="cs-table">
            <thead><tr><th>What</th><th>v1</th><th>v2</th></tr></thead>
            <tbody>
              {audit.map((a) => (
                <tr key={a.k}><td><strong>{a.k}</strong></td><td>{a.before}</td><td>{a.after}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="cs-h3">The navigation, rebuilt</h3>
        <p className="cs-lead cs-lead--sm">
          v1&rsquo;s sidebar borrowed generic enterprise labels and had nowhere to put clients or deals, the
          two things an agent touches all day.
        </p>
        <div className="cs-ba">
          <div className="cs-ba__col cs-ba__col--before">
            <span className="cs-ba__k">Before</span>
            <div className="cs-ba__group">
              <p className="cs-ba__g">Management</p>
              <div className="cs-principles">
                {["Compliance", "Risk", "Vendor", "Assets", "Personnel"].map((x) => <span className="cs-chip" key={x}>{x}</span>)}
              </div>
            </div>
            <p className="cs-note">No home for clients. No home for deals.</p>
          </div>
          <div className="cs-ba__col cs-ba__col--after">
            <span className="cs-ba__k">After</span>
            <div className="cs-ba__group">
              <p className="cs-ba__g">Main <span>· every agent</span></p>
              <div className="cs-principles">
                {["Dashboard", "Clients", "Deals", "Calendar", "Messages", "Reports"].map((x) => <span className="cs-chip" key={x}>{x}</span>)}
              </div>
            </div>
            <div className="cs-ba__group">
              <p className="cs-ba__g">Management <span>· team leads only</span></p>
              <div className="cs-principles">
                {["Documents & KYC", "At-risk deals", "Developers", "Inventory", "Team"].map((x) => <span className="cs-chip" key={x}>{x}</span>)}
              </div>
            </div>
            <div className="cs-ba__group">
              <p className="cs-ba__g">Mobile tabs <span>· the field</span></p>
              <div className="cs-principles">
                {["Home", "Calendar", "Clients", "Messages"].map((x) => <span className="cs-chip" key={x}>{x}</span>)}
              </div>
            </div>
          </div>
        </div>

        <div className="cs-callout">
          <p className="cs-callout__label">Was it worth it?</p>
          <p className="cs-callout__quote">
            It ate time I could have spent on new screens. Worth it. Wrong numbers are the first thing a
            domain expert notices.
          </p>
        </div>
      </section>

      {/* 08 Design system */}
      <section className="cs-sec" id="s-system">
        <p className="cs-eyebrow">08 · Design system</p>
        <h2 className="cs-h2">A palette borrowed from Cairo&rsquo;s new compounds.</h2>
        <p className="cs-lead">
          The blue comes from the glass facades going up across the new compounds. It sits on warm
          neutrals in light mode and navy-black surfaces in dark. Every colour is a token with a light and a
          dark value, so the two themes can&rsquo;t drift apart.
        </p>
        <Shot name="palette" alt="Brand blue scale, warm neutrals and dark greys beside photos of a blue glass building, a pale tower and curved grey balconies" cap="Palette pulled from Cairo's glass and concrete." />

        <h3 className="cs-h3">Type</h3>
        <p className="cs-lead cs-lead--sm">
          Outfit. Geometric, a little rounded, and it stays clear when the numbers get big. Nothing in the
          product goes below 12px.
        </p>
        <div className="cs-tablewrap" style={{ marginTop: "1rem" }}>
          <table className="cs-table">
            <thead><tr><th>Style</th><th>Size / line height</th><th>Weight</th></tr></thead>
            <tbody>
              {typeScale.map((r) => (
                <tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="cs-h3">Components</h3>
        <p className="cs-lead cs-lead--sm">
          Every card shares one header: a collapse control, the title, a period selector and a dropdown.
          Learn it once and the whole dashboard reads the same way.
        </p>
        <div className="cs-principles" style={{ marginTop: "1rem" }}>
          {components.map((c) => <span className="cs-principle cs-principle--soft" key={c}>{c}</span>)}
        </div>
        <Shot name="widgets-type" alt="Calendar, today's meeting and last closed deal cards on blue, beside a large Aa with the Outfit font specs" cap="Widget set and the Outfit type spec." />
      </section>

      {/* 09 Screens & devices */}
      <section className="cs-sec" id="s-screens">
        <p className="cs-eyebrow">09 · Screens</p>
        <h2 className="cs-h2">Read it top to bottom. Today first, inventory second.</h2>
        <ol className="cs-steps">
          {walkthrough.map((s) => (
            <li key={s[0]}><b>{s[0]}</b><span>{s[1]}</span></li>
          ))}
        </ol>

        <h3 className="cs-h3">What the numbers mean</h3>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <thead><tr><th>Metric</th><th>Definition</th></tr></thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m[0]}><td><strong>{m[0]}</strong></td><td>{m[1]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="cs-h3">Rules I didn&rsquo;t break</h3>
        <ul className="cs-bullets">
          <li>EGP only.</li>
          <li>Compact figures in cards (42M EGP), full figures in tables.</li>
          <li>Every period filter shows the date range it&rsquo;s actually using.</li>
          <li>A change in value always gets a sign, an arrow and words. Never colour on its own.</li>
        </ul>
        <Shot name="map-mobile" alt="Cairo map with compound pins and a legend, next to a phone showing commission, next viewing and top listings" cap="The properties map, and the mobile home screen." />

        <h3 className="cs-h3">One job per device</h3>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <thead><tr><th>Device</th><th>Job</th><th>What it shows</th></tr></thead>
            <tbody>
              {devices.map((d) => (
                <tr key={d[0]}><td><strong>{d[0]}</strong></td><td>{d[1]}</td><td>{d[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cs-callout">
          <p className="cs-callout__label">The rule behind it</p>
          <p className="cs-callout__quote">
            Anything you need to compare (tables, maps, charts with axes) leaves the small screens. Anything
            that triggers an action stays.
          </p>
        </div>
        <Shot name="desktop-mobile-light" alt="Light mobile and desktop dashboards on a blue background" cap="One system, desktop and mobile." />
        <Shot name="listings-watch" alt="Four listing cards with photos and EGP prices, and a smartwatch showing the next viewing" cap="Listing cards for mobile, and the watch for a quick glance." />

        <h3 className="cs-h3">Dark mode, because the numbers get checked at night</h3>
        <p className="cs-lead cs-lead--sm">
          Agents look at their numbers late in the evening, so desktop and mobile both get full dark parity.
          Navy-black instead of pure black to cut the glare, the same brand blue as light mode, and dark map tiles.
        </p>
        <Shot name="dark-mode" alt="Dark navy desktop and mobile dashboards with blue accents and a dark map" cap="Full dark-mode parity across desktop and mobile." />

        <h3 className="cs-h3">Accessibility checks</h3>
        <ul className="cs-bullets">
          <li>Glass effects only on the hero card and tooltips, always with a solid layer behind any text.</li>
          <li>Body text meets 4.5:1 contrast.</li>
          <li>Map pins use a shape as well as a colour. The green and amber ones blur together for colourblind users.</li>
          <li>Touch targets are at least 44pt.</li>
        </ul>
      </section>

      {/* 10 Reflection */}
      <section className="cs-sec" id="s-reflection">
        <p className="cs-eyebrow">10 · Reflection</p>
        <h2 className="cs-h2">What I&rsquo;d keep, and what this project still owes.</h2>

        <div className="cs-impact cs-impact--pair">
          <div className="cs-impact__card cs-impact__card--accent">
            <span className="cs-impact__k">What worked</span>
            <ul className="cs-bullets cs-bullets--sm">
              <li>Tying the brand&rsquo;s principle to a real feature, instead of leaving it on a poster.</li>
              <li>Giving each device one clear job, instead of shrinking the desktop.</li>
            </ul>
          </div>
          <div className="cs-impact__card">
            <span className="cs-impact__k">What it still owes</span>
            <ul className="cs-bullets cs-bullets--sm">
              <li>Real conversations with agents. Wahby is still a proto-persona.</li>
              <li>Putting the five-second test in front of people who&rsquo;d actually use this.</li>
              <li>The awkward states: no commission yet, no viewings today, no listings, a map that fails to load.</li>
            </ul>
          </div>
        </div>

        <h3 className="cs-h3">What I delivered</h3>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <tbody>
              {delivered.map((d) => (
                <tr key={d[0]}><td><strong>{d[0]}</strong></td><td>{d[1]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="cs-reflect">
          <div className="cs-reflect__takeaways">
            <span className="cs-principle">The whole thing, in one line</span>
          </div>
          <blockquote className="cs-reflect__final">
            Simple to say, hard to hold onto: one screen that tells an agent what&rsquo;s next, who&rsquo;s
            waiting, and how they&rsquo;re doing.
          </blockquote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
