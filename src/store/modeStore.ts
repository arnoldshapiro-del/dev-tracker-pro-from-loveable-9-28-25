import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppMode = 'devtracker' | 'reminderpro';

interface ModeState {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  
  // Mode-specific navigation states
  devTrackerSection: string;
  reminderProSection: string;
  setDevTrackerSection: (section: string) => void;
  setReminderProSection: (section: string) => void;
  
  // Feature flags for each mode
  features: {
    devtracker: {
      aiComparison: boolean;
      budgetTracking: boolean;
      crossPlatform: boolean;
      versionControl: boolean;
      advancedAnalytics: boolean;
    };
    reminderpro: {
      patientReminders: boolean;
      smartScheduling: boolean;
      healthcareIntegration: boolean;
      complianceTracking: boolean;
      medicalForms: boolean;
    };
  };
}

export const useModeStore = create<ModeState>()(
  persist(
    (set, get) => ({
      currentMode: 'devtracker',
      
      setMode: (mode: AppMode) => set({ currentMode: mode }),
      
      devTrackerSection: 'dashboard',
      reminderProSection: 'patients',
      
      setDevTrackerSection: (section: string) => set({ devTrackerSection: section }),
      setReminderProSection: (section: string) => set({ reminderProSection: section }),
      
      features: {
        devtracker: {
          aiComparison: true,
          budgetTracking: true,
          crossPlatform: true,
          versionControl: true,
          advancedAnalytics: true,
        },
        reminderpro: {
          patientReminders: true,
          smartScheduling: true,
          healthcareIntegration: true,
          complianceTracking: true,
          medicalForms: true,
        },
      },
    }),
    {
      name: 'devtracker-mode-storage'
    }
  )
);