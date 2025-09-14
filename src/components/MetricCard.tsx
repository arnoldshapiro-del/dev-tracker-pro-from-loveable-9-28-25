import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  gradient: "coral" | "mint" | "sunset" | "ocean" | "forest" | "lavender" | "gold" | "ruby" | "sky" | "peach" | "emerald" | "plum" | "bronze" | "electric";
  className?: string;
}

export const MetricCard = ({ title, value, icon, gradient, className }: MetricCardProps) => {
  const gradientClasses = {
    coral: "gradient-coral",
    mint: "gradient-mint",
    sunset: "gradient-sunset", 
    ocean: "gradient-ocean",
    forest: "gradient-forest",
    lavender: "gradient-lavender",
    gold: "gradient-gold",
    ruby: "gradient-ruby",
    sky: "gradient-sky",
    peach: "gradient-peach",
    emerald: "gradient-emerald",
    plum: "gradient-plum",
    bronze: "gradient-bronze",
    electric: "gradient-electric"
  };

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-6 text-white card-shadow transition-smooth hover:scale-105",
      gradientClasses[gradient],
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        {icon && (
          <div className="opacity-80">
            {icon}
          </div>
        )}
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white/10" />
      <div className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full bg-white/10" />
    </div>
  );
};