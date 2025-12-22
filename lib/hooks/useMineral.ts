"use client";

import { useMemo, useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  MineralDeposit,
  TenderRound,
  GeologicalTerrane,
  Infrastructure,
  Company,
  MineralProduction,
  CommodityType,
  FilterOptions,
  PaginationOptions,
  PaginatedResult,
} from "@/types";
import {
  mineralDeposits,
  mineralProduction,
} from "@/lib/data/minerals";
import { tenderRounds } from "@/lib/data/tenders";
import { geologicalTerranes } from "@/lib/data/geology";
import { miningInfrastructure } from "@/lib/data/infrastructure";
import { miningCompanies } from "@/lib/data/companies";

// ============================================
// Helper Functions
// ============================================

/**
 * Filter items by region
 */
export function filterByRegion<T extends { location?: { region?: string } }>(
  items: T[],
  region: string | null
): T[] {
  if (!region) return items;
  return items.filter(
    (item) => item.location?.region?.toLowerCase() === region.toLowerCase()
  );
}

/**
 * Filter items by commodity
 */
export function filterByCommodity<T extends { commodities?: CommodityType[] }>(
  items: T[],
  commodity: CommodityType | null
): T[] {
  if (!commodity) return items;
  return items.filter((item) => item.commodities?.includes(commodity));
}

/**
 * Filter items by status
 */
export function filterByStatus<T extends { status?: string }>(
  items: T[],
  status: string | null
): T[] {
  if (!status) return items;
  return items.filter(
    (item) => item.status?.toLowerCase() === status.toLowerCase()
  );
}

/**
 * Calculate total area from tenders
 */
export function calculateTotalArea(tenders: TenderRound[]): number {
  return tenders.reduce((total, tender) => total + tender.areaKm2, 0);
}

/**
 * Get production data by year
 */
export function getProductionByYear(
  mineral: CommodityType,
  year: number
): MineralProduction | undefined {
  return mineralProduction.find(
    (p) => p.mineral === mineral && p.year === year
  );
}

/**
 * Get all production data for a mineral
 */
export function getProductionHistory(mineral: CommodityType): MineralProduction[] {
  return mineralProduction
    .filter((p) => p.mineral === mineral)
    .sort((a, b) => a.year - b.year);
}

/**
 * Search items by text query
 */
export function searchItems<T extends { name?: string; description?: string }>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) return items;
  const lowercaseQuery = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name?.toLowerCase().includes(lowercaseQuery) ||
      item.description?.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Paginate items
 */
export function paginateItems<T>(
  items: T[],
  options: PaginationOptions
): PaginatedResult<T> {
  const { page, limit, sortBy, sortOrder = "asc" } = options;
  
  let sortedItems = [...items];
  
  if (sortBy) {
    sortedItems.sort((a, b) => {
      const aVal = (a as Record<string, unknown>)[sortBy];
      const bVal = (b as Record<string, unknown>)[sortBy];
      
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      
      return 0;
    });
  }
  
  const total = sortedItems.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    data: sortedItems.slice(start, end),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
}

/**
 * Get unique values from items
 */
export function getUniqueValues<T, K extends keyof T>(
  items: T[],
  key: K
): T[K][] {
  const values = items.map((item) => item[key]).filter(Boolean);
  return Array.from(new Set(values)) as T[K][];
}

/**
 * Group items by a key
 */
export function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

// ============================================
// Custom Hooks
// ============================================

/**
 * Hook for mineral deposits with filtering
 */
export function useMineralDeposits(filters?: FilterOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredDeposits = useMemo(() => {
    let result = [...mineralDeposits];
    
    if (filters?.regions?.length) {
      result = result.filter((d) =>
        filters.regions?.includes(d.location.region)
      );
    }
    
    if (filters?.commodities?.length) {
      result = result.filter((d) =>
        d.commodities.some((c) => filters.commodities?.includes(c))
      );
    }
    
    if (filters?.statuses?.length) {
      result = result.filter((d) =>
        filters.statuses?.includes(d.status)
      );
    }
    
    if (filters?.search || searchQuery) {
      result = searchItems(result, filters?.search || searchQuery);
    }
    
    return result;
  }, [filters, searchQuery]);
  
  const stats = useMemo(() => ({
    total: filteredDeposits.length,
    active: filteredDeposits.filter((d) => d.status === "active").length,
    exploration: filteredDeposits.filter((d) => d.status === "exploration").length,
    development: filteredDeposits.filter((d) => d.status === "development").length,
    byType: groupBy(filteredDeposits, "type"),
    regions: getUniqueValues(filteredDeposits, "location").map((l) => l.region),
  }), [filteredDeposits]);
  
  return {
    deposits: filteredDeposits,
    stats,
    searchQuery,
    setSearchQuery,
    filterByRegion: (region: string) => filterByRegion(filteredDeposits, region),
    filterByCommodity: (commodity: CommodityType) =>
      filterByCommodity(filteredDeposits, commodity),
  };
}

/**
 * Hook for tender rounds with filtering
 */
export function useTenderRounds(filters?: FilterOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredTenders = useMemo(() => {
    let result = [...tenderRounds];
    
    if (filters?.regions?.length) {
      result = result.filter((t) => filters.regions?.includes(t.region));
    }
    
    if (filters?.commodities?.length) {
      result = result.filter((t) =>
        t.commodities.some((c) => filters.commodities?.includes(c))
      );
    }
    
    if (filters?.statuses?.length) {
      result = result.filter((t) => filters.statuses?.includes(t.status));
    }
    
    if (filters?.search || searchQuery) {
      const query = (filters?.search || searchQuery).toLowerCase();
      result = result.filter(
        (t) =>
          t.siteName.toLowerCase().includes(query) ||
          t.region.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [filters, searchQuery]);
  
  const stats = useMemo(() => ({
    total: filteredTenders.length,
    totalArea: calculateTotalArea(filteredTenders),
    open: filteredTenders.filter((t) => t.status === "open").length,
    awarded: filteredTenders.filter((t) => t.status === "awarded").length,
    upcoming: filteredTenders.filter((t) => t.status === "upcoming").length,
    byRound: groupBy(filteredTenders, "round"),
    regions: getUniqueValues(filteredTenders, "region"),
  }), [filteredTenders]);
  
  return {
    tenders: filteredTenders,
    stats,
    searchQuery,
    setSearchQuery,
    calculateTotalArea: () => calculateTotalArea(filteredTenders),
    getOpenTenders: () => filteredTenders.filter((t) => t.status === "open"),
    getUpcomingTenders: () => filteredTenders.filter((t) => t.status === "upcoming"),
  };
}

/**
 * Hook for geological terranes with filtering
 */
export function useGeologicalTerranes(filters?: FilterOptions) {
  const filteredTerranes = useMemo(() => {
    let result = [...geologicalTerranes];
    
    if (filters?.regions?.length) {
      result = result.filter((t) =>
        filters.regions?.includes(t.location.region)
      );
    }
    
    if (filters?.commodities?.length) {
      result = result.filter((t) =>
        t.minerals.some((m) => filters.commodities?.includes(m))
      );
    }
    
    if (filters?.types?.length) {
      result = result.filter((t) => filters.types?.includes(t.type));
    }
    
    if (filters?.search) {
      result = searchItems(result, filters.search);
    }
    
    return result;
  }, [filters]);
  
  const stats = useMemo(() => ({
    total: filteredTerranes.length,
    totalArea: filteredTerranes.reduce((sum, t) => sum + (t.area || 0), 0),
    highPotential: filteredTerranes.filter((t) => t.explorationPotential === "high").length,
    byType: groupBy(filteredTerranes, "type"),
  }), [filteredTerranes]);
  
  return {
    terranes: filteredTerranes,
    stats,
    filterByType: (type: string) =>
      filteredTerranes.filter((t) => t.type === type),
    filterByMineral: (mineral: CommodityType) =>
      filteredTerranes.filter((t) => t.minerals.includes(mineral)),
  };
}

/**
 * Hook for infrastructure data
 */
export function useInfrastructure(filters?: FilterOptions) {
  const filteredInfrastructure = useMemo(() => {
    let result = [...miningInfrastructure];
    
    if (filters?.regions?.length) {
      result = result.filter((i) =>
        filters.regions?.includes(i.location.region)
      );
    }
    
    if (filters?.types?.length) {
      result = result.filter((i) => filters.types?.includes(i.type));
    }
    
    if (filters?.statuses?.length) {
      result = result.filter((i) => filters.statuses?.includes(i.status));
    }
    
    if (filters?.search) {
      result = searchItems(result, filters.search);
    }
    
    return result;
  }, [filters]);
  
  const stats = useMemo(() => ({
    total: filteredInfrastructure.length,
    operational: filteredInfrastructure.filter((i) => i.status === "operational").length,
    underConstruction: filteredInfrastructure.filter((i) => i.status === "under-construction").length,
    planned: filteredInfrastructure.filter((i) => i.status === "planned").length,
    byType: groupBy(filteredInfrastructure, "type"),
  }), [filteredInfrastructure]);
  
  return {
    infrastructure: filteredInfrastructure,
    stats,
    filterByType: (type: string) =>
      filteredInfrastructure.filter((i) => i.type === type),
    getOperational: () =>
      filteredInfrastructure.filter((i) => i.status === "operational"),
  };
}

/**
 * Hook for mining companies
 */
export function useMiningCompanies(filters?: FilterOptions) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCompanies = useMemo(() => {
    let result = [...miningCompanies];
    
    if (filters?.types?.length) {
      result = result.filter((c) => filters.types?.includes(c.type));
    }
    
    if (filters?.commodities?.length) {
      result = result.filter((c) =>
        c.operations?.some((op) =>
          op.commodities.some((com) => filters.commodities?.includes(com))
        )
      );
    }
    
    if (filters?.search || searchQuery) {
      const query = (filters?.search || searchQuery).toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.fullName?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [filters, searchQuery]);
  
  const stats = useMemo(() => ({
    total: filteredCompanies.length,
    totalEmployees: filteredCompanies.reduce(
      (sum, c) => sum + (c.employees || 0),
      0
    ),
    byType: groupBy(filteredCompanies, "type"),
    publiclyTraded: filteredCompanies.filter(
      (c) => c.stockSymbol && !c.stockSymbol.includes("Private")
    ).length,
  }), [filteredCompanies]);
  
  return {
    companies: filteredCompanies,
    stats,
    searchQuery,
    setSearchQuery,
    filterByType: (type: string) =>
      filteredCompanies.filter((c) => c.type === type),
    getByOperationType: (opType: string) =>
      filteredCompanies.filter((c) =>
        c.operations?.some((op) => op.type === opType)
      ),
  };
}

/**
 * Hook for mineral production statistics
 */
export function useMineralProduction(mineral?: CommodityType) {
  const productionData = useMemo(() => {
    if (mineral) {
      return mineralProduction.filter((p) => p.mineral === mineral);
    }
    return mineralProduction;
  }, [mineral]);
  
  const latestYear = useMemo(() => {
    return Math.max(...productionData.map((p) => p.year));
  }, [productionData]);
  
  const latestProduction = useMemo(() => {
    return productionData.filter((p) => p.year === latestYear);
  }, [productionData, latestYear]);
  
  const growthRates = useMemo(() => {
    const rates: Record<string, number> = {};
    latestProduction.forEach((p) => {
      if (p.growthRate) {
        rates[p.mineral] = p.growthRate;
      }
    });
    return rates;
  }, [latestProduction]);
  
  return {
    production: productionData,
    latestYear,
    latestProduction,
    growthRates,
    getByYear: (year: number) => productionData.filter((p) => p.year === year),
    getHistory: (m: CommodityType) => getProductionHistory(m),
  };
}

/**
 * Combined dashboard data hook using React Query
 */
export function useDashboardData() {
  return useQuery({
    queryKey: ["dashboard-data"],
    queryFn: async () => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      return {
        deposits: {
          total: mineralDeposits.length,
          active: mineralDeposits.filter((d) => d.status === "active").length,
          byType: groupBy(mineralDeposits, "type"),
        },
        tenders: {
          total: tenderRounds.length,
          open: tenderRounds.filter((t) => t.status === "open").length,
          totalArea: calculateTotalArea(tenderRounds),
        },
        companies: {
          total: miningCompanies.length,
          employees: miningCompanies.reduce(
            (sum, c) => sum + (c.employees || 0),
            0
          ),
        },
        infrastructure: {
          total: miningInfrastructure.length,
          operational: miningInfrastructure.filter(
            (i) => i.status === "operational"
          ).length,
        },
        geology: {
          terranes: geologicalTerranes.length,
          highPotential: geologicalTerranes.filter(
            (t) => t.explorationPotential === "high"
          ).length,
        },
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

