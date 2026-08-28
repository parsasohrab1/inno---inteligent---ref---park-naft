import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlarmsProvider } from "@/hooks/AlarmsProvider";

const Dashboard = lazy(() => import("@/pages/Dashboard").then((m) => ({ default: m.Dashboard })));
const ProcessUnits = lazy(() => import("@/pages/ProcessUnits").then((m) => ({ default: m.ProcessUnits })));
const Trends = lazy(() => import("@/pages/Trends").then((m) => ({ default: m.Trends })));
const TanksStorage = lazy(() => import("@/pages/TanksStorage").then((m) => ({ default: m.TanksStorage })));
const Alarms = lazy(() => import("@/pages/Alarms").then((m) => ({ default: m.Alarms })));
const Hse = lazy(() => import("@/pages/Hse").then((m) => ({ default: m.Hse })));
const Settings = lazy(() => import("@/pages/Settings").then((m) => ({ default: m.Settings })));

function RouteFallback() {
  return (
    <div className="flex h-screen w-full items-center justify-center" style={{ background: "var(--page)" }}>
      <div
        className="h-8 w-8 rounded-full border-2 animate-spin"
        style={{ borderColor: "var(--border-strong)", borderTopColor: "var(--brand)" }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}

function App() {
  return (
    <AlarmsProvider>
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/units" element={<ProcessUnits />} />
            <Route path="/trends" element={<Trends />} />
            <Route path="/tanks" element={<TanksStorage />} />
            <Route path="/alarms" element={<Alarms />} />
            <Route path="/hse" element={<Hse />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AlarmsProvider>
  );
}

export default App;
