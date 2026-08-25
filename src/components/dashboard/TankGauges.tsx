import type { TankReading } from "@/types";

function levelColor(pct: number) {
  if (pct >= 90) return "var(--status-warning)";
  if (pct <= 20) return "var(--status-serious)";
  return "var(--brand)";
}

export function TankGauges({ tanks }: { tanks: TankReading[] }) {
  return (
    <div className="space-y-4">
      {tanks.map((t) => {
        const color = levelColor(t.levelPct);
        return (
          <div key={t.id}>
            <div className="flex items-baseline justify-between mb-1.5">
              <div>
                <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                  {t.name}
                </span>
                <span className="text-xs ml-2" style={{ color: "var(--text-muted)" }}>
                  {t.product}
                </span>
              </div>
              <span className="text-xs font-medium tabular" style={{ color }}>
                {t.levelPct}%
              </span>
            </div>
            <div
              className="h-2.5 w-full rounded-full overflow-hidden"
              style={{ background: `color-mix(in srgb, ${color} 18%, var(--surface-3))` }}
            >
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{ width: `${t.levelPct}%`, background: color }}
              />
            </div>
            <div className="text-[11px] mt-1 tabular" style={{ color: "var(--text-muted)" }}>
              {Math.round((t.levelPct / 100) * t.capacityM3).toLocaleString()} / {t.capacityM3.toLocaleString()} m³
            </div>
          </div>
        );
      })}
    </div>
  );
}
