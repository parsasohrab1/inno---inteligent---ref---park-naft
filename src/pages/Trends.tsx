import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { TrendChart } from "@/components/dashboard/TrendChart";
import { useLiveTrend } from "@/hooks/useLiveTrend";

export function Trends() {
  const trend = useLiveTrend();

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <Panel title="Process Trends — Feed Header" subtitle="۲۴ ساعت گذشته · به‌روزرسانی زنده هر ۴ ثانیه">
          <TrendChart data={trend} />
        </Panel>
        <Panel title="About this view" subtitle="نکته فنی">
          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Temperature, pressure and flow are kept on independent scales deliberately — plotting
            values with different units on a shared axis is a common dashboard mistake that hides
            real deviations. In production this feed would subscribe to the plant historian
            (OPC-UA / MQTT / REST) instead of the simulated random-walk used here.
          </p>
        </Panel>
      </div>
    </Layout>
  );
}
