import { useCallback, useMemo, useRef, useState, type ReactNode } from "react";
import { alarms as initialAlarms } from "@/data/mockData";
import { AlarmsContext, type NewAlarmInput } from "./alarmsContext";
import type { AlarmEvent } from "@/types";

export function AlarmsProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<AlarmEvent[]>(initialAlarms);
  const nextId = useRef(1000);

  const acknowledge = useCallback((id: string) => {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }, []);

  const addAlarm = useCallback((alarm: NewAlarmInput) => {
    nextId.current += 1;
    const entry: AlarmEvent = {
      id: `auto-${nextId.current}`,
      time: new Date().toLocaleTimeString("en-GB"),
      acknowledged: false,
      ...alarm,
    };
    setAlarms((prev) => [entry, ...prev]);
  }, []);

  const unacknowledgedCount = useMemo(
    () => alarms.filter((a) => !a.acknowledged).length,
    [alarms]
  );

  const value = useMemo(
    () => ({ alarms, unacknowledgedCount, acknowledge, addAlarm }),
    [alarms, unacknowledgedCount, acknowledge, addAlarm]
  );

  return <AlarmsContext.Provider value={value}>{children}</AlarmsContext.Provider>;
}
