import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";
import CaseImg from "@/components/CaseImg";

export const metadata: Metadata = {
  title: "MONALISA — Fashion Ecommerce Experience · Ajay Srivastava",
  description:
    "A 15 screen fashion storefront. Product-first home, product page with AI summarised reviews, cart, checkout, confirmation, plus the brand, blog, support and legal pages. Built as one store, not a stack of mockups."
};

// Editorial monochrome brand — red only appears for savings & delete actions,
// so a warm red reads as MONALISA's identity accent inside the case-study frame.
const ACCENT = "#c92a2a";
const IMG = (name: string) => `/case/monalisa/${name}.webp`;

// Screen anchors — used by both the TOC and the ScreenRow ids.
const anchorFor = (file: string) => `s-designs-${file}`;

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-designs", num: "02", label: "Designs" },
  // shopping flow (7)
  { id: anchorFor("home"),           num: "2.1", label: "Home", sub: true },
  { id: anchorFor("collection"),     num: "2.2", label: "Shop / Collection", sub: true },
  { id: anchorFor("knitwear"),       num: "2.3", label: "Category (Knitwear)", sub: true },
  { id: anchorFor("product"),        num: "2.4", label: "Product Detail", sub: true },
  { id: anchorFor("cart"),           num: "2.5", label: "Cart", sub: true },
  { id: anchorFor("checkout"),       num: "2.6", label: "Checkout", sub: true },
  { id: anchorFor("order-received"), num: "2.7", label: "Order Received", sub: true },
  // brand and content (3)
  { id: anchorFor("about"),          num: "2.8", label: "About / Brand", sub: true },
  { id: anchorFor("blog"),           num: "2.9", label: "Blog", sub: true },
  { id: anchorFor("article"),        num: "2.10", label: "Article", sub: true },
  // support and utility (5)
  { id: anchorFor("support"),        num: "2.11", label: "Support Center (FAQ)", sub: true },
  { id: anchorFor("contact"),        num: "2.12", label: "Contact", sub: true },
  { id: anchorFor("privacy"),        num: "2.13", label: "Privacy Policy", sub: true },
  { id: anchorFor("terms"),          num: "2.14", label: "Terms of Service", sub: true },
  { id: anchorFor("not-found"),      num: "2.15", label: "404", sub: true },
  { id: "s-impact", num: "03", label: "Impact" }
];

// One figure per screen; the user drops files into /public/case/monalisa/
// and they appear automatically. A labelled placeholder holds each spot.
const shoppingFlow = [
  {
    file: "home",
    title: "Home",
    body:
      "Hero with a quick-add card sitting inside it. Best sellers grid you can filter by category. Dark band for the shipping and guarantee strip. New arrivals carousel. A few editorial picks further down."
  },
  {
    file: "collection",
    title: "Shop / Collection",
    body:
      "The full browse. Seasonal hero, two promo tiles, a “Shop by Collection” row, then the product grid with search, category, size, colour and sort. A couple of ad-style tiles sit inside the grid."
  },
  {
    file: "knitwear",
    title: "Category (Knitwear)",
    body:
      "Same browse, scoped to one collection. Breadcrumb, category hero, same filters. Mostly here to prove the grid holds up whatever category you point it at."
  },
  {
    file: "product",
    title: "Product Detail",
    body:
      "The page the sale actually happens on, so I loaded it. Photo gallery, colour and size options, live stock, warranty note, fit table, ratings, an AI summary of the reviews with sentiment tags, an FAQ, and a “you might also like” row."
  },
  {
    file: "cart",
    title: "Cart",
    body:
      "The bag, fully editable. Change colour, size or quantity, remove items, and the right-side summary keeps totals live with room for a coupon."
  },
  {
    file: "checkout",
    title: "Checkout",
    body:
      "One screen. Your details, shipping, delivery, payment, with the order summary alongside so you always see what you’re paying."
  },
  {
    file: "order-received",
    title: "Order Received",
    body:
      "The thank-you page. Confirms the order, lists what you bought, tucks payment info into a dropdown, shows totals, and offers track order or keep shopping."
  }
];

const brandContent = [
  {
    file: "about",
    title: "About / Brand",
    body:
      "Brand story. Positioning, philosophy and purpose at the top, then material and craft points numbered out, a sustainability section, and a few customer quotes."
  },
  {
    file: "blog",
    title: "Blog",
    body: "The article index. Featured post carousel, grid of articles, pagination."
  },
  {
    file: "article",
    title: "Article",
    body:
      "A single long read. Images threaded through the body, related posts at the end."
  }
];

const supportUtility = [
  {
    file: "support",
    title: "Support Center (FAQ)",
    body:
      "Help people can sort out themselves. Search bar, topic chips, and an accordion of questions."
  },
  {
    file: "contact",
    title: "Contact",
    body:
      "The get-in-touch page. Form, phone, email, and a map to the store."
  },
  {
    file: "privacy",
    title: "Privacy Policy",
    body:
      "Legal, kept readable with an “on this page” menu that follows you down."
  },
  {
    file: "terms",
    title: "Terms of Service",
    body:
      "Same treatment as Privacy. Sticky sidebar of section anchors so people can jump to the clause they care about."
  },
  {
    file: "not-found",
    title: "404",
    body: "The 404, still on brand. A clean not-found screen with a way back home."
  }
];

const impactPoints = [
  "A full working system, not a stack of nice-looking screens. 15 pages reuse the same building blocks, so adding another page later doesn’t mean redrawing everything.",
  "Trust is spread along the path, not stacked at the end. Reviews, the AI review summary, the fit table, warranty, FAQ and customer quotes all sit on the product page itself, well before anyone reaches checkout.",
  "The money side is spelled out. Discount, shipping, tax and coupons show up at the cart, at checkout and on the confirmation, in the same place each time."
];

function ScreenRow({ file, title, body }: { file: string; title: string; body: string }) {
  return (
    <div className="cs-screen-row" id={anchorFor(file)}>
      <h4 className="cs-screen-row__title">{title}</h4>
      <p className="cs-screen-row__body">{body}</p>
      <figure className="cs-wide">
        <CaseImg src={IMG(file)} alt={`MONALISA — ${title}`} ratio="wide" />
      </figure>
    </div>
  );
}

export default function MonalisaCaseStudy() {
  return (
    <CaseStudyLayout toc={TOC} accent={ACCENT}>
      <section className="cs-hero cs-hero--cover">
        {/* Wordmark banner — keep intrinsic aspect, don't crop the letters */}
        <CaseImg className="cs-hero__cover cs-hero__cover--contain" src="/case/monalisa/cover.png" alt="MONALISA" ratio="wide" />
      </section>

      {/* 01 Overview — the top-line, tags, title, intro, one-liner and details all sit here per brief */}
      <section className="cs-sec" id="s-overview">
        <p className="cs-eyebrow">01 · Overview</p>

        <div className="cs-callout">
          <p className="cs-callout__label">Top line</p>
          <p className="cs-callout__quote">
            &ldquo;Plenty of brands sell clothes. The experience is what makes someone actually buy.&rdquo;
          </p>
        </div>

        <header className="cs-title" style={{ marginTop: "2.2rem" }}>
          <div className="cs-tags">
            <span className="cs-tag">Case Study</span>
            <span className="cs-tag">Web Design</span>
            <span className="cs-tag">Ecommerce</span>
          </div>
          <h1 className="cs-title__h">
            <span className="cs-star" aria-hidden>&#10033;</span> MONALISA, a fashion ecommerce experience
          </h1>
          <p className="cs-title__lead">
            A full storefront for a modern clothing brand. 15 screens, from the home page to the order confirmation,
            plus the brand story, blog, support and legal pages, and the 404. Fashion sites tend to blur into each other,
            so I kept this one plain and quick to move through: product up front, with enough trust on every page that
            buying feels like the normal next step.
          </p>
          <p className="cs-title__lead cs-quoteline">
            &ldquo;A store that&rsquo;s easy to trust and easy to buy from.&rdquo;
          </p>
        </header>

        <div className="cs-meta" style={{ marginTop: "1.5rem" }}>
          <div className="cs-meta__col"><span className="cs-meta__k">Role</span><span className="cs-meta__v">UI/UX Designer</span></div>
          <div className="cs-meta__col"><span className="cs-meta__k">Client type</span><span className="cs-meta__v">Fashion / Apparel</span></div>
          <div className="cs-meta__col"><span className="cs-meta__k">Scope</span><span className="cs-meta__v">Full storefront, 15 screens</span></div>
          <div className="cs-meta__col"><span className="cs-meta__k">Tools</span><span className="cs-meta__v">Figma</span></div>
        </div>
      </section>

      {/* 02 Designs — every screen shown at full width, grouped like the brief */}
      <section className="cs-sec" id="s-designs">
        <p className="cs-eyebrow">02 · Designs</p>
        <h2 className="cs-h2">Every screen, in the order someone would walk through them.</h2>

        <h3 className="cs-h3" style={{ marginTop: "2rem" }}>The shopping flow</h3>
        <div className="cs-screens">
          {shoppingFlow.map((s) => <ScreenRow key={s.file} {...s} />)}
        </div>

        <h3 className="cs-h3">Brand and content</h3>
        <div className="cs-screens">
          {brandContent.map((s) => <ScreenRow key={s.file} {...s} />)}
        </div>

        <h3 className="cs-h3">Support and utility</h3>
        <div className="cs-screens">
          {supportUtility.map((s) => <ScreenRow key={s.file} {...s} />)}
        </div>

        <div className="cs-callout" style={{ marginTop: "2rem" }}>
          <p className="cs-callout__label">What ties it together</p>
          <p className="cs-callout__quote">
            Every page shares the nav, the oversized MONALISA wordmark in the footer, and the &ldquo;Let&rsquo;s Take
            Your Fashion to The Stratosphere&rdquo; banner near the bottom. Black, white and neutral grey everywhere.
            Red only shows up on savings and delete.
          </p>
        </div>
      </section>

      {/* 03 Impact */}
      <section className="cs-sec" id="s-impact">
        <p className="cs-eyebrow">03 · Impact</p>
        <ul className="cs-bullets">
          {impactPoints.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <p className="cs-lead" style={{ marginTop: "1.4rem" }}>
          Once it&rsquo;s live, the numbers I&rsquo;d want to see are add-to-cart rate, checkout completion, how often
          people actually use the filters, and whether returns start trending toward sizing.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
