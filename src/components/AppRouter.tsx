import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/AppLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Projects } from '@/pages/Projects';
import { Analytics } from '@/pages/Analytics';
import { AIAssistants } from '@/pages/AIAssistants';
import { Deployment } from '@/pages/Deployment';
import { Team } from '@/pages/Team';
import { Workflows } from '@/pages/Workflows';
import { Security } from '@/pages/Security';
import { Mobile } from '@/pages/Mobile';
import { Integrations } from '@/pages/Integrations';
import { Help } from '@/pages/Help';
import { Settings } from '@/pages/Settings';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ai" element={<AIAssistants />} />
          <Route path="/deployment" element={<Deployment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/team" element={<Team />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/security" element={<Security />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};