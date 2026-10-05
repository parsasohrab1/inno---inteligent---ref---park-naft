import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { TankGauges } from "@/components/dashboard/TankGauges";
import { StatusBadge } from "@/components/ui/StatusDot";
import { tanks } from "@/data/mockData";

export function TanksStorage() {
  const totalCapacity = tanks.reduce((sum, t) => sum + t.capacityM3, 0);
  const totalStored = tanks.reduce((sum, t) => sum + (t.levelPct / 100) * t.capacityM3, 0);

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {tanks.length}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Tanks monitored
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {Math.round(totalStored).toLocaleString()} m³
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Total volume stored
            </div>
          </Panel>
          <Panel>
            <div className="text-2xl font-semibold tabular" style={{ color: "var(--text-primary)" }}>
              {Math.round((totalStored / totalCapacity) * 100)}%
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Aggregate fill rate
            </div>
          </Panel>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <Panel title="Tank Levels" subtitle="Tank levels">
            <TankGauges tanks={tanks} />
          </Panel>

          <Panel title="Tank Details" subtitle="Tank specifications">
            <div className="overflow-x-auto scroll-thin -mx-1">
              <table className="w-full text-xs">
                <thead>
                  <tr style={{ color: "var(--text-muted)" }}>
                    <th className="text-left font-medium px-1 py-2">Tank</th>
                    <th className="text-left font-medium px-1 py-2">Product</th>
                    <th className="text-right font-medium px-1 py-2">Capacity</th>
                    <th className="text-right font-medium px-1 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: "var(--border)" }}>
                  {tanks.map((t) => (
                    <tr key={t.id}>
                      <td className="px-1 py-2 font-medium" style={{ color: "var(--text-primary)" }}>
                        {t.name}
                      </td>
                      <td className="px-1 py-2" style={{ color: "var(--text-secondary)" }}>
                        {t.product}
                      </td>
                      <td className="px-1 py-2 text-right tabular" style={{ color: "var(--text-secondary)" }}>
                        {t.capacityM3.toLocaleString()} m³
                      </td>
                      <td className="px-1 py-2 text-right">
                        <StatusBadge status={t.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
      </div>
    </Layout>
  );
}
