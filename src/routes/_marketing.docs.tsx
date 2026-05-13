import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { sampleResponse } from "@/lib/mock-data";

export const Route = createFileRoute("/_marketing/docs")({
  head: () => ({
    meta: [
      { title: "Documentation — SearchStack" },
      { name: "description", content: "Quickstart, authentication, endpoints, parameters and SDK examples." },
    ],
  }),
  component: DocsPage,
});

const sections = [
  { id: "quickstart", label: "Quick start" },
  { id: "auth", label: "Authentication" },
  { id: "endpoints", label: "Endpoints" },
  { id: "parameters", label: "Parameters" },
  { id: "response", label: "Response" },
  { id: "errors", label: "Error codes" },
  { id: "sdks", label: "SDK examples" },
];

function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
      {label && (
        <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-4 py-2 text-xs text-muted-foreground">
          <span>{label}</span>
          <button
            className="rounded-md p-1 hover:bg-background"
            onClick={() => {
              navigator.clipboard.writeText(children);
              toast.success("Copied");
            }}
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      <pre className="overflow-auto p-4 text-xs leading-relaxed">
        <code className="font-mono text-foreground/90">{children}</code>
      </pre>
    </div>
  );
}

function DocsPage() {
  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[220px_1fr]">
      <aside className="lg:sticky lg:top-20 lg:h-fit">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Documentation</p>
        <ul className="mt-3 space-y-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="block rounded-lg px-2.5 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="prose-invert max-w-3xl space-y-12">
        <section id="quickstart">
          <h1 className="text-3xl font-semibold tracking-tight">Quick start</h1>
          <p className="mt-2 text-muted-foreground">Make your first request in less than a minute.</p>
          <div className="mt-5">
            <CodeBlock label="cURL">{`curl "https://api.searchstack.dev/v1/search" \\
  -H "Authorization: Bearer sk_live_*****" \\
  -d engine=google \\
  -d q="hello world"`}</CodeBlock>
          </div>
        </section>

        <section id="auth">
          <h2 className="text-2xl font-semibold tracking-tight">Authentication</h2>
          <p className="mt-2 text-muted-foreground">All requests require a Bearer token in the <code className="font-mono text-sm">Authorization</code> header. Generate keys in your dashboard.</p>
          <div className="mt-5">
            <CodeBlock label="Header">Authorization: Bearer sk_live_*****</CodeBlock>
          </div>
        </section>

        <section id="endpoints">
          <h2 className="text-2xl font-semibold tracking-tight">Endpoints</h2>
          <Card className="mt-4 rounded-2xl border-border/70 p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="p-3 text-left">Method</th>
                  <th className="p-3 text-left">Path</th>
                  <th className="p-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["GET", "/v1/search", "Google Search results"],
                  ["GET", "/v1/images", "Google Images results"],
                  ["GET", "/v1/news", "Google News results"],
                  ["GET", "/v1/shopping", "Google Shopping results"],
                ].map(([m, p, d]) => (
                  <tr key={p} className="border-t border-border/60">
                    <td className="p-3 font-mono text-xs">{m}</td>
                    <td className="p-3 font-mono text-xs">{p}</td>
                    <td className="p-3 text-muted-foreground">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <section id="parameters">
          <h2 className="text-2xl font-semibold tracking-tight">Parameters</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li><code className="font-mono">q</code> — search query (required)</li>
            <li><code className="font-mono">gl</code> — country code (e.g. <code className="font-mono">us</code>)</li>
            <li><code className="font-mono">hl</code> — language code (e.g. <code className="font-mono">en</code>)</li>
            <li><code className="font-mono">num</code> — number of results (1–100)</li>
          </ul>
        </section>

        <section id="response">
          <h2 className="text-2xl font-semibold tracking-tight">Response</h2>
          <div className="mt-4">
            <CodeBlock label="200 OK">{JSON.stringify(sampleResponse, null, 2)}</CodeBlock>
          </div>
        </section>

        <section id="errors">
          <h2 className="text-2xl font-semibold tracking-tight">Error codes</h2>
          <Card className="mt-4 rounded-2xl border-border/70 p-0 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
                <tr><th className="p-3 text-left">Code</th><th className="p-3 text-left">Meaning</th></tr>
              </thead>
              <tbody>
                {[["400", "Bad request"], ["401", "Invalid API key"], ["429", "Rate limited"], ["500", "Server error"]].map(([c, m]) => (
                  <tr key={c} className="border-t border-border/60">
                    <td className="p-3 font-mono text-xs">{c}</td>
                    <td className="p-3 text-muted-foreground">{m}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        <section id="sdks">
          <h2 className="text-2xl font-semibold tracking-tight">SDK examples</h2>
          <div className="mt-4 grid gap-4">
            <CodeBlock label="JavaScript">{`import SearchStack from "searchstack";
const ss = new SearchStack(process.env.SS_KEY);
const r = await ss.search({ q: "hello world", gl: "us" });`}</CodeBlock>
            <CodeBlock label="Python">{`from searchstack import SearchStack
ss = SearchStack(api_key="sk_live_*****")
r = ss.search(q="hello world", gl="us")`}</CodeBlock>
          </div>
        </section>
      </div>
    </div>
  );
}
