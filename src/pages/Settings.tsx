import { Moon, Sun } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Panel } from "@/components/ui/Panel";
import { useTheme } from "@/hooks/useTheme";

export function Settings() {
  const { theme, setTheme } = useTheme();

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

        <Panel title="About" subtitle="درباره محصول">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
            <div>
              <dt style={{ color: "var(--text-muted)" }}>Product</dt>
              <dd className="mt-0.5" style={{ color: "var(--text-primary)" }}>
                Inno — Intelligent Refinery Dashboard
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
