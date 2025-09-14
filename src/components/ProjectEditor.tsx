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
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Search, 
  ExternalLink, 
  TrendingUp,
  Globe,
  Github,
  Bell,
  Zap,
  Phone,
  AlertTriangle,
  CalendarIcon,
  Cloud,
  Settings,
  Puzzle,
  Heart,
  Bolt as BoltIcon
} from "lucide-react";

interface ProjectEditorProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectEditor = ({ project, isOpen, onClose }: ProjectEditorProps) => {
  const { updateProject } = useAppStore();
  const { toast } = useToast();
  
  const [projectData, setProjectData] = useState<Partial<Project>>({
    id: project?.id || '',
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'planning',
    progress: project?.progress || 0,
    primaryUrl: project?.primaryUrl || '',
    // Loveable fields
    loveable_live_url: project?.loveable_live_url || '',
    loveable_dev_url: project?.loveable_dev_url || '',
    loveable_development_updated: project?.loveable_development_updated || '',
    loveable_deployed_at: project?.loveable_deployed_at || '',
    // Bolt fields  
    bolt_live_url: project?.bolt_live_url || '',
    bolt_dev_url: project?.bolt_dev_url || '',
    bolt_development_updated: project?.bolt_development_updated || '',
    bolt_deployed_at: project?.bolt_deployed_at || '',
    // Other existing fields
    netlify_url: project?.netlify_url || '',
    netlify_dev_url: project?.netlify_dev_url || '',
    github_repo_url: project?.github_repo_url || '',
    github_dev_url: project?.github_dev_url || '',
    // Future platform fields
    platform1_dev_url: project?.platform1_dev_url || '',
    platform1_live_url: project?.platform1_live_url || '',
    platform2_dev_url: project?.platform2_dev_url || '',
    platform2_live_url: project?.platform2_live_url || '',
    platform3_dev_url: project?.platform3_dev_url || '',
    platform3_live_url: project?.platform3_live_url || '',
    // Best site selection
    best_site: project?.best_site || 'loveable',
    ...project
  });

  const [creditsUsed] = useState(0);
  const [completion] = useState(0);

  // Get all URLs for the health check section
  const getAllUrls = () => {
    const urls: { platform: string; url: string; type: string; badge?: string }[] = [];
    
    if (projectData.loveable_live_url) {
      urls.push({ platform: "Loveable", url: projectData.loveable_live_url, type: "LIVE", badge: projectData.best_site === 'loveable' ? "BEST" : undefined });
    }
    if (projectData.loveable_dev_url) {
      urls.push({ platform: "Loveable", url: projectData.loveable_dev_url, type: "DEVELOPMENT" });
    }
    if (projectData.bolt_live_url) {
      urls.push({ platform: "Bolt", url: projectData.bolt_live_url, type: "LIVE", badge: projectData.best_site === 'bolt' ? "BEST" : undefined });
    }
    if (projectData.bolt_dev_url) {
      urls.push({ platform: "Bolt", url: projectData.bolt_dev_url, type: "DEVELOPMENT" });
    }
    if (projectData.netlify_url) {
      urls.push({ platform: "Netlify", url: projectData.netlify_url, type: "LIVE", badge: projectData.best_site === 'netlify' ? "BEST" : undefined });
    }
    if (projectData.netlify_dev_url) {
      urls.push({ platform: "Netlify", url: projectData.netlify_dev_url, type: "DEVELOPMENT" });
    }
    
    return urls;
  };

  const getBestUrl = () => {
    switch (projectData.best_site) {
      case 'loveable':
        return projectData.loveable_live_url || projectData.loveable_dev_url || projectData.primaryUrl || "";
      case 'bolt':
        return projectData.bolt_live_url || projectData.bolt_dev_url || "";
      case 'netlify':
        return projectData.netlify_url || projectData.netlify_dev_url || "";
      default:
        return projectData.primaryUrl || projectData.loveable_live_url || projectData.bolt_live_url || projectData.netlify_url || "";
    }
  };

  const handleSave = () => {
    if (project?.id) {
      updateProject(project.id, projectData);
      toast({
        title: "Project Updated",
        description: "Your project has been saved successfully.",
      });
    }
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const openUrl = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const formatDate = (date?: string) => {
    if (date) {
      const dateObj = new Date(date);
      return dateObj.toLocaleString();
    }
    return new Date().toLocaleString();
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
          {/* URL Health Check Section */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">RECOMMENDED URL</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => openUrl(getBestUrl())}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  OPEN BEST URL
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">Best Platform: {projectData.best_site ? projectData.best_site.charAt(0).toUpperCase() + projectData.best_site.slice(1) : 'None Selected'}</div>
                <div className="text-sm text-green-700 font-mono bg-white p-2 rounded border">
                  {getBestUrl() || "No URL configured"}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All URLs Section */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">ALL YOUR URLs ({getAllUrls().length} found)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {getAllUrls().map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.platform}</span>
                      <Badge variant={item.type === "DEVELOPMENT" ? "secondary" : "default"} className="text-xs">
                        {item.type}
                      </Badge>
                      {item.badge && (
                        <Badge className="bg-green-500 text-white text-xs">{item.badge}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-600">{item.url}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openUrl(item.url)}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Tips */}
          <Card className="border-yellow-200 bg-yellow-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">QUICK TIPS</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-yellow-700 space-y-1">
                <div>• <strong>Green URLs</strong> = Most recent with timestamps (use these!)</div>
                <div>• <strong>LIVE URLs</strong> = Your actual deployed apps that users see</div>
                <div>• <strong>DEV URLs</strong> = Your development/console URLs for editing</div>
                <div>• <strong>⭐ BEST</strong> = The most recent live URL (recommended for sharing)</div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditsUsed">Credits Used</Label>
              <Input
                id="creditsUsed"
                value={creditsUsed}
                readOnly
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={projectData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Project description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={projectData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                  <SelectItem value="deployed">Deployed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="completion">Completion (%)</Label>
              <Input
                id="completion"
                type="number"
                value={completion}
                onChange={(e) => handleInputChange('progress', parseInt(e.target.value) || 0)}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>

          {/* Best Site Selection */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-amber-600" />
                <span className="font-medium text-amber-800">SELECT BEST SITE</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="bestSite">Choose which platform is your primary/best site</Label>
                <Select value={projectData.best_site} onValueChange={(value) => handleInputChange('best_site', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select best platform" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    <SelectItem value="loveable">Loveable</SelectItem>
                    <SelectItem value="bolt">Bolt</SelectItem>
                    <SelectItem value="netlify">Netlify</SelectItem>
                    <SelectItem value="github">GitHub</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Loveable Platform Section */}
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-pink-600">
                <Heart className="h-4 w-4" />
                Loveable Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.loveable_dev_url}
                    onChange={(e) => handleInputChange('loveable_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.loveable_live_url}
                    onChange={(e) => handleInputChange('loveable_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Development Updated</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !projectData.loveable_development_updated && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {projectData.loveable_development_updated ? format(new Date(projectData.loveable_development_updated), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={projectData.loveable_development_updated ? new Date(projectData.loveable_development_updated) : undefined}
                        onSelect={(date) => handleInputChange('loveable_development_updated', date?.toISOString())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Deployed At</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !projectData.loveable_deployed_at && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {projectData.loveable_deployed_at ? format(new Date(projectData.loveable_deployed_at), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={projectData.loveable_deployed_at ? new Date(projectData.loveable_deployed_at) : undefined}
                        onSelect={(date) => handleInputChange('loveable_deployed_at', date?.toISOString())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Input
                    value={projectData.version || "v1.0.0"}
                    onChange={(e) => handleInputChange('version', e.target.value)}
                    placeholder="v1.0.0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bolt Platform Section */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <BoltIcon className="h-4 w-4" />
                Bolt Platform
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.bolt_dev_url}
                    onChange={(e) => handleInputChange('bolt_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.bolt_live_url}
                    onChange={(e) => handleInputChange('bolt_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Development Updated</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !projectData.bolt_development_updated && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {projectData.bolt_development_updated ? format(new Date(projectData.bolt_development_updated), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={projectData.bolt_development_updated ? new Date(projectData.bolt_development_updated) : undefined}
                        onSelect={(date) => handleInputChange('bolt_development_updated', date?.toISOString())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Deployed At</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !projectData.bolt_deployed_at && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {projectData.bolt_deployed_at ? format(new Date(projectData.bolt_deployed_at), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-white border border-gray-200 shadow-lg z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={projectData.bolt_deployed_at ? new Date(projectData.bolt_deployed_at) : undefined}
                        onSelect={(date) => handleInputChange('bolt_deployed_at', date?.toISOString())}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Input
                    value={projectData.bolt_version || "v1.0.0"}
                    onChange={(e) => handleInputChange('bolt_version', e.target.value)}
                    placeholder="v1.0.0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* GitHub Repository Section */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-600">
                <Github className="h-4 w-4" />
                GitHub Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.github_dev_url}
                    onChange={(e) => handleInputChange('github_dev_url', e.target.value)}
                    placeholder="https://github.com/user/repo/tree/dev"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Repository URL</span>
                  </div>
                  <Input
                    value={projectData.github_repo_url}
                    onChange={(e) => handleInputChange('github_repo_url', e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Development Updated</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Last Pushed</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Branch</Label>
                  <Input
                    value="main"
                    placeholder="main"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Commit Hash</Label>
                <Input
                  value="a1b2c3d4e5f6..."
                  placeholder="Commit hash"
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          {/* Netlify Deployment Section */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Bell className="h-4 w-4" />
                Netlify Deployment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.netlify_dev_url}
                    onChange={(e) => handleInputChange('netlify_dev_url', e.target.value)}
                    placeholder="https://app.netlify.com/sites/myapp"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.netlify_url}
                    onChange={(e) => handleInputChange('netlify_url', e.target.value)}
                    placeholder="https://app.netlify.app"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <Label>Development Updated</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Deployed At</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Domain Name</Label>
                  <Input
                    value="myapp.netlify.app"
                    placeholder="Domain name"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Deploy ID</Label>
                <Input
                  value="6123456789abcdef"
                  placeholder="Deploy ID"
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          {/* Twilio Configuration Section */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <Phone className="h-4 w-4" />
                Twilio Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label>Development URL</Label>
                  <Input
                    value="https://console.twilio.com"
                    readOnly
                    className="bg-gray-50 font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Development Updated</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value="+1234567890"
                    placeholder="Phone number"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Configured At</Label>
                  <div className="relative">
                    <Input
                      value={formatDate()}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select defaultValue="not-configured">
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="not-configured">Not Configured</SelectItem>
                      <SelectItem value="configured">Configured</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Platform 1 Section */}
          <Card className="border-indigo-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-600">
                <Cloud className="h-4 w-4" />
                Future Platform 1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.platform1_dev_url}
                    onChange={(e) => handleInputChange('platform1_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.platform1_live_url}
                    onChange={(e) => handleInputChange('platform1_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Platform 2 Section */}
          <Card className="border-teal-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-600">
                <Settings className="h-4 w-4" />
                Future Platform 2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.platform2_dev_url}
                    onChange={(e) => handleInputChange('platform2_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.platform2_live_url}
                    onChange={(e) => handleInputChange('platform2_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Platform 3 Section */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Puzzle className="h-4 w-4" />
                Future Platform 3
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Development URL</span>
                  </div>
                  <Input
                    value={projectData.platform3_dev_url}
                    onChange={(e) => handleInputChange('platform3_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Live URL</span>
                  </div>
                  <Input
                    value={projectData.platform3_live_url}
                    onChange={(e) => handleInputChange('platform3_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Update Project
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="px-8"
            >
              Cancel & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};