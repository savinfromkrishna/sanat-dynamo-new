"use client"

import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"

export function StructuredData() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname)
  const t = getTranslation(locale)

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://sanat-rewa.vercel.app/#website",
        url: "https://sanat-rewa.vercel.app/",
        name: "Mitolyn Official",
        description: t.seo.description,
        publisher: {
          "@id": "https://sanat-rewa.vercel.app/#organization",
        },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://sanat-rewa.vercel.app/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        ],
        inLanguage: locale === "es" ? ["es-ES", "en-US"] : ["en-US", "es-ES"],
      },
      {
        "@type": "Organization",
        "@id": "https://sanat-rewa.vercel.app/#organization",
        name: "Mitolyn Official",
        url: "https://sanat-rewa.vercel.app/",
        logo: {
          "@type": "ImageObject",
          inLanguage: locale === "es" ? "es-ES" : "en-US",
          "@id": "https://sanat-rewa.vercel.app/#/schema/logo/image/",
          url: "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          contentUrl: "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          width: 512,
          height: 512,
          caption: "Mitolyn Official",
        },
        image: {
          "@id": "https://sanat-rewa.vercel.app/#/schema/logo/image/",
        },
        sameAs: [
          "https://facebook.com/mitolynofficial",
          "https://twitter.com/mitolynofficial",
          "https://instagram.com/mitolynofficial",
          "https://youtube.com/mitolynofficial",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+1-800-MITOLYN",
            contactType: "customer service",
            areaServed: ["US", "CA", "MX", "ES"],
            availableLanguage: ["English", "Spanish"],
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "US",
          addressRegion: "CA",
          addressLocality: "Los Angeles",
        },
      },
      {
        "@type": "Product",
        "@id": "https://sanat-rewa.vercel.app/#product",
        name: "Mitolyn Weight Loss Supplement",
        description: t.seo.description,
        image: [
          "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
          "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
          "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
        ],
        brand: {
          "@type": "Brand",
          name: "Mitolyn",
          logo: "https://sanat-rewa.vercel.apphttps://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
        },
        manufacturer: {
          "@id": "https://sanat-rewa.vercel.app/#organization",
        },
        category: "Health & Wellness > Weight Loss > Dietary Supplements",
        additionalType: "https://schema.org/DietarySupplement",
        offers: [
          {
            "@type": "Offer",
            "@id": "https://sanat-rewa.vercel.app/#offer-basic",
            url: "https://sanat-rewa.vercel.app/basic-package",
            priceCurrency: "USD",
            price: "69",
            priceValidUntil: "2025-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@id": "https://sanat-rewa.vercel.app/#organization",
            },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: "0",
                currency: "USD",
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 2,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 3,
                  maxValue: 7,
                  unitCode: "DAY",
                },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: "US",
              returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 60,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
          },
          {
            "@type": "Offer",
            "@id": "https://sanat-rewa.vercel.app/#offer-popular",
            url: "https://sanat-rewa.vercel.app/popular",
            priceCurrency: "USD",
            price: "177",
            priceValidUntil: "2025-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@id": "https://sanat-rewa.vercel.app/#organization",
            },
          },
          {
            "@type": "Offer",
            "@id": "https://sanat-rewa.vercel.app/#offer-best-value",
            url: "https://sanat-rewa.vercel.app/best-value",
            priceCurrency: "USD",
            price: "294",
            priceValidUntil: "2025-12-31",
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: {
              "@id": "https://sanat-rewa.vercel.app/#organization",
            },
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "2847",
          bestRating: "5",
          worstRating: "1",
        },
        review: [
          {
            "@type": "Review",
            "@id": "https://sanat-rewa.vercel.app/#review-1",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Sarah Johnson",
            },
            reviewBody:
              locale === "es"
                ? "¡Resultados increíbles! Perdí 15 libras en 2 meses con niveles de energía aumentados."
                : "Amazing results! Lost 15 pounds in 2 months with increased energy levels.",
            datePublished: "2024-11-15",
          },
          {
            "@type": "Review",
            "@id": "https://sanat-rewa.vercel.app/#review-2",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "5",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Michael Chen",
            },
            reviewBody:
              locale === "es"
                ? "¡Gran suplemento! Ingredientes naturales y sin efectos secundarios. Muy recomendado."
                : "Great supplement! Natural ingredients and no side effects. Highly recommend.",
            datePublished: "2024-11-10",
          },
          {
            "@type": "Review",
            "@id": "https://sanat-rewa.vercel.app/#review-3",
            reviewRating: {
              "@type": "Rating",
              ratingValue: "4",
              bestRating: "5",
            },
            author: {
              "@type": "Person",
              name: "Maria Rodriguez",
            },
            reviewBody:
              locale === "es"
                ? "Muy efectivo para perder peso. Me siento más energética y saludable."
                : "Very effective for weight loss. I feel more energetic and healthy.",
            datePublished: "2024-11-05",
          },
        ],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: locale === "es" ? "Ingredientes" : "Ingredients",
            value: locale === "es" ? "Natural, Aprobado por FDA" : "Natural, FDA Approved",
          },
          {
            "@type": "PropertyValue",
            name: locale === "es" ? "Fabricación" : "Manufacturing",
            value: locale === "es" ? "Hecho en EE.UU., Certificado GMP" : "Made in USA, GMP Certified",
          },
          {
            "@type": "PropertyValue",
            name: locale === "es" ? "Garantía" : "Guarantee",
            value: locale === "es" ? "Garantía de Devolución de Dinero de 60 Días" : "60-Day Money Back Guarantee",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://sanat-rewa.vercel.app/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: locale === "es" ? "¿Qué es Mitolyn?" : "What is Mitolyn?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                locale === "es"
                  ? "Mitolyn es un suplemento natural para perder peso que está diseñado para restaurar la salud mitocondrial, mejorar la quema de grasa y aumentar la vitalidad general."
                  : "Mitolyn is a natural weight loss supplement that is designed to restore mitochondrial health, improve fat burning, and boost overall vitality.",
            },
          },
          {
            "@type": "Question",
            name: locale === "es" ? "¿Es seguro Mitolyn?" : "Is Mitolyn safe?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                locale === "es"
                  ? "Sí, Mitolyn está hecho con ingredientes 100% naturales en una instalación registrada por la FDA y certificada por GMP en los EE.UU."
                  : "Yes, Mitolyn is made with 100% natural ingredients in an FDA-registered and GMP-certified facility in the USA.",
            },
          },
          {
            "@type": "Question",
            name: locale === "es" ? "¿Cuánto tiempo tarda en funcionar?" : "How long does it take to work?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                locale === "es"
                  ? "Los resultados pueden variar, pero muchos usuarios reportan ver cambios positivos dentro de las primeras 2-4 semanas de uso consistente."
                  : "Results may vary, but many users report seeing positive changes within the first 2-4 weeks of consistent use.",
            },
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
