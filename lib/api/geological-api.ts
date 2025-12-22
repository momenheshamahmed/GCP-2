/**
 * Saudi Geological Survey API Integration
 * Data source: https://open.data.gov.sa and https://ngdp.sgs.gov.sa
 * 
 * This service integrates with the Saudi Open Data Portal's Geological Database
 * provided by the Saudi Geological Survey (هيئة المساحة الجيولوجية السعودية)
 */

import type { CommodityType, MineralDeposit, Coordinates } from "@/types";

// API Configuration
const OPEN_DATA_BASE_URL = "https://open.data.gov.sa/data/api";
const SGS_DATASET_ID = "8709fc0d-0606-4c0c-8125-d772fc84490b";

export interface GeologicalDatasetMetadata {
  transactionId: string;
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  providerNameEn: string;
  providerNameAr: string;
  updateFrequency: string;
  resourcesCount: number;
  language: string;
  timePeriod: string;
  categories: {
    id: string;
    titleEn: string;
    titleAr: string;
  }[];
  tags: {
    id: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface GeologicalResource {
  id: string;
  name: string;
  descriptionEn: string;
  descriptionAr: string;
  format: string;
  columns: {
    name: string;
    type: string;
    description: string | null;
  }[];
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface GeologicalResourcesResponse {
  transactionId: string;
  datasetId: string;
  resources: GeologicalResource[];
}

export interface GeologicalPoint {
  id: string;
  name: string;
  nameAr?: string;
  coordinates: Coordinates;
  commodities: CommodityType[];
  intensity: number; // For heatmap (0-1)
  depositType?: string;
  status?: string;
  source?: string;
}

export interface HeatmapPoint {
  lat: number;
  lng: number;
  intensity: number;
}

/**
 * Fetch geological dataset metadata from Saudi Open Data Portal
 */
export async function fetchGeologicalMetadata(): Promise<GeologicalDatasetMetadata | null> {
  try {
    const response = await fetch(
      `${OPEN_DATA_BASE_URL}/datasets?version=-1&dataset=${SGS_DATASET_ID}`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    
    if (!response.ok) {
      console.warn("Failed to fetch geological metadata:", response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.warn("Error fetching geological metadata:", error);
    return null;
  }
}

/**
 * Fetch geological resources (API endpoints and data sources)
 * This returns the available data resources including the NGD Portal link
 */
export async function fetchGeologicalResources(): Promise<GeologicalResourcesResponse | null> {
  try {
    const response = await fetch(
      `${OPEN_DATA_BASE_URL}/datasets/resources?version=-1&dataset=${SGS_DATASET_ID}`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    
    if (!response.ok) {
      console.warn("Failed to fetch geological resources:", response.status);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.warn("Error fetching geological resources:", error);
    return null;
  }
}

/**
 * Fetch all geological data (metadata + resources)
 */
export async function fetchAllGeologicalData() {
  const [metadata, resources] = await Promise.all([
    fetchGeologicalMetadata(),
    fetchGeologicalResources(),
  ]);
  
  return {
    metadata,
    resources,
    portalUrl: resources?.resources?.[0]?.downloadUrl || "https://ngdp.sgs.gov.sa/ngp/",
  };
}

/**
 * Generate heatmap data from mineral deposits
 * This transforms deposit data into heatmap-compatible format
 */
export function generateHeatmapData(deposits: MineralDeposit[]): HeatmapPoint[] {
  return deposits.map((deposit) => {
    // Calculate intensity based on various factors
    let intensity = 0.5; // Base intensity
    
    // Boost intensity based on status
    if (deposit.status === "active") intensity += 0.3;
    else if (deposit.status === "development") intensity += 0.2;
    else if (deposit.status === "exploration") intensity += 0.1;
    
    // Boost intensity based on reserves
    if (deposit.reserves) {
      const totalReserves = deposit.reserves.proven + (deposit.reserves.probable || 0);
      if (totalReserves > 100000000) intensity += 0.2;
      else if (totalReserves > 10000000) intensity += 0.15;
      else if (totalReserves > 1000000) intensity += 0.1;
    }
    
    // Boost for precious metals
    if (deposit.commodities.includes("gold")) intensity += 0.1;
    if (deposit.commodities.includes("copper")) intensity += 0.05;
    if (deposit.commodities.includes("rare-earth")) intensity += 0.15;
    
    // Cap intensity at 1.0
    intensity = Math.min(1.0, intensity);
    
    return {
      lat: deposit.location.latitude,
      lng: deposit.location.longitude,
      intensity,
    };
  });
}

/**
 * Generate exploration potential heatmap
 * Based on geological terranes and their exploration potential
 */
export function generateExplorationHeatmap(): HeatmapPoint[] {
  // High-potential zones from SGS data
  const explorationZones: HeatmapPoint[] = [
    // Arabian Shield high-potential zones (Western Saudi Arabia)
    // Gold mineralization belt
    { lat: 23.5, lng: 40.8, intensity: 0.95 }, // Mahd Ad'Dahab area
    { lat: 24.5, lng: 40.5, intensity: 0.85 },
    { lat: 22.5, lng: 43.4, intensity: 0.9 }, // Ad-Duwayhi area
    { lat: 23.0, lng: 40.8, intensity: 0.88 }, // Jabal Sayid
    { lat: 22.95, lng: 44.28, intensity: 0.82 }, // Al-Amar
    
    // Hijaz Terrane - Gold and base metals
    { lat: 24.0, lng: 40.0, intensity: 0.85 },
    { lat: 25.0, lng: 41.5, intensity: 0.78 },
    { lat: 23.5, lng: 39.5, intensity: 0.72 },
    
    // Midyan Terrane - Copper and gold
    { lat: 28.5, lng: 35.0, intensity: 0.75 },
    { lat: 28.0, lng: 35.5, intensity: 0.7 },
    { lat: 27.5, lng: 36.0, intensity: 0.68 },
    
    // Afif Terrane - Gold and base metals
    { lat: 23.5, lng: 43.0, intensity: 0.82 },
    { lat: 24.0, lng: 44.0, intensity: 0.78 },
    { lat: 22.5, lng: 44.5, intensity: 0.75 },
    
    // Northern Phosphate Province
    { lat: 31.5, lng: 37.5, intensity: 0.95 }, // Wa'ad Al-Shamal
    { lat: 31.4, lng: 37.25, intensity: 0.9 }, // Al-Jalamid
    { lat: 30.5, lng: 38.0, intensity: 0.7 },
    
    // Ar Rayn Terrane - REE potential
    { lat: 22.0, lng: 45.5, intensity: 0.7 },
    { lat: 21.5, lng: 46.0, intensity: 0.65 },
    
    // Asir Terrane - Copper and gold
    { lat: 19.0, lng: 42.5, intensity: 0.72 },
    { lat: 18.5, lng: 42.0, intensity: 0.68 },
    { lat: 20.0, lng: 43.0, intensity: 0.65 },
    
    // Tabuk iron-titanium belt
    { lat: 28.0, lng: 35.5, intensity: 0.75 },
    { lat: 28.5, lng: 36.0, intensity: 0.7 },
    
    // Ophiolite belts - Chromite and PGE
    { lat: 25.5, lng: 42.0, intensity: 0.78 },
    { lat: 24.0, lng: 38.5, intensity: 0.72 },
    
    // Central Arabian Shield
    { lat: 25.0, lng: 42.5, intensity: 0.7 },
    { lat: 24.5, lng: 43.5, intensity: 0.68 },
    { lat: 23.0, lng: 42.0, intensity: 0.72 },
    
    // Southern mineralization zones
    { lat: 17.5, lng: 44.0, intensity: 0.6 },
    { lat: 18.0, lng: 43.5, intensity: 0.58 },
    
    // Bauxite zone (Qassim)
    { lat: 27.0, lng: 43.75, intensity: 0.8 },
    { lat: 26.5, lng: 44.0, intensity: 0.7 },
  ];
  
  return explorationZones;
}

/**
 * Get commodity-specific heatmap data
 */
export function getCommodityHeatmap(
  deposits: MineralDeposit[],
  commodity: CommodityType
): HeatmapPoint[] {
  return deposits
    .filter((d) => d.commodities.includes(commodity))
    .map((deposit) => ({
      lat: deposit.location.latitude,
      lng: deposit.location.longitude,
      intensity: deposit.status === "active" ? 1.0 : 
                 deposit.status === "development" ? 0.8 : 
                 deposit.status === "exploration" ? 0.6 : 0.4,
    }));
}

// Export dataset info for reference
export const SGS_DATASET_INFO = {
  id: SGS_DATASET_ID,
  titleEn: "Geological Database",
  titleAr: "قاعدة البيانات الجيولوجية",
  provider: "Saudi Geological Survey",
  providerAr: "هيئة المساحة الجيولوجية السعودية",
  portalUrl: "https://open.data.gov.sa",
  ngdPortalUrl: "https://ngd.sgs.gov.sa",
};
