import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { useTheme } from "@/lib/theme";

const pad = (n: number) => String(n).padStart(2, "0");

function useSystemStats() {
  const [stats, setStats] = useState<{ label: string; value: string }[] | null>(null);

  useEffect(() => {
    const start = performance.now();
    let frames = 0;
    let fps = 0;
    let last = start;
    let raf = 0;
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        fps = Math.round((frames * 1000) / (t - last));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    let battery = "n/a";
    const nav = navigator as Navigator & {
      getBattery?: () => Promise<{ level: number; charging: boolean }>;
      connection?: { effectiveType?: string; rtt?: number };
      deviceMemory?: number;
    };
    nav.getBattery?.().then((b) => {
      battery = `${Math.round(b.level * 100)}%${b.charging ? "+" : ""}`;
    }).catch(() => {});

    const tick = () => {
      const now = new Date();
      const hk = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Hong_Kong",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      const up = Math.floor((performance.now() - start) / 1000);
      const mem = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
      const rows: { label: string; value: string }[] = [
        { label: "hkt", value: hk },
        { label: "uptime", value: `${pad(Math.floor(up / 3600))}:${pad(Math.floor((up % 3600) / 60))}:${pad(up % 60)}` },
        { label: "disp", value: `${window.innerWidth}x${window.innerHeight}@${window.devicePixelRatio}x` },
        { label: "cpu", value: `${navigator.hardwareConcurrency ?? "?"} cores` },
        { label: "heap", value: mem ? `${(mem.usedJSHeapSize / 1048576).toFixed(1)}M` : `${nav.deviceMemory ?? "?"}G ram` },
        { label: "net", value: navigator.onLine ? `online${nav.connection?.effectiveType ? ` ${nav.connection.effectiveType}` : ""}` : "offline" },
        { label: "pwr", value: battery },
        { label: "fps", value: String(fps || "--") },
      ];
      setStats(rows);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  return stats;
}

function SystemStatus() {
  const stats = useSystemStats();
  const theme = useTheme();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const rows = [
    { label: "path", value: path },
    { label: "theme", value: String(theme) },
    ...(stats ?? []),
  ];

  return (
    <div
      className="flex flex-wrap gap-x-5 gap-y-1 border-b border-border/40 pb-4 mb-4 font-mono text-[11px] tracking-[0.08em] uppercase"
      aria-hidden="true"
    >
      {rows.map((r) => (
        <span key={r.label} className="whitespace-nowrap">
          <span className="text-muted-foreground">{r.label}:</span>{" "}
          <span className="text-foreground tabular-nums">{r.value}</span>
        </span>
      ))}
    </div>
  );
}

export function SiteLayout({
  children,
  pathLabel,
  showHomeButton = true,
}: {
  children: ReactNode;
  pathLabel?: string;
  showHomeButton?: boolean;
}) {
  return (
    <div className="site-shell bg-background text-foreground">
      <header className="relative z-20">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          {showHomeButton ? (
            <Link
              to="/"
              className="home-button inline-flex h-8 w-8 items-center justify-center border border-border bg-paper text-[14px] text-foreground transition-colors hover:bg-foreground hover:text-on-ink"
              aria-label="Go home"
            >
              <span aria-hidden>⌂</span>
            </Link>
          ) : (
            <div className="h-8 w-8" aria-hidden="true" />
          )}

        </div>
      </header>

      <main className="relative z-10">{children}</main>

      <footer className="relative z-10 border-t border-border/70">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <SystemStatus />
          <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Heejae Cho · 조희재 · 曹僖材</span>
            <a href="mailto:hjchoaa@connect.ust.hk" className="transition-colors hover:text-foreground">
              hjchoaa@connect.ust.hk
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
