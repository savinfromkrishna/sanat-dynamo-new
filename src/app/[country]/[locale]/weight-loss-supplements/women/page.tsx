// src/app/in/[locale]/women/page.tsx
import type { Metadata } from "next"
import WomenWeightLossClient from "./WomenWeightLossClient"
import { getTranslation } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale as "en" | "es"
  const t = getTranslation(locale)

  return {
    title: t.womenWeightLoss.title,
    description: t.womenWeightLoss.description,
    keywords: t.womenWeightLoss.keywords || "best weight loss supplements for women, female weight loss supplements, hormone-friendly fat loss, appetite control",
  }
}

export default function WeightLossWomenPage() {
  return <WomenWeightLossClient />
}