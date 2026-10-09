import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Payment Limbo: the minutes after a UPI payment hangs · Ajay Srivastava",
  description:
    "What a UPI app should say while it doesn't know if your money went through, when it should bring in a person, and how it keeps people from paying twice."
};

// calm deep teal: clarity and safety without alarm, the opposite of a red error
// state. 5.5:1 on the card surface, so labels and small text stay legible.
const ACCENT = "#0A6473";
const LIVE = "https://payment-limbo-edgecase.vercel.app/";

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-problem", num: "02", label: "The Problem" },
  { id: "s-users", num: "03", label: "Users" },
  { id: "s-system", num: "04", label: "System reality" },
  { id: "s-decisions", num: "05", label: "Decision thinking" },
  { id: "s-designs", num: "06", label: "Designs" },
  { id: "s-impact", num: "07", label: "Impact" },
  { id: "s-reflection", num: "08", label: "Reflection" }
];

/* ── 01 Overview ─────────────────────────────────────────────── */
const scale = [
  {
    n: "24.07 billion",
    k: "UPI payments, Sept 2026",
    v: "NPCI's count for the month. That's more than 800 million payments a day."
  },
  {
    n: "0.7 to 0.8%",
    k: "Technical decline rate",
    v: "The figure NPCI's CEO gave in 2024, down from 8 to 10% in 2016."
  },
  {
    n: "~6 million",
    k: "Declines a day, roughly",
    v: "My own arithmetic at today's volume, not an official number. Not all of them debit money, but every one is someone looking at their phone at a counter."
  }
];

/* ── 02 Problem ──────────────────────────────────────────────── */
const sources = [
  { k: "The app", v: "“Pending”. Or worse, an early “Failed” before the bank has actually replied." },
  { k: "The bank SMS", v: "“Debited ₹450.” As far as the user can tell, the money is gone." },
  { k: "The merchant", v: "“Not received.” And the queue behind you is getting longer." },
  { k: "Support", v: "“Please share your UTR number.” Most people have never heard the term." }
];

/* ── 03 Users ────────────────────────────────────────────────── */
const personas = [
  {
    name: "Ravi",
    tag: "Student paying for daily essentials",
    intro:
      "Ravi pays his share of rent, food and travel on UPI. His balance is thin, so a few hundred rupees stuck in limbo changes what he can do that day.",
    usage: ["Many small payments a day", "Uses UPI for essentials, not savings", "Usually paying with someone waiting"],
    failure: ["Panics the moment money is debited", "Refreshes the app again and again", "Retries within seconds"],
    need: "Proof that his money is safe, and something to do other than retry.",
    opp: "Take retry off the screen while the outcome is unknown, and show progress in its place."
  },
  {
    name: "Neha",
    tag: "Working professional splitting shared costs",
    intro:
      "Neha splits dinners and cabs and pays bills on UPI several times a day. She's confident with apps and has very little patience for vague ones.",
    usage: ["Several payments a day", "Often time-bound: a cab, a bill, a group dinner", "Comfortable with apps, short on patience"],
    failure: ["Gets annoyed by a status that says nothing", "Can't tell whether to retry or wait", "Writes the app off if support feels like a wall"],
    need: "A clear status and a clear next step, quickly.",
    opp: "Swap “pending” for named stages and a time she can plan around."
  },
  {
    name: "Mr. Sharma",
    tag: "Careful parent who uses UPI for the important stuff",
    intro:
      "Mr. Sharma makes fewer, bigger payments on UPI: school fees, electricity, the gas cylinder. He knows the basics and steers clear of anything that looks risky.",
    usage: ["Few payments, but they matter", "Double-checks everything before paying", "Never opens help sections"],
    failure: ["Feels anxious and helpless", "Doesn't know whom to believe", "Won't retry without reassurance, and can't relax either"],
    need: "Plain language, real reassurance, and a person he can reach.",
    opp: "A recovery flow that asks almost nothing of him and brings support to him."
  }
];

const painQuotes = ["Just tell me if my money is safe", "I paid again because I panicked", "The app doesn’t explain anything"];
const observations = [
  "Anxiety peaks after the payment, not before it",
  "People want certainty more than speed",
  "Most hung payments sort themselves out",
  "Red error states make all of it worse"
];

/* ── 04 System reality ───────────────────────────────────────── */
const rules = [
  [
    "Since 2025, NPCI caps status checks. The first one goes out about 90 seconds after the payment, and an app gets at most three in the first two hours.",
    "The first minute and a half is uncertain by design. The screen has to hold people through it without a verdict, and without pretending it's checking every second."
  ],
  [
    "RBI's turnaround rules from 2019: a failed person-to-person UPI payment has to be reversed by T+1, a merchant payment by T+5. After that the bank owes ₹100 a day, without being asked.",
    "There is a worst case, and it has a date on it. Almost nobody standing at a counter knows that."
  ],
  [
    "Technical declines sit under 1%, and most pending payments resolve without anyone doing anything.",
    "Waiting is usually the right move. The product's job is to make waiting feel like a choice the user made."
  ],
  [
    "Every complaint needs the transaction reference (the UTR, or Ref ID).",
    "The app already has it. Support should never need to ask for it."
  ],
  [
    "The payer's bank, NPCI and the merchant's bank each hold part of the answer.",
    "The app can only report what it has been told, so it shouldn't fill the gaps with a guess."
  ]
];

const constraints = [
  { k: "Technical", items: ["Bank confirmations arrive late", "Status checks are rate-limited"] },
  { k: "Business", items: ["Every early ticket costs support time", "Promising a refund the bank controls is a legal risk"] },
  { k: "User", items: ["Uneven financial literacy", "Very high stress in the moment"] }
];

/* ── 05 Decision thinking ────────────────────────────────────── */
const ladder = [
  ["0 to 5 seconds", "We’re checking your payment", "Neutral", "Nothing, on purpose. No retry."],
  ["Up to the promised time", "Status timeline, “expected by 10:45”", "Calm, specific", "Open “What does this mean?”"],
  ["Past the promised time", "Still waiting for update", "Amber, still calm", "Turn on “Notify me” and leave"],
  ["5 minutes", "It’s taking longer than expected", "Direct", "Chat with support, already identified"],
  ["Resolved", "Payment successful / Money refunded", "Relief first", "Done, or retry once the refund has landed"],
  ["Any attempt to pay again", "Potential duplicate payment", "Firm, not blocking", "Wait and check (default), or send anyway"]
];

const decisions = [
  {
    t: "No verdict until the bank gives one",
    problem:
      "An early “Failed” is the biggest trigger for panic retries. If the bank later confirms the first payment, the user has paid twice.",
    options: ["Show “Failed” after a timeout", "A bare spinner", "Say what's happening, in words"],
    pick:
      "“We're checking your payment. The bank hasn't confirmed the status yet.” Your-money-is-safe sits in the subtext, and there is no retry button on the screen.",
    cost: "Someone who wants a yes or no right now gets “not yet”. A wrong “Failed” would cost them a double payment."
  },
  {
    t: "A time in place of “pending”",
    problem: "“Pending” has no end, and an open-ended wait is what sends people back to the pay button.",
    options: ["Indefinite spinner", "Progress bar", "Named stages with an expected time"],
    pick:
      "Four named stages (initiated, sent to bank, awaiting confirmation, resolution expected by 10:45), so the user can see where the money is and has a time to hold the app to.",
    cost: "A deadline can slip. When it does, the product has to admit it, which is what the amber state is for."
  },
  {
    t: "Retry has to be earned",
    problem: "A warning printed next to a retry button gets ignored by exactly the people who are panicking.",
    options: ["Retry button with a warning", "Hide retry entirely", "Retry only after a confirmed refund"],
    pick:
      "Retry is missing while the outcome is unknown and comes back on the refund screen, when a second payment can no longer double-charge. If someone starts a fresh payment to the same payee for the same amount, a duplicate check steps in.",
    cost: "The duplicate check warns and doesn't block. People splitting a bill send the same amount twice on purpose, and the app can't know that."
  },
  {
    t: "Support shows up on a timer",
    problem:
      "If support is always one tap away, people write in at minute one about payments that would have cleared at minute two. If it's buried, the genuinely stuck ones never get help.",
    options: ["Support always visible", "Support inside the help centre", "Unlock support after a threshold"],
    pick:
      "At five minutes the screen offers Chat with Support, with the amount, payee and Ref ID already attached and the current response time (~2 mins) shown up front.",
    cost: "Someone who wants a person at minute one waits four more. Five minutes is my estimate; a real version would tune it against actual resolution times."
  },
  {
    t: "Lead with where the money is",
    problem: "“Payment failed” describes the system's mistake. The user wants to know where their ₹450 went.",
    options: [] as string[],
    pick:
      "“Money refunded”, with +₹450.00 shown against the failed original. On success, a green tick and “The money has reached the recipient” come before any receipt details.",
    cost: "“Failed” still appears, smaller, as the status of the original transaction. Removing it would make the refund harder to match against a bank statement."
  }
];

const principles = [
  "No outcome the bank hasn’t confirmed",
  "A time, never an adjective",
  "Retry only when it’s safe",
  "Support comes to the user",
  "Say where the money is"
];

const didntDesign = [
  "No redesign of the normal success flow",
  "No promise of instant refunds",
  "No red alerts or alarm sounds",
  "No hard block on paying again"
];

/* ── 06 Designs — annotated plates, files and alt text unchanged ─ */
type Plate = [number, string];
const plateGroups: { h: string; lead: string; items: Plate[] }[] = [
  {
    h: "The first few minutes",
    lead: "The app says what it knows, gives a time, and explains itself before anyone goes looking for support.",
    items: [
      [1, "Checking payment ... the first five seconds"],
      [2, "Payment status timeline"],
      [3, "Explainer bottom sheet"]
    ]
  },
  {
    h: "When the promise slips",
    lead: "The tone goes up one step, the app takes over the waiting, and at five minutes a person is brought in.",
    items: [
      [4, "Escalating ... still waiting for update"],
      [5, "Payment update notification"],
      [6, "Escalation to support"],
      [11, "Support handoff"]
    ]
  },
  {
    h: "How it ends",
    lead: "Two endings. Both open with where the money is.",
    items: [
      [7, "Resolution ... payment successful"],
      [8, "Resolution ... money refunded"]
    ]
  },
  {
    h: "Stopping the second payment",
    lead: "The only screen in the flow that interrupts the user, and it still lets them through.",
    items: [[9, "Duplicate payment guardrail"]]
  },
  {
    h: "Before the next one",
    lead: "Once it's over, the user is calm enough to take in a tip or two, so this is where the app sets expectations for next time.",
    items: [[10, "Reassurance after the incident"]]
  }
];

function Plates({ items }: { items: Plate[] }) {
  return (
    <div className="cs-plates">
      {items.map(([n, alt]) => (
        <figure className="cs-plate" key={n}>
          <img src={`/case/upi/plate-${String(n).padStart(2, "0")}.webp`} alt={alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

/* ── 07 Impact ───────────────────────────────────────────────── */
const metrics = [
  ["Repeat payments to the same payee, same amount, within 10 minutes of a pending state", "The behaviour the whole flow exists to prevent", "Down"],
  ["Support contacts per pending payment, and how many land before the 5-minute mark", "Whether the explainer and the timer are doing their job", "Down"],
  ["Share of users who tap “Notify me” and leave the screen", "Whether people trust the app to do the waiting for them", "Up"],
  ["Time from first support contact to resolution", "The pre-attached Ref ID should remove a round trip", "Down"],
  ["Genuine repeat payments abandoned at the duplicate warning", "Guardrail: the warning shouldn't cost real payments", "Flat"]
];

// quotes kept word for word
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

/* ── 08 Reflection ───────────────────────────────────────────── */
const ownGoals = [
  "The explainer says “99% of these payments are cleared within 2-3 minutes”. I don't have that number. Showing a base rate is the right pattern, but the figure has to come from the payment provider's own logs, or the line goes.",
  "The refund screen says the money was “instantly credited back”. That's the kind of speed promise I said I wouldn't make. Next pass, it says when the money landed and leaves out how fast.",
  "“Expected by 10:45” is a time I picked. A real version has to tie it to the actual status-check schedule (first check around 90 seconds, three in two hours), or the promise will slip by design."
];

const stillMissing = [
  "The worst case. RBI's T+1 and T+5 deadlines, and the ₹100-a-day compensation after them, are the most reassuring facts in this whole space, and none of my screens mention them. They belong in the explainer.",
  "Time with support agents. The five-minute unlock is a guess about where user patience runs out and support cost starts to bite.",
  "Testing with people like Mr. Sharma, in Hindi and other Indian languages. Most of this design is copy, so it has to hold up outside English.",
  "The merchant's side. The shopkeeper is staring at their own phone through the same wait, and this flow gives them nothing."
];

const takeaways = ["Failure states decide trust", "A time beats a reassurance", "Constraints write the copy", "Language is the interface"];

export default function UpiCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      {/* ── Hero ── */}
      <section className="cs-hero cs-hero--video">
        <video
          className="cs-hero__video"
          src="/case/upi/cover.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label="Payment Limbo product overview"
        />
      </section>

      {/* ── Title block ── */}
      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Fintech</span>
          <span className="cs-tag">Self-initiated · Live prototype</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> Payment Limbo: the minutes after a UPI payment hangs
        </h1>
        <p className="cs-title__lead">
          Money leaves your account, the app says pending, and nothing tells you what happens next. So people pay
          again. Payment Limbo is my design for that gap in a UPI app: what the screen says while the bank hasn&rsquo;t
          answered, when a person steps in, and how the app keeps a second payment from going out by mistake.
        </p>
        <a className="cs-cta" href={LIVE} target="_blank" rel="noopener noreferrer">
          Try it live (best on a phone) <span aria-hidden>↗</span>
        </a>
      </header>

      {/* ── Meta band ── */}
      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">Product Designer · Solo</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Timeline</span><span className="cs-meta__v">7 days · 2026</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Platform</span><span className="cs-meta__v">Mobile UPI app · Web prototype</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Focus</span><span className="cs-meta__v">Failure states · UX writing · Trust</span></div>
      </div>

      {/* ── 01 Overview ── */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>
        <h2 className="cs-h2">A payment that&rsquo;s neither paid nor failed.</h2>
        <p className="cs-lead">
          UPI is how India pays for groceries, rent, auto fares and chai. A tiny share of those payments hang: the money
          is debited, and for a few minutes nobody can say whether it arrived. At UPI&rsquo;s scale, a tiny share is a
          lot of people.
        </p>
        <div className="cs-features">
          {scale.map((s) => (
            <div className="cs-feature" key={s.k}>
              <span className="cs-feature__n">{s.n}</span>
              <span className="cs-feature__k">{s.k}</span>
              <p className="cs-lead cs-lead--sm">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="cs-callout">
          <p className="cs-callout__label">The short version</p>
          <ul className="cs-bullets">
            <li>Most UPI apps treat a hung payment as an error toast. I designed it as a sequence of states, from the first second through to the refund.</li>
            <li>Two rules run through every screen. The app never states an outcome the bank hasn&rsquo;t confirmed, and it never offers a retry while a double charge is still possible.</li>
            <li>11 annotated screens and a working prototype. There&rsquo;s no production data, so the Impact section is a measurement plan, and the Reflection lists what I&rsquo;d still fix.</li>
          </ul>
        </div>
      </section>

      {/* ── 02 The Problem ── */}
      <section className="cs-sec" id="s-problem">
        <p className="cs-eyebrow">02 · The Problem</p>
        <h2 className="cs-h2">Pending is where people make their worst money decisions.</h2>
        <p className="cs-lead">When a payment hangs, the user gets four answers from four places, and none of them agree.</p>
        <div className="cs-tools">
          {sources.map((s) => (
            <div className="cs-tool" key={s.k}>
              <span className="cs-tool__k">{s.k}</span>
              <p className="cs-tool__v">{s.v}</p>
            </div>
          ))}
        </div>
        <p className="cs-lead">
          None of those answers comes with a time. So people do the one thing still in their control and pay again. If
          the first payment was going to go through after all, they&rsquo;ve now paid twice, and one of those payments
          takes days to come back.
        </p>

        <div className="cs-callout">
          <p className="cs-callout__label">The system panics the same way</p>
          <p className="cs-callout__quote">
            On 12 April 2025, UPI was down for close to five hours across Google Pay, PhonePe and Paytm. NPCI traced it to
            some banks flooding the &ldquo;check transaction status&rdquo; API, asking again and again whether payments
            had gone through. That&rsquo;s a person refreshing a pending screen, at the scale of a bank. NPCI&rsquo;s fix
            was a rate limit. Mine is the interface version: give people a reason to stop asking.
          </p>
        </div>

        <div className="cs-callout">
          <p className="cs-callout__label">Problem</p>
          <p className="cs-callout__quote">
            When a UPI payment hangs, the user gets a debit with no outcome and no timeline. With neither, retrying feels
            safer than waiting, and that retry is what turns a delay into a real loss.
          </p>
        </div>
        <div className="cs-callout">
          <p className="cs-callout__label">How might we</p>
          <p className="cs-callout__quote">
            &hellip;keep someone calm and still for the few minutes the bank needs to answer, and get them to a person
            when it takes longer?
          </p>
        </div>
      </section>

      {/* ── 03 Users ── */}
      <section className="cs-sec" id="s-users">
        <p className="cs-eyebrow">03 · Users</p>
        <h2 className="cs-h2">Three people, three ways of panicking.</h2>
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
                    <p className="cs-persona__k">How they use UPI</p>
                    <ul className="cs-bullets cs-bullets--sm">{p.usage.map((t) => <li key={t}>{t}</li>)}</ul>
                  </div>
                  <div>
                    <p className="cs-persona__k">When a payment hangs</p>
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
            <h3 className="cs-h3">What people say</h3>
            <ul className="cs-quotes">
              {painQuotes.map((q) => <li key={q}>{"“"}{q}{"”"}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="cs-h3">What I noticed</h3>
            <ul className="cs-bullets">
              {observations.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        </div>

        <h3 className="cs-h3">It reads the same on public complaint boards</h3>
        <p className="cs-lead cs-lead--sm">
          Two complaints from early 2026. One person paid at 12:39 AM and was still stuck on pending seven hours later.
          Another person&rsquo;s bank showed the payment as successful while the merchant never got the money. In both,
          the person had a debit, no timeline, and nobody telling them what was going on.
        </p>
      </section>

      {/* ── 04 System reality ── */}
      <section className="cs-sec" id="s-system">
        <p className="cs-eyebrow">04 · System reality</p>
        <h2 className="cs-h2">What a UPI app is actually allowed to know.</h2>
        <p className="cs-lead">
          Before deciding what the screens should say, I looked at what an app can find out, and when. It&rsquo;s less
          than you&rsquo;d expect, and it arrives slower.
        </p>
        <div className="cs-tablewrap" style={{ marginTop: "1.2rem" }}>
          <table className="cs-table">
            <thead><tr><th>The rule</th><th>What it means on screen</th></tr></thead>
            <tbody>
              {rules.map((r) => (
                <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cs-note">
          Sources: NPCI monthly UPI statistics; NPCI circular on API usage (April 2025); RBI circular on harmonisation of
          turnaround time and customer compensation for failed transactions (September 2019).
        </p>

        <h3 className="cs-h3">Constraints</h3>
        <div className="cs-constraints">
          {constraints.map((c) => (
            <div className="cs-constraint" key={c.k}>
              <span className="cs-constraint__k">{c.k}</span>
              <ul className="cs-bullets cs-bullets--sm">{c.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── 05 Decision thinking ── */}
      <section className="cs-sec" id="s-decisions">
        <p className="cs-eyebrow">05 · Decision thinking</p>
        <h2 className="cs-h2">Treat the wait as a set of states, then decide what each one is allowed to say.</h2>

        <div className="cs-shift">
          <p className="cs-shift__from">A hung payment is a few minutes of uncertainty the product has to carry for the user.</p>
          <p className="cs-shift__to">
            So I mapped it as a timeline. Each state gets its own tone and its own short list of things the user can do.
          </p>
        </div>

        <h3 className="cs-h3">The escalation ladder</h3>
        <p className="cs-lead cs-lead--sm">
          Every state answers two questions: how worried should I be, and what can I do? The tone only goes up when the
          product&rsquo;s own promise slips.
        </p>
        <div className="cs-tablewrap">
          <table className="cs-table">
            <thead><tr><th>When</th><th>Screen</th><th>Tone</th><th>What the user can do</th></tr></thead>
            <tbody>
              {ladder.map((r) => (
                <tr key={r[0]}><td><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="cs-h3">Five decisions, and what each one cost</h3>
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

        <h3 className="cs-h3">Principles</h3>
        <div className="cs-principles">
          {principles.map((t) => <span key={t} className="cs-principle">{t}</span>)}
        </div>

        <div className="cs-scope">
          <span className="cs-impact__k">What I deliberately didn{"’"}t design</span>
          <ul className="cs-bullets cs-bullets--sm cs-bullets--x">{didntDesign.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      {/* ── 06 Designs ── */}
      <section className="cs-sec" id="s-designs">
        <p className="cs-eyebrow">06 · Designs</p>
        <h2 className="cs-h2">Eleven screens, in the order the wait plays out.</h2>
        <p className="cs-lead cs-lead--sm">
          Each plate carries its own notes. I&rsquo;ve grouped them by what the user is going through at that point.
        </p>
        {plateGroups.map((g) => (
          <div key={g.h}>
            <h3 className="cs-h3">{g.h}</h3>
            <p className="cs-lead cs-lead--sm">{g.lead}</p>
            <Plates items={g.items} />
          </div>
        ))}
      </section>

      {/* ── 07 Impact ── */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">07 · Impact</p>
        <h2 className="cs-h2">How I&rsquo;d know it worked.</h2>
        <p className="cs-lead">
          This was a 7-day self-initiated project with a prototype, not a shipped feature, so I don&rsquo;t have outcome
          numbers. These are the numbers I&rsquo;d watch, and which way each one should move.
        </p>
        <div className="cs-tablewrap" style={{ marginTop: "1.2rem" }}>
          <table className="cs-table">
            <thead><tr><th>Metric</th><th>Why it matters</th><th>Should go</th></tr></thead>
            <tbody>
              {metrics.map((m) => (
                <tr key={m[0]}><td>{m[0]}</td><td>{m[1]}</td><td><strong>{m[2]}</strong></td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cs-note">None of these have been measured yet.</p>

        <h3 className="cs-h3">What people said</h3>
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

      {/* ── 08 Reflection ── */}
      <section className="cs-sec" id="s-reflection">
        <p className="cs-eyebrow">08 · Reflection</p>
        <h2 className="cs-h2">What I&rsquo;d fix, and what I now believe about failure states.</h2>

        <div className="cs-callout">
          <p className="cs-callout__label">The honest bit</p>
          <p className="cs-callout__quote">
            Going back over the screens with the research above, I found three places where my own copy breaks my own
            rules.
          </p>
          <ul className="cs-bullets cs-bullets--sm">
            {ownGoals.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>

        <h3 className="cs-h3">What&rsquo;s still missing</h3>
        <ul className="cs-bullets">
          {stillMissing.map((t) => <li key={t}>{t}</li>)}
        </ul>

        <div className="cs-reflect">
          <div className="cs-reflect__takeaways">
            {takeaways.map((t) => <span key={t} className="cs-principle">{t}</span>)}
          </div>
          <blockquote className="cs-reflect__final">
            Sometimes the most useful thing a payments app can say is &ldquo;we don&rsquo;t know yet&rdquo;, as long as
            it also says when it will.
          </blockquote>
        </div>
      </section>
    </CaseStudyLayout>
  );
}
