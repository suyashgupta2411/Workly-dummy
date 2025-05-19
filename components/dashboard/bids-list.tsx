"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { DashboardBidCard } from "@/components/dashboard/dashboard-bid-card";
import { SearchIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

interface BidsListProps {
  isClient: boolean;
}

export function BidsList({ isClient }: BidsListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Demo data
  const clientBids = [
    {
      projectTitle: "Website Content Writing",
      amount: "$650",
      deliveryTime: "7 days",
      status: "pending",
      user: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        type: "freelancer"
      },
      date: "Mar 28, 2025"
    },
    {
      projectTitle: "Website Content Writing",
      amount: "$800",
      deliveryTime: "5 days",
      status: "pending",
      user: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg",
        type: "freelancer"
      },
      date: "Mar 27, 2025"
    },
    {
      projectTitle: "Product Photography",
      amount: "$550",
      deliveryTime: "10 days",
      status: "pending",
      user: {
        name: "Olivia Martin",
        avatar: "https://randomuser.me/api/portraits/women/53.jpg",
        type: "freelancer"
      },
      date: "Mar 26, 2025"
    },
    {
      projectTitle: "Social Media Campaign",
      amount: "$1,200",
      deliveryTime: "14 days",
      status: "accepted",
      user: {
        name: "Daniel Brown",
        avatar: "https://randomuser.me/api/portraits/men/85.jpg",
        type: "freelancer"
      },
      date: "Mar 20, 2025"
    },
    {
      projectTitle: "Logo Design",
      amount: "$400",
      deliveryTime: "5 days",
      status: "rejected",
      user: {
        name: "Sophia Lee",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        type: "freelancer"
      },
      date: "Mar 15, 2025"
    }
  ];

  const freelancerBids = [
    {
      projectTitle: "Logo Design for Tech Startup",
      amount: "$450",
      deliveryTime: "5 days",
      status: "pending",
      user: {
        name: "Innovative Solutions",
        avatar: "",
        type: "client"
      },
      date: "Mar 28, 2025"
    },
    {
      projectTitle: "WordPress Website Development",
      amount: "$1,200",
      deliveryTime: "14 days",
      status: "pending",
      user: {
        name: "Green Earth Co.",
        avatar: "",
        type: "client"
      },
      date: "Mar 25, 2025"
    },
    {
      projectTitle: "E-commerce Product Descriptions",
      amount: "$800",
      deliveryTime: "10 days",
      status: "accepted",
      user: {
        name: "Fashion Forward Inc.",
        avatar: "",
        type: "client"
      },
      date: "Mar 20, 2025"
    },
    {
      projectTitle: "Mobile App UX Design",
      amount: "$1,500",
      deliveryTime: "12 days",
      status: "rejected",
      user: {
        name: "TechVentures Corp.",
        avatar: "",
        type: "client"
      },
      date: "Mar 15, 2025"
    }
  ];

  const bids = isClient ? clientBids : freelancerBids;

  const filteredBids = bids.filter(bid => {
    const matchesStatus = statusFilter === "all" || bid.status === statusFilter;
    const matchesSearch = bid.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>
              {isClient ? "Proposals on Your Projects" : "Your Bids"}
            </CardTitle>
            <CardDescription>
              {isClient
                ? "Freelancers who have submitted proposals to your projects"
                : "Track the status of your proposals to client projects"}
            </CardDescription>
          </div>
          
          {!isClient && (
            <Button variant="outline" asChild>
              <Link href="/browse">
                <ExternalLinkIcon className="mr-2 h-4 w-4" /> Browse More Projects
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={isClient ? "Search proposals..." : "Search your bids..."}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {filteredBids.length > 0 ? (
            filteredBids.map((bid, index) => (
              <DashboardBidCard
                key={index}
                projectTitle={bid.projectTitle}
                amount={bid.amount}
                deliveryTime={bid.deliveryTime}
                status={bid.status as any}
                user={bid.user}
                date={bid.date}
              />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No {isClient ? "proposals" : "bids"} found. {!isClient && (
                <Link href="/browse" className="text-accent-blue hover:underline">
                  Browse available projects
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}