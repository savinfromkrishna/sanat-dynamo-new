// src/context/TranslationContext.tsx
"use client";

import { Locale } from "@/lib/type";
import {
  createContext,
  useContext,
  ReactNode,
} from "react";

// ---------------------------------------------------------------------
// 1. Static translations (EN + ES) – NO JSON
// ---------------------------------------------------------------------
const translations = {
  en: {
    buttons: {
      viewAll: "View all",
      shopNow: "Shop now",
      learnMore: "Learn more",
      addToCart: "Add to cart",
      seeMore: "See more",
      contactUs: "Contact us",
      buyNow: "Buy Now", // Added
    } as const,

    hero: {
      title: "Discover",
      description:
        "Revolutionary mitochondrial support that powers your cells and boosts energy.",
      guarantee: "60-Day Money-Back Guarantee",
      fdaRegistered: "FDA Registered Facility",
      freeShipping: "Free Shipping on Orders Over $99",

      slides: [
        {
          isNew: true,
          category: "Energy",
          rating: 4.8,
          reviews: 1234,
          supply: "30-Day Supply – 60 Capsules",
          buyUrl: "https://example.com/buy-energy",
          learnMoreUrl: "https://example.com/learn-energy",
          name: "Mitolyn Energy",
          image: "/hero-energy.png",
        },
        {
          isNew: false,
          category: "Focus",
          rating: 4.9,
          reviews: 987,
          supply: "30-Day Supply – 60 Capsules",
          buyUrl: "https://example.com/buy-focus",
          learnMoreUrl: "https://example.com/learn-focus",
          name: "Mitolyn Focus",
          image: "/hero-focus.png",
        },
        // Add more slides here
      ],
    } as const,

    categories: {
      title: "Shop by Category",
    },
    trust: {
      title: "Why shoppers love us",
    },
    reviews: {
      title: "Customer Reviews",
    },
  },

  es: {
    buttons: {
      viewAll: "Ver todo",
      shopNow: "Comprar ahora",
      learnMore: "Saber más",
      addToCart: "Añadir al carrito",
      seeMore: "Ver más",
      contactUs: "Contáctanos",
      buyNow: "Comprar Ahora", // Added
    } as const,

    hero: {
      title: "Descubre",
      description:
        "Apoyo mitocondrial revolucionario que energiza tus células y aumenta tu vitalidad.",
      guarantee: "Garantía de Devolución de 60 Días",
      fdaRegistered: "Instalación Registrada por la FDA",
      freeShipping: "Envío Gratis en Pedidos Mayores a $99",

      slides: [
        {
          isNew: true,
          category: "Energía",
          rating: 4.8,
          reviews: 1234,
          supply: "Suministro de 30 Días – 60 Cápsulas",
          buyUrl: "https://example.com/buy-energy",
          learnMoreUrl: "https://example.com/learn-energy",
          name: "Mitolyn Energía",
          image: "/hero-energy.png",
        },
        {
          isNew: false,
          category: "Concentración",
          rating: 4.9,
          reviews: 987,
          supply: "Suministro de 30 Días – 60 Cápsulas",
          buyUrl: "https://example.com/buy-focus",
          learnMoreUrl: "https://example.com/learn-focus",
          name: "Mitolyn Concentración",
          image: "/hero-focus.png",
        },
      ],
    } as const,

    categories: {
      title: "Comprar por Categoría",
    },
    trust: {
      title: "Por qué los clientes nos aman",
    },
    reviews: {
      title: "Reseñas de Clientes",
    },
  },
} as const;

// ---------------------------------------------------------------------
// 2. Types
// ---------------------------------------------------------------------
export type Translations = typeof translations[Locale];

interface TranslationContextValue {
  t: Translations;
  locale: Locale;
}

// ---------------------------------------------------------------------
// 3. Context
// ---------------------------------------------------------------------
const TranslationContext = createContext<TranslationContextValue | null>(null);

// ---------------------------------------------------------------------
// 4. Provider
// ---------------------------------------------------------------------
export function TranslationProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = translations[locale] ?? translations.en;

  return (
    <TranslationContext.Provider value={{ t, locale }}>
      {children}
    </TranslationContext.Provider>
  );
}

// ---------------------------------------------------------------------
// 5. Hook
// ---------------------------------------------------------------------
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }
  return context;
}

// ---------------------------------------------------------------------
// 6. Export ButtonKey type for LocalizedButton
// ---------------------------------------------------------------------
export type ButtonKey = keyof typeof translations.en.buttons;