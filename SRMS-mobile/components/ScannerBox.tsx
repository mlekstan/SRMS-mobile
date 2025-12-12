import { BarcodeType, CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { View } from "react-native";

type Props = {
  active: boolean;
  afterScan: (barcode: string) => void;
  barcodeTypes: BarcodeType[];
  dims: { height: number, width: number };
}


export function ScannerBox({ active, afterScan, barcodeTypes, dims }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [boundingBox, setBoundingBox] = useState({ origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } });

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
  }
  }, [permission]);

  useEffect(() => {
    if (active) {
      setScanned(false);
      setBoundingBox({ origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } });
    }
  }, [active])

  return (
    <View>
      <CameraView 
        style={{ height: dims.height, width: dims.width, borderRadius: 20 }} 
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: barcodeTypes
        }}
        onBarcodeScanned={(barcode) => {
          if (active && !scanned && barcodeTypes.includes(barcode.type as BarcodeType)) {
            setScanned(true);
            setBoundingBox(barcode.bounds);
            afterScan(barcode.data);
          }
        }}
      />

      {
        (boundingBox.origin.x !== 0 && boundingBox.origin.y !== 0) &&
        <View style={{ 
          position: "absolute", 
          borderWidth: 2,  
          borderColor: "red", 
          top: boundingBox.origin.x - 50, 
          left: dims.width - boundingBox.origin.y - boundingBox.size.height,
          height: boundingBox.size.width,
          width: boundingBox.size.height, 
        }}>
        </View>
      }
    </View>
  );
}