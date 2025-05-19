"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  headline: z.string().min(5, {
    message: "Headline must be at least 5 characters."
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters."
  }),
  categoryId: z.string({
    required_error: "Please select a category.",
  }),
  skills: z.array(z.string()).min(1, {
    message: "Please select at least one skill.",
  }),
  receiveNotifications: z.boolean().default(true),
});

const categories = [
  { id: "dev", name: "Development" },
  { id: "design", name: "Design" },
  { id: "writing", name: "Writing & Translation" },
  { id: "marketing", name: "Digital Marketing" },
  { id: "video", name: "Video & Animation" },
  { id: "music", name: "Music & Audio" },
  { id: "business", name: "Business" },
  { id: "lifestyle", name: "Lifestyle" },
];

const skillsByCategory = {
  dev: ["Web Development", "Mobile Development", "Game Development", "WordPress", "E-commerce Development", "Desktop Applications"],
  design: ["Graphic Design", "Logo Design", "UI/UX Design", "Web Design", "Illustration", "Animation"],
  writing: ["Content Writing", "Copywriting", "Translation", "Proofreading", "Resume Writing", "Technical Writing"],
  marketing: ["Social Media Marketing", "SEO", "SEM", "Email Marketing", "Marketing Strategy", "Influencer Marketing"],
  video: ["Video Editing", "Video Production", "Motion Graphics", "Animation", "Visual Effects", "Videography"],
  music: ["Music Production", "Voice Over", "Mixing & Mastering", "Audio Editing", "Sound Design", "Podcast Production"],
  business: ["Business Consulting", "Financial Consulting", "Legal Consulting", "Market Research", "Business Plans", "Project Management"],
  lifestyle: ["Health & Fitness", "Coaching", "Relationship Advice", "Life Coaching", "Astrology & Psychics", "Gaming"],
};

export function FreelancerRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      headline: "",
      description: "",
      skills: [],
      receiveNotifications: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Account created!",
        description: "You can now login to your freelancer account.",
      });
      router.push("/login");
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    {...field} 
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="headline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Headline</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Senior Web Developer" {...field} />
              </FormControl>
              <FormDescription>
                This appears under your name and in search results
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Category</FormLabel>
              <Select 
                onValueChange={(value) => {
                  field.onChange(value);
                  setSelectedCategory(value);
                  form.setValue("skills", []);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {selectedCategory && (
          <FormField
            control={form.control}
            name="skills"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Skills</FormLabel>
                  <FormDescription>
                    Select the skills that you have
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {skillsByCategory[selectedCategory as keyof typeof skillsByCategory]?.map((skill) => (
                    <FormField
                      key={skill}
                      control={form.control}
                      name="skills"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={skill}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(skill)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, skill])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== skill
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {skill}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Overview</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience, skills, and expertise..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="receiveNotifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Email Notifications
                </FormLabel>
                <FormDescription>
                  Receive emails about new job opportunities and platform updates
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-accent-blue hover:bg-accent-blue/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
              Creating account...
            </>
          ) : (
            "Create Freelancer Account"
          )}
        </Button>
      </form>
    </Form>
  );
}