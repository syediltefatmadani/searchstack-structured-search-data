import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Engine, engines, runSearchPlayground, sampleResponse } from "@/lib/mock-data";
import { Copy, Loader2, Play } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/playground")({
  head: () => ({ meta: [{ title: "Playground — SearchStack" }] }),
  component: Playground,
});

const countries = [["us", "United States"], ["gb", "United Kingdom"], ["de", "Germany"], ["jp", "Japan"], ["br", "Brazil"]];
const langs = [["en", "English"], ["es", "Spanish"], ["fr", "French"], ["de", "German"], ["ja", "Japanese"]];

function Playground() {
  const [engine, setEngine] = useState<Engine>("search");
  const [q, setQ] = useState("best mechanical keyboards 2026");
  const [gl, setGl] = useState("us");
  const [hl, setHl] = useState("en");
  const [resp, setResp] = useState<any>(sampleResponse);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const r = await runSearchPlayground({ engine, q, gl, hl });
    setResp(r);
    setLoading(false);
  };

  const samples = {
    curl: `curl "https://api.searchstack.dev/v1/${engine}" \\
  -H "Authorization: Bearer sk_live_*****" \\
  -d q="${q}" -d gl=${gl} -d hl=${hl}`,
    js: `import SearchStack from "searchstack";
const ss = new SearchStack(process.env.SS_KEY);
const r = await ss.${engine}({ q: "${q}", gl: "${gl}", hl: "${hl}" });`,
    python: `from searchstack import SearchStack
ss = SearchStack(api_key="sk_live_*****")
r = ss.${engine}(q="${q}", gl="${gl}", hl="${hl}")`,
    node: `const ss = require("searchstack")(process.env.SS_KEY);
const r = await ss.${engine}({ q: "${q}", gl: "${gl}", hl: "${hl}" });`,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Playground</h1>
        <p className="text-sm text-muted-foreground">Test live API calls without writing code.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
          <h2 className="text-sm font-semibold">Request</h2>
          <div className="mt-4 space-y-3">
            <div>
              <Label>Engine</Label>
              <Select value={engine} onValueChange={(v) => setEngine(v as Engine)}>
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {engines.map((e) => <SelectItem key={e.id} value={e.id}>{e.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Query</Label>
              <Input value={q} onChange={(e) => setQ(e.target.value)} className="mt-1.5" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Country</Label>
                <Select value={gl} onValueChange={setGl}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{countries.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Language</Label>
                <Select value={hl} onValueChange={setHl}>
                  <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                  <SelectContent>{langs.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={run} disabled={loading} className="w-full rounded-xl">
              {loading ? <><Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> Running…</> : <><Play className="mr-1.5 h-4 w-4" /> Run request</>}
            </Button>
          </div>
        </Card>

        <Card className="rounded-2xl border-border/70 p-0 shadow-soft lg:col-span-2 overflow-hidden">
          <Tabs defaultValue="response">
            <div className="flex items-center justify-between border-b border-border/60 bg-muted/40 px-3 py-2">
              <TabsList className="bg-transparent">
                <TabsTrigger value="response">Response</TabsTrigger>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="js">JavaScript</TabsTrigger>
                <TabsTrigger value="node">Node.js</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>
            </div>
            {[
              ["response", JSON.stringify(resp, null, 2)],
              ["curl", samples.curl],
              ["js", samples.js],
              ["node", samples.node],
              ["python", samples.python],
            ].map(([k, v]) => (
              <TabsContent key={k} value={k} className="m-0">
                <div className="relative">
                  <button
                    className="absolute right-3 top-3 rounded-md bg-background/80 p-1.5 text-muted-foreground hover:text-foreground"
                    onClick={() => { navigator.clipboard.writeText(v); toast.success("Copied"); }}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <pre className="max-h-[520px] overflow-auto p-5 text-xs leading-relaxed">
                    <code className="font-mono text-foreground/90">{v}</code>
                  </pre>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
