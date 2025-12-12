import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { Button, Divider, List, Modal, Portal } from "react-native-paper";
import { RentalTableDataType } from "./rentalTableDataAdapter";

type Props = {
  data: RentalTableDataType;
  onClose: () => void;
}

export function RowDataModal({ data, onClose }: Props) {
  const router = useRouter();
  const { t } = useTranslationContext();
  const itemsList = useItemsList(data);

  return (
    <Portal>
      <Modal visible={true} onDismiss={onClose} contentContainerStyle={{ backgroundColor: 'white', padding: 15, marginHorizontal: 50, marginVertical: 200, flex: 1 }}>
        <ScrollView>
          {
            itemsList.map((item, idx) => (
              <View key={idx}>
                <List.Item 
                  title={item.title}
                  description={item.description}
                  style={{ paddingVertical: 2}}
                />
                <Divider />
              </View>
            ))
          }
        </ScrollView>
        <Button
          style={{ marginTop: 15}}
          mode="text"
          onPress={() => {
            onClose();
            router.navigate({ 
              pathname: "/(tabs)/rental/scan-item", 
              params: { rowId: data.rowId, subcategoryId: data.subcategoryId } 
            });
          }}
        >
          {
            t("rental.details.button.scan")
          }
        </Button>
      </Modal>
    </Portal>
  );
}


function useItemsList(data: RentalTableDataType) {
  const { t } = useTranslationContext();
  const itemsList = useMemo(() => (
    [
      {
        title: t("rental.details.table.column.name"),
        description: data.name
      },
      {
        title: t("rental.details.table.column.barcode"),
        description: data.item?.barcode ?? " "
      },
      {
        title: t("rental.details.table.columns.charge"),
        description: data.charge
      },
      {
        title: t("rental.details.table.columns.time"),
        description: data.rentalLength.minutes
      }, 
    ]
  ), [data]);

  return itemsList;
}