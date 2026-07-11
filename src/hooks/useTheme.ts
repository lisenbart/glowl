import { useCallback, useState } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  const setThemeMode = useCallback((next: Theme) => {
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeMode(theme === "dark" ? "light" : "dark");
  }, [theme, setThemeMode]);

  return { theme, setThemeMode, toggleTheme };
}
