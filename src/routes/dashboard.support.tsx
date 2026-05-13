import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/support")({
  head: () => ({ meta: [{ title: "Support — SearchStack" }] }),
  component: Support,
});

function Support() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Support</h1>
        <p className="text-sm text-muted-foreground">We typically respond within a few hours on Pro and Enterprise plans.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-2xl border-border/70 p-5 shadow-soft lg:col-span-2">
          <h2 className="font-semibold">Contact our team</h2>
          <form className="mt-4 grid gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Ticket created"); (e.target as HTMLFormElement).reset(); }}>
            <div><Label>Subject</Label><Input required className="mt-1.5" /></div>
            <div><Label>Message</Label><Textarea required rows={6} className="mt-1.5" /></div>
            <div><Button className="rounded-xl">Send message</Button></div>
          </form>
        </Card>
        <div className="space-y-4">
          <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
            <h3 className="font-semibold">Documentation</h3>
            <p className="mt-1 text-sm text-muted-foreground">Get up and running with our guides and API reference.</p>
            <Button asChild variant="outline" size="sm" className="mt-3 rounded-xl"><Link to="/docs">Open docs <ExternalLink className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </Card>
          <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
            <h3 className="font-semibold">Status page</h3>
            <p className="mt-1 text-sm text-muted-foreground">All systems operational.</p>
            <Button variant="outline" size="sm" className="mt-3 rounded-xl">View status <ExternalLink className="ml-1 h-3.5 w-3.5" /></Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
