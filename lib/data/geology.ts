import type { GeologicalTerrane } from "@/types";

// ============================================
// Geological Terranes of the Arabian Shield
// ============================================
export const geologicalTerranes: GeologicalTerrane[] = [
  // Western Terranes
  {
    id: "midyan-terrane",
    name: "Midyan Terrane",
    nameAr: "رقعة مدين",
    type: "arc",
    location: {
      latitude: 28.5000,
      longitude: 35.0000,
      region: "Tabuk",
      regionAr: "تبوك",
    },
    ageRange: {
      from: 780,
      to: 660,
      period: "Neoproterozoic",
    },
    description: "Northernmost terrane of the Arabian Shield, characterized by island arc volcanic rocks and associated granitic intrusions. Contains significant copper-gold mineralization.",
    descriptionAr: "أقصى الرقع الشمالية في الدرع العربي، تتميز بصخور بركانية قوسية جزيرية ومتداخلات جرانيتية مصاحبة.",
    minerals: ["copper", "gold", "zinc", "silver"],
    area: 45000,
    geologicalFeatures: [
      "Calc-alkaline volcanic sequences",
      "Granodiorite intrusions",
      "Volcanogenic massive sulfide deposits",
    ],
    explorationPotential: "high",
  },
  {
    id: "hijaz-terrane",
    name: "Hijaz Terrane",
    nameAr: "رقعة الحجاز",
    type: "arc",
    location: {
      latitude: 24.5000,
      longitude: 40.0000,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    ageRange: {
      from: 760,
      to: 640,
      period: "Neoproterozoic",
    },
    description: "Central belt hosting major gold deposits including Mahd Ad'Dahab. Composed of bimodal volcanic rocks and calc-alkaline plutonic complexes.",
    descriptionAr: "الحزام الأوسط الذي يستضيف رواسب الذهب الرئيسية بما في ذلك مهد الذهب.",
    minerals: ["gold", "silver", "copper", "zinc", "lead"],
    area: 85000,
    geologicalFeatures: [
      "Bimodal volcanic assemblages",
      "Calc-alkaline plutonic suites",
      "Auriferous quartz veins",
      "VMS deposits",
    ],
    explorationPotential: "high",
  },
  {
    id: "jiddah-terrane",
    name: "Jiddah Terrane",
    nameAr: "رقعة جدة",
    type: "arc",
    location: {
      latitude: 21.5000,
      longitude: 39.5000,
      region: "Makkah",
      regionAr: "مكة المكرمة",
    },
    ageRange: {
      from: 740,
      to: 640,
      period: "Neoproterozoic",
    },
    description: "Oceanic arc complex with significant ophiolite sequences and copper-gold mineralization potential.",
    minerals: ["copper", "gold", "chromite", "nickel"],
    area: 35000,
    geologicalFeatures: [
      "Ophiolite fragments",
      "Island arc volcanic rocks",
      "Ultramafic intrusions",
    ],
    explorationPotential: "medium",
  },

  // Eastern Terranes
  {
    id: "afif-terrane",
    name: "Afif Terrane",
    nameAr: "رقعة عفيف",
    type: "arc",
    location: {
      latitude: 23.5000,
      longitude: 43.0000,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    ageRange: {
      from: 750,
      to: 620,
      period: "Neoproterozoic",
    },
    description: "Largest terrane of the Arabian Shield, hosting major gold and base metal deposits. Contains the Al-Amar and Khnaiguiyah deposits.",
    descriptionAr: "أكبر رقعة في الدرع العربي، تستضيف رواسب الذهب والمعادن الأساسية الرئيسية.",
    minerals: ["gold", "copper", "zinc", "lead", "silver"],
    area: 120000,
    geologicalFeatures: [
      "Mature arc volcanic rocks",
      "Syn-orogenic granites",
      "Major shear zones",
      "Carbonate-hosted mineralization",
    ],
    explorationPotential: "high",
  },
  {
    id: "ar-rayn-terrane",
    name: "Ar Rayn Terrane",
    nameAr: "رقعة الرين",
    type: "arc",
    location: {
      latitude: 22.0000,
      longitude: 45.5000,
      region: "Riyadh",
      regionAr: "الرياض",
    },
    ageRange: {
      from: 680,
      to: 580,
      period: "Ediacaran",
    },
    description: "Easternmost terrane with alkaline complexes hosting rare earth element potential.",
    minerals: ["rare-earth", "tantalum", "niobium", "uranium"],
    area: 45000,
    geologicalFeatures: [
      "Alkaline ring complexes",
      "Post-orogenic granites",
      "REE-bearing pegmatites",
    ],
    explorationPotential: "high",
  },

  // Southern Terranes
  {
    id: "asir-terrane",
    name: "Asir Terrane",
    nameAr: "رقعة عسير",
    type: "arc",
    location: {
      latitude: 19.0000,
      longitude: 42.5000,
      region: "Asir",
      regionAr: "عسير",
    },
    ageRange: {
      from: 780,
      to: 620,
      period: "Neoproterozoic",
    },
    description: "Southern volcanic arc terrane with significant copper and gold potential in shear zone-hosted deposits.",
    minerals: ["copper", "gold", "silver", "zinc"],
    area: 65000,
    geologicalFeatures: [
      "Bimodal volcanic sequences",
      "Shear zone mineralization",
      "Massive sulfide prospects",
    ],
    explorationPotential: "medium",
  },
  {
    id: "najran-terrane",
    name: "Najran Terrane",
    nameAr: "رقعة نجران",
    type: "arc",
    location: {
      latitude: 17.5000,
      longitude: 44.0000,
      region: "Najran",
      regionAr: "نجران",
    },
    ageRange: {
      from: 750,
      to: 600,
      period: "Neoproterozoic",
    },
    description: "Southernmost terrane with potential for copper-gold mineralization and industrial minerals.",
    minerals: ["copper", "gold", "limestone", "marble"],
    area: 40000,
    geologicalFeatures: [
      "Volcanic arc assemblages",
      "Carbonate sequences",
      "Granitoid intrusions",
    ],
    explorationPotential: "medium",
  },

  // Ophiolite Belts
  {
    id: "hulayfah-ophiolite",
    name: "Hulayfah Ophiolite Belt",
    nameAr: "حزام حليفة الأفيوليتي",
    type: "ophiolite",
    location: {
      latitude: 25.5000,
      longitude: 42.0000,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    ageRange: {
      from: 780,
      to: 700,
      period: "Neoproterozoic",
    },
    description: "Major ophiolite belt containing chromite, nickel, and platinum group elements in ultramafic rocks.",
    minerals: ["chromite", "nickel", "platinum", "palladium", "copper"],
    area: 25000,
    geologicalFeatures: [
      "Ophiolite massifs",
      "Chromitite pods",
      "Serpentinized peridotite",
      "PGE-bearing zones",
    ],
    explorationPotential: "high",
  },
  {
    id: "yanbu-ophiolite",
    name: "Yanbu Suture Zone",
    nameAr: "منطقة ينبع اللحامية",
    type: "ophiolite",
    location: {
      latitude: 24.0000,
      longitude: 38.5000,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    ageRange: {
      from: 740,
      to: 680,
      period: "Neoproterozoic",
    },
    description: "Suture zone with ophiolite fragments hosting copper and chromite mineralization.",
    minerals: ["copper", "chromite", "gold"],
    area: 15000,
    geologicalFeatures: [
      "Dismembered ophiolite",
      "Mélanges",
      "Cyprus-type VMS prospects",
    ],
    explorationPotential: "medium",
  },

  // Sedimentary Basins
  {
    id: "northern-phosphate",
    name: "Northern Phosphate Province",
    nameAr: "مقاطعة الفوسفات الشمالية",
    type: "sedimentary",
    location: {
      latitude: 31.0000,
      longitude: 37.5000,
      region: "Northern Borders",
      regionAr: "الحدود الشمالية",
    },
    ageRange: {
      from: 70,
      to: 40,
      period: "Late Cretaceous to Eocene",
    },
    description: "World-class phosphate province with multiple sedimentary horizons. Contains Wa'ad Al-Shamal and Al-Jalamid deposits.",
    descriptionAr: "مقاطعة فوسفات عالمية المستوى مع طبقات رسوبية متعددة.",
    minerals: ["phosphate"],
    area: 85000,
    geologicalFeatures: [
      "Marine phosphorite beds",
      "Paleocene-Eocene sequences",
      "Economic phosphate horizons",
    ],
    explorationPotential: "high",
  },
  {
    id: "eastern-sedimentary",
    name: "Eastern Sedimentary Basin",
    nameAr: "الحوض الرسوبي الشرقي",
    type: "sedimentary",
    location: {
      latitude: 26.0000,
      longitude: 49.0000,
      region: "Eastern Province",
      regionAr: "المنطقة الشرقية",
    },
    ageRange: {
      from: 250,
      to: 0,
      period: "Mesozoic to Present",
    },
    description: "Major sedimentary basin with construction materials, gypsum, and limestone deposits.",
    minerals: ["limestone", "gypsum", "silica"],
    area: 250000,
    geologicalFeatures: [
      "Carbonate platforms",
      "Evaporite sequences",
      "Sand dune systems",
    ],
    explorationPotential: "low",
  },

  // Volcanic Fields
  {
    id: "harrat-rahat",
    name: "Harrat Rahat",
    nameAr: "حرة رهط",
    type: "volcanic",
    location: {
      latitude: 23.5000,
      longitude: 39.7000,
      region: "Madinah",
      regionAr: "المدينة المنورة",
    },
    ageRange: {
      from: 10,
      to: 0,
      period: "Quaternary",
    },
    description: "Large volcanic field with basaltic lava flows, potential for industrial basalt and geothermal energy.",
    minerals: [],
    area: 20000,
    geologicalFeatures: [
      "Shield volcanoes",
      "Scoria cones",
      "Lava flows",
      "Geothermal potential",
    ],
    explorationPotential: "low",
  },
];

// ============================================
// Geological Statistics
// ============================================
export const geologyStats = {
  totalTerranes: geologicalTerranes.length,
  totalAreaKm2: geologicalTerranes.reduce((sum, t) => sum + (t.area || 0), 0),
  highPotential: geologicalTerranes.filter((t) => t.explorationPotential === "high").length,
  mediumPotential: geologicalTerranes.filter((t) => t.explorationPotential === "medium").length,
  byType: {
    arc: geologicalTerranes.filter((t) => t.type === "arc").length,
    ophiolite: geologicalTerranes.filter((t) => t.type === "ophiolite").length,
    sedimentary: geologicalTerranes.filter((t) => t.type === "sedimentary").length,
    volcanic: geologicalTerranes.filter((t) => t.type === "volcanic").length,
  },
};

