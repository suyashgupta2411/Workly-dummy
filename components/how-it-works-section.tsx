"use client";

import { motion } from "framer-motion";
import { 
  ClipboardList, 
  Users, 
  MessageSquare, 
  CheckCircle 
} from "lucide-react";

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const steps = [
    {
      title: "Create a Project",
      description: "Post your job with detailed requirements. Our AI enhances your listing for better matching.",
      icon: <ClipboardList className="h-8 w-8 text-accent-blue" />,
      number: 1
    },
    {
      title: "Connect with Talent",
      description: "Receive bids from qualified freelancers and choose the best match for your needs.",
      icon: <Users className="h-8 w-8 text-accent-blue" />,
      number: 2
    },
    {
      title: "Collaborate Seamlessly",
      description: "Use our integrated chat to communicate, share files, and track progress.",
      icon: <MessageSquare className="h-8 w-8 text-accent-blue" />,
      number: 3
    },
    {
      title: "Complete the Project",
      description: "Review the work, provide feedback, and finalize the project with payment.",
      icon: <CheckCircle className="h-8 w-8 text-accent-blue" />,
      number: 4
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our simple process gets your projects done quickly and effectively
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative"
            >
              <div className="bg-muted rounded-xl p-6 h-full hover-glow relative z-10">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-xl font-bold text-accent-blue">
                  {step.number}
                </div>
                <div className="pt-4 pb-2">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-accent-blue/20 z-0"></div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}