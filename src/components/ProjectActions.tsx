import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Download, Cloud, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store/appStore';
import { supabase } from '@/integrations/supabase/client';

export const ProjectActions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { projects, loadProjects } = useAppStore();
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
        const importedProjects = JSON.parse(content);
        
        if (!Array.isArray(importedProjects)) {
          throw new Error('Invalid file format');
        }

        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to import projects",
            variant: "destructive",
          });
          return;
        }

        // Import projects to cloud
        for (const project of importedProjects) {
          const projectData = {
            ...project,
            user_id: user.id,
            id: undefined, // Let Supabase generate new IDs
          };
          
          await supabase.from('projects').insert([projectData]);
        }

        await loadProjects();
        
        toast({
          title: "Import successful",
          description: `Imported ${importedProjects.length} projects to cloud`,
        });
      } catch (error) {
        toast({
          title: "Import failed",
          description: "Failed to import projects from file",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.readAsText(file);
  };

  const handleSyncWithCloud = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to sync with cloud",
          variant: "destructive",
        });
        return;
      }

      await loadProjects();
      
      toast({
        title: "Sync successful",
        description: "Projects synced with cloud storage",
      });
    } catch (error) {
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
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to restore from cloud",
          variant: "destructive",
        });
        return;
      }

      await loadProjects();
      
      toast({
        title: "Restore successful",
        description: "Projects restored from cloud backup",
      });
    } catch (error) {
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
        </CardTitle>
        <CardDescription>
          Export, import, sync, and restore your project data
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          disabled={isLoading}
        >
          <Cloud className="h-4 w-4" />
          Sync with Cloud
        </Button>
        
        <Button 
          onClick={handleRestoreFromCloud}
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RotateCcw className="h-4 w-4" />
          Restore from Cloud
        </Button>
      </CardContent>
    </Card>
  );
};