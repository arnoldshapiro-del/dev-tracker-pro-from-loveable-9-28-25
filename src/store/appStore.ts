// Global application state management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'development' | 'testing' | 'deployed' | 'maintenance' | 'abandoned' | 'active' | 'completed' | 'on-hold' | 'archived';
  progress: number;
  lastActivity: string;
  repository?: string;
  deployment?: string;
  primaryUrl?: string;
  issues: number;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
  
  // DevTracker Pro specific fields
  ai_platform: string;
  project_type: string;
  credits_used?: number;
  initial_budget_credits?: number;
  credits_remaining?: number;
  github_repo_url?: string;
  netlify_url?: string;
  netlify_dev_url?: string;
  vercel_url?: string;
  vercel_dev_url?: string;
  lovable_live_url?: string;
  lovable_dev_url?: string;
  platform_url?: string;
  mocha_published_url?: string;
  time_to_deploy_hours?: number;
  build_success_rate?: number;
  deployment_success_rate?: number;
  features_completed?: string[];
  features_pending?: string[];
  known_bugs?: string[];
}

export interface AnalyticsData {
  dailyProgress: number;
  weeklyCommits: number;
  totalProjects: number;
  activeProjects: number;
  completedTasks: number;
  totalIssues: number;
  resolvedIssues: number;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoSync: boolean;
  defaultView: 'grid' | 'list';
}

interface AppState {
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  
  // Analytics
  analytics: AnalyticsData;
  updateAnalytics: (data: Partial<AnalyticsData>) => void;
  
  // Settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // Setup
  setupCompleted: {
    import: boolean;
    connect: boolean;
    customize: boolean;
  };
  completeSetupStep: (step: keyof AppState['setupCompleted']) => void;
  
  // Navigation
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      projects: [], // CLEAN SLATE - No hardcoded sample data
      
      addProject: (projectData) => set((state) => {
        const newProject: Project = {
          ...projectData,
          id: Date.now().toString() + '-' + Math.random().toString(36).substr(2, 9), // Ensure unique ID
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
          // CRITICAL FIX: Map platform_url to primaryUrl for consistency with existing projects
          primaryUrl: projectData.primaryUrl || projectData.platform_url || projectData.deployment,
          // Ensure deployment field is also populated
          deployment: projectData.deployment || projectData.platform_url
        };
        
        console.log('=== NEW PROJECT CREATION DEBUG ===');
        console.log('Original projectData platform_url:', projectData.platform_url);
        console.log('Final newProject primaryUrl:', newProject.primaryUrl);
        console.log('Final newProject deployment:', newProject.deployment);
        
        return {
          projects: [...state.projects, newProject],
          analytics: {
            ...state.analytics,
            totalProjects: state.analytics.totalProjects + 1,
            activeProjects: newProject.status === 'active' ? state.analytics.activeProjects + 1 : state.analytics.activeProjects
          }
        };
      }),
      
      updateProject: (id, updates) => set((state) => ({
        projects: state.projects.map(project => 
          project.id === id 
            ? { ...project, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
            : project
        )
      })),
      
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter(project => project.id !== id),
        analytics: {
          ...state.analytics,
          totalProjects: state.analytics.totalProjects - 1
        }
      })),
      
      reorderProjects: (projects: Project[]) => set(() => ({
        projects
      })),
      
      analytics: {
        dailyProgress: 0,
        weeklyCommits: 0,
        totalProjects: 0,
        activeProjects: 0,
        completedTasks: 0,
        totalIssues: 0,
        resolvedIssues: 0
      },
      
      updateAnalytics: (data) => set((state) => ({
        analytics: { ...state.analytics, ...data }
      })),
      
      settings: {
        theme: 'dark',
        notifications: true,
        autoSync: true,
        defaultView: 'grid'
      },
      
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings }
      })),
      
      setupCompleted: {
        import: true,
        connect: false,
        customize: false
      },
      
      completeSetupStep: (step) => set((state) => ({
        setupCompleted: { ...state.setupCompleted, [step]: true }
      })),
      
      activeSection: 'dashboard',
      setActiveSection: (section) => set({ activeSection: section })
    }),
    {
      name: 'devtracker-storage'
    }
  )
);