import { Flame, ShieldCheck, Wind, Timer } from "lucide-react";

interface HseStripProps {
  daysSinceIncident: number;
  flaringM3: number;
  emissionsCo2Tpd: number;
  hseComplianceScore: number;
}

export function HseStrip({ daysSinceIncident, flaringM3, emissionsCo2Tpd, hseComplianceScore }: HseStripProps) {
  const items = [
    { icon: Timer, label: "Days Since Incident", labelFa: "روز بدون حادثه", value: daysSinceIncident, color: "var(--status-good)" },
    { icon: Flame, label: "Flaring", labelFa: "فلر", value: `${flaringM3.toLocaleString()} m³`, color: "var(--status-warning)" },
    { icon: Wind, label: "CO₂ Emissions", labelFa: "انتشار CO₂", value: `${emissionsCo2Tpd} t/d`, color: "var(--series-7)" },
    { icon: ShieldCheck, label: "HSE Compliance", labelFa: "انطباق ایمنی", value: `${hseComplianceScore}%`, color: "var(--brand)" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex items-center gap-3 rounded-[var(--radius-md)] border px-3.5 py-3"
          style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ background: `color-mix(in srgb, ${it.color} 16%, transparent)`, color: it.color }}
          >
            <it.icon size={16} />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold tabular truncate" style={{ color: "var(--text-primary)" }}>
              {it.value}
            </div>
            <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
              {it.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
