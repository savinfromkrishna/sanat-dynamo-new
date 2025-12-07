export type ProductReview = {
  id: number
  name: string
  location: string
  rating: number
  text: string
  verified?: boolean
}
export type ProductBadge = {
  text: string;
  color: string;
  title?: string;        // Now supports hover tooltip or accessibility title
};
export type ProductDetail = {
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
  badges: ProductBadge[]
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