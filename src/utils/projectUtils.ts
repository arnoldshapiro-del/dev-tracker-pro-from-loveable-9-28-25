// Centralized project URL resolution logic
import { Project } from "@/store/appStore";

/**
 * Gets the best available URL for a project using consistent priority
 * Priority: primaryUrl > lovable_live_url > lovable_dev_url > deployment > repository
 */
export const getProjectUrl = (project: Project): string | null => {
  // Exact same priority logic for all components
  const url = project.primaryUrl || 
              project.lovable_live_url || 
              project.lovable_dev_url || 
              project.deployment || 
              project.repository;
  
  return url || null;
};

/**
 * Formats URL to ensure it has proper protocol
 */
export const formatUrl = (url: string): string => {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
};

/**
 * Opens project URL in new tab with error handling
 */
export const openProjectUrl = (project: Project, showToast?: (message: { title: string; description: string; variant?: "destructive" | "default" }) => void) => {
  const url = getProjectUrl(project);
  
  if (url) {
    const finalUrl = formatUrl(url);
    window.open(finalUrl, '_blank');
    showToast?.({
      title: "Opening Project",
      description: `Opening ${project.name}...`,
    });
  } else {
    showToast?.({
      title: "No URL Available",
      description: "This project doesn't have a deployment or repository URL configured.",
      variant: "destructive"
    });
  }
};