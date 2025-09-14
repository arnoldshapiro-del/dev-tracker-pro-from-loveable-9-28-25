import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Workflow, Play, Pause, Settings, Plus, GitBranch, CheckCircle2, Clock } from "lucide-react";

export const Workflows = () => {
  const workflows = [
    {
      id: 1,
      name: "CI/CD Pipeline",
      description: "Automated build, test, and deployment workflow",
      status: "active",
      triggers: ["push", "pull_request"],
      lastRun: "2 hours ago",
      runs: 47,
      successRate: 98
    },
    {
      id: 2,
      name: "Code Quality Check",
      description: "Linting, formatting, and security analysis",
      status: "active",
      triggers: ["push"],
      lastRun: "30 minutes ago",
      runs: 23,
      successRate: 95
    },
    {
      id: 3,
      name: "Dependency Updates",
      description: "Automated dependency version updates",
      status: "paused",
      triggers: ["schedule"],
      lastRun: "3 days ago",
      runs: 12,
      successRate: 87
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'failed': return <CheckCircle2 className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Workflow className="h-8 w-8 text-primary" />
            Workflows
          </h1>
          <p className="text-muted-foreground">Automate your development processes</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </Button>
      </div>

      {/* Workflow Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Workflows</p>
                <p className="text-2xl font-bold">{workflows.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Play className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{workflows.filter(w => w.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <GitBranch className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Total Runs</p>
                <p className="text-2xl font-bold">{workflows.reduce((sum, w) => sum + w.runs, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold">
                  {Math.round(workflows.reduce((sum, w) => sum + w.successRate, 0) / workflows.length)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${getStatusColor(workflow.status)}`}>
                    {getStatusIcon(workflow.status)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg">{workflow.name}</h3>
                    <p className="text-sm text-muted-foreground">{workflow.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(workflow.status)}>
                    {workflow.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Triggers</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {workflow.triggers.map((trigger, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {trigger}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Run</p>
                  <p className="font-medium">{workflow.lastRun}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Runs</p>
                  <p className="font-medium">{workflow.runs}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{workflow.successRate}%</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    View Logs
                  </Button>
                  <Button size="sm">
                    Run Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workflow Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Workflow Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <GitBranch className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">CI/CD Pipeline</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete build, test, and deployment workflow
              </p>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">Code Quality</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Automated linting and security checks
              </p>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <Settings className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">Dependency Updates</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Automated package updates and security patches
              </p>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};