// home
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { HomeHeroCarousel } from "@/components/home/homecarouse"
import { ReviewsSection } from "@/components/home/ReviewsSection"
import { TrustSection } from "@/components/home/TrustSection"
import { getTranslation } from "@/lib/i18n"
import { ProductknowMoreSection } from "@/components/productKnowMore" 

export default async function HomePage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params
  const translations = getTranslation(locale as "en" | "es")
  
  const isSpanish = locale === "es"
  
  const combinedKnowMoreData = isSpanish ? {
    title: "SuppleLogic: Decisiones de Salud Basadas en la Lógica, no en el Marketing",
    summary: "SuppleLogic es una plataforma dedicada a reseñas de suplementos honestas e impulsadas por la investigación. Te ayudamos a filtrar la exageración publicitaria analizando ingredientes, beneficios y experiencias reales para que tomes decisiones de compra más inteligentes y seguras.",
    knowMore: "Saber Más",
    knowLess: "Mostrar Menos",
    sections: [
      {
        "type": "text",
        "heading": "Nuestra Misión: Tu Salud es lo Primero",
        "content": "Nuestra misión en SuppleLogic es simple: proporcionar reseñas de suplementos honestas, lógicas y fáciles de entender. Creemos que los suplementos deben apoyar tu salud, no confundirte ni engañarte. Nos enfocamos en la transparencia y la educación para empoderar tus decisiones de bienestar.",
      },
      {
        "type": "list",
        "heading": "Cómo Evaluamos Cada Suplemento",
        "content": "Cada producto en SuppleLogic pasa por un proceso de evaluación estructurado para garantizar la máxima calidad:",
        "items": [
          "Calidad de Ingredientes – ¿Son efectivos y seguros?",
          "Evidencia Científica – ¿Existe investigación real detrás de las afirmaciones?",
          "Beneficios vs. Promesas – ¿Coinciden los resultados con el marketing?",
          "Efectos Secundarios y Seguridad – ¿Quién debería evitar el producto?",
          "Relación Calidad-Precio – ¿Está justificado el precio?"
        ]
      },
      {
        "type": "stat",
        "heading": "¿Por qué confiar en SuppleLogic?",
        "stats": [
          { "value": "100%", "label": "Análisis Independiente" },
          { "value": "Ciencia", "label": "Enfoque basado en investigación" },
          { "value": "Real", "label": "Experiencias de usuarios verificadas" }
        ]
      },
      {
        "type": "table",
        "heading": "SuppleLogic vs. Reseñas Típicas",
        "table": {
          "headers": ["Característica", "SuppleLogic", "Otros Sitios"],
          "rows": [
            ["Análisis de Ingredientes", "Profundo y Basado en Ciencia", "Superficial"],
            ["Transparencia de Afiliados", "Clara y Honesta", "A menudo oculta"],
            ["Promesas de 'Milagro'", "Nunca (Solo hechos)", "Comunes"],
            ["Enfoque en Seguridad", "Prioridad Alta", "Ignorado a menudo"]
          ]
        }
      },
      {
        "type": "faq",
        "heading": "Preguntas Frecuentes",
        "faqs": [
          {
            "q": "¿Son imparciales las reseñas de SuppleLogic?",
            "a": "Sí. Todas las reseñas se escriben de forma independiente. Las comisiones de afiliados nunca influyen en nuestras evaluaciones."
          },
          {
            "q": "¿SuppleLogic es un sitio médico?",
            "a": "No. Proporcionamos contenido informativo únicamente. Siempre consulte a un profesional de la salud antes de comenzar cualquier suplemento."
          }
        ]
      },
      {
        "type": "cta",
        "heading": "¿Listo para encontrar el suplemento ideal?",
        "content": "Explore nuestras categorías de pérdida de peso, salud digestiva, cuidado oral y más para encontrar soluciones que realmente tengan sentido para su salud.",
        "button": { "text": "Ver Todas las Reseñas", "href": "/categories" }
      }
    ]
  } : {
    title: "SuppleLogic: Health Decisions Based on Logic, Not Hype",
    summary: "SuppleLogic is a trusted platform dedicated to honest, research-driven supplement reviews. We help you cut through marketing hype by analyzing ingredients, claimed benefits, and real user experiences so you can make smarter, safer buying decisions.",
    knowMore: "Know More",
    knowLess: "Show Less",
    sections: [
      {
        "type": "text",
        "heading": "Our Mission: Your Health First",
        "content": "Our mission at SuppleLogic is simple: to provide honest, logical, and easy-to-understand supplement reviews. We believe supplements should support your health—not confuse or mislead you. We prioritize transparency and education to empower your wellness decisions.",
      },
      {
        "type": "list",
        "heading": "How We Review Every Supplement",
        "content": "Every product featured on SuppleLogic goes through a structured evaluation process to ensure maximum quality:",
        "items": [
          "Ingredient Quality – Are the ingredients effective and safe?",
          "Scientific Evidence – Is there real research behind the claims?",
          "Benefits vs Claims – Do results match marketing promises?",
          "Side Effects & Safety – Who should avoid it?",
          "Value for Money – Is the price justified?"
        ]
      },
      {
        "type": "stat",
        "heading": "Why Trust SuppleLogic?",
        "stats": [
          { "value": "100%", "label": "Independent Analysis" },
          { "value": "Science", "label": "Based research approach" },
          { "value": "Real", "label": "User feedback considered" }
        ]
      },
      {
        "type": "table",
        "heading": "SuppleLogic vs. Typical Review Sites",
        "table": {
          "headers": ["Feature", "SuppleLogic", "Other Sites"],
          "rows": [
            ["Ingredient Analysis", "Deep & Science-Based", "Surface-level"],
            ["Affiliate Transparency", "Clear & Honest", "Often Hidden"],
            ["'Miracle' Claims", "Never (Facts only)", "Common"],
            ["Safety Focus", "High Priority", "Often Ignored"]
          ]
        }
      },
      {
        "type": "faq",
        "heading": "Frequently Asked Questions",
        "faqs": [
          {
            "q": "Are SuppleLogic reviews unbiased?",
            "a": "Yes. All reviews are written independently using ingredient analysis and research data. Affiliate commissions do not affect our evaluations."
          },
          {
            "q": "Is SuppleLogic a medical website?",
            "a": "No. We provide informational content only. Always consult a healthcare professional before starting any supplement."
          }
        ]
      },
      {
        "type": "cta",
        "heading": "Ready to find the right supplement?",
        "content": "Explore our latest reviews across weight loss, gut health, oral care, and more to find supplements that actually make sense for your goals.",
        "button": { "text": "Explore All Reviews", "href": "/categories" }
      }
    ]
  }

  return (
    <div>
      <HomeHeroCarousel translations={translations} locale={locale} country={country} />
      <CategoriesSection translations={translations} locale={locale} country={country} />
      <TrustSection translations={translations} />
      <ReviewsSection translations={translations} />
      <ProductknowMoreSection translations={{ productKnowMore: combinedKnowMoreData }} />
    </div>
  )
}