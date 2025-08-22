import { Home, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "Cursos", active: false },
  { icon: BarChart3, label: "Relatórios", active: false },
];

export const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold text-sidebar-foreground">
          <span className="text-sidebar-primary">C</span>PDF
        </h1>
        <p className="text-xs text-sidebar-foreground/70 mt-1">Acme Inc</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-sidebar-accent group",
                  item.active
                    ? "bg-sidebar-accent text-sidebar-primary border border-sidebar-border shadow-card"
                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom action */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent rounded-lg transition-all duration-300">
          <span className="w-2 h-2 bg-sidebar-primary rounded-full"></span>
          Recolher
        </button>
      </div>
    </div>
  );
};