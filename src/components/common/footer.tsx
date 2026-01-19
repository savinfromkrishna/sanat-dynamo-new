// components/Footer.tsx
"use client"

import { Separator } from "@/components/ui/separator"
import Logo from "../Logo/logo"
import Link from "next/link"
import LanguageSwitcher from "./LanguageSwitcher"

interface FooterProps {
  translations: any;
  country: string;
  locale: string;
}

export function Footer({ translations, country, locale }: FooterProps) {
  const t = translations
  const basePath = `/${country}/${locale}`

  return (
    <footer className="bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* 1. Logo & Description */}
          <div className="space-y-4">
            <Link href={basePath}>
              <Logo />
            </Link>
            <p className="text-sm text-gray-600">{t.footer.description}</p>
          </div>

          {/* 2. Quick Links */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={basePath} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/weight-loss-supplements`} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.categories.weightLoss}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/dental-health-supplements`} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.categories.wellness}
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Legal Links */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`${basePath}/terms`} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.termsOfService}
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/privacy`} className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Language Switcher */}
          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.contactUs}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>

        </div>

        {/* === Centered + Bold Disclosure - Recommended placement === */}
        <div className="mt-10 mb-6 text-center px-4 max-w-5xl mx-auto">
          <p className="text-sm text-gray-700 font-semibold leading-relaxed">
            <strong className="text-gray-800">Disclosure:</strong>{' '}
            {t.footer.Disclosure}
          </p>
        </div>

        <Separator className="my-8 bg-emerald-200/70" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} SuppleLogic. {t.footer.allRightsReserved}
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href={`${basePath}/terms`} className="hover:text-emerald-600 transition-colors">
              {t.footer.termsOfService}
            </Link>
            <Link href={`${basePath}/privacy`} className="hover:text-emerald-600 transition-colors">
              {t.footer.privacyPolicy}
            </Link>
            <Link href={`${basePath}/faq`} className="hover:text-emerald-600 transition-colors">
              {t.footer.faq}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer