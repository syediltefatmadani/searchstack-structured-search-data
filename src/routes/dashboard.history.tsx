import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { recentRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/history")({
  head: () => ({ meta: [{ title: "Search History — SearchStack" }] }),
  component: HistoryPage,
});

const all = Array.from({ length: 56 }).map((_, i) => recentRequests[i % recentRequests.length]).map((r, i) => ({ ...r, id: `req_${i}` }));

function HistoryPage() {
  const [q, setQ] = useState("");
  const [eng, setEng] = useState<string>("all");
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const filtered = useMemo(() => all.filter((r) =>
    (eng === "all" || r.engine === eng) && r.query.toLowerCase().includes(q.toLowerCase())
  ), [q, eng]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice(page * pageSize, page * pageSize + pageSize);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Search History</h1>
        <p className="text-sm text-muted-foreground">Every request your account has made, with full detail.</p>
      </div>

      <Card className="rounded-2xl border-border/70 p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-3">
          <Input placeholder="Search queries…" value={q} onChange={(e) => { setQ(e.target.value); setPage(0); }} className="max-w-xs" />
          <Select value={eng} onValueChange={(v) => { setEng(v); setPage(0); }}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All engines</SelectItem>
              <SelectItem value="search">Search</SelectItem>
              <SelectItem value="images">Images</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
            </SelectContent>
          </Select>
          <span className="ml-auto text-sm text-muted-foreground">{filtered.length} results</span>
        </div>
      </Card>

      <Card className="rounded-2xl border-border/70 overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Engine</th>
                <th className="p-3 text-left">Query</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Latency</th>
                <th className="p-3 text-left">Credits</th>
              </tr>
            </thead>
            <tbody>
              {view.map((r) => (
                <tr key={r.id} className="border-t border-border/60">
                  <td className="p-3 text-muted-foreground">{new Date(r.ts).toLocaleString()}</td>
                  <td className="p-3 capitalize">{r.engine}</td>
                  <td className="p-3 font-mono text-xs">{r.query}</td>
                  <td className="p-3"><Badge variant={r.status === 200 ? "secondary" : "destructive"} className="rounded-full">{r.status}</Badge></td>
                  <td className="p-3 text-muted-foreground">{r.latency} ms</td>
                  <td className="p-3">{r.credits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border/60 p-3 text-sm">
          <span className="text-muted-foreground">Page {page + 1} of {pages}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
