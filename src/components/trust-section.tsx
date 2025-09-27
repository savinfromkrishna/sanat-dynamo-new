"use client"

import Image from "next/image"
import { usePathname } from "next/navigation"
import { getCurrentLocale, getTranslation } from "@/lib/i18n"

const trustBadges = [
  {
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/made-in-usa_go4j19.webp",
    alt: "Made in USA",
  },
  {
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422484/fda-approved_jrawwr.webp",
    alt: "FDA Registered Facility",
  },
  {
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/gmp-certified_z81hqh.webp",
    alt: "GMP Certified",
  },
  {
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422491/natural_dpkfxs.webp",
    alt: "100% Natural",
  },
]

export function TrustSection() {
  const pathname = usePathname()
  const locale = getCurrentLocale(pathname || "/")
  const t = getTranslation(locale)

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">{t.trust.title}</h2>
          <p className="text-muted-foreground">{t.trust.description}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex-shrink-0">
              <Image
                src={badge.image || "/placeholder.svg"}
                alt={badge.alt}
                width={80}
                height={80}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
