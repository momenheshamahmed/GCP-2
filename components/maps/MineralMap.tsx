"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { useMap } from "react-leaflet";
import type { CommodityType, MineralDeposit, SaudiRegion, TenderRound } from "@/types";
import { mineralDeposits } from "@/lib/data/minerals";
import { tenderRounds } from "@/lib/data/tenders";
import { miningInfrastructure } from "@/lib/data/infrastructure";
import { terraneBoundaries } from "@/lib/data/terrane-boundaries";
import { saudiRegionsGeoJSON } from "@/lib/data/saudi-regions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapFilters, type MapFiltersState } from "./MapFilters";
import { MapLegend } from "./MapLegend";
import { DepositPopup, type PopupEntity } from "./DepositPopup";
import { TerraneOverlay } from "./TerraneOverlay";
import { HEATMAP_GRADIENTS, type HeatmapPoint } from "./HeatmapLayer";
import { SGSDataPanel } from "./SGSDataPanel";
import { generateHeatmapData, generateExplorationHeatmap, getCommodityHeatmap } from "@/lib/api/geological-api";

// Dynamic import for HeatmapLayer to avoid SSR issues with leaflet.heat
const HeatmapLayer = dynamic(
  () => import("./HeatmapLayer").then((m) => m.HeatmapLayer),
  { ssr: false }
);

// Dynamic import for KSARegionsOverlay
const KSARegionsOverlay = dynamic(
  () => import("./KSARegionsOverlay").then((m) => m.KSARegionsOverlay),
  { ssr: false }
);
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Database, Mountain, Construction, RadioTower, Map as MapIcon, Satellite, Layers, Flame, Info, Globe } from "lucide-react";

// Dynamic imports to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });
const ZoomControl = dynamic(() => import("react-leaflet").then((m) => m.ZoomControl), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((m) => m.Polyline), { ssr: false });
const Polygon = dynamic(() => import("react-leaflet").then((m) => m.Polygon), { ssr: false });
const LayerGroup = dynamic(() => import("react-leaflet").then((m) => m.LayerGroup), { ssr: false });
const MarkerClusterGroup = dynamic(() => import("react-leaflet-cluster").then((m) => m.default), { ssr: false });

type BaseLayer = "terrain" | "satellite";
type HeatmapMode = "off" | "deposits" | "exploration" | "gold" | "copper" | "phosphate";

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

const HEATMAP_MODES: { key: HeatmapMode; label: string; gradient: keyof typeof HEATMAP_GRADIENTS }[] = [
  { key: "off", label: "Off", gradient: "default" },
  { key: "deposits", label: "All Deposits", gradient: "default" },
  { key: "exploration", label: "Exploration Potential", gradient: "exploration" },
  { key: "gold", label: "Gold", gradient: "gold" },
  { key: "copper", label: "Copper", gradient: "copper" },
  { key: "phosphate", label: "Phosphate", gradient: "phosphate" },
];

const SAUDI_CENTER: [number, number] = [23.8859, 45.0792];
const SAUDI_OUTLINE: [number, number][] = [
  [32.154, 35.719],
  [31.026, 37.998],
  [29.357, 36.068],
  [27.623, 35.114],
  [26.114, 36.160],
  [24.858, 37.483],
  [22.994, 39.195],
  [21.993, 38.787],
  [20.837, 39.139],
  [19.486, 40.501],
  [18.616, 41.942],
  [17.464, 42.774],
  [17.257, 44.098],
  [17.418, 45.396],
  [17.934, 46.758],
  [18.263, 47.698],
  [20.014, 48.567],
  [21.422, 49.135],
  [24.121, 50.113],
  [26.066, 50.809],
  [27.854, 50.463],
  [28.971, 49.116],
  [30.059, 47.977],
  [31.400, 46.568],
  [32.009, 44.994],
  [31.754, 41.889],
  [32.154, 35.719],
];

// Coarse region bounds (lat/lng)
const REGION_BOUNDS: Record<SaudiRegion, [[number, number], [number, number]]> = {
  "Riyadh": [[19.0, 41.5], [27.5, 49.5]],
  "Makkah": [[18.5, 38.0], [23.5, 42.5]],
  "Madinah": [[22.0, 37.0], [27.5, 41.5]],
  "Eastern Province": [[20.0, 47.0], [30.5, 55.5]],
  "Qassim": [[23.5, 41.0], [28.5, 46.0]],
  "Asir": [[16.5, 41.5], [21.5, 44.5]],
  "Tabuk": [[26.0, 34.0], [31.5, 39.5]],
  "Hail": [[25.0, 39.0], [29.5, 44.5]],
  "Northern Borders": [[28.0, 36.0], [32.5, 45.0]],
  "Jazan": [[16.0, 41.5], [18.5, 43.5]],
  "Najran": [[16.0, 43.0], [19.5, 47.0]],
  "Al Bahah": [[18.5, 40.0], [20.8, 42.5]],
  "Al Jawf": [[28.5, 37.0], [32.5, 42.5]],
};

function commodityColor(commodities: CommodityType[]) {
  // Priority mapping per requested legend: Au, Cu, Zn, Fe, P
  if (commodities.includes("gold")) return "#D4AF37";
  if (commodities.includes("copper")) return "#F59E0B";
  if (commodities.includes("zinc")) return "#6B7280";
  if (commodities.includes("iron")) return "#EF4444";
  if (commodities.includes("phosphate")) return "#16A34A";
  return "#006C35";
}

function tenderColor(status: string) {
  if (status === "open") return "#006C35";
  if (status === "upcoming") return "#D4AF37";
  if (status === "awarded") return "#0EA5E9";
  if (status === "evaluation") return "#7C3AED";
  return "#6B7280";
}

function createDepositIcon(L: typeof import("leaflet"), color: string) {
  return L.divIcon({
    className: "",
    html: `<div class="deposit-marker" style="background:${color}"></div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34],
  });
}

function createTenderIcon(L: typeof import("leaflet"), color: string, animate: boolean) {
  if (animate) {
    return L.divIcon({
      className: "",
      html: `<div class="tender-pulse" style="--pulse:${color}"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
      popupAnchor: [0, -14],
    });
  }
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;border-radius:9999px;background:${color};border:2px solid white;box-shadow:0 6px 18px rgba(0,0,0,.25)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7],
  });
}

function createInfrastructureIcon(L: typeof import("leaflet"), color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:18px;height:18px;border-radius:6px;background:${color};border:2px solid white;box-shadow:0 6px 18px rgba(0,0,0,.25)"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -9],
  });
}

function MapZoomController({ region }: { region: SaudiRegion | "all" }) {
  const map = useMap();
  useEffect(() => {
    if (region === "all") {
      map.setView(SAUDI_CENTER, 5);
      return;
    }
    const bounds = REGION_BOUNDS[region];
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [map, region]);
  return null;
}

export interface MineralMapProps {
  className?: string;
  height?: string;
}

export function MineralMap({ className, height = "620px" }: MineralMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  const [baseLayer, setBaseLayer] = useState<BaseLayer>("terrain");
  const [layers, setLayers] = useState({
    deposits: true,
    terranes: true,
    regions: true,
    infrastructure: false,
    tenders: true,
    heatmap: false,
  });
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>("deposits");

  const [filters, setFilters] = useState<MapFiltersState>({
    region: "all",
    commodities: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [showHeatmapOptions, setShowHeatmapOptions] = useState(false);
  const [showDataSource, setShowDataSource] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      // Fix default marker icon paths
      delete (leaflet.default.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  const availableCommodities = useMemo(() => {
    const set = new Set<CommodityType>();
    mineralDeposits.forEach((d) => d.commodities.forEach((c) => set.add(c)));
    tenderRounds.forEach((t) => t.commodities.forEach((c) => set.add(c)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredDeposits = useMemo(() => {
    return mineralDeposits.filter((d) => {
      const regionOk = filters.region === "all" ? true : d.location.region === filters.region;
      const commodityOk =
        filters.commodities.length === 0 ? true : d.commodities.some((c) => filters.commodities.includes(c));
      return regionOk && commodityOk;
    });
  }, [filters]);

  const filteredTenders = useMemo(() => {
    return tenderRounds.filter((t) => {
      const regionOk = filters.region === "all" ? true : t.region === filters.region;
      const commodityOk =
        filters.commodities.length === 0 ? true : t.commodities.some((c) => filters.commodities.includes(c));
      return regionOk && commodityOk;
    });
  }, [filters]);

  const infrastructure = useMemo(() => {
    return miningInfrastructure.filter((i) => {
      const regionOk = filters.region === "all" ? true : i.location.region === filters.region;
      return regionOk;
    });
  }, [filters.region]);

  // Heatmap data based on selected mode
  const heatmapData = useMemo((): HeatmapPoint[] => {
    if (!layers.heatmap || heatmapMode === "off") return [];
    
    switch (heatmapMode) {
      case "deposits":
        return generateHeatmapData(filteredDeposits);
      case "exploration":
        return generateExplorationHeatmap();
      case "gold":
        return getCommodityHeatmap(mineralDeposits, "gold");
      case "copper":
        return getCommodityHeatmap(mineralDeposits, "copper");
      case "phosphate":
        return getCommodityHeatmap(mineralDeposits, "phosphate");
      default:
        return [];
    }
  }, [layers.heatmap, heatmapMode, filteredDeposits]);

  const currentHeatmapGradient = useMemo(() => {
    const mode = HEATMAP_MODES.find(m => m.key === heatmapMode);
    return mode ? HEATMAP_GRADIENTS[mode.gradient] : HEATMAP_GRADIENTS.default;
  }, [heatmapMode]);

  const onExport = useCallback(async () => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    const dataUrl = await toPng(node, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = `saudi-mining-map-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  }, []);

  const onClearFilters = useCallback(() => setFilters({ region: "all", commodities: [] }), []);

  const onZoomToRegion = useCallback(() => {
    // Actual zoom happens in MapZoomController (react-leaflet hook), this is here for UX symmetry.
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

  const tile = TILE_LAYERS[baseLayer];

  return (
    <div
      className={cn(
        "relative",
        isFullscreen &&
          "fixed inset-0 z-[1200] bg-black/90 p-2 md:p-3",
        className
      )}
    >
      {/* Top controls (mobile responsive) */}
      <div className="absolute z-[1000] left-3 right-3 top-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-start gap-2">
          <Button
            size="sm"
            variant={showFilters ? "saudi" : "saudi-outline"}
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Hide filters" : "Filters"}
          </Button>
          {showFilters ? (
            <MapFilters
              value={filters}
              onChange={setFilters}
              availableCommodities={availableCommodities}
              onZoomToRegion={onZoomToRegion}
              onClear={onClearFilters}
              className="w-[260px] md:w-[320px]"
            />
          ) : null}
        </div>

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
                <div className="text-xs text-muted-foreground">Layers</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { key: "deposits", icon: <Database className="w-4 h-4" />, label: "Deposits" },
                  { key: "terranes", icon: <Mountain className="w-4 h-4" />, label: "Terranes" },
                  { key: "regions", icon: <Globe className="w-4 h-4" />, label: "KSA Regions" },
                  { key: "infrastructure", icon: <Construction className="w-4 h-4" />, label: "Infrastructure" },
                  { key: "tenders", icon: <RadioTower className="w-4 h-4" />, label: "Tenders" },
                  { key: "heatmap", icon: <Flame className="w-4 h-4" />, label: "Heatmap" },
                ].map((item) => (
                  <Tooltip key={item.key}>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant={layers[item.key as keyof typeof layers] ? "saudi" : "saudi-outline"}
                        className="h-9 w-9"
                        onClick={() => {
                          if (item.key === "heatmap") {
                            setShowHeatmapOptions(v => !v);
                            if (!layers.heatmap) {
                              setLayers((s) => ({ ...s, heatmap: true }));
                            }
                          } else {
                            setLayers((s) => ({ ...s, [item.key]: !s[item.key as keyof typeof layers] }));
                          }
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

              {/* Heatmap Mode Selector */}
              {showHeatmapOptions && (
                <div className="mt-2 p-2 bg-black/50 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
                    <Flame className="w-3 h-3" />
                    Heatmap Mode
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {HEATMAP_MODES.map((mode) => (
                      <Button
                        key={mode.key}
                        size="sm"
                        variant={heatmapMode === mode.key ? "saudi" : "saudi-outline"}
                        className="text-[10px] h-7 px-2"
                        onClick={() => {
                          setHeatmapMode(mode.key);
                          setLayers(s => ({ ...s, heatmap: mode.key !== "off" }));
                        }}
                      >
                        {mode.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

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
                <Badge variant="outline">{filteredDeposits.length} deposits</Badge>
                <Badge variant="outline">{filteredTenders.length} tenders</Badge>
                {layers.heatmap && heatmapMode !== "off" ? (
                  <Badge variant="saudi" className="gap-1">
                    <Flame className="w-3 h-3" />
                    {heatmapMode === "deposits" ? "Density" : heatmapMode}
                  </Badge>
                ) : null}
                {filters.region !== "all" ? <Badge variant="gold">{filters.region}</Badge> : null}
              </div>

              {/* SGS Data Source Toggle */}
              <div className="mt-2 border-t border-white/10 pt-2">
                <Button
                  size="sm"
                  variant={showDataSource ? "saudi" : "saudi-outline"}
                  className="w-full text-[10px] h-7 gap-1"
                  onClick={() => setShowDataSource(v => !v)}
                >
                  <Info className="w-3 h-3" />
                  {showDataSource ? "Hide" : "Show"} SGS Data Source
                </Button>
              </div>
            </Card>

            {/* SGS Data Panel */}
            {showDataSource && (
              <SGSDataPanel className="mt-2 w-[280px] md:w-[320px] bg-black/80 backdrop-blur border-white/10" />
            )}
          </TooltipProvider>
        </div>
      </div>

      {/* Bottom-left compact legend */}
      <div className="absolute z-[950] left-3 bottom-3 pointer-events-none">
        <div className="pointer-events-auto">
          <MapLegend 
            visibleLayers={layers} 
            heatmapMode={heatmapMode}
            className="w-[220px]" 
          />
        </div>
      </div>

      {/* Map */}
      <div
        ref={containerRef}
        className={cn("rounded-2xl overflow-hidden border border-border", isFullscreen && "h-[calc(100vh-1rem)]")}
        style={{ height: isFullscreen ? undefined : height }}
      >
        <MapContainer
          center={SAUDI_CENTER}
          zoom={5}
          zoomControl={false}
          scrollWheelZoom
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer url={tile.url} attribution={tile.attribution} />
          <ZoomControl position="bottomright" />
          <MapZoomController region={filters.region} />

          {/* Saudi outline highlight */}
          <Polygon
            positions={SAUDI_OUTLINE}
            pathOptions={{
              color: "#22c55e",
              weight: 2,
              opacity: 0.7,
              fill: true,
              fillColor: "#22c55e",
              fillOpacity: 0.06,
              dashArray: "6 6",
            }}
          />

          {/* KSA Administrative Regions */}
          {layers.regions ? (
            <KSARegionsOverlay
              geojson={saudiRegionsGeoJSON}
              showLabels={true}
              showCapitals={true}
              interactive={true}
              selectedRegion={filters.region !== "all" ? filters.region.toLowerCase().replace(/ /g, "-") : null}
              onRegionClick={(region) => {
                // Convert region id back to SaudiRegion format
                const regionName = region.name as SaudiRegion;
                setFilters((f) => ({ ...f, region: regionName }));
              }}
            />
          ) : null}

          {/* Terranes */}
          {layers.terranes ? (
            <LayerGroup>
              <TerraneOverlay geojson={terraneBoundaries} />
            </LayerGroup>
          ) : null}

          {/* Heatmap Layer */}
          {layers.heatmap && heatmapData.length > 0 ? (
            <HeatmapLayer
              points={heatmapData}
              radius={30}
              blur={20}
              max={1.0}
              minOpacity={0.4}
              gradient={currentHeatmapGradient}
            />
          ) : null}

          {/* Infrastructure */}
          {layers.infrastructure ? (
            <LayerGroup>
              {infrastructure.map((i) => {
                const coords =
                  i.coordinates?.map((c) => [c.latitude, c.longitude] as [number, number]) || [];

                if ((i.type === "road" || i.type === "rail") && coords.length >= 2) {
                  return (
                    <Polyline
                      key={i.id}
                      positions={coords}
                      pathOptions={{
                        color: i.type === "rail" ? "#7C3AED" : "#334155",
                        weight: i.type === "rail" ? 4 : 3,
                        opacity: 0.8,
                        dashArray: i.type === "rail" ? "6 6" : undefined,
                      }}
                    />
                  );
                }

                const point: [number, number] =
                  coords[0] || [i.location.latitude, i.location.longitude];

                const iconColor =
                  i.type === "port" ? "#0EA5E9" : i.type === "airport" ? "#F97316" : "#006C35";

                return (
                  <Marker key={i.id} position={point} icon={createInfrastructureIcon(L, iconColor)}>
                    <Popup>
                      <Card className="border-0 shadow-none w-[260px]">
                        <div className="p-3 space-y-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="font-semibold">{i.name}</div>
                            <Badge variant="outline" className="capitalize">
                              {i.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {i.location.region} • {i.status}
                          </div>
                        </div>
                      </Card>
                    </Popup>
                  </Marker>
                );
              })}
            </LayerGroup>
          ) : null}

          {/* Deposits (clustered) */}
          {layers.deposits ? (
            <MarkerClusterGroup chunkedLoading>
              {filteredDeposits.map((d) => {
                const icon = createDepositIcon(L, commodityColor(d.commodities));
                const entity: PopupEntity = { kind: "deposit", data: d as MineralDeposit };
                return (
                  <Marker
                    key={d.id}
                    position={[d.location.latitude, d.location.longitude]}
                    icon={icon}
                  >
                    <Popup>
                      <DepositPopup entity={entity} />
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>
          ) : null}

          {/* Tenders (clustered) */}
          {layers.tenders ? (
            <MarkerClusterGroup chunkedLoading>
              {filteredTenders
                .filter((t) => !!t.coordinates)
                .map((t) => {
                  const color = tenderColor(t.status);
                  const animate = t.status === "open";
                  const icon = createTenderIcon(L, color, animate);
                  const entity: PopupEntity = { kind: "tender", data: t as TenderRound };
                  return (
                    <Marker
                      key={t.id}
                      position={[t.coordinates!.latitude, t.coordinates!.longitude]}
                      icon={icon}
                    >
                      <Popup>
                        <DepositPopup entity={entity} />
                      </Popup>
                    </Marker>
                  );
                })}
            </MarkerClusterGroup>
          ) : null}
        </MapContainer>
      </div>
    </div>
  );
}


