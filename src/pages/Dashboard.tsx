import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { EquipmentStatusGrid } from "@/components/dashboard/EquipmentStatusGrid";
import { AlarmsPanel } from "@/components/dashboard/AlarmsPanel";
import { TankGauges } from "@/components/dashboard/TankGauges";
import { ProcessFlowDiagram } from "@/components/dashboard/ProcessFlowDiagram";
import { HseStrip } from "@/components/dashboard/HseStrip";
import { ValueCounter } from "@/components/dashboard/ValueCounter";
import { useLiveTrend } from "@/hooks/useLiveTrend";
import { useAlarms } from "@/hooks/useAlarms";
import { useProcessUnits } from "@/hooks/useProcessUnits";
import { kpis, safety, tanks } from "@/data/mockData";

export function Dashboard() {
  const trend = useLiveTrend();
  const { alarms, acknowledge } = useAlarms();
  const { units } = useProcessUnits();

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <ValueCounter />

        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <KpiCard key={k.id} kpi={k} />
          ))}
        </div>

        {/* Process flow */}
        <Panel title="Process Flow" subtitle="نمای فرآیندی واحدها — CDU → VDU → CRU / HCU → SRU → Product Pool">
          <ProcessFlowDiagram units={units} />
        </Panel>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <Panel title="Process Trends — Feed Header" subtitle="۲۴ ساعت گذشته · به‌روزرسانی زنده" className="xl:col-span-2">
            <TrendChart data={trend} />
          </Panel>

          <Panel title="Alarms & Events" subtitle="هشدارها و رویدادها">
            <AlarmsPanel alarms={alarms} onAcknowledge={acknowledge} />
          </Panel>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          <Panel title="Process Units" subtitle="وضعیت واحدهای فرآیندی" className="xl:col-span-2">
            <EquipmentStatusGrid units={units} />
          </Panel>

          <Panel title="Tanks & Storage" subtitle="سطح مخازن">
            <TankGauges tanks={tanks} />
          </Panel>
        </div>

        <Panel title="HSE & Sustainability" subtitle="ایمنی، بهداشت و محیط‌زیست">
          <HseStrip {...safety} />
        </Panel>
      </div>
    </Layout>
  );
}
