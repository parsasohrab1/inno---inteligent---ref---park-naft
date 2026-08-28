import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { alarms as initialAlarms } from "@/data/mockData";
import { loadPersisted, savePersisted } from "@/lib/persist";
import { AlarmsContext, type NewAlarmInput } from "./alarmsContext";
import type { AlarmEvent } from "@/types";

const STORAGE_KEY = "alarms-state-v1";
const MAX_ALARMS = 200;

function highestAutoId(alarms: AlarmEvent[]): number {
  let max = 1000;
  for (const a of alarms) {
    const match = /^auto-(\d+)$/.exec(a.id);
    if (match) max = Math.max(max, Number(match[1]));
  }
  return max;
}

export function AlarmsProvider({ children }: { children: ReactNode }) {
  const [alarms, setAlarms] = useState<AlarmEvent[]>(() => loadPersisted(STORAGE_KEY, initialAlarms));
  const nextId = useRef(highestAutoId(alarms));

  useEffect(() => {
    savePersisted(STORAGE_KEY, alarms);
  }, [alarms]);

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
    setAlarms((prev) => [entry, ...prev].slice(0, MAX_ALARMS));
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
