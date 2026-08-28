import { useContext } from "react";
import { AlarmsContext } from "./alarmsContext";

export function useAlarms() {
  const ctx = useContext(AlarmsContext);
  if (!ctx) throw new Error("useAlarms must be used within an AlarmsProvider");
  return ctx;
}
