"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import CTAButton from "./cta-button";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  image: string;
  name: string;
  rating: number;
  reviews: number;
  price: string;
  originalPrice: string;
  discount: string;
  premiumPrice: string;
  supply: string;
  link: string;
}

interface ProductCardsProps {
  products: Product[];
  buyNowLabel: string;
}

export default function ProductCards({ products, buyNowLabel }: ProductCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products
        .filter((product) => product?.slug) // Ensure slug exists
        .map((product) => (
          <Link href={product.slug} key={product.id}>
            <Card className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden w-full max-w-xs mx-auto">
              <div className="relative">
                <button
                  onClick={() => {}}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors duration-200 shadow-sm"
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
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-orange-600 mb-2">
                    <Star className="w-3 h-3 text-orange-500 fill-current" />
                    <span className="font-medium">{product.premiumPrice}</span>
                  </div>

                  <div className="text-xs text-gray-600 font-medium">{product.supply}</div>
                </div>

                <div className="space-y-1.5 mt-auto">
                  <CTAButton url={product.link} label={buyNowLabel} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
}