import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Brain, MessageSquare, Zap, Settings, Plus, TrendingUp, Users, Clock } from "lucide-react";
import { PlatformComparison } from "@/components/PlatformComparison";

export const AIAssistants = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const assistants = [
    {
      id: 1,
      name: "Mocha AI Builder",
      description: "Full-stack development AI that creates complete applications with modern frameworks",
      status: "active",
      tasksCompleted: 47,
      lastUsed: "2 hours ago",
      platform: "mocha",
      successRate: 95,
      avgTime: "2.5h",
      specialty: "Full-stack Development",
      cost: "$45/project"
    },
    {
      id: 2,
      name: "Lovable UI Designer",
      description: "Specialized in creating beautiful, responsive user interfaces with modern design principles",
      status: "active",
      tasksCompleted: 23,
      lastUsed: "1 day ago",
      platform: "lovable",
      successRate: 88,
      avgTime: "3.2h",
      specialty: "UI/UX Design",
      cost: "$35/project"
    },
    {
      id: 3,
      name: "Bolt Prototyper",
      description: "Rapid prototyping specialist for quick MVP development and proof of concepts",
      status: "idle",
      tasksCompleted: 31,
      lastUsed: "30 minutes ago",
      platform: "bolt",
      successRate: 82,
      avgTime: "4.1h",
      specialty: "Rapid Prototyping",
      cost: "$28/project"
    },
    {
      id: 4,
      name: "Claude Code Reviewer",
      description: "Advanced code analysis AI that ensures quality, security, and best practices",
      status: "active",
      tasksCompleted: 156,
      lastUsed: "5 minutes ago",
      platform: "claude",
      successRate: 78,
      avgTime: "5.5h",
      specialty: "Code Quality & Analysis",
      cost: "$22/project"
    },
    {
      id: 5,
      name: "ChatGPT Helper",
      description: "Natural language coding assistant for educational support and code generation",
      status: "idle",
      tasksCompleted: 89,
      lastUsed: "2 days ago",
      platform: "chatgpt",
      successRate: 72,
      avgTime: "6.8h",
      specialty: "Educational Support",
      cost: "$18/project"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'idle': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offline': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'mocha': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'lovable': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'bolt': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'claude': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'chatgpt': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Assistants
          </h1>
          <p className="text-muted-foreground">Manage and compare your AI development assistants</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Assistant
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assistants">My Assistants</TabsTrigger>
          <TabsTrigger value="comparison">Platform Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Total Assistants</p>
                    <p className="text-2xl font-bold">{assistants.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-400" />
                  <div>
                    <p className="text-sm font-medium">Active Now</p>
                    <p className="text-2xl font-bold">{assistants.filter(a => a.status === 'active').length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">Tasks Completed</p>
                    <p className="text-2xl font-bold">{assistants.reduce((sum, a) => sum + a.tasksCompleted, 0)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <div>
                    <p className="text-sm font-medium">Avg Success Rate</p>
                    <p className="text-2xl font-bold">
                      {Math.round(assistants.reduce((sum, a) => sum + a.successRate, 0) / assistants.length)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Performing Assistants
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assistants
                  .sort((a, b) => b.successRate - a.successRate)
                  .slice(0, 3)
                  .map((assistant, index) => (
                  <div key={assistant.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{assistant.name}</p>
                        <Badge className={getPlatformColor(assistant.platform)}>
                          {assistant.platform}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{assistant.specialty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{assistant.successRate}% Success</p>
                      <p className="text-sm text-muted-foreground">{assistant.avgTime} avg</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assistants" className="space-y-6">
          {/* Assistants Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assistants.map((assistant) => (
              <Card key={assistant.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Bot className="h-5 w-5 text-primary" />
                        {assistant.name}
                      </CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge className={getStatusColor(assistant.status)}>
                          {assistant.status}
                        </Badge>
                        <Badge className={getPlatformColor(assistant.platform)}>
                          {assistant.platform}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{assistant.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Success Rate</span>
                      <span className="font-semibold">{assistant.successRate}%</span>
                    </div>
                    <Progress value={assistant.successRate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Tasks Completed</p>
                      <p className="font-semibold">{assistant.tasksCompleted}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Avg Time</p>
                      <p className="font-semibold">{assistant.avgTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Used</p>
                      <p className="font-semibold">{assistant.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Cost</p>
                      <p className="font-semibold">{assistant.cost}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Zap className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add New Assistant */}
          <Card className="border-dashed border-2 border-muted-foreground/20">
            <CardContent className="p-8 text-center">
              <Bot className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Create New AI Assistant</h3>
              <p className="text-muted-foreground mb-4">
                Configure a custom AI assistant for your specific development needs
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assistant
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <PlatformComparison />
        </TabsContent>
      </Tabs>
    </div>
  );
};