import { RentalSale } from "@/api/types";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useRouter } from "expo-router";
import { memo, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, Modal, Portal, RadioButton, Text } from "react-native-paper";
import { useRentalTableData } from "./useRentalTableData";


function SelectPositionModal({ data, onClose }: { data: RentalSale[], onClose: () => void }) {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { setRawData } = useRentalTableData();
  const [positionId, setPositionId] = useState((data.length !== 0) ? data[0].id : null)
  const rentalSalePosition = data.find(p => p.id === positionId);

  return (
    <Portal>
      <Modal dismissable={false} visible={true} contentContainerStyle={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 15 ,marginHorizontal: 30, maxHeight: 400 }}>
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>{ t("rental.details.modal.title") }</Text>
        <ScrollView style={{ marginVertical: 20 }}>
          {
            (positionId) && 
            <RadioButton.Group value={String(positionId)} onValueChange={val => setPositionId(Number(val))}>     
              {
                data.map(p => {
                  const date = new Date(p.saleDate);
                  const plDate = `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString("pl-PL")}`

                  return (
                    <View key={p.id}>
                      <RadioButton.Item label={plDate} value={String(p.id)} mode="android" position="trailing"/>
                      <Divider />
                    </View>
                  );
                })
              }
            </RadioButton.Group>
          }

          {
            (!positionId) && 
            <Text>{ t("rental.details.modal.info") }</Text>
          }
        </ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button
            disabled={!rentalSalePosition}
            onPress={() => {
              if (rentalSalePosition) 
                setRawData(rentalSalePosition);
              onClose();
            }}
          >
            { t("rental.details.modal.button.confirm") }
          </Button>

          <Button
            onPress={() => {
              onClose();
              router.back();
            }}
          >
            { t("rental.details.modal.button.cancel") }
          </Button>
        </View>
      </Modal>
    </Portal>
  );
}

export default memo(SelectPositionModal);