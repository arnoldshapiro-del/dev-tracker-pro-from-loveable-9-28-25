import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, Book, MessageCircle, Video, FileText, ExternalLink } from "lucide-react";

export const Help = () => {
  const faqs = [
    {
      question: "How do I create a new project?",
      answer: "You can create a new project by clicking the 'New Project' button on the Dashboard or Projects page. Fill in the project details including name, description, and initial settings."
    },
    {
      question: "How do I connect my GitHub repository?",
      answer: "Go to the Integrations page and click on the GitHub integration. Follow the authentication flow to connect your account and select which repositories to sync."
    },
    {
      question: "Can I invite team members to my projects?",
      answer: "Yes! Go to the Team page and click 'Invite Member'. Enter their email address and select their role. They'll receive an invitation to join your workspace."
    },
    {
      question: "How do I set up automated deployments?",
      answer: "Visit the Deployment page and create a new deployment configuration. Connect your repository and select your preferred hosting platform to enable automatic deployments."
    },
    {
      question: "What analytics are available?",
      answer: "DevTracker Pro provides comprehensive analytics including project progress, team productivity, code quality metrics, and deployment statistics. Check the Analytics page for detailed insights."
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "Complete walkthrough for new users",
      icon: Book,
      type: "Documentation",
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video guides",
      icon: Video,
      type: "Video",
      link: "#"
    },
    {
      title: "API Documentation",
      description: "Technical reference for developers",
      icon: FileText,
      type: "Documentation",
      link: "#"
    },
    {
      title: "Community Forum",
      description: "Ask questions and share knowledge",
      icon: MessageCircle,
      type: "Community",
      link: "#"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <HelpCircle className="h-8 w-8 text-primary" />
          Help & Support
        </h1>
        <p className="text-muted-foreground">Find answers and get support</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help articles, guides, and FAQs..."
              className="pl-10 text-lg h-12"
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Button variant="outline" className="h-20 flex flex-col gap-2">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">Contact Support</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2">
          <Video className="h-5 w-5" />
          <span className="text-sm">Watch Tutorials</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2">
          <Book className="h-5 w-5" />
          <span className="text-sm">Read Docs</span>
        </Button>
        <Button variant="outline" className="h-20 flex flex-col gap-2">
          <ExternalLink className="h-5 w-5" />
          <span className="text-sm">Community</span>
        </Button>
      </div>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Help Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <div key={index} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <p className="text-sm text-muted-foreground">{resource.description}</p>
                  </div>
                  <div className="text-xs bg-muted px-2 py-1 rounded">
                    {resource.type}
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <MessageCircle className="h-12 w-12 mx-auto text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Contact Our Support Team</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help you succeed.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>
                Send Message
              </Button>
              <Button variant="outline">
                Schedule Call
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};