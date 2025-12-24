"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TenderRound } from "@/types";
import { tenderRounds } from "@/lib/data/tenders";
import { cn } from "@/lib/utils";

function statusVariant(status: TenderRound["status"]): "success" | "warning" | "info" | "outline" | "gold" {
  if (status === "open") return "success";
  if (status === "upcoming") return "warning";
  if (status === "awarded") return "gold";
  if (status === "evaluation") return "info";
  return "outline";
}

export function TenderRoundsTable({ className }: { className?: string }) {
  const rows = tenderRounds.slice(0, 8);
  return (
    <div className={cn("relative", className)}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <Badge variant="saudi" className="mb-3">
            Latest Tenders
          </Badge>
          <h3 className="text-2xl md:text-3xl font-bold">Tender rounds & sites</h3>
          <p className="text-muted-foreground mt-1">
            Track open, awarded, and upcoming licensing opportunities.
          </p>
        </div>
        <Link href="/tenders" className="hidden sm:block">
          <Button variant="saudi">View all</Button>
        </Link>
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3 font-semibold">Round</th>
                <th className="px-4 py-3 font-semibold">Site</th>
                <th className="px-4 py-3 font-semibold">Region</th>
                <th className="px-4 py-3 font-semibold">Area</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((t, idx) => (
                <motion.tr
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.04, duration: 0.35 }}
                  className="border-t hover:bg-muted/30"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{t.round}</td>
                  <td className="px-4 py-3 min-w-[240px]">
                    <div className="font-medium">{t.siteName}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.commodities.slice(0, 3).join(", ")}
                      {t.commodities.length > 3 ? "…" : ""}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">{t.region}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{t.areaKm2.toLocaleString()} km²</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge variant={statusVariant(t.status)} className="capitalize">
                      {t.status}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-4 sm:hidden">
        <Link href="/tenders">
          <Button className="w-full" variant="saudi">
            View all tenders
          </Button>
        </Link>
      </div>
    </div>
  );
}






