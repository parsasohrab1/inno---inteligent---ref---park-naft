import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { heavyDutyPairs } from "@/data/mockData";
import { AutoOperatorContext } from "./autoOperatorContext";
import { useProcessUnits } from "./useProcessUnits";
import { useAlarms } from "./useAlarms";
import { getWebhookUrl } from "./useAutomationSettings";

const STORAGE_KEY = "auto-operator-enabled";
const STANDBY_TAKEOVER_LOAD = 90;

// Real integration point: if the operator has configured an automation
// webhook (Settings page), actually POST the action to it. With no URL
// configured this is a no-op — there is no real control system to notify
// by default, and this app never claims otherwise.
function notifyWebhook(event: Record<string, unknown>) {
  const url = getWebhookUrl();
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source: "smart-refinery-auto-operator", timestamp: new Date().toISOString(), ...event }),
  }).catch((err) => {
    console.warn("Auto Operator webhook notification failed:", err);
  });
}

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
      notifyWebhook({
        action: "switch_to_standby",
        pairId,
        standbyUnitId: standby.id,
        standbyTag: standby.tag,
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
        notifyWebhook({ action: "unit_repaired", pairId, unitId: duty.id, tag: duty.tag });
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
