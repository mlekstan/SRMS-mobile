import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Surface } from "react-native-paper";
import { RentalTable } from "./RentalTable/RentalTable";
import { useRentalTableData } from "./useRentalTableData";


export function RentalView() {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { itemsToRows, tableData, isFull, reset } = useRentalTableData();

  console.log(itemsToRows.length, tableData.length, isFull)

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Surface style={{ flex: 1, marginBottom: 25 }}>
        <RentalTable />
      </Surface>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="outlined"
          disabled={!isFull}
          onPress={() => {
            reset();
            router.replace("/(tabs)/rental");
          }}
        >
          { t("rental.details.button.start") }
        </Button>
        <Button
          mode="outlined"
          onPress={() => {
            reset();
            router.dismissAll();
          }}
        >
          { t("rental.details.button.cancel") }
        </Button>
      </View>
    </View> 
  );
}