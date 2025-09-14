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

// User Manual Data Structure
interface UserManualPage {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

const userManualCategories = [
  { id: "all-topics", title: "All Topics", icon: <BookOpen className="h-5 w-5" /> },
  { id: "getting-started", title: "Getting Started", icon: <Rocket className="h-5 w-5" /> },
  { id: "interface-guide", title: "Interface Guide", icon: <Monitor className="h-5 w-5" /> },
  { id: "project-management", title: "Project Management", icon: <Target className="h-5 w-5" /> },
  { id: "platform-tracking", title: "Platform Tracking", icon: <BarChart3 className="h-5 w-5" /> },
  { id: "budget-tracking", title: "Budget Tracking", icon: <Zap className="h-5 w-5" /> },
  { id: "advanced-features", title: "Advanced Features", icon: <Sparkles className="h-5 w-5" /> },
  { id: "troubleshooting", title: "Troubleshooting", icon: <HelpCircle className="h-5 w-5" /> }
];

const userManualPages: UserManualPage[] = [
  {
    id: "getting-started-guide",
    title: "Getting Started with DevTracker Pro",
    description: "Complete setup guide for new users",
    category: "getting-started",
    content: `Welcome to DevTracker Pro!

DevTracker Pro is your comprehensive AI development project management platform. This guide will help you get up and running in minutes.

Step 1: Understanding DevTracker Pro
DevTracker Pro helps you manage AI development projects across multiple platforms including:
• Mocha: AI-powered app development platform
• GitHub: Code repository management
• Netlify: Web app deployment
• Vercel: Alternative deployment platform
• Twilio: Communication services
• Custom Platforms: Track any other services you use

Step 2: Create Your First Project
Navigate to the Projects section
Click "Add Project" or the + button
Fill in your project name and description
Select your AI platform (Mocha, Lovable, Bolt, etc.)
Add any URLs you already have
Set your initial credit budget
Save your project

Step 3: Track Your Development Progress
Update completion percentage as you work
Add URLs when you publish or deploy
Track credits used on each platform
Use the version tracking to log major milestones

Step 4: Organize Your Workflow
Use drag and drop to reorder projects by priority
Click platform icons to quickly edit projects
Use quick link dropdowns for fast navigation
Monitor your budget and time tracking`
  },
  {
    id: "drag-drop-guide",
    title: "How to Drag and Drop Projects",
    description: "Complete guide to reordering your projects",
    category: "interface-guide",
    content: `Drag and Drop Guide

DevTracker Pro lets you reorder your projects on both the Dashboard and Projects pages using drag and drop. Here's exactly how to do it:

🎯 How to Drag and Drop

1. Find the Drag Handle: Look for the drag handle (⊞ icon) with "Drag to reorder" text on each project card
2. Click and Hold the Drag Handle: Click the drag handle (not the whole card) and hold down your mouse button
3. Drag to New Position: While holding, move your mouse to where you want the project
4. Release to Drop: Let go of the mouse button to place the project in its new position

🌟 Visual Feedback
When you drag a project, you'll see:
• Rotation & Scaling: The project card will tilt and grow slightly
• Shadow Effect: A larger shadow appears around the card
• Purple Border: The card gets a purple border while dragging
• Cursor Change: Your cursor becomes a "grabbing hand"

💡 Pro Tips
• Persistent Order: Your custom order is automatically saved and synced
• Perfect Sync: Reordering on Dashboard perfectly syncs with Projects page and vice versa
• Clear Drag Handles: Look for the purple drag handle (⊞) with "Drag to reorder" text
• Mobile Friendly: Also works on touch screens (touch and drag the handle)
• Favorites First: Put your most important projects at the top

🛠️ Troubleshooting

If drag and drop isn't working:
• Make sure you're clicking the purple drag handle (⊞), not other parts of the card
• Look for "Drag to reorder" text next to the handle
• Try refreshing the page if you're experiencing issues
• Ensure you're holding down the mouse button while dragging
• Check that you have projects to reorder (need at least 2)
• The drag handle is located at the top-left of each project card

📱 Touch Devices
On tablets and phones:
• Touch and hold on a project card
• Drag your finger to the new position
• Lift your finger to drop`
  },
  {
    id: "project-management-guide",
    title: "Project Management",
    description: "How to create, edit, and organize your AI projects",
    category: "project-management",
    content: `Project Management Guide

Learn how to effectively manage your AI development projects in DevTracker Pro.

Creating New Projects
Project Name: Give your project a clear, descriptive name
Description: Add details about what your app does
AI Platform: Choose from Mocha, Lovable, Bolt, Cursor, Claude, or add custom
Project Type: Web app, mobile app, SaaS tool, medical app, etc.
URLs: Add platform URLs as you create them
Budget: Set initial credit budget for tracking

Editing Projects
There are multiple ways to edit your projects:
Click Platform Icon: Click the colored icon on any project card
Quick Actions: Use the 3-dot menu for quick access
Projects Page: Full editing capabilities with version tracking

Project Status Tracking
Planning: Initial concept and design phase
Development: Actively building features
Testing: Bug fixing and quality assurance
Deployed: Live and accessible to users
Maintenance: Updates and ongoing support
Abandoned: Discontinued projects

Version Tracking
Track your project across multiple platforms:
Development URLs: Where you're actively working
Published URLs: Live, deployed versions
Timestamps: When each version was last updated
Version Numbers: Track major releases

Quick Links
Each project has quick access buttons for:
Open Live Site: View your deployed application
GitHub Repository: Access your source code
Development Console: Platform-specific development environment
Custom Platforms: Any additional tools you use`
  },
  {
    id: "platform-ratings-guide",
    title: "Platform Ratings & Reviews",
    description: "Rate and review AI platforms based on your experience",
    category: "platform-tracking",
    content: `Platform Ratings & Reviews

DevTracker Pro includes a comprehensive platform rating system to help you track which AI platforms work best for your projects.

🌟 How to Rate Platforms
Go to Projects Page: Navigate to the Projects section
Click Platform Ratings Tab: Select the "Platform Ratings" tab
Click "Rate Platforms": Press the button to show the rating interface
Rate Each Platform: Click stars (1-5) for each AI platform you've used
Automatic Save: Ratings are saved automatically to your browser

📊 Available Platforms to Rate
• Mocha: AI-powered app development platform
• Lovable: Visual AI development tool
• Bolt: Fast AI coding assistant
• Emergent: Advanced AI development
• GenSpark: AI code generation platform
• Google Opal: Google's AI development suite
• Google Gemini: Google's advanced AI model
• ChatGPT 5: OpenAI's latest model
• Cursor: AI-powered code editor
• Claude: Anthropic's AI assistant
• Replit: Cloud development platform
• Abacus AI: Automated AI platform
• Manus: AI development assistant
• Minimax: AI gaming platform

⭐ Rating Guidelines
1 Star: Poor experience, wouldn't recommend
2 Stars: Below average, has significant issues
3 Stars: Average, gets the job done
4 Stars: Good experience, would recommend
5 Stars: Excellent, outstanding platform

📈 Using Your Ratings
Track Performance: See which platforms work best for you
Make Decisions: Choose platforms based on your experience
Compare Options: Visual comparison of all rated platforms
Personal Reference: Remember which platforms to use for future projects

💡 Pro Tip: Rate platforms after completing a project for the most accurate assessment. Your ratings help you make better platform choices for future projects!`
  },
  {
    id: "smart-credits-guide",
    title: "Smart Credits Tracking System",
    description: "Automatic session-based credit tracking with daily and cumulative totals",
    category: "budget-tracking",
    content: `Smart Credits Tracking System

The Smart Credits Tracker automatically monitors your credit usage across all AI platforms with session-based tracking and comprehensive analytics.

🎯 How It Works
Start Session: Click the + button and select your project
Enter Current Credits: Tell the system how many credits you have right now
Work on Your Project: Use your AI platform normally
End Session: Enter your remaining credits and optional notes
Auto-Calculate: System calculates credits used automatically

📊 What It Tracks
Session-Based Usage: Track credits used in each work session
Daily Totals: See how many credits you use per day
Cumulative Totals: Running total of all credits used
Project Totals: Total credits used per project
Platform Analytics: Usage patterns across different AI platforms
Time Tracking: When you worked and for how long
Session Notes: Remember what you accomplished

⚡ Smart Features
Automatic Calculation: Just enter credits remaining, usage is calculated
Session History: See your last 5 sessions at a glance
Daily Summaries: Weekly overview of your daily usage
Project Insights: Which projects consume the most credits
Minimized View: Inconspicuous sidebar widget
Data Persistence: All your data is saved locally

📋 Usage Example
Start Session: "Working on Medical App with Mocha, I have 850 credits"
Work Time: Build features, fix bugs, add functionality
End Session: "Now I have 720 credits, added user authentication"
Result: System records 130 credits used for authentication feature

🎁 Benefits
Budget Control: Know exactly where your credits go
Efficiency Tracking: See which features are most expensive
Project Planning: Estimate costs for future projects
Platform Comparison: Compare credit efficiency across platforms
Historical Data: Build a database of your development costs

📍 Location & Access
Find the Smart Credits Tracker in:
Projects Page: "Smart Credits" tab for full interface
Sidebar: Minimized widget on every page
Dashboard: Quick overview in project cards`
  },
  {
    id: "github-netlify-deployment",
    title: "Automatic GitHub & Netlify Deployment",
    description: "One-click deployment system with automatic GitHub repository creation and Netlify hosting",
    category: "advanced-features",
    content: `Automatic GitHub & Netlify Deployment

Deploy your projects to GitHub and Netlify with a single click. The system handles repository creation, file uploads, and hosting configuration automatically.

🚀 Deployment Process
Select Project: Choose which project to deploy
Configure Settings: Set repository name and site name
One-Click Deploy: System handles everything automatically
Live in Minutes: Your app is online and accessible

🌟 What Happens Automatically

✅ Prepare Files: Gathers all necessary project files
✅ Create GitHub Repo: Sets up version control repository  
✅ Upload Code: Pushes all files to GitHub
✅ Connect Netlify: Links repository to hosting
✅ Deploy App: Builds and publishes your application
✅ Configure Sync: Sets up automatic updates
✅ Verify Live: Tests that everything works

⚙️ Configuration Options
GitHub Repository Name: Custom name for your repo
Netlify Site Name: Your site's URL subdomain
Custom Domain: Use your own domain (optional)
Auto-Sync: Keep GitHub and Netlify synchronized
Environment Variables: Include secret configuration

🔄 Auto-Synchronization
Once deployed, any changes you make will automatically sync:
GitHub → Netlify: Code changes trigger new deployments
Real-time Updates: Your live site stays current
Branch Protection: Main branch is protected
Deploy Previews: Test changes before going live

🛠️ Error Handling & Retry
The system is smart about handling failures:
Automatic Retry: Failed steps are retried automatically
Detailed Logging: See exactly what's happening
Error Recovery: System corrects common issues
Manual Override: You can fix issues if needed

📊 Real-Time Progress
Watch your deployment progress in real-time:
Progress Bar: See each step as it completes
Time Estimates: Know how long each step takes
Status Updates: Detailed messages for each phase
Success Confirmation: Links to your live app

⭐ Benefits
Zero Configuration: No technical setup required
Professional Setup: Industry-standard deployment pipeline
Version Control: Full Git history and branch management
SSL Security: Automatic HTTPS certificates
Global CDN: Fast loading worldwide
Continuous Deployment: Updates go live automatically

💎 Perfect For
MVP Launch: Get your minimum viable product online
Client Demos: Share working prototypes instantly
Portfolio Projects: Showcase your work professionally
Team Collaboration: Share code and deployments
Production Apps: Host real applications

💡 Pro Tip: Use meaningful names for your repositories and sites. The system suggests names based on your project, but you can customize them for better organization!`
  },
  {
    id: "smart-budget-tracking",
    title: "Smart Budget Tracking",
    description: "Monitor credits, costs, and project efficiency",
    category: "budget-tracking",
    content: `Smart Budget Tracking

Monitor credits, costs, and project efficiency with comprehensive budget tracking tools designed for AI development workflows.

💰 Budget Management Features
Real-time credit tracking across all AI platforms
Project-specific budget allocation and monitoring
Cost analysis and efficiency metrics
Budget alerts and notifications
Historical spending patterns
ROI calculations for completed projects

📊 Tracking Capabilities
Daily credit usage summaries
Weekly and monthly spending reports
Platform cost comparisons
Project budget vs actual spending
Credit efficiency per feature developed
Time-based cost analysis

🎯 Smart Insights
Identify most cost-effective platforms
Track which project types use more credits
Monitor development velocity vs cost
Budget forecasting for upcoming projects
Cost optimization recommendations
Platform switching suggestions based on budget

⚡ Quick Actions
Set project budgets and credit limits
Track remaining credits in real-time
Monitor burn rate and spending velocity
Generate cost reports for stakeholders
Export budget data for analysis
Set up budget alerts and notifications`
  },
  {
    id: "dashboard-features",
    title: "Dashboard Features & Navigation",
    description: "Master the dashboard interface and features",
    category: "interface-guide", 
    content: `Dashboard Features & Navigation

Master the dashboard interface and features to efficiently manage your AI development projects.

🏠 Dashboard Overview
The dashboard is your central command center for managing all AI development projects with real-time insights and quick access to essential features.

📋 Main Dashboard Elements
Project cards with visual status indicators
Real-time progress tracking and completion percentages
Quick action buttons for common tasks
Platform performance comparison metrics
Recent activity feed and updates
Credit usage monitoring widgets

🎛️ Navigation Features
Sidebar navigation for all major sections
Quick search functionality across projects
Filter and sort options for project organization
Breadcrumb navigation for deep features
Mobile-responsive design for all devices
Keyboard shortcuts for power users

⚡ Quick Actions
Create new projects with one-click setup
Access platform-specific development environments
View live deployments and GitHub repositories
Edit project details and configurations
Track time and credit usage
Export project data and reports

📱 Mobile Experience
Fully responsive design that works on all devices
Touch-friendly interface for tablets and phones
Optimized navigation for smaller screens
All features accessible on mobile
Offline capability for basic operations
Sync across all your devices`
  },
  {
    id: "troubleshooting-guide",
    title: "Troubleshooting Common Issues",
    description: "Solutions to frequently encountered problems",
    category: "troubleshooting",
    content: `Troubleshooting Common Issues

Solutions to frequently encountered problems when using DevTracker Pro for AI development project management.

🔧 Common Issues & Solutions

Project Won't Save
• Check your internet connection
• Refresh the page and try again
• Clear browser cache and cookies
• Make sure all required fields are filled

Drag and Drop Not Working
• Ensure you're clicking the drag handle icon
• Check that you have at least 2 projects to reorder
• Try refreshing the page
• Verify you're not on a mobile device without touch support

Credits Tracking Inaccurate
• Make sure to end sessions properly
• Double-check credit amounts entered
• Clear browser storage and re-enter data
• Check for multiple browser tabs running the tracker

Platform Connections Failing
• Verify your API keys are correct and active
• Check platform status pages for outages
• Ensure your account has sufficient credits
• Try logging out and back in to the platform

Deployment Issues
• Check that all required files are present
• Verify GitHub and Netlify credentials
• Ensure repository names don't conflict
• Check for special characters in project names

⚠️ Getting Additional Help
If you're still experiencing issues:
• Check our comprehensive FAQ section
• Search community forums for similar problems
• Submit a support ticket with detailed information
• Join our Discord community for real-time help
• Schedule a one-on-one support session

🛠️ Browser Compatibility
DevTracker Pro works best with:
• Chrome 90+ (recommended)
• Firefox 88+
• Safari 14+
• Edge 90+

For best performance, enable JavaScript and allow local storage.`
  },
  {
    id: "project-export-import",
    title: "Project Export & Import System", 
    description: "Export ALL projects for GitHub/Netlify deployment and import from other sources",
    category: "advanced-features",
    content: `Project Export & Import System

Export ALL projects for GitHub/Netlify deployment and import from other sources to streamline your development workflow.

📤 Export Features
Export all projects simultaneously to GitHub and Netlify
Batch deployment with automatic repository creation
Mass project backup and synchronization
Bulk export to CSV or JSON formats
Complete project data including metrics and history
Archive projects for long-term storage

📥 Import Capabilities  
Import projects from other project management tools
Bulk import from CSV or Excel files
Migration from other AI development platforms
Import GitHub repositories as new projects
Batch create projects from template lists
Restore from previous backups

🔄 Migration Tools
Platform-to-platform project migration
Bulk update project information
Mass deployment to hosting services
Automated backup scheduling
Cross-platform project synchronization
Data format conversion tools

⚡ Bulk Operations
Select multiple projects for batch operations
Apply updates to multiple projects simultaneously
Mass deployment and publishing
Bulk status changes and updates
Group project organization and categorization
Batch credit budget allocation

🛠️ Advanced Features
Custom export templates and formats
Automated scheduling for regular exports
Integration with CI/CD pipelines
API access for programmatic operations
Custom import mapping and transformations
Webhook integration for real-time syncing`
  },
  {
    id: "step-by-step-guide",
    title: "Simple Step-by-Step Guide: What Actually Works",
    description: "Easy steps guide to Smart Credits system and deployment reality check",
    category: "getting-started",
    content: `Simple Step-by-Step Guide: What Actually Works

Easy steps guide to Smart Credits system and deployment reality check - the practical approach to AI development project management.

✅ What Actually Works in Practice

Smart Credits Tracking
1. Start a session before beginning work
2. Enter your current credit count accurately  
3. Work normally on your AI platform
4. End session with remaining credits
5. Add notes about what you accomplished
6. Review weekly summaries for insights

Project Organization
1. Use descriptive project names
2. Set realistic budgets and timelines
3. Track progress with percentage completion
4. Update URLs when you deploy or publish
5. Use drag-and-drop to prioritize projects
6. Archive completed or abandoned projects

Platform Selection
1. Try different AI platforms for different project types
2. Rate platforms after completing projects
3. Use ratings to guide future platform choices
4. Track which platforms work best for your style
5. Consider cost vs. speed vs. quality trade-offs
6. Document lessons learned for each platform

Deployment Strategy
1. Start with simple projects to test deployment
2. Use meaningful names for repositories and sites
3. Test the automatic GitHub/Netlify deployment
4. Keep backup copies of important projects
5. Document your deployment settings
6. Monitor live sites for issues

💡 Reality Check
What works consistently:
• Credit tracking for budget management
• Project organization and prioritization
• Platform comparison over time
• Simple deployment workflows
• Regular project reviews and updates

What requires patience:
• Learning each AI platform's strengths
• Optimizing credit usage over time
• Building efficient development workflows
• Mastering deployment configurations
• Establishing reliable project routines`
  },
  {
    id: "built-vs-manual",
    title: "What I Built vs Manual Steps - Complete Truth",
    description: "Honest breakdown of what automation works vs what you still do manually",
    category: "advanced-features",
    content: `What I Built vs Manual Steps - Complete Truth

Honest breakdown of what automation works vs what you still do manually in DevTracker Pro.

🤖 What's Fully Automated

Credit Calculation
• Automatically calculates credits used when you enter remaining amount
• Stores session history and generates summaries
• Creates daily and weekly usage reports
• Tracks cumulative totals across all projects

Project Organization
• Drag-and-drop reordering with persistent state
• Automatic syncing between dashboard and projects page
• Real-time updates across all views
• Local storage backup of all project data

Deployment Pipeline
• GitHub repository creation with proper naming
• Code upload and version control setup
• Netlify hosting configuration and SSL
• Automatic linking between GitHub and Netlify
• Live site verification and status checking

👤 What You Still Do Manually

Platform Development
• Actually building your app on the AI platform
• Writing prompts and iterating on designs
• Testing features and fixing bugs
• Making design and functionality decisions
• Managing your AI platform accounts and credits

Project Management
• Creating project entries and descriptions
• Updating completion percentages as you progress
• Adding URLs when you deploy or publish
• Setting budgets and tracking goals
• Deciding when projects are complete

Quality Control
• Testing deployed applications
• Verifying functionality works correctly
• Monitoring site performance and uptime
• Handling custom domain setup if needed
• Managing environment variables and secrets

🎯 The Honest Reality

DevTracker Pro automates the tedious tracking and deployment parts, but you're still the developer. It handles:
• Organizing your projects efficiently
• Tracking your spending automatically
• Deploying completed projects quickly
• Monitoring your development patterns

You still handle all the creative and technical development work - DevTracker Pro just makes the management parts seamless.

💡 Best Use Cases
Perfect for developers who want to:
• Track multiple AI projects efficiently
• Monitor credit usage across platforms
• Deploy quickly without configuration hassle
• Maintain organized project portfolios
• Analyze their development patterns over time

Not a replacement for:
• Learning AI development platforms
• Writing code or creating designs
• Project planning and architecture
• Technical debugging and problem-solving
• Understanding your target market and users`
  },
  {
    id: "power-user-tips",
    title: "Advanced Features & Power User Tips",
    description: "Master advanced workflows and hidden features",
    category: "advanced-features",
    content: `Advanced Features & Power User Tips

Master advanced workflows and hidden features to maximize your productivity with DevTracker Pro.

🚀 Power User Workflows

Multi-Platform Development
• Use different platforms for different project phases
• Start with rapid prototyping platforms, finish with quality-focused ones
• Track which platform combinations work best for different project types
• Maintain parallel development on multiple platforms for comparison

Advanced Project Organization
• Use strategic naming conventions for better sorting
• Create project templates for common project types
• Develop personal workflows for different development stages
• Use completion percentages to track project pipeline

Expert Credit Management
• Set up budget alerts for critical projects
• Track credit efficiency across different project types
• Use session notes to document expensive operations
• Analyze spending patterns to optimize platform usage

⚡ Hidden Features & Shortcuts

Keyboard Navigation
• Use Tab to navigate between form fields quickly
• Enter to submit forms and save changes
• Escape to cancel edit modes
• Arrow keys for navigating project lists

Advanced Filtering
• Combine multiple filters for precise project views
• Use search operators for complex queries
• Create saved filter combinations for recurring views
• Export filtered project lists for reporting

Bulk Operations
• Select multiple projects for batch updates
• Mass export projects for backup or migration
• Bulk status changes for project organization
• Group operations for team project management

🔧 Customization Options

Interface Personalization
• Customize dashboard layout for your workflow
• Adjust project card information display
• Configure notification preferences
• Set up custom project status categories

Data Management
• Export project data in multiple formats
• Create custom reporting templates
• Set up automated backup schedules
• Configure data retention policies

Integration Workflows
• Connect with external project management tools
• Set up webhook notifications for project events
• Create custom API integrations for team workflows
• Automate recurring project creation tasks

💎 Pro Tips for Maximum Efficiency

Development Workflow Optimization
• Establish consistent project naming conventions
• Create templates for common project configurations
• Use tags and categories for advanced project organization
• Develop personal checklists for project completion

Team Collaboration
• Share project templates across team members
• Establish team conventions for project tracking
• Use export features for stakeholder reporting
• Create team dashboards for project visibility

Performance Monitoring
• Track platform performance over time
• Monitor deployment success rates
• Analyze development velocity trends
• Optimize credit usage based on historical data

🎯 Advanced Use Cases

Portfolio Management
• Track multiple client projects simultaneously
• Generate professional project reports
• Maintain project history for case studies
• Create project showcases for business development

Business Intelligence
• Analyze development costs across project types
• Track ROI for different platform investments
• Monitor team productivity and efficiency
• Generate insights for business planning

Scale Operations
• Manage dozens of projects efficiently
• Automate repetitive project management tasks
• Create standardized workflows for consistency
• Monitor and optimize development processes`
  }
];

export const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("getting-started");
  const [activeUserManualTab, setActiveUserManualTab] = useState("user-manual");
  const [activeUserManualCategory, setActiveUserManualCategory] = useState("all-topics");
  const [activeUserManualPage, setActiveUserManualPage] = useState<string | null>(null);

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
          Complete user manual and troubleshooting guide for mastering your AI development workflow
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

      {/* Quick Start Guide Section */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Rocket className="h-6 w-6 text-red-500" />
          Quick Start Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-green-200"
            onClick={() => {
              setActiveUserManualTab("user-manual");
              setActiveUserManualPage("getting-started-guide");
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
              <p className="text-sm text-muted-foreground">Complete setup guide to get up and running in minutes</p>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-purple-200"
            onClick={() => {
              setActiveUserManualTab("user-manual");
              setActiveUserManualPage("drag-drop-guide");
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <ArrowRight className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Drag & Drop Guide</h3>
              <p className="text-sm text-muted-foreground">Learn how to reorder your projects with drag and drop</p>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all hover:scale-105 border-2 border-transparent hover:border-red-200"
            onClick={() => {
              setActiveUserManualTab("user-manual");
              setActiveUserManualPage("troubleshooting-guide");
            }}
          >
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <Settings className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">Troubleshooting</h3>
              <p className="text-sm text-muted-foreground">Solutions to common problems and issues</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <Tabs value={activeUserManualTab} onValueChange={setActiveUserManualTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
          <TabsTrigger 
            value="help-center"
            className="flex flex-col gap-1 h-auto py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="text-primary"><HelpCircle className="h-5 w-5" /></div>
            <span className="text-xs font-medium text-center leading-tight">Help Center</span>
          </TabsTrigger>
          <TabsTrigger 
            value="user-manual"
            className="flex flex-col gap-1 h-auto py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <div className="text-primary"><BookOpen className="h-5 w-5" /></div>
            <span className="text-xs font-medium text-center leading-tight">User Manual</span>
          </TabsTrigger>
        </TabsList>

        {/* Help Center Content */}
        <TabsContent value="help-center" className="space-y-6">
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

          {/* Original Help Content */}
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
        </TabsContent>

        {/* User Manual Content */}
        <TabsContent value="user-manual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-500" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {userManualCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={activeUserManualCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start gap-2 h-auto py-3"
                      onClick={() => {
                        setActiveUserManualCategory(category.id);
                        setActiveUserManualPage(null);
                      }}
                    >
                      {category.icon}
                      {category.title}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {!activeUserManualPage ? (
                <>
                  {/* All Topics View or Category-filtered pages */}
                  {(activeUserManualCategory === "all-topics" ? userManualPages : userManualPages.filter(page => page.category === activeUserManualCategory)).map((page) => (
                    <Card 
                      key={page.id} 
                      className="mb-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-2 border-transparent hover:border-primary/20"
                      onClick={() => setActiveUserManualPage(page.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3">
                          {page.id === "getting-started-guide" && <Play className="h-6 w-6 text-blue-500" />}
                          {page.id === "drag-drop-guide" && <ArrowRight className="h-6 w-6 text-purple-500" />}
                          {page.id === "project-management-guide" && <Target className="h-6 w-6 text-green-500" />}
                          {page.id === "platform-ratings-guide" && <Star className="h-6 w-6 text-orange-500" />}
                          {page.id === "smart-credits-guide" && <Zap className="h-6 w-6 text-purple-500" />}
                          {page.id === "github-netlify-deployment" && <Rocket className="h-6 w-6 text-blue-500" />}
                          {page.id === "smart-budget-tracking" && <Zap className="h-6 w-6 text-green-500" />}
                          {page.id === "dashboard-features" && <Monitor className="h-6 w-6 text-blue-500" />}
                          {page.id === "troubleshooting-guide" && <Settings className="h-6 w-6 text-red-500" />}
                          {page.id === "project-export-import" && <Download className="h-6 w-6 text-purple-500" />}
                          {page.id === "step-by-step-guide" && <CheckCircle className="h-6 w-6 text-blue-500" />}
                          {page.id === "built-vs-manual" && <Settings className="h-6 w-6 text-orange-500" />}
                          {page.id === "power-user-tips" && <Sparkles className="h-6 w-6 text-purple-500" />}
                          <div>
                            <h3 className="font-semibold text-lg">{page.title}</h3>
                            <p className="text-sm text-muted-foreground">{page.description}</p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground ml-auto" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <>
                  {/* Individual Page View */}
                  {(() => {
                    const page = userManualPages.find(p => p.id === activeUserManualPage);
                    if (!page) return null;
                    
                    return (
                      <Card>
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setActiveUserManualPage(null)}
                              className="gap-2"
                            >
                              <ArrowRight className="h-4 w-4 rotate-180" />
                              Back to All Topics
                            </Button>
                            <div className="flex gap-2 ml-auto">
                              <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Download PDF
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <ArrowRight className="h-4 w-4" />
                                Share
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {page.id === "getting-started-guide" && <Play className="h-8 w-8 text-blue-500" />}
                            {page.id === "drag-drop-guide" && <ArrowRight className="h-8 w-8 text-purple-500" />}
                            {page.id === "project-management-guide" && <Target className="h-8 w-8 text-green-500" />}
                            {page.id === "platform-ratings-guide" && <Star className="h-8 w-8 text-orange-500" />}
                            {page.id === "smart-credits-guide" && <Zap className="h-8 w-8 text-purple-500" />}
                            {page.id === "github-netlify-deployment" && <Rocket className="h-8 w-8 text-blue-500" />}
                            {page.id === "smart-budget-tracking" && <Zap className="h-8 w-8 text-green-500" />}
                            {page.id === "dashboard-features" && <Monitor className="h-8 w-8 text-blue-500" />}
                            {page.id === "troubleshooting-guide" && <Settings className="h-8 w-8 text-red-500" />}
                            {page.id === "project-export-import" && <Download className="h-8 w-8 text-purple-500" />}
                            {page.id === "step-by-step-guide" && <CheckCircle className="h-8 w-8 text-blue-500" />}
                            {page.id === "built-vs-manual" && <Settings className="h-8 w-8 text-orange-500" />}
                            {page.id === "power-user-tips" && <Sparkles className="h-8 w-8 text-purple-500" />}
                            <div>
                              <CardTitle className="text-2xl">{page.title}</CardTitle>
                              <p className="text-muted-foreground">{page.description}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-line text-sm leading-relaxed">
                            {page.content}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

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

      {/* Footer */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Still Need Help?</h3>
          <p className="mb-6 opacity-90">
            Can't find what you're looking for? Our support team is here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="h-4 w-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              <MessageSquare className="h-4 w-4 mr-2" />
              Call Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};