"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BriefcaseIcon,
  PlusIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  UserIcon,
  MessageSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DashboardProjectCard } from "@/components/dashboard/dashboard-project-card";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardBidCard } from "@/components/dashboard/dashboard-bid-card";
import { ProjectsList } from "@/components/dashboard/projects-list";
import { BidsList } from "@/components/dashboard/bids-list";

export default function DashboardPage() {
  // For demo purposes, assume this is a client dashboard
  const isClient = true;

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold gradient-text accent-glow">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              {isClient
                ? "Manage your projects and find talented freelancers"
                : "Find projects and manage your freelance work"}
            </p>
          </div>

          <Button className="mt-4 md:mt-0 bg-accent-blue hover:bg-accent-blue/90">
            {isClient ? (
              <Link href="/post-project" className="flex items-center">
                <PlusIcon className="mr-2 h-4 w-4" /> Post a New Project
              </Link>
            ) : (
              <Link href="/browse" className="flex items-center">
                <BriefcaseIcon className="mr-2 h-4 w-4" /> Find Projects
              </Link>
            )}
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <DashboardStatCard
            title="Active Projects"
            value="3"
            icon={<BriefcaseIcon className="h-5 w-5" />}
            description="Currently in progress"
            colorClass="text-blue-400"
          />

          <DashboardStatCard
            title="Pending Proposals"
            value="8"
            icon={<ClockIcon className="h-5 w-5" />}
            description="Awaiting responses"
            colorClass="text-yellow-400"
          />

          <DashboardStatCard
            title="Completed Projects"
            value="12"
            icon={<CheckCircleIcon className="h-5 w-5" />}
            description="Successfully delivered"
            colorClass="text-green-400"
          />

          <DashboardStatCard
            title={isClient ? "Total Spent" : "Total Earned"}
            value="$4,580"
            icon={<TrendingUpIcon className="h-5 w-5" />}
            description="Lifetime value"
            colorClass="text-purple-400"
          />
        </motion.div>

        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="bids">
              {isClient ? "Proposals" : "My Bids"}
            </TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <BriefcaseIcon className="mr-2 h-5 w-5 text-accent-blue" />
                        {isClient
                          ? "Your Active Projects"
                          : "Projects You're Working On"}
                      </CardTitle>
                      <CardDescription>
                        {isClient
                          ? "Track the progress of your current projects"
                          : "Projects you've been hired to complete"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isClient ? (
                        <div className="space-y-4">
                          <DashboardProjectCard
                            title="E-commerce Website Redesign"
                            status="in_progress"
                            budget="$2,500"
                            dueDate="Apr 15, 2025"
                            freelancer={{
                              name: "Alex Johnson",
                              avatar:
                                "https://randomuser.me/api/portraits/men/32.jpg",
                            }}
                          />

                          <DashboardProjectCard
                            title="Mobile App Development"
                            status="in_progress"
                            budget="$4,000"
                            dueDate="May 20, 2025"
                            freelancer={{
                              name: "Sophia Chen",
                              avatar:
                                "https://randomuser.me/api/portraits/women/44.jpg",
                            }}
                          />

                          <DashboardProjectCard
                            title="Brand Identity Design"
                            status="in_progress"
                            budget="$1,200"
                            dueDate="Apr 5, 2025"
                            freelancer={{
                              name: "Marcus Williams",
                              avatar:
                                "https://randomuser.me/api/portraits/men/11.jpg",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <DashboardProjectCard
                            title="E-commerce Website Redesign"
                            status="in_progress"
                            budget="$2,500"
                            dueDate="Apr 15, 2025"
                            client={{
                              name: "TechVentures Inc.",
                              avatar: "",
                            }}
                          />

                          <DashboardProjectCard
                            title="SEO Optimization Campaign"
                            status="in_progress"
                            budget="$1,800"
                            dueDate="Apr 25, 2025"
                            client={{
                              name: "GrowthBoost Marketing",
                              avatar: "",
                            }}
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/projects">View All Projects</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <ClockIcon className="mr-2 h-5 w-5 text-accent-blue" />
                        {isClient ? "Recent Proposals" : "Your Recent Bids"}
                      </CardTitle>
                      <CardDescription>
                        {isClient
                          ? "Freelancers who have submitted proposals to your projects"
                          : "Your recent proposals to client projects"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isClient ? (
                        <div className="space-y-4">
                          <DashboardBidCard
                            projectTitle="Website Content Writing"
                            amount="$650"
                            deliveryTime="7 days"
                            status="pending"
                            user={{
                              name: "Emma Thompson",
                              avatar:
                                "https://randomuser.me/api/portraits/women/65.jpg",
                              type: "freelancer",
                            }}
                            date="Mar 28, 2025"
                          />

                          <DashboardBidCard
                            projectTitle="Website Content Writing"
                            amount="$800"
                            deliveryTime="5 days"
                            status="pending"
                            user={{
                              name: "James Wilson",
                              avatar:
                                "https://randomuser.me/api/portraits/men/42.jpg",
                              type: "freelancer",
                            }}
                            date="Mar 27, 2025"
                          />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <DashboardBidCard
                            projectTitle="Logo Design for Tech Startup"
                            amount="$450"
                            deliveryTime="5 days"
                            status="pending"
                            user={{
                              name: "Innovative Solutions",
                              avatar: "",
                              type: "client",
                            }}
                            date="Mar 28, 2025"
                          />

                          <DashboardBidCard
                            projectTitle="WordPress Website Development"
                            amount="$1,200"
                            deliveryTime="14 days"
                            status="pending"
                            user={{
                              name: "Green Earth Co.",
                              avatar: "",
                              type: "client",
                            }}
                            date="Mar 25, 2025"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href={isClient ? "/proposals" : "/my-bids"}>
                          View All {isClient ? "Proposals" : "Bids"}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <UserIcon className="mr-2 h-5 w-5 text-accent-blue" />
                        Your Profile
                      </CardTitle>
                      <CardDescription>
                        Manage your profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center text-2xl font-bold mr-4">
                          {isClient ? "C" : "F"}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {isClient ? "Client Account" : "Freelancer Account"}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Profile completion: 85%
                          </p>
                        </div>
                      </div>

                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent-blue h-2 rounded-full"
                          style={{ width: "85%" }}
                        ></div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Profile Picture
                          </span>
                          <span className="text-yellow-400">Missing</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Contact Information
                          </span>
                          <span className="text-green-400">Complete</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {isClient ? "Company Details" : "Portfolio Items"}
                          </span>
                          <span className="text-yellow-400">Incomplete</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/profile">Complete Your Profile</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="border-border/50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl flex items-center">
                        <MessageSquareIcon className="mr-2 h-5 w-5 text-accent-blue" />
                        Recent Messages
                      </CardTitle>
                      <CardDescription>
                        Your recent conversations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center mr-3">
                            <img
                              src="https://randomuser.me/api/portraits/men/32.jpg"
                              alt="Alex Johnson"
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium truncate">
                                Alex Johnson
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                2h ago
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              I ve uploaded the initial design mockups for your
                              review.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                          <div className="w-10 h-10 rounded-full bg-accent-blue/20 flex items-center justify-center mr-3">
                            <img
                              src="https://randomuser.me/api/portraits/women/44.jpg"
                              alt="Sophia Chen"
                              className="w-10 h-10 rounded-full"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium truncate">
                                Sophia Chen
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                Yesterday
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              Can we schedule a call to discuss the app
                              requirements?
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild className="w-full">
                        <Link href="/messages">View All Messages</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsList isClient={isClient} />
          </TabsContent>

          <TabsContent value="bids">
            <BidsList isClient={isClient} />
          </TabsContent>

          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
                <CardDescription>
                  Your conversations with clients and freelancers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 text-muted-foreground">
                  Message functionality will be implemented in the next phase
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
