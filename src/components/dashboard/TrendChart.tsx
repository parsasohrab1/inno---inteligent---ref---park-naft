import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { TrendPoint } from "@/types";

interface SeriesSpec {
  key: keyof Omit<TrendPoint, "t">;
  name: string;
  unit: string;
  color: string;
}

const seriesList: SeriesSpec[] = [
  { key: "temperature", name: "Temperature", unit: "°C", color: "var(--series-1)" },
  { key: "pressure", name: "Pressure", unit: "barg", color: "var(--series-3)" },
  { key: "flow", name: "Flow", unit: "m³/h", color: "var(--series-2)" },
];

function CustomTooltip({
  active,
  payload,
  label,
  unit,
}: {
  active?: boolean;
  payload?: { value: number; color: string }[];
  label?: string;
  unit: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      className="rounded-[var(--radius-sm)] border px-2.5 py-1.5 text-xs shadow-lg"
      style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}
    >
      <div className="tabular" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="font-medium tabular" style={{ color: payload[0].color }}>
        {payload[0].value} {unit}
      </div>
    </div>
  );
}

function MiniTrend({ data, spec }: { data: TrendPoint[]; spec: SeriesSpec }) {
  const latest = data[data.length - 1]?.[spec.key] ?? 0;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: spec.color }} />
          {spec.name}
        </div>
        <div className="text-sm font-semibold tabular" style={{ color: "var(--text-primary)" }}>
          {latest}
          <span className="text-xs font-normal ml-1" style={{ color: "var(--text-muted)" }}>
            {spec.unit}
          </span>
        </div>
      </div>
      <div className="h-28">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="var(--grid)" vertical={false} strokeWidth={1} />
            <XAxis
              dataKey="t"
              tick={{ fill: "var(--text-muted)", fontSize: 10 }}
              axisLine={{ stroke: "var(--baseline)" }}
              tickLine={false}
              minTickGap={40}
            />
            <YAxis
              tick={{ fill: "var(--text-muted)", fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              width={40}
              domain={["auto", "auto"]}
              tickFormatter={(v: number) => v.toLocaleString()}
            />
            <Tooltip content={<CustomTooltip unit={spec.unit} />} cursor={{ stroke: "var(--baseline)", strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey={spec.key}
              stroke={spec.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, stroke: "var(--surface-1)", strokeWidth: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function TrendChart({ data }: { data: TrendPoint[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {seriesList.map((spec) => (
        <MiniTrend key={spec.key} data={data} spec={spec} />
      ))}
    </div>
  );
}
