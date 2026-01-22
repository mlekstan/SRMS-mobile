import { apiClient } from "@/api/apiClientInstance";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import ErrorDialog from "./ErrorDialog";
import { Loader } from "./Loader";
import { ScannerBox } from "./ScannerBox";



export function ReturnScannerView() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [scannerActive, setScannerActive] = useState(false);
  const { accessToken } = useAuthContext();
  const mutation = useMutation({
    mutationFn: (value: any) => apiClient.makeRequest("rentalSales/rentedItems/return", {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${accessToken}`
      }, 
      body: value
    })
  });


  return (
    <View>
      <ScannerBox 
        active={scannerActive}
        afterScan={async (barcode) => {
          await mutation.mutateAsync({ barcode });
          setScannerActive(false);
          mutation.reset();
        }}
        barcodeTypes={["ean8"]}
        dims={{ height: 280, width: 280 }}
      />

      <Button 
        mode={(!scannerActive) ? "outlined" : "contained"}
        style={[styles.button]}
        onPress={() => setScannerActive(prev => !prev)}
      >
        {
          (!scannerActive) ?
          t("return.scannerOn") :
          t("return.scannerOff")
        }
      </Button>

      {
        (mutation.isPending) && 
        <Loader />
      }

      {
        (mutation.isError && mutation.error) && 
        <ErrorDialog
          messages={[mutation.error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => {
            mutation.reset();
            setScannerActive(false);
          }}
        />
      }

    </View>
  );
}


const styles = StyleSheet.create({
  cameraWrapper: {
    position: "relative",
  },
  button: {
    marginTop: 20
  },
});