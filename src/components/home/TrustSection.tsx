"use client"

import Image from "next/image"

export function TrustSection({ translations }: { translations: any }) {
  const t = translations

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-sans font-bold text-foreground mb-4">{t.trust.title}</h2>
          <p className="text-muted-foreground">{t.trust.description}</p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
          {t.trust.badges.map((badge: any, index: number) => (
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