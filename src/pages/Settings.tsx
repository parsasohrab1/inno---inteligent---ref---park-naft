import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { useTheme } from "@/hooks/useTheme";
import { useAutomationSettings } from "@/hooks/useAutomationSettings";

type TestState = "idle" | "sending" | "ok" | "error";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { webhookUrl, setWebhookUrl } = useAutomationSettings();
  const [testState, setTestState] = useState<TestState>("idle");

  const sendTestEvent = async () => {
    if (!webhookUrl) return;
    setTestState("sending");
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "smart-refinery-auto-operator",
          action: "test_event",
          timestamp: new Date().toISOString(),
        }),
      });
      setTestState("ok");
    } catch {
      setTestState("error");
    }
  };

  return (
    <Layout>
      <div className="space-y-5 max-w-[1600px] mx-auto">
        <Panel title="Appearance" subtitle="ظاهر برنامه">
          <div className="flex flex-wrap gap-3">
            {(["dark", "light"] as const).map((t) => {
              const Icon = t === "dark" ? Moon : Sun;
              const active = theme === t;
              return (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  aria-pressed={active}
                  className="flex items-center gap-2 rounded-[var(--radius-md)] border px-4 py-2.5 text-sm capitalize"
                  style={{
                    borderColor: active ? "var(--brand)" : "var(--border)",
                    color: active ? "var(--brand)" : "var(--text-secondary)",
                    background: active ? "color-mix(in srgb, var(--brand) 10%, transparent)" : "transparent",
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                  {t}
                </button>
              );
            })}
          </div>
          <p className="text-xs mt-3" style={{ color: "var(--text-muted)" }}>
            Preference is saved to this browser and also honors your OS theme on first visit.
          </p>
        </Panel>

        <Panel title="Automation Integration" subtitle="یکپارچه‌سازی با سیستم کنترل واقعی">
          <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }} htmlFor="webhook-url">
            Automation webhook URL (optional)
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="webhook-url"
              type="url"
              value={webhookUrl}
              onChange={(e) => {
                setWebhookUrl(e.target.value);
                setTestState("idle");
              }}
              placeholder="https://your-scada-gateway.example.com/webhooks/auto-operator"
              className="flex-1 rounded-[var(--radius-sm)] border px-3 py-2 text-xs bg-transparent outline-none"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)" }}
            />
            <button
              onClick={sendTestEvent}
              disabled={!webhookUrl || testState === "sending"}
              className="shrink-0 rounded-[var(--radius-sm)] px-3 py-2 text-xs font-medium disabled:opacity-40"
              style={{ background: "var(--brand)", color: "#fff" }}
            >
              {testState === "sending" ? "Sending…" : "Send test event"}
            </button>
          </div>
          {testState === "ok" && (
            <p className="text-[11px] mt-1.5" style={{ color: "var(--status-good)" }}>
              Test event sent — check your endpoint's request log to confirm delivery.
            </p>
          )}
          {testState === "error" && (
            <p className="text-[11px] mt-1.5" style={{ color: "var(--status-critical)" }}>
              Request failed (network error or the endpoint rejected it) — check the URL and CORS
              settings on the receiving side.
            </p>
          )}
          <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            When set, Auto Operator sends a real HTTP POST to this URL every time it switches a
            standby unit online or an operator marks a unit repaired — a genuine integration point
            for a real SCADA/DCS gateway or middleware to react to. With no URL configured (the
            default), nothing is sent — there is no real control system connected to this demo by
            default, and Auto Operator only ever updates this app's own simulated state.
          </p>
        </Panel>

        <Panel title="About" subtitle="درباره محصول">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div>
              <dt style={{ color: "var(--text-muted)" }}>Product</dt>
              <dd className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                Smart Refinery — Intelligent Dashboard
              </dd>
            </div>
            <div>
              <dt style={{ color: "var(--text-muted)" }}>Site</dt>
              <dd className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                Park Naft Refinery (demo)
              </dd>
            </div>
            <div>
              <dt style={{ color: "var(--text-muted)" }}>Data source</dt>
              <dd className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                Simulated data — not yet connected to a historian
              </dd>
            </div>
            <div>
              <dt style={{ color: "var(--text-muted)" }}>Version</dt>
              <dd className="mt-0.5 tabular" style={{ color: "var(--text-primary)" }}>
                0.1.0
              </dd>
            </div>
          </dl>
        </Panel>
      </div>
    </Layout>
  );
}
