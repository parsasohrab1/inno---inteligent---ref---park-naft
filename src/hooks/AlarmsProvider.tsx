import { useCallback, useMemo, useState, type ReactNode } from "react";
import { alarms as initialAlarms } from "@/data/mockData";
import { AlarmsContext } from "./alarmsContext";
import type { AlarmEvent } from "@/types";

export function AlarmsProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<AlarmEvent[]>(initialAlarms);

  const acknowledge = useCallback((id: string) => {
    setAlarms((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  }, []);

  const unacknowledgedCount = useMemo(
    () => alarms.filter((a) => !a.acknowledged).length,
    [alarms]
  );

  const value = useMemo(
    () => ({ alarms, unacknowledgedCount, acknowledge }),
    [alarms, unacknowledgedCount, acknowledge]
  );

  return <AlarmsContext.Provider value={value}>{children}</AlarmsContext.Provider>;
}
