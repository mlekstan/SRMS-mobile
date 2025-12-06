import { useTranslationContext } from "@/hooks/useTranslationContext";
import { LangCodes } from "@/types/lang-types";
import { Modal, Portal, RadioButton } from "react-native-paper";

export function SelectLangModal({ onClose }: { onClose: () => void }) {
  const { t, lang, setLang } = useTranslationContext();
  
  return (
    <Portal>
      <Modal visible={true} onDismiss={() => onClose()} contentContainerStyle={{backgroundColor: 'white', padding: 15, marginHorizontal: 70}}>
        <RadioButton.Group value={lang} onValueChange={val => setLang(val as LangCodes)}>     
          <RadioButton.Item label={ t("settings.lang.option.pl") } value="pl" mode="android" position="trailing" />
          <RadioButton.Item label={ t("settings.lang.option.en") } value="en" mode="android" position="trailing" />
        </RadioButton.Group>
      </Modal>
    </Portal>
  ); 
}