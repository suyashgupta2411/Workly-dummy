"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronRightIcon,
  BriefcaseIcon,
  UsersIcon,
  MessageSquareIcon,
  ZapIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestimonialCard } from "@/components/testimonial-card";
import { ServiceCard } from "@/components/service-card";
import { HowItWorksSection } from "@/components/how-it-works-section";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-10" />
          <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent-blue/20 via-background/0 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6 gradient-text accent-glow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Connecting Talent With Opportunity
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Join the platform where skilled freelancers and ambitious clients
              meet to bring great ideas to life.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Tabs defaultValue="client" className="w-full max-w-md mx-auto">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="client" className="text-lg">
                    I need a service
                  </TabsTrigger>
                  <TabsTrigger value="freelancer" className="text-lg">
                    I want to work
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="client" className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-accent-blue hover:bg-accent-blue/90 hover-glow text-lg"
                  >
                    <Link href="/register?as=client">
                      Post a Job <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Join thousands of clients who have found amazing freelancers
                  </p>
                </TabsContent>
                <TabsContent value="freelancer" className="space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-accent-blue hover:bg-accent-blue/90 hover-glow text-lg"
                  >
                    <Link href="/register?as=freelancer">
                      Apply as Freelancer{" "}
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Find projects that match your skills and expertise
                  </p>
                </TabsContent>
              </Tabs>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        i % 2 === 0 ? "women" : "men"
                      }/${i + 50}.jpg`}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-accent-blue">10,000+</span>{" "}
                professionals have joined
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Workly?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers everything you need to succeed in the world of
              freelancing.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div
              variants={itemVariants}
              className="card-gradient rounded-xl p-6 hover-glow shimmer"
            >
              <div className="rounded-full bg-accent-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                <BriefcaseIcon className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Projects</h3>
              <p className="text-muted-foreground">
                Discover high-quality projects from clients looking for your
                specific skills.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="card-gradient rounded-xl p-6 hover-glow shimmer"
            >
              <div className="rounded-full bg-accent-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                <UsersIcon className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Talent</h3>
              <p className="text-muted-foreground">
                Connect with skilled freelancers who deliver exceptional results
                on time.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="card-gradient rounded-xl p-6 hover-glow shimmer"
            >
              <div className="rounded-full bg-accent-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquareIcon className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Seamless Communication
              </h3>
              <p className="text-muted-foreground">
                Our integrated chat system makes client-freelancer collaboration
                easy.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="card-gradient rounded-xl p-6 hover-glow shimmer"
            >
              <div className="rounded-full bg-accent-blue/20 w-12 h-12 flex items-center justify-center mb-4">
                <ZapIcon className="h-6 w-6 text-accent-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                AI-Enhanced Matching
              </h3>
              <p className="text-muted-foreground">
                Our Gemini-powered AI helps match the perfect freelancer to your
                project needs.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Popular Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the most in-demand services our freelancers offer
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ServiceCard
              title="Web Development"
              description="Custom websites, web applications, and frontend development services"
              icon="code"
              category="Development"
              rating={4.9}
              projectCount={1243}
              image="https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg"
            />

            <ServiceCard
              title="UI/UX Design"
              description="User-centered design solutions for web and mobile applications"
              icon="palette"
              category="Design"
              rating={4.8}
              projectCount={875}
              image="https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg"
            />

            <ServiceCard
              title="Content Writing"
              description="SEO-friendly articles, blog posts, and copywriting services"
              icon="file-text"
              category="Writing"
              rating={4.7}
              projectCount={1032}
              image="https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg"
            />

            <ServiceCard
              title="Mobile App Development"
              description="Native and cross-platform mobile applications for iOS and Android"
              icon="smartphone"
              category="Development"
              rating={4.9}
              projectCount={938}
              image="https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg"
            />

            <ServiceCard
              title="Digital Marketing"
              description="Comprehensive digital marketing strategies to grow your business"
              icon="trending-up"
              category="Marketing"
              rating={4.8}
              projectCount={756}
              image="https://images.pexels.com/photos/6801642/pexels-photo-6801642.jpeg"
            />

            <ServiceCard
              title="Video Editing"
              description="Professional video editing for content creators and businesses"
              icon="video"
              category="Multimedia"
              rating={4.7}
              projectCount={624}
              image="https://images.pexels.com/photos/5926385/pexels-photo-5926385.jpeg"
            />
          </motion.div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" className="hover-glow">
              <Link href="/browse">
                Browse All Services{" "}
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Read testimonials from freelancers and clients who have found
              success on our platform
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <TestimonialCard
              quote="Workly has completely transformed how I find quality development projects. The bidding system ensures fair rates and the AI matching is spot on!"
              name="Alex Johnson"
              role="Full Stack Developer"
              avatar="https://randomuser.me/api/portraits/men/32.jpg"
            />

            <TestimonialCard
              quote="As a business owner, finding reliable freelancers used to be a nightmare. With Workly, I post a job and get matched with pre-vetted professionals every time."
              name="Sarah Thompson"
              role="Startup Founder"
              avatar="https://randomuser.me/api/portraits/women/44.jpg"
            />

            <TestimonialCard
              quote="The quality of clients on Workly is outstanding. I've been able to build long-term relationships and grow my design business exponentially."
              name="Michael Chen"
              role="UI/UX Designer"
              avatar="https://randomuser.me/api/portraits/men/11.jpg"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-accent/30 to-accent-blue/20 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shimmer"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue via-white to-accent-blue" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text accent-glow">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of freelancers and clients already using Workly to
              connect, collaborate, and create amazing work together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-accent-blue hover:bg-accent-blue/90 hover-glow text-lg"
              >
                <Link href="/register?as=client">Hire a Freelancer</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="hover-glow text-lg"
              >
                <Link href="/register?as=freelancer">Apply as Freelancer</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
