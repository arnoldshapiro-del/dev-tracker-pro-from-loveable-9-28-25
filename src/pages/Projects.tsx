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
    project_type: 'web'
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
      project_type: 'web'
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
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter project name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Project description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={newProject.status} onValueChange={(value) => setNewProject(prev => ({ ...prev, status: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
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