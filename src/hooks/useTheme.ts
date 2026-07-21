import { useCallback } from "react";
import { applyTheme, type Theme } from "@/lib/theme";

/** Light-only site — theme never changes. */
export function useTheme() {
  const setThemeMode = useCallback((_next?: Theme) => {
    applyTheme("light");
  }, []);

  return {
    theme: "light" as const,
    setThemeMode,
    toggleTheme: () => applyTheme("light"),
  };
}
