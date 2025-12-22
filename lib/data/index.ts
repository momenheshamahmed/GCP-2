// ============================================
// Data Exports
// ============================================

// Minerals
export {
  mineralDeposits,
  mineralProduction,
  commodityPrices,
} from "./minerals";

// Tenders
export { tenderRounds, tenderStats } from "./tenders";

// Geology
export { geologicalTerranes, geologyStats } from "./geology";
export { terraneBoundaries } from "./terrane-boundaries";

// Saudi Regions
export { saudiRegionsGeoJSON, saudiArabiaOutline, getRegionStyle } from "./saudi-regions";
export type { SaudiRegionProperties, SaudiRegionFeature } from "./saudi-regions";

// Infrastructure
export {
  miningInfrastructure,
  waterResources,
  investmentMetrics,
  infrastructureStats,
} from "./infrastructure";

// Companies
export {
  miningCompanies,
  companyStats,
  majorShareholders,
} from "./companies";

// Re-export types for convenience
export type {
  MineralDeposit,
  TenderRound,
  GeologicalTerrane,
  Infrastructure,
  Company,
  MineralProduction,
  InvestmentMetric,
  WaterResource,
  CommodityType,
  FilterOptions,
} from "@/types";
