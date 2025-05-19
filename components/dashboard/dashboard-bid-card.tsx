import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";

interface UserInfo {
  name: string;
  avatar: string;
  type: 'client' | 'freelancer';
}

interface DashboardBidCardProps {
  projectTitle: string;
  amount: string;
  deliveryTime: string;
  status: "pending" | "accepted" | "rejected";
  user: UserInfo;
  date: string;
}

export function DashboardBidCard({
  projectTitle,
  amount,
  deliveryTime,
  status,
  user,
  date
}: DashboardBidCardProps) {
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
      case "accepted":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "accepted":
        return "Accepted";
      case "rejected":
        return "Rejected";
      default:
        return status;
    }
  };

  const isClient = user.type === 'client';

  return (
    <Card className="border-border/30 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-medium">{projectTitle}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge className={getStatusBadgeVariant(status)} variant="outline">
                {getStatusLabel(status)}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-foreground">
                Bid: {amount}
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-foreground">
                Delivery: {deliveryTime}
              </Badge>
            </div>
            <div className="flex items-center mt-2 text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {date}
            </div>
          </div>
          
          <div className="flex items-center md:flex-col lg:flex-row md:justify-end gap-3 mt-3 md:mt-0">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                {user.avatar ? (
                  <AvatarImage src={user.avatar} />
                ) : (
                  <AvatarFallback className="bg-accent-blue/20">{user.name.charAt(0)}</AvatarFallback>
                )}
              </Avatar>
              <span className="text-sm">{user.name}</span>
            </div>
            
            {status === "pending" && !isClient && (
              <Link href={`/bids/${projectTitle.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button size="sm">
                  View
                </Button>
              </Link>
            )}
            
            {status === "pending" && isClient && (
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                </Button>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <XIcon className="h-4 w-4 text-red-400" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}