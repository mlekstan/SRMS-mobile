import { BarcodeScanningResult, BarcodeType, CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const barcodesRef = useRef<string[]>([]);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraKey, setIsCameraKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setScanned(false);
      setIsCameraReady(false);
      setIsCameraKey(prev => prev + 1);
      barcodesRef.current = [];

      const timer = setTimeout(() => {
        setIsCameraReady(true);
      }, 100);

      return () => {
        clearTimeout(timer);
        setIsCameraReady(false)
      }
    }, [])
  );

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  useEffect(() => {
    setScanned(false);
    setBoundingBox({ origin: { x: 0, y: 0 }, size: { height: 0, width: 0 } });
    barcodesRef.current = [];
  }, [active]);


  const handleBarcodeScanned = useCallback((barcode: BarcodeScanningResult) => {
    if (barcodeTypes.includes(barcode.type as BarcodeType)) {
      if (barcodesRef.current.length < 10) {
        barcodesRef.current.push(barcode.data);
      } else {
        const [barcodeData, count] = calculateMode(barcodesRef.current);
        setScanned(true);
        afterScan(barcodeData);
        barcodesRef.current = [];
      }
      
      setBoundingBox(barcode.bounds);
    }
  }, [barcodeTypes, barcodesRef.current]);

  return (
    <View>
      <CameraView 
        key={cameraKey}
        style={{ height: dims.height, width: dims.width, borderRadius: 20 }} 
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: barcodeTypes
        }}
        onBarcodeScanned={
          (isCameraReady && active && !scanned) ? 
          handleBarcodeScanned : 
          undefined
        }
        onCameraReady={() => setIsCameraReady(true)}
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


function calculateMode(array: string[]) {
  let freqMap: Record<string, number> = {};

  array.forEach(e => {
    freqMap[e] = (freqMap[e] || 0) + 1;
  });

  let maxKeyValue: [string, number] = ["", 0];
  Object.entries(freqMap).forEach(e => {
    if (e[1] > maxKeyValue[1]) {
      maxKeyValue = e;
    }
  });

  return maxKeyValue;
}