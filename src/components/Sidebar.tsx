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
  HelpCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderOpen, label: "Projects" },
  { icon: Bot, label: "AI Assistants" },
  { icon: Rocket, label: "Deployment" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Users, label: "Team" },
  { icon: Workflow, label: "Workflows" },
  { icon: Shield, label: "Security" },
  { icon: Smartphone, label: "Mobile" },
  { icon: Puzzle, label: "Integrations" },
  { icon: HelpCircle, label: "Help" },
];

export const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">DevTracker Pro</h1>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item, index) => (
            <li key={index}>
              <button
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-sidebar-accent",
                  item.active 
                    ? "bg-sidebar-accent text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};