"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapMarker } from "@/types";

// Dynamic import for Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);

interface InteractiveMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  onMarkerClick?: (marker: MapMarker) => void;
  className?: string;
  height?: string;
}

export function InteractiveMap({
  center = [24.7136, 46.6753], // Saudi Arabia center
  zoom = 6,
  markers = [],
  onMarkerClick,
  className = "",
  height = "500px",
}: InteractiveMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<typeof import("leaflet") | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Dynamic import Leaflet on client side
    import("leaflet").then((leaflet) => {
      setL(leaflet.default);
      // Fix default marker icon
      delete (leaflet.default.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
      leaflet.default.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  if (!isClient || !L) {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <style jsx global>{`
          /* Hide any provider watermark/logo images that may appear in map controls */
          .leaflet-control-container .leaflet-bottom.leaflet-right img {
            display: none !important;
          }
        `}</style>
        <Skeleton className="absolute inset-0 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-saudi-green-500 border-t-transparent rounded-full mx-auto mb-2" />
            <span className="text-sm text-muted-foreground">Loading map...</span>
          </div>
        </div>
      </div>
    );
  }

  const createCustomIcon = (color: string = "#006C35") => {
    const palmIconSvg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 120">
        <g fill="${color}">
          <path d="M70 28c-10 0-21 8-23 15 10-4 17-2 23 2 6-4 13-6 23-2-2-7-13-15-23-15z"/>
          <path d="M70 46c-8-6-19-9-30-4 6 7 13 9 20 9l-10 7c7 4 15 5 20 5s13-1 20-5l-10-7c7 0 14-2 20-9-11-5-22-2-30 4z"/>
          <rect x="65" y="55" width="10" height="36" rx="2"/>
        </g>
        <path d="M105 52c18-10 32-10 42-6-6 13-14 22-26 28l-16 8z" fill="#8a5b2c"/>
        <path d="M26 92c-6-6-6-16 0-22l36-36c6-6 16-6 22 0l36 36c6 6 6 16 0 22-6 6-16 6-22 0L70 64 48 86c-6 6-16 6-22 0z" fill="${color}" opacity="0.85"/>
      </svg>
    `);

    return L.divIcon({
      className: "custom-marker",
      html: `<div style="width:32px;height:32px;background:url('data:image/svg+xml,${palmIconSvg}') center/contain no-repeat;"></div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
      <style jsx global>{`
        /* Hide any provider watermark/logo images that may appear in map controls */
        .leaflet-control-container .leaflet-bottom.leaflet-right img {
          display: none !important;
        }
      `}</style>
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={createCustomIcon(marker.color)}
            eventHandlers={{
              click: () => onMarkerClick?.(marker),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-saudi-green-700">{marker.title}</h3>
                {marker.description && (
                  <p className="text-sm text-gray-600 mt-1">{marker.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

