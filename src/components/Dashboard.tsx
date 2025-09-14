import { Sidebar } from "./Sidebar";
import { Plus, Bot, Rocket, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";

export const Dashboard = () => {
  const { projects } = useAppStore();
  const { toast } = useToast();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleStartNewProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleCompareAI = () => {
    toast({
      title: "Compare AI Assistance",
      description: "AI comparison feature coming soon!",
    });
  };

  const handleDeployProject = () => {
    toast({
      title: "Deploy Project",
      description: "Project deployment feature coming soon!",
    });
  };

  const handleProjectClick = (project: any) => {
    if (project.deployment) {
      window.open(`https://${project.deployment}`, '_blank');
    } else {
      toast({
        title: "No Deployment URL",
        description: "This project doesn't have a deployment URL set.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={handleStartNewProject}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Start New Project
          </Button>
          <Button 
            onClick={handleCompareAI}
            variant="outline"
            className="border-border bg-background hover:bg-muted"
          >
            <Bot className="h-4 w-4 mr-2" />
            Compare AI Assistance
          </Button>
          <Button 
            onClick={handleDeployProject}
            variant="outline"
            className="border-border bg-background hover:bg-muted"
          >
            <Rocket className="h-4 w-4 mr-2" />
            Deploy Project
          </Button>
        </div>

        {/* Recent Projects */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-foreground font-medium">{project.name}</div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {project.status} • {project.lastActivity}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};