import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

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
              className="home-button inline-flex h-8 w-8 items-center justify-center border border-border bg-white text-[14px] text-foreground transition-colors hover:bg-foreground hover:text-white"
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
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Heejae Cho · 조희재 · 曹僖材</span>
          <a href="mailto:hjchoaa@connect.ust.hk" className="transition-colors hover:text-foreground">
            hjchoaa@connect.ust.hk
          </a>
        </div>
      </footer>
    </div>
  );
}
