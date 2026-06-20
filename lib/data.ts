export const site = {
  name: "Ajay Srivastava",
  initials: "AS",
  role: "Product & UX/UI Designer",
  affiliation: "B.Tech CSE @ JSSATEN",
  location: "Noida / New Delhi",
  status: "Open to work",
  email: "ajaysriacads@gmail.com",
  statement: "A designer guided by clarity and purpose, shaping ideas with intention and transforming structure into visual meaning.",
  bioLine: "I balance user needs with business goals across research, prototyping, and visual design — and I'm especially drawn to designing for failure states and emotional recovery.",
  // TODO: replace with your Google Drive resume link
  resume: "RESUME_DRIVE_LINK"
};

export type ExploreLink = { num: string; label: string; href: string };

// Each nav item is now its own page/route (not a scroll target)
export const explore: ExploreLink[] = [
  { num: "01", label: "My Work", href: "/" },
  { num: "02", label: "About Me", href: "/about" },
  { num: "03", label: "Experience", href: "/experience" },
  { num: "04", label: "Contact", href: "/contact" },
  { num: "05", label: "Visitor Gallery", href: "/visitor-gallery" }
];

export type Outbound = { label: string; href: string };

export const outbound: Outbound[] = [
  { label: "Email", href: "mailto:ajaysriacads@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ajaysri8" },
  { label: "Behance", href: "https://behance.net/ajay_srivastava" },
  { label: "X", href: "https://x.com/hazel_creates" },
  { label: "Resume", href: "RESUME_DRIVE_LINK" }
];

export const latestLog = {
  date: "Jun 7, 2026",
  // bracketed names become styled inline links in LatestLog.tsx
  text: "I just started as a Product Designer @[Shyphan AI Solutions], building UI systems for AI-driven products end to end. On the side I'm reworking @[Payment Limbo] into a fuller case study, and sketching out a small tool to help fellow designers turn Figma flows into annotated walkthroughs."
};

export type Project = {
  num: string;
  name: string;
  cat: string;
  tags: string[];
  status: "SHIPPED" | "IN PROGRESS" | "CASE STUDY";
  href: string;
  img: string;
  desc: string;
  role: string;
  team: string;
  timeframe: string;
};

export const projects: Project[] = [
  {
    num: "01",
    name: "Wanderly",
    cat: "Travel & Tourism Planner",
    tags: ["UX/UI"],
    status: "CASE STUDY",
    href: "https://behance.net/ajay_srivastava",
    img: "https://picsum.photos/seed/wanderly/700/500",
    desc: "An end-to-end travel planning app that turns scattered research into a single itinerary — from discovery to day-by-day planning.",
    role: "Product Designer",
    team: "Solo",
    timeframe: "2025"
  },
  {
    num: "02",
    name: "Sage",
    cat: "Finance Management App",
    tags: ["Product"],
    status: "CASE STUDY",
    href: "https://behance.net/ajay_srivastava",
    img: "https://picsum.photos/seed/sage/700/500",
    desc: "A behavior-driven finance app built around \"Pulse\" — a feature that nudges spending habits instead of just tracking them.",
    role: "Product Designer",
    team: "Solo",
    timeframe: "2025"
  },
  {
    num: "03",
    name: "CredCare",
    cat: "FinTech Credit Recovery",
    tags: ["Product"],
    status: "CASE STUDY",
    href: "https://behance.net/ajay_srivastava",
    img: "https://picsum.photos/seed/credcare/700/500",
    desc: "A credit-recovery experience designed to make a stressful financial moment feel guided rather than punitive.",
    role: "Product Designer",
    team: "Solo",
    timeframe: "2024 – 2025"
  },
  {
    num: "04",
    name: "Payment Limbo",
    cat: "UPI Failure & Anxiety Recovery",
    tags: ["Product", "Research"],
    status: "IN PROGRESS",
    href: "https://behance.net/ajay_srivastava",
    img: "https://picsum.photos/seed/limbo/700/500",
    desc: "A recovery system for the in-between moment when a UPI payment fails — designed around the anxiety of not knowing where your money went.",
    role: "Product Designer, Researcher",
    team: "Solo",
    timeframe: "2025 – present"
  }
];

export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: string;
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 — Present",
    role: "Product Designer",
    org: "Shyphan AI Solutions Pvt Ltd · Noida",
    desc: "Designing scalable, user-centric end-to-end experiences across web and product for AI-driven solutions — building UI systems and reusable components, and translating business requirements into user-centered design with cross-functional teams."
  },
  {
    period: "Mar 2025 — Oct 2025",
    role: "UX/UI Designer",
    org: "Google DSC (GDSC) · New Delhi chapter",
    desc: "Designed the GDSC Ace event website and produced 30+ event creatives and 25+ social posts. Built a consistent visual identity across Instagram, LinkedIn, and print — aligned with Google's design language while reflecting the local community tone."
  },
  {
    period: "Jun 2025 — Jul 2025",
    role: "AI/ML Intern",
    org: "Edunet Foundation",
    desc: "Built an end-to-end Employee Salary Classification & Prediction System — trained Linear Regression and Decision Tree models on 47,000+ records and deployed an interactive Streamlit dashboard for real-time predictions."
  },
  {
    period: "Feb 2024 — Feb 2025",
    role: "Designer",
    org: "JSSATEN Photography & Films Club",
    desc: "Drove +400% engagement growth on event pages and 70% more ticket sales. Built a reusable design-system of templates for recurring events, plus user personas and journey maps to ground decisions."
  },
  {
    period: "Dec 2023 — Jan 2024",
    role: "Web Developer",
    org: "CodSoft",
    desc: "Built reusable UI components that improved consistency and reduced redundant code. Collaborated with design and backend teams to integrate APIs and deliver pixel-perfect, responsive layouts."
  }
];

export const services = ["Product Design", "UX / UI Design", "User Research", "Design Systems", "Prototyping"];
export const tools = ["Figma", "Framer", "Spline", "Jitter / Lottie", "Webflow"];

export const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/ajaysri8" },
  { label: "Behance", href: "https://behance.net/ajay_srivastava" },
  { label: "X / Twitter", href: "https://x.com/hazel_creates" },
  { label: "Instagram", href: "https://instagram.com/hazel_create8" }
];

/* ── ABOUT PAGE CONTENT ───────────────────────────────────── */

export const aboutIntro = {
  greeting: "Hi, I'm Ajay!",
  paragraphs: [
    "I grew up in India and now spend most of my time turning fuzzy product ideas into clear, intentional interfaces. I started out making posters and event creatives, and these days I mostly live inside Figma, Framer, and the occasional Spline scene.",
    "When I'm not dreaming up product ideas, you can find me:"
  ],
  hobbies: [
    "Sketching and drawing whatever's stuck in my head",
    "Behind a camera — photography & cinematography",
    "Cutting edits until the rhythm feels right",
    "On a skateboard",
    "Playing guitar"
  ],
  closing: "Always happy to chat! I'm on the lookout for product design roles and good conversations :)"
};

export type GalleryPhoto = { src: string; alt: string; span?: boolean };

// TODO: drop real photos into /public and swap these src values
export const galleryPhotos: GalleryPhoto[] = [
  { src: "https://picsum.photos/seed/ajay-portrait/640/720", alt: "Ajay" },
  { src: "https://picsum.photos/seed/ajay-travel/1100/720", alt: "A place I loved", span: true },
  { src: "https://picsum.photos/seed/ajay-street/640/720", alt: "Out and about" }
];

export type Community = { name: string; icon: string; desc: string; img: string };

export const communities: Community[] = [
  {
    name: "Google DSC (GDSC)",
    icon: "🟢",
    desc: "As UX/UI Designer for the New Delhi chapter I shaped the GDSC Ace website and 50+ creatives — learning to design fast, on-brand, and for a real community.",
    img: "https://picsum.photos/seed/gdsc/700/440"
  },
  {
    name: "Photography & Films Club",
    icon: "📷",
    desc: "JSSATEN's Photography & Films Club is where I first fell for visual storytelling — running events, building a template system, and growing engagement +400%.",
    img: "https://picsum.photos/seed/photoclub/700/440"
  },
  {
    name: "Edunet Foundation",
    icon: "🤖",
    desc: "An AI/ML internship community where I built an end-to-end salary prediction system — a reminder that good design has to respect the data underneath it.",
    img: "https://picsum.photos/seed/edunet/700/440"
  }
];

export type Book = { title: string; author: string; from: string; to: string };

// stylised gradient covers (no external assets needed)
export const favoriteBooks: Book[] = [
  { title: "The Design of Everyday Things", author: "Don Norman", from: "#cb7836", to: "#e8c84a" },
  { title: "Refactoring UI", author: "Wathan & Schoger", from: "#168b9d", to: "#2a8f50" },
  { title: "Don't Make Me Think", author: "Steve Krug", from: "#bf5a7a", to: "#cb7836" },
  { title: "Hooked", author: "Nir Eyal", from: "#242424", to: "#6b6553" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", from: "#168b9d", to: "#bf5a7a" },
  { title: "Atomic Habits", author: "James Clear", from: "#2a8f50", to: "#e8c84a" },
  { title: "Sprint", author: "Jake Knapp", from: "#cb7836", to: "#168b9d" },
  { title: "Laws of UX", author: "Jon Yablonski", from: "#bf5a7a", to: "#242424" }
];

/* ── VISITOR GALLERY (seeded, deterministic so SSR === client) ──────── */

// small deterministic PRNG
export function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const V_ADJ = ["VIOLET", "MORNING", "DEWY", "MULBERRY", "FLOWER", "LAVENDER", "LEMON", "TWILIGHT", "LOVELY", "PLUM", "VELVET", "ROSY", "SILKEN", "SCARLET", "FROSTED", "CHESTNUT", "SMALL", "DAPPLED", "FERN", "DROWSY", "MISTY", "ROSEWATER", "SALT", "SAFFRON", "CRIMSON", "AMBER", "SAGE", "CORAL", "INDIGO", "HAZEL", "MARIGOLD", "JADE"];
const V_NOUN = ["STORYTELLER", "GROVE", "TIDE", "PETAL", "CARTOGRAPHER", "NIGHTINGALE", "BOOKMARK", "FABLE", "THIMBLE", "ORCHID", "MOONCHILD", "STARGAZER", "LULLABY", "DRAFT", "DAYDREAMER", "LOCKET", "STARLING", "QUEEN", "CRESCENT", "HERON", "DRAGONFLY", "CANDLE", "RIDDLE", "MOTH", "WANDERER", "DREAMER", "RANGER", "COMET", "MUSE", "OWLET", "SPARROW", "PILGRIM"];
const V_COLORS = ["orange", "green", "pink", "teal", "pink", "orange", "green"];

export const VISITOR_COLORS: Record<string, { bg: string; fg: string }> = {
  teal: { bg: "#168b9d", fg: "#f3f1eb" },
  green: { bg: "#2a8f50", fg: "#f3f1eb" },
  pink: { bg: "#bf5a7a", fg: "#f3f1eb" },
  orange: { bg: "#cb7836", fg: "#f3f1eb" }
};

export type VisitorEntry = {
  name: string;
  color: string;
  no: string;
  issued: string;
  seed: number;
  signed: boolean;
};

export const seedVisitors: VisitorEntry[] = (() => {
  const rng = mulberry32(20260609);
  const pad = (n: number) => String(n).padStart(2, "0");
  const base = new Date(2026, 5, 9); // fixed date → deterministic
  return Array.from({ length: 39 }, (_, i) => {
    const name = `${V_ADJ[Math.floor(rng() * V_ADJ.length)]} ${V_NOUN[Math.floor(rng() * V_NOUN.length)]}`;
    const color = V_COLORS[Math.floor(rng() * V_COLORS.length)];
    const no = String(Math.floor(rng() * 10000)).padStart(4, "0");
    const d = new Date(base);
    d.setDate(d.getDate() - Math.floor(i / 4) - Math.floor(rng() * 2));
    const issued = `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${String(d.getFullYear()).slice(2)}`;
    const seed = Math.floor(rng() * 1e9);
    const signed = rng() > 0.2;
    return { name, color, no, issued, seed, signed };
  });
})();

export const guestCount = 1247 + seedVisitors.length;

