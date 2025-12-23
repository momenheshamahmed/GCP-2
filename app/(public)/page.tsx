"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  Database,
  Map as MapIcon,
  Sparkles,
  ArrowRight,
  Compass,
  Layers,
  Target,
  Activity,
  Mountain,
  Flame,
  FileJson,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MineralMap } from "@/components/maps";
import { SaudiSilhouette } from "@/components/landing/SaudiSilhouette";
import { StatCounter } from "@/components/landing/StatCounter";
import { DataSourcesShowcase } from "@/components/landing/DataSourcesShowcase";
import { MLProspectivitySection } from "@/components/landing/MLProspectivitySection";
import { GeologistToolsSection } from "@/components/landing/GeologistToolsSection";
import { ScientificAnalyticsSection } from "@/components/landing/ScientificAnalyticsSection";
import { mineralDeposits } from "@/lib/data/minerals";
import { geologicalTerranes } from "@/lib/data/geology";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

export default function HomePage() {
  const t = {
    headline: "AI-Powered Mineral Prospectivity Platform",
    sub: "Integrate geological data, apply machine learning models, and discover high-potential exploration targets across the Arabian Shield.",
    exploreMap: "Explore Prospectivity Map",
    viewData: "View Data Sources",
    capability: "Scientific Capabilities",
    mapPreview: "Interactive Geological Atlas",
    mapPreviewSub: "Multi-layer visualization with deposits, terranes, heatmaps, and ML-generated prospectivity zones.",
    dataIntegration: "Integrated Data Sources",
    contact: "Research & Collaboration",
  };

  const depositCount = mineralDeposits.length;
  const terraneCount = geologicalTerranes.length;
  const activeDeposits = mineralDeposits.filter(d => d.status === "active").length;

  return (
    <div className="relative">
      {/* HERO - Scientific Focus - Always dark background */}
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* Dark background layers - stacked properly */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black" />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(1200px_circle_at_20%_20%,rgba(0,108,53,0.35),transparent_55%),radial-gradient(900px_circle_at_80%_20%,rgba(59,130,246,0.20),transparent_60%),radial-gradient(900px_circle_at_40%_80%,rgba(147,51,234,0.15),transparent_60%)]" />
        <div className="absolute -top-20 -left-24 z-[2] w-[420px] h-[420px] rounded-full bg-saudi-green-500/25 blur-3xl" />
        <div className="absolute -bottom-20 -right-24 z-[2] w-[520px] h-[520px] rounded-full bg-blue-500/20 blur-3xl" />
        {/* Grid pattern overlay for scientific feel */}
        <div className="absolute inset-0 z-[3] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

        <div className="container mx-auto container-padding pt-24 pb-16 relative z-[5]">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="bg-blue-500/20 text-blue-100 border border-blue-400/30 mb-4">
                <Brain className="w-4 h-4 mr-2" />
                Machine Learning • Geological Analysis
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-sm">
                {t.headline}
              </h1>
              <p className="mt-5 text-lg text-gray-200 max-w-xl">
                {t.sub}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/map">
                  <Button size="xl" variant="saudi" className="group w-full sm:w-auto shadow-lg">
                    <MapIcon className="w-5 h-5 mr-2" />
                    {t.exploreMap}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="#data-sources">
                  <Button size="xl" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/15 hover:border-white/50">
                    <Database className="w-5 h-5 mr-2" />
                    {t.viewData}
                  </Button>
                </Link>
              </div>

              {/* Scientific metrics */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                <StatCounter 
                  label="Mineral Deposits" 
                  value={depositCount} 
                  suffix="+" 
                  valueClassName="text-white" 
                  labelClassName="text-gray-300"
                />
                <StatCounter 
                  label="Geological Terranes" 
                  value={terraneCount} 
                  valueClassName="text-blue-300" 
                  labelClassName="text-gray-300"
                />
                <StatCounter 
                  label="Active Mines" 
                  value={activeDeposits} 
                  valueClassName="text-white" 
                  labelClassName="text-gray-300"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.08 }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-saudi-green-500/15 blur-2xl rounded-3xl" />
                <div className="relative rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-white font-semibold flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-400" />
                      Prospectivity Zones
                    </div>
                  </div>
                  <SaudiSilhouette className="w-full" />
                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-gray-300">ML-generated prospectivity visualization</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                        <span className="text-gray-300">High</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
                        <span className="text-gray-300">Medium</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500/50" />
                        <span className="text-gray-300">Low</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scientific Capabilities Overview */}
      <section id="capabilities" className="section-padding bg-background">
        <div className="container mx-auto container-padding">
          <motion.div {...fadeUp} className="text-center mb-12">
            <Badge variant="saudi" className="mb-4">{t.capability}</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">End-to-end geological analysis platform</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              From data integration to ML-powered prospectivity mapping, designed for exploration geologists and researchers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Database, 
                title: "Data Integration", 
                titleAr: " ",
                desc: "Unified access to SGS geological databases, open data APIs, and survey records." 
              },
              { 
                icon: Brain, 
                title: "ML Prospectivity", 
                titleAr: "  ",
                desc: "Machine learning models trained on 12,500+ samples for target identification." 
              },
              { 
                icon: Layers, 
                title: "Multi-layer Analysis", 
                titleAr: "  ",
                desc: "Overlay geological, geochemical, and geophysical data for comprehensive insights." 
              },
              { 
                icon: Compass, 
                title: "Decision Support", 
                titleAr: " ",
                desc: "Tools and visualizations to help geologists prioritize exploration targets." 
              },
            ].map((c, i) => (
              <motion.div key={c.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.06 }}>
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-2xl saudi-gradient flex items-center justify-center mb-4">
                      <c.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-lg font-semibold">{c.title}</div>
                    <div className="text-xs text-muted-foreground mb-2">{c.titleAr}</div>
                    <div className="text-sm text-muted-foreground">{c.desc}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <DataSourcesShowcase />

      {/* ML Prospectivity */}
      <MLProspectivitySection />

      {/* Scientific Analytics */}
      <ScientificAnalyticsSection />

      {/* Geologist Tools */}
      <GeologistToolsSection />

    </div>
  );
}
