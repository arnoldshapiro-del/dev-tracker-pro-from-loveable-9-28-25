import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  gradient: "coral" | "mint" | "sunset" | "ocean" | "forest" | "lavender" | "gold" | "ruby" | "sky" | "peach" | "emerald" | "plum" | "bronze" | "electric";
  className?: string;
}

export const MetricCard = ({ title, value, icon, gradient, className }: MetricCardProps) => {
  const chipClasses = {
    coral: "chip-red",
    mint: "chip-green",
    sunset: "chip-amber", 
    ocean: "chip-blue",
    forest: "chip-green",
    lavender: "chip-blue",
    gold: "chip-amber",
    ruby: "chip-red",
    sky: "chip-blue",
    peach: "chip-amber",
    emerald: "chip-green",
    plum: "chip-blue",
    bronze: "chip-amber",
    electric: "chip-blue"
  };

  const iconColors = {
    coral: "text-red-600",
    mint: "text-green-600",
    sunset: "text-amber-600", 
    ocean: "text-blue-600",
    forest: "text-green-600",
    lavender: "text-blue-600",
    gold: "text-amber-600",
    ruby: "text-red-600",
    sky: "text-blue-600",
    peach: "text-amber-600",
    emerald: "text-green-600",
    plum: "text-blue-600",
    bronze: "text-amber-600",
    electric: "text-blue-600"
  };

  return (
    <div className={cn(
      "white-card relative p-6 transition-smooth hover:scale-105",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
        {icon && (
          <div className={cn("p-3 rounded-lg bg-opacity-10", iconColors[gradient].replace('text-', 'bg-').replace('-600', '-500/10'))}>
            <div className={cn("h-6 w-6", iconColors[gradient])}>
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};