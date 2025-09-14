import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  gradient: "purple" | "green" | "blue" | "pink";
  className?: string;
}

export const MetricCard = ({ title, value, icon, gradient, className }: MetricCardProps) => {
  const gradientClasses = {
    purple: "gradient-purple",
    green: "gradient-green", 
    blue: "gradient-blue",
    pink: "gradient-pink"
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