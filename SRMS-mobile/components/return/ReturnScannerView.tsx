import { apiClient } from "@/api/apiClientInstance";
import { RentedItem } from "@/api/types";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useIsMutating, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import ErrorDialog from "../ErrorDialog";
import { Loader } from "../Loader";
import { ScannerBox } from "../ScannerBox";
import { ReturnInfoModal } from "./ReturnInfoModal";


export function ReturnScannerView() {
  const { t } = useTranslationContext();
  const [scannerActive, setScannerActive] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const { accessToken } = useAuthContext();

  const { isSuccess, data, isFetching, isError, error } = useQuery({
    queryFn: () => apiClient.makeRequest<RentedItem>(`rentalSales/rentedItems/return/${barcode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", 
        "Authorization": `Bearer ${accessToken}`                
      }
    }), 
    queryKey: ["return", barcode], 
    enabled: !!barcode, 
    gcTime: 0
  });

  const isMutating = useIsMutating({ mutationKey: ["return"], exact: true });

  return (
    <View>
      {
        (!barcode) && 
        <View>
          <ScannerBox 
            active={scannerActive}
            afterScan={async (barcode) => {
              setBarcode(barcode);
              setScannerActive(false);
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
        </View>
      }

      {
        (isFetching || isMutating > 0) && 
        <Loader />
      }

      {
        (barcode && isSuccess && data) && 
        <ReturnInfoModal 
          data={data} 
          onClose={() => {
            setBarcode(null);
            setScannerActive(false);
          }}
        />
      }

      {
        (barcode && isError && error) && 
        <ErrorDialog 
          messages={[error.message]}
          btnText=""
          onClose={() => {
            setBarcode(null);
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