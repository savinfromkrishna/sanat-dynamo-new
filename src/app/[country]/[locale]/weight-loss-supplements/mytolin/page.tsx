import { ReviewsSection } from "@/components/reviews-alias"

export const metadata = {
  title: "Mytolin - Weight Loss Supplements",
  description: "Curated Mytolin products and resources.",
}

export default function MytolinCategoryPage() {
  return (
    <main className="container mx-auto px-4 py-10 flex flex-col gap-12">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-balance">Mytolin</h1>
        <p className="text-muted-foreground">Explore Mytolin picks in weight loss supplements.</p>
      </header>

      {/* ... existing code or product grid could go here, keeping this page minimal for now ... */}

      <section id="mytolin-reviews" aria-labelledby="mytolin-reviews-heading">
        <ReviewsSection />
      </section>
    </main>
  )
}
