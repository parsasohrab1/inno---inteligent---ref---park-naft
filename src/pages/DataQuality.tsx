import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { reconciledTags } from "@/data/mockData";
import { loadPersisted, savePersisted } from "@/lib/persist";
import type { ReconciledTag } from "@/types";

const STORAGE_KEY = "data-quality-state-v1";

export function DataQuality() {
  const [tags, setTags] = useState<ReconciledTag[]>(() => loadPersisted(STORAGE_KEY, reconciledTags));

  useEffect(() => {
    savePersisted(STORAGE_KEY, tags);
  }, [tags]);

  const flaggedCount = tags.filter((t) => t.status === "flagged").length;
  const avgClosure = tags.reduce((sum, t) => sum + t.closurePct, 0) / tags.length;

  const reconcile = (id: string) => {
    setTags((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "ok", reconciledValue: t.rawValue, closurePct: Math.min(99.9, t.closurePct + 3.5) }
          : t
      )
    );
  };

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {tags.length}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Tags monitored
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: flaggedCount > 0 ? "var(--status-serious)" : "var(--status-good)" }}>
              {flaggedCount}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Flagged for reconciliation
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {avgClosure.toFixed(1)}%
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Average balance closure
            </div>
          </Panel>
        </div>

        <Panel title="Data Validation & Reconciliation" subtitle="اعتبارسنجی و تطبیق داده‌ها (Data Reconciliation)">
          <div className="overflow-x-auto scroll-thin -mx-1">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: "var(--text-muted)" }}>
                  <th className="text-left font-medium px-2 py-2">Tag</th>
                  <th className="text-left font-medium px-2 py-2">Description</th>
                  <th className="text-right font-medium px-2 py-2">Raw</th>
                  <th className="text-right font-medium px-2 py-2">Reconciled</th>
                  <th className="text-right font-medium px-2 py-2">Closure</th>
                  <th className="text-right font-medium px-2 py-2">Status</th>
                  <th className="px-2 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                {tags.map((t) => (
                  <tr key={t.id}>
                    <td className="px-2 py-2 font-medium tabular" style={{ color: "var(--text-primary)" }}>
                      {t.tag}
                    </td>
                    <td className="px-2 py-2" style={{ color: "var(--text-secondary)" }}>
                      <div>{t.label}</div>
                      <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>{t.labelFa}</div>
                    </td>
                    <td className="px-2 py-2 text-right tabular" style={{ color: "var(--text-secondary)" }}>
                      {t.rawValue.toLocaleString()} {t.unit}
                    </td>
                    <td className="px-2 py-2 text-right tabular" style={{ color: "var(--text-secondary)" }}>
                      {t.reconciledValue.toLocaleString()} {t.unit}
                    </td>
                    <td className="px-2 py-2 text-right tabular" style={{ color: t.closurePct < 98 ? "var(--status-serious)" : "var(--status-good)" }}>
                      {t.closurePct.toFixed(1)}%
                    </td>
                    <td className="px-2 py-2 text-right">
                      {t.status === "ok" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--status-good)" }}>
                          <CheckCircle2 size={13} aria-hidden="true" /> OK
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--status-serious)" }}>
                          <AlertTriangle size={13} aria-hidden="true" /> Flagged
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2 text-right">
                      {t.status === "flagged" && (
                        <button
                          onClick={() => reconcile(t.id)}
                          className="text-[11px] font-medium rounded-full px-2.5 py-1 border"
                          style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                        >
                          Reconcile
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="About this module" subtitle="درباره این ماژول">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Data validation & reconciliation checks raw instrument readings against a mass/energy
            balance model and flags tags whose closure falls below an acceptable threshold (here,
            98%) — typically caused by sensor drift, calibration error, or an undetected leak.
            "Reconcile" simulates applying a corrected value after root-cause review.
          </p>
        </Panel>
      </div>
    </Layout>
  );
}
