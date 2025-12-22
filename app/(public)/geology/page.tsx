"use client";

import { motion } from "framer-motion";
import { Mountain, Layers, MapPin, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveMap } from "@/components/maps/interactive-map";
import { SaudiMap } from "@/components/maps/saudi-map";
import { mapMarkers } from "@/lib/data/sample-data";

export default function GeologyPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-saudi-green-800 to-saudi-green-950 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge className="bg-saudi-gold-500/20 text-saudi-gold-300 border-none mb-4">
              Geological Survey
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Geological Data & Maps
            </h1>
            <p className="text-saudi-green-100 text-lg">
              Explore comprehensive geological surveys, formation data, and
              interactive maps of Saudi Arabia's mineral-rich regions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="map" className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <TabsList className="grid w-full md:w-auto grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="map">Interactive Map</TabsTrigger>
                <TabsTrigger value="regions">Regions</TabsTrigger>
                <TabsTrigger value="formations">Formations</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search locations..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="map" className="space-y-6">
              <Card>
                <CardContent className="p-0">
                  <InteractiveMap
                    markers={mapMarkers}
                    height="600px"
                    zoom={6}
                    className="rounded-lg"
                  />
                </CardContent>
              </Card>

              {/* Map Legend */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { color: "#D4AF37", label: "Gold Deposits" },
                  { color: "#B87333", label: "Copper Deposits" },
                  { color: "#808080", label: "Phosphate" },
                  { color: "#006C35", label: "Infrastructure" },
                  { color: "#6B21A8", label: "Rare Earth" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regions" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <SaudiMap className="h-[500px]" />
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {[
                    {
                      name: "Arabian Shield",
                      description:
                        "Ancient Precambrian basement complex, rich in gold, copper, zinc, and rare earth elements.",
                      minerals: ["Gold", "Copper", "Zinc", "Silver"],
                      area: "630,000 km²",
                    },
                    {
                      name: "Northern Region",
                      description:
                        "Home to world-class phosphate deposits and bauxite reserves.",
                      minerals: ["Phosphate", "Bauxite", "Limestone"],
                      area: "180,000 km²",
                    },
                    {
                      name: "Eastern Province",
                      description:
                        "Sedimentary basin with industrial minerals and construction materials.",
                      minerals: ["Sand", "Limestone", "Gypsum"],
                      area: "540,000 km²",
                    },
                    {
                      name: "Central Region",
                      description:
                        "Plateau region with diverse mineral occurrences.",
                      minerals: ["Iron", "Titanium", "Rare Earth"],
                      area: "400,000 km²",
                    },
                  ].map((region, index) => (
                    <motion.div
                      key={region.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="card-hover cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {region.name}
                              </h3>
                              <p className="text-xs text-muted-foreground">
                                Area: {region.area}
                              </p>
                            </div>
                            <MapPin className="w-4 h-4 text-saudi-green-500" />
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {region.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {region.minerals.map((mineral) => (
                              <Badge
                                key={mineral}
                                variant="secondary"
                                className="text-xs"
                              >
                                {mineral}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="formations" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Volcanic Complex",
                    type: "Igneous",
                    age: "Precambrian (600-800 Ma)",
                    minerals: ["Gold", "Copper", "Silver"],
                    icon: Mountain,
                  },
                  {
                    name: "Sedimentary Basin",
                    type: "Sedimentary",
                    age: "Paleozoic (250-540 Ma)",
                    minerals: ["Phosphate", "Limestone"],
                    icon: Layers,
                  },
                  {
                    name: "Metamorphic Belt",
                    type: "Metamorphic",
                    age: "Proterozoic (700-900 Ma)",
                    minerals: ["Zinc", "Lead", "Iron"],
                    icon: Mountain,
                  },
                  {
                    name: "Ophiolite Suite",
                    type: "Igneous",
                    age: "Neoproterozoic (650-750 Ma)",
                    minerals: ["Chromite", "Nickel", "Platinum"],
                    icon: Layers,
                  },
                  {
                    name: "Alkaline Complex",
                    type: "Igneous",
                    age: "Neoproterozoic (550-650 Ma)",
                    minerals: ["Rare Earth", "Niobium", "Tantalum"],
                    icon: Mountain,
                  },
                  {
                    name: "Carbonate Platform",
                    type: "Sedimentary",
                    age: "Mesozoic (65-250 Ma)",
                    minerals: ["Limestone", "Dolomite", "Gypsum"],
                    icon: Layers,
                  },
                ].map((formation, index) => (
                  <motion.div
                    key={formation.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-lg bg-saudi-green-100 flex items-center justify-center">
                            <formation.icon className="w-5 h-5 text-saudi-green-600" />
                          </div>
                          <Badge variant="outline">{formation.type}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-lg mb-2">
                          {formation.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-3">
                          Age: {formation.age}
                        </p>
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Associated Minerals:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {formation.minerals.map((mineral) => (
                              <Badge
                                key={mineral}
                                variant="saudi"
                                className="text-xs"
                              >
                                {mineral}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

