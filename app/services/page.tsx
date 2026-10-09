import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Ajay Srivastava",
  description: "Design services offered by Ajay Srivastava."
};

// Placeholder — content to be filled in later.
export default function ServicesPage() {
  return (
    <div className="services-page" style={{ padding: "clamp(1.5rem, 4vw, 3rem) var(--pad)" }}>
      <h1 style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)", fontWeight: 600, letterSpacing: "-0.02em", margin: 0 }}>
        Services
      </h1>
      <p style={{ marginTop: "1rem", color: "var(--ink-2, #6b6b6b)", maxWidth: "60ch" }}>
        Coming soon.
      </p>
    </div>
  );
}
