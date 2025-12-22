"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Flame } from "lucide-react";

export interface MapLegendProps {
  className?: string;
  visibleLayers: {
    deposits: boolean;
    terranes: boolean;
    regions?: boolean;
    infrastructure: boolean;
    tenders: boolean;
    heatmap?: boolean;
  };
  heatmapMode?: string;
}

const legendItems = [
  { key: "Au", label: "Gold (Au)", color: "#D4AF37" },
  { key: "Cu", label: "Copper (Cu)", color: "#F59E0B" },
  { key: "Zn", label: "Zinc (Zn)", color: "#6B7280" },
  { key: "Fe", label: "Iron (Fe)", color: "#EF4444" },
  { key: "P", label: "Phosphate (P)", color: "#16A34A" },
] as const;

const heatmapGradient = [
  { value: "Low", color: "#313695" },
  { value: "Medium", color: "#fee090" },
  { value: "High", color: "#a50026" },
];

export function MapLegend({ className, visibleLayers, heatmapMode }: MapLegendProps) {
  return (
    <div className={cn("sm-map-control p-2 text-[11px] space-y-2 bg-black/60 backdrop-blur rounded-lg", className)}>
      {/* Deposit markers legend */}
      {visibleLayers.deposits && (
        <div className="grid grid-cols-2 gap-1.5">
          {legendItems.map((item) => (
            <div key={item.key} className="flex items-center gap-1.5">
              <span
                className="h-3 w-3 rounded-full border border-white/60 shadow-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Heatmap legend */}
      {visibleLayers.heatmap && heatmapMode && heatmapMode !== "off" && (
        <div className="border-t border-white/10 pt-2 mt-2">
          <div className="flex items-center gap-1.5 mb-1.5 text-muted-foreground">
            <Flame className="w-3 h-3" />
            <span>
              Heatmap: {heatmapMode === "deposits" ? "Deposit Density" : 
                       heatmapMode === "exploration" ? "Exploration Potential" : 
                       `${heatmapMode.charAt(0).toUpperCase() + heatmapMode.slice(1)} Concentration`}
            </span>
          </div>
          <div className="flex items-center gap-1">
            {heatmapGradient.map((item) => (
              <div key={item.value} className="flex items-center gap-1">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground text-[10px]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regions info */}
      {visibleLayers.regions && (
        <div className="text-muted-foreground border-t border-white/10 pt-2">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#006C35]" />
            <span>13 Administrative Regions</span>
          </div>
          <div className="text-[10px] opacity-70">Click region for details</div>
        </div>
      )}

      {/* Tenders info */}
      {visibleLayers.tenders && (
        <div className="text-muted-foreground border-t border-white/10 pt-2">
          Tenders: pulsing markers (status in popup)
        </div>
      )}

      {/* Data source attribution */}
      <div className="text-[9px] text-muted-foreground/70 border-t border-white/10 pt-1.5">
        Data: Saudi Geological Survey (SGS)
      </div>
    </div>
  );
}


