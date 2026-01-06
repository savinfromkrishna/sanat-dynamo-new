"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Star } from "lucide-react"

const products = [
  {
    id: 1,
    name: "MITOLYN - Basic Package",
    price: "$49",
    originalPrice: "$197",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    supply: "30 Days Supply",
    link: "https://supplelogic.com/basic-package",
    rating: 4.8,
    reviews: 2847,
  },
  {
    id: 2,
    name: "MITOLYN - Best Value",
    price: "$39",
    originalPrice: "$1182",
    total: "$234",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
    supply: "180 Days Supply",
    link: "https://supplelogic.com/best-value",
    popular: true,
    rating: 4.9,
    reviews: 5632,
  },
  {
    id: 3,
    name: "MITOLYN - Popular",
    price: "$59",
    originalPrice: "$591",
    total: "$177",
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
    supply: "90 Days Supply",
    link: "https://supplelogic.com/popular",
    rating: 4.7,
    reviews: 3921,
  },
]

export default function MitolynProductsGrid() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden w-full max-w-xs mx-auto"
        >
          <div className="relative">
            <button
              onClick={() => {}}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4 text-gray-400 hover:text-red-400" />
            </button>

            <div className="h-40 p-3 flex items-center justify-center bg-gray-50">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={120}
                height={140}
                className="object-contain max-h-full"
              />
            </div>
          </div>

          <CardContent className="p-3 h-60 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1 bg-teal-50 px-2 py-1 rounded-md">
                <span className="text-sm font-semibold text-teal-700">{product.rating}</span>
                <Star className="w-3 h-3 text-teal-500 fill-current" />
              </div>
              <span className="text-xs text-gray-600">{product.reviews.toLocaleString()} reviews</span>
            </div>

            <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-tight h-10 flex items-start">
              {product.name}
            </h3>

            <div className="mb-3 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">Save more</span>
              </div>
              <div className="text-xs text-gray-600 font-medium">{product.supply}</div>
            </div>

            <div className="space-y-1.5 mt-auto">
              <Button
                size="sm"
                className="w-full h-8 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm"
                onClick={() => window.open(product.link, "_blank")}
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
