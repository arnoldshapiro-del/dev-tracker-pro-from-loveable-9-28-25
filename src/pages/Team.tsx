import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Crown, Shield, Clock, Mail } from "lucide-react";

export const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@devtracker.com",
      role: "Team Lead",
      status: "active",
      lastSeen: "Online",
      avatar: "",
      projects: 5
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "sarah@devtracker.com",
      role: "Frontend Developer",
      status: "active",
      lastSeen: "2 hours ago",
      avatar: "",
      projects: 3
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      email: "mike@devtracker.com",
      role: "Backend Developer",
      status: "away",
      lastSeen: "1 day ago",
      avatar: "",
      projects: 4
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@devtracker.com",
      role: "Designer",
      status: "active",
      lastSeen: "30 minutes ago",
      avatar: "",
      projects: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('lead')) return <Crown className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Team
          </h1>
          <p className="text-muted-foreground">Manage your development team</p>
        </div>
        
        <Button className="gradient-purple border-0">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">Total Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-green-500" />
              <div>
                <p className="text-sm font-medium">Active Now</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-yellow-400" />
              <div>
                <p className="text-sm font-medium">Team Leads</p>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <div>
                <p className="text-sm font-medium">Avg. Response</p>
                <p className="text-2xl font-bold">2h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${getStatusColor(member.status)}`} />
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {member.name}
                    {getRoleIcon(member.role)}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{member.email}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Projects</p>
                  <p className="font-semibold">{member.projects}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Seen</p>
                  <p className="font-semibold">{member.lastSeen}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Message
                </Button>
                <Button size="sm" className="flex-1">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Team Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Team Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">Alex Johnson created a new project "Mobile App v2"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">Sarah Chen completed 5 tasks in "Frontend Redesign"</p>
                <p className="text-xs text-muted-foreground">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <Avatar className="h-8 w-8">
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">Mike Rodriguez deployed "API Gateway" to production</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};