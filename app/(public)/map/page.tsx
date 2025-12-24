"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MineralMap } from "@/components/maps";

export default function MapPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Badge variant="gold" className="mb-3">
            Interactive Map
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold">Saudi Mining Atlas</h1>
          <p className="text-muted-foreground mt-2">
            Explore mineral deposits, terranes, infrastructure, and tender sites with filters and export.
          </p>
        </motion.div>

        <MineralMap />
      </div>
    </div>
  );
}






