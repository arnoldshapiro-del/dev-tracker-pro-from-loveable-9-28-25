import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, Upload, FileText, TrendingUp, Clock, Star, 
  DollarSign, Zap, GitBranch, BarChart3, Brain, 
  Target, Play, Settings, Database, AlertCircle,
  Plus, Edit, Trash2, ExternalLink, Copy, Check,
  Calendar, Timer, Award, BookOpen, Code2
} from "lucide-react";
import { Project } from "@/store/appStore";
import { ProjectBudget, CreditUsage, ProjectVersionLog, AIPrompt, TimeTrackingEntry } from "@/types/projectTypes";

interface ProjectTabsProps {
  project: Project;
  onProjectUpdate: (updates: Partial<Project>) => void;
}

export const ProjectTabs = ({ project, onProjectUpdate }: ProjectTabsProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState("");

  // Mock data - in real app, these would come from stores/APIs
  const mockBudget: ProjectBudget = {
    id: "1",
    project_id: project.id,
    initial_budget_credits: project.initial_budget_credits || 100,
    current_credits_remaining: project.credits_remaining || 75,
    credits_consumed: project.credits_used || 25,
    estimated_completion_credits: 85,
    budget_alerts_enabled: true,
    alert_threshold_percentage: 80,
    cost_per_feature: 5.2,
    efficiency_score: 4.1,
    created_at: "2024-01-01",
    updated_at: "2024-01-15"
  };

  const mockCreditUsage: CreditUsage[] = [
    {
      id: "1",
      project_id: project.id,
      platform_name: project.ai_platform || "mocha",
      credits_used: 15,
      task_description: "Initial project setup and basic UI components",
      efficiency_rating: 8,
      was_successful: true,
      notes: "Good progress on core functionality",
      created_at: "2024-01-15T10:00:00Z"
    },
    {
      id: "2",
      project_id: project.id,
      platform_name: project.ai_platform || "mocha",
      credits_used: 10,
      task_description: "Database schema design and implementation",
      efficiency_rating: 9,
      was_successful: true,
      notes: "Excellent database structure created",
      created_at: "2024-01-14T14:30:00Z"
    }
  ];

  const mockVersionLogs: ProjectVersionLog[] = [
    {
      id: "1",
      project_id: project.id,
      platform_name: "github",
      action_type: "push",
      version_number: "v1.2.0",
      platform_url: project.github_repo_url || "",
      commit_hash: "abc123def456",
      notes: "Added user authentication system",
      created_at: "2024-01-15T16:20:00Z",
      updated_at: "2024-01-15T16:20:00Z"
    },
    {
      id: "2",
      project_id: project.id,
      platform_name: "netlify",
      action_type: "deploy",
      version_number: "v1.1.5",
      platform_url: project.netlify_url || "",
      deployment_id: "deploy_789xyz",
      notes: "Production deployment successful",
      created_at: "2024-01-14T12:15:00Z",
      updated_at: "2024-01-14T12:15:00Z"
    }
  ];

  const mockPrompts: AIPrompt[] = [
    {
      id: "1",
      project_id: project.id,
      prompt_title: "Create User Dashboard",
      prompt_content: "Create a responsive user dashboard with metrics cards, charts, and user profile section...",
      prompt_version: "v1.0",
      ai_platform: project.ai_platform || "mocha",
      success_rating: 9,
      output_quality: 8,
      time_to_result_minutes: 12,
      credits_consumed: 8,
      tags: ["dashboard", "ui", "responsive"],
      is_favorite: true,
      created_at: "2024-01-15T09:00:00Z",
      updated_at: "2024-01-15T09:00:00Z"
    }
  ];

  const mockTimeEntries: TimeTrackingEntry[] = [
    {
      id: "1",
      project_id: project.id,
      task_description: "Frontend component development",
      start_time: "2024-01-15T09:00:00Z",
      end_time: "2024-01-15T12:00:00Z",
      duration_minutes: 180,
      task_type: "development",
      productivity_rating: 8,
      notes: "Good progress on main components",
      created_at: "2024-01-15T12:00:00Z"
    }
  ];

  const tabs = [
    { id: "overview", label: "Projects", icon: FileText },
    { id: "export-import", label: "Export & Import", icon: Download },
    { id: "ratings", label: "Comprehensive Ratings", icon: Star },
    { id: "version-history", label: "Version History", icon: GitBranch },
    { id: "smart-budget", label: "Smart Budget", icon: DollarSign },
    { id: "smart-credits", label: "Smart Credits", icon: Zap },
    { id: "auto-deploy-fake", label: "Auto Deploy (Fake)", icon: Play },
    { id: "auto-deploy-real", label: "Real Auto Deploy", icon: Target },
    { id: "ai-prompts", label: "AI Prompts", icon: Brain },
    { id: "deploy-status", label: "Deploy Status", icon: Database },
    { id: "platform-compare", label: "Platform Compare", icon: BarChart3 },
    { id: "templates", label: "Templates", icon: BookOpen },
    { id: "time-tracker", label: "Time Tracker", icon: Timer },
    { id: "timeline", label: "Timeline", icon: Calendar }
  ];

  const handleExportProject = () => {
    const exportData = {
      project,
      budget: mockBudget,
      creditUsage: mockCreditUsage,
      versionLogs: mockVersionLogs,
      prompts: mockPrompts,
      timeEntries: mockTimeEntries
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name.replace(/\s+/g, '_')}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Exported",
      description: "Project data has been exported successfully.",
    });
  };

  const handleStartTimer = () => {
    if (!currentTask.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task description before starting the timer.",
        variant: "destructive"
      });
      return;
    }
    setIsTimerRunning(true);
    toast({
      title: "Timer Started",
      description: `Timer started for: ${currentTask}`,
    });
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    toast({
      title: "Timer Stopped",
      description: "Time entry has been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-7 lg:grid-cols-14 w-full h-auto">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex flex-col items-center gap-1 p-2 text-xs"
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden lg:block">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Main project management and quick actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Project Status</Label>
                  <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <Label>Progress</Label>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="flex-1" />
                    <span className="text-sm">{project.progress}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>AI Platform</Label>
                  <Badge variant="outline">{project.ai_platform}</Badge>
                </div>
                <div className="space-y-2">
                  <Label>Issues</Label>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>{project.issues}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export-import" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Export Project
                </CardTitle>
                <CardDescription>Export project data for backup or migration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select defaultValue="json">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="json">JSON (Complete)</SelectItem>
                      <SelectItem value="csv">CSV (Summary)</SelectItem>
                      <SelectItem value="template">Template (Anonymized)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleExportProject} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Project
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Import Project
                </CardTitle>
                <CardDescription>Import project data from file or template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="import-file">Select File</Label>
                  <Input id="import-file" type="file" accept=".json,.csv" />
                </div>
                <Button className="w-full" variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ratings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Comprehensive Ratings
              </CardTitle>
              <CardDescription>Professional rating system with timestamped reviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Code Quality</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm">5.0</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Performance</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                    <span className="text-sm">4.0</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>User Experience</Label>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm">5.0</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Overall Rating</Label>
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold">4.7</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Badge variant="secondary">Excellent</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="version-history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Version History
              </CardTitle>
              <CardDescription>Cross-platform version tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockVersionLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{log.platform_name}</Badge>
                      <div>
                        <div className="font-medium">{log.action_type} - {log.version_number}</div>
                        <div className="text-sm text-muted-foreground">{log.notes}</div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(log.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart-budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Smart Budget Analysis
              </CardTitle>
              <CardDescription>AI-powered budget analysis and predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label>Budget Used</Label>
                  <div className="text-2xl font-bold">{mockBudget.credits_consumed}</div>
                  <div className="text-sm text-muted-foreground">of {mockBudget.initial_budget_credits} credits</div>
                </div>
                <div className="space-y-2">
                  <Label>Efficiency Score</Label>
                  <div className="text-2xl font-bold">{mockBudget.efficiency_score}</div>
                  <Badge variant="secondary">Grade A</Badge>
                </div>
                <div className="space-y-2">
                  <Label>Cost per Feature</Label>
                  <div className="text-2xl font-bold">${mockBudget.cost_per_feature}</div>
                  <div className="text-sm text-muted-foreground">average</div>
                </div>
                <div className="space-y-2">
                  <Label>Predicted Total</Label>
                  <div className="text-2xl font-bold">{mockBudget.estimated_completion_credits}</div>
                  <div className="text-sm text-muted-foreground">credits needed</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Budget Progress</Label>
                <Progress value={(mockBudget.credits_consumed / mockBudget.initial_budget_credits) * 100} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smart-credits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Smart Credits Analytics
              </CardTitle>
              <CardDescription>Advanced credit usage analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCreditUsage.map((usage) => (
                  <div key={usage.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{usage.task_description}</div>
                      <div className="text-sm text-muted-foreground">
                        {usage.platform_name} • {usage.credits_used} credits
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={usage.was_successful ? "default" : "destructive"}>
                        Efficiency: {usage.efficiency_rating}/10
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {new Date(usage.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-prompts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    AI Prompts Library
                  </CardTitle>
                  <CardDescription>Prompt management and rating system</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Prompt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockPrompts.map((prompt) => (
                  <div key={prompt.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{prompt.prompt_title}</h3>
                        {prompt.is_favorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{prompt.ai_platform}</Badge>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {prompt.prompt_content}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">
                        Success: {prompt.success_rating}/10
                      </div>
                      <div className="text-sm">
                        Quality: {prompt.output_quality}/10
                      </div>
                      <div className="text-sm">
                        Time: {prompt.time_to_result_minutes}m
                      </div>
                      <div className="text-sm">
                        Credits: {prompt.credits_consumed}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {prompt.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-tracker" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Timer className="h-5 w-5" />
                  Time Tracker
                </CardTitle>
                <CardDescription>Track development time and productivity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="task">Current Task</Label>
                  <Input 
                    id="task"
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    placeholder="What are you working on?"
                  />
                </div>
                <div className="flex gap-2">
                  {!isTimerRunning ? (
                    <Button onClick={handleStartTimer} className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Start Timer
                    </Button>
                  ) : (
                    <Button onClick={handleStopTimer} variant="destructive" className="flex-1">
                      <Settings className="h-4 w-4 mr-2" />
                      Stop Timer
                    </Button>
                  )}
                </div>
                {isTimerRunning && (
                  <div className="text-center">
                    <div className="text-2xl font-mono">00:45:32</div>
                    <div className="text-sm text-muted-foreground">Time elapsed</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Entries</CardTitle>
                <CardDescription>Recent time tracking entries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTimeEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium text-sm">{entry.task_description}</div>
                        <div className="text-xs text-muted-foreground">
                          {entry.task_type} • {entry.duration_minutes}min
                        </div>
                      </div>
                      <Badge variant="outline">
                        {entry.productivity_rating}/10
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tabs with placeholder content */}
        {["auto-deploy-fake", "auto-deploy-real", "deploy-status", "platform-compare", "templates", "timeline"].map((tabId) => (
          <TabsContent key={tabId} value={tabId} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{tabId.replace("-", " ")}</CardTitle>
                <CardDescription>Advanced feature coming soon...</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  This advanced feature is being developed and will be available soon.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
