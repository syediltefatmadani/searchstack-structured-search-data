import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  KeyRound,
  PlayCircle,
  History,
  BarChart3,
  CreditCard,
  Users,
  Webhook,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";

const items = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { to: "/dashboard/playground", label: "Playground", icon: PlayCircle },
  { to: "/dashboard/history", label: "Search History", icon: History },
  { to: "/dashboard/analytics", label: "Usage Analytics", icon: BarChart3 },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { to: "/dashboard/team", label: "Team", icon: Users },
  { to: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
] as const;

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-3 py-3">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => {
                const active = path === it.to;
                return (
                  <SidebarMenuItem key={it.to}>
                    <SidebarMenuButton asChild isActive={active} tooltip={it.label}>
                      <Link to={it.to} className="flex items-center gap-2">
                        <it.icon className="h-4 w-4" />
                        <span>{it.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2 text-xs text-sidebar-foreground/70">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-primary-foreground text-xs">JC</span>
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-sidebar-foreground">Jane Cooper</span>
            <span>Pro plan</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
