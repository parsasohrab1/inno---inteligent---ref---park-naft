import { ChevronsLeft, ChevronsRight, X } from "lucide-react";
import { useState } from "react";
import { NavList, SettingsNavButton } from "./NavList";

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
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
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: { mobileOpen: boolean; onCloseMobile: () => void }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <aside
        className="hidden md:flex flex-col shrink-0 border-r transition-[width] duration-200"
        style={{
          width: collapsed ? 72 : 232,
          background: "var(--surface-1)",
          borderColor: "var(--border)",
        }}
      >
        <Brand collapsed={collapsed} />
        <NavList collapsed={collapsed} />
        <div className="px-2 py-3 border-t space-y-1" style={{ borderColor: "var(--border)" }}>
          <SettingsNavButton collapsed={collapsed} />
          <button
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="w-full flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {collapsed ? (
              <ChevronsRight size={18} strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <>
                <ChevronsLeft size={18} strokeWidth={1.75} aria-hidden="true" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <button
            aria-label="Close navigation"
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={onCloseMobile}
          />
          <aside
            className="relative flex flex-col w-64 h-full border-r"
            style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between">
              <Brand collapsed={false} />
              <button
                aria-label="Close navigation"
                onClick={onCloseMobile}
                className="mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)]"
                style={{ color: "var(--text-secondary)" }}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <NavList collapsed={false} onNavigate={onCloseMobile} />
            <div className="px-2 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <SettingsNavButton collapsed={false} onNavigate={onCloseMobile} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
