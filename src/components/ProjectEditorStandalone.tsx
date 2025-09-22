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

interface ProjectEditorStandaloneProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
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

export const ProjectEditorStandalone = ({ project, isOpen, onClose }: ProjectEditorStandaloneProps) => {
  const { updateProject } = useAppStore();
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
    }
  ]);

  const [primaryUrl, setPrimaryUrl] = useState(() => {
    const selectedUrl = project?.primaryUrl || project?.lovable_live_url || project?.lovable_dev_url || project?.deployment || "";
    return selectedUrl;
  });

  const handleSave = () => {
    if (project?.id) {
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
    setPlatforms(prev => prev.map((platform, i) => {
      if (i === platformIndex) {
        const updatedPlatform = {
          ...platform,
          urls: platform.urls.map(url => {
            if (url.id === urlId) {
              const newUrl = url.tempUrl || url.url;
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
            }
            
            if (updateField) {
              const updateData = { [updateField]: urlObj.url };
              setProjectData(prev => ({ ...prev, ...updateData }));
              
              // Always update primary URL for live URLs from important platforms
              if (urlObj.type === 'live' && (platform.name === 'Lovable Deployment' || platform.name === 'Netlify Deployment' || platform.name === 'Vercel Deployment')) {
                updateData.primaryUrl = urlObj.url;
                setPrimaryUrl(urlObj.url);
              }
              
              // Save to store immediately with all updates
              updateProject(project.id, updateData);
              
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
                         
                         <div className="flex items-center gap-2 ml-4">
                           {url.url && (
                             <>
                               <Button
                                 size="sm"
                                 variant="outline"
                                 onClick={() => openUrl(url.url)}
                                 className="h-8 px-2"
                               >
                                 <ExternalLink className="h-3 w-3" />
                               </Button>
                               
                               {primaryUrl !== url.url && (
                                 <Button
                                   size="sm"
                                   onClick={() => handleSetPrimaryUrl(url.url)}
                                   className="h-8 px-2 bg-blue-600 hover:bg-blue-700 text-white"
                                 >
                                   <Check className="h-3 w-3" />
                                 </Button>
                               )}
                             </>
                           )}
                         </div>
                       </div>
                     ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Basic Project Info */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={projectData.name || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={projectData.description || ''}
                  onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
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
                    <SelectItem value="paused">Paused</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              Save Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};