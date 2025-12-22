"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, FileText, Clock, ArrowRight } from "lucide-react";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Tender } from "@/types";

interface TenderCardProps {
  tender: Tender;
  index?: number;
  className?: string;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-800",
  published: "bg-green-100 text-green-800",
  closed: "bg-red-100 text-red-800",
  awarded: "bg-blue-100 text-blue-800",
  cancelled: "bg-yellow-100 text-yellow-800",
};

const typeIcons: Record<string, string> = {
  "exploration-license": "🔍",
  "mining-license": "⛏️",
  equipment: "🚜",
  services: "🔧",
  infrastructure: "🏗️",
};

export function TenderCard({ tender, index = 0, className }: TenderCardProps) {
  const publishDate = new Date(tender.publishDate);
  const deadline = new Date(tender.deadline);
  const now = new Date();
  const totalDuration = deadline.getTime() - publishDate.getTime();
  const elapsed = now.getTime() - publishDate.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  const daysRemaining = Math.max(
    0,
    Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn("group overflow-hidden card-hover", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{typeIcons[tender.type] || "📋"}</div>
              <div>
                <h3 className="font-semibold text-foreground group-hover:text-saudi-green-600 transition-colors line-clamp-1">
                  {tender.title}
                </h3>
                <p className="text-sm text-muted-foreground">{tender.titleAr}</p>
              </div>
            </div>
            <Badge className={cn(statusColors[tender.status])}>
              {tender.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tender.description}
          </p>

          {/* Value */}
          <div className="flex items-center justify-between bg-saudi-green-50 dark:bg-saudi-green-900/20 rounded-lg p-3">
            <span className="text-sm text-muted-foreground">Estimated Value</span>
            <span className="text-lg font-bold text-saudi-green-700 dark:text-saudi-green-400">
              {formatCurrency(tender.value, tender.currency)}
            </span>
          </div>

          {/* Timeline Progress */}
          {tender.status === "published" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Application Period</span>
                <span className={cn(
                  "font-medium",
                  daysRemaining <= 7 ? "text-red-500" : "text-saudi-green-600"
                )}>
                  {daysRemaining} days remaining
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4 text-saudi-green-500" />
              <span>Deadline: {formatDate(tender.deadline)}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-saudi-green-500" />
              <span>{tender.location.region}</span>
            </div>
          </div>

          {/* Documents Count */}
          {tender.documents && tender.documents.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4 text-saudi-gold-500" />
              <span>{tender.documents.length} documents available</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="pt-0">
          <Link href={`/tenders/${tender.id}`} className="w-full">
            <Button variant="saudi" className="w-full group/btn">
              View Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

