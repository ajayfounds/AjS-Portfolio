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
  resume: "https://drive.google.com/file/d/1_ghrKRNOP7hjKbNmJB3p8ZznBYGnWJIx/view?usp=sharing"
};

export type ExploreLink = { num: string; label: string; href: string };

// Each nav item is now its own page/route (not a scroll target)
export const explore: ExploreLink[] = [
  { num: "01", label: "My Work", href: "/" },
  { num: "02", label: "About Me", href: "/about" },
  { num: "03", label: "Experience", href: "/experience" },
  { num: "04", label: "Skills & Services", href: "/skills" },
  { num: "05", label: "Visitor Gallery", href: "/visitor-gallery" }
];

export type Outbound = { label: string; href: string };

// Resume lives in the sidebar header button now, not in this list
export const outbound: Outbound[] = [
  { label: "Email", href: "mailto:ajaysriacads@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/ajaysri8" },
  { label: "Behance", href: "https://behance.net/ajay_srivastava" },
  { label: "X", href: "https://x.com/hazel_creates" }
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
  caseHref?: string; // internal case-study route, if one exists
  locked?: boolean;  // still in progress — render view-only, not clickable
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
    caseHref: "/work/credcare",
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
    status: "CASE STUDY",
    href: "https://www.behance.net/gallery/245200333/UPI-Failure-Recovery-System",
    caseHref: "/work/upi-failure-recovery",
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
    locked: true,
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
  org: string;        // "Company · Internship/Part-time"
  location: string;
  desc: string[];     // exact bullet points (verbatim) — shown on the Experience page
  blurb: string;      // short 1–2 liner — shown on the About "Journey" card
  short: string;      // chip label for the Journey timeline
  accent: string;     // vibrant fill for the Journey mini card
  fg: string;         // complementary light text on that fill
  icon: string;       // fallback glyph if the logo image is missing
  logo: string;       // /logos/*.jpg
};

export const experience: Experience[] = [
  {
    period: "Apr 2026 — Jun 2026",
    role: "Product Designer",
    org: "Shyphan AI Solutions · Internship",
    location: "Noida, India · On-site",
    desc: [
      "Designed and optimized 30+ high-fidelity mobile screens for urgent, scheduled, follow-up, and video consultations, reducing booking complexity through intuitive multi-step user journeys.",
      "Designed a patient healthcare ecosystem spanning 7 core modules, 120+ screens, and 100+ user flows, including teleconsultation, medical records, home healthcare marketplace, digital wallet, and patient profile management.",
      "Created reusable design system components, interaction patterns, and responsive UI layouts in Figma, improving design consistency and accelerating developer handoff."
    ],
    blurb: "Designed a 120+ screen patient-care app end to end.",
    short: "Shyphan AI",
    accent: "#ea580c",
    fg: "#ffffff",
    icon: "✦",
    logo: "/logos/shyphan.jpg"
  },
  {
    period: "Mar 2025 — Oct 2025",
    role: "Designer",
    org: "GDG New Delhi · Part-time",
    location: "Delhi, India · Hybrid",
    desc: [
      "Designed the website for GDSC Ace event (in collaboration with GDSC Wow and Delhi Kotlin User Group) with my fellow mates.",
      "Designed 30+ event creatives, 25+ social media posts, and promotional materials for the New Delhi chapter’s tech events, workshops, and hackathons.",
      "Developed a consistent visual identity across Instagram, LinkedIn, and print collaterals that aligned with Google’s design language while reflecting the chapter’s local community tone.",
      "Collaborated closely with the core team and event leads to deliver time-bound design assets for speaker sessions, study jams, and community outreach campaigns."
    ],
    blurb: "Event website + 55 creatives for the Delhi chapter.",
    short: "GDG Delhi",
    accent: "#1d4ed8",
    fg: "#ffd24a",
    icon: "◎",
    logo: "/logos/gdg.jpg"
  },
  {
    period: "Jun 2025 — Jul 2025",
    role: "AI & ML Intern",
    org: "Edunet Foundation · Internship",
    location: "New Delhi, India · Remote",
    desc: [
      "Developed an end-to-end Employee Salary Classification and Prediction System at Edunet Foundation.",
      "Built and trained Linear Regression and Decision Tree models on a dataset of over 47,000 employee records.",
      "Applied data preprocessing techniques, including one-hot encoding and feature scaling, to enhance prediction accuracy.",
      "Gained hands-on experience in machine learning algorithms and data analysis in a dynamic startup environment."
    ],
    blurb: "Built an ML salary-prediction system on 47k+ records.",
    short: "Edunet",
    accent: "#15803d",
    fg: "#ffffff",
    icon: "◟",
    logo: "/logos/edunet.jpg"
  },
  {
    period: "Feb 2024 — Feb 2025",
    role: "Designer",
    org: "JSSATEN Photography and Films Club · Part-time",
    location: "Noida, India · Hybrid",
    desc: [
      "Increased the engagements on all social handles by +400% growth on event pages and 70% more tickets sold",
      "Built a reusable design system of templates for recurring events, reducing turnaround time for social creatives and ensuring visual consistency across all chapter communications.",
      "Created high-quality 3D models of candles for realistic product visualization, boosting customer engagement and purchase confidence"
    ],
    blurb: "Grew event engagement +400% with a reusable design system.",
    short: "Photo & Films Club",
    accent: "#7c3aed",
    fg: "#ffffff",
    icon: "❒",
    logo: "/logos/jssaten-pfc.jpg"
  },
  {
    period: "Oct 2024 — Jan 2025",
    role: "Web Development Contributor",
    org: "Winter Of Blockchain · Part-time",
    location: "Remote",
    desc: [
      "Developed and integrated 10+ frontend enhancements and bug fixes for blockchain-focused open-source projects using React.js, JavaScript, HTML, CSS, and Git.",
      "Successfully collaborated with maintainers across distributed teams, contributing through GitHub Pull Requests, issue tracking, and peer-reviewed development workflows.",
      "Improved code quality by writing reusable, modular, and maintainable frontend components while following modern software engineering best practices."
    ],
    blurb: "Shipped 10+ frontend fixes for open-source blockchain projects.",
    short: "Winter of Blockchain",
    accent: "#334155",
    fg: "#ffffff",
    icon: "❄",
    logo: "/logos/wob.jpg"
  },
  {
    period: "May 2024 — Aug 2024",
    role: "Web Developer",
    org: "GirlScript Summer of Code · Part-time",
    location: "Delhi, India · Remote",
    desc: [
      "Contributed 20+ pull requests across 5+ open-source repositories, developing new features, resolving bugs, and improving application performance using React.js, JavaScript, HTML5, CSS3, and Git.",
      "Collaborated with 15+ maintainers and contributors through GitHub Issues, Pull Requests, and code reviews, reducing issue resolution time and maintaining high code quality.",
      "Enhanced UI responsiveness, reusable components, and frontend architecture, improving maintainability while following Agile development practices and Git workflows."
    ],
    blurb: "20+ merged PRs across 5+ open-source repos.",
    short: "GirlScript SoC",
    accent: "#be123c",
    fg: "#ffffff",
    icon: "‹›",
    logo: "/logos/gssoc.jpg"
  },
  {
    period: "Jun 2024 — Jul 2024",
    role: "Web Dev Contributor",
    org: "Social (Formerly Script Foundation) · Part-time",
    location: "Delhi, India · Remote",
    desc: [
      "Delivered 15+ production-ready code contributions across multiple open-source repositories, implementing responsive UI components and fixing critical frontend issues using React.js and JavaScript.",
      "Collaborated with distributed development teams through GitHub, participating in issue triaging, pull requests, documentation, and peer code reviews across 10+ development tasks.",
      "Improved application usability by developing reusable components, optimizing frontend code structure, and ensuring cross-browser compatibility."
    ],
    blurb: "15+ frontend contributions across open-source repos.",
    short: "Social",
    accent: "#0f766e",
    fg: "#ffffff",
    icon: "◈",
    logo: "/logos/social.jpg"
  },
  {
    period: "Dec 2023 — Jan 2024",
    role: "Web Developer",
    org: "CodSoft · Part-time",
    location: "Remote",
    desc: [
      "Designed a landing page for QuicTric (academic study material website) with functionalities (with responsiveness).",
      "Designed a full working Portfolio website using Javascript (with responsiveness).",
      "Maked a fully functional calculator for basic use."
    ],
    blurb: "Built responsive landing, portfolio & calculator sites.",
    short: "CodSoft",
    accent: "#b45309",
    fg: "#ffffff",
    icon: "❮❯",
    logo: "/logos/codsoft.jpg"
  }
];

export const services = ["Product Design", "UX / UI Design", "User Research", "Design Systems", "Prototyping"];
export const tools = ["Figma", "Framer", "Spline", "Jitter / Lottie", "Webflow"];

/* ── SKILLS & SERVICES — my current stack ─────────────────── */

export type StackItem = { icon: string; name: string; desc: string };

export const stack: { label: string; items: StackItem[] }[] = [
  {
    label: "AI + Tools",
    items: [
      { icon: "claude", name: "Claude", desc: "Agentic engineering, design systems intelligence, research" },
      { icon: "claude", name: "Claude Design", desc: "Visual design direction, generative UI, design critique" },
      { icon: "openai", name: "ChatGPT", desc: "Ideation, content drafting, rapid problem framing" },
      { icon: "figma", name: "Figma", desc: "Design, prototyping, component architecture" },
      { icon: "figma", name: "Figma Make", desc: "Generative design system builds, AI-assisted prototyping" }
    ]
  },
  {
    label: "Design + Research",
    items: [
      { icon: "figma", name: "Figma / FigJam", desc: "Visual design, flows, collaborative mapping" },
      { icon: "notion", name: "Notion", desc: "Documentation, research repositories, case studies" },
      { icon: "miro", name: "Miro", desc: "Workshops, journey maps, ideation" },
      { icon: "perplexity", name: "Perplexity", desc: "Research synthesis, competitive analysis" },
      { icon: "claude", name: "Claude", desc: "Visual design direction, research analysis" }
    ]
  },
  {
    label: "Strategy + Systems",
    items: [
      { icon: "figma", name: "Design Systems", desc: "Tokens, components, documentation, single source of truth" },
      { icon: "css", name: "Design Tokens", desc: "Variables, theming, cross-platform consistency" },
      { icon: "storybook", name: "Component Libraries", desc: "Reusable UI, versioning, design-dev handoff" },
      { icon: "people", name: "Stakeholder Management", desc: "Alignment, buy-in, cross-functional communication" },
      { icon: "a11y", name: "Accessibility / WCAG", desc: "Inclusive design, AA/AAA compliance, ARIA, contrast" }
    ]
  }
];

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

export type Community = { name: string; icon: string; desc: string; img: string; logo?: string };

export const communities: Community[] = [
  {
    name: "JSSATEN Photography & Films Club",
    icon: "📷",
    desc: "",
    img: "/me/neon.jpg",
    logo: "/logos/jssaten-pfc.jpg"
  },
  {
    name: "GDSC — New Delhi chapter",
    icon: "🟢",
    desc: "",
    img: "/me/conf.jpg",
    logo: "/logos/gdg.jpg"
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

