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
    console.log('=== ADD PROJECT DEBUG START ===');
    console.log('Project data received:', projectData);
    
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user);
    
    if (!user) {
      console.error('No authenticated user found!');
      return;
    }

    const newProject = {
      name: projectData.name,
      description: projectData.description,
      status: projectData.status,
      progress: projectData.progress || 0,
      issues: projectData.issues || 0,
      ai_platform: projectData.ai_platform,
      project_type: projectData.project_type,
      platform_url: projectData.platform_url || '',
      github_repo_url: projectData.github_repo_url || '',
      netlify_url: projectData.netlify_url || '',
      netlify_dev_url: projectData.netlify_dev_url || '',
      vercel_url: projectData.vercel_url || '',
      vercel_dev_url: projectData.vercel_dev_url || '',
      lovable_live_url: projectData.lovable_live_url || '',
      lovable_dev_url: projectData.lovable_dev_url || '',
      mocha_published_url: projectData.mocha_published_url || '',
      credits_used: projectData.credits_used || 0,
      credits_remaining: projectData.credits_remaining || 100,
      initial_budget_credits: projectData.initial_budget_credits || 100,
      features_completed: projectData.features_completed || [],
      features_pending: projectData.features_pending || [],
      known_bugs: projectData.known_bugs || [],
      time_to_deploy_hours: projectData.time_to_deploy_hours || null,
      build_success_rate: projectData.build_success_rate || null,
      deployment_success_rate: projectData.deployment_success_rate || null,
      technologies: projectData.technologies || [],
      repository: projectData.repository || '',
      deployment: projectData.deployment || '',
      user_id: user.id,
      primary_url: projectData.primaryUrl || projectData.platform_url || projectData.deployment || '',
      last_activity: new Date().toISOString().split('T')[0],
    };
    
    console.log('Project data to insert:', newProject);

    const { data, error } = await supabase
      .from('projects')
      .insert([newProject])
      .select()
      .single();

    if (error) {
      console.error('=== SUPABASE INSERT ERROR ===');
      console.error('Error details:', error);
      console.error('Error message:', error.message);
      console.error('Error code:', error.code);
      return;
    }
    
    console.log('=== INSERT SUCCESS ===');
    console.log('Returned data:', data);

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
    
    console.log('=== PROJECT ADDED TO STORE ===');
    console.log('Current projects count:', get().projects.length);
  },
      
  updateProject: async (id, updates) => {
    // Map frontend fields to database fields
    const dbUpdates: any = {};
    
    if (updates.name !== undefined) dbUpdates.name = updates.name;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.progress !== undefined) dbUpdates.progress = updates.progress;
    if (updates.issues !== undefined) dbUpdates.issues = updates.issues;
    if (updates.technologies !== undefined) dbUpdates.technologies = updates.technologies;
    if (updates.ai_platform !== undefined) dbUpdates.ai_platform = updates.ai_platform;
    if (updates.project_type !== undefined) dbUpdates.project_type = updates.project_type;
    if (updates.platform_url !== undefined) dbUpdates.platform_url = updates.platform_url;
    if (updates.github_repo_url !== undefined) dbUpdates.github_repo_url = updates.github_repo_url;
    if (updates.netlify_url !== undefined) dbUpdates.netlify_url = updates.netlify_url;
    if (updates.netlify_dev_url !== undefined) dbUpdates.netlify_dev_url = updates.netlify_dev_url;
    if (updates.vercel_url !== undefined) dbUpdates.vercel_url = updates.vercel_url;
    if (updates.vercel_dev_url !== undefined) dbUpdates.vercel_dev_url = updates.vercel_dev_url;
    if (updates.lovable_live_url !== undefined) dbUpdates.lovable_live_url = updates.lovable_live_url;
    if (updates.lovable_dev_url !== undefined) dbUpdates.lovable_dev_url = updates.lovable_dev_url;
    if (updates.mocha_published_url !== undefined) dbUpdates.mocha_published_url = updates.mocha_published_url;
    if (updates.credits_used !== undefined) dbUpdates.credits_used = updates.credits_used;
    if (updates.credits_remaining !== undefined) dbUpdates.credits_remaining = updates.credits_remaining;
    if (updates.initial_budget_credits !== undefined) dbUpdates.initial_budget_credits = updates.initial_budget_credits;
    if (updates.features_completed !== undefined) dbUpdates.features_completed = updates.features_completed;
    if (updates.features_pending !== undefined) dbUpdates.features_pending = updates.features_pending;
    if (updates.known_bugs !== undefined) dbUpdates.known_bugs = updates.known_bugs;
    if (updates.time_to_deploy_hours !== undefined) dbUpdates.time_to_deploy_hours = updates.time_to_deploy_hours;
    if (updates.build_success_rate !== undefined) dbUpdates.build_success_rate = updates.build_success_rate;
    if (updates.deployment_success_rate !== undefined) dbUpdates.deployment_success_rate = updates.deployment_success_rate;
    if (updates.repository !== undefined) dbUpdates.repository = updates.repository;
    if (updates.deployment !== undefined) dbUpdates.deployment = updates.deployment;
    if (updates.primaryUrl !== undefined) dbUpdates.primary_url = updates.primaryUrl;
    
    dbUpdates.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('projects')
      .update(dbUpdates)
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
    console.log('=== LOAD PROJECTS DEBUG ===');
    const { data: { user } } = await supabase.auth.getUser();
    console.log('Current user:', user);
    
    if (!user) {
      console.log('No authenticated user for loading projects');
      return;
    }

    console.log('Fetching projects from Supabase...');
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    console.log('Supabase response - data:', data, 'error:', error);

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