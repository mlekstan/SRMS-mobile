import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeModeProvider } from "@/providers/ThemeModeProvider";
import TranslationContextProvider from "@/providers/TranslationContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { Text, useTheme } from "react-native-paper";

function RootNavigator() {
  const theme = useTheme();
  const { t } = useTranslationContext();
  const { isAuthenticated } = useAuthContext();

  return (
    <Stack>
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen 
          name="login"
          options={{
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
            headerTitleAlign: "center",
            headerTitle: () => (
              <Text 
                variant="headlineMedium"
                style={{ color: theme.colors.onPrimary }}
              >
                { t("login.header") }
              </Text>
            ),
          }}
        />
      </Stack.Protected>


      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="more"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
}


const queryClient = new QueryClient();

export default function RootLayout() {

  return (
    <ThemeModeProvider>
      <QueryClientProvider client={queryClient}>
        <TranslationContextProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </TranslationContextProvider>
      </QueryClientProvider>
    </ThemeModeProvider>
  );
}