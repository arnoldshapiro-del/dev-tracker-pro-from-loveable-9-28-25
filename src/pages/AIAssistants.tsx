import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, MessageSquare, Zap, Settings, Plus } from "lucide-react";

export const AIAssistants = () => {
  const assistants = [
    {
      id: 1,
      name: "Code Reviewer",
      description: "Automatically reviews your code for best practices and potential issues",
      status: "active",
      tasksCompleted: 47,
      lastUsed: "2 hours ago"
    },
    {
      id: 2,
      name: "Documentation Writer",
      description: "Generates comprehensive documentation for your projects",
      status: "idle",
      tasksCompleted: 23,
      lastUsed: "1 day ago"
    },
    {
      id: 3,
      name: "Test Generator",
      description: "Creates unit tests based on your code implementation",
      status: "active",
      tasksCompleted: 31,
      lastUsed: "30 minutes ago"
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            AI Assistants
          </h1>
          <p className="text-muted-foreground">Manage your AI-powered development helpers</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Assistant
        </Button>
      </div>

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
              <Settings className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-sm font-medium">Efficiency</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <Badge className={getStatusColor(assistant.status)}>
                    {assistant.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{assistant.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Tasks Completed</p>
                  <p className="font-semibold">{assistant.tasksCompleted}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Used</p>
                  <p className="font-semibold">{assistant.lastUsed}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Configure
                </Button>
                <Button size="sm" className="flex-1">
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
    </div>
  );
};