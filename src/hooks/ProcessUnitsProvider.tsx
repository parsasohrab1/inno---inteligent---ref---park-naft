import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { processUnits as initialUnits } from "@/data/mockData";
import { loadPersisted, savePersisted } from "@/lib/persist";
import { ProcessUnitsContext } from "./processUnitsContext";
import { useAlarms } from "./useAlarms";
import type { ProcessUnit, UnitStatus } from "@/types";

const STORAGE_KEY = "process-units-state-v1";
const DECAY_INTERVAL_MS = 9000;
const RUL_WARNING_THRESHOLD = 20;
const RUL_CRITICAL_THRESHOLD = 10;

// Duty-cycle wear model: decay per tick scales with load^1.5, so a unit
// running near design capacity wears meaningfully faster than one loafing
// at low load — a real (if simplified) reliability heuristic, not pure
// noise. A small jitter factor keeps it from feeling perfectly linear.
const BASE_DECAY_PCT_PER_TICK = 0.45;

function decayFor(unit: ProcessUnit): number {
  const loadFactor = Math.pow(Math.max(unit.load, 0) / 100, 1.5);
  const jitter = 0.85 + Math.random() * 0.3;
  return BASE_DECAY_PCT_PER_TICK * loadFactor * jitter;
}

export function ProcessUnitsProvider({ children }: { children: ReactNode }) {
  const [units, setUnits] = useState<ProcessUnit[]>(() => loadPersisted(STORAGE_KEY, initialUnits));
  const { addAlarm } = useAlarms();
  const notified = useRef<Set<string>>(new Set());

  useEffect(() => {
    savePersisted(STORAGE_KEY, units);
  }, [units]);

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
        let changed = false;
        const next = prev.map((unit) => {
          if (unit.status !== "running" || unit.rulPct <= 0) return unit;
          changed = true;
          const decay = decayFor(unit);
          const nextRul = Math.max(0, Math.round((unit.rulPct - decay) * 10) / 10);
          const nextDays = Math.max(0, Math.round(unit.rulDays * (nextRul / Math.max(unit.rulPct, 1))));

          if (nextRul <= 0) {
            addAlarm({
              tag: unit.tag,
              unit: unit.area,
              message: `${unit.name} tripped — remaining useful life exhausted`,
              messageFa: `${unit.nameFa} از مدار خارج شد — عمر مفید به پایان رسید`,
              severity: "critical",
            });
            return { ...unit, rulPct: 0, rulDays: 0, status: "fault" as UnitStatus, load: 0 };
          }

          if (nextRul < RUL_CRITICAL_THRESHOLD) {
            const key = `${unit.id}:critical`;
            if (!notified.current.has(key)) {
              notified.current.add(key);
              addAlarm({
                tag: unit.tag,
                unit: unit.area,
                message: `Urgent: schedule replacement for ${unit.name} — RUL ${nextRul.toFixed(0)}%`,
                messageFa: `فوری: تعویض ${unit.nameFa} را برنامه‌ریزی کنید — عمر مفید باقی‌مانده ${nextRul.toFixed(0)}٪`,
                severity: "serious",
              });
            }
          } else if (nextRul < RUL_WARNING_THRESHOLD) {
            const key = `${unit.id}:warning`;
            if (!notified.current.has(key)) {
              notified.current.add(key);
              addAlarm({
                tag: unit.tag,
                unit: unit.area,
                message: `Preventive maintenance recommended for ${unit.name} — RUL ${nextRul.toFixed(0)}%`,
                messageFa: `پیشنهاد نگهداری پیشگیرانه برای ${unit.nameFa} — عمر مفید باقی‌مانده ${nextRul.toFixed(0)}٪`,
                severity: "warning",
              });
            }
          }

          return { ...unit, rulPct: nextRul, rulDays: nextDays };
        });
        return changed ? next : prev;
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
