import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { invoicesMock, plans } from "@/lib/mock-data";
import { Check, CreditCard } from "lucide-react";

export const Route = createFileRoute("/dashboard/billing")({
  head: () => ({ meta: [{ title: "Billing — SearchStack" }] }),
  component: Billing,
});

function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, payment methods and invoices.</p>
      </div>

      <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Current plan</p>
            <p className="mt-1 text-2xl font-semibold">Pro <Badge className="ml-2 rounded-full">Active</Badge></p>
            <p className="mt-1 text-sm text-muted-foreground">Renews June 1, 2026 · $249 / mo</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl">Cancel plan</Button>
            <Button className="rounded-xl">Manage subscription</Button>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="text-lg font-semibold">Upgrade options</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {plans.filter((p) => p.id !== "free").map((p) => (
            <Card key={p.id} className={`rounded-2xl p-6 shadow-soft ${p.featured ? "border-primary/40 ring-1 ring-primary/30" : "border-border/70"}`}>
              <h3 className="font-semibold">{p.name}</h3>
              <p className="mt-1 text-2xl font-semibold">{p.price === null ? "Custom" : `$${p.price}/mo`}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {p.features.slice(0, 3).map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 text-secondary" /> {f}</li>)}
              </ul>
              <Button className="mt-4 w-full rounded-xl" variant={p.featured ? "default" : "outline"}>Choose {p.name}</Button>
            </Card>
          ))}
        </div>
      </div>

      <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
        <h2 className="font-semibold">Payment method</h2>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
          <CreditCard className="h-5 w-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 09 / 28</p>
          </div>
          <Button variant="outline" size="sm">Update</Button>
        </div>
      </Card>

      <Card className="rounded-2xl border-border/70 overflow-hidden shadow-soft">
        <div className="p-5"><h2 className="font-semibold">Invoices</h2></div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr><th className="p-3 text-left">Invoice</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">Amount</th><th className="p-3 text-left">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {invoicesMock.map((i) => (
              <tr key={i.id} className="border-t border-border/60">
                <td className="p-3 font-mono text-xs">{i.id}</td>
                <td className="p-3 text-muted-foreground">{i.date}</td>
                <td className="p-3">{i.amount}</td>
                <td className="p-3"><Badge variant="secondary" className="rounded-full">{i.status}</Badge></td>
                <td className="p-3 text-right"><Button variant="ghost" size="sm">Download</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
