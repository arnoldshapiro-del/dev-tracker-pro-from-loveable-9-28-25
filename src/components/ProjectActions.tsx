import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Cloud, RotateCcw, LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/appStore';
import { useAuth } from '@/components/auth/AuthProvider';
import { AuthModal } from '@/components/auth/AuthModal';

export const ProjectActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { projects, loadProjects, addProject } = useAppStore();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleExportToJSON = () => {
    try {
      const dataStr = JSON.stringify(projects, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `devtracker-projects-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast({
        title: "Export successful",
        description: "Projects exported to JSON file on your desktop",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export projects",
        variant: "destructive",
      });
    }
  };

  const handleImportFromJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        let importedProjects;
        
        try {
          importedProjects = JSON.parse(content);
        } catch (parseError) {
          throw new Error('Invalid JSON format - please check your file');
        }
        
        // Handle both array and single object formats
        if (!Array.isArray(importedProjects)) {
          if (typeof importedProjects === 'object' && importedProjects !== null) {
            importedProjects = [importedProjects];
          } else {
            throw new Error('File must contain project data as an array or object');
          }
        }

        setIsLoading(true);
        console.log('=== IMPORT START ===');
        console.log('User authenticated:', !!user);
        console.log('Projects to import:', importedProjects.length);

        if (user) {
          // Import to cloud if authenticated
          let successCount = 0;
          console.log('Starting import of', importedProjects.length, 'projects');
          
          for (const project of importedProjects) {
            console.log('Importing project:', project.name || 'Unnamed');
            try {
              await addProject({
                name: project.name || 'Imported Project',
                description: project.description || '',
                status: project.status || 'active',
                progress: project.progress || 0,
                lastActivity: project.lastActivity || new Date().toISOString().split('T')[0],
                issues: project.issues || 0,
                technologies: project.technologies || [],
                ai_platform: project.ai_platform || 'mocha',
                project_type: project.project_type || 'web',
                platform_url: project.platform_url || project.primaryUrl || '',
                github_repo_url: project.github_repo_url || '',
                netlify_url: project.netlify_url || '',
                credits_used: project.credits_used || 0,
                credits_remaining: project.credits_remaining || 100,
                initial_budget_credits: project.initial_budget_credits || 100,
                repository: project.repository || '',
                deployment: project.deployment || '',
                primaryUrl: project.primaryUrl || project.platform_url || '',
                features_completed: project.features_completed || [],
                features_pending: project.features_pending || [],
                known_bugs: project.known_bugs || [],
                time_to_deploy_hours: project.time_to_deploy_hours,
                build_success_rate: project.build_success_rate,
                deployment_success_rate: project.deployment_success_rate,
                netlify_dev_url: project.netlify_dev_url,
                vercel_url: project.vercel_url,
                vercel_dev_url: project.vercel_dev_url,
                lovable_live_url: project.lovable_live_url,
                lovable_dev_url: project.lovable_dev_url,
                mocha_published_url: project.mocha_published_url,
              });
              successCount++;
            } catch (error) {
              console.error('Failed to import project:', project.name, error);
            }
          }
          
          toast({
            title: "Import successful",
            description: `Imported ${successCount} of ${importedProjects.length} projects to cloud`,
          });
        } else {
          // Show auth modal if not authenticated
          setShowAuthModal(true);
          toast({
            title: "Authentication required",
            description: "Please sign in to import projects to cloud storage",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Import error:', error);
        toast({
          title: "Import failed",
          description: "Failed to import projects from file. Please check the file format.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        // Reset the file input
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  };

  const handleSyncWithCloud = async () => {
    if (!user) {
      setShowAuthModal(true);
      toast({
        title: "Authentication required",
        description: "Please sign in to sync with cloud",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await loadProjects();
      
      toast({
        title: "Sync successful",
        description: "Projects synced with cloud storage",
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync failed",
        description: "Failed to sync with cloud",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestoreFromCloud = async () => {
    if (!user) {
      setShowAuthModal(true);
      toast({
        title: "Authentication required",
        description: "Please sign in to restore from cloud",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await loadProjects();
      
      toast({
        title: "Restore successful",
        description: "Projects restored from cloud backup",
      });
    } catch (error) {
      console.error('Restore error:', error);
      toast({
        title: "Restore failed",
        description: "Failed to restore from cloud",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="h-5 w-5" />
          Project Data Management
          {user && (
            <span className="ml-auto text-sm font-normal text-green-600">
              ✓ Signed in as {user.email}
            </span>
          )}
        </CardTitle>
        <CardDescription>
          Export, import, sync, and restore your project data
          {!user && " (Sign in required for cloud features)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              {!user ? (
                <>
                  <p className="font-medium text-blue-800">Authentication Required</p>
                  <p className="text-sm text-blue-700">Sign in to access cloud storage features</p>
                </>
              ) : (
                <>
                  <p className="font-medium text-green-800">✓ Signed in as {user.email}</p>
                  <p className="text-sm text-green-700">Cloud storage features are enabled</p>
                </>
              )}
            </div>
            {!user && (
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={handleExportToJSON}
            variant="outline" 
            className="flex items-center gap-2"
            disabled={projects.length === 0}
          >
            <Download className="h-4 w-4" />
            Export to JSON
          </Button>
          
          <div>
            <Label htmlFor="import-file" className="cursor-pointer">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 w-full"
                disabled={isLoading}
                asChild
              >
                <span>
                  <Upload className="h-4 w-4" />
                  Import from JSON
                </span>
              </Button>
            </Label>
            <Input
              id="import-file"
              type="file"
              accept=".json"
              onChange={handleImportFromJSON}
              className="hidden"
            />
          </div>
          
          <Button 
            onClick={handleSyncWithCloud}
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isLoading || !user}
          >
            <Cloud className="h-4 w-4" />
            Sync with Cloud
          </Button>
          
          <Button 
            onClick={handleRestoreFromCloud}
            variant="outline" 
            className="flex items-center gap-2"
            disabled={isLoading || !user}
          >
            <RotateCcw className="h-4 w-4" />
            Restore from Cloud
          </Button>
        </div>
      </CardContent>
      
      <AuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
      />
    </Card>
  );
};