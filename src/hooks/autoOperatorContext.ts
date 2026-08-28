import { createContext } from "react";

export interface AutoOperatorContextValue {
  enabled: boolean;
  toggle: () => void;
  switchToStandby: (pairId: string) => void;
  markRepaired: (pairId: string) => void;
}

export const AutoOperatorContext = createContext<AutoOperatorContextValue | null>(null);
