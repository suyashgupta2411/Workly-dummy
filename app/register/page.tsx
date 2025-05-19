"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClientRegistrationForm } from "@/components/client-registration-form";
import { FreelancerRegistrationForm } from "@/components/freelancer-registration-form";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userTypeParam = searchParams.get("as");
  const [userType, setUserType] = useState(userTypeParam === "freelancer" ? "freelancer" : "client");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-center mb-10"
          >
            <h1 className="text-3xl font-bold mb-2 gradient-text accent-glow">Join Workly</h1>
            <p className="text-muted-foreground">
              Create an account to start working with talented professionals
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center">Create Your Account</CardTitle>
                <CardDescription className="text-center">
                  Choose how you want to use Workly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={userType} onValueChange={(value) => {
                  setUserType(value);
                  router.push(`/register?as=${value}`);
                }}>
                  <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="client">I need a service</TabsTrigger>
                    <TabsTrigger value="freelancer">I want to work</TabsTrigger>
                  </TabsList>
                  <TabsContent value="client">
                    <ClientRegistrationForm />
                  </TabsContent>
                  <TabsContent value="freelancer">
                    <FreelancerRegistrationForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}