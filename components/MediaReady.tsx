"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { CASE_HEROES, warm } from "@/lib/media";

type Media = HTMLImageElement | HTMLVideoElement;

const isMedia = (t: EventTarget | null): t is Media =>
  t instanceof HTMLImageElement || t instanceof HTMLVideoElement;

const settled = (el: Media) =>
  el instanceof HTMLImageElement ? el.complete : el.readyState >= 2;

const markReady = (el: Media) => el.setAttribute("data-ready", "");

const afterLoad = (fn: () => void) => {
  const idle = () => ("requestIdleCallback" in window ? requestIdleCallback(fn, { timeout: 1500 }) : setTimeout(fn, 200));
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
};

// Fetch the page's lazy images in the background, nearest to the viewport first,
// a few at a time so the visible ones never compete with far-off ones.
function prefetchLazy() {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return;
  const y = window.scrollY + window.innerHeight / 2;
  const queue = Array.from(document.querySelectorAll<HTMLImageElement>('img[loading="lazy"]'))
    .filter((img) => !img.complete)
    .map((img) => ({ img, d: Math.abs(img.getBoundingClientRect().top + window.scrollY - y) }))
    .sort((a, b) => a.d - b.d)
    .map((x) => x.img);

  let active = 0;
  const next = () => {
    while (active < 3 && queue.length) {
      const img = queue.shift()!;
      if (img.complete) continue;
      active++;
      const done = () => { active--; next(); };
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      img.loading = "eager";
    }
  };
  next();
}

export default function MediaReady() {
  const pathname = usePathname();

  useEffect(() => {
    const onDone = (e: Event) => { if (isMedia(e.target)) markReady(e.target); };
    document.addEventListener("load", onDone, true);
    document.addEventListener("loadeddata", onDone, true);
    document.addEventListener("error", onDone, true);
    return () => {
      document.removeEventListener("load", onDone, true);
      document.removeEventListener("loadeddata", onDone, true);
      document.removeEventListener("error", onDone, true);
    };
  }, []);

  useEffect(() => {
    document.querySelectorAll<Media>("img, video").forEach((el) => { if (settled(el)) markReady(el); });
    let cancelled = false;
    afterLoad(() => {
      if (cancelled) return;
      prefetchLazy();
      if (pathname === "/") Object.values(CASE_HEROES).forEach((src) => warm(src));
    });
    return () => { cancelled = true; };
  }, [pathname]);

  return null;
}
