"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMap } from "react-leaflet";
import type { FeatureCollection, Polygon } from "geojson";
import type { SaudiRegionProperties } from "@/lib/data/saudi-regions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const GeoJSON = dynamic(() => import("react-leaflet").then((m) => m.GeoJSON), {
  ssr: false,
});

const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});

const Tooltip = dynamic(() => import("react-leaflet").then((m) => m.Tooltip), {
  ssr: false,
});

// Region color scheme based on mineral potential
const REGION_COLORS: Record<string, string> = {
  riyadh: "#006C35",
  makkah: "#D4AF37",
  madinah: "#16A34A",
  eastern: "#0EA5E9",
  qassim: "#7C3AED",
  asir: "#F59E0B",
  tabuk: "#EF4444",
  hail: "#8B5CF6",
  "northern-borders": "#334155",
  jazan: "#DC2626",
  najran: "#14B8A6",
  "al-bahah": "#22C55E",
  "al-jawf": "#F97316",
};

export interface KSARegionsOverlayProps {
  geojson: FeatureCollection<Polygon, SaudiRegionProperties>;
  showLabels?: boolean;
  showCapitals?: boolean;
  onRegionClick?: (region: SaudiRegionProperties) => void;
  selectedRegion?: string | null;
  interactive?: boolean;
}

export function KSARegionsOverlay({
  geojson,
  showLabels = true,
  showCapitals = true,
  onRegionClick,
  selectedRegion,
  interactive = true,
}: KSARegionsOverlayProps) {
  const map = useMap();
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
    });
  }, []);

  // Style function for regions
  const style = useCallback(
    (feature?: { properties?: SaudiRegionProperties }) => {
      const regionId = feature?.properties?.id || "";
      const isHovered = hoveredRegion === regionId;
      const isSelected = selectedRegion === regionId;
      const color = REGION_COLORS[regionId] || "#006C35";

      return {
        fillColor: color,
        color: isSelected ? "#D4AF37" : isHovered ? "#FFFFFF" : color,
        weight: isSelected ? 3 : isHovered ? 2.5 : 1.5,
        opacity: 1,
        fillOpacity: isSelected ? 0.4 : isHovered ? 0.3 : 0.15,
        dashArray: isSelected ? undefined : "4 4",
      };
    },
    [hoveredRegion, selectedRegion]
  );

  // Event handlers for each feature
  const onEachFeature = useCallback(
    (feature: unknown, layer: unknown) => {
      const f = feature as { properties?: SaudiRegionProperties };
      const l = layer as {
        on?: (handlers: Record<string, (e?: unknown) => void>) => void;
        setStyle?: (style: Record<string, unknown>) => void;
        bindTooltip?: (
          content: string,
          options: Record<string, unknown>
        ) => void;
      };

      if (!f?.properties || !l?.on) return;

      const props = f.properties;

      // Bind tooltip
      if (showLabels && l.bindTooltip) {
        l.bindTooltip(
          `<div class="text-center">
            <div class="font-semibold">${props.name}</div>
            <div class="text-xs text-muted-foreground">${props.nameAr}</div>
          </div>`,
          {
            permanent: false,
            direction: "center",
            className: "region-tooltip",
          }
        );
      }

      if (interactive) {
        l.on({
          mouseover: () => {
            setHoveredRegion(props.id);
            if (l.setStyle) {
              l.setStyle({
                fillOpacity: 0.35,
                weight: 2.5,
                color: "#FFFFFF",
              });
            }
          },
          mouseout: () => {
            setHoveredRegion(null);
            if (l.setStyle) {
              const color = REGION_COLORS[props.id] || "#006C35";
              const isSelected = selectedRegion === props.id;
              l.setStyle({
                fillOpacity: isSelected ? 0.4 : 0.15,
                weight: isSelected ? 3 : 1.5,
                color: isSelected ? "#D4AF37" : color,
              });
            }
          },
          click: () => {
            onRegionClick?.(props);
            // Zoom to region bounds
            const bounds = (layer as { getBounds?: () => L.LatLngBounds })
              .getBounds?.();
            if (bounds) {
              map.fitBounds(bounds, { padding: [50, 50] });
            }
          },
        });
      }
    },
    [interactive, map, onRegionClick, selectedRegion, showLabels]
  );

  // Create capital markers
  const capitalMarkers = useMemo(() => {
    if (!showCapitals || !L) return null;

    return geojson.features.map((feature) => {
      const props = feature.properties;
      const [lat, lng] = props.capitalCoords;

      const icon = L.divIcon({
        className: "",
        html: `
          <div class="capital-marker">
            <div class="capital-dot" style="background: ${REGION_COLORS[props.id] || "#006C35"}"></div>
            <div class="capital-label">${props.capital}</div>
          </div>
        `,
        iconSize: [80, 30],
        iconAnchor: [40, 15],
      });

      return (
        <Marker key={props.id} position={[lat, lng]} icon={icon}>
          <Tooltip direction="top" offset={[0, -10]} className="capital-tooltip">
            <Card className="p-2 border-0 shadow-lg bg-background/95 backdrop-blur">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: REGION_COLORS[props.id] }}
                  />
                  <span className="font-semibold text-sm">{props.capital}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {props.capitalAr}
                </div>
                <div className="flex gap-1 pt-1">
                  <Badge variant="outline" className="text-[10px]">
                    {props.area.toLocaleString()} km²
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">
                    {(props.population / 1000000).toFixed(1)}M pop
                  </Badge>
                </div>
              </div>
            </Card>
          </Tooltip>
        </Marker>
      );
    });
  }, [L, geojson.features, showCapitals]);

  return (
    <>
      <GeoJSON
        key={`regions-${hoveredRegion}-${selectedRegion}`}
        data={
          geojson as unknown as FeatureCollection<
            Polygon,
            { id: string; name: string; type: string }
          >
        }
        style={
          style as (
            feature?: { properties?: { type?: string } }
          ) => Record<string, unknown>
        }
        onEachFeature={
          onEachFeature as (feature: unknown, layer: unknown) => void
        }
      />
      {capitalMarkers}

      {/* Add custom CSS for markers */}
      <style jsx global>{`
        .capital-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
        }
        .capital-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        .capital-label {
          font-size: 10px;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8), 0 0 8px rgba(0, 0, 0, 0.5);
          margin-top: 2px;
          white-space: nowrap;
        }
        .region-tooltip {
          background: rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          color: white !important;
          font-size: 12px !important;
        }
        .region-tooltip::before {
          border-top-color: rgba(0, 0, 0, 0.8) !important;
        }
        .capital-tooltip .leaflet-tooltip-content {
          margin: 0 !important;
        }
      `}</style>
    </>
  );
}
