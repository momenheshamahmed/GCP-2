"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export interface StatCounterProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatCounter({
  label,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1200,
  className,
  valueClassName,
  labelClassName,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const from = 0;
    const to = value;

    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (to - from) * eased;
      setDisplay(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [durationMs, inView, value]);

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <div ref={ref} className={cn("text-center", className)}>
      <div className={cn("text-2xl sm:text-3xl font-bold tracking-tight", valueClassName)}>
        {prefix}
        {formatted}
        {suffix}
      </div>
      <div className={cn("text-sm text-muted-foreground", labelClassName)}>{label}</div>
    </div>
  );
}




