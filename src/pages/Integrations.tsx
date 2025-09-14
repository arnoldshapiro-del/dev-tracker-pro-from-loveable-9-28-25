import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Puzzle, Plus, Github, Slack, Trello, Calendar, Mail, Webhook } from "lucide-react";

export const Integrations = () => {
  const integrations = [
    {
      id: 1,
      name: "GitHub",
      description: "Connect your repositories for automated project tracking",
      icon: Github,
      status: "connected",
      category: "Version Control",
      enabled: true
    },
    {
      id: 2,
      name: "Slack",
      description: "Get notifications and updates in your team channels",
      icon: Slack,
      status: "available",
      category: "Communication",
      enabled: false
    },
    {
      id: 3,
      name: "Trello",
      description: "Sync tasks and project boards automatically",
      icon: Trello,
      status: "available",
      category: "Project Management",
      enabled: false
    },
    {
      id: 4,
      name: "Google Calendar",
      description: "Schedule and track project milestones",
      icon: Calendar,
      status: "connected",
      category: "Productivity",
      enabled: true
    },
    {
      id: 5,
      name: "Email Notifications",
      description: "Receive important updates via email",
      icon: Mail,
      status: "connected",
      category: "Notifications",
      enabled: true
    },
    {
      id: 6,
      name: "Webhooks",
      description: "Custom integrations with external services",
      icon: Webhook,
      status: "configured",
      category: "Developer Tools",
      enabled: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'configured': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'available': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Puzzle className="h-8 w-8 text-primary" />
            Integrations
          </h1>
          <p className="text-muted-foreground">Connect your favorite tools and services</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      {/* Integration Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Puzzle className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Integrations</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Connected</p>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'connected').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-blue-500" />
              <div>
                <p className="text-sm font-medium">Configured</p>
                <p className="text-2xl font-bold">{integrations.filter(i => i.status === 'configured').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-yellow-500" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{integrations.filter(i => i.enabled).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Integrations by Category */}
      {categories.map((category) => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integrations
              .filter(integration => integration.category === category)
              .map((integration) => {
                const IconComponent = integration.icon;
                return (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-muted">
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <Badge className={getStatusColor(integration.status)}>
                              {integration.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <Switch 
                          checked={integration.enabled}
                          disabled={integration.status === 'available'}
                        />
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {integration.description}
                      </p>
                      
                      <div className="flex gap-2">
                        {integration.status === 'available' ? (
                          <Button size="sm" className="w-full">
                            Connect
                          </Button>
                        ) : (
                          <>
                            <Button size="sm" variant="outline" className="flex-1">
                              Configure
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              Test
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      ))}

      {/* Custom Integrations */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Webhook className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Build Your Own Integration</h3>
            <p className="text-muted-foreground mb-4">
              Use our API and webhooks to create custom integrations with any service
            </p>
            <Button>
              View API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};