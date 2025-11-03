// components/Header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSwitcher from "./LanguageSwitcher"

type HeaderProps = {
  country: string
  locale: string
  translations: any
}

const Header = ({ country, locale, translations }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = translations






  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${country}/${locale}`} className="cursor-pointer">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                MITOLYN
              </h1>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href={`/${country}/${locale}`}
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium"
            >
              {t.nav.home}
            </Link>

            <div className="relative group">
              <Link
                href={`/${country}/${locale}/weight-loss-supplements`}
                className="text-gray-700 hover:text-emerald-600 font-medium"
              >
                {t.categories.weightLoss}
              </Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute top-full left-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-xl p-2">
                <Link
                  href={`/${country}/${locale}/weight-loss-supplements/men`}
                  className="block px-3 py-2 rounded-md hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 text-sm"
                >
                  {t.categories.forMen || "For Men"}
                </Link>
                <Link
                  href={`/${country}/${locale}/weight-loss-supplements/women`}
                  className="block px-3 py-2 rounded-md hover:bg-emerald-50 text-gray-700 hover:text-emerald-700 text-sm"
                >
                  {t.categories.forWomen || "For Women"}
                </Link>
              </div>
            </div>

            {/* <Link
              href={`/${country}/${locale}/energy-supplements`}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              {t.categories.energy}
            </Link> */}

            {/* <Link
              href={`/${country}/${locale}#categories`}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              {t.categories.wellness}
            </Link> */}

            <Link
              href={`/${country}/${locale}/reviews`}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              {t.nav.reviews}
            </Link>
            <Link
              href={`/${country}/${locale}/about`}
              className="text-gray-700 hover:text-emerald-600 font-medium"
            >
              {t.nav.about}
            </Link>
          </nav>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Button variant="ghost" className="hidden sm:flex text-gray-700 hover:text-emerald-600">
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              className="md:hidden text-gray-700 hover:text-emerald-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-700 font-medium">Language</span>
                <LanguageSwitcher />
              </div>

              <Link
                href={`/${country}/${locale}`}
                className="block text-gray-700 hover:text-emerald-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.home}
              </Link>

              <Link
                href={`/${country}/${locale}/weight-loss-supplements`}
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.categories.weightLoss}
              </Link>
              <div className="pl-4">
                <Link
                  href={`/${country}/${locale}/weight-loss-supplements/men`}
                  className="block text-sm text-gray-600 hover:text-emerald-700 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.categories.forMen || "For Men"}
                </Link>
                <Link
                  href={`/${country}/${locale}/weight-loss-supplements/women`}
                  className="block text-sm text-gray-600 hover:text-emerald-700 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.categories.forWomen || "For Women"}
                </Link>
              </div>

              {/* <Link
                href={`/${country}/${locale}/energy-supplements`}
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.categories.energy}
              </Link> */}
              {/* <Link
                href={`/${country}/${locale}#categories`}
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.categories.wellness}
              </Link> */}

              <Link
                href={`/${country}/${locale}/reviews`}
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.reviews}
              </Link>
              <Link
                href={`/${country}/${locale}/about`}
                className="block text-gray-700 hover:text-emerald-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.nav.about}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
export { Header }
