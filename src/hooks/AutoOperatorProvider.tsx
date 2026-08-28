import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { heavyDutyPairs } from "@/data/mockData";
import { AutoOperatorContext } from "./autoOperatorContext";
import { useProcessUnits } from "./useProcessUnits";
import { useAlarms } from "./useAlarms";

const STORAGE_KEY = "auto-operator-enabled";
const STANDBY_TAKEOVER_LOAD = 90;

export function AutoOperatorProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(() => window.localStorage.getItem(STORAGE_KEY) === "1");
  const { units, setStatus, markRepaired: markUnitRepaired } = useProcessUnits();
  const { addAlarm } = useAlarms();
  const handledFaults = useRef<Set<string>>(new Set());

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }, [enabled]);

  const toggle = useCallback(() => setEnabled((v) => !v), []);

  const switchToStandby = useCallback(
    (pairId: string) => {
      const pair = heavyDutyPairs.find((p) => p.id === pairId);
      if (!pair) return;
      const standby = units.find((u) => u.id === pair.standbyUnitId);
      if (!standby || standby.status === "running") return;
      setStatus(pair.standbyUnitId, "running", STANDBY_TAKEOVER_LOAD);
      addAlarm({
        tag: standby.tag,
        unit: standby.area,
        message: `Standby unit "${standby.name}" brought online to replace failed duty unit`,
        messageFa: `واحد آماده‌باش «${standby.nameFa}» جهت جایگزینی واحد اصلی خراب وارد مدار شد`,
        severity: "good",
      });
      handledFaults.current.add(pairId);
    },
    [units, setStatus, addAlarm]
  );

  const markRepaired = useCallback(
    (pairId: string) => {
      const pair = heavyDutyPairs.find((p) => p.id === pairId);
      if (!pair) return;
      const duty = units.find((u) => u.id === pair.dutyUnitId);
      markUnitRepaired(pair.dutyUnitId);
      handledFaults.current.delete(pairId);
      if (duty) {
        addAlarm({
          tag: duty.tag,
          unit: duty.area,
          message: `${duty.name} returned to service after maintenance — now on standby`,
          messageFa: `${duty.nameFa} پس از تعمیر به سرویس بازگشت — اکنون در حالت آماده‌باش`,
          severity: "good",
        });
      }
    },
    [units, markUnitRepaired, addAlarm]
  );

  useEffect(() => {
    if (!enabled) return;
    for (const pair of heavyDutyPairs) {
      if (handledFaults.current.has(pair.id)) continue;
      const duty = units.find((u) => u.id === pair.dutyUnitId);
      const standby = units.find((u) => u.id === pair.standbyUnitId);
      if (duty?.status === "fault" && standby && standby.status !== "running") {
        switchToStandby(pair.id);
      }
    }
  }, [enabled, units, switchToStandby]);

  return (
    <AutoOperatorContext.Provider value={{ enabled, toggle, switchToStandby, markRepaired }}>
      {children}
    </AutoOperatorContext.Provider>
  );
}
