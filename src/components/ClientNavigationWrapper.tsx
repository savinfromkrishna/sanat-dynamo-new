// components/ClientNavigationWrapper.tsx
"use client"

import { useRouter } from "next/navigation"
import React from "react"

type Props = {
  children: React.ReactNode
  country: string
  locale: string
}

export function ClientNavigationWrapper({ children, country, locale }: Props) {
  const router = useRouter()

  const onNavigate = (view: "home" | "category", slug?: string) => {
    if (view === "home") {
      router.push(`/${country}/${locale}`)
    } else if (view === "category" && slug) {
      router.push(`/${country}/${locale}/${slug}`)
    }
  }

  return <>{React.cloneElement(React.Children.only(children) as React.ReactElement, { onNavigate } as any)}</>
}