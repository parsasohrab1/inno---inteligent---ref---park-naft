# Introduction to DCS/SIS Systems to Complete the Real Control Layer of the "Smart Operator"

## 1. Why This Document Is Needed

The "Smart Operator" module in the Smart Refinery dashboard is currently a **decision-support and monitoring layer**: it
works with simulated data, displays the logic of switching to standby equipment, and has a real webhook hook
(`/settings` → Automation Webhook URL) that can notify any external system of an event via HTTP POST.
However, **this dashboard must never directly issue a command to start/stop real physical equipment**,
because that falls within the domain of **safety-oriented industrial control (Safety Instrumented System / DCS)**, which
requires certified hardware, a safety engineering lifecycle per IEC 61511, and separate legal/insurance
accountability. A web app that could mistakenly stop or start a real pump/compressor without going through this process
could lead to a real safety incident.

This document was prepared to introduce **real and reputable market products** so that the Petro Palatos technical/procurement team can
select the right option for real procurement, tender and integration. In this
architecture, the Smart Refinery dashboard remains the **HMI/monitoring + intelligent advisor** layer; real physical commanding is performed by the certified DCS/SIS.
.

---

## 2. DCS vs. SIS Difference (Summary)

| | DCS (Distributed Control System) | SIS (Safety Instrumented System) |
|---|---|---|
| Role | Continuous process control (PID, sequence, optimization) | Independent safety intervention when a critical limit is crossed (trip/shutdown) |
| Independence | Usually connected to normal control | Must be **completely independent** of the DCS (per IEC 61511) |
| Certification standard | IEC 61508 / IEC 62443 (security) | IEC 61508 + IEC 61511, with a **SIL** rating (1 to 4) |
| Example use in this project | Setting the CDU operating point, APC/RTO loops (what the Optimization page shows as a simulation) | Automatic trip of a failed pump and bringing in the standby pump (what Auto Operator shows as a simulation) |

Important note: the "Smart Operator" logic in this project is conceptually closer to a SIS (automatic response to a
failure), so the final decision and physical execution must go through a certified SIS, not directly from this web app.

---

## 3. Reputable DCS Products (for the control and optimization layer)

| Vendor | Product | Notes |
|---|---|---|
| Honeywell | Experion PKS | Widely used in Middle East refineries; APC/RTO under the Profit Suite brand |
| Yokogawa | CENTUM VP | Long track record in the oil and gas industries; Exaquantum for historian |
| Emerson | DeltaV | Modular architecture, strong integration with Emerson instrumentation (Rosemount) |
| ABB | System 800xA | Integration of DCS + Electrical + Safety in one platform |
| Siemens | SIMATIC PCS 7 | Suitable for small to medium units, competitive cost |
| Schneider Electric | EcoStruxure Foundation / Quantum | A more cost-effective option for gradual expansion |

## 4. Reputable SIS Products (for the safety and automatic trip layer)

| Vendor | Product | Supported SIL rating |
|---|---|---|
| Schneider Electric (ex-Invensys) | Triconex Tricon / TriStation | Up to SIL 3 |
| Honeywell | Safety Manager | Up to SIL 3 |
| HIMA | HIMax / HIQuad X | Up to SIL 3, configurable architecture for large projects |
| ABB | Safety AC 800M High Integrity | Up to SIL 3, integrated with System 800xA |
| Yokogawa | ProSafe-RS | Up to SIL 3, integrated with CENTUM VP |
| Siemens | SIMATIC S7-1500F / S7-400F | Up to SIL 3, scalable for smaller units |

The choice among these options is usually based on: the refinery's currently installed DCS (for integration), the availability
of local support/representation in Iran, and the history of sanctions/parts supply must be checked — this last item is
of particular importance for projects inside Iran and requires direct inquiry with the representatives or consideration of
local/Chinese alternatives (such as some Emerson/Honeywell solutions through a representative, or local options).

---

## 5. Proposed Architecture for Integration with the Smart Refinery Dashboard

```
[ Real sensors / pump and compressor ]
            │
            ▼
   [ Certified SIS — e.g., Triconex ]  ──── the final decision and physical command are always here
            │  (status / event)
            ▼
   [ DCS (e.g., Experion PKS) ] ──── continuous control + real APC/RTO
            │  (OPC-UA / MQTT / REST)
            ▼
   [ Historian / Middleware — e.g., OSIsoft PI, AVEVA Historian ]
            │
            ▼
   [ Smart Refinery Dashboard (this project) ]
      - Reads: live status, alarms, RUL, process data
      - Writes only: suggestion/request (not a direct command) through
        Automation Webhook → to an intermediate service that, under SIS/DCS supervision,
        performs the actual execution (not this app alone)
```

Key point: the webhook already implemented in `/settings` of this project is designed exactly for this purpose
— the connection point to a real Middleware, not a direct connection to equipment.

---

## 6. Procurement and Implementation Process (based on the IEC 61511 safety lifecycle)

1. **HAZOP / LOPA** on the target units (feed pump, cooling water pump, recycle gas compressor) to determine
   hazard scenarios and the required risk reduction rate.
2. **Determine the required SIL** for each SIF (Safety Instrumented Function) — e.g., "automatic switch to standby pump"
   may be SIL 1 or SIL 2 depending on the LOPA result.
3. **Develop the safety SRS** (Safety Requirements Specification) — a document separate from this README, specific to safety
   requirements, per the IEC 61511 format.
4. **Tender and vendor selection** from the table above, based on integration with the existing DCS and local support.
5. **Detailed design, FAT (Factory Acceptance Test), SAT (Site Acceptance Test)**.
6. **Commissioning and periodic Proof Testing** per the safety maintenance plan.
7. **Software integration** with this dashboard: configure the same Automation Webhook to receive real events
   from the Middleware and, if needed, add an OPC-UA/REST connection to read the real live status
   instead of the current simulated data (`src/data/mockData.ts`).

This is a Capital Project with a typical scale of several months to more than a year, not a quick software
add-on — time and cost estimates must be requested from the selected vendor based on the number of SIFs.

---

## 7. Summary and Recommendation

- Keep the current dashboard as the **HMI/decision-support layer**; do not replace the DCS/SIS with it.
- To start, prioritize a SIS with strong local support and a track record of installation in Iranian refineries (requires
  direct inquiry with representatives).
- Begin the real connection through the same Automation Webhook implemented in this version: first only for
  **receiving notifications** (one-way, secure), and only after full safety approval, for any two-way interaction.
