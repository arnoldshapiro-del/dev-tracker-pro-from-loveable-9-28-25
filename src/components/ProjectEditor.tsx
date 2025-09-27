import { useState, useEffect } from "react";
import { useAppStore, Project } from "@/store/appStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  ExternalLink, 
  Calendar,
  Globe,
  Github,
  Bell,
  Zap,
  Phone,
  AlertTriangle,
  TrendingUp,
  Clock,
  Trash2,
  Check,
  Edit,
  Save,
  X
} from "lucide-react";

interface ProjectEditorProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
  isCreating?: boolean;
}

interface PlatformUrl {
  id: string;
  url: string;
  type: 'development' | 'live';
  label: string;
  isEditing?: boolean;
  tempUrl?: string;
}

interface PlatformConfig {
  name: string;
  icon: React.ReactNode;
  color: string;
  urls: PlatformUrl[];
  developmentUpdated?: string;
  publishedDate?: string;
  version?: string;
  repositoryUrl?: string;
  lastPushed?: string;
  branch?: string;
  commitHash?: string;
  deployedAt?: string;
  domainName?: string;
  deployId?: string;
  deploymentId?: string;
  phoneNumber?: string;
  configuredAt?: string;
  status?: string;
  isCustom?: boolean;
}

export const ProjectEditor = ({ project, isOpen, onClose, isCreating }: ProjectEditorProps) => {
  const { updateProject, addProject } = useAppStore();
  const { toast } = useToast();
  
  // Initialize project data properly based on editing vs creating
  const [projectData, setProjectData] = useState<Partial<Project>>(() => {
    if (isCreating || !project) {
      return {
        id: '',
        name: '',
        description: '',
        status: 'planning',
        progress: 0,
        primaryUrl: '',
        ai_platform: '',
        project_type: '',
      };
    }
    // When editing, use all existing project data
    return {
      ...project,
      // Ensure we preserve all the important fields
      name: project.name || '',
      description: project.description || '',
      primaryUrl: project.primaryUrl || project.lovable_live_url || project.lovable_dev_url || '',
    };
  });

  const [platforms, setPlatforms] = useState<PlatformConfig[]>([
    {
      name: "Netlify Deployment",
      icon: <Bell className="h-4 w-4" />,
      color: "text-green-600",
      urls: [
        { id: "netlify-dev", url: project?.netlify_dev_url || "https://app.netlify.com/sites/myapp", type: "development", label: "Development URL" },
        { id: "netlify-live", url: project?.netlify_url || "https://app.netlify.app", type: "live", label: "Live URL" }
      ],
      deployedAt: "",
      domainName: "myapp.netlify.app",
      deployId: "6123456789abcdef",
      developmentUpdated: ""
    },
    {
      name: "Lovable Deployment",
      icon: <Zap className="h-4 w-4" />,
      color: "text-purple-600",
      urls: [
        { id: "lovable-dev", url: project?.lovable_dev_url || "https://zoer.ai/zchat/7671", type: "development", label: "Development URL" },
        { id: "lovable-live", url: project?.lovable_live_url || "https://phoenix-project-revive.lovable.app/", type: "live", label: "Published URL" }
      ],
      deploymentId: "dpl_xyz123",
      developmentUpdated: "",
      deployedAt: ""
    },
    {
      name: "Twilio Configuration",
      icon: <Phone className="h-4 w-4" />,
      color: "text-red-600",
      urls: [
        { id: "twilio-dev", url: "https://console.twilio.com", type: "development", label: "Development URL" },
        { id: "twilio-live", url: "https://example.com", type: "live", label: "Live URL" }
      ],
      phoneNumber: "+1234567890",
      configuredAt: "",
      status: "Not Configured",
      developmentUpdated: ""
    },
    {
      name: "Custom Platform 1",
      icon: <Globe className="h-4 w-4" />,
      color: "text-blue-600",
      urls: [
        { id: "custom1-dev", url: "", type: "development", label: "Development URL" },
        { id: "custom1-live", url: "", type: "live", label: "Live URL" }
      ],
      isCustom: true,
      developmentUpdated: "",
      deployedAt: ""
    },
    {
      name: "Custom Platform 2",
      icon: <Globe className="h-4 w-4" />,
      color: "text-orange-600",
      urls: [
        { id: "custom2-dev", url: "", type: "development", label: "Development URL" },
        { id: "custom2-live", url: "", type: "live", label: "Live URL" }
      ],
      isCustom: true,
      developmentUpdated: "",
      deployedAt: ""
    },
    {
      name: "Custom Platform 3",
      icon: <Globe className="h-4 w-4" />,
      color: "text-teal-600",
      urls: [
        { id: "custom3-dev", url: "", type: "development", label: "Development URL" },
        { id: "custom3-live", url: "", type: "live", label: "Live URL" }
      ],
      isCustom: true,
      developmentUpdated: "",
      deployedAt: ""
    }
  ]);

  // Reset form data when project changes
  useEffect(() => {
    if (isCreating || !project) {
      setProjectData({
        id: '',
        name: '',
        description: '',
        status: 'planning',
        progress: 0,
        primaryUrl: '',
        ai_platform: '',
        project_type: '',
      });
      setPrimaryUrl('');
    } else {
      // When editing, populate with existing project data
      setProjectData({
        ...project,
        name: project.name || '',
        description: project.description || '',
        primaryUrl: project.primaryUrl || project.lovable_live_url || project.lovable_dev_url || '',
      });
      setPrimaryUrl(project.primaryUrl || project.lovable_live_url || project.lovable_dev_url || '');
    }
  }, [project, isCreating]);

  const [primaryUrl, setPrimaryUrl] = useState(() => {
    console.log('ProjectEditor - Setting primary URL from project:', project);
    const selectedUrl = project?.primaryUrl || project?.lovable_live_url || project?.lovable_dev_url || project?.deployment || "";
    console.log('ProjectEditor - Selected primary URL:', selectedUrl);
    return selectedUrl;
  });

  const handleSave = async () => {
    console.log('=== HANDLE SAVE START ===');
    console.log('isCreating:', isCreating);
    console.log('projectData:', projectData);
    
    // Collect all URLs from platforms into the project data
    const allUrls: any = {};
    platforms.forEach(platform => {
      platform.urls.forEach(url => {
        if (url.url) {
          if (platform.name === 'Lovable Deployment') {
            if (url.type === 'development') {
              allUrls.lovable_dev_url = url.url;
            } else {
              allUrls.lovable_live_url = url.url;
            }
          } else if (platform.name === 'Netlify Deployment') {
            if (url.type === 'development') {
              allUrls.netlify_dev_url = url.url;
            } else {
              allUrls.netlify_url = url.url;
            }
          } else if (platform.name === 'Vercel Deployment') {
            if (url.type === 'development') {
              allUrls.vercel_dev_url = url.url;
            } else {
              allUrls.vercel_url = url.url;
            }
          } else {
            // Custom platforms
            const platformKey = platform.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            if (url.type === 'development') {
              allUrls[`${platformKey}_dev_url`] = url.url;
            } else {
              allUrls[`${platformKey}_live_url`] = url.url;
            }
          }
        }
      });
    });

    if (isCreating) {
      // Validate required fields for new project
      if (!projectData.name || projectData.name.trim() === '') {
        toast({
          title: "Validation Error",
          description: "Project name is required.",
          variant: "destructive"
        });
        return;
      }

      // Create new project with comprehensive data
      const projectToCreate = {
        name: projectData.name.trim(),
        description: projectData.description || '',
        status: projectData.status || 'planning',
        progress: projectData.progress || 0,
        credits_used: projectData.credits_used || 0,
        initial_budget_credits: projectData.initial_budget_credits || 100,
        credits_remaining: projectData.credits_remaining || 100,
        primaryUrl: primaryUrl || projectData.lovable_live_url || projectData.lovable_dev_url || '',
        lovable_dev_url: projectData.lovable_dev_url || '',
        lovable_live_url: projectData.lovable_live_url || '',
        lastActivity: new Date().toISOString().split('T')[0],
        issues: projectData.issues || 0,
        technologies: projectData.technologies || [],
        repository: projectData.repository || '',
        deployment: projectData.deployment || '',
        ...allUrls
      };
      
      console.log('=== CREATING PROJECT FROM EDITOR ===');
      console.log('Project data:', projectToCreate);
      
      try {
        await addProject(projectToCreate);
        console.log('✅ Project created successfully');
        toast({
          title: "Project Created Successfully",
          description: `${projectToCreate.name} has been created and saved.`,
        });
      } catch (error) {
        console.error('❌ Error creating project:', error);
        toast({
          title: "Error Creating Project",
          description: "Failed to create project. Please try again.",
          variant: "destructive"
        });
        return; // Don't close modal on error
      }
    } else if (project?.id) {
      // Update existing project
      const updateData = { 
        ...projectData, 
        primaryUrl: primaryUrl || projectData.lovable_live_url || projectData.lovable_dev_url || '',
        lovable_dev_url: projectData.lovable_dev_url || '',
        lovable_live_url: projectData.lovable_live_url || '',
        lastActivity: new Date().toISOString().split('T')[0],
        ...allUrls
      };
      
      console.log('=== UPDATING PROJECT ===');
      console.log('Update data:', updateData);
      
      try {
        updateProject(project.id, updateData);
        console.log('✅ Project updated successfully');
        toast({
          title: "Project Updated Successfully",
          description: "Your project has been saved successfully.",
        });
      } catch (error) {
        console.error('❌ Error updating project:', error);
        toast({
          title: "Error Updating Project",
          description: "Failed to update project. Please try again.",
          variant: "destructive"
        });
        return; // Don't close modal on error
      }
    }
    
    console.log('=== HANDLE SAVE COMPLETE ===');
    onClose();
  };

  const handlePlatformUpdate = (index: number, field: string, value: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === index ? { ...platform, [field]: value } : platform
    ));
  };

  const handlePlatformNameUpdate = (index: number, newName: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === index ? { ...platform, name: newName } : platform
    ));
  };

  const handleStartEdit = (platformIndex: number, urlId: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === platformIndex ? {
        ...platform,
        urls: platform.urls.map(url => 
          url.id === urlId ? { ...url, isEditing: true, tempUrl: url.url } : url
        )
      } : platform
    ));
  };

  const handleCancelEdit = (platformIndex: number, urlId: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === platformIndex ? {
        ...platform,
        urls: platform.urls.map(url => 
          url.id === urlId ? { ...url, isEditing: false, tempUrl: undefined } : url
        )
      } : platform
    ));
  };

  const handleTempUrlChange = (platformIndex: number, urlId: string, tempUrl: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === platformIndex ? {
        ...platform,
        urls: platform.urls.map(url => 
          url.id === urlId ? { ...url, tempUrl } : url
        )
      } : platform
    ));
  };

  const handleSaveUrl = (platformIndex: number, urlId: string) => {
    console.log('=== URL SAVE DEBUG ===');
    console.log('Saving URL for platform:', platformIndex, 'urlId:', urlId);
    
    setPlatforms(prev => prev.map((platform, i) => {
      if (i === platformIndex) {
        const updatedPlatform = {
          ...platform,
          urls: platform.urls.map(url => {
            if (url.id === urlId) {
              const newUrl = url.tempUrl || url.url;
              console.log('Saving URL:', newUrl, 'for platform:', platform.name, 'type:', url.type);
              return { ...url, url: newUrl, isEditing: false, tempUrl: undefined };
            }
            return url;
          })
        };
        
        // Immediately save to project data
        if (project?.id) {
          const urlObj = updatedPlatform.urls.find(u => u.id === urlId);
          if (urlObj && urlObj.url) {
            let updateField = '';
            if (platform.name === 'Lovable Deployment') {
              updateField = urlObj.type === 'development' ? 'lovable_dev_url' : 'lovable_live_url';
            } else if (platform.name === 'Netlify Deployment') {
              updateField = urlObj.type === 'development' ? 'netlify_dev_url' : 'netlify_url';
            } else if (platform.name === 'Vercel Deployment') {
              updateField = urlObj.type === 'development' ? 'vercel_dev_url' : 'vercel_url';
            } else if (platform.name.includes('Custom Platform')) {
              // Handle custom platforms
              const platformKey = platform.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
              updateField = urlObj.type === 'development' ? `${platformKey}_dev_url` : `${platformKey}_live_url`;
            }
            
            console.log('Update field:', updateField, 'with value:', urlObj.url);
            
            if (updateField) {
              const updateData = { [updateField]: urlObj.url };
              setProjectData(prev => ({ ...prev, ...updateData }));
              
              // Always update primary URL for live URLs from important platforms
              if (urlObj.type === 'live' && (platform.name === 'Lovable Deployment' || platform.name === 'Netlify Deployment' || platform.name === 'Vercel Deployment')) {
                updateData.primaryUrl = urlObj.url;
                setPrimaryUrl(urlObj.url);
                console.log('CRITICAL: Setting primaryUrl to:', urlObj.url);
              }
              
              // Save to store immediately with all updates
              updateProject(project.id, updateData);
              console.log('CRITICAL: Saved to project store:', updateData);
              
              // Force refresh the component to reflect changes
              const updatedProject = { ...project, ...updateData };
              setProjectData(updatedProject);
            }
          }
        }
        
        return updatedPlatform;
      }
      return platform;
    }));

    toast({
      title: "URL Saved",
      description: "URL has been updated successfully.",
    });
  };

  const handleAddUrl = (platformIndex: number, type: 'development' | 'live') => {
    const newUrl: PlatformUrl = {
      id: `${Date.now()}-${type}`,
      url: "",
      type,
      label: type === 'development' ? 'Development URL' : 'Live URL'
    };
    
    setPlatforms(prev => prev.map((platform, i) => 
      i === platformIndex ? {
        ...platform,
        urls: [...platform.urls, newUrl]
      } : platform
    ));
  };

  const handleDeleteUrl = (platformIndex: number, urlId: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === platformIndex ? {
        ...platform,
        urls: platform.urls.filter(url => url.id !== urlId)
      } : platform
    ));
  };

  const handleSetPrimaryUrl = (url: string) => {
    setPrimaryUrl(url);
    setProjectData(prev => ({ ...prev, primaryUrl: url }));
  };

  const openUrl = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <DialogTitle>Project URL Health Check & Editor</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Basic Info Section - MOVED TO TOP */}
          <Card className="border-purple-200 bg-purple-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-800">📝 PROJECT DETAILS</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={handleSave}
                    className="gap-1"
                  >
                    <Save className="h-3 w-3" />
                    Save
                  </Button>
                  {!isCreating && project?.id && (
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => {
                        // Add delete functionality if needed
                        toast({
                          title: "Delete Project",
                          description: "Delete functionality would go here",
                        });
                      }}
                      className="gap-1"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                  )}
                  {primaryUrl && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      onClick={() => openUrl(primaryUrl)}
                      className="gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={projectData.name || ''}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditsUsed">Credits Used</Label>
                  <Input
                    id="creditsUsed"
                    type="number"
                    value={projectData.credits_used || 0}
                    onChange={(e) => setProjectData(prev => ({ ...prev, credits_used: parseInt(e.target.value) || 0 }))}
                    placeholder="Credits used"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={projectData.description || ''}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your project"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={projectData.status || 'planning'} 
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, status: value as "development" | "planning" | "testing" | "deployed" | "maintenance" | "abandoned" | "active" | "completed" | "on-hold" | "archived" }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="testing">Testing</SelectItem>
                      <SelectItem value="deployed">Deployed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={projectData.progress || 0}
                    onChange={(e) => setProjectData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
                    placeholder="Progress percentage"
                  />
                </div>
                
                {/* Development URL */}
                <div className="space-y-2">
                  <Label htmlFor="developmentUrl">Development URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="developmentUrl"
                      value={projectData.lovable_dev_url || ''}
                      onChange={(e) => setProjectData(prev => ({ ...prev, lovable_dev_url: e.target.value }))}
                      placeholder="https://your-dev-url.com"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Save the development URL
                        if (project?.id && projectData.lovable_dev_url) {
                          updateProject(project.id, { lovable_dev_url: projectData.lovable_dev_url });
                          toast({
                            title: "Development URL Saved",
                            description: "Development URL has been saved successfully.",
                          });
                        }
                      }}
                      disabled={!projectData.lovable_dev_url}
                      className="gap-1"
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Edit/clear the development URL
                        setProjectData(prev => ({ ...prev, lovable_dev_url: '' }));
                        if (project?.id) {
                          updateProject(project.id, { lovable_dev_url: '' });
                          toast({
                            title: "Development URL Cleared",
                            description: "Development URL has been cleared.",
                          });
                        }
                      }}
                      className="gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Delete the development URL
                        setProjectData(prev => ({ ...prev, lovable_dev_url: '' }));
                        if (project?.id) {
                          updateProject(project.id, { lovable_dev_url: '' });
                          toast({
                            title: "Development URL Deleted",
                            description: "Development URL has been deleted.",
                          });
                        }
                      }}
                      className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openUrl(projectData.lovable_dev_url || '')}
                      disabled={!projectData.lovable_dev_url}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                {/* Live URL */}
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="liveUrl"
                      value={projectData.lovable_live_url || ''}
                      onChange={(e) => {
                        const newUrl = e.target.value;
                        setProjectData(prev => ({ ...prev, lovable_live_url: newUrl }));
                        // Auto-set as primary URL if it's a live URL
                        if (newUrl) {
                          setPrimaryUrl(newUrl);
                          setProjectData(prev => ({ ...prev, primaryUrl: newUrl }));
                        }
                      }}
                      placeholder="https://your-live-url.com"
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Save the live URL
                        if (project?.id && projectData.lovable_live_url) {
                          const updateData = { 
                            lovable_live_url: projectData.lovable_live_url,
                            primaryUrl: projectData.lovable_live_url // Auto-set as primary
                          };
                          updateProject(project.id, updateData);
                          setPrimaryUrl(projectData.lovable_live_url);
                          toast({
                            title: "Live URL Saved",
                            description: "Live URL has been saved and set as primary URL.",
                          });
                        }
                      }}
                      disabled={!projectData.lovable_live_url}
                      className="gap-1"
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Edit/clear the live URL
                        setProjectData(prev => ({ ...prev, lovable_live_url: '' }));
                        if (project?.id) {
                          updateProject(project.id, { lovable_live_url: '' });
                          toast({
                            title: "Live URL Cleared",
                            description: "Live URL has been cleared.",
                          });
                        }
                      }}
                      className="gap-1"
                    >
                      <Edit className="h-3 w-3" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        // Delete the live URL
                        setProjectData(prev => ({ ...prev, lovable_live_url: '' }));
                        if (project?.id) {
                          updateProject(project.id, { lovable_live_url: '' });
                          toast({
                            title: "Live URL Deleted",
                            description: "Live URL has been deleted.",
                          });
                        }
                      }}
                      className="gap-1 border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                      Delete
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openUrl(projectData.lovable_live_url || '')}
                      disabled={!projectData.lovable_live_url}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Primary URL Section */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">👥 PRIMARY URL</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => openUrl(primaryUrl)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  OPEN BEST URL
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">Selected Primary URL</div>
                <div className="text-sm text-green-700 font-mono bg-white/60 p-2 rounded">
                  {primaryUrl || "No primary URL selected"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All URLs Section */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">☑️ ALL YOUR URLs ({platforms.reduce((acc, p) => acc + p.urls.length, 0)} found)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platforms.map((platform, platformIndex) => (
                  <div key={platform.name} className="space-y-2">
                    <div className="font-medium text-sm flex items-center gap-2">
                      <span className={platform.color}>{platform.icon}</span>
                      {platform.name}
                    </div>
                     {platform.urls.map((url, urlIndex) => (
                       <div key={url.id} className={`flex items-center justify-between p-3 rounded border ${
                         primaryUrl === url.url ? 'bg-green-100 border-green-200' : 'bg-gray-50 border-gray-200'
                       }`}>
                         <div className="flex-1 space-y-2">
                           <div className="flex items-center gap-2">
                             <span className="text-sm font-medium">{url.label}</span>
                             <Badge className={`text-xs ${
                               url.type === 'development' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                             }`}>
                               {url.type.toUpperCase()}
                             </Badge>
                             {primaryUrl === url.url && (
                               <Badge className="bg-green-500 text-white text-xs">👥 BEST</Badge>
                             )}
                           </div>
                           
                           {url.isEditing ? (
                             <div className="flex items-center gap-2">
                               <Input
                                 value={url.tempUrl || ''}
                                 onChange={(e) => handleTempUrlChange(platformIndex, url.id, e.target.value)}
                                 placeholder="Enter URL..."
                                 className="text-xs font-mono"
                               />
                               <Button
                                 size="sm"
                                 onClick={() => handleSaveUrl(platformIndex, url.id)}
                                 className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white"
                               >
                                 <Save className="h-3 w-3" />
                               </Button>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleCancelEdit(platformIndex, url.id)}
                                 className="h-8 px-2"
                               >
                                 <X className="h-3 w-3" />
                               </Button>
                             </div>
                           ) : (
                             <div className="flex items-center gap-2">
                               <div className="text-xs text-gray-600 font-mono flex-1 bg-white/60 p-2 rounded border">
                                 {url.url || "No URL set"}
                               </div>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleStartEdit(platformIndex, url.id)}
                                 className="h-8 px-2"
                               >
                                 <Edit className="h-3 w-3" />
                               </Button>
                             </div>
                           )}
                         </div>
                         
                         <div className="flex items-center gap-2 ml-2">
                           <Button 
                             size="sm" 
                             variant="ghost" 
                             onClick={() => handleSetPrimaryUrl(url.url)}
                             disabled={!url.url || primaryUrl === url.url}
                             className="h-8 w-8 p-0"
                             title="Set as Primary URL"
                           >
                             <Check className="h-3 w-3" />
                           </Button>
                           <Button 
                             size="sm" 
                             variant="ghost" 
                             onClick={() => openUrl(url.url)}
                             disabled={!url.url}
                             className="h-8 w-8 p-0"
                             title="Open URL"
                           >
                             <ExternalLink className="h-3 w-3" />
                           </Button>
                           <Button 
                             size="sm" 
                             variant="ghost" 
                             onClick={() => handleDeleteUrl(platformIndex, url.id)}
                             className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                             title="Delete URL"
                           >
                             <Trash2 className="h-3 w-3" />
                           </Button>
                         </div>
                       </div>
                     ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-yellow-200 bg-yellow-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">💡 URL MANAGEMENT</span>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div><span className="text-blue-600">• LIVE URLs</span> = Your deployed apps that users see</div>
              <div><span className="text-orange-600">• DEV URLs</span> = Your development/console URLs for editing</div>
              <div><span className="text-green-600">• PRIMARY URL</span> = Opens when you click project name (you choose!)</div>
              <div><span className="text-gray-600">• Save both URLs, then set one as PRIMARY for easy access</span></div>
            </CardContent>
          </Card>

          {/* Project Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Project Name</Label>
              <Input
                value={projectData.name}
                onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="DevTracker Pro amazing made by Zoer 9-8-25"
              />
            </div>
            <div className="space-y-2">
              <Label>Credits Used</Label>
              <Input
                type="number"
                value={0}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={projectData.description}
              onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Beautiful made by Zoer 9-8-25"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select 
                value={projectData.status} 
                onValueChange={(value) => setProjectData(prev => ({ ...prev, status: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Completion (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={projectData.progress}
                onChange={(e) => setProjectData(prev => ({ ...prev, progress: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Platform Configurations */}
          <div className="space-y-4">
            {platforms.map((platform, index) => (
              <Card key={platform.name} className="border border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <span className={platform.color}>{platform.icon}</span>
                    {platform.isCustom ? (
                      <Input
                        value={platform.name}
                        onChange={(e) => handlePlatformNameUpdate(index, e.target.value)}
                        className="font-medium h-6 border-dashed"
                        placeholder="Enter platform name (e.g., ZOER, REPLIT)"
                      />
                    ) : (
                      <span className="font-medium">{platform.name}</span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* URLs Section */}
                  <div className="space-y-4">
                    {platform.urls.map((url, urlIndex) => (
                       <div key={url.id} className="grid grid-cols-2 gap-4 p-3 border rounded-lg">
                         <div className="space-y-2">
                           <div className="flex items-center justify-between">
                             <Label className="text-sm">{url.label}</Label>
                             <div className="flex items-center gap-2">
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 className="h-6 px-2 bg-red-100 text-red-600 text-xs hover:bg-red-200"
                                 onClick={() => handleDeleteUrl(index, url.id)}
                               >
                                 <Trash2 className="h-3 w-3 mr-1" />
                                 DELETE
                               </Button>
                               {url.url && (
                                 <Button
                                   size="sm"
                                   variant="ghost"
                                   className={`h-6 px-2 text-xs ${
                                     primaryUrl === url.url 
                                       ? 'bg-green-100 text-green-600' 
                                       : 'bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600'
                                   }`}
                                   onClick={() => handleSetPrimaryUrl(url.url)}
                                 >
                                   <Check className="h-3 w-3 mr-1" />
                                   {primaryUrl === url.url ? 'PRIMARY' : 'SET PRIMARY'}
                                 </Button>
                               )}
                             </div>
                           </div>
                           
                           {url.isEditing ? (
                             <div className="flex items-center gap-2">
                               <Input
                                 value={url.tempUrl || ''}
                                 onChange={(e) => handleTempUrlChange(index, url.id, e.target.value)}
                                 placeholder="https://example.com"
                                 className="text-sm"
                               />
                               <Button
                                 size="sm"
                                 onClick={() => handleSaveUrl(index, url.id)}
                                 className="h-8 px-2 bg-green-600 hover:bg-green-700 text-white"
                               >
                                 <Save className="h-3 w-3" />
                               </Button>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleCancelEdit(index, url.id)}
                                 className="h-8 px-2"
                               >
                                 <X className="h-3 w-3" />
                               </Button>
                             </div>
                           ) : (
                             <div className="flex items-center gap-2">
                               <div className="text-sm bg-gray-50 p-2 rounded border flex-1 font-mono">
                                 {url.url || "No URL set"}
                               </div>
                               <Button
                                 size="sm"
                                 variant="ghost"
                                 onClick={() => handleStartEdit(index, url.id)}
                                 className="h-8 px-2"
                               >
                                 <Edit className="h-3 w-3" />
                               </Button>
                             </div>
                           )}
                         </div>
                         <div className="space-y-2">
                           <Label className="text-sm">Type</Label>
                           <Badge className={`text-xs w-fit ${
                             url.type === 'development' ? 'bg-gray-500 text-white' : 'bg-blue-500 text-white'
                           }`}>
                             {url.type.toUpperCase()}
                           </Badge>
                         </div>
                       </div>
                    ))}
                    
                    {/* Add URL Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddUrl(index, 'development')}
                        className="text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Development URL
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAddUrl(index, 'live')}
                        className="text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Live URL
                      </Button>
                    </div>
                  </div>

                  {/* Platform-specific fields */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {(platform.name === "Netlify Deployment" || platform.name === "Lovable Deployment") && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Development Updated</Label>
                          <Input
                            type="datetime-local"
                            value={platform.developmentUpdated}
                            onChange={(e) => handlePlatformUpdate(index, 'developmentUpdated', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Deployed At</Label>
                          <Input
                            type="datetime-local"
                            value={platform.deployedAt}
                            onChange={(e) => handlePlatformUpdate(index, 'deployedAt', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">
                            {platform.name === "Netlify Deployment" ? "Domain Name" : "Deployment ID"}
                          </Label>
                          <Input
                            value={platform.name === "Netlify Deployment" ? platform.domainName : platform.deploymentId}
                            onChange={(e) => handlePlatformUpdate(index, 
                              platform.name === "Netlify Deployment" ? 'domainName' : 'deploymentId', 
                              e.target.value
                            )}
                            placeholder={platform.name === "Netlify Deployment" ? "myapp.netlify.app" : "dpl_xyz123"}
                            className="text-xs"
                          />
                        </div>
                      </>
                    )}

                    {platform.name === "Twilio Configuration" && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Phone Number</Label>
                          <Input
                            value={platform.phoneNumber}
                            onChange={(e) => handlePlatformUpdate(index, 'phoneNumber', e.target.value)}
                            placeholder="+1234567890"
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Status</Label>
                          <Select 
                            value={platform.status} 
                            onValueChange={(value) => handlePlatformUpdate(index, 'status', value)}
                          >
                            <SelectTrigger className="text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Not Configured">Not Configured</SelectItem>
                              <SelectItem value="Configured">Configured</SelectItem>
                              <SelectItem value="Active">Active</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div></div>
                      </>
                    )}

                    {platform.isCustom && (
                      <>
                        <div className="space-y-1">
                          <Label className="text-xs">Development Updated</Label>
                          <Input
                            type="datetime-local"
                            value={platform.developmentUpdated}
                            onChange={(e) => handlePlatformUpdate(index, 'developmentUpdated', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Deployed At</Label>
                          <Input
                            type="datetime-local"
                            value={platform.deployedAt}
                            onChange={(e) => handlePlatformUpdate(index, 'deployedAt', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Custom Field</Label>
                          <Input
                            value={platform.deploymentId || ""}
                            onChange={(e) => handlePlatformUpdate(index, 'deploymentId', e.target.value)}
                            placeholder="Custom identifier"
                            className="text-xs"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel & Close
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {isCreating ? 'Create Project' : 'Update Project'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};