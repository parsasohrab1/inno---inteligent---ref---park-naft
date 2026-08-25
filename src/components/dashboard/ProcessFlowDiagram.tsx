import type { ProcessUnit, UnitStatus } from "@/types";
import { statusMeta } from "@/lib/status";

interface FlowNode {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  unitId?: string;
}

const nodes: FlowNode[] = [
  { id: "tanks", x: 16, y: 96, w: 88, h: 48, label: "Crude Tanks" },
  { id: "cdu", x: 148, y: 96, w: 96, h: 48, label: "CDU-100", unitId: "u1" },
  { id: "vdu", x: 288, y: 96, w: 96, h: 48, label: "VDU-200", unitId: "u2" },
  { id: "cru", x: 428, y: 32, w: 96, h: 48, label: "CRU-300", unitId: "u3" },
  { id: "hcu", x: 428, y: 160, w: 96, h: 48, label: "HCU-400", unitId: "u4" },
  { id: "sru", x: 568, y: 96, w: 96, h: 48, label: "SRU-500", unitId: "u5" },
  { id: "products", x: 708, y: 96, w: 92, h: 48, label: "Product Pool" },
];

const edges: [string, string][] = [
  ["tanks", "cdu"],
  ["cdu", "vdu"],
  ["vdu", "cru"],
  ["vdu", "hcu"],
  ["cru", "sru"],
  ["hcu", "sru"],
  ["sru", "products"],
];

function center(n: FlowNode) {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

function edgePath(a: FlowNode, b: FlowNode) {
  const p1 = { x: a.x + a.w, y: center(a).y };
  const p2 = { x: b.x, y: center(b).y };
  const midX = (p1.x + p2.x) / 2;
  return `M${p1.x},${p1.y} C${midX},${p1.y} ${midX},${p2.y} ${p2.x},${p2.y}`;
}

export function ProcessFlowDiagram({ units }: { units: ProcessUnit[] }) {
  const unitById = new Map(units.map((u) => [u.id, u]));
  const nodeById = new Map(nodes.map((n) => [n.id, n]));

  function statusFor(n: FlowNode): UnitStatus {
    if (!n.unitId) return "running";
    return unitById.get(n.unitId)?.status ?? "running";
  }

  return (
    <div className="w-full overflow-x-auto scroll-thin">
      <svg viewBox="0 0 824 240" className="min-w-[720px] w-full h-auto" role="img" aria-label="Process flow diagram">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill="var(--baseline)" />
          </marker>
        </defs>

        {edges.map(([fromId, toId]) => {
          const from = nodeById.get(fromId)!;
          const to = nodeById.get(toId)!;
          return (
            <path
              key={`${fromId}-${toId}`}
              d={edgePath(from, to)}
              fill="none"
              stroke="var(--baseline)"
              strokeWidth={1.5}
              markerEnd="url(#arrow)"
            />
          );
        })}

        {nodes.map((n) => {
          const status = statusFor(n);
          const meta = statusMeta[status];
          return (
            <g key={n.id}>
              <rect
                x={n.x}
                y={n.y}
                width={n.w}
                height={n.h}
                rx={10}
                fill="var(--surface-2)"
                stroke={meta.color}
                strokeWidth={1.5}
              />
              <circle cx={n.x + 14} cy={n.y + 14} r={4} fill={meta.color} />
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + 5}
                textAnchor="middle"
                fontSize="12"
                fontWeight={600}
                fill="var(--text-primary)"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
