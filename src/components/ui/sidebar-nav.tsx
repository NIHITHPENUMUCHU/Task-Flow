import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Home, CheckSquare, Calendar, Settings, LogOut } from "lucide-react";

interface SidebarNavProps {
  onSignOut: () => void;
}

export function SidebarNav({ onSignOut }: SidebarNavProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link to="/" className="no-underline">
          <h2 className="text-xl font-bold text-primary">TaskFlow</h2>
          <p className="text-sm text-muted-foreground">Task Management</p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={isActive("/dashboard") ? "bg-accent text-accent-foreground" : ""}
            >
              <Link to="/dashboard" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={isActive("/dashboard/tasks") ? "bg-accent text-accent-foreground" : ""}
            >
              <Link to="/dashboard/tasks" className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" />
                <span>Tasks</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={isActive("/dashboard/calendar") ? "bg-accent text-accent-foreground" : ""}
            >
              <Link to="/dashboard/calendar" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Calendar</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={isActive("/dashboard/settings") ? "bg-accent text-accent-foreground" : ""}
            >
              <Link to="/dashboard/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={onSignOut} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}