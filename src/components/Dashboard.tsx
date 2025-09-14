import { Sidebar } from "./Sidebar";
import { Plus, Bot, Rocket, BarChart3, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/appStore";
import { useState } from "react";

export const Dashboard = () => {
  const { projects } = useAppStore();
  const { toast } = useToast();

  const handleStartNewProject = () => {
    toast({
      title: "Start New Project",
      description: "Creating new project...",
    });
  };

  const handleCompareAI = () => {
    toast({
      title: "Compare AI Assistants",
      description: "Opening AI comparison...",
    });
  };

  const handleDeployProject = () => {
    toast({
      title: "Deploy Projects",
      description: "Opening deployment panel...",
    });
  };

  const handleAnalytics = () => {
    toast({
      title: "Analytics",
      description: "Opening analytics dashboard...",
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
        {/* Top Action Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card 
            className="bg-purple-500 text-white cursor-pointer hover:bg-purple-600 transition-colors border-0"
            onClick={handleStartNewProject}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Plus className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Start New Project</div>
                  <div className="text-sm opacity-90">Quickly create new project</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors border-0"
            onClick={handleCompareAI}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Compare AI Assistants</div>
                  <div className="text-sm opacity-90">Find the most suitable assistant</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors border-0"
            onClick={handleDeployProject}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Rocket className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Deploy Projects</div>
                  <div className="text-sm opacity-90">Deploy and host your project</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors border-0"
            onClick={handleAnalytics}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-6 w-6" />
                <div>
                  <div className="font-semibold">Analytics</div>
                  <div className="text-sm opacity-90">Monitor and analyze your projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {projects.map((project) => (
                <div 
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-muted cursor-pointer transition-colors border border-border"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{project.name}</div>
                      <div className="text-sm text-muted-foreground">{project.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">{project.lastActivity}</div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Development Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Development Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500">2.5h</div>
                <div className="text-sm text-muted-foreground">Avg working time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500">9</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500">1000</div>
                <div className="text-sm text-muted-foreground">Total code</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">88%</div>
                <div className="text-sm text-muted-foreground">Success rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};