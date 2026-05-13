import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { topQueries, usageSeries } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Usage Analytics — SearchStack" }] }),
  component: Analytics,
});

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Usage Analytics</h1>
        <p className="text-sm text-muted-foreground">Trends, cache performance and most popular queries.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {[["Cache hit ratio", "63%"], ["Success rate", "99.58%"], ["P95 latency", "1.42 s"]].map(([k, v]) => (
          <Card key={k} className="rounded-2xl border-border/70 p-5 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k}</p>
            <p className="mt-2 text-2xl font-semibold">{v}</p>
          </Card>
        ))}
      </div>

      <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
        <h2 className="font-semibold">Daily searches</h2>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis fontSize={12} stroke="var(--muted-foreground)" />
              <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              <Bar dataKey="searches" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
          <h2 className="font-semibold">Errors</h2>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line dataKey="errors" stroke="var(--destructive)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
          <h2 className="font-semibold">Top queries</h2>
          <ul className="mt-4 divide-y divide-border/60">
            {topQueries.map((q) => (
              <li key={q.q} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-mono text-xs">{q.q}</span>
                <span className="text-muted-foreground">{q.count.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
