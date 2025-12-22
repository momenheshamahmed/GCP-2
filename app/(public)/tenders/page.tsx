"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Search, Filter, Calendar, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TenderCard } from "@/components/cards/tender-card";
import { sampleTenders } from "@/lib/data/sample-data";

const tenderTypes = [
  { value: "all", label: "All Types" },
  { value: "exploration-license", label: "Exploration License" },
  { value: "mining-license", label: "Mining License" },
  { value: "equipment", label: "Equipment" },
  { value: "services", label: "Services" },
  { value: "infrastructure", label: "Infrastructure" },
];

const tenderStatuses = [
  { value: "all", label: "All Statuses" },
  { value: "published", label: "Open" },
  { value: "closed", label: "Closed" },
  { value: "awarded", label: "Awarded" },
];

export default function TendersPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTenders = sampleTenders.filter((tender) => {
    const matchesType =
      selectedType === "all" || tender.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || tender.status === selectedStatus;
    const matchesSearch =
      tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tender.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const openTenders = sampleTenders.filter((t) => t.status === "published").length;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-saudi-green-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                {openTenders} Open Tenders
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mining Tenders
            </h1>
            <p className="text-purple-100 text-lg">
              Browse active tenders for mining licenses, equipment contracts, and
              service agreements. Find opportunities that match your expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="bg-saudi-gold-50 border-b border-saudi-gold-200 py-3">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-saudi-gold-800">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">
              <strong>Deadline Alert:</strong> 2 tenders closing within the next 7
              days. Check deadlines carefully before applying.
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <Card className="mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tenders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Tender Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenderTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenderStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Total Tenders",
                value: sampleTenders.length,
                icon: FileText,
              },
              { label: "Open", value: openTenders, icon: Clock, color: "text-green-600" },
              {
                label: "Closing Soon",
                value: 2,
                icon: AlertCircle,
                color: "text-orange-600",
              },
              {
                label: "Recently Awarded",
                value: 5,
                icon: Calendar,
                color: "text-blue-600",
              },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-3">
                  <stat.icon
                    className={`w-8 h-8 ${stat.color || "text-muted-foreground"}`}
                  />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredTenders.length}
              </span>{" "}
              tenders
            </p>
            <Select defaultValue="deadline">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                <SelectItem value="value">Value (Highest)</SelectItem>
                <SelectItem value="recent">Recently Added</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tenders Grid */}
          {filteredTenders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTenders.map((tender, index) => (
                <TenderCard key={tender.id} tender={tender} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No tenders found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedStatus("all");
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

