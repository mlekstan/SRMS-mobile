import { useThemeMode } from "./useThemeMode";

export function useThemeModeWrapper() {
  const { themeMode, setThemeMode } = useThemeMode();

  const mode = themeMode ?? "auto"

  return { 
    themeMode: mode as typeof mode, 
    setThemeMode: (newMode: typeof mode) => setThemeMode((newMode === "auto") ? null : newMode)
  }
}