import { useTranslationContext } from "@/hooks/useTranslationContext";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme } from "react-native-paper";


export function CameraBox() {
  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslationContext();
  const [permission, requestPermission] = useCameraPermissions();
  const [scannerActive, setScannerActive] = useState(false);
  const [boundingBox, setBoundingBox] = useState({ origin: { x: 0, y: 0 }, size: { height: 0, width: 0 }});


  useEffect(() => {
    if (permission && !permission.granted) {
      // Camera permissions are not granted yet.
      requestPermission();
  }
  }, [permission])

  // if (!permission) {
  //   // Camera permissions are still loading.
  //   return <Loader />
  // }

  return (
    <View>
      <View>
        <CameraView 
          style={[styles.camera, { borderRadius: 20 }]} 
          facing={"back"}
          barcodeScannerSettings={{
            barcodeTypes: ["ean13"]
          }}
          onBarcodeScanned={(barcode) => {
            if (scannerActive && barcode.type === "ean13") {
              setBoundingBox(barcode.bounds);
              // setScannerActive(false);
              // router.navigate({ pathname: "/(tabs)/rental/details", params: { barcode: barcode.data } })
            }
          }}
        />

        {
          (scannerActive) &&
          <View style={{ 
            position: "absolute", 
            borderWidth: 2,  
            borderColor: "red", 
            top: boundingBox.origin.x - boundingBox.size.width, 
            left: 280 - boundingBox.origin.y - boundingBox.size.height,
            height: boundingBox.size.width,
            width: boundingBox.size.height, 
          }}>
          </View>
        }
      </View>

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
  camera: {
    height: 280,
    width: 280,
  },
  button: {
    marginTop: 20
  },
});