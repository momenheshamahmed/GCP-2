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
    return L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          width: 32px;
          height: 32px;
          background: ${color};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <div style="
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  };

  return (
    <div className={`relative rounded-lg overflow-hidden ${className}`} style={{ height }}>
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

