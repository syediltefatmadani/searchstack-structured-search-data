import { Check, Copy, Globe, Gauge, ShieldCheck, Sparkles, Code2, BarChart3, KeyRound, Newspaper, Image as ImageIcon, ShoppingBag, Search, ArrowRight } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs, features, plans, sampleResponse, testimonials, useCases } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/")({
  head: () => ({
    meta: [
      { title: "SearchStack — Search Engine Results as JSON APIs" },
      { name: "description", content: "Access Google Search, Images, News, and Shopping results through fast, scalable JSON APIs." },
      { property: "og:title", content: "SearchStack — Search Engine Results as JSON APIs" },
      { property: "og:description", content: "Access Google Search, Images, News, and Shopping results through fast, scalable JSON APIs." },
    ],
  }),
  component: LandingPage,
});

const engineCards = [
  { icon: Search, label: "Search" },
  { icon: ImageIcon, label: "Images" },
  { icon: Newspaper, label: "News" },
  { icon: ShoppingBag, label: "Shopping" },
];

const trustedBy = ["Northwind", "Indexly", "MarketMap", "Lumen", "Pixelweave", "Ortus"];

function LandingPage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <FeatureGrid />
      <UseCases />
      <PricingPreview />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-16 md:px-6 md:pt-28 md:pb-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Badge variant="secondary" className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
            <Sparkles className="mr-1.5 h-3 w-3" /> v2 — Faster proxies, lower latency
          </Badge>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Search Engine Results <span className="text-brand">as JSON APIs</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg text-muted-foreground">
            Access Google Search, Images, News, and Shopping results through fast, scalable APIs. Stop maintaining scrapers — ship features.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-xl shadow-elev">
              <Link to="/sign-up">Start Free <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link to="/docs">View Documentation</Link>
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-secondary" /> 100 free searches / month</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-secondary" /> No credit card</span>
            <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-secondary" /> 99.95% uptime</span>
          </div>
        </div>
        <div className="lg:col-span-6">
          <ApiMockup />
        </div>
      </div>
    </section>
  );
}

function ApiMockup() {
  const [tab, setTab] = useState<"curl" | "json">("curl");
  const curl = `curl "https://api.searchstack.dev/v1/search" \\
  -H "Authorization: Bearer sk_live_*****" \\
  -d engine=google \\
  -d q="best mechanical keyboards 2026" \\
  -d gl=us`;
  const json = JSON.stringify(sampleResponse, null, 2);

  return (
    <Card className="overflow-hidden rounded-3xl border-border/70 bg-card shadow-elev">
      <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary/70" />
        </div>
        <div className="flex gap-1">
          {(["curl", "json"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                tab === t ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "curl" ? "Request" : "Response"}
            </button>
          ))}
        </div>
        <button
          className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground"
          onClick={() => {
            navigator.clipboard.writeText(tab === "curl" ? curl : json);
            toast.success("Copied to clipboard");
          }}
          aria-label="Copy"
        >
          <Copy className="h-3.5 w-3.5" />
        </button>
      </div>
      <pre className="max-h-[420px] overflow-auto bg-card p-5 text-xs leading-relaxed">
        <code className="font-mono text-foreground/90">{tab === "curl" ? curl : json}</code>
      </pre>
    </Card>
  );
}

function TrustedBy() {
  return (
    <section className="border-y border-border/50 bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by developers at
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {trustedBy.map((b) => (
            <span key={b} className="text-lg font-semibold tracking-tight text-muted-foreground/80">
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureGrid() {
  const icons = [Search, ImageIcon, Newspaper, ShoppingBag, Code2, Globe, ShieldCheck, Gauge, BarChart3, KeyRound];
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Everything you need to ship search</h2>
          <p className="mt-3 text-muted-foreground">A complete platform for fetching, structuring and analyzing search engine data.</p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = icons[i] ?? Sparkles;
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
    </section>
  );
}

function UseCases() {
  return (
    <section className="border-t border-border/50 bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-semibold tracking-tight">Built for serious workloads</h2>
            <p className="mt-3 text-muted-foreground">Teams use SearchStack to power SEO tools, price intelligence, brand monitoring and market research at scale.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {useCases.map((u) => (
              <Card key={u.title} className="rounded-2xl border-border/70 bg-card p-6">
                <h3 className="font-semibold">{u.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{u.desc}</p>
              </Card>
            ))}
            <Card className="rounded-2xl border-border/70 bg-card p-6 sm:col-span-2">
              <div className="flex flex-wrap gap-3">
                {engineCards.map(({ icon: I, label }) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm">
                    <I className="h-3.5 w-3.5 text-primary" /> {label}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Predictable, developer-friendly pricing</h2>
          <p className="mt-3 text-muted-foreground">Start free. Scale as you grow. No hidden fees.</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {plans.map((p) => (
            <Card
              key={p.id}
              className={`relative flex flex-col rounded-2xl p-6 shadow-soft ${
                p.featured ? "border-primary/40 ring-1 ring-primary/30" : "border-border/70"
              }`}
            >
              {p.featured && (
                <Badge className="absolute -top-3 right-6 rounded-full">Most popular</Badge>
              )}
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
                <Link to="/sign-up">{p.cta}</Link>
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link to="/pricing" className="text-sm font-medium text-primary hover:underline">Compare plans →</Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="border-t border-border/50 bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="rounded-2xl border-border/70 bg-card p-6">
              <p className="text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border-border/70">
              <AccordionTrigger className="text-left text-base font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-4 pb-20 md:px-6">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-brand p-10 text-primary-foreground shadow-elev md:p-16">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Ship in minutes. Scale to billions.</h2>
            <p className="mt-3 max-w-xl text-primary-foreground/80">Get a live API key and your first JSON response in under 60 seconds.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg" variant="secondary" className="rounded-xl">
              <Link to="/sign-up">Start free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">Talk to sales</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
