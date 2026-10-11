import { useSyncExternalStore } from "react";

export const THEMES = [
  { id: "bios", label: "BIOS" },
  { id: "orange", label: "Amber CRT" },
  { id: "green", label: "Green CRT" },
  { id: "white", label: "White CRT" },
  { id: "macintosh", label: "Macintosh" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const STORAGE_KEY = "site-theme";
const DEFAULT_THEME: ThemeId = "bios";
const listeners = new Set<() => void>();

// Runs in <head> before first paint so the saved theme never flashes.
export const themeInitScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t&&${JSON.stringify(
  THEMES.map((theme) => theme.id),
)}.indexOf(t)>-1)document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value);
}

function getSnapshot(): ThemeId {
  const current = document.documentElement.getAttribute("data-theme");
  return isThemeId(current) ? current : DEFAULT_THEME;
}

export function setTheme(theme: ThemeId) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode); the theme still applies for this session.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useTheme(): ThemeId {
  return useSyncExternalStore(subscribe, getSnapshot, () => DEFAULT_THEME);
}

export function readCssVar(name: string, fallback: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}
