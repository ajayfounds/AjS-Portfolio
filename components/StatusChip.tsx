import { site } from "@/lib/data";

export default function StatusChip() {
  return (
    <p className="status-chip">
      <span className="status-chip__k">Status</span>
      <span className="status-chip__v">
        <span className="status-chip__dot" aria-hidden />
        {site.status}
      </span>
    </p>
  );
}
