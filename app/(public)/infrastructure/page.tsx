"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Ship,
  Train,
  Zap,
  Droplets,
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { InteractiveMap } from "@/components/maps/interactive-map";
import { sampleInfrastructure } from "@/lib/data/sample-data";

const infrastructureTypes = [
  { type: "port", icon: Ship, label: "Ports", count: 4, color: "text-blue-600" },
  { type: "railway", icon: Train, label: "Railways", count: 3, color: "text-purple-600" },
  { type: "road", icon: Truck, label: "Roads", count: 12, color: "text-gray-600" },
  { type: "power-plant", icon: Zap, label: "Power Plants", count: 6, color: "text-yellow-600" },
  { type: "water-plant", icon: Droplets, label: "Water Plants", count: 4, color: "text-cyan-600" },
  { type: "processing", icon: Building2, label: "Processing", count: 8, color: "text-green-600" },
];

const typeIcons: Record<string, typeof Ship> = {
  port: Ship,
  railway: Train,
  road: Truck,
  "power-plant": Zap,
  "water-plant": Droplets,
  "processing-facility": Building2,
  storage: Building2,
};

export default function InfrastructurePage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-saudi-green-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                37 Facilities
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mining Infrastructure
            </h1>
            <p className="text-orange-100 text-lg">
              Explore Saudi Arabia's world-class mining infrastructure including
              ports, railways, power plants, and processing facilities that
              support mining operations across the Kingdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Types */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {infrastructureTypes.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover cursor-pointer bg-white shadow-lg">
                  <CardContent className="p-4 text-center">
                    <item.icon
                      className={`w-8 h-8 mx-auto mb-2 ${item.color}`}
                    />
                    <p className="font-semibold text-lg">{item.count}</p>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge variant="saudi" className="mb-4">
              Infrastructure Map
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Infrastructure Network
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              View the distribution of mining infrastructure across Saudi Arabia.
              Click on markers for detailed information.
            </p>
          </motion.div>

          <Card>
            <CardContent className="p-0">
              <InteractiveMap
                height="500px"
                zoom={5}
                markers={sampleInfrastructure.map((inf) => ({
                  id: inf.id,
                  type: "infrastructure",
                  position: [inf.location.latitude, inf.location.longitude],
                  title: inf.name,
                  description: inf.description,
                  color: "#006C35",
                }))}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Infrastructure List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <Badge variant="gold" className="mb-4">
                Key Facilities
              </Badge>
              <h2 className="text-3xl font-bold">Major Infrastructure</h2>
            </div>
            <Button variant="saudi-outline">
              View All
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleInfrastructure.map((infrastructure, index) => {
              const Icon = typeIcons[infrastructure.type] || Building2;
              return (
                <motion.div
                  key={infrastructure.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full card-hover">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-saudi-green-100 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-saudi-green-600" />
                        </div>
                        <Badge
                          variant={
                            infrastructure.status === "operational"
                              ? "saudi"
                              : infrastructure.status === "under-construction"
                              ? "gold"
                              : "secondary"
                          }
                        >
                          {infrastructure.status.replace("-", " ")}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <CardTitle className="text-lg">
                          {infrastructure.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {infrastructure.nameAr}
                        </p>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {infrastructure.description}
                      </p>

                      {infrastructure.capacity && (
                        <div className="bg-muted/50 rounded-lg p-3">
                          <p className="text-xs text-muted-foreground mb-1">
                            Capacity
                          </p>
                          <p className="font-semibold text-saudi-green-700">
                            {typeof infrastructure.capacity === 'string' 
                              ? infrastructure.capacity 
                              : `${infrastructure.capacity.value?.toLocaleString()} ${infrastructure.capacity.unit}`}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-saudi-green-500" />
                        <span>{infrastructure.location.region}</span>
                      </div>

                      {infrastructure.operator && (
                        <p className="text-xs text-muted-foreground">
                          Operator: {infrastructure.operator}
                        </p>
                      )}

                      <Button variant="saudi-outline" className="w-full">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Development Projects */}
      <section className="py-12 bg-saudi-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="bg-saudi-gold-500/20 text-saudi-gold-300 border-none mb-4">
              Ongoing Development
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Infrastructure Projects
            </h2>
            <p className="text-saudi-green-200 max-w-2xl mx-auto">
              Major infrastructure projects currently under development to support
              the Kingdom's mining sector expansion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Saudi Landbridge Railway",
                type: "Railway",
                progress: 65,
                investment: "SAR 15 Billion",
                completion: "2026",
              },
              {
                name: "Northern Mining Corridor",
                type: "Roads",
                progress: 45,
                investment: "SAR 8 Billion",
                completion: "2027",
              },
              {
                name: "Renewable Energy Mining Complex",
                type: "Power Plant",
                progress: 30,
                investment: "SAR 12 Billion",
                completion: "2028",
              },
              {
                name: "Red Sea Mining Port",
                type: "Port",
                progress: 20,
                investment: "SAR 6 Billion",
                completion: "2029",
              },
            ].map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-white">
                          {project.name}
                        </h3>
                        <p className="text-sm text-saudi-green-200">
                          {project.type}
                        </p>
                      </div>
                      <Badge className="bg-saudi-gold-500/20 text-saudi-gold-300 border-none">
                        {project.completion}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-saudi-green-200">Progress</span>
                        <span className="text-saudi-gold-400">
                          {project.progress}%
                        </span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-saudi-green-200">
                        Investment
                      </span>
                      <span className="text-lg font-bold text-saudi-gold-400">
                        {project.investment}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

