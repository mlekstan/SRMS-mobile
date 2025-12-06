import { en } from "@/constants/langs/en";

type MakePrefix<K extends string, T extends string> = `${K}.${T}`;

export type Leaves<T> =
  T extends readonly any[] 
    ? never
    : T extends object
      ? {
          [K in keyof T & string]:
            T[K] extends readonly any[]
              ? K
              : T[K] extends object
                ? MakePrefix<K, Leaves<T[K]>>
                : K
        }[keyof T & string]
      : never;

export type LangDictType = typeof en;
export type LangKeys = Leaves<LangDictType>;
export type LangCodes = "pl" | "en";