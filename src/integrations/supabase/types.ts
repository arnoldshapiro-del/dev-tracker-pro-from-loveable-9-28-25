export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      projects: {
        Row: {
          ai_platform: string | null
          build_success_rate: number | null
          created_at: string
          credits_remaining: number | null
          credits_used: number | null
          deployment: string | null
          deployment_success_rate: number | null
          description: string | null
          display_order: number | null
          features_completed: string[] | null
          features_pending: string[] | null
          github_repo_url: string | null
          id: string
          initial_budget_credits: number | null
          issues: number
          known_bugs: string[] | null
          last_activity: string
          lovable_dev_url: string | null
          lovable_live_url: string | null
          mocha_published_url: string | null
          name: string
          netlify_dev_url: string | null
          netlify_url: string | null
          platform_url: string | null
          primary_url: string | null
          progress: number
          project_type: string | null
          repository: string | null
          status: string
          technologies: string[] | null
          time_to_deploy_hours: number | null
          updated_at: string
          user_id: string | null
          vercel_dev_url: string | null
          vercel_url: string | null
        }
        Insert: {
          ai_platform?: string | null
          build_success_rate?: number | null
          created_at?: string
          credits_remaining?: number | null
          credits_used?: number | null
          deployment?: string | null
          deployment_success_rate?: number | null
          description?: string | null
          display_order?: number | null
          features_completed?: string[] | null
          features_pending?: string[] | null
          github_repo_url?: string | null
          id?: string
          initial_budget_credits?: number | null
          issues?: number
          known_bugs?: string[] | null
          last_activity?: string
          lovable_dev_url?: string | null
          lovable_live_url?: string | null
          mocha_published_url?: string | null
          name: string
          netlify_dev_url?: string | null
          netlify_url?: string | null
          platform_url?: string | null
          primary_url?: string | null
          progress?: number
          project_type?: string | null
          repository?: string | null
          status?: string
          technologies?: string[] | null
          time_to_deploy_hours?: number | null
          updated_at?: string
          user_id?: string | null
          vercel_dev_url?: string | null
          vercel_url?: string | null
        }
        Update: {
          ai_platform?: string | null
          build_success_rate?: number | null
          created_at?: string
          credits_remaining?: number | null
          credits_used?: number | null
          deployment?: string | null
          deployment_success_rate?: number | null
          description?: string | null
          display_order?: number | null
          features_completed?: string[] | null
          features_pending?: string[] | null
          github_repo_url?: string | null
          id?: string
          initial_budget_credits?: number | null
          issues?: number
          known_bugs?: string[] | null
          last_activity?: string
          lovable_dev_url?: string | null
          lovable_live_url?: string | null
          mocha_published_url?: string | null
          name?: string
          netlify_dev_url?: string | null
          netlify_url?: string | null
          platform_url?: string | null
          primary_url?: string | null
          progress?: number
          project_type?: string | null
          repository?: string | null
          status?: string
          technologies?: string[] | null
          time_to_deploy_hours?: number | null
          updated_at?: string
          user_id?: string | null
          vercel_dev_url?: string | null
          vercel_url?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
