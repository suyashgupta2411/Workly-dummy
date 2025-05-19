"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Code, Palette, FileText, Smartphone, TrendingUp, Video,
  Star, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  icon: string;
  category: string;
  rating: number;
  projectCount: number;
  image: string;
};

export function ServiceCard({
  title,
  description,
  icon,
  category,
  rating,
  projectCount,
  image
}: ServiceCardProps) {
  const IconComponent = () => {
    switch (icon) {
      case "code":
        return <Code className="h-5 w-5 text-accent-blue" />;
      case "palette":
        return <Palette className="h-5 w-5 text-accent-blue" />;
      case "file-text":
        return <FileText className="h-5 w-5 text-accent-blue" />;
      case "smartphone":
        return <Smartphone className="h-5 w-5 text-accent-blue" />;
      case "trending-up":
        return <TrendingUp className="h-5 w-5 text-accent-blue" />;
      case "video":
        return <Video className="h-5 w-5 text-accent-blue" />;
      default:
        return <Code className="h-5 w-5 text-accent-blue" />;
    }
  };

  return (
    <motion.div
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="overflow-hidden bg-card hover-glow border-border/40 h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <Badge className="absolute top-4 left-4 bg-accent-blue/90 hover:bg-accent-blue text-white">
            <IconComponent /> <span className="ml-1">{category}</span>
          </Badge>
        </div>
        <CardContent className="pt-5">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 text-sm">{description}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{projectCount} projects</span>
          </div>
          <Button asChild variant="outline" className="w-full">
            <Link href="/browse">
              View Details <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}