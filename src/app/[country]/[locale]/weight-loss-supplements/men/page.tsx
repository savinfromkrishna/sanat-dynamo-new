// src/app/in/[locale]/page.tsx
import type { Metadata } from "next"
import MenWeightLossClient from "./MenWeightLossClient"
import { getTranslation } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as "en" | "es"
  const t = getTranslation(locale)

  return {
    title: t.weightLoss.genderSpecific.men.title,
    description: t.weightLoss.genderSpecific.men.description,
    keywords: t.weightLoss.keywords || "best weight loss supplements for men, men's weight loss supplements, male fat loss support, metabolism boosters",
  }
}

export default function WeightLossMenPage() {
  return <MenWeightLossClient />
}