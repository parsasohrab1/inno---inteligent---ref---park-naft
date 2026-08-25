import { useEffect, useRef, useState } from "react";
import type { TrendPoint } from "@/types";
import { trendData } from "@/data/mockData";

/**
 * Simulates a live telemetry feed by rolling the trend window forward
 * on an interval — appends one new sample and drops the oldest, so
 * charts read as "live" without a real historian/OPC connection.
 * Swap the tick() body for a real subscription (WebSocket/MQTT/OPC-UA)
 * when wiring this up to the plant historian.
 */
export function useLiveTrend(intervalMs = 4000) {
  const [data, setData] = useState<TrendPoint[]>(trendData);
  const last = useRef(trendData[trendData.length - 1]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setData((prev) => {
        const prevPoint = last.current;
        const now = new Date();
        const wobble = (Math.random() - 0.5) * 3;
        const next: TrendPoint = {
          t: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          temperature: Math.round((prevPoint.temperature + wobble) * 10) / 10,
          pressure: Math.round((prevPoint.pressure + wobble / 12) * 100) / 100,
          flow: Math.round(prevPoint.flow + wobble * 6),
        };
        last.current = next;
        return [...prev.slice(1), next];
      });
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs]);

  return data;
}
