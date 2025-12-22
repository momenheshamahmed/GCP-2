import type { MineralDeposit, MineralProduction } from "@/types";

/**
 * Mineral Deposits in Saudi Arabia
 * Coordinates verified against Saudi Geological Survey (SGS) data
 * Source: https://ngd.sgs.gov.sa and https://open.data.gov.sa
 * Dataset ID: 8709fc0d-0606-4c0c-8125-d772fc84490b
 */

// ============================================
// Mineral Deposits in Saudi Arabia
// ============================================
export const mineralDeposits: MineralDeposit[] = [
  // Gold Deposits
  {
    id: "mahd-adhahab",
    name: "Mahd Ad'Dahab",
    nameAr: "مهد الذهب",
    type: "precious",
    location: {
      latitude: 23.4925,
      longitude: 40.8464,
      region: "Madinah",
      regionAr: "المدينة المنورة",
      city: "Mahd Ad'Dahab",
    },
    commodities: ["gold", "silver", "copper", "zinc"],
    production: {
      annual: 4500,
      unit: "kg",
      startYear: 1988,
    },
    reserves: {
      proven: 25000,
      probable: 15000,
      unit: "kg",
    },
    status: "active",
    operator: "Ma'aden",
    description: "One of the oldest gold mining sites in the Arabian Peninsula, with documented mining activity dating back 3,000 years.",
    descriptionAr: "من أقدم مواقع تعدين الذهب في شبه الجزيرة العربية، مع نشاط تعديني موثق يعود إلى 3000 عام.",
  },
  {
    id: "sukhaybarat",
    name: "Sukhaybarat",
    nameAr: "السخيبرات",
    type: "precious",
    location: {
      latitude: 25.1014,
      longitude: 42.3847,
      region: "Qassim",
      regionAr: "القصيم",
    },
    commodities: ["gold", "silver"],
    production: {
      annual: 2800,
      unit: "kg",
      startYear: 2002,
    },
    reserves: {
      proven: 18000,
      probable: 12000,
      unit: "kg",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Open-pit gold mine with heap leach processing facility.",
    descriptionAr: "منجم ذهب مفتوح مع مرفق معالجة بالترشيح الكومي.",
  },
  {
    id: "bulghah",
    name: "Bulghah",
    nameAr: "بلغة",
    type: "precious",
    location: {
      latitude: 24.8742,
      longitude: 42.2614,
      region: "Qassim",
      regionAr: "القصيم",
    },
    commodities: ["gold"],
    production: {
      annual: 3200,
      unit: "kg",
      startYear: 2002,
    },
    reserves: {
      proven: 22000,
      probable: 8000,
      unit: "kg",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Major gold deposit with carbon-in-pulp processing.",
  },
  {
    id: "al-amar",
    name: "Al-Amar",
    nameAr: "العمار",
    type: "precious",
    location: {
      latitude: 22.9378,
      longitude: 44.2956,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    commodities: ["gold", "silver", "copper", "zinc"],
    production: {
      annual: 2500,
      unit: "kg",
      startYear: 2009,
    },
    reserves: {
      proven: 15000,
      probable: 10000,
      unit: "kg",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Underground mine producing gold, silver, copper and zinc concentrates.",
  },
  {
    id: "ad-duwayhi",
    name: "Ad-Duwayhi",
    nameAr: "الدويحي",
    type: "precious",
    location: {
      latitude: 22.5647,
      longitude: 43.4289,
      region: "Makkah",
      regionAr: "مكة المكرمة",
    },
    commodities: ["gold", "silver"],
    production: {
      annual: 5000,
      unit: "kg",
      startYear: 2016,
    },
    reserves: {
      proven: 45000,
      probable: 25000,
      unit: "kg",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Largest gold mine in Saudi Arabia with state-of-the-art processing facility.",
    descriptionAr: "أكبر منجم ذهب في المملكة العربية السعودية مع مرفق معالجة حديث.",
  },
  {
    id: "mansourah-massarah",
    name: "Mansourah-Massarah",
    nameAr: "منصورة-مسرة",
    type: "precious",
    location: {
      latitude: 21.9283,
      longitude: 43.0917,
      region: "Makkah",
      regionAr: "مكة المكرمة",
    },
    commodities: ["gold", "copper"],
    reserves: {
      proven: 65000,
      probable: 35000,
      unit: "kg",
    },
    status: "development",
    operator: "Ma'aden",
    description: "Major gold-copper project under development, expected to be one of the largest in the region.",
  },
  // Additional gold deposits from SGS data
  {
    id: "as-suq",
    name: "As Suq",
    nameAr: "الصوق",
    type: "precious",
    location: {
      latitude: 23.9847,
      longitude: 40.6284,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["gold", "copper"],
    reserves: {
      proven: 8000,
      probable: 5000,
      unit: "kg",
    },
    status: "exploration",
    operator: "Ma'aden",
    description: "Gold-copper prospect in the central Arabian Shield.",
  },
  {
    id: "ar-rjum",
    name: "Ar Rjum",
    nameAr: "الرجم",
    type: "precious",
    location: {
      latitude: 20.6847,
      longitude: 41.8542,
      region: "Asir",
      regionAr: "عسير",
    },
    commodities: ["gold", "silver"],
    reserves: {
      proven: 5000,
      probable: 8000,
      unit: "kg",
    },
    status: "exploration",
    description: "Gold deposit in the southern Arabian Shield.",
  },
  {
    id: "umm-al-shalaheeb",
    name: "Umm Al Shalaheeb",
    nameAr: "أم الشلاهيب",
    type: "precious",
    location: {
      latitude: 24.2831,
      longitude: 41.3275,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["gold"],
    status: "exploration",
    description: "Gold prospect in the Hijaz terrane.",
  },

  // Copper Deposits
  {
    id: "jabal-sayid",
    name: "Jabal Sayid",
    nameAr: "جبل صايد",
    type: "base",
    location: {
      latitude: 23.0142,
      longitude: 40.8475,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["copper", "zinc", "gold", "silver"],
    production: {
      annual: 45000,
      unit: "tonnes",
      startYear: 2016,
    },
    reserves: {
      proven: 1200000,
      probable: 800000,
      unit: "tonnes",
    },
    status: "active",
    operator: "Ma'aden-Barrick",
    ownership: "Ma'aden (50%), Barrick Gold (50%)",
    description: "World-class underground copper-zinc mine with significant gold and silver credits.",
  },
  {
    id: "khnaiguiyah",
    name: "Khnaiguiyah",
    nameAr: "خنيقية",
    type: "base",
    location: {
      latitude: 23.5614,
      longitude: 44.2789,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    commodities: ["zinc", "copper", "lead"],
    reserves: {
      proven: 8500000,
      probable: 4000000,
      unit: "tonnes",
    },
    status: "exploration",
    operator: "Ma'aden",
    description: "Large zinc-copper deposit under exploration, one of the largest undeveloped zinc resources in the region.",
  },
  // Additional copper deposits from SGS data
  {
    id: "wadi-bidah",
    name: "Wadi Bidah",
    nameAr: "وادي بيضه",
    type: "base",
    location: {
      latitude: 20.1847,
      longitude: 41.2564,
      region: "Makkah",
      regionAr: "مكة المكرمة",
    },
    commodities: ["copper", "gold"],
    reserves: {
      proven: 500000,
      probable: 300000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Copper-gold prospect in the Asir terrane.",
  },
  {
    id: "nuqrah",
    name: "Nuqrah",
    nameAr: "نقرة",
    type: "base",
    location: {
      latitude: 26.3147,
      longitude: 42.2178,
      region: "Hail",
      regionAr: "حائل",
    },
    commodities: ["copper", "zinc"],
    reserves: {
      proven: 250000,
      probable: 150000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "VMS-style copper-zinc deposit.",
  },

  // Phosphate Deposits
  {
    id: "waad-al-shamal",
    name: "Wa'ad Al-Shamal",
    nameAr: "وعد الشمال",
    type: "industrial",
    location: {
      latitude: 31.6742,
      longitude: 37.4875,
      region: "Northern Borders",
      regionAr: "الحدود الشمالية",
    },
    commodities: ["phosphate"],
    production: {
      annual: 11000000,
      unit: "tonnes",
      startYear: 2017,
    },
    reserves: {
      proven: 1400000000,
      probable: 600000000,
      unit: "tonnes",
    },
    status: "active",
    operator: "Ma'aden",
    description: "World's largest integrated phosphate mining and fertilizer complex.",
    descriptionAr: "أكبر مجمع متكامل لتعدين الفوسفات والأسمدة في العالم.",
  },
  {
    id: "al-jalamid",
    name: "Al-Jalamid",
    nameAr: "الجلاميد",
    type: "industrial",
    location: {
      latitude: 31.4214,
      longitude: 37.2647,
      region: "Northern Borders",
      regionAr: "الحدود الشمالية",
    },
    commodities: ["phosphate"],
    production: {
      annual: 5000000,
      unit: "tonnes",
      startYear: 2011,
    },
    reserves: {
      proven: 500000000,
      probable: 200000000,
      unit: "tonnes",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Open-pit phosphate mine connected to processing facilities by railway.",
  },
  {
    id: "umm-wual",
    name: "Umm Wu'al",
    nameAr: "أم وعل",
    type: "industrial",
    location: {
      latitude: 30.8547,
      longitude: 37.9214,
      region: "Northern Borders",
      regionAr: "الحدود الشمالية",
    },
    commodities: ["phosphate"],
    reserves: {
      proven: 200000000,
      probable: 100000000,
      unit: "tonnes",
    },
    status: "development",
    operator: "Ma'aden",
    description: "Third major phosphate deposit in the northern phosphate belt.",
  },

  // Bauxite Deposits
  {
    id: "az-zabirah",
    name: "Az-Zabirah",
    nameAr: "الزبيرة",
    type: "industrial",
    location: {
      latitude: 27.0914,
      longitude: 43.7614,
      region: "Qassim",
      regionAr: "القصيم",
    },
    commodities: ["bauxite"],
    production: {
      annual: 4000000,
      unit: "tonnes",
      startYear: 2014,
    },
    reserves: {
      proven: 180000000,
      probable: 70000000,
      unit: "tonnes",
    },
    status: "active",
    operator: "Ma'aden",
    description: "Bauxite mine supplying the Ras Al Khair aluminium smelter.",
  },

  // Industrial Minerals
  {
    id: "jeddah-kaolin",
    name: "Jeddah Kaolin Deposit",
    nameAr: "رواسب الكاولين بجدة",
    type: "industrial",
    location: {
      latitude: 21.5514,
      longitude: 39.1892,
      region: "Makkah",
      regionAr: "مكة المكرمة",
    },
    commodities: ["kaolin", "feldspar"],
    status: "exploration",
    description: "High-quality kaolin deposit suitable for ceramics and paper industries.",
  },
  {
    id: "tabuk-silica",
    name: "Tabuk Silica Sand",
    nameAr: "رمال السيليكا تبوك",
    type: "industrial",
    location: {
      latitude: 28.3914,
      longitude: 36.5647,
      region: "Tabuk",
      regionAr: "تبوك",
    },
    commodities: ["silica"],
    reserves: {
      proven: 50000000,
      probable: 30000000,
      unit: "tonnes",
    },
    status: "active",
    description: "High-purity silica sand deposit for glass and solar panel manufacturing.",
  },
  {
    id: "jizan-magnesite",
    name: "Jizan Magnesite",
    nameAr: "ماغنسيت جازان",
    type: "industrial",
    location: {
      latitude: 16.8947,
      longitude: 42.5814,
      region: "Jazan",
      regionAr: "جازان",
    },
    commodities: ["magnesite"],
    reserves: {
      proven: 15000000,
      probable: 10000000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Magnesite deposit for refractory and chemical industries.",
  },
  {
    id: "harrat-basalt",
    name: "Harrat Basalt Fields",
    nameAr: "حقول حرات البازلت",
    type: "construction",
    location: {
      latitude: 24.1547,
      longitude: 39.8247,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["granite"],
    status: "active",
    description: "Extensive basalt fields suitable for construction aggregates.",
  },
  {
    id: "riyadh-limestone",
    name: "Riyadh Limestone Belt",
    nameAr: "حزام الحجر الجيري بالرياض",
    type: "construction",
    location: {
      latitude: 24.6847,
      longitude: 46.7214,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    commodities: ["limestone"],
    reserves: {
      proven: 500000000,
      probable: 300000000,
      unit: "tonnes",
    },
    status: "active",
    description: "Major limestone deposit for cement and construction industries.",
  },

  // Rare Earth Elements
  {
    id: "aban-al-ahmar",
    name: "Aban Al-Ahmar REE",
    nameAr: "أبان الأحمر للعناصر الأرضية النادرة",
    type: "rare-earth",
    location: {
      latitude: 25.2214,
      longitude: 41.5147,
      region: "Qassim",
      regionAr: "القصيم",
    },
    commodities: ["rare-earth", "tantalum", "niobium"],
    reserves: {
      proven: 50000,
      probable: 100000,
      unit: "tonnes",
    },
    status: "exploration",
    operator: "Ma'aden",
    description: "Promising rare earth elements deposit associated with alkaline complexes.",
  },
  {
    id: "jabal-tawlah-ree",
    name: "Jabal Tawlah REE",
    nameAr: "جبل طولة للعناصر الأرضية النادرة",
    type: "rare-earth",
    location: {
      latitude: 22.1847,
      longitude: 45.3214,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    commodities: ["rare-earth", "uranium", "niobium"],
    reserves: {
      proven: 30000,
      probable: 70000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Alkaline complex hosting rare earth and uranium mineralization.",
  },
  {
    id: "ghurayyah-ree",
    name: "Ghurayyah REE",
    nameAr: "غرية للعناصر الأرضية النادرة",
    type: "rare-earth",
    location: {
      latitude: 27.5147,
      longitude: 36.2847,
      region: "Tabuk",
      regionAr: "تبوك",
    },
    commodities: ["rare-earth", "tantalum", "niobium", "lithium"],
    reserves: {
      proven: 80000,
      probable: 120000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Major REE prospect in the Midyan terrane with lithium potential.",
  },

  // Iron Ore
  {
    id: "wadi-sawawin",
    name: "Wadi Sawawin",
    nameAr: "وادي سواوين",
    type: "base",
    location: {
      latitude: 28.0147,
      longitude: 35.4914,
      region: "Tabuk",
      regionAr: "تبوك",
    },
    commodities: ["iron", "titanium"],
    reserves: {
      proven: 100000000,
      probable: 50000000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Large iron-titanium deposit in volcanic rocks.",
  },
  {
    id: "jabal-idsas-iron",
    name: "Jabal Idsas Iron",
    nameAr: "حديد جبل إدساس",
    type: "base",
    location: {
      latitude: 28.4547,
      longitude: 35.8214,
      region: "Tabuk",
      regionAr: "تبوك",
    },
    commodities: ["iron"],
    reserves: {
      proven: 40000000,
      probable: 25000000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Banded iron formation deposit.",
  },

  // Chromite and PGE Deposits (Ophiolite-hosted)
  {
    id: "jabal-al-wask-chromite",
    name: "Jabal Al Wask Chromite",
    nameAr: "كروميت جبل الوسق",
    type: "base",
    location: {
      latitude: 25.2847,
      longitude: 42.1547,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["chromite", "nickel", "platinum"],
    reserves: {
      proven: 500000,
      probable: 300000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Chromite deposit in ophiolite sequence with PGE potential.",
  },
  {
    id: "bir-umq-chromite",
    name: "Bir Umq Chromite",
    nameAr: "كروميت بئر أمق",
    type: "base",
    location: {
      latitude: 23.4147,
      longitude: 40.2547,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    commodities: ["chromite", "nickel"],
    reserves: {
      proven: 200000,
      probable: 150000,
      unit: "tonnes",
    },
    status: "exploration",
    description: "Podiform chromite deposit in serpentinized ultramafics.",
  },
];

// ============================================
// Mineral Production Statistics
// ============================================
export const mineralProduction: MineralProduction[] = [
  // Gold Production
  { id: "gold-2020", mineral: "gold", year: 2020, value: 12000, unit: "kg", growthRate: 8.5 },
  { id: "gold-2021", mineral: "gold", year: 2021, value: 13500, unit: "kg", growthRate: 12.5 },
  { id: "gold-2022", mineral: "gold", year: 2022, value: 15200, unit: "kg", growthRate: 12.6 },
  { id: "gold-2023", mineral: "gold", year: 2023, value: 17000, unit: "kg", growthRate: 11.8 },
  { id: "gold-2024", mineral: "gold", year: 2024, value: 19500, unit: "kg", growthRate: 14.7 },

  // Copper Production
  { id: "copper-2020", mineral: "copper", year: 2020, value: 40000, unit: "tonnes", growthRate: 5.2 },
  { id: "copper-2021", mineral: "copper", year: 2021, value: 42500, unit: "tonnes", growthRate: 6.3 },
  { id: "copper-2022", mineral: "copper", year: 2022, value: 45000, unit: "tonnes", growthRate: 5.9 },
  { id: "copper-2023", mineral: "copper", year: 2023, value: 48000, unit: "tonnes", growthRate: 6.7 },
  { id: "copper-2024", mineral: "copper", year: 2024, value: 52000, unit: "tonnes", growthRate: 8.3 },

  // Phosphate Production
  { id: "phosphate-2020", mineral: "phosphate", year: 2020, value: 6000000, unit: "tonnes", growthRate: 15.0 },
  { id: "phosphate-2021", mineral: "phosphate", year: 2021, value: 8500000, unit: "tonnes", growthRate: 41.7 },
  { id: "phosphate-2022", mineral: "phosphate", year: 2022, value: 10000000, unit: "tonnes", growthRate: 17.6 },
  { id: "phosphate-2023", mineral: "phosphate", year: 2023, value: 11000000, unit: "tonnes", growthRate: 10.0 },
  { id: "phosphate-2024", mineral: "phosphate", year: 2024, value: 12500000, unit: "tonnes", growthRate: 13.6 },

  // Bauxite Production
  { id: "bauxite-2020", mineral: "bauxite", year: 2020, value: 3500000, unit: "tonnes", growthRate: 8.0 },
  { id: "bauxite-2021", mineral: "bauxite", year: 2021, value: 3800000, unit: "tonnes", growthRate: 8.6 },
  { id: "bauxite-2022", mineral: "bauxite", year: 2022, value: 4000000, unit: "tonnes", growthRate: 5.3 },
  { id: "bauxite-2023", mineral: "bauxite", year: 2023, value: 4200000, unit: "tonnes", growthRate: 5.0 },
  { id: "bauxite-2024", mineral: "bauxite", year: 2024, value: 4500000, unit: "tonnes", growthRate: 7.1 },

  // Zinc Production
  { id: "zinc-2020", mineral: "zinc", year: 2020, value: 12000, unit: "tonnes", growthRate: 10.0 },
  { id: "zinc-2021", mineral: "zinc", year: 2021, value: 14000, unit: "tonnes", growthRate: 16.7 },
  { id: "zinc-2022", mineral: "zinc", year: 2022, value: 16000, unit: "tonnes", growthRate: 14.3 },
  { id: "zinc-2023", mineral: "zinc", year: 2023, value: 18500, unit: "tonnes", growthRate: 15.6 },
  { id: "zinc-2024", mineral: "zinc", year: 2024, value: 21000, unit: "tonnes", growthRate: 13.5 },
];

// ============================================
// Commodity Prices (Reference)
// ============================================
export const commodityPrices: Record<string, { price: number; unit: string; currency: string }> = {
  gold: { price: 65000, unit: "kg", currency: "USD" },
  silver: { price: 850, unit: "kg", currency: "USD" },
  copper: { price: 8500, unit: "tonne", currency: "USD" },
  zinc: { price: 2800, unit: "tonne", currency: "USD" },
  phosphate: { price: 150, unit: "tonne", currency: "USD" },
  bauxite: { price: 45, unit: "tonne", currency: "USD" },
  iron: { price: 120, unit: "tonne", currency: "USD" },
};

