import { createContext } from "react";
import type { AlarmEvent } from "@/types";

export type NewAlarmInput = Pick<AlarmEvent, "tag" | "unit" | "message" | "messageFa" | "severity">;

export interface AlarmsContextValue {
  alarms: AlarmEvent[];
  unacknowledgedCount: number;
  acknowledge: (id: string) => void;
  addAlarm: (alarm: NewAlarmInput) => void;
}

export const AlarmsContext = createContext<AlarmsContextValue | null>(null);
