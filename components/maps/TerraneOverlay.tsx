"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import type { FeatureCollection, Geometry } from "geojson";

type LeafletGeoJSONProps = {
  data: FeatureCollection<Geometry, { id: string; name: string; type: string }>;
  style?: (feature?: { properties?: { type?: string } }) => Record<string, unknown>;
  onEachFeature?: (feature: unknown, layer: unknown) => void;
};

const GeoJSON = dynamic(
  () => import("react-leaflet").then((mod) => mod.GeoJSON),
  { ssr: false }
);

const TERRANE_STYLES: Record<
  string,
  { fillColor: string; color: string; fillOpacity: number; weight: number }
> = {
  arc: { fillColor: "#006C35", color: "#006C35", fillOpacity: 0.08, weight: 2 },
  ophiolite: { fillColor: "#7C3AED", color: "#5B21B6", fillOpacity: 0.08, weight: 2 },
  sedimentary: { fillColor: "#16A34A", color: "#15803D", fillOpacity: 0.08, weight: 2 },
  volcanic: { fillColor: "#DC2626", color: "#991B1B", fillOpacity: 0.08, weight: 2 },
  metamorphic: { fillColor: "#334155", color: "#334155", fillOpacity: 0.08, weight: 2 },
  plutonic: { fillColor: "#0EA5E9", color: "#0369A1", fillOpacity: 0.08, weight: 2 },
};

export interface TerraneOverlayProps {
  geojson: FeatureCollection<Geometry, { id: string; name: string; type: string }>;
  onTerraneClick?: (terrane: { id: string; name: string; type: string }) => void;
}

export function TerraneOverlay({ geojson, onTerraneClick }: TerraneOverlayProps) {
  const style = useMemo(() => {
    return (feature?: { properties?: { type?: string } }) => {
      const type = feature?.properties?.type || "arc";
      return TERRANE_STYLES[type] || TERRANE_STYLES.arc;
    };
  }, []);

  const onEachFeature = useMemo(() => {
    return (feature: unknown, layer: unknown) => {
      const f = feature as { properties?: { id: string; name: string; type: string } };
      const l = layer as { on?: (handlers: Record<string, () => void>) => void };
      if (!f?.properties || !l?.on) return;
      l.on({
        click: () => onTerraneClick?.(f.properties!),
      });
    };
  }, [onTerraneClick]);

  return <GeoJSON data={geojson as unknown as LeafletGeoJSONProps["data"]} style={style} onEachFeature={onEachFeature} />;
}






