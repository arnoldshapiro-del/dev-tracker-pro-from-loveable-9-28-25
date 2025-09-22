import { useState } from "react";
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
  
  const [projectData, setProjectData] = useState<Partial<Project>>({
    id: project?.id || '',
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'planning',
    progress: project?.progress || 0,
    primaryUrl: project?.primaryUrl || '',
    ...project
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

  const [primaryUrl, setPrimaryUrl] = useState(() => {
    console.log('ProjectEditor - Setting primary URL from project:', project);
    const selectedUrl = project?.primaryUrl || project?.lovable_live_url || project?.lovable_dev_url || project?.deployment || "";
    console.log('ProjectEditor - Selected primary URL:', selectedUrl);
    return selectedUrl;
  });

  const handleSave = async () => {
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
      // Create new project
      const projectToCreate = {
        name: projectData.name || 'New Project',
        description: projectData.description || '',
        status: projectData.status || 'planning',
        progress: projectData.progress || 0,
        credits_used: projectData.credits_used || 0,
        primaryUrl,
        ...allUrls
      };
      console.log('=== CREATING PROJECT FROM EDITOR ===');
      console.log('Project data:', projectToCreate);
      
      await addProject(projectToCreate);
      toast({
        title: "Project Created",
        description: "Your new project has been created successfully.",
      });
    } else if (project?.id) {
      // Update existing project
      updateProject(project.id, { 
        ...projectData, 
        primaryUrl,
        ...allUrls
      });
      toast({
        title: "Project Updated",
        description: "Your project has been saved successfully.",
      });
    }
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
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-800">📝 PROJECT DETAILS</span>
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
                <span className="font-medium text-yellow-800">⚠️ QUICK TIPS</span>
              </div>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <div><span className="text-green-600">• Green URLs</span> = Most recent with timestamps (use these!)</div>
              <div><span className="text-blue-600">• LIVE URLs</span> = Your actual deployed apps that users see</div>
              <div><span className="text-orange-600">• DEV URLs</span> = Your development/console URLs for editing</div>
              <div><span className="text-gray-600">• 👥 BEST</span> = The most recent live URL (recommended for sharing)</div>
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