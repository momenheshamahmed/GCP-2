"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Search, Filter, Users, Globe, MapPin } from "lucide-react";
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
import { CompanyCard } from "@/components/cards/company-card";
import { StatCard } from "@/components/cards/stat-card";
import { sampleCompanies } from "@/lib/data/sample-data";

const companyTypes = [
  { value: "all", label: "All Types" },
  { value: "state-owned", label: "State-Owned" },
  { value: "private", label: "Private" },
  { value: "joint-venture", label: "Joint Venture" },
  { value: "international", label: "International" },
];

export default function CompaniesPage() {
  const [selectedType, setSelectedType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCompanies = sampleCompanies.filter((company) => {
    const matchesType =
      selectedType === "all" || company.type === selectedType;
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalEmployees = sampleCompanies.reduce(
    (sum, c) => sum + (c.employees || 0),
    0
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-600 via-cyan-700 to-saudi-green-800 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge className="bg-white/20 text-white border-none">
                156 Companies
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Mining Companies
            </h1>
            <p className="text-cyan-100 text-lg">
              Connect with leading mining companies operating in Saudi Arabia.
              From state-owned enterprises to international operators, find
              partnership and investment opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              title="Total Companies"
              value="156"
              description="Registered operators"
              icon={Building2}
              delay={0}
            />
            <StatCard
              title="Total Employees"
              value="85K+"
              description="Direct employment"
              icon={Users}
              variant="saudi"
              delay={0.1}
            />
            <StatCard
              title="International"
              value="34"
              description="Foreign companies"
              icon={Globe}
              variant="gold"
              delay={0.2}
            />
            <StatCard
              title="Regions"
              value="13"
              description="Operating areas"
              icon={MapPin}
              delay={0.3}
            />
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
                    placeholder="Search companies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full lg:w-[200px]">
                    <SelectValue placeholder="Company Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
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

          {/* Type Pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {companyTypes.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "saudi" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>

          {/* Results */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filteredCompanies.length}
              </span>{" "}
              companies
            </p>
            <Select defaultValue="name">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="employees">Employees (Most)</SelectItem>
                <SelectItem value="founded">Founded (Newest)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Companies Grid */}
          {filteredCompanies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company, index) => (
                <CompanyCard key={company.id} company={company} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No companies found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Company */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <Badge variant="gold" className="mb-4">
              Featured Company
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Ma'aden</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Saudi Arabian Mining Company (Ma'aden) is the largest
              multi-commodity mining and metals company in the Middle East
            </p>
          </motion.div>

          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-4xl font-bold text-saudi-green-600">
                    20,000+
                  </p>
                  <p className="text-muted-foreground">Employees</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-saudi-gold-600">15+</p>
                  <p className="text-muted-foreground">Active Operations</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600">$125B+</p>
                  <p className="text-muted-foreground">Market Cap</p>
                </div>
              </div>
              <div className="mt-8 text-center">
                <Button variant="saudi" size="lg">
                  View Company Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-saudi-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Register Your Company</h2>
            <p className="text-saudi-green-200 mb-8 max-w-2xl mx-auto">
              Are you a mining company looking to operate in Saudi Arabia? Register
              on our platform to access opportunities and connect with partners.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="gold">
                Register Company
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                Learn Requirements
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

