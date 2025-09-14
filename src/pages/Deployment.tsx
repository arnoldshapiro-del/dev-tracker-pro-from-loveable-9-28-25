import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Server, Globe, CheckCircle2, AlertCircle, Clock, Plus } from "lucide-react";

export const Deployment = () => {
  const deployments = [
    {
      id: 1,
      name: "DevTracker Pro",
      url: "devtracker-pro.vercel.app",
      status: "deployed",
      environment: "production",
      lastDeploy: "2 hours ago",
      commits: 23
    },
    {
      id: 2,
      name: "E-commerce Platform",
      url: "ecommerce-staging.netlify.app",
      status: "deploying",
      environment: "staging",
      lastDeploy: "5 minutes ago",
      commits: 12
    },
    {
      id: 3,
      name: "Weather App",
      url: "weather-app.expo.dev",
      status: "deployed",
      environment: "production",
      lastDeploy: "1 day ago",
      commits: 8
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'deploying': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'deployed': return <CheckCircle2 className="h-4 w-4" />;
      case 'deploying': return <Clock className="h-4 w-4" />;
      case 'failed': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            Deployment
          </h1>
          <p className="text-muted-foreground">Manage your application deployments</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          New Deployment
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Deployments</p>
                <p className="text-2xl font-bold">{deployments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{deployments.filter(d => d.status === 'deployed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-sm font-medium">In Progress</p>
                <p className="text-2xl font-bold">{deployments.filter(d => d.status === 'deploying').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Uptime</p>
                <p className="text-2xl font-bold">99.9%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deployments List */}
      <div className="space-y-4">
        {deployments.map((deployment) => (
          <Card key={deployment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(deployment.status)}`}>
                    {getStatusIcon(deployment.status)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{deployment.name}</h3>
                    <p className="text-sm text-muted-foreground">{deployment.url}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Badge className={getStatusColor(deployment.status)}>
                    {deployment.status}
                  </Badge>
                  <Badge variant="outline">
                    {deployment.environment}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Last Deploy</p>
                  <p className="font-medium">{deployment.lastDeploy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Commits</p>
                  <p className="font-medium">{deployment.commits}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Environment</p>
                  <p className="font-medium capitalize">{deployment.environment}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Logs
                  </Button>
                  <Button size="sm">
                    Visit Site
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};