import { 
  LayoutDashboard, 
  FolderOpen, 
  Bot, 
  Rocket, 
  BarChart3, 
  Users, 
  Workflow, 
  Shield, 
  Smartphone, 
  Puzzle, 
  HelpCircle,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/appStore";
import { NavLink, useLocation } from "react-router-dom";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
  { icon: Bot, label: "AI Assistants", path: "/ai" },
  { icon: Rocket, label: "Deployment", path: "/deployment" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Users, label: "Team", path: "/team" },
  { icon: Workflow, label: "Workflows", path: "/workflows" },
  { icon: Shield, label: "Security", path: "/security" },
  { icon: Smartphone, label: "Mobile", path: "/mobile" },
  { icon: Puzzle, label: "Integrations", path: "/integrations" },
  { icon: HelpCircle, label: "Help", path: "/help" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">DevTracker Pro</h1>
        <p className="text-xs text-muted-foreground mt-1">Developer Dashboard</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-sidebar-accent group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
                )}
              >
                <item.icon className="h-4 w-4 transition-colors" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          © 2024 DevTracker Pro
        </div>
      </div>
    </div>
  );
};