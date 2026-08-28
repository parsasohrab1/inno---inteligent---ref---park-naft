import { createContext } from "react";
import type { AlarmEvent } from "@/types";

export interface AlarmsContextValue {
  alarms: AlarmEvent[];
  unacknowledgedCount: number;
  acknowledge: (id: string) => void;
}

export const AlarmsContext = createContext<AlarmsContextValue | null>(null);
