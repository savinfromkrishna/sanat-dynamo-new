import type { ProductDetail } from "@/app/[country]/[locale]/weight-loss-supplements/[slug]/product-data";

export type Locale = "en" | "es";

export type Translations = {
  products: Record<string, ProductDetail>;
  [key: string]: any; 
};
import enMain from "@/locales/en.json";
import esMain from "@/locales/es.json";
import enHero from "@/locales/hero.json";
import esHero from "@/locales/es/hero.json";
import enAbout from "@/locales/about.json";
import esAbout from "@/locales/es/about.json";
import enWeightLoss from "@/locales/weight-loss.json";
import esWeightLoss from "@/locales/es/weight-loss.json";
import enWomenWeightLoss from "@/locales/women-weight-loss.json";
import esWomenWeightLoss from "@/locales/es/women-weight-loss.json";
import enProducts from "@/locales/product.json";
import esProducts from "@/locales/es/product.json";
export function getTranslation(locale: Locale): Translations {
  const mainTranslations = locale === "es" ? esMain : enMain;
  const heroTranslations = locale === "es" ? esHero : enHero;
  console.log("Hero Translations:", heroTranslations);
  const aboutTranslations = locale === "es" ? esAbout : enAbout;
  const weightLossTranslations = locale === "es" ? esWeightLoss : enWeightLoss;
  const womenWeightLossTranslations = locale === "es" ? esWomenWeightLoss : enWomenWeightLoss;
  const productTranslations = locale === "es" ? esProducts : enProducts;
  const merged = {
    ...mainTranslations,
    ...heroTranslations,
    ...aboutTranslations,
    ...weightLossTranslations,
    ...womenWeightLossTranslations,
    ...productTranslations
  };
  console.log("Merged translations:", merged);
  return merged;
}
export function getCurrentLocale(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const locale = segments[1] as Locale; 
  return locale === "es" ? "es" : "en";
}