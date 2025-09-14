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
  ExternalLink, 
  TrendingUp,
  Globe,
  Github,
  Bell,
  Zap,
  Phone,
  AlertTriangle,
  Calendar
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
    lovable_live_url: project?.lovable_live_url || '',
    lovable_dev_url: project?.lovable_dev_url || '',
    netlify_url: project?.netlify_url || '',
    netlify_dev_url: project?.netlify_dev_url || '',
    vercel_url: project?.vercel_url || '',
    vercel_dev_url: project?.vercel_dev_url || '',
    github_repo_url: project?.github_repo_url || '',
    github_dev_url: project?.github_dev_url || '',
    ...project
  });

  const [creditsUsed] = useState(0);
  const [completion] = useState(0);

  // Get all URLs for the health check section
  const getAllUrls = () => {
    const urls: { platform: string; url: string; type: string; badge?: string }[] = [];
    
    if (projectData.lovable_live_url) {
      urls.push({ platform: "Lovable", url: projectData.lovable_live_url, type: "LIVE", badge: "BEST" });
    }
    if (projectData.lovable_dev_url) {
      urls.push({ platform: "Lovable", url: projectData.lovable_dev_url, type: "DEVELOPMENT" });
    }
    if (projectData.vercel_url) {
      urls.push({ platform: "Vercel", url: projectData.vercel_url, type: "LIVE" });
    }
    if (projectData.vercel_dev_url) {
      urls.push({ platform: "Vercel", url: projectData.vercel_dev_url, type: "DEVELOPMENT" });
    }
    if (projectData.netlify_url) {
      urls.push({ platform: "Netlify", url: projectData.netlify_url, type: "LIVE" });
    }
    if (projectData.netlify_dev_url) {
      urls.push({ platform: "Netlify", url: projectData.netlify_dev_url, type: "DEVELOPMENT" });
    }
    
    return urls;
  };

  const getBestUrl = () => {
    return projectData.primaryUrl || projectData.lovable_live_url || projectData.vercel_url || projectData.netlify_url || "";
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
    return date || "mm/dd/yyyy --:-- --";
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
                <div className="font-medium">Vercel</div>
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

          {/* Mocha Publishing Section */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Zap className="h-4 w-4" />
                Mocha Publishing
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
                    value={projectData.lovable_dev_url}
                    onChange={(e) => handleInputChange('lovable_dev_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Published URL</span>
                  </div>
                  <Input
                    value={projectData.lovable_live_url}
                    onChange={(e) => handleInputChange('lovable_live_url', e.target.value)}
                    placeholder="Add a URL here to track this platform"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
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
                  <Label>Published Date & Time</Label>
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
                  <Label>Version</Label>
                  <Input
                    value="v1.0.0"
                    onChange={(e) => handleInputChange('version', e.target.value)}
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

          {/* Vercel Deployment Section */}
          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <Zap className="h-4 w-4" />
                Vercel Deployment
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
                    value={projectData.vercel_dev_url}
                    onChange={(e) => handleInputChange('vercel_dev_url', e.target.value)}
                    placeholder="https://app.vercel.app"
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
                    value={projectData.vercel_url}
                    onChange={(e) => handleInputChange('vercel_url', e.target.value)}
                    placeholder="https://app.vercel.app"
                    className="font-mono text-sm"
                  />
                  <div className="text-xs text-yellow-600">⚠ Add a URL here to track this platform</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
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
              </div>
              
              <div className="space-y-2">
                <Label>Deployment ID</Label>
                <Input
                  value="dpl_xyz123"
                  placeholder="Deployment ID"
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