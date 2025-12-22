"use client";

import { useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import type L from "leaflet";

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

export interface HeatmapLayerProps {
  points: HeatmapPoint[];
  radius?: number;
  blur?: number;
  maxZoom?: number;
  max?: number;
  minOpacity?: number;
  gradient?: Record<number, string>;
}

// Default gradient for mineral exploration
const DEFAULT_GRADIENT = {
  0.0: "#313695",
  0.2: "#4575b4",
  0.4: "#74add1",
  0.5: "#abd9e9",
  0.6: "#fee090",
  0.7: "#fdae61",
  0.8: "#f46d43",
  0.9: "#d73027",
  1.0: "#a50026",
};

// Heat layer instance type - leaflet.heat doesn't export proper types
interface HeatLayerMethods {
  addTo: (map: unknown) => void;
  setLatLngs: (data: [number, number, number][]) => void;
}

export function HeatmapLayer({
  points,
  radius = 25,
  blur = 15,
  maxZoom = 10,
  max = 1.0,
  minOpacity = 0.3,
  gradient = DEFAULT_GRADIENT,
}: HeatmapLayerProps) {
  const map = useMap();
  const heatLayerRef = useRef<HeatLayerMethods | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load leaflet.heat on mount
  useEffect(() => {
    let mounted = true;
    
    const loadHeatPlugin = async () => {
      if (typeof window === "undefined") return;
      
      try {
        // Import leaflet.heat which extends L with heatLayer function
        await import("leaflet.heat");
        if (mounted) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to load leaflet.heat:", error);
      }
    };

    loadHeatPlugin();

    return () => {
      mounted = false;
    };
  }, []);

  // Create/update heatmap layer
  useEffect(() => {
    if (!map || !isLoaded || points.length === 0) return;
    if (typeof window === "undefined") return;

    // Access L from window since leaflet.heat extends it globally
    const L = (window as unknown as { L?: { heatLayer?: (data: [number, number, number][], options: object) => HeatLayerMethods } }).L;
    
    if (!L || !L.heatLayer) {
      console.warn("leaflet.heat not available");
      return;
    }

    // Remove existing layer if any
    if (heatLayerRef.current) {
      map.removeLayer(heatLayerRef.current as unknown as L.Layer);
      heatLayerRef.current = null;
    }

    // Convert points to heatmap format [lat, lng, intensity]
    const heatData: [number, number, number][] = points.map((p) => [
      p.lat,
      p.lng,
      p.intensity,
    ]);

    // Create heatmap layer
    const heatLayer = L.heatLayer(heatData, {
      radius,
      blur,
      maxZoom,
      max,
      minOpacity,
      gradient,
    });

    heatLayer.addTo(map);
    heatLayerRef.current = heatLayer;

    // Cleanup
    return () => {
      if (heatLayerRef.current && map) {
        try {
          map.removeLayer(heatLayerRef.current as unknown as L.Layer);
        } catch {
          // Layer may already be removed
        }
        heatLayerRef.current = null;
      }
    };
  }, [map, isLoaded, points, radius, blur, maxZoom, max, minOpacity, gradient]);

  return null;
}

// Predefined gradient themes
export const HEATMAP_GRADIENTS = {
  default: DEFAULT_GRADIENT,
  gold: {
    0.0: "#1a1a2e",
    0.3: "#4a4e69",
    0.5: "#9a8c98",
    0.7: "#c9ada7",
    0.85: "#f2cc8f",
    1.0: "#d4af37",
  },
  copper: {
    0.0: "#1e3a5f",
    0.3: "#3d5a80",
    0.5: "#98c1d9",
    0.7: "#ee6c4d",
    0.85: "#e07020",
    1.0: "#b87333",
  },
  exploration: {
    0.0: "#0d1b2a",
    0.2: "#1b263b",
    0.4: "#415a77",
    0.6: "#778da9",
    0.75: "#22c55e",
    0.9: "#16a34a",
    1.0: "#006c35",
  },
  phosphate: {
    0.0: "#f0f9ff",
    0.3: "#bae6fd",
    0.5: "#7dd3fc",
    0.7: "#38bdf8",
    0.85: "#22c55e",
    1.0: "#16a34a",
  },
  rareEarth: {
    0.0: "#faf5ff",
    0.2: "#e9d5ff",
    0.4: "#c084fc",
    0.6: "#a855f7",
    0.8: "#7c3aed",
    1.0: "#5b21b6",
  },
};
