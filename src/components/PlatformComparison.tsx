import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap, 
  CheckCircle, 
  XCircle,
  Star,
  BarChart3
} from "lucide-react";

interface PlatformMetrics {
  platform: string;
  logo: string;
  successRate: number;
  avgTime: string;
  costPerProject: number;
  features: string[];
  pros: string[];
  cons: string[];
  rating: number;
  projectsCompleted: number;
  specialty: string;
}

const platformData: PlatformMetrics[] = [
  {
    platform: "Mocha",
    logo: "🍫",
    successRate: 95,
    avgTime: "2.5h",
    costPerProject: 45,
    features: ["Full-stack development", "AI-powered code generation", "Real-time collaboration"],
    pros: ["Fastest deployment", "Best UI generation", "Great documentation"],
    cons: ["Limited customization", "Higher cost"],
    rating: 4.8,
    projectsCompleted: 127,
    specialty: "Full-stack Web Apps"
  },
  {
    platform: "Lovable",
    logo: "💜",
    successRate: 88,
    avgTime: "3.2h",
    costPerProject: 35,
    features: ["Visual editing", "Component library", "Real-time preview"],
    pros: ["Visual interface", "Good for beginners", "Affordable"],
    cons: ["Limited backend features", "Slower for complex apps"],
    rating: 4.5,
    projectsCompleted: 89,
    specialty: "Frontend & UI Design"
  },
  {
    platform: "Bolt",
    logo: "⚡",
    successRate: 82,
    avgTime: "4.1h",
    costPerProject: 28,
    features: ["Rapid prototyping", "Template library", "Version control"],
    pros: ["Fast prototyping", "Great templates", "Version control"],
    cons: ["Limited AI features", "Manual coding required"],
    rating: 4.2,
    projectsCompleted: 156,
    specialty: "Rapid Prototyping"
  },
  {
    platform: "Claude",
    logo: "🤖",
    successRate: 78,
    avgTime: "5.5h",
    costPerProject: 22,
    features: ["Code analysis", "Documentation", "Bug detection"],
    pros: ["Excellent code quality", "Great debugging", "Low cost"],
    cons: ["Slower development", "Manual deployment"],
    rating: 4.1,
    projectsCompleted: 203,
    specialty: "Code Analysis & Quality"
  },
  {
    platform: "ChatGPT",
    logo: "💬",
    successRate: 72,
    avgTime: "6.8h",
    costPerProject: 18,
    features: ["Natural language coding", "Multi-language support", "Learning assistance"],
    pros: ["Natural language input", "Educational", "Very affordable"],
    cons: ["Inconsistent results", "Requires technical knowledge"],
    rating: 3.9,
    projectsCompleted: 89,
    specialty: "Educational & Learning"
  }
];

export const PlatformComparison = () => {
  const sortedPlatforms = [...platformData].sort((a, b) => b.successRate - a.successRate);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">AI Platform Performance Comparison</h2>
        <p className="text-muted-foreground">
          Compare AI development platforms based on real project data and user feedback
        </p>
      </div>

      {/* Quick Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Platforms Tested</p>
                <p className="text-xl font-bold">{platformData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Success Rate</p>
                <p className="text-xl font-bold">
                  {Math.round(platformData.reduce((sum, p) => sum + p.successRate, 0) / platformData.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-xl font-bold">
                  {platformData.reduce((sum, p) => sum + p.projectsCompleted, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Cost</p>
                <p className="text-xl font-bold">
                  ${Math.round(platformData.reduce((sum, p) => sum + p.costPerProject, 0) / platformData.length)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Comparison Cards */}
      <div className="grid gap-6 lg:grid-cols-2">
        {sortedPlatforms.map((platform, index) => (
          <Card key={platform.platform} className={`hover:shadow-lg transition-shadow ${index === 0 ? 'ring-2 ring-primary' : ''}`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.logo}</span>
                  <div>
                    <CardTitle className="text-xl">{platform.platform}</CardTitle>
                    <p className="text-sm text-muted-foreground">{platform.specialty}</p>
                  </div>
                </div>
                {index === 0 && (
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    🏆 Best Overall
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <div className="flex items-center gap-2">
                    <Progress value={platform.successRate} className="flex-1 h-2" />
                    <span className="text-sm font-bold">{platform.successRate}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg Time</p>
                  <p className="text-lg font-bold">{platform.avgTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cost/Project</p>
                  <p className="text-lg font-bold">${platform.costPerProject}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-bold">{platform.rating}</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div>
                <p className="text-sm font-medium mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1">
                  {platform.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-green-600 mb-2">Pros</p>
                  <ul className="space-y-1">
                    {platform.pros.slice(0, 2).map((pro, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-xs">
                        <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-600 mb-2">Cons</p>
                  <ul className="space-y-1">
                    {platform.cons.slice(0, 2).map((con, idx) => (
                      <li key={idx} className="flex items-start gap-1 text-xs">
                        <XCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <Button className="w-full" variant={index === 0 ? "default" : "outline"}>
                  <Zap className="h-4 w-4 mr-2" />
                  Try {platform.platform}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Need Help Choosing?</h3>
          <p className="text-muted-foreground mb-4">
            Get personalized recommendations based on your project requirements
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Platform Recommendation
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};