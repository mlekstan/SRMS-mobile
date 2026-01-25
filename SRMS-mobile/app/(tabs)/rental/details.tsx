import { apiClient } from "@/api/apiClientInstance";
import { RentalSale } from "@/api/types";
import ErrorDialog from "@/components/ErrorDialog";
import { Loader } from "@/components/Loader";
import { RentalView } from "@/components/rental/details/RentalView";
import SelectPositionModal from "@/components/rental/details/SelectPositionModal";
import { useRentalTableData } from "@/components/rental/details/useRentalTableData";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Animated, StyleProp, ViewStyle } from "react-native";
import { Banner, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DetailsPage() {
  const { t } = useTranslationContext();
  const router = useRouter();
  const { barcode } = useLocalSearchParams<{ barcode: string }>();
  const { data, isFetching, isError, error } = useQuery({ 
    queryKey: ["rentalPositions", barcode], 
    queryFn: () => apiClient.makeRequest<RentalSale[]>("/rentalSales", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      searchParams: { barcode: barcode }
    }),
    enabled: !!barcode
  });
  const [showDialog, setShowDialog] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { tableData } = useRentalTableData();

  useEffect(() => {
    setShowDialog(false);
    setShowModal(false);
  }, [barcode]);

  useEffect(() => {
    if (isError) {
      setShowDialog(true);
    } 
  }, [isError]);

  useEffect(() => {
    if (tableData.length === 0) {
      setShowModal(true);
    }
  }, [tableData.length]);


  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      {
        (isFetching) && 
        <Loader />
      }

      {
        (showDialog && error) && 
        <ErrorDialog 
          messages={[error.message]}
          btnText={t("components.errorDialog.button")}
          onClose={() => {
            setShowDialog(false);
            router.back();
          }}
        />
      }

      {
        (showModal && data) && 
        <SelectPositionModal data={data} onClose={() => setShowModal(false)} />
      }

      {
        (tableData.length > 0) && 
        <>
          <BarcodeInfoBanner />
          <RentalView />       
        </>
      }
    </SafeAreaView>
  );
}

function BarcodeInfoBanner({ style }: { style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>> }) {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();
  const { t } = useTranslationContext();

  return (
    <Banner
      style={style}
      visible={true}
      actions={[
        {
          label: t("rental.details.banner.button.details"),
          onPress: () => {},
        }
      ]}
      icon="barcode-scan"
    >
      <Text variant="bodyMedium">{ `${t("rental.details.banner.message")}: ` }</Text>
      <Text variant="titleSmall">{ barcode }</Text>
    </Banner>
  );
}