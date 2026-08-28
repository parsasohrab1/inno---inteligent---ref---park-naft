import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { processUnits as initialUnits } from "@/data/mockData";
import { ProcessUnitsContext } from "./processUnitsContext";
import { useAlarms } from "./useAlarms";
import type { ProcessUnit, UnitStatus } from "@/types";

const DECAY_INTERVAL_MS = 9000;
const RUL_WARNING_THRESHOLD = 20;
const RUL_CRITICAL_THRESHOLD = 10;

export function ProcessUnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<ProcessUnit[]>(initialUnits);
  const { addAlarm } = useAlarms();
  const notified = useRef<Set<string>>(new Set());

  const setStatus = useCallback((id: string, status: UnitStatus, load?: number) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status, load: load ?? u.load } : u))
    );
  }, []);

  const simulateFailure = useCallback(
    (id: string) => {
      setUnits((prev) => prev.map((u) => (u.id === id ? { ...u, status: "fault", load: 0, rulPct: 0, rulDays: 0 } : u)));
      const unit = units.find((u) => u.id === id);
      if (unit) {
        addAlarm({
          tag: unit.tag,
          unit: unit.area,
          message: `${unit.name} tripped — remaining useful life exhausted`,
          messageFa: `${unit.nameFa} از مدار خارج شد — عمر مفید به پایان رسید`,
          severity: "critical",
        });
      }
    },
    [units, addAlarm]
  );

  const markRepaired = useCallback((id: string) => {
    setUnits((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "standby", load: 0, rulPct: 100, rulDays: 300 } : u))
    );
    notified.current.forEach((key) => {
      if (key.startsWith(`${id}:`)) notified.current.delete(key);
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setUnits((prev) => {
        const candidates = prev.filter((u) => u.status === "running" && u.rulPct > 0);
        if (candidates.length === 0) return prev;
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        const decay = 2 + Math.random() * 5;
        const nextRul = Math.max(0, Math.round((target.rulPct - decay) * 10) / 10);
        const nextDays = Math.max(0, Math.round(target.rulDays * (nextRul / Math.max(target.rulPct, 1))));

        if (nextRul <= 0 && target.rulPct > 0) {
          addAlarm({
            tag: target.tag,
            unit: target.area,
            message: `${target.name} tripped — remaining useful life exhausted`,
            messageFa: `${target.nameFa} از مدار خارج شد — عمر مفید به پایان رسید`,
            severity: "critical",
          });
          return prev.map((u) => (u.id === target.id ? { ...u, rulPct: 0, rulDays: 0, status: "fault", load: 0 } : u));
        }

        if (nextRul < RUL_CRITICAL_THRESHOLD) {
          const key = `${target.id}:critical`;
          if (!notified.current.has(key)) {
            notified.current.add(key);
            addAlarm({
              tag: target.tag,
              unit: target.area,
              message: `Urgent: schedule replacement for ${target.name} — RUL ${nextRul.toFixed(0)}%`,
              messageFa: `فوری: تعویض ${target.nameFa} را برنامه‌ریزی کنید — عمر مفید باقی‌مانده ${nextRul.toFixed(0)}٪`,
              severity: "serious",
            });
          }
        } else if (nextRul < RUL_WARNING_THRESHOLD) {
          const key = `${target.id}:warning`;
          if (!notified.current.has(key)) {
            notified.current.add(key);
            addAlarm({
              tag: target.tag,
              unit: target.area,
              message: `Preventive maintenance recommended for ${target.name} — RUL ${nextRul.toFixed(0)}%`,
              messageFa: `پیشنهاد نگهداری پیشگیرانه برای ${target.nameFa} — عمر مفید باقی‌مانده ${nextRul.toFixed(0)}٪`,
              severity: "warning",
            });
          }
        }

        return prev.map((u) => (u.id === target.id ? { ...u, rulPct: nextRul, rulDays: nextDays } : u));
      });
    }, DECAY_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [addAlarm]);

  return (
    <ProcessUnitsContext.Provider value={{ units, setStatus, simulateFailure, markRepaired }}>
      {children}
    </ProcessUnitsContext.Provider>
  );
}
