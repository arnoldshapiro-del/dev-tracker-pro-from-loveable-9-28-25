import { useState } from "react";
import { WelcomeHero } from "@/components/WelcomeHero";
import { MetricCard } from "@/components/MetricCard";
import { SetupChecklist } from "@/components/SetupChecklist";
import { AchievementSection } from "@/components/AchievementSection";
import { FolderOpen, TrendingUp, AlertCircle, Plus, Activity, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/appStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Dashboard = () => {
  const { toast } = useToast();
  const { projects, analytics, addProject, updateAnalytics } = useAppStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'active' as const,
    progress: 0,
    lastActivity: 'Just created',
    issues: 0,
    technologies: [] as string[]
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
    updateAnalytics({ 
      totalProjects: analytics.totalProjects + 1,
      activeProjects: analytics.activeProjects + 1
    });
    
    toast({
      title: "Project Created!",
      description: `${newProject.name} has been added to your dashboard.`,
    });

    setNewProject({
      name: '',
      description: '',
      status: 'active',
      progress: 0,
      lastActivity: 'Just created',
      issues: 0,
      technologies: []
    });
    setIsCreateModalOpen(false);
  };

  const handleGetStarted = () => {
    toast({
      title: "Welcome to DevTracker Pro!",
      description: "Let's explore all the features together.",
    });
  };

  const recentActivity = projects
    .filter(p => p.status === 'active')
    .slice(0, 3)
    .map(p => ({
      id: p.id,
      title: p.name,
      time: p.lastActivity,
      type: 'update'
    }));

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your development overview.</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-purple border-0 hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
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

      {/* Welcome Hero */}
      <WelcomeHero onGetStarted={handleGetStarted} />

      {/* Metrics */}
      <div className="grid gap-6 md:grid-cols-4">
        <MetricCard
          title="Total Projects"
          value={analytics.totalProjects}
          gradient="green"
          icon={<FolderOpen className="h-8 w-8" />}
        />
        <MetricCard
          title="Daily Progress"
          value={`${analytics.dailyProgress}%`}
          gradient="blue"
          icon={<TrendingUp className="h-8 w-8" />}
        />
        <MetricCard
          title="Active Projects"
          value={analytics.activeProjects}
          gradient="purple"
          icon={<Activity className="h-8 w-8" />}
        />
        <MetricCard
          title="Total Issues"
          value={analytics.totalIssues}
          gradient="pink"
          icon={<AlertCircle className="h-8 w-8" />}
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Setup Checklist */}
        <div className="lg:col-span-2">
          <SetupChecklist />
        </div>
        
        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-3 rounded-lg border border-border bg-card/50">
                <h3 className="font-medium text-sm">{activity.title}</h3>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <div className="p-4 text-center text-muted-foreground text-sm">
                No recent activity
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Achievement Section */}
      <AchievementSection />
    </div>
  );
};