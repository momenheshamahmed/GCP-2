"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Compass,
  Search,
  Filter,
  Download,
  Layers,
  Map as MapIcon,
  BarChart3,
  FileSpreadsheet,
  Ruler,
  Crosshair,
  Grid3X3,
  Mountain,
  Flame,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

interface Tool {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  link: string;
  badge?: string;
}

const tools: Tool[] = [
  {
    icon: MapIcon,
    title: "Interactive Mining Atlas",
    description: "Multi-layer interactive map with deposits, terranes, infrastructure, and heatmap overlays for comprehensive spatial analysis.",
    features: ["Layer toggling", "Clustering", "Export to PNG", "Fullscreen mode"],
    link: "/map",
    badge: "Core Tool",
  },
  {
    icon: Flame,
    title: "Heatmap Analysis",
    description: "Visualize mineral density, exploration potential, and commodity-specific concentrations across the Arabian Shield.",
    features: ["Deposit density", "Exploration potential", "Gold/Copper/Phosphate layers"],
    link: "/map",
  },
  {
    icon: Mountain,
    title: "Terrane Explorer",
    description: "Browse geological terranes with detailed mineralogy, age dating, and exploration potential assessments.",
    features: ["12 terrane profiles", "Mineralization history", "Prospectivity rating"],
    link: "/geology",
  },
  {
    icon: Filter,
    title: "Advanced Filtering",
    description: "Filter deposits by region, commodity type, status, and operator to focus on relevant exploration targets.",
    features: ["Multi-criteria filters", "Region-based search", "Status tracking"],
    link: "/minerals",
  },
  {
    icon: BarChart3,
    title: "Statistical Analysis",
    description: "Analyze deposit distributions, production statistics, and reserve estimates with interactive charts.",
    features: ["Production charts", "Reserve analysis", "Regional statistics"],
    link: "/minerals",
  },
  {
    icon: Download,
    title: "Data Export",
    description: "Export map views, filtered data, and analysis results for use in your research workflows.",
    features: ["PNG export", "Data download", "Report generation"],
    link: "/map",
  },
];

const quickStats = [
  { label: "Mineral Deposits", value: "48+", icon: Crosshair },
  { label: "Geological Terranes", value: "12", icon: Grid3X3 },
  { label: "Active Mines", value: "7", icon: Mountain },
  { label: "Exploration Targets", value: "150+", icon: Search },
];

export function GeologistToolsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="saudi" className="mb-4">
            <Compass className="w-3 h-3 mr-1" />
            Decision Support Tools
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Built for geologists and researchers
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
            Professional-grade tools designed to help exploration geologists analyze data, 
            identify patterns, and make informed decisions about mineral prospectivity.
          </p>
        </motion.div>

        {/* Quick stats */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickStats.map((stat) => (
            <Card key={stat.label} className="bg-muted/50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saudi-green-100 dark:bg-saudi-green-900/40 flex items-center justify-center shrink-0">
                  <stat.icon className="w-5 h-5 text-saudi-green-600 dark:text-saudi-green-400" />
                </div>
                <div>
                  <div className="text-xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Tools grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Link href={tool.link} className="block h-full">
                <Card className="h-full card-hover group cursor-pointer">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-saudi-green-100 dark:bg-saudi-green-900/40 flex items-center justify-center group-hover:bg-saudi-green-200 dark:group-hover:bg-saudi-green-800/40 transition-colors">
                        <tool.icon className="w-6 h-6 text-saudi-green-600 dark:text-saudi-green-400" />
                      </div>
                      {tool.badge && (
                        <Badge variant="gold" className="text-xs">{tool.badge}</Badge>
                      )}
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-saudi-green-600 dark:group-hover:text-saudi-green-400 transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-4 flex-1">
                      {tool.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tool.features.slice(0, 3).map((feature) => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm font-medium text-saudi-green-600 dark:text-saudi-green-400 group-hover:text-saudi-green-700 dark:group-hover:text-saudi-green-300">
                      Open tool
                      <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
