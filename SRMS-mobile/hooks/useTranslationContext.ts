import { TranslationContext } from "@/contexts/TranslationContext";
import { useContext } from "react";


export function useTranslationContext() {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("There is no value passed to Provider");
  }

  return context;
}