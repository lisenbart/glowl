export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "glowl-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function initTheme() {
  applyTheme(getStoredTheme());
}
