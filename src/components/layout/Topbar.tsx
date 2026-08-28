import { Bell, Menu, Moon, Search, Sun, User, Wifi } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItemForPath, navItems } from "@/lib/nav";
import { useAlarms } from "@/hooks/useAlarms";
import { useTheme } from "@/hooks/useTheme";
import { processUnits, tanks } from "@/data/mockData";
import { severityMeta } from "@/lib/status";

interface SearchResult {
  id: string;
  label: string;
  hint: string;
  path: string;
}

function useSearchResults(query: string): SearchResult[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const results: SearchResult[] = [];
    for (const u of processUnits) {
      if (u.name.toLowerCase().includes(q) || u.tag.toLowerCase().includes(q)) {
        results.push({ id: `unit-${u.id}`, label: u.name, hint: `${u.tag} · Process Unit`, path: "/units" });
      }
    }
    for (const t of tanks) {
      if (t.name.toLowerCase().includes(q) || t.product.toLowerCase().includes(q)) {
        results.push({ id: `tank-${t.id}`, label: t.name, hint: `${t.product} · Tank`, path: "/tanks" });
      }
    }
    return results.slice(0, 6);
  }, [query]);
}

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [now, setNow] = useState(new Date());
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { alarms, unacknowledgedCount } = useAlarms();
  const { theme, toggleTheme } = useTheme();
  const results = useSearchResults(query);

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
        setNotifOpen(false);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = navItemForPath(location.pathname) ?? navItems[0];
  const unacknowledgedAlarms = alarms.filter((a) => !a.acknowledged).slice(0, 5);

  function goTo(path: string) {
    navigate(path);
    setSearchOpen(false);
    setNotifOpen(false);
    setQuery("");
  }

  return (
    <header
      ref={rootRef}
      className="flex items-center justify-between h-16 px-4 md:px-6 border-b shrink-0 gap-3"
      style={{ borderColor: "var(--border)", background: "var(--page)" }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="md:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          <Menu size={16} aria-hidden="true" />
        </button>
        <div className="min-w-0">
          <h1 className="text-base font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {current.label}
          </h1>
          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
            {current.subtitleFa}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden lg:block">
          <div
            className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-1.5 border text-xs"
            style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
          >
            <Search size={14} aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              placeholder="Search units, tanks…"
              aria-label="Search units and tanks"
              className="bg-transparent outline-none w-44 placeholder:opacity-80"
              style={{ color: "var(--text-secondary)" }}
            />
          </div>
          {searchOpen && query.trim() !== "" && (
            <div
              className="absolute right-0 mt-1.5 w-72 rounded-[var(--radius-md)] border shadow-lg overflow-hidden z-10"
              style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}
            >
              {results.length === 0 ? (
                <p className="px-3 py-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  No matches for "{query}"
                </p>
              ) : (
                <ul>
                  {results.map((r) => (
                    <li key={r.id}>
                      <button
                        onClick={() => goTo(r.path)}
                        className="w-full text-left px-3 py-2 text-xs hover:opacity-80"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <div>{r.label}</div>
                        <div style={{ color: "var(--text-muted)" }}>{r.hint}</div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
          style={{
            color: "var(--status-good)",
            background: "color-mix(in srgb, var(--status-good) 14%, transparent)",
          }}
        >
          <Wifi size={13} aria-hidden="true" />
          <span className="hidden sm:inline">Live</span>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border"
          style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
        >
          {theme === "dark" ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
        </button>

        <div className="relative">
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label={`Notifications, ${unacknowledgedCount} unread`}
            aria-expanded={notifOpen}
            className="relative flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border"
            style={{ borderColor: "var(--border)", color: "var(--text-secondary)" }}
          >
            <Bell size={16} aria-hidden="true" />
            {unacknowledgedCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                style={{ background: "var(--status-critical)" }}
              >
                {unacknowledgedCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div
              className="absolute right-0 mt-1.5 w-80 rounded-[var(--radius-md)] border shadow-lg overflow-hidden z-10"
              style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}
            >
              <div className="px-3 py-2 border-b text-xs font-medium" style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}>
                Unacknowledged alarms
              </div>
              {unacknowledgedAlarms.length === 0 ? (
                <p className="px-3 py-4 text-xs" style={{ color: "var(--text-muted)" }}>
                  All alarms acknowledged.
                </p>
              ) : (
                <ul className="max-h-72 overflow-y-auto scroll-thin">
                  {unacknowledgedAlarms.map((a) => {
                    const meta = severityMeta[a.severity];
                    return (
                      <li key={a.id} className="px-3 py-2 border-b last:border-b-0" style={{ borderColor: "var(--border)" }}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                            {a.tag} · {a.unit}
                          </span>
                          <span className="text-[10px] font-medium rounded-full px-1.5 py-0.5" style={{ color: meta.color, background: meta.bg }}>
                            {meta.label}
                          </span>
                        </div>
                        <p className="text-[11px] mt-0.5" style={{ color: "var(--text-secondary)" }}>
                          {a.message}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              )}
              <button
                onClick={() => goTo("/alarms")}
                className="w-full text-center px-3 py-2 text-xs font-medium border-t"
                style={{ borderColor: "var(--border)", color: "var(--brand)" }}
              >
                View all alarms
              </button>
            </div>
          )}
        </div>

        <div className="hidden sm:block text-right leading-tight">
          <div className="text-xs tabular font-medium" style={{ color: "var(--text-primary)" }}>
            {now.toLocaleTimeString("en-GB")}
          </div>
          <div className="text-[11px]" style={{ color: "var(--text-muted)" }}>
            {now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-label="User menu"
            aria-expanded={userMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold"
            style={{ background: "var(--surface-3)", color: "var(--text-primary)" }}
          >
            PN
          </button>
          {userMenuOpen && (
            <div
              className="absolute right-0 mt-1.5 w-56 rounded-[var(--radius-md)] border shadow-lg overflow-hidden z-10"
              style={{ background: "var(--surface-2)", borderColor: "var(--border-strong)" }}
            >
              <div className="flex items-center gap-2.5 px-3 py-3 border-b" style={{ borderColor: "var(--border)" }}>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ background: "var(--surface-3)", color: "var(--text-primary)" }}
                >
                  <User size={14} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: "var(--text-primary)" }}>
                    Control Room Operator
                  </div>
                  <div className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
                    Park Naft Refinery — Demo session
                  </div>
                </div>
              </div>
              <Link
                to="/settings"
                onClick={() => setUserMenuOpen(false)}
                className="block px-3 py-2 text-xs hover:opacity-80"
                style={{ color: "var(--text-secondary)" }}
              >
                Settings
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
