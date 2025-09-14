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
  Clock
} from "lucide-react";

interface ProjectEditorProps {
  project?: Project;
  isOpen: boolean;
  onClose: () => void;
}

interface PlatformConfig {
  name: string;
  icon: React.ReactNode;
  color: string;
  developmentUrl: string;
  liveUrl: string;
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
    ...project
  });

  const [platforms, setPlatforms] = useState<PlatformConfig[]>([
    {
      name: "Mocha Publishing",
      icon: <Globe className="h-4 w-4" />,
      color: "text-blue-600",
      developmentUrl: "https://getmocha.com/apps/123?chat=open",
      liveUrl: "https://abc123.mocha.app",
      developmentUpdated: "",
      publishedDate: "",
      version: "v1.0.0"
    },
    {
      name: "GitHub Repository",
      icon: <Github className="h-4 w-4" />,
      color: "text-gray-600",
      developmentUrl: "https://github.com/user/repo/tree/dev",
      liveUrl: "https://github.com/user/repo",
      repositoryUrl: "https://github.com/user/repo",
      lastPushed: "",
      branch: "main",
      commitHash: "a1b2c3d4e5f6...",
      developmentUpdated: ""
    },
    {
      name: "Netlify Deployment",
      icon: <Bell className="h-4 w-4" />,
      color: "text-green-600",
      developmentUrl: "https://app.netlify.com/sites/myapp",
      liveUrl: "https://app.netlify.app",
      deployedAt: "",
      domainName: "myapp.netlify.app",
      deployId: "6123456789abcdef",
      developmentUpdated: ""
    },
    {
      name: "Vercel Deployment",
      icon: <Zap className="h-4 w-4" />,
      color: "text-purple-600",
      developmentUrl: "https://zoer.ai/zchat/7671",
      liveUrl: "https://app.vercel.app",
      deploymentId: "dpl_xyz123",
      developmentUpdated: "",
      deployedAt: ""
    },
    {
      name: "Twilio Configuration",
      icon: <Phone className="h-4 w-4" />,
      color: "text-red-600",
      developmentUrl: "https://console.twilio.com",
      liveUrl: "",
      phoneNumber: "+1234567890",
      configuredAt: "",
      status: "Not Configured",
      developmentUpdated: ""
    }
  ]);

  const [recommendedUrl, setRecommendedUrl] = useState("https://zoer.ai/zchat/7671");

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

  const handlePlatformUpdate = (index: number, field: string, value: string) => {
    setPlatforms(prev => prev.map((platform, i) => 
      i === index ? { ...platform, [field]: value } : platform
    ));
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
          {/* Recommended URL Section */}
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">👥 RECOMMENDED URL</span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => openUrl(recommendedUrl)}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  OPEN BEST URL
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="font-medium">Vercel</div>
                <div className="text-sm text-green-700 font-mono bg-white/60 p-2 rounded">
                  {recommendedUrl}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* All URLs Section */}
          <Card className="border-blue-200 bg-blue-50/50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">☑️ ALL YOUR URLs (1 found)</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-green-100 p-2 rounded border border-green-200">
                  <div>
                    <span className="text-sm font-medium">Vercel</span>
                    <Badge className="ml-2 bg-gray-500 text-white text-xs">DEVELOPMENT</Badge>
                    <Badge className="ml-1 bg-green-500 text-white text-xs">👥 BEST</Badge>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => openUrl(recommendedUrl)}>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-green-700 font-mono">
                  {recommendedUrl}
                </div>
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
                    <span className="font-medium">{platform.name}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">
                          {platform.name === "GitHub Repository" ? "Development URL" : "Development URL"}
                        </Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 bg-gray-100 text-xs"
                          disabled={!platform.developmentUrl}
                        >
                          EMPTY - ADD URL
                        </Button>
                      </div>
                      <Input
                        value={platform.developmentUrl}
                        onChange={(e) => handlePlatformUpdate(index, 'developmentUrl', e.target.value)}
                        placeholder={`https://example.com`}
                        className="text-sm"
                      />
                      <div className="text-xs text-yellow-600 flex items-center gap-1">
                        <Plus className="h-3 w-3" />
                        Add a URL here to track this platform
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm">
                          {platform.name === "GitHub Repository" ? "Repository URL" : 
                           platform.name === "Netlify Deployment" ? "Live URL" :
                           platform.name === "Twilio Configuration" ? "Live URL" : "Published URL"}
                        </Label>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 bg-gray-100 text-xs"
                          disabled={!platform.liveUrl}
                        >
                          EMPTY - ADD URL
                        </Button>
                      </div>
                      <Input
                        value={platform.liveUrl}
                        onChange={(e) => handlePlatformUpdate(index, 'liveUrl', e.target.value)}
                        placeholder={`https://example.com`}
                        className="text-sm"
                      />
                      <div className="text-xs text-yellow-600 flex items-center gap-1">
                        <Plus className="h-3 w-3" />
                        Add a URL here to track this platform
                      </div>
                    </div>
                  </div>

                  {/* Platform-specific fields */}
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    {platform.name === "Mocha Publishing" && (
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
                          <Label className="text-xs">Published Date & Time</Label>
                          <Input
                            type="datetime-local"
                            value={platform.publishedDate}
                            onChange={(e) => handlePlatformUpdate(index, 'publishedDate', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Version</Label>
                          <Input
                            value={platform.version}
                            onChange={(e) => handlePlatformUpdate(index, 'version', e.target.value)}
                            placeholder="v1.0.0"
                            className="text-xs"
                          />
                        </div>
                      </>
                    )}

                    {platform.name === "GitHub Repository" && (
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
                          <Label className="text-xs">Last Pushed</Label>
                          <Input
                            type="datetime-local"
                            value={platform.lastPushed}
                            onChange={(e) => handlePlatformUpdate(index, 'lastPushed', e.target.value)}
                            className="text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Branch</Label>
                          <Input
                            value={platform.branch}
                            onChange={(e) => handlePlatformUpdate(index, 'branch', e.target.value)}
                            placeholder="main"
                            className="text-xs"
                          />
                        </div>
                      </>
                    )}

                    {(platform.name === "Netlify Deployment" || platform.name === "Vercel Deployment") && (
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
                          <Label className="text-xs">Development URL</Label>
                          <Input
                            value={platform.developmentUrl}
                            onChange={(e) => handlePlatformUpdate(index, 'developmentUrl', e.target.value)}
                            placeholder="https://console.twilio.com"
                            className="text-xs"
                          />
                        </div>
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
                      </>
                    )}
                  </div>

                  {/* Additional fields for specific platforms */}
                  {platform.name === "GitHub Repository" && (
                    <div className="space-y-2">
                      <Label className="text-xs">Commit Hash</Label>
                      <Input
                        value={platform.commitHash}
                        onChange={(e) => handlePlatformUpdate(index, 'commitHash', e.target.value)}
                        placeholder="a1b2c3d4e5f6..."
                        className="text-xs"
                      />
                    </div>
                  )}

                  {platform.name === "Netlify Deployment" && (
                    <div className="space-y-2">
                      <Label className="text-xs">Deploy ID</Label>
                      <Input
                        value={platform.deployId}
                        onChange={(e) => handlePlatformUpdate(index, 'deployId', e.target.value)}
                        placeholder="6123456789abcdef"
                        className="text-xs"
                      />
                    </div>
                  )}
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
              Update Project
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};