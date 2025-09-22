-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planning' CHECK (status IN ('planning', 'development', 'testing', 'deployed', 'maintenance', 'abandoned', 'active', 'completed', 'on-hold', 'archived')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  last_activity TEXT NOT NULL DEFAULT CURRENT_DATE::TEXT,
  repository TEXT,
  deployment TEXT,
  primary_url TEXT,
  issues INTEGER NOT NULL DEFAULT 0,
  technologies TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- DevTracker Pro specific fields
  ai_platform TEXT,
  project_type TEXT,
  credits_used INTEGER,
  initial_budget_credits INTEGER,
  credits_remaining INTEGER,
  github_repo_url TEXT,
  netlify_url TEXT,
  netlify_dev_url TEXT,
  vercel_url TEXT,
  vercel_dev_url TEXT,
  lovable_live_url TEXT,
  lovable_dev_url TEXT,
  platform_url TEXT,
  mocha_published_url TEXT,
  time_to_deploy_hours NUMERIC,
  build_success_rate NUMERIC,
  deployment_success_rate NUMERIC,
  features_completed TEXT[],
  features_pending TEXT[],
  known_bugs TEXT[]
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own projects" 
ON public.projects 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
ON public.projects 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
ON public.projects 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();