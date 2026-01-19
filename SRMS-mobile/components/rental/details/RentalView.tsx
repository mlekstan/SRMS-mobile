import { apiClient } from "@/api/apiClientInstance";
import ErrorDialog from "@/components/ErrorDialog";
import { Loader } from "@/components/Loader";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Surface } from "react-native-paper";
import { RentalTable } from "./RentalTable/RentalTable";
import { useRentalTableData } from "./useRentalTableData";


export function RentalView() {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { itemsToRows, tableData, isFull, reset } = useRentalTableData();
  const { accessToken } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (value: any) => apiClient.makeRequest("/rentalSales/rentedItems", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${accessToken}`,
      }, 
      body: value
    })
  });

  console.log(tableData)

  return (
    <View style={{ flex: 1, padding: 25 }}>
      <Surface style={{ flex: 1, marginBottom: 25 }}>
        <RentalTable />
      </Surface>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          mode="outlined"
          disabled={!isFull}
          onPress={async () => {
            await mutation.mutateAsync({
              positions: tableData.map(d => ({
                rentalSalePositionId: d.positionId, 
                itemId: d.item?.id, 
              }))
            });
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

      {
        (mutation.isPending) && 
        <Loader />
      }

      {
        (mutation.isError && mutation.error) && 
        <ErrorDialog
          messages={[mutation.error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => mutation.reset()}
        />
      }
    </View> 
  );
}