import { Bot, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusDot";
import { useAutoOperator } from "@/hooks/useAutoOperator";
import { useProcessUnits } from "@/hooks/useProcessUnits";
import { heavyDutyPairs } from "@/data/mockData";

export function AutoOperator() {
  const { enabled, toggle, switchToStandby, markRepaired } = useAutoOperator();
  const { units, simulateFailure } = useProcessUnits();
  const unitById = new Map(units.map((u) => [u.id, u]));

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <Panel>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{
                  background: enabled ? "color-mix(in srgb, var(--status-good) 16%, transparent)" : "var(--surface-3)",
                  color: enabled ? "var(--status-good)" : "var(--text-muted)",
                }}
              >
                <Bot size={20} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  Auto Operator
                </h2>
                <p className="text-xs mt-0.5 max-w-md" style={{ color: "var(--text-muted)" }}>
                  When enabled, if a duty (primary) heavy-duty machine trips, its standby spare
                  is brought online automatically — no operator action needed. When disabled,
                  a failure raises a critical alarm and waits for manual switchover.
                </p>
                <p className="text-[11px] mt-1" style={{ color: "var(--text-muted)" }}>
                  در صورت فعال بودن، با خرابی تجهیز اصلی، تجهیز زاپاس به‌طور خودکار وارد مدار می‌شود.
                </p>
              </div>
            </div>
            <button
              onClick={toggle}
              aria-pressed={enabled}
              className="shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold self-start sm:self-center"
              style={{
                background: enabled ? "var(--status-good)" : "var(--surface-3)",
                color: enabled ? "#fff" : "var(--text-secondary)",
              }}
            >
              <Zap size={15} aria-hidden="true" />
              {enabled ? "Auto Operator: ON" : "Auto Operator: OFF"}
            </button>
          </div>
        </Panel>

        <Panel title="Heavy-Duty Equipment — Duty / Standby Pairs" subtitle="تجهیزات سنگین دوار — واحد اصلی و زاپاس">
          <div className="space-y-3">
            {heavyDutyPairs.map((pair) => {
              const duty = unitById.get(pair.dutyUnitId);
              const standby = unitById.get(pair.standbyUnitId);
              if (!duty || !standby) return null;
              const dutyFaulted = duty.status === "fault";
              const standbyActive = standby.status === "running";

              return (
                <div
                  key={pair.id}
                  className="rounded-[var(--radius-md)] border p-4"
                  style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div>
                      <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                        {pair.label}
                      </div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
                        {pair.labelFa}
                      </div>
                    </div>
                    {dutyFaulted && standbyActive && (
                      <span
                        className="text-[10px] font-medium rounded-full px-2 py-0.5"
                        style={{ color: "var(--status-good)", background: "color-mix(in srgb, var(--status-good) 16%, transparent)" }}
                      >
                        Standby is now active
                      </span>
                    )}
                    {dutyFaulted && !standbyActive && (
                      <span
                        className="text-[10px] font-medium rounded-full px-2 py-0.5"
                        style={{ color: "var(--status-critical)", background: "color-mix(in srgb, var(--status-critical) 16%, transparent)" }}
                      >
                        Needs manual switchover
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center justify-between gap-2 rounded-[var(--radius-sm)] border px-3 py-2" style={{ borderColor: "var(--border)" }}>
                      <div className="min-w-0">
                        <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                          {duty.name} <span style={{ color: "var(--text-muted)" }}>(duty)</span>
                        </div>
                        <div className="text-[11px] tabular" style={{ color: "var(--text-muted)" }}>
                          {duty.tag} · RUL {duty.rulPct}%
                        </div>
                      </div>
                      <StatusBadge status={duty.status} />
                    </div>
                    <div className="flex items-center justify-between gap-2 rounded-[var(--radius-sm)] border px-3 py-2" style={{ borderColor: "var(--border)" }}>
                      <div className="min-w-0">
                        <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                          {standby.name} <span style={{ color: "var(--text-muted)" }}>(standby)</span>
                        </div>
                        <div className="text-[11px] tabular" style={{ color: "var(--text-muted)" }}>
                          {standby.tag} · RUL {standby.rulPct}%
                        </div>
                      </div>
                      <StatusBadge status={standby.status} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {!dutyFaulted && (
                      <button
                        onClick={() => simulateFailure(duty.id)}
                        className="text-[11px] font-medium rounded-full px-3 py-1 border"
                        style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                      >
                        Simulate failure (demo)
                      </button>
                    )}
                    {dutyFaulted && !standbyActive && (
                      <button
                        onClick={() => switchToStandby(pair.id)}
                        className="text-[11px] font-medium rounded-full px-3 py-1"
                        style={{ background: "var(--brand)", color: "#fff" }}
                      >
                        Switch to standby
                      </button>
                    )}
                    {dutyFaulted && (
                      <button
                        onClick={() => markRepaired(pair.id)}
                        className="text-[11px] font-medium rounded-full px-3 py-1 border"
                        style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                      >
                        Mark duty unit repaired
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>
    </Layout>
  );
}
