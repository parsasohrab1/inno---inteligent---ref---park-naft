import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { KpiDatum } from "@/types";
import { formatCompact, formatDelta } from "@/lib/format";
import { Sparkline } from "./Sparkline";

export function KpiCard({ kpi }: { kpi: KpiDatum }) {
  const isUp = kpi.delta > 0;
  const isGood = isUp ? kpi.deltaGoodDirection === "up" : kpi.deltaGoodDirection === "down";
  const deltaColor = kpi.delta === 0 ? "var(--text-muted)" : isGood ? "var(--status-good)" : "var(--status-critical)";

  return (
    <div
      className="rounded-[var(--radius-lg)] border p-4 flex flex-col gap-3"
      style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            {kpi.label}
          </p>
          <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {kpi.labelFa}
          </p>
        </div>
        <Sparkline points={kpi.sparkline} color="var(--series-1)" />
      </div>

      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
          {formatCompact(kpi.value)}
          {kpi.unit && (
            <span className="text-sm font-normal ml-1" style={{ color: "var(--text-muted)" }}>
              {kpi.unit}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 text-xs font-medium tabular" style={{ color: deltaColor }}>
          {isUp ? <ArrowUpRight size={14} aria-hidden="true" /> : <ArrowDownRight size={14} aria-hidden="true" />}
          {formatDelta(kpi.delta)}
        </div>
      </div>
    </div>
  );
}
