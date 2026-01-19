import { useTranslationContext } from "@/hooks/useTranslationContext";
import { router, Stack } from "expo-router";
import { IconButton, useTheme } from "react-native-paper";


export function MoreStack() {
  const theme = useTheme();
  const { t } = useTranslationContext();

  return (
    <Stack>
      <Stack.Screen 
        name="settings"
        options={{
          headerTitle: t("settings.header"),
          headerTitleStyle: {
            color: theme.colors.onPrimary
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <IconButton 
              icon="arrow-left"
              mode="contained"
              style={{ borderRadius: theme.roundness }}
              onPress={() => router.back()}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
        }}
      />

      <Stack.Screen 
        name="profile"
        options={{
          headerTitle: t("profile.header"),
          headerTitleStyle: {
            color: theme.colors.onPrimary
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <IconButton 
              icon="arrow-left"
              mode="contained"
              style={{ borderRadius: theme.roundness }}
              onPress={() => router.back()}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary
          }
        }}
      />

      <Stack.Screen 
        name="about"
        options={{
          headerTitle: t("about.header"),
          headerTitleStyle: {
            color: theme.colors.onPrimary
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <IconButton 
              icon="arrow-left"
              mode="contained"
              style={{ borderRadius: theme.roundness }}
              onPress={() => router.back()}
            />
          ),
          headerStyle: {
            backgroundColor: theme.colors.primary
          }
        }}
      />
    </Stack>
  );

}


export default function MoreLayout() {
  
  return (
    <MoreStack />
  );
}