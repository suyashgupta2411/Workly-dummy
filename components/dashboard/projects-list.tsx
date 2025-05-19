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
import { DashboardProjectCard } from "@/components/dashboard/dashboard-project-card";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

interface ProjectsListProps {
  isClient: boolean;
}

export function ProjectsList({ isClient }: ProjectsListProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Demo data
  const clientProjects = [
    {
      title: "E-commerce Website Redesign",
      status: "in_progress",
      budget: "$2,500",
      dueDate: "Apr 15, 2025",
      freelancer: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      }
    },
    {
      title: "Mobile App Development",
      status: "in_progress",
      budget: "$4,000",
      dueDate: "May 20, 2025",
      freelancer: {
        name: "Sophia Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    },
    {
      title: "Brand Identity Design",
      status: "in_progress",
      budget: "$1,200",
      dueDate: "Apr 5, 2025",
      freelancer: {
        name: "Marcus Williams",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg"
      }
    },
    {
      title: "SEO Optimization",
      status: "completed",
      budget: "$800",
      dueDate: "Mar 10, 2025",
      freelancer: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg"
      }
    },
    {
      title: "Social Media Campaign",
      status: "completed",
      budget: "$1,500",
      dueDate: "Feb 28, 2025",
      freelancer: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/42.jpg"
      }
    },
    {
      title: "Product Photography",
      status: "open",
      budget: "$600",
      dueDate: "Apr 30, 2025",
      freelancer: null
    }
  ];

  const freelancerProjects = [
    {
      title: "E-commerce Website Redesign",
      status: "in_progress",
      budget: "$2,500",
      dueDate: "Apr 15, 2025",
      client: {
        name: "TechVentures Inc.",
        avatar: ""
      }
    },
    {
      title: "SEO Optimization Campaign",
      status: "in_progress",
      budget: "$1,800",
      dueDate: "Apr 25, 2025",
      client: {
        name: "GrowthBoost Marketing",
        avatar: ""
      }
    },
    {
      title: "Logo Redesign",
      status: "completed",
      budget: "$450",
      dueDate: "Mar 5, 2025",
      client: {
        name: "StartUp Solutions",
        avatar: ""
      }
    },
    {
      title: "Content Writing",
      status: "completed",
      budget: "$800",
      dueDate: "Feb 20, 2025",
      client: {
        name: "Global Media Co.",
        avatar: ""
      }
    }
  ];

  const projects = isClient ? clientProjects : freelancerProjects;

  const filteredProjects = projects.filter(project => {
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <CardTitle>
              {isClient ? "Your Projects" : "Projects You're Working On"}
            </CardTitle>
            <CardDescription>
              {isClient
                ? "Manage and track all your projects"
                : "View and manage your active and completed projects"}
            </CardDescription>
          </div>
          
          {isClient && (
            <Button className="bg-accent-blue hover:bg-accent-blue/90" asChild>
              <Link href="/post-project">
                <PlusIcon className="mr-2 h-4 w-4" /> Post a New Project
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
              placeholder="Search projects..."
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
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <DashboardProjectCard
                key={index}
                title={project.title}
                status={project.status as any}
                budget={project.budget}
                dueDate={project.dueDate}
                freelancer={project.freelancer}
                client={project.client}
              />
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No projects found. {isClient && (
                <Link href="/post-project" className="text-accent-blue hover:underline">
                  Post a new project
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}