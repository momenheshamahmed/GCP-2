"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Region {
  id: string;
  name: string;
  nameAr: string;
  path: string;
  minerals: string[];
  projects: number;
}

const regions: Region[] = [
  {
    id: "riyadh",
    name: "Riyadh",
    nameAr: "",
    path: "M200,200 L250,180 L280,200 L270,250 L220,260 L200,240 Z",
    minerals: ["Phosphate", "Limestone"],
    projects: 12,
  },
  {
    id: "eastern",
    name: "Eastern Province",
    nameAr: " ",
    path: "M280,150 L350,130 L380,180 L370,250 L320,260 L280,200 Z",
    minerals: ["Oil", "Natural Gas", "Sand"],
    projects: 45,
  },
  {
    id: "makkah",
    name: "Makkah",
    nameAr: " ",
    path: "M80,220 L140,200 L160,240 L150,300 L100,310 L70,280 Z",
    minerals: ["Gold", "Copper", "Silver"],
    projects: 23,
  },
  {
    id: "madinah",
    name: "Madinah",
    nameAr: " ",
    path: "M100,140 L160,120 L180,160 L160,200 L120,210 L90,180 Z",
    minerals: ["Gold", "Zinc", "Lead"],
    projects: 18,
  },
  {
    id: "asir",
    name: "Asir",
    nameAr: "",
    path: "M80,300 L130,280 L150,320 L140,380 L90,390 L60,350 Z",
    minerals: ["Copper", "Iron", "Rare Earths"],
    projects: 8,
  },
  {
    id: "tabuk",
    name: "Tabuk",
    nameAr: "",
    path: "M50,80 L120,60 L150,100 L130,150 L80,160 L40,130 Z",
    minerals: ["Phosphate", "Iron", "Bauxite"],
    projects: 15,
  },
  {
    id: "najran",
    name: "Najran",
    nameAr: "",
    path: "M140,380 L200,360 L230,400 L220,440 L160,450 L130,420 Z",
    minerals: ["Gold", "Silver", "Copper"],
    projects: 6,
  },
];

interface SaudiMapProps {
  onRegionSelect?: (region: Region) => void;
  selectedRegion?: string | null;
  className?: string;
}

export function SaudiMap({
  onRegionSelect,
  selectedRegion,
  className,
}: SaudiMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 450 500"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E6F2EC" />
            <stop offset="100%" stopColor="#CCE5D9" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Map Regions */}
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={
              selectedRegion === region.id
                ? "#006C35"
                : hoveredRegion === region.id
                ? "#339767"
                : "#99CBB3"
            }
            stroke="#006C35"
            strokeWidth={selectedRegion === region.id ? "3" : "1.5"}
            className="cursor-pointer transition-colors"
            filter="url(#shadow)"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: regions.indexOf(region) * 0.05 }}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            onClick={() => onRegionSelect?.(region)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          />
        ))}

        {/* Region Labels */}
        {regions.map((region) => {
          const pathParts = region.path.match(/\d+/g);
          if (!pathParts) return null;
          const nums = pathParts.map(Number);
          const centerX =
            nums.filter((_, i) => i % 2 === 0).reduce((a, b) => a + b, 0) /
            (nums.length / 2);
          const centerY =
            nums.filter((_, i) => i % 2 === 1).reduce((a, b) => a + b, 0) /
            (nums.length / 2);

          return (
            <motion.g
              key={`label-${region.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <text
                x={centerX}
                y={centerY}
                textAnchor="middle"
                className="text-[10px] font-medium pointer-events-none"
                fill={selectedRegion === region.id ? "white" : "#004120"}
              >
                {region.name}
              </text>
              <text
                x={centerX}
                y={centerY + 14}
                textAnchor="middle"
                className="text-[8px] pointer-events-none"
                fill={selectedRegion === region.id ? "#D4AF37" : "#006C35"}
              >
                {region.projects} projects
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hoveredRegion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs"
        >
          {(() => {
            const region = regions.find((r) => r.id === hoveredRegion);
            if (!region) return null;
            return (
              <>
                <h4 className="font-semibold text-saudi-green-700 dark:text-saudi-green-400">
                  {region.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-2">
                  {region.nameAr}
                </p>
                <div className="flex flex-wrap gap-1">
                  {region.minerals.map((mineral) => (
                    <span
                      key={mineral}
                      className="text-xs bg-saudi-gold-100 text-saudi-gold-700 px-2 py-0.5 rounded"
                    >
                      {mineral}
                    </span>
                  ))}
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
}

