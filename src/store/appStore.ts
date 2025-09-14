// Global application state management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'archived';
  progress: number;
  lastActivity: string;
  repository?: string;
  deployment?: string;
  primaryUrl?: string;
  issues: number;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
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
          name: 'DevTracker Pro',
          description: 'Personal project management dashboard',
          status: 'active',
          progress: 75,
          lastActivity: '2 hours ago',
          repository: 'github.com/user/devtracker-pro',
          deployment: 'devtracker-pro.vercel.app',
          issues: 3,
          technologies: ['React', 'TypeScript', 'Tailwind'],
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20'
        },
        {
          id: '2',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution',
          status: 'active',
          progress: 45,
          lastActivity: '1 day ago',
          repository: 'github.com/user/ecommerce',
          issues: 5,
          technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
          createdAt: '2024-01-10',
          updatedAt: '2024-01-19'
        },
        {
          id: '3',
          name: 'Mobile Weather App',
          description: 'React Native weather application',
          status: 'completed',
          progress: 100,
          lastActivity: '3 days ago',
          deployment: 'weather-app.expo.dev',
          issues: 0,
          technologies: ['React Native', 'Expo', 'Weather API'],
          createdAt: '2024-01-05',
          updatedAt: '2024-01-18'
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
        totalProjects: 3,
        activeProjects: 2,
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