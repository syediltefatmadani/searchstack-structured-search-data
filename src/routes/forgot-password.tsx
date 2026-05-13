import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "./sign-in";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Forgot password — SearchStack" }] }),
  component: Forgot,
});

function Forgot() {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a reset link">
      {sent ? (
        <div className="space-y-4 text-sm">
          <p>If an account exists for that email, a reset link is on the way.</p>
          <Button asChild variant="outline" className="w-full rounded-xl"><Link to="/sign-in">Back to sign in</Link></Button>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Reset link sent");
          }}
        >
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className="mt-1.5" />
          </div>
          <Button className="w-full rounded-xl">Send reset link</Button>
        </form>
      )}
    </AuthShell>
  );
}
