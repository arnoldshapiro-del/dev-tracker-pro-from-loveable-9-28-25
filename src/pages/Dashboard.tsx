import React, { useState } from "react";
import { Plus, Bot, Rocket, BarChart3, Code2, Folder, ExternalLink, FileText, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/store/appStore";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { CalendarIcon, Users, Building, Tag, Key, Globe, Shield, Database, Server } from "lucide-react";

export const Dashboard = () => {
  const { projects, analytics, addProject } = useAppStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    status: 'planning' as const,
    ai_platform: 'mocha',
    project_type: 'web',
    platform_url: '',
    github_repo_url: '',
    netlify_url: '',
    credits_used: 0,
    credits_remaining: 100,
    initial_budget_credits: 100,
    team_members: [] as string[],
    project_category: 'web_app',
    framework_stack: [] as string[],
    project_priority: 'medium',
    deadline: null as Date | null,
    client_organization: '',
    project_status: 'planning',
    environment_variables: '',
    database_url: '',
    api_keys: [] as Array<{key: string, value: string}>,
    custom_domain: '',
    ssl_certificate: false,
    backup_frequency: 'weekly',
    project_tags: [] as string[]
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

    addProject({
      ...newProject,
      progress: 0,
      lastActivity: 'Just created',
      issues: 0,
      technologies: []
    });
    
    toast({
      title: "Project Created!",
      description: `${newProject.name} has been added to your dashboard.`,
    });

    setNewProject({
      name: '',
      description: '',
      status: 'planning',
      ai_platform: 'mocha',
      project_type: 'web',
      platform_url: '',
      github_repo_url: '',
      netlify_url: '',
      credits_used: 0,
      credits_remaining: 100,
      initial_budget_credits: 100,
      team_members: [],
      project_category: 'web_app',
      framework_stack: [],
      project_priority: 'medium',
      deadline: null,
      client_organization: '',
      project_status: 'planning',
      environment_variables: '',
      database_url: '',
      api_keys: [],
      custom_domain: '',
      ssl_certificate: false,
      backup_frequency: 'weekly',
      project_tags: []
    });
    setIsCreateModalOpen(false);
  };

  const handleStartNewProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleCompareAI = () => {
    navigate('/ai');
  };

  const handleDeployProject = () => {
    navigate('/deployment');
  };

  const handleAnalytics = () => {
    navigate('/analytics');
  };

  const handleProjectClick = (project: any) => {
    console.log('Project data:', project); // Show ALL project data
    console.log('project.primaryUrl:', project.primaryUrl);
    console.log('project.deployment:', project.deployment);
    
    // Priority: primaryUrl first, then try deployment field as fallback
    const urlToOpen = project.primaryUrl || project.deployment;
    
    if (urlToOpen) {
      // Ensure URL has proper protocol
      const finalUrl = urlToOpen.startsWith('http') ? urlToOpen : `https://${urlToOpen}`;
      console.log('Opening URL:', finalUrl, 'from project:', project.name);
      window.open(finalUrl, '_blank');
    } else {
      console.log('No URL found for project:', project.name, 'primaryUrl:', project.primaryUrl, 'deployment:', project.deployment);
      toast({
        title: "No Primary URL",
        description: "This project doesn't have a primary URL set. Edit the project to set one.",
        variant: "destructive"
      });
    }
  };

  const platformIcons: { [key: string]: React.ReactNode } = {
    mocha: <div className="w-2 h-2 rounded-full bg-purple-500"></div>,
    lovable: <div className="w-2 h-2 rounded-full bg-pink-500"></div>,
    bolt: <div className="w-2 h-2 rounded-full bg-yellow-500"></div>,
    claude: <div className="w-2 h-2 rounded-full bg-orange-500"></div>,
    chatgpt: <div className="w-2 h-2 rounded-full bg-green-500"></div>
  };

  const platformPerformance = [
    { name: 'Mocha', type: 'Full-stack development', rate: '95%', color: 'text-purple-600' },
    { name: 'Claude', type: 'Code analysis', rate: '88%', color: 'text-orange-600' },
    { name: 'ChatGPT', type: 'Feature development', rate: '82%', color: 'text-green-600' }
  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, arnold</h1>
          <p className="text-gray-600">
            {analytics.totalProjects} projects • {analytics.activeProjects} active • 1000 credits remaining
          </p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New AI Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
              <div className="grid gap-2">
                <Label htmlFor="name">Project Name *</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Amazing App"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What does this project do?"
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="ai_platform">AI Platform *</Label>
                <Select value={newProject.ai_platform} onValueChange={(value) => setNewProject(prev => ({ ...prev, ai_platform: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select AI Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mocha">Mocha</SelectItem>
                    <SelectItem value="lovable">Lovable</SelectItem>
                    <SelectItem value="bolt">Bolt</SelectItem>
                    <SelectItem value="emergent">Emergent</SelectItem>
                    <SelectItem value="genspark">GenSpark</SelectItem>
                    <SelectItem value="google-opal">Google Opal</SelectItem>
                    <SelectItem value="google-gemini">Google Gemini</SelectItem>
                    <SelectItem value="chatgpt-5">ChatGPT 5</SelectItem>
                    <SelectItem value="cursor">Cursor</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="replit">Replit</SelectItem>
                    <SelectItem value="abacus-ai">Abacus AI</SelectItem>
                    <SelectItem value="manus">Manus</SelectItem>
                    <SelectItem value="minimax">Minimax</SelectItem>
                    <SelectItem value="custom">Custom Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="project_type">Project Type</Label>
                <Select value={newProject.project_type} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Web App" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web App</SelectItem>
                    <SelectItem value="mobile">Mobile App</SelectItem>
                    <SelectItem value="medical">Medical App</SelectItem>
                    <SelectItem value="ecommerce">Ecommerce</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ai">AI Tool</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Members */}
              <div className="grid gap-2">
                <Label htmlFor="team_members">Team Members</Label>
                <Input
                  id="team_members"
                  value={newProject.team_members.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, team_members: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="john@example.com, jane@example.com"
                />
              </div>

              {/* Project Category */}
              <div className="grid gap-2">
                <Label htmlFor="project_category">Project Category</Label>
                <Select value={newProject.project_category} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web_app">Web App</SelectItem>
                    <SelectItem value="mobile_app">Mobile App</SelectItem>
                    <SelectItem value="desktop_app">Desktop App</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Framework/Technology Stack */}
              <div className="grid gap-2">
                <Label htmlFor="framework_stack">Framework/Technology Stack</Label>
                <Input
                  id="framework_stack"
                  value={newProject.framework_stack.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, framework_stack: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="React, Node.js, PostgreSQL, TypeScript"
                />
              </div>

              {/* Project Priority */}
              <div className="grid gap-2">
                <Label htmlFor="project_priority">Project Priority</Label>
                <Select value={newProject.project_priority} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Deadline/Target Launch Date */}
              <div className="grid gap-2">
                <Label htmlFor="deadline">Deadline/Target Launch Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newProject.deadline ? format(newProject.deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={newProject.deadline || undefined}
                      onSelect={(date) => setNewProject(prev => ({ ...prev, deadline: date || null }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Client/Organization */}
              <div className="grid gap-2">
                <Label htmlFor="client_organization">Client/Organization</Label>
                <Input
                  id="client_organization"
                  value={newProject.client_organization}
                  onChange={(e) => setNewProject(prev => ({ ...prev, client_organization: e.target.value }))}
                  placeholder="Acme Corp, Internal Project, etc."
                />
              </div>

              {/* Project Status */}
              <div className="grid gap-2">
                <Label htmlFor="project_status">Project Status</Label>
                <Select value={newProject.project_status} onValueChange={(value) => setNewProject(prev => ({ ...prev, project_status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planning">Planning</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="production">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="platform_url">AI Platform Project URL</Label>
                <Input
                  id="platform_url"
                  value={newProject.platform_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, platform_url: e.target.value }))}
                  placeholder="https://mocha.app/projects/123"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="github_repo_url">GitHub Repository URL</Label>
                <Input
                  id="github_repo_url"
                  value={newProject.github_repo_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, github_repo_url: e.target.value }))}
                  placeholder="https://github.com/username/repo"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="netlify_url">Netlify Deployment URL</Label>
                <Input
                  id="netlify_url"
                  value={newProject.netlify_url || ''}
                  onChange={(e) => setNewProject(prev => ({ ...prev, netlify_url: e.target.value }))}
                  placeholder="https://your-app.netlify.app"
                />
              </div>

              {/* Environment Variables */}
              <div className="grid gap-2">
                <Label htmlFor="environment_variables">Environment Variables</Label>
                <Textarea
                  id="environment_variables"
                  value={newProject.environment_variables}
                  onChange={(e) => setNewProject(prev => ({ ...prev, environment_variables: e.target.value }))}
                  placeholder="DATABASE_URL=..."
                  rows={3}
                />
              </div>

              {/* Database URL */}
              <div className="grid gap-2">
                <Label htmlFor="database_url">Database URL</Label>
                <Input
                  id="database_url"
                  value={newProject.database_url}
                  onChange={(e) => setNewProject(prev => ({ ...prev, database_url: e.target.value }))}
                  placeholder="postgresql://user:pass@host:port/db"
                />
              </div>

              {/* Custom Domain */}
              <div className="grid gap-2">
                <Label htmlFor="custom_domain">Custom Domain</Label>
                <Input
                  id="custom_domain"
                  value={newProject.custom_domain}
                  onChange={(e) => setNewProject(prev => ({ ...prev, custom_domain: e.target.value }))}
                  placeholder="myapp.com"
                />
              </div>

              {/* SSL Certificate */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="ssl_certificate"
                  checked={newProject.ssl_certificate}
                  onCheckedChange={(checked) => setNewProject(prev => ({ ...prev, ssl_certificate: !!checked }))}
                />
                <Label htmlFor="ssl_certificate">SSL Certificate</Label>
              </div>

              {/* Backup Frequency */}
              <div className="grid gap-2">
                <Label htmlFor="backup_frequency">Backup Frequency</Label>
                <Select value={newProject.backup_frequency} onValueChange={(value) => setNewProject(prev => ({ ...prev, backup_frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Project Tags */}
              <div className="grid gap-2">
                <Label htmlFor="project_tags">Project Tags</Label>
                <Input
                  id="project_tags"
                  value={newProject.project_tags.join(', ')}
                  onChange={(e) => setNewProject(prev => ({ ...prev, project_tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                  placeholder="urgent, frontend, api, beta"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="credits_remaining">Credits Remaining</Label>
                  <Input
                    id="credits_remaining"
                    type="number"
                    value={newProject.credits_remaining || 100}
                    onChange={(e) => setNewProject(prev => ({ ...prev, credits_remaining: parseInt(e.target.value) || 0 }))}
                    placeholder="Credits left"
                    className="bg-green-50 border-green-200"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="credits_used">Credits Used (Auto-Calculated)</Label>
                  <Input
                    id="credits_used"
                    type="number"
                    value={newProject.credits_used || 0}
                    onChange={(e) => setNewProject(prev => ({ ...prev, credits_used: parseInt(e.target.value) || 0 }))}
                    placeholder="0"
                    className="bg-red-50 border-red-200"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="initial_budget_credits">Initial Budget (Total Credits)</Label>
                <Input
                  id="initial_budget_credits"
                  type="number"
                  value={newProject.initial_budget_credits || 100}
                  onChange={(e) => setNewProject(prev => ({ ...prev, initial_budget_credits: parseInt(e.target.value) || 0 }))}
                  placeholder="100"
                  className="bg-blue-50 border-blue-200"
                />
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

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{analytics.totalProjects}</div>
                <div className="text-xs opacity-90">Total Projects</div>
              </div>
              <Folder className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{analytics.activeProjects}</div>
                <div className="text-xs opacity-90">Active Projects</div>
              </div>
              <Code2 className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">0%</div>
                <div className="text-xs opacity-90">Success Rate</div>
              </div>
              <BarChart3 className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs opacity-90">Credits Used</div>
              </div>
              <Lightbulb className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleStartNewProject}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Plus className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Start New Project</div>
                <div className="text-sm text-gray-500">Create a new AI development project</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleCompareAI}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Code2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Compare AI Assistants</div>
                <div className="text-sm text-gray-500">Analyze performance across platforms</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="bg-white hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
          onClick={handleDeployProject}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Rocket className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">Deploy Projects</div>
                <div className="text-sm text-gray-500">Manage deployments and publishing</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="col-span-2">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Projects
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {projects.slice(0, 5).map((project) => (
                  <div 
                    key={project.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-gray-100"
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className="flex items-center gap-3">
                      {platformIcons[project.ai_platform || 'mocha'] || platformIcons.mocha}
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{project.name}</div>
                        <div className="text-xs text-gray-500">{project.ai_platform || 'mocha'} • {project.progress}% complete</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        project.status === 'active' ? 'bg-blue-100 text-blue-700' : 
                        project.status === 'completed' ? 'bg-green-100 text-green-700' : 
                        project.status === 'planning' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {project.status}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProjectClick(project);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <ExternalLink className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Performance */}
        <div>
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Performance
                </CardTitle>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {platformPerformance.map((platform, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{platform.name}</div>
                      <div className="text-xs text-gray-500">{platform.type}</div>
                    </div>
                    <div className={`text-sm font-semibold ${platform.color}`}>
                      {platform.rate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Development Metrics */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Development Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.5h</div>
              <div className="text-xs text-gray-500">Avg Completion</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">6</div>
              <div className="text-xs text-gray-500">Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">1000</div>
              <div className="text-xs text-gray-500">Credits Left</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">98%</div>
              <div className="text-xs text-gray-500">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate('/projects')}>
          <Folder className="h-4 w-4 mr-2" />
          Manage Projects
        </Button>
        <Button variant="outline" onClick={handleCompareAI}>
          <Bot className="h-4 w-4 mr-2" />
          AI Assistants
        </Button>
        <Button variant="outline" onClick={handleAnalytics}>
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics
        </Button>
      </div>
    </div>
  );
};