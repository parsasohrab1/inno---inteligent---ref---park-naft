import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";

// Estimated value created by running this dashboard (optimization + auto
// switchover + predictive maintenance + avoided unplanned downtime),
// expressed as a live $/second counter. The rate is an illustrative
// assumption for the demo, not a measured figure.
const RATE_PER_SECOND = 2.85;

function secondsSinceMidnight(): number {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((now.getTime() - midnight.getTime()) / 1000);
}

function formatUsd(value: number): string {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function ValueCounter() {
  const [value, setValue] = useState(() => secondsSinceMidnight() * RATE_PER_SECOND);

  useEffect(() => {
    const id = window.setInterval(() => {
      setValue((v) => v + RATE_PER_SECOND);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="rounded-[var(--radius-lg)] border p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      style={{
        background: "linear-gradient(135deg, color-mix(in srgb, var(--brand) 16%, var(--surface-1)), var(--surface-1))",
        borderColor: "var(--border)",
      }}
    >
      <div>
        <div className="flex items-center gap-2 text-xs font-medium" style={{ color: "var(--status-good)" }}>
          <TrendingUp size={15} aria-hidden="true" />
          Value generated today by Smart Refinery
        </div>
        <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
          صرفه‌جویی امروز ناشی از بهینه‌سازی، سوییچ خودکار و نگهداری پیشگیرانه
        </p>
      </div>
      <div className="text-right">
        <div
          className="text-3xl sm:text-4xl font-bold tabular tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          ${formatUsd(value)}
        </div>
        <div className="text-xs tabular mt-0.5" style={{ color: "var(--text-muted)" }}>
          +${RATE_PER_SECOND.toFixed(2)}/sec · live
        </div>
      </div>
    </div>
  );
}
