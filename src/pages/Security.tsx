import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, CheckCircle2, Eye, Lock, Key, Scan } from "lucide-react";

export const Security = () => {
  const securityIssues = [
    {
      id: 1,
      title: "Outdated Dependencies",
      description: "3 packages have known security vulnerabilities",
      severity: "high",
      status: "open",
      project: "E-commerce Platform",
      dateFound: "2 days ago"
    },
    {
      id: 2,
      title: "Weak Password Policy",
      description: "Password requirements don't meet security standards",
      severity: "medium",
      status: "resolved",
      project: "DevTracker Pro",
      dateFound: "1 week ago"
    },
    {
      id: 3,
      title: "Missing HTTPS Redirect",
      description: "Application doesn't force HTTPS connections",
      severity: "low",
      status: "open",
      project: "Weather App",
      dateFound: "3 days ago"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const securityScore = 85;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            Security
          </h1>
          <p className="text-muted-foreground">Monitor and manage security across your projects</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Scan className="h-4 w-4 mr-2" />
          Run Security Scan
        </Button>
      </div>

      {/* Security Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Security Score</p>
                <p className="text-2xl font-bold">{securityScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <div>
                <p className="text-sm font-medium">Open Issues</p>
                <p className="text-2xl font-bold">{securityIssues.filter(i => i.status === 'open').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold">{securityIssues.filter(i => i.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Last Scan</p>
                <p className="text-2xl font-bold">2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Issues */}
      <Card>
        <CardHeader>
          <CardTitle>Security Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <AlertTriangle className={`h-5 w-5 ${
                    issue.severity === 'high' ? 'text-red-400' :
                    issue.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                  }`} />
                  
                  <div>
                    <h3 className="font-semibold">{issue.title}</h3>
                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">in {issue.project}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{issue.dateFound}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getSeverityColor(issue.severity)}>
                    {issue.severity}
                  </Badge>
                  <Badge className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Factor Authentication</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Enabled
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Password Policy</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Strong
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Timeout</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                24h
              </Badge>
            </div>
            <Button size="sm" className="w-full">
              Configure Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">API Rate Limiting</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">API Key Rotation</span>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Weekly
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">CORS Configuration</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Configured
              </Badge>
            </div>
            <Button size="sm" className="w-full">
              Manage API Keys
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};