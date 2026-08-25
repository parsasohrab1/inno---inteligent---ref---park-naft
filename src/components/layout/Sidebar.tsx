import {
  LayoutDashboard,
  Gauge,
  Factory,
  Siren,
  Fuel,
  ShieldCheck,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", labelFa: "نمای کلی", active: true },
  { icon: Factory, label: "Process Units", labelFa: "واحدهای فرآیندی" },
  { icon: Gauge, label: "Trends", labelFa: "روندها" },
  { icon: Fuel, label: "Tanks & Storage", labelFa: "مخازن" },
  { icon: Siren, label: "Alarms", labelFa: "هشدارها" },
  { icon: ShieldCheck, label: "HSE", labelFa: "ایمنی و محیط‌زیست" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="hidden md:flex flex-col shrink-0 border-r transition-[width] duration-200"
      style={{
        width: collapsed ? 72 : 232,
        background: "var(--surface-1)",
        borderColor: "var(--border)",
      }}
    >
      <div className="flex items-center gap-2.5 h-16 px-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] font-bold text-sm"
          style={{ background: "var(--brand)", color: "#fff" }}
        >
          IN
        </div>
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <div className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>
              Inno
            </div>
            <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
              Park Naft Refinery
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors"
            style={{
              background: item.active ? "var(--surface-3)" : "transparent",
              color: item.active ? "var(--text-primary)" : "var(--text-secondary)",
            }}
          >
            <item.icon size={18} strokeWidth={1.75} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="px-2 py-3 border-t space-y-1" style={{ borderColor: "var(--border)" }}>
        <button
          className="w-full flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm"
          style={{ color: "var(--text-secondary)" }}
        >
          <Settings size={18} strokeWidth={1.75} className="shrink-0" />
          {!collapsed && <span>Settings</span>}
        </button>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="w-full flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          {collapsed ? (
            <ChevronsRight size={18} strokeWidth={1.75} />
          ) : (
            <>
              <ChevronsLeft size={18} strokeWidth={1.75} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
