import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/_marketing/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SearchStack" },
      { name: "description", content: "Talk to sales, ask product questions or share feedback with the SearchStack team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-2 md:px-6">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Get in touch</h1>
        <p className="mt-4 text-muted-foreground">Whether you're evaluating SearchStack or already in production, we'd love to hear from you.</p>
        <div className="mt-8 space-y-4 text-sm">
          <p><span className="text-muted-foreground">Sales:</span> sales@searchstack.dev</p>
          <p><span className="text-muted-foreground">Support:</span> support@searchstack.dev</p>
          <p><span className="text-muted-foreground">Press:</span> press@searchstack.dev</p>
        </div>
      </div>
      <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              toast.success("Message sent — we'll be in touch shortly.");
              (e.target as HTMLFormElement).reset();
            }, 700);
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" required className="mt-1.5" placeholder="Jane Cooper" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-1.5" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" className="mt-1.5" placeholder="Acme Inc." />
          </div>
          <div>
            <Label htmlFor="message">How can we help?</Label>
            <Textarea id="message" required rows={5} className="mt-1.5" />
          </div>
          <Button type="submit" disabled={loading} className="w-full rounded-xl">
            {loading ? "Sending…" : "Send message"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
