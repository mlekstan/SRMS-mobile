import { RentalTable } from "@/components/RentalTable";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Banner, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DetailsPage() {
  const { barcode } = useLocalSearchParams<{ barcode: string }>();

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <BarcodeInfoBanner barcode={barcode} />
      <RentalTable />
    </SafeAreaView>
  );

}

function BarcodeInfoBanner({ barcode }: { barcode: string }) {
  const { t } = useTranslationContext();
  const [visible, setVisible] = useState(true);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: t("rental.banner.button"),
          onPress: () => setVisible(false),
        }
      ]}
      icon="barcode-scan"
    >
      <Text variant="bodyMedium">{ `${t("rental.banner.message")}: ` }</Text>
      <Text variant="titleSmall">{ barcode }</Text>
    </Banner>
  );
}