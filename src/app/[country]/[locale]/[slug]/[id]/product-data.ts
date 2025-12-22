export interface ProductDetail {
  id: string
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
  badges: Array<{ text: string; color: string }>
  affiliateUrl: string
  description: string
  whyChoose: string[]
  whatIs: string
  howItWorks: string[]
  benefits: string[]
  ingredients: Array<{ name: string; note: string }>
  howToUse: string[]
  bonuses?: Array<{ title: string; image: string }>
  trust: Array<{ image: string; alt: string }>
  pros: string[]
  cons: string[]
  faqs: Array<{ q: string; a: string }>
  seo: {
    title: string
    description: string
    keywords?: string[]
  }
  productReviews: Array<{
    id: number
    name: string
    location: string
    rating: number
    text: string
    verified: boolean
  }>
}
