export type UnitStatus = "running" | "standby" | "warning" | "fault" | "offline";

export interface ProcessUnit {
  id: string;
  name: string;
  nameFa: string;
  area: string;
  status: UnitStatus;
  load: number; // percent of design capacity
  tag: string; // instrument tag, e.g. "P-101A"
}

export interface TrendPoint {
  t: string; // ISO timestamp label (HH:mm)
  temperature: number; // °C
  pressure: number; // barg
  flow: number; // m3/h
}

export type AlarmSeverity = "critical" | "serious" | "warning" | "good";

export interface AlarmEvent {
  id: string;
  time: string;
  tag: string;
  unit: string;
  message: string;
  messageFa: string;
  severity: AlarmSeverity;
  acknowledged: boolean;
}

export interface TankReading {
  id: string;
  name: string;
  product: string;
  levelPct: number;
  capacityM3: number;
  status: UnitStatus;
}

export interface KpiDatum {
  id: string;
  label: string;
  labelFa: string;
  value: number;
  unit: string;
  delta: number; // signed % vs previous period
  deltaGoodDirection: "up" | "down";
  sparkline: number[];
}
