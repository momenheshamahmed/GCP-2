"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CommodityType, MineralDeposit, TenderRound } from "@/types";

function formatCommodity(c: CommodityType) {
  return c.replace("-", " ");
}

function statusBadgeVariant(status: string): "default" | "secondary" | "outline" | "gold" {
  if (status === "active" || status === "open") return "default";
  if (status === "awarded") return "gold";
  if (status === "exploration" || status === "upcoming") return "secondary";
  return "outline";
}

export type PopupEntity =
  | { kind: "deposit"; data: MineralDeposit }
  | { kind: "tender"; data: TenderRound };

export interface DepositPopupProps {
  entity: PopupEntity;
}

export function DepositPopup({ entity }: DepositPopupProps) {
  if (entity.kind === "deposit") {
    const d = entity.data;
    return (
      <Card className="border-0 shadow-none w-[280px]">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base leading-tight">{d.name}</CardTitle>
            <Badge variant={statusBadgeVariant(d.status)} className="capitalize">
              {d.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{d.type}</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {d.commodities.map((c) => (
              <Badge key={c} variant="outline" className="capitalize">
                {formatCommodity(c)}
              </Badge>
            ))}
          </div>

          {d.production && (
            <div className="rounded-lg bg-muted/50 p-3">
              <div className="text-xs text-muted-foreground">Production</div>
              <div className="font-semibold">
                {d.production.annual.toLocaleString()} {d.production.unit}
                {d.production.startYear ? (
                  <span className="ml-2 text-xs text-muted-foreground">
                    since {d.production.startYear}
                  </span>
                ) : null}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground">
            Region: <span className="text-foreground">{d.location.region}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const t = entity.data;
  return (
    <Card className="border-0 shadow-none w-[280px]">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="text-base leading-tight">{t.siteName}</CardTitle>
          <Badge variant={statusBadgeVariant(t.status)} className="capitalize">
            {t.status}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">Tender Round {t.round}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {t.commodities.map((c) => (
            <Badge key={c} variant="outline" className="capitalize">
              {formatCommodity(c)}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-muted-foreground">Area</div>
            <div className="font-semibold">{t.areaKm2.toLocaleString()} km²</div>
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <div className="text-muted-foreground">Region</div>
            <div className="font-semibold">{t.region}</div>
          </div>
        </div>

        {t.awardedTo ? (
          <div className="text-xs text-muted-foreground">
            Awarded to: <span className="text-foreground">{t.awardedTo}</span>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}







