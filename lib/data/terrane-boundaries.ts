import type { Feature, FeatureCollection, Polygon, MultiPolygon } from "geojson";

/**
 * Lightweight/placeholder terrane boundary GeoJSON.
 * These polygons are intentionally coarse and should be replaced with official SGM/Saudi Geological Survey datasets.
 */
export type TerraneFeature = Feature<Polygon | MultiPolygon, { id: string; name: string; type: string }>;

export const terraneBoundaries: FeatureCollection<Polygon | MultiPolygon, { id: string; name: string; type: string }> =
  {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { id: "hijaz-terrane", name: "Hijaz Terrane", type: "arc" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [37.5, 26.8],
              [39.2, 26.2],
              [41.0, 25.4],
              [41.4, 23.2],
              [40.4, 21.6],
              [38.6, 21.0],
              [37.2, 22.2],
              [36.9, 24.1],
              [37.5, 26.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { id: "afif-terrane", name: "Afif Terrane", type: "arc" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [41.2, 26.8],
              [44.8, 26.6],
              [46.5, 25.6],
              [47.5, 23.8],
              [46.6, 21.7],
              [44.3, 20.8],
              [41.8, 21.4],
              [40.9, 23.0],
              [41.2, 26.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { id: "midyan-terrane", name: "Midyan Terrane", type: "arc" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [34.5, 29.8],
              [36.7, 29.5],
              [37.5, 28.0],
              [37.0, 26.9],
              [35.6, 26.7],
              [34.6, 27.8],
              [34.5, 29.8],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { id: "northern-phosphate", name: "Northern Phosphate Province", type: "sedimentary" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [35.5, 32.5],
              [39.5, 32.4],
              [41.0, 31.2],
              [41.0, 29.7],
              [38.5, 28.8],
              [35.6, 29.6],
              [35.5, 32.5],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { id: "hulayfah-ophiolite", name: "Hulayfah Ophiolite Belt", type: "ophiolite" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [39.5, 26.8],
              [41.2, 26.6],
              [41.4, 25.1],
              [40.6, 24.0],
              [39.4, 24.3],
              [39.0, 25.7],
              [39.5, 26.8],
            ],
          ],
        },
      },
    ],
  };







