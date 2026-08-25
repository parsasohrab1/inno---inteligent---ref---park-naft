import type { ProcessUnit } from "@/types";
import { StatusBadge } from "@/components/ui/StatusDot";

export function EquipmentStatusGrid({ units }: { units: ProcessUnit[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {units.map((u) => (
        <div
          key={u.id}
          className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3.5 py-3"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
          <div className="min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>
              {u.name}
            </div>
            <div className="text-[11px] tabular" style={{ color: "var(--text-muted)" }}>
              {u.tag} · load {u.load}%
            </div>
          </div>
          <StatusBadge status={u.status} />
        </div>
      ))}
    </div>
  );
}
