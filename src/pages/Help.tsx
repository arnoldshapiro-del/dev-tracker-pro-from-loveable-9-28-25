import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Search, 
  BookOpen, 
  Rocket, 
  Zap, 
  Users, 
  Settings, 
  HelpCircle,
  Star,
  Play,
  Download,
  Globe,
  Brain,
  BarChart3,
  Shield,
  Code,
  Smartphone,
  Database,
  Puzzle,
  FileText,
  ArrowRight,
  CheckCircle,
  Lightbulb,
  Target,
  Layers,
  Workflow,
  GitBranch,
  Monitor,
  Sparkles,
  MessageSquare
} from "lucide-react";

interface HelpSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  content: HelpContent[];
}

interface HelpContent {
  title: string;
  description: string;
  steps?: string[];
  tips?: string[];
  code?: string;
  features?: string[];
}

const helpSections: HelpSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: <Rocket className="h-5 w-5" />,
    description: "Quick start guide to master DevTracker Pro",
    content: [
      {
        title: "Welcome to DevTracker Pro",
        description: "Your ultimate AI development management platform that revolutionizes how you build, deploy, and manage projects across multiple AI platforms.",
        features: [
          "Multi-platform AI integration (Mocha, Lovable, Bolt, Claude, ChatGPT)",
          "Real-time project analytics and performance tracking",
          "Comprehensive template marketplace with 50+ templates",
          "Advanced deployment automation",
          "Team collaboration and project sharing"
        ]
      },
      {
        title: "Creating Your First Project",
        description: "Start building amazing applications in minutes with our AI-powered project creation system.",
        steps: [
          "Click 'Start New Project' on the dashboard",
          "Fill in project details (name, description, platform)",
          "Select your preferred AI platform (Mocha recommended for best results)",
          "Choose project type (Web App, Mobile, Medical, E-commerce, etc.)",
          "Configure advanced settings (team members, deadlines, budget)",
          "Click 'Create Project' and watch the magic happen!"
        ],
        tips: [
          "Use descriptive project names for better organization",
          "Set realistic deadlines to optimize AI assistance",
          "Choose Mocha for fastest deployment (95% success rate)",
          "Add team members early for better collaboration"
        ]
      },
      {
        title: "Dashboard Overview",
        description: "Your command center for managing all AI development projects with real-time insights.",
        features: [
          "Project progress tracking with visual indicators",
          "Real-time analytics and performance metrics",
          "Quick action cards for common tasks",
          "Platform performance comparison",
          "Credit usage monitoring",
          "Recent activity feed"
        ]
      }
    ]
  },
  {
    id: "ai-platforms",
    title: "AI Platforms",
    icon: <Brain className="h-5 w-5" />,
    description: "Master all supported AI platforms and their unique capabilities",
    content: [
      {
        title: "Platform Comparison Guide",
        description: "Choose the perfect AI platform for your project based on comprehensive performance data.",
        features: [
          "Mocha: 95% success rate, 2.5h avg time - Best for full-stack development",
          "Lovable: 88% success rate, 3.2h avg time - Perfect for UI/UX design",
          "Bolt: 82% success rate, 4.1h avg time - Ideal for rapid prototyping",
          "Claude: 78% success rate, 5.5h avg time - Excellent for code quality",
          "ChatGPT: 72% success rate, 6.8h avg time - Great for learning"
        ]
      },
      {
        title: "Mocha Integration",
        description: "Harness the power of our top-performing AI platform with advanced full-stack capabilities.",
        steps: [
          "Select Mocha as your AI platform",
          "Connect your Mocha account via API integration",
          "Configure project settings and preferences",
          "Enable real-time collaboration features",
          "Set up automated deployment pipelines"
        ],
        tips: [
          "Mocha excels at complex full-stack applications",
          "Use Mocha for projects requiring advanced UI generation",
          "Enable auto-deployment for fastest time-to-market",
          "Perfect for e-commerce and SaaS applications"
        ]
      },
      {
        title: "Multi-Platform Workflows",
        description: "Seamlessly switch between platforms or use multiple platforms for different project phases.",
        steps: [
          "Start with Mocha for rapid MVP development",
          "Switch to Claude for code review and optimization",
          "Use Lovable for UI/UX refinements",
          "Deploy with Bolt for final production setup"
        ]
      }
    ]
  },
  {
    id: "templates",
    title: "Template Marketplace",
    icon: <Layers className="h-5 w-5" />,
    description: "Accelerate development with premium templates and components",
    content: [
      {
        title: "Browse Templates",
        description: "Discover 50+ professionally designed templates across multiple categories.",
        features: [
          "Dashboard Templates - Admin panels, analytics dashboards, CRM systems",
          "Landing Pages - SaaS, marketing, product launches, portfolios",
          "AI/ML Templates - Chat interfaces, data visualization, ML dashboards",
          "Healthcare - Patient management, appointment systems, medical records",
          "E-commerce - Online stores, payment systems, inventory management",
          "Social Apps - Social networks, messaging, community platforms"
        ]
      },
      {
        title: "Template Customization",
        description: "Every template is fully customizable and optimized for your chosen AI platform.",
        steps: [
          "Browse templates by category or search",
          "Preview template features and screenshots",
          "Check platform compatibility",
          "Download or clone template",
          "Customize with your branding and content",
          "Deploy using your preferred AI platform"
        ],
        tips: [
          "Free templates are perfect for learning and prototyping",
          "Premium templates include advanced features and support",
          "All templates are mobile-responsive and SEO-optimized",
          "Use template ratings and reviews to make decisions"
        ]
      },
      {
        title: "Contributing Templates",
        description: "Share your creations with the community and earn from your templates.",
        steps: [
          "Create an amazing template using any AI platform",
          "Document features and installation instructions",
          "Submit for community review",
          "Set pricing (free or premium)",
          "Earn revenue from downloads and usage"
        ]
      }
    ]
  },
  {
    id: "project-management",
    title: "Project Management",
    icon: <Target className="h-5 w-5" />,
    description: "Advanced project organization and collaboration features",
    content: [
      {
        title: "Project Organization",
        description: "Keep your development projects organized with powerful management tools.",
        features: [
          "Drag-and-drop project reordering",
          "Advanced filtering and search",
          "Project status tracking (Planning, Development, Testing, Production)",
          "Progress visualization with real-time updates",
          "Issue tracking and resolution",
          "Technology stack documentation"
        ]
      },
      {
        title: "Team Collaboration",
        description: "Work seamlessly with your team using built-in collaboration features.",
        steps: [
          "Add team members to projects",
          "Set role-based permissions",
          "Share project progress and updates",
          "Collaborate on code reviews",
          "Track individual contributions"
        ],
        tips: [
          "Use @mentions to notify team members",
          "Set up daily standup reminders",
          "Share deployment URLs for easy testing",
          "Use project tags for better organization"
        ]
      },
      {
        title: "Advanced Project Settings",
        description: "Configure every aspect of your project for optimal AI assistance.",
        features: [
          "Environment variables management",
          "Database configuration and URLs",
          "Custom domain setup",
          "SSL certificate management",
          "Backup frequency settings",
          "API keys and integrations"
        ]
      }
    ]
  },
  {
    id: "analytics",
    title: "Analytics & Insights",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Data-driven insights to optimize your development process",
    content: [
      {
        title: "Performance Analytics",
        description: "Track and optimize your development performance with comprehensive analytics.",
        features: [
          "Project completion rates by platform",
          "Average development time analysis",
          "Success rate tracking and optimization",
          "Cost analysis and budget management",
          "Team productivity metrics",
          "Platform comparison insights"
        ]
      },
      {
        title: "Platform Benchmarking",
        description: "Compare AI platform performance to make informed decisions.",
        features: [
          "Real-time success rate monitoring",
          "Cost-per-project analysis",
          "Development speed comparisons",
          "Quality score tracking",
          "User satisfaction ratings",
          "ROI calculations"
        ]
      },
      {
        title: "Custom Reports",
        description: "Generate detailed reports for stakeholders and team reviews.",
        steps: [
          "Navigate to Analytics dashboard",
          "Select reporting period and metrics",
          "Choose platforms and projects to include",
          "Generate comprehensive PDF reports",
          "Schedule automated report delivery"
        ]
      }
    ]
  },
  {
    id: "deployment",
    title: "Deployment & Hosting",
    icon: <Globe className="h-5 w-5" />,
    description: "Seamless deployment across multiple hosting platforms",
    content: [
      {
        title: "Automated Deployment",
        description: "Deploy your applications with zero-configuration automation.",
        features: [
          "One-click deployment to Vercel, Netlify, and AWS",
          "Automatic CI/CD pipeline setup",
          "Environment management (dev, staging, production)",
          "Rollback capabilities for failed deployments",
          "Custom domain configuration",
          "SSL certificate auto-provisioning"
        ]
      },
      {
        title: "Deployment Monitoring",
        description: "Monitor your deployments with real-time status tracking.",
        features: [
          "Build status monitoring",
          "Deployment logs and debugging",
          "Performance monitoring",
          "Uptime tracking (99.9% average)",
          "Error tracking and alerts",
          "Resource usage analytics"
        ]
      },
      {
        title: "Advanced Deployment Options",
        description: "Fine-tune your deployment settings for optimal performance.",
        steps: [
          "Configure build settings and environment variables",
          "Set up custom deployment hooks",
          "Configure caching and CDN settings",
          "Set up monitoring and alerting",
          "Configure backup and disaster recovery"
        ]
      }
    ]
  },
  {
    id: "security",
    title: "Security & Privacy",
    icon: <Shield className="h-5 w-5" />,
    description: "Enterprise-grade security for your projects and data",
    content: [
      {
        title: "Data Protection",
        description: "Your code and data are protected with enterprise-grade security measures.",
        features: [
          "End-to-end encryption for all data",
          "SOC 2 Type II compliance",
          "GDPR and CCPA compliance",
          "Regular security audits and penetration testing",
          "Zero-knowledge architecture",
          "Secure API key management"
        ]
      },
      {
        title: "Access Control",
        description: "Manage team access with granular permission controls.",
        features: [
          "Role-based access control (RBAC)",
          "Two-factor authentication (2FA)",
          "Single sign-on (SSO) integration",
          "IP whitelisting and restrictions",
          "Session management and timeouts",
          "Audit logs for all activities"
        ]
      },
      {
        title: "Compliance & Certifications",
        description: "Built to meet the highest security and compliance standards.",
        features: [
          "SOC 2 Type II certified",
          "ISO 27001 compliance",
          "HIPAA compliance for healthcare projects",
          "PCI DSS for payment processing",
          "Regular third-party security assessments",
          "Data residency options"
        ]
      }
    ]
  },
  {
    id: "integrations",
    title: "Integrations",
    icon: <Puzzle className="h-5 w-5" />,
    description: "Connect with your favorite tools and services",
    content: [
      {
        title: "Development Tools",
        description: "Seamlessly integrate with your existing development workflow.",
        features: [
          "GitHub/GitLab integration for version control",
          "Slack/Discord for team notifications",
          "Jira/Linear for issue tracking",
          "Figma for design collaboration",
          "VS Code extension for direct editing",
          "Docker for containerized deployments"
        ]
      },
      {
        title: "AI Platform APIs",
        description: "Direct integration with all major AI development platforms.",
        features: [
          "Native Mocha API integration",
          "Lovable platform connectivity",
          "Bolt rapid prototyping tools",
          "Claude code analysis integration",
          "ChatGPT natural language processing",
          "Custom AI platform adapters"
        ]
      },
      {
        title: "Third-Party Services",
        description: "Connect with essential business and development services.",
        features: [
          "Payment processing (Stripe, PayPal)",
          "Analytics (Google Analytics, Mixpanel)",
          "Email services (SendGrid, Mailchimp)",
          "Database services (MongoDB, PostgreSQL)",
          "Authentication (Auth0, Firebase)",
          "Monitoring (Sentry, DataDog)"
        ]
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    icon: <HelpCircle className="h-5 w-5" />,
    description: "Quick solutions to common issues and problems",
    content: [
      {
        title: "Common Issues",
        description: "Quick fixes for the most common problems encountered.",
        steps: [
          "Project won't deploy? Check your environment variables and API keys",
          "AI platform timeout? Try switching to a less busy platform",
          "Build errors? Review your code for syntax errors and dependencies",
          "Slow performance? Optimize your project settings and resources",
          "Team access issues? Check permissions and invite settings"
        ]
      },
      {
        title: "Platform-Specific Issues",
        description: "Troubleshooting tips for each AI platform.",
        tips: [
          "Mocha: Ensure your API key is valid and has sufficient credits",
          "Lovable: Check component library compatibility",
          "Bolt: Verify template requirements and dependencies",
          "Claude: Review code complexity and size limits",
          "ChatGPT: Ensure prompts are clear and well-structured"
        ]
      },
      {
        title: "Getting Help",
        description: "When you need additional support, we're here to help.",
        steps: [
          "Check our comprehensive FAQ section",
          "Search the community forums for similar issues",
          "Submit a support ticket with detailed information",
          "Join our Discord community for real-time help",
          "Schedule a one-on-one support session"
        ]
      }
    ]
  }
];

export const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("getting-started");

  // Filter content based on search
  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(content =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      content.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const quickLinks = [
    { title: "Create Your First Project", icon: <Rocket className="h-4 w-4" />, tab: "getting-started" },
    { title: "Choose AI Platform", icon: <Brain className="h-4 w-4" />, tab: "ai-platforms" },
    { title: "Browse Templates", icon: <Layers className="h-4 w-4" />, tab: "templates" },
    { title: "Deploy Your App", icon: <Globe className="h-4 w-4" />, tab: "deployment" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DevTracker Pro Help Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive guide to mastering AI-powered development. From first project to enterprise deployment.
        </p>
        
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search help topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white border-2 border-blue-100 focus:border-blue-300"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Card 
            key={link.title}
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-primary/20"
            onClick={() => setActiveTab(link.tab)}
          >
            <CardContent className="p-4 text-center">
              <div className="flex justify-center mb-2 text-primary">
                {link.icon}
              </div>
              <h3 className="font-semibold text-sm">{link.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-1 bg-muted/50">
          {helpSections.map((section) => (
            <TabsTrigger 
              key={section.id} 
              value={section.id}
              className="flex flex-col gap-1 h-auto py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <div className="text-primary">{section.icon}</div>
              <span className="text-xs font-medium text-center leading-tight">
                {section.title}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {filteredSections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="space-y-6">
            {/* Section Header */}
            <div className="text-center space-y-2">
              <div className="flex justify-center text-primary mb-2">
                {section.icon}
              </div>
              <h2 className="text-3xl font-bold">{section.title}</h2>
              <p className="text-lg text-muted-foreground">{section.description}</p>
            </div>

            {/* Section Content */}
            <div className="space-y-6">
              {section.content.map((content, index) => (
                <Card key={index} className="overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      {content.title}
                    </CardTitle>
                    <p className="text-muted-foreground">{content.description}</p>
                  </CardHeader>
                  
                  <CardContent className="p-6 space-y-6">
                    {/* Features */}
                    {content.features && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Star className="h-4 w-4 text-yellow-500" />
                          Key Features
                        </h4>
                        <div className="grid gap-2">
                          {content.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-green-50">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Steps */}
                    {content.steps && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Play className="h-4 w-4 text-blue-500" />
                          Step-by-Step Guide
                        </h4>
                        <div className="space-y-3">
                          {content.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50">
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-sm">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {content.tips && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-orange-500" />
                          Pro Tips
                        </h4>
                        <div className="space-y-2">
                          {content.tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-orange-50">
                              <Lightbulb className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{tip}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Code Examples */}
                    {content.code && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Code className="h-4 w-4 text-purple-500" />
                          Code Example
                        </h4>
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                          <code>{content.code}</code>
                        </pre>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* No Results */}
      {searchTerm && filteredSections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">No results found</h3>
          <p className="text-muted-foreground">
            Try different keywords or browse our help categories above
          </p>
        </div>
      )}

      {/* Footer */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Still Need Help?</h3>
          <p className="mb-6 opacity-90">
            Our support team is here to help you succeed with DevTracker Pro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <Users className="h-4 w-4 mr-2" />
              Join Community
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <FileText className="h-4 w-4 mr-2" />
              API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};