import type { AlarmSeverity, UnitStatus } from "@/types";

export const statusMeta: Record<
  UnitStatus,
  { label: string; labelFa: string; color: string; dot: string }
> = {
  running: { label: "Running", labelFa: "در حال کار", color: "var(--status-good)", dot: "var(--status-good)" },
  standby: { label: "Standby", labelFa: "آماده‌باش", color: "var(--text-muted)", dot: "var(--text-muted)" },
  warning: { label: "Warning", labelFa: "هشدار", color: "var(--status-warning)", dot: "var(--status-warning)" },
  fault: { label: "Fault", labelFa: "خطا", color: "var(--status-critical)", dot: "var(--status-critical)" },
  offline: { label: "Offline", labelFa: "خاموش", color: "var(--text-muted)", dot: "var(--text-muted)" },
};

export const severityMeta: Record<
  AlarmSeverity,
  { label: string; color: string; bg: string }
> = {
  critical: { label: "Critical", color: "var(--status-critical)", bg: "color-mix(in srgb, var(--status-critical) 16%, transparent)" },
  serious: { label: "Serious", color: "var(--status-serious)", bg: "color-mix(in srgb, var(--status-serious) 16%, transparent)" },
  warning: { label: "Warning", color: "var(--status-warning)", bg: "color-mix(in srgb, var(--status-warning) 16%, transparent)" },
  good: { label: "Resolved", color: "var(--status-good)", bg: "color-mix(in srgb, var(--status-good) 16%, transparent)" },
};
