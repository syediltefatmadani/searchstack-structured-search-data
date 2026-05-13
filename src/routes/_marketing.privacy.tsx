import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_marketing/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — SearchStack" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated: May 1, 2026</p>
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>SearchStack values your privacy. This policy describes what data we collect and how we use it.</p>
        <h2 className="text-lg font-semibold text-foreground">Data we collect</h2>
        <p>Account information, billing details, and usage metadata required to operate the service.</p>
        <h2 className="text-lg font-semibold text-foreground">How we use data</h2>
        <p>To provide the service, prevent abuse, and improve our APIs. We never sell personal data.</p>
        <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
        <p>You can export or delete your account data at any time from your dashboard or by contacting support.</p>
      </div>
    </div>
  ),
});
