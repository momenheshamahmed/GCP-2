/**
 * GDAC Geology Backend API Integration
 * Connects to the FastAPI backend for geological prospectivity data
 * Backend: http://localhost:8000
 */

// ============================================
// Backend API Types (GeoJSON Format)
// ============================================

export interface GeoJSONGeometry {
  type: string;
  coordinates: any;
}

export interface CellProperties {
  id: number;
  score: number;
  percentile: number;
  raw_score?: number;
  dominant_lithology: string | null;
  dominant_unit_code: string | null;
  distance_to_fault: number | null;
  distance_to_dike: number | null;
  distance_to_mineral: number | null;
  mineral_occurrence_count: number;
}

export interface GeoJSONFeature<T = any> {
  type: "Feature";
  id?: number | string;
  geometry: GeoJSONGeometry;
  properties: T;
}

export interface GeoJSONFeatureCollection<T = any> {
  type: "FeatureCollection";
  features: GeoJSONFeature<T>[];
}

export interface GeologyProperties {
  id: number;
  unit_code: string;
  lithology: string;
  age: string;
  description: string;
}

export interface FaultProperties {
  id: number;
  fault_type: string;
  contact_type: string;
  description: string;
}

export interface DikeProperties {
  id: number;
  dike_type: string;
  composition: string;
  description: string;
}

export interface MineralOccurrenceProperties {
  id: number;
  commodity: string;
  deposit_type: string;
  status: string;
  name: string;
  description: string;
}

// ============================================
// API Configuration
// ============================================

const GDAC_API_BASE_URL = process.env.NEXT_PUBLIC_GDAC_API_URL || "http://localhost:8000";

// ============================================
// API Functions
// ============================================

/**
 * Fetch grid cells with prospectivity scores
 * @param params - Optional query parameters for filtering
 */
export async function fetchGridCells(params?: {
  bbox?: string;
  min_score?: number;
  max_score?: number;
  has_geology?: boolean;
  limit?: number;
}): Promise<GeoJSONFeatureCollection<CellProperties>> {
  const searchParams = new URLSearchParams();

  if (params?.bbox) searchParams.append("bbox", params.bbox);
  if (params?.min_score !== undefined) searchParams.append("min_score", params.min_score.toString());
  if (params?.max_score !== undefined) searchParams.append("max_score", params.max_score.toString());
  if (params?.has_geology !== undefined) searchParams.append("has_geology", params.has_geology.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${GDAC_API_BASE_URL}/cells${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 60 }, // Cache for 1 minute
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch grid cells: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch a single grid cell by ID
 */
export async function fetchGridCell(cellId: number): Promise<GeoJSONFeature<CellProperties>> {
  const url = `${GDAC_API_BASE_URL}/cells/${cellId}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cell ${cellId}: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch geology polygons
 */
export async function fetchGeologyLayer(params?: {
  bbox?: string;
  simplify?: number;
  limit?: number;
}): Promise<GeoJSONFeatureCollection<GeologyProperties>> {
  const searchParams = new URLSearchParams();

  if (params?.bbox) searchParams.append("bbox", params.bbox);
  if (params?.simplify !== undefined) searchParams.append("simplify", params.simplify.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${GDAC_API_BASE_URL}/layers/geology${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch geology layer: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch fault and contact lines
 */
export async function fetchFaultsLayer(params?: {
  bbox?: string;
  simplify?: number;
  limit?: number;
}): Promise<GeoJSONFeatureCollection<FaultProperties>> {
  const searchParams = new URLSearchParams();

  if (params?.bbox) searchParams.append("bbox", params.bbox);
  if (params?.simplify !== undefined) searchParams.append("simplify", params.simplify.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${GDAC_API_BASE_URL}/layers/faults${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch faults layer: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch dike lines
 */
export async function fetchDikesLayer(params?: {
  bbox?: string;
  simplify?: number;
  limit?: number;
}): Promise<GeoJSONFeatureCollection<DikeProperties>> {
  const searchParams = new URLSearchParams();

  if (params?.bbox) searchParams.append("bbox", params.bbox);
  if (params?.simplify !== undefined) searchParams.append("simplify", params.simplify.toString());
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${GDAC_API_BASE_URL}/layers/dikes${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch dikes layer: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch mineral occurrence points
 */
export async function fetchMineralOccurrences(params?: {
  bbox?: string;
  limit?: number;
}): Promise<GeoJSONFeatureCollection<MineralOccurrenceProperties>> {
  const searchParams = new URLSearchParams();

  if (params?.bbox) searchParams.append("bbox", params.bbox);
  if (params?.limit) searchParams.append("limit", params.limit.toString());

  const url = `${GDAC_API_BASE_URL}/layers/mineral_occurrences${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch mineral occurrences: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch all geological layers at once
 */
export async function fetchAllLayers(params?: {
  bbox?: string;
  simplify?: number;
}) {
  const [cells, geology, faults, dikes, minerals] = await Promise.all([
    fetchGridCells({ bbox: params?.bbox }),
    fetchGeologyLayer({ bbox: params?.bbox, simplify: params?.simplify }),
    fetchFaultsLayer({ bbox: params?.bbox, simplify: params?.simplify }),
    fetchDikesLayer({ bbox: params?.bbox, simplify: params?.simplify }),
    fetchMineralOccurrences({ bbox: params?.bbox }),
  ]);

  return {
    cells,
    geology,
    faults,
    dikes,
    minerals,
  };
}

/**
 * Get color for prospectivity score (green → yellow → red)
 * @param score - Normalized score (0-1)
 * @returns Hex color code
 */
export function getScoreColor(score: number): string {
  // Clamp score to 0-1
  const clampedScore = Math.max(0, Math.min(1, score));

  if (clampedScore < 0.33) {
    // Green to Yellow (low scores)
    const t = clampedScore / 0.33;
    const r = Math.round(34 + (234 - 34) * t);
    const g = Math.round(197 + (179 - 197) * t);
    const b = Math.round(94 + (0 - 94) * t);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } else if (clampedScore < 0.67) {
    // Yellow to Orange (medium scores)
    const t = (clampedScore - 0.33) / 0.34;
    const r = Math.round(234 + (251 - 234) * t);
    const g = Math.round(179 + (146 - 179) * t);
    const b = Math.round(0 + (0 - 0) * t);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  } else {
    // Orange to Red (high scores)
    const t = (clampedScore - 0.67) / 0.33;
    const r = Math.round(251 + (220 - 251) * t);
    const g = Math.round(146 + (38 - 146) * t);
    const b = Math.round(0 + (38 - 0) * t);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

/**
 * Get opacity for prospectivity score
 * Higher scores = more opaque
 */
export function getScoreOpacity(score: number): number {
  return 0.4 + (score * 0.4); // Range: 0.4 to 0.8
}

/**
 * Format distance in meters to human-readable string
 */
export function formatDistance(meters: number | null): string {
  if (meters === null) return "N/A";
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(2)}km`;
}

/**
 * Get score category label
 */
export function getScoreCategory(score: number): string {
  if (score >= 0.8) return "Very High";
  if (score >= 0.6) return "High";
  if (score >= 0.4) return "Medium";
  if (score >= 0.2) return "Low";
  return "Very Low";
}
