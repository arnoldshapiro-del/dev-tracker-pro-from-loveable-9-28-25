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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: FolderOpen, label: "Projects", id: "projects" },
  { icon: Bot, label: "AI Assistants", id: "ai" },
  { icon: Rocket, label: "Deployment", id: "deployment" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Users, label: "Team", id: "team" },
  { icon: Workflow, label: "Workflows", id: "workflows" },
  { icon: Shield, label: "Security", id: "security" },
  { icon: Smartphone, label: "Mobile", id: "mobile" },
  { icon: Puzzle, label: "Integrations", id: "integrations" },
  { icon: HelpCircle, label: "Help", id: "help" },
];

export const Sidebar = () => {
  const { toast } = useToast();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (item: typeof sidebarItems[0]) => {
    setActiveItem(item.id);
    toast({
      title: `${item.label} Selected`,
      description: `Navigating to ${item.label} section.`,
    });
  };

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
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth hover:bg-sidebar-accent",
                  activeItem === item.id 
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