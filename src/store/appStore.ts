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
  github_dev_url?: string;
  netlify_url?: string;
  netlify_dev_url?: string;
  
  // Loveable platform fields
  loveable_live_url?: string;
  loveable_dev_url?: string;
  loveable_development_updated?: string;
  loveable_deployed_at?: string;
  
  // Bolt platform fields
  bolt_live_url?: string;
  bolt_dev_url?: string;
  bolt_development_updated?: string;
  bolt_deployed_at?: string;
  bolt_version?: string;
  
  platform_url?: string;
  mocha_published_url?: string;
  time_to_deploy_hours?: number;
  build_success_rate?: number;
  deployment_success_rate?: number;
  features_completed?: string[];
  features_pending?: string[];
  known_bugs?: string[];
  
  // Version and best site selection
  version?: string;
  best_site?: 'loveable' | 'bolt' | 'netlify' | 'github';
  
  // Future platform fields
  platform1_dev_url?: string;
  platform1_live_url?: string;
  platform2_dev_url?: string;
  platform2_live_url?: string;
  platform3_dev_url?: string;
  platform3_live_url?: string;
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
      projects: [
        {
          id: '1',
          name: 'DevTracker Pro amazing made by Zoer 8-8-25',
          description: 'Personal project management dashboard',
          status: 'active',
          progress: 75,
          lastActivity: '2 hours ago',
          repository: 'github.com/user/devtracker-pro',
          deployment: 'https://phoenix-project-revive.lovable.app/',
          primaryUrl: 'https://phoenix-project-revive.lovable.app/',
          lovable_live_url: 'https://phoenix-project-revive.lovable.app/',
          lovable_dev_url: 'https://zoer.ai/zchat/7671',
          issues: 3,
          technologies: ['React', 'TypeScript', 'Tailwind'],
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20',
          ai_platform: 'zoer',
          project_type: 'web',
          credits_used: 75,
          initial_budget_credits: 100,
          credits_remaining: 25
        },
        {
          id: '2',
          name: 'Real Estate Pro Luxury Platform Eta\'s Original 1st Program',
          description: 'Full-stack e-commerce solution',
          status: 'planning',
          progress: 45,
          lastActivity: '1 day ago',
          repository: 'github.com/user/ecommerce',
          issues: 5,
          technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
          createdAt: '2024-01-10',
          updatedAt: '2024-01-19',
          ai_platform: 'minimax',
          project_type: 'ecommerce',
          credits_used: 60,
          initial_budget_credits: 100,
          credits_remaining: 40
        },
        {
          id: '3',
          name: 'Medical Literature Manager',
          description: 'AI-powered medical literature management',
          status: 'planning',
          progress: 100,
          lastActivity: '3 days ago',
          deployment: 'weather-app.expo.dev',
          issues: 0,
          technologies: ['React Native', 'Expo', 'Weather API'],
          createdAt: '2024-01-05',
          updatedAt: '2024-01-18',
          ai_platform: 'bolt',
          project_type: 'medical',
          credits_used: 90,
          initial_budget_credits: 100,
          credits_remaining: 10
        },
        {
          id: '4',
          name: 'Reminder Pro Ultimate',
          description: 'Healthcare reminder system',
          status: 'planning',
          progress: 0,
          lastActivity: '5 days ago',
          issues: 0,
          technologies: ['React', 'TypeScript'],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
          ai_platform: 'bolt',
          project_type: 'medical',
          credits_used: 25,
          initial_budget_credits: 100,
          credits_remaining: 75
        },
        {
          id: '5',
          name: 'Reminder Pro',
          description: 'Healthcare provider system',
          status: 'planning',
          progress: 0,
          lastActivity: '1 week ago',
          issues: 0,
          technologies: ['React', 'TypeScript'],
          createdAt: '2024-01-01',
          updatedAt: '2024-01-10',
          ai_platform: 'mocha',
          project_type: 'medical',
          credits_used: 15,
          initial_budget_credits: 100,
          credits_remaining: 85
        }
      ],
      
      addProject: (projectData) => set((state) => {
        const newProject: Project = {
          ...projectData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0]
        };
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
        dailyProgress: 50,
        weeklyCommits: 23,
        totalProjects: 10,
        activeProjects: 10,
        completedTasks: 47,
        totalIssues: 8,
        resolvedIssues: 5
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