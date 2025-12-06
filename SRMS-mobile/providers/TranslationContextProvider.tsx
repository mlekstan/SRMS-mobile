import { memo, useCallback, useState, type ReactNode } from "react";
import { pl } from "@/constants/langs/pl";
import { en } from "@/constants/langs/en";
import { TranslationContext } from "@/contexts/TranslationContext";
import { LangCodes, LangKeys } from "@/types/lang-types";



function isKeyOfDict<T extends Record<string, unknown>>(val: string, dict: T): val is (keyof T & string) {
  return typeof val === "string" && val in dict;
}


function pickTranslation(key: string, dict: Record<string, unknown>): string | never {
  
  if (key.startsWith(".") || key.endsWith(".")) {
    throw new Error(`Key ${key} is invalid.`);
  }
  
  if (isKeyOfDict(key, dict) && typeof dict[key] === "string") {
    return dict[key];
  } 
  
  const keys = key.split(".");
  let temp: any = dict;

  let idx = 0
  for (let k of keys) {        
    const rest_k = keys.slice(idx+1).join(".");

    if (!isKeyOfDict(k, temp)) {
      throw new Error (`${k} is not valid part of key.`);
    }

    if (typeof temp[k] === "string") {
      if (idx === keys.length - 1) {
        return temp[k];
      } else {
        throw new Error(`Part ${k} of key ${key} returns string.`);
      }
    }

    if (rest_k && isKeyOfDict(rest_k, temp[k]) && typeof temp[k][rest_k] === "string") {
      return temp[k][rest_k];
    }

    if (rest_k && typeof temp[k] === "object" && temp[k] !== null) {
      temp = temp[k];
    } else {
      throw new Error(`Part ${k} of key ${key} does not return object.`);
    }
    
    idx++;
  }

  if (typeof temp === "string") {
    return temp;
  }
  
  throw new Error (`${temp} is not a string.`); 
}


function formatTranslation(translation: string, replacemnts: Record<string, string>): string {
  
  const formattedTranslation = Object.keys(replacemnts).reduce((prevVal, currVal) => {
    return prevVal.replaceAll(`{{${currVal}}}`, replacemnts[currVal]);
  }, translation);

  return formattedTranslation;
}



function TranslationProvider({ children }: { children: ReactNode}) {
  const [lang, setLang] = useState<LangCodes>("pl");
  const dict = (lang === "en") ? en : pl;
  
  const t = useCallback(function (key: LangKeys, replacemnts?: Record<string, string>): string | never {
    let translation = pickTranslation(key, dict);
    
    if (replacemnts) {
      translation = formatTranslation(translation, replacemnts);
    }
    
    return translation;
  }, [dict]);
  

  return (
    <TranslationContext.Provider 
      value={{
        t: t,
        setLang: (langCode) => setLang(() => langCode),
        lang: lang
      }}
    >
      {children}
    </TranslationContext.Provider>

  );
}

export default memo(TranslationProvider);