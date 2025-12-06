import { ThemeModeContext } from "@/contexts/ThemeModeContext"
import { use } from "react";

export function useThemeMode() {
  const themeMode = use(ThemeModeContext);

  return themeMode;
}