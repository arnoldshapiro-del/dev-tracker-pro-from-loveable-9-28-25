import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, BarChart3, ExternalLink, Edit, Trash2, Grid3X3, List, X, Undo, Calendar, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppStore, Project } from "@/store/appStore";
import { ProjectEditor } from "@/components/ProjectEditor";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from "lucide-react";


const SortableProjectCard = ({ project, onEdit, onDelete, onOpen }: { 
  project: Project, 
  onEdit: (project: Project) => void,
  onDelete: (id: string) => void,
  onOpen: (project: Project) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'development': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'testing': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'deployed': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'on-hold': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'maintenance': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'abandoned': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const platformIcons: { [key: string]: React.ReactNode } = {
    mocha: <div className="w-2 h-2 rounded-full bg-purple-500"></div>,
    lovable: <div className="w-2 h-2 rounded-full bg-pink-500"></div>,
    bolt: <div className="w-2 h-2 rounded-full bg-yellow-500"></div>,
    claude: <div className="w-2 h-2 rounded-full bg-orange-500"></div>,
    chatgpt: <div className="w-2 h-2 rounded-full bg-green-500"></div>
  };

  return (
    <Card ref={setNodeRef} style={style} className="hover:shadow-md transition-all duration-200 group border border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div 
              {...attributes} 
              {...listeners}
              className="flex items-center justify-center w-6 h-6 text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h3 
                  className="font-semibold text-lg text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => onOpen(project)}
                >
                  {project.name}
                </h3>
                {project.ai_platform && (
                  <div className="flex items-center gap-1" title={`Built with ${project.ai_platform}`}>
                    {platformIcons[project.ai_platform] || <div className="w-2 h-2 rounded-full bg-gray-500"></div>}
                    <span className="text-xs text-muted-foreground">{project.ai_platform}</span>
                  </div>
                )}
              </div>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
              
              <div className="flex items-center gap-4 mb-4">
                <Badge className={getStatusColor(project.status)} variant="outline">
                  {project.status}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(project.lastActivity)}
                </div>
                {project.primaryUrl && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Globe className="h-4 w-4" />
                    <span className="text-xs">Primary URL set</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium ml-1">{project.progress}%</span>
                  </div>
                  {project.issues > 0 && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Issues:</span>
                      <span className="font-medium ml-1 text-red-600">{project.issues}</span>
                    </div>
                  )}
                  {project.credits_used !== undefined && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Credits:</span>
                      <span className="font-medium ml-1">{project.credits_used}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(project)}
                    className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(project.id)}
                    className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onOpen(project)}
                    className="h-8 w-8 p-0 hover:bg-gray-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.technologies.slice(0, 4).map((tech: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </CardContent>
    </Card>
  );
};

export const Dashboard = () => {
  const { projects, addProject, deleteProject, updateProject, loadProjects, reorderProjects } = useAppStore();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('cards');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{ project: Project; timeout: NodeJS.Timeout } | null>(null);

  // Load projects when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user, loadProjects]);

  // Filter projects based on search and status
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateNewProject = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    
    const newProjectTemplate = {
      id: 'new-project-' + Date.now(),
      name: '',
      description: '',
      status: 'planning' as Project['status'],
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

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsCreatingNewProject(false);
  };

  const handleDeleteProject = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Clear any existing timeout
    if (recentlyDeleted) {
      clearTimeout(recentlyDeleted.timeout);
    }

    // Delete the project
    deleteProject(projectId);
    
    // Set up undo functionality
    const timeout = setTimeout(() => {
      setRecentlyDeleted(null);
    }, 5000);

    setRecentlyDeleted({ project, timeout });

    toast({
      title: "Project Deleted",
      description: (
        <div className="flex items-center justify-between">
          <span>Project "{project.name}" has been deleted.</span>
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndoDelete}
            className="ml-2"
          >
            <Undo className="h-4 w-4 mr-1" />
            Undo
          </Button>
        </div>
      ),
      duration: 5000,
    });
  };

  const handleUndoDelete = () => {
    if (recentlyDeleted) {
      clearTimeout(recentlyDeleted.timeout);
      addProject({ ...recentlyDeleted.project } as Project);
      setRecentlyDeleted(null);
      toast({
        title: "Project Restored",
        description: `Project "${recentlyDeleted.project.name}" has been restored.`,
      });
    }
  };

  const handleOpenProject = (project: Project) => {
    const urlToOpen = project.primaryUrl || project.deployment;
    
    if (urlToOpen) {
      const finalUrl = urlToOpen.startsWith('http') ? urlToOpen : `https://${urlToOpen}`;
      window.open(finalUrl, '_blank');
    } else {
      toast({
        title: "No Primary URL",
        description: "This project doesn't have a primary URL set. Edit the project to set one.",
        variant: "destructive"
      });
    }
  };

  const handleProjectSave = (projectData: any) => {
    if (isCreatingNewProject) {
      const newId = Date.now().toString();
      const newProject = {
        ...projectData,
        id: newId,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      addProject({ ...newProject } as Project);
      toast({
        title: "Project Created",
        description: `Project "${newProject.name}" has been created successfully.`,
      });
    } else if (editingProject) {
      updateProject(editingProject.id, {
        ...projectData,
        updatedAt: new Date().toISOString().split('T')[0],
      });
      toast({
        title: "Project Updated",
        description: `Project "${projectData.name}" has been updated successfully.`,
      });
    }
    setEditingProject(null);
    setIsCreatingNewProject(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = filteredProjects.findIndex(project => project.id === active.id);
      const newIndex = filteredProjects.findIndex(project => project.id === over.id);
      
      const newOrder = arrayMove(filteredProjects, oldIndex, newIndex);
      const reorderedProjects = newOrder.map((project, index) => ({
        ...project,
        display_order: index
      }));
      
      reorderProjects(reorderedProjects);
    }
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return projects.length;
    return projects.filter(project => project.status === status).length;
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Projects Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your development projects
          </p>
        </div>
        
        <Button onClick={handleCreateNewProject} size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-foreground">{projects.length}</p>
              </div>
              <div className="p-3 bg-primary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-foreground">{getStatusCount('development')}</p>
              </div>
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{getStatusCount('completed')}</p>
              </div>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Planning</p>
                <p className="text-2xl font-bold text-foreground">{getStatusCount('planning')}</p>
              </div>
              <div className="p-3 bg-yellow-500/10 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status ({getStatusCount('all')})</SelectItem>
              <SelectItem value="planning">Planning ({getStatusCount('planning')})</SelectItem>
              <SelectItem value="development">Development ({getStatusCount('development')})</SelectItem>
              <SelectItem value="testing">Testing ({getStatusCount('testing')})</SelectItem>
              <SelectItem value="deployment">Deployment ({getStatusCount('deployment')})</SelectItem>
              <SelectItem value="completed">Completed ({getStatusCount('completed')})</SelectItem>
              <SelectItem value="on-hold">On Hold ({getStatusCount('on-hold')})</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
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
        </div>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-muted-foreground">
                {projects.length === 0 ? (
                  <div>
                    <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                    <p className="mb-4">Get started by creating your first project</p>
                    <Button onClick={handleCreateNewProject}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Project
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-medium mb-2">No projects match your filters</h3>
                    <p>Try adjusting your search terms or filters</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredProjects.map(p => p.id)} strategy={verticalListSortingStrategy}>
              <div className="grid gap-4">
                {filteredProjects.map((project) => (
                  <SortableProjectCard
                    key={project.id}
                    project={project}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                    onOpen={handleOpenProject}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Project Editor Modal */}
      {editingProject && (
        <ProjectEditor
          project={isCreatingNewProject ? undefined : editingProject}
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