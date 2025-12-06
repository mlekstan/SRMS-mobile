import { darkThemeColors } from "@/constants/themes/darkThemeColors";
import { lightThemeColors } from "@/constants/themes/lightThemeColors";
import { ThemeModeContext, ThemeModeType } from "@/contexts/ThemeModeContext";
import { PropsWithChildren, useMemo, useState } from "react";
import { useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import {
    MD3DarkTheme as DarkTheme,
    MD3LightTheme as LightTheme,
} from "react-native-paper";


type ThemeType = typeof LightTheme;

export function ThemeModeProvider({ children }: PropsWithChildren) {
  const [appMode, setAppMode] = useState<ThemeModeType>(null); // mode in which app is: "light", "dark", "auto"
  const systemThemeMode = useColorScheme(); // theme mode in which system is: "light", "dark", null
  const appThemeMode = (appMode) ? appMode : systemThemeMode ?? "light";

  const appTheme = useMemo(() => {
    const theme: ThemeType = (appThemeMode === "light") 
      ? {
          ...LightTheme,
          roundness: 2,
          ...lightThemeColors
        }
      : {
          ...DarkTheme,
          roundness: 2,
          ...darkThemeColors
        };

    return theme;
  }, [appThemeMode]);

  return (
    <ThemeModeContext.Provider 
      value={{
        themeMode: appMode,
        setThemeMode: (mode) => setAppMode(mode),
      }} 
    >
      <PaperProvider theme={appTheme} >
        { children }
      </PaperProvider>
    </ThemeModeContext.Provider>
  );
}