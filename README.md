# Ajay Srivastava — Portfolio

A personal portfolio for **Ajay Srivastava** (Product & UX/UI Designer), built with **Next.js (App Router) + TypeScript**, animated with **Framer Motion** and **Lenis** smooth scrolling. Inspired by the look/feel/motion of editorial designer portfolios — design recreation, not a content copy.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Framer Motion** — reveals, masked text, magnetic buttons, cursor-following work preview
- **Lenis** — smooth inertia scrolling
- **next/font** — Inter + Instrument Serif, self-hosted

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx       # fonts, metadata, html shell
  page.tsx         # composes all sections
  globals.css      # all styling + design tokens
components/
  SmoothScroll.tsx # Lenis wrapper
  Cursor.tsx       # custom cursor (dot + spring-follower ring)
  Magnetic.tsx     # reusable magnetic hover wrapper
  Reveal.tsx       # scroll-reveal helper (whileInView)
  Preloader.tsx    # 0→100% counter + name reveal + slide-up
  Nav.tsx          # hide-on-scroll nav
  Hero.tsx         # masked line-by-line title reveal
  Marquee.tsx      # infinite scrolling tag strip
  Work.tsx         # work list + cursor-following image preview
  Experience.tsx   # timeline
  About.tsx        # portrait + bio + services/tools
  Contact.tsx      # big magnetic email + socials
lib/
  data.ts          # ALL content lives here — edit this to update the site
```

## Customising

Everything is centralised in **`lib/data.ts`** — name, role, projects, experience, socials, etc.

Still using placeholders:
- **`RESUME_DRIVE_LINK`** in `lib/data.ts` → your Google Drive resume link
- **Project images** → drop screenshots in `/public` and point `img` paths at them (currently `picsum.photos`)
- **About portrait** → replace the `<img src>` in `components/About.tsx`

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config for Next.js.
