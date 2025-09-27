"use client"

import { Button } from "@/components/ui/button"

export default function CTAButton({ url, label }: { url: string; label: string }) {
  return (
    <Button
      onClick={() => window.open(url, "_blank")}
      className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
    >
      {label}
    </Button>
  )
}
