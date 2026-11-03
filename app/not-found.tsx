import Link from "next/link";

export const metadata = { title: "Not found — Ajay Srivastava" };

export default function NotFound() {
  return (
    <section className="notfound">
      <p className="notfound__code">404</p>
      <h1 className="notfound__title">This page wandered off</h1>
      <p className="notfound__text">The link may be old, or the page moved.</p>
      <Link href="/" className="notfound__home">Back to my work</Link>
    </section>
  );
}
