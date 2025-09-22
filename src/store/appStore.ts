// Global application state management
import { create } from 'zustand';
import { supabase } from '@/integrations/supabase/client';

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
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (id: string, updates: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (projects: Project[]) => void;
  loadProjects: () => Promise<void>;
  
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

export const useAppStore = create<AppState>()((set, get) => ({
  projects: [],
  
  addProject: async (projectData) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const newProject = {
      ...projectData,
      user_id: user.id,
      primary_url: projectData.primaryUrl || projectData.platform_url || projectData.deployment,
      last_activity: new Date().toISOString().split('T')[0],
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();

    if (error) {
      console.error('Error adding project:', error);
      return;
    }

    const mappedProject: Project = {
      id: data.id,
      name: data.name || '',
      description: data.description || '',
      status: data.status as Project['status'],
      progress: data.progress || 0,
      lastActivity: data.last_activity || '',
      repository: data.repository || '',
      deployment: data.deployment || '',
      primaryUrl: data.primary_url || '',
      issues: data.issues || 0,
      technologies: data.technologies || [],
      createdAt: data.created_at?.split('T')[0] || '',
      updatedAt: data.updated_at?.split('T')[0] || '',
      ai_platform: data.ai_platform || '',
      project_type: data.project_type || '',
      credits_used: data.credits_used,
      initial_budget_credits: data.initial_budget_credits,
      credits_remaining: data.credits_remaining,
      github_repo_url: data.github_repo_url,
      netlify_url: data.netlify_url,
      netlify_dev_url: data.netlify_dev_url,
      vercel_url: data.vercel_url,
      vercel_dev_url: data.vercel_dev_url,
      lovable_live_url: data.lovable_live_url,
      lovable_dev_url: data.lovable_dev_url,
      platform_url: data.platform_url,
      mocha_published_url: data.mocha_published_url,
      time_to_deploy_hours: data.time_to_deploy_hours,
      build_success_rate: data.build_success_rate,
      deployment_success_rate: data.deployment_success_rate,
      features_completed: data.features_completed || [],
      features_pending: data.features_pending || [],
      known_bugs: data.known_bugs || [],
    };

    set((state) => ({
      projects: [...state.projects, mappedProject],
      analytics: {
        ...state.analytics,
        totalProjects: state.analytics.totalProjects + 1,
        activeProjects: mappedProject.status === 'active' ? state.analytics.activeProjects + 1 : state.analytics.activeProjects
      }
    }));
  },
      
  updateProject: async (id, updates) => {
    const { error } = await supabase
      .from('projects')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating project:', error);
      return;
    }

    set((state) => ({
      projects: state.projects.map(project => 
        project.id === id 
          ? { ...project, ...updates, updatedAt: new Date().toISOString().split('T')[0] }
          : project
      )
    }));
  },
      
  deleteProject: async (id) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting project:', error);
      return;
    }

    set((state) => ({
      projects: state.projects.filter(project => project.id !== id),
      analytics: {
        ...state.analytics,
        totalProjects: state.analytics.totalProjects - 1
      }
    }));
  },
      
  reorderProjects: (projects: Project[]) => set(() => ({
    projects
  })),

  loadProjects: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading projects:', error);
      return;
    }

    const projects: Project[] = data.map(project => ({
      id: project.id,
      name: project.name || '',
      description: project.description || '',
      status: project.status as Project['status'],
      progress: project.progress || 0,
      lastActivity: project.last_activity || '',
      repository: project.repository || '',
      deployment: project.deployment || '',
      primaryUrl: project.primary_url || '',
      issues: project.issues || 0,
      technologies: project.technologies || [],
      createdAt: project.created_at?.split('T')[0] || '',
      updatedAt: project.updated_at?.split('T')[0] || '',
      ai_platform: project.ai_platform || '',
      project_type: project.project_type || '',
      credits_used: project.credits_used,
      initial_budget_credits: project.initial_budget_credits,
      credits_remaining: project.credits_remaining,
      github_repo_url: project.github_repo_url,
      netlify_url: project.netlify_url,
      netlify_dev_url: project.netlify_dev_url,
      vercel_url: project.vercel_url,
      vercel_dev_url: project.vercel_dev_url,
      lovable_live_url: project.lovable_live_url,
      lovable_dev_url: project.lovable_dev_url,
      platform_url: project.platform_url,
      mocha_published_url: project.mocha_published_url,
      time_to_deploy_hours: project.time_to_deploy_hours,
      build_success_rate: project.build_success_rate,
      deployment_success_rate: project.deployment_success_rate,
      features_completed: project.features_completed || [],
      features_pending: project.features_pending || [],
      known_bugs: project.known_bugs || [],
    }));

    set((state) => ({
      projects,
      analytics: {
        ...state.analytics,
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length
      }
    }));
  },
      
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
}));