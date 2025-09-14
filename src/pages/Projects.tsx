import { useState } from "react";
import { useAppStore, Project } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Github, ExternalLink, Calendar, AlertCircle, TrendingUp, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ProjectEditor } from "@/components/ProjectEditor";
import { ProjectTabs } from "@/components/ProjectTabs";
import { TemplateMarketplace } from "@/components/TemplateMarketplace";
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onOpen: (project: Project) => void;
}

const SortableProjectCard = ({ project, onEdit, onOpen }: SortableProjectCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'on-hold': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className="hover:shadow-lg transition-shadow cursor-pointer"
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div 
              {...attributes} 
              {...listeners} 
              className="cursor-grab hover:text-primary p-1 rounded"
            >
              <GripVertical className="h-4 w-4" />
            </div>
            <CardTitle 
              className="text-lg cursor-pointer hover:text-primary"
              onClick={() => onOpen(project)}
            >
              {project.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
              }}
              className="text-xs"
            >
              <Plus className="h-3 w-3 mr-1" />
              Edit
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all" 
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span>{project.issues} issues</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span>{project.lastActivity}</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {project.repository && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.repository, '_blank');
              }}
            >
              <Github className="h-3 w-3 mr-1" />
              Repo
            </Button>
          )}
          {project.deployment && (
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.deployment, '_blank');
              }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Live
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const Projects = () => {
  const { projects, addProject, updateProject, deleteProject, reorderProjects } = useAppStore();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active' as const,
    progress: 0,
    lastActivity: 'Just created',
    issues: 0,
    technologies: [] as string[],
    ai_platform: 'mocha',
    project_type: 'web',
    platform_url: '',
    github_repo_url: '',
    netlify_url: '',
    credits_used: 0,
    credits_remaining: 100,
    initial_budget_credits: 100
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) {
      toast({
        title: "Error",
        description: "Project name is required",
        variant: "destructive"
      });
      return;
    }

    addProject(newProject);
    toast({
      title: "Project Created!",
      description: `${newProject.name} has been added successfully.`,
    });

    setNewProject({
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      lastActivity: 'Just created',
      issues: 0,
      technologies: [],
      ai_platform: 'mocha',
      project_type: 'web',
      platform_url: '',
      github_repo_url: '',
      netlify_url: '',
      credits_used: 0,
      credits_remaining: 100,
      initial_budget_credits: 100
    });
    setIsCreateModalOpen(false);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = projects.findIndex((item) => item.id === active.id);
      const newIndex = projects.findIndex((item) => item.id === over?.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);
      reorderProjects(newProjects);
      
      toast({
        title: "Projects Reordered",
        description: "Project order has been updated.",
      });
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleOpenProject = (project: Project) => {
    // Open the project's live URL or deployment URL
    const url = project.deployment || project.repository;
    if (url) {
      window.open(url, '_blank');
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


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your development projects</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple border-0">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New AI Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Amazing App"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What does this project do?"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ai_platform">AI Platform *</Label>
                <Select value={newProject.ai_platform} onValueChange={(value) => setNewProject(prev => ({ ...prev, ai_platform: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mocha">Mocha</SelectItem>
                    <SelectItem value="lovable">Lovable</SelectItem>
                    <SelectItem value="bolt">Bolt</SelectItem>
                    <SelectItem value="emergent">Emergent</SelectItem>
                    <SelectItem value="genspark">GenSpark</SelectItem>
                    <SelectItem value="google-opal">Google Opal</SelectItem>
                    <SelectItem value="google-gemini">Google Gemini</SelectItem>
                    <SelectItem value="chatgpt-5">ChatGPT 5</SelectItem>
                    <SelectItem value="cursor">Cursor</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="replit">Replit</SelectItem>
                    <SelectItem value="abacus-ai">Abacus AI</SelectItem>
                    <SelectItem value="manus">Manus</SelectItem>
                    <SelectItem value="minimax">Minimax</SelectItem>
                    <SelectItem value="custom">Custom Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="project_type">Project Type</Label>
                <Select value={newProject.project_type} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Web App" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web App</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="medical">Medical App</SelectItem>
                    <SelectItem value="ecommerce">Ecommerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ai">AI Tool</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="platform_url">AI Platform Project URL</Label>
                <Input
                  id="platform_url"
                  value={newProject.platform_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, platform_url: e.target.value }))}
                  placeholder="https://mocha.app/projects/123"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="github_repo_url">GitHub Repository URL</Label>
                <Input
                  id="github_repo_url"
                  value={newProject.github_repo_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, github_repo_url: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="netlify_url">Netlify Deployment URL</Label>
                <Input
                  id="netlify_url"
                  value={newProject.netlify_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, netlify_url: e.target.value }))}
                  placeholder="https://your-app.netlify.app"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="credits_remaining">Credits Remaining</Label>
                  <Input
                    id="credits_remaining"
                    type="number"
                    value={newProject.credits_remaining || 100}
                    onChange={(e) => setNewProject(prev => ({ ...prev, credits_remaining: parseInt(e.target.value) || 0 }))}
                    placeholder="Credits left"
                    className="bg-green-50 border-green-200"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="credits_used">Credits Used (Auto-Calculated)</Label>
                  <Input
                    id="credits_used"
                    type="number"
                    value={newProject.credits_used || 0}
                    onChange={(e) => setNewProject(prev => ({ ...prev, credits_used: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="bg-red-50 border-red-200"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="initial_budget_credits">Initial Budget (Total Credits)</Label>
                <Input
                  id="initial_budget_credits"
                  type="number"
                  value={newProject.initial_budget_credits || 100}
                  onChange={(e) => setNewProject(prev => ({ ...prev, initial_budget_credits: parseInt(e.target.value) || 0 }))}
                  placeholder="100"
                  className="bg-blue-50 border-blue-200"
                />
              </div>
            </div>
            
            <div className="flex justify-between gap-2">
              <Button 
                variant="destructive" 
                onClick={() => setIsCreateModalOpen(false)}
                className="bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
              >
                ✕ CANCEL & CLOSE MODAL
              </Button>
              <Button 
                onClick={handleCreateProject}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Create Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Projects</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Drag to Reorder Notice */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <span>💡 Drag to reorder projects</span>
        <span>{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Projects Grid with Drag & Drop */}
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={filteredProjects.map(p => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <SortableProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onOpen={handleOpenProject}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}

      {/* Project Editor Modal */}
      <ProjectEditor
        project={editingProject || undefined}
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
      />
    </div>
  );
};