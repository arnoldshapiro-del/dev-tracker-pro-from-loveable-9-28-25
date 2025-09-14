import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WelcomeHero = () => {
  return (
    <div className="relative overflow-hidden rounded-xl gradient-purple p-8 text-white">
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to DevTracker Pro! 🚀
            </h1>
            <p className="text-lg text-white/90 mb-6">
              Let's get you set up in less than 15 minutes
            </p>
            <Button 
              variant="secondary" 
              className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-smooth"
            >
              Get Started
            </Button>
          </div>
          
          <div className="hidden md:block">
            <Rocket className="h-16 w-16 text-white/80" />
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white/10 translate-y-8 -translate-x-8" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-white/5" />
    </div>
  );
};