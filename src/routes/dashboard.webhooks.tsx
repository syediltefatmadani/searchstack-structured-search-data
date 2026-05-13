import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/webhooks")({
  head: () => ({ meta: [{ title: "Webhooks — SearchStack" }] }),
  component: Webhooks,
});

const events = ["search.completed", "search.failed", "key.created", "key.revoked", "billing.invoice.paid"];

function Webhooks() {
  const [hooks, setHooks] = useState([
    { id: "wh_1", url: "https://api.acme.dev/hooks/search", secret: "whsec_a82b…", events: ["search.completed"], active: true },
  ]);
  const [url, setUrl] = useState("");
  const [chosen, setChosen] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Webhooks</h1>
        <p className="text-sm text-muted-foreground">Receive event payloads at your endpoint.</p>
      </div>

      <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
        <h2 className="text-sm font-semibold">Create endpoint</h2>
        <form
          className="mt-4 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"
          onSubmit={(e) => {
            e.preventDefault();
            const id = `wh_${Math.random().toString(36).slice(2, 6)}`;
            const secret = `whsec_${Math.random().toString(36).slice(2, 12)}`;
            setHooks([{ id, url, secret, events: chosen, active: true }, ...hooks]);
            setUrl("");
            setChosen([]);
            toast.success("Webhook created");
          }}
        >
          <div>
            <Label>Endpoint URL</Label>
            <Input required type="url" value={url} onChange={(e) => setUrl(e.target.value)} className="mt-1.5" placeholder="https://api.example.com/hooks" />
          </div>
          <Button className="rounded-xl"><Plus className="mr-1.5 h-4 w-4" /> Create</Button>
          <div className="md:col-span-2">
            <Label>Events</Label>
            <div className="mt-2 flex flex-wrap gap-3">
              {events.map((ev) => (
                <label key={ev} className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-1.5 text-sm">
                  <Checkbox checked={chosen.includes(ev)} onCheckedChange={(v) => setChosen(v ? [...chosen, ev] : chosen.filter((x) => x !== ev))} />
                  <span className="font-mono text-xs">{ev}</span>
                </label>
              ))}
            </div>
          </div>
        </form>
      </Card>

      <Card className="rounded-2xl border-border/70 overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr><th className="p-3 text-left">URL</th><th className="p-3 text-left">Events</th><th className="p-3 text-left">Secret</th><th className="p-3 text-left">Status</th></tr>
          </thead>
          <tbody>
            {hooks.map((h) => (
              <tr key={h.id} className="border-t border-border/60">
                <td className="p-3 font-mono text-xs">{h.url}</td>
                <td className="p-3"><div className="flex flex-wrap gap-1">{h.events.map((e) => <Badge key={e} variant="outline" className="rounded-full">{e}</Badge>)}</div></td>
                <td className="p-3">
                  <button className="inline-flex items-center gap-1 font-mono text-xs text-muted-foreground hover:text-foreground" onClick={() => { navigator.clipboard.writeText(h.secret); toast.success("Copied"); }}>
                    {h.secret} <Copy className="h-3 w-3" />
                  </button>
                </td>
                <td className="p-3"><Badge variant="secondary" className="rounded-full">{h.active ? "Active" : "Paused"}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
