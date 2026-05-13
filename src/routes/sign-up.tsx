import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "./sign-in";

export const Route = createFileRoute("/sign-up")({
  head: () => ({ meta: [{ title: "Sign up — SearchStack" }] }),
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Create your account" subtitle="Free 100 searches / month — no credit card required">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => navigate({ to: "/dashboard" }), 600);
        }}
      >
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required minLength={8} className="mt-1.5" />
        </div>
        <Button className="w-full rounded-xl" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account? <Link to="/sign-in" className="font-medium text-primary hover:underline">Sign in</Link>
      </p>
    </AuthShell>
  );
}
