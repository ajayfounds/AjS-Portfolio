export const site = {
  name: "Ajay Srivastava",
  brand: "HAZEL Verse",
  initials: "AS",
  role: "Product Designer",
  affiliation: "B.Tech CSE @ JSSATEN",
  location: "Noida / New Delhi",
  status: "Open to work",
  email: "ajaysriacads@gmail.com",
  statement: "A designer guided by clarity and purpose, shaping ideas with intention and transforming structure into visual meaning.",
  bioLine: "Previous intern @Shyphan AI Solutions \ @GDG-New Delhi @Edunet Foundation \ @JSSATEN-PFC @WoB '25 @GSSoC '24",
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
  { label: "Resume", href: "https://drive.google.com/file/d/1_ghrKRNOP7hjKbNmJB3p8ZznBYGnWJIx/view?usp=sharing" }
];

export const latestLog = {
  date: "Jun 22, 2026",
  // bracketed names become styled inline links in LatestLog.tsx
  text: "Currently deep in a Blinkit feature case study... dissecting the edge cases most designers skip over: promo code conflicts when multiple offers stack or cancel each other out, and substitution logic when items go out of stock mid-order. The focus is on designing recovery flows that feel considered, not bolted on."
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
    href: "https://www.behance.net/gallery/247912507/Wanderly",
    img: "/me/thumbnail_wanderly.png",
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
    href: "https://www.figma.com/deck/B6zOrRY4Hy4307YfHVDWbO/STRsage?node-id=1-96&t=xCvQR6O70cwHLAHk-1",
    img: "/me/thumbnail_Sage.png",
    desc: "A behavior-driven finance app built around \"Pulse\" — a feature that nudges spending habits instead of just tracking them.",
    role: "Product Designer",
    team: "Solo",
    timeframe: "2026"
  },
  {
    num: "03",
    name: "CredCare",
    cat: "FinTech Credit Recovery",
    tags: ["Product"],
    status: "CASE STUDY",
    href: "https://www.behance.net/gallery/246375825/Credcare-FinTech-Credit-Recovery-App",
    img: "/me/thumbnail_credcare.png",
    desc: "A credit-recovery experience designed to make a stressful financial moment feel guided rather than punitive.",
    role: "Product Designer",
    team: "Solo",
    timeframe: "2025"
  },
  {
    num: "04",
    name: "Payment Limbo",
    cat: "UPI Failure & Anxiety Recovery",
    tags: ["Product", "Research"],
    status: "IN PROGRESS",
    href: "https://www.behance.net/gallery/245200333/UPI-Failure-Recovery-System",
    img: "/me/thumbnail_paymentlimbo.png",
    desc: "A recovery system for the in-between moment when a UPI payment fails — designed around the anxiety of not knowing where your money went.",
    role: "Product Designer, Researcher",
    team: "Solo",
    timeframe: "2026"
  },
  {
    num: "05",
    name: "Blinkit Case Study",
    cat: "New category addition",
    tags: ["Product", "Research"],
    status: "IN PROGRESS",
    href: "#",
    img: "/me/locked_BlinkIT.png",
    desc: "A recovery system for the in-between moment when a UPI payment fails — designed around the anxiety of not knowing where your money went.",
    role: "Product Designer, Researcher",
    team: "Solo",
    timeframe: "2026"
  }
];

export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: string;
  short: string;   // chip label for the Journey timeline
  accent: string;  // card tint for the Journey timeline
  icon: string;    // chip glyph
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 — June 2026",
    role: "Product Designer",
    org: "Shyphan AI Solutions Pvt Ltd · Noida",
    desc: "Designing scalable, user-centric end-to-end experiences across web and product for AI-driven solutions — building UI systems and reusable components, and translating business requirements into user-centered design with cross-functional teams.",
    short: "Shyphan AI",
    accent: "#cb7836",
    icon: "✦"
  },
  {
    period: "Mar 2025 — Oct 2025",
    role: "UX/UI Designer",
    org: "Google DSC (GDSC) · New Delhi chapter",
    desc: "Designed the GDSC Ace event website and produced 30+ event creatives and 25+ social posts. Built a consistent visual identity across Instagram, LinkedIn, and print — aligned with Google's design language while reflecting the local community tone.",
    short: "GDSC Delhi",
    accent: "#168b9d",
    icon: "◎"
  },
  {
    period: "Jun 2025 — Jul 2025",
    role: "AI/ML Intern",
    org: "Edunet Foundation",
    desc: "Built an end-to-end Employee Salary Classification & Prediction System — trained Linear Regression and Decision Tree models on 47,000+ records and deployed an interactive Streamlit dashboard for real-time predictions.",
    short: "Edunet",
    accent: "#2a8f50",
    icon: "▟"
  },
  {
    period: "Feb 2024 — Feb 2025",
    role: "Designer",
    org: "JSSATEN Photography & Films Club",
    desc: "Drove +400% engagement growth on event pages and 70% more ticket sales. Built a reusable design-system of templates for recurring events, plus user personas and journey maps to ground decisions.",
    short: "Photo & Films Club",
    accent: "#bf5a7a",
    icon: "❒"
  },
  {
    period: "Dec 2023 — Jan 2024",
    role: "Web Developer",
    org: "CodSoft",
    desc: "Built reusable UI components that improved consistency and reduced redundant code. Collaborated with design and backend teams to integrate APIs and deliver pixel-perfect, responsive layouts.",
    short: "CodSoft",
    accent: "#9a8f2f",
    icon: "❮❯"
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
    "Behind my camera — photography & cinematography",
    "Cutting edits until the rhythm feels right",
    "Chasing mountain-valley treks, camera in hand",
    "On a skateboard",
    "Playing guitar",
    "Hunting for retro gadgets"
  ],

  
  closing: "Always happy to chat! I'm on the lookout for product design roles and good conversations :)"
};

export type Community = { name: string; icon: string; desc: string; img: string };

export const communities: Community[] = [
  {
    name: "JSSATEN Photography & Films Club",
    icon: "📷",
    desc: "",
    img: "/me/neon.jpg"
  },
  {
    name: "GDSC — New Delhi chapter",
    icon: "🟢",
    desc: "",
    img: "/me/conf.jpg"
  },
  {
    name: "Designare",
    icon: "✦",
    desc: "",
    img: "/me/community-group.jpg"
  }
];

export type Fave = { title: string; note?: string; img: string };

// "A few of my favorite things" — one sliding strip per section.
// Covers live in /public/covers and are all cropped to the same ratio.
export const favorites: { label: string; items: Fave[]; square?: boolean }[] = [
  {
    label: "On Screen",
    items: [
      { title: "Across the Spider-Verse", note: "every frame a new art style", img: "/covers/spider-verse.jpg" },
      { title: "The Flash", note: "for the chem + physics nerd in me", img: "/covers/the-flash.jpg" },
      { title: "Haikyū!!", note: "storytelling that hits", img: "/covers/haikyu.jpg" },
      { title: "One Piece", note: "Zoro supremacy", img: "/covers/one-piece.jpg" }
    ]
  },
  {
    label: "Music",
    square: true,
    items: [
      { title: "Alec Benjamin", note: "a whole story in three minutes", img: "/covers/alec-benjamin.jpg" },
      { title: "Shawn Mendes", note: "on repeat, endlessly", img: "/covers/shawn-mendes.jpg" },
      { title: "Billie Eilish", note: "hit me hard and soft", img: "/covers/billie-eilish.jpg" },
      { title: "Metro Boomin", note: "beats on loop", img: "/covers/metro-boomin.jpg" }
    ]
  },
  {
    label: "Books",
    items: [
      { title: "Psycho-Cybernetics", note: "rewiring the self-image", img: "/covers/psycho-cybernetics.jpg" },
      { title: "The Creative Act", note: "making as a way of being", img: "/covers/creative-act.jpg" },
      { title: "Keep Going", note: "show up, keep creating", img: "/covers/keep-going.jpg" }
    ]
  }
];

/* "Things I do for fun" — fanned photo deck */
export type FunPhoto = { src: string; alt: string };

export const funStack: FunPhoto[] = [
  { src: "/me/polaroid.jpg", alt: "Polaroid" },
  { src: "/me/neon.jpg", alt: "Neon night" },
  { src: "/me/anime.jpg", alt: "Out and about" },
  { src: "/me/redshot.jpg", alt: "On set" },
  { src: "/me/community-selfie.jpg", alt: "With the crew" },
  { src: "/me/conf.jpg", alt: "On stage" }
];

export const funBlurb =
  "I studied a little of everything before design found me — sketchbooks, a camera, a skateboard, a guitar. Design, for me, isn't just screens; it's the same itch to make something feel intentional, whether that's a poster, an edit, or a product flow.";

/* "Journey so far" — quote card */
export type JourneyQuote = {
  emoji: string;
  lead: string;
  emph: string;
  tail: string;
  from: string; // backdrop gradient
  via: string;
  to: string;
};

// each emoji tab swaps the quote + its backdrop
export const journeyQuotes: JourneyQuote[] = [
  {
    emoji: "💬",
    lead: "Design is ",
    emph: "storytelling",
    tail: ", not just decoration.",
    from: "#cfe8f5", via: "#bfe3d2", to: "#9fd6a6"
  },
  {
    emoji: "🎬",
    lead: "I treat mistakes as part of ",
    emph: "learning",
    tail: ", not failure.",
    from: "#dce9f7", via: "#f2e3cf", to: "#e8c9a6"
  },
  {
    emoji: "🎸",
    lead: "The best flows have ",
    emph: "rhythm",
    tail: " — you feel it before you see it.",
    from: "#efd9e6", via: "#e3c9e8", to: "#c9b3e0"
  },
  {
    emoji: "📷",
    lead: "Good design is ",
    emph: "noticing",
    tail: " what everyone else walks past.",
    from: "#f7e6cf", via: "#f0cfc0", to: "#d9a9a0"
  }
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

