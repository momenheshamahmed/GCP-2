// ============================================
// Saudi Mining Platform - Type Definitions
// ============================================

// Geographic Types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinates {
  region: string;
  regionAr?: string;
  city?: string;
  cityAr?: string;
}

export interface GeoLocation {
  latitude: number;
  longitude: number;
  region: string;
  regionAr?: string;
}

// ============================================
// Simple Mineral Type (for backward compatibility)
// ============================================
export type MineralCategory =
  | "precious"
  | "base"
  | "industrial"
  | "rare-earth"
  | "energy";

export interface MineralProperties {
  hardness?: number;
  density?: number;
  color?: string;
  luster?: string;
  crystalSystem?: string;
}

export interface Mineral {
  id: string;
  name: string;
  nameAr?: string;
  symbol: string;
  category: MineralCategory;
  description: string;
  descriptionAr?: string;
  properties?: MineralProperties;
  locations: string[];
  reserves: number;
  unit: string;
  pricePerUnit: number;
  image?: string;
}

// ============================================
// Mineral Deposit Types
// ============================================
export type MineralDepositStatus = 
  | "active" 
  | "development" 
  | "exploration" 
  | "suspended" 
  | "planned" 
  | "depleted";

export type MineralType = 
  | "precious" 
  | "base" 
  | "industrial" 
  | "rare-earth" 
  | "energy" 
  | "construction";

export type CommodityType =
  | "gold"
  | "silver"
  | "copper"
  | "zinc"
  | "lead"
  | "phosphate"
  | "bauxite"
  | "iron"
  | "titanium"
  | "magnesite"
  | "kaolin"
  | "feldspar"
  | "silica"
  | "limestone"
  | "granite"
  | "marble"
  | "gypsum"
  | "potash"
  | "rare-earth"
  | "uranium"
  | "tantalum"
  | "niobium"
  | "lithium"
  | "chromite"
  | "nickel"
  | "platinum"
  | "palladium";

export interface MineralDeposit {
  id: string;
  name: string;
  nameAr?: string;
  type: MineralType;
  location: Location;
  commodities: CommodityType[];
  production?: {
    annual: number;
    unit: string;
    startYear?: number;
  };
  reserves?: {
    proven: number;
    probable: number;
    unit: string;
  };
  status: MineralDepositStatus;
  operator?: string;
  ownership?: string;
  description?: string;
  descriptionAr?: string;
  image?: string;
}

// ============================================
// Tender Round Types
// ============================================
export type TenderStatus = 
  | "upcoming" 
  | "open" 
  | "closed" 
  | "awarded" 
  | "cancelled" 
  | "evaluation";

export interface TenderRound {
  id: string;
  round: number;
  siteName: string;
  siteNameAr?: string;
  commodities: CommodityType[];
  region: string;
  regionAr?: string;
  areaKm2: number;
  coordinates?: Coordinates;
  awardedTo?: string;
  status: TenderStatus;
  openDate?: string;
  closeDate?: string;
  announcementDate?: string;
  minimumBid?: number;
  currency?: string;
  requirements?: string[];
  documents?: string[];
}

// ============================================
// Geological Terrane Types
// ============================================
export type TerraneType = 
  | "arc" 
  | "ophiolite" 
  | "plutonic" 
  | "volcanic" 
  | "sedimentary" 
  | "metamorphic";

export interface GeologicalTerrane {
  id: string;
  name: string;
  nameAr?: string;
  type: TerraneType;
  location: Location;
  ageRange: {
    from: number; // Ma (Million years ago)
    to: number;
    period: string;
  };
  description: string;
  descriptionAr?: string;
  minerals: CommodityType[];
  area?: number; // km²
  geologicalFeatures?: string[];
  explorationPotential?: "high" | "medium" | "low";
}

// ============================================
// Infrastructure Types
// ============================================
export type InfrastructureType = 
  | "road" 
  | "rail" 
  | "port" 
  | "airport" 
  | "power-plant" 
  | "water-plant" 
  | "processing-facility" 
  | "storage" 
  | "pipeline";

export type InfrastructureStatus = 
  | "operational" 
  | "under-construction" 
  | "planned" 
  | "maintenance";

export interface Infrastructure {
  id: string;
  type: InfrastructureType;
  name: string;
  nameAr?: string;
  location: Location;
  capacity?: string | {
    value: number;
    unit: string;
  };
  coordinates?: Coordinates[];
  status: InfrastructureStatus;
  operator?: string;
  completionYear?: number;
  description?: string;
  descriptionAr?: string;
  connectedTo?: string[]; // IDs of connected infrastructure
  image?: string;
}

// ============================================
// Company Types
// ============================================
export type CompanyType = 
  | "state-owned" 
  | "private" 
  | "joint-venture" 
  | "international" 
  | "subsidiary";

export type OperationType = 
  | "exploration" 
  | "mining" 
  | "processing" 
  | "refining" 
  | "trading" 
  | "services";

export interface CompanyOperation {
  type: OperationType;
  commodities: CommodityType[];
  location?: string;
  startYear?: number;
}

export interface License {
  id: string;
  type: string;
  number?: string;
  region?: string;
  issuedDate?: string;
  expiryDate?: string;
  expiry?: string;
  status?: "active" | "expired" | "pending" | "suspended";
}

export interface Project {
  id: string;
  name: string;
  nameAr?: string;
  type: string;
  status: string;
  location?: GeoLocation;
  startDate?: string;
  endDate?: string;
  investment?: number;
  description?: string;
}

export interface Company {
  id: string;
  name: string;
  nameAr?: string;
  fullName?: string;
  fullNameAr?: string;
  type: CompanyType;
  operations?: CompanyOperation[];
  ownership?: {
    shareholders: {
      name: string;
      percentage: number;
    }[];
  };
  founded?: number;
  headquarters?: string;
  employees?: number;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  stockSymbol?: string;
  description?: string;
  descriptionAr?: string;
  logo?: string;
  licenses?: License[];
  projects?: Project[];
}

// ============================================
// Production & Statistics Types
// ============================================
export interface MineralProduction {
  id: string;
  mineral: CommodityType;
  year: number;
  value: number;
  unit: string;
  source?: string;
  growthRate?: number; // percentage
  rank?: number; // global or regional rank
}

export interface InvestmentMetric {
  id: string;
  category: string;
  categoryAr?: string;
  value: number;
  unit: string;
  year?: number;
  ranking?: {
    position: number;
    total: number;
    scope: "global" | "regional" | "national";
  };
  description?: string;
  descriptionAr?: string;
  trend?: "up" | "down" | "stable";
  targetValue?: number;
  targetYear?: number;
}

// ============================================
// Water Resource Types
// ============================================
export type WaterResourceType = 
  | "groundwater" 
  | "desalination" 
  | "surface" 
  | "recycled" 
  | "dam";

export interface WaterResource {
  id: string;
  type: WaterResourceType;
  name: string;
  nameAr?: string;
  capacity: number;
  unit: string;
  location?: Location;
  renewable: boolean;
  annualYield?: number;
  quality?: "excellent" | "good" | "fair" | "poor";
  operator?: string;
  description?: string;
  descriptionAr?: string;
}

// ============================================
// Map & Visualization Types
// ============================================
export type MapMarkerType = 
  | "mineral" 
  | "tender" 
  | "infrastructure" 
  | "company" 
  | "geology";

export interface MapMarker {
  id: string;
  type: MapMarkerType;
  position: [number, number]; // [lat, lng]
  title: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  icon?: string;
  color?: string;
  data?: Record<string, unknown>;
}

export interface MapRegion {
  id: string;
  name: string;
  nameAr?: string;
  coordinates: [number, number][];
  fill?: string;
  stroke?: string;
  data?: Record<string, unknown>;
}

// ============================================
// Filter & Query Types
// ============================================
export interface FilterOptions {
  regions?: string[];
  commodities?: CommodityType[];
  types?: string[];
  statuses?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  valueRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// ============================================
// API Response Types
// ============================================
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================
// Statistics & Dashboard Types
// ============================================
export interface DashboardStats {
  totalDeposits: number;
  activeOperations: number;
  totalInvestment: number;
  activeTenders: number;
  registeredCompanies: number;
  employmentCount: number;
  annualProduction: {
    gold: number;
    copper: number;
    phosphate: number;
  };
  growthMetrics: {
    yoyGrowth: number;
    targetProgress: number;
  };
}

// ============================================
// Region Data
// ============================================
export type SaudiRegion =
  | "Riyadh"
  | "Makkah"
  | "Madinah"
  | "Eastern Province"
  | "Qassim"
  | "Asir"
  | "Tabuk"
  | "Hail"
  | "Northern Borders"
  | "Jazan"
  | "Najran"
  | "Al Bahah"
  | "Al Jawf";

export const SAUDI_REGIONS: Record<SaudiRegion, { nameAr: string; capital: string }> = {
  "Riyadh": { nameAr: "", capital: "Riyadh" },
  "Makkah": { nameAr: " ", capital: "Makkah" },
  "Madinah": { nameAr: " ", capital: "Madinah" },
  "Eastern Province": { nameAr: " ", capital: "Dammam" },
  "Qassim": { nameAr: "", capital: "Buraydah" },
  "Asir": { nameAr: "", capital: "Abha" },
  "Tabuk": { nameAr: "", capital: "Tabuk" },
  "Hail": { nameAr: "", capital: "Ha'il" },
  "Northern Borders": { nameAr: " ", capital: "Arar" },
  "Jazan": { nameAr: "", capital: "Jazan" },
  "Najran": { nameAr: "", capital: "Najran" },
  "Al Bahah": { nameAr: "", capital: "Al Bahah" },
  "Al Jawf": { nameAr: "", capital: "Sakaka" },
};

// ============================================
// Legacy Types (for backward compatibility)
// ============================================

// Simple Tender Type
export type TenderType =
  | "exploration-license"
  | "mining-license"
  | "equipment"
  | "services"
  | "infrastructure";

export type TenderStatusLegacy =
  | "draft"
  | "published"
  | "closed"
  | "awarded"
  | "cancelled";

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  size?: number;
  uploadedAt?: string;
}

export interface Contact {
  name: string;
  nameAr?: string;
  title: string;
  titleAr?: string;
  email: string;
  phone?: string;
  organization?: string;
}

export interface Tender {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  type: TenderType;
  status: TenderStatusLegacy;
  value: number;
  currency: string;
  publishDate: string;
  deadline: string;
  location: GeoLocation;
  documents?: Document[];
  requirements?: string[];
  contact?: Contact;
}

// Investment Opportunity Type
export type InvestmentType =
  | "exploration"
  | "mining"
  | "processing"
  | "infrastructure"
  | "joint-venture";

export type InvestmentStatus =
  | "open"
  | "in-progress"
  | "closed"
  | "completed"
  | "cancelled";

export interface InvestmentOpportunity {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  type: InvestmentType;
  status: InvestmentStatus;
  value: number;
  currency: string;
  location: GeoLocation;
  minerals: string[];
  company?: Company;
  startDate: string;
  endDate?: string;
  documents?: Document[];
  contacts?: Contact[];
}

// Statistics Type
export interface Statistics {
  totalMinerals: number;
  totalCompanies: number;
  totalInvestments: number;
  totalInvestmentValue: number;
  activeTenders: number;
  activeProjects: number;
  employmentCount: number;
  annualProduction: number;
}
