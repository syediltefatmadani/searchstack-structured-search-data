import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthShell } from "./sign-in";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — SearchStack" }] }),
  component: Reset,
});

function Reset() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <AuthShell title="Choose a new password" subtitle="Use at least 8 characters">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setTimeout(() => {
            toast.success("Password updated");
            navigate({ to: "/sign-in" });
          }, 600);
        }}
      >
        <div>
          <Label htmlFor="p1">New password</Label>
          <Input id="p1" type="password" required minLength={8} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="p2">Confirm password</Label>
          <Input id="p2" type="password" required minLength={8} className="mt-1.5" />
        </div>
        <Button className="w-full rounded-xl" disabled={loading}>{loading ? "Updating…" : "Update password"}</Button>
      </form>
    </AuthShell>
  );
}
