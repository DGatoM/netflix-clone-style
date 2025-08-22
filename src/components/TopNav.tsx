import { SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export const TopNav = () => {
  return (
    <div className="flex items-center justify-between mb-4 lg:mb-6">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <SidebarTrigger className="lg:hidden">
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground">Dashboard</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          Ver todos
        </button>
        
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-muted"></div>
          <div className="w-8 h-8 rounded-full bg-muted/60"></div>
        </div>
      </div>
    </div>
  );
};