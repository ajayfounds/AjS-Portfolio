type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** kept for call-site compatibility; sections no longer animate in */
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span" | "section" | "article" | "header";
};

// Sections used to share one fade-up entrance. Content now renders in place:
// the work leads, and motion is reserved for moments that mean something.
export default function Reveal({ children, className, id, as = "div" }: Props) {
  const Tag = as;
  return (
    <Tag className={className} id={id}>
      {children}
    </Tag>
  );
}
