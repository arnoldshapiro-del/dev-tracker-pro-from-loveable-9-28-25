import { Sidebar } from "./Sidebar";
import { Plus, Bot, Rocket, BarChart3, ExternalLink, Activity, Folder, CheckCircle, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore, Project } from "@/store/appStore";
import { ProjectEditor } from "./ProjectEditor";
import { useState } from "react";

export const Dashboard = () => {
  const { projects, deleteProject } = useAppStore();
  const { toast } = useToast();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  
  // Force refresh projects data on component mount
  console.log('Dashboard - Current projects from store:', projects);

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
    console.log('=== PROJECTS PAGE LINK DEBUG ===');
    console.log('Project data:', project);
    console.log('project.primaryUrl:', project.primaryUrl);
    console.log('project.lovable_live_url:', project.lovable_live_url);
    console.log('project.lovable_dev_url:', project.lovable_dev_url);
    console.log('project.deployment:', project.deployment);
    
    // Use same priority as projects page: primaryUrl, lovable URLs, then deployment, then repository
    const url = project.primaryUrl || project.lovable_live_url || project.lovable_dev_url || project.deployment || project.repository;
    
    console.log('Selected URL to open:', url);
    
    if (url) {
      const finalUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(finalUrl, '_blank');
      toast({
        title: "Opening Project",
        description: `Opening ${project.name}...`,
      });
    } else {
      toast({
        title: "No URL Available",
        description: "This project doesn't have a deployment or repository URL configured.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProject = (project: Project) => {
    if (project.id) {
      deleteProject(project.id);
      toast({
        title: "Project Deleted",
        description: `${project.name} has been deleted successfully.`,
      });
    }
  };

  const handleEditProject = (project: Project) => {
    console.log('=== DASHBOARD EDIT DEBUG ===');
    console.log('Setting editing project:', JSON.stringify(project, null, 2));
    setEditingProject(project);
  };

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 p-6 bg-gray-50">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, Arnold</h1>
          <p className="text-gray-600">Here's what's happening with your projects</p>
        </div>

        {/* Top Action Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <Card 
            className="bg-purple-600 text-white cursor-pointer hover:bg-purple-700 transition-colors border-0 shadow-lg"
            onClick={handleStartNewProject}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5" />
                <div>
                  <div className="font-semibold text-sm">Start New Project</div>
                  <div className="text-xs opacity-90">Quickly create new project</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-green-500 text-white cursor-pointer hover:bg-green-600 transition-colors border-0 shadow-lg"
            onClick={handleCompareAI}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5" />
                <div>
                  <div className="font-semibold text-sm">Compare AI Assistants</div>
                  <div className="text-xs opacity-90">Find the most suitable assistant</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors border-0 shadow-lg"
            onClick={handleDeployProject}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Rocket className="h-5 w-5" />
                <div>
                  <div className="font-semibold text-sm">Deploy Projects</div>
                  <div className="text-xs opacity-90">Deploy and host your project</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="bg-orange-500 text-white cursor-pointer hover:bg-orange-600 transition-colors border-0 shadow-lg"
            onClick={handleAnalytics}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5" />
                <div>
                  <div className="font-semibold text-sm">Analytics</div>
                  <div className="text-xs opacity-90">Monitor and analyze your projects</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Projects */}
        <Card className="mb-8 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">📁 Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {projects.map((project, index) => (
                <div 
                  key={project.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Folder className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                      <div className="text-xs text-gray-500">Last edited {project.lastActivity}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      project.status === 'active' ? 'bg-green-100 text-green-700' : 
                      project.status === 'completed' ? 'bg-blue-100 text-blue-700' : 
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditProject(project);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Edit project"
                    >
                      <Edit className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteProject(project);
                      }}
                      className="p-1 hover:bg-red-100 rounded"
                      title="Delete project"
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProjectClick(project);
                      }}
                      className="p-1 hover:bg-gray-100 rounded"
                      title="Open project"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Development Metrics */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold text-gray-900">📊 Development Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.5h</div>
                <div className="text-xs text-gray-500">Avg working time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">9</div>
                <div className="text-xs text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">1000</div>
                <div className="text-xs text-gray-500">Total code</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">88%</div>
                <div className="text-xs text-gray-500">Success rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Editor Modal */}
      <ProjectEditor
        project={editingProject || undefined}
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
      />
    </div>
  );
};