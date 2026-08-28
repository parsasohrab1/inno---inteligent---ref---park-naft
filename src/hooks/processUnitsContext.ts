import { createContext } from "react";
import type { ProcessUnit, UnitStatus } from "@/types";

export interface ProcessUnitsContextValue {
  units: ProcessUnit[];
  setStatus: (id: string, status: UnitStatus, load?: number) => void;
  simulateFailure: (id: string) => void;
  markRepaired: (id: string) => void;
}

export const ProcessUnitsContext = createContext<ProcessUnitsContextValue | null>(null);
