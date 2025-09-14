// Advanced project management types and interfaces
import { Project } from "@/store/appStore";
export interface ProjectBudget {
  id: string;
  project_id: string;
  initial_budget_credits: number;
  current_credits_remaining: number;
  credits_consumed: number;
  estimated_completion_credits: number;
  budget_alerts_enabled: boolean;
  alert_threshold_percentage: number;
  cost_per_feature: number;
  efficiency_score: number;
  created_at: string;
  updated_at: string;
}

export interface CreditUsage {
  id: string;
  project_id: string;
  platform_name: string;
  credits_used: number;
  task_description: string;
  efficiency_rating: number;
  was_successful: boolean;
  notes: string;
  created_at: string;
}

export interface ProjectVersionLog {
  id: string;
  project_id: string;
  platform_name: string;
  action_type: 'publish' | 'push' | 'deploy' | 'configure';
  version_number: string;
  platform_url: string;
  commit_hash?: string;
  deployment_id?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface AIPrompt {
  id: string;
  project_id: string;
  prompt_title: string;
  prompt_content: string;
  prompt_version: string;
  ai_platform: string;
  success_rating: number;
  output_quality: number;
  time_to_result_minutes: number;
  credits_consumed: number;
  tags: string[];
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface CrossPlatformComparison {
  id: string;
  user_id: string;
  project_concept: string;
  platform_results: Record<string, any>;
  winner_platform: string;
  cost_analysis: Record<string, any>;
  time_analysis: Record<string, any>;
  quality_analysis: Record<string, any>;
  recommendation_notes: string;
  created_at: string;
  updated_at: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  project_type: string;
  features: string[];
  estimated_credits: number;
  estimated_time_hours: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  template_data: Partial<Project>;
  usage_count: number;
  rating: number;
  created_by: string;
  created_at: string;
}

export interface TimeTrackingEntry {
  id: string;
  project_id: string;
  task_description: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
  task_type: 'development' | 'debugging' | 'testing' | 'deployment' | 'planning';
  productivity_rating: number;
  notes: string;
  created_at: string;
}