"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CellProperties } from "@/lib/api/gdac-backend";
import { formatDistance, getScoreCategory } from "@/lib/api/gdac-backend";

export interface CellDetailsPopupProps {
  cell: CellProperties;
}

export function CellDetailsPopup({ cell }: CellDetailsPopupProps) {
  const scoreCategory = getScoreCategory(cell.score);
  const scorePercentage = (cell.score * 100).toFixed(1);
  const percentileRank = cell.percentile ? Math.round(cell.percentile * 100) : null;

  return (
    <Card className="border-0 shadow-none w-[320px]">
      <div className="p-4 space-y-3">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-semibold text-base">Grid Cell #{cell.id}</h3>
            <Badge
              variant={
                cell.score >= 0.8 ? "destructive" :
                cell.score >= 0.6 ? "default" :
                "outline"
              }
            >
              {scoreCategory}
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Prospectivity Analysis Cell
          </div>
        </div>

        {/* Prospectivity Score */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Prospectivity Score</span>
            <span className="text-lg font-bold text-saudi-green-600">
              {scorePercentage}%
            </span>
          </div>

          {/* Score Bar */}
          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all"
              style={{
                width: `${scorePercentage}%`,
                background: cell.score >= 0.67
                  ? 'linear-gradient(90deg, #fb9200 0%, #dc2626 100%)'
                  : cell.score >= 0.33
                  ? 'linear-gradient(90deg, #eab300 0%, #fb9200 100%)'
                  : 'linear-gradient(90deg, #22c55e 0%, #eab300 100%)',
              }}
            />
          </div>

          {percentileRank !== null && (
            <div className="text-xs text-muted-foreground">
              Better than {percentileRank}% of cells
            </div>
          )}
        </div>

        {/* Geology Information */}
        {cell.dominant_lithology || cell.dominant_unit_code ? (
          <div className="space-y-1 pt-2 border-t">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Geology
            </div>
            {cell.dominant_lithology && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Lithology:</span>
                <span className="font-medium">{cell.dominant_lithology}</span>
              </div>
            )}
            {cell.dominant_unit_code && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit Code:</span>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded">
                  {cell.dominant_unit_code}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="pt-2 border-t">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs">No Geology Data</Badge>
              <span>May be covered or unmapped</span>
            </div>
          </div>
        )}

        {/* Structural Features */}
        <div className="space-y-1 pt-2 border-t">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Structural Features
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">To Fault</div>
              <div className="font-medium">
                {formatDistance(cell.distance_to_fault)}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">To Dike</div>
              <div className="font-medium">
                {formatDistance(cell.distance_to_dike)}
              </div>
            </div>
          </div>
        </div>

        {/* Mineral Occurrences */}
        <div className="space-y-1 pt-2 border-t">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Mineral Occurrences
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-xs text-muted-foreground">Count in Cell</div>
              <div className="font-medium text-lg">
                {cell.mineral_occurrence_count || 0}
              </div>
            </div>

            <div>
              <div className="text-xs text-muted-foreground">To Nearest</div>
              <div className="font-medium">
                {formatDistance(cell.distance_to_mineral)}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details (Collapsible) */}
        {cell.raw_score !== undefined && (
          <div className="pt-2 border-t">
            <details className="group">
              <summary className="text-xs font-medium text-muted-foreground uppercase tracking-wide cursor-pointer hover:text-foreground transition-colors">
                Technical Details
              </summary>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Raw Score:</span>
                  <span className="font-mono text-xs">{cell.raw_score.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Normalized:</span>
                  <span className="font-mono text-xs">{cell.score.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cell ID:</span>
                  <span className="font-mono text-xs">#{cell.id}</span>
                </div>
              </div>
            </details>
          </div>
        )}

        {/* Footer Info */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            1km × 1km analysis grid
          </div>
        </div>
      </div>
    </Card>
  );
}
