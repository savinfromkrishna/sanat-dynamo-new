export type ProductReview = {
  id: number
  name: string
  location: string
  rating: number
  text: string
  verified?: boolean
}

export type ProductDetail = {
  slug: string
  name: string
  subtitle: string
  price: number
  originalPrice: number
  perBottleSuffix: string
  supply: string
  rating: number
  reviews: number
  image: string
  gallery: string[]
  badges: { text: string; color: string }[]
  affiliateUrl: string
  benefits: string[]
  ingredients: { name: string; note?: string }[]
  howToUse: string[]
  bonuses?: { title: string; image: string }[]
  trust: { image: string; alt: string }[]
  faqs: { q: string; a: string }[]
  seo: { title: string; description: string; keywords: string[] }
  productReviews?: ProductReview[]
}