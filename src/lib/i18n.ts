import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import frMessages from "@/locales/fr.json";
import deMessages from "@/locales/de.json";
import arMessages from "@/locales/ar.json";
import hiMessages from "@/locales/hi.json";
import zhMessages from "@/locales/zh.json";
import guMessages from "@/locales/gu.json";

export type Locale = "en" | "es" | "fr" | "de" | "ar" | "hi" | "zh" | "gu";
export type Messages = typeof enMessages;

/** Metadata for each supported locale */
export const LOCALES: Record<
  Locale,
  {
    code: Locale;
    name: string;
    nativeName: string;
    flag: string;
    dir: "ltr" | "rtl";
    htmlLang: string;
  }
> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    dir: "ltr",
    htmlLang: "en",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    dir: "ltr",
    htmlLang: "es",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    dir: "ltr",
    htmlLang: "fr",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    dir: "ltr",
    htmlLang: "de",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    dir: "rtl",
    htmlLang: "ar",
  },
  hi: {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    flag: "🇮🇳",
    dir: "ltr",
    htmlLang: "hi",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    dir: "ltr",
    htmlLang: "zh-Hans",
  },
  gu: {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
    dir: "ltr",
    htmlLang: "gu-IN",
  },
};

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

/* -------------------------------------------------------------------------- */
/*                        Deep merge with English fallback                    */
/* -------------------------------------------------------------------------- */

type AnyObject = Record<string, unknown>;

function isPlainObject(v: unknown): v is AnyObject {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Deep merge `src` onto `base`. `src` wins; undefined keys in `src` inherit from `base`. */
function deepMerge<T>(base: T, src: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(src)) {
    return (src ?? base) as T;
  }
  const out: AnyObject = { ...(base as AnyObject) };
  for (const key of Object.keys(src)) {
    const baseVal = (base as AnyObject)[key];
    const srcVal = (src as AnyObject)[key];
    if (isPlainObject(baseVal) && isPlainObject(srcVal)) {
      out[key] = deepMerge(baseVal, srcVal);
    } else if (srcVal !== undefined) {
      out[key] = srcVal;
    }
  }
  return out as T;
}

const rawDictionaries: Record<Locale, unknown> = {
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ar: arMessages,
  hi: hiMessages,
  zh: zhMessages,
  gu: guMessages,
};

// Pre-merge every locale with English as fallback, so partial translations
// always fall through to English keys instead of throwing.
const mergedDictionaries: Record<Locale, Messages> = Object.fromEntries(
  (Object.keys(rawDictionaries) as Locale[]).map((code) => [
    code,
    deepMerge(enMessages, rawDictionaries[code]) as Messages,
  ])
) as Record<Locale, Messages>;

export function getTranslation(locale: Locale): Messages {
  return mergedDictionaries[locale] ?? mergedDictionaries.en;
}

export function getCurrentLocale(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[1] as Locale;
  return LOCALE_CODES.includes(locale) ? locale : "en";
}

export function getLocaleDir(locale: Locale): "ltr" | "rtl" {
  return LOCALES[locale]?.dir ?? "ltr";
}

export function isRtl(locale: Locale): boolean {
  return getLocaleDir(locale) === "rtl";
}

/** Fill template strings like "Now serving {city}, {country}" */
export function interpolate(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    values[k] !== undefined ? String(values[k]) : `{${k}}`
  );
}
