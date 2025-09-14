import { Sidebar } from "./Sidebar";
import { WelcomeHero } from "./WelcomeHero";
import { MetricCard } from "./MetricCard";
import { SetupChecklist } from "./SetupChecklist";
import { AchievementSection } from "./AchievementSection";
import { FolderOpen, TrendingUp, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <div className="ml-64 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your development overview.</p>
          </div>
          <Button className="gradient-purple border-0 hover:opacity-90">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
        
        {/* Welcome Hero */}
        <div className="mb-8">
          <WelcomeHero />
        </div>
        
        {/* Metrics */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <MetricCard
            title="Projects Imported"
            value="3"
            gradient="green"
            icon={<FolderOpen className="h-8 w-8" />}
          />
          <MetricCard
            title="Daily Progress"
            value="50%"
            gradient="blue"
            icon={<TrendingUp className="h-8 w-8" />}
          />
          <MetricCard
            title="Total Issues"
            value="08"
            gradient="pink"
            icon={<AlertCircle className="h-8 w-8" />}
          />
        </div>
        
        {/* Two Column Layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Setup Checklist */}
          <div>
            <SetupChecklist />
          </div>
          
          {/* Achievement Section */}
          <div>
            <AchievementSection />
          </div>
        </div>
      </div>
    </div>
  );
};