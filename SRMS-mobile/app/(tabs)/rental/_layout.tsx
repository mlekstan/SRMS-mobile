import { RentalTableDataProvider } from "@/components/rental/details/RentalTableDataProvider";
import { Stack } from "expo-router";


export default function RentalLayout() {

  return (
    <RentalTableDataProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen 
          name="details"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="scan-item"
          options={{ headerShown: false }}
        />
      </Stack>
    </RentalTableDataProvider>
  );
}