// home
import { CategoriesSection } from "@/components/home/CategoriesSection"
import { HomeHeroCarousel } from "@/components/home/homecarouse"
import { ReviewsSection } from "@/components/home/ReviewsSection"
import { TrustSection } from "@/components/home/TrustSection"
import { getTranslation } from "@/lib/i18n"
import { ProductknowMoreSection } from "@/components/productKnowMore" // Import to use the same component for consistency

export default async function HomePage({ params }: { params: Promise<{ locale: string; country: string }> }) {
  const { locale, country } = await params
  const translations = getTranslation(locale as "en" | "es")
  console.log("Akash Translations:", translations) 
  
  // Compute combined knowMoreData for home page, with Spanish support
  const isSpanish = locale === "es"
  const combinedKnowMoreData = isSpanish ? {
    title: "Todo lo que necesitas saber sobre nuestros suplementos premium",
    summary: "Explora MITOLYN para una pérdida de peso revolucionaria y PRODENTIM para una salud oral óptima – soluciones respaldadas por la ciencia, confiadas por más de 100,000 usuarios en todo el mundo para impulsar el metabolismo, restaurar el microbioma de tu boca y mejorar el bienestar general de forma natural.",
    knowMore: translations.knowMore?.weightLoss?.knowMore || "Saber Más",
    knowLess: translations.knowMore?.weightLoss?.knowLess || "Mostrar Menos",
    sections: [
      // Intro text combining both (translated)
      {
        "type": "text",
        "heading": "¿Cómo transforman nuestros suplementos tu salud?",
        "content": "MITOLYN actúa sobre el metabolismo a nivel celular para una pérdida de grasa sin esfuerzo, mientras que PRODENTIM reequilibra tu microbioma oral para combatir la placa, blanquear los dientes y apoyar la salud de las encías. Juntos, proporcionan un enfoque holístico al bienestar sin químicos agresivos ni estimulantes.",
        "link": { "text": "Lee la ciencia detrás de ambos", "href": "/science" }
      },
      // Key ingredients for both (combined list, translated)
      {
        "type": "list",
        "heading": "Ingredientes Potentes en Nuestras Fórmulas",
        "content": "Nuestros suplementos cuentan con compuestos clínicamente estudiados adaptados a sus beneficios específicos:",
        "items": [
          "Extracto de Té Verde & Garcinia Cambogia (MITOLYN) – Aumenta la termogénesis y suprime el apetito",
          "Cafeína Anhidra & Glucomannano (MITOLYN) – Mejora la energía y promueve la saciedad",
          "Streptococcus salivarius K12 & M18 (PRODENTIM) – Combate el mal aliento, la placa y las caries",
          "Lactobacillus reuteri & Bifidobacterium lactis (PRODENTIM) – Apoya la reparación de encías y reduce la inflamación",
          "Picolinato de Cromo (MITOLYN) & Inulina (PRODENTIM) – Estabiliza el azúcar en sangre y alimenta bacterias beneficiosas"
        ],
        "link": { "text": "Ver listas completas de ingredientes", "href": "/ingredients" }
      },
      // Stats combining both (translated labels)
      {
        "type": "stat",
        "heading": "Resultados Probados de Usuarios Reales",
        "stats": [
          { "value": "92%", "label": "Reportaron menos antojos y aliento más fresco" },
          { "value": "87%", "label": "Perdieron 10+ lbs o vieron dientes más blancos en 30 días" },
          { "value": "4.85/5", "label": "Calificación promedio combinada" }
        ]
      },
      // Comparison table for both (translated)
      {
        "type": "table",
        "heading": "¿Por qué elegir nuestros suplementos sobre otros?",
        "table": {
          "headers": ["Característica", "MITOLYN/PRODENTIM", "Marca X", "Marca Y"],
          "rows": [
            ["Fórmulas Respaldadas por la Ciencia", "Sí", "Parcial", "No"],
            ["Opciones Naturales y Sin Estimulantes", "Sí", "No", "Parcial"],
            ["Dirigido a Áreas Específicas de Salud", "Sí (Peso & Oral)", "Solo General", "Solo General"],
            ["Garantía de Devolución de 60 Días", "Sí", "30 Días", "No"]
          ]
        }
      },
      // Quotes from both (translated)
      {
        "type": "quote",
        "quote": "¡MITOLYN me ayudó a perder 15 lbs sin sentirme privado, y PRODENTIM solucionó mi mal aliento crónico – un cambio total para mi confianza!",
        "author": "Alex & Maria, Usuarios Verificados",
        "rating": 5
      },
      // Combined FAQ (translated)
      {
        "type": "faq",
        "heading": "Preguntas Frecuentes",
        "faqs": [
          {
            "q": "¿En cuánto tiempo veré resultados de cualquiera de los suplementos?",
            "a": "MITOLYN: Apetito reducido en 3–7 días. PRODENTIM: Aliento más fresco en 1 semana. Beneficios completos en 2–4 semanas para ambos."
          },
          {
            "q": "¿Son seguros estos suplementos para uso diario?",
            "a": "Sí. Ambos usan ingredientes naturales, probados por terceros y fabricados en instalaciones registradas por la FDA."
          },
          {
            "q": "¿Requieren cambios en el estilo de vida?",
            "a": "Mejoran los resultados con hábitos equilibrados, pero funcionan independientemente para mejoras notables."
          },
          {
            "q": "¿Puedo usar MITOLYN y PRODENTIM juntos?",
            "a": "¡Absolutamente! Se complementan para una salud general – manejo de peso y una sonrisa saludable."
          }
        ]
      },
      // Combined CTA (translated)
      {
        "type": "cta",
        "heading": "¿Listo para Elevar tu Bienestar?",
        "content": "Únete a más de 100,000 clientes satisfechos. Prueba MITOLYN y PRODENTIM sin riesgo por 60 días y transforma tu cuerpo y sonrisa.",
        "button": { "text": "Comprar Todos los Suplementos", "href": "/shop" }
      }
    ]
  } : {
    title: "Everything You Need to Know About Our Premium Supplements",
    summary: "Explore MITOLYN for revolutionary weight loss and PRODENTIM for optimal oral health – science-backed solutions trusted by over 100,000 users worldwide to boost metabolism, restore your mouth's microbiome, and enhance overall wellness naturally.",
    knowMore: translations.knowMore?.weightLoss?.knowMore || "Know More",
    knowLess: translations.knowMore?.weightLoss?.knowLess || "Show Less",
    sections: [
      // Intro text combining both
      {
        "type": "text",
        "heading": "How Our Supplements Transform Your Health",
        "content": "MITOLYN targets metabolism at the cellular level for effortless fat loss, while PRODENTIM rebalances your oral microbiome to fight plaque, whiten teeth, and support gum health. Together, they provide a holistic approach to wellness without harsh chemicals or stimulants.",
        "link": { "text": "Read the science behind both", "href": "/science" }
      },
      // Key ingredients for both (combined list)
      {
        "type": "list",
        "heading": "Powerful Ingredients Across Our Formulas",
        "content": "Our supplements feature clinically studied compounds tailored for their specific benefits:",
        "items": [
          "Green Tea Extract & Garcinia Cambogia (MITOLYN) – Boost thermogenesis and suppress appetite",
          "Caffeine Anhydrous & Glucomannan (MITOLYN) – Enhance energy and promote fullness",
          "Streptococcus salivarius K12 & M18 (PRODENTIM) – Fight bad breath, plaque, and cavities",
          "Lactobacillus reuteri & Bifidobacterium lactis (PRODENTIM) – Support gum repair and reduce inflammation",
          "Chromium Picolinate (MITOLYN) & Inulin (PRODENTIM) – Stabilize blood sugar and feed beneficial bacteria"
        ],
        "link": { "text": "View full ingredient lists", "href": "/ingredients" }
      },
      // Stats combining both
      {
        "type": "stat",
        "heading": "Proven Results from Real Users",
        "stats": [
          { "value": "92%", "label": "Reported reduced cravings & fresher breath" },
          { "value": "87%", "label": "Lost 10+ lbs or saw whiter teeth in 30 days" },
          { "value": "4.85/5", "label": "Combined average rating" }
        ]
      },
      // Comparison table for both
      {
        "type": "table",
        "heading": "Why Choose Our Supplements Over Others",
        "table": {
          "headers": ["Feature", "MITOLYN/PRODENTIM", "Brand X", "Brand Y"],
          "rows": [
            ["Science-Backed Formulas", "Yes", "Partial", "No"],
            ["Natural & Stimulant-Free Options", "Yes", "No", "Partial"],
            ["Targets Specific Health Areas", "Yes (Weight & Oral)", "General Only", "General Only"],
            ["60-Day Money-Back Guarantee", "Yes", "30-Day", "No"]
          ]
        }
      },
      // Quotes from both
      {
        "type": "quote",
        "quote": "MITOLYN helped me lose 15 lbs without feeling deprived, and PRODENTIM fixed my chronic bad breath – a total game-changer for my confidence!",
        "author": "Alex & Maria, Verified Users",
        "rating": 5
      },
      // Combined FAQ
      {
        "type": "faq",
        "heading": "Frequently Asked Questions",
        "faqs": [
          {
            "q": "How soon will I see results from either supplement?",
            "a": "MITOLYN: Reduced appetite in 3–7 days. PRODENTIM: Fresher breath in 1 week. Full benefits in 2–4 weeks for both."
          },
          {
            "q": "Are these supplements safe for daily use?",
            "a": "Yes. Both use natural, third-party tested ingredients made in FDA-registered facilities."
          },
          {
            "q": "Do they require lifestyle changes?",
            "a": "They enhance results best with balanced habits, but work independently for noticeable improvements."
          },
          {
            "q": "Can I use both MITOLYN and PRODENTIM together?",
            "a": "Absolutely! They complement each other for overall health – weight management and a healthy smile."
          }
        ]
      },
      // Combined CTA
      {
        "type": "cta",
        "heading": "Ready to Elevate Your Wellness?",
        "content": "Join over 100,000 satisfied customers. Try MITOLYN and PRODENTIM risk-free for 60 days and transform your body and smile.",
        "button": { "text": "Shop All Supplements", "href": "/shop" }
      }
    ]
  }

  return (
    <div>
      <HomeHeroCarousel translations={translations} locale={locale} country={country} />
      <CategoriesSection translations={translations} locale={locale} country={country} />
      <TrustSection translations={translations} />
      <ReviewsSection translations={translations} />
      {/* Use ProductknowMoreSection for consistency, passing combined data */}
      <ProductknowMoreSection translations={{ productKnowMore: combinedKnowMoreData }} />
    </div>
  )
}