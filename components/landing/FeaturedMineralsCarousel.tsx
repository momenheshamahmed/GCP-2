"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const minerals = [
  { code: "Au", name: "Gold", color: "from-[#D4AF37] to-[#F5D27A]" },
  { code: "Cu", name: "Copper", color: "from-[#F59E0B] to-[#FBBF24]" },
  { code: "Zn", name: "Zinc", color: "from-[#6B7280] to-[#9CA3AF]" },
  { code: "Al", name: "Aluminium (Bauxite)", color: "from-[#0EA5E9] to-[#38BDF8]" },
  { code: "P", name: "Phosphate", color: "from-[#16A34A] to-[#22C55E]" },
  { code: "REE", name: "Rare Earth Elements", color: "from-[#7C3AED] to-[#A78BFA]" },
] as const;

export function FeaturedMineralsCarousel({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <Badge variant="gold" className="mb-3">
            Featured Minerals
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold">Strategic commodities</h3>
          <p className="text-muted-foreground mt-1">
            High-demand minerals powering global supply chains and Vision 2030.
          </p>
        </div>
        <Link href="/minerals" className="hidden sm:block">
          <Button variant="saudi-outline">Explore all</Button>
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 min-w-max pr-2 snap-x snap-mandatory">
          {minerals.map((m, i) => (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="snap-start"
            >
              <Card className="w-[240px] md:w-[280px] overflow-hidden card-hover">
                <div className={cn("h-20 bg-gradient-to-br", m.color)} />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-lg font-semibold">{m.name}</div>
                    <Badge variant="outline">{m.code}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Explore deposits, production, and investment potential.
                  </p>
                  <Link href="/minerals" className="inline-block mt-4">
                    <Button size="sm" variant="saudi">
                      View insights
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}




