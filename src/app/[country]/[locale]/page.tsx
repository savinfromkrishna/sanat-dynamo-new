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
  
  const mockTranslations: any = {
    common: {
      buyNow: "Get Started",
      learnMore: "View Solutions",
      premiumMemberSuffix: "for Enterprise Partners",
      verifiedBuyer: "Verified Client"
    },
    hero: {
      mainHeading: "SCALABLE INNOVATION",
      description: "Architecting the next generation of enterprise-grade software solutions.",
      guarantee: "99.9% Uptime SLA",
      fdaRegistered: "ISO 27001 Certified",
      freeShipping: "24/7 Global Support",
      slides: [
        {
          name: "Nexus Cloud Engine",
          slug: "nexus-cloud",
          category: "Cloud Infrastructure",
          categorySlug: "devops",
          isNew: true,
          rating: 5.0,
          reviews: 850,
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=800",
        }
      ]
    },
    categories: {
      weightLoss: "Digital Transformation",
      weightLossDescription: "Precision-coded systems designed to optimize business workflow and automation.",
      products: [
        {
          category: "Software Suites",
          items: [
            {
              id: 1,
              name: "OmniChannel CRM",
              slug: "omnichannel-crm",
              categorySlug: "saas-solutions",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=400",
              rating: 4.8,
              reviews: 3200,
              price: "$499/mo",
              supply: "Unlimited Users",
              link: "#"
            }
          ]
        }
      ]
    },
    reviews: {
      title: "CLIENT SUCCESS METRICS",
      subtitle: "Performance analytics and feedback from our global enterprise partners.",
      verifiedBuyer: "ENTERPRISE_PARTNER",
      reviews: [
        {
          id: 1,
          name: "Sarah Chen",
          location: "CTO, FinTech Global",
          rating: 5,
          text: "The architectural migration was seamless. Our system latency dropped by 40% within the first month of deployment.",
          verified: true
        }
      ]
    },
    trust: {
      title: "SECURITY & COMPLIANCE",
      description: "Our infrastructure adheres to the highest global data protection protocols.",
      badges: [
        { alt: "SOC2 Type II", image: "https://cdn-icons-png.flaticon.com/512/5822/5822215.png" },
        { alt: "ISO Certified", image: "https://cdn-icons-png.flaticon.com/512/9322/9322131.png" }
      ]
    },
    productKnowMore: {
      title: "ENGINEERING CORE: CODE OVER CLUTTER",
      summary: "Our development framework is dedicated to robust, clean-code architecture. We eliminate technical debt and focus on building scalable, future-proof digital ecosystems.",
      knowMore: "VIEW_DOCUMENTATION",
      knowLess: "CLOSE_MODULE",
      sections: [
        {
          "type": "text",
          "heading": "Our Mission: Agile Excellence",
          "content": "Our priority is architectural integrity. We believe software should function as a living asset, not a rigid legacy system. We utilize modular microservices to ensure your business stays flexible.",
        },
        {
          "type": "list",
          "heading": "Development Lifecycle Protocols",
          "content": "Every line of code undergoes a rigorous CI/CD pipeline and quality assurance check:",
          "items": [
            "Structural Integrity – Unit and integration testing",
            "Security Audits – Automated vulnerability scanning",
            "Scalability Stress Tests – Load balancing verification",
            "UX/UI Validation – Human-centric design review",
            "Documentation – Comprehensive API indexing"
          ]
        },
        {
          "type": "stat",
          "heading": "Infrastructure Metrics",
          "stats": [
            { "value": "99.99%", "label": "System Uptime" },
            { "value": "256-bit", "label": "Encryption" },
            { "value": "Global", "label": "CDN Nodes" }
          ]
        },
        {
          "type": "table",
          "heading": "Technology Comparison Matrix",
          "table": {
            "headers": ["Feature", "Our Modern Stack", "Legacy Systems"],
            "rows": [
              ["Deployment Speed", "Instant (Automated)", "Manual/Weeks"],
              ["Scalability", "Elastic/Cloud-Native", "Hardware Limited"],
              ["Security Updates", "Real-time Patching", "Scheduled Downtime"],
              ["Architecture", "Microservices", "Monolithic"]
            ]
          }
        },
        {
          "type": "faq",
          "heading": "Technical FAQ",
          "faqs": [
            {
              "q": "Do you provide source code ownership?",
              "a": "Yes. Upon completion of the contract, intellectual property rights are transferred to the client for custom solutions."
            },
            {
              "q": "How do you handle data migration?",
              "a": "We use encrypted ETL (Extract, Transform, Load) processes to ensure zero data loss during the transition."
            }
          ]
        }
      ]
    }
  };

  return (
    <div className="py-24">
      <HomeHeroCarousel translations={translations} locale={locale} country={country} />
      <CategoriesSection translations={translations} locale={locale} country={country} />
      <TrustSection translations={translations} />
      <ReviewsSection translations={translations} locale={locale} country={country}/>
      {/* Passing the custom software object to the specific section */}
      <ProductknowMoreSection locale={locale} country={country} translations={{ productKnowMore: mockTranslations.productKnowMore }} />
    </div>
  )
}