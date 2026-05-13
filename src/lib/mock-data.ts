// Mock data + placeholder service layer. Replace with real backend calls later.

export type Engine = "search" | "images" | "news" | "shopping";

export const engines: { id: Engine; label: string }[] = [
  { id: "search", label: "Google Search" },
  { id: "images", label: "Google Images" },
  { id: "news", label: "Google News" },
  { id: "shopping", label: "Google Shopping" },
];

export const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    blurb: "For exploring the API",
    features: ["100 searches / month", "All 4 engines", "JSON responses", "Community support"],
    cta: "Start free",
    featured: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 49,
    blurb: "For side projects and prototypes",
    features: ["5,000 searches / month", "Global localization", "Email support", "Usage analytics"],
    cta: "Choose Starter",
    featured: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 249,
    blurb: "For production workloads",
    features: [
      "50,000 searches / month",
      "Proxy rotation",
      "99.95% uptime SLA",
      "Priority support",
      "Webhooks & team seats",
    ],
    cta: "Choose Pro",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: null as number | null,
    blurb: "For high volume and custom needs",
    features: ["Custom volume", "Dedicated infra", "SOC 2 + DPA", "Solution architect"],
    cta: "Contact sales",
    featured: false,
  },
];

export const features = [
  { title: "Google Search API", desc: "Organic, ads, knowledge graph, related searches as JSON." },
  { title: "Google Images API", desc: "High-resolution thumbnails, source URLs and metadata." },
  { title: "Google News API", desc: "Topic, source, and time-filtered news with structured fields." },
  { title: "Shopping API", desc: "Product listings, prices, ratings and merchant data." },
  { title: "Real-time JSON", desc: "Sub-second median latency, structured and stable schemas." },
  { title: "Global localization", desc: "195+ countries, 50+ languages, geo-targeted devices." },
  { title: "Proxy rotation", desc: "Automatic IP rotation with residential and datacenter pools." },
  { title: "99.95% uptime", desc: "Multi-region failover with transparent status reporting." },
  { title: "Usage analytics", desc: "Per-key analytics, success rate, latency and top queries." },
  { title: "API key management", desc: "Create, scope and revoke keys with audit history." },
];

export const useCases = [
  { title: "SEO platforms", desc: "Track rankings across markets and devices." },
  { title: "Price intelligence", desc: "Monitor competitor pricing across retailers." },
  { title: "Brand monitoring", desc: "Detect new mentions across news and search." },
  { title: "Market research", desc: "Quantify search demand and trends." },
];

export const testimonials = [
  {
    quote: "SearchStack replaced three brittle scrapers. Our pipeline is finally boring — in a good way.",
    name: "Avery Chen",
    role: "Staff Engineer, Northwind",
  },
  {
    quote: "The schema stability and uptime are worth every penny. Setup took 12 minutes.",
    name: "Marcus Reilly",
    role: "CTO, Indexly",
  },
  {
    quote: "Best dev experience in the SERP API space. Playground and docs are top-notch.",
    name: "Priya Natarajan",
    role: "Lead Backend, MarketMap",
  },
];

export const faqs = [
  { q: "How fast is the API?", a: "Median latency is around 800ms globally with cached results returning in under 100ms." },
  { q: "Do you offer a free plan?", a: "Yes — 100 searches per month, no credit card required." },
  { q: "Which engines are supported?", a: "Google Search, Images, News and Shopping. More engines are on the roadmap." },
  { q: "Can I cancel anytime?", a: "Yes, plans are month-to-month and you can downgrade or cancel at any time." },
  { q: "Is there a SLA?", a: "Pro and Enterprise plans include a 99.95% uptime SLA with credits for downtime." },
];

export const sampleResponse = {
  search_metadata: {
    id: "ss_8a2f0bca3d",
    status: "Success",
    created_at: "2026-05-13T10:24:11Z",
    processed_at: "2026-05-13T10:24:11Z",
    total_time_taken: 0.74,
  },
  search_parameters: {
    engine: "google",
    q: "best mechanical keyboards 2026",
    location: "United States",
    hl: "en",
    gl: "us",
  },
  organic_results: [
    {
      position: 1,
      title: "The 7 Best Mechanical Keyboards of 2026",
      link: "https://example.com/best-mechanical-keyboards",
      domain: "example.com",
      snippet: "Our top pick balances build quality, switch feel and value for typing all day.",
    },
    {
      position: 2,
      title: "Mechanical Keyboard Buying Guide — 2026 Edition",
      link: "https://example.com/guide",
      domain: "example.com",
      snippet: "What to look for in switches, layouts and hot-swap PCBs in 2026.",
    },
  ],
  related_searches: ["best low-profile mechanical keyboards", "quietest mechanical keyboards"],
};

export const dashboardStats = {
  totalSearches: 184_233,
  monthUsage: 32_140,
  monthQuota: 50_000,
  remaining: 17_860,
  avgLatencyMs: 812,
  errorRate: 0.42,
  plan: "Pro",
};

export const usageSeries = Array.from({ length: 30 }).map((_, i) => ({
  day: `${i + 1}`,
  searches: 600 + Math.round(Math.sin(i / 3) * 250 + Math.random() * 400 + i * 8),
  errors: Math.round(Math.random() * 12),
}));

export const engineSplit = [
  { name: "Search", value: 58 },
  { name: "Images", value: 17 },
  { name: "News", value: 14 },
  { name: "Shopping", value: 11 },
];

export const topQueries = [
  { q: "iphone 17 pro review", count: 1284 },
  { q: "openai news today", count: 982 },
  { q: "best running shoes 2026", count: 731 },
  { q: "site:nytimes.com climate", count: 612 },
  { q: "tesla stock", count: 540 },
];

export const recentRequests = Array.from({ length: 12 }).map((_, i) => ({
  id: `req_${(1000 + i).toString(36)}`,
  ts: new Date(Date.now() - i * 1000 * 60 * 7).toISOString(),
  engine: (["search", "images", "news", "shopping"] as Engine[])[i % 4],
  query: ["climate report 2026", "nike air max", "us election", "rtx 5090 price", "italy travel"][i % 5],
  status: i % 9 === 0 ? 429 : 200,
  latency: 400 + Math.round(Math.random() * 900),
  credits: 1,
}));

export const apiKeysMock = [
  { id: "k_live_a82", name: "Production", prefix: "sk_live_a82…", created: "2026-02-11", lastUsed: "2 min ago", calls: 132_410 },
  { id: "k_live_b40", name: "Staging", prefix: "sk_live_b40…", created: "2026-03-04", lastUsed: "1 hour ago", calls: 24_120 },
  { id: "k_live_c11", name: "Local dev", prefix: "sk_live_c11…", created: "2026-04-19", lastUsed: "yesterday", calls: 1_204 },
];

export const teamMock = [
  { name: "You", email: "you@searchstack.dev", role: "Owner" },
  { name: "Lina Park", email: "lina@searchstack.dev", role: "Admin" },
  { name: "Diego Ortiz", email: "diego@searchstack.dev", role: "Developer" },
];

export const invoicesMock = [
  { id: "INV-2026-005", date: "2026-05-01", amount: "$249.00", status: "Paid" },
  { id: "INV-2026-004", date: "2026-04-01", amount: "$249.00", status: "Paid" },
  { id: "INV-2026-003", date: "2026-03-01", amount: "$249.00", status: "Paid" },
];

// Placeholder service — swap implementation when wiring real backend.
export async function runSearchPlayground(params: {
  engine: Engine;
  q: string;
  gl?: string;
  hl?: string;
}) {
  await new Promise((r) => setTimeout(r, 600));
  return {
    ...sampleResponse,
    search_parameters: { ...sampleResponse.search_parameters, q: params.q, gl: params.gl, hl: params.hl, engine: params.engine },
  };
}
