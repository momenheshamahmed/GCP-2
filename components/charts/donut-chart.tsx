"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DonutData {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: DonutData[];
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLegend?: boolean;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({
  data,
  size = 200,
  strokeWidth = 30,
  className,
  showLegend = true,
  centerLabel,
  centerValue,
}: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/20"
          />
          {/* Data segments */}
          {data.map((item, index) => {
            const percent = (item.value / total) * 100;
            const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -(cumulativePercent / 100) * circumference;
            cumulativePercent += percent;

            return (
              <motion.circle
                key={item.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </svg>
        {/* Center content */}
        {(centerLabel || centerValue) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {centerValue && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="text-2xl font-bold text-foreground"
              >
                {centerValue}
              </motion.span>
            )}
            {centerLabel && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-sm text-muted-foreground"
              >
                {centerLabel}
              </motion.span>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-wrap justify-center gap-4">
          {data.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex items-center gap-2"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">
                {item.label} ({((item.value / total) * 100).toFixed(1)}%)
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

