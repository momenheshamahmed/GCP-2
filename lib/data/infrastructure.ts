import type { Infrastructure, WaterResource, InvestmentMetric } from "@/types";

// ============================================
// Mining Infrastructure
// ============================================
export const miningInfrastructure: Infrastructure[] = [
  // Ports
  {
    id: "port-ras-al-khair",
    type: "port",
    name: "Ras Al Khair Industrial Port",
    nameAr: "   ",
    location: {
      latitude: 27.4833,
      longitude: 49.2167,
      region: "Eastern Province",
      regionAr: " ",
      city: "Ras Al Khair",
    },
    capacity: {
      value: 50000000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 27.4833, longitude: 49.2167 }],
    status: "operational",
    operator: "Saudi Ports Authority",
    completionYear: 2016,
    description: "Major industrial port serving the mining and petrochemical sectors with specialized bulk handling facilities.",
    descriptionAr: "           .",
    connectedTo: ["rail-sar-north"],
  },
  {
    id: "port-yanbu",
    type: "port",
    name: "Yanbu Commercial Port",
    nameAr: "  ",
    location: {
      latitude: 24.0889,
      longitude: 38.0628,
      region: "Madinah",
      regionAr: " ",
      city: "Yanbu",
    },
    capacity: {
      value: 25000000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 24.0889, longitude: 38.0628 }],
    status: "operational",
    operator: "Saudi Ports Authority",
    completionYear: 1979,
    description: "Major Red Sea port with mineral export capabilities.",
    connectedTo: ["road-yanbu-madinah"],
  },
  {
    id: "port-jeddah-islamic",
    type: "port",
    name: "Jeddah Islamic Port",
    nameAr: "  ",
    location: {
      latitude: 21.4858,
      longitude: 39.1925,
      region: "Makkah",
      regionAr: " ",
      city: "Jeddah",
    },
    capacity: {
      value: 65000000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 21.4858, longitude: 39.1925 }],
    status: "operational",
    operator: "Saudi Ports Authority",
    completionYear: 1976,
    description: "Largest port on the Red Sea, handling diverse cargo including minerals.",
  },
  {
    id: "port-duba",
    type: "port",
    name: "Duba Port",
    nameAr: " ",
    location: {
      latitude: 27.3500,
      longitude: 35.6833,
      region: "Tabuk",
      regionAr: "",
      city: "Duba",
    },
    capacity: {
      value: 5000000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 27.3500, longitude: 35.6833 }],
    status: "operational",
    operator: "Saudi Ports Authority",
    description: "Northern Red Sea port with expansion plans for mining exports.",
  },

  // Railways
  {
    id: "rail-sar-north",
    type: "rail",
    name: "Saudi Railway - North Line",
    nameAr: "    -  ",
    location: {
      latitude: 28.0000,
      longitude: 44.0000,
      region: "Northern Borders",
      regionAr: " ",
    },
    capacity: {
      value: 30000000,
      unit: "tonnes/year",
    },
    coordinates: [
      { latitude: 27.4833, longitude: 49.2167 }, // Ras Al Khair
      { latitude: 31.6667, longitude: 37.5000 }, // Wa'ad Al-Shamal
    ],
    status: "operational",
    operator: "Saudi Railway Company (SAR)",
    completionYear: 2017,
    description: "2,800 km railway connecting phosphate mines to processing and export facilities.",
    descriptionAr: "    2,800       .",
    connectedTo: ["port-ras-al-khair", "waad-al-shamal"],
  },
  {
    id: "rail-landbridge",
    type: "rail",
    name: "Saudi Landbridge Railway",
    nameAr: "   ",
    location: {
      latitude: 25.0000,
      longitude: 45.0000,
      region: "Riyadh",
      regionAr: "",
    },
    capacity: {
      value: 50000000,
      unit: "tonnes/year",
    },
    coordinates: [
      { latitude: 21.4858, longitude: 39.1925 }, // Jeddah
      { latitude: 24.6877, longitude: 46.7219 }, // Riyadh
      { latitude: 26.4207, longitude: 50.0888 }, // Dammam
    ],
    status: "under-construction",
    operator: "Saudi Railway Company (SAR)",
    completionYear: 2027,
    description: "Strategic railway connecting Red Sea to Arabian Gulf, passing through mining regions.",
    connectedTo: ["port-jeddah-islamic", "port-ras-al-khair"],
  },

  // Power Plants
  {
    id: "power-waad-shamal",
    type: "power-plant",
    name: "Wa'ad Al-Shamal Power Plant",
    nameAr: "   ",
    location: {
      latitude: 31.6500,
      longitude: 37.4833,
      region: "Northern Borders",
      regionAr: " ",
    },
    capacity: {
      value: 1390,
      unit: "MW",
    },
    coordinates: [{ latitude: 31.6500, longitude: 37.4833 }],
    status: "operational",
    operator: "ACWA Power",
    completionYear: 2017,
    description: "Combined cycle power plant providing electricity to the phosphate mining complex.",
  },
  {
    id: "power-ras-al-khair",
    type: "power-plant",
    name: "Ras Al Khair Power Plant",
    nameAr: "   ",
    location: {
      latitude: 27.5000,
      longitude: 49.2333,
      region: "Eastern Province",
      regionAr: " ",
    },
    capacity: {
      value: 2650,
      unit: "MW",
    },
    coordinates: [{ latitude: 27.5000, longitude: 49.2333 }],
    status: "operational",
    operator: "SEC",
    completionYear: 2014,
    description: "Major power plant serving the industrial city including aluminium smelter.",
  },
  {
    id: "power-mining-renewable",
    type: "power-plant",
    name: "Mining Sector Solar Complex",
    nameAr: "    ",
    location: {
      latitude: 24.5000,
      longitude: 41.5000,
      region: "Qassim",
      regionAr: "",
    },
    capacity: {
      value: 500,
      unit: "MW",
    },
    coordinates: [{ latitude: 24.5000, longitude: 41.5000 }],
    status: "planned",
    completionYear: 2028,
    description: "Planned solar power facility to provide renewable energy to mining operations.",
  },

  // Processing Facilities
  {
    id: "facility-ras-al-khair-aluminium",
    type: "processing-facility",
    name: "Ras Al Khair Aluminium Smelter",
    nameAr: "   ",
    location: {
      latitude: 27.4667,
      longitude: 49.2000,
      region: "Eastern Province",
      regionAr: " ",
    },
    capacity: {
      value: 740000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 27.4667, longitude: 49.2000 }],
    status: "operational",
    operator: "Ma'aden",
    completionYear: 2014,
    description: "World-class aluminium smelter processing bauxite into primary aluminium.",
  },
  {
    id: "facility-waad-fertilizer",
    type: "processing-facility",
    name: "Wa'ad Al-Shamal Fertilizer Complex",
    nameAr: "   ",
    location: {
      latitude: 31.6667,
      longitude: 37.5000,
      region: "Northern Borders",
      regionAr: " ",
    },
    capacity: {
      value: 3000000,
      unit: "tonnes/year",
    },
    coordinates: [{ latitude: 31.6667, longitude: 37.5000 }],
    status: "operational",
    operator: "Ma'aden-Mosaic-SABIC",
    completionYear: 2017,
    description: "Integrated phosphate fertilizer production complex producing DAP and MAP.",
  },
  {
    id: "facility-gold-refinery",
    type: "processing-facility",
    name: "Central Gold Refinery",
    nameAr: "  ",
    location: {
      latitude: 24.8000,
      longitude: 42.3000,
      region: "Qassim",
      regionAr: "",
    },
    capacity: {
      value: 25000,
      unit: "kg/year",
    },
    coordinates: [{ latitude: 24.8000, longitude: 42.3000 }],
    status: "operational",
    operator: "Ma'aden",
    completionYear: 2010,
    description: "Gold and silver refinery producing 99.99% pure gold bars.",
  },

  // Roads
  {
    id: "road-mining-highway",
    type: "road",
    name: "Mining Corridor Highway",
    nameAr: "   ",
    location: {
      latitude: 24.0000,
      longitude: 41.0000,
      region: "Madinah",
      regionAr: " ",
    },
    capacity: {
      value: 50000,
      unit: "vehicles/day",
    },
    coordinates: [
      { latitude: 24.0889, longitude: 38.0628 }, // Yanbu
      { latitude: 23.5092, longitude: 40.8553 }, // Mahd Ad'Dahab
      { latitude: 24.8667, longitude: 42.2500 }, // Bulghah
    ],
    status: "operational",
    description: "Strategic highway connecting Red Sea port to major gold mining operations.",
  },

  // Airports
  {
    id: "airport-waad-shamal",
    type: "airport",
    name: "Wa'ad Al-Shamal Airport",
    nameAr: "  ",
    location: {
      latitude: 31.7000,
      longitude: 37.5500,
      region: "Northern Borders",
      regionAr: " ",
    },
    coordinates: [{ latitude: 31.7000, longitude: 37.5500 }],
    status: "planned",
    completionYear: 2026,
    description: "Regional airport to support mining operations and industrial city.",
  },
];

// ============================================
// Water Resources
// ============================================
export const waterResources: WaterResource[] = [
  {
    id: "water-ras-al-khair-desal",
    type: "desalination",
    name: "Ras Al Khair Desalination Plant",
    nameAr: "   ",
    capacity: 1025000,
    unit: "m³/day",
    location: {
      latitude: 27.5000,
      longitude: 49.2333,
      region: "Eastern Province",
      regionAr: " ",
    },
    renewable: true,
    operator: "SWCC",
    description: "World's largest hybrid desalination plant serving industrial and domestic needs.",
  },
  {
    id: "water-waad-shamal",
    type: "desalination",
    name: "Wa'ad Al-Shamal Water Supply",
    nameAr: "   ",
    capacity: 75000,
    unit: "m³/day",
    location: {
      latitude: 31.6667,
      longitude: 37.5000,
      region: "Northern Borders",
      regionAr: " ",
    },
    renewable: true,
    description: "Dedicated water supply for phosphate mining operations.",
  },
  {
    id: "water-saq-aquifer",
    type: "groundwater",
    name: "Saq Aquifer",
    nameAr: "  ",
    capacity: 500000000,
    unit: "m³/year",
    renewable: false,
    quality: "good",
    description: "Major non-renewable aquifer system underlying northern Saudi Arabia.",
  },
  {
    id: "water-mining-recycled",
    type: "recycled",
    name: "Mining Sector Recycled Water",
    nameAr: "    ",
    capacity: 50000,
    unit: "m³/day",
    renewable: true,
    quality: "fair",
    description: "Treated wastewater recycled for mining and industrial processes.",
  },
];

// ============================================
// Investment Metrics
// ============================================
export const investmentMetrics: InvestmentMetric[] = [
  {
    id: "metric-total-investment",
    category: "Total Mining Investment",
    categoryAr: "  ",
    value: 125000000000,
    unit: "SAR",
    year: 2024,
    description: "Cumulative investment in the Saudi mining sector.",
    trend: "up",
    targetValue: 250000000000,
    targetYear: 2030,
  },
  {
    id: "metric-gdp-contribution",
    category: "GDP Contribution",
    categoryAr: "   ",
    value: 97000000000,
    unit: "SAR",
    year: 2024,
    ranking: {
      position: 3,
      total: 10,
      scope: "national",
    },
    description: "Mining sector contribution to Saudi GDP.",
    trend: "up",
    targetValue: 240000000000,
    targetYear: 2030,
  },
  {
    id: "metric-employment",
    category: "Direct Employment",
    categoryAr: " ",
    value: 85000,
    unit: "jobs",
    year: 2024,
    description: "Direct employment in the mining sector.",
    trend: "up",
    targetValue: 200000,
    targetYear: 2030,
  },
  {
    id: "metric-exploration-licenses",
    category: "Exploration Licenses",
    categoryAr: " ",
    value: 2450,
    unit: "licenses",
    year: 2024,
    trend: "up",
  },
  {
    id: "metric-mining-licenses",
    category: "Mining Licenses",
    categoryAr: " ",
    value: 89,
    unit: "licenses",
    year: 2024,
    trend: "up",
  },
  {
    id: "metric-export-value",
    category: "Mineral Exports",
    categoryAr: " ",
    value: 28500000000,
    unit: "SAR",
    year: 2024,
    description: "Total value of mineral and metal exports.",
    trend: "up",
  },
  {
    id: "metric-phosphate-rank",
    category: "Phosphate Production Rank",
    categoryAr: "  ",
    value: 6,
    unit: "position",
    year: 2024,
    ranking: {
      position: 6,
      total: 195,
      scope: "global",
    },
    description: "Saudi Arabia's global ranking in phosphate production.",
    trend: "stable",
  },
  {
    id: "metric-gold-rank",
    category: "Gold Production Rank (Arab World)",
    categoryAr: "   ( )",
    value: 1,
    unit: "position",
    year: 2024,
    ranking: {
      position: 1,
      total: 22,
      scope: "regional",
    },
    description: "Saudi Arabia's ranking in gold production among Arab countries.",
    trend: "stable",
  },
];

// ============================================
// Infrastructure Statistics
// ============================================
export const infrastructureStats = {
  totalFacilities: miningInfrastructure.length,
  operational: miningInfrastructure.filter((i) => i.status === "operational").length,
  underConstruction: miningInfrastructure.filter((i) => i.status === "under-construction").length,
  planned: miningInfrastructure.filter((i) => i.status === "planned").length,
  byType: {
    ports: miningInfrastructure.filter((i) => i.type === "port").length,
    railways: miningInfrastructure.filter((i) => i.type === "rail").length,
    powerPlants: miningInfrastructure.filter((i) => i.type === "power-plant").length,
    processingFacilities: miningInfrastructure.filter((i) => i.type === "processing-facility").length,
    roads: miningInfrastructure.filter((i) => i.type === "road").length,
    airports: miningInfrastructure.filter((i) => i.type === "airport").length,
  },
};

