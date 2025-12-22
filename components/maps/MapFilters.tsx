"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CommodityType, SaudiRegion } from "@/types";
import { SAUDI_REGIONS } from "@/types";
import { cn } from "@/lib/utils";

export interface MapFiltersState {
  region: SaudiRegion | "all";
  commodities: CommodityType[];
}

export interface MapFiltersProps {
  className?: string;
  value: MapFiltersState;
  onChange: (next: MapFiltersState) => void;
  availableCommodities: CommodityType[];
  onZoomToRegion?: () => void;
  onClear?: () => void;
}

function labelCommodity(c: CommodityType) {
  return c.replace("-", " ");
}

export function MapFilters({
  className,
  value,
  onChange,
  availableCommodities,
  onZoomToRegion,
  onClear,
}: MapFiltersProps) {
  const regions = useMemo(() => {
    return (Object.keys(SAUDI_REGIONS) as SaudiRegion[]).sort((a, b) => a.localeCompare(b));
  }, []);

  const isSelected = (c: CommodityType) => value.commodities.includes(c);

  return (
    <Card className={cn("sm-map-control p-2 shadow-lg", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-semibold">Filters</div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="saudi-outline" onClick={onClear} className="h-7 px-2 text-xs">
            Clear
          </Button>
          <Button size="sm" variant="saudi" onClick={onZoomToRegion} disabled={value.region === "all"} className="h-7 px-2 text-xs">
            Zoom
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3">
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Region</div>
          <Select
            value={value.region}
            onValueChange={(v) => onChange({ ...value, region: v as SaudiRegion | "all" })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent className="z-[9999]">
              <SelectItem value="all">All regions</SelectItem>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Commodities</div>
          <ScrollArea className="h-[120px] rounded-lg border border-border bg-background/50">
            <div className="p-2 space-y-1">
              {availableCommodities.map((c) => (
                <label key={c} className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 hover:bg-muted/60">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[#006C35]"
                      checked={isSelected(c)}
                      onChange={(e) => {
                        const next = e.target.checked
                          ? [...value.commodities, c]
                          : value.commodities.filter((x) => x !== c);
                        onChange({ ...value, commodities: next });
                      }}
                    />
                    <span className="text-sm capitalize">{labelCommodity(c)}</span>
                  </div>
                  {isSelected(c) ? (
                    <Badge variant="outline" className="text-[10px]">
                      On
                    </Badge>
                  ) : null}
                </label>
              ))}
            </div>
          </ScrollArea>

          <div className="flex flex-wrap gap-1.5">
            {value.commodities.slice(0, 6).map((c) => (
              <Badge key={c} variant="outline" className="capitalize">
                {labelCommodity(c)}
              </Badge>
            ))}
            {value.commodities.length > 6 ? (
              <Badge variant="outline">+{value.commodities.length - 6}</Badge>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}


