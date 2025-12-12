import { RentalView } from "@/components/rental/details/RentalView";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { useLocalSearchParams } from "expo-router";
import { Animated, StyleProp, ViewStyle } from "react-native";
import { Banner, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";


export default function DetailsPage() {

  return (
    <SafeAreaView edges={["left", "right"]} style={{ flex: 1 }}>
      <BarcodeInfoBanner />
      <RentalView />
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