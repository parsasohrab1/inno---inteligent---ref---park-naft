import {
  LayoutDashboard,
  Gauge,
  Factory,
  Siren,
  Fuel,
  ShieldCheck,
  Settings,
  Bot,
  Wrench,
  SlidersHorizontal,
  DatabaseZap,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  path: string;
  icon: LucideIcon;
  label: string;
  labelFa: string;
  subtitleFa: string;
}

export const navItems: NavItem[] = [
  { path: "/", icon: LayoutDashboard, label: "Overview", labelFa: "Overview", subtitleFa: "Refinery overview — Park Naft Site" },
  { path: "/units", icon: Factory, label: "Process Units", labelFa: "Process units", subtitleFa: "Live status of process units" },
  { path: "/trends", icon: Gauge, label: "Trends", labelFa: "Trends", subtitleFa: "Temperature, pressure and flow trends" },
  { path: "/tanks", icon: Fuel, label: "Tanks & Storage", labelFa: "Tanks", subtitleFa: "Storage tank levels and capacity" },
  { path: "/alarms", icon: Siren, label: "Alarms", labelFa: "Alarms", subtitleFa: "Process alarms and events" },
  { path: "/hse", icon: ShieldCheck, label: "HSE", labelFa: "Safety and environment", subtitleFa: "Health, safety, environment and sustainability" },
  { path: "/auto-operator", icon: Bot, label: "Auto Operator", labelFa: "Smart operator", subtitleFa: "Automatic switch to standby equipment" },
  { path: "/maintenance", icon: Wrench, label: "Predictive Maintenance", labelFa: "Preventive maintenance", subtitleFa: "Remaining useful life of equipment (RUL)" },
  { path: "/optimization", icon: SlidersHorizontal, label: "Optimization", labelFa: "Optimization", subtitleFa: "Real-time process optimization (RTO/APC)" },
  { path: "/data-quality", icon: DatabaseZap, label: "Data Quality", labelFa: "Data quality", subtitleFa: "Data validation and reconciliation" },
];

export const settingsNavItem: NavItem = {
  path: "/settings",
  icon: Settings,
  label: "Settings",
  labelFa: "Settings",
  subtitleFa: "Appearance settings and product information",
};

export function navItemForPath(pathname: string): NavItem | undefined {
  return [...navItems, settingsNavItem].find((n) => n.path === pathname);
}
