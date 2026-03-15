import { Outlet } from "react-router-dom";
import { LayoutDashboard, BookOpen, ClipboardCheck, FolderOpen, User, TestTube2, Rocket, FileCheck } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Practice", url: "/dashboard/practice", icon: BookOpen },
  { title: "Assessments", url: "/dashboard/assessments", icon: ClipboardCheck },
  { title: "Resources", url: "/dashboard/resources", icon: FolderOpen },
  { title: "Profile", url: "/dashboard/profile", icon: User },
  { title: "Testing", url: "/dashboard/testing", icon: TestTube2 },
  { title: "Ship", url: "/dashboard/ship", icon: Rocket },
];

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-md">
        <span className="text-lg font-bold text-sidebar-foreground tracking-tight">
          Placement Prep
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border flex items-center justify-between px-md bg-card">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="text-base font-semibold">Placement Prep</h2>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          </header>
          {/* Main content */}
          <main className="flex-1 p-md">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
