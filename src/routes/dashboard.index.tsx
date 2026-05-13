import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { dashboardStats, recentRequests, usageSeries, engineSplit } from "@/lib/mock-data";
import { Activity, AlertTriangle, CreditCard, Gauge, Search, Wallet } from "lucide-react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "Overview — SearchStack" }] }),
  component: Overview,
});

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

function Stat({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub?: string }) {
  return (
    <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}

function Overview() {
  const s = dashboardStats;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">A snapshot of your account this month.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Stat icon={Search} label="Total searches" value={s.totalSearches.toLocaleString()} sub="all time" />
        <Stat icon={Activity} label="This month" value={s.monthUsage.toLocaleString()} sub={`of ${s.monthQuota.toLocaleString()}`} />
        <Stat icon={Wallet} label="Remaining" value={s.remaining.toLocaleString()} sub="credits" />
        <Stat icon={Gauge} label="Avg latency" value={`${s.avgLatencyMs} ms`} sub="last 24h" />
        <Stat icon={AlertTriangle} label="Error rate" value={`${s.errorRate}%`} sub="last 24h" />
        <Stat icon={CreditCard} label="Plan" value={s.plan} sub="active" />
      </div>

      <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-semibold">Monthly quota</h2>
          <span className="text-sm text-muted-foreground">{s.monthUsage.toLocaleString()} / {s.monthQuota.toLocaleString()}</span>
        </div>
        <Progress value={(s.monthUsage / s.monthQuota) * 100} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft lg:col-span-2">
          <h2 className="font-semibold">Usage — last 30 days</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="searches" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
          <h2 className="font-semibold">Engines</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={engineSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {engineSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            {engineSplit.map((e, i) => (
              <div key={e.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i] }} />
                <span className="text-muted-foreground">{e.name}</span>
                <span className="ml-auto font-medium">{e.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="rounded-2xl border-border/70 shadow-soft overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-semibold">Recent requests</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Engine</th>
                <th className="p-3 text-left">Query</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Latency</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((r) => (
                <tr key={r.id} className="border-t border-border/60">
                  <td className="p-3 text-muted-foreground">{new Date(r.ts).toLocaleTimeString()}</td>
                  <td className="p-3 capitalize">{r.engine}</td>
                  <td className="p-3 font-mono text-xs">{r.query}</td>
                  <td className="p-3">
                    <Badge variant={r.status === 200 ? "secondary" : "destructive"} className="rounded-full">{r.status}</Badge>
                  </td>
                  <td className="p-3 text-muted-foreground">{r.latency} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
