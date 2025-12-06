import { useTranslationContext } from "@/hooks/useTranslationContext";
import { Stack, useRouter } from "expo-router";
import { useTheme } from "react-native-paper";


export default function RentalLayout() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslationContext();

  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{ headerShown: false }}
      />

      <Stack.Screen 
        name="details"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}