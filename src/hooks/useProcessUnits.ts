import { useContext } from "react";
import { ProcessUnitsContext } from "./processUnitsContext";

export function useProcessUnits() {
  const ctx = useContext(ProcessUnitsContext);
  if (!ctx) throw new Error("useProcessUnits must be used within a ProcessUnitsProvider");
  return ctx;
}
