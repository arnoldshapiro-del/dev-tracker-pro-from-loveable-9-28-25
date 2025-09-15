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
import { Search, Plus, Github, ExternalLink, Calendar, AlertCircle, TrendingUp, GripVertical, CalendarIcon, Users, Building, Tag, Key, Globe, Shield, Database, Server, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openProjectUrl } from "@/utils/projectUtils";
import { ProjectEditor } from "@/components/ProjectEditor";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
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
  onDelete: (project: Project) => void;
}

const SortableProjectCard = ({ project, onEdit, onOpen, onDelete }: SortableProjectCardProps) => {
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

  const gradients = [
    'gradient-coral', 'gradient-mint', 'gradient-sunset', 'gradient-ocean',
    'gradient-forest', 'gradient-lavender', 'gradient-gold', 'gradient-ruby',
    'gradient-sky', 'gradient-peach', 'gradient-emerald', 'gradient-plum',
    'gradient-bronze', 'gradient-electric'
  ];

  const getProjectGradient = (projectId: string) => {
    const index = projectId ? parseInt(projectId.slice(-1), 36) % gradients.length : 0;
    return gradients[index];
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="white-card hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[320px] min-w-[400px] p-8 hover:scale-[1.02] relative"
    >
      {/* Drag Handle */}
      <div 
        {...attributes} 
        {...listeners} 
        className="absolute top-4 right-4 cursor-grab hover:bg-gray-100 p-2 rounded opacity-70 hover:opacity-100"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Project Header */}
      <div className="mb-6">
        <h3 
          className="text-3xl font-bold text-foreground cursor-pointer hover:text-primary mb-2 pr-12"
          onClick={() => onOpen(project)}
        >
          {project.name}
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">{project.description}</p>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`chip ${
          project.status === 'active' ? 'chip-green' :
          project.status === 'completed' ? 'chip-blue' :
          project.status === 'planning' ? 'chip-amber' : 'chip-red'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-foreground mb-3">
          <span className="font-semibold text-lg">Progress</span>
          <span className="font-bold text-lg">{project.progress}%</span>
        </div>
        <div className="progress-bar w-full bg-secondary">
          <div 
            className="progress-bar bg-primary transition-all" 
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-red-500/10">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <div className="text-foreground font-semibold text-lg">{project.issues}</div>
            <div className="text-muted-foreground text-sm">Issues</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="text-foreground font-semibold text-lg">{project.lastActivity}</div>
            <div className="text-muted-foreground text-sm">Last Activity</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-auto">
        <Button 
          size="sm" 
          onClick={(e) => {
            e.stopPropagation();
            onEdit(project);
          }}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Edit Project
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project);
          }}
          className="border-red-300 text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </div>

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech, index) => (
              <span 
                key={index} 
                className="chip chip-blue"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="chip chip-blue">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
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
    initial_budget_credits: 100,
    // New fields
    team_members: [] as string[],
    project_category: 'web_app',
    framework_stack: [] as string[],
    project_priority: 'medium',
    deadline: null as Date | null,
    client_organization: '',
    project_status: 'planning',
    environment_variables: '',
    database_url: '',
    api_keys: [] as Array<{key: string, value: string}>,
    custom_domain: '',
    ssl_certificate: false,
    backup_frequency: 'weekly',
    project_tags: [] as string[]
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
      initial_budget_credits: 100,
      // Reset new fields
      team_members: [],
      project_category: 'web_app',
      framework_stack: [],
      project_priority: 'medium',
      deadline: null,
      client_organization: '',
      project_status: 'planning',
      environment_variables: '',
      database_url: '',
      api_keys: [],
      custom_domain: '',
      ssl_certificate: false,
      backup_frequency: 'weekly',
      project_tags: []
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
    openProjectUrl(project, toast);
  };

  const handleDeleteProject = (project: Project) => {
    if (project.id) {
      deleteProject(project.id);
      toast({
        title: "Project Deleted",
        description: `${project.name} has been deleted successfully.`,
      });
    } else {
      toast({
        title: "Cannot Delete Project",
        description: "This project doesn't have a valid ID.",
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
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New AI Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
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

              {/* Team Members */}
              <div className="grid gap-2">
                <Label htmlFor="team_members">Team Members</Label>
                <Input
                  id="team_members"
                  value={newProject.team_members.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, team_members: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="john@example.com, jane@example.com"
                />
              </div>

              {/* Project Category */}
              <div className="grid gap-2">
                <Label htmlFor="project_category">Project Category</Label>
                <Select value={newProject.project_category} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web_app">Web App</SelectItem>
                    <SelectItem value="mobile_app">Mobile App</SelectItem>
                    <SelectItem value="desktop_app">Desktop App</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Framework/Technology Stack */}
              <div className="grid gap-2">
                <Label htmlFor="framework_stack">Framework/Technology Stack</Label>
                <Input
                  id="framework_stack"
                  value={newProject.framework_stack.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, framework_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="React, Node.js, PostgreSQL, TypeScript"
                />
              </div>

              {/* Project Priority */}
              <div className="grid gap-2">
                <Label htmlFor="project_priority">Project Priority</Label>
                <Select value={newProject.project_priority} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline/Target Launch Date */}
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline/Target Launch Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newProject.deadline ? format(newProject.deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={newProject.deadline || undefined}
                      onSelect={(date) => setNewProject(prev => ({ ...prev, deadline: date || null }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Client/Organization */}
              <div className="grid gap-2">
                <Label htmlFor="client_organization">Client/Organization</Label>
                <Input
                  id="client_organization"
                  value={newProject.client_organization}
                  onChange={(e) => setNewProject(prev => ({ ...prev, client_organization: e.target.value }))}
                  placeholder="Acme Corp, Internal Project, etc."
                />
              </div>

              {/* Project Status */}
              <div className="grid gap-2">
                <Label htmlFor="project_status">Project Status</Label>
                <Select value={newProject.project_status} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
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

              {/* Environment Variables */}
              <div className="grid gap-2">
                <Label htmlFor="environment_variables">Environment Variables</Label>
                <Textarea
                  id="environment_variables"
                  value={newProject.environment_variables}
                  onChange={(e) => setNewProject(prev => ({ ...prev, environment_variables: e.target.value }))}
                  placeholder="DATABASE_URL=..."
                  rows={3}
                />
              </div>

              {/* Database URL */}
              <div className="grid gap-2">
                <Label htmlFor="database_url">Database URL</Label>
                <Input
                  id="database_url"
                  value={newProject.database_url}
                  onChange={(e) => setNewProject(prev => ({ ...prev, database_url: e.target.value }))}
                  placeholder="postgresql://user:pass@host:port/db"
                />
              </div>

              {/* Custom Domain */}
              <div className="grid gap-2">
                <Label htmlFor="custom_domain">Custom Domain</Label>
                <Input
                  id="custom_domain"
                  value={newProject.custom_domain}
                  onChange={(e) => setNewProject(prev => ({ ...prev, custom_domain: e.target.value }))}
                  placeholder="myapp.com"
                />
              </div>

              {/* SSL Certificate */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ssl_certificate"
                  checked={newProject.ssl_certificate}
                  onCheckedChange={(checked) => setNewProject(prev => ({ ...prev, ssl_certificate: !!checked }))}
                />
                <Label htmlFor="ssl_certificate">SSL Certificate</Label>
              </div>

              {/* Backup Frequency */}
              <div className="grid gap-2">
                <Label htmlFor="backup_frequency">Backup Frequency</Label>
                <Select value={newProject.backup_frequency} onValueChange={(value) => setNewProject(prev => ({ ...prev, backup_frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project Tags */}
              <div className="grid gap-2">
                <Label htmlFor="project_tags">Project Tags</Label>
                <Input
                  id="project_tags"
                  value={newProject.project_tags.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, project_tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="urgent, frontend, api, beta"
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
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <SortableProjectCard
                key={project.id || `project-${index}`}
                project={project}
                onEdit={handleEditProject}
                onOpen={handleOpenProject}
                onDelete={handleDeleteProject}
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