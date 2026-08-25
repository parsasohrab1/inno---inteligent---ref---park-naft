# Inno — Intelligent Refinery Dashboard (Park Naft)

اسکلت پروژه و داشبرد صنعتی برای پایش لحظه‌ای واحدهای فرآیندی پالایشگاه. این نسخه‌ی
اولیه شامل ساختار کامل پروژه (React + TypeScript + Vite + Tailwind CSS 4) و یک
داشبرد کاملاً کاربردی با داده‌های نمونه است — آماده برای اتصال به منبع داده‌ی واقعی
(historian / OPC-UA / MQTT / REST API).

## Stack

- **Vite + React 19 + TypeScript** — app shell & build tooling
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — utility styling, theme tokens as CSS variables
- **Recharts** — process trend charts (temperature / pressure / flow)
- **lucide-react** — icon set
- Design tokens follow a validated categorical/status/sequential color system
  (see `src/index.css`) — colorblind-safe, contrast-checked against the dark
  control-room surface used by default.

## Project structure

```
src/
  components/
    layout/       # Sidebar, Topbar, page Layout shell
    dashboard/     KPI cards, trend charts, alarms panel, equipment grid,
                    tank gauges, process flow diagram, HSE strip
    ui/            Shared primitives (Panel, StatusDot/Badge)
  data/            Mock data — swap for real API/historian calls
  hooks/           useLiveTrend — simulated live telemetry feed
  lib/             Formatting & status/severity color helpers
  pages/           Dashboard page composition
  types/           Shared TypeScript types (ProcessUnit, AlarmEvent, …)
```

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

## What's implemented

- **KPI row** — crude throughput, product yield, energy intensity, active alarms
  (each with a compact sparkline and period-over-period delta).
- **Process flow diagram** — CDU → VDU → CRU/HCU → SRU → Product Pool, node color
  reflects live unit status.
- **Process trends** — temperature / pressure / flow as three small-multiple
  charts (kept on separate scales deliberately — a shared axis across
  different units of measure is a classic dashboard mistake).
- **Alarms & events** — severity-coded feed (critical/serious/warning/resolved),
  bilingual (EN/FA) messages.
- **Process units grid** — status badges (running/standby/warning/fault) per unit.
- **Tanks & storage** — level meters with severity-colored fill.
- **HSE & sustainability strip** — days since incident, flaring, CO₂ emissions,
  compliance score.

## Next steps (suggested)

1. Replace `src/data/mockData.ts` and `useLiveTrend` with real data-source
   bindings (historian REST API, OPC-UA gateway, or a WebSocket/MQTT bridge).
2. Add authentication / role-based access if this will be exposed beyond the
   control room network.
3. Add routing (React Router) for the remaining sidebar sections (Process
   Units detail, Trends explorer, Tanks detail, Alarms log, HSE reports).
4. Add a light-mode toggle if operators need it — the color tokens in
   `src/index.css` already define a `[data-theme="light"]` variant.
