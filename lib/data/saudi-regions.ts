import type { Feature, FeatureCollection, Polygon } from "geojson";

/**
 * Saudi Arabia Administrative Regions GeoJSON
 * The Kingdom has 13 administrative regions (مناطق إدارية)
 * Coordinates are approximate boundaries for visualization purposes
 */

export interface SaudiRegionProperties {
  id: string;
  name: string;
  nameAr: string;
  capital: string;
  capitalAr: string;
  capitalCoords: [number, number]; // [lat, lng]
  area: number; // km²
  population: number; // approximate
}

export type SaudiRegionFeature = Feature<Polygon, SaudiRegionProperties>;

export const saudiRegionsGeoJSON: FeatureCollection<Polygon, SaudiRegionProperties> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "riyadh",
        name: "Riyadh",
        nameAr: "الرياض",
        capital: "Riyadh",
        capitalAr: "الرياض",
        capitalCoords: [24.7136, 46.6753],
        area: 404240,
        population: 8454453,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [43.5, 27.0], [45.0, 27.5], [47.0, 27.0], [48.5, 26.0],
          [49.0, 24.5], [48.5, 23.0], [48.0, 21.5], [47.0, 20.0],
          [45.5, 19.5], [44.0, 20.0], [43.0, 21.5], [42.5, 23.0],
          [42.5, 25.0], [43.5, 27.0]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "makkah",
        name: "Makkah",
        nameAr: "مكة المكرمة",
        capital: "Makkah",
        capitalAr: "مكة المكرمة",
        capitalCoords: [21.4225, 39.8262],
        area: 153128,
        population: 8557766,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [38.0, 23.5], [40.0, 23.5], [41.5, 22.5], [42.0, 21.0],
          [41.5, 19.5], [40.0, 18.5], [38.5, 18.5], [37.5, 19.5],
          [37.0, 21.0], [37.5, 22.5], [38.0, 23.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "madinah",
        name: "Madinah",
        nameAr: "المدينة المنورة",
        capital: "Madinah",
        capitalAr: "المدينة المنورة",
        capitalCoords: [24.5247, 39.5692],
        area: 151990,
        population: 2132679,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.0, 28.0], [39.5, 28.0], [41.0, 27.0], [42.0, 25.5],
          [41.5, 24.0], [40.0, 23.0], [38.0, 23.5], [37.0, 24.5],
          [36.0, 26.0], [37.0, 28.0]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "eastern",
        name: "Eastern Province",
        nameAr: "المنطقة الشرقية",
        capital: "Dammam",
        capitalAr: "الدمام",
        capitalCoords: [26.4207, 50.0888],
        area: 672522,
        population: 4900325,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [49.0, 28.5], [51.0, 28.0], [51.5, 26.0], [51.0, 24.0],
          [50.5, 22.0], [50.0, 20.0], [49.0, 18.5], [48.0, 19.0],
          [47.5, 21.0], [48.0, 23.0], [48.5, 25.0], [49.0, 28.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "qassim",
        name: "Qassim",
        nameAr: "القصيم",
        capital: "Buraydah",
        capitalAr: "بريدة",
        capitalCoords: [26.3292, 43.9750],
        area: 58046,
        population: 1455693,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [42.0, 27.5], [44.5, 27.5], [45.5, 26.5], [45.5, 25.0],
          [44.5, 24.0], [42.5, 24.5], [41.5, 25.5], [42.0, 27.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "asir",
        name: "Asir",
        nameAr: "عسير",
        capital: "Abha",
        capitalAr: "أبها",
        capitalCoords: [18.2164, 42.5053],
        area: 76693,
        population: 2211875,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [41.0, 20.0], [43.0, 20.0], [44.5, 19.0], [44.5, 17.5],
          [43.0, 17.0], [41.5, 17.0], [40.0, 17.5], [39.5, 18.5],
          [40.0, 19.5], [41.0, 20.0]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "tabuk",
        name: "Tabuk",
        nameAr: "تبوك",
        capital: "Tabuk",
        capitalAr: "تبوك",
        capitalCoords: [28.3838, 36.5550],
        area: 136000,
        population: 910030,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [34.5, 29.5], [37.0, 29.5], [38.0, 28.5], [37.5, 27.0],
          [36.5, 26.0], [35.0, 26.0], [34.0, 27.0], [34.5, 29.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "hail",
        name: "Ha'il",
        nameAr: "حائل",
        capital: "Ha'il",
        capitalAr: "حائل",
        capitalCoords: [27.5114, 41.7208],
        area: 103887,
        population: 731147,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [39.5, 28.5], [42.0, 28.5], [43.0, 27.5], [42.5, 26.0],
          [41.0, 25.5], [39.5, 26.0], [38.5, 27.0], [39.5, 28.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "northern-borders",
        name: "Northern Borders",
        nameAr: "الحدود الشمالية",
        capital: "Arar",
        capitalAr: "عرعر",
        capitalCoords: [30.9753, 41.0381],
        area: 111797,
        population: 375310,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [38.0, 32.0], [42.0, 32.0], [44.0, 31.0], [44.0, 29.0],
          [42.5, 28.5], [40.0, 28.5], [38.0, 29.5], [38.0, 32.0]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "jazan",
        name: "Jazan",
        nameAr: "جازان",
        capital: "Jazan",
        capitalAr: "جازان",
        capitalCoords: [16.8892, 42.5611],
        area: 11671,
        population: 1567547,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [41.5, 17.5], [43.0, 17.5], [43.5, 16.5], [42.5, 16.0],
          [41.0, 16.5], [41.0, 17.0], [41.5, 17.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "najran",
        name: "Najran",
        nameAr: "نجران",
        capital: "Najran",
        capitalAr: "نجران",
        capitalCoords: [17.4924, 44.1277],
        area: 149511,
        population: 582243,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [43.5, 19.5], [46.0, 19.5], [47.5, 18.0], [47.0, 17.0],
          [45.0, 16.5], [43.5, 17.0], [43.0, 18.0], [43.5, 19.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "al-bahah",
        name: "Al Bahah",
        nameAr: "الباحة",
        capital: "Al Bahah",
        capitalAr: "الباحة",
        capitalCoords: [20.0129, 41.4677],
        area: 9921,
        population: 476172,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [40.5, 20.5], [42.0, 20.5], [42.5, 19.5], [42.0, 18.5],
          [41.0, 18.5], [40.0, 19.0], [40.0, 20.0], [40.5, 20.5]
        ]],
      },
    },
    {
      type: "Feature",
      properties: {
        id: "al-jawf",
        name: "Al Jawf",
        nameAr: "الجوف",
        capital: "Sakakah",
        capitalAr: "سكاكا",
        capitalCoords: [29.9697, 40.2064],
        area: 100212,
        population: 508475,
      },
      geometry: {
        type: "Polygon",
        coordinates: [[
          [37.0, 32.0], [40.0, 32.0], [41.0, 31.0], [40.5, 29.5],
          [39.0, 28.5], [37.5, 29.0], [36.5, 30.0], [37.0, 32.0]
        ]],
      },
    },
  ],
};

/**
 * Saudi Arabia country outline with more detail
 * This is a simplified but accurate boundary
 */
export const saudiArabiaOutline: [number, number][] = [
  // Starting from Northwest, going clockwise
  [29.38, 34.95], // Northwest corner near Gulf of Aqaba
  [29.20, 35.19], [28.99, 35.49], [28.56, 35.60],
  [28.26, 35.82], [27.84, 35.59], [27.58, 35.90],
  [27.21, 36.07], [26.83, 36.39], [26.55, 36.93],
  [26.33, 37.25], [25.96, 37.51], [25.54, 37.83],
  [25.03, 38.01], [24.62, 38.22], [24.21, 38.78],
  [23.83, 38.96], [23.35, 39.09], [22.92, 39.16],
  [22.51, 39.17], [22.02, 39.32], [21.52, 39.38],
  [21.05, 39.24], [20.55, 39.45], [20.12, 40.01],
  [19.61, 40.49], [19.16, 41.01], [18.65, 41.59],
  [18.21, 42.15], [17.83, 42.78], [17.42, 43.19],
  [17.01, 43.58], [16.91, 44.02], [16.96, 44.47],
  [17.17, 45.12], [17.42, 45.68], [17.58, 46.21],
  [17.91, 46.82], [18.25, 47.43], [18.65, 47.92],
  [19.12, 48.42], [19.58, 48.89], [20.12, 49.35],
  [20.65, 49.78], [21.18, 50.15], [21.72, 50.48],
  [22.31, 50.75], [22.89, 50.95], [23.52, 51.12],
  [24.21, 51.22], [24.89, 51.08], [25.52, 50.85],
  [26.12, 50.58], [26.68, 50.25], [27.21, 49.88],
  [27.72, 49.45], [28.18, 49.02], [28.59, 48.52],
  [28.95, 48.02], [29.28, 47.48], [29.55, 46.92],
  [29.82, 46.35], [30.05, 45.78], [30.25, 45.18],
  [30.42, 44.58], [30.55, 43.95], [30.62, 43.32],
  [30.65, 42.68], [30.59, 42.02], [30.45, 41.38],
  [30.22, 40.75], [29.95, 40.15], [29.62, 39.58],
  [29.25, 39.05], [28.85, 38.58], [28.42, 38.15],
  [28.02, 37.75], [27.65, 37.38], [27.32, 36.98],
  [27.02, 36.58], [26.78, 36.18], [26.62, 35.78],
  [26.55, 35.38], [26.58, 34.98], [26.72, 34.62],
  [26.95, 34.28], [27.25, 33.98], [27.58, 33.72],
  [27.95, 33.52], [28.35, 33.38], [28.75, 33.32],
  [29.15, 33.35], [29.52, 33.48], [29.85, 33.72],
  [30.12, 34.02], [30.32, 34.38], [30.45, 34.78],
  [30.48, 35.18], [30.35, 35.55], [30.12, 35.88],
  [29.82, 36.15], [29.45, 36.35], [29.05, 36.48],
  [28.62, 36.52], [28.18, 36.45], [27.78, 36.28],
  [27.42, 36.02], [27.12, 35.68], [26.92, 35.28],
  [26.85, 34.85], [26.95, 34.42], [27.22, 34.05],
  [27.58, 33.78], [28.02, 33.62], [28.48, 33.58],
  [28.95, 33.68], [29.38, 33.92], [29.72, 34.28],
  [29.38, 34.95], // Back to start
];

/**
 * Get region style based on various properties
 */
export const getRegionStyle = (
  properties: SaudiRegionProperties,
  isHovered: boolean = false,
  isSelected: boolean = false
) => {
  const baseOpacity = 0.15;
  const hoverOpacity = 0.35;
  const selectedOpacity = 0.45;
  
  return {
    fillColor: "#006C35",
    color: "#006C35",
    weight: isSelected ? 3 : isHovered ? 2 : 1.5,
    opacity: 1,
    fillOpacity: isSelected ? selectedOpacity : isHovered ? hoverOpacity : baseOpacity,
    dashArray: isSelected ? undefined : "4 4",
  };
};
