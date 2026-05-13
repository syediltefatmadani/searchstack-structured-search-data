import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { teamMock } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/team")({
  head: () => ({ meta: [{ title: "Team — SearchStack" }] }),
  component: Team,
});

function Team() {
  const [team, setTeam] = useState(teamMock);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Developer");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="text-sm text-muted-foreground">Invite teammates and assign roles.</p>
      </div>

      <Card className="rounded-2xl border-border/70 p-5 shadow-soft">
        <form
          className="flex flex-wrap items-end gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setTeam([...team, { name: email.split("@")[0], email, role }]);
            setEmail("");
            toast.success("Invitation sent");
          }}
        >
          <div className="min-w-[260px] flex-1">
            <Label>Email</Label>
            <Input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" placeholder="teammate@company.com" />
          </div>
          <div className="w-44">
            <Label>Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="rounded-xl">Send invite</Button>
        </form>
      </Card>

      <Card className="rounded-2xl border-border/70 overflow-hidden shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-xs uppercase text-muted-foreground">
            <tr><th className="p-3 text-left">Member</th><th className="p-3 text-left">Email</th><th className="p-3 text-left">Role</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.email} className="border-t border-border/60">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 text-muted-foreground">{m.email}</td>
                <td className="p-3"><Badge variant="outline" className="rounded-full">{m.role}</Badge></td>
                <td className="p-3 text-right"><Button variant="ghost" size="sm">Remove</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
