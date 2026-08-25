import type {
  AlarmEvent,
  KpiDatum,
  ProcessUnit,
  TankReading,
  TrendPoint,
} from "@/types";

export const processUnits: ProcessUnit[] = [
  { id: "u1", name: "Crude Distillation Unit", nameFa: "واحد تقطیر خوراک", area: "CDU-100", status: "running", load: 94, tag: "CDU-100" },
  { id: "u2", name: "Vacuum Distillation Unit", nameFa: "واحد تقطیر خلاء", area: "VDU-200", status: "running", load: 87, tag: "VDU-200" },
  { id: "u3", name: "Catalytic Reformer", nameFa: "ریفرمینگ کاتالیستی", area: "CRU-300", status: "warning", load: 76, tag: "CRU-300" },
  { id: "u4", name: "Hydrocracker", nameFa: "هیدروکراکر", area: "HCU-400", status: "running", load: 91, tag: "HCU-400" },
  { id: "u5", name: "Sulfur Recovery Unit", nameFa: "واحد بازیابی گوگرد", area: "SRU-500", status: "standby", load: 12, tag: "SRU-500" },
  { id: "u6", name: "Utilities & Steam", nameFa: "یوتیلیتی و بخار", area: "UTL-600", status: "running", load: 68, tag: "UTL-600" },
  { id: "u7", name: "Feed Pump Station A", nameFa: "ایستگاه پمپاژ خوراک A", area: "PS-101A", status: "fault", load: 0, tag: "P-101A" },
  { id: "u8", name: "Cooling Water System", nameFa: "سیستم آب خنک‌کننده", area: "CWS-700", status: "running", load: 82, tag: "CWS-700" },
];

function genTrend(hours = 24): TrendPoint[] {
  const pts: TrendPoint[] = [];
  const now = new Date();
  for (let i = hours; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 60 * 60 * 1000);
    const t = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const wobble = Math.sin(i / 2.3) * 4 + Math.sin(i / 5) * 2;
    pts.push({
      t,
      temperature: Math.round((352 + wobble + Math.random() * 2) * 10) / 10,
      pressure: Math.round((14.2 + wobble / 8 + Math.random() * 0.3) * 100) / 100,
      flow: Math.round(1180 + wobble * 6 + Math.random() * 20),
    });
  }
  return pts;
}

export const trendData: TrendPoint[] = genTrend(24);

export const tanks: TankReading[] = [
  { id: "t1", name: "Crude Tank 1", product: "Crude Oil", levelPct: 78, capacityM3: 50000, status: "running" },
  { id: "t2", name: "Crude Tank 2", product: "Crude Oil", levelPct: 34, capacityM3: 50000, status: "running" },
  { id: "t3", name: "Naphtha Tank", product: "Naphtha", levelPct: 91, capacityM3: 20000, status: "warning" },
  { id: "t4", name: "Diesel Tank", product: "Gas Oil", levelPct: 62, capacityM3: 30000, status: "running" },
  { id: "t5", name: "LPG Sphere", product: "LPG", levelPct: 15, capacityM3: 8000, status: "standby" },
];

export const alarms: AlarmEvent[] = [
  { id: "a1", time: "14:32:08", tag: "P-101A", unit: "PS-101A", message: "Discharge pressure below setpoint — pump tripped", messageFa: "افت فشار خروجی — پمپ قطع شد", severity: "critical", acknowledged: false },
  { id: "a2", time: "14:15:41", tag: "TI-3042", unit: "CRU-300", message: "Reactor inlet temperature approaching high limit", messageFa: "دمای ورودی راکتور نزدیک حد بالا", severity: "serious", acknowledged: false },
  { id: "a3", time: "13:58:02", tag: "LI-7710", unit: "Naphtha Tank", message: "Tank level above 90% capacity", messageFa: "سطح مخزن بالای ۹۰٪ ظرفیت", severity: "warning", acknowledged: false },
  { id: "a4", time: "13:40:55", tag: "FI-2201", unit: "VDU-200", message: "Feed flow restored to normal range", messageFa: "دبی خوراک به محدوده نرمال بازگشت", severity: "good", acknowledged: true },
  { id: "a5", time: "13:22:17", tag: "PI-5010", unit: "SRU-500", message: "Unit placed on standby per schedule", messageFa: "واحد طبق برنامه در حالت آماده‌باش", severity: "good", acknowledged: true },
  { id: "a6", time: "12:59:33", tag: "VI-1187", unit: "CWS-700", message: "Vibration trending upward on CW pump #2", messageFa: "افزایش لرزش پمپ آب خنک‌کننده ۲", severity: "warning", acknowledged: false },
];

export const kpis: KpiDatum[] = [
  { id: "k1", label: "Crude Throughput", labelFa: "ورودی خوراک", value: 118400, unit: "bbl/d", delta: 2.4, deltaGoodDirection: "up", sparkline: [96, 98, 101, 99, 104, 108, 112, 118] },
  { id: "k2", label: "Product Yield", labelFa: "بازده تولید", value: 94.2, unit: "%", delta: 0.6, deltaGoodDirection: "up", sparkline: [91, 92, 92.5, 93, 93.4, 93.8, 94, 94.2] },
  { id: "k3", label: "Energy Intensity", labelFa: "شدت انرژی مصرفی", value: 3.42, unit: "GJ/bbl", delta: -1.8, deltaGoodDirection: "down", sparkline: [3.6, 3.58, 3.55, 3.5, 3.48, 3.46, 3.44, 3.42] },
  { id: "k4", label: "Active Alarms", labelFa: "هشدارهای فعال", value: 4, unit: "", delta: 33, deltaGoodDirection: "down", sparkline: [2, 2, 3, 3, 2, 3, 4, 4] },
];

export const safety = {
  daysSinceIncident: 187,
  flaringM3: 1240,
  emissionsCo2Tpd: 862,
  hseComplianceScore: 96,
};
