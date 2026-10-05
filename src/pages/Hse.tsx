import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { HseStrip } from "@/components/dashboard/HseStrip";
import { safety } from "@/data/mockData";

export function Hse() {
  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <Panel title="HSE & Sustainability" subtitle="Health, safety and environment">
          <HseStrip {...safety} />
        </Panel>

        <Panel title="Compliance Notes" subtitle="Compliance notes">
          <ul className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
            <li>
              Flaring and CO₂ figures are reported daily against the site environmental permit
              baseline; a sustained upward trend over 3 consecutive days should trigger a review.
            </li>
            <li>
              HSE compliance score aggregates permit-to-work closure rate, PPE audit results and
              near-miss reporting completeness for the current month.
            </li>
            <li>
              Days-since-incident resets only on a recordable HSE incident, not on near-misses.
            </li>
          </ul>
        </Panel>
      </div>
    </Layout>
  );
}
