import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { ProcessFlowDiagram } from "@/components/dashboard/ProcessFlowDiagram";
import { EquipmentStatusGrid } from "@/components/dashboard/EquipmentStatusGrid";
import { processUnits } from "@/data/mockData";

export function ProcessUnits() {
  const running = processUnits.filter((u) => u.status === "running").length;
  const attention = processUnits.filter((u) => u.status === "warning" || u.status === "fault").length;

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {processUnits.length}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Total process units
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-good)" }}>
              {running}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Running
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--status-critical)" }}>
              {attention}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Need attention
            </div>
          </Panel>
        </div>

        <Panel title="Process Flow" subtitle="نمای فرآیندی واحدها — CDU → VDU → CRU / HCU → SRU → Product Pool">
          <ProcessFlowDiagram units={processUnits} />
        </Panel>

        <Panel title="All Process Units" subtitle="وضعیت و بار عملیاتی هر واحد">
          <EquipmentStatusGrid units={processUnits} />
        </Panel>
      </div>
    </Layout>
  );
}
