import { useState, useEffect } from "react";
import { useAppStore, Project } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Github, ExternalLink, Calendar, AlertCircle, TrendingUp, GripVertical, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openProjectUrl } from "@/utils/projectUtils";
import { ProjectEditor } from "@/components/ProjectEditor";
import { ProjectTabs } from "@/components/ProjectTabs";
import { TemplateMarketplace } from "@/components/TemplateMarketplace";
import { ProjectActions } from "@/components/ProjectActions";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthModal } from "@/components/auth/AuthModal";
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
  const { projects, addProject, updateProject, deleteProject, reorderProjects, loadProjects } = useAppStore();
  const { toast } = useToast();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Load projects when user is authenticated - but only once per session
  useEffect(() => {
    if (user && projects.length === 0) {
      loadProjects();
    }
  }, [user, loadProjects, projects.length]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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

  const handleCreateNewProject = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setIsCreateModalOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      // Work with the filtered projects for display but maintain original order
      const oldIndex = filteredProjects.findIndex((item) => item.id === active.id);
      const newIndex = filteredProjects.findIndex((item) => item.id === over?.id);

      // Only reorder if we're not filtering or searching
      if (searchTerm === "" && filterStatus === "all") {
        const newProjects = arrayMove(projects, oldIndex, newIndex);
        reorderProjects(newProjects);
        
        toast({
          title: "Projects Reordered",
          description: "Project order has been updated.",
        });
      } else {
        toast({
          title: "Cannot Reorder",
          description: "Clear filters to reorder projects.",
          variant: "destructive"
        });
      }
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
  };

  const handleOpenProject = (project: Project) => {
    openProjectUrl(project, toast);
  };

  const handleDeleteProject = (project: Project) => {
    console.log('=== DELETE PROJECT DEBUG ===');
    console.log('Project to delete:', JSON.stringify(project, null, 2));
    
    if (project.id) {
      deleteProject(project.id);
      toast({
        title: "Project Deleted",
        description: `${project.name || 'Unnamed Project'} has been deleted successfully.`,
      });
    } else {
      // For projects without valid IDs, remove by index
      const projectIndex = projects.findIndex(p => p === project);
      if (projectIndex !== -1) {
        const updatedProjects = projects.filter((_, index) => index !== projectIndex);
        reorderProjects(updatedProjects);
        toast({
          title: "Project Deleted",
          description: "Unnamed project has been removed successfully.",
        });
      } else {
        toast({
          title: "Cannot Delete Project",
          description: "Project not found or invalid data.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="p-6 space-y-6">{/* Fixed newProject reference error */}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Manage your development projects</p>
        </div>
        
        <Button 
          onClick={handleCreateNewProject}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
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

      {/* Project Data Management */}
      <div className="mt-8">
        <ProjectActions />
      </div>

      {/* Project Editor Modal for Editing */}
      <ProjectEditor
        project={editingProject || undefined}
        isOpen={!!editingProject}
        onClose={() => setEditingProject(null)}
      />

      {/* Project Editor Modal for Creating */}
      <ProjectEditor
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        isCreating={true}
      />

      {/* Auth Modal */}
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </div>
  );
};