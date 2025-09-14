import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, TrendingUp, Zap, Clock, Target, Award, AlertTriangle, CheckCircle } from "lucide-react";
import { CrossPlatformComparison } from "@/types/projectTypes";

interface Platform {
  id: string;
  name: string;
  rating: number;
  avgTime: number;
  successRate: number;
  costPerProject: number;
  strengths: string[];
  weaknesses: string[];
  color: string;
}

const platforms: Platform[] = [
  {
    id: "mocha",
    name: "Mocha",
    rating: 95,
    avgTime: 8.5,
    successRate: 95,
    costPerProject: 85,
    strengths: ["Medical Apps", "Data Visualization", "Rapid Prototyping"],
    weaknesses: ["Complex Backend", "Real-time Features"],
    color: "blue"
  },
  {
    id: "claude",
    name: "Claude",
    rating: 92,
    avgTime: 6.2,
    successRate: 88,
    costPerProject: 75,
    strengths: ["Code Analysis", "Technical Writing", "Problem Solving"],
    weaknesses: ["Image Generation", "Real-time Chat"],
    color: "orange"
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    rating: 89,
    avgTime: 5.1,
    successRate: 82,
    costPerProject: 65,
    strengths: ["Feature Development", "Content Creation", "General Programming"],
    weaknesses: ["Complex Architecture", "Performance Optimization"],
    color: "green"
  },
  {
    id: "bolt",
    name: "Bolt",
    rating: 82,
    avgTime: 4.5,
    successRate: 78,
    costPerProject: 55,
    strengths: ["Quick Prototypes", "Simple UIs", "Fast Iteration"],
    weaknesses: ["Complex Logic", "Enterprise Features"],
    color: "yellow"
  },
  {
    id: "lovable",
    name: "Lovable",
    rating: 88,
    avgTime: 7.2,
    successRate: 85,
    costPerProject: 70,
    strengths: ["UI Design", "Responsive Layouts", "Modern Components"],
    weaknesses: ["Backend Integration", "Complex State Management"],
    color: "pink"
  }
];

export const PlatformComparison = () => {
  const { toast } = useToast();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [projectConcept, setProjectConcept] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [comparisonResult, setComparisonResult] = useState<CrossPlatformComparison | null>(null);

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleRunComparison = async () => {
    if (selectedPlatforms.length < 2) {
      toast({
        title: "Select Platforms",
        description: "Please select at least 2 platforms to compare",
        variant: "destructive"
      });
      return;
    }

    if (!projectConcept.trim()) {
      toast({
        title: "Project Concept Required",
        description: "Please describe your project concept",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);

    // Simulate analysis
    setTimeout(() => {
      const selectedPlatformData = platforms.filter(p => selectedPlatforms.includes(p.id));
      const winner = selectedPlatformData.reduce((best, current) => 
        current.rating > best.rating ? current : best
      );

      const result: CrossPlatformComparison = {
        id: Date.now().toString(),
        user_id: "user_123",
        project_concept: projectConcept,
        platform_results: selectedPlatformData.reduce((acc, platform) => ({
          ...acc,
          [platform.id]: {
            rating: platform.rating,
            estimatedTime: platform.avgTime,
            estimatedCost: platform.costPerProject,
            successProbability: platform.successRate
          }
        }), {}),
        winner_platform: winner.id,
        cost_analysis: {
          mostCostEffective: selectedPlatformData.reduce((best, current) => 
            current.costPerProject < best.costPerProject ? current : best
          ).id,
          averageCost: selectedPlatformData.reduce((sum, p) => sum + p.costPerProject, 0) / selectedPlatformData.length
        },
        time_analysis: {
          fastest: selectedPlatformData.reduce((best, current) => 
            current.avgTime < best.avgTime ? current : best
          ).id,
          averageTime: selectedPlatformData.reduce((sum, p) => sum + p.avgTime, 0) / selectedPlatformData.length
        },
        quality_analysis: {
          highest_success: selectedPlatformData.reduce((best, current) => 
            current.successRate > best.successRate ? current : best
          ).id,
          averageSuccess: selectedPlatformData.reduce((sum, p) => sum + p.successRate, 0) / selectedPlatformData.length
        },
        recommendation_notes: `Based on your project concept "${projectConcept}", ${winner.name} appears to be the best choice with a ${winner.rating}% rating and strong capabilities in ${winner.strengths.join(", ")}.`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setComparisonResult(result);
      setIsAnalyzing(false);

      toast({
        title: "Analysis Complete",
        description: `${winner.name} is recommended for your project`,
      });
    }, 3000);
  };

  const getPlatformColor = (color: string) => {
    const colors = {
      blue: "bg-blue-500",
      orange: "bg-orange-500", 
      green: "bg-green-500",
      yellow: "bg-yellow-500",
      pink: "bg-pink-500"
    };
    return colors[color as keyof typeof colors] || "bg-gray-500";
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Comparison</h1>
          <p className="text-muted-foreground mt-1">Compare AI platforms for your specific project needs</p>
        </div>
      </div>

      {/* Project Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Project Analysis Setup
          </CardTitle>
          <CardDescription>Define your project to get personalized platform recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="concept">Project Concept</Label>
            <Input
              id="concept"
              value={projectConcept}
              onChange={(e) => setProjectConcept(e.target.value)}
              placeholder="Describe your project idea, features, and requirements..."
            />
          </div>
          
          <div className="space-y-3">
            <Label>Select Platforms to Compare</Label>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {platforms.map((platform) => (
                <div
                  key={platform.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handlePlatformToggle(platform.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform.color)}`}></div>
                      <div>
                        <div className="font-medium">{platform.name}</div>
                        <div className="text-sm text-muted-foreground">Rating: {platform.rating}%</div>
                      </div>
                    </div>
                    {selectedPlatforms.includes(platform.id) && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleRunComparison} 
            disabled={isAnalyzing || selectedPlatforms.length < 2}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Platforms...
              </>
            ) : (
              <>
                <BarChart3 className="h-4 w-4 mr-2" />
                Run Comparison Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Platform Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Platform Comparison Matrix
          </CardTitle>
          <CardDescription>Side-by-side comparison of platform capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Platform</th>
                  <th className="text-center p-2">Overall Rating</th>
                  <th className="text-center p-2">Avg Time</th>
                  <th className="text-center p-2">Success Rate</th>
                  <th className="text-center p-2">Cost/Project</th>
                  <th className="text-center p-2">Strengths</th>
                </tr>
              </thead>
              <tbody>
                {platforms.map((platform) => (
                  <tr key={platform.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getPlatformColor(platform.color)}`}></div>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    </td>
                    <td className="text-center p-3">
                      <Badge variant="outline" className={getScoreColor(platform.rating)}>
                        {platform.rating}%
                      </Badge>
                    </td>
                    <td className="text-center p-3">{platform.avgTime}h</td>
                    <td className="text-center p-3">
                      <span className={getScoreColor(platform.successRate)}>
                        {platform.successRate}%
                      </span>
                    </td>
                    <td className="text-center p-3">${platform.costPerProject}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {platform.strengths.slice(0, 2).map((strength, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {strength}
                          </Badge>
                        ))}
                        {platform.strengths.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{platform.strengths.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {comparisonResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Analysis Results
            </CardTitle>
            <CardDescription>Personalized recommendation for your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Winner */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Recommended Platform</h3>
              </div>
              <div className="text-green-700">
                <div className="font-medium text-lg">
                  {platforms.find(p => p.id === comparisonResult.winner_platform)?.name}
                </div>
                <p className="text-sm mt-1">{comparisonResult.recommendation_notes}</p>
              </div>
            </div>

            {/* Analysis Breakdown */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Cost Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Most Cost-Effective:</span>
                      <span className="font-medium">
                        {platforms.find(p => p.id === comparisonResult.cost_analysis.mostCostEffective)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Cost:</span>
                      <span className="font-medium">${Math.round(comparisonResult.cost_analysis.averageCost)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fastest:</span>
                      <span className="font-medium">
                        {platforms.find(p => p.id === comparisonResult.time_analysis.fastest)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Time:</span>
                      <span className="font-medium">{comparisonResult.time_analysis.averageTime.toFixed(1)}h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    Quality Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Highest Success:</span>
                      <span className="font-medium">
                        {platforms.find(p => p.id === comparisonResult.quality_analysis.highest_success)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Average Success:</span>
                      <span className="font-medium">{Math.round(comparisonResult.quality_analysis.averageSuccess)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};