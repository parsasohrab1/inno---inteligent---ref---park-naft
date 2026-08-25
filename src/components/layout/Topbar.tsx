import { Bell, Search, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export function Topbar() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header
      className="flex items-center justify-between h-16 px-4 md:px-6 border-b shrink-0"
      style={{ borderColor: "var(--border)", background: "var(--page)" }}
    >
      <div>
        <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
          Refinery Overview
        </h1>
        <p className="text-xs" style={{ color: "var(--text-muted)" }}>
          نمای کلی پالایشگاه — Park Naft Site
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="hidden lg:flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 border text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <Search size={14} />
          <span>Search tags, units, alarms…</span>
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            color: "var(--status-good)",
            background: "color-mix(in srgb, var(--status-good) 14%, transparent)",
          }}
        >
          <Wifi size={13} />
          Live
        </div>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          <Bell size={16} />
          <span
            className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white"
            style={{ background: "var(--status-critical)" }}
          >
            4
          </span>
        </button>

        <div className="hidden sm:block text-right leading-tight">
          <div className="text-xs tabular font-medium" style={{ color: "var(--text-primary)" }}>
            {now.toLocaleTimeString("en-GB")}
          </div>
          <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: "var(--surface-3)", color: "var(--text-primary)" }}
        >
          PN
        </div>
      </div>
    </header>
  );
}
