import { useMemo, useState } from "react";
import { CheckCircle2, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { optimizationRecommendations } from "@/data/mockData";
import type { OptimizationRecommendation } from "@/types";

function formatUsd(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function Optimization() {
  const [recs, setRecs] = useState<OptimizationRecommendation[]>(optimizationRecommendations);

  const apply = (id: string) => {
    setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, applied: true } : r)));
  };

  const totalAnnualSavings = useMemo(
    () => recs.filter((r) => r.applied).reduce((sum, r) => sum + r.estAnnualSavingsUsd, 0),
    [recs]
  );
  const potentialAnnualSavings = useMemo(
    () => recs.reduce((sum, r) => sum + r.estAnnualSavingsUsd, 0),
    [recs]
  );

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-good)" }}>
              {formatUsd(totalAnnualSavings)}/yr
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Savings from applied recommendations
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {formatUsd(potentialAnnualSavings)}/yr
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Total potential if all applied
            </div>
          </Panel>
        </div>

        <Panel
          title="Real-Time Optimization (RTO / APC)"
          subtitle="بهینه‌سازی بلادرنگ فرآیند — پیشنهادهای تنظیم نقطه‌کار"
        >
          <div className="space-y-3">
            {recs.map((rec) => (
              <div
                key={rec.id}
                className="rounded-[var(--radius-md)] border p-4"
                style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={14} style={{ color: "var(--brand)" }} aria-hidden="true" />
                      <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {rec.parameter}
                      </span>
                      <span className="text-[11px] tabular" style={{ color: "var(--text-muted)" }}>
                        {rec.tag}
                      </span>
                    </div>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                      {rec.parameterFa}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs tabular">
                      <span style={{ color: "var(--text-muted)" }}>
                        Current: <span style={{ color: "var(--text-secondary)" }}>{rec.currentValue} {rec.valueUnit}</span>
                      </span>
                      <span style={{ color: "var(--text-muted)" }}>→</span>
                      <span style={{ color: "var(--status-good)" }}>
                        Recommended: {rec.recommendedValue} {rec.valueUnit}
                      </span>
                    </div>
                    <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                      {rec.impact} · est. {formatUsd(rec.estAnnualSavingsUsd)}/yr
                    </p>
                  </div>

                  {rec.applied ? (
                    <span
                      className="shrink-0 flex items-center gap-1.5 text-[11px] font-medium rounded-full px-2.5 py-1"
                      style={{ color: "var(--status-good)", background: "color-mix(in srgb, var(--status-good) 16%, transparent)" }}
                    >
                      <CheckCircle2 size={13} aria-hidden="true" />
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => apply(rec.id)}
                      className="shrink-0 text-[11px] font-medium rounded-full px-3 py-1.5"
                      style={{ background: "var(--brand)", color: "#fff" }}
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="About this module" subtitle="درباره این ماژول">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            This demonstrates the shape of a real-time optimization (RTO) / advanced process
            control (APC) layer: continuously comparing current setpoints against a
            model-recommended optimum and quantifying the impact of closing the gap. A production
            version would connect to an actual process model / APC engine rather than static
            recommendations.
          </p>
        </Panel>
      </div>
    </Layout>
  );
}
