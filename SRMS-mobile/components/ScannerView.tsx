import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { ScannerBox } from "./ScannerBox";


export function ScannerView() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [scannerActive, setScannerActive] = useState(false);


  return (
    <View>
      <ScannerBox 
        active={scannerActive}
        afterScan={(barcode) => router.navigate({ pathname: "/(tabs)/rental/details", params: { barcode } })}
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
          t("rental.scannerOn") :
          t("rental.scannerOff")
        }
      </Button>
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