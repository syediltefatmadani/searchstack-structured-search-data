import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { features } from "@/lib/mock-data";
import { BarChart3, Code2, Gauge, Globe, Image as ImageIcon, KeyRound, Newspaper, Search, ShieldCheck, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/_marketing/features")({
  head: () => ({
    meta: [
      { title: "Features — SearchStack" },
      { name: "description", content: "Engines, localization, proxy rotation, analytics and key management." },
    ],
  }),
  component: FeaturesPage,
});

const icons = [Search, ImageIcon, Newspaper, ShoppingBag, Code2, Globe, ShieldCheck, Gauge, BarChart3, KeyRound];

function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Built for production search</h1>
        <p className="mt-4 text-muted-foreground">Every feature you need to fetch, parse and serve search engine data reliably.</p>
      </div>
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => {
          const Icon = icons[i] ?? Search;
          return (
            <Card key={f.title} className="group rounded-2xl border-border/70 p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elev">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
