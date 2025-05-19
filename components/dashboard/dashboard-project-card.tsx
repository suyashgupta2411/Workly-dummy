import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";

interface FreelancerInfo {
  name: string;
  avatar: string;
}

interface ClientInfo {
  name: string;
  avatar: string;
}

interface DashboardProjectCardProps {
  title: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  budget: string;
  dueDate: string;
  freelancer?: FreelancerInfo;
  client?: ClientInfo;
}

export function DashboardProjectCard({
  title,
  status,
  budget,
  dueDate,
  freelancer,
  client
}: DashboardProjectCardProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case "in_progress":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
      case "completed":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };

  return (
    <Card className="border-border/30 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-medium">{title}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={getStatusBadgeVariant(status)} variant="outline">
                {getStatusLabel(status)}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-foreground">
                Budget: {budget}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-foreground">
                Due: {dueDate}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center md:justify-end gap-3 mt-3 md:mt-0">
            {freelancer && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={freelancer.avatar} />
                  <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{freelancer.name}</span>
              </div>
            )}
            
            {client && (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2 bg-accent-blue/20">
                  <AvatarImage src={client.avatar} />
                  <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{client.name}</span>
              </div>
            )}
            
            <Button size="sm" variant="ghost" className="px-2">
              <MessageCircleIcon className="h-4 w-4" />
            </Button>
            
            <Button size="sm" asChild>
              <Link href={`/projects/${title.toLowerCase().replace(/\s+/g, '-')}`}>
                View
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}