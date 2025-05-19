"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BriefcaseIcon, DollarSignIcon, CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export default function PostProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    categoryId: "",
    dueDate: "",
  });
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    budget: "",
    categoryId: "",
    dueDate: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) {
        toast({
          title: "Error",
          description: "Failed to load categories",
          variant: "destructive",
        });
        return;
      }

      setCategories(data);
    };

    fetchCategories();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: "",
      description: "",
      budget: "",
      categoryId: "",
      dueDate: "",
    };

    if (!formData.title.trim()) {
      newErrors.title = "Project title is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      newErrors.description = "Project description is required";
      isValid = false;
    }
    if (!formData.budget || isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = "Valid budget amount is required";
      isValid = false;
    }
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
      isValid = false;
    }
    if (!formData.dueDate) {
      newErrors.dueDate = "Due date is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      toast({
        title: "Error",
        description: "You must be logged in to post a project",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase
      .from('projects')
      .insert({
        title: formData.title,
        description: formData.description,
        budget: Number(formData.budget),
        category_id: formData.categoryId,
        due_date: formData.dueDate,
        client_id: user.id,
      });

    setIsSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to post project. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your project has been posted successfully!",
    });
    router.push("/dashboard");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold gradient-text accent-glow">
            Post a New Project
          </h1>
          <p className="text-muted-foreground">
            Fill in the details to attract the right freelancers for your project
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BriefcaseIcon className="mr-2 h-5 w-5 text-accent-blue" />
                Project Details
              </CardTitle>
              <CardDescription>
                Provide clear and detailed information about your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., E-commerce Website Redesign"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your project requirements..."
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={6}
                    className={errors.description ? "border-red-500" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <div className="relative">
                      <DollarSignIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        placeholder="e.g., 2500"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`pl-9 ${errors.budget ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.budget && (
                      <p className="text-sm text-red-500">{errors.budget}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className={`pl-9 ${errors.dueDate ? "border-red-500" : ""}`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    {errors.dueDate && (
                      <p className="text-sm text-red-500">{errors.dueDate}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId">Category</Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, categoryId: value }))
                    }
                  >
                    <SelectTrigger
                      id="categoryId"
                      className={errors.categoryId ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.categoryId && (
                    <p className="text-sm text-red-500">{errors.categoryId}</p>
                  )}
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" asChild disabled={isSubmitting}>
                    <Link href="/dashboard">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    className="bg-accent-blue hover:bg-accent-blue/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Posting..." : "Post Project"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}