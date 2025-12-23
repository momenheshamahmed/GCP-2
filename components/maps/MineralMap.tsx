"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Database, Mountain, Map as MapIcon, Satellite, Layers,
  Grid3x3, Webhook, TrendingUp, MapPin
} from "lucide-react";
import { CellDetailsPopup } from "./CellDetailsPopup";
import {
  fetchGridCells,
  fetchGeologyLayer,
  fetchFaultsLayer,
  fetchDikesLayer,
  fetchMineralOccurrences,
  getScoreColor,
  getScoreOpacity,
  type GeoJSONFeatureCollection,
  type CellProperties,
  type GeologyProperties,
  type FaultProperties,
  type DikeProperties,
  type MineralOccurrenceProperties,
} from "@/lib/api/gdac-backend";

// Dynamic imports to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
const ZoomControl = dynamic(() => import("react-leaflet").then((m) => m.ZoomControl), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((m) => m.Polyline), { ssr: false });
const Polygon = dynamic(() => import("react-leaflet").then((m) => m.Polygon), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((m) => m.GeoJSON), { ssr: false });
const LayerGroup = dynamic(() => import("react-leaflet").then((m) => m.LayerGroup), { ssr: false });

type BaseLayer = "terrain" | "satellite";

const TILE_LAYERS: Record<BaseLayer, { name: string; url: string; attribution: string }> = {
  terrain: {
    name: "Terrain",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  satellite: {
    name: "Satellite",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
  },
};

// Map center for the data extent (all map sheets with high-scoring cells)
const MAP_CENTER: [number, number] = [22.18, 41.73];
const DEFAULT_ZOOM = 8;

export interface MineralMapProps {
  className?: string;
  height?: string;
}

export function MineralMap({ className, height = "620px" }: MineralMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [baseLayer, setBaseLayer] = useState<BaseLayer>("terrain");
  const [layers, setLayers] = useState({
    cells: true,
    geology: true,
    faults: true,
    dikes: true,
    minerals: true,
  });

  const [isFullscreen, setIsFullscreen] = useState(false);

  // Hide navbar when in fullscreen mode
  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("map-fullscreen");
    } else {
      document.body.classList.remove("map-fullscreen");
    }
    return () => {
      document.body.classList.remove("map-fullscreen");
    };
  }, [isFullscreen]);

  // Backend data state
  const [cellsData, setCellsData] = useState<GeoJSONFeatureCollection<CellProperties> | null>(null);
  const [geologyData, setGeologyData] = useState<GeoJSONFeatureCollection<GeologyProperties> | null>(null);
  const [faultsData, setFaultsData] = useState<GeoJSONFeatureCollection<FaultProperties> | null>(null);
  const [dikesData, setDikesData] = useState<GeoJSONFeatureCollection<DikeProperties> | null>(null);
  const [mineralsData, setMineralsData] = useState<GeoJSONFeatureCollection<MineralOccurrenceProperties> | null>(null);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      delete (leaflet.default.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  // Fetch all data from backend
  useEffect(() => {
    if (!isClient) return;

    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [cells, geology, faults, dikes, minerals] = await Promise.all([
          fetchGridCells({ min_score: 0.1 }), // Only load cells with score >= 0.1 (low to high prospectivity)
          fetchGeologyLayer({ simplify: 0.001 }),
          fetchFaultsLayer({ simplify: 0.001 }),
          fetchDikesLayer({ simplify: 0.001 }),
          fetchMineralOccurrences(),
        ]);

        setCellsData(cells);
        setGeologyData(geology);
        setFaultsData(faults);
        setDikesData(dikes);
        setMineralsData(minerals);
      } catch (err) {
        console.error("Failed to load geological data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [isClient]);

  const onExport = useCallback(async () => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = `gdac-prospectivity-map-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  }, []);

  // Create mineral marker icon
  const createMineralIcon = useCallback((L: typeof import("leaflet")) => {
    const palmIconSvg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120">
        <g fill="#008f6b">
          <path d="M70 28c-10 0-21 8-23 15 10-4 17-2 23 2 6-4 13-6 23-2-2-7-13-15-23-15z"/>
          <path d="M70 46c-8-6-19-9-30-4 6 7 13 9 20 9l-10 7c7 4 15 5 20 5s13-1 20-5l-10-7c7 0 14-2 20-9-11-5-22-2-30 4z"/>
          <rect x="65" y="55" width="10" height="36" rx="2"/>
        </g>
        <path d="M105 52c18-10 32-10 42-6-6 13-14 22-26 28l-16 8z" fill="#8a5b2c"/>
        <path d="M26 92c-6-6-6-16 0-22l36-36c6-6 16-6 22 0l36 36c6 6 6 16 0 22-6 6-16 6-22 0L70 64 48 86c-6 6-16 6-22 0z" fill="#008f6b" opacity="0.85"/>
      </svg>
    `);

    return L.divIcon({
      className: "",
      html: `<div style="width:32px;height:32px;background:url('data:image/svg+xml,${palmIconSvg}') center/contain no-repeat;"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  }, []);

  if (!isClient || !L) {
    return (
      <div className={cn("relative rounded-2xl border border-border bg-muted/30", className)} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-saudi-green-500 border-t-transparent rounded-full mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Loading map…</div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("relative rounded-2xl border border-border bg-muted/30", className)} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-saudi-green-500 border-t-transparent rounded-full mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Loading geological data from backend...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("relative rounded-2xl border border-border bg-muted/30", className)} style={{ height }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6">
            <div className="text-red-500 mb-2">⚠️ Error loading data</div>
            <div className="text-sm text-muted-foreground mb-4">{error}</div>
            <div className="text-xs text-muted-foreground">
              Make sure the backend is running at http://localhost:8000
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tile = TILE_LAYERS[baseLayer];

  return (
    <div
      className={cn(
        "relative",
        isFullscreen && "fixed inset-0 z-[1200] bg-black/90 p-2 md:p-3",
        className
      )}
    >
      <style jsx global>{`
        /* Hide any provider watermark/logo images that may appear in map controls */
        .leaflet-control-container .leaflet-bottom.leaflet-right img {
          display: none !important;
        }
      `}</style>
      {/* Top controls */}
      <div className="absolute z-[1000] left-3 right-3 top-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between pointer-events-none">
        <div className="pointer-events-auto"></div>

        <div className="pointer-events-auto flex flex-col gap-2 md:items-end">
          <div className="flex justify-end">
            <Button
              size="sm"
              variant={isFullscreen ? "saudi" : "saudi-outline"}
              onClick={() => setIsFullscreen((v) => !v)}
            >
              {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
          <TooltipProvider delayDuration={120}>
            <Card className="sm-map-control p-2 w-fit bg-black/65 backdrop-blur">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-4 h-4 text-muted-foreground" aria-hidden />
                <div className="text-xs text-muted-foreground">Geological Layers</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: "cells", icon: <Grid3x3 className="w-4 h-4" />, label: "Prospectivity Grid" },
                  { key: "geology", icon: <Mountain className="w-4 h-4" />, label: "Geology" },
                  { key: "faults", icon: <Webhook className="w-4 h-4" />, label: "Faults" },
                  { key: "dikes", icon: <TrendingUp className="w-4 h-4" />, label: "Dikes" },
                  { key: "minerals", icon: <MapPin className="w-4 h-4" />, label: "Minerals" },
                ].map((item) => (
                  <Tooltip key={item.key}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={layers[item.key as keyof typeof layers] ? "saudi" : "saudi-outline"}
                        className="h-9 w-9"
                        onClick={() => {
                          setLayers((s) => ({ ...s, [item.key]: !s[item.key as keyof typeof layers] }));
                        }}
                        aria-pressed={layers[item.key as keyof typeof layers]}
                        aria-label={item.label}
                      >
                        {item.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{item.label}</TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                {[
                  { key: "terrain", icon: <MapIcon className="w-4 h-4" />, label: "Terrain" },
                  { key: "satellite", icon: <Satellite className="w-4 h-4" />, label: "Satellite" },
                ].map((item) => (
                  <Tooltip key={item.key}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={baseLayer === item.key ? "saudi" : "saudi-outline"}
                        className="h-9 w-9"
                        onClick={() => setBaseLayer(item.key as BaseLayer)}
                        aria-pressed={baseLayer === item.key}
                        aria-label={item.label}
                      >
                        {item.icon}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">{item.label}</TooltipContent>
                  </Tooltip>
                ))}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="saudi-outline" className="h-9 w-9" onClick={onExport} aria-label="Export PNG">
                      <Badge variant="outline" className="text-[10px] px-1 py-0.5">PNG</Badge>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Export PNG</TooltipContent>
                </Tooltip>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                <Badge variant="outline">{cellsData?.features.length || 0} cells</Badge>
                <Badge variant="outline">{geologyData?.features.length || 0} geology units</Badge>
                <Badge variant="outline">{mineralsData?.features.length || 0} minerals</Badge>
              </div>
            </Card>
          </TooltipProvider>
        </div>
      </div>

      {/* Bottom-left legend */}
      <div className="absolute z-[950] left-3 bottom-3 pointer-events-none">
        <div className="pointer-events-auto">
          <Card className="p-3 bg-black/80 backdrop-blur border-white/10 w-[240px]">
            <div className="text-xs font-medium text-white mb-2">Prospectivity Score</div>
            <div className="space-y-1">
              {[
                { label: "Very High (80-100%)", color: "#dc2626" },
                { label: "High (60-80%)", color: "#fb9200" },
                { label: "Medium (40-60%)", color: "#eab300" },
                { label: "Low (20-40%)", color: "#84cc16" },
                { label: "Very Low (0-20%)", color: "#22c55e" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded border border-white/20"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[10px] text-white/80">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <Mountain className="w-3 h-3 text-white/60" />
                <span className="text-[10px] text-white/80">Geology Units</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-[#D4AF37]" />
                <span className="text-[10px] text-white/80">Mineral Occurrences</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className={cn("rounded-2xl overflow-hidden border border-border", isFullscreen && "h-[calc(100vh-1rem)]")}
        style={{ height: isFullscreen ? undefined : height }}
      >
        <MapContainer
          center={MAP_CENTER}
          zoom={DEFAULT_ZOOM}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer url={tile.url} attribution={tile.attribution} />
          <ZoomControl position="bottomright" />

          {/* Geology Layer */}
          {layers.geology && geologyData && (
            <GeoJSON
              key="geology"
              data={geologyData}
              style={() => ({
                fillColor: "#8B7355",
                fillOpacity: 0.3,
                color: "#6B5744",
                weight: 1,
              })}
              onEachFeature={(feature, layer) => {
                const props = feature.properties as GeologyProperties;
                layer.bindPopup(`
                  <div class="p-2">
                    <div class="font-semibold">${props.lithology}</div>
                    <div class="text-xs text-gray-600">Unit: ${props.unit_code}</div>
                    <div class="text-xs text-gray-600">Age: ${props.age}</div>
                  </div>
                `);
              }}
            />
          )}

          {/* Faults Layer */}
          {layers.faults && faultsData && (
            <GeoJSON
              key="faults"
              data={faultsData}
              style={() => ({
                color: "#EF4444",
                weight: 2,
                opacity: 0.8,
              })}
              onEachFeature={(feature, layer) => {
                const props = feature.properties as FaultProperties;
                layer.bindPopup(`
                  <div class="p-2">
                    <div class="font-semibold">Fault/Contact</div>
                    <div class="text-xs text-gray-600">Type: ${props.fault_type}</div>
                  </div>
                `);
              }}
            />
          )}

          {/* Dikes Layer */}
          {layers.dikes && dikesData && (
            <GeoJSON
              key="dikes"
              data={dikesData}
              style={() => ({
                color: "#7C3AED",
                weight: 2,
                opacity: 0.8,
                dashArray: "5, 5",
              })}
              onEachFeature={(feature, layer) => {
                const props = feature.properties as DikeProperties;
                layer.bindPopup(`
                  <div class="p-2">
                    <div class="font-semibold">Dike</div>
                    <div class="text-xs text-gray-600">Type: ${props.dike_type}</div>
                    <div class="text-xs text-gray-600">Composition: ${props.composition}</div>
                  </div>
                `);
              }}
            />
          )}

          {/* Prospectivity Grid Cells */}
          {layers.cells && cellsData && (
            <GeoJSON
              key="cells"
              data={cellsData}
              style={(feature) => {
                const props = feature?.properties as CellProperties;
                return {
                  fillColor: getScoreColor(props.score),
                  fillOpacity: getScoreOpacity(props.score),
                  color: getScoreColor(props.score),
                  weight: 1,
                  opacity: 0.6,
                };
              }}
              onEachFeature={(feature, layer) => {
                const props = feature.properties as CellProperties;

                // Create popup container
                const popupDiv = document.createElement("div");

                // Render React component to string (simplified approach)
                // In production, you'd use ReactDOM.render or a portal
                layer.bindPopup(popupDiv, { 
                  maxWidth: 350,
                  className: "custom-cell-popup"
                });

                layer.on("popupopen", () => {
                  // Dynamically import and render the popup component
                  import("react-dom/client").then(({ createRoot }) => {
                    const root = createRoot(popupDiv);
                    root.render(<CellDetailsPopup cell={props} />);
                  });
                });
              }}
            />
          )}

          {/* Mineral Occurrences */}
          {layers.minerals && mineralsData && (
            <LayerGroup>
              {mineralsData.features.map((feature) => {
                const props = feature.properties as MineralOccurrenceProperties;
                const coords = feature.geometry.coordinates as [number, number];

                return (
                  <Marker
                    key={feature.id}
                    position={[coords[1], coords[0]]} // GeoJSON is [lng, lat], Leaflet is [lat, lng]
                    icon={createMineralIcon(L)}
                  >
                    <Popup className="custom-mineral-popup">
                      <Card className="border-0 shadow-none w-[280px]">
                        <div className="p-3 space-y-2">
                          <div>
                            <div className="font-semibold text-base">{props.name}</div>
                            <Badge variant="gold" className="mt-1">{props.commodity}</Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Deposit Type:</span>
                              <span className="font-medium">{props.deposit_type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Status:</span>
                              <span className="font-medium capitalize">{props.status}</span>
                            </div>
                          </div>
                          {props.description && (
                            <div className="text-xs text-muted-foreground pt-2 border-t">
                              {props.description}
                            </div>
                          )}
                        </div>
                      </Card>
                    </Popup>
                  </Marker>
                );
              })}
            </LayerGroup>
          )}
        </MapContainer>
      </div>
    </div>
  );
}
