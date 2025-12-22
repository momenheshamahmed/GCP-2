"use client";

import { motion } from "framer-motion";
import { 
  Activity,
  TrendingUp,
  PieChart,
  BarChart2,
  Percent,
  Scale,
  Gem,
  Mountain
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mineralDeposits } from "@/lib/data/minerals";
import { geologicalTerranes, geologyStats } from "@/lib/data/geology";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

// Calculate real statistics from data
const depositStats = {
  total: mineralDeposits.length,
  active: mineralDeposits.filter(d => d.status === "active").length,
  development: mineralDeposits.filter(d => d.status === "development").length,
  exploration: mineralDeposits.filter(d => d.status === "exploration").length,
  byType: {
    precious: mineralDeposits.filter(d => d.type === "precious").length,
    base: mineralDeposits.filter(d => d.type === "base").length,
    industrial: mineralDeposits.filter(d => d.type === "industrial").length,
  },
  byCommodity: {
    gold: mineralDeposits.filter(d => d.commodities.includes("gold")).length,
    copper: mineralDeposits.filter(d => d.commodities.includes("copper")).length,
    phosphate: mineralDeposits.filter(d => d.commodities.includes("phosphate")).length,
    zinc: mineralDeposits.filter(d => d.commodities.includes("zinc")).length,
    silver: mineralDeposits.filter(d => d.commodities.includes("silver")).length,
  },
  totalReserves: mineralDeposits.reduce((sum, d) => sum + (d.reserves?.proven || 0), 0),
};

const commodityColors: Record<string, string> = {
  gold: "#D4AF37",
  copper: "#F59E0B",
  phosphate: "#16A34A",
  zinc: "#6B7280",
  silver: "#94A3B8",
};

export function ScientificAnalyticsSection() {
  const topCommodities = Object.entries(depositStats.byCommodity)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const maxCommodityCount = Math.max(...topCommodities.map(([, count]) => count));

  return (
    <section className="section-padding bg-muted/40">
      <div className="container mx-auto container-padding">
        <motion.div {...fadeUp} className="text-center mb-12">
          <Badge variant="gold" className="mb-4">
            <Activity className="w-3 h-3 mr-1" />
            Scientific Analytics
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold">
            Data-driven geological insights
          </h2>
          <p className="text-muted-foreground mt-3 max-w-3xl mx-auto">
            Real-time analytics derived from our integrated geological database, 
            providing quantitative insights for exploration planning and resource assessment.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Deposit Status Distribution */}
          <motion.div {...fadeUp} transition={{ delay: 0.05 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PieChart className="w-5 h-5 text-saudi-green-600 dark:text-saudi-green-400" />
                  <h3 className="font-semibold">Deposit Status Distribution</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { label: "Active Mining", count: depositStats.active, color: "bg-saudi-green-500", percent: Math.round((depositStats.active / depositStats.total) * 100) },
                    { label: "Development", count: depositStats.development, color: "bg-saudi-gold-500", percent: Math.round((depositStats.development / depositStats.total) * 100) },
                    { label: "Exploration", count: depositStats.exploration, color: "bg-blue-500", percent: Math.round((depositStats.exploration / depositStats.total) * 100) },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.count} ({item.percent}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Deposits</span>
                    <span className="text-2xl font-bold text-saudi-green-600 dark:text-saudi-green-400">
                      {depositStats.total}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Commodity Distribution */}
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart2 className="w-5 h-5 text-saudi-gold-600 dark:text-saudi-gold-400" />
                  <h3 className="font-semibold">Top Commodities by Deposit Count</h3>
                </div>
                
                <div className="space-y-3">
                  {topCommodities.map(([commodity, count]) => (
                    <div key={commodity} className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: commodityColors[commodity] || "#6B7280" }}
                      />
                      <span className="text-sm capitalize flex-1">{commodity}</span>
                      <div className="flex-1 max-w-24">
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${(count / maxCommodityCount) * 100}%`,
                              backgroundColor: commodityColors[commodity] || "#6B7280"
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium w-8 text-right">{count}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">Precious Metals</div>
                    <div className="text-xl font-bold">{depositStats.byType.precious}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Base Metals</div>
                    <div className="text-xl font-bold">{depositStats.byType.base}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Terrane Analysis */}
          <motion.div {...fadeUp} transition={{ delay: 0.15 }}>
            <Card className="h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Mountain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="font-semibold">Geological Terranes</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "Arc Terranes", value: geologyStats.byType.arc, color: "text-saudi-green-600 dark:text-saudi-green-400" },
                    { label: "Ophiolite Belts", value: geologyStats.byType.ophiolite, color: "text-purple-600 dark:text-purple-400" },
                    { label: "Sedimentary", value: geologyStats.byType.sedimentary, color: "text-blue-600 dark:text-blue-400" },
                    { label: "Volcanic", value: geologyStats.byType.volcanic, color: "text-red-600 dark:text-red-400" },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">High Potential</span>
                    <Badge variant="saudi" className="text-xs">{geologyStats.highPotential}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Medium Potential</span>
                    <Badge variant="outline" className="text-xs">{geologyStats.mediumPotential}</Badge>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Area Mapped</span>
                    <span className="font-bold">
                      {(geologyStats.totalAreaKm2 / 1000).toFixed(0)}K km²
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key insights banner */}
        <motion.div {...fadeUp} className="mt-8">
          <Card className="bg-gradient-to-r from-saudi-green-50 to-blue-50 dark:from-saudi-green-950/30 dark:to-blue-950/30 border-saudi-green-200/50 dark:border-saudi-green-800/30">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Gem, label: "Gold Deposits", value: depositStats.byCommodity.gold, suffix: "" },
                  { icon: TrendingUp, label: "High Potential Zones", value: geologyStats.highPotential, suffix: "" },
                  { icon: Scale, label: "Total Terranes", value: geologicalTerranes.length, suffix: "" },
                  { icon: Percent, label: "Exploration Stage", value: Math.round((depositStats.exploration / depositStats.total) * 100), suffix: "%" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-saudi-green-100 dark:bg-saudi-green-900/40 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-saudi-green-600 dark:text-saudi-green-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{item.value}{item.suffix}</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
