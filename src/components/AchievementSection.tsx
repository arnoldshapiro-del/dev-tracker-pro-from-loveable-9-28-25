import { Trophy, Target, Zap } from "lucide-react";

export const AchievementSection = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        What You'll Achieve
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <div className="flex items-center gap-3 mb-2">
            <Target className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Track Progress</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Monitor your development workflow and identify bottlenecks
          </p>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card/50">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Boost Productivity</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Automate repetitive tasks and focus on what matters most
          </p>
        </div>
      </div>
    </div>
  );
};