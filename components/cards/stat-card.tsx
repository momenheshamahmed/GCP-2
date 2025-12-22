"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "saudi" | "gold" | "gradient";
  className?: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  variant = "default",
  className,
  delay = 0,
}: StatCardProps) {
  const variants = {
    default: "bg-card border",
    saudi: "bg-saudi-green-500 text-white border-none",
    gold: "bg-saudi-gold-500 text-saudi-green-900 border-none",
    gradient: "saudi-gradient text-white border-none",
  };

  const iconVariants = {
    default: "bg-saudi-green-100 text-saudi-green-600",
    saudi: "bg-white/20 text-white",
    gold: "bg-saudi-green-900/20 text-saudi-green-900",
    gradient: "bg-white/20 text-white",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className={cn(variants[variant], "card-hover", className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p
                className={cn(
                  "text-sm font-medium",
                  variant === "default"
                    ? "text-muted-foreground"
                    : "opacity-80"
                )}
              >
                {title}
              </p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {description && (
                <p
                  className={cn(
                    "text-xs",
                    variant === "default"
                      ? "text-muted-foreground"
                      : "opacity-70"
                  )}
                >
                  {description}
                </p>
              )}
              {trend && (
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "text-xs font-medium",
                      trend.isPositive ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {trend.isPositive ? "+" : "-"}
                    {Math.abs(trend.value)}%
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      variant === "default"
                        ? "text-muted-foreground"
                        : "opacity-60"
                    )}
                  >
                    from last month
                  </span>
                </div>
              )}
            </div>
            {Icon && (
              <div
                className={cn(
                  "p-3 rounded-xl",
                  iconVariants[variant]
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

