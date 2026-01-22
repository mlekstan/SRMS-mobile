import { apiClient } from "@/api/apiClientInstance";
import { Item } from "@/api/types";
import ErrorDialog from "@/components/ErrorDialog";
import { Loader } from "@/components/Loader";
import { useRentalTableData } from "@/components/rental/details/useRentalTableData";
import { ScannerBox } from "@/components/ScannerBox";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";


export default function ScanItemPage() {
  const router = useRouter();
  const { t } = useTranslationContext();
  const [barcode, setBarcode] = useState<string | null>(null);
  const { rowId, subcategoryId } = useLocalSearchParams<{ rowId: string, subcategoryId: string }>();
  const { tableData, setItemToRow } = useRentalTableData();
  const [error, setError] = useState<Error | null>(null);

  const { data, isSuccess, isFetching, isError, error: qError } = useQuery({ 
    queryKey: ["item", { barcode, free: "true" }], 
    queryFn: () => (
      apiClient.makeRequest<Item>(`/items/barcode/${barcode}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
        searchParams: { subcategoryId, free: "true" }
      })
    ),
    enabled: !!barcode,
  });

  useEffect(() => {
    setError(qError);
  }, [qError])

  useEffect(() => {
    if (barcode !== null && isSuccess && data) {
      const idx = tableData.findIndex(p => p.item?.id === data.id);
      if (idx < 0) {
        setItemToRow({[rowId]: data});
        router.back();
      }
      else {
        const error = new Error("This barcode is already assigned to other row");
        setError(error);
      }
    }
  }, [barcode, isSuccess, data, tableData]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {
        (!isFetching && !error) &&
        <ScannerBox
          active={!isError}
          afterScan={barcode => setBarcode(barcode)}
          barcodeTypes={["ean8"]}
          dims={{ height: 280, width: 280 }}
        />
      }

      {
        (isFetching) && 
        <Loader />
      }

      {
        (error) &&
        <ErrorDialog
          messages={[error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => router.back()}
        />
      }
    </SafeAreaView>
  );
}