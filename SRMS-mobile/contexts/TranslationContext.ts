import { createContext } from "react";
import { LangCodes, LangKeys } from "@/types/lang-types";


export const TranslationContext = createContext<
  { 
    t: ((key: LangKeys, replacements?: Record<string, string>) => string), 
    setLang: (langCode: LangCodes) => void,
    lang: LangCodes
  } | null
>(null);