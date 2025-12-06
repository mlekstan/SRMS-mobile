import { useThemeModeWrapper } from "@/hooks/useThemeModeWrapper";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import { Modal, Portal, RadioButton } from "react-native-paper";

export function SelectThemeModal({ onClose }: { onClose: () => void }) {
  const { themeMode, setThemeMode } = useThemeModeWrapper()
  const { t } = useTranslationContext();

  return (
    <Portal>
      <Modal visible={true} onDismiss={() => onClose()} contentContainerStyle={{backgroundColor: 'white', padding: 15, marginHorizontal: 70}}>
        <RadioButton.Group value={themeMode} onValueChange={val => setThemeMode(val as typeof themeMode)}>     
          <RadioButton.Item label={ t("settings.theme.option.light") } value="light" mode="android" position="trailing" />
          <RadioButton.Item label={ t("settings.theme.option.dark") } value="dark" mode="android" position="trailing" />
          <RadioButton.Item label={ t("settings.theme.option.auto") } value={"auto"} mode="android" position="trailing" />
        </RadioButton.Group>
      </Modal>
    </Portal>
  );
}