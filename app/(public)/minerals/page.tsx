"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Gem, Search, Filter, Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MineralCard } from "@/components/cards/mineral-card";
import { sampleMinerals } from "@/lib/data/sample-data";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "precious", label: "Precious Metals" },
  { value: "base", label: "Base Metals" },
  { value: "industrial", label: "Industrial Minerals" },
  { value: "rare-earth", label: "Rare Earth Elements" },
  { value: "energy", label: "Energy Minerals" },
];

export default function MineralsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMinerals = sampleMinerals.filter((mineral) => {
    const matchesCategory =
      selectedCategory === "all" || mineral.category === selectedCategory;
    const matchesSearch =
      mineral.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mineral.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-saudi-gold-500 via-saudi-gold-600 to-saudi-gold-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Gem className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                48+ Mineral Types
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mineral Resources
            </h1>
            <p className="text-white/90 text-lg">
              Discover Saudi Arabia's diverse mineral wealth, from precious metals
              to rare earth elements. Access detailed information on reserves,
              locations, and properties.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search minerals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
              <div className="flex items-center border rounded-lg p-1">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setView("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "saudi" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredMinerals.length}
              </span>{" "}
              minerals
            </p>
            <Select defaultValue="name">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price">Price (High-Low)</SelectItem>
                <SelectItem value="reserves">Reserves</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Minerals Grid */}
          {filteredMinerals.length > 0 ? (
            <div
              className={
                view === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {filteredMinerals.map((mineral, index) => (
                <MineralCard key={mineral.id} mineral={mineral} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Gem className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No minerals found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

