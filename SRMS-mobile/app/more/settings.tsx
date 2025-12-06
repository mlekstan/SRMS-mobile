import { SelectLangModal } from "@/components/settings/SelectLangModal";
import { SelectThemeModal } from "@/components/settings/SelectThemeModal";
import SettingsList from "@/components/settings/SettingsList";
import { useThemeMode } from "@/hooks/useThemeMode";
import { useTranslationContext } from "@/hooks/useTranslationContext";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Modals = "theme" | "lang" | null;


function renderModal(activeModal: Modals, setActiveMode: (m: Modals) => void) {
  if (activeModal === "theme")
    return <SelectThemeModal onClose={() => setActiveMode(null)} />
  if (activeModal === "lang")
    return <SelectLangModal onClose={() => setActiveMode(null)} />
  return null;
}


export default function SettingsPage() {
  const { themeMode } = useThemeMode();
  const { t, lang } = useTranslationContext();
  const [activeModal, setActiveModal] = useState<Modals>(null);

  const settingsList = useMemo(() => (
    [
      {
        title: t("settings.theme.title"),
        icon: () => {
          if (themeMode === "light")
            return "white-balance-sunny";
          if (themeMode === "dark")
            return "moon-waning-crescent";
          return "theme-light-dark";
        },
        decription: () => {
          if (themeMode === "light")
            return t("settings.theme.option.light");
          if (themeMode === "dark")
            return t("settings.theme.option.dark");
          return t("settings.theme.option.auto");       
        },
        onPress: () => setActiveModal("theme")
      },
      {
        title: t("settings.lang.title"),
        icon: () => "translate",
        decription: () => {
          if (lang === "pl")
            return t("settings.lang.option.pl");
          if (lang === "en")
            return t("settings.lang.option.en");
          return t("settings.lang.option.pl");
        },
        onPress: () => setActiveModal("lang")
      }
    ]
  ), [themeMode, lang]);


  return (
    <SafeAreaView>
      <SettingsList settingsList={settingsList} />
      { renderModal(activeModal, setActiveModal) }
    </SafeAreaView>
  );
}