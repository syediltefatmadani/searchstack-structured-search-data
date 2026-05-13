import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/lib/mock-data";

export const Route = createFileRoute("/_marketing/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — SearchStack" },
      { name: "description", content: "Simple per-search pricing for Google Search, Images, News and Shopping APIs." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Pricing that scales with you</h1>
        <p className="mt-4 text-muted-foreground">Pay for what you use. Upgrade or cancel any time.</p>
      </div>
      <div className="mt-14 grid gap-4 lg:grid-cols-4">
        {plans.map((p) => (
          <Card
            key={p.id}
            className={`relative flex flex-col rounded-2xl p-6 shadow-soft ${
              p.featured ? "border-primary/40 ring-1 ring-primary/30" : "border-border/70"
            }`}
          >
            {p.featured && <Badge className="absolute -top-3 right-6 rounded-full">Most popular</Badge>}
            <h3 className="text-base font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
            <div className="mt-5">
              {p.price === null ? (
                <span className="text-3xl font-semibold">Custom</span>
              ) : (
                <>
                  <span className="text-3xl font-semibold">${p.price}</span>
                  <span className="text-sm text-muted-foreground"> / mo</span>
                </>
              )}
            </div>
            <ul className="mt-5 flex-1 space-y-2 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-secondary" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-6 rounded-xl" variant={p.featured ? "default" : "outline"}>
              <Link to={p.id === "enterprise" ? "/contact" : "/sign-up"}>{p.cta}</Link>
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          ["Volume discounts", "Automatic discounts kick in past 100k searches per month."],
          ["No surprise bills", "Hard caps available on every plan."],
          ["Cancel anytime", "Plans are month-to-month. No long-term contracts."],
        ].map(([h, d]) => (
          <Card key={h} className="rounded-2xl border-border/70 p-6">
            <h3 className="font-semibold">{h}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{d}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
