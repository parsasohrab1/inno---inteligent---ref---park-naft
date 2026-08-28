import { useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { AlarmsPanel } from "@/components/dashboard/AlarmsPanel";
import { useAlarms } from "@/hooks/useAlarms";
import type { AlarmSeverity } from "@/types";

const FILTERS: { key: AlarmSeverity | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "critical", label: "Critical" },
  { key: "serious", label: "Serious" },
  { key: "warning", label: "Warning" },
  { key: "good", label: "Resolved" },
];

export function Alarms() {
  const { alarms, acknowledge, unacknowledgedCount } = useAlarms();
  const [filter, setFilter] = useState<AlarmSeverity | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? alarms : alarms.filter((a) => a.severity === filter)),
    [alarms, filter]
  );

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {alarms.length}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Total events
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-critical)" }}>
              {unacknowledgedCount}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Unacknowledged
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-good)" }}>
              {alarms.length - unacknowledgedCount}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Acknowledged
            </div>
          </Panel>
        </div>

        <Panel
          title="Alarms & Events"
          subtitle="هشدارها و رویدادها"
          action={
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by severity">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  aria-pressed={filter === f.key}
                  className="rounded-full px-2.5 py-1 text-[11px] font-medium border transition-colors"
                  style={{
                    borderColor: filter === f.key ? "var(--brand)" : "var(--border)",
                    color: filter === f.key ? "var(--brand)" : "var(--text-muted)",
                    background: filter === f.key ? "color-mix(in srgb, var(--brand) 12%, transparent)" : "transparent",
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>
          }
        >
          <AlarmsPanel alarms={filtered} onAcknowledge={acknowledge} emptyMessage="No alarms match this filter." />
        </Panel>
      </div>
    </Layout>
  );
}
