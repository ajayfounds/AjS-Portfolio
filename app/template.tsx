// Route changes render immediately — no blanket page-in animation.
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
