import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";
import CaseImg from "@/components/CaseImg";

export const metadata: Metadata = {
  title: "Wanderly — AI Travel Itinerary Planner · Ajay Srivastava",
  description:
    "Your very own travel guide, wherever & whenever. An AI-powered itinerary platform that turns scattered research into one day-by-day roadmap."
};

// Wanderly's brand primary is #558765; deepened slightly for label/eyebrow contrast on the warm canvas.
const ACCENT = "#3f6f52";
const IMG = (name: string) => `/case/wanderly/${name}.webp`;

// Each Table-of-Contents section is one or more full-width images.
// Files live in /public/case/wanderly/ — a labelled placeholder shows until each exists.
const SECTIONS: (Toc & { files: string[] })[] = [
  { id: "s-brief", num: "01", label: "Project Brief", files: ["sec-project-brief"] },
  { id: "s-timeline", num: "02", label: "Timeline", files: ["sec-timeline"] },
  { id: "s-process", num: "03", label: "Design Process", files: ["sec-design-process"] },
  { id: "s-empathize", num: "04", label: "Empathize", files: ["sec-empathize-1", "sec-empathize-2"] },
  { id: "s-define", num: "05", label: "Define", files: ["sec-define"] },
  { id: "s-ideation", num: "06", label: "Ideation", files: ["sec-ideation"] },
  { id: "s-design", num: "07", label: "Design", files: ["sec-design-1", "sec-design-2"] },
  { id: "s-business", num: "08", label: "Business", files: ["sec-business"] }
];

const TOC: Toc[] = SECTIONS.map(({ id, num, label }) => ({ id, num, label }));

export default function WanderlyCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      <section className="cs-hero cs-hero--cover">
        <CaseImg className="cs-hero__cover" src={IMG("cover")} alt="" ratio="wide" />
      </section>

      <header className="cs-title">
        <div className="cs-tags">
          <span className="cs-tag">Case Study</span>
          <span className="cs-tag">Travel &amp; Tourism</span>
          <span className="cs-tag">AI · UX/UI</span>
        </div>
        <h1 className="cs-title__h">
          <span className="cs-star" aria-hidden>✱</span> Wanderly ... AI Travel Itinerary Planner
        </h1>
        <p className="cs-title__lead">
          Wanderly is a travel itinerary platform for explorers who crave more than just a destination. Powered by AI,
          it builds tailored roadmaps that spotlight the most exciting stops and hidden gems along the way ... turning
          scattered research into a single, day-by-day plan.
        </p>
        <p className="cs-title__lead cs-quoteline">
          “With Wanderly you're not just planning a route ... you're designing an experience, making sure every mile is
          filled with discovery, convenience and delight.”
        </p>
      </header>

      <div className="cs-meta">
        <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">UI/UX Designer</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Platform</span><span className="cs-meta__v">iOS &amp; Android</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Tools</span><span className="cs-meta__v">Figma, Notion</span></div>
        <div className="cs-meta__col"><span className="cs-meta__k">Type</span><span className="cs-meta__v">AI Travel Planner</span></div>
      </div>

      {/* One or more full-width images per Table-of-Contents section */}
      {SECTIONS.map((s) => (
        <section className="cs-sec cs-sec--img" id={s.id} key={s.id}>
          <p className="cs-eyebrow">{s.num} · {s.label}</p>
          {s.files.map((f) => (
            <figure className="cs-wide" key={f}>
              <CaseImg src={IMG(f)} alt={`${s.label} ... Wanderly case study`} ratio="wide" />
            </figure>
          ))}
        </section>
      ))}
    </CaseStudyLayout>
  );
}
