import type { Company } from "@/types";

// ============================================
// Mining Companies in Saudi Arabia
// ============================================
export const miningCompanies: Company[] = [
  // State-Owned & Major Players
  {
    id: "maaden",
    name: "Ma'aden",
    nameAr: "معادن",
    fullName: "Saudi Arabian Mining Company",
    fullNameAr: "شركة التعدين العربية السعودية",
    type: "state-owned",
    operations: [
      { type: "mining", commodities: ["gold", "silver", "copper", "zinc"], startYear: 1997 },
      { type: "mining", commodities: ["phosphate"], startYear: 2011 },
      { type: "mining", commodities: ["bauxite"], startYear: 2014 },
      { type: "processing", commodities: ["phosphate"], location: "Wa'ad Al-Shamal" },
      { type: "refining", commodities: ["gold", "silver"], location: "Qassim" },
    ],
    ownership: {
      shareholders: [
        { name: "Public Investment Fund (PIF)", percentage: 65.44 },
        { name: "Public Float", percentage: 34.56 },
      ],
    },
    founded: 1997,
    headquarters: "Riyadh",
    employees: 18500,
    website: "https://www.maaden.com.sa",
    stockSymbol: "1211.SR",
    description: "Saudi Arabia's national mining champion and the largest multi-commodity mining and metals company in the Middle East.",
    descriptionAr: "بطل التعدين الوطني في المملكة العربية السعودية وأكبر شركة تعدين ومعادن متعددة السلع في الشرق الأوسط.",
    licenses: [
      { id: "lic-maaden-1", type: "Mining", region: "Multiple Regions", expiry: "2050-12-31" },
      { id: "lic-maaden-2", type: "Processing", region: "Northern Borders", expiry: "2047-06-30" },
    ],
  },
  {
    id: "maaden-barrick",
    name: "Ma'aden Barrick Copper Company",
    nameAr: "شركة معادن باريك للنحاس",
    type: "joint-venture",
    operations: [
      { type: "mining", commodities: ["copper", "zinc", "gold", "silver"], location: "Jabal Sayid" },
    ],
    ownership: {
      shareholders: [
        { name: "Ma'aden", percentage: 50 },
        { name: "Barrick Gold Corporation", percentage: 50 },
      ],
    },
    founded: 2014,
    headquarters: "Riyadh",
    employees: 1200,
    description: "Joint venture operating the world-class Jabal Sayid copper mine.",
    descriptionAr: "مشروع مشترك يدير منجم جبل صايد للنحاس ذو المستوى العالمي.",
  },
  {
    id: "maaden-mosaic",
    name: "Ma'aden Wa'ad Al-Shamal Phosphate Company",
    nameAr: "شركة معادن وعد الشمال للفوسفات",
    type: "joint-venture",
    operations: [
      { type: "mining", commodities: ["phosphate"], location: "Wa'ad Al-Shamal" },
      { type: "processing", commodities: ["phosphate"], location: "Wa'ad Al-Shamal" },
    ],
    ownership: {
      shareholders: [
        { name: "Ma'aden", percentage: 60 },
        { name: "Mosaic Company", percentage: 25 },
        { name: "SABIC", percentage: 15 },
      ],
    },
    founded: 2016,
    headquarters: "Riyadh",
    employees: 3500,
    description: "World's largest integrated phosphate mining and processing operation.",
  },

  // Private Mining Companies
  {
    id: "amak",
    name: "AMAK",
    nameAr: "أماك",
    fullName: "Al Masane Al Kobra Mining Company",
    fullNameAr: "شركة المصانع الكبرى للتعدين",
    type: "private",
    operations: [
      { type: "mining", commodities: ["copper", "zinc", "gold", "silver"], location: "Al Masane" },
      { type: "exploration", commodities: ["copper", "gold"], location: "Multiple" },
    ],
    ownership: {
      shareholders: [
        { name: "Al Masane Mining Group", percentage: 100 },
      ],
    },
    founded: 2008,
    headquarters: "Jeddah",
    employees: 850,
    website: "https://www.amak.com.sa",
    stockSymbol: "Private",
    description: "Leading private mining company operating the Al Masane copper-zinc-gold mine.",
    licenses: [
      { id: "lic-amak-1", type: "Mining", region: "Najran", expiry: "2048-03-15" },
    ],
  },
  {
    id: "ajlan-bros",
    name: "Ajlan & Bros Mining",
    nameAr: "أجلان وإخوانه للتعدين",
    type: "private",
    operations: [
      { type: "exploration", commodities: ["gold", "copper"], location: "Arabian Shield" },
      { type: "mining", commodities: ["gold"], location: "Development" },
    ],
    ownership: {
      shareholders: [
        { name: "Ajlan Family", percentage: 100 },
      ],
    },
    founded: 2015,
    headquarters: "Riyadh",
    employees: 450,
    description: "Growing private mining company with multiple exploration licenses.",
  },
  {
    id: "ara-resources",
    name: "ARA Resources",
    nameAr: "آرا للموارد",
    type: "private",
    operations: [
      { type: "exploration", commodities: ["gold", "silver", "copper"], location: "Madinah Region" },
    ],
    founded: 2020,
    headquarters: "Riyadh",
    employees: 120,
    description: "Junior mining company focused on exploration in the Hijaz terrane.",
  },
  {
    id: "bariq-mining",
    name: "Bariq Mining",
    nameAr: "بارق للتعدين",
    type: "private",
    operations: [
      { type: "exploration", commodities: ["copper", "zinc", "lead"], location: "Central Shield" },
    ],
    founded: 2019,
    headquarters: "Riyadh",
    employees: 85,
    description: "Exploration company with promising base metal projects.",
  },

  // International Companies
  {
    id: "barrick-gold",
    name: "Barrick Gold",
    nameAr: "باريك جولد",
    fullName: "Barrick Gold Corporation",
    type: "international",
    operations: [
      { type: "mining", commodities: ["copper", "gold"], location: "Jabal Sayid (JV)" },
      { type: "exploration", commodities: ["gold", "copper"], location: "Multiple" },
    ],
    founded: 1983,
    headquarters: "Toronto, Canada",
    employees: 200, // In Saudi Arabia
    website: "https://www.barrick.com",
    stockSymbol: "ABX",
    description: "Major international gold mining company with joint venture in Saudi Arabia.",
    descriptionAr: "شركة تعدين ذهب دولية كبرى لديها مشروع مشترك في المملكة العربية السعودية.",
  },
  {
    id: "ivanhoe-electric",
    name: "Ivanhoe Electric",
    nameAr: "إيفانهو إلكتريك",
    type: "international",
    operations: [
      { type: "exploration", commodities: ["copper", "gold"], location: "Arabian Shield" },
    ],
    founded: 2020,
    headquarters: "Phoenix, USA",
    employees: 50, // In Saudi Arabia
    website: "https://www.ivanhoeelectric.com",
    description: "Technology-driven mining company with exploration partnership in Saudi Arabia.",
  },
  {
    id: "mosaic-company",
    name: "The Mosaic Company",
    nameAr: "شركة موزاييك",
    type: "international",
    operations: [
      { type: "processing", commodities: ["phosphate"], location: "Wa'ad Al-Shamal (JV)" },
    ],
    founded: 2004,
    headquarters: "Tampa, USA",
    employees: 150, // In Saudi Arabia
    website: "https://www.mosaicco.com",
    stockSymbol: "MOS",
    description: "Global phosphate and potash producer with joint venture in Saudi Arabia.",
  },

  // Industrial Minerals
  {
    id: "saudi-ceramic",
    name: "Saudi Ceramic Company",
    nameAr: "الشركة السعودية للسيراميك",
    type: "private",
    operations: [
      { type: "mining", commodities: ["kaolin", "feldspar", "silica"], location: "Multiple" },
      { type: "processing", commodities: ["kaolin"], location: "Riyadh" },
    ],
    founded: 1977,
    headquarters: "Riyadh",
    employees: 2500,
    stockSymbol: "2040.SR",
    description: "Leading ceramics manufacturer with mining operations for raw materials.",
  },
  {
    id: "red-sea-housing",
    name: "Red Sea Housing Services",
    nameAr: "خدمات إسكان البحر الأحمر",
    type: "private",
    operations: [
      { type: "services", commodities: [], location: "Mining Sites" },
    ],
    founded: 2003,
    headquarters: "Jeddah",
    employees: 3200,
    description: "Provider of modular accommodation for mining and industrial sites.",
  },

  // Service & Equipment Companies
  {
    id: "mining-services-co",
    name: "Saudi Mining Services",
    nameAr: "خدمات التعدين السعودية",
    type: "private",
    operations: [
      { type: "services", commodities: [], location: "Nationwide" },
    ],
    founded: 2012,
    headquarters: "Riyadh",
    employees: 1800,
    description: "Comprehensive mining support services including drilling, blasting, and logistics.",
  },
  {
    id: "geo-survey-co",
    name: "Saudi Geological Services",
    nameAr: "الخدمات الجيولوجية السعودية",
    type: "private",
    operations: [
      { type: "exploration", commodities: [], location: "Nationwide" },
    ],
    founded: 2010,
    headquarters: "Jeddah",
    employees: 450,
    description: "Geological consulting and survey services for the mining sector.",
  },

  // Emerging Companies
  {
    id: "vision-mining",
    name: "Vision Mining Company",
    nameAr: "شركة رؤية للتعدين",
    type: "private",
    operations: [
      { type: "exploration", commodities: ["copper", "gold", "silver"], location: "Asir Region" },
    ],
    founded: 2021,
    headquarters: "Riyadh",
    employees: 180,
    description: "New entrant focused on developing greenfield mining projects aligned with Vision 2030.",
    licenses: [
      { id: "lic-vision-1", type: "Exploration", region: "Asir", expiry: "2029-06-30" },
    ],
  },
  {
    id: "neom-mining",
    name: "NEOM Mining Ventures",
    nameAr: "مشاريع نيوم للتعدين",
    type: "subsidiary",
    operations: [
      { type: "exploration", commodities: ["copper", "gold", "rare-earth"], location: "NEOM Region" },
    ],
    ownership: {
      shareholders: [
        { name: "NEOM Company", percentage: 100 },
      ],
    },
    founded: 2022,
    headquarters: "NEOM",
    employees: 75,
    description: "Mining division of NEOM focused on sustainable mineral extraction.",
  },
];

// ============================================
// Company Statistics
// ============================================
export const companyStats = {
  total: miningCompanies.length,
  byType: {
    stateOwned: miningCompanies.filter((c) => c.type === "state-owned").length,
    private: miningCompanies.filter((c) => c.type === "private").length,
    jointVenture: miningCompanies.filter((c) => c.type === "joint-venture").length,
    international: miningCompanies.filter((c) => c.type === "international").length,
    subsidiary: miningCompanies.filter((c) => c.type === "subsidiary").length,
  },
  totalEmployees: miningCompanies.reduce((sum, c) => sum + (c.employees || 0), 0),
  publiclyTraded: miningCompanies.filter((c) => c.stockSymbol && !c.stockSymbol.includes("Private")).length,
};

// ============================================
// Major Shareholders
// ============================================
export const majorShareholders = [
  {
    name: "Public Investment Fund (PIF)",
    nameAr: "صندوق الاستثمارات العامة",
    holdings: [
      { company: "Ma'aden", percentage: 65.44 },
    ],
    type: "Sovereign Wealth Fund",
  },
  {
    name: "Barrick Gold Corporation",
    nameAr: "شركة باريك جولد",
    holdings: [
      { company: "Ma'aden Barrick Copper Company", percentage: 50 },
    ],
    type: "International Mining Company",
  },
  {
    name: "The Mosaic Company",
    nameAr: "شركة موزاييك",
    holdings: [
      { company: "Ma'aden Wa'ad Al-Shamal Phosphate Company", percentage: 25 },
    ],
    type: "International Mining Company",
  },
  {
    name: "SABIC",
    nameAr: "سابك",
    holdings: [
      { company: "Ma'aden Wa'ad Al-Shamal Phosphate Company", percentage: 15 },
    ],
    type: "Petrochemical Company",
  },
];

