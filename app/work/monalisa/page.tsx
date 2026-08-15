import type { Metadata } from "next";
import CaseStudyLayout, { type Toc } from "@/components/CaseStudyLayout";
import CaseImg from "@/components/CaseImg";

export const metadata: Metadata = {
  title: "MONALISA — Fashion Ecommerce Experience · Ajay Srivastava",
  description:
    "MONALISA is a 15 screen fashion ecommerce design, from a product first home page to a product page with AI summarised reviews, then cart, checkout and confirmation, all built as one consistent store."
};

// Editorial monochrome brand — red only appears for savings & delete actions,
// so a warm red reads as MONALISA's identity accent inside the case-study frame.
const ACCENT = "#c92a2a";
const IMG = (name: string) => `/case/monalisa/${name}.webp`;

const TOC: Toc[] = [
  { id: "s-overview", num: "01", label: "Overview" },
  { id: "s-designs", num: "02", label: "Designs" },
  { id: "s-impact", num: "03", label: "Impact" }
];

// One figure per screen; the user drops files into /public/case/monalisa/
// and they appear automatically. A labelled placeholder holds each spot.
const shoppingFlow = [
  {
    file: "home",
    title: "Home",
    body:
      "The main landing page. Big hero with a quick add card sitting right in it, a best seller grid you can filter by category, a dark band that lays out the support and guarantees, a new arrivals carousel, and a few editorial picks further down."
  },
  {
    file: "collection",
    title: "Shop / Collection",
    body:
      "Where people browse everything. Seasonal hero up top, a couple of promo tiles, a “Shop by Collection” row, then the product grid with search, category, size, colour and sort. I dropped a few ad style tiles into the grid too."
  },
  {
    file: "knitwear",
    title: "Category (Knitwear)",
    body:
      "The same browsing layout, focused on one collection. Breadcrumb, a category hero and the same filters, which shows the grid holds up for any category you point it at."
  },
  {
    file: "product",
    title: "Product Detail",
    body:
      "This is where the sale happens, so I put everything a buyer needs on it. Photo gallery, colour and size options, live stock, a warranty note, a fit table, ratings, an AI summary of the reviews with quick sentiment tags, an FAQ, and a “you might also like” row."
  },
  {
    file: "cart",
    title: "Cart",
    body:
      "The bag, fully editable. Swap colour, size or quantity, remove items, and the summary on the right keeps the totals updated with room for a coupon."
  },
  {
    file: "checkout",
    title: "Checkout",
    body:
      "All on one screen. Your details, shipping, delivery choice and payment, with the order summary next to it so you always see what you’re paying."
  },
  {
    file: "order-received",
    title: "Order Received",
    body:
      "The thank you page. It confirms the order, lists what you bought, tucks the payment info into a dropdown, shows the totals, and gives you track order or keep shopping."
  }
];

const brandContent = [
  {
    file: "about",
    title: "About / Brand",
    body:
      "The brand story. Positioning, philosophy and purpose up top, then the material and craft points numbered out, a section on sustainability, and some real customer quotes."
  },
  {
    file: "blog",
    title: "Blog",
    body: "The article index. A featured post carousel, a grid of articles and pagination."
  },
  {
    file: "article",
    title: "Article",
    body:
      "A single long read, laid out properly with images through the body and related posts at the end."
  }
];

const supportUtility = [
  {
    file: "support",
    title: "Support Center (FAQ)",
    body:
      "Help people can sort out themselves. Search bar, topic chips to narrow things down, and an accordion of questions."
  },
  {
    file: "contact",
    title: "Contact",
    body:
      "The get in touch page. A form, a phone number and email, and a map to find the store."
  },
  {
    file: "privacy",
    title: "Privacy Policy",
    body:
      "The legal pages, kept readable with a little “on this page” menu that follows you as you scroll."
  },
  {
    file: "terms",
    title: "Terms of Service",
    body:
      "Same treatment as Privacy — the same readable layout with a sticky sidebar of section anchors."
  },
  {
    file: "not-found",
    title: "404",
    body: "Even the error page stays on brand. A clean not found screen with a way back home."
  }
];

const impactPoints = [
  "It’s a full working system, not a few nice looking screens. 15 pages cover the whole journey and reuse the same building blocks, so it can grow without breaking.",
  "Trust sits along the path, not at the end. Reviews, the AI review summary, the fit table, warranty, FAQ and customer quotes handle the usual “should I buy this” worries before someone reaches checkout.",
  "The money side is clear. Discount, shipping, tax and coupons are all spelled out across the cart, checkout and confirmation."
];

function ScreenRow({ file, title, body }: { file: string; title: string; body: string }) {
  return (
    <div className="cs-screen-row">
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
        <CaseImg className="cs-hero__cover" src={IMG("cover")} alt="" ratio="wide" />
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
            MONALISA is a full storefront I designed for a modern clothing brand. It runs to 15 screens and covers the
            whole thing, from the home page all the way to the order confirmation, plus the brand story, blog, support
            and legal pages, and even the 404. A lot of fashion sites end up feeling the same, so I focused on keeping
            this one clear and easy to move through, with the product up front and a bit of trust on every page so
            people feel okay buying.
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
        <h2 className="cs-h2">Here&rsquo;s the whole experience, one screen at a time.</h2>

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
            Every page shares the same nav, the oversized MONALISA wordmark in the footer, and that &ldquo;Let&rsquo;s
            Take Your Fashion to The Stratosphere&rdquo; banner near the bottom. The whole site stays black, white and
            neutral grey, with red used only for savings and delete actions.
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
          Once it&rsquo;s live, the numbers worth watching are add to cart rate, checkout completion, how much people
          use the filters, and returns tied to sizing.
        </p>
      </section>
    </CaseStudyLayout>
  );
}
