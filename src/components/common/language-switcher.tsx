// src/components/common/LanguageSwitcher.tsx
"use client"

import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Locale } from "@/lib/i18n"

const languageNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
}

const flagEmojis: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
}

const locales: Locale[] = ["en", "es"]

function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname() || "/in/en"

  // Normalize and detect current locale from the second segment
  const segments = pathname.split("/").filter(Boolean)
  const currentLocale: Locale = segments[1] === "es" ? "es" : "en" // Default to "en" if second segment isn't "es"

  const switchLanguage = (locale: Locale) => {
    const segs = pathname.split("/").filter(Boolean)

    // Ensure the URL has the expected structure: /in/[locale]/...
    if (segs.length === 0) {
      // Handle root path ("/")
      segs.push("in", locale)
    } else if (segs.length === 1 && segs[0] === "in") {
      // Handle "/in" or "/in/"
      segs.push(locale)
    } else if (segs[0] === "in") {
      // Replace the locale segment (second segment)
      segs[1] = locale
    } else {
      // If no "in" prefix, assume /in/[locale] and prepend
      segs.unshift("in", locale)
    }

    const newPath = "/" + segs.join("/")
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {flagEmojis[currentLocale]} {languageNames[currentLocale]}
          </span>
          <span className="sm:hidden">{flagEmojis[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={currentLocale === locale ? "bg-accent" : ""}
          >
            <span className="mr-2">{flagEmojis[locale]}</span>
            {languageNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LanguageSwitcher
export { LanguageSwitcher }