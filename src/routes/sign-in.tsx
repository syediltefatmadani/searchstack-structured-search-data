import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";

export const Route = createFileRoute("/sign-in")({
  head: () => ({ meta: [{ title: "Sign in — SearchStack" }] }),
  component: SignIn,
});

function SignIn() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your SearchStack account">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/dashboard" }), 500);
        }}
      >
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required className="mt-1.5" placeholder="you@company.com" />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">Forgot?</Link>
          </div>
          <Input id="password" type="password" required className="mt-1.5" />
        </div>
        <Button className="w-full rounded-xl" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        New here? <Link to="/sign-up" className="font-medium text-primary hover:underline">Create an account</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen place-items-center bg-hero px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <Card className="rounded-2xl border-border/70 p-7 shadow-elev">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </Card>
      </div>
    </div>
  );
}
