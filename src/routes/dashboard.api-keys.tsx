import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { apiKeysMock } from "@/lib/mock-data";
import { Copy, EyeOff, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/api-keys")({
  head: () => ({ meta: [{ title: "API Keys — SearchStack" }] }),
  component: ApiKeysPage,
});

function ApiKeysPage() {
  const [keys, setKeys] = useState(apiKeysMock);
  const [revealed, setRevealed] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");

  const create = () => {
    const id = `k_live_${Math.random().toString(36).slice(2, 6)}`;
    const full = `sk_live_${Math.random().toString(36).slice(2, 30)}`;
    setKeys([{ id, name: newName || "Untitled", prefix: full.slice(0, 14) + "…", created: new Date().toISOString().slice(0, 10), lastUsed: "—", calls: 0 }, ...keys]);
    setRevealed(full);
    setOpen(false);
    setNewName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">API Keys</h1>
          <p className="text-sm text-muted-foreground">Create, view usage and revoke API keys.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl"><Plus className="mr-1.5 h-4 w-4" /> Create key</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create API key</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Label>Name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Production" />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={create}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {revealed && (
        <Card className="rounded-2xl border-primary/40 bg-accent/40 p-5">
          <p className="text-sm font-medium">Save this key — you won't see it again.</p>
          <div className="mt-3 flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg border border-border bg-background px-3 py-2 font-mono text-sm">{revealed}</code>
            <Button variant="outline" onClick={() => { navigator.clipboard.writeText(revealed); toast.success("Copied"); }}>
              <Copy className="mr-1.5 h-4 w-4" /> Copy
            </Button>
            <Button variant="ghost" onClick={() => setRevealed(null)}><EyeOff className="h-4 w-4" /></Button>
          </div>
        </Card>
      )}

      <Card className="rounded-2xl border-border/70 overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Key</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Last used</th>
              <th className="p-3 text-left">Calls</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {keys.map((k) => (
              <tr key={k.id} className="border-t border-border/60">
                <td className="p-3 font-medium">{k.name}</td>
                <td className="p-3 font-mono text-xs text-muted-foreground">{k.prefix}</td>
                <td className="p-3 text-muted-foreground">{k.created}</td>
                <td className="p-3 text-muted-foreground">{k.lastUsed}</td>
                <td className="p-3">{k.calls.toLocaleString()}</td>
                <td className="p-3 text-right">
                  <Button variant="ghost" size="sm" onClick={() => { setKeys(keys.filter((x) => x.id !== k.id)); toast.success("Key revoked"); }}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <p className="text-xs text-muted-foreground"><Badge variant="outline" className="mr-2">Tip</Badge> Use separate keys per environment for cleaner usage analytics.</p>
    </div>
  );
}
