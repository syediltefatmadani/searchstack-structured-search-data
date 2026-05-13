import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — SearchStack" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: May 1, 2026</p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>These Terms of Service govern your use of the SearchStack platform. By using our APIs and dashboard, you agree to these terms.</p>
        <h2 className="text-lg font-semibold text-foreground">1. Use of service</h2>
        <p>You may use SearchStack to fetch and process publicly available search engine data, subject to the limits of your plan.</p>
        <h2 className="text-lg font-semibold text-foreground">2. Acceptable use</h2>
        <p>You agree not to abuse the service, attempt to bypass rate limits, or use it for unlawful purposes.</p>
        <h2 className="text-lg font-semibold text-foreground">3. Billing</h2>
        <p>Paid plans are billed monthly in advance. You may cancel at any time from your dashboard.</p>
        <h2 className="text-lg font-semibold text-foreground">4. Termination</h2>
        <p>We may suspend access for violations of these terms. You may terminate your account at any time.</p>
      </div>
    </div>
  ),
});
