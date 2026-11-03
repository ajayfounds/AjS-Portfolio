export const CASE_HEROES: Record<string, string> = {
  "/work/wanderly": "/case/wanderly/cover.gif",
  "/work/credcare": "/case/credcare/cover.gif",
  "/work/upi-failure-recovery": "/case/upi/cover.gif"
};

const warmed = new Set<string>();

// Pull a file into the HTTP cache so the next page paints it from disk.
export function warm(src: string | undefined, priority: "high" | "low" = "low") {
  if (!src || warmed.has(src) || typeof window === "undefined") return;
  warmed.add(src);
  const img = new Image();
  img.decoding = "async";
  (img as HTMLImageElement & { fetchPriority?: string }).fetchPriority = priority;
  img.src = src;
}
