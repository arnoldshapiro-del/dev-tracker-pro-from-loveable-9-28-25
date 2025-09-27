-- Add a display_order column to maintain project order
ALTER TABLE public.projects 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Create an index for better performance when ordering
CREATE INDEX idx_projects_display_order ON public.projects(user_id, display_order);

-- Update existing projects with their current order (based on created_at)
UPDATE public.projects 
SET display_order = subquery.row_number
FROM (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at) as row_number
  FROM public.projects
) AS subquery
WHERE public.projects.id = subquery.id;