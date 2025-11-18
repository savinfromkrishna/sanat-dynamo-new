export type Locale = 'en' | 'es' | 'fr';

export interface Product {
  id: number;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  discount: string;
  premiumPrice: string;
  supply: string;
  link: string;
}

export interface TranslationData {
  weightLoss: {
    productsSection: {
      title: string;
      description: string;
      products: Product[];
    };
    common: {
      buyNow: string;
    };
  };
  womenWeightLoss: {
    productsSection: {
      products: Product[];
    };
  };
}

const translations: Record<Locale, TranslationData> = {
  en: {
    weightLoss: {
      productsSection: {
        title: 'Weight Loss Supplements',
        description: 'Discover our premium collection of weight loss supplements for men',
        products: [],
      },
      common: {
        buyNow: 'Buy Now',
      },
    },
    womenWeightLoss: {
      productsSection: {
        products: [],
      },
    },
  },
  es: {
    weightLoss: {
      productsSection: {
        title: 'Suplementos para Pérdida de Peso',
        description: 'Descubre nuestra colección premium de suplementos para pérdida de peso para hombres',
        products: [],
      },
      common: {
        buyNow: 'Comprar Ahora',
      },
    },
    womenWeightLoss: {
      productsSection: {
        products: [],
      },
    },
  },
  fr: {
    weightLoss: {
      productsSection: {
        title: 'Suppléments de Perte de Poids',
        description: 'Découvrez notre collection premium de suppléments de perte de poids pour hommes',
        products: [],
      },
      common: {
        buyNow: 'Acheter Maintenant',
      },
    },
    womenWeightLoss: {
      productsSection: {
        products: [],
      },
    },
  },
};

export function getTranslation(locale: Locale): TranslationData {
  return translations[locale] || translations.en;
}
