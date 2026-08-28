import { useContext } from "react";
import { AutoOperatorContext } from "./autoOperatorContext";

export function useAutoOperator() {
  const ctx = useContext(AutoOperatorContext);
  if (!ctx) throw new Error("useAutoOperator must be used within an AutoOperatorProvider");
  return ctx;
}
