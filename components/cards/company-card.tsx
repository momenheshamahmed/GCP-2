"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Building2, Users, Globe, ArrowRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
  index?: number;
  className?: string;
}

const typeColors: Record<string, string> = {
  "state-owned": "bg-saudi-green-100 text-saudi-green-800",
  private: "bg-blue-100 text-blue-800",
  "joint-venture": "bg-purple-100 text-purple-800",
  international: "bg-orange-100 text-orange-800",
};

export function CompanyCard({ company, index = 0, className }: CompanyCardProps) {
  const activeLicenses = company.licenses?.filter((l) => l.status === "active").length || company.licenses?.length || 0;
  const activeProjects = company.projects?.filter((p) => p.status === "active").length || company.projects?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={cn("group overflow-hidden card-hover", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 rounded-xl border-2 border-saudi-green-100">
              <AvatarImage src={company.logo} alt={company.name} />
              <AvatarFallback className="bg-saudi-green-100 text-saudi-green-700 text-lg font-bold rounded-xl">
                {company.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-saudi-green-600 transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{company.nameAr}</p>
                </div>
                <Badge className={cn(typeColors[company.type])}>
                  {company.type.replace("-", " ")}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {company.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Building2 className="w-4 h-4 mx-auto mb-1 text-saudi-green-500" />
              <p className="text-lg font-bold text-foreground">{company.founded}</p>
              <p className="text-xs text-muted-foreground">Founded</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <Users className="w-4 h-4 mx-auto mb-1 text-saudi-green-500" />
              <p className="text-lg font-bold text-foreground">
                {(company.employees || 0).toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Employees</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <div className="w-4 h-4 mx-auto mb-1 text-saudi-gold-500 text-sm">⛏️</div>
              <p className="text-lg font-bold text-foreground">{activeProjects}</p>
              <p className="text-xs text-muted-foreground">Projects</p>
            </div>
          </div>

          {/* Location & Website */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-saudi-green-500" />
              <span>{company.headquarters}</span>
            </div>
            {company.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-saudi-green-500" />
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-saudi-green-600 hover:underline truncate"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          {/* Licenses Badge */}
          {activeLicenses > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="gold" className="text-xs">
                {activeLicenses} Active License{activeLicenses > 1 ? "s" : ""}
              </Badge>
            </div>
          )}

          {/* Action */}
          <Link href={`/companies/${company.id}`} className="block">
            <Button variant="saudi-outline" className="w-full group/btn">
              View Profile
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}

