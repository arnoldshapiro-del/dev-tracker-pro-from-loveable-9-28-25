import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Users, Calendar, Activity, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ModeConfig {
  id: 'devtracker' | 'reminderpro';
  name: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
}

const modes: ModeConfig[] = [
  {
    id: 'devtracker',
    name: 'DevTracker Pro',
    tagline: 'AI Development Manager',
    description: 'Advanced project tracking, budget management, and cross-platform comparison for AI development projects.',
    icon: <Brain className="h-5 w-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'reminderpro',
    name: 'ReminderPro',
    tagline: 'Healthcare Provider',
    description: 'Comprehensive patient reminder system with smart scheduling and healthcare management tools.',
    icon: <Heart className="h-5 w-5" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  }
];

interface ModeSwitcherProps {
  currentMode: 'devtracker' | 'reminderpro';
  onModeChange: (mode: 'devtracker' | 'reminderpro') => void;
  compact?: boolean;
}

export const ModeSwitcher = ({ currentMode, onModeChange, compact = false }: ModeSwitcherProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleModeSwitch = (newMode: 'devtracker' | 'reminderpro') => {
    if (newMode === currentMode) return;

    onModeChange(newMode);
    toast({
      title: `Switched to ${modes.find(m => m.id === newMode)?.name}`,
      description: `You are now in ${modes.find(m => m.id === newMode)?.tagline} mode.`,
    });
    setIsExpanded(false);
  };

  const currentModeConfig = modes.find(m => m.id === currentMode);
  const otherMode = modes.find(m => m.id !== currentMode);

  if (compact) {
    return (
      <div className="relative">
        <Button 
          variant="outline" 
          className={`w-full text-left justify-start ${currentModeConfig?.bgColor} hover:opacity-80 ${currentModeConfig?.borderColor} ${currentModeConfig?.color}`}
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="w-2 h-2 rounded-full bg-current mr-3"></div>
          Switch to {otherMode?.name}
          <div className="ml-auto text-xs bg-current/10 text-current px-2 py-1 rounded">
            {otherMode?.tagline}
          </div>
        </Button>

        {isExpanded && (
          <Card className="absolute bottom-full left-0 right-0 mb-2 z-50">
            <CardContent className="p-3">
              <div className="space-y-2">
                {modes.map((mode) => (
                  <Button
                    key={mode.id}
                    variant={mode.id === currentMode ? "default" : "ghost"}
                    className={`w-full justify-start ${mode.id === currentMode ? mode.bgColor : ''}`}
                    onClick={() => handleModeSwitch(mode.id)}
                  >
                    {mode.icon}
                    <div className="ml-2 text-left">
                      <div className="font-medium">{mode.name}</div>
                      <div className="text-xs opacity-70">{mode.tagline}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {modes.map((mode) => (
        <Card 
          key={mode.id}
          className={`cursor-pointer transition-all duration-200 ${
            mode.id === currentMode 
              ? `${mode.bgColor} ${mode.borderColor} border-2` 
              : 'hover:shadow-md border border-gray-200'
          }`}
          onClick={() => handleModeSwitch(mode.id)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${mode.bgColor} ${mode.color}`}>
                {mode.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-sm ${mode.id === currentMode ? mode.color : 'text-gray-900'}`}>
                  {mode.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2">{mode.tagline}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{mode.description}</p>
                
                {mode.id === currentMode && (
                  <div className="mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${mode.bgColor} ${mode.color} font-medium`}>
                      Current Mode
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export const ModeIndicator = ({ mode }: { mode: 'devtracker' | 'reminderpro' }) => {
  const modeConfig = modes.find(m => m.id === mode);
  
  if (!modeConfig) return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${modeConfig.bgColor} ${modeConfig.color} text-sm font-medium`}>
      {modeConfig.icon}
      <span>{modeConfig.name}</span>
    </div>
  );
};