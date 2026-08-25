import { AlertTriangle, CheckCircle2, OctagonAlert, TriangleAlert } from "lucide-react";
import type { AlarmEvent, AlarmSeverity } from "@/types";
import { severityMeta } from "@/lib/status";

const icons: Record<AlarmSeverity, typeof AlertTriangle> = {
  critical: OctagonAlert,
  serious: TriangleAlert,
  warning: AlertTriangle,
  good: CheckCircle2,
};

export function AlarmsPanel({ alarms }: { alarms: AlarmEvent[] }) {
  return (
    <ul className="divide-y max-h-80 overflow-y-auto scroll-thin -mx-1" style={{ borderColor: "var(--border)" }}>
      {alarms.map((a) => {
        const meta = severityMeta[a.severity];
        const Icon = icons[a.severity];
        return (
          <li key={a.id} className="flex items-start gap-3 px-1 py-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: meta.bg, color: meta.color }}
            >
              <Icon size={14} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                  {a.tag} · {a.unit}
                </span>
                <span className="text-[11px] tabular shrink-0" style={{ color: "var(--text-muted)" }}>
                  {a.time}
                </span>
              </div>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {a.message}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                {a.messageFa}
              </p>
            </div>
            <span
              className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: meta.color, background: meta.bg }}
            >
              {meta.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
