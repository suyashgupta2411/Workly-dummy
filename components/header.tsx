"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, MenuIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm py-3 shadow-md" 
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center space-x-2"
        >
          <BriefcaseIcon className="h-8 w-8 text-accent-blue" />
          <span className="text-2xl font-bold gradient-text accent-glow">Workly</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            href="/about" 
            className="text-foreground/80 hover:text-accent-blue transition-colors"
          >
            About
          </Link>
          <Link 
            href="/how-it-works" 
            className="text-foreground/80 hover:text-accent-blue transition-colors"
          >
            How It Works
          </Link>
          <Link 
            href="/browse" 
            className="text-foreground/80 hover:text-accent-blue transition-colors"
          >
            Browse Jobs
          </Link>
          <Link href="/login">
            <Button variant="outline" className="hover-glow">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-accent-blue text-white hover:bg-accent-blue/90 hover-glow">
              Sign Up
            </Button>
          </Link>
        </nav>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/about" 
                className="text-foreground/80 hover:text-accent-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/how-it-works" 
                className="text-foreground/80 hover:text-accent-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                href="/browse" 
                className="text-foreground/80 hover:text-accent-blue transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Jobs
              </Link>
              <Link 
                href="/login" 
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link 
                href="/register" 
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full bg-accent-blue text-white hover:bg-accent-blue/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}