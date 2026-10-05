import type {
  AlarmEvent,
  HeavyDutyPair,
  KpiDatum,
  OptimizationRecommendation,
  ProcessUnit,
  ReconciledTag,
  TankReading,
  TrendPoint,
} from "@/types";

export const processUnits: ProcessUnit[] = [
  { id: "u1", name: "Crude Distillation Unit", nameFa: "Crude distillation unit", area: "CDU-100", status: "running", load: 94, tag: "CDU-100", rulPct: 72, rulDays: 210 },
  { id: "u2", name: "Vacuum Distillation Unit", nameFa: "Vacuum distillation unit", area: "VDU-200", status: "running", load: 87, tag: "VDU-200", rulPct: 64, rulDays: 165 },
  { id: "u3", name: "Catalytic Reformer", nameFa: "Catalytic reforming", area: "CRU-300", status: "warning", load: 76, tag: "CRU-300", rulPct: 18, rulDays: 22 },
  { id: "u4", name: "Hydrocracker", nameFa: "Hydrocracker", area: "HCU-400", status: "running", load: 91, tag: "HCU-400", rulPct: 55, rulDays: 130 },
  { id: "u5", name: "Sulfur Recovery Unit", nameFa: "Sulfur recovery unit", area: "SRU-500", status: "standby", load: 12, tag: "SRU-500", rulPct: 81, rulDays: 260 },
  { id: "u6", name: "Utilities & Steam", nameFa: "Utilities and steam", area: "UTL-600", status: "running", load: 68, tag: "UTL-600", rulPct: 47, rulDays: 95 },
  { id: "u7", name: "Feed Pump Station A", nameFa: "Feed pump station A", area: "PS-101A", status: "fault", load: 0, tag: "P-101A", rulPct: 0, rulDays: 0 },
  { id: "u8", name: "Cooling Water System", nameFa: "Cooling water system", area: "CWS-700", status: "running", load: 82, tag: "CWS-700", rulPct: 58, rulDays: 140 },
  { id: "u9", name: "Feed Pump Station B", nameFa: "Feed pump station B", area: "PS-101B", status: "standby", load: 0, tag: "P-101B", rulPct: 90, rulDays: 300 },
  { id: "u10", name: "Cooling Water Pump 1", nameFa: "Cooling water pump 1", area: "CWS-700", status: "running", load: 85, tag: "P-701A", rulPct: 12, rulDays: 14 },
  { id: "u11", name: "Cooling Water Pump 2", nameFa: "Cooling water pump 2", area: "CWS-700", status: "standby", load: 0, rulPct: 95, tag: "P-701B", rulDays: 320 },
  { id: "u12", name: "Recycle Gas Compressor A", nameFa: "Recycle gas compressor A", area: "HCU-400", status: "running", load: 90, tag: "K-401A", rulPct: 39, rulDays: 60 },
  { id: "u13", name: "Recycle Gas Compressor B", nameFa: "Recycle gas compressor B", area: "HCU-400", status: "standby", load: 0, tag: "K-401B", rulPct: 100, rulDays: 340 },
];

export const heavyDutyPairs: HeavyDutyPair[] = [
  { id: "hd1", label: "Feed Pumps", labelFa: "Feed pumps", dutyUnitId: "u7", standbyUnitId: "u9" },
  { id: "hd2", label: "Cooling Water Pumps", labelFa: "Cooling water pumps", dutyUnitId: "u10", standbyUnitId: "u11" },
  { id: "hd3", label: "Recycle Gas Compressors", labelFa: "Recycle gas compressors", dutyUnitId: "u12", standbyUnitId: "u13" },
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
  { id: "a1", time: "14:32:08", tag: "P-101A", unit: "PS-101A", message: "Discharge pressure below setpoint — pump tripped", messageFa: "Discharge pressure drop — pump tripped", severity: "critical", acknowledged: false },
  { id: "a2", time: "14:15:41", tag: "TI-3042", unit: "CRU-300", message: "Reactor inlet temperature approaching high limit", messageFa: "Reactor inlet temperature close to the high limit", severity: "serious", acknowledged: false },
  { id: "a3", time: "13:58:02", tag: "LI-7710", unit: "Naphtha Tank", message: "Tank level above 90% capacity", messageFa: "Tank level above 90% of capacity", severity: "warning", acknowledged: false },
  { id: "a4", time: "13:40:55", tag: "FI-2201", unit: "VDU-200", message: "Feed flow restored to normal range", messageFa: "Feed flow returned to the normal range", severity: "good", acknowledged: true },
  { id: "a5", time: "13:22:17", tag: "PI-5010", unit: "SRU-500", message: "Unit placed on standby per schedule", messageFa: "Unit on standby per schedule", severity: "good", acknowledged: true },
  { id: "a6", time: "12:59:33", tag: "VI-1187", unit: "CWS-700", message: "Vibration trending upward on CW pump #2", messageFa: "Increased vibration of cooling water pump 2", severity: "warning", acknowledged: false },
];

export const kpis: KpiDatum[] = [
  { id: "k1", label: "Crude Throughput", labelFa: "Feed throughput", value: 118400, unit: "bbl/d", delta: 2.4, deltaGoodDirection: "up", sparkline: [96, 98, 101, 99, 104, 108, 112, 118] },
  { id: "k2", label: "Product Yield", labelFa: "Production yield", value: 94.2, unit: "%", delta: 0.6, deltaGoodDirection: "up", sparkline: [91, 92, 92.5, 93, 93.4, 93.8, 94, 94.2] },
  { id: "k3", label: "Energy Intensity", labelFa: "Energy intensity", value: 3.42, unit: "GJ/bbl", delta: -1.8, deltaGoodDirection: "down", sparkline: [3.6, 3.58, 3.55, 3.5, 3.48, 3.46, 3.44, 3.42] },
  { id: "k4", label: "Active Alarms", labelFa: "Active alarms", value: 4, unit: "", delta: 33, deltaGoodDirection: "down", sparkline: [2, 2, 3, 3, 2, 3, 4, 4] },
];

export const safety = {
  daysSinceIncident: 187,
  flaringM3: 1240,
  emissionsCo2Tpd: 862,
  hseComplianceScore: 96,
};

export const reconciledTags: ReconciledTag[] = [
  { id: "r1", tag: "FI-2201", label: "VDU Feed Flow", labelFa: "VDU feed flow", rawValue: 1184, reconciledValue: 1179, unit: "m³/h", closurePct: 99.6, status: "ok" },
  { id: "r2", tag: "FI-3305", label: "CRU Feed Flow", labelFa: "CRU feed flow", rawValue: 402, reconciledValue: 431, unit: "m³/h", closurePct: 93.3, status: "flagged" },
  { id: "r3", tag: "TI-1042", label: "CDU Outlet Temp", labelFa: "CDU outlet temperature", rawValue: 352.4, reconciledValue: 352.1, unit: "°C", closurePct: 99.9, status: "ok" },
  { id: "r4", tag: "PI-5010", label: "SRU Header Pressure", labelFa: "SRU header pressure", rawValue: 2.14, reconciledValue: 2.15, unit: "barg", closurePct: 99.5, status: "ok" },
  { id: "r5", tag: "LI-7710", label: "Naphtha Tank Level", labelFa: "Naphtha tank level", rawValue: 91.2, reconciledValue: 90.8, unit: "%", closurePct: 99.6, status: "ok" },
  { id: "r6", tag: "FI-8801", label: "Product Pool Mass Balance", labelFa: "Product pool mass balance", rawValue: 118400, reconciledValue: 121850, unit: "bbl/d", closurePct: 97.2, status: "flagged" },
];

export const optimizationRecommendations: OptimizationRecommendation[] = [
  {
    id: "o1",
    parameter: "CDU Furnace Outlet Temperature",
    parameterFa: "CDU furnace outlet temperature",
    tag: "TIC-1010",
    unit: "u1",
    currentValue: 352.4,
    recommendedValue: 354.8,
    valueUnit: "°C",
    impact: "+0.4% distillate yield",
    impactFa: "+0.4% middle-distillate yield",
    estAnnualSavingsUsd: 186000,
    applied: false,
  },
  {
    id: "o2",
    parameter: "CRU Reactor H2/HC Ratio",
    parameterFa: "CRU reactor H2/HC ratio",
    tag: "FIC-3120",
    unit: "u3",
    currentValue: 4.8,
    recommendedValue: 4.3,
    valueUnit: "mol/mol",
    impact: "-2.1% hydrogen consumption",
    impactFa: "-2.1% hydrogen consumption",
    estAnnualSavingsUsd: 244000,
    applied: false,
  },
  {
    id: "o3",
    parameter: "Utilities Steam Header Pressure",
    parameterFa: "Utility steam header pressure",
    tag: "PIC-6005",
    unit: "u6",
    currentValue: 42.0,
    recommendedValue: 39.5,
    valueUnit: "barg",
    impact: "-3.6% fuel gas to boilers",
    impactFa: "-3.6% boiler fuel gas consumption",
    estAnnualSavingsUsd: 312000,
    applied: false,
  },
];
