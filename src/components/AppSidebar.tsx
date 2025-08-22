import { Home, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Cursos", active: false },
  { icon: BarChart3, label: "Relatórios", active: false },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-sidebar-foreground">
            <span className="text-sidebar-primary">C</span>PDF
          </h1>
          {!isCollapsed && (
            <p className="text-xs text-sidebar-foreground/70 mt-1">Acme Inc</p>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a
                      href="#"
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-sidebar-accent group",
                        item.active
                          ? "bg-sidebar-accent text-sidebar-primary border border-sidebar-border shadow-card"
                          : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom action */}
        {!isCollapsed && (
          <div className="mt-auto p-4 border-t border-sidebar-border">
            <SidebarTrigger className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition-all duration-300">
              <span className="w-2 h-2 bg-sidebar-primary rounded-full"></span>
              Recolher
            </SidebarTrigger>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}