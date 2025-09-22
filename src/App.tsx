import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "@/components/AppRouter";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="devtracker-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRouter />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
