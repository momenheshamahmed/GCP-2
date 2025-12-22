"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Building,
  FileText,
  Globe,
  Shield,
  Zap,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/cards/stat-card";
import { sampleInvestments } from "@/lib/data/sample-data";
import { formatCurrency } from "@/lib/utils";

const investmentProcess = [
  {
    step: 1,
    title: "Initial Inquiry",
    description: "Submit your expression of interest and company profile",
    icon: FileText,
  },
  {
    step: 2,
    title: "Due Diligence",
    description: "Complete regulatory requirements and documentation",
    icon: Shield,
  },
  {
    step: 3,
    title: "License Application",
    description: "Apply for exploration or mining license",
    icon: Building,
  },
  {
    step: 4,
    title: "Project Launch",
    description: "Begin operations with government support",
    icon: Zap,
  },
];

const benefits = [
  "100% foreign ownership allowed",
  "Competitive corporate tax rates",
  "No personal income tax",
  "Free repatriation of profits",
  "Modern infrastructure",
  "Strategic geographic location",
  "Streamlined licensing process",
  "Government investment incentives",
];

export default function InvestmentPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-saudi-green-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                $125B+ Investment Value
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Investment Opportunities
            </h1>
            <p className="text-blue-100 text-lg mb-8">
              Partner in Saudi Arabia's mining transformation. Access world-class
              deposits, modern infrastructure, and supportive investment policies
              under Vision 2030.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" variant="gold">
                Explore Opportunities
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Download Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Open Opportunities"
              value="32"
              description="Active investment projects"
              icon={Building}
              delay={0}
            />
            <StatCard
              title="Minimum Investment"
              value="$10M"
              description="Entry threshold"
              icon={DollarSign}
              variant="saudi"
              delay={0.1}
            />
            <StatCard
              title="Projected ROI"
              value="18-25%"
              description="Average annual return"
              icon={TrendingUp}
              variant="gold"
              delay={0.2}
            />
            <StatCard
              title="License Duration"
              value="30 Years"
              description="Mining license term"
              icon={Shield}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge variant="saudi" className="mb-4">
              Investment Process
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How to Invest in Saudi Mining
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes it easy for international investors to
              participate in the Kingdom's mining sector.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-saudi-green-500" />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-saudi-green-100 flex items-center justify-center text-saudi-green-600 font-bold text-lg">
                        {item.step}
                      </div>
                      <item.icon className="w-6 h-6 text-saudi-green-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <div>
              <Badge variant="gold" className="mb-4">
                Featured Projects
              </Badge>
              <h2 className="text-3xl font-bold">Active Opportunities</h2>
            </div>
            <Button variant="saudi-outline">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {sampleInvestments.map((investment, index) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge
                          variant={
                            investment.status === "open" ? "saudi" : "secondary"
                          }
                          className="mb-2"
                        >
                          {investment.status}
                        </Badge>
                        <CardTitle className="text-xl">
                          {investment.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          {investment.titleAr}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-saudi-green-600">
                          {formatCurrency(investment.value, investment.currency)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Investment Value
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      {investment.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">
                        {investment.type.replace("-", " ")}
                      </Badge>
                      <Badge variant="outline">{investment.location.region}</Badge>
                      {investment.minerals.map((mineral: string) => (
                        <Badge key={mineral} variant="gold">
                          {mineral}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-4">
                      <Button variant="saudi" className="w-full">
                        Express Interest
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-saudi-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="bg-saudi-gold-500/20 text-saudi-gold-300 border-none mb-4">
                Investor Benefits
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose Saudi Arabia?
              </h2>
              <p className="text-saudi-green-200 mb-8">
                The Kingdom offers one of the most attractive investment
                environments in the region with clear policies, strong
                infrastructure, and government support.
              </p>
              <Button variant="gold" size="lg">
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-4"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="flex items-center gap-3 bg-white/5 rounded-lg p-4"
                >
                  <CheckCircle2 className="w-5 h-5 text-saudi-gold-400 flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="saudi-gradient text-white overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <Globe className="w-12 h-12 mx-auto mb-6 text-saudi-gold-300" />
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Invest?
              </h2>
              <p className="text-saudi-green-100 mb-8 max-w-2xl mx-auto">
                Our investment team is ready to guide you through the process.
                Schedule a consultation to discuss opportunities tailored to your
                investment goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="gold">
                  Contact Investment Team
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Download Prospectus
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

