"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Mineral } from "@/types";

interface MineralCardProps {
  mineral: Mineral;
  index?: number;
  className?: string;
}

const categoryColors: Record<string, string> = {
  precious: "bg-yellow-100 text-yellow-800 border-yellow-200",
  base: "bg-gray-100 text-gray-800 border-gray-200",
  industrial: "bg-blue-100 text-blue-800 border-blue-200",
  "rare-earth": "bg-purple-100 text-purple-800 border-purple-200",
  energy: "bg-orange-100 text-orange-800 border-orange-200",
};

export function MineralCard({ mineral, index = 0, className }: MineralCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn("group overflow-hidden card-hover", className)}>
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-saudi-green-100 to-saudi-green-50">
          {mineral.image ? (
            <Image
              src={mineral.image}
              alt={mineral.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-saudi-green-200">
                {mineral.symbol}
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge className={cn("border", categoryColors[mineral.category])}>
              {mineral.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-saudi-green-600 transition-colors">
                {mineral.name}
              </h3>
              <p className="text-sm text-muted-foreground">{mineral.nameAr}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-saudi-gold-600">
                {mineral.symbol}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {mineral.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Reserves</p>
              <p className="font-semibold text-saudi-green-700">
                {mineral.reserves.toLocaleString()} {mineral.unit}
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="font-semibold text-saudi-gold-600">
                {formatCurrency(mineral.pricePerUnit)}/{mineral.unit}
              </p>
            </div>
          </div>

          {/* Locations */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-saudi-green-500" />
            <span className="truncate">{mineral.locations.slice(0, 2).join(", ")}</span>
            {mineral.locations.length > 2 && (
              <span className="text-saudi-green-500">
                +{mineral.locations.length - 2}
              </span>
            )}
          </div>

          {/* Action */}
          <Link href={`/minerals/${mineral.id}`} className="block">
            <Button
              variant="saudi-outline"
              className="w-full group/btn"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

