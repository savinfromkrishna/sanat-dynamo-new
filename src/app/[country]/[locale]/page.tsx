import { CategoriesSection } from "@/components/home/CategoriesSection"
import { HomeHeroCarousel } from "@/components/home/homecarouse"
import { ReviewsSection } from "@/components/home/ReviewsSection"
import { TrustSection } from "@/components/home/TrustSection"
import { getTranslation } from "@/lib/i18n"

export default async function HomePage({ params }: { params: { locale: string } }) {
  const translations = getTranslation(params.locale as "en" | "es")
  console.log("Translations:", translations) 
  
  return (
    <div>
      <HomeHeroCarousel translations={translations} />
      <CategoriesSection translations={translations} locale={params.locale} />
      <TrustSection translations={translations} />
      <ReviewsSection translations={translations} />
    </div>
  )
}