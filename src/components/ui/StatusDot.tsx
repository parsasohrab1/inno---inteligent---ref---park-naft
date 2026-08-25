import type { UnitStatus } from "@/types";
import { statusMeta } from "@/lib/status";

export function StatusDot({ status, pulse = false }: { status: UnitStatus; pulse?: boolean }) {
  const meta = statusMeta[status];
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {pulse && (
        <span
          className="absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping"
          style={{ background: meta.dot }}
        />
      )}
      <span
        className="relative inline-flex h-2.5 w-2.5 rounded-full"
        style={{ background: meta.dot }}
      />
    </span>
  );
}

export function StatusBadge({ status }: { status: UnitStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        color: meta.color,
        background: `color-mix(in srgb, ${meta.color} 14%, transparent)`,
      }}
    >
      <StatusDot status={status} pulse={status === "fault"} />
      {meta.label}
    </span>
  );
}
