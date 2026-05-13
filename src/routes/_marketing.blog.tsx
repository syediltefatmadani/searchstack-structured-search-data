import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/_marketing/blog")({
  head: () => ({
    meta: [
      { title: "Blog — SearchStack" },
      { name: "description", content: "Engineering posts, product updates and tutorials from the SearchStack team." },
    ],
  }),
  component: BlogPage,
});

const posts = [
  { slug: "1", title: "How we cut p95 latency by 40% with edge caching", date: "May 2, 2026", excerpt: "A look at our caching layer and the tradeoffs we made.", tag: "Engineering" },
  { slug: "2", title: "Introducing the Shopping API", date: "Apr 18, 2026", excerpt: "Structured product, price and merchant data, ready to query.", tag: "Product" },
  { slug: "3", title: "Designing a stable JSON schema", date: "Mar 30, 2026", excerpt: "Why we version our response shapes — and how we evolve them.", tag: "Engineering" },
  { slug: "4", title: "Best practices for SERP scraping in 2026", date: "Mar 12, 2026", excerpt: "Lessons from running billions of requests per month.", tag: "Guides" },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">From the SearchStack blog</h1>
      <p className="mt-3 max-w-xl text-muted-foreground">Engineering deep-dives, product updates and tutorials.</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.slug} className="group rounded-2xl border-border/70 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elev">
            <p className="text-xs uppercase tracking-wider text-primary">{p.tag} · {p.date}</p>
            <h2 className="mt-2 text-lg font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <Link to="/blog" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
              Read more →
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
