"use client";

import { motion } from "framer-motion";
import { Database, Globe, FileJson, Layers, Server, ExternalLink, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

interface DataSource {
  id: string;
  name: string;
  nameAr: string;
  provider: string;
  providerAr: string;
  description: string;
  dataTypes: string[];
  url: string;
  icon: React.ElementType;
  color: string;
  records?: string;
  format?: string;
}

const dataSources: DataSource[] = [
  {
    id: "sgs",
    name: "Saudi Geological Survey",
    nameAr: "   ",
    provider: "SGS",
    providerAr: "SGS",
    description: "Official geological database with comprehensive mineral deposit data, terrane boundaries, and exploration targets.",
    dataTypes: ["Mineral Deposits", "Terranes", "Geochemistry", "Geophysics"],
    url: "https://ngdp.sgs.gov.sa",
    icon: Globe,
    color: "saudi-green",
    records: "5,000+",
    format: "GeoJSON, CSV",
  },
  {
    id: "open-data",
    name: "Saudi Open Data Portal",
    nameAr: "  ",
    provider: "SDAIA",
    providerAr: "",
    description: "National open data platform providing structured geological datasets with API access for integration.",
    dataTypes: ["Geological Database", "Infrastructure", "Licenses"],
    url: "https://open.data.gov.sa",
    icon: Database,
    color: "blue",
    records: "100+",
    format: "JSON API",
  },
  {
    id: "ngd-portal",
    name: "National Geoscience Database",
    nameAr: "   ",
    provider: "SGS",
    providerAr: "SGS",
    description: "Interactive geospatial platform with drill hole data, assay results, and geological maps.",
    dataTypes: ["Drill Data", "Assays", "Maps", "Cross-sections"],
    url: "https://ngd.sgs.gov.sa",
    icon: Layers,
    color: "purple",
    records: "50,000+",
    format: "WMS, WFS",
  },
  {
    id: "exploration",
    name: "Exploration License Data",
    nameAr: "  ",
    provider: "Ministry of Industry",
    providerAr: " ",
    description: "Tender rounds, license boundaries, and exploration activity data across all regions.",
    dataTypes: ["Licenses", "Tenders", "Boundaries"],
    url: "https://mim.gov.sa",
    icon: FileJson,
    color: "gold",
    records: "200+",
    format: "GeoJSON",
  },
];

export function DataSourcesShowcase() {
  return (
    <section id="data-sources" className="section-padding bg-background">
      <div className="container mx-auto container-padding">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="saudi" className="mb-4">
            <Database className="w-3 h-3 mr-1" />
            Integrated Data Sources
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Real-time geological data at your fingertips
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
            Our platform aggregates data from official Saudi geological databases, 
            providing geologists and researchers with comprehensive, up-to-date information 
            for mineral prospectivity analysis.
          </p>
        </motion.div>

        {/* Data pipeline visualization */}
        <motion.div {...fadeUp} className="mb-12">
          <Card className="bg-gradient-to-r from-saudi-green-950/50 to-saudi-green-900/30 border-saudi-green-800/30">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-saudi-green-500/20 flex items-center justify-center">
                    <Server className="w-8 h-8 text-saudi-green-400" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">Data Pipeline Status</div>
                    <div className="text-saudi-green-200/70 text-sm">All sources connected and syncing</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["SGS Database", "Open Data API", "NGD Portal", "License Data"].map((source) => (
                    <Badge key={source} className="bg-saudi-green-500/20 text-saudi-green-200 border-saudi-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {source}
                    </Badge>
                  ))}
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-saudi-gold-400">55,000+</div>
                  <div className="text-sm text-saudi-green-200/70">Total Records</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data sources grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {dataSources.map((source, idx) => (
            <motion.div
              key={source.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Card className="h-full card-hover group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
                      ${source.color === "saudi-green" ? "bg-saudi-green-100 dark:bg-saudi-green-900/40" :
                        source.color === "blue" ? "bg-blue-100 dark:bg-blue-900/40" :
                        source.color === "purple" ? "bg-purple-100 dark:bg-purple-900/40" :
                        "bg-saudi-gold-100 dark:bg-saudi-gold-900/40"
                      }`}
                    >
                      <source.icon className={`w-7 h-7
                        ${source.color === "saudi-green" ? "text-saudi-green-600 dark:text-saudi-green-400" :
                          source.color === "blue" ? "text-blue-600 dark:text-blue-400" :
                          source.color === "purple" ? "text-purple-600 dark:text-purple-400" :
                          "text-saudi-gold-600 dark:text-saudi-gold-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{source.name}</h3>
                          <p className="text-sm text-muted-foreground">{source.nameAr}</p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {source.provider}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-3">
                        {source.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {source.dataTypes.map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs">
                            {type}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span><strong className="text-foreground">{source.records}</strong> records</span>
                          <span>{source.format}</span>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-saudi-green-600 dark:text-saudi-green-400 group-hover:text-saudi-green-700 dark:group-hover:text-saudi-green-300"
                          asChild
                        >
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            View Source
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* API access callout */}
        <motion.div {...fadeUp} className="mt-8">
          <Card className="bg-muted/50 border-dashed">
            <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-saudi-green-100 dark:bg-saudi-green-900/40 flex items-center justify-center">
                  <FileJson className="w-5 h-5 text-saudi-green-600 dark:text-saudi-green-400" />
                </div>
                <div>
                  <div className="font-medium">Need programmatic access?</div>
                  <div className="text-sm text-muted-foreground">
                    All data sources are accessible via REST APIs for your research pipelines
                  </div>
                </div>
              </div>
              <Button variant="saudi-outline" size="sm">
                View API Documentation
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
