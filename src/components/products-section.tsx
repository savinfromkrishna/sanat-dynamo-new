import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Mitolyn - 1 Bottle",
    subtitle: "Basic Package",
    price: 49,
    originalPrice: 197,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.9,
    reviews: 847,
    supply: "30 Days Supply",
    badge: "Basic",
    badgeColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Mitolyn - 6 Bottles",
    subtitle: "Best Value Package",
    price: 39,
    originalPrice: 1182,
    totalPrice: 234,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422492/mitolyn-offer_azyjj3.png",
    rating: 4.9,
    reviews: 1247,
    supply: "180 Days Supply",
    badge: "Best Value",
    badgeColor: "bg-red-500",
    popular: true,
    freeShipping: true,
  },
  {
    id: 3,
    name: "Mitolyn - 3 Bottles",
    subtitle: "Popular Package",
    price: 59,
    originalPrice: 591,
    totalPrice: 177,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-3-bottles_jtgdh8.png",
    rating: 4.8,
    reviews: 623,
    supply: "90 Days Supply",
    badge: "Popular",
    badgeColor: "bg-teal-500",
  },
]

export function ProductsSection() {
  return (
    <section id="products" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-sans font-bold text-foreground mb-4">Choose Your Package</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect Mitolyn package for your health journey. All packages come with our 90-day money-back
            guarantee.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${product.popular ? "ring-2 ring-primary scale-105" : ""}`}
            >
              {product.popular && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardContent className="p-6">
                {/* Badge */}
                <div className="text-center mb-4">
                  <Badge className={`${product.badgeColor} text-white text-sm px-4 py-1`}>{product.badge}</Badge>
                </div>

                {/* Supply Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-sans font-bold text-foreground mb-2">{product.supply}</h3>
                </div>

                {/* Product Image */}
                <div className="relative mb-6 h-48 flex items-center justify-center">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="object-contain"
                  />
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-sans font-bold text-primary">${product.price}</span>
                    <span className="text-lg text-muted-foreground">/Per Bottle</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Total:</span>
                    <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    <span className="text-lg font-semibold text-foreground">
                      ${product.totalPrice || product.price}
                    </span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Order Button */}
                <Button className="w-full mb-4 text-lg py-6" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  ORDER NOW
                </Button>

                {/* Shipping Info */}
                <div className="text-center">
                  <span className="text-sm text-muted-foreground">
                    {product.freeShipping ? "* Free Shipping" : "+ Small Shipping Fee"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
