import { Check, Upload, Link, Settings2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ChecklistItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  completed?: boolean;
  actionLabel: string;
  variant?: "default" | "success";
  onAction: () => void;
}

const ChecklistItem = ({ 
  icon, 
  title, 
  description, 
  completed = false, 
  actionLabel,
  variant = "default",
  onAction
}: ChecklistItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/50 transition-smooth hover:bg-card/80">
      <div className={cn(
        "flex items-center justify-center w-10 h-10 rounded-full",
        completed ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
      )}>
        {completed ? <Check className="h-5 w-5" /> : icon}
      </div>
      
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <Button 
        onClick={onAction}
        variant={variant === "success" ? "default" : "secondary"}
        size="sm"
        className={cn(
          variant === "success" && "bg-success hover:bg-success/90"
        )}
      >
        {actionLabel}
      </Button>
    </div>
  );
};

export const SetupChecklist = () => {
  const { toast } = useToast();
  const [completed, setCompleted] = useState({
    import: true,
    connect: false,
    customize: false
  });

  const handleConnect = () => {
    setCompleted(prev => ({ ...prev, connect: true }));
    toast({
      title: "Platforms Connected!",
      description: "Successfully linked your GitHub and other accounts.",
    });
  };

  const handleCustomize = () => {
    setCompleted(prev => ({ ...prev, customize: true }));
    toast({
      title: "Dashboard Customized!",
      description: "Your workspace has been personalized.",
    });
  };

  const handleExplore = () => {
    toast({
      title: "Exploring Features!",
      description: "Discovering advanced tracking and analytics.",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Settings2 className="h-5 w-5 text-primary" />
        Setup Checklist
      </h2>
      
      <div className="space-y-3">
        <ChecklistItem
          icon={<Upload className="h-5 w-5" />}
          title="Import Your Projects"
          description="Get all your existing projects into DevTracker Pro"
          completed={completed.import}
          actionLabel="Complete"
          variant="success"
          onAction={() => toast({ title: "Already Complete!", description: "Projects imported successfully." })}
        />
        
        <ChecklistItem
          icon={<Link className="h-5 w-5" />}
          title="Connect Platforms"
          description="Link your GitHub, Netlify, and AI platform accounts"
          completed={completed.connect}
          actionLabel={completed.connect ? "Connected" : "Connect"}
          variant={completed.connect ? "success" : "default"}
          onAction={handleConnect}
        />
        
        <ChecklistItem
          icon={<Settings2 className="h-5 w-5" />}
          title="Customize Dashboard"
          description="Set up your workspace and preferences"
          completed={completed.customize}
          actionLabel={completed.customize ? "Customized" : "Customize"}
          variant={completed.customize ? "success" : "default"}
          onAction={handleCustomize}
        />
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
        <div className="flex items-center gap-3">
          <Zap className="h-5 w-5 text-primary" />
          <div>
            <h3 className="font-semibold">Explore Features</h3>
            <p className="text-sm text-muted-foreground">Discover advanced tracking and analytics</p>
          </div>
          <Button 
            onClick={handleExplore}
            size="sm" 
            className="ml-auto"
          >
            Explore
          </Button>
        </div>
      </div>
    </div>
  );
};