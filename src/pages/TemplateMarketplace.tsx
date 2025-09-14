import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Star, 
  Download, 
  Eye, 
  Code, 
  Smartphone, 
  Globe, 
  Database,
  Zap,
  Filter,
  TrendingUp,
  Heart
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  platform: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  downloads: number;
  preview: string;
  tags: string[];
  author: string;
  price: number;
  features: string[];
  lastUpdated: string;
}

const templates: Template[] = [
  {
    id: '1',
    name: 'E-commerce Dashboard',
    description: 'Complete admin dashboard for e-commerce with analytics, product management, and order tracking',
    category: 'dashboard',
    platform: 'mocha',
    difficulty: 'intermediate',
    rating: 4.8,
    downloads: 1247,
    preview: '/api/placeholder/400/300',
    tags: ['react', 'charts', 'admin', 'ecommerce'],
    author: 'DevStudio',
    price: 0,
    features: ['Responsive Design', 'Dark Mode', 'Real-time Charts', 'User Management'],
    lastUpdated: '2 days ago'
  },
  {
    id: '2',
    name: 'SaaS Landing Page',
    description: 'Modern, conversion-optimized landing page template for SaaS products',
    category: 'landing',
    platform: 'lovable',
    difficulty: 'beginner',
    rating: 4.6,
    downloads: 856,
    preview: '/api/placeholder/400/300',
    tags: ['landing', 'saas', 'marketing', 'conversion'],
    author: 'MarketingPro',
    price: 29,
    features: ['SEO Optimized', 'Mobile First', 'Analytics Ready', 'A/B Test Ready'],
    lastUpdated: '1 week ago'
  },
  {
    id: '3',
    name: 'AI Chat Interface',
    description: 'Intelligent chat interface with AI integration and real-time messaging',
    category: 'ai',
    platform: 'bolt',
    difficulty: 'advanced',
    rating: 4.9,
    downloads: 634,
    preview: '/api/placeholder/400/300',
    tags: ['ai', 'chat', 'realtime', 'websocket'],
    author: 'AIBuilder',
    price: 49,
    features: ['AI Integration', 'Real-time Chat', 'File Sharing', 'Voice Messages'],
    lastUpdated: '3 days ago'
  },
  {
    id: '4',
    name: 'Medical Dashboard',
    description: 'Healthcare management system with patient records and appointment scheduling',
    category: 'healthcare',
    platform: 'claude',
    difficulty: 'advanced',
    rating: 4.7,
    downloads: 423,
    preview: '/api/placeholder/400/300',
    tags: ['healthcare', 'medical', 'dashboard', 'HIPAA'],
    author: 'MedTech',
    price: 79,
    features: ['HIPAA Compliant', 'Patient Management', 'Appointment System', 'Secure'],
    lastUpdated: '5 days ago'
  },
  {
    id: '5',
    name: 'Social Media App',
    description: 'Complete social media application with posts, messaging, and social features',
    category: 'social',
    platform: 'mocha',
    difficulty: 'advanced',
    rating: 4.5,
    downloads: 789,
    preview: '/api/placeholder/400/300',
    tags: ['social', 'messaging', 'posts', 'realtime'],
    author: 'SocialDev',
    price: 39,
    features: ['Real-time Feed', 'Direct Messaging', 'Stories', 'Push Notifications'],
    lastUpdated: '1 day ago'
  },
  {
    id: '6',
    name: 'Portfolio Website',
    description: 'Clean, modern portfolio template perfect for developers and designers',
    category: 'portfolio',
    platform: 'lovable',
    difficulty: 'beginner',
    rating: 4.4,
    downloads: 1123,
    preview: '/api/placeholder/400/300',
    tags: ['portfolio', 'personal', 'showcase', 'minimal'],
    author: 'DesignStudio',
    price: 0,
    features: ['Responsive', 'Portfolio Gallery', 'Contact Form', 'Blog Ready'],
    lastUpdated: '1 week ago'
  }
];

const categories = [
  { id: 'all', name: 'All Templates', icon: Globe },
  { id: 'dashboard', name: 'Dashboards', icon: Code },
  { id: 'landing', name: 'Landing Pages', icon: TrendingUp },
  { id: 'ai', name: 'AI/ML', icon: Zap },
  { id: 'healthcare', name: 'Healthcare', icon: Heart },
  { id: 'social', name: 'Social', icon: Smartphone },
  { id: 'portfolio', name: 'Portfolio', icon: Eye }
];

const platforms = ['all', 'mocha', 'lovable', 'bolt', 'claude', 'chatgpt'];
const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

export const TemplateMarketplace = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('downloads');

  const filteredTemplates = templates
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      const matchesPlatform = selectedPlatform === 'all' || template.platform === selectedPlatform;
      const matchesDifficulty = selectedDifficulty === 'all' || template.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesPlatform && matchesDifficulty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating': return b.rating - a.rating;
        case 'downloads': return b.downloads - a.downloads;
        case 'newest': return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        case 'price': return a.price - b.price;
        default: return 0;
      }
    });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'mocha': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lovable': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'bolt': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'claude': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Template Marketplace</h1>
        <p className="text-muted-foreground">
          Discover and download premium templates for your AI development projects
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{templates.length}</div>
            <div className="text-sm text-muted-foreground">Total Templates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {templates.filter(t => t.price === 0).length}
            </div>
            <div className="text-sm text-muted-foreground">Free Templates</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {templates.reduce((sum, t) => sum + t.downloads, 0).toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Downloads</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {(templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((category) => (
          <Card 
            key={category.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <CardContent className="p-4 text-center">
              <category.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">{category.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map(platform => (
                  <SelectItem key={platform} value={platform}>
                    {platform === 'all' ? 'All Platforms' : platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(difficulty => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredTemplates.length} of {templates.length} templates
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                {template.category === 'dashboard' ? '📊' : 
                 template.category === 'landing' ? '🚀' :
                 template.category === 'ai' ? '🤖' :
                 template.category === 'healthcare' ? '🏥' :
                 template.category === 'social' ? '👥' : '💼'}
              </div>
              <div className="absolute top-2 right-2">
                <Badge className={getPlatformColor(template.platform)}>
                  {template.platform}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge className={getDifficultyColor(template.difficulty)}>
                  {template.difficulty}
                </Badge>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {template.author}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">
                    {template.price === 0 ? 'FREE' : `$${template.price}`}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {template.rating}
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {template.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {template.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {template.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {template.downloads.toLocaleString()}
                </div>
                <div>Updated {template.lastUpdated}</div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  {template.price === 0 ? 'Download' : 'Buy'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No templates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse different categories
          </p>
        </div>
      )}
    </div>
  );
};