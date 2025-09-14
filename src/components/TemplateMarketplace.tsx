import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, Plus, Star, Download, Upload, Search, Filter,
  Code2, Smartphone, Globe, Database, Brain, Zap, Heart,
  Award, Clock, DollarSign, Users, TrendingUp
} from "lucide-react";
import { ProjectTemplate } from "@/types/projectTypes";
import { Project } from "@/store/appStore";

interface TemplateMarketplaceProps {
  onCreateFromTemplate: (template: ProjectTemplate) => void;
}

const mockTemplates: ProjectTemplate[] = [
  {
    id: "1",
    name: "Medical Dashboard Pro",
    description: "Comprehensive medical dashboard with patient management, appointment scheduling, and analytics",
    category: "Healthcare",
    project_type: "medical",
    features: ["Patient Management", "Appointment Scheduling", "Medical Records", "Analytics Dashboard", "HIPAA Compliance"],
    estimated_credits: 120,
    estimated_time_hours: 15,
    difficulty_level: "advanced",
    template_data: {
      name: "Medical Dashboard Pro",
      description: "Comprehensive medical dashboard with patient management, appointment scheduling, and analytics",
      status: "planning",
      ai_platform: "mocha",
      project_type: "medical",
      progress: 0,
      lastActivity: "Template created",
      issues: 0,
      technologies: ["React", "TypeScript", "Healthcare APIs", "Tailwind CSS"]
    },
    usage_count: 45,
    rating: 4.8,
    created_by: "Dr. Sarah Johnson",
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    id: "2",
    name: "E-commerce Starter",
    description: "Complete e-commerce platform with product catalog, shopping cart, and payment integration",
    category: "E-commerce",
    project_type: "ecommerce",
    features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "User Authentication", "Order Management"],
    estimated_credits: 95,
    estimated_time_hours: 12,
    difficulty_level: "intermediate",
    template_data: {
      name: "E-commerce Starter",
      description: "Complete e-commerce platform with product catalog, shopping cart, and payment integration",
      status: "planning",
      ai_platform: "chatgpt",
      project_type: "ecommerce",
      progress: 0,
      lastActivity: "Template created",
      issues: 0,
      technologies: ["React", "Node.js", "Stripe", "MongoDB"]
    },
    usage_count: 78,
    rating: 4.6,
    created_by: "Tech Team",
    created_at: "2024-01-08T00:00:00Z"
  },
  {
    id: "3",
    name: "SaaS Landing Page",
    description: "Professional SaaS landing page with pricing, features, and conversion optimization",
    category: "Marketing",
    project_type: "web",
    features: ["Landing Page", "Pricing Tables", "Feature Showcase", "Contact Forms", "SEO Optimization"],
    estimated_credits: 45,
    estimated_time_hours: 6,
    difficulty_level: "beginner",
    template_data: {
      name: "SaaS Landing Page",
      description: "Professional SaaS landing page with pricing, features, and conversion optimization",
      status: "planning",
      ai_platform: "bolt",
      project_type: "web",
      progress: 0,
      lastActivity: "Template created",
      issues: 0,
      technologies: ["React", "Tailwind CSS", "Analytics"]
    },
    usage_count: 156,
    rating: 4.9,
    created_by: "Marketing Pro",
    created_at: "2024-01-05T00:00:00Z"
  },
  {
    id: "4",
    name: "AI Chat Assistant",
    description: "Intelligent chat assistant with natural language processing and context awareness",
    category: "AI/ML",
    project_type: "ai",
    features: ["Chat Interface", "NLP Processing", "Context Memory", "Multi-language Support", "API Integration"],
    estimated_credits: 180,
    estimated_time_hours: 22,
    difficulty_level: "advanced",
    template_data: {
      name: "AI Chat Assistant",
      description: "Intelligent chat assistant with natural language processing and context awareness",
      status: "planning",
      ai_platform: "claude",
      project_type: "ai",
      progress: 0,
      lastActivity: "Template created",
      issues: 0,
      technologies: ["React", "Python", "OpenAI API", "WebSocket"]
    },
    usage_count: 32,
    rating: 4.7,
    created_by: "AI Research Lab",
    created_at: "2024-01-12T00:00:00Z"
  },
  {
    id: "5",
    name: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking with workout plans and progress monitoring",
    category: "Health & Fitness",
    project_type: "mobile",
    features: ["Workout Tracking", "Progress Charts", "Meal Planning", "Social Features", "Wearable Integration"],
    estimated_credits: 140,
    estimated_time_hours: 18,
    difficulty_level: "intermediate",
    template_data: {
      name: "Mobile Fitness Tracker",
      description: "Cross-platform mobile app for fitness tracking with workout plans and progress monitoring",
      status: "planning",
      ai_platform: "lovable",
      project_type: "mobile",
      progress: 0,
      lastActivity: "Template created",
      issues: 0,
      technologies: ["React Native", "Firebase", "Health APIs", "Charts"]
    },
    usage_count: 67,
    rating: 4.5,
    created_by: "Fitness Tech",
    created_at: "2024-01-07T00:00:00Z"
  }
];

const categories = ["All", "Healthcare", "E-commerce", "Marketing", "AI/ML", "Health & Fitness"];
const difficulties = ["All", "beginner", "intermediate", "advanced"];

export const TemplateMarketplace = ({ onCreateFromTemplate }: TemplateMarketplaceProps) => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<ProjectTemplate[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [isCreateTemplateModalOpen, setIsCreateTemplateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    category: "",
    project_type: "web",
    difficulty_level: "beginner" as const,
    features: "",
    estimated_credits: 50,
    estimated_time_hours: 5
  });

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || template.difficulty_level === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim()) {
      toast({
        title: "Template Name Required",
        description: "Please enter a template name",
        variant: "destructive"
      });
      return;
    }

    const template: ProjectTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      features: newTemplate.features.split(",").map(f => f.trim()).filter(Boolean),
      template_data: {
        name: newTemplate.name,
        description: newTemplate.description,
        status: "planning",
        ai_platform: "mocha",
        project_type: newTemplate.project_type,
        progress: 0,
        lastActivity: "Template created",
        issues: 0,
        technologies: []
      },
      usage_count: 0,
      rating: 5.0,
      created_by: "You",
      created_at: new Date().toISOString()
    };

    setTemplates([template, ...templates]);
    toast({
      title: "Template Created",
      description: "Your template has been added to the marketplace",
    });

    setNewTemplate({
      name: "",
      description: "",
      category: "",
      project_type: "web",
      difficulty_level: "beginner",
      features: "",
      estimated_credits: 50,
      estimated_time_hours: 5
    });
    setIsCreateTemplateModalOpen(false);
  };

  const handleUseTemplate = (template: ProjectTemplate) => {
    onCreateFromTemplate(template);
    toast({
      title: "Project Created",
      description: `Created new project from ${template.name} template`,
    });
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Healthcare":
        return <Heart className="h-4 w-4" />;
      case "E-commerce":
        return <Globe className="h-4 w-4" />;
      case "AI/ML":
        return <Brain className="h-4 w-4" />;
      case "Marketing":
        return <TrendingUp className="h-4 w-4" />;
      case "Health & Fitness":
        return <Award className="h-4 w-4" />;
      default:
        return <Code2 className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Template Marketplace</h1>
          <p className="text-muted-foreground mt-1">Discover and share project templates</p>
        </div>
        
        <Dialog open={isCreateTemplateModalOpen} onOpenChange={setIsCreateTemplateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="My Awesome Template"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={newTemplate.category} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this template includes and its use cases..."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select value={newTemplate.project_type} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, project_type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="ai">AI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={newTemplate.difficulty_level} onValueChange={(value) => setNewTemplate(prev => ({ ...prev, difficulty_level: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="credits">Est. Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    value={newTemplate.estimated_credits}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, estimated_credits: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (comma-separated)</Label>
                <Input
                  id="features"
                  value={newTemplate.features}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, features: e.target.value }))}
                  placeholder="Authentication, Dashboard, API Integration, Charts"
                />
              </div>

              <Button onClick={handleCreateTemplate} className="w-full">
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="browse">Browse Templates</TabsTrigger>
          <TabsTrigger value="my-templates">My Templates</TabsTrigger>
          <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search templates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category-filter">Category</Label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty-filter">Difficulty</Label>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty === "All" ? "All" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(template.category)}
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{template.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    <Badge className={getDifficultyColor(template.difficulty_level)}>
                      {template.difficulty_level}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Features:</div>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{template.estimated_credits}</div>
                      <div className="text-muted-foreground text-xs">Credits</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{template.estimated_time_hours}h</div>
                      <div className="text-muted-foreground text-xs">Time</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium">{template.usage_count}</div>
                      <div className="text-muted-foreground text-xs">Used</div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Created by {template.created_by} • {new Date(template.created_at).toLocaleDateString()}
                  </div>

                  <Button 
                    onClick={() => handleUseTemplate(template)} 
                    className="w-full"
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Templates</CardTitle>
              <CardDescription>Templates you've created and shared</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                You haven't created any templates yet.
                <br />
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsCreateTemplateModalOpen(true)}
                >
                  Create Your First Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{templates.length}</div>
                <p className="text-xs text-muted-foreground">Available in marketplace</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {templates.reduce((sum, t) => sum + t.usage_count, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Times templates used</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1)}
                </div>
                <p className="text-xs text-muted-foreground">Overall satisfaction</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.max(...templates.map(t => t.usage_count))}
                </div>
                <p className="text-xs text-muted-foreground">Max template usage</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Templates</CardTitle>
              <CardDescription>Most used templates in the marketplace</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates
                  .sort((a, b) => b.usage_count - a.usage_count)
                  .slice(0, 5)
                  .map((template, index) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-muted-foreground">#{index + 1}</div>
                        <div>
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-muted-foreground">{template.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{template.usage_count} uses</div>
                        <div className="text-sm text-muted-foreground">{template.rating} ⭐</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};