"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";
import { motion } from "framer-motion";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export function TestimonialCard({
  quote,
  name,
  role,
  avatar
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="border-border/40 hover-glow bg-card h-full">
        <CardContent className="pt-6">
          <QuoteIcon className="h-8 w-8 text-accent-blue/60 mb-4" />
          <p className="mb-6 text-foreground/90 italic">
            "{quote}"
          </p>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3 border-2 border-accent-blue/20">
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-medium text-foreground">{name}</h4>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}