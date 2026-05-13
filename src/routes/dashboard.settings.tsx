import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({ meta: [{ title: "Settings — SearchStack" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your profile, password and preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
            <form className="grid max-w-xl gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Saved"); }}>
              <div><Label>Name</Label><Input defaultValue="Jane Cooper" className="mt-1.5" /></div>
              <div><Label>Email</Label><Input type="email" defaultValue="jane@searchstack.dev" className="mt-1.5" /></div>
              <div><Label>Company</Label><Input defaultValue="Acme Inc." className="mt-1.5" /></div>
              <div><Button className="rounded-xl">Save changes</Button></div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
            <form className="grid max-w-xl gap-4" onSubmit={(e) => { e.preventDefault(); toast.success("Password updated"); }}>
              <div><Label>Current password</Label><Input type="password" className="mt-1.5" /></div>
              <div><Label>New password</Label><Input type="password" className="mt-1.5" /></div>
              <div><Label>Confirm new password</Label><Input type="password" className="mt-1.5" /></div>
              <div><Button className="rounded-xl">Update password</Button></div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
            {[
              ["Usage alerts", "Notify me at 80% and 100% of monthly quota."],
              ["Billing", "Receipts and payment failure notifications."],
              ["Product updates", "New features and changelog highlights."],
            ].map(([t, d]) => (
              <div key={t} className="flex items-center justify-between border-b border-border/60 py-4 last:border-b-0">
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="text-sm text-muted-foreground">{d}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="rounded-2xl border-border/70 p-6 shadow-soft">
            <div className="grid max-w-xl gap-4">
              <div className="flex items-center justify-between"><div><p className="font-medium">Strict cache</p><p className="text-sm text-muted-foreground">Always serve cached results when available.</p></div><Switch /></div>
              <div className="flex items-center justify-between"><div><p className="font-medium">Auto-retry on 429</p><p className="text-sm text-muted-foreground">Retry rate-limited requests once.</p></div><Switch defaultChecked /></div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
