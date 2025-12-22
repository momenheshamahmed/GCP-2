"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: BarData[];
  height?: number;
  showValues?: boolean;
  className?: string;
}

export function SimpleBarChart({
  data,
  height = 200,
  showValues = true,
  className,
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-end justify-between gap-2" style={{ height }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div
              key={item.label}
              className="flex-1 flex flex-col items-center gap-2"
            >
              {showValues && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-sm font-medium text-foreground"
                >
                  {item.value.toLocaleString()}
                </motion.span>
              )}
              <motion.div
                className="w-full rounded-t-md"
                style={{
                  backgroundColor: item.color || "#006C35",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${barHeight}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between gap-2 mt-3 border-t pt-3">
        {data.map((item) => (
          <div key={item.label} className="flex-1 text-center">
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

