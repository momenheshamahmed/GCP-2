// ============================================
// Hooks Exports
// ============================================

// UI Hooks
export * from "./use-media-query";
export * from "./use-scroll";

// Data Hooks
export {
  // Helper Functions
  filterByRegion,
  filterByCommodity,
  filterByStatus,
  calculateTotalArea,
  getProductionByYear,
  getProductionHistory,
  searchItems,
  paginateItems,
  getUniqueValues,
  groupBy,
  // Hooks
  useMineralDeposits,
  useTenderRounds,
  useGeologicalTerranes,
  useInfrastructure,
  useMiningCompanies,
  useMineralProduction,
  useDashboardData,
} from "./useMineral";
