import React, { useState } from "react";
import { Plus, Bot, Rocket, BarChart3, Code2, Folder, ExternalLink, FileText, Lightbulb, Grid3X3, List, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, Users, Building, Tag, Key, Globe, Shield, Database, Server, AlertCircle, Calendar } from "lucide-react";
import { ProjectEditor } from "@/components/ProjectEditor";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";

export const Dashboard = () => {
  const { projects, analytics, addProject, deleteProject, updateProject, loadProjects } = useAppStore();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  
  // Load projects when user authenticates
  React.useEffect(() => {
    console.log('=== DASHBOARD USER EFFECT ===');
    console.log('User:', user);
    console.log('Projects count:', projects.length);
    
    if (user && projects.length === 0) {
      console.log('Loading projects for authenticated user...');
      loadProjects();
    }
  }, [user, loadProjects, projects.length]);

  const handleStartNewProject = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Create a new empty project template for the ProjectEditor
    const newProjectTemplate = {
      id: 'new-project-' + Date.now(),
      name: '',
      description: '',
      status: 'planning',
      progress: 0,
      lastActivity: new Date().toISOString().split('T')[0],
      repository: '',
      deployment: '',
      primaryUrl: '',
      issues: 0,
      technologies: [],
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      ai_platform: 'mocha',
      project_type: 'web',
      credits_used: 0,
      initial_budget_credits: 100,
      credits_remaining: 100,
      github_repo_url: '',
      netlify_url: '',
      netlify_dev_url: '',
      vercel_url: '',
      vercel_dev_url: '',
      lovable_live_url: '',
      lovable_dev_url: '',
      platform_url: '',
      mocha_published_url: '',
      time_to_deploy_hours: null,
      build_success_rate: null,
      deployment_success_rate: null,
      features_completed: [],
      features_pending: [],
      known_bugs: []
    };
    setEditingProject(newProjectTemplate);
    setIsCreatingNewProject(true);
  };

  const handleCompareAI = () => {
    navigate('/ai');
  };

  const handleDeployProject = () => {
    navigate('/deployment');
  };

  const handleAnalytics = () => {
    navigate('/analytics');
  };

  const handleProjectClick = (project: any) => {
    console.log('Project data:', project); // Show ALL project data
    console.log('project.primaryUrl:', project.primaryUrl);
    console.log('project.deployment:', project.deployment);
    
    // Priority: primaryUrl first, then try deployment field as fallback
    const urlToOpen = project.primaryUrl || project.deployment;
    
    if (urlToOpen) {
      // Ensure URL has proper protocol
      const finalUrl = urlToOpen.startsWith('http') ? urlToOpen : `https://${urlToOpen}`;
      console.log('Opening URL:', finalUrl, 'from project:', project.name);
      window.open(finalUrl, '_blank');
    } else {
      console.log('No URL found for project:', project.name, 'primaryUrl:', project.primaryUrl, 'deployment:', project.deployment);
      toast({
        title: "No Primary URL",
        description: "This project doesn't have a primary URL set. Edit the project to set one.",
        variant: "destructive"
      });
    }
  };

  const platformIcons: { [key: string]: React.ReactNode } = {
    mocha: <div className="w-2 h-2 rounded-full bg-purple-500"></div>,
    lovable: <div className="w-2 h-2 rounded-full bg-pink-500"></div>,
    bolt: <div className="w-2 h-2 rounded-full bg-yellow-500"></div>,
    claude: <div className="w-2 h-2 rounded-full bg-orange-500"></div>,
    chatgpt: <div className="w-2 h-2 rounded-full bg-green-500"></div>
  };

  const platformPerformance = [
    { name: 'Mocha', type: 'Full-stack development', rate: '95%', color: 'text-purple-600' },
    { name: 'Claude', type: 'Code analysis', rate: '88%', color: 'text-orange-600' },
    { name: 'ChatGPT', type: 'Feature development', rate: '82%', color: 'text-green-600' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, arnold</h1>
          <p className="text-gray-600">
            {analytics.totalProjects} projects • {analytics.activeProjects} active • 1000 credits remaining
          </p>
        </div>
        
        <Button onClick={handleStartNewProject} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{analytics.totalProjects}</div>
                <div className="text-xs text-muted-foreground">Total Projects</div>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <Folder className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{analytics.activeProjects}</div>
                <div className="text-xs text-muted-foreground">Active Projects</div>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Code2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">0%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">0</div>
                <div className="text-xs text-muted-foreground">Credits Used</div>
              </div>
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Lightbulb className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleStartNewProject}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Start New Project</div>
                <div className="text-sm text-gray-500">Create a new AI development project</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleCompareAI}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Compare AI Assistants</div>
                <div className="text-sm text-gray-500">Analyze performance across platforms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleDeployProject}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Rocket className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Deploy Projects</div>
                <div className="text-sm text-gray-500">Manage deployments and publishing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="col-span-2">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Projects
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className="rounded-r-none"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => navigate('/projects')}>View All</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === 'list' ? (
                <div className="space-y-3">
                  {projects.slice(0, 5).map((project) => (
                    <div 
                      key={project.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                      onClick={() => handleProjectClick(project)}
                    >
                      <div className="flex items-center gap-3">
                        {platformIcons[project.ai_platform || 'mocha'] || platformIcons.mocha}
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                          <div className="text-xs text-gray-500">{project.ai_platform || 'mocha'} • {project.progress}% complete</div>
                        </div>
                      </div>
                       <div className="flex items-center gap-2">
                         <span className={`text-xs px-2 py-1 rounded-full ${
                           project.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                           project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                           project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                           'bg-gray-100 text-gray-700'
                         }`}>
                           {project.status}
                         </span>
                         <Button
                           size="sm"
                           variant="ghost"
                           onClick={(e) => {
                             e.stopPropagation();
                             setEditingProject(project);
                           }}
                           className="h-8 px-2 text-blue-600 hover:bg-blue-50"
                         >
                           <Edit className="h-4 w-4" />
                         </Button>
                         <Button
                           size="sm"
                           variant="ghost"
                           onClick={(e) => {
                             e.stopPropagation();
                             if (project.id) {
                               deleteProject(project.id);
                               toast({
                                 title: "Project Deleted",
                                 description: `${project.name} has been deleted successfully.`,
                               });
                             }
                           }}
                           className="h-8 px-2 text-red-600 hover:bg-red-50"
                         >
                           <Trash2 className="h-4 w-4" />
                         </Button>
                         <button
                           onClick={(e) => {
                             e.stopPropagation();
                             handleProjectClick(project);
                           }}
                           className="p-1 hover:bg-gray-100 rounded"
                         >
                           <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                         </button>
                       </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {projects.slice(0, 3).map((project) => (
                    <Card 
                      key={project.id}
                      className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
                      onClick={() => handleProjectClick(project)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              project.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                              project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                              project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingProject(project);
                              }}
                              className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (project.id) {
                                  deleteProject(project.id);
                                  toast({
                                    title: "Project Deleted",
                                    description: `${project.name} has been deleted successfully.`,
                                  });
                                }
                              }}
                              className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-primary/10">
                              <BarChart3 className="h-3 w-3 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{project.progress}%</div>
                              <div className="text-xs text-gray-500">Progress</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-red-500/10">
                              <AlertCircle className="h-3 w-3 text-red-600" />
                            </div>
                            <div>
                              <div className="font-medium">{project.issues}</div>
                              <div className="text-xs text-gray-500">Issues</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="p-1 rounded bg-green-500/10">
                              <Calendar className="h-3 w-3 text-green-600" />
                            </div>
                            <div>
                              <div className="font-medium text-xs">{project.lastActivity}</div>
                              <div className="text-xs text-gray-500">Activity</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Platform Performance */}
        <div>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Performance
                </CardTitle>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformPerformance.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{platform.name}</div>
                      <div className="text-xs text-gray-500">{platform.type}</div>
                    </div>
                    <div className={`text-sm font-semibold ${platform.color}`}>
                      {platform.rate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Development Metrics */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Development Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.5h</div>
              <div className="text-xs text-gray-500">Avg Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-xs text-gray-500">Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1000</div>
              <div className="text-xs text-gray-500">Credits Left</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate('/projects')}>
          <Folder className="h-4 w-4 mr-2" />
          Manage Projects
        </Button>
        <Button variant="outline" onClick={handleCompareAI}>
          <Bot className="h-4 w-4 mr-2" />
          AI Assistants
        </Button>
        <Button variant="outline" onClick={handleAnalytics}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <ProjectEditor
          project={editingProject}
          isOpen={!!editingProject}
          onClose={() => {
            setEditingProject(null);
            setIsCreatingNewProject(false);
          }}
          isCreating={isCreatingNewProject}
        />
      )}

      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </div>
  );
};