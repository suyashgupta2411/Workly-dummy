import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface DashboardStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
  colorClass: string;
}

export function DashboardStatCard({
  title,
  value,
  icon,
  description,
  colorClass
}: DashboardStatCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5 }
        }
      }}
    >
      <Card className="border-border/40 hover-glow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className={`rounded-full p-2 ${colorClass} bg-opacity-20`}>
              {icon}
            </div>
          </div>
          <div className="flex items-baseline space-x-1">
            <div className="text-3xl font-bold">{value}</div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}