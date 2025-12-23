"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp,
  Layers,
  MapPin,
  BarChart3,
  Cpu,
  Network,
  Zap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

interface MLCapability {
  icon: React.ElementType;
  title: string;
  description: string;
  techniques: string[];
}

const mlCapabilities: MLCapability[] = [
  {
    icon: Target,
    title: "Mineral Prospectivity Mapping",
    description: "Machine learning models trained on geological, geochemical, and geophysical data to identify high-potential exploration targets.",
    techniques: ["Random Forest", "Gradient Boosting", "Neural Networks"],
  },
  {
    icon: Layers,
    title: "Multi-layer Data Fusion",
    description: "Integration of diverse data sources including satellite imagery, magnetic surveys, and structural geology for comprehensive analysis.",
    techniques: ["Feature Engineering", "PCA", "Spatial Analysis"],
  },
  {
    icon: TrendingUp,
    title: "Deposit Grade Prediction",
    description: "Predictive models for estimating mineral grades and tonnage based on drilling data and geological parameters.",
    techniques: ["Regression Models", "Kriging", "3D Modeling"],
  },
  {
    icon: Network,
    title: "Pattern Recognition",
    description: "Identification of geological signatures and mineralization patterns across the Arabian Shield terranes.",
    techniques: ["Clustering", "Anomaly Detection", "Deep Learning"],
  },
];

const modelMetrics = [
  { label: "Training Samples", value: "12,500+", icon: BarChart3 },
  { label: "Features Analyzed", value: "45", icon: Layers },
  { label: "Terrane Models", value: "12", icon: MapPin },
];

export function MLProspectivitySection() {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/40 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-saudi-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-saudi-gold-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto container-padding">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="gold" className="mb-4">
            <Brain className="w-3 h-3 mr-1" />
            Machine Learning / AI
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            AI-powered mineral prospectivity analysis
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
            Leverage advanced machine learning models trained on decades of geological survey data 
            to identify high-potential exploration targets and make data-driven decisions.
          </p>
        </motion.div>

        {/* Model metrics */}
        <motion.div {...fadeUp} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {modelMetrics.map((metric, idx) => (
            <Card key={metric.label} className="text-center bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-3 bg-saudi-green-100 dark:bg-saudi-green-900/30 flex items-center justify-center">
                  <metric.icon className="w-6 h-6 text-saudi-green-600 dark:text-saudi-green-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-saudi-green-700 dark:text-saudi-green-300">
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{metric.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* ML capabilities grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {mlCapabilities.map((capability, idx) => (
            <motion.div
              key={capability.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <Card className="h-full card-hover">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl saudi-gradient flex items-center justify-center shrink-0">
                      <capability.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-lg">{capability.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-3">
                        {capability.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {capability.techniques.map((technique) => (
                          <Badge key={technique} variant="outline" className="text-xs">
                            <Cpu className="w-2.5 h-2.5 mr-1" />
                            {technique}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Prospectivity workflow */}
        <motion.div {...fadeUp}>
          <Card className="bg-gradient-to-br from-saudi-green-950 to-saudi-green-900 border-saudi-green-800/50 text-white overflow-hidden">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-saudi-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-saudi-gold-400" />
                  <span className="text-saudi-gold-300 font-medium">How it works</span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6">
                  From raw data to actionable exploration targets
                </h3>
                
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    { step: "01", title: "Data Ingestion", desc: "Collect geological, geochemical, and geophysical data" },
                    { step: "02", title: "Feature Extraction", desc: "Process and engineer meaningful features from raw data" },
                    { step: "03", title: "Model Training", desc: "Train ML models on known deposit locations" },
                    { step: "04", title: "Prospectivity Map", desc: "Generate probability maps for exploration targets" },
                  ].map((item, idx) => (
                    <div key={item.step} className="relative">
                      {idx < 3 && (
                        <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-saudi-gold-400/50 to-transparent" />
                      )}
                      <div className="text-4xl font-bold text-saudi-gold-400/30 mb-2">{item.step}</div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-saudi-green-200/70">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <Link href="/map">
                    <Button variant="gold" size="lg" className="w-full sm:w-auto">
                      <Zap className="w-4 h-4 mr-2" />
                      View Prospectivity Map
                    </Button>
                  </Link>
                  <Link href="/geology">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                      Explore Terranes
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
