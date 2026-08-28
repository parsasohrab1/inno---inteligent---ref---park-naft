import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { navItems, settingsNavItem, type NavItem } from "@/lib/nav";

function NavButton({ item, collapsed, onNavigate }: { item: NavItem; collapsed: boolean; onNavigate?: () => void }) {
  return (
    <NavLink
      to={item.path}
      end={item.path === "/"}
      onClick={onNavigate}
      className={({ isActive }) =>
        clsx(
          "w-full flex items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors",
          isActive ? "font-medium" : "hover:opacity-80"
        )
      }
      style={({ isActive }) => ({
        background: isActive ? "var(--surface-3)" : "transparent",
        color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
      })}
    >
      <item.icon size={18} strokeWidth={1.75} className="shrink-0" aria-hidden="true" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </NavLink>
  );
}

export function NavList({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  return (
    <nav className="flex-1 px-2 py-3 space-y-1" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavButton key={item.path} item={item} collapsed={collapsed} onNavigate={onNavigate} />
      ))}
    </nav>
  );
}

export function SettingsNavButton({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  return <NavButton item={settingsNavItem} collapsed={collapsed} onNavigate={onNavigate} />;
}
