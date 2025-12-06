import { createContext } from "react";

export type ThemeModeType = "light" | "dark" | null;

type ThemeModeContextType = {
  themeMode: ThemeModeType;
  setThemeMode: (mode: ThemeModeType) => void;
}

export const ThemeModeContext = createContext<ThemeModeContextType>({
  themeMode: null,
  setThemeMode: () => null,
})