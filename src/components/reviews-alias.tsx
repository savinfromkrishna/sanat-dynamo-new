import * as ReviewsMod from "./reviews-section"

// Pick named export if present, otherwise fall back to default
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReviewsSectionResolved: any =
  // @ts-ignore
  (ReviewsMod as any).ReviewsSection || (ReviewsMod as any).default

// Export both a default and a named export so callers can import either style
const ReviewsSection = ReviewsSectionResolved
export default ReviewsSection
export { ReviewsSection }
