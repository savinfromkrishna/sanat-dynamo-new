// components/Footer.tsx
"use client"

import { Separator } from "@/components/ui/separator"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer({ translations }: { translations: any }) {
  const t = translations

  return (
    <footer className="bg-gradient-to-r from-emerald-50 to-teal-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-sans font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              MITOLYN
            </h3>
            <p className="text-sm text-gray-600">{t.footer.description}</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.nav.products}
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.nav.reviews}
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.nav.about}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.termsOfService}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.privacyPolicy}
                </a>
              </li>
              <li>
                <a href="/refund" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.refundPolicy}
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-600 hover:text-emerald-600 transition-colors">
                  {t.footer.shipping}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans font-semibold text-gray-800">{t.footer.contactUs}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-600">support@mitolyn.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-600">1-800-MITOLYN</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600" />
                <span className="text-gray-600">USA</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-emerald-200" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2024 Mitolyn. {t.footer.allRightsReserved}</p>
          <div className="flex gap-6 text-sm">
            <a href="/terms" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t.footer.termsOfService}
            </a>
            <a href="/privacy" className="text-gray-600 hover:text-emerald-600 transition-colors">
              {t.footer.privacyPolicy}
            </a>
            <a href="/cookies" className="text-gray-600 hover:text-emerald-600 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer