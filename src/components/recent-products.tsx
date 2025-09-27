import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye } from "lucide-react"
import Image from "next/image"

const recentProducts = [
  {
    id: 1,
    name: "Mitolyn Energy Boost",
    price: 39,
    originalPrice: 79,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.8,
    reviews: 234,
    views: 1247,
    isNew: true,
  },
  {
    id: 2,
    name: "Mitolyn Focus Formula",
    price: 45,
    originalPrice: 89,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.9,
    reviews: 189,
    views: 892,
    isNew: true,
  },
  {
    id: 3,
    name: "Mitolyn Metabolism Support",
    price: 42,
    originalPrice: 84,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.7,
    reviews: 156,
    views: 743,
    isNew: false,
  },
  {
    id: 4,
    name: "Mitolyn Complete Wellness",
    price: 55,
    originalPrice: 110,
    image: "https://res.cloudinary.com/ddywjrr08/image/upload/v1758422485/mitolyn-bottle_dj1mxc.webp",
    rating: 4.9,
    reviews: 298,
    views: 1456,
    isNew: false,
  },
]

export function RecentProducts() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Recent Products */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Recent Products</h2>
              <p className="text-muted-foreground">Discover our latest additions to the Mitolyn family</p>
            </div>

            <div className="grid gap-6">
              {recentProducts.slice(0, 2).map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        {product.isNew && (
                          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-sans font-semibold text-foreground mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">${product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Learn More
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Most Viewed Products */}
          <div className="lg:w-1/2">
            <div className="mb-8">
              <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Most Viewed</h2>
              <p className="text-muted-foreground">Popular products that customers love</p>
            </div>

            <div className="grid gap-6">
              {recentProducts.slice(2, 4).map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 p-4">
                        <h3 className="font-sans font-semibold text-foreground mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{product.views} views</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-primary">${product.price}</span>
                            <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Learn More
                            </Button>
                            <Button size="sm" className="bg-primary text-primary-foreground">
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
