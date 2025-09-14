import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Smartphone, Download, Store, TestTube, Share, Plus } from "lucide-react";

export const Mobile = () => {
  const mobileProjects = [
    {
      id: 1,
      name: "Weather App",
      platform: "React Native",
      status: "published",
      version: "2.1.0",
      downloads: 15420,
      rating: 4.7,
      buildProgress: 100
    },
    {
      id: 2,
      name: "Task Manager",
      platform: "Flutter",
      status: "testing",
      version: "1.0.0-beta",
      downloads: 0,
      rating: 0,
      buildProgress: 85
    },
    {
      id: 3,
      name: "Photo Editor",
      platform: "Ionic",
      status: "development",
      version: "0.5.0",
      downloads: 0,
      rating: 0,
      buildProgress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'testing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'development': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformIcon = (platform: string) => {
    return <Smartphone className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Smartphone className="h-8 w-8 text-primary" />
            Mobile
          </h1>
          <p className="text-muted-foreground">Manage your mobile app development</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <Plus className="h-4 w-4 mr-2" />
          New Mobile App
        </Button>
      </div>

      {/* Mobile Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Apps</p>
                <p className="text-2xl font-bold">{mobileProjects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-green-400" />
              <div>
                <p className="text-sm font-medium">Published</p>
                <p className="text-2xl font-bold">{mobileProjects.filter(p => p.status === 'published').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Total Downloads</p>
                <p className="text-2xl font-bold">{mobileProjects.reduce((sum, p) => sum + p.downloads, 0).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TestTube className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-sm font-medium">In Testing</p>
                <p className="text-2xl font-bold">{mobileProjects.filter(p => p.status === 'testing').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Projects */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mobileProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getPlatformIcon(project.platform)}
                    {project.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{project.platform}</p>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Build Progress */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Build Progress</span>
                  <span>{project.buildProgress}%</span>
                </div>
                <Progress value={project.buildProgress} className="h-2" />
              </div>

              {/* App Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Version</p>
                  <p className="font-medium">{project.version}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Downloads</p>
                  <p className="font-medium">{project.downloads.toLocaleString()}</p>
                </div>
              </div>

              {project.status === 'published' && (
                <div className="text-sm">
                  <p className="text-muted-foreground">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{project.rating}</span>
                    <div className="flex text-yellow-400">
                      {'★'.repeat(Math.floor(project.rating))}
                      {'☆'.repeat(5 - Math.floor(project.rating))}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <TestTube className="h-3 w-3 mr-1" />
                  Test
                </Button>
                <Button size="sm" className="flex-1">
                  <Share className="h-3 w-3 mr-1" />
                  Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <Smartphone className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">React Native</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Cross-platform mobile app with native performance
              </p>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <Smartphone className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">Flutter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Google's UI toolkit for beautiful native apps
              </p>
              <Button size="sm" variant="outline">
                Use Template
              </Button>
            </div>
            
            <div className="p-4 border border-dashed border-muted-foreground/20 rounded-lg text-center">
              <Smartphone className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <h3 className="font-semibold mb-1">Ionic</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Web-based mobile apps with native features
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