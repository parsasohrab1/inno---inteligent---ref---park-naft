import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { useProcessUnits } from "@/hooks/useProcessUnits";
import type { ProcessUnit } from "@/types";

function healthBand(rulPct: number): { label: string; labelFa: string; color: string } {
  if (rulPct < 10) return { label: "Critical — replace now", labelFa: "Critical — immediate replacement", color: "var(--status-critical)" };
  if (rulPct < 20) return { label: "Plan replacement", labelFa: "Plan replacement", color: "var(--status-serious)" };
  if (rulPct < 50) return { label: "Monitor closely", labelFa: "Close monitoring", color: "var(--status-warning)" };
  return { label: "Healthy", labelFa: "Healthy", color: "var(--status-good)" };
}

function RulRow({ unit }: { unit: ProcessUnit }) {
  const band = healthBand(unit.rulPct);
  return (
    <div className="py-3">
      <div className="flex items-baseline justify-between mb-1.5 gap-2">
        <div className="min-w-0">
          <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            {unit.name}
          </span>
          <span className="text-xs ml-2 tabular" style={{ color: "var(--text-muted)" }}>
            {unit.tag}
          </span>
        </div>
        <span className="text-xs font-medium tabular shrink-0" style={{ color: band.color }}>
          {unit.rulPct}% · {unit.rulDays}d
        </span>
      </div>
      <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: "var(--surface-3)" }}>
        <div
          className="h-full rounded-full transition-[width] duration-500"
          style={{ width: `${unit.rulPct}%`, background: band.color }}
        />
      </div>
      <div className="text-[11px] mt-1" style={{ color: band.color }}>
        {band.label} · {band.labelFa}
      </div>
    </div>
  );
}

export function Maintenance() {
  const { units } = useProcessUnits();
  const sorted = [...units].sort((a, b) => a.rulPct - b.rulPct);
  const critical = units.filter((u) => u.rulPct < 10).length;
  const planReplacement = units.filter((u) => u.rulPct >= 10 && u.rulPct < 20).length;
  const monitor = units.filter((u) => u.rulPct >= 20 && u.rulPct < 50).length;

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-critical)" }}>
              {critical}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Critical — replace now
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-serious)" }}>
              {planReplacement}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Plan replacement soon
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-warning)" }}>
              {monitor}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Monitor closely
            </div>
          </Panel>
        </div>

        <Panel
          title="Remaining Useful Life (RUL) by Asset"
          subtitle="Remaining useful life of equipment — sorted from most critical to healthiest"
        >
          <div className="divide-y -mx-1 px-1" style={{ borderColor: "var(--border)" }}>
            {sorted.map((unit) => (
              <RulRow key={unit.id} unit={unit} />
            ))}
          </div>
        </Panel>

        <Panel title="How this works" subtitle="Calculation method">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Each asset's RUL degrades over time based on simulated wear (vibration, temperature,
            and duty-cycle trends in a real deployment). Crossing 20% raises a preventive
            maintenance alarm; crossing 10% raises an urgent replacement alarm; reaching 0%
            simulates an unplanned trip — which Auto Operator can respond to automatically for
            paired heavy-duty equipment. Values here are simulated for demonstration.
          </p>
        </Panel>
      </div>
    </Layout>
  );
}
