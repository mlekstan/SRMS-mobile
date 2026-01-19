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
  const { setItemToRow } = useRentalTableData();

  const { data, isSuccess, isFetching, isError, error } = useQuery({ 
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
    retry: false,
    staleTime: 0,
    gcTime:0,
  });

  useEffect(() => {
    if (barcode !== null && isSuccess && data) {
      setItemToRow({[rowId]: data});
      router.back();
    }
  }, [barcode, isSuccess, data]);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {
        (!isFetching && !isError) &&
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
        (isError && error) &&
        <ErrorDialog
          messages={[error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => router.back()}
        />
      }
    </SafeAreaView>
  );
}