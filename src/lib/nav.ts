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
  { path: "/", icon: LayoutDashboard, label: "Overview", labelFa: "نمای کلی", subtitleFa: "نمای کلی پالایشگاه — Park Naft Site" },
  { path: "/units", icon: Factory, label: "Process Units", labelFa: "واحدهای فرآیندی", subtitleFa: "وضعیت زنده واحدهای فرآیندی" },
  { path: "/trends", icon: Gauge, label: "Trends", labelFa: "روندها", subtitleFa: "روندهای دما، فشار و دبی" },
  { path: "/tanks", icon: Fuel, label: "Tanks & Storage", labelFa: "مخازن", subtitleFa: "سطح و ظرفیت مخازن ذخیره‌سازی" },
  { path: "/alarms", icon: Siren, label: "Alarms", labelFa: "هشدارها", subtitleFa: "هشدارها و رویدادهای فرآیندی" },
  { path: "/hse", icon: ShieldCheck, label: "HSE", labelFa: "ایمنی و محیط‌زیست", subtitleFa: "ایمنی، بهداشت، محیط‌زیست و پایداری" },
  { path: "/auto-operator", icon: Bot, label: "Auto Operator", labelFa: "اپراتور هوشمند", subtitleFa: "سوییچ خودکار به تجهیزات زاپاس" },
  { path: "/maintenance", icon: Wrench, label: "Predictive Maintenance", labelFa: "نگهداری پیشگیرانه", subtitleFa: "عمر مفید باقی‌مانده تجهیزات (RUL)" },
  { path: "/optimization", icon: SlidersHorizontal, label: "Optimization", labelFa: "بهینه‌سازی", subtitleFa: "بهینه‌سازی بلادرنگ فرآیند (RTO/APC)" },
  { path: "/data-quality", icon: DatabaseZap, label: "Data Quality", labelFa: "کیفیت داده", subtitleFa: "اعتبارسنجی و تطبیق داده‌ها" },
];

export const settingsNavItem: NavItem = {
  path: "/settings",
  icon: Settings,
  label: "Settings",
  labelFa: "تنظیمات",
  subtitleFa: "تنظیمات ظاهری و اطلاعات محصول",
};

export function navItemForPath(pathname: string): NavItem | undefined {
  return [...navItems, settingsNavItem].find((n) => n.path === pathname);
}
