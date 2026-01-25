import { apiClient } from "@/api/apiClientInstance";
import { RentedItem } from "@/api/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { View } from "react-native";
import { Button, Divider, List, Modal, Portal, useTheme } from "react-native-paper";

type Props = {
  data: RentedItem;
  onClose: () => void;
}

export function ReturnInfoModal({ data, onClose }: Props) {
  const { accessToken } = useAuthContext();
  const { t } = useTranslationContext();
  const list = useList(data);
  const theme = useTheme();

  const mutation = useMutation({
    mutationFn: (value: any) => apiClient.makeRequest<RentedItem>("rentalSales/rentedItems/return", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${accessToken}`
      }, 
      body: value
    }), 
    mutationKey: ["return"]
  });


  return (
    <Portal>
      <Modal dismissable={false} visible={true} contentContainerStyle={{ backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 15 ,marginHorizontal: 30, maxHeight: 400 }}>
        <View>
          {
            list.map((info, idx) => {
              return (
                <View key={idx}>
                  <List.Item 
                    title={info.title}
                    description={info.value}
                    descriptionStyle={
                      (info.title === t("return.modal.leftTime") && info.value.startsWith("-")) ? 
                      { color: theme.colors.error } : 
                      undefined
                    }
                    style={{ paddingVertical: 2 }}
                  />
                  <Divider />
                </View>
              )
            })         
          }

          <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginTop: 20 }}>
            <Button
              onPress={async () => {
                onClose();
                await mutation.mutateAsync({ barcode: data.item.barcode });
              }}
            >
              { t("return.modal.button.return") }
            </Button>

            <Button
              onPress={() => {
                onClose();
              }}
            >
              { t("return.modal.button.cancel") }
            </Button>
          </View>
        </View>
      </Modal>      
    </Portal>
  );
}


function useList(data: RentedItem) {
  const { t } = useTranslationContext();
  
  const list = useMemo(() => {
    return [
      { title: t("return.modal.barcode"), value: data.item.barcode }, 
      { title: t("return.modal.name"), value: data.item.name }, 
      { title: t("return.modal.start"), value: (new Date(data.start)).toLocaleString() }, 
      { title: t("return.modal.endPredicted"), value: (new Date(data.endPredicted)).toLocaleString() }, 
      { title: t("return.modal.leftTime"), value: data.leftTime }
    ];
  }, [data]);

  return list;
}